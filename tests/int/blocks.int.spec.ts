import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { linkFromHref, resolveLink, validateLink } from "@/cms/links";
import { resolveImage, resolveLayout } from "@/cms/resolve";
import { staticImages } from "@/cms/staticImages";
import type { Page } from "@/payload-types";

type Layout = NonNullable<Page["layout"]>;
const layout = (...rows: Record<string, unknown>[]) => rows as unknown as Layout;

describe("editor links", () => {
  it.each([
    ["internal", "/rooms"],
    ["internal", "/rooms/junior-suite"],
    ["internal", "/"],
    ["external", "https://www.hotelcentral.ba/facilities/wellness-day-spa/"],
    ["external", "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo"],
    ["phone", "+387 33 561 800"],
    ["email", "info@hotelcentral.ba"],
  ])("accepts %s %s", (kind, value) => expect(validateLink(kind, value)).toBe(true));

  it.each([
    ["external", "https://evil.example/x"],
    ["external", "http://www.hotelcentral.ba/"],
    ["external", "javascript:alert(1)"],
    ["external", "https://user:pw@www.hotelcentral.ba/"],
    ["external", "https://hotelcentral.ba.evil.example/"],
    ["external", "//evil.example"],
    ["internal", "//evil.example"],
    ["internal", "/en/rooms"],
    ["internal", "/../admin"],
    ["internal", "/Rooms"],
    ["internal", "/a/b/c/d"],
    ["internal", "javascript:alert(1)"],
    ["phone", "tel:+38733561800; rm"],
    ["phone", "javascript:1"],
    ["email", "a@b.c, d@e.fg"],
    ["email", "x@y.test?cc=evil@z.test"],
    ["bogus", "/rooms"],
    ["internal", ""],
    [undefined, "/rooms"],
  ])("rejects %s %s", (kind, value) => expect(validateLink(kind as string, value as string)).not.toBe(true));

  it("resolves per locale and never returns an invalid link", () => {
    expect(resolveLink({ kind: "internal", value: "/rooms" }, "bs")).toEqual({ kind: "internal", href: "/bs/rooms", external: false });
    expect(resolveLink({ kind: "phone", value: "+387 33 561 800" }, "en")?.href).toBe("tel:+38733561800");
    expect(resolveLink({ kind: "external", value: "https://evil.example" }, "en")).toBeNull();
    expect(resolveLink({ kind: "internal", value: "javascript:alert(1)" }, "en")).toBeNull();
    expect(resolveLink({ kind: "email", value: "info@hotelcentral.ba" }, "en")?.href).toBe("mailto:info@hotelcentral.ba");
  });

  it("round-trips static hrefs", () => {
    expect(linkFromHref("/bs/spa", "bs")).toEqual({ kind: "internal", value: "/spa" });
    expect(linkFromHref("tel:+38733561800", "en")).toEqual({ kind: "phone", value: "+38733561800" });
  });
});

describe("static image list", () => {
  it("lists exactly the photographs in public/images (regenerate with npm run cms:generate)", () => {
    const onDisk = fs.readdirSync(path.resolve(__dirname, "../../public/images")).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
    expect([...staticImages]).toEqual(onDisk);
  });
  it("only resolves listed photographs", () => {
    expect(resolveImage({ staticPath: "3064.jpg", alt: "x" })?.src).toBe("/images/3064.jpg");
    expect(resolveImage({ staticPath: "../../etc/passwd" as never, alt: "x" })).toBeNull();
    expect(resolveImage({ staticPath: "nope.jpg" as never })).toBeNull();
    expect(resolveImage({})).toBeNull();
  });
  it("prefers an uploaded photograph and falls back to its own alt text", () => {
    const img = resolveImage({ staticPath: "3064.jpg", upload: { id: "1", url: "/api/media/file/a.png", alt: "Media alt", updatedAt: "", createdAt: "" }, alt: "" });
    expect(img).toEqual({ src: "/api/media/file/a.png", alt: "Media alt" });
  });
});

describe("resolveLayout", () => {
  const hero = { blockType: "hero", image: { staticPath: "3064.jpg", alt: "a" }, eyebrow: "E", title: "One\nTwo", metaLeft: "L", metaCenter: "", metaRight: "R" };

  it("keeps block order and normalises text", () => {
    const { blocks, skipped } = resolveLayout(layout(hero, { blockType: "statement", text: "  hi  ", tone: "weird" }), "en");
    expect(skipped).toEqual([]);
    expect(blocks.map((b) => b.type)).toEqual(["hero", "statement"]);
    expect(blocks[0]).toMatchObject({ title: ["One", "Two"], meta: ["L", "", "R"] });
    expect(blocks[1]).toMatchObject({ text: "hi", tone: "ivory" }); // unknown tone falls back to the default
  });

  it("skips blocks that are not usable in this language, and says why", () => {
    const { blocks, skipped } = resolveLayout(layout({ ...hero, title: "" }, { blockType: "statement", text: "ok" }, { blockType: "split", label: "L", title: "T", image1: {} }, { blockType: "gallery", images: [] }), "bs");
    expect(blocks.map((b) => b.type)).toEqual(["statement"]);
    expect(skipped).toHaveLength(3);
  });

  it("drops invalid links but keeps the block", () => {
    const split = { blockType: "split", label: "L", title: "T", image1: { staticPath: "3064.jpg", alt: "a" }, primary: { label: "Go", link: { kind: "external", value: "https://evil.example" } }, secondary: { label: "Call", link: { kind: "phone", value: "+387 33 561 800" } } };
    const b = resolveLayout(layout(split), "en").blocks[0];
    expect(b.type === "split" && b.primary).toBeFalsy();
    expect(b.type === "split" && b.secondary?.link.href).toBe("tel:+38733561800");
  });

  it("limits galleries to five photographs and ignores unusable ones", () => {
    const images = [...Array(8)].map(() => ({ image: { staticPath: "3064.jpg", alt: "a" } })).concat([{ image: { staticPath: "nope.jpg", alt: "x" } } as never]);
    const b = resolveLayout(layout({ blockType: "gallery", images }), "en").blocks[0];
    expect(b.type === "gallery" && b.images).toHaveLength(5);
  });

  it("an empty or missing layout yields no blocks (the caller then uses the static page)", () => {
    expect(resolveLayout(undefined, "en").blocks).toEqual([]);
    expect(resolveLayout([], "en").blocks).toEqual([]);
  });
});
