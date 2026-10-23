import type { Block } from "./blocks/types";
import type { Locale } from "@/lib/i18n";
import { booking } from "@/content/hotel";

/**
 * Example content for the offers / FAQ / CTA sections, for layout review and tests.
 * Everything here is DEMO / SAMPLE: no real offer, date, price or policy, and every section is flagged `sample`
 * (which shows a visible label and blocks publishing). Do not copy any of this wording into live pages.
 */
const t = {
  en: {
    badge: "Sample",
    offersLabel: "(01) Offers — SAMPLE",
    offersTitle: ["Sample offers", "for layout review"],
    offersIntro: "DEMO / SAMPLE text. These cards show how offers will look. They are not real offers, dates or prices.",
    offers: [
      { title: "Sample offer one", description: "Placeholder description that shows how a short offer text wraps inside a card. Replace with real wording approved by the hotel." },
      { title: "Sample offer two", description: "Another placeholder description. No real benefits, dates or prices are promised by this text." },
      { title: "Sample offer three", description: "A third placeholder card to show the three-column layout on large screens." },
    ],
    validity: "Sample wording, not real dates",
    price: "Sample wording, not a real price",
    button: "Sample button",
    faqLabel: "(02) Questions — SAMPLE",
    faqTitle: ["Sample questions", "and answers"],
    faq: [
      { q: "Sample question one?", a: ["DEMO / SAMPLE answer. Replace with the hotel's real answer.", "A second paragraph shows how longer answers wrap."] },
      { q: "Sample question two?", a: ["DEMO / SAMPLE answer. Not a real policy."] },
      { q: "Sample question three?", a: ["DEMO / SAMPLE answer. Not real information."] },
    ],
    ctaLabel: "SAMPLE",
    ctaTitle: ["Sample call", "to action"],
    ctaBody: "DEMO / SAMPLE text that shows a call-to-action band with a booking button.",
    ctaPrimary: "Sample booking button",
    ctaSecondary: "Sample text link",
  },
  bs: {
    badge: "Uzorak",
    offersLabel: "(01) Ponude — UZORAK",
    offersTitle: ["Uzorak ponuda", "za pregled izgleda"],
    offersIntro: "DEMO / SAMPLE tekst. Ove kartice pokazuju kako će ponude izgledati. To nisu stvarne ponude, datumi ni cijene.",
    offers: [
      { title: "Uzorak ponude jedan", description: "Tekst za pregled koji pokazuje kako se kratak opis ponude lomi unutar kartice. Zamijenite tekstom koji je odobrio hotel." },
      { title: "Uzorak ponude dva", description: "Još jedan tekst za pregled. Ovaj tekst ne obećava stvarne pogodnosti, datume ni cijene." },
      { title: "Uzorak ponude tri", description: "Treća kartica koja pokazuje raspored u tri kolone na velikim ekranima." },
    ],
    validity: "Uzorak teksta, ne stvarni datumi",
    price: "Uzorak teksta, ne stvarna cijena",
    button: "Uzorak dugmeta",
    faqLabel: "(02) Pitanja — UZORAK",
    faqTitle: ["Uzorak pitanja", "i odgovora"],
    faq: [
      { q: "Uzorak pitanja jedan?", a: ["DEMO / SAMPLE odgovor. Zamijenite stvarnim odgovorom hotela.", "Drugi pasus pokazuje kako se lome duži odgovori."] },
      { q: "Uzorak pitanja dva?", a: ["DEMO / SAMPLE odgovor. Nije stvarna politika."] },
      { q: "Uzorak pitanja tri?", a: ["DEMO / SAMPLE odgovor. Nisu stvarne informacije."] },
    ],
    ctaLabel: "UZORAK",
    ctaTitle: ["Uzorak poziva", "na akciju"],
    ctaBody: "DEMO / SAMPLE tekst koji pokazuje traku s pozivom na akciju i dugmetom za rezervaciju.",
    ctaPrimary: "Uzorak dugmeta za rezervaciju",
    ctaSecondary: "Uzorak tekstualne veze",
  },
} as const;

export function sampleBlocks(locale: Locale): Block[] {
  const x = t[locale];
  const book = { kind: "external" as const, href: booking.bookingUrl, external: true };
  return [
    {
      type: "offers",
      sample: true,
      label: x.offersLabel,
      title: [...x.offersTitle],
      intro: x.offersIntro,
      tone: "ivory",
      validityLabel: locale === "bs" ? "Važi" : "Valid",
      priceLabel: locale === "bs" ? "Cijena" : "Price",
      items: x.offers.map((o, n) => ({
        title: o.title,
        description: o.description,
        tag: x.badge,
        validity: x.validity,
        ...(n === 0 ? { priceNote: x.price } : {}),
        image: { src: ["/images/3075.jpg", "/images/3069.jpg", "/images/dorucak5.jpg"][n], alt: "" },
        cta: { label: x.button, link: n === 0 ? book : { kind: "internal" as const, href: `/${locale}/rooms`, external: false } },
      })),
    },
    { type: "faq", sample: true, label: x.faqLabel, title: [...x.faqTitle], tone: "deep", items: x.faq.map((q) => ({ q: q.q, a: [...q.a] })) },
    {
      type: "cta",
      sample: true,
      label: x.ctaLabel,
      title: [...x.ctaTitle],
      body: x.ctaBody,
      tone: "olive",
      primary: { label: x.ctaPrimary, link: book },
      secondary: { label: x.ctaSecondary, link: { kind: "internal", href: `/${locale}/contact`, external: false } },
    },
  ];
}
