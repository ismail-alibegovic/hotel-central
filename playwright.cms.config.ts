import { defineConfig } from "@playwright/test";

/**
 * Runs against the server started by scripts/cms/e2e.mts (CMS enabled, disposable database).
 * Order matters because the tests share one database:
 *   html-parity  every public page (EN/BS) from the CMS-on site equals the CMS-off reference build, element for element
 *   parity-*  CMS-rendered About / Junior Suite must be pixel-identical to the static baselines (read-only)
 *   admin-*   browser-driven administration on mobile and desktop (edits the content)
 *   api       REST/HTTP behaviour: roles, drafts, preview, locale isolation, fallback (ends by deleting a doc)
 *   chrome-*  navigation + footer globals: HTTP (roles, drafts, locales, link safety) and the admin UI
 *   visual-cms-* screenshots of CMS-only output (sections, a created page, an edited home page) in staff preview
 *   home-*    home page global: HTTP (text, photographs, drafts, roles, validation) and the browser
 *   custom-pages-* pages created in the CMS: HTTP (localized addresses, drafts, preview, revalidation, sitemap, roles) and the browser
 *   sections-* offers / FAQ / CTA sections: HTTP (sample guard, preview isolation, rendering, languages) and the browser (keyboard FAQ, labels, buttons)
 * E2E_PHASE=outage runs only the database-outage spec (the runner stops MongoDB first).
 */
const outage = process.env.E2E_PHASE === "outage";
const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
const sizes = { mobile: { width: 390, height: 844 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1440, height: 900 } };

// CMS-rendered pages are compared with the STATIC baselines on purpose: same files, same tolerance.
const staticBaselines = process.env.E2E_BASELINES_DIR ? `${process.env.E2E_BASELINES_DIR}/{projectName}/visual.spec.ts/{arg}{ext}` : "{testDir}/../e2e/__screenshots__/{projectName}/visual.spec.ts/{arg}{ext}";

export default defineConfig({
  testDir: "./tests/cms-e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  snapshotPathTemplate: staticBaselines,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" } },
  use: {
    baseURL,
    contextOptions: { reducedMotion: "reduce" },
    colorScheme: "light",
    locale: "en-GB",
    timezoneId: "Europe/Sarajevo",
    launchOptions: { executablePath },
  },
  projects: outage
    ? [{ name: "api", testMatch: /outage\.spec\.ts/ }]
    : [
        { name: "html-parity", testMatch: /html-parity\.spec\.ts/ },
        // project names double as baseline folders for the parity specs, hence mobile/tablet/desktop
        ...Object.entries(sizes).map(([name, viewport]) => ({ name, use: { viewport }, testMatch: /(?<!html-)parity\.spec\.ts/, dependencies: ["html-parity"] })),
        ...(["mobile", "desktop"] as const).map((n) => ({
          name: `admin-${n}`,
          use: { viewport: sizes[n] },
          testMatch: /admin-ui\.spec\.ts/,
          dependencies: ["mobile", "tablet", "desktop"],
        })),
        { name: "api", testMatch: /[\\/]cms\.spec\.ts$/, dependencies: ["admin-mobile", "admin-desktop"] },
        { name: "chrome-api", testMatch: /chrome-api\.spec\.ts/, dependencies: ["api"] },
        { name: "sections-api", testMatch: /sections-api\.spec\.ts/, dependencies: ["chrome-api"] },
        { name: "custom-pages-api", testMatch: /custom-pages-api\.spec\.ts/, dependencies: ["sections-api"] },
        // CMS-only visuals: their own baselines (rendered by the CI runner, see docs/TESTING.md), compared in staff preview
        ...Object.entries(sizes).map(([name, viewport]) => ({
          name: `visual-cms-${name}`,
          use: { viewport },
          testMatch: /visual-cms\.spec\.ts/,
          snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}",
          dependencies: ["home-api", "custom-pages-api", "sections-api"],
        })),
        { name: "home-api", testMatch: /home-api\.spec\.ts/, dependencies: ["custom-pages-api"] },
        ...(["mobile", "desktop"] as const).map((n) => ({ name: `home-ui-${n}`, use: { viewport: sizes[n] }, testMatch: /home-ui\.spec\.ts/, dependencies: ["home-api"] })),
        ...(["mobile", "desktop"] as const).map((n) => ({ name: `custom-pages-ui-${n}`, use: { viewport: sizes[n] }, testMatch: /custom-pages-ui\.spec\.ts/, dependencies: ["custom-pages-api"] })),
        ...(["mobile", "desktop"] as const).map((n) => ({ name: `sections-ui-${n}`, use: { viewport: sizes[n] }, testMatch: /sections-ui\.spec\.ts/, dependencies: ["sections-api"] })),
        ...(["mobile", "desktop"] as const).map((n) => ({ name: `chrome-ui-${n}`, use: { viewport: sizes[n] }, testMatch: /chrome-ui\.spec\.ts/, dependencies: ["chrome-api"] })),
      ],
});
