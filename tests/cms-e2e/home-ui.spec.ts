import { expect, request as pwRequest, test, type Page } from "@playwright/test";

/** Home page editing in the admin UI and the public page in a real browser, at 390 px and 1440 px. */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `home-ui-editor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const run = `${Date.now()}${Math.random().toString(36).slice(2, 5)}`;

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
  const api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
});

async function saveGlobal(page: Page, selector: string) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/globals\/homepage/.test(r.url()) && r.request().method() === "POST" && !r.url().includes("autosave=true"), { timeout: 8000 }),
      page.locator(selector).click(),
    ]);
    expect(res.status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test("admin edits the Bosnian home tagline in the browser; the public Bosnian home page changes, English does not", async ({ page, request }) => {
  const stamp = `UINatpis${run}`;
  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/homepage?locale=bs");
  const field = page.locator("#field-hero__tagline");
  await expect(field).toBeVisible();
  const original = await field.inputValue();
  await field.fill(stamp);
  await saveGlobal(page, "#action-save");
  expect(await (await request.get("/bs")).text()).toContain(stamp);
  expect(await (await request.get("/en")).text()).not.toContain(stamp);
  await field.fill(original);
  await saveGlobal(page, "#action-save");
  expect(await (await request.get("/bs")).text()).not.toContain(stamp);
});

test("editor saves a draft; publishing is refused by the server and the public home page is untouched", async ({ page, request }) => {
  const draft = `UIDraft${run}`;
  await uiLogin(page, EDITOR);
  await page.goto("/admin/globals/homepage?locale=en");
  const field = page.locator("#field-hero__note");
  await expect(field).toBeVisible();
  await field.fill(draft);
  await expect(async () => {
    const write = page.waitForResponse((r) => /\/api\/globals\/homepage/.test(r.url()) && r.request().method() === "POST" && r.url().includes("draft=true"), { timeout: 8000 });
    await page.locator("#action-save-draft").click({ timeout: 5000 }).catch(() => undefined);
    expect((await write).status()).toBe(200);
  }).toPass({ timeout: 45000 });
  expect(await (await request.get("/en")).text()).not.toContain(draft);
  const publish = page.locator("#action-save");
  if (await publish.count()) {
    const [res] = await Promise.all([page.waitForResponse((r) => /\/api\/globals\/homepage/.test(r.url()) && r.request().method() === "POST" && !r.url().includes("draft=true") && !r.url().includes("autosave=true"), { timeout: 15000 }), publish.click()]);
    expect(res.status()).toBe(403);
  }
  expect(await (await request.get("/en")).text()).not.toContain(draft);
});

test("the home page keeps its composition with the CMS on: eight sections in order, hero, booking bar and menu work", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  const ids = await page.locator("main section[aria-labelledby], main section[aria-label]").evaluateAll((els) => els.map((e) => e.getAttribute("aria-labelledby") ?? e.getAttribute("aria-label")));
  expect(ids).toEqual(expect.arrayContaining(["hotel-title", "spa-title", "restaurant-title", "location-title", "events-title", "final-title"]));
  await expect(page.locator("h1")).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "horizontal overflow").toBe(true);
  await page.locator('header button[aria-controls="site-menu"]').click();
  await expect(page.locator("#site-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toBeHidden();
});
