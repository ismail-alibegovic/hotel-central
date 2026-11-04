import { Marcellus } from "next/font/google";
import { SpaNav } from "@/components/spa/SpaNav";
import { getDaySpa, spaContact } from "@/content/dayspa";
import { isLocale } from "@/lib/i18n";

// The spa's typeface (OFL), loaded only on the spa page: a flared, calm serif close to the lettering of the Day Spa logo.
const marcellus = Marcellus({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-marcellus", display: "swap" });

export default async function SpaLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  return (
    <div className={`${marcellus.variable} bg-spa-paper pt-[var(--sub-bar-h)] text-spa-wine`}>
      <SpaNav locale={l} nav={getDaySpa(l).nav} bookingUrl={spaContact.booking[l]} />
      {children}
    </div>
  );
}
