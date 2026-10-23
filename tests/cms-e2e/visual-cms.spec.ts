import { expect, request as pwRequest, test, type Page } from "@playwright/test";
import { sampleLayoutRows } from "./sample-rows";

/**
 * Visual regression of what only the CMS can produce, in staff preview (so nothing is published): the offers / FAQ / CTA
 * sections, a page created in the CMS, and the home page with edited text and a replaced photograph. Content is fixed by
 * this spec and removed afterwards. Baselines are rendered by the CI runner (tests/cms-e2e/__screenshots__), like the
 * static ones (see docs/TESTING.md).
 */
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const SLUG = "visual-demo";

/* eslint-disable @typescript-eslint/no-explicit-any */
let api: Awaited<ReturnType<typeof pwRequest.newContext>>;
let roomsId: string;
let roomsLayout: unknown[];
let customId: string;
let homeOriginal: Record<string, any>;

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  const anon = await pwRequest.newContext({ baseURL: base });
  const token = (await (await anon.post("/api/users/login", { data: ADMIN })).json()).token;
  api = await pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${token}`, Connection: "close" } });

  const rooms = (await (await api.get("/api/pages?where[slug][equals]=rooms&limit=1&depth=0")).json()).docs[0];
  roomsId = rooms.id;
  roomsLayout = rooms.layout;
  expect((await api.patch(`/api/pages/${roomsId}?draft=true&locale=en`, { data: { layout: [...rooms.layout, ...sampleLayoutRows()] } })).status()).toBe(200);

  const created = await api.post("/api/custom-pages?draft=true&locale=en", {
    data: {
      title: "Visual demo",
      slug: SLUG,
      layout: [
        { blockType: "hero", image: { staticPath: "3069.jpg", alt: "The heated indoor pool", position: "50% 60%" }, eyebrow: "DEMO / SAMPLE", title: "A page created\nin the CMS", intro: "DEMO / SAMPLE text used only by the visual regression test." },
        { blockType: "statement", tone: "ivory", text: "DEMO / SAMPLE statement: the sections of a new page use the same design as every other page." },
      ],
    },
  });
  expect(created.status()).toBe(201);
  customId = (await created.json()).doc.id;

  homeOriginal = (await (await api.get("/api/globals/homepage?locale=en&draft=true&depth=0")).json()) as Record<string, any>;
  const draft = await api.post("/api/globals/homepage?locale=en&draft=true", {
    data: { hero: { tagline: "Visual test tagline, edited in the CMS.", image: { staticPath: "3064.jpg", alt: "Visual test photograph" } }, spa: { facts: [{ text: "Visual test item one" }, { text: "Visual test item two" }] } },
  });
  expect(draft.status()).toBe(200);
});

test.afterAll(async () => {
  await api.delete(`/api/custom-pages/${customId}`);
  await api.patch(`/api/pages/${roomsId}?draft=true&locale=en`, { data: { layout: roomsLayout } });
  await api.post("/api/globals/homepage?locale=en&draft=true", {
    data: { hero: { tagline: homeOriginal.hero.tagline, image: { staticPath: null, upload: null, alt: "", position: "" } }, spa: { facts: homeOriginal.spa.facts } },
  });
});

async function preview(page: Page, path: string) {
  await page.goto("/admin/login");
  await page.locator("#field-email").fill(ADMIN.email);
  await page.locator("#field-password").fill(ADMIN.password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/login/);
  await page.goto(`/api/preview?path=${encodeURIComponent(path)}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // fixed layers (header, mobile booking bar) would sit on top of element captures
  await page.addStyleTag({ content: ".fixed { visibility: hidden !important; }" });
}

/** Scroll-triggered reveals only run for what has been scrolled past: walk down the page once so a tall element is captured fully revealed. */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
  });
}

for (const block of ["offers", "faq", "cta"]) {
  test(`visual sample ${block} section (preview)`, async ({ page }) => {
    await preview(page, "/en/rooms");
    const section = page.locator(`section[data-block="${block}"]`);
    await revealAll(page);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(section).toHaveScreenshot(`sample-${block}.png`);
  });
}

test("visual FAQ with the first question open (preview)", async ({ page }) => {
  await preview(page, "/en/rooms");
  const section = page.locator('section[data-block="faq"]');
  await revealAll(page);
  await section.scrollIntoViewIfNeeded();
  await section.locator("details").first().locator("summary").click();
  await page.waitForTimeout(800);
  await expect(section).toHaveScreenshot("sample-faq-open.png");
});

test("visual page created in the CMS (preview)", async ({ page }) => {
  await preview(page, `/en/${SLUG}`);
  await revealAll(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot("custom-page.png");
});

test("visual home page with edited text and a replaced photograph (preview)", async ({ page }) => {
  await preview(page, "/en");
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot("home-edited.png");
});
