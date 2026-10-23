import { handleEndpoints, type Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, rand, type Harness } from "./helpers";

/**
 * Probing/enumeration attempts against the real REST handlers. The CMS holds two kinds of secrets:
 * credentials (users) and the privileged booking mapping (roomTypeId). Neither may be discoverable
 * through reads, filters, sorts or error messages by someone who may not read them.
 */
let h: Harness;
let payload: Payload;
const PASSWORD = "Correct-Horse-" + rand();
let adminToken = "";
let editorToken = "";
const ROOM_TYPE_ID = "18019000000000000010";

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
  let json: unknown = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* not JSON */
  }
  return { status: res.status, text, json: json as Record<string, any> | null }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  const mk = (p: string) => payload.create({ collection: "users", data: { email: `${p}-${rand()}@example.test`, password: PASSWORD } as never, overrideAccess: true });
  const admin = await mk("admin");
  const editor = await mk("editor");
  adminToken = (await call("POST", "/api/users/login", { body: { email: admin.email, password: PASSWORD } })).json!.token;
  editorToken = (await call("POST", "/api/users/login", { body: { email: editor.email, password: PASSWORD } })).json!.token;
  await payload.create({ collection: "rooms", overrideAccess: true, locale: "en", data: { slug: "probe-room", roomTypeId: ROOM_TYPE_ID, name: "Probe", _status: "published" } });
  await payload.create({ collection: "pages", overrideAccess: true, locale: "en", draft: true, data: { slug: "unpublished-secret", metaTitle: "NEVER PUBLIC" } });
});
afterAll(async () => h?.stop());

describe("privileged booking mapping cannot be read or probed", () => {
  it("is absent from admin-less reads", async () => {
    for (const token of [undefined, editorToken]) {
      const doc = (await call("GET", "/api/rooms?where[slug][equals]=probe-room&draft=true", { token })).json;
      expect(JSON.stringify(doc)).not.toContain(ROOM_TYPE_ID);
    }
    const asAdmin = await call("GET", "/api/rooms?where[slug][equals]=probe-room", { token: adminToken });
    expect(JSON.stringify(asAdmin.json)).toContain(ROOM_TYPE_ID); // sanity: the admin does see it
  });

  it("cannot be confirmed through filtering or sorting (no oracle)", async () => {
    for (const token of [undefined, editorToken]) {
      const hit = await call("GET", `/api/rooms?where[roomTypeId][equals]=${ROOM_TYPE_ID}`, { token });
      const miss = await call("GET", `/api/rooms?where[roomTypeId][equals]=nope`, { token });
      // either the query is refused, or both answers are identical (no distinguishing signal)
      if (hit.status === 200 && miss.status === 200) expect(hit.json!.totalDocs).toBe(miss.json!.totalDocs);
      else expect([400, 403]).toContain(hit.status);
      expect(JSON.stringify(hit.json)).not.toContain(ROOM_TYPE_ID);
      const sorted = await call("GET", `/api/rooms?sort=roomTypeId`, { token });
      expect(JSON.stringify(sorted.json)).not.toContain(ROOM_TYPE_ID);
    }
  });
});

describe("credentials and accounts are not enumerable", () => {
  it("anonymous callers learn nothing from users endpoints", async () => {
    for (const path of ["/api/users", "/api/users?where[email][like]=example", "/api/users?where[role][equals]=admin", "/api/users/count"]) {
      const res = await call("GET", path);
      expect([401, 403]).toContain(res.status);
      expect(res.text).not.toContain("example.test");
    }
  });

  it("never returns password hashes or salts to anyone", async () => {
    for (const token of [adminToken, editorToken]) {
      const res = await call("GET", "/api/users", { token });
      expect(res.text).not.toMatch(/"(hash|salt)"/);
      expect(res.text).not.toContain("resetPasswordToken\":\"");
    }
  });

  it("forgot-password answers identically for known and unknown accounts (no user enumeration)", async () => {
    const known = await call("POST", "/api/users/forgot-password", { body: { email: (await payload.find({ collection: "users", limit: 1, overrideAccess: true })).docs[0].email } });
    const unknown = await call("POST", "/api/users/forgot-password", { body: { email: `ghost-${rand()}@example.test` } });
    expect(known.status).toBe(unknown.status);
    expect(known.text).toBe(unknown.text);
  });

  it("login errors do not reveal whether an account exists", async () => {
    const wrongPw = await call("POST", "/api/users/login", { body: { email: (await payload.find({ collection: "users", limit: 1, overrideAccess: true })).docs[0].email, password: "x" } });
    const noUser = await call("POST", "/api/users/login", { body: { email: `ghost-${rand()}@example.test`, password: "x" } });
    expect(wrongPw.status).toBe(noUser.status);
    expect(wrongPw.text).toBe(noUser.text);
  });
});

describe("unpublished content stays private on every read path", () => {
  const paths = [
    "/api/pages?where[slug][equals]=unpublished-secret",
    "/api/pages?where[slug][equals]=unpublished-secret&draft=true",
    "/api/pages?where[_status][equals]=draft",
    "/api/pages?where[metaTitle][contains]=NEVER",
    "/api/pages?search=NEVER",
    "/api/pages/versions",
    "/api/pages/count?where[slug][equals]=unpublished-secret",
  ];
  for (const path of paths) {
    it(`anonymous ${path}`, async () => {
      const res = await call("GET", path);
      expect(res.text).not.toContain("NEVER PUBLIC");
      if (res.status === 200 && typeof res.json?.totalDocs === "number") expect(res.json.totalDocs).toBe(0);
      if (res.status === 200 && typeof res.json?.count === "number") expect(res.json.count).toBe(0);
    });
  }

  it("editors (staff) can see it, proving the filter is about authorization, not absence", async () => {
    const res = await call("GET", "/api/pages?where[slug][equals]=unpublished-secret&draft=true&locale=en", { token: editorToken });
    expect(res.json!.totalDocs).toBe(1);
  });
});

describe("request hardening", () => {
  it("rejects deep population requests beyond maxDepth", async () => {
    const res = await call("GET", "/api/pages?depth=50", { token: adminToken });
    expect(res.status).toBe(200); // clamped, not an error, and not honoured
    expect(res.text.length).toBeLessThan(50_000);
  });

  it("exposes no GraphQL surface", async () => {
    expect((await call("POST", "/api/graphql", { body: { query: "{ __schema { types { name } } }" } })).status).toBe(404);
    expect((await call("GET", "/api/graphql-playground")).status).toBe(404);
  });
});
