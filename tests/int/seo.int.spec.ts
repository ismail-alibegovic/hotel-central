import type { Payload, Where } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { META_DESCRIPTION_MAX, META_TITLE_MAX } from "@/cms/collections/seoFields";
import { pageMetadata } from "@/lib/seo";
import { boot, rand, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;
let editor: Awaited<ReturnType<Payload["findByID"]>> & { collection: "users" };
let pageId: string;

const publishedBy = async (locale: "en" | "bs", where: Where, collection: "pages" | "rooms" = "pages") =>
  (await payload.find({ collection, where, locale, fallbackLocale: false, limit: 50, depth: 0, overrideAccess: false })).docs;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  // the first account in a fresh database becomes the administrator; the second is the editor
  await payload.create({ collection: "users", data: { email: `first-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  const u = await payload.create({ collection: "users", data: { email: `ed-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  editor = { ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const } as never;
  const page = await payload.create({ collection: "pages", overrideAccess: true, locale: "en", data: { slug: "spa", metaTitle: "Spa EN", _status: "published" } as never });
  pageId = String(page.id);
  await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "bs", data: { metaTitle: "Spa BS", _status: "published" } as never });
});
afterAll(async () => h?.stop());

describe("search-engine fields", () => {
  it("noindex defaults to off", async () => {
    const doc = await payload.findByID({ collection: "pages", id: pageId, overrideAccess: true });
    expect(doc.noindex).toBe(false);
  });

  it("titles and descriptions have length limits, per language", async () => {
    const ok = "x".repeat(META_TITLE_MAX);
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { metaTitle: ok, _status: "published" } as never });
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { metaTitle: ok + "x", _status: "published" } as never })).rejects.toThrow();
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "bs", data: { metaDescription: "y".repeat(META_DESCRIPTION_MAX + 1), _status: "published" } as never })).rejects.toThrow();
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { metaTitle: "Spa EN", _status: "published" } as never });
  });

  it("English and Bosnian titles are independent", async () => {
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "bs", data: { metaTitle: "Samo bosanski", _status: "published" } as never });
    expect((await publishedBy("en", { slug: { equals: "spa" } }))[0].metaTitle).toBe("Spa EN");
    expect((await publishedBy("bs", { slug: { equals: "spa" } }))[0].metaTitle).toBe("Samo bosanski");
  });

  it("an editor's noindex change stays a draft: the published page is still indexable", async () => {
    await payload.update({ collection: "pages", id: pageId, user: editor, overrideAccess: false, draft: true, locale: "en", data: { noindex: true } as never });
    expect(await publishedBy("en", { noindex: { equals: true } })).toHaveLength(0); // what the sitemap and metadata read
    const draft = await payload.findByID({ collection: "pages", id: pageId, draft: true, overrideAccess: true });
    expect(draft.noindex).toBe(true);
    await expect(payload.update({ collection: "pages", id: pageId, user: editor, overrideAccess: false, locale: "en", data: { noindex: true, _status: "published" } as never })).rejects.toThrow();
  });

  it("once an administrator publishes it, the page is found by the noindex query", async () => {
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { noindex: true, _status: "published" } as never });
    expect((await publishedBy("en", { noindex: { equals: true } })).map((d) => d.slug)).toEqual(["spa"]);
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { noindex: false, _status: "published" } as never });
    expect(await publishedBy("en", { noindex: { equals: true } })).toHaveLength(0);
  });

  it("rooms carry the same search-engine fields", async () => {
    const room = await payload.create({ collection: "rooms", overrideAccess: true, locale: "en", data: { slug: "junior-suite", metaTitle: "Junior EN", noindex: false, _status: "published" } as never });
    await payload.update({ collection: "rooms", id: room.id, overrideAccess: true, locale: "bs", data: { metaTitle: "Junior BS", _status: "published" } as never });
    expect((await publishedBy("en", { slug: { equals: "junior-suite" } }, "rooms"))[0].metaTitle).toBe("Junior EN");
    expect((await publishedBy("bs", { slug: { equals: "junior-suite" } }, "rooms"))[0].metaTitle).toBe("Junior BS");
  });
});

describe("pageMetadata", () => {
  it("indexable by default, noindex only when asked, canonical and alternates always present", () => {
    const open = pageMetadata("en", "/spa", "T", "D");
    expect(open.robots).toBeUndefined();
    const hidden = pageMetadata("bs", "/spa", "T", "D", "/images/3075.jpg", true);
    expect(hidden.robots).toEqual({ index: false, follow: true });
    expect(hidden.alternates?.canonical).toBe("/bs/spa");
    expect(Object.keys(hidden.alternates?.languages ?? {}).sort()).toEqual(["bs-BA", "en", "x-default"]);
  });
});
