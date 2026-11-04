import type { Locale } from "@/lib/i18n";

/**
 * Central Day Spa — built-in, verified content (EN + BS).
 *
 * Prices: the Day Spa treatment list of October 2026 (hotelcentral.ba/facilities/wellness-day-spa/: the HTML table and the
 * "SPA-CIJENA-A4" price list uploaded 2026-10, which match each other). The page also still shows an older June 2025 list
 * with different items and prices; it is NOT used. Opening hours: the FAQ updated 2026-10-14. Phone numbers and e-mail:
 * the October 2026 price list and the FAQ. Online booking: the Lime Booking form linked from the hotel's own spa page —
 * an existing, working booking method, not a new integration. Logo and colours: the spa's logo artwork supplied by the hotel.
 *
 * Prices change: once the CMS global "Central Day Spa" holds a published price list, it replaces this one.
 */

export const spaContact = {
  phone: { display: "+387 33 561 830", href: "tel:+38733561830" },
  mobile: { display: "+387 62 769 249", href: "tel:+38762769249", whatsapp: "https://wa.me/38762769249", viber: "viber://chat?number=%2B38762769249" },
  email: "dayspa.hotelcentral@gmail.com",
  instagram: "https://www.instagram.com/central.day.spa/",
  instagramHandle: "@central.day.spa",
  booking: { en: "https://form.lime-booking.com/en/HotelCentralSarajevo/service", bs: "https://form.lime-booking.com/bs/HotelCentralSarajevo/service" },
} as const;

export type Treatment = { name: string; duration?: string; price: string; note?: string; includes?: string[] };
export type TreatmentCategory = { id: string; name: string; intro?: string; items: Treatment[] };
export type PriceList = { updated?: string; note?: string; categories: TreatmentCategory[] };

type L = { en: string; bs: string };
type T = { name: L; duration?: string; price: string; includes?: L[] };
const t = (en: string, bs: string, duration: string | undefined, price: string, includes?: [string, string][]): T => ({ name: { en, bs }, duration, price, includes: includes?.map(([e, b]) => ({ en: e, bs: b })) });

/** October 2026 treatment list. Durations and prices exactly as published. */
const categories: { id: string; name: L; intro?: L; items: T[] }[] = [
  {
    id: "massages",
    name: { en: "Massages", bs: "Masaže" },
    intro: { en: "From a short reflexology session to a full hour of hot stones.", bs: "Od kratke refleksologije do punog sata masaže toplim kamenjem." },
    items: [
      t("Reflexology", "Refleksologija", "30 min", "40 KM"),
      t("Facial massage + mask", "Masaža lica + maska", "30 min", "40 KM"),
      t("Relax Spa massage", "Relax spa masaža", "30 min", "45 KM"),
      t("Relax Spa massage", "Relax spa masaža", "45 min", "65 KM"),
      t("Relax Spa massage", "Relax spa masaža", "60 min", "80 KM"),
      t("Sports massage", "Sportska masaža", "30 min", "55 KM"),
      t("Sports massage", "Sportska masaža", "45 min", "80 KM"),
      t("Sports massage", "Sportska masaža", "60 min", "95 KM"),
      t("Hot stone massage", "Masaža toplim kamenjem", "30 min", "60 KM"),
      t("Hot stone massage", "Masaža toplim kamenjem", "45 min", "85 KM"),
      t("Hot stone massage", "Masaža toplim kamenjem", "60 min", "100 KM"),
      t("Aromatherapy massage", "Aromaterapijska masaža", "30 min", "55 KM"),
      t("Aromatherapy massage", "Aromaterapijska masaža", "45 min", "65 KM"),
      t("Therapeutic massage", "Terapeutska masaža", "30 min", "55 KM"),
      t("Therapeutic massage", "Terapeutska masaža", "45 min", "75 KM"),
      t("Massage for two (guests & members)", "Masaža za dvoje (gosti i članovi)", "2 × 45 min", "100 KM"),
      t("Dry needling + massage", "Dry needling + masaža", undefined, "150 KM"),
      t("Gold massage", "Gold masaža", undefined, "100 KM"),
      t("Manual lymphatic drainage, one region", "Manuelna limfna drenaža, jedna regija", "30 min", "50 KM"),
      t("Manual lymphatic drainage, whole body", "Manuelna limfna drenaža, cijelo tijelo", "90 min", "110 KM"),
    ],
  },
  {
    id: "facials",
    name: { en: "Facial treatments", bs: "Tretmani lica" },
    items: [
      t("Basic facial treatment, cleansing", "Osnovni tretman lica, čišćenje", "30 min", "50 KM"),
      t("Chemical peeling", "Hemijski piling", "30 min", "70 KM"),
      t("Alginate mask", "Alginatna maska", "40 min", "80 KM"),
      t("Green Sea Peeling", "Green Sea Peeling", "40 min", "150 KM"),
      t("Cryo mask", "Cryo maska", "40 min", "70 KM"),
      t("Collagen threads", "Kolagenske niti", "60 min", "200 KM"),
      t("Micro/nanoneedling cocktails", "Micro/nanoneedling kokteli", "60 min", "150 KM"),
      t("Beauty fillers shot", "Beauty filler shot", "40–60 min", "100 KM"),
    ],
  },
  {
    id: "cupping",
    name: { en: "Cupping / dry cupping", bs: "Cupping / suhi cupping" },
    items: [t("Cupping", "Cupping", "45 min", "60 KM"), t("Dry cupping", "Suhi cupping", "30 min", "40 KM")],
  },
  {
    id: "iyashi",
    name: { en: "Iyashi Dome · Japanese sauna", bs: "Iyashi Dome · japanska sauna" },
    items: [
      t("Iyashi Dome single", "Iyashi Dome, pojedinačno", "30 min", "50 KM"),
      t("Iyashi Dome + massage", "Iyashi Dome + masaža", "60 min (30+30)", "90 KM"),
      t("Iyashi Dome + massage", "Iyashi Dome + masaža", "75 min (30+45)", "115 KM"),
    ],
  },
  {
    id: "madero",
    name: { en: "Madero therapy", bs: "Maderoterapija" },
    items: [
      t("Whole body, one treatment", "Cijelo tijelo, jedan tretman", "45 min", "60 KM"),
      t("One region, one treatment", "Jedna regija, jedan tretman", "30 min", "30 KM"),
      t("Whole body, 10 treatments", "Cijelo tijelo, 10 tretmana", undefined, "450 KM"),
      t("One region, 10 treatments", "Jedna regija, 10 tretmana", undefined, "270 KM"),
    ],
  },
  {
    id: "balneo",
    name: { en: "Balneo bath", bs: "Balneo kupka" },
    items: [
      t("Balneo single", "Balneo, pojedinačno", "30 min", "50 KM"),
      t("Balneo bath + massage", "Balneo kupka + masaža", "60 min (30+30)", "90 KM"),
      t("Balneo bath + massage", "Balneo kupka + masaža", "75 min (30+45)", "115 KM"),
    ],
  },
  {
    id: "scrub",
    name: { en: "Body scrub", bs: "Piling tijela" },
    items: [
      t("Body scrub single", "Piling tijela, pojedinačno", "30 min", "45 KM"),
      t("Body scrub + massage", "Piling tijela + masaža", "60 min (30+30)", "85 KM"),
      t("Body scrub + massage", "Piling tijela + masaža", "90 min (30+60)", "110 KM"),
    ],
  },
  {
    id: "brows",
    name: { en: "Eyebrows and eyelashes", bs: "Obrve i trepavice" },
    items: [
      t("Eyebrow shaping", "Oblikovanje obrva", "15 min", "15 KM"),
      t("Eyebrow tinting", "Farbanje obrva", "30 min", "20 KM"),
      t("Brow lift", "Brow lift", "60 min", "40 KM"),
      t("Lash lift", "Lash lift", "60 min", "30 KM"),
    ],
  },
  {
    id: "nails",
    name: { en: "Manicure and pedicure", bs: "Manikir i pedikir" },
    items: [
      t("Removal of permanent nail polish", "Skidanje trajnog laka", "30 min", "10 KM"),
      t("Addition of permanent nail polish", "Nanošenje trajnog laka", "30 min", "10 KM"),
      t("Classic manicure, regular polish", "Klasični manikir, obični lak", "45 min", "30 KM"),
      t("Classic pedicure, regular polish", "Klasični pedikir, obični lak", "45 min", "40 KM"),
      t("SPA manicure", "SPA manikir", "60 min", "40 KM"),
      t("SPA pedicure", "SPA pedikir", "60 min", "50 KM"),
      t("Medical pedicure", "Medicinski pedikir", "60 min", "50–80 KM"),
    ],
  },
  {
    id: "packages",
    name: { en: "Packages", bs: "Paketi" },
    intro: { en: "Rituals that combine several treatments.", bs: "Rituali koji spajaju više tretmana." },
    items: [
      t("Detox", "Detox", "75 min", "120 KM", [["Body lymphatic drainage · 45 min", "Limfna drenaža tijela · 45 min"], ["Relax massage · 30 min", "Relax masaža · 30 min"], ["Relax room + tea", "Relax soba + čaj"]]),
      t("Face and body glow", "Face and body glow", "75 min", "110 KM", [["Body lymphatic drainage · 45 min", "Limfna drenaža tijela · 45 min"], ["Mini facial · 30 min", "Mini tretman lica · 30 min"]]),
      t("Slim & shape", "Slim & shape", "75 min", "130 KM", [["Body lymphatic drainage · 45 min", "Limfna drenaža tijela · 45 min"], ["Anti-cellulite massage · 30 min", "Anticelulit masaža · 30 min"]]),
    ],
  },
];

export function builtInPriceList(locale: Locale): PriceList {
  return {
    updated: locale === "bs" ? "Oktobar 2026." : "October 2026",
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name[locale],
      ...(c.intro ? { intro: c.intro[locale] } : {}),
      items: c.items.map((i) => ({ name: i.name[locale], ...(i.duration ? { duration: i.duration } : {}), price: i.price, ...(i.includes ? { includes: i.includes.map((x) => x[locale]) } : {}) })),
    })),
  };
}

const en = {
  meta: { title: "Central Day Spa", description: "Central Day Spa at Hotel Central Sarajevo: massage, facial, body and beauty treatments in six treatment rooms, with up to two hours of pool access with every treatment. Prices and booking." },
  nav: { treatments: "Treatments", prices: "Prices", spa: "The spa", book: "Book a treatment", label: "Central Day Spa" },
  hero: {
    eyebrow: "Hotel Central · Sarajevo",
    title: ["A quiet hour", "for yourself"],
    intro: "Massage, facial and body rituals in the calm of the old town — and up to two hours in the pool and thermal area with every treatment.",
    book: "Book a treatment",
    prices: "View prices",
  },
  intro: {
    label: "Welcome",
    title: ["Slow down,", "breathe, unwind"],
    body: [
      "Central Day Spa is a place to step away from the day. Six treatment rooms, warm light and unhurried hands — for massage, facial, beauty and body treatments.",
      "Every treatment you book includes up to two hours in the pool and thermal area of the hotel, at no extra cost.",
    ],
    note: "Open to the public and to hotel guests.",
  },
  categories: {
    label: "Treatments",
    title: ["Rituals for", "body and face"],
    items: [
      { id: "massages", name: "Massage", body: "Relax, sports, hot stone, aromatherapy and therapeutic massage, lymphatic drainage and massage for two." },
      { id: "facials", name: "Face", body: "Cleansing, peels, masks, collagen threads and micro-needling treatments." },
      { id: "iyashi", name: "Heat & water", body: "The Iyashi Dome Japanese sauna and the balneo bath, on their own or with a massage." },
      { id: "scrub", name: "Body", body: "Body scrubs, madero therapy and cupping." },
      { id: "nails", name: "Hands, feet & brows", body: "Manicure, pedicure, brow shaping, brow and lash lifts." },
      { id: "packages", name: "Packages", body: "Detox, Face and body glow, Slim & shape." },
    ],
  },
  prices: {
    label: "Price list",
    title: ["Treatments", "& prices"],
    updated: "Price list",
    currency: "Prices in KM (convertible marks).",
    duration: "Duration",
    price: "Price",
    includes: "Includes",
    changeNote: "Prices may change; the spa team will confirm the price when you book.",
  },
  facilities: {
    label: "The spa",
    title: ["Rooms made", "for stillness"],
    items: [
      { k: "Treatment rooms", v: "Six" },
      { k: "Japanese sauna", v: "Iyashi Dome" },
      { k: "Balneo bath", v: "On its own or with massage" },
      { k: "Relaxation room", v: "Tea after your treatment" },
      { k: "With every treatment", v: "Up to 2 hours in the pool and thermal area" },
    ],
  },
  gallery: { label: "Atmosphere" },
  visit: {
    label: "Visit & booking",
    title: ["Book your", "treatment"],
    body: "Book online, or call or message the spa team — we will help you choose the right treatment and time. We recommend booking in advance.",
    online: "Book online",
    onlineNote: "Opens the spa's booking form (Lime Booking) in a new tab.",
    call: "Call the spa",
    whatsapp: "WhatsApp",
    viber: "Viber",
    email: "E-mail",
    instagram: "Instagram",
    hoursTitle: "Opening hours",
    hours: [{ d: "Tuesday – Saturday", h: "11:00 – 20:00" }],
    hoursNote: "For hotel guests and visitors.",
    address: "Inside Hotel Central · Ćumurija 8, 71000 Sarajevo",
    fitness: "Pool & fitness: Central Fitness Club",
  },
  alt: {
    hero: "A candle-lit treatment room at Central Day Spa",
    intro1: "The spa's relaxation room with a forest mural and loungers",
    intro2: "Candle and stones on the edge of the bath",
    gallery: [
      "Treatment room with a massage table and soft light",
      "The relaxation room with loungers and a forest mural",
      "Bathing room with string curtains",
      "Spa bath with a window of stones and leaves",
      "Reception of the day spa",
      "Detail of a spa bath",
    ],
  },
};

export type DaySpaContent = typeof en;

const bs: DaySpaContent = {
  meta: { title: "Central Day Spa", description: "Central Day Spa u Hotelu Central Sarajevo: masaže, tretmani lica, tijela i kozmetički tretmani u šest tretman soba, uz do dva sata bazena uz svaki tretman. Cijene i rezervacije." },
  nav: { treatments: "Tretmani", prices: "Cijene", spa: "Spa", book: "Rezervišite tretman", label: "Central Day Spa" },
  hero: {
    eyebrow: "Hotel Central · Sarajevo",
    title: ["Mirni sat", "samo za vas"],
    intro: "Masaže, rituali za lice i tijelo u miru Starog grada — i do dva sata bazena i termalnog dijela uz svaki tretman.",
    book: "Rezervišite tretman",
    prices: "Pogledajte cijene",
  },
  intro: {
    label: "Dobro došli",
    title: ["Usporite,", "dišite, opustite se"],
    body: [
      "Central Day Spa je mjesto za predah od svakodnevice. Šest tretman soba, toplo svjetlo i ruke koje se ne žure — za masaže, tretmane lica, kozmetičke tretmane i tretmane tijela.",
      "Uz svaki rezervisani tretman na raspolaganju su Vam do dva sata hotelskog bazena i termalnog dijela, bez dodatnih troškova.",
    ],
    note: "Otvoreno za sve posjetioce i goste hotela.",
  },
  categories: {
    label: "Tretmani",
    title: ["Rituali za", "tijelo i lice"],
    items: [
      { id: "massages", name: "Masaže", body: "Relax, sportska, masaža toplim kamenjem, aromaterapijska i terapeutska masaža, limfna drenaža i masaža za dvoje." },
      { id: "facials", name: "Lice", body: "Čišćenje, pilinzi, maske, kolagenske niti i micro-needling tretmani." },
      { id: "iyashi", name: "Toplina i voda", body: "Iyashi Dome japanska sauna i balneo kupka, samostalno ili uz masažu." },
      { id: "scrub", name: "Tijelo", body: "Piling tijela, maderoterapija i cupping." },
      { id: "nails", name: "Ruke, stopala i obrve", body: "Manikir, pedikir, oblikovanje obrva, brow i lash lift." },
      { id: "packages", name: "Paketi", body: "Detox, Face and body glow, Slim & shape." },
    ],
  },
  prices: {
    label: "Cjenovnik",
    title: ["Tretmani", "i cijene"],
    updated: "Cjenovnik",
    currency: "Cijene su u KM (konvertibilnim markama).",
    duration: "Trajanje",
    price: "Cijena",
    includes: "Uključuje",
    changeNote: "Cijene su podložne promjenama; spa tim će potvrditi cijenu pri rezervaciji.",
  },
  facilities: {
    label: "Spa",
    title: ["Prostori stvoreni", "za tišinu"],
    items: [
      { k: "Tretman sobe", v: "Šest" },
      { k: "Japanska sauna", v: "Iyashi Dome" },
      { k: "Balneo kupka", v: "Samostalno ili uz masažu" },
      { k: "Relax soba", v: "Čaj nakon tretmana" },
      { k: "Uz svaki tretman", v: "Do 2 sata bazena i termalnog dijela" },
    ],
  },
  gallery: { label: "Atmosfera" },
  visit: {
    label: "Posjeta i rezervacija",
    title: ["Rezervišite", "tretman"],
    body: "Rezervišite online ili nazovite i pišite spa timu — pomoći ćemo Vam da odaberete pravi tretman i termin. Preporučujemo rezervaciju unaprijed.",
    online: "Rezervišite online",
    onlineNote: "Otvara obrazac za rezervaciju spa tretmana (Lime Booking) u novoj kartici.",
    call: "Nazovite spa",
    whatsapp: "WhatsApp",
    viber: "Viber",
    email: "E-mail",
    instagram: "Instagram",
    hoursTitle: "Radno vrijeme",
    hours: [{ d: "Utorak – subota", h: "11:00 – 20:00" }],
    hoursNote: "Za goste hotela i posjetioce.",
    address: "U Hotelu Central · Ćumurija 8, 71000 Sarajevo",
    fitness: "Bazen i fitness: Central Fitness Club",
  },
  alt: {
    hero: "Tretman soba u Central Day Spa uz svjetlost svijeća",
    intro1: "Relax soba spa centra sa zidnom slikom šume i ležaljkama",
    intro2: "Svijeća i kamenje na rubu kade",
    gallery: [
      "Tretman soba sa stolom za masažu i mekim svjetlom",
      "Relax soba sa ležaljkama i zidnom slikom šume",
      "Prostorija za kupanje sa zavjesama od niti",
      "Spa kada uz prozor sa motivom kamenja i lišća",
      "Recepcija day spa centra",
      "Detalj spa kade",
    ],
  },
};

export function getDaySpa(locale: Locale): DaySpaContent {
  return locale === "bs" ? bs : en;
}
