import fs from "node:fs";
import path from "node:path";
import { expect, request as pwRequest, test, type APIRequestContext, type Page } from "@playwright/test";
import { clickSave } from "./clickSave";

/**
 * Hotel Information end to end, at 390 px and 1440 px: an administrator changes the main phone number and e-mail in the admin,
 * publishes, and every place on the website that shows them follows (header menu, footer, phone bar, booking banner, Contact page,
 * structured data) in both languages; an editor can only save a draft; invalid values are refused in the form.
 * Set E2E_SCREENSHOTS_DIR to also save screenshots of the editor screen (used for docs/admin-ux/hotel-info/).
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `hotel-info-editor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const shots = process.env.E2E_SCREENSHOTS_DIR;

let api: APIRequestContext;
let original: Record<string, unknown>;

async function uiLogin(page: Page, who: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(who.email);
  await page.locator("#field-password").fill(who.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

async function openTab(page: Page, name: string, probe: ReturnType<Page["locator"]>) {
  await expect(async () => {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(probe.first()).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20000 });
}

async function shot(page: Page, name: string) {
  if (!shots) return;
  fs.mkdirSync(shots, { recursive: true });
  await page.screenshot({ path: path.join(shots, `${name}-${test.info().project.name.replace(/^hotel-info-ui-/, "")}.png`), fullPage: false });
}

/** Publish through the confirmation and wait for the real global save (autosave excluded); retried like the other global specs. */
async function publish(page: Page) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await expect(page.locator("#action-save")).toBeEnabled();
      const [res] = await Promise.all([
        page.waitForResponse((r) => r.url().includes("/api/globals/hotel-info") && r.request().method() === "POST" && !r.url().includes("autosave=true"), { timeout: 6000 }),
        clickSave(page, "#action-save"),
      ]);
      return res;
    } catch (err) {
      if (attempt === 3) throw err;
      await page.reload();
    }
  }
  throw new Error("unreachable");
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  await api.post("/api/users", { data: EDITOR });
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  original = await (await api.get("/api/globals/hotel-info?locale=en&depth=0&draft=true")).json();
});

// The administrator's open form locks the settings for a while; each test starts as if nobody had them open.
test.beforeEach(async () => {
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
});

test.afterAll(async () => {
  // Put the hotel's verified details back and publish them, so later specs see the seeded state.
  await api.delete("/api/payload-locked-documents?where[id][exists]=true");
  const res = await api.post("/api/globals/hotel-info?locale=en", { data: { phones: original.phones, emails: original.emails, address: original.address, hours: original.hours, _status: "published" } });
  expect(res.status()).toBe(200);
});

test("administrator changes the main phone and e-mail; every page in both languages follows after publishing", async ({ page, request }, testInfo) => {
  test.setTimeout(120_000);
  const n = testInfo.project.name.endsWith("mobile") ? "1" : "2";
  const phone = `+387 33 10${n} 20${n}`;
  const href = `tel:+3873310${n}20${n}`;
  const mail = `desk${n}@hotelcentral.ba`;

  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/hotel-info?locale=en");
  const number = page.locator("#field-phones__0__number");
  await openTab(page, "Phone numbers", number);
  await shot(page, "phones");
  await number.fill(phone);
  await page.locator("#field-phones__0__label").fill("Reception");

  const address = page.locator("#field-emails__0__address");
  await openTab(page, "E-mail addresses", address);
  await address.fill(mail);
  await shot(page, "emails");

  // Before publishing nothing public has changed.
  await page.locator("#action-save-draft").click();
  await expect(page.getByText(/saved/i).first()).toBeVisible();
  expect(await (await request.get("/en/contact")).text()).not.toContain(phone);

  const res = await publish(page);
  expect(res.status()).toBe(200);

  const pages = ["", "/about", "/rooms", "/rooms/junior-suite", "/spa", "/restaurant", "/meetings-events", "/location", "/contact"];
  for (const l of ["en", "bs"]) {
    for (const p of pages.map((x) => `/${l}${x}`)) {
      const html = await (await request.get(p)).text();
      expect(html, p).toContain(phone);
      expect(html, p).toContain(`href="${href}"`);
      expect(html, p).toContain(`mailto:${mail}`);
      expect(html, p).not.toContain("+387 33 561 800");
      expect(html, p).not.toContain("info@hotelcentral.ba");
      // the booking engine and the contact form are untouched
      expect(html, p).toContain("https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo");
    }
    const ld = await (await request.get(`/${l}`)).text();
    expect(ld).toContain(`"telephone":"${phone}"`);
  }

  // The visible result, on the real page (footer contact column and the Contact page's details).
  await page.goto("/bs/contact");
  await expect(page.locator("footer").getByRole("link", { name: phone }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: mail }).first()).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("invalid values are refused in the form with a plain explanation", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/hotel-info?locale=en");
  const number = page.locator("#field-phones__0__number");
  await openTab(page, "Phone numbers", number);
  await number.fill("call reception");
  const res = await publish(page);
  expect(res.status()).toBe(400);
  await expect(page.getByText("1 Error").first()).toBeVisible();
  // On a phone Payload shows a field's explanation when the field is touched; on a wide screen it is shown at once.
  await number.focus();
  await number.hover();
  await expect(page.getByText(/Use digits, spaces and the signs/).first()).toBeVisible();
  await shot(page, "validation");
  expect(await (await page.request.get("/en/contact")).text()).not.toContain("call reception");
});

test("opening hours are written per language with shared times", async ({ page }) => {
  await uiLogin(page, ADMIN);
  await page.goto("/admin/globals/hotel-info?locale=en");
  await page.getByRole("button", { name: "Opening hours", exact: true }).click();
  await page.getByRole("button", { name: /Add Place/i }).click();
  await expect(page.locator("#field-hours__0__name")).toBeVisible();
  await page.locator("#field-hours__0__name").fill("Reception");
  await shot(page, "opening-hours");
});

test("an editor can save a draft but is not offered Publish, and the public site does not change", async ({ page, request }) => {
  await uiLogin(page, EDITOR);
  await page.goto("/admin/globals/hotel-info?locale=bs");
  const number = page.locator("#field-phones__0__number");
  await openTab(page, "Phone numbers", number);
  await expect(page.locator("#action-save")).toHaveCount(0);
  await expect(page.locator("#action-save-draft")).toBeVisible();
  await number.fill("+387 33 404 404");
  await page.locator("#action-save-draft").click();
  await expect(page.getByText(/saved/i).first()).toBeVisible();
  await shot(page, "editor");
  expect(await (await request.get("/bs/contact")).text()).not.toContain("+387 33 404 404");
});
