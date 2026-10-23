import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { pageKeys } from "@/cms/blocks/types";
import { resolveLayout } from "@/cms/resolve";
import { seedPage } from "@/cms/seedPages";
import { staticLayout } from "@/content/layouts";
import { locales } from "@/lib/i18n";
import { boot, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
});
afterAll(async () => h?.stop());

describe("static layouts", () => {
  it.each(pageKeys)("%s has the same section structure in both languages", (key) => {
    const [en, bs] = [staticLayout(key, "en"), staticLayout(key, "bs")];
    expect(bs.blocks.map((b) => b.type)).toEqual(en.blocks.map((b) => b.type));
  });
});

describe("migration of the seven static pages", () => {
  it("seeding is idempotent and never overwrites", async () => {
    for (const key of pageKeys) expect(await seedPage(payload, key)).toBe("created");
    const before = (await payload.find({ collection: "pages", limit: 20, overrideAccess: true, locale: "en" })).docs.map((d) => d.updatedAt);
    for (const key of pageKeys) expect(await seedPage(payload, key)).toBe("exists");
    const after = (await payload.find({ collection: "pages", limit: 20, overrideAccess: true, locale: "en" })).docs.map((d) => d.updatedAt);
    expect(after).toEqual(before);
  });

  for (const key of pageKeys) {
    for (const locale of locales) {
      it(`round trip: ${key}/${locale} — resolve(seeded document) deep-equals the static layout`, async () => {
        const doc = (await payload.find({ collection: "pages", where: { slug: { equals: key } }, locale, fallbackLocale: false, depth: 1, overrideAccess: false })).docs[0];
        const { blocks, skipped } = resolveLayout(doc.layout, locale);
        expect(skipped).toEqual([]);
        const expected = staticLayout(key, locale);
        expect(blocks).toEqual(expected.blocks);
        expect({ title: doc.metaTitle, description: doc.metaDescription }).toEqual(expected.meta);
      });
    }
  }
});
