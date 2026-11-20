import type { Locale } from "@/lib/i18n";

/**
 * Central Day Spa — built-in content (the website shows this when the CMS is off, empty or unreachable; the
 * "Central Day Spa" global in the CMS overrides it field by field, see src/cms/brandsMerge.ts).
 *
 * Treatments, durations and prices are copied from the hotel's live price list
 * (hotelcentral.ba/facilities/wellness-day-spa, updated 2026-10-13). Online booking goes to the hotel's own
 * Lime Booking form, the link that page uses.
 */

type L = { en: string; bs: string };
const l = (en: string, bs: string): L => ({ en, bs });

export const DAYSPA_BOOKING_URL = "https://form.lime-booking.com/en/HotelCentralSarajevo/service";

export type SpaTreatment = { name: L; duration?: string; price: string; note?: L };
export type SpaCategory = { id: string; name: L; summary: L; image: string; items: SpaTreatment[] };
export type SpaPackage = { name: L; duration: string; price: string; includes: L[] };

const t = (en: string, bs: string, duration: string | undefined, price: string, note?: L): SpaTreatment => ({ name: l(en, bs), ...(duration ? { duration } : {}), price, ...(note ? { note } : {}) });

export const spaCategories: SpaCategory[] = [
  {
    id: "massage",
    name: l("Massage", "Masaže"),
    summary: l("Relax, sports, hot stone, aromatherapy and therapeutic massage, from 30 to 90 minutes.", "Relax, sportska, masaža vrućim kamenjem, aromaterapijska i terapeutska masaža, od 30 do 90 minuta."),
    image: "/images/dayspa/massage-room.jpg",
    items: [
      t("Relax spa massage", "Relax spa masaža", "30 min", "45"),
      t("Relax spa massage", "Relax spa masaža", "45 min", "65"),
      t("Relax spa massage", "Relax spa masaža", "60 min", "80"),
      t("Sports massage", "Sportska masaža", "30 min", "55"),
      t("Sports massage", "Sportska masaža", "45 min", "80"),
      t("Sports massage", "Sportska masaža", "60 min", "95"),
      t("Hot stone massage", "Masaža vrućim kamenjem", "30 min", "60"),
      t("Hot stone massage", "Masaža vrućim kamenjem", "45 min", "85"),
      t("Hot stone massage", "Masaža vrućim kamenjem", "60 min", "100"),
      t("Aromatherapy massage", "Aromaterapijska masaža", "30 min", "55"),
      t("Aromatherapy massage", "Aromaterapijska masaža", "45 min", "65"),
      t("Therapeutic massage", "Terapeutska masaža", "30 min", "55"),
      t("Therapeutic massage", "Terapeutska masaža", "45 min", "75"),
      t("Gold massage", "Gold masaža", "60 min", "100"),
      t("Reflexology", "Refleksologija", "30 min", "40"),
      t("Manual lymphatic drainage, one area", "Manuelna limfna drenaža, jedna zona", "30 min", "50"),
      t("Manual lymphatic drainage, whole body", "Manuelna limfna drenaža, cijelo tijelo", "90 min", "110"),
      t("Massage for two", "Masaža za dvoje", "2 × 45 min", "100", l("Relax massage, for hotel guests and club members", "Relax masaža, za goste hotela i članove kluba")),
      t("Dry needling + massage", "Dry needling + masaža", undefined, "150"),
    ],
  },
  {
    id: "face",
    name: l("Facial treatments", "Tretmani lica"),
    summary: l("From a cleansing facial and masks to peels, collagen threads and needling.", "Od čišćenja lica i maski do pilinga, kolagenskih niti i needlinga."),
    image: "/images/dayspa/facial-mask.jpg",
    items: [
      t("Facial massage + mask", "Masaža lica + maska", "30 min", "40"),
      t("Basic facial – cleansing", "Osnovni tretman lica – čišćenje", "30 min", "50"),
      t("Chemical peel", "Hemijski piling", "30 min", "70"),
      t("Alginate mask", "Alginatna maska", "40 min", "80"),
      t("Cryo mask", "Krio maska", "40 min", "70"),
      t("Green Sea peel", "Green Sea piling", "40 min", "150"),
      t("Beauty filler shot", "Beauty filler shot", "40–60 min", "100"),
      t("Micro / nano-needling cocktails", "Micro / nano-needling kokteli", "60 min", "150"),
      t("Collagen threads", "Kolagenske niti", "60 min", "200"),
    ],
  },
  {
    id: "iyashi",
    name: l("Iyashi Dome", "Iyashi Dome"),
    summary: l("The Japanese infrared sauna, on its own or followed by a massage.", "Japanska infracrvena sauna, sama ili uz masažu."),
    image: "/images/dayspa/iyashi-dome.jpg",
    items: [
      t("Iyashi Dome", "Iyashi Dome", "30 min", "50"),
      t("Iyashi Dome + massage (30/30)", "Iyashi Dome + masaža (30/30)", "60 min", "90"),
      t("Iyashi Dome + massage (30/45)", "Iyashi Dome + masaža (30/45)", "75 min", "115"),
    ],
  },
  {
    id: "balneo",
    name: l("Balneo bath", "Balneo kupka"),
    summary: l("A warm mineral bath, on its own or followed by a massage.", "Topla mineralna kupka, sama ili uz masažu."),
    image: "/images/dayspa/balneo-bath.jpg",
    items: [
      t("Balneo bath", "Balneo kupka", "30 min", "50"),
      t("Balneo bath + massage (30/30)", "Balneo kupka + masaža (30/30)", "60 min", "90"),
      t("Balneo bath + massage (30/45)", "Balneo kupka + masaža (30/45)", "75 min", "115"),
    ],
  },
  {
    id: "body",
    name: l("Body & maderotherapy", "Tijelo i maderoterapija"),
    summary: l("Wooden-tool maderotherapy, single or in a course of ten, and body scrubs.", "Maderoterapija drvenim alatima, pojedinačno ili u paketu od deset, i piling tijela."),
    image: "/images/dayspa/maderotherapy.jpg",
    items: [
      t("Maderotherapy, one area", "Maderoterapija, jedna zona", "30 min", "30"),
      t("Maderotherapy, full body", "Maderoterapija, cijelo tijelo", "45 min", "60"),
      t("Maderotherapy, one area – 10 treatments", "Maderoterapija, jedna zona – 10 tretmana", undefined, "270"),
      t("Maderotherapy, full body – 10 treatments", "Maderoterapija, cijelo tijelo – 10 tretmana", undefined, "450"),
      t("Body scrub", "Piling tijela", "30 min", "45"),
      t("Body scrub + massage (30/30)", "Piling tijela + masaža (30/30)", "60 min", "85"),
      t("Body scrub + massage (30/60)", "Piling tijela + masaža (30/60)", "90 min", "110"),
      t("Cupping", "Cupping", "45 min", "60"),
      t("Dry cupping", "Suhi cupping", "30 min", "40"),
    ],
  },
  {
    id: "hands",
    name: l("Hands, feet, brows & lashes", "Ruke, stopala, obrve i trepavice"),
    summary: l("Classic and spa manicure and pedicure, medical pedicure, brow and lash lifts.", "Klasični i spa manikir i pedikir, medicinski pedikir, lifting obrva i trepavica."),
    image: "/images/dayspa/manicure.jpg",
    items: [
      t("Classic manicure (regular polish)", "Klasični manikir (obični lak)", "45 min", "30"),
      t("Classic pedicure (regular polish)", "Klasični pedikir (obični lak)", "45 min", "40"),
      t("Spa manicure", "Spa manikir", "60 min", "40"),
      t("Spa pedicure", "Spa pedikir", "60 min", "50"),
      t("Medical pedicure", "Medicinski pedikir", "60 min", "50–80"),
      t("Permanent polish application", "Nanošenje trajnog laka", "30 min", "10"),
      t("Permanent polish removal", "Skidanje trajnog laka", "30 min", "10"),
      t("Eyebrow shaping", "Oblikovanje obrva", "15 min", "15"),
      t("Eyebrow tinting", "Farbanje obrva", "30 min", "20"),
      t("Brow lift", "Lifting obrva", "60 min", "40"),
      t("Lash lift", "Lifting trepavica", "60 min", "30"),
    ],
  },
];

export const spaPackages: SpaPackage[] = [
  { name: l("Detox", "Detox"), duration: "75 min", price: "120", includes: [l("Lymphatic drainage, 45 min", "Limfna drenaža, 45 min"), l("Relax massage, 30 min", "Relax masaža, 30 min"), l("Relaxation room and tea", "Relax soba i čaj")] },
  { name: l("Face & Body Glow", "Face & Body Glow"), duration: "75 min", price: "110", includes: [l("Lymphatic drainage, 45 min", "Limfna drenaža, 45 min"), l("Mini facial, 30 min", "Mini tretman lica, 30 min")] },
  { name: l("Slim & Shape", "Slim & Shape"), duration: "75 min", price: "130", includes: [l("Lymphatic drainage, 45 min", "Limfna drenaža, 45 min"), l("Anti-cellulite massage, 30 min", "Anticelulit masaža, 30 min")] },
];

const copy = {
  en: {
    meta: { title: "Central Day Spa", description: "Massage, facials, Iyashi Dome, balneo bath and maderotherapy at Central Day Spa in Hotel Central Sarajevo. Prices, packages and online booking." },
    nav: { treatments: "Treatments", prices: "Price list", packages: "Packages", about: "About", contact: "Contact", hotel: "Hotel Central", menu: "Menu", close: "Close", book: "Book a treatment", language: "Language" },
    hero: { eyebrow: "Relax · Restore · Rebalance", title: ["Relax the body,", "quiet the mind"], cta: "Book a treatment", prices: "See the price list", perkTitle: "Two hours in the pool area with every treatment", perkBig: "2 h", perkBody: "The heated pool, sauna and steam bath of Central Fitness Club, free with any treatment booked." },
    about: { label: "About the spa", title: "A quiet floor in the middle of the city", body: "Six treatment rooms, a relaxation room with loungers, the Iyashi Dome and a balneo bath, a few steps from Baščaršija. Come between meetings or after a day in town; we take care of the rest.", features: [{ title: "Massage and body", body: "Relax, sports, hot stone and aromatherapy massage, lymphatic drainage and maderotherapy." }, { title: "Face and beauty", body: "Cleansing facials, peels, masks, needling, collagen threads, manicure and pedicure." }], cta: "Book a treatment", seal: "Central Day Spa · Sarajevo ·" },
    services: { label: "Our treatments", title: ["Treatments for body,", "face and calm"], from: "from", view: "Prices", all: "Full price list" },
    prices: { label: "Price list", title: "Treatments and prices", intro: "Prices in convertible marks (KM). Every treatment includes two hours in the pool area.", duration: "Duration", price: "Price" },
    packages: { label: "Packages", title: "Packages for a longer stay", book: "Book", popular: "Most chosen" },
    why: { label: "Why Central Day Spa", title: "Calm, in the heart of Sarajevo", body: "Our qualified therapists take time for you. Afterwards the pool, sauna and steam bath are yours for two more hours.", ticks: ["Qualified therapists", "Clear prices and packages", "Pool and saunas with every treatment", "Inside Hotel Central, by Baščaršija"], stat: "treatment rooms" },
    cta: { eyebrow: "Hotel guests and visitors", title: "Time just for you. Book your treatment today.", book: "Book online", call: "Call the spa" },
    footer: { address: "Address", contact: "Contact", hours: "Opening hours", hoursFallback: "Call us for today's hours.", follow: "Also at Hotel Central", club: "Central Fitness Club", hotel: "Hotel Central Sarajevo", rights: "Central Day Spa is part of Hotel Central Sarajevo." },
    gallery: "Inside the spa",
  },
  bs: {
    meta: { title: "Central Day Spa", description: "Masaže, tretmani lica, Iyashi Dome, balneo kupka i maderoterapija u Central Day Spa, Hotel Central Sarajevo. Cijene, paketi i online rezervacija." },
    nav: { treatments: "Tretmani", prices: "Cjenovnik", packages: "Paketi", about: "O nama", contact: "Kontakt", hotel: "Hotel Central", menu: "Meni", close: "Zatvori", book: "Rezerviši tretman", language: "Jezik" },
    hero: { eyebrow: "Opuštanje · Obnova · Ravnoteža", title: ["Opustite tijelo,", "umirite misli"], cta: "Rezerviši tretman", prices: "Pogledaj cjenovnik", perkTitle: "Uz svaki tretman dva sata u zoni bazena", perkBig: "2 h", perkBody: "Grijani bazen, sauna i parno kupatilo Central Fitness Cluba, besplatno uz svaki rezervisani tretman." },
    about: { label: "O nama", title: "Mirni sprat usred grada", body: "Šest tretman soba, relax soba s ležaljkama, Iyashi Dome i balneo kupka, nekoliko koraka od Baščaršije. Dođite između sastanaka ili nakon dana u gradu; o ostalom brinemo mi.", features: [{ title: "Masaže i tijelo", body: "Relax, sportska, masaža vrućim kamenjem i aromaterapijska masaža, limfna drenaža i maderoterapija." }, { title: "Lice i ljepota", body: "Čišćenje lica, pilinzi, maske, needling, kolagenske niti, manikir i pedikir." }], cta: "Rezerviši tretman", seal: "Central Day Spa · Sarajevo ·" },
    services: { label: "Naši tretmani", title: ["Tretmani za tijelo,", "lice i mir"], from: "od", view: "Cijene", all: "Cijeli cjenovnik" },
    prices: { label: "Cjenovnik", title: "Tretmani i cijene", intro: "Cijene su u konvertibilnim markama (KM). Uz svaki tretman dobijate dva sata u zoni bazena.", duration: "Trajanje", price: "Cijena" },
    packages: { label: "Paketi", title: "Paketi za duži odmor", book: "Rezerviši", popular: "Najčešći izbor" },
    why: { label: "Zašto Central Day Spa", title: "Mir, u srcu Sarajeva", body: "Naši kvalifikovani terapeuti posvete vam se bez žurbe. Nakon tretmana bazen, sauna i parno kupatilo su vaši još dva sata.", ticks: ["Kvalifikovani terapeuti", "Jasne cijene i paketi", "Bazen i saune uz svaki tretman", "U Hotelu Central, kod Baščaršije"], stat: "tretman soba" },
    cta: { eyebrow: "Gosti hotela i posjetioci", title: "Vrijeme samo za vas. Rezervišite tretman danas.", book: "Rezerviši online", call: "Pozovite spa" },
    footer: { address: "Adresa", contact: "Kontakt", hours: "Radno vrijeme", hoursFallback: "Pozovite nas za današnje radno vrijeme.", follow: "Također u Hotelu Central", club: "Central Fitness Club", hotel: "Hotel Central Sarajevo", rights: "Central Day Spa je dio Hotela Central Sarajevo." },
    gallery: "Unutar spa centra",
  },
};

export type DaySpaCopy = (typeof copy)["en"];
export const daySpaCopy = (locale: Locale): DaySpaCopy => copy[locale];

/** Photographs from the hotel's 2026 shoot (Drive folder "SPA images"). */
export const daySpaImages = {
  hero: { src: "/images/dayspa/guest-robe.jpg", alt: "A guest in a white robe walking down the softly lit spa corridor", position: "50% 32%" },
  aboutA: { src: "/images/dayspa/salt-lamp.jpg", alt: "A Himalayan salt lamp glowing on a wooden shelf", position: "50% 50%" },
  aboutB: { src: "/images/dayspa/relax-room.jpg", alt: "The relaxation room with loungers under a forest mural", position: "50% 50%" },
  whyA: { src: "/images/dayspa/serum-drop.jpg", alt: "A drop of serum applied during a facial", position: "50% 40%" },
  whyB: { src: "/images/dayspa/maderotherapy-tools.jpg", alt: "Wooden maderotherapy tools in a basket", position: "50% 50%" },
  whyC: { src: "/images/dayspa/corridor.jpg", alt: "The spa corridor with string curtains and a Quiet Zone sign", position: "50% 45%" },
  cta: { src: "/images/dayspa/massage-room-oil.jpg", alt: "", position: "50% 50%" },
  gallery: [
    { src: "/images/dayspa/treatment-room.jpg", alt: "A treatment room with a rose light and a flower mural" },
    { src: "/images/dayspa/relax-lounger.jpg", alt: "A lounger with a lilac cushion in the relaxation room" },
    { src: "/images/dayspa/candle.jpg", alt: "A candle and glass vases in the spa" },
    { src: "/images/dayspa/relax-lamp.jpg", alt: "A wicker floor lamp in the relaxation room" },
    { src: "/images/dayspa/facial-room.jpg", alt: "The facial room with serums in a lit niche" },
    { src: "/images/dayspa/balneo-room.jpg", alt: "The balneo bath behind a curtain in red light" },
    { src: "/images/dayspa/yin-yang.jpg", alt: "A yin-yang inlay in the wooden floor" },
    { src: "/images/dayspa/facial-glow.jpg", alt: "A guest after a facial" },
    { src: "/images/dayspa/products.jpg", alt: "The spa's oils and creams in a glass cabinet" },
  ],
};
