import { expect, request as pwRequest, test, type APIRequestContext } from "@playwright/test";

/**
 * Offers / FAQ / CTA sections over HTTP, on the "rooms" page (no other spec touches it). Example content is flagged
 * DEMO / SAMPLE: it is visible in staff preview with a label, can never be published, never leaks to the public page,
 * and real (unflagged) content renders in the existing design. The page is restored at the end.
 */
const ADMIN = { email: process.env.SEED_ADMIN_EMAIL!, password: process.env.SEED_ADMIN_PASSWORD! };
const EDITOR = { email: `sections-editor-${Date.now()}@example.test`, password: process.env.E2E_EDITOR_PASSWORD! };
const base = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const BOOKING = "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo";

async function login(creds: { email: string; password: string }): Promise<APIRequestContext> {
  const anon = await pwRequest.newContext({ baseURL: base });
  const res = await anon.post("/api/users/login", { data: creds });
  expect(res.status(), "login").toBe(200);
  return pwRequest.newContext({ baseURL: base, extraHTTPHeaders: { Origin: base, Authorization: `JWT ${(await res.json()).token}`, Connection: "close" } });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let admin: APIRequestContext;
let editor: APIRequestContext;
let roomsId: string;
let original: any[];

const rows = (sample: boolean, extra: Record<string, any> = {}) => [
  ...original,
  {
    blockType: "offers",
    sample,
    label: sample ? "(08) Offers — SAMPLE" : "(08) Offers",
    title: sample ? "Sample offers\nfor layout review" : "Seasonal\nstays",
    intro: sample ? "DEMO / SAMPLE text, not a real offer." : "Stays arranged by the hotel.",
    tone: "ivory",
    items: [
      { title: sample ? "Sample offer one" : "Weekend stay", description: sample ? "Placeholder text." : "Two nights with breakfast.", validity: sample ? "Sample wording, not real dates" : "Weekends", cta: { label: "Book", useBooking: true } },
      { title: sample ? "Sample offer two" : "Spa stay", description: "More text.", cta: { label: "Rooms", useBooking: false, link: { kind: "internal", value: "/rooms" } } },
    ],
  },
  {
    blockType: "faq",
    sample,
    label: sample ? "(09) Questions — SAMPLE" : "(09) Questions",
    title: "Good to\nknow",
    tone: "deep",
    items: [
      { q: "Sample question one?", a: "DEMO / SAMPLE answer.\nSecond paragraph." },
      { q: "Sample question two?", a: "Another answer." },
    ],
  },
  { blockType: "cta", sample, label: "Ready", title: "Plan your\nstay", body: "Book directly.", tone: "olive", primary: { label: "Book now", useBooking: true }, secondary: { label: "Contact us", useBooking: false, link: { kind: "internal", value: "/contact" } }, ...extra },
];

const layoutOf = async (ctx: APIRequestContext, locale: string) => ((await (await ctx.get(`/api/pages/${roomsId}?draft=true&locale=${locale}&depth=0`)).json()).layout ?? []) as any[];
const bypassCookie = async (ctx: APIRequestContext, path: string) => {
  const res = await ctx.get(`/api/preview?path=${encodeURIComponent(path)}`, { maxRedirects: 0 });
  expect([302, 307, 308]).toContain(res.status());
  return res.headersArray().filter((h) => h.name.toLowerCase() === "set-cookie").map((h) => h.value.split(";")[0]).find((c) => c.startsWith("__prerender_bypass"))!;
};

test.beforeAll(async () => {
  admin = await login(ADMIN);
  expect((await admin.post("/api/users", { data: EDITOR })).status()).toBe(201);
  editor = await login(EDITOR);
  roomsId = (await (await admin.get("/api/pages?where[slug][equals]=rooms&limit=1&depth=0&draft=true")).json()).docs[0].id;
  original = await layoutOf(admin, "en");
});

test("sample sections: an editor drafts them, only staff preview shows them (labelled), the public never does", async ({ request }) => {
  const draft = await editor.patch(`/api/pages/${roomsId}?draft=true&locale=en`, { data: { layout: rows(true) } });
  expect(draft.status()).toBe(200);

  const pub = await (await request.get("/en/rooms")).text();
  expect(pub).not.toContain("data-block=\"offers\"");
  expect(pub).not.toContain("Sample offer");

  const bypass = await bypassCookie(editor, "/en/rooms");
  const preview = await (await editor.get("/en/rooms", { headers: { cookie: bypass } })).text();
  expect(preview).toContain('data-block="offers"');
  expect(preview).toContain('data-block="faq"');
  expect(preview).toContain('data-block="cta"');
  expect(preview.match(/data-sample="true"/g)).toHaveLength(3); // one DEMO / SAMPLE label per sample section
  expect(preview).toContain("DEMO / SAMPLE — not a real offer");
  expect(preview).not.toContain("FAQPage"); // no structured data for example content
  expect(preview).toContain(BOOKING); // the booking button comes from code
  expect(preview).toContain("Sample question one?");
  // the existing room list is still there, ahead of the new sections
  expect(preview.indexOf("single-room")).toBeGreaterThan(-1);
  expect(preview.indexOf('data-block="offers"')).toBeGreaterThan(preview.indexOf("single-room"));
});

test("sample sections cannot be published — whether the layout travels with the request or not", async ({ request }) => {
  expect((await admin.patch(`/api/pages/${roomsId}?locale=en`, { data: { layout: rows(true), _status: "published" } })).status()).toBe(400);
  const statusOnly = await admin.patch(`/api/pages/${roomsId}?locale=en`, { data: { _status: "published" } });
  expect(statusOnly.status()).toBe(400);
  expect(await statusOnly.text()).toMatch(/SAMPLE/);
  expect(await (await request.get("/en/rooms")).text()).not.toContain('data-block="offers"');
});

test("an unapproved button destination is refused when saving", async () => {
  const bad = rows(false);
  (bad[bad.length - 1] as any).primary = { label: "Go", useBooking: false, link: { kind: "external", value: "https://evil.example/x" } };
  expect((await admin.patch(`/api/pages/${roomsId}?locale=en`, { data: { layout: bad, _status: "published" } })).status()).toBe(400);
});

test("real content renders in the existing design: offers, FAQ with structured data, CTA — English and Bosnian independently", async ({ request }) => {
  const published = await admin.patch(`/api/pages/${roomsId}?locale=en`, { data: { layout: rows(false), _status: "published" } });
  expect(published.status()).toBe(200);
  const en = await (await request.get("/en/rooms")).text();
  expect(en).toContain('data-block="offers"');
  expect(en).toContain("Weekend stay");
  expect(en).toContain('<details');
  expect(en).toContain('"@type":"FAQPage"');
  expect(en).not.toContain("data-sample");
  expect(en).toContain(BOOKING);
  expect(en).toContain('href="/en/rooms"'); // internal button destination, localized
  // nothing is translated yet, so Bosnian shows the page without the new sections (never English text, never empty headings)
  const bs = await (await request.get("/bs/rooms")).text();
  expect(bs).not.toContain('data-block="offers"');
  expect(bs).not.toContain("Weekend stay");

  // translate the Bosnian wording onto the same rows
  const enRows = await layoutOf(admin, "en");
  const bsRows = enRows.map((r) => {
    if (r.blockType === "offers") return { ...r, label: "(08) Ponude", title: "Sezonski\nboravci", items: r.items.map((it: any, i: number) => ({ ...it, title: `Ponuda ${i + 1}`, description: "Opis ponude.", validity: "", cta: { ...it.cta, label: "Rezerviši" } })) };
    if (r.blockType === "faq") return { ...r, label: "(09) Pitanja", title: "Korisno\nznati", items: r.items.map((it: any, i: number) => ({ ...it, q: `Pitanje ${i + 1}?`, a: "Odgovor." })) };
    if (r.blockType === "cta") return { ...r, label: "Spremni", title: "Planirajte\nboravak", body: "Rezervišite direktno.", primary: { ...r.primary, label: "Rezerviši" }, secondary: { ...r.secondary, label: "Kontakt" } };
    return r;
  });
  expect((await admin.patch(`/api/pages/${roomsId}?locale=bs`, { data: { layout: bsRows, _status: "published" } })).status()).toBe(200);
  const bs2 = await (await request.get("/bs/rooms")).text();
  expect(bs2).toContain("Ponuda 1");
  expect(bs2).toContain('href="/bs/rooms"');
  expect(bs2).not.toContain("Weekend stay");
  expect(await (await request.get("/en/rooms")).text()).not.toContain("Ponuda 1");
});

test("restore: the rooms page is back to its original layout", async ({ request }) => {
  const enOriginal = original;
  expect((await admin.patch(`/api/pages/${roomsId}?locale=en`, { data: { layout: enOriginal, _status: "published" } })).status()).toBe(200);
  const html = await (await request.get("/en/rooms")).text();
  expect(html).not.toContain('data-block="offers"');
  expect(html).not.toContain("FAQPage");
});
