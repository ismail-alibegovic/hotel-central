import type { HotelContact, Hours, Phone } from "@/cms/hotelInfoMerge";
import type { Locale } from "@/lib/i18n";

/**
 * Contact details for Central Day Spa and Central Fitness Club, taken from Hotel Information so staff keep one list:
 * a phone number or e-mail address labelled with the brand (e.g. "Spa", "Club", "Fitness") wins, otherwise the hotel's
 * main one is used. Opening hours are the Hotel Information rows for the matching places.
 */
export type BrandContact = { phone: Phone; email: string; hours: Hours[] };

export function brandContact(contact: HotelContact, labels: RegExp, facilities: string[], fallback?: { phone?: Phone; email?: string; hours?: Hours[] }): BrandContact {
  const phone = contact.phones.find((p) => p.label && labels.test(p.label)) ?? fallback?.phone ?? contact.phone;
  const email = contact.emails.find((e) => e.label && labels.test(e.label))?.address ?? fallback?.email ?? contact.email;
  const own = contact.hours.filter((h) => facilities.includes(h.facility));
  return { phone, email, hours: own.length ? own : (fallback?.hours ?? []) };
}

/** The spa's own e-mail address (CH-054, confirmed by the hotel on 26.11.2026). */
export const SPA_EMAIL = "dayspa@hotelcentral.ba";

/** Central Day Spa's own number, e-mail and hours, as published by the hotel (used until Hotel Information has spa rows). */
export const spaDefaults = (locale: Locale): { phone: Phone; email: string; hours: Hours[] } => ({
  phone: { display: "+387 33 561 830", href: "tel:+38733561830" },
  email: SPA_EMAIL,
  hours: [
    {
      facility: "spa",
      name: "Central Day Spa",
      rows:
        locale === "en"
          ? [{ days: "Tuesday – Saturday", time: "11:00 – 20:00", closed: false }, { days: "Sunday, Monday", closed: true }]
          : [{ days: "Utorak – subota", time: "11:00 – 20:00", closed: false }, { days: "Nedjelja, ponedjeljak", closed: true }],
    },
  ],
});

export const spaLabels = /\b(spa|wellness)\b/i;
export const clubLabels = /\b(club|klub|fitness|gym|teretana)\b/i;
