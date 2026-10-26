import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";
import { clickSave } from "./clickSave";

/**
 * The Contact page, the way the hotel's own staff use it (desktop and phone): change the reception text, save it as a draft, see it in
 * Preview, publish, and check that the right public page changed. Bosnian and English are edited and checked separately, and an editor
 * can prepare the change but never publish it.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `contact-editor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const LABEL = /Reception — address and opening hours/;
const run = `${Date.now()}`;

let api: APIRequestContext;
let contactId: string;

test.describe.configure({ mode: "serial" });

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

const noHorizontalScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const publicText = async (request: APIRequestContext, locale: "bs" | "en") => (await (await request.get(`/${locale}/contact`)).text()) as string;

async function openContact(page: Page, locale: "bs" | "en") {
  await page.goto(`/admin/collections/pages/${contactId}?locale=${locale}`);
  await page.waitForLoadState("networkidle");
  const field = page.getByLabel(LABEL).first();
  await expect(field).toBeVisible({ timeout: 20000 });
  return field;
}

/** "Save Changes", waiting for the request that really stores the draft (a click can land while the form re-renders). */
async function saveDraft(page: Page) {
  await expect(async () => {
    const res = page.waitForResponse((r) => /\/api\/pages\/[^/?]+/.test(r.url()) && r.request().method() === "PATCH" && r.url().includes("draft=true") && !r.url().includes("autosave=true"), { timeout: 8000 });
    await page.locator("#action-save-draft").click({ timeout: 5000 });
    expect((await res).status()).toBe(200);
  }).toPass({ timeout: 45000 });
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  contactId = (await (await api.get("/api/pages?where[slug][equals]=contact&limit=1&depth=0&draft=true")).json()).docs[0].id as string;
});

test("editor: prepares a change to the Contact page as a draft, and can neither publish it nor reach administrator screens", async ({ page, request }) => {
  const marker = `Editor draft ${run}`;
  await uiLogin(page, EDITOR);
  const field = await openContact(page, "bs");
  const original = await field.inputValue();
  await expect(page.locator("#action-save")).toHaveCount(0); // no Publish Changes
  await expect(page.getByText(/You are an editor/i).first()).toBeVisible();
  try {
    await field.fill(marker);
    await saveDraft(page);
    await expect(page.locator("[data-hc-saved=draft]")).toContainText("not visible to guests yet");
    expect(await publicText(request, "bs")).not.toContain(marker);
  } finally {
    await field.fill(original);
    await saveDraft(page);
  }
  // The server, not only the screen, refuses a publish by an editor.
  const anon = await pwRequest.newContext({ baseURL: base });
  const login = await anon.post("/api/users/login", { data: EDITOR });
  const token = (await login.json()).token as string;
  const asEditor = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  const publish = await asEditor.patch(`/api/pages/${contactId}?locale=bs&depth=0`, { data: { _status: "published" } });
  expect(publish.status()).toBe(403);
  expect((await asEditor.post("/api/pages", { data: { slug: `x-${run}` } })).status()).toBe(403); // cannot add pages
  const users = (await (await asEditor.get("/api/users?limit=10&depth=0")).json()) as { docs?: { email: string }[] };
  expect((users.docs ?? []).map((u) => u.email)).toEqual([EDITOR.email]); // an editor sees only their own account
  // Sidebar and list
  await page.goto("/admin");
  await expect(page.getByText("Team members", { exact: true })).toHaveCount(0);
  await page.goto("/admin/collections/pages");
  await expect(page.getByRole("link", { name: "Add new" })).toHaveCount(0);
  expect(await noHorizontalScroll(page)).toBe(true);
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
});

test("administrator: edit → Save Changes → Preview → Publish, Bosnian and English separately, and the right public page changes", async ({ page, request }) => {
  test.setTimeout(150_000);
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  const bs = `Recepcija ${run}`;
  const en = `Reception ${run}`;
  await uiLogin(page, ADMIN);

  const bsField = await openContact(page, "bs");
  const bsOriginal = await bsField.inputValue();
  await bsField.fill(bs);
  await saveDraft(page);
  await expect(page.locator("[data-hc-saved=draft]")).toContainText("Saved as draft");
  expect(await noHorizontalScroll(page)).toBe(true);
  // Guests see nothing yet, in either language.
  expect(await publicText(request, "bs")).not.toContain(bs);
  expect(await publicText(request, "en")).not.toContain(bs);
  // Staff preview (the page the eye button opens): the Bosnian draft on the Bosnian page, not on the English one.
  const bsPreview = await page.context().newPage();
  await bsPreview.goto("/api/preview?path=%2Fbs%2Fcontact");
  await expect(bsPreview.locator("html")).toHaveAttribute("lang", "bs");
  await expect(bsPreview.locator("body")).toContainText(bs);
  await bsPreview.goto("/api/preview?path=%2Fen%2Fcontact");
  await expect(bsPreview.locator("body")).not.toContainText(bs);
  await bsPreview.close();

  // Publish: the confirmation says what changes, per language, then the Bosnian page changes and the English one does not.
  await page.locator("#action-save").click();
  const dialog = page.locator("[data-hc-publish-summary]");
  await expect(dialog).toContainText("Bosnian and English are published together");
  await expect(dialog.locator('[data-language="bs"]')).toContainText(/1 change/, { timeout: 15000 });
  // What the Bosnian line lists (the section that was edited) must not be listed for English. Other tests may leave their own unpublished
  // English changes on this page (for example a Google title), so "no changes" is not assumed.
  const bsLine = (await dialog.locator('[data-language="bs"]').innerText()).split("—").slice(1).join("—").trim();
  expect(bsLine.length).toBeGreaterThan(0);
  const enLine = await dialog.locator('[data-language="en"]').innerText();
  for (const name of bsLine.split(",").map((x) => x.trim()).filter(Boolean)) expect(enLine).not.toContain(name);
  await page.locator("#action-publish-confirm").click();
  await expect(page.getByText(/Published — guests can see this now/).first()).toBeVisible({ timeout: 15000 });
  await expect.poll(async () => (await publicText(request, "bs")).includes(bs), { timeout: 15000 }).toBe(true);
  expect(await publicText(request, "en")).not.toContain(bs);

  // English: the Bosnian text did not leak into the English form, and the English edit changes only the English page.
  const enField = await openContact(page, "en");
  await expect(enField).not.toHaveValue(bs);
  const enOriginal = await enField.inputValue();
  await enField.fill(en);
  await saveDraft(page);
  await clickSave(page, "#action-save");
  await expect.poll(async () => (await publicText(request, "en")).includes(en), { timeout: 15000 }).toBe(true);
  expect(await publicText(request, "bs")).not.toContain(en);
  expect(await publicText(request, "bs")).toContain(bs);

  // Put the hotel's own text back and publish it.
  await enField.fill(enOriginal);
  await saveDraft(page);
  await clickSave(page, "#action-save");
  const bsAgain = await openContact(page, "bs");
  await bsAgain.fill(bsOriginal);
  await saveDraft(page);
  await clickSave(page, "#action-save");
  await expect.poll(async () => (await publicText(request, "bs")).includes(bs), { timeout: 15000 }).toBe(false);
  expect(await publicText(request, "en")).not.toContain(en);
});
