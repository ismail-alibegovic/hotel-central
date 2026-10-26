import type { Payload } from "payload";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import type { Locale } from "@/lib/i18n";

const navData = (l: Locale) => {
  const d = getDictionary(l);
  return {
    menuLabel: d.nav.menu,
    closeLabel: d.nav.close,
    roomsLabel: d.nav.rooms,
    bookLabel: d.nav.book,
    skipLabel: d.nav.skip,
    languageLabel: d.nav.language,
  };
};

const footData = (l: Locale) => {
  const f = getDictionary(l).footer;
  return {
    reservations: f.reservations,
    reservationsBody: f.reservationsBody,
    statement: f.statement.join("\n"),
    addressLabel: f.address,
    contactLabel: f.contact,
    exploreLabel: f.explore,
    followLabel: f.follow,
    rights: f.rights,
    credits: f.credits,
  };
};

type Seeded = "created" | "exists";

/**
 * Create the Navigation, Footer and Hotel Information globals from the built-in values (English, then Bosnian onto the
 * same rows). A global that already has content is left alone, so repeated runs cannot overwrite editor changes.
 */
export async function seedGlobals(payload: Payload): Promise<{ navigation: Seeded; footer: Seeded; hotelInfo: Seeded }> {
  const result: { navigation: Seeded; footer: Seeded; hotelInfo: Seeded } = { navigation: "exists", footer: "exists", hotelInfo: "exists" };

  const nav = await payload.findGlobal({ slug: "navigation", draft: true, depth: 0, overrideAccess: true });
  if (!nav.items?.length) {
    const en = getDictionary("en").nav.items;
    const created = await payload.updateGlobal({
      slug: "navigation",
      locale: "en",
      overrideAccess: true,
      data: { ...navData("en"), items: en.map((i) => ({ path: i.href, label: i.label, visible: true })), _status: "published" } as never,
    });
    const rows = (created.items ?? []) as { id?: string | null }[];
    const bs = getDictionary("bs").nav.items;
    await payload.updateGlobal({
      slug: "navigation",
      locale: "bs",
      overrideAccess: true,
      data: { ...navData("bs"), items: rows.map((r, n) => ({ id: r.id, path: bs[n].href, label: bs[n].label, visible: true })), _status: "published" } as never,
    });
    result.navigation = "created";
  }

  const foot = await payload.findGlobal({ slug: "footer", draft: true, depth: 0, overrideAccess: true });
  if (!foot.reservations && !foot.social?.length) {
    const created = await payload.updateGlobal({
      slug: "footer",
      locale: "en",
      overrideAccess: true,
      data: { ...footData("en"), social: [{ label: "Facebook", link: { kind: "external", value: hotel.facebook } }], _status: "published" } as never,
    });
    void created;
    await payload.updateGlobal({ slug: "footer", locale: "bs", overrideAccess: true, data: { ...footData("bs"), _status: "published" } as never });
    result.footer = "created";
  }

  // The verified details from the code, so staff open a filled-in form. Labels and opening hours are left empty: they are not
  // published by the hotel yet and must not be invented.
  const info = await payload.findGlobal({ slug: "hotel-info", draft: true, depth: 0, overrideAccess: true });
  if (!info.phones?.length && !info.emails?.length && !info.address?.street && !info.hours?.length) {
    await payload.updateGlobal({
      slug: "hotel-info",
      locale: "en",
      overrideAccess: true,
      data: {
        phones: [{ number: hotel.phoneDisplay }],
        emails: [{ address: hotel.email }],
        address: { street: hotel.street, postalCode: hotel.postalCode, city: hotel.city, country: hotel.country },
        _status: "published",
      } as never,
    });
    await payload.updateGlobal({ slug: "hotel-info", locale: "bs", overrideAccess: true, data: { address: { country: hotel.countryBs }, _status: "published" } as never });
    result.hotelInfo = "created";
  }
  return result;
}
