import { Archivo } from "next/font/google";
import { ClubHeader } from "@/components/club/ClubHeader";
import { ClubFooter } from "@/components/club/ClubPages";
import { getClub } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import "../../../../brands.css";

/* One family in two widths: condensed heavy capitals for display, normal width for reading. */
const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--cfc-display", display: "swap" });

/** Central Fitness Club: its own header, footer, palette and type, inside the hotel's site. */
export default async function ClubLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const club = await getClub(locale);
  return (
    <div className={`cfc ${archivo.variable} [--cfc-body:var(--cfc-display)]`}>
      <ClubHeader locale={locale} c={club.c.nav} />
      <main id="content">{children}</main>
      <ClubFooter locale={locale} c={club.c} contact={club.contact} address={club.address} />
    </div>
  );
}
