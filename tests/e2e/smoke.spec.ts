import { expect, test } from "@playwright/test";

const rooms = ["single-room", "standard-twin-double", "superior-double-room", "family-room", "junior-suite", "presidential-suite"];
// Approved round-1 sitemap.
const sections = ["", "/about", "/about/cafe", "/rooms", "/centralfitnessclub", "/centralfitnessclub/membership", "/centralfitnessclub/timetable", "/dayspa", "/conference", "/location", "/contact"];

const paths = ["en", "bs"].flatMap((l) => [...sections.map((s) => `/${l}${s}`), ...rooms.map((r) => `/${l}/rooms/${r}`)]);

for (const path of paths) {
  test(`smoke ${path}`, async ({ page }) => {
    const problems: string[] = [];
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
    page.on("response", (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));

    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "horizontal overflow").toBe(true);
    expect(await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length), "broken images").toBe(0);
    expect(path.startsWith("/bs") ? "bs" : "en").toBe(await page.locator("html").getAttribute("lang"));
    expect(problems).toEqual([]);
  });
}

test("unknown route returns 404", async ({ request }) => {
  expect((await request.get("/en/rooms/does-not-exist")).status()).toBe(404);
});

test("unknown top-level addresses return 404 in both languages (pages created in the CMS do not exist while it is off)", async ({ request }) => {
  for (const path of ["/en/does-not-exist", "/bs/does-not-exist", "/en/summer-offers", "/en/Bad_Slug"]) expect((await request.get(path)).status(), path).toBe(404);
});

test("root redirects to a locale", async ({ request }) => {
  const res = await request.get("/", { maxRedirects: 0 });
  expect([307, 308]).toContain(res.status());
  expect(res.headers().location).toMatch(/\/(en|bs)$/);
});

test("robots.txt and sitemap.xml respond", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
});

test("old addresses redirect permanently to the new sitemap, in both languages", async ({ request }) => {
  for (const l of ["en", "bs"]) {
    for (const [from, to] of [["/spa", "/dayspa"], ["/restaurant", "/about/cafe"], ["/meetings-events", "/conference"]]) {
      const res = await request.get(`/${l}${from}`, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(res.headers().location, from).toMatch(new RegExp(`/${l}${to}$`));
    }
  }
});

test("contact page has no form; phone and e-mail are the way to reach the hotel (CH-017)", async ({ page }) => {
  await page.goto("/en/contact", { waitUntil: "networkidle" });
  await expect(page.locator("main form")).toHaveCount(0);
  await expect(page.locator('main a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('main a[href^="mailto:"]').first()).toBeVisible();
});

test("contact API rejects invalid input without sending", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x", email: "bad", message: "short", consent: false } });
  expect(res.status()).toBe(422);
});

test("CMS surface is closed unless CMS_ENABLED (admin, CMS API, preview)", async ({ request }) => {
  for (const url of ["/admin", "/api/users/me", "/api/pages", "/api/preview?path=/en/about"]) {
    expect((await request.get(url, { maxRedirects: 0 })).status(), url).toBe(404);
  }
});
