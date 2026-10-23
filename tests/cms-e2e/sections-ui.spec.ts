import { expect, request as pwRequest, test, type Page } from "@playwright/test";
import { sampleLayoutRows } from "./sample-rows";

/**
 * Offers / FAQ / CTA in a real browser (390 px and 1440 px), through staff preview of DEMO / SAMPLE content on the "rooms" page.
 * Nothing is published; the draft is removed again at the end.
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const BOOKING = "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo";

let roomsId: string;
let publishedLayout: unknown[];
let api: Awaited<ReturnType<typeof pwRequest.newContext>>;

async function uiLogin(page: Page) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(ADMIN.email);
  await page.locator("#field-password").fill(ADMIN.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
}

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });
  const doc = (await (await api.get("/api/pages?where[slug][equals]=rooms&limit=1&depth=0")).json()).docs[0];
  roomsId = doc.id;
  publishedLayout = doc.layout;
  const draft = await api.patch(`/api/pages/${roomsId}?draft=true&locale=en`, { data: { layout: [...doc.layout, ...sampleLayoutRows()] } });
  expect(draft.status()).toBe(200);
});

test.afterAll(async () => {
  // drop the unpublished draft: re-saving the published layout as a draft makes the latest version equal the live page
  await api.patch(`/api/pages/${roomsId}?draft=true&locale=en`, { data: { layout: publishedLayout } });
});

test.beforeEach(async ({ page }) => {
  await uiLogin(page);
  await page.goto(`/api/preview?path=${encodeURIComponent("/en/rooms")}`, { waitUntil: "networkidle" });
});

test("sample sections render in the existing design with a visible DEMO / SAMPLE label and no horizontal scroll", async ({ page }) => {
  for (const block of ["offers", "faq", "cta"]) {
    const section = page.locator(`section[data-block="${block}"]`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section.locator('[data-sample="true"]')).toContainText("DEMO / SAMPLE");
    await expect(section.locator('[data-sample="true"]')).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "horizontal overflow").toBe(true);
  expect(await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length), "broken images").toBe(0);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("FAQ opens and closes with the keyboard and with a click", async ({ page }) => {
  const faq = page.locator('section[data-block="faq"]');
  await faq.scrollIntoViewIfNeeded();
  const first = faq.locator("details").first();
  const summary = first.locator("summary");
  await expect(first).not.toHaveAttribute("open", "");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("open", "");
  await expect(first.getByText("DEMO / SAMPLE answer").first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(first).not.toHaveAttribute("open", "");
  await summary.click();
  await expect(first).toHaveAttribute("open", "");
  expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44); // comfortable touch target
});

test("buttons: the booking button goes to the booking engine from code; internal buttons stay on the site", async ({ page }) => {
  const offers = page.locator('section[data-block="offers"]');
  const cta = page.locator('section[data-block="cta"]');
  await expect(offers.locator(`a[href="${BOOKING}"]`)).toHaveCount(1);
  await expect(cta.locator(`a[href="${BOOKING}"]`)).toHaveAttribute("target", "_blank");
  await expect(cta.locator(`a[href="${BOOKING}"]`)).toHaveAttribute("rel", /noopener/);
  await expect(offers.locator('a[href="/en/rooms"]')).not.toHaveCount(0);
  await expect(cta.locator('a[href="/en/contact"]')).toHaveCount(1);
});
