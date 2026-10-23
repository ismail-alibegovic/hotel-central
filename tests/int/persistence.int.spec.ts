import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, PNG_1X1, rand, type Harness } from "./helpers";

/** Content and media written before a restart of the CMS process must be there afterwards. */
let h: Harness;
beforeAll(async () => {
  h = await boot();
});
afterAll(async () => h?.stop());

describe("persistence across a CMS restart", () => {
  it("keeps users, published/draft state, both locales and uploaded media", async () => {
    const p1 = h.payload;
    const slug = "persist-" + rand();
    const email = `p-${rand()}@example.test`;
    await p1.create({ collection: "users", data: { email, password: "Pw-" + rand() } as never, overrideAccess: true });
    const page = await p1.create({ collection: "pages", overrideAccess: true, locale: "en", data: { slug, heroEyebrow: "EN text", _status: "published" } });
    await p1.update({ collection: "pages", id: page.id, overrideAccess: true, locale: "bs", data: { heroEyebrow: "BS tekst", _status: "published" } });
    await p1.update({ collection: "pages", id: page.id, overrideAccess: true, locale: "en", draft: true, data: { heroEyebrow: "EN draft" } });
    const media = await p1.create({ collection: "media", overrideAccess: true, locale: "en", data: { alt: "kept" }, file: { data: PNG_1X1, mimetype: "image/png", name: `keep-${rand()}.png`, size: PNG_1X1.length } });

    // "restart": tear the Payload instance down and build a fresh one against the same database + disk
    await p1.db.destroy?.();
    const { default: config } = await import("@payload-config");
    const p2 = await getPayload({ config, key: "restarted-" + rand() });
    expect(p2).not.toBe(p1);

    expect((await p2.find({ collection: "users", where: { email: { equals: email } }, overrideAccess: true })).totalDocs).toBe(1);
    const en = await p2.findByID({ collection: "pages", id: page.id, locale: "en", overrideAccess: true });
    const bs = await p2.findByID({ collection: "pages", id: page.id, locale: "bs", overrideAccess: true });
    expect([en.heroEyebrow, bs.heroEyebrow, en._status]).toEqual(["EN text", "BS tekst", "published"]);
    const draft = await p2.findByID({ collection: "pages", id: page.id, locale: "en", draft: true, overrideAccess: true });
    expect(draft.heroEyebrow).toBe("EN draft"); // the pending draft survived too
    const m = await p2.findByID({ collection: "media", id: media.id, overrideAccess: true });
    expect(m.alt).toBe("kept");
    expect(fs.readFileSync(path.join(h.mediaDir, m.filename as string)).equals(PNG_1X1)).toBe(true);
    await p2.db.destroy?.();
  });
});
