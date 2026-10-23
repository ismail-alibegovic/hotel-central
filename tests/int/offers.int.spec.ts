import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, rand, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;
let editor: { id: string | number; collection: "users"; role?: string };

const visible = async (locale: "en" | "bs") =>
  (await payload.find({ collection: "offers", locale, fallbackLocale: false, limit: 50, depth: 0, overrideAccess: false })).docs;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  const mk = (p: string) => payload.create({ collection: "users", data: { email: `${p}-${rand()}@example.test`, password: "Pw-" + rand() + rand() } as never, overrideAccess: true });
  await mk("admin"); // first account = administrator
  const e = await mk("editor");
  editor = { ...(await payload.findByID({ collection: "users", id: e.id, overrideAccess: true })), collection: "users" } as never;
});
afterAll(async () => h?.stop());

describe("offers", () => {
  it("are written per language and only appear in languages they are translated into", async () => {
    const o = await payload.create({ collection: "offers", overrideAccess: true, locale: "en", data: { title: "Weekend", order: 1, _status: "published" } as never });
    expect((await visible("en")).map((d) => d.title)).toEqual(["Weekend"]);
    expect((await visible("bs")).filter((d) => d.title)).toHaveLength(0); // no Bosnian title yet: nothing to show
    await payload.update({ collection: "offers", id: o.id, overrideAccess: true, locale: "bs", data: { title: "Vikend", _status: "published" } as never });
    expect((await visible("bs")).map((d) => d.title)).toEqual(["Vikend"]);
    expect((await visible("en")).map((d) => d.title)).toEqual(["Weekend"]);
  });

  it("editors can draft but not publish, and cannot change order, visibility or the sample flag", async () => {
    const o = (await visible("en"))[0];
    await payload.update({ collection: "offers", id: o.id, user: editor as never, overrideAccess: false, draft: true, locale: "en", data: { title: "Edited by editor", order: 9, visible: false, sample: true } as never });
    const draft = await payload.findByID({ collection: "offers", id: o.id, draft: true, overrideAccess: true, locale: "en" });
    expect([draft.title, draft.order, draft.visible, draft.sample]).toEqual(["Edited by editor", 1, true, false]);
    expect((await visible("en"))[0].title).toBe("Weekend"); // public still sees the published text
    await expect(payload.update({ collection: "offers", id: o.id, user: editor as never, overrideAccess: false, locale: "en", data: { title: "x", _status: "published" } as never })).rejects.toThrow();
    await expect(payload.delete({ collection: "offers", id: o.id, user: editor as never, overrideAccess: false })).rejects.toThrow();
  });

  it("refuse unapproved links, over-long text and missing titles", async () => {
    const base = { title: "Linked", _status: "published" };
    const create = (data: object) => payload.create({ collection: "offers", overrideAccess: true, locale: "en", data: { ...base, ...data } as never });
    await expect(create({ cta: { label: "Go", link: { kind: "external", value: "https://evil.example" } } })).rejects.toThrow();
    await expect(create({ cta: { label: "Go", link: { kind: "external", value: "javascript:alert(1)" } } })).rejects.toThrow();
    await expect(create({ title: "t".repeat(121) })).rejects.toThrow();
    await expect(create({ title: "" })).rejects.toThrow();
    const ok = await create({ cta: { label: "Book", link: { kind: "external", value: "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo" } } });
    expect(ok.title).toBe("Linked");
  });
});
