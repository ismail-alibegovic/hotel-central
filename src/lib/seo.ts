import type { Metadata } from "next";
import { booking, hotel } from "@/content/hotel";
import { locales, type Locale } from "./i18n";

/** Canonical + hreflang alternates for a locale-agnostic path such as "/rooms". */
export function alternates(locale: Locale, path = "") {
  const languages = Object.fromEntries(locales.map((l) => [l === "bs" ? "bs-BA" : "en", `/${l}${path}`]));
  return { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/en${path}` } };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = "/images/3075.jpg",
): Metadata {
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: { title, description, url: `/${locale}${path}`, images: [{ url: image }] },
  };
}

export function hotelJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    url: `${hotel.siteUrl}/${locale}`,
    telephone: hotel.phoneDisplay,
    email: hotel.email,
    starRating: { "@type": "Rating", ratingValue: hotel.stars },
    numberOfRooms: hotel.rooms,
    image: `${hotel.siteUrl}/images/3075.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.street,
      postalCode: hotel.postalCode,
      addressLocality: hotel.city,
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
