/**
 * Read-only report: which content saved in the CMS database differs from the built-in (static) content, i.e. what
 * would hide a change made in code (such as the client change list of 26.11.2026) once the CMS is on.
 *   DATABASE_URL=<pooler> PAYLOAD_SECRET=<secret> npm run cms:check-overrides
 * Reads only (published versions, as the public sees them). Never prints connection strings or personal data.
 * Exit code 1 when at least one override differs from the code, so it can gate a release.
 */
import "./tsxEnvShim.mts";
import { getPayload } from "payload";
import configModule from "@payload-config";
import { isDeepStrictEqual } from "node:util";
import { staticLayout } from "../../src/content/layouts";
import { pageKeys } from "../../src/cms/blocks/types";
import { resolveLayout } from "../../src/cms/resolve";
import { mergeRooms } from "../../src/cms/overrides";
import { mergeChrome } from "../../src/cms/chromeMerge";
import { mergeClub, mergeSpa, builtInSpa } from "../../src/cms/brandsMerge";
import { mergeHome } from "../../src/cms/homeMerge";
import { rooms as staticRooms } from "../../src/content/rooms";
import { getDictionary } from "../../src/content/dictionary";
import { clubCopy, defaultClasses } from "../../src/content/club";
import { locales } from "../../src/lib/i18n";

const config = (configModule as unknown as { default?: typeof configModule }).default ?? configModule;
const payload = await getPayload({ config });
const rows: [string, string, string][] = [];
const note = (what: string, locale: string, differs: boolean) => rows.push([what, locale, differs ? "DIFFERS from code" : "same as code"]);
// Compare as JSON (drops undefined fields, like the site does when it renders).
const same = (a: unknown, b: unknown) => isDeepStrictEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)));

for (const locale of locales) {
  for (const key of pageKeys) {
    const doc = (await payload.find({ collection: "pages", where: { slug: { equals: key } }, locale, fallbackLocale: false, depth: 1, limit: 1 })).docs[0];
    if (!doc) { rows.push([`page ${key}`, locale, "not in the CMS (code is used)"]); continue; }
    const { blocks } = resolveLayout(doc.layout, locale);
    const expected = staticLayout(key, locale);
    note(`page ${key}: sections`, locale, !same(blocks, expected.blocks));
    note(`page ${key}: Google title/description`, locale, !same({ t: doc.metaTitle ?? expected.meta.title, d: doc.metaDescription ?? expected.meta.description }, { t: expected.meta.title, d: expected.meta.description }));
  }
  const roomDocs = (await payload.find({ collection: "rooms", locale, fallbackLocale: false, depth: 1, limit: 50 })).docs;
  const merged = mergeRooms(staticRooms, roomDocs, locale);
  for (const r of staticRooms) {
    const m = merged.find((x) => x.slug === r.slug);
    note(`room ${r.slug}`, locale, !m || !same({ s: m.summary[locale], d: m.description[locale], a: m.amenities[locale], h: m.highlights[locale] }, { s: r.summary[locale], d: r.description[locale], a: r.amenities[locale], h: r.highlights[locale] }));
  }
  const dict = getDictionary(locale);
  const nav = await payload.findGlobal({ slug: "navigation", locale, fallbackLocale: false, depth: 0 }).catch(() => null);
  const foot = await payload.findGlobal({ slug: "footer", locale, fallbackLocale: false, depth: 0 }).catch(() => null);
  const chrome = mergeChrome(locale, dict, nav as never, foot as never);
  note("menu (Navigation)", locale, !same(chrome.dict.nav.items, dict.nav.items));
  const home = await payload.findGlobal({ slug: "homepage", locale, fallbackLocale: false, depth: 1 }).catch(() => null);
  note("home page texts", locale, !same(mergeHome(dict, home as never).dict.home, dict.home));
  const club = await payload.findGlobal({ slug: "fitness-club", locale, fallbackLocale: false, depth: 1 }).catch(() => null);
  const c = clubCopy(locale);
  const mc = mergeClub(club as never, c.membership.defaultPlans, defaultClasses);
  note("club memberships", locale, !same(mc.plans, c.membership.defaultPlans));
  note("club timetable", locale, !same(mc.timetable.classes, defaultClasses) || Boolean(mc.timetable.file));
  const spa = await payload.findGlobal({ slug: "day-spa", locale, fallbackLocale: false, depth: 1 }).catch(() => null);
  note("spa prices and packages", locale, !same(mergeSpa(locale, spa as never), builtInSpa(locale)));
}

const w = Math.max(...rows.map((r) => r[0].length));
for (const [what, locale, state] of rows) console.log(`${state.startsWith("DIFFERS") ? "!!" : "  "} ${what.padEnd(w)}  ${locale}  ${state}`);
const n = rows.filter((r) => r[2].startsWith("DIFFERS")).length;
console.log(`\n${n} item(s) saved in the CMS differ from the code. Update them in /admin (or delete the saved copy) before switching the CMS on for the client.`);
process.exit(n ? 1 : 0);
