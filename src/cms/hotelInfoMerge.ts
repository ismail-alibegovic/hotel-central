import { hotel, maps } from "@/content/hotel";
import type { Locale } from "@/lib/i18n";
import type { HotelInfo } from "@/payload-types";
import { addressProblem, emailProblem, formatHours, hoursProblem, phoneHref, phoneProblem } from "./hotelInfoRules";

export type Phone = { label?: string; display: string; href: string };
export type Email = { label?: string; address: string };
export type HoursRow = { days: string; time?: string; closed: boolean };
export type Hours = { facility: string; name: string; rows: HoursRow[]; note?: string };

/** Everything the website shows about how to reach the hotel. `phones[0]` / `emails[0]` are the main ones. */
export type HotelContact = {
  phone: Phone;
  phones: Phone[];
  email: string;
  emails: Email[];
  street: string;
  postalCode: string;
  city: string;
  country: string;
  directions: string;
  mapEmbed: string;
  hours: Hours[];
};

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);

/** Map links for an address; for the built-in address these are exactly the verified links in `src/content/hotel.ts`. */
export function mapsFor(street: string, postalCode: string, city: string): { directions: string; embed: string } {
  if (street === hotel.street && postalCode === hotel.postalCode && city === hotel.city) return { directions: maps.directions, embed: maps.embed };
  return {
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${hotel.shortName}, ${street}, ${postalCode} ${city}, ${hotel.country}`),
    embed: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s" + encodeURIComponent(`${hotel.shortName}, ${street}, ${city}`).replace(/%20/g, "+") + "!6i16",
  };
}

/** The verified details in code: what the website shows with the CMS off, empty, unreachable or holding invalid values. */
export function builtInContact(locale: Locale): HotelContact {
  const phone = { display: hotel.phoneDisplay, href: hotel.phoneHref };
  return {
    phone,
    phones: [phone],
    email: hotel.email,
    emails: [{ address: hotel.email }],
    street: hotel.street,
    postalCode: hotel.postalCode,
    city: hotel.city,
    country: locale === "bs" ? hotel.countryBs : hotel.country,
    directions: maps.directions,
    mapEmbed: maps.embed,
    hours: [],
  };
}

/**
 * Hotel Information for a locale: the CMS values where they are present and valid, the built-in value everywhere else.
 * Lists are filtered row by row (an invalid number is left out, the others stay); the address is all-or-nothing.
 */
export function mergeHotelInfo(locale: Locale, doc: HotelInfo | null): HotelContact {
  const base = builtInContact(locale);
  if (!doc) return base;

  const phones: Phone[] = (doc.phones ?? [])
    .filter((p) => !phoneProblem(p.number))
    .map((p) => ({ ...(text(p.label) ? { label: text(p.label) } : {}), display: p.number.trim(), href: phoneHref(p.number) }));
  const emails: Email[] = (doc.emails ?? []).filter((e) => !emailProblem(e.address)).map((e) => ({ ...(text(e.label) ? { label: text(e.label) } : {}), address: e.address.trim() }));

  const a = doc.address;
  const useAddress = Boolean(a && text(a.street) && text(a.postalCode) && text(a.city) && !addressProblem(a));
  const street = useAddress ? text(a!.street)! : base.street;
  const postalCode = useAddress ? text(a!.postalCode)! : base.postalCode;
  const city = useAddress ? text(a!.city)! : base.city;
  const map = mapsFor(street, postalCode, city);

  // Only rows written in this language are shown; a place without any such row is left out in this language.
  const hours: Hours[] = (doc.hours ?? []).flatMap((h) => {
    const name = text(h.name);
    const rows = (h.rows ?? []).flatMap((r) => {
      const days = text(r.days);
      if (!days || hoursProblem(r.time, r.closed)) return [];
      return [r.closed ? { days, closed: true } : { days, time: formatHours(r.time!), closed: false }];
    });
    if (!name || !rows.length) return [];
    return [{ facility: h.facility, name, rows, ...(text(h.note) ? { note: text(h.note) } : {}) }];
  });

  return {
    phone: phones[0] ?? base.phone,
    phones: phones.length ? phones : base.phones,
    email: emails[0]?.address ?? base.email,
    emails: emails.length ? emails : base.emails,
    street,
    postalCode,
    city,
    country: text(a?.country) ?? base.country,
    directions: map.directions,
    mapEmbed: map.embed,
    hours,
  };
}

const escape = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Text written before Hotel Information existed still contains the built-in details: page sections stored in the CMS (the Contact
 * page's top strip "+387 33 561 800 · (Contact) · info@hotelcentral.ba", its call and e-mail buttons) and built-in sentences such as
 * the contact form's "email us at info@hotelcentral.ba or call +387 33 561 800" or the Contact page's description for Google.
 * Those follow the current details:
 *  - the phone number, the e-mail address and their links are replaced wherever they appear, also inside a sentence (they are
 *    unambiguous; a number is only matched when it is not part of a longer number);
 *  - the street and "postal code + city" only when the text is exactly that value (an address inside a sentence, such as directions,
 *    is left as written).
 * With unchanged details nothing is touched and the same object is returned.
 */
export function followContact<T>(value: T, contact: HotelContact): T {
  const inText: [string, string][] = [
    [`mailto:${hotel.email}`, `mailto:${contact.email}`],
    [hotel.phoneHref, contact.phone.href],
    [hotel.email, contact.email],
    [hotel.phoneDisplay, contact.phone.display],
  ];
  const whole = new Map<string, string>([
    [hotel.street, contact.street],
    [`${hotel.postalCode} ${hotel.city}`, `${contact.postalCode} ${contact.city}`],
  ]);
  const changed = inText.filter(([a, b]) => a !== b);
  if (!changed.length && [...whole].every(([a, b]) => a === b)) return value;
  const patterns = changed.map(([a, b]) => [new RegExp(`(?<![\\w+.@-])${escape(a)}(?![\\w@-]|\\.\\w)`, "g"), b] as const);
  const text = (v: string) => {
    if (whole.has(v)) return whole.get(v)!;
    let out = v;
    for (const [re, b] of patterns) out = out.replace(re, () => b);
    return out;
  };
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return text(v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(value) as T;
}

/** The few details the client-side components need (header menu, phone button), so the rest is not sent to the browser. */
export type ContactLinks = Pick<HotelContact, "phone" | "email" | "street" | "postalCode" | "city">;
export const contactLinks = (c: HotelContact): ContactLinks => ({ phone: c.phone, email: c.email, street: c.street, postalCode: c.postalCode, city: c.city });
