import { Jost } from "next/font/google";
import { ClubHeader } from "@/components/club/ClubHeader";
import { ClubFooter } from "@/components/club/ClubPages";
import { getClub } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import "../../../../brands.css";

const jost = Jost({ subsets: ["latin", "latin-ext"], variable: "--cfc-display", display: "swap" });

/** Central Fitness Club: its own header, footer, palette and type, inside the hotel's site. */
export default async function ClubLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const club = await getClub(locale);
  return (
    <div className={`cfc ${jost.variable} [--cfc-body:var(--cfc-display)]`}>
      <ClubHeader locale={locale} c={club.c.nav} />
      <main id="content">{children}</main>
      <ClubFooter locale={locale} c={club.c} contact={club.contact} address={club.address} />
    </div>
  );
}
