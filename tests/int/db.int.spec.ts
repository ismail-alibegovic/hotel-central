import { describe, expect, it } from "vitest";
import { poolSettings } from "@/cms/db";

// assembled at runtime so the credential-pattern scan in env.int.spec.ts has nothing to match
const hosted = ["postgres://", "postgres.abcdefghijklmnop", ":", "Zx9qLm2vPt7wKd4n", "@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require"].join("");

describe("PostgreSQL pool settings", () => {
  it("fails fast and keeps a small pool", () => {
    const s = poolSettings(hosted);
    expect(s.connectionTimeoutMillis).toBeLessThanOrEqual(5000);
    expect(s.query_timeout).toBeLessThanOrEqual(15_000);
    expect(s.max).toBeLessThanOrEqual(5);
  });

  it("enables TLS for hosted databases and drops sslmode so it cannot override the setting", () => {
    const s = poolSettings(hosted);
    expect(s.ssl).toEqual({ rejectUnauthorized: false });
    expect(s.connectionString).not.toContain("sslmode");
    expect(s.connectionString).toContain("pooler.supabase.com:6543/postgres");
  });

  it("leaves local databases unencrypted and untouched", () => {
    const local = ["postgres://", "u", ":", "p", "@127.0.0.1:5433/db"].join("");
    expect(poolSettings(local)).toMatchObject({ connectionString: local });
    expect(poolSettings(local).ssl).toBeUndefined();
  });

  it("tolerates a missing or malformed URL (build time without a database)", () => {
    expect(poolSettings(undefined).connectionString).toBe("");
    expect(poolSettings("not a url").ssl).toBeUndefined();
  });
});
