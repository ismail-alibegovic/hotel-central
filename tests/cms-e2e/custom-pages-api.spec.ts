import { expect, request as pwRequest, test, type APIRequestContext } from "@playwright/test";

/**
 * Pages created in the CMS, over HTTP: localized addresses, draft isolation, secure preview, publish / rename / unpublish /
 * delete reflected immediately (including a previously cached 404), sitemap, hreflang, slug rules, roles, navigation link.
 */
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `cp-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";

async function login(creds: { email: string; password: string }): Promise<APIRequestContext> {
  const anon = await pwRequest.newContext({ baseURL: base });
  const res = await anon.post("/api/users/login", { data: creds });
  expect(res.status(), "login").toBe(200);
  return pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${(await res.json()).token}`, Connection: "close" } });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let admin: APIRequestContext;
let editor: APIRequestContext;
let id: string;
const stamp = Date.now();
const EN = "e2e-lounge";
const BS = "e2e-salon";
const row = (text: string, rowId?: string) => ({ ...(rowId ? { id: rowId } : {}), blockType: "statement", text, tone: "ivory" });

const patch = (ctx: APIRequestContext, locale: string, data: object, draft = false) => ctx.patch(`/api/custom-pages/${id}?locale=${locale}${draft ? "&draft=true" : ""}`, { data });
const doc = async (ctx: APIRequestContext, locale: string) => (await (await ctx.get(`/api/custom-pages/${id}?locale=${locale}&draft=true&depth=0`)).json()) as Record<string, any>;
const status = async (request: APIRequestContext, path: string) => (await request.get(path)).status();
const bypassCookie = async (ctx: APIRequestContext, path: string) => {
  const res = await ctx.get(`/api/preview?path=${encodeURIComponent(path)}`, { maxRedirects: 0 });
  expect([302, 307, 308]).toContain(res.status());
  return res.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]).find((c) => c.startsWith("__prerender_bypass"))!;
};
const sitemap = async (request: APIRequestContext) => await (await request.get("/sitemap.xml")).text();

test.beforeAll(async () => {
  admin = await login(ADMIN);
  expect((await admin.post("/api/users", { data: EDITOR })).status()).toBe(201);
  editor = await login(EDITOR);
});

test("only administrators create pages; anonymous visitors and editors are refused", async ({ request }) => {
  const body = { title: "X", slug: "nope", layout: [row("x")] };
  expect([401, 403]).toContain((await request.post("/api/custom-pages?draft=true&locale=en", { data: body })).status());
  expect((await editor.post("/api/custom-pages?draft=true&locale=en", { data: body })).status()).toBe(403);
  const created = await admin.post("/api/custom-pages?draft=true&locale=en", { data: { title: `Lounge ${stamp}`, slug: EN, layout: [row(`LOUNGE-EN-${stamp}`)] } });
  expect(created.status()).toBe(201);
  id = (await created.json()).doc.id;
});

test("a draft page is not public in any language, and staff preview is the only way to see it", async ({ request }) => {
  expect(await status(request, `/en/${EN}`)).toBe(404);
  expect(await status(request, `/bs/${EN}`)).toBe(404);
  expect(await sitemap(request)).not.toContain(EN);
  const apiRead = await request.get(`/api/custom-pages?where[slug][equals]=${EN}&locale=en`);
  expect((await apiRead.json()).docs ?? []).toHaveLength(0);

  // anonymous cannot start a preview; a malformed or foreign path is refused even for staff
  expect((await request.get(`/api/preview?path=/en/${EN}`, { maxRedirects: 0 })).status()).toBe(401);
  expect((await editor.get("/api/preview?path=https://evil.example/", { maxRedirects: 0 })).status()).toBe(400);

  const bypass = await bypassCookie(editor, `/en/${EN}`);
  const res = await editor.get(`/en/${EN}`, { headers: { cookie: bypass } });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain(`LOUNGE-EN-${stamp}`);
  expect(html).toMatch(/<meta name="robots" content="[^"]*noindex/); // a preview is never indexable
  expect(res.headers()["cache-control"]).toMatch(/no-store|private|no-cache/);
  expect(res.headers()["cache-control"]).not.toMatch(/s-maxage|public/);

  // the draft-mode cookie alone (no staff session) shows nothing
  const thief = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { cookie: bypass } });
  expect((await thief.get(`/en/${EN}`)).status()).toBe(404);
  // and the draft cookie does not reveal an address that exists only in another language
  expect((await editor.get(`/bs/${EN}`, { headers: { cookie: bypass } })).status()).toBe(404);
});

test("publishing in English makes it public immediately — even though a 404 was cached — and only in English", async ({ request }) => {
  expect(await status(request, `/en/${EN}`)).toBe(404); // cached 404 from the previous test
  expect((await patch(admin, "en", { title: `Lounge ${stamp}`, slug: EN, _status: "published" })).status()).toBe(200);
  const res = await request.get(`/en/${EN}`);
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain(`LOUNGE-EN-${stamp}`);
  expect(html).toContain(`<title>Lounge ${stamp} — Hotel Central`);
  expect(html).toMatch(new RegExp(`<link rel="canonical" href="[^"]*/en/${EN}"`));
  // only English exists: no Bosnian alternate that would point at a 404
  expect(html).not.toMatch(/hreflang="bs-BA"/);
  expect(await status(request, `/bs/${EN}`)).toBe(404);
  const map = await sitemap(request);
  expect(map).toContain(`/en/${EN}`);
  expect(map).not.toContain(`/bs/${EN}`);
});

test("Bosnian gets its own address; alternates, sitemap and isolation follow", async ({ request }) => {
  const en = await doc(admin, "en");
  const rowId = en.layout[0].id;
  expect((await patch(admin, "bs", { title: `Salon ${stamp}`, slug: BS, layout: [row(`SALON-BS-${stamp}`, rowId)], _status: "published" })).status()).toBe(200);

  const bs = await (await request.get(`/bs/${BS}`)).text();
  expect(bs).toContain(`SALON-BS-${stamp}`);
  expect(bs).toContain('lang="bs"');
  expect(bs).not.toContain(`LOUNGE-EN-${stamp}`);
  expect(await status(request, `/bs/${EN}`)).toBe(404); // the English address does not exist in Bosnian
  expect(await status(request, `/en/${BS}`)).toBe(404);

  const enHtml = await (await request.get(`/en/${EN}`)).text();
  expect(enHtml).toMatch(new RegExp(`<link rel="alternate" hrefLang="bs-BA" href="[^"]*/bs/${BS}"`, "i"));
  expect(enHtml).toMatch(new RegExp(`<link rel="alternate" hrefLang="en" href="[^"]*/en/${EN}"`, "i"));
  expect(bs).toMatch(new RegExp(`<link rel="canonical" href="[^"]*/bs/${BS}"`, "i"));

  const map = await sitemap(request);
  expect(map).toContain(`/en/${EN}`);
  expect(map).toContain(`/bs/${BS}`);
  expect(map).not.toContain(`/bs/${EN}`);
  expect(map).not.toContain(`/en/${BS}`);
});

test("an editor's draft edit never reaches the public page", async ({ request }) => {
  const secret = `EDITOR-PAGE-DRAFT-${stamp}`;
  const en = await doc(admin, "en");
  expect((await patch(editor, "en", { layout: [row(secret, en.layout[0].id)] }, true)).status()).toBe(200);
  expect(await (await request.get(`/en/${EN}`)).text()).not.toContain(secret);
  const bypass = await bypassCookie(editor, `/en/${EN}`);
  expect(await (await editor.get(`/en/${EN}`, { headers: { cookie: bypass } })).text()).toContain(secret);
  // not publishable by an editor, with or without the draft flag; address change is silently dropped
  expect((await patch(editor, "en", { _status: "published" })).status()).toBe(403);
  expect((await patch(editor, "en", { layout: [row(secret, en.layout[0].id)], _status: "published" }, true)).status()).toBe(403);
  await patch(editor, "en", { slug: "hijacked" }, true);
  expect((await doc(admin, "en")).slug).toBe(EN);
  expect(await status(request, "/en/hijacked")).toBe(404);
  // restore the draft to the published text
  await patch(admin, "en", { layout: [row(`LOUNGE-EN-${stamp}`, en.layout[0].id)], _status: "published" });
  expect(await (await request.get(`/en/${EN}`)).text()).toContain(`LOUNGE-EN-${stamp}`);
});

test("address rules: reserved, malformed and duplicate addresses are refused when publishing", async () => {
  const en = await doc(admin, "en");
  for (const slug of ["about", "rooms", "admin", "api", "en", "Bad Slug", "a/b", "čokolada", "x".repeat(61)]) {
    const res = await patch(admin, "en", { slug, layout: [row("x", en.layout[0].id)], _status: "published" });
    expect(res.status(), slug).toBe(400);
  }
  // a second page cannot take an English address that is in use…
  const other = await admin.post("/api/custom-pages?locale=en", { data: { title: "Other", slug: EN, layout: [row("x")], _status: "published" } });
  expect(other.status()).toBe(400);
  // …but it may use the other language's address in English (addresses are unique per language)
  const ok = await admin.post("/api/custom-pages?locale=en", { data: { title: "Other", slug: BS, layout: [row("x")], _status: "published" } });
  expect(ok.status()).toBe(201);
  expect((await admin.delete(`/api/custom-pages/${(await ok.json()).doc.id}`)).status()).toBe(200);
  expect((await doc(admin, "en")).slug).toBe(EN);
});

test("hidden from search engines: noindex in the page and out of the sitemap; restoring brings it back", async ({ request }) => {
  expect((await patch(admin, "en", { noindex: true, _status: "published" })).status()).toBe(200);
  expect(await (await request.get(`/en/${EN}`)).text()).toMatch(/<meta name="robots" content="[^"]*noindex/);
  expect(await (await request.get(`/bs/${BS}`)).text()).toMatch(/<meta name="robots" content="[^"]*noindex/);
  const map = await sitemap(request);
  expect(map).not.toContain(`/en/${EN}`);
  expect(map).not.toContain(`/bs/${BS}`);
  expect((await patch(admin, "en", { noindex: false, _status: "published" })).status()).toBe(200);
  expect(await sitemap(request)).toContain(`/en/${EN}`);
});

test("a page can be linked from the menu and footer; the existing entries are untouched", async ({ request }) => {
  const nav = await (await admin.get("/api/globals/navigation?locale=en&draft=true&depth=0")).json();
  const added = [...nav.items, { label: `Lounge ${stamp}`, path: `/${EN}`, visible: true }];
  expect((await admin.post("/api/globals/navigation?locale=en", { data: { items: added, _status: "published" } })).status()).toBe(200);
  const withRow = await (await admin.get("/api/globals/navigation?locale=en&draft=true&depth=0")).json();
  const bsRows = withRow.items.map((r: any, i: number) => (i === withRow.items.length - 1 ? { ...r, label: `Salon ${stamp}`, path: `/${BS}` } : r));
  expect((await admin.post("/api/globals/navigation?locale=bs", { data: { items: bsRows, _status: "published" } })).status()).toBe(200);

  const footer = (html: string) => /<footer[\s\S]*<\/footer>/.exec(html)?.[0] ?? "";
  const en = footer(await (await request.get("/en/spa")).text());
  const bs = footer(await (await request.get("/bs/spa")).text());
  expect(en).toContain(`href="/en/${EN}"`);
  expect(bs).toContain(`href="/bs/${BS}"`);
  for (const p of ["about", "rooms", "spa", "restaurant", "meetings-events", "location", "contact"]) expect(en).toContain(`href="/en/${p}"`);

  // restore the menu
  expect((await admin.post("/api/globals/navigation?locale=en", { data: { items: nav.items, _status: "published" } })).status()).toBe(200);
  const restored = await (await admin.get("/api/globals/navigation?locale=bs&draft=true&depth=0")).json();
  expect((await admin.post("/api/globals/navigation?locale=bs", { data: { items: restored.items.slice(0, nav.items.length), _status: "published" } })).status()).toBe(200);
  expect(footer(await (await request.get("/en/spa")).text())).not.toContain(`href="/en/${EN}"`);
});

test("renaming an address: the old one stops working at once, the new one works", async ({ request }) => {
  expect(await status(request, `/en/${EN}`)).toBe(200);
  expect((await patch(admin, "en", { slug: `${EN}-2`, _status: "published" })).status()).toBe(200);
  expect(await status(request, `/en/${EN}`)).toBe(404);
  expect(await status(request, `/en/${EN}-2`)).toBe(200);
  expect((await sitemap(request))).toContain(`/en/${EN}-2`);
  expect((await patch(admin, "en", { slug: EN, _status: "published" })).status()).toBe(200);
  expect(await status(request, `/en/${EN}`)).toBe(200);
  expect(await status(request, `/en/${EN}-2`)).toBe(404);
});

test("unpublishing removes the page in every language and from the sitemap; republishing restores it", async ({ request }) => {
  expect((await patch(admin, "en", { _status: "draft" })).status()).toBe(200);
  expect(await status(request, `/en/${EN}`)).toBe(404);
  expect(await status(request, `/bs/${BS}`)).toBe(404);
  const map = await sitemap(request);
  expect(map).not.toContain(`/en/${EN}`);
  expect(map).not.toContain(`/bs/${BS}`);
  expect((await patch(admin, "en", { _status: "published" })).status()).toBe(200);
  expect(await status(request, `/en/${EN}`)).toBe(200);
  expect(await status(request, `/bs/${BS}`)).toBe(200);
});

test("existing pages are unaffected; unknown addresses are plain 404s; deleting is administrator-only and final", async ({ request }) => {
  for (const p of ["/en/about", "/en/rooms", "/en/spa", "/bs/contact", "/en/rooms/junior-suite"]) expect(await status(request, p), p).toBe(200);
  for (const p of ["/en/does-not-exist", "/bs/does-not-exist", "/en/Bad_Slug", "/en/a%2Fb"]) expect(await status(request, p), p).toBe(404);
  expect((await editor.delete(`/api/custom-pages/${id}`)).status()).toBe(403);
  expect((await admin.delete(`/api/custom-pages/${id}`)).status()).toBe(200);
  expect(await status(request, `/en/${EN}`)).toBe(404);
  expect(await status(request, `/bs/${BS}`)).toBe(404);
  const map = await sitemap(request);
  expect(map).not.toContain(EN);
  expect(map).not.toContain(BS);
  expect(map).toContain("/en/about");
});
