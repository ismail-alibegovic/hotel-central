import type { MetadataRoute } from "next";
import { hotel } from "@/content/hotel";
import { indexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${hotel.siteUrl}/sitemap.xml` };
}
