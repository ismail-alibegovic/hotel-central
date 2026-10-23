import { defineConfig } from "@playwright/test";

/** Runs against the server started by scripts/cms/e2e.mts (CMS enabled, disposable database). */
export default defineConfig({
  testDir: "./tests/cms-e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200",
    launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH || undefined },
  },
});
