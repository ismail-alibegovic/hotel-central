import { expect, test } from "@playwright/test";

/**
 * Runs after the runner has STOPPED the database and REBUILT + restarted the app (so every CMS page is
 * prerendered while the database is unreachable): the site must still build and serve its static content.
 */
test("a build and server with an unreachable database still serve the static site", async ({ request }) => {
  const started = Date.now();
  for (const [path, needle] of [
    ["/en/about", "Irish hospitality"],
    ["/bs/about", "Irsko gostoprimstvo"],
    ["/en/rooms/junior-suite", "Junior"],
    ["/en", "ipms247"],
  ] as const) {
    const res = await request.get(path, { timeout: 20_000 });
    expect(res.status(), path).toBe(200);
    expect(await res.text(), path).toContain(needle);
  }
  expect(Date.now() - started, "fails fast, no 30 s driver hang").toBeLessThan(40_000);
});

test("admin API reports an error instead of hanging or leaking details", async ({ request }) => {
  const res = await request.post("/api/users/login", { data: { email: "a@b.test", password: "x" }, timeout: 20_000 });
  expect(res.status()).toBeGreaterThanOrEqual(400);
  expect(await res.text()).not.toMatch(/mongodb:\/\/|127\.0\.0\.1:\d{4,5}/);
});
