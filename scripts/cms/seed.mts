/**
 * Idempotent seed: copies the existing static content for the seven pages and six rooms into the CMS,
 * in both locales. A document that already exists is never touched, so repeated runs
 * cannot overwrite editor changes. Run: npm run cms:seed   (needs DATABASE_URL + PAYLOAD_SECRET)
 *
 * Optional bootstrap admin (dev/staging only): SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD from the
 * environment — nothing is hard-coded and no account is created without them.
 */
import "./tsxEnvShim.mts";
import { getPayload } from "payload";
import configModule from "@payload-config";
import { pageKeys } from "../../src/cms/blocks/types";
import { seedGlobals } from "../../src/cms/seedGlobals";
import { seedHome } from "../../src/cms/seedHome";
import { seedPage } from "../../src/cms/seedPages";
import { rooms } from "../../src/content/rooms";
import { locales } from "../../src/lib/i18n";

// tsx may wrap the default export (CJS interop); unwrap if so.
const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
// Idempotent: applies only migrations that have not run yet (the schema is never changed by a deployment itself).
await (payload.db as unknown as { migrate: () => Promise<void> }).migrate();

if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
  const { totalDocs } = await payload.count({ collection: "users", where: { email: { equals: process.env.SEED_ADMIN_EMAIL } } });
  if (!totalDocs) {
    await payload.create({ collection: "users", data: { email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD, role: "admin", name: "Seed admin" } });
    console.log("created admin from SEED_ADMIN_EMAIL");
  }
}

const roomData = (slug: string) => (l: (typeof locales)[number]) => {
  const room = rooms.find((r) => r.slug === slug)!;
  const rows = (xs: string[]) => xs.map((text) => ({ text }));
  return {
    name: room.name[l],
    titleLines: room.titleLines[l].join("\n"),
    feature: room.feature[l],
    sizeLabel: room.sizeLabel[l],
    summary: room.summary[l],
    description: rows(room.description[l]),
    highlights: rows(room.highlights[l]),
    amenities: rows(room.amenities[l]),
  };
};

async function seed<C extends "pages" | "rooms">(collection: C, slug: string, base: Record<string, unknown>, data: (l: (typeof locales)[number]) => Record<string, unknown>) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, draft: true, depth: 0 });
  if (existing.totalDocs) return console.log(`${collection}/${slug}: exists, left untouched`);
  const created = await payload.create({ collection, locale: "en", data: { slug, ...base, ...data("en"), _status: "published" } as never });
  await payload.update({ collection, id: created.id, locale: "bs", data: data("bs") as never });
  console.log(`${collection}/${slug}: created (en + bs, published)`);
}

// Pages: structure is shared, text is per language (see src/cms/seedPages.ts).
for (const key of pageKeys) console.log(`pages/${key}: ${await seedPage(payload, key)}`);

console.log("globals:", JSON.stringify(await seedGlobals(payload)));
console.log("homepage:", await seedHome(payload));

for (const [i, room] of rooms.entries()) {
  await seed("rooms", room.slug, { roomTypeId: room.roomTypeId, sizeM2: room.sizeM2, order: i + 1, visible: true }, roomData(room.slug));
}
process.exit(0);
