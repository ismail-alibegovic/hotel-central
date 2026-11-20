import type { Locale } from "@/lib/i18n";

/**
 * Central Fitness Club — built-in content (shown when the CMS is off, empty or unreachable; the "Central Fitness Club"
 * global overrides memberships and the timetable). Facts come from the hotel's own pages (hotelcentral.ba/club-spa,
 * /membership, /pool-spa): a gym over three floors, a heated 25-metre pool, Finnish sauna, steam bath, caldarium
 * (40–50 °C), hydrotherapy and plunge pools, about 20 group classes a week, free one-to-one instruction and programmes.
 * Membership prices are not published anywhere, so none are invented: plans show "price on request" until staff add one.
 */

/** The club's Instagram address, once the hotel confirms it (shown in the footer and timetable only when set). */
export const CLUB_INSTAGRAM: string | undefined = undefined;

export type ClubPlan = { name: string; price?: string; period?: string; features: string[]; highlight?: boolean };
export type ClubClass = { day: number; time: string; name: string; duration?: string; room?: string; trainer?: string };

/** The group classes the club currently takes bookings for in Lime Booking (checked 2026-11-20). */
export const classTypes = ["Functional Strength", "HIIT", "Glute Attack", "Tabata", "Body Balance", "Core Control", "Aqua Aerobic", "Full Body Circuit", "Yoga", "Kettlebell Combo", "Kettlebells", "Strong & Lean", "Total Body Sculpt", "Full Body Burn"];

/** Online booking for group classes and personal programmes (link in the club's Instagram bio); /en/ is swapped for /bs/. */
export const CLUB_BOOKING_URL = "https://form.lime-booking.com/en/Fitness%20Central%20Sarajevo/service";

const copy = {
  en: {
    meta: {
      title: "Central Fitness Club",
      description: "A gym over three floors, a heated 25-metre pool, sauna, steam bath and caldarium, and about 20 group classes a week at Central Fitness Club, Hotel Central Sarajevo.",
      membershipTitle: "Membership — Central Fitness Club",
      membershipDescription: "Membership at Central Fitness Club, Hotel Central Sarajevo: gym, group classes, pool and saunas, with free personal programmes.",
      timetableTitle: "Class timetable — Central Fitness Club",
      timetableDescription: "This week's group classes at Central Fitness Club, Hotel Central Sarajevo: yoga, pilates, HIIT, kettlebell, aqua aerobic and more.",
    },
    nav: { club: "The club", pool: "Pool & saunas", classes: "Classes", membership: "Membership", timetable: "Timetable", contact: "Contact", hotel: "Hotel Central", join: "Become a member", menu: "Menu", close: "Close", language: "Language" },
    hero: { eyebrow: "Strength · Conditioning · Community", title: "Central Fitness Club", tagline: "Feel your power", body: "A gym over three floors, a heated 25-metre pool and saunas, in the middle of Sarajevo.", call: "Call the club" },
    intro: { eyebrow: "Our club", title: "Everything you need, under one roof", body: "The latest cardio and strength equipment, group classes, a pool, saunas and a steam bath for recovery. Whether you are a complete beginner or train every day, our trainers make you feel at home from the first visit." },
    stats: [
      { big: "3", label: "floors of gym" },
      { big: "25 m", label: "heated pool" },
      { big: "20", label: "group classes a week" },
      { big: "5", label: "heat and water zones" },
    ],
    spaces: {
      title: ["Train your way,", "every day"],
      body: "Cardio and strength on three floors, a studio for group classes and a pool for long lengths. Every new member starts with free one-to-one instruction.",
      cta: "See membership",
      cards: [
        { title: "Gym", body: "True treadmills, StairMaster, Matrix machines and free weights over three floors." },
        { title: "Group classes", body: "Yoga, pilates, HIIT, kettlebell, spinning and more, about 20 a week." },
        { title: "25 m pool", body: "A heated pool with hydrotherapy jets and benches." },
        { title: "Personal training", body: "A free personal programme, results tracking every 10 visits." },
      ],
    },
    benefits: {
      eyebrow: "For every member",
      title: "Results, with someone beside you",
      items: [
        "Free one-to-one instruction on your first visit",
        "A free personal gym programme",
        "Free results tracking every 10 visits",
        "A free programme update every 20 visits",
        "About 20 group classes every week",
        "The pool, sauna, steam bath and caldarium",
      ],
    },
    pool: {
      eyebrow: "Pool & spa zone",
      title: "After training, or instead of it",
      body: "Swim lengths in the heated 25-metre pool, then move between heat and cold. Treatments are next door at Central Day Spa.",
      zones: [
        { name: "Heated pool, 25 m", body: "Lanes for swimming, benches and hydrotherapy jets." },
        { name: "Finnish sauna", body: "Dry heat on wooden benches." },
        { name: "Steam bath", body: "Warm, humid air that opens the lungs." },
        { name: "Caldarium", body: "A gentle sauna at 40–50 °C with heated benches." },
        { name: "Hydrotherapy pools", body: "Water jets that ease aches and pains." },
        { name: "Plunge pool", body: "A cold dip after the sauna." },
      ],
      spa: "Central Day Spa",
    },
    classes: { eyebrow: "Group classes", title: "Find the class that suits you", body: "In the air-conditioned studio, for every age and every level.", cta: "See the timetable" },
    join: { eyebrow: "Membership", title: "Join the club", body: "Annual membership gives you the club and Central Day Spa. Call us to book a free tour of the club.", cta: "Membership", call: "Book a tour" },
    footer: { address: "Address", contact: "Contact", hours: "Opening hours", hoursFallback: "Call us for today's hours.", follow: "Follow us", also: "Also at Hotel Central", spa: "Central Day Spa", hotel: "Hotel Central Sarajevo", title: ["Questions?", "Write to us"], write: "Contact", rights: "Central Fitness Club is part of Hotel Central Sarajevo." },
    membership: {
      eyebrow: "Membership",
      title: "Membership",
      body: "One membership for the gym, group classes, the pool and the saunas. Prices are given at reception or by phone.",
      plansTitle: "Choose your membership",
      onRequest: "Price on request",
      ask: "Ask about this plan",
      defaultPlans: [
        { name: "Annual membership", features: ["Full access to the club and Central Day Spa", "Gym, group classes, pool and saunas", "Free personal programme and results tracking"], highlight: true },
        { name: "Student membership", features: ["For students with a valid student card", "Gym, group classes, pool and saunas", "Ask at reception for the current price"] },
      ] as ClubPlan[],
      benefitsTitle: "Included with every membership",
      tourTitle: "Come and see the club",
      tourBody: "Book a free tour and a first one-to-one session with a trainer.",
    },
    timetable: {
      eyebrow: "Timetable",
      title: "Class timetable",
      body: "Group classes in the studio and in the pool. Places are limited, so come a few minutes early.",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      emptyTitle: "This month's timetable is on its way",
      emptyBody: "Call us or ask at reception for this week's classes.",
      typesTitle: "Classes at the club",
      download: "Open the timetable",
      instagram: "Instagram",
      noClasses: "No classes",
    },
  },
  bs: {
    meta: {
      title: "Central Fitness Club",
      description: "Teretana na tri sprata, grijani bazen od 25 metara, sauna, parno kupatilo i caldarium te oko 20 grupnih časova sedmično u Central Fitness Clubu, Hotel Central Sarajevo.",
      membershipTitle: "Članarine — Central Fitness Club",
      membershipDescription: "Članarine u Central Fitness Clubu, Hotel Central Sarajevo: teretana, grupni časovi, bazen i saune, uz besplatne personalizirane programe.",
      timetableTitle: "Raspored časova — Central Fitness Club",
      timetableDescription: "Grupni časovi ove sedmice u Central Fitness Clubu, Hotel Central Sarajevo: yoga, pilates, HIIT, kettlebell, aqua aerobik i drugi.",
    },
    nav: { club: "Klub", pool: "Bazen i saune", classes: "Časovi", membership: "Članarine", timetable: "Raspored", contact: "Kontakt", hotel: "Hotel Central", join: "Postani član", menu: "Meni", close: "Zatvori", language: "Jezik" },
    hero: { eyebrow: "Snaga · Kondicija · Zajednica", title: "Central Fitness Club", tagline: "Feel your power", body: "Teretana na tri sprata, grijani bazen od 25 metara i saune, u srcu Sarajeva.", call: "Pozovite klub" },
    intro: { eyebrow: "Naš klub", title: "Sve što vam treba, pod jednim krovom", body: "Najnovija kardio i oprema za snagu, grupni časovi, bazen, saune i parno kupatilo za oporavak. Bilo da tek počinjete ili trenirate svaki dan, naši treneri će se pobrinuti da se osjećate kao kod kuće od prvog dolaska." },
    stats: [
      { big: "3", label: "sprata teretane" },
      { big: "25 m", label: "grijani bazen" },
      { big: "20", label: "grupnih časova sedmično" },
      { big: "5", label: "zona toplote i vode" },
    ],
    spaces: {
      title: ["Trenirajte na svoj način,", "svaki dan"],
      body: "Kardio i snaga na tri sprata, sala za grupne časove i bazen za duge dužine. Svaki novi član počinje besplatnim individualnim uputama.",
      cta: "Pogledaj članarine",
      cards: [
        { title: "Teretana", body: "True trake, StairMaster, Matrix sprave i slobodni tegovi na tri sprata." },
        { title: "Grupni časovi", body: "Yoga, pilates, HIIT, kettlebell, spinning i drugi, oko 20 sedmično." },
        { title: "Bazen 25 m", body: "Grijani bazen s hidromasažnim mlazovima i klupama." },
        { title: "Personalni trening", body: "Besplatan personalizirani program i praćenje rezultata svakih 10 dolazaka." },
      ],
    },
    benefits: {
      eyebrow: "Za svakog člana",
      title: "Rezultati, uz nekoga pored vas",
      items: [
        "Besplatne individualne upute pri prvom dolasku",
        "Besplatan personalizirani program treninga",
        "Besplatno praćenje rezultata svakih 10 dolazaka",
        "Besplatno ažuriranje programa svakih 20 dolazaka",
        "Oko 20 grupnih časova svake sedmice",
        "Bazen, sauna, parno kupatilo i caldarium",
      ],
    },
    pool: {
      eyebrow: "Pool & spa zona",
      title: "Poslije treninga, ili umjesto njega",
      body: "Plivajte u grijanom bazenu od 25 metara, a zatim se prepustite toploti i hladnoći. Tretmani su odmah do, u Central Day Spa.",
      zones: [
        { name: "Grijani bazen, 25 m", body: "Staze za plivanje, klupe i hidromasažni mlazovi." },
        { name: "Finska sauna", body: "Suha toplota na drvenim klupama." },
        { name: "Parno kupatilo", body: "Topao, vlažan zrak koji otvara pluća." },
        { name: "Caldarium", body: "Blaga sauna na 40–50 °C s grijanim klupama." },
        { name: "Hidromasažni bazeni", body: "Mlazovi vode koji opuštaju mišiće." },
        { name: "Bazen za hlađenje", body: "Hladno osvježenje nakon saune." },
      ],
      spa: "Central Day Spa",
    },
    classes: { eyebrow: "Grupni časovi", title: "Pronađite čas koji vam odgovara", body: "U klimatiziranoj sali, za sve uzraste i sve nivoe.", cta: "Pogledaj raspored" },
    join: { eyebrow: "Članarine", title: "Postanite član", body: "Godišnja članarina uključuje klub i Central Day Spa. Pozovite nas i zakažite besplatan obilazak kluba.", cta: "Članarine", call: "Zakaži obilazak" },
    footer: { address: "Adresa", contact: "Kontakt", hours: "Radno vrijeme", hoursFallback: "Pozovite nas za današnje radno vrijeme.", follow: "Pratite nas", also: "Također u Hotelu Central", spa: "Central Day Spa", hotel: "Hotel Central Sarajevo", title: ["Imate pitanja?", "Pišite nam"], write: "Kontakt", rights: "Central Fitness Club je dio Hotela Central Sarajevo." },
    membership: {
      eyebrow: "Članarine",
      title: "Članarine",
      body: "Jedna članarina za teretanu, grupne časove, bazen i saune. Cijene dobijate na recepciji ili telefonom.",
      plansTitle: "Izaberite članarinu",
      onRequest: "Cijena na upit",
      ask: "Pitajte za ovu članarinu",
      defaultPlans: [
        { name: "Godišnja članarina", features: ["Puni pristup klubu i Central Day Spa", "Teretana, grupni časovi, bazen i saune", "Besplatan personalizirani program i praćenje rezultata"], highlight: true },
        { name: "Studentska članarina", features: ["Za studente s važećim indeksom", "Teretana, grupni časovi, bazen i saune", "Aktuelnu cijenu saznajte na recepciji"] },
      ] as ClubPlan[],
      benefitsTitle: "Uključeno u svaku članarinu",
      tourTitle: "Dođite i upoznajte klub",
      tourBody: "Zakažite besplatan obilazak i prvi individualni trening s trenerom.",
    },
    timetable: {
      eyebrow: "Raspored",
      title: "Raspored časova",
      body: "Grupni časovi u sali i u bazenu. Broj mjesta je ograničen, pa dođite nekoliko minuta ranije.",
      days: ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"],
      short: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
      emptyTitle: "Raspored za ovaj mjesec stiže uskoro",
      emptyBody: "Pozovite nas ili pitajte na recepciji za časove ove sedmice.",
      typesTitle: "Časovi u klubu",
      download: "Otvori raspored",
      instagram: "Instagram",
      noClasses: "Nema časova",
    },
  },
};

export type ClubCopy = (typeof copy)["en"];
export const clubCopy = (locale: Locale): ClubCopy => copy[locale];

/** Photographs from the hotel's 2026 shoot (Drive folders "GYM images" and "HOTEL images" for the pool). */
export const clubImages = {
  hero: { src: "/images/club/feel-your-power.jpg", alt: "A member on the elliptical trainer under the Feel Your Power wall", position: "50% 38%" },
  intro: { src: "/images/club/sunday-running-club.jpg", alt: "A member on the treadmill by a window over the rooftops", position: "50% 45%" },
  cards: [
    { src: "/images/club/treadmill.jpg", alt: "Running on a treadmill in the cardio room", position: "50% 40%" },
    { src: "/images/club/studio-stretch.jpg", alt: "Stretching in the group exercise studio", position: "50% 55%" },
    { src: "/images/club/pool-lanes.jpg", alt: "The heated 25-metre pool with its mosaic columns", position: "50% 55%" },
    { src: "/images/club/split.jpg", alt: "A smiling member stretching on a mat in the studio", position: "50% 45%" },
  ],
  benefits: { src: "/images/club/spin-window.jpg", alt: "A member on an indoor bike by the window, with the old town outside", position: "50% 45%" },
  pool: { src: "/images/club/pool-jets.jpg", alt: "Hydrotherapy jets in the club's pool", position: "50% 60%" },
  sauna: { src: "/images/club/sauna.jpg", alt: "The Finnish sauna behind a glass door", position: "50% 50%" },
  classes: { src: "/images/club/kettlebells-rooftops.jpg", alt: "Kettlebells lined up by a window over the rooftops", position: "50% 55%" },
  join: { src: "/images/club/bottles.jpg", alt: "Central Fitness Club water bottles", position: "50% 55%" },
  membershipHero: { src: "/images/club/member-tshirt.jpg", alt: "A member in a Central Fitness Club T-shirt with a club bottle", position: "50% 40%" },
  timetableHero: { src: "/images/club/studio.jpg", alt: "The group exercise studio with gym balls and mats", position: "50% 55%" },
  gallery: [
    { src: "/images/club/running.jpg", alt: "A member running on a treadmill" },
    { src: "/images/club/strength-floor.jpg", alt: "The strength floor with plate-loaded machines" },
    { src: "/images/club/kettlebells.jpg", alt: "Kettlebells, sandbags and plates by the windows" },
    { src: "/images/club/pool-bench.jpg", alt: "Curved mosaic benches in the pool" },
    { src: "/images/club/stairs.jpg", alt: "A member walking down the stairs to an arched window" },
    { src: "/images/club/dumbbells.jpg", alt: "Coloured dumbbells on a rack" },
    { src: "/images/club/foam-roller.jpg", alt: "A member on a foam roller in the studio" },
    { src: "/images/club/bottle-tshirt.jpg", alt: "A club bottle and T-shirt" },
  ],
};
