import type { HotelContact, Hours, Phone } from "@/cms/hotelInfoMerge";
import type { Locale } from "@/lib/i18n";

/**
 * Contact details for Central Day Spa and Central Fitness Club, taken from Hotel Information so staff keep one list:
 * a phone number or e-mail address labelled with the brand (e.g. "Spa", "Club", "Fitness") wins, otherwise the hotel's
 * main one is used. Opening hours are the Hotel Information rows for the matching places.
 */
export type BrandContact = { phone: Phone; email: string; hours: Hours[] };

export function brandContact(contact: HotelContact, labels: RegExp, facilities: string[], fallback?: { phone?: Phone; hours?: Hours[] }): BrandContact {
  const phone = contact.phones.find((p) => p.label && labels.test(p.label)) ?? fallback?.phone ?? contact.phone;
  const email = contact.emails.find((e) => e.label && labels.test(e.label))?.address ?? contact.email;
  const own = contact.hours.filter((h) => facilities.includes(h.facility));
  return { phone, email, hours: own.length ? own : (fallback?.hours ?? []) };
}

/** Central Day Spa's own number and hours, as published in the hotel's FAQ (used until Hotel Information has spa rows). */
export const spaDefaults = (locale: Locale): { phone: Phone; hours: Hours[] } => ({
  phone: { display: "+387 33 561 830", href: "tel:+38733561830" },
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
