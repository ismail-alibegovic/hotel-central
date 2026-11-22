import type { Metadata } from "next";
import { DaySpaPage } from "@/components/dayspa/DaySpaPage";
import { getDaySpa } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { c, images } = await getDaySpa(locale);
  return pageMetadata(locale, "/dayspa", c.meta.title, c.meta.description, images.hero.src);
}

export default async function DaySpa({ params }: P) {
  const { locale } = await params;
  return <DaySpaPage locale={locale} data={await getDaySpa(locale)} />;
}
