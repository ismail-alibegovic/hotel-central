import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Vercel Blob is "prepared": the adapter is wired from env only. No network call and no cloud
 * resource is involved — we only assert how the resolved config changes with/without a token.
 */
async function resolvedMedia(token?: string) {
  vi.resetModules();
  process.env.PAYLOAD_SECRET = "x";
  process.env.DATABASE_URL = "mongodb://127.0.0.1/unused";
  if (token) process.env.BLOB_READ_WRITE_TOKEN = token;
  else delete process.env.BLOB_READ_WRITE_TOKEN;
  const { default: config } = await import("@payload-config");
  const sanitized = await config;
  return sanitized.collections.find((c) => c.slug === "media")!;
}

afterEach(() => {
  delete process.env.BLOB_READ_WRITE_TOKEN;
});

describe("media storage selection", () => {
  it("uses local disk without a Blob token (dev/test only)", async () => {
    const media = await resolvedMedia();
    expect((media.upload as { disableLocalStorage?: boolean }).disableLocalStorage).not.toBe(true);
  });

  it("switches to Vercel Blob and disables local disk when a token is configured", async () => {
    const media = await resolvedMedia("vercel_blob_rw_teststore_notarealtoken");
    expect((media.upload as { disableLocalStorage?: boolean }).disableLocalStorage).toBe(true);
  });
});
