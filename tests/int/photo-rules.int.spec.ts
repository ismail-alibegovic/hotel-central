import { describe, expect, it } from "vitest";
import { MAX_PHOTO_BYTES, MAX_ROOM_PHOTOS, checkPhotos, photoProblem } from "@/cms/admin/photoRules";

const file = (name: string, type: string, size = 100_000) => ({ name, type, size });

describe("photo checks before upload", () => {
  it("accepts JPG, PNG, WebP and AVIF within 8 MB", () => {
    for (const [n, t] of [["a.jpg", "image/jpeg"], ["a.png", "image/png"], ["a.webp", "image/webp"], ["a.avif", "image/avif"]]) expect(photoProblem(file(n, t))).toBeNull();
    expect(photoProblem(file("big.jpg", "image/jpeg", MAX_PHOTO_BYTES))).toBeNull();
  });

  it("explains iPhone HEIC photos in plain words and says what to do", () => {
    expect(photoProblem(file("IMG_1.HEIC", "image/heic"))).toMatch(/iPhone HEIC.*JPG/);
    expect(photoProblem(file("IMG_2.heic", ""))).toMatch(/iPhone HEIC/);
  });

  it("refuses other file types, files over 8 MB and empty files, each with a reason a person can act on", () => {
    expect(photoProblem(file("menu.pdf", "application/pdf"))).toMatch(/Only JPG, PNG, WebP or AVIF/);
    expect(photoProblem(file("logo.svg", "image/svg+xml"))).toMatch(/Only JPG, PNG, WebP or AVIF/);
    expect(photoProblem(file("huge.jpg", "image/jpeg", MAX_PHOTO_BYTES + 1))).toMatch(/limit is 8 MB/);
    expect(photoProblem(file("empty.jpg", "image/jpeg", 0))).toMatch(/empty/);
  });

  it("splits a mixed selection and respects the free places in the room", () => {
    const { ok, problems } = checkPhotos([file("a.jpg", "image/jpeg"), file("b.pdf", "application/pdf"), file("c.jpg", "image/jpeg"), file("d.jpg", "image/jpeg")], 2);
    expect(ok.map((f) => f.name)).toEqual(["a.jpg", "c.jpg"]);
    expect(problems.map((p) => p.name)).toEqual(["b.pdf", "d.jpg"]);
    expect(problems[1].message).toContain(`${MAX_ROOM_PHOTOS} photos`);
  });

  it("adds nothing when the room is full", () => {
    const { ok, problems } = checkPhotos([file("a.jpg", "image/jpeg")], 0);
    expect(ok).toEqual([]);
    expect(problems).toHaveLength(1);
  });
});
