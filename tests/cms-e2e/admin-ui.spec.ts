import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Browser-driven administration (the way hotel staff will actually use it), at 390 px and 1440 px.
 * Credentials come from the runner; the editor account is created through the admin API.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `ui-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };

let api: APIRequestContext;
let aboutId: string;
let roomId: string;

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

/** Click a save control and wait for the actual API round-trip (status labels like "Published" are on screen before saving). */
async function clickAndWaitForSave(page: Page, selector: string, expectStatus = 200) {
  const [res] = await Promise.all([
    page.waitForResponse((r) => /\/api\/(pages|rooms)\/[^/?]+/.test(r.url()) && ["PATCH", "POST"].includes(r.request().method()) && !r.url().includes("autosave=true")),
    page.locator(selector).click(),
  ]);
  expect(res.status()).toBe(expectStatus);
}

const noHorizontalScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  const find = async (c: string, slug: string) => (await (await api.get(`/api/${c}?where[slug][equals]=${slug}&limit=1&depth=0&draft=true`)).json()).docs[0].id as string;
  aboutId = await find("pages", "about");
  roomId = await find("rooms", "junior-suite");
});

test("login screen is usable without horizontal scrolling and rejects bad credentials", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.locator("#field-email")).toBeVisible();
  await expect(page.locator("#field-password")).toBeVisible();
  expect(await noHorizontalScroll(page)).toBe(true);
  await page.locator("#field-email").fill(ADMIN.email);
  await page.locator("#field-password").fill("definitely-wrong");
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByText(/incorrect|invalid|error/i).first()).toBeVisible();
});

test("anonymous visitors cannot open editing screens", async ({ page }) => {
  await page.goto(`/admin/collections/pages/${aboutId}`);
  await expect(page).toHaveURL(/\/login/);
});

test("admin sees every collection; the dashboard fits the screen", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin");
  for (const name of ["Pages", "Rooms", "Media", "Users"]) await expect(page.getByText(name, { exact: true }).first()).toBeAttached();
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("editor: sees only their own account and cannot create users", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin/collections/users");
  await expect(page.getByText(EDITOR.email).first()).toBeVisible();
  await expect(page.getByText(ADMIN.email)).toHaveCount(0);
  await page.goto("/admin/collections/users/create");
  await expect(page.getByText(/not allowed|unauthorized|permission/i).first()).toBeVisible();
});

test("editor saves a draft in the UI; the public site is untouched; the Publish button is not offered", async ({ page, request }) => {
  const draftText = `UI draft ${Date.now()}`;
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/pages/${aboutId}?locale=en`);
  const field = page.locator("#field-heroEyebrow");
  await expect(field).toBeVisible();
  await field.fill(draftText);
  await clickAndWaitForSave(page, "#action-save-draft");

  // persisted as a draft version, not live
  const versions = await (await api.get(`/api/pages/${aboutId}?draft=true&locale=en`)).json();
  expect(versions.heroEyebrow).toBe(draftText);
  expect(await (await request.get("/en/about")).text()).not.toContain(draftText);

  // Payload asks `access.update` whether `_status: "published"` is allowed; for editors it is not, so the
  // Publish button is not even rendered (the server-side refusal is covered by the API tests).
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("#action-save-draft")).toBeVisible();
  expect(await (await request.get("/en/about")).text()).not.toContain(draftText);
});

test("admin publishes in Bosnian and English independently via the UI", async ({ page, request }) => {
  const en = `UI EN ${Date.now()}`;
  const bs = `UI BS ${Date.now()}`;
  await uiLogin(page, ADMIN);

  await page.goto(`/admin/collections/pages/${aboutId}?locale=bs`);
  await page.locator("#field-heroEyebrow").fill(bs);
  await clickAndWaitForSave(page, "#action-save");

  await page.goto(`/admin/collections/pages/${aboutId}?locale=en`);
  await expect(page.locator("#field-heroEyebrow")).not.toHaveValue(bs); // BS edit did not leak into EN
  await page.locator("#field-heroEyebrow").fill(en);
  await clickAndWaitForSave(page, "#action-save");

  const enHtml = await (await request.get("/en/about")).text();
  const bsHtml = await (await request.get("/bs/about")).text();
  expect(enHtml).toContain(en);
  expect(enHtml).not.toContain(bs);
  expect(bsHtml).toContain(bs);
  expect(bsHtml).not.toContain(en);
});

test("room editing persists and leaves the booking link intact", async ({ page, request }) => {
  const name = `UI Suite ${Date.now()}`;
  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/rooms/${roomId}?locale=en`);
  await page.locator("#field-name").fill(name);
  await clickAndWaitForSave(page, "#action-save");
  const html = await (await request.get("/en/rooms/junior-suite")).text();
  expect(html).toContain(name);
  expect(html).toContain("roomtypeunkid=18019000000000000010");
});
