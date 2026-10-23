import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { Payload } from "payload";

export type Harness = { payload: Payload; mongo: MongoMemoryServer; mediaDir: string; stop: () => Promise<void> };

/** Boots Payload against a throw-away in-memory MongoDB and a temp media dir. Nothing external is touched. */
export async function boot(env: Record<string, string | undefined> = {}): Promise<Harness> {
  const mongo = await MongoMemoryServer.create();
  const mediaDir = fs.mkdtempSync(path.join(os.tmpdir(), "hc-media-"));
  process.env.DATABASE_URL = mongo.getUri("hotel-central-test");
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
  return {
    payload,
    mongo,
    mediaDir,
    stop: async () => {
      await payload.db.destroy?.();
      await mongo.stop();
      fs.rmSync(mediaDir, { recursive: true, force: true });
    },
  };
}

export const PNG_1X1 = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
export const rand = () => Math.random().toString(36).slice(2, 10);
