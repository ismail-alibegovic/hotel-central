import { expect, test } from "@playwright/test";

/**
 * Above-the-fold screenshots. Reduced motion is forced in the config (the site zeroes all
 * animation durations under prefers-reduced-motion), animations are disabled by Playwright,
 * and the viewport (not full page) is captured so parallax/lazy sections cannot cause drift.
 * Update baselines deliberately: npm run test:visual:update
 */
const pages = ["/en", "/bs", "/en/about", "/bs/about", "/en/rooms", "/en/rooms/junior-suite", "/bs/rooms/junior-suite", "/en/spa", "/en/restaurant", "/en/meetings-events", "/en/location", "/en/contact", "/bs/contact"];

for (const path of pages) {
  test(`visual ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${path.slice(1).replace(/\//g, "_")}.png`);
  });
}
