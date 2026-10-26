/**
 * Read-only application check of a (restored) database, run as a child process by migration-rehearsal.mts:
 * boots the CMS against DATABASE_URL, counts what staff would expect to find, and reads every global the website uses.
 * Prints one line `VERIFY {json}`. Nothing is written.
 */
import "./tsxEnvShim.mts";
import { getPayload } from "payload";
import configModule from "@payload-config";

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });

const count = async (collection: "users" | "pages" | "rooms" | "custom-pages" | "media") => (await payload.count({ collection, overrideAccess: true })).totalDocs;
const read = async (slug: "navigation" | "footer" | "homepage" | "hotel-info") =>
  payload
    .findGlobal({ slug, draft: true, depth: 0, overrideAccess: true })
    .then(() => true)
    .catch((e: unknown) => String((e as Error).message ?? e).slice(0, 120));

const result = {
  counts: { users: await count("users"), pages: await count("pages"), rooms: await count("rooms"), customPages: await count("custom-pages"), media: await count("media") },
  globals: { navigation: await read("navigation"), footer: await read("footer"), homepage: await read("homepage"), hotelInfo: await read("hotel-info") },
  // what the public sees: published documents only, both languages
  publishedAbout: await Promise.all(
    (["en", "bs"] as const).map(async (locale) => (await payload.find({ collection: "pages", where: { slug: { equals: "about" } }, locale, overrideAccess: false, limit: 1 })).totalDocs),
  ),
};
console.log(`VERIFY ${JSON.stringify(result)}`);
process.exit(0);
