import type { Metadata, Viewport } from "next";
import { Gilda_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionRoot } from "@/components/MotionRoot";
import { MobileBookBar } from "@/components/MobileBookBar";
import { getChrome } from "@/cms/chrome";
import { getHotelContact } from "@/cms/hotelInfo";
import { contactLinks } from "@/cms/hotelInfoMerge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import { isLocale, locales } from "@/lib/i18n";
import { hotelJsonLd } from "@/lib/seo";
import { indexable } from "@/lib/site";
import "../../globals.css";

const gilda = Gilda_Display({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-gilda", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#363a2a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(hotel.siteUrl),
    ...(indexable ? {} : { robots: { index: false, follow: false } }),
    title: { default: dict.meta.title, template: `%s — ${hotel.name}` },
    description: dict.meta.description,
    applicationName: hotel.name,
    openGraph: {
      type: "website",
      siteName: hotel.name,
      locale: locale === "bs" ? "bs_BA" : "en_GB",
      images: [{ url: "/images/3075.jpg", width: 1920, height: 1276, alt: hotel.name }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [{ dict, social }, contact] = await Promise.all([getChrome(locale, getDictionary(locale)), getHotelContact(locale)]);
  const links = contactLinks(contact);

  return (
    <html lang={locale} className={`${gilda.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd(locale, contact)) }}
        />
        <MotionRoot>
          <Header locale={locale} dict={dict} contact={links} />
          <main id="content">{children}</main>
          <Footer locale={locale} dict={dict} social={social} contact={contact} />
          <MobileBookBar dict={dict} contact={links} />
        </MotionRoot>
      </body>
    </html>
  );
}
