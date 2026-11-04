import { Barlow_Condensed, Marcellus, Montserrat } from "next/font/google";

/**
 * The two sub-brands' typefaces for the homepage's Fitness & Spa section (their own pages load them in their layouts).
 * Not preloaded: the section sits well below the fold, so the faces must never compete with the hero.
 */
const barlow = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["700"], variable: "--font-barlow", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-montserrat", display: "swap", preload: false });
const marcellus = Marcellus({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-marcellus", display: "swap", preload: false });

export const brandFontVars = `${barlow.variable} ${montserrat.variable} ${marcellus.variable}`;
