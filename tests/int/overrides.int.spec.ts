import { describe, expect, it } from "vitest";
import { getRoom } from "@/content/rooms";
import { roomWithCms } from "@/cms/overrides";
import type { Room } from "@/payload-types";

const base = { id: "1", createdAt: "", updatedAt: "" };

describe("CMS room overrides never degrade the static fallback", () => {
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
