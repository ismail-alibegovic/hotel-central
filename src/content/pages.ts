import type { Locale } from "@/lib/i18n";

/**
 * Secondary-page copy. Every statement is drawn from hotelcentral.ba (EN + BS pages).
 * Where the hotel publishes no detail (menus, opening hours, capacities by layout,
 * walking distances), none is invented.
 */
const en = {
  about: {
    meta: { title: "About", description: "A four-star, Irish-owned hotel in the heart of Old Town Sarajevo, blending traditional Irish hospitality with Bosnian charm." },
    hero: { eyebrow: "About the hotel", title: ["Irish hospitality", "Bosnian charm"], intro: "Experience the charm of Old Town Sarajevo at our four-star, Irish-owned hotel." },
    story: {
      label: "(01) The hotel",
      title: ["Old Town", "Sarajevo"],
      body: [
        "Nestled in the heart of Old Town Sarajevo, Hotel Central blends traditional Irish hospitality with Bosnian charm to offer you a truly unique stay. Located just steps away from historic landmarks such as the Old Bazaar and Baščaršija Square, Hotel Central provides the perfect base for exploring the rich culture and history of Sarajevo.",
        "Whether you're visiting Sarajevo for business or pleasure, Hotel Central offers the perfect blend of comfort, convenience, and hospitality.",
      ],
    },
    rooms: {
      label: "(02) Rooms",
      title: ["Rooms with", "a sense of place"],
      body: [
        "Thirty-two rooms and suites, from a quiet single room to the presidential suite with its own terrace above the rooftops. Each is well appointed and thoughtfully furnished, with the comforts you expect from a four-star hotel and the calm you need after a day in the city.",
        "Every morning begins with a buffet breakfast of local and international favourites — and Bosnian coffee — at our on-site restaurant.",
      ],
      cta: "View rooms & suites",
    },
    wellness: {
      label: "(03) Unwind",
      title: ["After a day", "of sightseeing"],
      body: [
        "Unwind in the sauna, the steam room and the heated 25-metre pool of Central Fitness Club, train in its gym over three floors, or book a treatment at Central Day Spa.",
        "Our friendly and attentive staff are always on hand to ensure you have a memorable stay.",
      ],
      cta: "Central Fitness Club",
      cta2: "Central Day Spa",
    },
    facts: [
      { k: "Category", v: "Four stars" },
      { k: "Rooms", v: "32 rooms and suites" },
      { k: "Capacity", v: "65–70 guests" },
      { k: "Address", v: "Ćumurija 8, 71000 Sarajevo" },
    ],
    statement: "A perfect blend of comfort, convenience and hospitality.",
  },
  rooms: {
    meta: { title: "Rooms & Suites", description: "Six categories of rooms and suites at Hotel Central Sarajevo, from the single room to the presidential suite with terrace." },
    hero: { eyebrow: "Rooms & suites", title: ["Rooms", "& suites"], intro: "Six categories of rooms and suites, each well appointed and designed with your comfort in mind." },
    size: "Size",
  },
  spa: {
    meta: { title: "Club & Spa", description: "A heated 25-metre pool, Finnish sauna, steam bath, caldarium, plunge pool, a gym over three floors and the Wellness Day Spa at Hotel Central Sarajevo." },
    hero: { eyebrow: "Club & Spa", title: ["Relaxation", "& wellness"], intro: "A relaxation and wellness oasis in Sarajevo." },
    pool: {
      label: "(01) Pool",
      title: ["A tranquil", "poolside escape"],
      body: [
        "Immerse yourself in serenity at our 25-meter pool. Whether you're looking to swim laps or simply relax by the water, our pool provides a peaceful sanctuary for guests of all ages.",
        "Relax in our Finnish sauna, unwind in our steam bath, rejuvenate in our caldarium — a low-temperature sauna at 40–50 °C with heated benches — and cool off in the plunge pool.",
      ],
    },
    gym: {
      label: "(02) Fitness",
      title: ["Three floors", "of fitness"],
      body: [
        "Maintain your fitness regime at our state-of-the-art gym, featuring three floors of cardio and strength training equipment. Whether you're a fitness enthusiast or just starting out, our gym offers everything you need to stay active during your stay.",
        "Group classes include yoga, pilates, HIIT, kettlebell, aqua aerobic, indoor spinning and more.",
      ],
    },
    dayspa: {
      label: "(03) Wellness Day Spa",
      title: ["Treatments", "& rituals"],
      body: [
        "Treat yourself to a host of treatments at any of our six deluxe therapy rooms — including massage, facials, pedicures and manicures.",
        "Two hours of free pool area access with all treatments booked.",
      ],
      cta: "Treatments & price list",
    },
    facilities: "Facilities",
    facts: [
      { k: "Pool", v: "Heated, 25 metres" },
      { k: "Heat", v: "Finnish sauna · steam bath · caldarium" },
      { k: "Cool", v: "Plunge pool · hydrotherapy pools" },
      { k: "Gym", v: "Cardio and strength over three floors" },
      { k: "Day spa", v: "Six deluxe therapy rooms" },
    ],
  },
  restaurant: {
    meta: { title: "Restaurant Central", description: "Breakfast with local delicacies and international favourites, Bosnian coffee, and catered lunches for corporate events on request." },
    hero: { eyebrow: "Restaurant Central", title: ["Restaurant", "Central"], intro: "A tranquil escape where every morning begins with a delightful breakfast." },
    breakfast: {
      label: "(01) Breakfast",
      title: ["Every morning", "a ritual"],
      body: [
        "Nestled in the heart of Sarajevo, Hotel Central is a tranquil escape where every morning begins with a delightful breakfast experience. Start your day with a sumptuous breakfast spread at our charming restaurant, featuring a tempting selection of local delicacies and international favorites.",
        "And, of course, Bosnian coffee.",
      ],
    },
    catering: {
      label: "(02) Corporate dining",
      title: ["Catered", "lunches"],
      body: [
        "In addition to our breakfast offerings, we also provide catered lunches for corporate events upon request.",
        "Whether you're hosting a business meeting, conference, or seminar, our culinary team will craft a bespoke menu to suit your event's needs.",
      ],
      cta: "Enquire about catering",
    },
  },
  events: {
    meta: { title: "Meetings & Events", description: "A fully equipped conference room on the third floor of Hotel Central Sarajevo for seminars, conferences, workshops, presentations, weddings and business lunches." },
    hero: { eyebrow: "Meetings & events", title: ["The space", "to connect"], intro: "Seminars, conferences, workshops, presentations, weddings and business lunches in the heart of old town Sarajevo." },
    room: {
      label: "(01) Conference room",
      title: ["Peace", "& privacy"],
      body: [
        "The conference room is located on the third floor, in a new and separate part of our premises, which guarantees peace and privacy. It is fully equipped with all necessary IT equipment and meets the needs for organizing all types of meetings, events and celebrations.",
        "Modern and nicely decorated with all accompanying amenities, the conference room can change its setup and seating arrangement depending on the number of participants and the type of event.",
      ],
    },
    business: {
      label: "(02) Your event",
      title: ["Entrust us", "with it"],
      body: [
        "Entrust us to handle the organization of your business event and your wishes will be realized, your business partners impressed.",
        "All conference, meeting and event fees are negotiable and defined by individual request — hotel rooms, food and drinks, coffee breaks.",
      ],
      cta: "Request a proposal",
    },
    facts: [
      { k: "Location", v: "Third floor, separate wing" },
      { k: "Equipment", v: "Full IT equipment" },
      { k: "Seating", v: "Maximum 60–70 seats" },
      { k: "Hotel", v: "32 rooms · 65–70 guests" },
      { k: "Pricing", v: "On individual request" },
    ],
    enquiry: {
      label: "Enquiries",
      title: ["Plan your", "event with us"],
      body: "Tell us the date, the number of guests and what you need — our team will send you a tailored proposal.",
      cta: "Request a proposal",
    },
    packages: {
      label: "Corporate & meeting packages",
      items: [
        { k: "Conference room", v: "Third floor, separate wing · up to 60–70 seats" },
        { k: "Equipment", v: "Full IT equipment · flexible seating layouts" },
        { k: "Coffee breaks", v: "Food and drinks for your programme" },
        { k: "Catered lunches", v: "A bespoke menu from our culinary team" },
        { k: "Accommodation", v: "32 rooms · 65–70 guests" },
        { k: "Pricing", v: "Defined per event, on individual request" },
      ],
    },
  },
  location: {
    meta: { title: "Location", description: "Hotel Central is at Ćumurija 8 in the centre of Sarajevo, near the Sacred Heart Cathedral, the Latin Bridge and Baščaršija." },
    hero: { eyebrow: "Ćumurija 8, Sarajevo", title: ["In the heart", "of Sarajevo"], intro: "Sarajevo suits the walker. We're in the city centre and almost all sights are within walking distance." },
    arrive: "Getting here",
    transport: [
      {
        title: "Taxi",
        body: "Sarajevo International Airport is approximately 10–12 km from the hotel — usually 20–25 minutes by car, depending on traffic. A taxi usually costs approximately 30–35 KM (about 15–18 €), but fares vary; our reception can book one for you.",
      },
      {
        title: "Airport coach",
        body: "The Centrotrans airport coach leaves from outside the arrivals hall; ask the driver for the Hotel Central stop at the Latin Bridge or the Sacred Heart Cathedral. The return stop to the airport is the same. A single ticket is approximately 5 KM (about 2.50 €), a return about 8 KM — prices may vary. Timetables are on centrotrans.com.",
      },
      {
        title: "Bus & tram",
        body: "Bus stops beside the hotel serve the centre and surroundings, with buses every few minutes during the day. Tram no. 3 runs between Ilidža and Baščaršija (Old Town). Single tickets cost around 1–2 KM; fares may change.",
      },
      {
        title: "Sightseeing bus",
        body: "The Centrotrans sightseeing bus stops about 50 m from the hotel. Tours usually run daily in the summer season (May to September); please check times and tickets with the operator.",
      },
      {
        title: "By car & parking",
        body: "Enter “Hotel Central, Ćumurija 8, Sarajevo” as your destination. The hotel does not have its own car park; several public and commercial car parks are nearby, and our reception will gladly advise you.",
      },
      {
        title: "Please note",
        body: "Distances, travel times and fares are approximate and can change; they are given as a guide only.",
      },
    ],
    walk: {
      label: "(02) On foot",
      title: ["See the city", "on foot"],
      body: [
        "Sarajevo suits the walker. We're in the city centre, and almost all of the sights are within walking distance — Baščaršija, the Latin Bridge and the Sacred Heart Cathedral are all close by.",
        "It's the best way to stumble upon something interesting along the way.",
      ],
    },
    nearby: "Nearby",
    landmarks: ["Sacred Heart Cathedral", "Latin Bridge", "Baščaršija & the Old Bazaar", "Sarajevo International Airport · approx. 10–12 km"],
  },
  contact: {
    meta: { title: "Contact", description: "Contact Hotel Central Sarajevo: Ćumurija 8, 71000 Sarajevo · +387 33 561 800 · info@hotelcentral.ba" },
    hero: { eyebrow: "Contact", title: ["Our team", "is here for you"], intro: "Our team is here to answer your questions. Call us or send us an e-mail — we will be glad to help." },
    office: "Reception & hotel office",
    officeBody: "For all general questions, at any time of your stay.",
    reservations: "Reservations",
    reservationsBody: "Our reservations team will gladly help you with your booking, or book online directly with the hotel.",
    write: "E-mail",
    social: "Follow us",
    socialBody: "News and moments from Hotel Central.",
  },
};

export type PagesContent = typeof en;

const bs: PagesContent = {
  about: {
    meta: { title: "O nama", description: "Hotel sa četiri zvjezdice u vlasništvu irske kompanije, u srcu Starog grada Sarajeva — irsko gostoprimstvo i bosanski šarm." },
    hero: { eyebrow: "O hotelu", title: ["Irsko gostoprimstvo", "bosanski šarm"], intro: "Doživite potpuni šarm Starog grada Sarajeva u našem hotelu sa četiri zvjezdice, koji je u vlasništvu irske kompanije." },
    story: {
      label: "(01) Hotel",
      title: ["Stari grad", "Sarajevo"],
      body: [
        "Smješten u srcu Starog grada Sarajeva, Hotel Central spaja tradicionalno irsko gostoprimstvo sa bosanskim šarmom, nudeći vam zaista jedinstven boravak. Nalazi se na samo nekoliko koraka od historijskih znamenitosti kao što su Stari dio grada, Baščaršijski trg i sarajevska Katedrala, čineći ga savršenom polaznom tačkom za istraživanje bogate kulture i historije Sarajeva.",
        "Bilo da posjećujete Sarajevo zbog posla ili zadovoljstva, Hotel Central nudi savršen spoj udobnosti i gostoprimstva.",
      ],
    },
    rooms: {
      label: "(02) Sobe",
      title: ["Sobe sa", "dušom grada"],
      body: [
        "Trideset dvije sobe i apartmana, od mirne jednokrevetne sobe do predsjedničkog apartmana sa vlastitom terasom iznad sarajevskih krovova. Svaka je dobro opremljena i pažljivo uređena, sa udobnošću koju očekujete od hotela sa četiri zvjezdice i mirom koji Vam treba nakon dana u gradu.",
        "Svako jutro počinje doručkom na bazi švedskog stola sa domaćim i internacionalnim jelima — i bosanskom kafom — u našem hotelskom restoranu.",
      ],
      cta: "Pogledajte sobe i apartmane",
    },
    wellness: {
      label: "(03) Opuštanje",
      title: ["Nakon dana", "razgledanja"],
      body: [
        "Opustite se u sauni, parnoj kupelji i grijanom bazenu od 25 metara u Central Fitness Clubu, trenirajte u teretani na tri sprata ili rezervišite tretman u Central Day Spa.",
        "Ljubazno i pažljivo osoblje našeg hotela uvijek je pri ruci kako bi Vam osiguralo nezaboravan boravak.",
      ],
      cta: "Central Fitness Club",
      cta2: "Central Day Spa",
    },
    facts: [
      { k: "Kategorija", v: "Četiri zvjezdice" },
      { k: "Sobe", v: "32 sobe i apartmana" },
      { k: "Kapacitet", v: "65–70 osoba" },
      { k: "Adresa", v: "Ćumurija 8, 71000 Sarajevo" },
    ],
    statement: "Savršen spoj udobnosti i gostoprimstva.",
  },
  rooms: {
    meta: { title: "Sobe i apartmani", description: "Šest kategorija soba i apartmana u Hotelu Central Sarajevo, od jednokrevetne sobe do predsjedničkog apartmana sa terasom." },
    hero: { eyebrow: "Sobe i apartmani", title: ["Sobe", "i apartmani"], intro: "Šest kategorija soba i apartmana, dobro opremljenih i uređenih za Vašu udobnost." },
    size: "Veličina",
  },
  spa: {
    meta: { title: "Club & Spa", description: "Grijani bazen od 25 metara, finska sauna, parna kupelj, caldarium, bazen za hlađenje, teretana na tri sprata i Wellness Day Spa u Hotelu Central Sarajevo." },
    hero: { eyebrow: "Club & Spa", title: ["Opuštanje", "i wellness"], intro: "Oaza za opuštanje i wellness u Sarajevu." },
    pool: {
      label: "(01) Bazen",
      title: ["Mirni bijeg", "uz bazen"],
      body: [
        "Uronite u spokoj na našem bazenu od 25 metara. Bilo da želite plivati krugove ili se jednostavno opustiti uz vodu, naš bazen pruža mirno utočište za goste svih uzrasta.",
        "Opustite se u finskoj sauni i parnoj kupelji, obnovite se u caldariumu — sauni niske temperature od 40–50 °C sa grijanim klupama — i rashladite se u bazenu za hlađenje.",
      ],
    },
    gym: {
      label: "(02) Fitness",
      title: ["Tri sprata", "fitnessa"],
      body: [
        "Održavajte svoju fitness rutinu u našoj vrhunskoj teretani koja se prostire na tri sprata i sadrži kardio i opremu za jačanje mišića. Bilo da ste zaljubljenik u fitness ili tek počinjete, naša teretana nudi sve što vam je potrebno tokom vašeg boravka.",
        "Grupni treninzi uključuju jogu, pilates, HIIT, kettlebell, aqua aerobik, indoor spinning i još mnogo toga.",
      ],
    },
    dayspa: {
      label: "(03) Wellness Day Spa",
      title: ["Tretmani", "i rituali"],
      body: [
        "Priuštite sebi niz tretmana u nekoj od naših šest luksuznih tretman soba — uključujući masaže, tretmane lica, pedikir i manikir.",
        "Dva sata besplatnog korištenja bazena uz sve rezervisane tretmane.",
      ],
      cta: "Tretmani i cjenovnik",
    },
    facilities: "Sadržaji",
    facts: [
      { k: "Bazen", v: "Grijani, 25 metara" },
      { k: "Toplina", v: "Finska sauna · parna kupelj · caldarium" },
      { k: "Hlađenje", v: "Bazen za hlađenje · hidroterapija" },
      { k: "Teretana", v: "Kardio i snaga na tri sprata" },
      { k: "Day spa", v: "Šest luksuznih tretman soba" },
    ],
  },
  restaurant: {
    meta: { title: "Restoran Central", description: "Doručak sa domaćim delicijama i internacionalnim jelima, bosanska kafa i ručak za poslovne događaje na upit." },
    hero: { eyebrow: "Restoran Central", title: ["Restoran", "Central"], intro: "Mirna oaza u kojoj svako jutro počinje divnim iskustvom svježe pripremljenog doručka." },
    breakfast: {
      label: "(01) Doručak",
      title: ["Svako jutro", "ritual"],
      body: [
        "Smješten u srcu Sarajeva, Hotel Central je mirna oaza u kojoj svako jutro počinje divnim iskustvom svježe pripremljenog doručka. Započnite dan u našem šarmantnom restoranu, gdje vas očekuje primamljiv izbor domaćih delicija i internacionalnih jela.",
        "I, naravno, bosanska kafa.",
      ],
    },
    catering: {
      label: "(02) Poslovni ručkovi",
      title: ["Ručak", "po mjeri"],
      body: [
        "Osim izuzetne ponude doručka, na upit nudimo i ručak za poslovne događaje.",
        "Bilo da organizujete poslovni sastanak, konferenciju ili seminar, naš kulinarski tim će osmisliti jelovnik po mjeri vašeg događaja.",
      ],
      cta: "Upit za ketering",
    },
  },
  events: {
    meta: { title: "Sastanci i događaji", description: "Potpuno opremljena konferencijska sala na trećem spratu Hotela Central Sarajevo za seminare, konferencije, radionice, prezentacije, vjenčanja i poslovne ručkove." },
    hero: { eyebrow: "Sastanci · Događaji · Slavlja", title: ["Prostor", "za susrete"], intro: "Seminari, konferencije, radionice, prezentacije, vjenčanja i poslovni ručkovi u samom centru Sarajeva." },
    room: {
      label: "(01) Konferencijska sala",
      title: ["Mir", "i privatnost"],
      body: [
        "Konferencijska sala smještena je na trećem spratu, u dijelu odvojenom od smještajnih jedinica, što garantira mir i privatnost. U potpunosti je opremljena svom potrebnom informatičkom opremom te udovoljava potrebama za organizacijom svih vrsta skupova.",
        "Moderno i lijepo uređena sala sa svim pratećim sadržajima ima mogućnost promjene postava ovisno o broju sudionika i vrsti samog događaja.",
      ],
    },
    business: {
      label: "(02) Vaš događaj",
      title: ["Povjerite", "nam ga"],
      body: [
        "Povjerite nam organizaciju Vašeg poslovnog događaja i Vaše će želje biti ostvarene, a Vaši poslovni partneri impresionirani.",
        "Sve ponude i naknade formiraju se prema individualnim upitima — hotelski smještaj, sala za sastanke, hrana i piće, kafe pauze.",
      ],
      cta: "Zatražite ponudu",
    },
    facts: [
      { k: "Lokacija", v: "Treći sprat, odvojeni dio" },
      { k: "Oprema", v: "Kompletna informatička oprema" },
      { k: "Kapacitet", v: "Maksimalno 60–70 sjedećih mjesta" },
      { k: "Hotel", v: "32 sobe · 65–70 osoba" },
      { k: "Cijene", v: "Prema individualnom upitu" },
    ],
    enquiry: {
      label: "Upiti",
      title: ["Planirajte", "događaj s nama"],
      body: "Recite nam datum, broj gostiju i šta Vam je potrebno — naš tim će Vam poslati ponudu po mjeri.",
      cta: "Zatražite ponudu",
    },
    packages: {
      label: "Korporativni i konferencijski paketi",
      items: [
        { k: "Konferencijska sala", v: "Treći sprat, odvojeni dio · do 60–70 mjesta" },
        { k: "Oprema", v: "Kompletna informatička oprema · fleksibilan raspored sjedenja" },
        { k: "Kafe pauze", v: "Hrana i piće za Vaš program" },
        { k: "Ručak za događaje", v: "Jelovnik po mjeri našeg kulinarskog tima" },
        { k: "Smještaj", v: "32 sobe · 65–70 osoba" },
        { k: "Cijene", v: "Prema individualnom upitu, za svaki događaj" },
      ],
    },
  },
  location: {
    meta: { title: "Lokacija", description: "Hotel Central se nalazi na adresi Ćumurija 8, u centru Sarajeva, u blizini Katedrale, Latinske ćuprije i Baščaršije." },
    hero: { eyebrow: "Ćumurija 8, Sarajevo", title: ["U srcu", "Sarajeva"], intro: "Sarajevo je pogodno za šetanje. Nalazimo se u srcu grada i skoro sve znamenitosti su u blizini." },
    arrive: "Kako do nas",
    transport: [
      {
        title: "Taxi",
        body: "Međunarodni aerodrom Sarajevo udaljen je približno 10–12 km od hotela — vožnja obično traje 20–25 minuta, u zavisnosti od saobraćaja. Taxi obično košta otprilike 30–35 KM (oko 15–18 €), ali cijene se razlikuju; recepcija Vam ga rado može naručiti.",
      },
      {
        title: "Autobus sa aerodroma",
        body: "Autobus Centrotrans polazi ispred dolaznog terminala; zamolite vozača za stanicu kod Latinske ćuprije ili Katedrale Srca Isusova. Stanica za povratak na aerodrom je ista. Karta u jednom pravcu košta otprilike 5 KM (oko 2,50 €), povratna oko 8 KM — cijene su podložne promjenama. Red vožnje: centrotrans.com.",
      },
      {
        title: "Autobus i tramvaj",
        body: "Stanice gradskog prijevoza nalaze se u blizini hotela, a autobusi tokom dana voze svakih nekoliko minuta. Tramvaj broj 3 saobraća od Ilidže do Baščaršije. Pojedinačna karta košta oko 1–2 KM; cijene su podložne promjenama.",
      },
      {
        title: "Turistički bus",
        body: "Stanica turističkog autobusa Centrotrans nalazi se oko 50 m od hotela. Ture se obično realizuju svaki dan u ljetnoj sezoni (od maja do septembra); termine i cijene provjerite kod prevoznika.",
      },
      {
        title: "Autom i parking",
        body: "Kao destinaciju unesite „Hotel Central, Ćumurija 8, Sarajevo“. Hotel ne raspolaže vlastitim parkingom; u blizini se nalazi nekoliko javnih i komercijalnih parkinga, a recepcija će Vam rado pomoći.",
      },
      {
        title: "Napomena",
        body: "Udaljenosti, trajanje putovanja i cijene su okvirni i mogu se promijeniti; navedeni su samo kao orijentacija.",
      },
    ],
    walk: {
      label: "(02) Pješice",
      title: ["Grad", "pješice"],
      body: [
        "Sarajevo je pogodno za šetanje. Nalazimo se u samom centru grada i skoro sve znamenitosti su na pješačkoj udaljenosti — Baščaršija, Latinska ćuprija i Katedrala su u neposrednoj blizini.",
        "To je i najbolji način da „naletite“ na nešto interesantno.",
      ],
    },
    nearby: "U blizini",
    landmarks: ["Katedrala Srca Isusova", "Latinska ćuprija", "Baščaršija i Stari grad", "Međunarodni aerodrom Sarajevo · oko 10–12 km"],
  },
  contact: {
    meta: { title: "Kontakt", description: "Kontaktirajte Hotel Central Sarajevo: Ćumurija 8, 71000 Sarajevo · +387 33 561 800 · info@hotelcentral.ba" },
    hero: { eyebrow: "Kontakt", title: ["Naš tim", "je tu za Vas"], intro: "Naš tim rado će odgovoriti na sva Vaša pitanja. Nazovite nas ili nam pošaljite e-mail — rado ćemo pomoći." },
    office: "Recepcija i hotelski ured",
    officeBody: "Za sva opća pitanja, u bilo koje vrijeme Vašeg boravka.",
    reservations: "Rezervacije",
    reservationsBody: "Naš tim za rezervacije rado će Vam pomoći oko rezervacije, a možete rezervisati i online, direktno kod hotela.",
    write: "E-mail",
    social: "Pratite nas",
    socialBody: "Novosti i trenuci iz Hotela Central.",
  },
};

export function getPages(locale: Locale): PagesContent {
  return locale === "bs" ? bs : en;
}
