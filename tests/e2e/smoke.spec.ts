import { expect, test } from "@playwright/test";

const rooms = ["single-room", "standard-twin-double", "superior-double-room", "family-room", "junior-suite", "presidential-suite"];
const sections = ["", "/rooms", "/about", "/spa", "/restaurant", "/meetings-events", "/location", "/contact"];

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

test("root redirects to a locale", async ({ request }) => {
  const res = await request.get("/", { maxRedirects: 0 });
  expect([307, 308]).toContain(res.status());
  expect(res.headers().location).toMatch(/\/(en|bs)$/);
});

test("robots.txt and sitemap.xml respond", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
});

test("contact API rejects invalid input without sending", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x", email: "bad", message: "short", consent: false } });
  expect(res.status()).toBe(422);
});
