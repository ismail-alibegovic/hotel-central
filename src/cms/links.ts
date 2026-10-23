import { href as localeHref, type Locale } from "@/lib/i18n";

/**
 * Editor-supplied links. Everything an editor can type is validated here AND again when resolving for
 * rendering, so a bad value that slipped in some other way (API, import) still cannot become a link.
 */
export type LinkKind = "internal" | "external" | "phone" | "email";
export type LinkValue = { kind?: string | null; value?: string | null };
export type ResolvedLink = { kind: LinkKind; href: string; external: boolean };

/** External destinations editors may point to (https only). Extending this list is a code change on purpose. */
export const allowedExternalHosts = [
  "hotelcentral.ba",
  "www.hotelcentral.ba",
  "live.ipms247.com", // the hotel's booking engine
  "www.facebook.com",
  "facebook.com",
  "www.instagram.com",
  "www.google.com",
  "maps.app.goo.gl",
  "goo.gl",
  "www.tripadvisor.com",
  "www.booking.com",
] as const;

const INTERNAL = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*){0,2}$/;
const PHONE = /^\+?[0-9][0-9 ()/-]{5,22}[0-9]$/;
const EMAIL = /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[^\s@<>()"',;:]{2,}$/;

export function validateLink(kind: string | null | undefined, value: string | null | undefined): true | string {
  const v = (value ?? "").trim();
  if (!kind && !v) return true; // optional link left empty
  if (!kind || !v) return "Choose a link type and enter the destination.";
  switch (kind) {
    case "internal":
      if (v === "/") return true;
      if (/^\/(en|bs)(\/|$)/.test(v)) return "Do not include the language: write /rooms, not /en/rooms.";
      return INTERNAL.test(v) ? true : "Use a site path such as /rooms or /rooms/junior-suite (lowercase letters, digits, hyphens).";
    case "external": {
      let u: URL;
      try {
        u = new URL(v);
      } catch {
        return "Enter a full address starting with https://";
      }
      if (u.protocol !== "https:") return "Only https:// links are allowed.";
      if (u.username || u.password) return "Links with embedded credentials are not allowed.";
      return (allowedExternalHosts as readonly string[]).includes(u.hostname) ? true : `Links to ${u.hostname} are not on the approved list. Ask an administrator.`;
    }
    case "phone":
      return PHONE.test(v) ? true : "Enter a phone number such as +387 33 561 800.";
    case "email":
      return EMAIL.test(v) ? true : "Enter a valid e-mail address.";
    default:
      return "Unknown link type.";
  }
}

/** Null when absent or invalid (the caller then simply omits the call-to-action). */
export function resolveLink(link: LinkValue | null | undefined, locale: Locale): ResolvedLink | null {
  const kind = link?.kind as LinkKind | undefined;
  const value = (link?.value ?? "").trim();
  if (!kind || !value || validateLink(kind, value) !== true) return null;
  switch (kind) {
    case "internal":
      return { kind, href: localeHref(locale, value), external: false };
    case "external":
      return { kind, href: new URL(value).toString(), external: true };
    case "phone":
      return { kind, href: `tel:${value.replace(/[^+0-9]/g, "")}`, external: false };
    case "email":
      return { kind, href: `mailto:${value}`, external: false };
  }
}

/** Inverse used by the seed: describe an already-resolved static link as editor data. */
export function linkFromHref(hrefValue: string, locale: Locale): { kind: LinkKind; value: string } {
  if (hrefValue.startsWith("tel:")) return { kind: "phone", value: hrefValue.slice(4) };
  if (hrefValue.startsWith("mailto:")) return { kind: "email", value: hrefValue.slice(7) };
  if (/^https:\/\//.test(hrefValue)) return { kind: "external", value: hrefValue };
  const prefix = `/${locale}`;
  return { kind: "internal", value: hrefValue.startsWith(prefix) ? hrefValue.slice(prefix.length) || "/" : hrefValue };
}
