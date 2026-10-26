import fs from "node:fs";
import { handleEndpoints, type Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { HotelInfo } from "@/cms/globals/HotelInfo";
import { builtInContact, followContact, mapsFor, mergeHotelInfo } from "@/cms/hotelInfoMerge";
import { addressProblem, emailProblem, formatHours, hoursProblem, phoneHref, phoneProblem } from "@/cms/hotelInfoRules";
import { seedGlobals } from "@/cms/seedGlobals";
import { booking, hotel, maps } from "@/content/hotel";
import type { HotelInfo as HotelInfoDoc } from "@/payload-types";
import { boot, rand, type Harness } from "./helpers";

const doc = (d: Partial<HotelInfoDoc>) => ({ id: 1, ...d }) as HotelInfoDoc;

describe("validation rules", () => {
  it("accepts real phone numbers and derives the link", () => {
    for (const ok of ["+387 33 561 800", "033 561 800", "+387 (33) 561-800", "+387 61 123 456"]) expect(phoneProblem(ok), ok).toBeNull();
    expect(phoneHref("+387 33 561 800")).toBe(hotel.phoneHref);
    expect(phoneHref("033 561 800")).toBe("tel:033561800");
  });

  it("refuses anything that is not a phone number, with a plain explanation", () => {
    for (const bad of ["", "   ", "call us", "+387 33 561 800 ext. 2", "12345", "+1234567890123456", "javascript:alert(1)", "+387 33 561 800<script>", "387+33"]) expect(phoneProblem(bad), bad).toMatch(/phone|digits|Use digits/);
  });

  it("accepts e-mail addresses and refuses look-alikes", () => {
    for (const ok of ["info@hotelcentral.ba", "spa.desk@hotelcentral.ba", "reservations+web@hotel-central.co.uk"]) expect(emailProblem(ok), ok).toBeNull();
    for (const bad of ["", "info", "info@", "@hotelcentral.ba", "info@hotelcentral", "info @hotelcentral.ba", "info@hotelcentral.ba?subject=x", "a<b>@x.ba", "mailto:info@hotelcentral.ba"]) expect(emailProblem(bad), bad).not.toBeNull();
  });

  it("accepts opening hours in the 24-hour format, or Closed", () => {
    for (const ok of ["07:00 – 22:00", "7.00-22.00", "07:00 – 15:00, 18:00 – 23:00", "00:00 – 24:00"]) expect(hoursProblem(ok, false), ok).toBeNull();
    expect(hoursProblem("", true)).toBeNull();
    for (const bad of ["", "all day", "7am – 10pm", "07:00", "25:00 – 26:00", "07:00 – 22:60"]) expect(hoursProblem(bad, false), bad).not.toBeNull();
    expect(formatHours("7.00-22.00")).toBe("07:00 – 22:00");
    expect(formatHours("07:00 - 15:00 ,18:00—23:00")).toBe("07:00 – 15:00, 18:00 – 23:00");
  });

  it("asks for street, postal code and city together", () => {
    expect(addressProblem({})).toBeNull();
    expect(addressProblem({ street: "Ćumurija 8", postalCode: "71000", city: "Sarajevo" })).toBeNull();
    expect(addressProblem({ street: "Ćumurija 10" })).toMatch(/together/);
  });
});

describe("merging Hotel Information over the verified built-in details", () => {
  it("without a document (CMS off, unreachable, nothing published) the built-in details are used unchanged", () => {
    for (const l of ["en", "bs"] as const) {
      const c = mergeHotelInfo(l, null);
      expect(c).toEqual(builtInContact(l));
      expect(c.phone).toEqual({ display: hotel.phoneDisplay, href: hotel.phoneHref });
      expect(c.country).toBe(l === "bs" ? hotel.countryBs : hotel.country);
      expect([c.directions, c.mapEmbed]).toEqual([maps.directions, maps.embed]);
    }
  });

  it("the built-in address gives exactly the verified map links", () => {
    expect(mapsFor(hotel.street, hotel.postalCode, hotel.city)).toEqual({ directions: maps.directions, embed: maps.embed });
    const moved = mapsFor("Ferhadija 1", "71000", "Sarajevo");
    expect(moved.directions).toContain(encodeURIComponent("Ferhadija 1"));
    expect(moved.embed).toContain("Ferhadija+1");
  });

  it("uses valid CMS values, leaves out invalid rows, and falls back when nothing valid is left", () => {
    const c = mergeHotelInfo("en", doc({ phones: [{ number: "not a number" }, { number: " +387 33 000 111 ", label: "Spa" }, { number: "+387 33 561 800", label: " " }], emails: [{ address: "nope" }] }));
    expect(c.phone).toEqual({ label: "Spa", display: "+387 33 000 111", href: "tel:+38733000111" });
    expect(c.phones.map((p) => p.display)).toEqual(["+387 33 000 111", "+387 33 561 800"]);
    expect(c.phones[1].label).toBeUndefined();
    expect(c.email).toBe(hotel.email);
    const none = mergeHotelInfo("en", doc({ phones: [{ number: "x" }] }));
    expect(none.phone).toEqual(builtInContact("en").phone);
  });

  it("uses the address only when street, postal code and city are all present", () => {
    expect(mergeHotelInfo("en", doc({ address: { street: "Ferhadija 1" } })).street).toBe(hotel.street);
    const moved = mergeHotelInfo("bs", doc({ address: { street: "Ferhadija 1", postalCode: "71000", city: "Sarajevo", country: "" } }));
    expect([moved.street, moved.country]).toEqual(["Ferhadija 1", hotel.countryBs]);
    expect(moved.directions).not.toBe(maps.directions);
  });

  it("shows opening hours only in the languages they are written in", () => {
    const d = doc({ hours: [{ facility: "spa", name: "Club & Spa", rows: [{ days: "Every day", time: "7.00-22.00", closed: false }, { days: "Holidays", closed: true, time: null }] }, { facility: "gym", name: null as never, rows: [{ days: "x", time: "07:00 – 22:00" }] }] });
    const en = mergeHotelInfo("en", d);
    expect(en.hours).toEqual([{ facility: "spa", name: "Club & Spa", rows: [{ days: "Every day", time: "07:00 – 22:00", closed: false }, { days: "Holidays", closed: true }] }]);
    const broken = mergeHotelInfo("en", doc({ hours: [{ facility: "spa", name: "Spa", rows: [{ days: "Every day", time: "all day" }] }] }));
    expect(broken.hours).toEqual([]);
  });

  it("text written before Hotel Information follows it: phone and e-mail anywhere, the address only as a whole value", () => {
    const blocks = [
      { type: "hero", meta: [hotel.phoneDisplay, "(Contact)", hotel.email] },
      { type: "cta", label: hotel.phoneDisplay, href: hotel.phoneHref, mail: `mailto:${hotel.email}`, body: `Call ${hotel.phoneDisplay} or write to ${hotel.email}.` },
      { type: "hero", meta: [hotel.street, "(Location)", `${hotel.postalCode} ${hotel.city}`], intro: `We are at ${hotel.street}, ${hotel.postalCode} ${hotel.city}.` },
    ];
    expect(followContact(blocks, builtInContact("en"))).toBe(blocks); // unchanged details: the very same object
    const c = mergeHotelInfo("en", doc({ phones: [{ number: "+387 33 000 111" }], emails: [{ address: "desk@hotelcentral.ba" }], address: { street: "Ferhadija 1", postalCode: "71000", city: "Sarajevo" } }));
    expect(followContact(blocks, c)).toEqual([
      { type: "hero", meta: ["+387 33 000 111", "(Contact)", "desk@hotelcentral.ba"] },
      { type: "cta", label: "+387 33 000 111", href: "tel:+38733000111", mail: "mailto:desk@hotelcentral.ba", body: "Call +387 33 000 111 or write to desk@hotelcentral.ba." },
      { type: "hero", meta: ["Ferhadija 1", "(Location)", "71000 Sarajevo"], intro: `We are at ${hotel.street}, ${hotel.postalCode} ${hotel.city}.` },
    ]);
  });

  it("never rewrites a longer number or a different address that merely contains the old one", () => {
    const c = mergeHotelInfo("en", doc({ phones: [{ number: "+387 33 000 111" }], emails: [{ address: "desk@hotelcentral.ba" }] }));
    const near = [`${hotel.phoneDisplay}1`, `0${hotel.phoneDisplay}`, `x${hotel.email}`, `${hotel.email}.example`, `old-${hotel.email}`, `${hotel.phoneHref}9`];
    expect(followContact(near, c)).toEqual(near);
  });
});

describe("what Hotel Information can never change", () => {
  const names = (fields: unknown[]): string[] =>
    fields.flatMap((f) => {
      const x = f as { name?: string; fields?: unknown[]; tabs?: { fields: unknown[] }[] };
      return [...(x.name ? [x.name] : []), ...(x.fields ? names(x.fields) : []), ...(x.tabs ? x.tabs.flatMap((t) => names(t.fields)) : [])];
    });

  it("has no field for the contact-form recipient, the booking engine or reservations", () => {
    const all = names(HotelInfo.fields);
    for (const n of all) expect(n, n).not.toMatch(/book|reserv|ipms|ezee|room|recipient|contactTo|formTo|url|href|link/i);
  });

  it("the contact form still delivers to the address in code / CONTACT_TO, never to a CMS value", () => {
    const route = fs.readFileSync("src/app/api/contact/route.ts", "utf8");
    expect(route).not.toMatch(/@\/cms|hotel-info|getHotelContact/);
    expect(route).toContain("process.env.CONTACT_TO ?? hotel.email");
    expect(booking.bookingUrl).toBe("https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo");
  });
});

describe("the Hotel Information settings in the CMS", () => {
  let h: Harness;
  let payload: Payload;
  const PASSWORD = "Correct-Horse-" + rand();
  let adminToken = "";
  let editorToken = "";

  async function call(method: string, path: string, opts: { token?: string; body?: unknown } = {}) {
    const res = await handleEndpoints({
      config: payload.config,
      request: new Request(`http://localhost:3000${path}`, {
        method,
        headers: { "Content-Type": "application/json", ...(opts.token ? { Authorization: `JWT ${opts.token}` } : {}) },
        body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
      }),
    });
    const text = await res.text();
    let json: Record<string, unknown> | null = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* not JSON */
    }
    return { status: res.status, text, json };
  }

  beforeAll(async () => {
    h = await boot();
    payload = h.payload;
    const mk = async (role: "admin" | "editor") => {
      const u = await payload.create({ collection: "users", data: { email: `${role}-${rand()}@example.test`, password: PASSWORD, role } as never, overrideAccess: true });
      return (await call("POST", "/api/users/login", { body: { email: u.email, password: PASSWORD } })).json!.token as string;
    };
    adminToken = await mk("admin");
    editorToken = await mk("editor");
  });
  afterAll(async () => h?.stop());

  it("seeding fills in the verified details (both languages), which render exactly like the built-in ones", async () => {
    expect((await seedGlobals(payload)).hotelInfo).toBe("created");
    for (const l of ["en", "bs"] as const) {
      const d = (await payload.findGlobal({ slug: "hotel-info", locale: l, fallbackLocale: false, depth: 0, overrideAccess: true })) as HotelInfoDoc;
      expect(mergeHotelInfo(l, d)).toEqual(builtInContact(l));
      expect(d.hours ?? []).toEqual([]); // nothing invented
    }
    expect((await seedGlobals(payload)).hotelInfo).toBe("exists");
  });

  it("an editor saves a draft, which the public does not see", async () => {
    const draft = await call("POST", "/api/globals/hotel-info?draft=true&locale=en", { token: editorToken, body: { phones: [{ number: "+387 33 999 999" }] } });
    expect(draft.status).toBe(200);
    const pub = await call("GET", "/api/globals/hotel-info?locale=en");
    expect(pub.text).not.toContain("999 999");
    const staff = await call("GET", "/api/globals/hotel-info?locale=en&draft=true", { token: editorToken });
    expect(staff.text).toContain("+387 33 999 999");
  });

  it("an editor cannot publish, with or without the draft flag", async () => {
    for (const path of ["/api/globals/hotel-info?locale=en", "/api/globals/hotel-info?locale=en&draft=true"]) {
      const res = await call("POST", path, { token: editorToken, body: { phones: [{ number: "+387 33 888 888" }], _status: "published" } });
      expect(res.status, path).toBe(403);
    }
    expect((await call("GET", "/api/globals/hotel-info?locale=en")).text).not.toContain("888 888");
  });

  it("anonymous visitors cannot change anything", async () => {
    expect([401, 403]).toContain((await call("POST", "/api/globals/hotel-info?draft=true", { body: { phones: [{ number: "+387 33 777 777" }] } })).status);
  });

  it("an administrator publishes; invalid values are refused with the reason", async () => {
    const bad = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { phones: [{ number: "call reception" }], _status: "published" } });
    expect(bad.status).toBe(400);
    expect(bad.text).toContain("Use digits");
    const badMail = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { emails: [{ address: "info@" }], _status: "published" } });
    expect(badMail.status).toBe(400);
    const badHours = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { hours: [{ facility: "spa", name: "Spa", rows: [{ days: "Every day", time: "all day" }] }], _status: "published" } });
    expect(badHours.status).toBe(400);
    const halfAddress = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { address: { street: "Ferhadija 1", postalCode: "", city: "" }, _status: "published" } });
    expect(halfAddress.status).toBe(400);

    const ok = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { phones: [{ number: "+387 33 561 800" }, { number: "+387 33 561 850", label: "Spa" }], _status: "published" } });
    expect(ok.status).toBe(200);
    const pub = (await call("GET", "/api/globals/hotel-info?locale=en")).json as unknown as HotelInfoDoc;
    expect(mergeHotelInfo("en", pub).phones.map((p) => [p.label, p.display])).toEqual([[undefined, "+387 33 561 800"], ["Spa", "+387 33 561 850"]]);
  });

  it("labels and day names are per language; numbers and times are shared", async () => {
    const en = await call("POST", "/api/globals/hotel-info?locale=en", { token: adminToken, body: { hours: [{ facility: "reception", name: "Reception", rows: [{ days: "Every day", time: "00:00 – 24:00" }] }], _status: "published" } });
    expect(en.status).toBe(200);
    const saved = en.json as unknown as { doc?: HotelInfoDoc; result?: HotelInfoDoc } & Partial<HotelInfoDoc>;
    const rows = (saved.result ?? saved.doc ?? saved).hours;
    const bsBody = { hours: rows!.map((r) => ({ id: r.id, facility: r.facility, name: "Recepcija", rows: r.rows!.map((x) => ({ id: x.id, days: "Svaki dan", time: x.time })) })), _status: "published" };
    expect((await call("POST", "/api/globals/hotel-info?locale=bs", { token: adminToken, body: bsBody })).status).toBe(200);
    const get = async (l: string) => mergeHotelInfo(l as "en", (await call("GET", `/api/globals/hotel-info?locale=${l}`)).json as unknown as HotelInfoDoc);
    expect((await get("en")).hours[0]).toMatchObject({ name: "Reception", rows: [{ days: "Every day", time: "00:00 – 24:00" }] });
    expect((await get("bs")).hours[0]).toMatchObject({ name: "Recepcija", rows: [{ days: "Svaki dan", time: "00:00 – 24:00" }] });
    expect((await get("bs")).phones[1].label).toBeUndefined(); // "Spa" was written in English only
  });
});
