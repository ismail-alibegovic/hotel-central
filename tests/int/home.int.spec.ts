import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { img } from "@/components/home/homeImages";
import { mergeHome } from "@/cms/homeMerge";
import { homeToCms, seedHome } from "@/cms/seedHome";
import { getDictionary } from "@/content/dictionary";
import type { Homepage } from "@/payload-types";
import { boot, rand, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;
let editor: never;
const read = (locale: "en" | "bs", draft = false, access = false) => payload.findGlobal({ slug: "homepage", locale, fallbackLocale: false, draft, depth: 1, overrideAccess: !access }) as Promise<Homepage>;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  await payload.create({ collection: "users", data: { email: `first-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  const u = await payload.create({ collection: "users", data: { email: `ed-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  editor = { ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const } as never;
});
afterAll(async () => h?.stop());

describe("home page migration", () => {
  it("seeds both languages and is idempotent", async () => {
    expect(await seedHome(payload)).toBe("created");
    expect(await seedHome(payload)).toBe("exists");
  });

  it("the seeded global merged over the built-in text is exactly the built-in text, in both languages", async () => {
    for (const l of ["en", "bs"] as const) {
      const dict = getDictionary(l);
      const merged = mergeHome(dict, await read(l, false, true));
      expect(merged.dict).toEqual(dict);
      expect(merged.images).toEqual({});
      expect(merged.meta).toEqual({ title: dict.meta.title, description: dict.meta.description, ogImage: undefined });
    }
  });

  it("homeToCms covers every home string (nothing is left only in code)", () => {
    const cms = JSON.stringify(homeToCms(getDictionary("en")));
    const home = getDictionary("en").home;
    const strings = (v: unknown): string[] => (typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === "object" ? Object.values(v).flatMap(strings) : []);
    for (const s of strings(home)) expect(cms, s).toContain(JSON.stringify(s).slice(1, -1));
  });
});

describe("merge rules", () => {
  const base = getDictionary("en");
  const doc = (over: Record<string, unknown>) => over as unknown as Homepage;

  it("no document = the dictionary untouched", () => {
    expect(mergeHome(base, null).dict).toBe(base);
  });

  it("only what is filled in changes; empty and whitespace keep the built-in text", () => {
    const m = mergeHome(base, doc({ hero: { tagline: "  New tagline  ", label: "   " }, spa: { facts: [{ text: "" }] } }));
    expect(m.dict.home.heroTagline).toBe("New tagline");
    expect(m.dict.home.heroLabel).toBe(base.home.heroLabel);
    expect(m.dict.home.spa.facts).toEqual(base.home.spa.facts);
    expect(m.dict.home.hotel).toEqual(base.home.hotel);
  });

  it("titles are split into lines; lists replace the built-in list only with usable rows", () => {
    const m = mergeHome(base, doc({ hero: { title: "Grand\n\nHotel" }, spa: { facts: [{ text: "Pool" }, { text: " " }, { text: "Sauna" }] }, location: { facts: [{ k: "Airport", v: "20 min" }, { k: "x", v: "" }] } }));
    expect(m.dict.home.heroTitle).toEqual(["Grand", "Hotel"]);
    expect(m.dict.home.spa.facts).toEqual(["Pool", "Sauna"]);
    expect(m.dict.home.location.facts).toEqual([{ k: "Airport", v: "20 min" }]);
  });

  it("photographs: only valid choices become overrides; unknown files and unpopulated uploads are ignored", () => {
    const m = mergeHome(base, doc({
      hero: { image: { staticPath: "3064.jpg", alt: "A new alt", position: "20% 30%" } },
      spa: { imageMain: { staticPath: "not-on-the-site.jpg", alt: "x" }, imageSecondary: { upload: "someid", alt: "y" } },
      events: { imageMain: { upload: { id: "1", url: "/api/media/file/new.jpg", alt: "Media alt" }, alt: "" } },
    }));
    expect(m.images.hero).toEqual({ src: "/images/3064.jpg", alt: "A new alt", position: "20% 30%" });
    expect(m.images.spaMain).toBeUndefined();
    expect(m.images.spaSecondary).toBeUndefined();
    expect(m.images.eventsMain?.src).toBe("/api/media/file/new.jpg");
  });

  it("an override replaces the file, alt text and focus point together; a decorative duplicate stays decorative", () => {
    const d = { src: "/images/3069.jpg", alt: "Built-in description", position: "50% 60%" };
    expect(img(undefined, d)).toEqual(d);
    expect(img({ src: "/images/x.jpg", alt: "New description" }, d)).toEqual({ src: "/images/x.jpg", alt: "New description", position: undefined });
    expect(img({ src: "/images/x.jpg" }, d).alt).toBe(""); // never the old photograph's description
    expect(img({ src: "/images/x.jpg", alt: "New" }, { src: "/images/3069.jpg", alt: "" }).alt).toBe("");
  });

  it("search-engine title and description come from the CMS when set", () => {
    const m = mergeHome(base, doc({ metaTitle: "My title", metaDescription: "My description" }));
    expect(m.meta).toMatchObject({ title: "My title", description: "My description" });
  });
});

describe("roles and drafts", () => {
  it("an administrator publishes per language; the other language is untouched; anonymous cannot write", async () => {
    await payload.updateGlobal({ slug: "homepage", locale: "bs", overrideAccess: true, data: { hero: { tagline: "Samo bosanski" }, _status: "published" } as never });
    expect((await read("bs", false, true)).hero?.tagline).toBe("Samo bosanski");
    expect((await read("en", false, true)).hero?.tagline).toBe(getDictionary("en").home.heroTagline);
    await expect(payload.updateGlobal({ slug: "homepage", locale: "en", overrideAccess: false, data: { hero: { tagline: "anon" } } as never })).rejects.toThrow();
  });

  it("an editor's change is a draft; the public home page does not change; editors cannot publish", async () => {
    await payload.updateGlobal({ slug: "homepage", locale: "en", user: editor, overrideAccess: false, draft: true, data: { hero: { tagline: "Editor draft tagline" } } as never });
    expect((await read("en", false, true)).hero?.tagline).toBe(getDictionary("en").home.heroTagline);
    expect((await read("en", true)).hero?.tagline).toBe("Editor draft tagline");
    await expect(payload.updateGlobal({ slug: "homepage", locale: "en", user: editor, overrideAccess: false, draft: true, data: { hero: { tagline: "x" }, _status: "published" } as never })).rejects.toThrow();
    await expect(payload.updateGlobal({ slug: "homepage", locale: "en", user: editor, overrideAccess: false, data: { hero: { tagline: "no draft flag" } } as never })).rejects.toThrow();
    expect((await read("en", false, true)).hero?.tagline).toBe(getDictionary("en").home.heroTagline);
  });

  it("publishing is document-level: an administrator's publish also publishes the pending draft of the other language (the admin form shows it)", async () => {
    await payload.updateGlobal({ slug: "homepage", locale: "bs", overrideAccess: true, data: { hero: { tagline: "Objavljeno" }, _status: "published" } as never });
    expect((await read("en", false, true)).hero?.tagline).toBe("Editor draft tagline"); // the editor's English draft went live with it
    await payload.updateGlobal({ slug: "homepage", locale: "en", overrideAccess: true, data: { hero: { tagline: getDictionary("en").home.heroTagline }, _status: "published" } as never });
  });

  it("alt text is required once a replacement photograph is chosen; focus point must be well-formed", async () => {
    await expect(payload.updateGlobal({ slug: "homepage", locale: "en", overrideAccess: true, data: { hero: { image: { staticPath: "3064.jpg" } }, _status: "published" } as never })).rejects.toThrow();
    await expect(payload.updateGlobal({ slug: "homepage", locale: "en", overrideAccess: true, data: { hero: { image: { staticPath: "3064.jpg", alt: "ok", position: "javascript:1" } }, _status: "published" } as never })).rejects.toThrow();
    await payload.updateGlobal({ slug: "homepage", locale: "en", overrideAccess: true, data: { hero: { image: { staticPath: "3064.jpg", alt: "ok", position: "50% 40%" } }, _status: "published" } as never });
    const m = mergeHome(getDictionary("en"), await read("en", false, true));
    expect(m.images.hero).toEqual({ src: "/images/3064.jpg", alt: "ok", position: "50% 40%" });
  });
});
