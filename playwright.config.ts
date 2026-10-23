import { defineConfig } from "@playwright/test";

/**
 * Smoke + visual tests. By default they run against a local production build
 * (`next start` on :3100). Point at any deployment with E2E_BASE_URL, e.g.
 *   E2E_BASE_URL=https://hotel-central-pi.vercel.app npm run test:e2e
 * Set PW_CHROMIUM_PATH to use a preinstalled Chromium instead of `playwright install`.
 */
const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3100";
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

const sizes = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  // E2E_BASELINES_DIR lets a developer compare against locally generated baselines (the committed ones are CI-rendered).
  snapshotPathTemplate: process.env.E2E_BASELINES_DIR ? `${process.env.E2E_BASELINES_DIR}/{projectName}/{testFilePath}/{arg}{ext}` : "{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" } },
  use: {
    baseURL,
    contextOptions: { reducedMotion: "reduce" },
    colorScheme: "light",
    locale: "en-GB",
    timezoneId: "Europe/Sarajevo",
    launchOptions: { executablePath },
  },
  projects: Object.entries(sizes).map(([name, viewport]) => ({ name, use: { viewport } })),
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run start -- -p 3100",
        url: "http://127.0.0.1:3100/en",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
