import { handleEndpoints, type Payload } from "payload";
import { sql } from "@payloadcms/db-postgres";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { LAST_ADMIN_MESSAGE } from "@/cms/hooks/lastAdmin";
import { boot, rand, type Harness } from "./helpers";

/**
 * The website always keeps at least one administrator. Covered on every write path: the Local API (what the admin
 * screens and scripts use), single REST requests, bulk REST requests (update/delete "where …"), and two administrators
 * demoting each other at the same moment.
 */
let h: Harness;
let payload: Payload;
const PASSWORD = "Correct-Horse-" + rand();

async function call(method: string, path: string, opts: { token?: string; body?: unknown } = {}) {
  const res = await handleEndpoints({
    config: payload.config,
    request: new Request(`http://localhost:3000${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...(opts.token ? { Authorization: `JWT ${opts.token}` } : {}) },
      body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    }),
  });
  const text = await res.text();
  return { status: res.status, text };
}

type U = { id: string; email: string; token: string };
async function user(role: "admin" | "editor"): Promise<U> {
  const doc = await payload.create({ collection: "users", data: { email: `${role}-${rand()}@example.test`, password: PASSWORD, role } as never, overrideAccess: true });
  const login = await handleEndpoints({
    config: payload.config,
    request: new Request("http://localhost:3000/api/users/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: doc.email, password: PASSWORD }) }),
  });
  return { id: String(doc.id), email: doc.email, token: ((await login.json()) as { token: string }).token };
}

const roles = async () => (await payload.find({ collection: "users", limit: 100, depth: 0, overrideAccess: true })).docs.map((d) => (d as { role?: string }).role);
const admins = async () => (await roles()).filter((r) => r === "admin").length;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
});
afterAll(async () => h?.stop());
// Each test starts with no accounts (the guard itself would refuse to remove the last administrator, so the table is emptied directly).
beforeEach(async () => {
  await (payload.db as unknown as { drizzle: { execute: (q: unknown) => Promise<unknown> } }).drizzle.execute(sql`DELETE FROM "users"`);
});

describe("only one administrator", () => {
  it("cannot be changed to editor, by the Local API with or without access control", async () => {
    const a = await user("admin");
    for (const overrideAccess of [true, false]) {
      await expect(payload.update({ collection: "users", id: a.id, data: { role: "editor" }, overrideAccess, ...(overrideAccess ? {} : { user: { ...(await payload.findByID({ collection: "users", id: a.id, overrideAccess: true })), collection: "users" } as never }) })).rejects.toThrow(LAST_ADMIN_MESSAGE);
    }
    expect(await roles()).toEqual(["admin"]);
  });

  it("cannot be deleted by the Local API", async () => {
    const a = await user("admin");
    await expect(payload.delete({ collection: "users", id: a.id, overrideAccess: true })).rejects.toThrow(LAST_ADMIN_MESSAGE);
    expect(await admins()).toBe(1);
  });

  it("cannot demote or delete itself through REST, and gets a plain explanation", async () => {
    const a = await user("admin");
    const demote = await call("PATCH", `/api/users/${a.id}`, { token: a.token, body: { role: "editor" } });
    expect(demote.status).toBe(409);
    expect(demote.text).toContain("only administrator account");
    const del = await call("DELETE", `/api/users/${a.id}`, { token: a.token });
    expect(del.status).toBe(409);
    expect(await roles()).toEqual(["admin"]);
  });

  it("can still change its own name, e-mail and password, and can still manage editors", async () => {
    const a = await user("admin");
    const e = await user("editor");
    expect((await call("PATCH", `/api/users/${a.id}`, { token: a.token, body: { name: "Reception Manager", role: "admin" } })).status).toBe(200);
    expect((await call("PATCH", `/api/users/${a.id}`, { token: a.token, body: { password: PASSWORD + "-new" } })).status).toBe(200);
    expect((await call("DELETE", `/api/users/${e.id}`, { token: a.token })).status).toBe(200);
    expect(await roles()).toEqual(["admin"]);
  });

  it("an editor cannot demote or delete it either (refused by access control before the guard)", async () => {
    const a = await user("admin");
    const e = await user("editor");
    expect([403, 404]).toContain((await call("DELETE", `/api/users/${a.id}`, { token: e.token })).status);
    await call("PATCH", `/api/users/${a.id}`, { token: e.token, body: { role: "editor" } });
    expect(await admins()).toBe(1);
  });
});

describe("several administrators", () => {
  it("one may be demoted or deleted while another remains", async () => {
    const a = await user("admin");
    const b = await user("admin");
    const c = await user("admin");
    expect((await call("PATCH", `/api/users/${b.id}`, { token: a.token, body: { role: "editor" } })).status).toBe(200);
    expect((await call("DELETE", `/api/users/${c.id}`, { token: a.token })).status).toBe(200);
    // a is now the last one
    expect((await call("DELETE", `/api/users/${a.id}`, { token: a.token })).status).toBe(409);
    expect(await admins()).toBe(1);
  });

  it("bulk demotion through REST keeps one administrator", async () => {
    const a = await user("admin");
    await user("admin");
    await user("admin");
    await user("editor");
    // Payload changes what it may and lists each refused document in "errors".
    const res = await call("PATCH", "/api/users?where[role][equals]=admin", { token: a.token, body: { role: "editor" } });
    expect(res.text).toContain("only administrator account");
    expect(await admins()).toBe(1);
  });

  it("bulk deletion through REST keeps one administrator", async () => {
    const a = await user("admin");
    await user("admin");
    await user("editor");
    // Payload deletes what it may and lists the refused document in "errors".
    const res = await call("DELETE", "/api/users?where[id][exists]=true", { token: a.token });
    expect(res.text).toContain("only administrator account");
    expect(await roles()).toEqual(["admin"]);
  });

  it("two administrators demoting each other at the same moment leave one administrator", async () => {
    // The app's pool (3 connections, src/cms/db.ts) is too small for two simultaneous writes in ONE process: each write holds a
    // transaction connection and asks for a second one, so both fail with a connection timeout before the guard runs. That
    // limit is separate from this rule (each serverless instance normally serves one request at a time); it is widened here so
    // the test exercises the guard's lock and not the pool.
    (payload.db as unknown as { pool: { options: { max: number } } }).pool.options.max = 10;
    for (let round = 0; round < 5; round++) {
      await (payload.db as unknown as { drizzle: { execute: (q: unknown) => Promise<unknown> } }).drizzle.execute(sql`DELETE FROM "users"`);
      const a = await user("admin");
      const b = await user("admin");
      const results = await Promise.all([
        call("PATCH", `/api/users/${b.id}`, { token: a.token, body: { role: "editor" } }),
        call("PATCH", `/api/users/${a.id}`, { token: b.token, body: { role: "editor" } }),
      ]);
      expect(results.map((r) => r.status).sort()).toEqual([200, 409]);
      expect(await admins()).toBe(1);
    }
  });

  it("two administrators deleting each other at the same moment leave one administrator", async () => {
    const a = await user("admin");
    const b = await user("admin");
    await Promise.all([call("DELETE", `/api/users/${b.id}`, { token: a.token }), call("DELETE", `/api/users/${a.id}`, { token: b.token })]);
    expect(await admins()).toBe(1);
  });
});
