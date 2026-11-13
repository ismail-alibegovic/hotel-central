// Dumps Next.js source-of-truth content to wordpress/content/*.json (run from repo root: npx tsx wordpress/scripts/dump-content.ts)
import fs from "node:fs";
import { getDictionary } from "../../src/content/dictionary";
import { getPages } from "../../src/content/pages";
import { rooms } from "../../src/content/rooms";
import { hotel, booking, maps } from "../../src/content/hotel";
import * as layouts from "../../src/content/layouts";
import { getClubCopy, memberships, timetable } from "../../src/content/club";
import { getDaySpaCopy, treatmentGroups, spaBookingUrl, DAY_SPA_SOURCE } from "../../src/content/dayspa";
import { legacyRedirects, sectionPaths } from "../../src/lib/pagePaths";
// Written twice: content/ (read by the seeder) and the plugin's data/ (read by the live site), so the two never drift.
const outs = ["wordpress/content", "wordpress/plugin/hotel-central-core/data"];
for (const o of outs) fs.mkdirSync(o, { recursive: true });
const w = (n: string, d: unknown) => { for (const o of outs) fs.writeFileSync(`${o}/${n}.json`, JSON.stringify(d, null, 1)); };
// Interface strings used only by the WordPress theme (registered in Polylang → Languages → Translations like the rest).
const wpExtra = {
  en: { footer: { alsoAt: "Also at Hotel Central", primaryLogo: "Hotel Central Sarajevo" }, nav: { subpages: "Pages in this section" } },
  bs: { footer: { alsoAt: "Također u Hotelu Central", primaryLogo: "Hotel Central Sarajevo" }, nav: { subpages: "Stranice u ovoj sekciji" } },
};
const dict = (l: "en" | "bs") => { const d = getDictionary(l); return { ...d, footer: { ...d.footer, ...wpExtra[l].footer }, nav: { ...d.nav, ...wpExtra[l].nav } }; };
w("dictionary", { en: dict("en"), bs: dict("bs") });
w("pages", { en: getPages("en"), bs: getPages("bs") });
w("rooms", rooms);
w("hotel", { hotel: { ...hotel, siteUrl: undefined }, booking: { ...booking, roomUrl: undefined }, maps });
w("layouts", { pagePaths: layouts.pagePaths, ...Object.fromEntries(["en", "bs"].map((l) => [l, Object.fromEntries(Object.keys(layouts.pagePaths).map((k) => [k, layouts.staticLayout(k as any, l as any)]))])) });
// Round 1 (Nov 2026): Central Fitness Club and Central Day Spa sections, new sitemap and old-address redirects.
w("club", { en: getClubCopy("en"), bs: getClubCopy("bs"), memberships, timetable });
w("dayspa", { en: getDaySpaCopy("en"), bs: getDaySpaCopy("bs"), treatmentGroups, booking: { en: spaBookingUrl("en"), bs: spaBookingUrl("bs") }, source: DAY_SPA_SOURCE });
w("sitemap", { sectionPaths, legacyRedirects });
