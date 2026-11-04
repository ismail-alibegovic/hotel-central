import { expect, test } from "@playwright/test";

/** Header, full-screen menu and footer behaviour — the part of the site the navigation/footer CMS must never break. */
for (const locale of ["en", "bs"] as const) {
  test(`menu ${locale}: opens, traps focus, closes with Escape, navigates`, async ({ page }) => {
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    const toggle = page.locator('header button[aria-controls="site-menu"]');
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const menu = page.locator("#site-menu");
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const hrefs = await menu.locator("nav ol a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs).toEqual(["", "/about", "/rooms", "/centralfitnessclub", "/dayspa", "/restaurant", "/conference", "/location", "/contact"].map((p) => `/${locale}${p}`));
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await toggle.click();
    await menu.locator(`nav a[href="/${locale}/dayspa"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/dayspa$`));
  });

  test(`footer ${locale}: explore list excludes home; booking link, phone, language switch present`, async ({ page }) => {
    await page.goto(`/${locale}/dayspa`, { waitUntil: "networkidle" });
    const footer = page.locator("footer");
    const explore = await footer.locator("nav ul a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(explore).toEqual(["/about", "/rooms", "/centralfitnessclub", "/dayspa", "/restaurant", "/conference", "/location", "/contact"].map((p) => `/${locale}${p}`));
    await expect(footer.locator('a[href*="live.ipms247.com"]')).toHaveCount(1);
    await expect(footer.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="facebook.com"]')).toHaveCount(1);
    await expect(footer.locator('a[href*="instagram.com"]')).toHaveCount(1);
    // CH-018: the logo, not oversized type
    await expect(footer.locator('img[src*="/brand/hotel-central-logo"]')).toHaveCount(1);
    await expect(footer.locator(`a[href="/${locale === "en" ? "bs" : "en"}/dayspa"]`)).toHaveCount(1);
  });
}

test("header: logo, rooms link (from the md breakpoint, 1024 px) and booking button", async ({ page, viewport }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  const header = page.locator("header");
  const home = header.getByRole("link", { name: "Hotel Central Sarajevo — home" });
  await expect(home).toBeVisible();
  await expect(home.locator('img[src*="/brand/hotel-central-wordmark"]')).toHaveCount(1);
  await expect(header.locator('a[href*="live.ipms247.com"]')).toBeVisible();
  const rooms = header.locator('a[href="/en/rooms"]');
  // the design shows this link from the site's `md` breakpoint (64rem = 1024 px), not from tablet width
  if ((viewport?.width ?? 0) >= 1024) await expect(rooms).toBeVisible();
  else await expect(rooms).toBeHidden();
});

test("header: language switcher keeps the page, and Fitness / Spa are one click away from wide screens", async ({ page, viewport }) => {
  await page.goto("/en/rooms", { waitUntil: "networkidle" });
  const header = page.locator("header");
  if ((viewport?.width ?? 0) >= 1280) {
    await expect(header.locator('a[href="/en/centralfitnessclub"]')).toBeVisible();
    await expect(header.locator('a[href="/en/dayspa"]')).toBeVisible();
  }
  if ((viewport?.width ?? 0) >= 1024) {
    await header.locator('a[href="/bs/rooms"]').click();
    await expect(page).toHaveURL(/\/bs\/rooms$/);
  }
});

test("Fitness Club and Day Spa have their own navigation under the hotel bar", async ({ page }) => {
  await page.goto("/en/centralfitnessclub/timetable", { waitUntil: "networkidle" });
  await expect(page.locator('a[href="/en/centralfitnessclub/timetable"][aria-current="page"]')).toBeVisible();
  await expect(page.locator('header a[href*="live.ipms247.com"]')).toBeVisible();
  await page.goto("/bs/dayspa", { waitUntil: "networkidle" });
  await expect(page.locator('a[href="https://form.lime-booking.com/bs/HotelCentralSarajevo/service"]').first()).toBeVisible();
});
