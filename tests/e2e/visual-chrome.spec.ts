import { expect, test } from "@playwright/test";

/** Open full-screen menu and footer, both languages, at the three widths. Baselines are rendered by the CI runner. */
for (const locale of ["en", "bs"] as const) {
  test(`visual menu open ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/spa`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('header button[aria-controls="site-menu"]').click();
    await expect(page.locator("#site-menu")).toBeVisible();
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot(`menu-open-${locale}.png`);
  });

  test(`visual footer ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/spa`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Fixed layers (header, skip link, mobile booking bar) would be captured on top of the footer.
    await page.addStyleTag({ content: ".fixed { visibility: hidden !important; }" });
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(800);
    await expect(footer).toHaveScreenshot(`footer-${locale}.png`);
  });
}
