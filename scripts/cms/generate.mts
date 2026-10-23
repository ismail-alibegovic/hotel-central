/**
 * Generates src/payload-types.ts and the admin import map.
 * `payload generate:types` cannot be used here: its bundled tsx transform breaks undici's
 * `arguments[0]` constructor check ("Illegal constructor"). Running through the tsx CLI works.
 * Usage: npm run cms:generate   (dummy DATABASE_URL/PAYLOAD_SECRET are fine, no DB connection is made)
 */
import configModule from "@payload-config";
import { generateImportMap } from "payload";
import { generateTypes } from "payload/node";

async function main() {
  // tsx may wrap the default export (CJS interop); unwrap if so.
  const exported = (configModule as unknown as { default?: unknown }).default ?? configModule;
  const sanitized = await (exported as Promise<Parameters<typeof generateTypes>[0]>);
  await generateTypes(sanitized);
  await generateImportMap(sanitized, { log: true });
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
