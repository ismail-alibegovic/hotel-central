import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getPageLayout, getPageView } from "@/cms/pages";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { meta, ogImage, noindex } = await getPageLayout("about", locale);
  return pageMetadata(locale, "/about", meta.title, meta.description, ogImage, noindex);
}

export default async function About({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { blocks, draft, rooms, offers } = await getPageView("about", locale);
  return (
    <>
      {draft && <LivePreviewListener />}
      <BlockRenderer blocks={blocks} locale={locale} dict={dict} rooms={rooms} offers={offers} />
    </>
  );
}
