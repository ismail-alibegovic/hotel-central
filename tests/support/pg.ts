import crypto from "node:crypto";
import pg from "pg";

/**
 * Disposable PostgreSQL databases for tests, on a server that already exists (a CI service container or a local
 * server). `HC_TEST_PG_URL` is an administrator connection string on that server (user, optional password,
 * 127.0.0.1, port, `/postgres`). Nothing hosted is ever touched: the URL must be local
 * unless HC_TEST_PG_ALLOW_REMOTE=1, so a real DATABASE_URL pasted by mistake cannot be wiped.
 */
export function adminUrl(): string {
  const url = process.env.HC_TEST_PG_URL;
  if (!url) throw new Error("HC_TEST_PG_URL is not set. Start a local PostgreSQL and export HC_TEST_PG_URL=postgres://<admin>@127.0.0.1:<port>/postgres (see docs/TESTING.md).");
  const host = new URL(url).hostname;
  if (!["localhost", "127.0.0.1", "::1", "[::1]"].includes(host) && process.env.HC_TEST_PG_ALLOW_REMOTE !== "1") throw new Error("HC_TEST_PG_URL must point at a local server for tests.");
  return url;
}

export type TestDatabase = { name: string; url: string; drop: () => Promise<void> };

/** Creates an empty, uniquely named database and returns its URL plus a function that drops it. */
export async function createTestDatabase(prefix = "hc_test"): Promise<TestDatabase> {
  const admin = adminUrl();
  const name = `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
  const run = async (sql: string) => {
    const c = new pg.Client({ connectionString: admin });
    await c.connect();
    try {
      await c.query(sql);
    } finally {
      await c.end();
    }
  };
  await run(`CREATE DATABASE "${name}"`);
  const u = new URL(admin);
  u.pathname = `/${name}`;
  return { name, url: u.toString(), drop: () => run(`DROP DATABASE IF EXISTS "${name}" WITH (FORCE)`).catch(() => undefined) };
}
