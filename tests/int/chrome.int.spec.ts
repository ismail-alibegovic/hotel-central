import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mergeChrome } from "@/cms/chromeMerge";
import { seedGlobals } from "@/cms/seedGlobals";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import type { Footer, Navigation } from "@/payload-types";
import { boot, rand, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;
let editor: never;

const nav = (locale: "en" | "bs", draft = false) => payload.findGlobal({ slug: "navigation", locale, fallbackLocale: false, draft, depth: 0, overrideAccess: true }) as Promise<Navigation>;
const foot = (locale: "en" | "bs", draft = false) => payload.findGlobal({ slug: "footer", locale, fallbackLocale: false, draft, depth: 0, overrideAccess: true }) as Promise<Footer>;
const publicNav = (locale: "en" | "bs") => payload.findGlobal({ slug: "navigation", locale, fallbackLocale: false, depth: 0, overrideAccess: false }) as Promise<Navigation>;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  await payload.create({ collection: "users", data: { email: `first-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  const u = await payload.create({ collection: "users", data: { email: `ed-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  editor = { ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const } as never;
});
afterAll(async () => h?.stop());

describe("seeding", () => {
  it("creates both globals from the built-in text and is idempotent", async () => {
    expect(await seedGlobals(payload)).toEqual({ navigation: "created", footer: "created" });
    expect(await seedGlobals(payload)).toEqual({ navigation: "exists", footer: "exists" });
  });

  it("merging the seeded globals back into the dictionary is lossless in both languages", async () => {
    for (const l of ["en", "bs"] as const) {
      const base = getDictionary(l);
      const merged = mergeChrome(l, base, await publicNav(l), (await payload.findGlobal({ slug: "footer", locale: l, fallbackLocale: false, depth: 0, overrideAccess: false })) as Footer);
      expect(merged.dict.nav).toEqual(base.nav);
      expect(merged.dict.footer).toEqual(base.footer);
      expect(merged.social).toEqual([{ label: "Facebook", href: hotel.facebook }]);
    }
  });
});

describe("merge rules", () => {
  const base = getDictionary("en");
  it("no documents = the dictionary untouched", () => {
    const m = mergeChrome("en", base, null, null);
    expect(m.dict).toBe(base);
  });

  it("empty fields keep the built-in text; untranslated entries are left out, never shown empty", () => {
    const n = { items: [{ label: "", path: "/spa", visible: true }, { label: "Wellness", path: "/spa", visible: true }], menuLabel: "  " } as unknown as Navigation;
    const m = mergeChrome("en", base, n, null);
    expect(m.dict.nav.menu).toBe(base.nav.menu);
    expect(m.dict.nav.items).toEqual([{ href: "/spa", label: "Wellness" }]);
  });

  it("hidden entries are left out; with no usable entry the built-in menu is used", () => {
    const hidden = { items: [{ label: "A", path: "/spa", visible: false }] } as unknown as Navigation;
    expect(mergeChrome("en", base, hidden, null).dict.nav.items).toEqual(base.nav.items);
  });

  it("an invalid path (language prefix, scheme, traversal) never becomes a menu link", () => {
    const bad = { items: ["/en/spa", "https://evil.example", "javascript:alert(1)", "//evil.example", "/a/../b", "spa"].map((path) => ({ label: "X", path, visible: true })) } as unknown as Navigation;
    expect(mergeChrome("en", base, bad, null).dict.nav.items).toEqual(base.nav.items);
  });

  it("social links must be approved https hosts; otherwise Facebook as built in", () => {
    const ok = { social: [{ label: "Instagram", link: { kind: "external", value: "https://www.instagram.com/hotelcentral" } }] } as unknown as Footer;
    expect(mergeChrome("en", base, null, ok).social).toEqual([{ label: "Instagram", href: "https://www.instagram.com/hotelcentral" }]);
    const bad = { social: [{ label: "Evil", link: { kind: "external", value: "https://evil.example/x" } }, { label: "Tel", link: { kind: "phone", value: "+387 33 561 800" } }] } as unknown as Footer;
    expect(mergeChrome("en", base, null, bad).social).toEqual([{ label: "Facebook", href: hotel.facebook }]);
  });

  it("the footer statement is split into lines", () => {
    expect(mergeChrome("en", base, null, { statement: "Grand\n\nHotel" } as Footer).dict.footer.statement).toEqual(["Grand", "Hotel"]);
  });
});

describe("roles and drafts", () => {
  it("anonymous visitors read published content only, in the right language", async () => {
    const bsLabel = await (async () => (await publicNav("bs")).items?.[1]?.label)();
    expect(bsLabel).toBe(getDictionary("bs").nav.items[1].label);
    await payload.updateGlobal({ slug: "navigation", locale: "en", overrideAccess: true, data: { menuLabel: "Menu EN 2", _status: "published" } as never });
    expect((await publicNav("en")).menuLabel).toBe("Menu EN 2");
    expect((await publicNav("bs")).menuLabel).toBe(getDictionary("bs").nav.menu);
  });

  it("an editor's wording change is a draft: the public navigation does not change", async () => {
    await payload.updateGlobal({ slug: "navigation", locale: "en", user: editor, overrideAccess: false, draft: true, data: { menuLabel: "Editor draft" } as never });
    expect((await publicNav("en")).menuLabel).toBe("Menu EN 2");
    expect((await nav("en", true)).menuLabel).toBe("Editor draft");
  });

  it("an editor cannot publish, with or without the draft flag", async () => {
    await expect(payload.updateGlobal({ slug: "navigation", locale: "en", user: editor, overrideAccess: false, draft: true, data: { menuLabel: "x", _status: "published" } as never })).rejects.toThrow();
    await expect(payload.updateGlobal({ slug: "navigation", locale: "en", user: editor, overrideAccess: false, data: { menuLabel: "sneaky" } as never })).rejects.toThrow();
    expect((await publicNav("en")).menuLabel).toBe("Menu EN 2");
  });

  it("an editor can reword an entry but cannot add, remove, reorder, retarget or hide entries", async () => {
    const current = await nav("en", true);
    const rows = (current.items ?? []).map((r) => ({ ...r }));
    const save = (items: unknown[]) => payload.updateGlobal({ slug: "navigation", locale: "en", user: editor, overrideAccess: false, draft: true, data: { items } as never });

    rows[1].label = "About us (draft)";
    await save(rows);
    expect((await nav("en", true)).items?.[1].label).toBe("About us (draft)");

    await expect(save(rows.slice(0, -1))).rejects.toThrow(); // remove
    await expect(save([...rows, { label: "New", path: "/new", visible: true }])).rejects.toThrow(); // add
    await expect(save([rows[1], rows[0], ...rows.slice(2)])).rejects.toThrow(); // reorder
    await save(rows.map((r, i) => (i === 1 ? { ...r, path: "/elsewhere", visible: false } : r))); // retarget / hide: field access drops the value (checked below)
    const afterAttempts = await nav("en", true);
    expect(afterAttempts.items?.map((r) => r.path)).toEqual(getDictionary("en").nav.items.map((i) => i.href));
    expect(afterAttempts.items?.every((r) => r.visible)).toBe(true);
  });

  it("administrators can publish structural changes; invalid destinations are refused for everyone", async () => {
    const current = await nav("en", true);
    const rows = current.items ?? [];
    await expect(payload.updateGlobal({ slug: "navigation", locale: "en", overrideAccess: true, data: { items: rows.map((r, i) => (i === 1 ? { ...r, path: "/en/about" } : r)), _status: "published" } as never })).rejects.toThrow();
    await expect(payload.updateGlobal({ slug: "navigation", locale: "en", overrideAccess: true, data: { items: rows.map((r, i) => (i === 1 ? { ...r, path: "https://evil.example" } : r)), _status: "published" } as never })).rejects.toThrow();
    await payload.updateGlobal({ slug: "navigation", locale: "en", overrideAccess: true, data: { items: rows.map((r, i) => (i === 7 ? { ...r, visible: false } : r)), _status: "published" } as never });
    const m = mergeChrome("en", getDictionary("en"), await publicNav("en"), null);
    expect(m.dict.nav.items.map((i) => i.href)).not.toContain("/contact");
    expect(m.dict.nav.items).toHaveLength(7);
  });

  it("footer: social links are administrator-only; wording is draft-only for editors; host allow-list enforced", async () => {
    await expect(payload.updateGlobal({ slug: "footer", locale: "en", user: editor, overrideAccess: false, draft: true, data: { social: [{ label: "X", link: { kind: "external", value: "https://www.facebook.com/x" } }] } as never })).resolves.toBeDefined();
    // the field access dropped it: still exactly the seeded link, in draft and published
    expect((await foot("en", true)).social).toHaveLength(1);
    expect((await foot("en", true)).social?.[0].label).toBe("Facebook");
    await expect(payload.updateGlobal({ slug: "footer", locale: "en", overrideAccess: true, data: { social: [{ label: "Evil", link: { kind: "external", value: "https://evil.example/" } }], _status: "published" } as never })).rejects.toThrow();
    await payload.updateGlobal({ slug: "footer", locale: "en", user: editor, overrideAccess: false, draft: true, data: { rights: "Draft rights" } as never });
    expect((await payload.findGlobal({ slug: "footer", locale: "en", depth: 0, overrideAccess: false })).rights).toBe(getDictionary("en").footer.rights);
    await expect(payload.updateGlobal({ slug: "footer", locale: "en", user: editor, overrideAccess: false, data: { rights: "no draft flag" } as never })).rejects.toThrow();
  });

  it("anonymous visitors cannot write", async () => {
    await expect(payload.updateGlobal({ slug: "navigation", locale: "en", overrideAccess: false, data: { menuLabel: "anon" } as never })).rejects.toThrow();
    await expect(payload.updateGlobal({ slug: "footer", locale: "en", overrideAccess: false, data: { rights: "anon" } as never })).rejects.toThrow();
  });
});
