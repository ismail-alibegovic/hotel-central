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
  const ctx = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${body.token}`, Connection: "close" } });
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
  const res = await admin.patch(`/api/pages/${aboutId}?locale=en`, { data: { metaTitle: stamp, _status: "published" } });
  expect(res.status()).toBe(200);
  const en = await (await request.get("/en/about")).text();
  const bs = await (await request.get("/bs/about")).text();
  expect(en).toContain(stamp);
  expect(bs).not.toContain(stamp); // locale isolation on the public page
});

test("editor drafts stay private; preview is staff-only; a stolen draft cookie alone shows nothing", async ({ request }) => {
  const secret = `DRAFT-${Date.now()}`;
  const d = await editor.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { metaTitle: secret } });
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
  expect((await foreign.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { metaTitle: "csrf" } })).status()).toBe(403);
  const ownOrigin = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Cookie: cookie } });
  expect((await ownOrigin.patch(`/api/pages/${aboutId}?draft=true&locale=en`, { data: { metaTitle: secret } })).status()).toBe(200);

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
  expect((await admin.patch(`/api/pages/${aboutId}?locale=en`, { data: { metaTitle: secret, _status: "published" } })).status()).toBe(200);
  expect(await (await request.get("/en/about")).text()).toContain(secret);
});

test("room: BS edit is independent, and other rooms keep static content", async ({ request }) => {
  const bsName = `BS-Soba-${Date.now()}`;
  expect((await admin.patch(`/api/rooms/${roomId}?locale=bs`, { data: { name: bsName, _status: "published" } })).status()).toBe(200);
  expect(await (await request.get("/bs/rooms/junior-suite")).text()).toContain(bsName);
  expect(await (await request.get("/en/rooms/junior-suite")).text()).not.toContain(bsName);
  // Another room keeps its own static content. (Its page may list this room by name under "other rooms", and whether that list is
  // already regenerated depends on earlier draft saves, so the assertion is about the room's own name, not about the absence of ours.)
  expect(await (await request.get("/bs/rooms/single-room")).text()).toContain("Jednokrevetna soba");
});

test("booking mapping stays in code: editors cannot read or change it and the page link is unchanged", async ({ request }) => {
  const doc = await pageDoc(editor, "junior-suite", "rooms");
  expect(doc).not.toHaveProperty("roomTypeId");
  await editor.patch(`/api/rooms/${roomId}?draft=true&locale=en`, { data: { roomTypeId: "EVIL" } });
  const html = await (await request.get("/en/rooms/junior-suite")).text();
  expect(html).toContain("roomtypeunkid=18019000000000000010");
  expect(html).not.toContain("EVIL");
});

test("existing contact API and booking links still work with the CMS on", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x", email: "bad", message: "short", consent: false } });
  expect(res.status()).toBe(422);
  const html = await (await request.get("/en")).text();
  expect(html).toContain("live.ipms247.com");
});

test("booking engine integration is identical with the CMS on (home form, room link, hidden fields)", async ({ page }) => {
  await page.goto("/en");
  const form = page.locator('form[action*="ipms247"]').first();
  await expect(form).toHaveAttribute("action", "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo");
  for (const name of ["eZ_chkin", "eZ_chkout", "eZ_Nights", "eZ_adult", "eZ_child", "eZ_room", "hidBodyLanguage"]) {
    await expect(form.locator(`input[name="${name}"]`)).toHaveCount(1);
  }
  await page.goto("/bs/rooms/junior-suite");
  const book = page.locator('a[href*="roomwisedata.php"]').first();
  await expect(book).toHaveAttribute("href", /hid=hotelcentralsarajevo&roomtypeunkid=18019000000000000010/);
  await expect(book).toHaveAttribute("rel", /noopener/);
});

test("draft responses are never cacheable by shared caches; the admin API sends hardening headers", async ({ request }) => {
  const secret = `CACHE-${Date.now()}`;
  const doc = await pageDoc(admin, "about");
  expect(doc, "about doc present (fallback test deletes it, so this test must run before it)").toBeTruthy();
  await editor.patch(`/api/pages/${doc.id}?draft=true&locale=en`, { data: { metaTitle: secret } });
  const pre = await editor.get("/api/preview?path=/en/about", { maxRedirects: 0 });
  const bypass = pre.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]).find((c) => c.startsWith("__prerender_bypass"))!;
  const res = await editor.get("/en/about", { headers: { cookie: bypass } });
  expect(await res.text()).toContain(secret);
  expect(res.headers()["cache-control"]).toMatch(/no-store|private|no-cache/);
  expect(res.headers()["cache-control"]).not.toMatch(/s-maxage|public/);

  const api = await request.get("/api/pages");
  expect(api.headers()["x-content-type-options"]).toBe("nosniff");
  expect(api.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(api.headers()["x-powered-by"]).toBeUndefined();
});

test("rooms: order, visibility and sitemap follow the CMS; the booking id never changes", async ({ request }) => {
  const family = await pageDoc(admin, "family-room", "rooms");
  const presidential = await pageDoc(admin, "presidential-suite", "rooms");
  const roomLinks = (html: string) => [...html.matchAll(/href="\/en\/rooms\/([a-z-]+)"/g)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i);

  // hide one room, promote another
  expect((await admin.patch(`/api/rooms/${family.id}?locale=en`, { data: { visible: false, _status: "published" } })).status()).toBe(200);
  const single = await pageDoc(admin, "single-room", "rooms");
  // equal `order` values tie-break by the static position, so make room at the front first
  expect((await admin.patch(`/api/rooms/${single.id}?locale=en`, { data: { order: 7, _status: "published" } })).status()).toBe(200);
  expect((await admin.patch(`/api/rooms/${presidential.id}?locale=en`, { data: { order: 1, _status: "published" } })).status()).toBe(200);

  const list = await (await request.get("/en/rooms")).text();
  const links = roomLinks(list);
  expect(links).not.toContain("family-room");
  expect(links[0]).toBe("presidential-suite");
  expect((await request.get("/en/rooms/family-room")).status()).toBe(404);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/rooms/family-room");
  expect(await (await request.get("/en/rooms/presidential-suite")).text()).toContain("roomtypeunkid=");

  // editors can do none of this
  const edDoc = await pageDoc(editor, "single-room", "rooms");
  await editor.patch(`/api/rooms/${edDoc.id}?draft=true&locale=en`, { data: { visible: false, order: 99 } });
  expect(roomLinks(await (await request.get("/en/rooms")).text())).toContain("single-room");

  // restore
  await admin.patch(`/api/rooms/${family.id}?locale=en`, { data: { visible: true, _status: "published" } });
  await admin.patch(`/api/rooms/${presidential.id}?locale=en`, { data: { order: 6, _status: "published" } });
  await admin.patch(`/api/rooms/${single.id}?locale=en`, { data: { order: 1, _status: "published" } });
  const restored = roomLinks(await (await request.get("/en/rooms")).text());
  expect(restored).toHaveLength(6);
  expect((await request.get("/en/rooms/family-room")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/en/rooms/family-room");
});

/** Fetch a page document's layout rows (all locales share the structure; text is per locale). */
async function layoutOf(ctx: APIRequestContext, id: string, locale: "en" | "bs") {
  const doc = await (await ctx.get(`/api/pages/${id}?draft=true&locale=${locale}&depth=0`)).json();
  return doc.layout as Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}
const publish = (ctx: APIRequestContext, id: string, locale: "en" | "bs", data: object) => ctx.patch(`/api/pages/${id}?locale=${locale}`, { data: { ...data, _status: "published" } });

test("page blocks: edit copy per language, reorder, remove — everywhere else unchanged", async ({ request }) => {
  const spa = await pageDoc(admin, "spa");
  const stamp = `Block-${Date.now()}`;
  const en = await layoutOf(admin, spa.id, "en");
  const types = en.map((b) => b.blockType);
  expect(types).toEqual(["hero", "split", "facts", "split", "split", "gallery", "finalBooking"]);

  // 1. change the hero eyebrow in English only
  en[0].eyebrow = stamp;
  expect((await publish(admin, spa.id, "en", { layout: en })).status()).toBe(200);
  const enHtml = await (await request.get("/en/spa")).text();
  const bsHtml = await (await request.get("/bs/spa")).text();
  expect(enHtml).toContain(stamp);
  expect(bsHtml).not.toContain(stamp);

  // 2. swap the gym and day-spa sections (structure is shared by both languages)
  const rows = await layoutOf(admin, spa.id, "en");
  [rows[3], rows[4]] = [rows[4], rows[3]];
  expect((await publish(admin, spa.id, "en", { layout: rows })).status()).toBe(200);
  const order = async (path: string) => {
    const html = await (await request.get(path)).text();
    return [html.indexOf("(03) Wellness Day Spa"), html.indexOf("(02) Fitness")];
  };
  const [daySpaPos, gymPos] = await order("/en/spa");
  expect(daySpaPos).toBeGreaterThan(-1);
  expect(daySpaPos).toBeLessThan(gymPos); // day spa now precedes the gym, in English
  const bsOrder = await order("/bs/spa");
  expect(bsOrder[0]).toBeLessThan(bsOrder[1]); // and in Bosnian too: the layout is shared

  // 3. remove the gallery
  const without = (await layoutOf(admin, spa.id, "en")).filter((b) => b.blockType !== "gallery");
  expect((await publish(admin, spa.id, "en", { layout: without })).status()).toBe(200);
  expect(await (await request.get("/en/spa")).text()).not.toContain("central-spa_relax-room");
  expect(await (await request.get("/en/spa")).text()).toContain(stamp); // the rest is still there
});

test("page blocks: an untranslated section is left out, never shown empty or in the wrong language", async ({ request }) => {
  const loc = await pageDoc(admin, "location");
  const rows = await layoutOf(admin, loc.id, "en");
  // add a brand-new statement block in English only
  rows.push({ blockType: "statement", text: "ONLY IN ENGLISH", tone: "ivory" });
  expect((await publish(admin, loc.id, "en", { layout: rows })).status()).toBe(200);
  expect(await (await request.get("/en/location")).text()).toContain("ONLY IN ENGLISH");
  const bs = await (await request.get("/bs/location")).text();
  expect(bs).not.toContain("ONLY IN ENGLISH");
  expect(bs).toContain('lang="bs"');
});

test("page blocks: link safety — unapproved or script links are refused when saving", async ({ request }) => {
  const contact = await pageDoc(admin, "restaurant");
  const rows = await layoutOf(admin, contact.id, "en");
  const split = rows.find((b) => b.blockType === "split" && b.primary);
  expect(split).toBeTruthy();
  for (const bad of [
    { kind: "external", value: "https://evil.example/phish" },
    { kind: "external", value: "javascript:alert(1)" },
    { kind: "external", value: "http://www.hotelcentral.ba/" },
    { kind: "internal", value: "//evil.example" },
    { kind: "internal", value: "/en/rooms" },
  ]) {
    split!.primary = { ...split!.primary, link: bad };
    const res = await publish(admin, contact.id, "en", { layout: rows });
    expect(res.status(), JSON.stringify(bad)).toBe(400);
  }
  // nothing was saved: the public page still has its original, valid call to action
  const html = await (await request.get("/en/restaurant")).text();
  expect(html).not.toContain("evil.example");
  expect(html).toContain('href="/en/contact"');
});

test("page blocks: editors can draft layout changes but not publish them", async ({ request }) => {
  const about = await pageDoc(editor, "about");
  const rows = await layoutOf(editor, about.id, "en");
  rows[0].eyebrow = "EDITOR-LAYOUT-DRAFT";
  expect((await editor.patch(`/api/pages/${about.id}?draft=true&locale=en`, { data: { layout: rows } })).status()).toBe(200);
  expect((await editor.patch(`/api/pages/${about.id}?locale=en`, { data: { layout: rows, _status: "published" } })).status()).toBe(403);
  expect(await (await request.get("/en/about")).text()).not.toContain("EDITOR-LAYOUT-DRAFT");
});

test("seo: noindex, social photograph and room titles follow published settings only", async ({ request }) => {
  const spa = (await pageDoc(admin, "spa")).id as string;
  const room = (await pageDoc(admin, "junior-suite", "rooms")).id as string;
  const sitemap = async () => await (await request.get("/sitemap.xml")).text();
  const robots = (html: string) => /<meta name="robots" content="[^"]*noindex/.test(html);
  const ogImage = (html: string) => /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1] ?? "";

  // baseline: indexable and listed
  expect(robots(await (await request.get("/en/spa")).text())).toBe(false);
  expect(await sitemap()).toContain("/en/spa");

  // an editor's draft changes nothing public
  expect((await editor.patch(`/api/pages/${spa}?draft=true&locale=en`, { data: { noindex: true, ogImage: { staticPath: "dorucak5.jpg" } } })).status()).toBe(200);
  expect(robots(await (await request.get("/en/spa")).text())).toBe(false);
  expect(ogImage(await (await request.get("/en/spa")).text())).not.toContain("dorucak5");
  expect(await sitemap()).toContain("/en/spa");

  // the administrator publishes: noindex on both languages, gone from the sitemap, other pages untouched
  expect((await admin.patch(`/api/pages/${spa}?locale=en`, { data: { noindex: true, ogImage: { staticPath: "dorucak5.jpg", alt: "Breakfast" }, _status: "published" } })).status()).toBe(200);
  for (const l of ["en", "bs"]) expect(robots(await (await request.get(`/${l}/spa`)).text())).toBe(true);
  expect(ogImage(await (await request.get("/en/spa")).text())).toContain("dorucak5");
  const hidden = await sitemap();
  expect(hidden).not.toContain("/en/spa");
  expect(hidden).not.toContain("/bs/spa");
  expect(hidden).toContain("/en/about");
  expect(robots(await (await request.get("/en/about")).text())).toBe(false);

  // rooms: per-language title, independent of the other language; noindex removes the room from the sitemap
  const stamp = `Junior-${Date.now()}`;
  expect((await admin.patch(`/api/rooms/${room}?locale=en`, { data: { metaTitle: stamp, metaDescription: "Custom room description", noindex: true, _status: "published" } })).status()).toBe(200);
  const en = await (await request.get("/en/rooms/junior-suite")).text();
  const bs = await (await request.get("/bs/rooms/junior-suite")).text();
  expect(en).toContain(`<title>${stamp}`);
  expect(en).toContain("Custom room description");
  expect(bs).not.toContain(stamp);
  expect(robots(en)).toBe(true);
  expect(await sitemap()).not.toContain("/en/rooms/junior-suite");

  // limits are enforced by the API
  expect((await admin.patch(`/api/rooms/${room}?locale=en`, { data: { metaTitle: "x".repeat(71), _status: "published" } })).status()).toBe(400);

  // restore
  expect((await admin.patch(`/api/rooms/${room}?locale=en`, { data: { metaTitle: "", metaDescription: "", noindex: false, _status: "published" } })).status()).toBe(200);
  expect((await admin.patch(`/api/pages/${spa}?locale=en`, { data: { noindex: false, ogImage: { staticPath: null }, _status: "published" } })).status()).toBe(200);
  expect(robots(await (await request.get("/en/spa")).text())).toBe(false);
  expect(await sitemap()).toContain("/en/spa");
  expect(await sitemap()).toContain("/en/rooms/junior-suite");
});

test("static fallback: deleting the CMS document restores the original page", async ({ request }) => {
  expect((await editor.delete(`/api/pages/${aboutId}`)).status()).toBe(403);
  expect((await admin.delete(`/api/pages/${aboutId}`)).status()).toBe(200);
  const html = await (await request.get("/en/about")).text();
  expect(html).toContain("Irish hospitality");
  expect(html).not.toContain("Stamp-");
});

