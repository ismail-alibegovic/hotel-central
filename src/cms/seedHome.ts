import type { Payload } from "payload";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

/**
 * Built-in home-page text in the shape of the Homepage global. Photographs and the search-engine title/description are left
 * empty on purpose: empty = the current photograph / the built-in title (which is longer than the editor limit).
 */
export function homeToCms(d: Dictionary) {
  const h = d.home;
  const rows = (xs: string[]) => xs.map((text) => ({ text }));
  return {
    hero: { label: h.heroLabel, title: h.heroTitle.join("\n"), tagline: h.heroTagline, note: h.heroNote },
    hotel: { ...h.hotel, title: h.hotel.title.join("\n") },
    rooms: { ...h.rooms },
    spa: { ...h.spa, title: h.spa.title.join("\n"), facts: rows(h.spa.facts) },
    restaurant: { ...h.restaurant, title: h.restaurant.title.join("\n") },
    location: { ...h.location, title: h.location.title.join("\n"), facts: h.location.facts.map((f) => ({ k: f.k, v: f.v })) },
    events: { ...h.events, title: h.events.title.join("\n") },
    final: { ...h.final, title: h.final.title.join("\n") },
  };
}

/**
 * Create the Home page global from the built-in text (both languages, published). A global that already has content is
 * left alone, so repeated runs cannot overwrite editor changes.
 */
export async function seedHome(payload: Payload): Promise<"created" | "exists"> {
  const existing = await payload.findGlobal({ slug: "homepage", draft: true, depth: 0, overrideAccess: true });
  if (existing.hero?.label) return "exists";
  for (const locale of ["en", "bs"] as Locale[]) {
    await payload.updateGlobal({ slug: "homepage", locale, overrideAccess: true, data: { ...homeToCms(getDictionary(locale)), _status: "published" } as never });
  }
  return "created";
}
