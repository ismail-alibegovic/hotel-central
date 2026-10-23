/**
 * CMS end-to-end run, fully local and disposable:
 *   in-memory MongoDB -> seed -> next build/start with CMS_ENABLED=true -> Playwright (tests/cms-e2e)
 * No cloud resource, no real credentials: all secrets are generated per run. Needs Node >= 22.23.4 / 24.
 */
import { spawn, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MongoMemoryServer } from "mongodb-memory-server";

const PORT = 3200;
const rnd = () => crypto.randomBytes(12).toString("hex");
const mongo = await MongoMemoryServer.create();
const mediaDir = fs.mkdtempSync(path.join(os.tmpdir(), "hc-e2e-media-"));
const env = {
  ...process.env,
  CMS_ENABLED: "true",
  DATABASE_URL: mongo.getUri("hotel-central-e2e"),
  PAYLOAD_SECRET: rnd() + rnd(),
  NEXT_PUBLIC_SERVER_URL: `http://127.0.0.1:${PORT}`,
  MEDIA_DIR: mediaDir,
  SEED_ADMIN_EMAIL: `admin-${rnd()}@example.test`,
  SEED_ADMIN_PASSWORD: "Pw-" + rnd(),
  E2E_BASE_URL: `http://127.0.0.1:${PORT}`,
  E2E_EDITOR_PASSWORD: "Pw-" + rnd(),
  BLOB_READ_WRITE_TOKEN: "",
} as NodeJS.ProcessEnv;

// Async spawn on purpose: a blocking spawnSync would stop us draining mongod's output pipe and hang the database.
const run = (cmd: string, args: string[]) =>
  new Promise<number>((resolve, reject) => {
    const c = spawn(cmd, args, { env, stdio: "inherit" });
    c.on("exit", (status) => (status === 0 ? resolve(0) : reject(new Error(`${cmd} ${args.join(" ")} failed (${status})`))));
  });

let server: ReturnType<typeof spawn> | undefined;
let code = 1;
try {
  await run("npx", ["tsx", "scripts/cms/seed.mts"]);
  await run("npx", ["next", "build"]);
  server = spawn("npx", ["next", "start", "-p", String(PORT)], { env, stdio: "inherit" });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/en`)).ok) break;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  code = await run("npx", ["playwright", "test", "-c", "playwright.cms.config.ts"]).then(() => 0, () => 1);
} finally {
  server?.kill("SIGTERM");
  spawnSync("fuser", ["-k", `${PORT}/tcp`]);
  await mongo.stop();
  fs.rmSync(mediaDir, { recursive: true, force: true });
}
process.exit(code);
