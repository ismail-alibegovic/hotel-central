import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * The administration as a hotel employee meets it: branding, a start page with one big button per task, a room form grouped
 * by task, and the everyday flow Edit → Save Changes → Preview Changes → Publish Changes. Runs at phone, tablet and desktop size.
 * Each project edits its own room so the document locks of one project never block another.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `ux-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const rooms: Record<string, string> = { "admin-ux-desktop": "family-room", "admin-ux-tablet": "single-room", "admin-ux-mobile": "standard-twin-double" };

let api: APIRequestContext;
const roomIds: Record<string, string> = {};

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

const noHorizontalScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

/** Payload re-opens the tab each person used last a moment after the page loads, so keep choosing the tab until it sticks. */
async function openTab(page: Page, name: string, probe: ReturnType<Page["locator"]>) {
  await expect(async () => {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(probe.first()).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20000 });
}

/** Click a save control and wait for the real API round-trip (status labels are on screen before saving). */
async function clickAndWaitForSave(page: Page, selector: string) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/rooms\/[^/?]+/.test(r.url()) && ["PATCH", "POST"].includes(r.request().method()) && !r.url().includes("autosave=true"), { timeout: 8000 }),
      page.locator(selector).click(),
    ]);
    expect(res.status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  for (const slug of Object.values(rooms)) roomIds[slug] = (await (await api.get(`/api/rooms?where[slug][equals]=${slug}&limit=1&depth=0&draft=true`)).json()).docs[0].id as string;
});

test("the sign-in screen is Hotel Central's, not the software's", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page).toHaveTitle(/Hotel Central Website Manager/);
  await expect(page.locator('svg[aria-label="Hotel Central"]').first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon\.svg/);
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/payload/i);
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("administrator's start page: one large button per task, in everyday words", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /^Welcome/ })).toBeVisible();
  for (const [id, title] of [
    ["rooms", "Rooms"],
    ["pages", "Pages"],
    ["media", "Photos & Media"],
    ["offers", "Special Offers"],
    ["homepage", "Homepage"],
    ["chrome", "Navigation & Footer"],
    ["preview", "Website Preview"],
  ]) {
    const card = page.locator(`[data-card="${id}"]`);
    await expect(card.getByRole("heading", { name: title })).toBeVisible();
    for (const b of await card.locator(".hc-button").all()) expect((await b.boundingBox())!.height).toBeGreaterThanOrEqual(44); // touch-friendly
  }
  await expect(page.getByRole("link", { name: "Team members" }).first()).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);
  const text = await page.locator("main, .template-default").first().innerText();
  expect(text).not.toMatch(/\b(slug|SEO|blocks?|globals?|API|database|collection)\b/i);
});

test("editor's start page has no administration and says what an editor can do", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin");
  await expect(page.getByText("You are an editor", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: "Team members" })).toHaveCount(0);
  await expect(page.locator('[data-card="rooms"]')).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("room form: six tabs by task for an administrator, five for an editor; the Google tab uses plain words", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  const tabs = ["1. Basic Information", "2. Room Description", "3. Photos", "4. Amenities", "5. Google & Search Appearance", "6. Advanced Settings"];
  for (const t of tabs) await expect(page.getByRole("button", { name: t, exact: true })).toBeVisible();
  await openTab(page, "5. Google & Search Appearance", page.getByText("Title in Google results"));
  await expect(page.getByText("Hide this page from Google").first()).toBeVisible();
  await openTab(page, "6. Advanced Settings", page.getByText("Page URL"));
  await expect(page.locator('[data-hc-status]')).toBeVisible();
  await expect(page.locator("#action-save-draft")).toContainText("Save Changes");
  await expect(page.locator("#action-save")).toContainText("Publish Changes");
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("editor: no Advanced Settings tab, no Publish button, and the form says an administrator publishes", async ({ page }, testInfo) => {
  const id = roomIds[rooms[testInfo.project.name]];
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/rooms/${id}?locale=en`);
  await expect(page.getByRole("button", { name: "1. Basic Information", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "6. Advanced Settings" })).toHaveCount(0);
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("#action-save-draft")).toContainText("Save Changes");
  await expect(page.locator("[data-hc-status]")).toContainText("An administrator publishes");
});

test("everyday flow: change a room description in Bosnian, save, preview, then publish", async ({ page }, testInfo) => {
  const slug = rooms[testInfo.project.name];
  const id = roomIds[slug];
  const text = `UX opis sobe ${testInfo.project.name} ${Date.now()}`;
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await openTab(page, "2. Room Description", page.locator("#field-description__0__text"));
  await page.locator("#field-description__0__text").fill(text);
  await clickAndWaitForSave(page, "#action-save-draft"); // Save Changes
  await expect(page.locator("[data-hc-status]")).toContainText("Draft");

  // Visitors still see the old text; staff see the change in the preview.
  const before = await (await page.request.get(`/bs/rooms/${slug}`, { headers: { cookie: "" } })).text();
  expect(before).not.toContain(text);
  await page.goto(`/api/preview?path=${encodeURIComponent(`/bs/rooms/${slug}`)}`);
  await expect(page.getByText(text).first()).toBeVisible();

  await page.goto(`/admin/collections/rooms/${id}?locale=bs`);
  await clickAndWaitForSave(page, "#action-save"); // Publish Changes
  const live = await (await pwRequest.newContext({ baseURL: base })).get(`/bs/rooms/${slug}`);
  expect(await live.text()).toContain(text);
});

test("log out and back in again (works on a phone too)", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/logout");
  await expect(page.getByText(/logged out|log back in|login/i).first()).toBeVisible();
  await uiLogin(page, ADMIN);
  await expect(page.getByRole("heading", { name: /^Welcome/ })).toBeVisible();
});
