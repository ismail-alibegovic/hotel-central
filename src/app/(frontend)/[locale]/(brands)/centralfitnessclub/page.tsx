import type { Metadata } from "next";
import { ClubHome } from "@/components/club/ClubHome";
import { getClub } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { c, images } = await getClub(locale);
  return pageMetadata(locale, "/centralfitnessclub", c.meta.title, c.meta.description, images.hero.src);
}

export default async function Club({ params }: P) {
  const { locale } = await params;
  const { c, images, contact } = await getClub(locale);
  return <ClubHome locale={locale} c={c} images={images} contact={contact} />;
}
