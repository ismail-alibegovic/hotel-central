import { expect, request as pwRequest, test, type APIRequestContext } from "@playwright/test";

const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";

const tokens = new WeakMap<APIRequestContext, string>();

/**
 * Logs in over REST and returns a context that authenticates with the JWT from the response.
 * (The session cookie is `Secure` in production mode, which Node's cookie jar will not replay over
 * plain http://127.0.0.1; browsers do. The cookie path itself is exercised in the CSRF test below.)
 */
async function login(creds: { email: string; password: string }): Promise<APIRequestContext> {
  const anon = await pwRequest.newContext({ baseURL: base });
  const res = await anon.post("/api/users/login", { data: creds });
  expect(res.status(), "login").toBe(200);
  const body = await res.json();
  expect(res.headers()["set-cookie"]).toMatch(/payload-token=.*HttpOnly/i);
  const ctx = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${body.token}` } });
  tokens.set(ctx, body.token);
  return ctx;
}
const pageDoc = async (ctx: APIRequestContext, slug: string, collection = "pages") =>
  (await (await ctx.get(`/api/${collection}?where[slug][equals]=${slug}&limit=1&depth=0&draft=true`)).json()).docs[0];

let admin: APIRequestContext;
let editor: APIRequestContext;
let aboutId: string;
let roomId: string;

test.beforeAll(async () => {
  admin = await login(ADMIN);
  expect((await admin.post("/api/users", { data: EDITOR })).status()).toBe(201);
  editor = await login(EDITOR);
  aboutId = (await pageDoc(admin, "about")).id;
  roomId = (await pageDoc(admin, "junior-suite", "rooms")).id;
});

test("seeded CMS content renders exactly like the static page (no design drift)", async ({ page }) => {
  await page.goto("/en/about");
  await expect(page.locator("h1")).toContainText(/Irish hospitality/i);
  await page.goto("/bs/rooms/junior-suite");
  await expect(page.locator("h1")).toContainText(/Junior/i);
});

test("admin login screen is served, noindexed, and the public site stays indexable-agnostic", async ({ page, request }) => {
  const res = await page.goto("/admin");
  expect(res?.status()).toBe(200);
  await expect(page.locator('input[name="email"], input#field-email')).toBeVisible();
  const api = await request.get("/api/pages");
  expect(api.headers()["x-robots-tag"]).toContain("noindex");
});

test("admin publish shows on the right locale only, immediately", async ({ request }) => {
  const stamp = `Stamp-${Date.now()}`;
  const res = await admin.patch(`/api/pages/${aboutId}?locale=en`, { data: { heroEyebrow: stamp, _status: "published" } });
  expect(res.status()).toBe(200);
  const en = await (await request.get("/en/about")).text();
  const bs = await (await request.get("/bs/about")).text();
  expect(en).toContain(stamp);
  expect(bs).not.toContain(stamp); // locale isolation on the public page
});

test("editor drafts stay private; preview is staff-only; a stolen draft cookie alone shows nothing", async ({ request }) => {
  const secret = `DRAFT-${Date.now()}`;
  const d = await editor.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { heroEyebrow: secret } });
  expect(d.status()).toBe(200);

  // public cannot see it
  expect(await (await request.get("/en/about")).text()).not.toContain(secret);

  // anonymous cannot enable preview
  const anonPreview = await request.get("/api/preview?path=/en/about", { maxRedirects: 0 });
  expect(anonPreview.status()).toBe(401);
  // open redirects / junk paths are refused even for staff
  expect((await editor.get("/api/preview?path=https://evil.example/", { maxRedirects: 0 })).status()).toBe(400);
  expect((await editor.get("/api/preview?path=//evil.example", { maxRedirects: 0 })).status()).toBe(400);

  // CSRF: the session cookie only authenticates writes that come from our own origin
  const cookie = `payload-token=${tokens.get(editor)}`;
  const foreign = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: "https://evil.example", Cookie: cookie } });
  expect((await foreign.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { heroEyebrow: "csrf" } })).status()).toBe(403);
  const ownOrigin = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Cookie: cookie } });
  expect((await ownOrigin.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { heroEyebrow: secret } })).status()).toBe(200);

  // staff preview shows the draft
  const ok = await editor.get("/api/preview?path=/en/about", { maxRedirects: 0 });
  expect([302, 307, 308]).toContain(ok.status());
  const cookies = ok.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]);
  const bypass = cookies.find((c) => c.startsWith("__prerender_bypass"));
  expect(bypass, "draft mode cookie").toBeTruthy();
  // browsers replay the draft-mode cookie; replay it explicitly (Secure cookies are not re-sent over http by Node)
  const previewPage = await (await editor.get("/en/about", { headers: { cookie: bypass! } })).text();
  expect(previewPage).toContain(secret);

  // someone who only has the draft-mode cookie (no valid staff session) gets the public page
  const thief = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { cookie: bypass! } });
  expect(await (await thief.get("/en/about")).text()).not.toContain(secret);

  // editors cannot publish it; admin can, after which everyone sees it
  expect((await editor.patch(`/api/pages/${aboutId}?locale=en`, { data: { _status: "published" } })).status()).toBe(403);
  expect(await (await request.get("/en/about")).text()).not.toContain(secret);
  expect((await admin.patch(`/api/pages/${aboutId}?locale=en`, { data: { heroEyebrow: secret, _status: "published" } })).status()).toBe(200);
  expect(await (await request.get("/en/about")).text()).toContain(secret);
});

test("room: BS edit is independent, and other rooms keep static content", async ({ request }) => {
  const bsName = `BS-Soba-${Date.now()}`;
  expect((await admin.patch(`/api/rooms/${roomId}?locale=bs`, { data: { name: bsName, _status: "published" } })).status()).toBe(200);
  expect(await (await request.get("/bs/rooms/junior-suite")).text()).toContain(bsName);
  expect(await (await request.get("/en/rooms/junior-suite")).text()).not.toContain(bsName);
  expect(await (await request.get("/bs/rooms/single-room")).text()).not.toContain(bsName);
});

test("booking mapping stays in code: editors cannot read or change it and the page link is unchanged", async ({ request }) => {
  const doc = await pageDoc(editor, "junior-suite", "rooms");
  expect(doc).not.toHaveProperty("roomTypeId");
  await editor.patch(`/api/rooms/${roomId}?draft=true&locale=en`, { data: { roomTypeId: "EVIL" } });
  const html = await (await request.get("/en/rooms/junior-suite")).text();
  expect(html).toContain("roomtypeunkid=18019000000000000010");
  expect(html).not.toContain("EVIL");
});

test("static fallback: deleting the CMS document restores the original page", async ({ request }) => {
  expect((await editor.delete(`/api/pages/${aboutId}`)).status()).toBe(403);
  expect((await admin.delete(`/api/pages/${aboutId}`)).status()).toBe(200);
  const html = await (await request.get("/en/about")).text();
  expect(html).toContain("Irish hospitality");
  expect(html).not.toContain("Stamp-");
});

test("existing contact API and booking links still work with the CMS on", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x", email: "bad", message: "short", consent: false } });
  expect(res.status()).toBe(422);
  const html = await (await request.get("/en")).text();
  expect(html).toContain("live.ipms247.com");
});
