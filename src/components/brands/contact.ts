import type { HotelContact, Hours, Phone } from "@/cms/hotelInfoMerge";

/**
 * Contact details for Central Day Spa and Central Fitness Club, taken from Hotel Information so staff keep one list:
 * a phone number or e-mail address labelled with the brand (e.g. "Spa", "Club", "Fitness") wins, otherwise the hotel's
 * main one is used. Opening hours are the Hotel Information rows for the matching places.
 */
export type BrandContact = { phone: Phone; email: string; hours: Hours[] };

export function brandContact(contact: HotelContact, labels: RegExp, facilities: string[]): BrandContact {
  const phone = contact.phones.find((p) => p.label && labels.test(p.label)) ?? contact.phone;
  const email = contact.emails.find((e) => e.label && labels.test(e.label))?.address ?? contact.email;
  const hours = contact.hours.filter((h) => facilities.includes(h.facility));
  return { phone, email, hours };
}

export const spaLabels = /\b(spa|wellness)\b/i;
export const clubLabels = /\b(club|klub|fitness|gym|teretana)\b/i;
