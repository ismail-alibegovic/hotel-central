import type { Locale } from "@/lib/i18n";

/**
 * Central Fitness Club (CH-010, CH-011, CH-012).
 *
 * Facts come from the hotel's published Club & Spa pages (hotelcentral.ba/club-spa/, /gym/, /classes/, /pool-spa/,
 * /membership/, read 2026-11-13) and from the hotel's own 2026 photographs. The old "West Wood" brand name is not used.
 *
 * MEMBERSHIPS and TIMETABLE are intentionally empty: the hotel has not supplied membership types, prices or the monthly
 * class timetable yet. Fill the arrays below (both languages) and the Membership and Timetable pages show them
 * automatically; until then those pages say clearly that the information is being prepared and how to ask for it.
 */
type L = { en: string; bs: string };

export type Membership = { name: L; price: string; period: L; includes: L[]; highlight?: boolean };
/** Prices in KM, e.g. "60". */
export const memberships: Membership[] = [];

export type ClassSlot = { day: 1 | 2 | 3 | 4 | 5 | 6 | 7; start: string; end: string; name: L; place?: L };
/** Weekly class timetable (1 = Monday). Month the timetable applies to, e.g. { en: "December 2026", bs: "Decembar 2026" }. */
export const timetable: { month?: L; slots: ClassSlot[] } = { slots: [] };

const copy = {
  en: {
    meta: {
      title: "Central Fitness Club",
      description: "Central Fitness Club at Hotel Central Sarajevo: a gym over three floors, group classes in an air-conditioned studio, a heated 25-metre pool, sauna, steam bath and caldarium.",
    },
    nav: { club: "The club", membership: "Membership", timetable: "Timetable", contact: "Contact", join: "Ask about membership", hotel: "Hotel Central" },
    hero: { eyebrow: "Hotel Central Sarajevo", title: ["Feel", "your power"], intro: "A gym over three floors, group classes and a 25-metre pool, in the centre of Sarajevo." },
    stats: [
      { v: "3", k: "floors of gym" },
      { v: "25 m", k: "heated pool" },
      { v: "2", k: "air-conditioned fitness studios" },
    ],
    gym: {
      label: "(01) The gym",
      title: ["Everything", "under one roof"],
      body: [
        "Treadmills, stair climbers, ellipticals, bikes and rowers; free weights, kettlebells, dumbbells and strength machines — in two air-conditioned fitness studios over three floors.",
        "Whether you are a complete beginner or train every day, our trainers will help you get started and keep going.",
      ],
      equipment: { title: "Equipment", items: ["Treadmills & stair climbers", "Ellipticals, bikes & rowers", "Free weights & dumbbells", "Kettlebells & sandbags", "Strength & toning machines", "Stretching & mat area"] },
    },
    classes: {
      label: "(02) Group classes",
      title: ["Train", "together"],
      body: "Classes for every age and fitness level take place in our air-conditioned group exercise studio — from yoga and Pilates to HIIT, kettlebell and indoor cycling.",
      list: ["Yoga", "Pilates", "Body mix", "HIIT", "Kettlebell", "Muscle pump", "Circuit training", "Indoor cycling", "Fat burning", "Aqua aerobics", "Swimming"],
      cta: "See the timetable",
    },
    pool: {
      label: "(03) Pool & wellness",
      title: ["Swim, then", "slow down"],
      body: "Swim lengths in the heated 25-metre pool, then relax in the Finnish sauna, steam bath and caldarium — a gentle 40–50 °C sauna with heated benches — and cool off in the plunge pool.",
      facts: ["25 m heated pool", "Finnish sauna", "Steam bath", "Caldarium 40–50 °C", "Hydrotherapy pools", "Plunge pool"],
    },
    join: { title: ["Join", "the club"], body: "Ask us about membership, a first visit or a tour of the club. Call reception or write to us — we will gladly show you around.", call: "Call", email: "E-mail", membership: "Membership" },
    hours: { label: "(04) Opening hours", title: ["Opening", "hours"], fallback: "Club opening hours are being confirmed. For today's hours, please call {phone}." },
    membership: {
      meta: { title: "Membership — Central Fitness Club", description: "Membership at Central Fitness Club, Hotel Central Sarajevo: access to the gym over three floors, group classes, the 25-metre pool, sauna, steam bath and caldarium." },
      hero: { eyebrow: "Central Fitness Club", title: ["Membership"], intro: "One membership for the gym, the classes and the pool." },
      includedLabel: "(01) Every membership includes",
      included: ["Gym over three floors", "Group classes in the studio", "Heated 25-metre pool", "Finnish sauna, steam bath & caldarium", "Hydrotherapy & plunge pools", "Guidance from our trainers"],
      optionsLabel: "(02) Membership options",
      pending: "Membership options and prices for the coming season are being finalised and will be published here. For current options and prices, please call or e-mail us.",
      perPeriod: "per",
      enquire: "Ask about this membership",
    },
    timetableCopy: {
      meta: { title: "Class timetable — Central Fitness Club", description: "The monthly group class timetable of Central Fitness Club at Hotel Central Sarajevo." },
      hero: { eyebrow: "Central Fitness Club", title: ["Class", "timetable"], intro: "Group classes for every level, every week." },
      label: "(01) This month",
      pending: "The timetable for this month is being prepared and will be published here. Ask reception which classes are on today:",
      classesLabel: "Classes at the club",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      noClasses: "No classes",
    },
    footer: { part: "Central Fitness Club is part of Hotel Central Sarajevo.", back: "Back to Hotel Central" },
  },
  bs: {
    meta: {
      title: "Central Fitness Club",
      description: "Central Fitness Club u Hotelu Central Sarajevo: teretana na tri sprata, grupni treninzi u klimatiziranom studiju, grijani bazen od 25 metara, sauna, parna kupelj i caldarium.",
    },
    nav: { club: "Klub", membership: "Članarine", timetable: "Raspored", contact: "Kontakt", join: "Upit za članarinu", hotel: "Hotel Central" },
    hero: { eyebrow: "Hotel Central Sarajevo", title: ["Osjetite", "svoju snagu"], intro: "Teretana na tri sprata, grupni treninzi i bazen od 25 metara, u centru Sarajeva." },
    stats: [
      { v: "3", k: "sprata teretane" },
      { v: "25 m", k: "grijani bazen" },
      { v: "2", k: "klimatizirana fitness studija" },
    ],
    gym: {
      label: "(01) Teretana",
      title: ["Sve na", "jednom mjestu"],
      body: [
        "Trake za trčanje, stepperi, eliptični trenažeri, bicikli i veslači; slobodni tegovi, girje, bučice i sprave za snagu – u dva klimatizirana fitness studija na tri sprata.",
        "Bilo da ste početnik ili trenirate svaki dan, naši treneri pomoći će vam da započnete i istrajete.",
      ],
      equipment: { title: "Oprema", items: ["Trake za trčanje i stepperi", "Eliptični trenažeri, bicikli i veslači", "Slobodni tegovi i bučice", "Girje i vreće s pijeskom", "Sprave za snagu i oblikovanje", "Prostor za istezanje"] },
    },
    classes: {
      label: "(02) Grupni treninzi",
      title: ["Trenirajte", "zajedno"],
      body: "Treninzi za sve uzraste i nivoe kondicije održavaju se u našem klimatiziranom studiju za grupne vježbe – od joge i pilatesa do HIIT-a, treninga s girjama i spinninga.",
      list: ["Joga", "Pilates", "Body mix", "HIIT", "Kettlebell", "Muscle pump", "Kružni trening", "Spinning", "Fat burning", "Aqua aerobik", "Plivanje"],
      cta: "Pogledajte raspored",
    },
    pool: {
      label: "(03) Bazen i wellness",
      title: ["Plivajte, pa", "se opustite"],
      body: "Plivajte u grijanom bazenu od 25 metara, a zatim se opustite u finskoj sauni, parnoj kupelji i caldariumu – blagoj sauni od 40–50 °C sa grijanim klupama – i rashladite se u bazenu za hlađenje.",
      facts: ["Grijani bazen 25 m", "Finska sauna", "Parna kupelj", "Caldarium 40–50 °C", "Hidroterapijski bazeni", "Bazen za hlađenje"],
    },
    join: { title: ["Postanite", "član"], body: "Pitajte nas o članarini, prvoj posjeti ili obilasku kluba. Nazovite recepciju ili nam pišite – rado ćemo vam sve pokazati.", call: "Pozovite", email: "E-mail", membership: "Članarine" },
    hours: { label: "(04) Radno vrijeme", title: ["Radno", "vrijeme"], fallback: "Radno vrijeme kluba je u fazi potvrđivanja. Za današnje radno vrijeme nazovite {phone}." },
    membership: {
      meta: { title: "Članarine — Central Fitness Club", description: "Članarine u Central Fitness Clubu, Hotel Central Sarajevo: teretana na tri sprata, grupni treninzi, bazen od 25 metara, sauna, parna kupelj i caldarium." },
      hero: { eyebrow: "Central Fitness Club", title: ["Članarine"], intro: "Jedna članarina za teretanu, treninge i bazen." },
      includedLabel: "(01) Svaka članarina uključuje",
      included: ["Teretana na tri sprata", "Grupni treninzi u studiju", "Grijani bazen od 25 metara", "Finska sauna, parna kupelj i caldarium", "Hidroterapijski bazeni i bazen za hlađenje", "Savjeti naših trenera"],
      optionsLabel: "(02) Vrste članarina",
      pending: "Vrste članarina i cijene za narednu sezonu su u pripremi i bit će objavljene ovdje. Za aktuelne članarine i cijene nazovite nas ili nam pišite.",
      perPeriod: "za",
      enquire: "Upit za ovu članarinu",
    },
    timetableCopy: {
      meta: { title: "Raspored treninga — Central Fitness Club", description: "Mjesečni raspored grupnih treninga u Central Fitness Clubu, Hotel Central Sarajevo." },
      hero: { eyebrow: "Central Fitness Club", title: ["Raspored", "treninga"], intro: "Grupni treninzi za sve nivoe, svake sedmice." },
      label: "(01) Ovaj mjesec",
      pending: "Raspored za ovaj mjesec je u pripremi i bit će objavljen ovdje. Na recepciji provjerite koji su treninzi danas:",
      classesLabel: "Treninzi u klubu",
      days: ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"],
      noClasses: "Nema treninga",
    },
    footer: { part: "Central Fitness Club je dio Hotela Central Sarajevo.", back: "Nazad na Hotel Central" },
  },
};

export type ClubCopy = (typeof copy)["en"];
export const getClubCopy = (locale: Locale): ClubCopy => copy[locale];
