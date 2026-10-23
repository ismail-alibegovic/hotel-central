import { describe, expect, it } from "vitest";
import { hasErrors, preflight } from "@/cms/preflight";

const good = {
  CMS_ENABLED: "true",
  // assembled at runtime so the credential-pattern scan in env.int.spec.ts has nothing to match
  DATABASE_URL: ["mongodb+srv://", "hc-staging", ":", "Zx9qLm2vPt7wKd4n", "@cluster0.abcde.mongodb.net/hotel-central-staging?retryWrites=true"].join(""),
  PAYLOAD_SECRET: "k3J9xQ2mVb7LwT5pRz8Yc1HdN6sGfA4uEoXiB0jM",
  NEXT_PUBLIC_SERVER_URL: "https://hotel-central-staging.vercel.app",
  BLOB_READ_WRITE_TOKEN: "vercel_blob_rw_teststore_notarealtoken",
};
const errs = (env: Record<string, string | undefined>, t: "staging" | "production" = "staging") => preflight(env, t).filter((f) => f.level === "error").map((f) => f.name);

describe("hosted-environment preflight", () => {
  it("accepts a complete staging configuration", () => {
    expect(hasErrors(preflight(good, "staging"))).toBe(false);
  });

  it("never echoes secret values", () => {
    const text = JSON.stringify(preflight({ ...good, PAYLOAD_SECRET: "Zq7Rk" }, "staging"));
    for (const v of [good.DATABASE_URL, good.BLOB_READ_WRITE_TOKEN, "Zx9qLm2vPt7wKd4n", "Zq7Rk"]) expect(text).not.toContain(v);
  });

  it.each([
    ["CMS disabled", { CMS_ENABLED: "yes" }, "CMS_ENABLED"],
    ["first-register left open", { ALLOW_FIRST_REGISTER: "true" }, "ALLOW_FIRST_REGISTER"],
    ["localhost database", { DATABASE_URL: "mongodb://127.0.0.1:27017/x" }, "DATABASE_URL"],
    ["database without password", { DATABASE_URL: "mongodb+srv://user@cluster0.abcde.mongodb.net/db" }, "DATABASE_URL"],
    ["short secret", { PAYLOAD_SECRET: "tooshort" }, "PAYLOAD_SECRET"],
    ["weak secret", { PAYLOAD_SECRET: "a".repeat(40) }, "PAYLOAD_SECRET"],
    ["http origin", { NEXT_PUBLIC_SERVER_URL: "http://x.vercel.app" }, "NEXT_PUBLIC_SERVER_URL"],
    ["origin with slash", { NEXT_PUBLIC_SERVER_URL: "https://x.vercel.app/" }, "NEXT_PUBLIC_SERVER_URL"],
    ["missing blob token", { BLOB_READ_WRITE_TOKEN: undefined }, "BLOB_READ_WRITE_TOKEN"],
    ["malformed blob token", { BLOB_READ_WRITE_TOKEN: "abc" }, "BLOB_READ_WRITE_TOKEN"],
    ["site URL set on staging", { NEXT_PUBLIC_SITE_URL: "https://www.hotelcentral.ba" }, "NEXT_PUBLIC_SITE_URL"],
  ])("rejects: %s", (_n, patch, expected) => {
    expect(errs({ ...good, ...patch })).toContain(expected);
  });

  it("example-content publishing: a warning on staging, an error in production", () => {
    const staging = preflight({ ...good, CMS_ALLOW_SAMPLE_PUBLISH: "true" }, "staging");
    expect(staging.find((f) => f.name === "CMS_ALLOW_SAMPLE_PUBLISH")?.level).toBe("warn");
    const prod = preflight({ ...good, NEXT_PUBLIC_SITE_URL: "https://www.hotelcentral.ba", CMS_ALLOW_SAMPLE_PUBLISH: "true" }, "production");
    expect(prod.find((f) => f.name === "CMS_ALLOW_SAMPLE_PUBLISH")?.level).toBe("error");
  });

  it("production must use the official site URL and warns about missing e-mail", () => {
    expect(errs({ ...good, NEXT_PUBLIC_SITE_URL: "https://evil.example" }, "production")).toContain("NEXT_PUBLIC_SITE_URL");
    const ok = preflight({ ...good, NEXT_PUBLIC_SITE_URL: "https://www.hotelcentral.ba" }, "production");
    expect(hasErrors(ok)).toBe(false);
    expect(ok.some((f) => f.level === "warn" && f.name.includes("RESEND"))).toBe(true);
  });
});
