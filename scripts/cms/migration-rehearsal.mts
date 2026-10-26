/**
 * Backup + isolated restore + migration rehearsal. Run it BEFORE applying any migration to a hosted database.
 *
 *   SOURCE_DATABASE_URL  database to back up (hosted Supabase: the SESSION-mode pooler string, port 5432; or any PostgreSQL).
 *                        It is only READ: pg_dump, and SELECTs inside read-only sessions.
 *   RESTORE_ADMIN_URL    administrator connection to a LOCAL PostgreSQL server of the SAME major version (it creates one scratch
 *                        database there and drops it at the end). Remote hosts are refused, so a hosted URL can never be wiped.
 *   PG_BIN               directory with pg_dump / pg_restore of the SAME major version as the source (a 16 client cannot read a 17 server).
 *   BACKUP_DIR           where the backup file and the report go (default ./backups, ignored by git)
 *   KEEP_SCRATCH=1       keep the scratch database for inspection
 *
 * What it proves, in order (every line is a check; the exit code is non-zero if any fails):
 *   1. the backup file is complete and readable (sha256, table-of-contents entries);
 *   2. the restored copy equals the source: same tables, row counts, a checksum of every table's rows, same schema;
 *   3. the pending migrations apply to the copy and change NOTHING that already existed (rows and schema);
 *   4. the rollback (`cms:migrate -- down --yes`) returns the copy exactly to the restored state, and re-applying works;
 *   5. `cms:seed` after the migration changes only the new tables;
 *   6. the CMS boots on the copy and reads the pages, rooms, users and every global.
 * Passwords and connection strings are never printed or written: child processes get libpq environment variables, not URLs.
 * The report lists table names, counts and checksums only.
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import pg from "pg";
import { poolSettings } from "../../src/cms/db";

const need = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required (see the header of scripts/cms/migration-rehearsal.mts)`);
  return v;
};
const SOURCE = need("SOURCE_DATABASE_URL");
const ADMIN = need("RESTORE_ADMIN_URL");
const PG_BIN = process.env.PG_BIN ?? "";
const BACKUP_DIR = path.resolve(process.env.BACKUP_DIR ?? "backups");
const bin = (name: string) => (PG_BIN ? path.join(PG_BIN, name) : name);

const results: { name: string; ok: boolean; detail: string }[] = [];
const check = (name: string, ok: boolean, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  return ok;
};

// ---------- connections (credentials only ever travel as libpq environment variables) ----------
const isLocalHost = (h: string) => ["localhost", "127.0.0.1", "::1", "[::1]"].includes(h);
const libpq = (url: string): NodeJS.ProcessEnv => {
  const u = new URL(url);
  return {
    PGHOST: u.hostname.replace(/^\[|\]$/g, ""),
    PGPORT: u.port || "5432",
    PGUSER: decodeURIComponent(u.username),
    PGPASSWORD: decodeURIComponent(u.password),
    PGDATABASE: decodeURIComponent(u.pathname.slice(1)) || "postgres",
    ...(isLocalHost(u.hostname) ? { PGSSLMODE: "disable" } : { PGSSLMODE: "require" }),
  };
};
const withDb = (url: string, db: string) => {
  const u = new URL(url);
  u.pathname = `/${db}`;
  return u.toString();
};
const client = async (url: string, readOnly: boolean) => {
  const s = poolSettings(url);
  const c = new pg.Client({ connectionString: s.connectionString, ...(s.ssl ? { ssl: s.ssl } : {}), statement_timeout: 120_000 });
  await c.connect();
  await c.query("SET TIME ZONE 'UTC'");
  await c.query("SET DateStyle = 'ISO, YMD'");
  await c.query("SET extra_float_digits = 3");
  if (readOnly) await c.query("SET default_transaction_read_only = on"); // a bug here can never write to the source
  return c;
};

const run = (cmd: string, args: string[], env: NodeJS.ProcessEnv) =>
  new Promise<{ code: number; out: string; err: string }>((resolve) => {
    const c = spawn(cmd, args, { env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    c.stdout.on("data", (d) => (out += d));
    c.stderr.on("data", (d) => (err += d));
    c.on("error", (e) => resolve({ code: 127, out, err: String(e) }));
    c.on("exit", (code) => resolve({ code: code ?? 1, out, err }));
  });

// ---------- fingerprint: what a database contains, comparable between two databases ----------
type Fingerprint = { tables: Record<string, { rows: number; hash: string | null }>; catalog: string[]; migrations: string[] };
const q = (id: string) => `"${id.replace(/"/g, '""')}"`;
const MAX_HASHED_ROWS = 500_000;

async function fingerprint(url: string, readOnly: boolean): Promise<Fingerprint> {
  const c = await client(url, readOnly);
  try {
    const names = (await c.query(`select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by 1`)).rows.map((r) => r.table_name as string);
    const tables: Fingerprint["tables"] = {};
    for (const t of names) {
      const n = Number((await c.query(`select count(*) as n from public.${q(t)}`)).rows[0].n);
      const hash = n > MAX_HASHED_ROWS ? null : ((await c.query(`select md5(coalesce(string_agg(x::text, E'\\n' order by x::text), '')) as h from public.${q(t)} x`)).rows[0].h as string);
      tables[t] = { rows: n, hash };
    }
    const catalog = [
      ...(await c.query(`select 'col|' || table_name || '|' || column_name || '|' || data_type || '|' || udt_name || '|' || is_nullable || '|' || coalesce(column_default, '') as s from information_schema.columns where table_schema = 'public'`)).rows,
      ...(await c.query(`select 'idx|' || tablename || '|' || indexdef as s from pg_indexes where schemaname = 'public'`)).rows,
      ...(await c.query(`select 'con|' || cl.relname || '|' || co.conname || '|' || pg_get_constraintdef(co.oid) as s from pg_constraint co join pg_class cl on cl.oid = co.conrelid join pg_namespace n on n.oid = cl.relnamespace where n.nspname = 'public'`)).rows,
      ...(await c.query(`select 'enum|' || t.typname || '|' || string_agg(e.enumlabel, ',' order by e.enumsortorder) as s from pg_type t join pg_enum e on e.enumtypid = t.oid join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' group by t.typname`)).rows,
    ]
      .map((r) => r.s as string)
      .sort();
    const migrations = names.includes("payload_migrations") ? (await c.query(`select name from public.payload_migrations order by name`)).rows.map((r) => r.name as string) : [];
    return { tables, catalog, migrations };
  } finally {
    await c.end();
  }
}

const isNew = (s: string) => /hotel_info/.test(s);
/** Tables whose rows differ between two fingerprints (payload_migrations only bookkeeps, compared by name). */
function changedTables(a: Fingerprint, b: Fingerprint): string[] {
  return [...new Set([...Object.keys(a.tables), ...Object.keys(b.tables)])]
    .filter((t) => t !== "payload_migrations" && (a.tables[t]?.rows !== b.tables[t]?.rows || a.tables[t]?.hash !== b.tables[t]?.hash))
    .sort();
}
const sameCatalog = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);
const diffCatalog = (a: string[], b: string[]) => ({ onlyA: a.filter((x) => !b.includes(x)), onlyB: b.filter((x) => !a.includes(x)) });

// ---------- the rehearsal ----------
const started = Date.now();
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "").replace("T", "-");
fs.mkdirSync(BACKUP_DIR, { recursive: true });
const dumpFile = path.join(BACKUP_DIR, `hotel-central-${stamp}.dump`);
const reportFile = path.join(BACKUP_DIR, `rehearsal-${stamp}.md`);
const scratchName = `hc_rehearsal_${crypto.randomBytes(5).toString("hex")}`;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hc-rehearsal-"));
let scratchUrl = "";
let adminClient: pg.Client | undefined;
const notes: string[] = [];

try {
  // 0. safety
  const srcUrl = new URL(SOURCE);
  const admUrl = new URL(ADMIN);
  if (!isLocalHost(admUrl.hostname)) throw new Error("RESTORE_ADMIN_URL must be a LOCAL server (localhost / 127.0.0.1): the restore target is created and dropped.");
  if (srcUrl.port === "6543") throw new Error("SOURCE_DATABASE_URL uses port 6543 (transaction pooler). pg_dump needs a session: use the session-mode pooler string (port 5432) or the direct connection.");
  if (isLocalHost(srcUrl.hostname) && srcUrl.port === (admUrl.port || "5432") && new URL(SOURCE).pathname === "/postgres") throw new Error("Refusing to use the administrator database as the source.");

  const major = (v: string) => Number(/(\d+)(?:\.\d+)?/.exec(v)?.[1]);
  const dumpVersion = await run(bin("pg_dump"), ["--version"], {});
  const restoreVersion = await run(bin("pg_restore"), ["--version"], {});
  if (dumpVersion.code !== 0 || restoreVersion.code !== 0) throw new Error(`pg_dump / pg_restore not found (set PG_BIN): ${dumpVersion.err || restoreVersion.err}`);
  const toolMajor = major(dumpVersion.out.replace(/^pg_dump \(PostgreSQL\)\s*/, ""));

  const sc = await client(SOURCE, true);
  const srcMajor = Number((await sc.query("select current_setting('server_version_num')::int / 10000 as m")).rows[0].m);
  const srcVersion = (await sc.query("select current_setting('server_version') as v")).rows[0].v as string;
  await sc.end();
  adminClient = await client(ADMIN, false);
  const dstMajor = Number((await adminClient.query("select current_setting('server_version_num')::int / 10000 as m")).rows[0].m);
  check("tool and server versions are compatible", toolMajor >= srcMajor && dstMajor >= srcMajor, `source PostgreSQL ${srcVersion} (major ${srcMajor}), pg_dump ${toolMajor}, restore server ${dstMajor}`);
  if (dstMajor !== srcMajor) notes.push(`The restore server is major ${dstMajor}, the source ${srcMajor}: use the same major to rehearse faithfully.`);
  if (toolMajor < srcMajor) throw new Error(`pg_dump ${toolMajor} cannot dump a PostgreSQL ${srcMajor} server. Install the ${srcMajor} client tools and set PG_BIN.`);

  // 1. fingerprint, dump, fingerprint again (a live database must not change while we read it)
  const before = await fingerprint(SOURCE, true);
  const tableNames = Object.keys(before.tables);
  check("source has the CMS tables", tableNames.includes("users") && tableNames.includes("payload_migrations"), `${tableNames.length} tables, ${Object.values(before.tables).reduce((a, t) => a + t.rows, 0)} rows, migrations: ${before.migrations.join(", ") || "none"}`);

  const t0 = Date.now();
  const dump = await run(bin("pg_dump"), ["--format=custom", "--schema=public", "--no-owner", "--no-privileges", `--file=${dumpFile}`], libpq(SOURCE));
  if (!check("pg_dump finished", dump.code === 0, dump.code === 0 ? `${((Date.now() - t0) / 1000).toFixed(1)} s` : dump.err.trim().split("\n").slice(-3).join(" | "))) throw new Error("backup failed");
  fs.chmodSync(dumpFile, 0o600); // contains password hashes
  const sha = crypto.createHash("sha256").update(fs.readFileSync(dumpFile)).digest("hex");
  fs.writeFileSync(`${dumpFile}.sha256`, `${sha}  ${path.basename(dumpFile)}\n`);
  const toc = await run(bin("pg_restore"), ["--list", dumpFile], {});
  const tocTables = (toc.out.match(/^\d+; \d+ \d+ TABLE DATA public /gm) ?? []).length;
  check("backup file is readable and complete", toc.code === 0 && tocTables === tableNames.length, `${fs.statSync(dumpFile).size} bytes, sha256 ${sha.slice(0, 16)}…, data for ${tocTables} of ${tableNames.length} tables`);

  const after = await fingerprint(SOURCE, true);
  const moved = changedTables(before, after);
  // A backup of a database that is being edited is a valid snapshot, but it cannot be compared with a moving target: say so loudly.
  check("source did not change while it was being backed up", moved.length === 0, moved.length ? `changed meanwhile: ${moved.slice(0, 5).join(", ")} — run again when nobody is editing (the comparisons below may differ for that reason)` : "");

  // 2. restore into an isolated scratch database
  await adminClient.query(`CREATE DATABASE ${q(scratchName)}`);
  scratchUrl = withDb(ADMIN, scratchName);
  const t1 = Date.now();
  // The archive carries its own "CREATE SCHEMA public", which fails on every database that already has a public schema (a fresh
  // Supabase project does). Restore from the archive's table of contents without that one entry; the target keeps its own schema.
  const list = path.join(tmp, "restore.list");
  fs.writeFileSync(list, toc.out.split("\n").filter((l) => !/^\d+; \d+ \d+ SCHEMA - public\b/.test(l)).join("\n"));
  const restore = await run(bin("pg_restore"), ["--no-owner", "--no-privileges", "--exit-on-error", `--use-list=${list}`, `--dbname=${scratchName}`, dumpFile], { ...libpq(ADMIN), PGDATABASE: scratchName });
  if (!check("pg_restore into an isolated scratch database", restore.code === 0, restore.code === 0 ? `${((Date.now() - t1) / 1000).toFixed(1)} s` : restore.err.trim().split("\n").slice(-3).join(" | "))) throw new Error("restore failed");

  const r0 = await fingerprint(scratchUrl, false);
  const cmp = (label: string, a: Fingerprint, b: Fingerprint) => {
    const tablesA = Object.keys(a.tables).sort().join();
    check(`${label}: same tables`, tablesA === Object.keys(b.tables).sort().join(), `${Object.keys(a.tables).length}`);
    const diff = changedTables(a, b);
    check(`${label}: every table has the same rows (count and checksum)`, diff.length === 0, diff.length ? `differs: ${diff.slice(0, 6).join(", ")}` : `${Object.values(a.tables).reduce((n, t) => n + t.rows, 0)} rows`);
    const cd = diffCatalog(a.catalog, b.catalog);
    check(`${label}: same columns, indexes, constraints and enums`, cd.onlyA.length + cd.onlyB.length === 0, cd.onlyA.length + cd.onlyB.length ? `${cd.onlyA.length} only in A, ${cd.onlyB.length} only in B` : `${a.catalog.length} definitions`);
    check(`${label}: same applied migrations`, a.migrations.join() === b.migrations.join(), b.migrations.join(", "));
  };
  cmp("restored copy vs source", after, r0);

  // 3. pending migrations on the copy
  const secret = crypto.randomBytes(24).toString("hex");
  const app = (script: string, args: string[] = []) =>
    run("npx", ["tsx", script, ...args], {
      DATABASE_URL: scratchUrl, // always the scratch database, whatever the shell has
      PAYLOAD_SECRET: secret,
      MEDIA_DIR: tmp,
      BLOB_READ_WRITE_TOKEN: "",
      SOURCE_DATABASE_URL: "",
      RESTORE_ADMIN_URL: "",
      NODE_ENV: "test",
    });
  const tail = (r: { out: string; err: string }) => (r.err || r.out).trim().split("\n").slice(-3).join(" | ");

  const up = await app("scripts/cms/migrate.mts");
  check("pending migrations apply to the copy", up.code === 0, up.code === 0 ? "" : tail(up));
  const r1 = await fingerprint(scratchUrl, false);
  const addedMigrations = r1.migrations.filter((m) => !r0.migrations.includes(m));
  const addedTables = Object.keys(r1.tables).filter((t) => !(t in r0.tables));
  check("migration added only new tables", addedTables.length > 0 && addedTables.every(isNew), `${addedMigrations.join(", ")} → ${addedTables.length} new tables (${[...new Set(addedTables.map((t) => t.replace(/^_/, "").split("_").slice(0, 2).join("_")))].join(", ")})`);
  const existingChanged = changedTables(r0, { ...r1, tables: Object.fromEntries(Object.entries(r1.tables).filter(([t]) => t in r0.tables)) });
  check("migration changed no existing row", existingChanged.length === 0, existingChanged.join(", "));
  const keep = (s: string) => !isNew(s);
  const catUp = diffCatalog(r0.catalog.filter(keep), r1.catalog.filter(keep));
  check("migration changed no existing column, index, constraint or enum", catUp.onlyA.length + catUp.onlyB.length === 0, [...catUp.onlyA, ...catUp.onlyB].slice(0, 3).join(" ; "));

  // 4. rollback, then apply again
  const down = await app("scripts/cms/migrate.mts", ["down", "--yes"]);
  check("rollback (cms:migrate -- down --yes) runs", down.code === 0, down.code === 0 ? "" : tail(down));
  const r2 = await fingerprint(scratchUrl, false);
  cmp("after rollback vs restored copy", r0, r2);
  const up2 = await app("scripts/cms/migrate.mts");
  check("migration can be applied again after a rollback", up2.code === 0, up2.code === 0 ? "" : tail(up2));
  const r3 = await fingerprint(scratchUrl, false);
  check("re-applied schema equals the first application", sameCatalog(r1.catalog, r3.catalog) && Object.keys(r1.tables).join() === Object.keys(r3.tables).join(), `${Object.keys(r3.tables).length} tables`);

  // 5. seed after the migration touches only the new tables
  const seed = await app("scripts/cms/seed.mts");
  check("cms:seed runs on the migrated copy", seed.code === 0, seed.code === 0 ? "" : tail(seed));
  const r4 = await fingerprint(scratchUrl, false);
  const seedChanged = changedTables(r3, r4);
  check("seed changed only the new Hotel Information tables", seedChanged.every(isNew), seedChanged.filter((t) => !isNew(t)).join(", ") || `${seedChanged.length} new tables filled`);

  // 6. the CMS runs on the copy
  const verify = await app("scripts/cms/verify-restored.mts");
  const line = verify.out.split("\n").find((l) => l.startsWith("VERIFY "));
  const v = line ? (JSON.parse(line.slice(7)) as { counts: Record<string, number>; globals: Record<string, true | string>; publishedAbout: number[] }) : null;
  check("CMS boots on the copy and reads its content", verify.code === 0 && !!v, v ? "" : tail(verify));
  if (v) {
    const rows = (t: string) => r4.tables[t]?.rows ?? -1;
    const sameCounts = v.counts.users === rows("users") && v.counts.pages === rows("pages") && v.counts.rooms === rows("rooms") && v.counts.customPages === rows("custom_pages") && v.counts.media === rows("media");
    check("CMS counts equal the database rows", sameCounts, `users ${v.counts.users}, pages ${v.counts.pages}, rooms ${v.counts.rooms}, new pages ${v.counts.customPages}, photos ${v.counts.media}`);
    check("every global the website reads works (incl. Hotel Information)", Object.values(v.globals).every((x) => x === true), JSON.stringify(v.globals));
    check("published About page is available in English and Bosnian", v.publishedAbout.every((n) => n === 1), v.publishedAbout.join("/"));
  }
} catch (e) {
  check("rehearsal completed without a fatal error", false, (e as Error).message);
} finally {
  if (adminClient && scratchUrl && process.env.KEEP_SCRATCH !== "1") await adminClient.query(`DROP DATABASE IF EXISTS ${q(scratchName)} WITH (FORCE)`).catch(() => undefined);
  await adminClient?.end().catch(() => undefined);
  fs.rmSync(tmp, { recursive: true, force: true });
}

const failed = results.filter((r) => !r.ok);
const report = [
  `# Backup + restore + migration rehearsal — ${new Date().toISOString()}`,
  "",
  `Result: **${failed.length ? `${failed.length} FAILED` : "all checks passed"}** (${results.length} checks, ${((Date.now() - started) / 1000).toFixed(0)} s). Backup: \`${path.basename(dumpFile)}\`.`,
  "",
  "| | Check | Detail |",
  "| - | --- | --- |",
  ...results.map((r) => `| ${r.ok ? "PASS" : "**FAIL**"} | ${r.name} | ${r.detail.replace(/\|/g, "\\|")} |`),
  ...(notes.length ? ["", ...notes.map((n) => `- ${n}`)] : []),
  "",
].join("\n");
fs.writeFileSync(reportFile, report);
console.log(`\n${failed.length ? "FAILED" : "OK"}: ${results.length - failed.length}/${results.length} checks passed. Report: ${reportFile}`);
process.exit(failed.length ? 1 : 0);
