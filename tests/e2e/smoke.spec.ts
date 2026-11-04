import { expect, test } from "@playwright/test";

const rooms = ["single-room", "standard-twin-double", "superior-double-room", "family-room", "junior-suite", "presidential-suite"];
const sections = ["", "/rooms", "/about", "/centralfitnessclub", "/centralfitnessclub/membership", "/centralfitnessclub/timetable", "/dayspa", "/restaurant", "/conference", "/location", "/contact", "/about/cafe"];

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

test("contact page has no form, only direct phone and e-mail (CH-017); the old contact API is gone", async ({ page, request }) => {
  for (const l of ["en", "bs"]) {
    await page.goto(`/${l}/contact`);
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator('main a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('main a[href^="mailto:"]').first()).toBeVisible();
    await expect(page.locator("h1")).not.toContainText(/standing by/i);
  }
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(404);
});

test("old addresses redirect permanently: /spa → /dayspa, /meetings-events → /conference", async ({ request }) => {
  for (const [from, to] of [["/en/spa", "/en/dayspa"], ["/bs/spa", "/bs/dayspa"], ["/en/meetings-events", "/en/conference"], ["/bs/meetings-events", "/bs/conference"]]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers().location, from).toMatch(new RegExp(`${to}$`));
  }
});

test("homepage: Fitness and Spa have separate buttons, Meetings & Events comes before Location", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('main a[href="/en/centralfitnessclub"]').first()).toBeAttached();
  await expect(page.locator('main a[href="/en/dayspa"]').first()).toBeAttached();
  const order = await page.evaluate(() => ["events-title", "location-title"].map((id) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY));
  expect(order[0]).toBeLessThan(order[1]);
});

test("the Central Café draft is not indexable and not in the sitemap", async ({ page, request }) => {
  await page.goto("/en/about/cafe");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/about/cafe");
});

test("Day Spa: verified prices and the spa's existing online booking form", async ({ page }) => {
  await page.goto("/en/dayspa");
  await expect(page.locator("#prices")).toContainText("Relax Spa massage");
  await expect(page.locator("#prices")).toContainText("65 KM");
  await expect(page.locator('a[href="https://form.lime-booking.com/en/HotelCentralSarajevo/service"]').first()).toBeAttached();
});

test("CMS surface is closed unless CMS_ENABLED (admin, CMS API, preview)", async ({ request }) => {
  for (const url of ["/admin", "/api/users/me", "/api/pages", "/api/preview?path=/en/about"]) {
    expect((await request.get(url, { maxRedirects: 0 })).status(), url).toBe(404);
  }
});
