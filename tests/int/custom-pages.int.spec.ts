import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildView, collectSitemap, usableIn } from "@/cms/customPagesView";
import { pathsForCustomPage } from "@/cms/hooks/revalidate";
import { sampleBlocks } from "@/cms/sampleBlocks";
import { toCmsLayout } from "@/cms/seedLayout";
import { SLUG_MAX, isValidSlug, reservedSlugs, validateSlugFormat } from "@/cms/slugs";
import { customAlternates } from "@/lib/seo";
import type { CustomPage } from "@/payload-types";
import { boot, rand, type Harness } from "./helpers";

describe("slug rules", () => {
  it.each(["offers", "summer-offers", "ponude-2025", "a", "a1-b2"])("accepts %s", (s) => {
    expect(validateSlugFormat(s)).toBe(true);
    expect(isValidSlug(s)).toBe(true);
  });

  it.each(["", "  ", "Offers", "summer offers", "ponude/ljeto", "/offers", "offers/", "-offers", "offers-", "of--fers", "čokolada", "off.ers", "../admin", "a".repeat(SLUG_MAX + 1), "offers?x=1", "<script>"])("rejects %j", (s) => {
    expect(validateSlugFormat(s)).not.toBe(true);
    expect(isValidSlug(s)).toBe(false);
  });

  it("built-in routes, the admin, the API and the languages are reserved", () => {
    for (const s of ["about", "rooms", "spa", "restaurant", "meetings-events", "location", "contact", "admin", "api", "en", "bs", "sitemap", "robots", "images"]) {
      expect(reservedSlugs).toContain(s);
      expect(validateSlugFormat(s)).toMatch(/already used/);
    }
  });
});

describe("pure helpers", () => {
  const doc = (over: Partial<CustomPage>): CustomPage => ({ id: "1", slug: "offers", title: "Offers", layout: [{ blockType: "statement", text: "Hello", tone: "ivory" }], updatedAt: "", createdAt: "", ...over }) as CustomPage;

  it("a language has the page only with an address and a complete section", () => {
    expect(usableIn(doc({}), "en")?.slug).toBe("offers");
    expect(usableIn(doc({ slug: null as never }), "en")).toBeNull();
    expect(usableIn(doc({ slug: "Bad Slug" }), "en")).toBeNull();
    expect(usableIn(doc({ layout: [{ blockType: "statement", text: "", tone: "ivory" }] }), "bs")).toBeNull();
    expect(usableIn(doc({ layout: [] }), "en")).toBeNull();
  });

  it("the view lists only the languages that can show the page, with their own addresses", () => {
    const view = buildView({ doc: doc({}), others: { bs: doc({ slug: "ponude" }) }, draft: false }, "en")!;
    expect(view.paths).toEqual({ en: "/offers", bs: "/ponude" });
    const onlyEn = buildView({ doc: doc({}), others: { bs: doc({ slug: "ponude", layout: [{ blockType: "statement", text: "", tone: "ivory" }] }) }, draft: false }, "en")!;
    expect(onlyEn.paths).toEqual({ en: "/offers" });
    expect(buildView({ doc: doc({ slug: null as never }), others: {}, draft: false }, "en")).toBeNull();
    expect(view.title).toBe("Offers");
    expect(buildView({ doc: doc({ metaTitle: "SEO title" }), others: {}, draft: false }, "en")!.title).toBe("SEO title");
  });

  it("the sitemap lists published, indexable pages per language, each with its own address", () => {
    const a = doc({ id: "a", slug: "offers" });
    const aBs = doc({ id: "a", slug: "ponude" });
    const hidden = doc({ id: "h", slug: "secret", noindex: true });
    const onlyEn = doc({ id: "e", slug: "only-english" });
    const emptyBs = doc({ id: "e", slug: "prazno", layout: [] });
    const entries = collectSitemap({ en: [a, hidden, onlyEn], bs: [aBs, hidden, emptyBs] });
    expect(entries.map((e) => e.paths)).toEqual([{ en: "/offers", bs: "/ponude" }, { en: "/only-english" }]);
  });

  it("alternate-language links only point at languages that have the page", () => {
    expect(customAlternates("bs", { en: "/offers", bs: "/ponude" })).toEqual({
      canonical: "/bs/ponude",
      languages: { en: "/en/offers", "bs-BA": "/bs/ponude", "x-default": "/en/offers" },
    });
    expect(customAlternates("bs", { bs: "/ponude" })).toEqual({ canonical: "/bs/ponude", languages: { "bs-BA": "/bs/ponude", "x-default": "/bs/ponude" } });
  });

  it("cache paths cover every language, the old address after a rename, and the sitemap", () => {
    expect(pathsForCustomPage({ en: "offers", bs: "ponude" })).toEqual(["/en/offers", "/bs/ponude", "/sitemap.xml"]);
    expect(pathsForCustomPage({ en: "offers", bs: null }, ["old-offers", "offers"])).toEqual(["/en/offers", "/en/old-offers", "/bs/old-offers", "/bs/offers", "/sitemap.xml"]);
  });
});

describe("collection", () => {
  let h: Harness;
  let payload: Payload;
  let editor: never;
  const row = (text: string) => [{ blockType: "statement", text, tone: "ivory" }];
  const create = (data: Record<string, unknown>, locale: "en" | "bs" = "en") => payload.create({ collection: "custom-pages", overrideAccess: true, locale, data: data as never });
  const findPublic = async (slug: string, locale: "en" | "bs") => (await payload.find({ collection: "custom-pages", where: { slug: { equals: slug } }, locale, fallbackLocale: false, limit: 5, depth: 0, overrideAccess: false })).docs;

  beforeAll(async () => {
    h = await boot();
    payload = h.payload;
    await payload.create({ collection: "users", data: { email: `first-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
    const u = await payload.create({ collection: "users", data: { email: `ed-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
    editor = { ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const } as never;
  });
  afterAll(async () => h?.stop());

  it("localized addresses: each language has its own, the structure is shared", async () => {
    const p = await create({ title: "Offers", slug: "offers", layout: row("English text"), _status: "published" });
    await payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "bs", data: { title: "Ponude", slug: "ponude", layout: [{ id: (p.layout as { id: string }[])[0].id, blockType: "statement", text: "Bosanski tekst", tone: "ivory" }], _status: "published" } as never });
    expect(await findPublic("offers", "en")).toHaveLength(1);
    expect(await findPublic("ponude", "bs")).toHaveLength(1);
    expect(await findPublic("ponude", "en")).toHaveLength(0); // the Bosnian address does not exist in English
    expect(await findPublic("offers", "bs")).toHaveLength(0);
  });

  it("reserved, malformed and duplicate addresses are refused; the same address may exist in the other language", async () => {
    for (const bad of ["about", "admin", "Bad Slug", "x/y", ""]) {
      await expect(create({ title: "T", slug: bad, layout: row("x"), _status: "published" }), bad).rejects.toThrow();
    }
    const dup = await create({ title: "Dup", slug: "offers", layout: row("x"), _status: "published" }).catch((e) => e as { data?: { errors?: { message: string }[] } });
    expect(JSON.stringify((dup as { data?: unknown }).data)).toMatch(/Another page already uses this address/);
    const other = await create({ title: "Other", slug: "ponude", layout: row("x"), _status: "published" }); // "ponude" is only taken in Bosnian
    expect(other.slug).toBe("ponude");
    await payload.delete({ collection: "custom-pages", id: other.id, overrideAccess: true });
  });

  it("an administrator can change an address; the old one stops existing", async () => {
    const p = await create({ title: "Temp", slug: "temp-page", layout: row("x"), _status: "published" });
    await payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "en", data: { slug: "renamed-page", _status: "published" } as never });
    expect(await findPublic("temp-page", "en")).toHaveLength(0);
    expect(await findPublic("renamed-page", "en")).toHaveLength(1);
    await payload.delete({ collection: "custom-pages", id: p.id, overrideAccess: true });
  });

  it("editors cannot create or delete pages, cannot change addresses, cannot publish; they can edit drafts", async () => {
    await expect(payload.create({ collection: "custom-pages", user: editor, overrideAccess: false, draft: true, locale: "en", data: { title: "Mine", slug: "mine", layout: row("x") } as never })).rejects.toThrow();
    const page = (await findPublic("offers", "en"))[0];
    await expect(payload.delete({ collection: "custom-pages", id: page.id, user: editor, overrideAccess: false })).rejects.toThrow();
    // address change is dropped by field access
    await payload.update({ collection: "custom-pages", id: page.id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { slug: "hijacked", title: "Editor draft title" } as never });
    const draft = await payload.findByID({ collection: "custom-pages", id: page.id, draft: true, locale: "en", overrideAccess: true });
    expect(draft.slug).toBe("offers");
    expect(draft.title).toBe("Editor draft title");
    await expect(payload.update({ collection: "custom-pages", id: page.id, user: editor, overrideAccess: false, locale: "en", data: { title: "x", _status: "published" } as never })).rejects.toThrow();
    await expect(payload.update({ collection: "custom-pages", id: page.id, user: editor, overrideAccess: false, locale: "en", data: { title: "no draft flag" } as never })).rejects.toThrow();
  });

  it("an editor's draft is invisible to the public; the published content is unchanged", async () => {
    const page = (await findPublic("offers", "en"))[0];
    expect(page.title).toBe("Offers");
    const draft = await payload.findByID({ collection: "custom-pages", id: page.id, draft: true, locale: "en", overrideAccess: true });
    expect(draft.title).toBe("Editor draft title");
  });

  it("a page that was never published is not public in any language; unpublishing removes it again", async () => {
    const p = await create({ title: "Hidden", slug: "hidden-page", layout: row("secret"), _status: "draft" });
    expect(await findPublic("hidden-page", "en")).toHaveLength(0);
    // anonymous direct read by id is refused too
    await expect(payload.findByID({ collection: "custom-pages", id: p.id, overrideAccess: false, locale: "en" })).rejects.toThrow();
    await payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "en", data: { _status: "published" } as never });
    expect(await findPublic("hidden-page", "en")).toHaveLength(1);
    await payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "en", data: { _status: "draft" } as never });
    expect(await findPublic("hidden-page", "en")).toHaveLength(0);
    await payload.delete({ collection: "custom-pages", id: p.id, overrideAccess: true });
  });

  it("sample sections cannot be published on a new page, in either language", async () => {
    const rows = toCmsLayout(sampleBlocks("en"), "en");
    const p = await create({ title: "DEMO / SAMPLE", slug: "demo-page", layout: rows, _status: "draft" });
    await expect(payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "en", data: { _status: "published" } as never })).rejects.toThrow(/SAMPLE/);
    await expect(payload.update({ collection: "custom-pages", id: p.id, overrideAccess: true, locale: "bs", data: { slug: "demo-stranica", _status: "published" } as never })).rejects.toThrow(/SAMPLE/);
    expect(await findPublic("demo-page", "en")).toHaveLength(0);
    await payload.delete({ collection: "custom-pages", id: p.id, overrideAccess: true });
  });

  it("only administrators delete; a deleted page is gone", async () => {
    const page = (await findPublic("offers", "en"))[0];
    await payload.delete({ collection: "custom-pages", id: page.id, overrideAccess: true });
    expect(await findPublic("offers", "en")).toHaveLength(0);
    expect(await findPublic("ponude", "bs")).toHaveLength(0);
  });
});
