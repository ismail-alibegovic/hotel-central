import { describe, expect, it } from "vitest";
import { PUBLISHED_NOW, SAVED_AS_DRAFT } from "@/cms/admin/messages";
import { changedFields, inLanguage, isLanguageMap } from "@/cms/admin/publishDiff";

const L = ["bs", "en"] as const;

describe("publish summary: what goes live in each language", () => {
  it("recognises translated values", () => {
    expect(isLanguageMap({ en: "a", bs: "b" }, L)).toBe(true);
    expect(isLanguageMap({ en: "a" }, L)).toBe(true);
    expect(isLanguageMap({ en: "a", fr: "b" }, L)).toBe(false);
    expect(isLanguageMap({}, L)).toBe(false);
    expect(isLanguageMap(["en"], L)).toBe(false);
  });

  it("collapses translated values inside rows and sections to one language", () => {
    const layout = [{ id: "r1", blockType: "hero", heading: { en: "Hello", bs: "Zdravo" }, link: "/spa" }];
    expect(inLanguage(layout, "bs", L)).toEqual([{ id: "r1", blockType: "hero", heading: "Zdravo", link: "/spa" }]);
    expect(inLanguage(layout, "en", L)).toEqual([{ id: "r1", blockType: "hero", heading: "Hello", link: "/spa" }]);
  });

  it("lists a Bosnian-only edit under Bosnian and nothing under English", () => {
    const published = { id: "1", _status: "published", updatedAt: "a", name: { en: "Suite", bs: "Apartman" }, visible: true };
    const draft = { ...published, _status: "draft", updatedAt: "b", name: { en: "Suite", bs: "Apartman luksuz" } };
    expect(changedFields(draft, published, L)).toEqual({ shared: [], byLanguage: { bs: ["name"], en: [] } });
  });

  it("lists a change to an untranslated field once, as shared by both languages", () => {
    const published = { visible: true, name: { en: "Suite", bs: "Apartman" } };
    const draft = { visible: false, name: { en: "Suite", bs: "Apartman" } };
    expect(changedFields(draft, published, L)).toEqual({ shared: ["visible"], byLanguage: { bs: [], en: [] } });
  });

  it("finds a change inside the sections of a page, in the language that changed", () => {
    const row = (en: string, bs: string) => [{ id: "r1", blockType: "text", body: { en, bs } }];
    const published = { layout: row("Open", "Otvoreno") };
    const draft = { layout: row("Open", "Otvoreno do 23h") };
    expect(changedFields(draft, published, L).byLanguage).toEqual({ bs: ["layout"], en: [] });
    expect(changedFields({ layout: row("Open late", "Otvoreno") }, published, L).byLanguage).toEqual({ bs: [], en: ["layout"] });
  });

  it("lists both languages when both changed", () => {
    const published = { description: { en: [{ text: "a" }], bs: [{ text: "b" }] } };
    const draft = { description: { en: [{ text: "a2" }], bs: [{ text: "b2" }] } };
    expect(changedFields(draft, published, L).byLanguage).toEqual({ bs: ["description"], en: ["description"] });
  });

  it("treats empty text, empty lists and missing values as the same", () => {
    const published = { summary: { en: "x", bs: "" }, amenities: { en: [], bs: [] } };
    expect(changedFields({ summary: { en: "x" }, amenities: { en: [], bs: null } }, published, L)).toEqual({ shared: [], byLanguage: { bs: [], en: [] } });
    // a row with only a space is blank to a guest; a real amenity added in English is a change in English only
    expect(changedFields({ ...published, amenities: { en: [{ text: " " }], bs: [] } }, published, L).byLanguage).toEqual({ bs: [], en: [] });
    expect(changedFields({ ...published, amenities: { en: [{ text: "Balcony" }], bs: [] } }, published, L).byLanguage).toEqual({ bs: [], en: ["amenities"] });
  });

  it("ignores bookkeeping fields and reports nothing when nothing changed", () => {
    const published = { id: "1", _status: "published", createdAt: "a", updatedAt: "a", name: { en: "A", bs: "B" } };
    const draft = { id: "1", _status: "draft", createdAt: "a", updatedAt: "later", name: { en: "A", bs: "B" } };
    expect(changedFields(draft, published, L)).toEqual({ shared: [], byLanguage: { bs: [], en: [] } });
  });

  it("copes with a missing document", () => {
    expect(changedFields(null, undefined, L)).toEqual({ shared: [], byLanguage: { bs: [], en: [] } });
  });
});

describe("save and publish confirmations", () => {
  it("say whether guests can see the change, in plain words", () => {
    expect(SAVED_AS_DRAFT).toBe("Saved as draft — not visible to guests yet.");
    expect(PUBLISHED_NOW).toMatch(/guests can see this now/);
    expect(PUBLISHED_NOW).toMatch(/Bosnian and English/);
  });
});
