import { hotel } from "@/content/hotel";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import type { Footer, Navigation } from "@/payload-types";
import { resolveLink, validateLink } from "./links";

export type SocialLink = { label: string; href: string };
export const staticSocial: SocialLink[] = [{ label: "Facebook", href: hotel.facebook }];

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
const lines = (v: string | null | undefined) => {
  const l = (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return l.length ? l : undefined;
};

/**
 * Site chrome (header, menu, footer) for a locale: the built-in dictionary with whatever the CMS provides laid over it,
 * field by field. Anything empty, untranslated, invalid or unreachable keeps the built-in value, so the chrome can never
 * come out blank. Menu entries are all-or-nothing: entries not translated into this language are left out, and if no
 * usable entry remains the built-in menu is used.
 */
export function mergeChrome(locale: Locale, dict: Dictionary, nav: Navigation | null, foot: Footer | null): { dict: Dictionary; social: SocialLink[] } {
  if (!nav && !foot) return { dict, social: staticSocial };

  const items = (nav?.items ?? [])
    .filter((r) => r.visible !== false && text(r.label) && text(r.path) && validateLink("internal", r.path) === true)
    .map((r) => ({ href: r.path!.trim(), label: r.label.trim() }));

  const merged: Dictionary = {
    ...dict,
    nav: {
      ...dict.nav,
      menu: text(nav?.menuLabel) ?? dict.nav.menu,
      close: text(nav?.closeLabel) ?? dict.nav.close,
      rooms: text(nav?.roomsLabel) ?? dict.nav.rooms,
      book: text(nav?.bookLabel) ?? dict.nav.book,
      skip: text(nav?.skipLabel) ?? dict.nav.skip,
      language: text(nav?.languageLabel) ?? dict.nav.language,
      items: items.length ? items : dict.nav.items,
    },
    footer: {
      ...dict.footer,
      statement: lines(foot?.statement) ?? dict.footer.statement,
      address: text(foot?.addressLabel) ?? dict.footer.address,
      contact: text(foot?.contactLabel) ?? dict.footer.contact,
      explore: text(foot?.exploreLabel) ?? dict.footer.explore,
      follow: text(foot?.followLabel) ?? dict.footer.follow,
      reservations: text(foot?.reservations) ?? dict.footer.reservations,
      reservationsBody: text(foot?.reservationsBody) ?? dict.footer.reservationsBody,
      rights: text(foot?.rights) ?? dict.footer.rights,
      credits: text(foot?.credits) ?? dict.footer.credits,
    },
  };

  const social = (foot?.social ?? [])
    .map((s) => ({ label: text(s.label), link: resolveLink(s.link, locale) }))
    .filter((s): s is { label: string; link: NonNullable<typeof s.link> } => Boolean(s.label && s.link && s.link.kind === "external"))
    .map((s) => ({ label: s.label, href: s.link.href }));

  return { dict: merged, social: social.length ? social : staticSocial };
}
