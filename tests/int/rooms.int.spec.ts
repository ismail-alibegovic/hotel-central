import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { rooms as staticRooms } from "@/content/rooms";
import { mergeRooms, roomWithCms } from "@/cms/overrides";
import type { Room as CmsRoom } from "@/payload-types";
import { locales } from "@/lib/i18n";
import { boot, PNG_1X1, rand, type Harness } from "./helpers";

/** Mirrors scripts/cms/seed.mts: the migration of the six static rooms into the CMS. */
const rows = (xs: string[]) => xs.map((text) => ({ text }));
const seedData = (room: (typeof staticRooms)[number], l: (typeof locales)[number]) => ({
  name: room.name[l],
  titleLines: room.titleLines[l].join("\n"),
  feature: room.feature[l],
  sizeLabel: room.sizeLabel[l],
  summary: room.summary[l],
  description: rows(room.description[l]),
  highlights: rows(room.highlights[l]),
  amenities: rows(room.amenities[l]),
});

let h: Harness;
let payload: Payload;
let admin: Awaited<ReturnType<Payload["create"]>> & { collection: "users" };
let editor: typeof admin;

const asUser = async (id: string | number) => ({ ...(await payload.findByID({ collection: "users", id, overrideAccess: true })), collection: "users" as const });
const readAll = async (locale: "en" | "bs", draft = false) =>
  (await payload.find({ collection: "rooms", locale, fallbackLocale: false, draft, limit: 100, depth: 1, overrideAccess: false })).docs as CmsRoom[];

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  const mk = (p: string) => payload.create({ collection: "users", data: { email: `${p}-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  admin = (await asUser((await mk("admin")).id)) as never;
  editor = (await asUser((await mk("editor")).id)) as never;
  for (const [i, room] of staticRooms.entries()) {
    const created = await payload.create({ collection: "rooms", overrideAccess: true, locale: "en", data: { slug: room.slug, roomTypeId: room.roomTypeId, sizeM2: room.sizeM2, order: i + 1, visible: true, ...seedData(room, "en"), _status: "published" } as never });
    await payload.update({ collection: "rooms", id: created.id, overrideAccess: true, locale: "bs", data: { ...seedData(room, "bs"), _status: "published" } as never });
  }
});
afterAll(async () => h?.stop());

describe("migration of the six static rooms", () => {
  it("creates all six, and the merged result equals the static data in both locales", async () => {
    for (const l of locales) {
      const docs = await readAll(l);
      expect(docs).toHaveLength(6);
      // identical content, identical order: the CMS-backed site must render exactly what the static site renders
      expect(mergeRooms(staticRooms, docs, l)).toEqual(staticRooms);
    }
  });

  it("never exposes or accepts the booking mapping from the public/editors", async () => {
    for (const d of await readAll("en")) expect(d).not.toHaveProperty("roomTypeId");
    const target = (await payload.find({ collection: "rooms", where: { slug: { equals: "junior-suite" } }, overrideAccess: true })).docs[0];
    await payload.update({ collection: "rooms", id: target.id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { roomTypeId: "EVIL", sizeM2: 999, order: 1, visible: false, name: "Editor draft" } as never });
    const raw = await payload.findByID({ collection: "rooms", id: target.id, draft: true, overrideAccess: true });
    expect([raw.roomTypeId, raw.sizeM2, raw.order, raw.visible]).toEqual(["18019000000000000010", 37, 5, true]); // editor changes to privileged fields were dropped
    expect(raw.name).toBe("Editor draft"); // ... but copy edits were kept (as a draft)
  });
});

describe("merging rules", () => {
  const base = staticRooms.find((r) => r.slug === "junior-suite")!;
  const doc = (patch: Partial<CmsRoom>) => ({ id: "x", slug: base.slug, updatedAt: "", createdAt: "", ...patch }) as CmsRoom;

  it("an empty translation falls back to static copy field by field", () => {
    const merged = roomWithCms(base, doc({ name: "Samo ime", highlights: [], description: [{ id: "1", text: "  " }], summary: "" }), "bs");
    expect(merged.name.bs).toBe("Samo ime");
    expect(merged.summary.bs).toBe(base.summary.bs);
    expect(merged.highlights.bs).toEqual(base.highlights.bs);
    expect(merged.description.bs).toEqual(base.description.bs);
    expect(merged.name.en).toBe(base.name.en); // the other language is untouched
  });

  it("never takes identity, booking id or size from the CMS", () => {
    const merged = roomWithCms(base, doc({ slug: "hijack", roomTypeId: "EVIL", sizeM2: 1 }), "en");
    expect([merged.slug, merged.roomTypeId, merged.sizeM2]).toEqual([base.slug, base.roomTypeId, base.sizeM2]);
  });

  it("orders by the CMS order and drops rooms hidden in the CMS", () => {
    const docs = [doc({ slug: "single-room", order: 6 }), doc({ slug: "presidential-suite", order: 1 }), doc({ slug: "family-room", visible: false })];
    const out = mergeRooms(staticRooms, docs, "en").map((r) => r.slug);
    expect(out[0]).toBe("presidential-suite");
    expect(out).not.toContain("family-room");
    expect(out).toHaveLength(5);
    expect(out[out.length - 1]).toBe("single-room");
  });

  it("uses uploaded photographs (with their alt text) instead of the static set, only when present", async () => {
    const media = await payload.create({ collection: "media", overrideAccess: true, locale: "en", data: { alt: "Uploaded alt" }, file: { data: PNG_1X1, mimetype: "image/png", name: `r-${rand()}.png`, size: PNG_1X1.length } });
    const populated = await payload.findByID({ collection: "media", id: media.id, overrideAccess: true });
    const withPhotos = roomWithCms(base, doc({ gallery: [{ id: "g", image: populated }] }), "en");
    expect(withPhotos.images).toHaveLength(1);
    expect(withPhotos.images[0].src).toBe(populated.url);
    expect(withPhotos.images[0].alt.en).toBe("Uploaded alt");
    expect(roomWithCms(base, doc({ gallery: [] }), "en").images).toBe(base.images); // empty gallery keeps the static photos
  });
});

describe("publication", () => {
  it("a hidden or draft-only change is invisible to the public and only an admin's publish changes the list", async () => {
    const target = (await payload.find({ collection: "rooms", where: { slug: { equals: "single-room" } }, overrideAccess: true })).docs[0];
    await payload.update({ collection: "rooms", id: target.id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { name: "SECRET DRAFT NAME" } as never });
    expect(JSON.stringify(await readAll("en"))).not.toContain("SECRET DRAFT NAME");
    expect(JSON.stringify(await readAll("en", true))).not.toContain("SECRET DRAFT NAME");
    await payload.update({ collection: "rooms", id: target.id, user: admin, overrideAccess: false, locale: "en", data: { name: "Single Room (renamed)", _status: "published" } as never });
    const en = mergeRooms(staticRooms, await readAll("en"), "en").find((r) => r.slug === "single-room")!;
    const bs = mergeRooms(staticRooms, await readAll("bs"), "bs").find((r) => r.slug === "single-room")!;
    expect(en.name.en).toBe("Single Room (renamed)");
    expect(bs.name.bs).toBe(staticRooms.find((r) => r.slug === "single-room")!.name.bs); // BS unchanged
  });
});
