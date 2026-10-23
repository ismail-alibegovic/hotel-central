import { expect, request as pwRequest, test, type Page } from "@playwright/test";

/** Navigation + footer in the admin UI (390 px and 1440 px) and the result on the public site, including the mobile menu. */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `chrome-ui-editor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };

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

/** Wait for the real global save round-trip (autosave excluded) and retry the click until it goes out. */
async function saveGlobal(page: Page, selector: string) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/globals\/(navigation|footer)/.test(r.url()) && r.request().method() === "POST" && !r.url().includes("autosave=true"), { timeout: 8000 }),
      page.locator(selector).click(),
    ]);
    expect(res.status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test("admin edits the Bosnian menu wording in the browser; the public Bosnian site changes, English does not", async ({ page, request }) => {
  const stamp = `UIMeni${Date.now()}`;
  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/navigation?locale=bs");
  const field = page.locator("#field-menuLabel");
  await expect(field).toBeVisible();
  const original = await field.inputValue();
  await field.fill(stamp);
  await saveGlobal(page, "#action-save");
  expect(await (await request.get("/bs/spa")).text()).toContain(stamp);
  expect(await (await request.get("/en/spa")).text()).not.toContain(stamp);

  await field.fill(original);
  await saveGlobal(page, "#action-save");
  expect(await (await request.get("/bs/spa")).text()).not.toContain(stamp);
});

test("editor saves a draft in the browser; publishing is refused by the server and the public site is untouched", async ({ page, request }) => {
  const draft = `UIDraft${Date.now()}`;
  await uiLogin(page, EDITOR);
  await page.goto("/admin/globals/footer?locale=en");
  const field = page.locator("#field-credits");
  await expect(field).toBeVisible();
  await field.fill(draft);
  await expect(async () => {
    const write = page.waitForResponse((r) => /\/api\/globals\/footer/.test(r.url()) && r.request().method() === "POST" && r.url().includes("draft=true"), { timeout: 8000 });
    await page.locator("#action-save-draft").click({ timeout: 5000 }).catch(() => undefined);
    expect((await write).status()).toBe(200);
  }).toPass({ timeout: 45000 });
  expect(await (await request.get("/en")).text()).not.toContain(draft);

  // Payload cannot hide the Publish button for globals; the server refuses it, which is what protects the site.
  const publish = page.locator("#action-save");
  if (await publish.count()) {
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/globals\/footer/.test(r.url()) && r.request().method() === "POST" && !r.url().includes("draft=true") && !r.url().includes("autosave=true"), { timeout: 15000 }),
      publish.click(),
    ]);
    expect(res.status()).toBe(403);
  }
  expect(await (await request.get("/en")).text()).not.toContain(draft);
});

test.describe("public menu behaviour with the CMS on", () => {
  test("the full-screen menu opens, lists every page, closes with Escape and on navigation", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" });
    const toggle = page.locator('header button[aria-controls="site-menu"]');
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const menu = page.locator("#site-menu");
    await expect(menu).toBeVisible();
    await expect(menu.locator("nav ol a")).toHaveCount(8);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await toggle.click();
    await menu.locator('nav a[href="/en/spa"]').click();
    await expect(page).toHaveURL(/\/en\/spa$/);
    await expect(page.locator("#site-menu")).toHaveCount(0);
  });

  test("a changed menu entry appears in the mobile/desktop menu and keeps its link", async ({ page }) => {
    const ctx = await pwRequest.newContext({ baseURL: base });
    const token = (await (await ctx.post("/api/users/login", { data: ADMIN })).json()).token;
    const api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
    const nav = await (await api.get("/api/globals/navigation?locale=en&draft=true&depth=0")).json();
    const stamp = `Wellness${Date.now()}`;
    const items = nav.items.map((r: { path: string; label: string }) => (r.path === "/spa" ? { ...r, label: stamp } : r));
    expect((await api.post("/api/globals/navigation?locale=en", { data: { items, _status: "published" } })).status()).toBe(200);
    try {
      await page.goto("/en/contact", { waitUntil: "networkidle" });
      await page.locator('header button[aria-controls="site-menu"]').click();
      await expect(page.locator('#site-menu nav a[href="/en/spa"]')).toContainText(stamp);
    } finally {
      await api.post("/api/globals/navigation?locale=en", { data: { items: nav.items, _status: "published" } });
    }
  });
});
