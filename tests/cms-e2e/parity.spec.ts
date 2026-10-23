import { expect, test } from "@playwright/test";

/**
 * With the CMS ON and the seeded content (a copy of the static copy), the CMS-driven pages must be
 * visually indistinguishable from the static site. Snapshots are the static baselines
 * (tests/e2e/__screenshots__), so any drift introduced by the CMS path fails here.
 */
for (const path of ["/en", "/en/about", "/bs/about", "/en/rooms", "/en/rooms/junior-suite", "/bs/rooms/junior-suite"]) {
  test(`CMS parity ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${path.slice(1).replace(/\//g, "_")}.png`);
  });
}
