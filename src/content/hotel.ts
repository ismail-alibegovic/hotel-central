/**
 * Verified Hotel Central Sarajevo facts.
 * Source: https://www.hotelcentral.ba/ (EN + /bs/), retrieved 2026-10-14.
 * Do not add facts here that are not published by the hotel.
 */
export const hotel = {
  name: "Hotel Central Sarajevo",
  shortName: "Hotel Central",
  stars: 4,
  rooms: 32,
  street: "Ćumurija 8",
  postalCode: "71000",
  city: "Sarajevo",
  country: "Bosnia and Herzegovina",
  countryBs: "Bosna i Hercegovina",
  phoneDisplay: "+387 33 561 800",
  phoneHref: "tel:+38733561800",
  email: "info@hotelcentral.ba",
  website: "https://www.hotelcentral.ba/",
  facebook: "https://www.facebook.com/hotel.central.568",
  /** Owner-supplied canonical site URL for metadata. Override with NEXT_PUBLIC_SITE_URL. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hotelcentral.ba",
} as const;

/**
 * Booking engine: eZee / ipms247, hotel id "hotelcentralsarajevo".
 * - bookingUrl: the official "Book now" target linked from the hotel's own menu.
 * - The parameterised search is a form POST with the exact field names used by the
 *   hotel's own booking widget (resui_resbookingbox.js on /book-now/):
 *   eZ_chkin, eZ_chkout, eZ_Nights, eZ_adult, eZ_child, eZ_room, calformat, hidBodyLanguage.
 * - Room-specific links are copied from each room page on hotelcentral.ba.
 */
export const booking = {
  hotelId: "hotelcentralsarajevo",
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo",
  formAction: "https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo",
  /** jQuery-UI format used by the hotel's widget config ("dd-mm-yy" = 31-12-2026). */
  calFormat: "dd-mm-yy",
  maxAdults: 10,
  maxChildren: 10,
  maxRooms: 16,
  roomUrl: (roomTypeId: string) =>
    `https://live.ipms247.com/booking/roomwisedata.php?hid=hotelcentralsarajevo&roomtypeunkid=${roomTypeId}`,
} as const;

export const maps = {
  query: "Hotel Central, Ćumurija 8, 71000 Sarajevo",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Hotel Central, Ćumurija 8, 71000 Sarajevo, Bosnia and Herzegovina"),
  /** Google's keyless place embed (the target that maps.google.com/maps?output=embed redirects to). */
  embed:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s" +
    encodeURIComponent("Hotel Central, Ćumurija 8, Sarajevo").replace(/%20/g, "+") +
    "!6i16",
} as const;
