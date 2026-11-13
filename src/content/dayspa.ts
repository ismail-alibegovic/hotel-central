import type { Locale } from "@/lib/i18n";

/**
 * Central Day Spa — treatments and prices (CH-013).
 *
 * Source: the hotel's current published price list, hotelcentral.ba/facilities/wellness-day-spa/ (page last updated by the
 * hotel on 2026-10-13, read on 2026-11-13). English names are the hotel's own; Bosnian names are the hotel's where the price
 * list gives them (category headings, reflexology, facial massage) and otherwise DRAFT translations for the hotel to approve.
 * Prices are in convertible marks (KM). To change a price, edit the number below; durations are in minutes.
 */
export const DAY_SPA_SOURCE = { url: "https://www.hotelcentral.ba/facilities/wellness-day-spa/", updated: "2026-10-13" };

/** The hotel's online spa booking form (linked from the live price list). The Bosnian version exists at /bs/. */
export const spaBookingUrl = (locale: Locale) => `https://form.lime-booking.com/${locale === "bs" ? "bs" : "en"}/HotelCentralSarajevo/service`;

type L = { en: string; bs: string };
export type Treatment = { name: L; minutes?: string; price: string; includes?: L[] };
export type TreatmentGroup = { id: string; name: L; intro?: L; items: Treatment[] };

const t = (en: string, bs: string): L => ({ en, bs });

export const treatmentGroups: TreatmentGroup[] = [
  {
    id: "massage",
    name: t("Massage", "Masaže"),
    items: [
      { name: t("Reflexology massage", "Refleksologija"), minutes: "30", price: "40" },
      { name: t("Relax spa massage", "Relax spa masaža"), minutes: "30", price: "45" },
      { name: t("Relax spa massage", "Relax spa masaža"), minutes: "45", price: "65" },
      { name: t("Relax spa massage", "Relax spa masaža"), minutes: "60", price: "80" },
      { name: t("Sports massage", "Sportska masaža"), minutes: "30", price: "55" },
      { name: t("Sports massage", "Sportska masaža"), minutes: "45", price: "80" },
      { name: t("Sports massage", "Sportska masaža"), minutes: "60", price: "95" },
      { name: t("Hot stone massage", "Masaža vrućim kamenjem"), minutes: "30", price: "60" },
      { name: t("Hot stone massage", "Masaža vrućim kamenjem"), minutes: "45", price: "85" },
      { name: t("Hot stone massage", "Masaža vrućim kamenjem"), minutes: "60", price: "100" },
      { name: t("Aromatherapy massage", "Aromaterapijska masaža"), minutes: "30", price: "55" },
      { name: t("Aromatherapy massage", "Aromaterapijska masaža"), minutes: "45", price: "65" },
      { name: t("Therapeutic massage", "Terapeutska masaža"), minutes: "30", price: "55" },
      { name: t("Therapeutic massage", "Terapeutska masaža"), minutes: "45", price: "75" },
      { name: t("Massage for two (2 × 45 min relax, guests & members)", "Masaža za dvoje (2 × 45 min relax, gosti i članovi)"), price: "100" },
      { name: t("Dry needling + massage", "Dry needling + masaža"), price: "150" },
      { name: t("Gold massage", "Zlatna masaža"), minutes: "60", price: "100" },
      { name: t("Manual lymphatic drainage (one area)", "Manuelna limfna drenaža (jedna regija)"), minutes: "30", price: "50" },
      { name: t("Manual lymphatic drainage (whole body)", "Manuelna limfna drenaža (cijelo tijelo)"), minutes: "90", price: "110" },
    ],
  },
  {
    id: "facial",
    name: t("Facial treatments", "Tretmani lica"),
    items: [
      { name: t("Facial massage + mask", "Masaža lica + maska"), minutes: "30", price: "40" },
      { name: t("Basic facial treatment – cleansing", "Osnovni tretman lica – čišćenje"), minutes: "30", price: "50" },
      { name: t("Chemical peeling", "Hemijski piling"), minutes: "30", price: "70" },
      { name: t("Alginate masks", "Alginatne maske"), minutes: "40", price: "80" },
      { name: t("Green Sea peeling", "Green Sea piling"), minutes: "40", price: "150" },
      { name: t("Cryo mask", "Krio maska"), minutes: "40", price: "70" },
      { name: t("Collagen threads", "Kolagenske niti"), minutes: "60", price: "200" },
      { name: t("Micro/nano-needling cocktails", "Mikro/nano-needling kokteli"), minutes: "60", price: "150" },
      { name: t("Beauty filler shot", "Beauty filler shot"), minutes: "40–60", price: "100" },
    ],
  },
  {
    id: "body",
    name: t("Body treatments", "Tretmani tijela"),
    items: [
      { name: t("Body scrub", "Piling tijela"), minutes: "30", price: "45" },
      { name: t("Body scrub + massage (30/30)", "Piling tijela + masaža (30/30)"), minutes: "60", price: "85" },
      { name: t("Body scrub + massage (30/60)", "Piling tijela + masaža (30/60)"), minutes: "90", price: "110" },
      { name: t("Maderotherapy – full body, single", "Maderoterapija – cijelo tijelo, pojedinačno"), minutes: "45", price: "60" },
      { name: t("Maderotherapy – one area, single", "Maderoterapija – jedna regija, pojedinačno"), minutes: "30", price: "30" },
      { name: t("Maderotherapy – one area, 10 treatments", "Maderoterapija – jedna regija, 10 tretmana"), price: "270" },
      { name: t("Maderotherapy – full body, 10 treatments", "Maderoterapija – cijelo tijelo, 10 tretmana"), price: "450" },
      { name: t("Cupping", "Kupiranje"), minutes: "45", price: "60" },
      { name: t("Dry cupping", "Suho kupiranje"), minutes: "30", price: "40" },
    ],
  },
  {
    id: "heat",
    name: t("Iyashi Dome & Balneo bath", "Iyashi Dome i Balneo kupka"),
    intro: t("Japanese sauna (Iyashi Dome) and balneo bath, on their own or with a massage.", "Japanska sauna (Iyashi Dome) i balneo kupka, samostalno ili uz masažu."),
    items: [
      { name: t("Iyashi Dome – single", "Iyashi Dome – pojedinačno"), minutes: "30", price: "50" },
      { name: t("Iyashi Dome + massage (30/30)", "Iyashi Dome + masaža (30/30)"), minutes: "60", price: "90" },
      { name: t("Iyashi Dome + massage (30/45)", "Iyashi Dome + masaža (30/45)"), minutes: "75", price: "115" },
      { name: t("Balneo bath – single", "Balneo kupka – pojedinačno"), minutes: "30", price: "50" },
      { name: t("Balneo bath + massage (30/30)", "Balneo kupka + masaža (30/30)"), minutes: "60", price: "90" },
      { name: t("Balneo bath + massage (30/45)", "Balneo kupka + masaža (30/45)"), minutes: "75", price: "115" },
    ],
  },
  {
    id: "beauty",
    name: t("Brows, lashes, hands & feet", "Obrve, trepavice, manikir i pedikir"),
    items: [
      { name: t("Eyebrow shaping", "Oblikovanje obrva"), minutes: "15", price: "15" },
      { name: t("Eyebrow tinting", "Bojenje obrva"), minutes: "30", price: "20" },
      { name: t("Brow lift", "Brow lift"), minutes: "60", price: "40" },
      { name: t("Lash lift", "Lash lift"), minutes: "60", price: "30" },
      { name: t("Permanent polish removal", "Skidanje trajnog laka"), minutes: "30", price: "10" },
      { name: t("Permanent polish application", "Nanošenje trajnog laka"), minutes: "30", price: "10" },
      { name: t("Classic manicure (regular polish)", "Klasični manikir (obični lak)"), minutes: "45", price: "30" },
      { name: t("Classic pedicure (regular polish)", "Klasični pedikir (obični lak)"), minutes: "45", price: "40" },
      { name: t("Spa manicure", "Spa manikir"), minutes: "60", price: "40" },
      { name: t("Spa pedicure", "Spa pedikir"), minutes: "60", price: "50" },
      { name: t("Medical pedicure", "Medicinski pedikir"), minutes: "60", price: "50–80" },
    ],
  },
  {
    id: "packages",
    name: t("Packages", "Paketi"),
    items: [
      { name: t("Detox", "Detox"), minutes: "75", price: "120", includes: [t("Lymphatic drainage 45 min", "Limfna drenaža 45 min"), t("Relax massage 30 min", "Relax masaža 30 min"), t("Relax room & tea", "Relax soba i čaj")] },
      { name: t("Face and body glow", "Face and body glow"), minutes: "75", price: "110", includes: [t("Lymphatic drainage 45 min", "Limfna drenaža 45 min"), t("Mini facial 30 min", "Mini tretman lica 30 min")] },
      { name: t("Slim & shape", "Slim & shape"), minutes: "75", price: "130", includes: [t("Lymphatic drainage 45 min", "Limfna drenaža 45 min"), t("Anti-cellulite massage 30 min", "Anticelulit masaža 30 min")] },
    ],
  },
];

/** "40" → "40 KM" (bs) / "KM 40" (en); ranges keep their dash. */
export const formatKm = (price: string, locale: Locale) => (locale === "bs" ? `${price} KM` : `KM ${price}`);

const copy = {
  en: {
    meta: { title: "Central Day Spa", description: "Central Day Spa at Hotel Central Sarajevo: massages, facials, body treatments, Iyashi Dome and balneo bath, with two hours of pool-area access included with every treatment. Current prices and online booking." },
    nav: { treatments: "Treatments & prices", spa: "The spa", hours: "Opening hours", contact: "Contact", book: "Book a treatment", hotel: "Hotel Central" },
    hero: { eyebrow: "Hotel Central Sarajevo", title: ["Take a quiet", "hour for yourself"], intro: "Welcome to the Hotel Central Wellness Day Spa. Every treatment includes two hours in the pool area." },
    intro: {
      label: "(01) The spa",
      title: ["Calm, warmth", "and stillness"],
      body: [
        "Six treatment rooms, a relaxation lounge, a Japanese Iyashi Dome and a balneo bath, in the heart of Sarajevo.",
        "After your treatment, stay on: two hours in the pool area are included — the heated 25-metre pool, Finnish sauna, steam bath, caldarium, hydrotherapy pools and plunge pool.",
      ],
    },
    perk: "Two hours of pool-area access with every treatment",
    menu: { label: "(02) Treatments & prices", title: ["Treatments", "& prices"], note: "Prices in convertible marks (KM). Durations in minutes.", includes: "Includes", min: "min" },
    book: { title: ["Book your", "treatment"], body: "Choose a treatment and a time online, or call or write to us and we will arrange it for you.", online: "Book online", call: "Call", email: "E-mail" },
    hours: { label: "(03) Opening hours", title: ["Opening", "hours"], fallback: "Spa opening hours are being confirmed. To book or ask about availability, please call {phone}." },
    footer: { part: "Central Day Spa is part of Hotel Central Sarajevo.", back: "Back to Hotel Central" },
  },
  bs: {
    meta: { title: "Central Day Spa", description: "Central Day Spa u Hotelu Central Sarajevo: masaže, tretmani lica i tijela, Iyashi Dome i balneo kupka, uz dva sata korištenja bazena sa svakim tretmanom. Aktuelne cijene i online rezervacija." },
    nav: { treatments: "Tretmani i cijene", spa: "Spa", hours: "Radno vrijeme", contact: "Kontakt", book: "Rezervišite tretman", hotel: "Hotel Central" },
    hero: { eyebrow: "Hotel Central Sarajevo", title: ["Uzmite sat", "samo za sebe"], intro: "Dobrodošli u Wellness Day Spa Hotela Central. Uz svaki tretman dobijate dva sata korištenja bazena." },
    intro: {
      label: "(01) Spa",
      title: ["Mir, toplina", "i tišina"],
      body: [
        "Šest tretman soba, relaks salon, japanska sauna Iyashi Dome i balneo kupka, u samom srcu Sarajeva.",
        "Nakon tretmana ostanite duže: uključena su dva sata korištenja bazenskog dijela – grijani bazen od 25 metara, finska sauna, parna kupelj, caldarium, hidroterapijski bazeni i bazen za hlađenje.",
      ],
    },
    perk: "Dva sata korištenja bazena uz svaki tretman",
    menu: { label: "(02) Tretmani i cijene", title: ["Tretmani", "i cijene"], note: "Cijene su u konvertibilnim markama (KM). Trajanje u minutama.", includes: "Uključuje", min: "min" },
    book: { title: ["Rezervišite", "tretman"], body: "Izaberite tretman i termin online ili nas nazovite ili nam pišite, a mi ćemo sve organizovati.", online: "Rezervišite online", call: "Pozovite", email: "E-mail" },
    hours: { label: "(03) Radno vrijeme", title: ["Radno", "vrijeme"], fallback: "Radno vrijeme spa centra je u fazi potvrđivanja. Za rezervaciju ili provjeru termina nazovite {phone}." },
    footer: { part: "Central Day Spa je dio Hotela Central Sarajevo.", back: "Nazad na Hotel Central" },
  },
};

export type DaySpaCopy = (typeof copy)["en"];
export const getDaySpaCopy = (locale: Locale): DaySpaCopy => copy[locale];
