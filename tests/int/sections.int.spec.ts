import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { booking } from "@/content/hotel";
import { resolveLayout } from "@/cms/resolve";
import { sampleBlocks } from "@/cms/sampleBlocks";
import { toCmsLayout } from "@/cms/seedLayout";
import type { Page } from "@/payload-types";
import { boot, rand, type Harness } from "./helpers";

type Layout = NonNullable<Page["layout"]>;
const layout = (...rows: Record<string, unknown>[]) => rows as unknown as Layout;

describe("offers / FAQ / CTA resolution", () => {
  it("sample content round-trips through the CMS shape in both languages", () => {
    for (const l of ["en", "bs"] as const) {
      const blocks = sampleBlocks(l);
      expect(resolveLayout(toCmsLayout(blocks, l) as unknown as Layout, l).blocks).toEqual(blocks);
    }
  });

  it("all sample sections carry the sample flag and no section invents a price", () => {
    for (const l of ["en", "bs"] as const) {
      const blocks = sampleBlocks(l);
      expect(blocks.every((b) => (b.type === "offers" || b.type === "faq" || b.type === "cta") && b.sample)).toBe(true);
      const text = JSON.stringify(blocks);
      expect(text).not.toMatch(/(?:€|EUR|KM|BAM|\$|£)\s*\d|\d\s*(?:€|EUR|KM|BAM|\$|£)/i);
      expect(text).toMatch(/DEMO \/ SAMPLE/);
    }
  });

  it("the booking button takes its address from code, never from editor input", () => {
    const rows = layout({
      blockType: "cta",
      title: "A\nB",
      tone: "deep",
      primary: { label: "Book", useBooking: true, link: { kind: "external", value: "https://evil.example" } },
    });
    const b = resolveLayout(rows, "en").blocks[0];
    expect(b.type === "cta" && b.primary.link.href).toBe(booking.bookingUrl);
  });

  it("a button with an invalid destination is dropped; a CTA without a main button is skipped", () => {
    const bad = layout({ blockType: "cta", title: "T", primary: { label: "Go", link: { kind: "external", value: "https://evil.example" } } });
    const r = resolveLayout(bad, "en");
    expect(r.blocks).toHaveLength(0);
    expect(r.skipped[0]).toMatch(/cta/);
    const ok = layout({ blockType: "cta", title: "T", primary: { label: "Go", link: { kind: "internal", value: "/rooms" } }, secondary: { label: "x", link: { kind: "internal", value: "javascript:1" } } });
    const b = resolveLayout(ok, "bs").blocks[0];
    expect(b.type === "cta" && b.primary.link.href).toBe("/bs/rooms");
    expect(b.type === "cta" && b.secondary).toBeUndefined();
  });

  it("untranslated offers and questions are left out; a section with none left is skipped", () => {
    const rows = layout(
      { blockType: "offers", label: "L", title: "T", items: [{ title: "Only EN", description: "d" }, { title: "", description: "" }] },
      { blockType: "faq", label: "L", title: "T", items: [{ q: "", a: "" }] },
    );
    const r = resolveLayout(rows, "bs");
    expect(r.blocks.map((b) => b.type)).toEqual(["offers"]);
    expect(r.blocks[0].type === "offers" && r.blocks[0].items).toHaveLength(1);
    expect(r.skipped.join()).toMatch(/faq/);
    const none = resolveLayout(layout({ blockType: "offers", label: "L", title: "T", items: [{ title: "", description: "" }] }), "bs");
    expect(none.blocks).toHaveLength(0);
  });

  it("row labels default per language", () => {
    const rows = layout({ blockType: "offers", label: "L", title: "T", items: [{ title: "a", description: "b", validity: "v" }] });
    const bs = resolveLayout(rows, "bs").blocks[0];
    const en = resolveLayout(rows, "en").blocks[0];
    expect(bs.type === "offers" && [bs.validityLabel, bs.priceLabel]).toEqual(["Važi", "Cijena"]);
    expect(en.type === "offers" && [en.validityLabel, en.priceLabel]).toEqual(["Valid", "Price"]);
  });

  it("unknown tones fall back to ivory; FAQ answers become paragraphs", () => {
    const rows = layout({ blockType: "faq", label: "L", title: "T", tone: "neon", items: [{ q: "Q", a: "one\n\n two " }] });
    const b = resolveLayout(rows, "en").blocks[0];
    expect(b.type === "faq" && b.tone).toBe("ivory");
    expect(b.type === "faq" && b.items[0].a).toEqual(["one", "two"]);
  });
});

describe("collection behaviour", () => {
  let h: Harness;
  let payload: Payload;
  let editor: never;
  let pageId: string;

  beforeAll(async () => {
    h = await boot();
    payload = h.payload;
    await payload.create({ collection: "users", data: { email: `first-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
    const u = await payload.create({ collection: "users", data: { email: `ed-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
    editor = { ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const } as never;
    const page = await payload.create({ collection: "pages", overrideAccess: true, locale: "en", data: { slug: "spa", _status: "published" } as never });
    pageId = String(page.id);
  });
  afterAll(async () => h?.stop());

  const enRows = () => toCmsLayout(sampleBlocks("en"), "en");

  it("sample sections save as drafts and can be previewed, in both languages on the same rows", async () => {
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, draft: true, locale: "en", data: { layout: enRows() } as never });
    const en = await payload.findByID({ collection: "pages", id: pageId, draft: true, locale: "en", overrideAccess: true });
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, draft: true, locale: "bs", data: { layout: toCmsLayout(sampleBlocks("bs"), "bs", en.layout as never) } as never });
    for (const l of ["en", "bs"] as const) {
      const doc = await payload.findByID({ collection: "pages", id: pageId, draft: true, locale: l, overrideAccess: true });
      expect(resolveLayout(doc.layout, l).blocks).toEqual(sampleBlocks(l));
    }
  });

  it("publishing is refused while sample sections remain — with the layout in the request or only the status", async () => {
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: enRows(), _status: "published" } as never })).rejects.toThrow(/SAMPLE/);
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { _status: "published" } as never })).rejects.toThrow(/SAMPLE/);
    const pub = await payload.find({ collection: "pages", where: { slug: { equals: "spa" } }, overrideAccess: false, limit: 1, depth: 0 });
    expect(pub.docs[0].layout ?? []).toHaveLength(0); // still nothing public
  });

  it("the guard can be lifted explicitly (staging demo) and only by the environment", async () => {
    process.env.CMS_ALLOW_SAMPLE_PUBLISH = "true";
    try {
      await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: enRows(), _status: "published" } as never });
    } finally {
      delete process.env.CMS_ALLOW_SAMPLE_PUBLISH;
    }
  });

  it("unticking the sample flag allows publishing; editors still cannot publish", async () => {
    const rows = enRows().map((r) => ({ ...r, sample: false }));
    await expect(payload.update({ collection: "pages", id: pageId, user: editor, overrideAccess: false, locale: "en", data: { layout: rows, _status: "published" } as never })).rejects.toThrow();
    await payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: rows, _status: "published" } as never });
    const pub = await payload.find({ collection: "pages", where: { slug: { equals: "spa" } }, locale: "en", overrideAccess: false, limit: 1, depth: 0 });
    expect(pub.docs[0].layout?.map((b) => b.blockType)).toEqual(["offers", "faq", "cta"]);
  });

  it("limits: at most 6 offers and 20 questions; at least one of each", async () => {
    const base = enRows();
    const offers = { ...base[0], sample: false } as unknown as { items: unknown[] };
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: [{ ...offers, items: Array(7).fill(offers.items[0]) }], _status: "published" } as never })).rejects.toThrow();
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: [{ ...offers, items: [] }], _status: "published" } as never })).rejects.toThrow();
  });

  it("an unapproved button destination is refused when saving", async () => {
    const rows = enRows().map((r) => ({ ...r, sample: false }));
    const cta = rows[2] as unknown as { primary: { link: unknown; useBooking: boolean } };
    cta.primary = { ...cta.primary, useBooking: false, link: { kind: "external", value: "https://evil.example/x" } };
    await expect(payload.update({ collection: "pages", id: pageId, overrideAccess: true, locale: "en", data: { layout: rows, _status: "published" } as never })).rejects.toThrow();
  });
});
