import type { Block } from "@/cms/blocks/types";
import { hotel } from "@/content/hotel";
import type { Locale } from "@/lib/i18n";

/**
 * DRAFT — Central Café (CH-007). The proposed sitemap marks /about/cafe as "Discuss", not approved, so this page is
 * prepared but not published: it is noindex, left out of the sitemap and of every menu, and Restaurant Central is
 * unchanged. Content: the hotel's FAQ (2026-10-14) only. Opening hours and a menu are not published by the hotel, so
 * none are shown. Photographs: no photos of the café itself exist yet; two existing breakfast/coffee photos are used.
 */
const copy = {
  en: {
    meta: { title: "Central Café", description: "Central Café at Hotel Central Sarajevo: quality coffee, tea, cold drinks and a selection of cakes and sweet treats in the centre of Sarajevo." },
    hero: { eyebrow: "About · Central Café", title: ["Central", "Café"], intro: "Coffee, tea and something sweet, in the heart of Sarajevo." },
    label: "(01) The café",
    title: ["Coffee", "& sweet things"],
    body: ["Central Café offers quality coffee, tea and cold drinks, with a selection of cakes and sweet treats, in a welcoming setting in the centre of Sarajevo.", "Everyone is welcome — hotel guests and visitors alike."],
    facts: [
      { k: "Drinks", v: "Coffee · tea · cold drinks" },
      { k: "Sweet", v: "Cakes and sweet treats" },
      { k: "Where", v: `${hotel.name}, ${hotel.street}` },
    ],
    alts: ["Bosnian coffee served in a copper džezva", "A tray with tea and croissants"],
    hoursLabel: "Opening hours",
    hoursTitle: ["Visit", "Central Café"],
    hoursBody: "Our reception will gladly tell you today's opening hours.",
    call: "Call reception",
  },
  bs: {
    meta: { title: "Central Café", description: "Central Café u Hotelu Central Sarajevo: kvalitetna kafa, čajevi, hladni napici te izbor kolača i slatkih poslastica u centru Sarajeva." },
    hero: { eyebrow: "O nama · Central Café", title: ["Central", "Café"], intro: "Kafa, čaj i nešto slatko, u srcu Sarajeva." },
    label: "(01) Kafić",
    title: ["Kafa", "i slatko"],
    body: ["Central Café nudi kvalitetnu kafu, čajeve i hladne napitke, uz izbor kolača i slatkih poslastica, u ugodnom ambijentu u samom centru Sarajeva.", "Dobrodošli su svi — gosti hotela i posjetioci."],
    facts: [
      { k: "Pića", v: "Kafa · čaj · hladni napici" },
      { k: "Slatko", v: "Kolači i slatke poslastice" },
      { k: "Gdje", v: `${hotel.name}, ${hotel.street}` },
    ],
    alts: ["Bosanska kafa u bakrenoj džezvi", "Poslužavnik sa čajem i kroasanima"],
    hoursLabel: "Radno vrijeme",
    hoursTitle: ["Posjetite", "Central Café"],
    hoursBody: "Recepcija će Vam rado reći današnje radno vrijeme.",
    call: "Nazovite recepciju",
  },
};

export function cafeDraft(locale: Locale): { meta: { title: string; description: string }; blocks: Block[] } {
  const c = copy[locale];
  return {
    meta: c.meta,
    blocks: [
      { type: "hero", image: { src: "/images/dorucak6.jpg", alt: c.alts[0] }, eyebrow: c.hero.eyebrow, title: c.hero.title, intro: c.hero.intro, meta: ["Hotel Central", "(Café)", hotel.street] },
      { type: "split", tone: "ivory", reverse: false, label: c.label, title: c.title, body: c.body, line: "restaurant", images: [{ src: "/images/hc-comfort-2.jpg", alt: c.alts[1] }, { src: "/images/dorucak6.jpg", alt: c.alts[0] }], facts: c.facts },
      { type: "cta", tone: "olive", sample: false, label: c.hoursLabel, title: c.hoursTitle, body: c.hoursBody, primary: { label: c.call, link: { kind: "phone", href: hotel.phoneHref, external: false } } },
    ],
  };
}
