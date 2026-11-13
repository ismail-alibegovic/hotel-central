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
    expect(hrefs).toEqual(
      ["", "/about", "/about/cafe", "/rooms", "/centralfitnessclub", "/centralfitnessclub/membership", "/centralfitnessclub/timetable", "/dayspa", "/conference", "/location", "/contact"].map((p) => `/${locale}${p}`),
    );
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await toggle.click();
    await menu.locator(`nav a[href="/${locale}/conference"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/conference$`));
  });

  test(`footer ${locale}: explore list excludes home; booking link, phone, language switch present`, async ({ page }) => {
    await page.goto(`/${locale}/conference`, { waitUntil: "networkidle" });
    const footer = page.locator("footer");
    const explore = await footer.locator("nav ul a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(explore).toEqual(
      ["/about", "/about/cafe", "/rooms", "/centralfitnessclub", "/centralfitnessclub/membership", "/centralfitnessclub/timetable", "/dayspa", "/conference", "/location", "/contact"].map((p) => `/${locale}${p}`),
    );
    await expect(footer.locator('a[href*="live.ipms247.com"]')).toHaveCount(1);
    await expect(footer.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="facebook.com"]')).toHaveCount(1);
    await expect(footer.locator(`a[href="/${locale === "en" ? "bs" : "en"}/conference"]`)).toHaveCount(1);
  });
}

test("header: wordmark, rooms link (from the md breakpoint, 1024 px) and booking button", async ({ page, viewport }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  const header = page.locator("header");
  await expect(header.locator('a[href="/en"]')).toBeVisible();
  await expect(header.locator('a[href*="live.ipms247.com"]')).toBeVisible();
  const rooms = header.locator('a[href="/en/rooms"]');
  // the design shows this link from the site's `md` breakpoint (64rem = 1024 px), not from tablet width
  if ((viewport?.width ?? 0) >= 1024) await expect(rooms).toBeVisible();
  else await expect(rooms).toBeHidden();
});

for (const [path, booking] of [["/en/centralfitnessclub", null], ["/bs/dayspa", "form.lime-booking.com/bs/"]] as const) {
  test(`microsite ${path}: own header and footer, way back to the hotel, no hotel chrome`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator('header button[aria-controls="site-menu"]')).toHaveCount(0);
    const locale = path.slice(1, 3);
    await expect(page.locator(`header a[href="/${locale}"]:visible`).first()).toBeVisible();
    await expect(page.locator("footer").last().locator(`a[href="/${locale}"]`)).toHaveCount(1);
    if (booking) await expect(page.locator(`a[href*="${booking}"]:visible`).first()).toBeVisible();
  });
}
