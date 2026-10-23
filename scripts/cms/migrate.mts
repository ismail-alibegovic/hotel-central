/**
 * Database migrations (PostgreSQL). The payload CLI cannot be used here for the same reason as `generate:types`
 * (see generate.mts), so this wraps the adapter's own migration API.
 *   npm run cms:migrate                 apply pending migrations (idempotent)
 *   npm run cms:migrate -- create <name>  generate a migration from the current collections/globals
 *   npm run cms:migrate -- status        list applied / pending migrations
 * Needs DATABASE_URL + PAYLOAD_SECRET. Never prints connection strings.
 */
import "./tsxEnvShim.mts";
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import configModule from "@payload-config";

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
const db = payload.db as unknown as {
  migrate: () => Promise<void>;
  migrateStatus: () => Promise<void>;
  createMigration: (args: { payload: typeof payload; migrationName?: string; forceAcceptWarning?: boolean }) => Promise<void>;
};

const [cmd = "up", name] = process.argv.slice(2);
if (cmd === "create") {
  if (!name) throw new Error("usage: cms:migrate -- create <name>");
  await db.createMigration({ payload, migrationName: name, forceAcceptWarning: true });
  // The generated header imports types as values, which fails when migrations are loaded through a transpiler
  // (tests, tsx). Make the type imports explicit.
  const dir = path.resolve("src/migrations");
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(`_${name}.ts`))) {
    const file = path.join(dir, f);
    fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/^import \{ MigrateUpArgs, MigrateDownArgs, sql \} from ['"]@payloadcms\/db-postgres['"];?/, 'import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";'));
  }
} else if (cmd === "status") {
  await db.migrateStatus();
} else if (cmd === "up") {
  await db.migrate();
} else {
  throw new Error(`unknown command ${cmd}`);
}
await payload.db.destroy?.();
process.exit(0);
