import type { Field, SanitizedConfig, Tab } from "payload";
import { describe, expect, it } from "vitest";
import { adminOnlyTab } from "@/cms/admin/fields";
import { dashboardCards, type Can } from "@/cms/admin/dashboardCards";
import { adminI18n } from "@/cms/admin/i18n";

const all: Can = { collection: () => true, global: () => true };
const none: Can = { collection: () => false, global: () => false };
const only = (collections: string[], globals: string[] = []): Can => ({ collection: (s) => collections.includes(s), global: (s) => globals.includes(s) });

const TECHNICAL = /\b(slug|seo|blocks?|globals?|payload|json|api|schema|database|collection|endpoint|graphql|mongo|postgres)\b/i;

describe("start page", () => {
  it("offers the seven tasks to an administrator, in plain words", () => {
    const cards = dashboardCards(all, "admin");
    expect(cards.map((c) => c.title)).toEqual(["Rooms", "Pages", "Photos & Media", "Special Offers", "Homepage", "Navigation & Footer", "Website Preview"]);
  });

  it("lists only what the person is allowed to use", () => {
    const titles = (can: Can) => dashboardCards(can, "editor").map((c) => c.title);
    expect(titles(none)).toEqual(["Website Preview"]);
    expect(titles(only(["rooms", "media"]))).toEqual(["Rooms", "Photos & Media", "Website Preview"]);
    expect(titles(only([], ["homepage"]))).toEqual(["Homepage", "Website Preview"]);
    const pagesOnly = dashboardCards(only(["pages"]), "editor");
    expect(pagesOnly.find((c) => c.id === "pages")?.links.map((l) => l.label)).toEqual(["Edit pages"]);
    expect(pagesOnly.find((c) => c.id === "offers")?.links[0].href).toBe("/admin/collections/pages");
  });

  it("never uses technical vocabulary", () => {
    for (const card of dashboardCards(all, "admin")) {
      for (const text of [card.title, card.text, ...card.links.map((l) => l.label)]) expect(text, text).not.toMatch(TECHNICAL);
    }
  });

  it("only links to screens that exist in the admin or to the staff preview", () => {
    for (const card of dashboardCards(all, "admin")) for (const l of card.links) expect(l.href).toMatch(/^\/admin\/(collections|globals)\/[a-z-]+$|^\/api\/preview\?path=%2F(bs|en)$/);
  });
});

describe("admin wording", () => {
  const en = adminI18n.translations.en;
  it("is English only and uses everyday words for the technical ones", () => {
    expect(Object.keys(adminI18n.supportedLanguages)).toEqual(["en"]);
    expect(adminI18n.fallbackLanguage).toBe("en");
    expect(en.version.saveDraft).toBe("Save Changes");
    expect(en.general.livePreview).toBe("Preview Changes");
    expect(en.general.globals).toBe("Website Settings");
    expect(en.version.publishChanges).toBe("Publish Changes");
  });

  it("replaces the software's own words that staff meet on the common screens", () => {
    expect(en.general.payloadSettings).toBe("Account settings");
    expect(en.general.locale).toBe("Editing language");
    expect(en.general.backToDashboard).toBe("Back to the start page");
    expect(en.general.noLabel).not.toMatch(/[<>]/); // not "<No Photographer / source>"
    expect(en.general.updatedAt).toBe("Last changed");
    expect(en.upload.bulkUpload).toBe("Upload several photos");
    expect(en.fields.chooseFromExisting).toBe("Choose from the photo library");
    const values = (o: unknown): string[] => (typeof o === "string" ? [o] : o && typeof o === "object" ? Object.values(o).flatMap(values) : []);
    for (const text of values(en)) expect(text, text).not.toMatch(/payload/i);
  });

  it("names the offers section on the start page exactly as it is called in the page forms", () => {
    const card = dashboardCards(all, "admin").find((c) => c.id === "offers");
    expect(card?.text).toContain("“Special offers (cards)”");
  });
});

type Anyfield = Field & { label?: unknown; fields?: Field[]; tabs?: Tab[]; blocks?: { labels?: { singular?: unknown; plural?: unknown }; fields: Field[] }[] };

/** Every label an editor can see, with where it is, so a leftover developer term is easy to find. */
function labels(fields: Anyfield[], where: string, out: { where: string; text: string }[]) {
  for (const f of fields) {
    const name = (f as { name?: string }).name ?? (f as { type: string }).type;
    if (typeof f.label === "string") out.push({ where: `${where}.${name}`, text: f.label });
    if (f.type === "ui") continue;
    if (f.tabs) for (const t of f.tabs) { if (typeof t.label === "string") out.push({ where: `${where}.tab`, text: t.label }); labels(t.fields as Anyfield[], where, out); }
    if (f.fields) labels(f.fields as Anyfield[], `${where}.${name}`, out);
    if (f.blocks) for (const b of f.blocks) {
      for (const l of [b.labels?.singular, b.labels?.plural]) if (typeof l === "string") out.push({ where: `${where}.${name}.block`, text: l });
      labels(b.fields as Anyfield[], `${where}.${name}.${(b as { slug?: string }).slug}`, out);
    }
  }
}

const OURS = ["users", "media", "pages", "custom-pages", "rooms"];

describe("labels in the editing forms", () => {
  async function config(): Promise<SanitizedConfig> {
    process.env.PAYLOAD_SECRET = "x";
    process.env.DATABASE_URL = "postgres://127.0.0.1/unused";
    const { default: c } = await import("@payload-config");
    return await c;
  }

  it("contain no developer terms (slug, SEO, blocks, globals, API …)", async () => {
    const cfg = await config();
    const found: { where: string; text: string }[] = [];
    for (const c of cfg.collections.filter((c) => OURS.includes(c.slug))) labels(c.fields as Anyfield[], c.slug, found);
    for (const g of cfg.globals) labels(g.fields as Anyfield[], g.slug, found);
    // "Block Name" is Payload's own field on every section row; it cannot be removed without changing the database, so it is hidden with CSS.
    const bad = found.filter((x) => TECHNICAL.test(x.text) && !/^(Page URL|Page URL \(per language\))$/.test(x.text) && !x.where.endsWith(".blockName"));
    expect(bad).toEqual([]);
  });

  it("show the friendly names for collections and settings", async () => {
    const cfg = await config();
    const name = (slug: string) => (cfg.collections.find((c) => c.slug === slug)?.labels?.plural as string) ?? "";
    expect([name("rooms"), name("pages"), name("media"), name("custom-pages"), name("users")]).toEqual(["Rooms", "Pages", "Photos & Media", "New pages", "Team members"]);
    for (const g of cfg.globals) expect(g.admin.group).toBe("Website Settings");
    for (const c of cfg.collections.filter((c) => OURS.includes(c.slug))) expect((c.admin as { hideAPIURL?: boolean }).hideAPIURL, c.slug).toBe(true);
  });

  it("group a room's fields into the six task tabs, the last one for administrators only", async () => {
    const cfg = await config();
    const rooms = cfg.collections.find((c) => c.slug === "rooms")!;
    const tabs = (rooms.fields.find((f) => f.type === "tabs") as unknown as { tabs: Tab[] }).tabs;
    expect(tabs.map((t) => t.label)).toEqual(["1. Basic Information", "2. Room Description", "3. Photos", "4. Amenities", "5. Google & Search Appearance", "6. Advanced Settings"]);
    expect(tabs.slice(0, 5).every((t) => !t.admin?.condition)).toBe(true);
    const condition = tabs[5].admin?.condition as typeof adminOnlyTab.condition;
    expect(condition({}, {}, { user: { role: "admin" } })).toBe(true);
    expect(condition({}, {}, { user: { role: "editor" } })).toBe(false);
    expect(condition({}, {}, { user: null })).toBe(false);
  });
});
