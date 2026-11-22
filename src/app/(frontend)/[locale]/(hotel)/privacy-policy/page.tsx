import type { Metadata } from "next";
import { PrivacyPage } from "@/components/page/ClientPages";
import { clientCopy } from "@/content/clientCopy";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const description = locale === "en" ? "How Hotel Central Sarajevo handles personal data." : "Kako Hotel Central Sarajevo postupa s ličnim podacima.";
  return pageMetadata(locale, "/privacy-policy", clientCopy.privacy[locale].title, description);
}

export default async function Privacy({ params }: P) {
  const { locale } = await params;
  return <PrivacyPage locale={locale} />;
}
