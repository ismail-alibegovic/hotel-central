import type { Metadata } from "next";
import { booking, hotel } from "@/content/hotel";
import { builtInContact, type HotelContact } from "@/cms/hotelInfoMerge";
import { locales, type Locale } from "./i18n";

/** Canonical + hreflang alternates for a locale-agnostic path such as "/rooms". */
export function alternates(locale: Locale, path = "") {
  const languages = Object.fromEntries(locales.map((l) => [l === "bs" ? "bs-BA" : "en", `/${l}${path}`]));
  return { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/en${path}` } };
}

/**
 * Canonical + hreflang for a page whose address differs per language (pages created in the CMS). Only languages that
 * really have the page are listed, so no alternate ever points at a 404.
 */
export function customAlternates(locale: Locale, paths: Partial<Record<Locale, string>>) {
  const languages = Object.fromEntries(locales.filter((l) => paths[l]).map((l) => [l === "bs" ? "bs-BA" : "en", `/${l}${paths[l]}`]));
  const fallback = paths.en ? `/en${paths.en}` : `/${locale}${paths[locale]}`;
  return { canonical: `/${locale}${paths[locale]}`, languages: { ...languages, "x-default": fallback } };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = "/images/3075.jpg",
  noindex = false,
  alternatesOverride?: ReturnType<typeof alternates>,
): Metadata {
  return {
    title,
    description,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: alternatesOverride ?? alternates(locale, path),
    openGraph: { title, description, url: `/${locale}${path}`, images: [{ url: image }] },
  };
}

/** Structured data for search engines; contact details come from Hotel Information (built-in values by default). */
export function hotelJsonLd(locale: Locale, contact: HotelContact = builtInContact(locale)) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    url: `${hotel.siteUrl}/${locale}`,
    telephone: contact.phone.display,
    email: contact.email,
    starRating: { "@type": "Rating", ratingValue: hotel.stars },
    numberOfRooms: hotel.rooms,
    image: `${hotel.siteUrl}/images/3075.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "BA",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Indoor heated pool (25 m)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: "Steam room", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fitness centre", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    ],
    sameAs: [hotel.facebook],
    potentialAction: { "@type": "ReserveAction", target: booking.bookingUrl },
  };
}
