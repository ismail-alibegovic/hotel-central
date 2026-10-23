import { expect, request as pwRequest, test, type APIRequestContext } from "@playwright/test";

/**
 * The home page over HTTP: per-language text, photographs, drafts and preview, roles, validation. The composition,
 * booking form and links are never touched. Everything is restored at the end.
 */
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `home-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
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
const stamp = Date.now();
const set = (ctx: APIRequestContext, locale: string, data: object, draft = false) => ctx.post(`/api/globals/homepage?locale=${locale}${draft ? "&draft=true" : ""}`, { data });
const publish = (data: object, locale = "en") => set(admin, locale, { ...data, _status: "published" }, false);
const get = async (ctx: APIRequestContext, locale: string) => (await (await ctx.get(`/api/globals/homepage?locale=${locale}&draft=true&depth=0`)).json()) as Record<string, any>;
const bypass = async (ctx: APIRequestContext) => {
  const res = await ctx.get(`/api/preview?path=${encodeURIComponent("/en")}`, { maxRedirects: 0 });
  expect([302, 307, 308]).toContain(res.status());
  return res.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]).find((c) => c.startsWith("__prerender_bypass"))!;
};

test.beforeAll(async () => {
  admin = await login(ADMIN);
  expect((await admin.post("/api/users", { data: EDITOR })).status()).toBe(201);
  editor = await login(EDITOR);
});

test("seeded home page text equals the built-in one: the same tagline, name, booking form and eight sections", async ({ request }) => {
  const html = await (await request.get("/en")).text();
  expect(html).toContain("A distinctive stay in the heart of Sarajevo.");
  expect(html).toContain("live.ipms247.com");
  expect((html.match(/<section/g) ?? []).length).toBeGreaterThanOrEqual(8);
  expect(await (await request.get("/bs")).text()).toContain("Hotel");
});

test("admin publishes Bosnian text and a list: Bosnian home changes, English does not", async ({ request }) => {
  const original = await get(admin, "bs");
  const s = `Bosanski natpis ${stamp}`;
  expect((await publish({ hero: { tagline: s }, spa: { facts: [{ text: `Bazen ${stamp}` }, { text: "Sauna" }] }, hotel: { title: `Naslov\n${stamp}` } }, "bs")).status()).toBe(200);
  const bs = await (await request.get("/bs")).text();
  const en = await (await request.get("/en")).text();
  expect(bs).toContain(s);
  expect(bs).toContain(`Bazen ${stamp}`);
  expect(bs).toContain(`Naslov`);
  expect(bs).not.toContain("Pool ·"); // the built-in English strings are not shown in Bosnian
  expect(en).not.toContain(s);
  expect(en).not.toContain(`Bazen ${stamp}`);
  // restore
  expect((await publish({ hero: { tagline: original.hero.tagline }, spa: { facts: original.spa.facts }, hotel: { title: original.hotel.title } }, "bs")).status()).toBe(200);
  expect(await (await request.get("/bs")).text()).not.toContain(s);
});

test("a photograph can be swapped; alt text is required; the focus point is validated; restore brings the original back", async ({ request }) => {
  const before = await (await request.get("/en")).text();
  expect(before).toContain("%2Fimages%2F3075.jpg");
  // missing alt text, malformed focus point and unknown files are refused
  expect((await publish({ hero: { image: { staticPath: "3064.jpg" } } })).status()).toBe(400);
  expect((await publish({ hero: { image: { staticPath: "3064.jpg", alt: "x", position: "url(javascript:1)" } } })).status()).toBe(400);
  expect((await publish({ hero: { image: { staticPath: "not-on-the-site.jpg", alt: "x" } } })).status()).toBe(400);

  expect((await publish({ hero: { image: { staticPath: "3064.jpg", alt: `New hero ${stamp}`, position: "30% 40%" } } })).status()).toBe(200);
  const after = await (await request.get("/en")).text();
  expect(after).toContain("%2Fimages%2F3064.jpg");
  expect(after).toContain(`alt="New hero ${stamp}"`);
  expect(after).toContain("object-position:30% 40%");
  expect(after).not.toContain("lit at night"); // the old description does not stay with the new photograph

  expect((await publish({ hero: { image: { staticPath: null, upload: null, alt: "", position: "" } } })).status()).toBe(200);
  const restored = await (await request.get("/en")).text();
  expect(restored).toContain("%2Fimages%2F3075.jpg");
  expect(restored).toContain("lit at night");
  expect(restored).not.toContain("object-position:30% 40%");
});

test("search-engine title and description are per language and replace the built-in ones", async ({ request }) => {
  expect((await publish({ metaTitle: `Home ${stamp}`, metaDescription: `Description ${stamp}` })).status()).toBe(200);
  const en = await (await request.get("/en")).text();
  expect(en).toContain(`<title>Home ${stamp}</title>`);
  expect(en).toContain(`content="Description ${stamp}"`);
  const bs = await (await request.get("/bs")).text();
  expect(bs).not.toContain(`Home ${stamp}`);
  expect(bs).toContain("<title>Hotel Central Sarajevo — Butik hotel");
  expect((await publish({ metaTitle: "x".repeat(71) })).status()).toBe(400);
  expect((await publish({ metaTitle: "", metaDescription: "" })).status()).toBe(200);
  expect(await (await request.get("/en")).text()).not.toContain(`Home ${stamp}`);
});

test("an editor's draft: invisible to the public and to a stolen draft cookie, visible in staff preview; not publishable", async ({ request }) => {
  const secret = `EDITOR-HOME-${stamp}`;
  expect((await set(editor, "en", { hero: { tagline: secret } }, true)).status()).toBe(200);
  expect(await (await request.get("/en")).text()).not.toContain(secret);

  const cookie = await bypass(editor);
  const preview = await editor.get("/en", { headers: { cookie } });
  expect(await preview.text()).toContain(secret);
  expect(preview.headers()["cache-control"]).toMatch(/no-store|private|no-cache/);
  const thief = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { cookie } });
  expect(await (await thief.get("/en")).text()).not.toContain(secret);

  expect((await set(editor, "en", { hero: { tagline: secret }, _status: "published" }, true)).status()).toBe(403);
  expect((await set(editor, "en", { hero: { tagline: secret } })).status()).toBe(403);
  expect(await (await request.get("/en")).text()).not.toContain(secret);
  // discard the draft by publishing the built-in text again
  expect((await publish({ hero: { tagline: "A distinctive stay in the heart of Sarajevo." } })).status()).toBe(200);
  expect(await (await request.get("/en")).text()).not.toContain(secret);
});

test("the booking form, links and section structure are the same after edits", async ({ page }) => {
  expect((await publish({ hero: { tagline: `Layout check ${stamp}` } })).status()).toBe(200);
  await page.goto("/en");
  const form = page.locator('form[action*="ipms247"]').first();
  await expect(form).toHaveAttribute("action", "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo");
  for (const name of ["eZ_chkin", "eZ_chkout", "eZ_Nights", "eZ_adult", "eZ_child", "eZ_room", "hidBodyLanguage"]) await expect(form.locator(`input[name="${name}"]`)).toHaveCount(1);
  for (const href of ["/en/about", "/en/spa", "/en/restaurant", "/en/location", "/en/meetings-events"]) await expect(page.locator(`main a[href="${href}"]`).first()).toBeAttached();
  expect((await publish({ hero: { tagline: "A distinctive stay in the heart of Sarajevo." } })).status()).toBe(200);
});
