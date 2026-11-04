import { Barlow_Condensed, Montserrat } from "next/font/google";
import { FitnessNav } from "@/components/fitness/FitnessNav";
import { getFitness } from "@/content/fitness";
import { isLocale } from "@/lib/i18n";

// The club's typefaces (OFL), loaded only on the club's pages: a condensed bold grotesk and a geometric sans, the closest
// free matches to the lettering of the Central Fitness Club logo.
const barlow = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-montserrat", display: "swap" });

export default async function FitnessLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  return (
    <div className={`${barlow.variable} ${montserrat.variable} bg-fit-mist pt-[var(--sub-bar-h)] text-fit-green`}>
      <FitnessNav locale={l} nav={getFitness(l).nav} />
      {children}
    </div>
  );
}
