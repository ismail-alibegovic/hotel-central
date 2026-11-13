import { Oswald } from "next/font/google";
import { MicroFooter } from "@/components/microsite/MicroFooter";
import { MicroHeader } from "@/components/microsite/MicroHeader";
import { clubBrand } from "@/components/microsite/brands";
import { getHotelContact } from "@/cms/hotelInfo";
import { getClubCopy } from "@/content/club";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

const oswald = Oswald({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-club", display: "swap" });

/** Central Fitness Club: its own header and footer, so the section reads as the club's own website (CH-010). */
export default async function ClubLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = getClubCopy(locale);
  const dict = getDictionary(locale);
  const contact = await getHotelContact(locale);
  const items = [
    { href: "/centralfitnessclub", label: c.nav.club },
    { href: "/centralfitnessclub/membership", label: c.nav.membership },
    { href: "/centralfitnessclub/timetable", label: c.nav.timetable },
  ];
  return (
    <div className={`${oswald.variable} bg-[#f5f6f3] text-ink`}>
      <MicroHeader
        locale={locale}
        brand={clubBrand}
        items={items}
        action={{ label: c.nav.join, href: "/centralfitnessclub/membership" }}
        hotelLabel={c.nav.hotel}
        languageLabel={dict.nav.language}
        menuLabel={dict.nav.menu}
        skipLabel={dict.nav.skip}
      />
      {children}
      <MicroFooter
        locale={locale}
        brand={clubBrand}
        items={items}
        contact={contact}
        part={c.footer.part}
        back={c.footer.back}
        labels={{ address: dict.footer.address, contact: dict.footer.contact, explore: dict.footer.explore, language: dict.nav.language, rights: dict.footer.rights }}
      />
    </div>
  );
}
