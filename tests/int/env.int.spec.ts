import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Secret hygiene, enforced statically: nothing secret may be readable from client code, and
 * `.env.example` documents names only.
 */
const root = path.resolve(__dirname, "../..");
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const sources = walk(path.join(root, "src")).filter((f) => /\.(ts|tsx)$/.test(f));

describe("environment variable hygiene", () => {
  it("only the two documented public variables use the NEXT_PUBLIC_ prefix", () => {
    const found = new Set<string>();
    for (const f of sources) for (const m of fs.readFileSync(f, "utf8").matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) found.add(m[0]);
    expect([...found].sort()).toEqual(["NEXT_PUBLIC_SERVER_URL", "NEXT_PUBLIC_SITE_URL"]);
  });

  it("server secrets are only referenced from server-side modules (no 'use client' file reads them)", () => {
    const secretNames = /process\.env\.(PAYLOAD_SECRET|DATABASE_URL|BLOB_READ_WRITE_TOKEN|RESEND_API_KEY|SEED_ADMIN_PASSWORD)/;
    for (const f of sources) {
      const text = fs.readFileSync(f, "utf8");
      if (/^["']use client["']/m.test(text.split("\n").slice(0, 3).join("\n"))) expect(text, f).not.toMatch(secretNames);
    }
  });

  it(".env.example lists names only (no values)", () => {
    const lines = fs.readFileSync(path.join(root, ".env.example"), "utf8").split("\n").filter((l) => /^[A-Z0-9_]+=/.test(l));
    expect(lines.length).toBeGreaterThan(5);
    for (const l of lines) expect(l, l).toMatch(/^[A-Z0-9_]+=$/);
  });

  it("no real-looking credentials are committed in the repository sources", () => {
    const patterns = [/(mongodb(\+srv)?|postgres(ql)?):\/\/[^\s"'`$]*:[^\s"'`$@]+@/, /vercel_blob_rw_[A-Za-z0-9]+_(?!notarealtoken)[A-Za-z0-9]{10,}/, /re_[A-Za-z0-9]{20,}/];
    const files = [...sources, ...walk(path.join(root, "scripts")), ...walk(path.join(root, "tests")).filter((f) => /\.(ts|mts)$/.test(f)), path.join(root, ".env.example")];
    for (const f of files) {
      const text = fs.readFileSync(f, "utf8");
      for (const p of patterns) expect(text, `${path.relative(root, f)} matches ${p}`).not.toMatch(p);
    }
  });
});
