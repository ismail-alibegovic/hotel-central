import { DM_Sans, Familjen_Grotesk } from "next/font/google";
import { DaySpaHeader } from "@/components/dayspa/DaySpaHeader";
import { DaySpaFooter } from "@/components/dayspa/DaySpaPage";
import { getDaySpa } from "@/cms/brands";
import type { Locale } from "@/lib/i18n";
import "../../../../brands.css";

const display = Familjen_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--ds-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--ds-body", display: "swap" });

/** Central Day Spa: its own header, footer, palette and type, inside the hotel's site. */
export default async function DaySpaLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const spa = await getDaySpa(locale);
  return (
    <div className={`ds ${display.variable} ${body.variable}`}>
      <DaySpaHeader locale={locale} c={spa.c.nav} bookingUrl={spa.bookingUrl} phone={spa.contact.phone} />
      <main id="content">{children}</main>
      <DaySpaFooter locale={locale} c={spa.c} contact={spa.contact} address={spa.address} />
    </div>
  );
}
