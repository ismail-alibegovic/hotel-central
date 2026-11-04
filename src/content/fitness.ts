import type { Locale } from "@/lib/i18n";

/**
 * Central Fitness Club — built-in, verified content (EN + BS).
 *
 * Sources (retrieved 2026-11-04): hotelcentral.ba /club-spa/, /club-spa/gym/, /club-spa/classes/, /club-spa/membership/,
 * /club-spa/results/, /club-spa/staff/, /club-spa/pool-spa/ and the FAQ (updated 2026-10-14), EN and BS. Logo and colours:
 * the club's own logo artwork supplied by the hotel. The older pages use the former name "West Wood Club & Spa"; the
 * current name (FAQ, Instagram @central.fitness.club) is used here.
 *
 * Deliberately NOT here, because the hotel publishes none: membership prices, membership types other than the annual
 * membership, class times, instructors and opening hours. Those are entered in the CMS ("Central Fitness Club") once
 * confirmed; until then the pages say so plainly instead of showing invented numbers.
 */

export const fitnessLinks = {
  instagram: "https://www.instagram.com/central.fitness.club/",
  instagramHandle: "@central.fitness.club",
} as const;

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof DAYS)[number];

/** One recurring class in the month's weekly timetable. Everything except day, start and name is optional. */
export type Session = { day: Day; start: string; end?: string; name: string; instructor?: string; studio?: string; note?: string };
export type Timetable = { month?: string; note?: string; sessions: Session[] };

export type MembershipPlan = { name: string; price?: string; period?: string; description?: string; includes: string[]; featured?: boolean };

const en = {
  meta: {
    home: { title: "Central Fitness Club", description: "Central Fitness Club at Hotel Central Sarajevo: a gym over three floors, group classes, a heated 25-metre pool, sauna, steam bath and caldarium. Memberships open to the public." },
    membership: { title: "Membership — Central Fitness Club", description: "Membership at Central Fitness Club, Hotel Central Sarajevo: what is included, member benefits and how to enquire." },
    timetable: { title: "Class timetable — Central Fitness Club", description: "The monthly group class timetable of Central Fitness Club at Hotel Central Sarajevo." },
  },
  nav: { home: "The club", membership: "Membership", timetable: "Timetable", enquire: "Enquire", label: "Central Fitness Club", back: "Hotel Central" },
  hero: {
    eyebrow: "Hotel Central · Sarajevo",
    title: ["Train in the", "heart of the city"],
    intro: "A fitness club with a heated 25-metre pool, in the middle of Sarajevo. Open to members from the city and to every hotel guest.",
    ctaPrimary: "Become a member",
    ctaSecondary: "See the timetable",
    stats: [
      { v: "3", k: "floors of training" },
      { v: "25 m", k: "heated pool" },
      { v: "20", k: "classes a week" },
    ],
  },
  intro: {
    label: "(01) The club",
    title: ["Everything you need,", "under one roof"],
    body: [
      "Central Fitness Club is a fitness club in its own right, inside Hotel Central. Membership is open to the public, and hotel guests can use the gym, the pool, the sauna and the steam rooms throughout their stay.",
      "Whether you are a complete beginner or train every day, our trainers and therapists help you start right and keep going.",
    ],
    points: [
      { k: "Members", v: "Open to the public" },
      { k: "Hotel guests", v: "Access included with every stay" },
      { k: "First visit", v: "One-to-one instruction" },
    ],
  },
  gym: {
    label: "(02) The gym",
    title: ["Three floors", "of equipment"],
    body: "Cardio and strength equipment over three floors and two air-conditioned fitness studios — for losing weight, toning up, getting stronger or simply staying active.",
    equipment: ["Treadmills (True Fitness)", "Climbers & steppers", "Bikes", "Rowers", "Ski machines", "Free weights", "Resistance machines (Matrix)", "Muscle-toning equipment"],
    support: {
      title: "Personal support",
      items: [
        "A private consultation with a qualified personal trainer on your first visit",
        "A personalised gym programme",
        "One-to-one instruction",
        "Results tracking every 10 visits",
        "A programme update every 20 visits",
      ],
    },
    photoNote: "Photographs of the gym floors will follow.",
  },
  pool: {
    label: "(03) Pool & wellness",
    title: ["Swim, heat,", "cool down"],
    body: "Swim lengths in the heated 25-metre pool, then move between the heat and the cold: Finnish sauna, steam bath, caldarium and the plunge pool.",
    facilities: [
      { k: "Pool", v: "Heated, 25 metres" },
      { k: "Sauna", v: "Finnish sauna" },
      { k: "Steam", v: "Steam bath" },
      { k: "Caldarium", v: "40–50 °C, heated benches" },
      { k: "Hydrotherapy", v: "Hydrotherapy pools" },
      { k: "Cool down", v: "Plunge pool" },
    ],
  },
  classes: {
    label: "(04) Group classes",
    title: ["Find your", "class"],
    body: "Around twenty group and fitness classes every week in the air-conditioned studio and the pool, for every age and every level — from a 15-minute abs class to a 40-minute circuit.",
    list: ["Yoga", "Pilates", "Body mix", "HIIT", "Kettlebell", "Muscle pump", "Aqua aerobic", "Circle training", "Indoor spinning", "Fat burning", "PT4 Pro", "Perfect swimming"],
    cta: "Monthly timetable",
  },
  programmes: {
    label: "(05) Programmes",
    title: ["Results-based", "programmes"],
    list: ["Start-right fitness plan for beginners", "60-day start-right weight-loss plan", "Six-week back-to-fitness plan", "Advanced body shaping", "Intensive fat burning", "Hip, tummy and thigh tone-up", "Summer shape-up", "Fitness for over 55s", "Scientific body building", "Injury rehabilitation", "Back care"],
  },
  membershipPreview: {
    label: "(06) Membership",
    title: ["Join the", "club"],
    body: "Membership includes the gym, the group classes, the pool and the wellness area, with personal programmes and regular progress checks.",
    cta: "Membership details",
  },
  timetablePreview: {
    label: "(07) Timetable",
    title: ["This month's", "classes"],
    body: "The class timetable is published monthly by the club team.",
    cta: "Open the timetable",
  },
  contact: {
    label: "(08) Get in touch",
    title: ["Book a", "private tour"],
    body: "Ask about membership, classes or a visit to the club. Call us, send an e-mail or message us on Instagram.",
    call: "Call",
    email: "E-mail",
    instagram: "Instagram",
    subject: "Central Fitness Club — membership enquiry",
    address: "Inside Hotel Central · Ćumurija 8, 71000 Sarajevo",
  },
  membership: {
    hero: { eyebrow: "Central Fitness Club", title: ["Member-", "ship"], intro: "Full access to the club's fitness, pool and relaxation facilities, with the professional advice you need to see results." },
    optionsLabel: "(01) Membership options",
    optionsTitle: ["Choose how", "you train"],
    priceOnRequest: "Price on request",
    pricingPending: "Membership prices are being confirmed by the club and will be published here. Until then, please ask us for current prices.",
    benefitsLabel: "(02) Member benefits",
    benefitsTitle: ["What members", "enjoy"],
    benefits: [
      "Free personalised gym programmes",
      "Free one-to-one instruction on your first visit",
      "Free results tracking every 10 visits",
      "Free programme updates every 20 visits",
      "Around 20 fitness and group classes every week",
      "Treadmills by True Fitness and body-shaping equipment by Matrix",
      "Free weights and specialised muscle-toning equipment",
    ],
    includedLabel: "(03) Included facilities",
    included: [
      { k: "Gym", v: "Cardio and strength over three floors" },
      { k: "Classes", v: "Air-conditioned group exercise studio" },
      { k: "Pool", v: "Heated 25-metre swimming pool" },
      { k: "Heat", v: "Finnish sauna · steam bath · caldarium" },
      { k: "Water", v: "Hydrotherapy pools · plunge pool" },
    ],
    enquireTitle: ["Enquire about", "membership"],
    enquireBody: "Tell us how you like to train and we will recommend the right membership and arrange a private tour.",
  },
  timetable: {
    hero: { eyebrow: "Central Fitness Club", title: ["Class", "timetable"], intro: "Group and fitness classes in the studio and the pool, every week of the month." },
    month: "Timetable",
    days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
    short: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" },
    noClasses: "No classes",
    emptyTitle: "This month's timetable is on its way",
    emptyBody: "The club team publishes the class timetable here every month. Until then, call us or message us on Instagram for this week's classes.",
    classesTitle: "Classes at the club",
    instructor: "Instructor",
    studio: "Studio",
  },
  imageAlt: {
    hero: "The 25-metre pool of Central Fitness Club with its wave mosaic",
    pool1: "Swimming lanes of the 25-metre pool",
    pool2: "Curved hydrotherapy pool with tiled benches",
    pool3: "Guests relaxing in the hydrotherapy pool",
    pool4: "The pool hall with mosaic walls",
  },
};

export type FitnessContent = typeof en;

const bs: FitnessContent = {
  meta: {
    home: { title: "Central Fitness Club", description: "Central Fitness Club u Hotelu Central Sarajevo: teretana na tri sprata, grupni treninzi, grijani bazen od 25 metara, sauna, parna kupelj i caldarium. Članstvo otvoreno za sve." },
    membership: { title: "Članstvo — Central Fitness Club", description: "Članstvo u Central Fitness Clubu, Hotel Central Sarajevo: šta je uključeno, pogodnosti za članove i kako poslati upit." },
    timetable: { title: "Raspored treninga — Central Fitness Club", description: "Mjesečni raspored grupnih treninga u Central Fitness Clubu, Hotel Central Sarajevo." },
  },
  nav: { home: "Klub", membership: "Članstvo", timetable: "Raspored", enquire: "Upit", label: "Central Fitness Club", back: "Hotel Central" },
  hero: {
    eyebrow: "Hotel Central · Sarajevo",
    title: ["Trening u", "srcu grada"],
    intro: "Fitness klub sa grijanim bazenom od 25 metara, u samom centru Sarajeva. Otvoren za članove iz grada i za sve goste hotela.",
    ctaPrimary: "Postanite član",
    ctaSecondary: "Pogledajte raspored",
    stats: [
      { v: "3", k: "sprata za trening" },
      { v: "25 m", k: "grijani bazen" },
      { v: "20", k: "treninga sedmično" },
    ],
  },
  intro: {
    label: "(01) Klub",
    title: ["Sve što vam treba,", "na jednom mjestu"],
    body: [
      "Central Fitness Club je samostalni fitness klub u sklopu Hotela Central. Članstvo je otvoreno za sve, a gosti hotela tokom cijelog boravka koriste teretanu, bazen, saunu i parna kupatila.",
      "Bilo da tek počinjete ili trenirate svaki dan, naši treneri i terapeuti pomoći će vam da krenete pravilno i istrajete.",
    ],
    points: [
      { k: "Članovi", v: "Otvoreno za sve" },
      { k: "Gosti hotela", v: "Pristup uključen u svaki boravak" },
      { k: "Prva posjeta", v: "Individualne upute" },
    ],
  },
  gym: {
    label: "(02) Teretana",
    title: ["Tri sprata", "opreme"],
    body: "Kardio i oprema za snagu na tri sprata i u dva klimatizirana fitness studija — za mršavljenje, oblikovanje tijela, jačanje ili jednostavno aktivan život.",
    equipment: ["Trake za trčanje (True Fitness)", "Stepperi i penjalice", "Bicikli", "Veslačke sprave", "Ski sprave", "Slobodni tegovi", "Sprave za snagu (Matrix)", "Oprema za toniranje mišića"],
    support: {
      title: "Lična podrška",
      items: [
        "Privatne konsultacije sa kvalifikovanim ličnim trenerom pri prvoj posjeti",
        "Personalizovani program treninga",
        "Individualne upute",
        "Praćenje rezultata svakih 10 posjeta",
        "Novi program svakih 20 posjeta",
      ],
    },
    photoNote: "Fotografije teretane slijede uskoro.",
  },
  pool: {
    label: "(03) Bazen i wellness",
    title: ["Plivanje, toplina,", "osvježenje"],
    body: "Plivajte u grijanom bazenu od 25 metara, a zatim se prepustite toplini i hladnoći: finska sauna, parna kupelj, caldarium i bazen za hlađenje.",
    facilities: [
      { k: "Bazen", v: "Grijani, 25 metara" },
      { k: "Sauna", v: "Finska sauna" },
      { k: "Para", v: "Parna kupelj" },
      { k: "Caldarium", v: "40–50 °C, grijane klupe" },
      { k: "Hidroterapija", v: "Hidroterapijski bazeni" },
      { k: "Hlađenje", v: "Bazen za hlađenje" },
    ],
  },
  classes: {
    label: "(04) Grupni treninzi",
    title: ["Pronađite", "svoj trening"],
    body: "Dvadesetak grupnih i fitness treninga svake sedmice u klimatiziranom studiju i bazenu, za sve uzraste i sve nivoe — od petnaestominutnog treninga za trbušnjake do kružnog treninga od 40 minuta.",
    list: ["Joga", "Pilates", "Body mix", "HIIT", "Kettlebell", "Muscle pump", "Aqua aerobik", "Kružni trening", "Indoor spinning", "Fat burning", "PT4 Pro", "Perfect swimming"],
    cta: "Mjesečni raspored",
  },
  programmes: {
    label: "(05) Programi",
    title: ["Programi usmjereni", "na rezultate"],
    list: ["Program za početnike", "60-dnevni program mršavljenja", "Šestosedmični povratak u formu", "Napredno oblikovanje tijela", "Intenzivno sagorijevanje masti", "Oblikovanje kukova, stomaka i butina", "Priprema za ljeto", "Fitness za osobe starije od 55 godina", "Naučni body building", "Rehabilitacija nakon povreda", "Njega leđa"],
  },
  membershipPreview: {
    label: "(06) Članstvo",
    title: ["Postanite", "član"],
    body: "Članstvo uključuje teretanu, grupne treninge, bazen i wellness, uz lične programe i redovno praćenje napretka.",
    cta: "Detalji članstva",
  },
  timetablePreview: {
    label: "(07) Raspored",
    title: ["Treninzi", "ovog mjeseca"],
    body: "Raspored treninga tim kluba objavljuje svaki mjesec.",
    cta: "Otvorite raspored",
  },
  contact: {
    label: "(08) Kontakt",
    title: ["Zakažite", "obilazak"],
    body: "Pitajte nas o članstvu, treninzima ili posjeti klubu. Nazovite nas, pošaljite e-mail ili poruku na Instagramu.",
    call: "Pozovite",
    email: "E-mail",
    instagram: "Instagram",
    subject: "Central Fitness Club — upit za članstvo",
    address: "U Hotelu Central · Ćumurija 8, 71000 Sarajevo",
  },
  membership: {
    hero: { eyebrow: "Central Fitness Club", title: ["Član-", "stvo"], intro: "Potpun pristup fitness sadržajima, bazenu i prostoru za opuštanje, uz stručne savjete koji vode do rezultata." },
    optionsLabel: "(01) Vrste članstva",
    optionsTitle: ["Odaberite kako", "trenirate"],
    priceOnRequest: "Cijena na upit",
    pricingPending: "Klub upravo potvrđuje cijene članarina, koje će biti objavljene ovdje. Do tada nas slobodno pitajte za aktuelne cijene.",
    benefitsLabel: "(02) Pogodnosti za članove",
    benefitsTitle: ["Šta članovi", "dobijaju"],
    benefits: [
      "Besplatni personalizovani programi treninga",
      "Besplatne individualne upute pri prvoj posjeti",
      "Besplatno praćenje rezultata svakih 10 posjeta",
      "Besplatno ažuriranje programa svakih 20 posjeta",
      "Dvadesetak fitness i grupnih treninga sedmično",
      "Trake za trčanje True Fitness i oprema za oblikovanje tijela Matrix",
      "Slobodni tegovi i specijalizovana oprema za toniranje mišića",
    ],
    includedLabel: "(03) Uključeni sadržaji",
    included: [
      { k: "Teretana", v: "Kardio i snaga na tri sprata" },
      { k: "Treninzi", v: "Klimatizirani studio za grupne treninge" },
      { k: "Bazen", v: "Grijani bazen od 25 metara" },
      { k: "Toplina", v: "Finska sauna · parna kupelj · caldarium" },
      { k: "Voda", v: "Hidroterapijski bazeni · bazen za hlađenje" },
    ],
    enquireTitle: ["Upit za", "članstvo"],
    enquireBody: "Recite nam kako volite trenirati, a mi ćemo vam preporučiti pravo članstvo i dogovoriti obilazak kluba.",
  },
  timetable: {
    hero: { eyebrow: "Central Fitness Club", title: ["Raspored", "treninga"], intro: "Grupni i fitness treninzi u studiju i bazenu, svake sedmice u mjesecu." },
    month: "Raspored",
    days: { mon: "Ponedjeljak", tue: "Utorak", wed: "Srijeda", thu: "Četvrtak", fri: "Petak", sat: "Subota", sun: "Nedjelja" },
    short: { mon: "Pon", tue: "Uto", wed: "Sri", thu: "Čet", fri: "Pet", sat: "Sub", sun: "Ned" },
    noClasses: "Nema treninga",
    emptyTitle: "Raspored za ovaj mjesec je u pripremi",
    emptyBody: "Tim kluba ovdje svaki mjesec objavljuje raspored treninga. Do tada nas nazovite ili nam pišite na Instagramu za treninge ove sedmice.",
    classesTitle: "Treninzi u klubu",
    instructor: "Instruktor",
    studio: "Studio",
  },
  imageAlt: {
    hero: "Bazen od 25 metara u Central Fitness Clubu sa mozaikom talasa",
    pool1: "Plivačke staze bazena od 25 metara",
    pool2: "Zakrivljeni hidroterapijski bazen sa klupama od pločica",
    pool3: "Gosti se opuštaju u hidroterapijskom bazenu",
    pool4: "Prostor bazena sa zidovima od mozaika",
  },
};

export function getFitness(locale: Locale): FitnessContent {
  return locale === "bs" ? bs : en;
}

/** Built-in membership options: only what the hotel publishes (an annual membership; access included for hotel guests). */
export function builtInPlans(locale: Locale): MembershipPlan[] {
  return locale === "bs"
    ? [
        { name: "Godišnje članstvo", description: "Godišnje članstvo za fitness klub i Day Spa.", includes: ["Teretana i grupni treninzi", "Bazen, sauna i parna kupatila", "Personalizovani programi i praćenje rezultata"], featured: true },
        { name: "Gosti hotela", price: "Uključeno u boravak", description: "Za vrijeme boravka u Hotelu Central.", includes: ["Teretana", "Bazen od 25 metara", "Sauna i parna kupatila"] },
      ]
    : [
        { name: "Annual membership", description: "Annual membership of the fitness club and the Day Spa.", includes: ["Gym and group classes", "Pool, sauna and steam rooms", "Personal programmes and results tracking"], featured: true },
        { name: "Hotel guests", price: "Included with your stay", description: "Throughout your stay at Hotel Central.", includes: ["Gym", "25-metre pool", "Sauna and steam rooms"] },
      ];
}

/** Built-in timetable: empty on purpose — no class times are published. The CMS fills it. */
export const builtInTimetable: Timetable = { sessions: [] };
