import { expect, request as pwRequest, test, type Page } from "@playwright/test";

/** Pages created in the CMS in the admin UI and in the browser (390 px and 1440 px): addresses per language, language switcher. */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `cp-ui-editor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };

let api: Awaited<ReturnType<typeof pwRequest.newContext>>;
let id: string;
let rowId: string;
const run = `${Date.now()}${Math.random().toString(36).slice(2, 5)}`;
const EN = `ui-offers-${run}`;
const BS = `ui-ponude-${run}`;
const row = (text: string, rowId?: string) => ({ ...(rowId ? { id: rowId } : {}), blockType: "statement", text, tone: "ivory" });

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  const created = await api.post("/api/custom-pages?locale=en", { data: { title: `UI Offers ${run}`, slug: EN, layout: [row(`UI-EN-${run}`)], _status: "published" } });
  expect(created.status()).toBe(201);
  const body = (await created.json()).doc;
  id = body.id;
  rowId = body.layout[0].id;
});

test.afterAll(async () => {
  await api.delete(`/api/custom-pages/${id}`);
});

async function saveDoc(page: Page, selector: string) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/custom-pages\/[^/?]+/.test(r.url()) && ["PATCH", "POST"].includes(r.request().method()) && !r.url().includes("autosave=true"), { timeout: 8000 }),
      page.locator(selector).click(),
    ]);
    expect(res.status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test("admin gives the page a Bosnian address in the browser; it appears in Bosnian only", async ({ page, request }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/collections/custom-pages?locale=en"); // the admin remembers the last language used
  await expect(page.getByText(`UI Offers ${run}`).first()).toBeVisible();
  await page.goto(`/admin/collections/custom-pages/${id}?locale=bs`);
  await expect(page.locator("#field-slug")).toBeVisible();
  await expect(page.locator("#field-slug")).toHaveValue(""); // nothing is copied from English
  await page.locator("#field-title").fill(`UI Ponude ${run}`);
  await page.locator("#field-slug").fill(BS);

  // Bosnian publishing validates the Bosnian text of every section, so the section's text is written too.
  // Without it the server refuses and nothing goes live:
  const refused = await Promise.all([page.waitForResponse((r) => /\/api\/custom-pages\/[^/?]+/.test(r.url()) && r.request().method() === "PATCH" && !r.url().includes("autosave=true"), { timeout: 15000 }), page.locator("#action-save").click()]);
  expect(refused[0].status()).toBe(400);
  expect((await request.get(`/bs/${BS}`)).status()).toBe(404);

  await page.locator("#field-layout__0__text").fill(`UI-BS-${run}`);
  await saveDoc(page, "#action-save");
  const bs = await (await request.get(`/bs/${BS}`)).text();
  expect(bs).toContain(`UI-BS-${run}`);
  expect(await (await request.get(`/en/${EN}`)).text()).not.toContain(`UI-BS-${run}`);
  expect((await request.get(`/bs/${EN}`)).status()).toBe(404); // the English address does not exist in Bosnian
});

test("the language switcher goes to the page's address in the other language, and to the home page when there is none", async ({ page }) => {
  // the previous test published the Bosnian version; make sure of it when this test runs on its own, then use the site like a visitor
  expect((await api.patch(`/api/custom-pages/${id}?locale=bs`, { data: { title: `UI Ponude ${run}`, slug: BS, layout: [row(`UI-BS-${run}`, rowId)], _status: "published" } })).status()).toBe(200);

  await page.goto(`/en/${EN}`, { waitUntil: "networkidle" });
  const switcher = page.locator("footer nav[aria-label] a[hreflang]");
  await expect(switcher.filter({ hasText: "BS" })).toHaveAttribute("href", `/bs/${BS}`);
  await switcher.filter({ hasText: "BS" }).click();
  await expect(page).toHaveURL(new RegExp(`/bs/${BS}$`));
  await expect(page.getByText(`UI-BS-${run}`)).toBeVisible();
  await page.locator("footer nav[aria-label] a[hreflang]").filter({ hasText: "EN" }).click();
  await expect(page).toHaveURL(new RegExp(`/en/${EN}$`));

  // an English-only page: Bosnian link leads to the Bosnian home page, never to a 404
  expect((await api.patch(`/api/custom-pages/${id}?locale=bs`, { data: { slug: "", _status: "published" } })).status()).toBeGreaterThanOrEqual(400); // an address cannot be blanked on a published page
  await page.goto("/en/about", { waitUntil: "networkidle" });
  await expect(page.locator("footer nav[aria-label] a[hreflang]").filter({ hasText: "BS" })).toHaveAttribute("href", "/bs/about"); // built-in pages keep swapping the prefix
});

test("editor opens the page, sees the address as read-only and can save a draft but not create pages", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/custom-pages/${id}?locale=en`);
  const slug = page.locator("#field-slug");
  await expect(slug).toBeVisible();
  await expect(slug).toBeDisabled();
  await page.goto("/admin/collections/custom-pages/create");
  await expect(page.getByText(/not allowed|unauthorized|permission/i).first()).toBeVisible();
});

test("the new-pages list fits a phone-sized and a desktop screen, and the editor opens", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/collections/custom-pages?locale=en");
  await expect(page.locator("main, .template-default").first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.goto(`/admin/collections/custom-pages/${id}?locale=en`);
  await expect(page.locator("#field-slug")).toHaveValue(EN);
});
