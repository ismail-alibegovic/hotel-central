import { expect, request as pwRequest, test, type APIRequestContext } from "@playwright/test";

/**
 * Navigation and Footer globals over HTTP: publishing per language, draft isolation, roles, link safety.
 * Runs after cms.spec.ts; restores everything it changes.
 */
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `chrome-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";

async function login(creds: { email: string; password: string }): Promise<APIRequestContext> {
  const anon = await pwRequest.newContext({ baseURL: base });
  const res = await anon.post("/api/users/login", { data: creds });
  expect(res.status(), "login").toBe(200);
  return pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${(await res.json()).token}`, Connection: "close" } });
}

let admin: APIRequestContext;
let editor: APIRequestContext;

/* eslint-disable @typescript-eslint/no-explicit-any */
const getGlobal = async (ctx: APIRequestContext, slug: string, locale: string, draft = true) => (await (await ctx.get(`/api/globals/${slug}?locale=${locale}&draft=${draft}&depth=0`)).json()) as Record<string, any>;
const setGlobal = (ctx: APIRequestContext, slug: string, locale: string, data: object, draft = false) => ctx.post(`/api/globals/${slug}?locale=${locale}${draft ? "&draft=true" : ""}`, { data });
const publishNav = (data: object, locale = "en") => setGlobal(admin, "navigation", locale, { ...data, _status: "published" });
/** The full-screen menu only exists in the DOM while open (see chrome-ui.spec.ts); the footer "Explore" list is server-rendered from the same entries. */
const exploreLinks = (html: string) => {
  const footer = /<footer[\s\S]*<\/footer>/.exec(html)?.[0] ?? "";
  const nav = /<nav[\s\S]*?<\/nav>/.exec(footer)?.[0] ?? "";
  return [...nav.matchAll(/href="(\/(?:en|bs)[^"]*)"/g)].map((m) => m[1]);
};
const previewCookie = async (ctx: APIRequestContext, path: string) => {
  const res = await ctx.get(`/api/preview?path=${encodeURIComponent(path)}`, { maxRedirects: 0 });
  expect([302, 307, 308]).toContain(res.status());
  return res.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]).find((c) => c.startsWith("__prerender_bypass"))!;
};

test.beforeAll(async () => {
  admin = await login(ADMIN);
  expect((await admin.post("/api/users", { data: EDITOR })).status()).toBe(201);
  editor = await login(EDITOR);
});

test("the seeded globals render the same menu and footer as the built-in site", async ({ request }) => {
  const en = await (await request.get("/en")).text();
  expect(exploreLinks(en)).toEqual(["/en/about", "/en/rooms", "/en/spa", "/en/restaurant", "/en/meetings-events", "/en/location", "/en/contact"]);
  expect(en).toContain("Skip to content");
  expect(await (await request.get("/bs")).text()).toContain("Sobe i apartmani");
});

test("admin publishes Bosnian wording: it shows on every Bosnian page and never on English ones", async ({ request }) => {
  const stamp = `Meni-${Date.now()}`;
  const nav = await getGlobal(admin, "navigation", "bs");
  const items = nav.items.map((r: any, i: number) => (i === 2 ? { ...r, label: `Sobe ${stamp}` } : r));
  expect((await publishNav({ menuLabel: stamp, items }, "bs")).status()).toBe(200);
  for (const p of ["/bs", "/bs/spa", "/bs/rooms/junior-suite"]) {
    const html = await (await request.get(p)).text();
    expect(html, p).toContain(stamp);
  }
  for (const p of ["/en", "/en/spa"]) expect(await (await request.get(p)).text(), p).not.toContain(stamp);
  // restore
  const restore = nav.items.map((r: any) => r);
  expect((await publishNav({ menuLabel: nav.menuLabel, items: restore }, "bs")).status()).toBe(200);
  expect(await (await request.get("/bs")).text()).not.toContain(stamp);
});

test("hiding an entry removes it from the menu and the footer; the booking link is untouched; restore brings it back", async ({ request }) => {
  const nav = await getGlobal(admin, "navigation", "en");
  const hide = nav.items.map((r: any) => (r.path === "/restaurant" ? { ...r, visible: false } : r));
  expect((await publishNav({ items: hide })).status()).toBe(200);
  const html = await (await request.get("/en/spa")).text();
  expect(exploreLinks(html)).not.toContain("/en/restaurant");
  expect(html).toContain("live.ipms247.com");
  expect((await publishNav({ items: nav.items })).status()).toBe(200);
  expect(exploreLinks(await (await request.get("/en/spa")).text())).toContain("/en/restaurant");
});

test("an editor's changes are drafts: invisible to the public and to a stolen draft cookie, visible in staff preview", async ({ request }) => {
  const secret = `EDITOR-MENU-${Date.now()}`;
  expect((await setGlobal(editor, "navigation", "en", { menuLabel: secret }, true)).status()).toBe(200);
  expect((await setGlobal(editor, "footer", "en", { rights: secret }, true)).status()).toBe(200);
  expect(await (await request.get("/en/spa")).text()).not.toContain(secret);

  const bypass = await previewCookie(editor, "/en/spa");
  const preview = await (await editor.get("/en/spa", { headers: { cookie: bypass } })).text();
  expect(preview).toContain(secret);
  const thief = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { cookie: bypass } });
  expect(await (await thief.get("/en/spa")).text()).not.toContain(secret);

  // the editor cannot publish it; an administrator who discards it by publishing other wording makes it vanish for good
  expect((await setGlobal(editor, "navigation", "en", { menuLabel: secret, _status: "published" })).status()).toBe(403);
  expect((await setGlobal(editor, "navigation", "en", { menuLabel: secret })).status()).toBe(403); // not even without the draft flag
  expect(await (await request.get("/en/spa")).text()).not.toContain(secret);
  expect((await publishNav({ menuLabel: "Menu" })).status()).toBe(200);
  expect((await setGlobal(admin, "footer", "en", { rights: "All rights reserved.", _status: "published" })).status()).toBe(200);
});

test("editors cannot restructure the menu or change destinations or social links", async ({ request }) => {
  const nav = await getGlobal(admin, "navigation", "en");
  const add = await setGlobal(editor, "navigation", "en", { items: [...nav.items, { label: "Evil", path: "/evil", visible: true }] }, true);
  expect(add.status()).toBe(403);
  const remove = await setGlobal(editor, "navigation", "en", { items: nav.items.slice(1) }, true);
  expect(remove.status()).toBe(403);
  // retarget / hide: dropped by field access, so the request succeeds but nothing changes
  const retarget = nav.items.map((r: any, i: number) => (i === 3 ? { ...r, path: "/elsewhere", visible: false } : r));
  await setGlobal(editor, "navigation", "en", { items: retarget }, true);
  const after = await getGlobal(admin, "navigation", "en");
  expect(after.items.map((r: any) => [r.path, r.visible])).toEqual(nav.items.map((r: any) => [r.path, r.visible]));

  await setGlobal(editor, "footer", "en", { social: [{ label: "X", link: { kind: "external", value: "https://www.facebook.com/x" } }] }, true);
  const foot = await getGlobal(admin, "footer", "en");
  expect(foot.social).toHaveLength(1);
  expect(foot.social[0].link.value).toMatch(/facebook\.com/);
  expect(await (await request.get("/en")).text()).not.toContain("/elsewhere");
});

test("unsafe destinations are refused when saving, for administrators too", async ({ request }) => {
  const nav = await getGlobal(admin, "navigation", "en");
  for (const path of ["https://evil.example", "javascript:alert(1)", "//evil.example", "/en/spa", "spa", "/a/../b"]) {
    const res = await publishNav({ items: nav.items.map((r: any, i: number) => (i === 1 ? { ...r, path } : r)) });
    expect(res.status(), path).toBe(400);
  }
  const bad = await setGlobal(admin, "footer", "en", { social: [{ label: "Evil", link: { kind: "external", value: "https://evil.example/" } }], _status: "published" });
  expect(bad.status()).toBe(400);
  const html = await (await request.get("/en")).text();
  expect(html).not.toContain("evil.example");
});

test("anonymous visitors can neither read drafts nor write", async ({ request }) => {
  expect([401, 403]).toContain((await request.post("/api/globals/navigation", { data: { menuLabel: "anon" } })).status());
  expect([401, 403]).toContain((await request.post("/api/globals/footer?draft=true", { data: { rights: "anon" } })).status());
  const read = await request.get("/api/globals/navigation?locale=en&depth=0");
  expect(JSON.stringify(await read.json())).not.toContain("EDITOR-MENU");
});

test("administrator can publish footer wording; locales are independent", async ({ request }) => {
  const stamp = `Footer-${Date.now()}`;
  expect((await setGlobal(admin, "footer", "bs", { credits: stamp, _status: "published" })).status()).toBe(200);
  expect(await (await request.get("/bs")).text()).toContain(stamp);
  expect(await (await request.get("/en")).text()).not.toContain(stamp);
  const bs = await getGlobal(admin, "footer", "bs");
  expect((await setGlobal(admin, "footer", "bs", { credits: "Fotografije: Hotel Central Sarajevo", _status: "published" })).status()).toBe(200);
  expect(bs.credits).toBe(stamp);
});
