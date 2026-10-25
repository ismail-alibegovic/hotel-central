import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Draft → preview, the way hotel staff use it: open a page, open the preview next to the form, type, and the preview must show what
 * was typed within a few seconds, in the language and on the page being edited, without anything being published.
 * The preview was found to miss about every other edit (Payload's own "document saved" signal is dropped when the form changes
 * again right after an automatic save), so every case below repeats the edit.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `preview-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const LABEL = /Reception — address and opening hours/;

let api: APIRequestContext;
let contactId: string;

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

/** Payload shows the preview INSTEAD of the form on a screen narrower than 1024 px, and next to the form on a wide one. */
const narrow = (info: { project: { use: { viewport?: { width: number } | null } } }) => (info.project.use.viewport?.width ?? 1440) <= 1024;

async function openPreview(page: Page, locale: "en" | "bs") {
  await page.goto(`/admin/collections/pages/${contactId}?locale=${locale}`);
  await page.waitForLoadState("networkidle");
  const toggler = page.locator("#live-preview-toggler");
  await expect(toggler).toBeVisible();
  // Payload re-opens the preview a moment after loading when the person had it open last time, so look before clicking.
  await page.waitForTimeout(1500);
  if (!(await page.locator("#live-preview-iframe").isVisible())) await toggler.click();
  const frame = page.frameLocator("#live-preview-iframe");
  await expect(frame.locator("body")).toContainText(/CONTACT|KONTAKT/i, { timeout: 20000 });
  return frame;
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  contactId = (await (await api.get("/api/pages?where[slug][equals]=contact&limit=1&depth=0&draft=true")).json()).docs[0].id as string;
});

test("the preview shows every edit within seconds, edit after edit, without saving by hand", async ({ page }, testInfo) => {
  test.skip(narrow(testInfo), "the side-by-side preview needs a wide screen");
  await uiLogin(page, ADMIN);
  const frame = await openPreview(page, "en");
  const field = page.getByLabel(LABEL).first();
  const original = await field.inputValue();
  try {
    for (const n of [1, 2, 3, 4]) {
      const marker = `PV-EN-${Date.now()}-${n}`;
      await field.fill(marker);
      await expect(frame.locator("body")).toContainText(marker, { timeout: 15000 });
      await expect(page.locator("[data-hc-preview-bar]")).toContainText(/Updated at \d\d:\d\d:\d\d/);
    }
  } finally {
    await field.fill(original);
    await expect(frame.locator("body")).toContainText(original, { timeout: 15000 });
  }
});

test("the preview matches the language and the page being edited (Bosnian shows the Bosnian page)", async ({ page }, testInfo) => {
  test.skip(narrow(testInfo), "the side-by-side preview needs a wide screen");
  await uiLogin(page, ADMIN);
  const frame = await openPreview(page, "bs");
  await expect(page.locator("#live-preview-iframe")).toHaveAttribute("src", /path=%2Fbs%2Fcontact/);
  const field = page.getByLabel(LABEL).first();
  const original = await field.inputValue();
  const marker = `PV-BS-${Date.now()}`;
  try {
    await field.fill(marker);
    await expect(frame.locator("body")).toContainText(marker, { timeout: 15000 });
    await expect(frame.locator("html")).toHaveAttribute("lang", "bs");
    // The English page is not affected, and nothing of this draft is public.
    const guest = await pwRequest.newContext({ baseURL: base });
    expect(await (await guest.get("/bs/contact")).text()).not.toContain(marker);
    expect(await (await guest.get("/en/contact")).text()).not.toContain(marker);
  } finally {
    await field.fill(original);
    await expect(frame.locator("body")).toContainText(original, { timeout: 15000 });
  }
});

test("'Refresh preview' reloads the preview and says when; 'Save Changes' also updates it", async ({ page }, testInfo) => {
  test.skip(narrow(testInfo), "the side-by-side preview needs a wide screen");
  await uiLogin(page, ADMIN);
  const frame = await openPreview(page, "en");
  const bar = page.locator("[data-hc-preview-bar]");
  await expect(bar).toContainText("saved draft");
  const field = page.getByLabel(LABEL).first();
  const original = await field.inputValue();
  try {
    const marker = `PV-SAVE-${Date.now()}`;
    await field.fill(marker);
    await page.locator("#action-save-draft").click();
    await expect(frame.locator("body")).toContainText(marker, { timeout: 15000 });
    await page.getByRole("button", { name: "Refresh preview" }).click();
    await expect(bar).toContainText(/Updated at/, { timeout: 15000 });
    await expect(frame.locator("body")).toContainText(marker);
  } finally {
    // Put the text back with "Save Changes": Payload's automatic save compares with the last text IT saw, so typing back the very
    // text it started with straight after a manual save is not noticed by it.
    await field.fill(original);
    await page.locator("#action-save-draft").click();
    await expect(frame.locator("body")).toContainText(original, { timeout: 15000 });
  }
});

test("an editor can preview a draft too; the preview needs a signed-in staff member", async ({ page }, testInfo) => {
  test.skip(narrow(testInfo), "the side-by-side preview needs a wide screen");
  // Anonymous visitors cannot start a preview.
  const guest = await pwRequest.newContext({ baseURL: base });
  expect((await guest.get("/api/preview?path=%2Fen%2Fcontact", { maxRedirects: 0 })).status()).toBe(401);

  await uiLogin(page, EDITOR);
  const frame = await openPreview(page, "en");
  const field = page.getByLabel(LABEL).first();
  const original = await field.inputValue();
  const marker = `PV-EDITOR-${Date.now()}`;
  try {
    await field.fill(marker);
    await expect(frame.locator("body")).toContainText(marker, { timeout: 15000 });
    await expect(page.locator("#action-save")).toHaveCount(0); // an editor is still never offered Publish
  } finally {
    await field.fill(original);
    await expect(frame.locator("body")).toContainText(original, { timeout: 15000 });
  }
});

test("on a narrow screen the form comes first; the preview opens instead of the form, shows the saved draft, and closes again", async ({ page }, testInfo) => {
  test.skip(!narrow(testInfo), "this is the narrow-screen layout");
  await uiLogin(page, ADMIN);
  const field = async () => page.getByLabel(LABEL).first();
  await page.goto(`/admin/collections/pages/${contactId}?locale=en`);
  await expect(await field()).toBeVisible();
  const original = await (await field()).inputValue();
  const marker = `PV-NARROW-${Date.now()}`;
  try {
    // Edit; the form saves a draft by itself.
    const saved = page.waitForResponse((r) => /\/api\/pages\//.test(r.url()) && r.request().method() === "PATCH" && r.url().includes("autosave=true"), { timeout: 15000 });
    await (await field()).fill(marker);
    expect((await saved).status()).toBe(200);

    // Opening the preview replaces the form; it shows the draft just saved.
    await page.locator("#live-preview-toggler").click();
    const frame = page.frameLocator("#live-preview-iframe");
    await expect(frame.locator("body")).toContainText(marker, { timeout: 15000 });
    const box = await page.locator("#live-preview-iframe").boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(700); // the preview fills the screen

    // Coming back to the page later: Payload remembers the preview was open, but the form is what a person needs first.
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.getByLabel(LABEL).first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#live-preview-iframe")).toBeHidden(); // Payload keeps the iframe once rendered, but it is not shown
  } finally {
    if (!(await page.getByLabel(LABEL).first().isVisible().catch(() => false))) await page.locator("#live-preview-toggler").click().catch(() => undefined);
    await (await field()).fill(original);
    await page.waitForResponse((r) => /\/api\/pages\//.test(r.url()) && r.request().method() === "PATCH", { timeout: 15000 }).catch(() => undefined);
  }
});
