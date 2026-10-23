import { handleEndpoints, type Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, rand, type Harness } from "./helpers";

/**
 * Same code path the deployed /api/[...slug] route uses (handleEndpoints), so these assert the
 * real HTTP authorization behaviour: sessions, roles, draft query flag, version restore.
 */
let h: Harness;
let payload: Payload;
const PASSWORD = "Correct-Horse-" + rand();
const email = (p: string) => `${p}-${rand()}@example.test`;

async function call(method: string, path: string, opts: { token?: string; body?: unknown } = {}) {
  const config = payload.config;
  const res = await handleEndpoints({
    config,
    request: new Request(`http://localhost:3000${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...(opts.token ? { Authorization: `JWT ${opts.token}` } : {}) },
      body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    }),
  });
  const text = await res.text();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- REST bodies are asserted field by field
  let json: any = null;
  try { json = JSON.parse(text); } catch { /* not JSON */ }
  return { status: res.status, json, headers: res.headers };
}

let adminToken: string;
let editorToken: string;
let adminEmail: string;
let editorEmail: string;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  adminEmail = email("admin");
  editorEmail = email("editor");
  await payload.create({ collection: "users", data: { email: adminEmail, password: PASSWORD } as never, overrideAccess: true }); // first -> admin
  const created = await call("POST", "/api/users", { token: undefined, body: { email: editorEmail, password: PASSWORD } });
  expect([401, 403]).toContain(created.status); // anonymous cannot create accounts
  await payload.create({ collection: "users", data: { email: editorEmail, password: PASSWORD } as never, overrideAccess: true });
  adminToken = (await call("POST", "/api/users/login", { body: { email: adminEmail, password: PASSWORD } })).json.token;
  editorToken = (await call("POST", "/api/users/login", { body: { email: editorEmail, password: PASSWORD } })).json.token;
});
afterAll(async () => h?.stop());

describe("REST authentication", () => {
  it("rejects bad credentials and issues a session cookie on success", async () => {
    const bad = await call("POST", "/api/users/login", { body: { email: editorEmail, password: "wrong" } });
    expect(bad.status).toBe(401);
    const ok = await call("POST", "/api/users/login", { body: { email: editorEmail, password: PASSWORD } });
    expect(ok.status).toBe(200);
    const cookie = ok.headers.get("set-cookie") ?? "";
    expect(cookie).toMatch(/payload-token=/);
    expect(cookie.toLowerCase()).toContain("httponly");
    expect(cookie.toLowerCase()).toMatch(/samesite=lax/);
  });

  it("reports no user for anonymous /me and exposes no GraphQL endpoint", async () => {
    expect((await call("GET", "/api/users/me")).json.user).toBeNull();
    expect((await call("POST", "/api/graphql", { body: { query: "{ __typename }" } })).status).toBe(404);
  });
});

describe("REST authorization: pages", () => {
  const slug = "rest-" + rand();
  let id: string;

  it("editor can create only drafts", async () => {
    const pub = await call("POST", "/api/pages", { token: editorToken, body: { slug: slug + "-p", heroEyebrow: "x", _status: "published" } });
    expect(pub.status).toBe(403);
    const draft = await call("POST", "/api/pages?draft=true&locale=en", { token: editorToken, body: { slug, heroEyebrow: "Draft one" } });
    expect(draft.status).toBe(201);
    expect(draft.json.doc._status).toBe("draft");
    id = draft.json.doc.id;
  });

  it("anonymous users cannot see or list the draft", async () => {
    const list = await call("GET", `/api/pages?where[slug][equals]=${slug}&draft=true`);
    expect(list.status).toBe(200);
    expect(list.json.totalDocs).toBe(0);
    expect((await call("GET", `/api/pages/${id}`)).status).toBe(404);
  });

  it("only an admin can publish", async () => {
    expect((await call("PATCH", `/api/pages/${id}?locale=en`, { token: editorToken, body: { heroEyebrow: "x" , _status: "published" } })).status).toBe(403);
    expect((await call("PATCH", `/api/pages/${id}?locale=en`, { token: editorToken, body: { heroEyebrow: "plain write" } })).status).toBe(403); // not a draft save
    expect((await call("GET", `/api/pages/${id}`)).status).toBe(404);
    const pub = await call("PATCH", `/api/pages/${id}?locale=en`, { token: adminToken, body: { heroEyebrow: "Live v1", _status: "published" } });
    expect(pub.status).toBe(200);
    const live = await call("GET", `/api/pages?where[slug][equals]=${slug}&locale=en`);
    expect(live.json.docs[0].heroEyebrow).toBe("Live v1");
  });

  it("editor draft edits stay private; direct writes to live content, unpublish and restore are refused", async () => {
    const d = await call("PATCH", `/api/pages/${id}?draft=true&locale=en`, { token: editorToken, body: { heroEyebrow: "PRIVATE draft v2" } });
    expect(d.status).toBe(200);
    const anon = await call("GET", `/api/pages?where[slug][equals]=${slug}&locale=en`);
    expect(JSON.stringify(anon.json)).not.toContain("PRIVATE draft v2");
    expect(anon.json.docs[0].heroEyebrow).toBe("Live v1");
    const anonAsksDraft = await call("GET", `/api/pages?where[slug][equals]=${slug}&locale=en&draft=true`);
    expect(JSON.stringify(anonAsksDraft.json)).not.toContain("PRIVATE draft v2");

    // not a draft save -> used to rewrite AND unpublish the live document while a draft was pending
    expect((await call("PATCH", `/api/pages/${id}?locale=en`, { token: editorToken, body: { heroEyebrow: "hijack" } })).status).toBe(403);
    expect((await call("GET", `/api/pages?where[slug][equals]=${slug}&locale=en`)).json.totalDocs).toBe(1);
    // unpublish
    expect((await call("PATCH", `/api/pages/${id}?draft=false&locale=en`, { token: editorToken, body: { _status: "draft" } })).status).toBe(403);
    // restore a published version
    const versions = await payload.findVersions({ collection: "pages", where: { parent: { equals: id }, "version._status": { equals: "published" } }, overrideAccess: true, limit: 1 });
    expect(versions.docs.length).toBe(1);
    const restore = await call("POST", `/api/pages/versions/${versions.docs[0].id}`, { token: editorToken });
    expect(restore.status).toBe(403);
    // still live and unchanged
    const live = await call("GET", `/api/pages?where[slug][equals]=${slug}&locale=en`);
    expect(live.json.docs[0].heroEyebrow).toBe("Live v1");
    // admin may unpublish
    expect((await call("PATCH", `/api/pages/${id}?draft=false&locale=en`, { token: adminToken, body: { _status: "draft" } })).status).toBe(200);
    expect((await call("GET", `/api/pages?where[slug][equals]=${slug}`)).json.totalDocs).toBe(0);
  });

  it("editor cannot delete pages; admin can", async () => {
    expect((await call("DELETE", `/api/pages/${id}`, { token: editorToken })).status).toBe(403);
    expect((await call("DELETE", `/api/pages/${id}`, { token: adminToken })).status).toBe(200);
  });
});

describe("REST authorization: users", () => {
  it("editor cannot create/delete users or list others; cannot self-promote", async () => {
    expect((await call("POST", "/api/users", { token: editorToken, body: { email: email("x"), password: PASSWORD, role: "admin" } })).status).toBe(403);
    const me = (await call("GET", "/api/users/me", { token: editorToken })).json.user;
    expect(me.role).toBe("editor");
    const list = await call("GET", "/api/users", { token: editorToken });
    expect(list.json.docs.map((u: { id: string }) => u.id)).toEqual([me.id]);
    await call("PATCH", `/api/users/${me.id}`, { token: editorToken, body: { role: "admin" } });
    expect((await call("GET", "/api/users/me", { token: editorToken })).json.user.role).toBe("editor");
    const adminList = await call("GET", "/api/users", { token: adminToken });
    expect(adminList.json.totalDocs).toBeGreaterThanOrEqual(2);
  });
});
