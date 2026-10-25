import fs from "node:fs";
import path from "node:path";
import type { Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, PNG_1X1, rand, type Harness } from "./helpers";

let h: Harness;
let payload: Payload;

const PASSWORD = "Correct-Horse-" + rand();
const mk = (role?: "admin" | "editor") =>
  payload.create({ collection: "users", data: { email: `${rand()}@example.test`, password: PASSWORD, ...(role ? { role } : {}) } as never, overrideAccess: true });
const asUser = async (u: { id: string | number; email: string }) => ({ ...(await payload.findByID({ collection: "users", id: u.id, overrideAccess: true })), collection: "users" as const });

let admin: Awaited<ReturnType<typeof asUser>>;
let editor: Awaited<ReturnType<typeof asUser>>;

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  // First account ever created becomes the administrator, whatever role was requested.
  const first = await mk("editor");
  admin = await asUser(first);
  editor = await asUser(await mk());
});
afterAll(async () => h?.stop());

describe("authentication", () => {
  it("makes the first account an admin and later ones editors by default", () => {
    expect(admin.role).toBe("admin");
    expect(editor.role).toBe("editor");
  });

  it("logs in with the right password and rejects the wrong one", async () => {
    const ok = await payload.login({ collection: "users", data: { email: editor.email, password: PASSWORD } });
    expect(ok.token).toBeTruthy();
    await expect(payload.login({ collection: "users", data: { email: editor.email, password: "nope" } })).rejects.toThrow();
  });

  it("locks the account after repeated failures (brute-force protection)", async () => {
    const victim = await mk();
    for (let i = 0; i < 5; i++) await payload.login({ collection: "users", data: { email: victim.email, password: "bad" } }).catch(() => undefined);
    await expect(payload.login({ collection: "users", data: { email: victim.email, password: PASSWORD } })).rejects.toThrow(/locked/i);
  });
});

describe("authorization: users and roles", () => {
  it("lets only admins create users", async () => {
    await expect(payload.create({ collection: "users", user: editor, overrideAccess: false, data: { email: `${rand()}@example.test`, password: PASSWORD } as never })).rejects.toThrow();
    const created = await payload.create({ collection: "users", user: admin, overrideAccess: false, data: { email: `${rand()}@example.test`, password: PASSWORD, role: "editor" } as never });
    expect(created.role).toBe("editor");
  });

  it("blocks editors from escalating their own role or reading other users", async () => {
    await payload.update({ collection: "users", id: editor.id, user: editor, overrideAccess: false, data: { role: "admin", name: "Edith" } });
    const after = await payload.findByID({ collection: "users", id: editor.id, overrideAccess: true });
    expect(after.role).toBe("editor"); // field-level access stripped the change
    expect(after.name).toBe("Edith"); // ordinary profile edits still work
    const visible = await payload.find({ collection: "users", user: editor, overrideAccess: false });
    expect(visible.docs.map((d) => d.id)).toEqual([editor.id]);
  });

  it("blocks editors from deleting or updating other users; admins can", async () => {
    const other = await mk();
    await expect(payload.delete({ collection: "users", id: other.id, user: editor, overrideAccess: false })).rejects.toThrow();
    await expect(payload.update({ collection: "users", id: other.id, user: editor, overrideAccess: false, data: { name: "x" } })).rejects.toThrow();
    await payload.update({ collection: "users", id: other.id, user: admin, overrideAccess: false, data: { name: "ok" } });
  });
});

describe("authorization and drafts: pages", () => {
  const slug = "page-" + rand();
  let id: string | number;

  it("lets an editor save drafts but not publish; only an administrator adds a page", async () => {
    // "Add new" on the Pages screen would only leave a blank draft page behind (the pages exist), so an editor may not add one
    await expect(payload.create({ collection: "pages", user: editor, overrideAccess: false, draft: true, data: { slug: slug + "-by-editor" } })).rejects.toThrow(/not allowed/i);
    expect((await payload.find({ collection: "pages", overrideAccess: true, draft: true, where: { slug: { equals: slug + "-by-editor" } } })).totalDocs).toBe(0);
    const draft = await payload.create({ collection: "pages", user: admin, overrideAccess: false, draft: true, locale: "en", data: { slug, metaTitle: "Draft v1" } });
    id = draft.id;
    expect(draft._status).toBe("draft");
    const refused = /only save drafts|not allowed/i;
    await expect(payload.update({ collection: "pages", id, user: editor, overrideAccess: false, locale: "en", data: { metaTitle: "x", _status: "published" } })).rejects.toThrow(refused);
    await expect(payload.update({ collection: "pages", id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { metaTitle: "x", _status: "published" } })).rejects.toThrow(refused);
    // a plain (non-draft) write is refused outright, even on a draft-only page
    await expect(payload.update({ collection: "pages", id, user: editor, overrideAccess: false, locale: "en", data: { metaTitle: "plain" } })).rejects.toThrow(refused);
  });

  it("hides never-published drafts from the public", async () => {
    const anon = await payload.find({ collection: "pages", overrideAccess: false, where: { slug: { equals: slug } } });
    expect(anon.totalDocs).toBe(0);
    const anonDraftFlag = await payload.find({ collection: "pages", overrideAccess: false, draft: true, where: { slug: { equals: slug } } });
    expect(anonDraftFlag.totalDocs).toBe(0);
  });

  it("lets only an admin publish; the public then sees it", async () => {
    await payload.update({ collection: "pages", id, user: admin, overrideAccess: false, locale: "en", data: { metaTitle: "Published v1", _status: "published" } });
    const anon = await payload.find({ collection: "pages", overrideAccess: false, locale: "en", where: { slug: { equals: slug } } });
    expect(anon.docs[0].metaTitle).toBe("Published v1");
  });

  it("keeps an editor's newer draft invisible to the public while the old version stays live", async () => {
    await payload.update({ collection: "pages", id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { metaTitle: "SECRET draft v2" } });
    const anon = await payload.find({ collection: "pages", overrideAccess: false, locale: "en", where: { slug: { equals: slug } } });
    expect(JSON.stringify(anon)).not.toContain("SECRET draft v2");
    expect(anon.docs[0]?.metaTitle).toBe("Published v1");
    // Even if an anonymous caller asks for drafts they get the published doc or nothing, never the draft.
    const anonAsksDraft = await payload.find({ collection: "pages", overrideAccess: false, draft: true, locale: "en", where: { slug: { equals: slug } } });
    expect(JSON.stringify(anonAsksDraft)).not.toContain("SECRET draft v2");
    const staff = await payload.find({ collection: "pages", user: editor, overrideAccess: false, draft: true, locale: "en", where: { slug: { equals: slug } } });
    expect(staff.docs[0].metaTitle).toBe("SECRET draft v2");
  });

  it("blocks editors from changing the URL key, deleting, and hijacking live content", async () => {
    await payload.update({ collection: "pages", id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { slug: "hijacked" } });
    const doc = await payload.findByID({ collection: "pages", id, overrideAccess: true, draft: true });
    expect(doc.slug).toBe(slug);
    await expect(payload.delete({ collection: "pages", id, user: editor, overrideAccess: false })).rejects.toThrow();
    // The regression this guards: with a pending draft, a plain update used to rewrite AND unpublish the live page.
    await expect(payload.update({ collection: "pages", id, user: editor, overrideAccess: false, locale: "en", data: { metaTitle: "live hijack" } })).rejects.toThrow(/only save drafts/i);
    const stillLive = await payload.find({ collection: "pages", overrideAccess: false, where: { slug: { equals: slug } } });
    expect(stillLive.totalDocs).toBe(1);
  });

  it("rejects anonymous writes", async () => {
    await expect(payload.create({ collection: "pages", overrideAccess: false, data: { slug: "anon-" + rand() } })).rejects.toThrow();
    await expect(payload.update({ collection: "pages", id, overrideAccess: false, data: { metaTitle: "pwn" } })).rejects.toThrow();
  });
});

describe("locale isolation (bs / en)", () => {
  const slug = "iso-" + rand();
  it("stores and reads each language independently, without silent fallback", async () => {
    const doc = await payload.create({ collection: "pages", user: admin, overrideAccess: false, locale: "en", data: { slug, metaTitle: "English eyebrow", _status: "published" } });
    // bs has nothing yet: must NOT fall back to English.
    const bsEmpty = await payload.findByID({ collection: "pages", id: doc.id, locale: "bs", fallbackLocale: false, overrideAccess: true });
    expect(bsEmpty.metaTitle ?? "").toBe("");

    await payload.update({ collection: "pages", id: doc.id, user: admin, overrideAccess: false, locale: "bs", data: { metaTitle: "Bosanski natpis", _status: "published" } });
    const en = await payload.findByID({ collection: "pages", id: doc.id, locale: "en", overrideAccess: true });
    const bs = await payload.findByID({ collection: "pages", id: doc.id, locale: "bs", overrideAccess: true });
    expect(en.metaTitle).toBe("English eyebrow");
    expect(bs.metaTitle).toBe("Bosanski natpis");

    await payload.update({ collection: "pages", id: doc.id, user: admin, overrideAccess: false, locale: "en", data: { metaTitle: "English v2", _status: "published" } });
    const bsAfter = await payload.findByID({ collection: "pages", id: doc.id, locale: "bs", overrideAccess: true });
    expect(bsAfter.metaTitle).toBe("Bosanski natpis"); // editing EN leaves BS unchanged
  });
});

describe("rooms: privileged fields", () => {
  it("keeps the booking mapping admin-only", async () => {
    const slug = "room-" + rand();
    const room = await payload.create({ collection: "rooms", user: admin, overrideAccess: false, locale: "en", data: { slug, roomTypeId: "18019000000000000010", name: "Test room", _status: "published" } });
    await payload.update({ collection: "rooms", id: room.id, user: editor, overrideAccess: false, draft: true, locale: "en", data: { roomTypeId: "EVIL", name: "Edited draft" } });
    const raw = await payload.findByID({ collection: "rooms", id: room.id, overrideAccess: true, draft: true });
    expect(raw.roomTypeId).toBe("18019000000000000010");
    // editors do not even see the field; the public never does
    const asEditor = await payload.findByID({ collection: "rooms", id: room.id, user: editor, overrideAccess: false, draft: true });
    expect(asEditor).not.toHaveProperty("roomTypeId");
    const asPublic = await payload.findByID({ collection: "rooms", id: room.id, overrideAccess: false });
    expect(asPublic).not.toHaveProperty("roomTypeId");
  });
});

describe("media", () => {
  it("persists uploads to storage and survives a fresh read", async () => {
    const media = await payload.create({
      collection: "media",
      user: editor,
      overrideAccess: false,
      locale: "en",
      data: { alt: "Pixel", credit: "test" },
      file: { data: PNG_1X1, mimetype: "image/png", name: `pixel-${rand()}.png`, size: PNG_1X1.length },
    });
    const onDisk = path.join(h.mediaDir, media.filename as string);
    expect(fs.existsSync(onDisk)).toBe(true);
    expect(fs.readFileSync(onDisk).equals(PNG_1X1)).toBe(true);
    const again = await payload.findByID({ collection: "media", id: media.id, overrideAccess: false });
    expect(again.filename).toBe(media.filename);
    expect(again.alt).toBe("Pixel");
  });

  it("rejects SVG/HTML uploads and anonymous uploads, requires alt text", async () => {
    const svg = Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>");
    await expect(
      payload.create({ collection: "media", user: editor, overrideAccess: false, data: { alt: "x" }, file: { data: svg, mimetype: "image/svg+xml", name: "x.svg", size: svg.length } }),
    ).rejects.toThrow();
    await expect(
      payload.create({ collection: "media", overrideAccess: false, data: { alt: "x" }, file: { data: PNG_1X1, mimetype: "image/png", name: "anon.png", size: PNG_1X1.length } }),
    ).rejects.toThrow();
    await expect(
      payload.create({ collection: "media", user: editor, overrideAccess: false, data: {} as never, file: { data: PNG_1X1, mimetype: "image/png", name: "noalt.png", size: PNG_1X1.length } }),
    ).rejects.toThrow();
  });

  it("only admins may delete media", async () => {
    const m = await payload.create({ collection: "media", user: editor, overrideAccess: false, data: { alt: "d" }, file: { data: PNG_1X1, mimetype: "image/png", name: `del-${rand()}.png`, size: PNG_1X1.length } });
    await expect(payload.delete({ collection: "media", id: m.id, user: editor, overrideAccess: false })).rejects.toThrow();
    await payload.delete({ collection: "media", id: m.id, user: admin, overrideAccess: false });
  });
});
