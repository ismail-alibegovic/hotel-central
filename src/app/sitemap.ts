import type { MetadataRoute } from "next";
import { getSitemapCustomPages } from "@/cms/customPages";
import { getNoindexPaths, getPublishedRoomSlugs } from "@/cms/data";
import { hotel } from "@/content/hotel";
import { rooms } from "@/content/rooms";
import { locales } from "@/lib/i18n";

const base = ["", "/about", "/rooms", "/spa", "/restaurant", "/meetings-events", "/location", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rooms the CMS has hidden are left out; if the CMS is off or unreachable every static room is listed.
  const visible = await getPublishedRoomSlugs();
  const slugs = rooms.map((r) => r.slug).filter((s) => !visible || visible.includes(s));
  // Pages and rooms editors have hidden from search engines are left out as well (published settings only).
  const hidden = (await getNoindexPaths()) ?? new Set<string>();
  const paths = [...base, ...slugs.map((s) => `/rooms/${s}`)].filter((p) => !hidden.has(p));
  const builtIn = paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${hotel.siteUrl}/${l}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${hotel.siteUrl}/${x}${p}`])) },
    })),
  );
  // Pages created in the CMS: published, not hidden from search engines, and only in the languages that really have them.
  const created = ((await getSitemapCustomPages()) ?? []).flatMap((page) =>
    locales.flatMap((l) => {
      const path = page.paths[l];
      if (!path) return [];
      return [{ url: `${hotel.siteUrl}/${l}${path}`, alternates: { languages: Object.fromEntries(locales.flatMap((x) => (page.paths[x] ? [[x, `${hotel.siteUrl}/${x}${page.paths[x]}`]] : []))) } }];
    }),
  );
  return [...builtIn, ...created];
}
