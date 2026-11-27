import type { Locale } from "@/lib/i18n";

/**
 * Central Fitness Club — built-in content (shown when the CMS is off, empty or unreachable; the "Central Fitness Club"
 * global overrides memberships and the timetable). Facts come from the hotel's own pages (hotelcentral.ba/club-spa,
 * /membership, /pool-spa): a gym over three floors, free one-to-one instruction and programmes.
 * Client change list of 26.11.2026 (CH-043–CH-048): the pool area is a 25-metre pool with hydrotherapy jets, a sauna, a
 * steam room and a plunge pool (a new recovery experience is coming soon); memberships are 135 KM (full) and 90 KM
 * (student); the weekly timetable and the class descriptions are the club's own (Drive: "Timetable", "class description").
 */

/** The club's Instagram profile (footer, timetable). */
export const CLUB_INSTAGRAM: string | undefined = "https://www.instagram.com/central.fitness.club/";

export type ClubPlan = { name: string; price?: string; period?: string; features: string[]; highlight?: boolean };
export type ClubClass = { day: number; time: string; name: string; duration?: string; room?: string; trainer?: string };

/**
 * CH-043: the club's own class descriptions (Drive, "class description.png", 26.11.2026), English and Bosnian as
 * written by the club. Classes on the timetable that have no description yet show their name only.
 */
export type ClassInfo = { name: string; minutes?: number; about?: { en: string; bs: string } };
export const classInfo: ClassInfo[] = [
  { name: "Functional Strength", minutes: 60, about: { en: "A strength-based workout built on functional movements to improve stability, coordination and everyday strength.", bs: "Trening snage baziran na funkcionalnim pokretima koji poboljšavaju stabilnost, koordinaciju i svakodnevnu snagu tijela." } },
  { name: "HIIT", minutes: 30, about: { en: "High-intensity interval training with short rest periods to boost fitness and burn calories fast.", bs: "Visoko intenzivan intervalni trening sa kratkim pauzama za brzo sagorijevanje kalorija i poboljšanje kondicije." } },
  { name: "Glute Attack", minutes: 30, about: { en: "An intense lower-body workout targeting glute activation and strength. Designed for shaping, power and muscle connection.", bs: "Intenzivan trening fokusiran na aktivaciju i jačanje gluteusa. Cilj je oblikovanje, snaga i bolja konekcija mišića." } },
  { name: "Tabata", minutes: 45, about: { en: "A structured interval workout using short bursts (20 s work / 10 s rest). Fast, efficient and challenging.", bs: "Intervalni trening u kratkim, intenzivnim blokovima (20 s rad / 10 s pauza). Brz, efikasan i izazovan." } },
  { name: "Body Balance", minutes: 45, about: { en: "Inspired by yoga and Pilates, focused on flexibility, stability and posture.", bs: "Inspirisan jogom i pilatesom, fokusiran na fleksibilnost, stabilnost i držanje tijela." } },
  { name: "Core Control", minutes: 30, about: { en: "A focused session targeting core strength, stability and control. Perfect as a complement to other workouts.", bs: "Fokusirani trening za jačanje core-a, stabilnost i kontrolu pokreta. Idealan kao dodatak drugim treninzima." } },
  { name: "Aqua Aerobic", minutes: 30, about: { en: "A low-impact water workout. Gentle on joints while improving fitness and calorie burn.", bs: "Nježan, ali efikasan trening u vodi. Idealan za zglobove, kondiciju i sagorijevanje kalorija." } },
  { name: "Full Body Circuit", minutes: 60, about: { en: "A circuit-style workout combining strength and cardio for maximum results in minimal time. High intensity, full-body.", bs: "Kružni trening koji kombinuje snagu i kardio za maksimalne rezultate u kratkom vremenu. Visok intenzitet, cijelo tijelo." } },
  { name: "Yoga", minutes: 60, about: { en: "A calming blend of stretching, breathing and strength to improve flexibility, balance and focus.", bs: "Kombinacija istezanja, disanja i snage za fleksibilnost, balans i mentalni fokus." } },
  { name: "Kettlebell Combo", minutes: 30, about: { en: "A kettlebell-based workout combining strength, power and coordination for full-body activation.", bs: "Trening sa girjama koji kombinuje snagu, eksplozivnost i koordinaciju za aktivaciju cijelog tijela." } },
  { name: "Strong & Lean", minutes: 30, about: { en: "A fast-paced workout designed to tone and define. A mix of strength and controlled movements for a lean, strong look.", bs: "Brzi trening za tonus i definiciju. Kombinacija snage i kontrolisanih pokreta za izdužen i snažan izgled." } },
  { name: "Pilates" },
  { name: "Full Body Sculpt" },
  { name: "Total Body Sculpt" },
  { name: "Body Attack" },
  { name: "Full Body Burn" },
  { name: "Kettlebells" },
];
/** Names of every class the club runs (chips on the club home page). */
export const classTypes = classInfo.map((c) => c.name);

/** CH-043: the club's current weekly timetable (Drive, "Timetable Sept 2026"); 0 = Monday. Staff can replace it in the CMS. */
const minutes = (name: string) => classInfo.find((c) => c.name === name)?.minutes;
const cls = (day: number, time: string, name: string): ClubClass => ({ day, time, name, ...(minutes(name) ? { duration: `${minutes(name)} min` } : {}) });
export const defaultClasses: ClubClass[] = [
  cls(0, "09:30", "Full Body Sculpt"), cls(0, "19:00", "Functional Strength"),
  cls(1, "08:00", "Pilates"), cls(1, "09:30", "Body Attack"), cls(1, "19:00", "Glute Attack"),
  cls(2, "09:30", "Full Body Burn"), cls(2, "19:00", "HIIT"), cls(2, "19:30", "Kettlebell Combo"),
  cls(3, "09:30", "Tabata"), cls(3, "19:00", "Glute Attack"), cls(3, "19:30", "Core Control"),
  cls(4, "09:30", "Strong & Lean"), cls(4, "19:00", "Full Body Circuit"),
  cls(5, "10:30", "Aqua Aerobic"), cls(5, "12:00", "Total Body Sculpt"), cls(5, "12:30", "Yoga"),
  cls(6, "09:30", "Pilates"), cls(6, "10:30", "Full Body Burn"), cls(6, "11:00", "Kettlebells"),
];

/** Online booking for group classes and personal programmes (link in the club's Instagram bio); /en/ is swapped for /bs/. */
export const CLUB_BOOKING_URL = "https://form.lime-booking.com/en/Fitness%20Central%20Sarajevo/service";

const copy = {
  en: {
    meta: {
      title: "Central Fitness Club",
      description: "A gym over three floors, a heated 25-metre pool with hydrotherapy jets, a sauna, a steam room and a plunge pool, and about 20 group classes a week at Central Fitness Club, Hotel Central Sarajevo.",
      membershipTitle: "Membership — Central Fitness Club",
      membershipDescription: "Membership at Central Fitness Club, Hotel Central Sarajevo: full membership 135 KM, student membership 90 KM. Gym, all group classes, pool, sauna and steam room, with free personal programmes.",
      timetableTitle: "Classes & timetable — Central Fitness Club",
      timetableDescription: "The weekly group class timetable at Central Fitness Club, Hotel Central Sarajevo, and what each class is: functional strength, HIIT, Tabata, pilates, yoga, aqua aerobic, kettlebells and more.",
    },
    nav: { club: "The club", pool: "Pool & sauna", classes: "Classes", membership: "Membership", timetable: "Timetable", contact: "Contact", hotel: "Hotel Central", join: "Become a member", menu: "Menu", close: "Close", language: "Language" },
    hero: { eyebrow: "Strength · Conditioning · Community", title: "Central Fitness Club", tagline: "Feel your power", body: "A gym over three floors, a heated 25-metre pool, a sauna and a steam room, in the middle of Sarajevo.", call: "Call the club" },
    intro: { eyebrow: "Our club", title: "Everything you need, under one roof", body: "The latest cardio and strength equipment, group classes, a pool, a sauna and a steam room for recovery. Whether you are a complete beginner or train every day, our trainers make you feel at home from the first visit." },
    stats: [
      { big: "3", label: "floors of gym" },
      { big: "25 m", label: "heated pool" },
      { big: "20", label: "group classes a week" },
      { big: "4", label: "pool, sauna, steam & plunge" },
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
        "Access to all group classes weekly",
        "Access to our pool, sauna and steam room",
        "Members-only specials at Central Day Spa",
      ],
    },
    pool: {
      eyebrow: "Pool & spa zone",
      title: "After training, or instead of it",
      body: "Swim lengths in the heated 25-metre pool with its hydrotherapy jets, then move between the sauna, the steam room and the plunge pool. Treatments are next door at Central Day Spa.",
      zones: [
        { name: "Swimming pool, 25 m", body: "A heated pool with lanes for swimming and hydrotherapy jets." },
        { name: "Sauna", body: "Dry heat on wooden benches." },
        { name: "Steam room", body: "Warm, humid air that opens the lungs." },
        { name: "Plunge pool", body: "A cold dip after the sauna." },
        { name: "New recovery experience", body: "Coming soon." },
      ],
      spa: "Central Day Spa",
    },
    classes: { eyebrow: "Group classes", title: "Find the class that suits you", body: "In the air-conditioned studio and in the pool, for every age and every level.", cta: "Classes & timetable" },
    join: { eyebrow: "Membership", title: "Join the club", body: "Membership gives you full access to the club, 7 days a week. Call us to book a free tour of the club.", cta: "Membership", call: "Book a tour" },
    footer: { address: "Address", contact: "Contact", hours: "Opening hours", hoursFallback: "Call us for today's hours.", closed: "Closed", follow: "Follow us", also: "Also at Hotel Central", spa: "Central Day Spa", hotel: "Hotel Central Sarajevo", title: ["Questions?", "Write to us"], write: "Contact", rights: "Central Fitness Club is part of Hotel Central Sarajevo." },
    membership: {
      eyebrow: "Membership",
      title: "Membership",
      body: "One membership for the gym, all group classes, the pool, the sauna and the steam room.",
      plansTitle: "Choose your membership",
      onRequest: "Price on request",
      ask: "Ask about this plan",
      defaultPlans: [
        // CH-044–CH-046: prices from the hotel; the student plan has the same description, at a lower price.
        { name: "Full membership", price: "135", features: ["Full access to the club, 7 days a week", "Gym, all group classes, pool, sauna and steam room", "Free personal programme and results tracking"], highlight: true },
        { name: "Student membership", price: "90", features: ["Full access to the club, 7 days a week", "Gym, all group classes, pool, sauna and steam room", "Free personal programme and results tracking"] },
      ] as ClubPlan[],
      benefitsTitle: "Included with every membership",
      tourTitle: "Come and see the club",
      tourBody: "Book a free tour and a first one-to-one session with a trainer.",
    },
    timetable: {
      eyebrow: "Classes",
      title: "Classes & timetable",
      body: "Group classes in the studio and in the pool, every day of the week. Places are limited, so come a few minutes early.",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      emptyTitle: "This month's timetable is on its way",
      emptyBody: "Call us or ask at reception for this week's classes.",
      typesTitle: "Our classes",
      typesBody: "What to expect from each class. The timetable can change, so check with reception or the club's Instagram.",
      download: "Open the timetable",
      instagram: "Instagram",
      noClasses: "No classes",
    },
  },
  bs: {
    meta: {
      title: "Central Fitness Club",
      description: "Teretana na tri sprata, grijani bazen od 25 metara s hidromasažnim mlazovima, sauna, parno kupatilo i bazen za hlađenje te oko 20 grupnih časova sedmično u Central Fitness Clubu, Hotel Central Sarajevo.",
      membershipTitle: "Članarine — Central Fitness Club",
      membershipDescription: "Članarine u Central Fitness Clubu, Hotel Central Sarajevo: puna članarina 135 KM, studentska 90 KM. Teretana, svi grupni časovi, bazen, sauna i parno kupatilo, uz besplatne personalizirane programe.",
      timetableTitle: "Časovi i raspored — Central Fitness Club",
      timetableDescription: "Sedmični raspored grupnih časova u Central Fitness Clubu, Hotel Central Sarajevo, i opis svakog časa: functional strength, HIIT, Tabata, pilates, yoga, aqua aerobik, kettlebells i drugi.",
    },
    nav: { club: "Klub", pool: "Bazen i sauna", classes: "Časovi", membership: "Članarine", timetable: "Raspored", contact: "Kontakt", hotel: "Hotel Central", join: "Postani član", menu: "Meni", close: "Zatvori", language: "Jezik" },
    hero: { eyebrow: "Snaga · Kondicija · Zajednica", title: "Central Fitness Club", tagline: "Feel your power", body: "Teretana na tri sprata, grijani bazen od 25 metara, sauna i parno kupatilo, u srcu Sarajeva.", call: "Pozovite klub" },
    intro: { eyebrow: "Naš klub", title: "Sve što vam treba, pod jednim krovom", body: "Najnovija kardio i oprema za snagu, grupni časovi, bazen, sauna i parno kupatilo za oporavak. Bilo da tek počinjete ili trenirate svaki dan, naši treneri će se pobrinuti da se osjećate kao kod kuće od prvog dolaska." },
    stats: [
      { big: "3", label: "sprata teretane" },
      { big: "25 m", label: "grijani bazen" },
      { big: "20", label: "grupnih časova sedmično" },
      { big: "4", label: "bazen, sauna, parno i hlađenje" },
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
        "Pristup svim grupnim časovima svake sedmice",
        "Pristup našem bazenu, sauni i parnom kupatilu",
        "Posebne ponude samo za članove u Central Day Spa",
      ],
    },
    pool: {
      eyebrow: "Pool & spa zona",
      title: "Poslije treninga, ili umjesto njega",
      body: "Plivajte u grijanom bazenu od 25 metara s hidromasažnim mlazovima, a zatim se prepustite sauni, parnom kupatilu i bazenu za hlađenje. Tretmani su odmah do, u Central Day Spa.",
      zones: [
        { name: "Bazen, 25 m", body: "Grijani bazen sa stazama za plivanje i hidromasažnim mlazovima." },
        { name: "Sauna", body: "Suha toplota na drvenim klupama." },
        { name: "Parno kupatilo", body: "Topao, vlažan zrak koji otvara pluća." },
        { name: "Bazen za hlađenje", body: "Hladno osvježenje nakon saune." },
        { name: "Novi doživljaj oporavka", body: "Uskoro." },
      ],
      spa: "Central Day Spa",
    },
    classes: { eyebrow: "Grupni časovi", title: "Pronađite čas koji vam odgovara", body: "U klimatiziranoj sali i u bazenu, za sve uzraste i sve nivoe.", cta: "Časovi i raspored" },
    join: { eyebrow: "Članarine", title: "Postanite član", body: "Članarina vam daje puni pristup klubu, 7 dana u sedmici. Pozovite nas i zakažite besplatan obilazak kluba.", cta: "Članarine", call: "Zakaži obilazak" },
    footer: { address: "Adresa", contact: "Kontakt", hours: "Radno vrijeme", hoursFallback: "Pozovite nas za današnje radno vrijeme.", closed: "Zatvoreno", follow: "Pratite nas", also: "Također u Hotelu Central", spa: "Central Day Spa", hotel: "Hotel Central Sarajevo", title: ["Imate pitanja?", "Pišite nam"], write: "Kontakt", rights: "Central Fitness Club je dio Hotela Central Sarajevo." },
    membership: {
      eyebrow: "Članarine",
      title: "Članarine",
      body: "Jedna članarina za teretanu, sve grupne časove, bazen, saunu i parno kupatilo.",
      plansTitle: "Izaberite članarinu",
      onRequest: "Cijena na upit",
      ask: "Pitajte za ovu članarinu",
      defaultPlans: [
        { name: "Puna članarina", price: "135", features: ["Puni pristup klubu, 7 dana u sedmici", "Teretana, svi grupni časovi, bazen, sauna i parno kupatilo", "Besplatan personalizirani program i praćenje rezultata"], highlight: true },
        { name: "Studentska članarina", price: "90", features: ["Puni pristup klubu, 7 dana u sedmici", "Teretana, svi grupni časovi, bazen, sauna i parno kupatilo", "Besplatan personalizirani program i praćenje rezultata"] },
      ] as ClubPlan[],
      benefitsTitle: "Uključeno u svaku članarinu",
      tourTitle: "Dođite i upoznajte klub",
      tourBody: "Zakažite besplatan obilazak i prvi individualni trening s trenerom.",
    },
    timetable: {
      eyebrow: "Časovi",
      title: "Časovi i raspored",
      body: "Grupni časovi u sali i u bazenu, svaki dan u sedmici. Broj mjesta je ograničen, pa dođite nekoliko minuta ranije.",
      days: ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"],
      short: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
      emptyTitle: "Raspored za ovaj mjesec stiže uskoro",
      emptyBody: "Pozovite nas ili pitajte na recepciji za časove ove sedmice.",
      typesTitle: "Naši časovi",
      typesBody: "Šta vas očekuje na svakom času. Raspored se može promijeniti, pa ga provjerite na recepciji ili na Instagramu kluba.",
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
  // CH-040: a photograph without the "Feel your power" sign, so nothing competes with the title.
  hero: { src: "/images/club/strength-floor.jpg", alt: "The strength floor with plate-loaded machines and a bench", position: "50% 62%" },
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
