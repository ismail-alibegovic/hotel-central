import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cafeDraft } from "@/content/cafe";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = cafeDraft(locale);
  // DRAFT (CH-007 is "Discuss"): never indexable until the client approves the page.
  return pageMetadata(locale, "/about/cafe", meta.title, meta.description, "/images/dorucak6.jpg", true);
}

export default async function CafeDraft({ params }: P) {
  const { locale } = await params;
  return <BlockRenderer blocks={cafeDraft(locale).blocks} locale={locale} dict={getDictionary(locale)} rooms={[]} />;
}
