import type { Metadata } from "next";
import { FaqPage } from "@/components/page/ClientPages";
import { clientCopy } from "@/content/clientCopy";
import { faqSections } from "@/content/faq";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === "en"
      ? "Answers about Hotel Central Sarajevo: check-in, breakfast, parking, Central Fitness Club, Central Day Spa and the café."
      : "Odgovori o Hotelu Central Sarajevo: prijava, doručak, parking, Central Fitness Club, Central Day Spa i kafić.";
  return pageMetadata(locale, "/faq", clientCopy.faq[locale].title, description);
}

export default async function Faq({ params }: P) {
  const { locale } = await params;
  return <FaqPage locale={locale} sections={faqSections[locale]} />;
}
