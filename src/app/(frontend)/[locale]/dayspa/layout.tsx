import { Cormorant_Garamond } from "next/font/google";
import { MicroFooter } from "@/components/microsite/MicroFooter";
import { MicroHeader } from "@/components/microsite/MicroHeader";
import { spaBrand } from "@/components/microsite/brands";
import { getHotelContact } from "@/cms/hotelInfo";
import { getDaySpaCopy, spaBookingUrl } from "@/content/dayspa";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-spa", display: "swap" });

/** Central Day Spa: its own header, footer and typeface, so the section reads as the spa's own, calm website (CH-013). */
export default async function SpaLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = getDaySpaCopy(locale);
  const dict = getDictionary(locale);
  const contact = await getHotelContact(locale);
  const items = [
    { href: "/dayspa", label: c.nav.spa },
    { href: "/dayspa#treatments", label: c.nav.treatments },
    { href: "/dayspa#hours-title", label: c.nav.hours },
    { href: "/dayspa#book", label: c.nav.contact },
  ];
  return (
    <div className={`${cormorant.variable} bg-blush text-[#2b1a1c]`}>
      <MicroHeader
        locale={locale}
        brand={spaBrand}
        items={items}
        action={{ label: c.nav.book, href: spaBookingUrl(locale), external: true }}
        hotelLabel={c.nav.hotel}
        languageLabel={dict.nav.language}
        menuLabel={dict.nav.menu}
        skipLabel={dict.nav.skip}
      />
      {children}
      <MicroFooter
        locale={locale}
        brand={spaBrand}
        items={items}
        contact={contact}
        part={c.footer.part}
        back={c.footer.back}
        labels={{ address: dict.footer.address, contact: dict.footer.contact, explore: dict.footer.explore, language: dict.nav.language, rights: dict.footer.rights }}
      />
    </div>
  );
}
