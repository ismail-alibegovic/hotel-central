// Dumps Next.js source-of-truth content to wordpress/content/*.json (run from repo root: npx tsx wordpress/scripts/dump-content.ts)
import fs from "node:fs";
import { getDictionary } from "../../src/content/dictionary";
import { getPages } from "../../src/content/pages";
import { rooms } from "../../src/content/rooms";
import { hotel, booking, maps } from "../../src/content/hotel";
import * as layouts from "../../src/content/layouts";
const out = "wordpress/content";
fs.mkdirSync(out, { recursive: true });
const w = (n: string, d: unknown) => fs.writeFileSync(`${out}/${n}.json`, JSON.stringify(d, null, 1));
w("dictionary", { en: getDictionary("en"), bs: getDictionary("bs") });
w("pages", { en: getPages("en"), bs: getPages("bs") });
w("rooms", rooms);
w("hotel", { hotel: { ...hotel, siteUrl: undefined }, booking: { ...booking, roomUrl: undefined }, maps });
w("layouts", { pagePaths: layouts.pagePaths, ...Object.fromEntries(["en", "bs"].map((l) => [l, Object.fromEntries(Object.keys(layouts.pagePaths).map((k) => [k, layouts.staticLayout(k as any, l as any)]))])) });
