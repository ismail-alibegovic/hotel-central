/**
 * CMS end-to-end run, fully local and disposable:
 *   throw-away PostgreSQL database (HC_TEST_PG_URL) -> migrate -> seed -> next build/start with CMS_ENABLED=true -> Playwright (tests/cms-e2e)
 * No cloud resource, no real credentials: all secrets are generated per run. Needs Node >= 22.23.4 / 24.
 */
import { spawn, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createTestDatabase } from "../../tests/support/pg";

const PORT = 3200;
const REF_PORT = 3201;
const rnd = () => crypto.randomBytes(12).toString("hex");
const db = await createTestDatabase("hc_e2e");
const mediaDir = fs.mkdtempSync(path.join(os.tmpdir(), "hc-e2e-media-"));
const env = {
  ...process.env,
  CMS_ENABLED: "true",
  DATABASE_URL: db.url,
  PAYLOAD_SECRET: rnd() + rnd(),
  NEXT_PUBLIC_SERVER_URL: `http://127.0.0.1:${PORT}`,
  // An indexable site (as production will be), so page-level noindex settings can be told apart from the site-wide one.
  NEXT_PUBLIC_SITE_URL: "https://e2e.example.test",
  MEDIA_DIR: mediaDir,
  SEED_ADMIN_EMAIL: `admin-${rnd()}@example.test`,
  SEED_ADMIN_PASSWORD: "Pw-" + rnd(),
  E2E_BASE_URL: `http://127.0.0.1:${PORT}`,
  E2E_EDITOR_PASSWORD: "Pw-" + rnd(),
  BLOB_READ_WRITE_TOKEN: "",
} as NodeJS.ProcessEnv;

// Async spawn on purpose: a blocking spawnSync would starve the child processes' output pipes.
const run = (cmd: string, args: string[], extra: Record<string, string> = {}) =>
  new Promise<number>((resolve, reject) => {
    const c = spawn(cmd, args, { env: { ...env, ...extra }, stdio: "inherit" });
    c.on("exit", (status) => (status === 0 ? resolve(0) : reject(new Error(`${cmd} ${args.join(" ")} failed (${status})`))));
  });

let server: ReturnType<typeof spawn> | undefined;
let code = 1;

let refServer: ReturnType<typeof spawn> | undefined;
const stopServer = () => {
  server?.kill("SIGTERM");
  refServer?.kill("SIGTERM");
  spawnSync("fuser", ["-k", `${PORT}/tcp`, `${REF_PORT}/tcp`]);
  server = undefined;
  refServer = undefined;
};
const startServer = async () => {
  server = spawn("npx", ["next", "start", "-p", String(PORT)], { env, stdio: "inherit" });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/en`)).ok) return;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("server did not start");
};

/** Server-only secrets must never appear in anything shipped to browsers. */
function assertNoSecretsInClientBundle() {
  const secrets = [env.PAYLOAD_SECRET!, env.SEED_ADMIN_PASSWORD!, env.E2E_EDITOR_PASSWORD!, env.DATABASE_URL!, new URL(env.DATABASE_URL!).host];
  const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  const files = walk(".next/static").filter((f) => /\.(js|css|html|json|map|txt)$/.test(f));
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    for (const s of secrets) if (s && text.includes(s)) throw new Error(`secret leaked into client asset ${f}`);
  }
  console.log(`client bundle scan: ${files.length} files, no server secrets found`);
}

/**
 * The `npm audit` highs all come from packages that only exist at build/dev time (sass file watcher,
 * ESLint's glob, an unused cloud-storage helper). Prove it: none may be part of the server runtime that
 * Vercel would deploy (Next's file-trace output), and the check must not be vacuous (Payload itself is traced).
 */
function assertAdvisoryPackagesNotShipped() {
  const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  const traced = new Set<string>();
  for (const f of walk(".next").filter((f) => f.endsWith(".nft.json"))) for (const x of JSON.parse(fs.readFileSync(f, "utf8")).files as string[]) traced.add(x);
  const all = [...traced].join("\n");
  if (!all.includes("/node_modules/payload/")) throw new Error("trace check is vacuous: payload not found in traces");
  for (const pkg of ["braces", "micromatch", "chokidar", "sass", "find-node-modules", "findup-sync", "monaco-editor", "dompurify"]) {
    if (all.includes(`/node_modules/${pkg}/`)) throw new Error(`advisory package ${pkg} is part of the deployed server runtime`);
  }
  console.log(`runtime trace scan: ${traced.size} traced files; advisory packages are build/dev-only`);
}

const refEnv = (): NodeJS.ProcessEnv => {
  const e: NodeJS.ProcessEnv = { ...env, NEXT_DIST_DIR: ".next-static", E2E_STATIC_BASE_URL: `http://127.0.0.1:${REF_PORT}` };
  for (const k of ["CMS_ENABLED", "DATABASE_URL", "PAYLOAD_SECRET", "NEXT_PUBLIC_SERVER_URL", "BLOB_READ_WRITE_TOKEN", "SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD"]) delete e[k];
  return e;
};
async function buildReference() {
  await new Promise<void>((resolve, reject) => {
    const c = spawn("npx", ["next", "build"], { env: refEnv(), stdio: "inherit" });
    c.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("reference build failed"))));
  });
}
async function startReference() {
  refServer = spawn("npx", ["next", "start", "-p", String(REF_PORT)], { env: refEnv(), stdio: "inherit" });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${REF_PORT}/en`)).ok) return;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("reference server did not start");
}

try {
  await run("npx", ["tsx", "scripts/cms/migrate.mts"]);
  await run("npx", ["tsx", "scripts/cms/seed.mts"]);
  await run("npx", ["next", "build"]);
  assertNoSecretsInClientBundle();
  // CMS-OFF reference build of the same code (no CMS env at all) for the HTML parity test.
  await buildReference();
  assertAdvisoryPackagesNotShipped();
  await startServer();
  await startReference();
  code = await run("npx", ["playwright", "test", "-c", "playwright.cms.config.ts", ...process.argv.slice(2)], { E2E_STATIC_BASE_URL: `http://127.0.0.1:${REF_PORT}` }).then(() => 0, () => 1);

  if (code === 0 && process.env.E2E_SKIP_OUTAGE !== "1") {
    // Phase 2: database outage. Point the app at a closed port (connection refused, as when the database is down),
    // rebuild (every CMS page is prerendered against a dead database) and restart.
    stopServer();
    env.DATABASE_URL = ["postgres://", "outage", ":", "outage", "@127.0.0.1:1/outage"].join("");
    await run("npx", ["next", "build"]);
    await startServer();
    code = await run("npx", ["playwright", "test", "-c", "playwright.cms.config.ts"], { E2E_PHASE: "outage" }).then(() => 0, () => 1);
  }
} finally {
  stopServer();
  await db.drop();
  fs.rmSync(mediaDir, { recursive: true, force: true });
}
process.exit(code);
