/**
 * Backup + restore drill on two DISPOSABLE PostgreSQL databases (no cloud, no real data):
 *   write -> pg_dump (the same command used against Supabase) -> drop source -> pg_restore into a fresh
 *   database -> verify through Payload (login, both locales, draft version, media file) -> report elapsed time.
 * Media files are copied directory-to-directory as a stand-in for a Vercel Blob copy.
 * Needs pg_dump/pg_restore (PostgreSQL client tools, version >= the server) and HC_TEST_PG_URL.
 * Run: HC_TEST_PG_URL=postgres://… npm run cms:restore-drill
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createTestDatabase } from "../../tests/support/pg";

const rnd = () => crypto.randomBytes(8).toString("hex");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hc-drill-"));
const mediaSrc = path.join(tmp, "media-src");
const mediaDst = path.join(tmp, "media-restored");
fs.mkdirSync(mediaSrc);

const common = { DRILL_ADMIN_EMAIL: `drill-${rnd()}@example.test`, DRILL_ADMIN_PASSWORD: "Pw-" + rnd(), PAYLOAD_SECRET: rnd() + rnd(), BLOB_READ_WRITE_TOKEN: "", CMS_ENABLED: "true" };
const run = (cmd: string, args: string[], env: Record<string, string> = {}) =>
  new Promise<void>((resolve, reject) => {
    const c = spawn(cmd, args, { env: { ...process.env, ...common, ...env }, stdio: "inherit" });
    c.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} failed -> ${code}`))));
  });

const source = await createTestDatabase("hc_drill_src");
const target = await createTestDatabase("hc_drill_dst");
try {
  await run("npx", ["tsx", "scripts/cms/migrate.mts"], { DATABASE_URL: source.url });
  await run("npx", ["tsx", "scripts/cms/drill-write.mts"], { DATABASE_URL: source.url, MEDIA_DIR: mediaSrc });

  // custom format: compressed, selective, restorable with pg_restore (what a Supabase backup would be restored with)
  const dump = path.join(tmp, "backup.dump");
  await run("pg_dump", ["--format=custom", "--no-owner", "--no-privileges", `--file=${dump}`, `--dbname=${source.url}`]);
  console.log(`backup: ${fs.statSync(dump).size} bytes`);

  const mediaBackup = path.join(tmp, "media-backup");
  await run("npx", ["tsx", "scripts/cms/backup-media.mts", mediaBackup], { DATABASE_URL: source.url, MEDIA_DIR: mediaSrc });

  await source.drop(); // disaster: the source database is gone
  const t0 = Date.now();
  await run("pg_restore", ["--no-owner", "--no-privileges", "--exit-on-error", `--dbname=${target.url}`, dump]);
  fs.cpSync(mediaBackup, mediaDst, { recursive: true }); // restore the media backup into a fresh directory
  await run("npx", ["tsx", "scripts/cms/drill-verify.mts"], { DATABASE_URL: target.url, MEDIA_DIR: mediaDst });
  console.log(`restore + verification completed in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
} finally {
  await target.drop();
  await source.drop();
  fs.rmSync(tmp, { recursive: true, force: true });
}
