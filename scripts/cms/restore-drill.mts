/**
 * Backup + restore drill on two DISPOSABLE in-memory MongoDB servers (no cloud, no real data):
 *   write -> mongodump (the same command used against Atlas) -> destroy source -> mongorestore into a fresh
 *   server -> verify through Payload (login, both locales, draft version, media file) -> report elapsed time.
 * Media files are copied directory-to-directory as a stand-in for a Vercel Blob copy.
 * Requires mongodump/mongorestore: `PATH="$(scripts/cms/install-mongo-tools.sh):$PATH" npm run cms:restore-drill`.
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MongoMemoryServer } from "mongodb-memory-server";

const rnd = () => crypto.randomBytes(8).toString("hex");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hc-drill-"));
const mediaSrc = path.join(tmp, "media-src");
const mediaDst = path.join(tmp, "media-restored");
fs.mkdirSync(mediaSrc);

const common = { DRILL_ADMIN_EMAIL: `drill-${rnd()}@example.test`, DRILL_ADMIN_PASSWORD: "Pw-" + rnd(), PAYLOAD_SECRET: rnd() + rnd(), BLOB_READ_WRITE_TOKEN: "" };
const run = (cmd: string, args: string[], env: Record<string, string> = {}) =>
  new Promise<void>((resolve, reject) => {
    const c = spawn(cmd, args, { env: { ...process.env, ...common, ...env }, stdio: "inherit" });
    c.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} -> ${code}`))));
  });

const DB = "hotel-central-drill";
const source = await MongoMemoryServer.create();
const target = await MongoMemoryServer.create();
try {
  const srcUri = source.getUri(DB);
  await run("npx", ["tsx", "scripts/cms/drill-write.mts"], { DATABASE_URL: srcUri, MEDIA_DIR: mediaSrc });

  const archive = path.join(tmp, "backup.archive.gz");
  await run("mongodump", [`--uri=${source.getUri()}`, `--db=${DB}`, `--archive=${archive}`, "--gzip"]);
  const size = fs.statSync(archive).size;
  console.log(`backup: ${size} bytes`);

  const mediaBackup = path.join(tmp, "media-backup");
  await run("npx", ["tsx", "scripts/cms/backup-media.mts", mediaBackup], { DATABASE_URL: srcUri, MEDIA_DIR: mediaSrc });

  await source.stop(); // disaster: the source database is gone
  const t0 = Date.now();
  await run("mongorestore", [`--uri=${target.getUri()}`, `--archive=${archive}`, "--gzip", `--nsInclude=${DB}.*`]);
  fs.cpSync(mediaBackup, mediaDst, { recursive: true }); // restore the media backup into a fresh directory
  await run("npx", ["tsx", "scripts/cms/drill-verify.mts"], { DATABASE_URL: target.getUri(DB), MEDIA_DIR: mediaDst });
  console.log(`restore + verification completed in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
} finally {
  await target.stop().catch(() => undefined);
  await source.stop().catch(() => undefined);
  fs.rmSync(tmp, { recursive: true, force: true });
}
