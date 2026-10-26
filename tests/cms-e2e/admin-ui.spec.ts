import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";
import { clickSave } from "./clickSave";

/**
 * Browser-driven administration (the way hotel staff will actually use it), at 390 px and 1440 px.
 * Credentials come from the runner; the editor account is created through the admin API.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `ui-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };

let api: APIRequestContext;
let aboutId: string;
// Payload locks a document for minutes after someone opens it, and every Playwright project registers its own editor account,
// so the editor tests must never share a page with the admin tests, the API tests (cms.spec.ts) or each other: one page per project.
const editorPages: Record<string, { slug: string; id?: string }> = { "admin-desktop": { slug: "meetings-events" }, "admin-mobile": { slug: "contact" } };
let roomId: string;

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

/**
 * Click a save control and wait for the actual API round-trip (status labels like "Published" are on screen before saving).
 * The page editor is a large form that re-renders (autosave, block rows) while hydrating, which can swallow a click, so
 * the click is retried until the save request really goes out.
 */
async function clickAndWaitForSave(page: Page, selector: string, expectStatus = 200) {
  await expect(async () => {
    await expect(page.locator(selector)).toBeEnabled();
    const [res] = await Promise.all([
      page.waitForResponse((r) => /\/api\/(pages|rooms)\/[^/?]+/.test(r.url()) && ["PATCH", "POST"].includes(r.request().method()) && !r.url().includes("autosave=true"), { timeout: 8000 }),
      clickSave(page, selector),
    ]);
    expect(res.status()).toBe(expectStatus);
  }).toPass({ timeout: 45000 });
}

/** The forms are grouped into tabs and only the open tab is on the page. Payload also re-opens the tab each person used last a moment after
 * loading, so keep choosing the tab until the field we need is really there. */
async function openTab(page: Page, name: string, probe: ReturnType<Page["locator"]>) {
  await expect(async () => {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(probe.first()).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20000 });
}

const noHorizontalScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  // Payload keeps a document locked for minutes after someone leaves it open; the previous project's (different) editor
  // account would otherwise lock this project's admin out with 423, so start every run with no locks.
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  const find = async (c: string, slug: string) => (await (await api.get(`/api/${c}?where[slug][equals]=${slug}&limit=1&depth=0&draft=true`)).json()).docs[0].id as string;
  aboutId = await find("pages", "about");
  for (const p of Object.values(editorPages)) p.id = await find("pages", p.slug);
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
  for (const name of ["Pages", "Rooms", "Photos & Media", "Team members"]) await expect(page.getByText(name, { exact: true }).first()).toBeAttached();
  expect(await noHorizontalScroll(page)).toBe(true);
});

test("editor: sees only their own account, is not offered the team list and cannot create users", async ({ page }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin/account");
  await expect(page.locator("#field-email")).toHaveValue(EDITOR.email);
  await page.goto("/admin");
  await expect(page.getByText("Team members", { exact: true })).toHaveCount(0);
  await page.goto("/admin/collections/users");
  await expect(page.getByText(ADMIN.email)).toHaveCount(0);
  await page.goto("/admin/collections/users/create");
  await expect(page.getByText(/not allowed|unauthorized|permission|not found|nothing found/i).first()).toBeVisible(); // the API refusal itself is covered by the API tests
});

test("editor saves a draft in the UI; the public site is untouched; the Publish button is not offered", async ({ page, request }, testInfo) => {
  const target = editorPages[testInfo.project.name];
  const draftText = `UI draft ${Date.now()}`;
  await uiLogin(page, EDITOR);
  await page.goto(`/admin/collections/pages/${target.id}?locale=en`);
  const field = page.locator("#field-metaTitle");
  await openTab(page, "Google & Search Appearance", field);
  await field.fill(draftText);
  // Autosave (1.5 s) may already have stored the edit by the time the button is clicked, in which case the
  // button has nothing left to do: accept whichever draft write (autosave or manual) completes.
  await expect(async () => {
    const draftWrite = page.waitForResponse((r) => /\/api\/pages\/[^/?]+/.test(r.url()) && r.request().method() === "PATCH" && r.url().includes("draft=true"), { timeout: 8000 });
    await page.locator("#action-save-draft").click({ timeout: 5000 }).catch(() => undefined);
    expect((await draftWrite).status()).toBe(200);
  }).toPass({ timeout: 45000 });

  // persisted as a draft version, not live
  const versions = await (await api.get(`/api/pages/${target.id}?draft=true&locale=en`)).json();
  expect(versions.metaTitle).toBe(draftText);
  expect(await (await request.get(`/en/${target.slug}`)).text()).not.toContain(draftText);

  // Payload asks `access.update` whether `_status: "published"` is allowed; for editors it is not, so the
  // Publish button is not even rendered (the server-side refusal is covered by the API tests).
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("#action-save-draft")).toBeVisible();
  expect(await (await request.get(`/en/${target.slug}`)).text()).not.toContain(draftText);
});

test("admin publishes in Bosnian and English independently via the UI", async ({ page, request }) => {
  const en = `UI EN ${Date.now()}`;
  const bs = `UI BS ${Date.now()}`;
  await uiLogin(page, ADMIN);

  await page.goto(`/admin/collections/pages/${aboutId}?locale=bs`);
  await openTab(page, "Google & Search Appearance", page.locator("#field-metaTitle"));
  await page.locator("#field-metaTitle").fill(bs);
  await clickAndWaitForSave(page, "#action-save");

  await page.goto(`/admin/collections/pages/${aboutId}?locale=en`);
  await openTab(page, "Google & Search Appearance", page.locator("#field-metaTitle"));
  await expect(page.locator("#field-metaTitle")).not.toHaveValue(bs); // BS edit did not leak into EN
  await page.locator("#field-metaTitle").fill(en);
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

test("the only administrator cannot change their own role to Editor or delete their account in the admin", async ({ page }) => {
  // The seeded administrator is the only one on this database (the guard itself is covered path by path in tests/int/last-admin.int.spec.ts).
  const admins = (await (await api.get("/api/users?where[role][equals]=admin&depth=0&limit=10")).json()).docs as { id: string; email: string }[];
  expect(admins.map((a) => a.email)).toEqual([ADMIN.email]);
  const id = admins[0].id;

  await uiLogin(page, ADMIN);
  await page.goto(`/admin/collections/users/${id}`);
  await expect(page.getByText("The website always keeps at least one administrator")).toBeVisible();
  await page.locator("#field-role").click();
  await page.getByText("Editor (can save changes, cannot publish)", { exact: true }).click();
  const [res] = await Promise.all([page.waitForResponse((r) => r.url().includes(`/api/users/${id}`) && r.request().method() === "PATCH"), page.locator("#action-save").click()]);
  expect(res.status()).toBe(409);
  await expect(page.getByText("This is the only administrator account").first()).toBeVisible();

  // Delete from the document's menu, then confirm: refused with the same explanation.
  await page.reload();
  await page.locator(".doc-controls__popup button, button.popup-button").last().click();
  await page.locator("#action-delete").click();
  const [del] = await Promise.all([page.waitForResponse((r) => r.url().includes(`/api/users/${id}`) && r.request().method() === "DELETE"), page.locator("#confirm-action, .confirmation-modal button").last().click()]);
  expect(del.status()).toBe(409);
  await expect(page.getByText("This is the only administrator account").first()).toBeVisible();

  const after = (await (await api.get(`/api/users/${id}?depth=0`)).json()) as { role: string };
  expect(after.role).toBe("admin");
  expect(await noHorizontalScroll(page)).toBe(true);
});
