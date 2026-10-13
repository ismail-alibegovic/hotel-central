import type { MetadataRoute } from "next";
import { hotel } from "@/content/hotel";
import { rooms } from "@/content/rooms";
import { locales } from "@/lib/i18n";

const paths = ["", "/about", "/rooms", "/spa", "/restaurant", "/meetings-events", "/location", "/contact", ...rooms.map((r) => `/rooms/${r.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${hotel.siteUrl}/${l}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${hotel.siteUrl}/${x}${p}`])) },
    })),
  );
}
