import type { Locale } from "@/lib/i18n";

/**
 * Copy written for the hotel's change list (CH-006, CH-007, CH-014–CH-017, CH-020). Shared by the Next.js site
 * and the WordPress generator (wordpress/build/generate.mts), so both versions say exactly the same.
 */
const L = <T,>(en: T, bs: T): Record<Locale, T> => ({ en, bs });

export const clientCopy = {
  // CH-006: "completely refurbished" is reworded.
  aboutRooms: L(
    { title: ["Comfort,", "thoughtfully designed"], body: ["Our 32 rooms and suites are designed with your comfort in mind, with modern amenities, quality beds and stylish decor.", "Start your day with a breakfast buffet and Bosnian coffee in our restaurant."] },
    { title: ["Udobnost", "do detalja"], body: ["Naše 32 sobe i apartmana uređeni su s mišlju na vašu udobnost, s modernim sadržajima, kvalitetnim krevetima i elegantnim enterijerom.", "Započnite dan doručkom na bazi švedskog stola i bosanskom kafom u našem restoranu."] },
  ),
  roomsIntro: L("Six room categories, from the single room to the presidential suite with its terrace.", "Šest kategorija soba, od jednokrevetne sobe do predsjedničkog apartmana s terasom."),
  // CH-007: Central Café (facts from the hotel's FAQ).
  cafe: L(
    {
      title: "Central Café", eyebrow: "On the ground floor of Hotel Central", intro: "Quality coffee, tea, cold drinks, cakes and sweet treats, in a welcoming city-centre setting.",
      offerTitle: "What we offer", offer: ["Coffee, including Bosnian coffee", "Tea", "Cold drinks", "Cakes and sweet treats"],
      hoursTitle: "Opening hours", body: ["Meet a friend, read the paper by the tall arched windows or take a break between meetings. The café is open to hotel guests and to everyone passing by on Ćumurija street."],
    },
    {
      title: "Central Café", eyebrow: "U prizemlju Hotela Central", intro: "Kvalitetna kafa, čajevi, hladni napici, kolači i slatke poslastice, u ugodnom ambijentu u samom centru grada.",
      offerTitle: "Šta nudimo", offer: ["Kafa, uključujući bosansku kafu", "Čajevi", "Hladni napici", "Kolači i slatke poslastice"],
      hoursTitle: "Radno vrijeme", body: ["Sretnite se s prijateljem, pročitajte novine uz visoke lučne prozore ili napravite pauzu između sastanaka. Kafić je otvoren za goste hotela i za sve prolaznike u Ćumuriji."],
    },
  ),
  faq: L({ title: "Frequently asked questions", eyebrow: "FAQ" }, { title: "Česta pitanja", eyebrow: "FAQ" }),
  // CH-014: what can be arranged (no prices: fees are agreed per request), and a prominent enquiry.
  conference: L(
    {
      offerTitle: "What we can arrange", offer: [
        { t: "Meeting room", d: "The conference room on the third floor, set up for your number of guests: theatre, classroom, U-shape or boardroom. Up to 60–70 seats, full IT equipment." },
        { t: "Coffee breaks & lunch", d: "Coffee breaks and catered lunches from Restaurant Central, with a menu made for your event." },
        { t: "Rooms for your guests", d: "32 rooms and suites in the same building, for speakers and delegates." },
      ], offerNote: "Every event is priced on request, depending on the room set-up, food and drinks and the rooms you need.",
      ctaTitle: "Plan your event with us", ctaBody: "Tell us the date, the number of guests and what you need. We will send you a proposal.", ctaMail: "Request a proposal", ctaCall: "Call us",
    },
    {
      offerTitle: "Šta možemo organizovati", offer: [
        { t: "Sala za sastanke", d: "Konferencijska sala na trećem spratu, postavljena prema broju gostiju: teatarski, učionički, U-oblik ili za sastanke. Do 60–70 mjesta, kompletna IT oprema." },
        { t: "Pauze za kafu i ručak", d: "Pauze za kafu i ručak iz Restorana Central, s menijem napravljenim za vaš događaj." },
        { t: "Sobe za vaše goste", d: "32 sobe i apartmana u istoj zgradi, za predavače i učesnike." },
      ], offerNote: "Cijena svakog događaja dogovara se na upit, prema postavci sale, hrani i pićima te sobama koje su vam potrebne.",
      ctaTitle: "Organizujte svoj događaj kod nas", ctaBody: "Javite nam datum, broj gostiju i šta vam je potrebno. Poslat ćemo vam ponudu.", ctaMail: "Zatražite ponudu", ctaCall: "Pozovite nas",
    },
  ),
  // Meetings & events: the enquiry form (sent through the same delivery as the contact form).
  eventForm: L(
    {
      label: "(04)", title: ["Request", "a proposal"], intro: "Tell us about your event and we will reply by email with a proposal, usually within one working day.",
      subject: "Meetings & events", details: "Your event", contactTitle: "Your details",
      type: "Type of event", types: ["Meeting or conference", "Seminar or workshop", "Presentation", "Wedding or celebration", "Business lunch or dinner", "Other"],
      date: "Preferred date", guests: "Number of guests", setup: "Room set-up", setups: ["Not sure yet", "Theatre", "Classroom", "U-shape", "Boardroom", "Banquet"],
      services: "What else do you need?", servicesList: ["Coffee breaks", "Lunch or dinner", "Rooms for guests", "Technical support"],
      notes: "Anything else we should know (optional)",
    },
    {
      label: "(04)", title: ["Zatražite", "ponudu"], intro: "Recite nam nešto o vašem događaju, a mi ćemo vam odgovoriti e-poštom s ponudom, obično u roku od jednog radnog dana.",
      subject: "Sastanci i događaji", details: "Vaš događaj", contactTitle: "Vaši podaci",
      type: "Vrsta događaja", types: ["Sastanak ili konferencija", "Seminar ili radionica", "Prezentacija", "Vjenčanje ili proslava", "Poslovni ručak ili večera", "Ostalo"],
      date: "Željeni datum", guests: "Broj gostiju", setup: "Postavka sale", setups: ["Još nisam siguran/na", "Teatarska", "Učionička", "U-oblik", "Za sastanke (boardroom)", "Banket"],
      services: "Šta vam još treba?", servicesList: ["Pauze za kafu", "Ručak ili večera", "Sobe za goste", "Tehnička podrška"],
      notes: "Još nešto što bismo trebali znati (nije obavezno)",
    },
  ),
  // CH-015: approximate wording, no prices the hotel could be held to; parking per the hotel's FAQ.
  transport: L(
    [
      { title: "Taxi", body: "Sarajevo International Airport is approx. 10–12 km away, about 20–25 minutes by car depending on traffic. A taxi can be booked through our reception; fares are approximate and may vary." },
      { title: "Airport coach", body: "Ask for the Hotel Central stop at the Latin Bridge or the Sacred Heart Cathedral. The coach runs daily according to flight times; fares and timetables are on centrotrans.com and may change." },
      { title: "Bus & tram", body: "Bus stops beside the hotel serve the centre and its surroundings. Tram no. 3 runs between Ilidža and Baščaršija (Old Town). Ticket prices may vary." },
      { title: "Sightseeing bus", body: "The Centrotrans sightseeing bus stops about 50 m from the hotel. Tours usually run in the summer season; please check times with reception." },
      { title: "By car & parking", body: "Enter “Hotel Central, Ćumurija 8, Sarajevo” as your destination. The hotel has no private parking, but several public and commercial car parks are nearby; reception will help you." },
    ],
    [
      { title: "Taksi", body: "Međunarodni aerodrom Sarajevo udaljen je približno 10–12 km, oko 20–25 minuta vožnje, zavisno od saobraćaja. Taksi možete naručiti preko recepcije; cijene su okvirne i mogu se razlikovati." },
      { title: "Aerodromski autobus", body: "Tražite stanicu kod Latinske ćuprije ili Katedrale. Autobus vozi svakodnevno prema redu letenja; cijene i red vožnje su na centrotrans.com i mogu se mijenjati." },
      { title: "Autobus i tramvaj", body: "Autobuske stanice pored hotela povezuju centar i okolinu. Tramvaj broj 3 vozi od Ilidže do Baščaršije. Cijene karata mogu se razlikovati." },
      { title: "Turistički autobus", body: "Centrotransov turistički autobus staje oko 50 m od hotela. Ture obično voze u ljetnoj sezoni; vrijeme provjerite na recepciji." },
      { title: "Automobilom i parking", body: "Kao odredište unesite „Hotel Central, Ćumurija 8, Sarajevo“. Hotel nema vlastiti parking, ali u blizini je nekoliko javnih i komercijalnih parkinga; recepcija će vam pomoći." },
    ],
  ),
  locationFacts: L(
    [{ k: "Airport", v: "approx. 10–12 km · 20–25 min" }, { k: "Airport coach", v: "Latin Bridge / Cathedral" }, { k: "Parking", v: "Public car parks nearby" }, { k: "Old Town", v: "A few minutes on foot" }],
    [{ k: "Aerodrom", v: "oko 10–12 km · 20–25 min" }, { k: "Aerodromski autobus", v: "Latinska ćuprija / Katedrala" }, { k: "Parking", v: "Javni parkinzi u blizini" }, { k: "Stari grad", v: "Nekoliko minuta pješice" }],
  ),
  // CH-016 / CH-017: new wording; phone and e-mail only, no form.
  contact: L(
    { title: ["Our team is standing by", "to answer your questions"], intro: "Call or write to us. We reply to every e-mail as soon as we can.", reception: "Reception & reservations", receptionBody: "General questions and room bookings, every day.", spa: "Central Day Spa", spaBody: "Treatments, availability and bookings.", club: "Central Fitness Club", clubBody: "Memberships, classes and tours of the club.", social: "Follow us", events: "Meetings & events", eventsBody: "Proposals for meetings, seminars and celebrations." },
    { title: ["Naš tim vam rado", "odgovara na pitanja"], intro: "Pozovite nas ili nam pišite. Na svaki e-mail odgovaramo što je prije moguće.", reception: "Recepcija i rezervacije", receptionBody: "Opća pitanja i rezervacija soba, svaki dan.", spa: "Central Day Spa", spaBody: "Tretmani, slobodni termini i rezervacije.", club: "Central Fitness Club", clubBody: "Članarine, časovi i obilazak kluba.", social: "Pratite nas", events: "Sastanci i događaji", eventsBody: "Ponude za sastanke, seminare i proslave." },
  ),
  // CH-020: privacy information, factual about what this website does; to be confirmed by the hotel's legal adviser.
  privacy: L(
    {
      title: "Privacy policy",
      body: [
        "<strong>Who we are.</strong> Hotel Central Sarajevo, Ćumurija 8, 71000 Sarajevo, Bosnia and Herzegovina. E-mail: info@hotelcentral.ba, telephone +387 33 561 800.",
        "<strong>What this website collects.</strong> The website has no contact form and no user accounts for guests. When you write to us by e-mail or call us, we use your details only to answer you and to handle your booking.",
        "<strong>Bookings.</strong> Room bookings are made in the secure booking system of our provider eZee (letsbook.me), and spa bookings in Lime Booking. Their own privacy terms apply to the data you enter there.",
        "<strong>Embedded content.</strong> The map on our pages is provided by Google Maps; Google may set cookies when the map loads. Links to Facebook and Instagram open those services.",
        "<strong>Your rights.</strong> You can ask us which personal data we hold about you, and ask us to correct or delete it, by writing to info@hotelcentral.ba.",
      ],
    },
    {
      title: "Politika privatnosti",
      body: [
        "<strong>Ko smo mi.</strong> Hotel Central Sarajevo, Ćumurija 8, 71000 Sarajevo, Bosna i Hercegovina. E-mail: info@hotelcentral.ba, telefon +387 33 561 800.",
        "<strong>Šta ova stranica prikuplja.</strong> Stranica nema kontakt formu niti korisničke račune za goste. Kada nam pišete ili nas pozovete, vaše podatke koristimo samo da vam odgovorimo i obradimo rezervaciju.",
        "<strong>Rezervacije.</strong> Sobe se rezervišu u sigurnom sistemu našeg partnera eZee (letsbook.me), a spa tretmani u sistemu Lime Booking. Za podatke koje tamo unosite važe njihovi uslovi privatnosti.",
        "<strong>Ugrađeni sadržaj.</strong> Mapu na našim stranicama prikazuje Google Maps; Google može postaviti kolačiće kada se mapa učita. Linkovi na Facebook i Instagram otvaraju te servise.",
        "<strong>Vaša prava.</strong> Možete tražiti informaciju koje vaše lične podatke imamo te njihovu ispravku ili brisanje, pišući na info@hotelcentral.ba.",
      ],
    },
  ),
  homeBrands: L(
    { eyebrow: "Club & Spa", title: ["Strength", "and calm"], body: "Two places of their own inside the hotel: a fitness club with a 25-metre pool, and a quiet day spa." },
    { eyebrow: "Club & Spa", title: ["Snaga", "i mir"], body: "Dva posebna mjesta u hotelu: fitness klub s bazenom od 25 metara i mirni day spa." },
  ),
  ui: L(
    { book: "Book now", bookStay: "Book your stay", rooms: "Rooms & suites", view: "View room", size: "Size", amenities: "Room facilities", other: "Other rooms", bookRoom: "Book this room", call: "Call", write: "Write to us", cafe: "Central Café", faq: "Frequently asked questions", more: "Read more", gallery: "Gallery", hours: "Opening hours" },
    { book: "Rezerviši", bookStay: "Rezervišite boravak", rooms: "Sobe i apartmani", view: "Pogledaj sobu", size: "Veličina", amenities: "Sadržaji sobe", other: "Ostale sobe", bookRoom: "Rezerviši ovu sobu", call: "Pozovite", write: "Pišite nam", cafe: "Central Café", faq: "Česta pitanja", more: "Saznajte više", gallery: "Galerija", hours: "Radno vrijeme" },
  ),
};
