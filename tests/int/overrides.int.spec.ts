import { describe, expect, it } from "vitest";
import { getPages } from "@/content/pages";
import { getRoom } from "@/content/rooms";
import { aboutWithCms, roomWithCms } from "@/cms/overrides";
import type { Page, Room } from "@/payload-types";

const base = { id: "1", createdAt: "", updatedAt: "" };

describe("CMS overrides never degrade the static fallback", () => {
  const about = getPages("en").about;

  it("returns the static content untouched when there is no CMS document", () => {
    expect(aboutWithCms(about, null)).toBe(about);
  });

  it("uses CMS text only where the editor filled it in", () => {
    const doc = { ...base, slug: "about", heroEyebrow: "New eyebrow", heroTitle: "Line one\n\n Line two ", heroIntro: "   ", metaTitle: null } as Page;
    const out = aboutWithCms(about, doc);
    expect(out.hero.eyebrow).toBe("New eyebrow");
    expect(out.hero.title).toEqual(["Line one", "Line two"]);
    expect(out.hero.intro).toBe(about.hero.intro); // blank -> static
    expect(out.meta.title).toBe(about.meta.title); // null -> static
    expect(out.story).toBe(about.story); // untouched sections keep identity
  });

  it("overrides a room only for the requested locale", () => {
    const room = getRoom("junior-suite")!;
    const doc = { ...base, slug: "junior-suite", name: "Junior Suite+", description: [{ id: "a", text: "Para one" }, { id: "b", text: "" }] } as Room;
    const out = roomWithCms(room, doc, "bs");
    expect(out.name.bs).toBe("Junior Suite+");
    expect(out.name.en).toBe(room.name.en);
    expect(out.description.bs).toEqual(["Para one"]);
    expect(out.description.en).toEqual(room.description.en);
    expect(out.images).toBe(room.images);
    expect(out.roomTypeId).toBe(room.roomTypeId); // booking mapping can never come from the CMS
  });
});
