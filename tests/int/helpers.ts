import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Payload } from "payload";
import { createTestDatabase } from "../support/pg";

/**
 * The PostgreSQL adapter's destroy() resets its schema but leaves the connection pool open; end it explicitly.
 * pool.end() waits for connections that are still checked out, so it is bounded: the database is dropped with
 * FORCE afterwards, and the error event of any connection that gets terminated is ignored.
 */
export async function closePayload(payload: Payload): Promise<void> {
  await payload.db.destroy?.();
  const pool = (payload.db as unknown as { pool?: { end: () => Promise<void>; on: (e: string, f: () => void) => void } }).pool;
  if (!pool) return;
  pool.on("error", () => undefined);
  await Promise.race([pool.end().catch(() => undefined), new Promise((r) => setTimeout(r, 3000))]);
}

export type Harness = { payload: Payload; mediaDir: string; stop: () => Promise<void> };

/** Boots Payload against a throw-away PostgreSQL database (migrated with the real migrations) and a temp media dir. Nothing external is touched. */
export async function boot(env: Record<string, string | undefined> = {}): Promise<Harness> {
  const db = await createTestDatabase("hc_int");
  const mediaDir = fs.mkdtempSync(path.join(os.tmpdir(), "hc-media-"));
  process.env.DATABASE_URL = db.url;
  process.env.PAYLOAD_SECRET = "test-secret-" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + "-0123456789abcdef";
  process.env.MEDIA_DIR = mediaDir;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  for (const [k, v] of Object.entries(env)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }

  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });
  await (payload.db as unknown as { migrate: () => Promise<void> }).migrate();
  return {
    payload,
    mediaDir,
    stop: async () => {
      await closePayload(payload);
      await db.drop();
      fs.rmSync(mediaDir, { recursive: true, force: true });
    },
  };
}

export const PNG_1X1 = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
export const rand = () => Math.random().toString(36).slice(2, 10);
