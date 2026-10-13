import type { Localized } from "@/lib/i18n";

export type RoomImage = { src: string; alt: Localized; position?: string };

export type Room = {
  slug: string;
  /** eZee room type id, copied from the room's "Book now" link on hotelcentral.ba */
  roomTypeId: string;
  sizeM2: number;
  sizeLabel: Localized;
  name: Localized;
  /** Serif title broken into editorial lines */
  titleLines: Localized<string[]>;
  /** Short verified feature, set in the grotesk line above the serif title */
  feature: Localized;
  summary: Localized;
  description: Localized<string[]>;
  /** Up to eight amenities for the homepage carousel */
  highlights: Localized<string[]>;
  amenities: Localized<string[]>;
  images: RoomImage[];
};

const img = (src: string, en: string, bs: string, position?: string): RoomImage => ({
  src: `/images/${src}`,
  alt: { en, bs },
  position,
});

/**
 * All copy below is taken from the room pages of hotelcentral.ba (EN and BS).
 * Prices are not published by the hotel, so none are shown.
 */
export const rooms: Room[] = [
  {
    slug: "single-room",
    roomTypeId: "1801900000000000003",
    sizeM2: 15,
    sizeLabel: { en: "Room size 15 m²", bs: "Veličina sobe 15 m²" },
    name: { en: "Single Room", bs: "Jednokrevetna soba" },
    titleLines: { en: ["Single", "Room"], bs: ["Jednokrevetna", "soba"] },
    feature: { en: "High large bed", bs: "Visoki krevet" },
    summary: {
      en: "An air-conditioned room with a high large bed (200×140 cm), writing desk and free Wi-Fi. Free upgrade upon availability.",
      bs: "Klimatizirana soba sa visokim krevetom veličine 200×140, radnim stolom i besplatnim WI-FI-jem. Besplatan upgrade prema raspoloživosti.",
    },
    description: {
      en: [
        "This air conditioned room features a high large bed (200×140 cm), writing desk, cable LCD TV, bathrobe/slippers, free Wi-Fi.",
        "Free upgrade upon availability.",
      ],
      bs: [
        "Ova klimatizirana soba, sa visokim krevetom veličine 200×140, sa radnim stolom, TV kablovskim programima, ogrtač/papuče, besplatan WI-FI, pruža ugodan boravak.",
        "Dostupan je besplatni prijelaz/upgrade u višu kategoriju, prema raspoloživosti.",
      ],
    },
    highlights: {
      en: ["Bed 200×140 cm", "Writing desk", "Cable LCD TV", "Mini bar", "Tea/coffee maker", "Bathrobe & slippers", "Free WiFi"],
      bs: ["Krevet 200×140", "Radni stol", "TV ravnog ekrana", "Minibar", "Kuhalo za vodu – kafa/čaj", "Ogrtač i papuče", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Mini bar", "Safety deposit box", "Tea/coffee maker", "TV flat screen", "Cable channels", "Telephone", "Air conditioning", "Hairdryer", "Iron & ironing board", "Bathrobe and slippers", "Desk and chair", "Free toiletries", "Toilet", "Private bathroom with shower/tub", "Closet", "Wake-up service", "Towels", "Linen", "Free WiFi"],
      bs: ["Minibar", "Sef", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Sušilo za kosu", "Pegla i daska za peglanje", "Ogrtač i papuče", "Radni stol", "Besplatan toaletni pribor", "WC", "Vlastita kupaonica – tuš/kada", "Usluga buđenja", "Kuhalo za vodu – kafa/čaj", "Ormar", "Ručnici", "Posteljina", "Besplatan WiFi"],
    },
    images: [
      img("single-room.jpg", "Single room with a high bed and textured headboard", "Jednokrevetna soba sa visokim krevetom", "50% 60%"),
      img("single-kupatilo.jpg", "Single room bathroom in white marble", "Kupaonica jednokrevetne sobe"),
    ],
  },
  {
    slug: "standard-twin-double",
    roomTypeId: "1801900000000000009",
    sizeM2: 26,
    sizeLabel: { en: "Room size 26 m²", bs: "Veličina sobe 26 m²" },
    name: { en: "Standard Twin/Double", bs: "Standardna dvokrevetna soba" },
    titleLines: { en: ["Standard", "Twin/Double"], bs: ["Standardna", "dvokrevetna"] },
    feature: { en: "Seating area", bs: "Prostor za sjedenje" },
    summary: {
      en: "Room with a flat-screen & cable TV, tea and coffee making facilities, a mini bar, safe and a spacious bathroom.",
      bs: "Soba ima TV ravnog ekrana sa kablovskim programima, kuhalo za pripremu kave/čaja, mini bar, sef i prostranu kupaonicu.",
    },
    description: {
      en: [
        "Room with a flat-screen & cable TV, tea and coffee making facilities, a mini bar, safe and a spacious bathroom.",
        "Free Wi-Fi is available in the room.",
      ],
      bs: [
        "Soba ima TV ravnog ekrana sa kablovskim programima, kuhalo za pripremu kave/čaja, mini bar, sef i prostranu kupaonicu.",
        "U sobi je dostupan besplatni bežični pristup internetu.",
      ],
    },
    highlights: {
      en: ["Seating area", "LCD flat screen TV", "Tea/coffee maker", "Minibar", "Safety deposit box", "Spacious bathroom", "Free WiFi"],
      bs: ["Prostor za sjedenje", "TV ravnog ekrana", "Kuhalo za kafu/čaj", "Minibar", "Sef", "Prostrana kupaonica", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Tea/Coffee maker", "Minibar", "Safety deposit box", "LCD flat screen TV", "Cable channels", "Telephone", "Air conditioning", "Hairdryer", "Iron", "Bathrobe & slippers", "Desk", "Seating area", "Free toiletries", "Toilet", "Private bathroom – shower/bath tub", "Closet", "Wake-up service", "Wardrobe or closet", "Towels", "Linen", "Free WiFi"],
      bs: ["Kuhalo za pripremu kafe/čaja", "Minibar", "Sef", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Sušilo za kosu", "Pegla i daska za peglanje", "Ogrtač i papuče", "Radni stol", "Prostor za sjedenje", "Besplatan toaletni pribor", "WC", "Vlastita kupaonica – tuš/kada", "Usluga buđenja", "Ormar", "Ručnici", "Posteljina", "Besplatan WiFi"],
    },
    images: [
      img("st-dvo-05.jpg", "Standard double room with patterned wallpaper", "Standardna dvokrevetna soba", "50% 55%"),
      img("d01.jpg", "Standard room with a double bed and sofa", "Standardna soba sa bračnim krevetom"),
      img("st-dvo-01.jpg", "Standard room with a double bed", "Standardna soba"),
      img("st-dvo-06.jpg", "Standard room bathroom", "Kupaonica standardne sobe"),
      img("st-dvo-02.jpg", "Fresh juice served in the room", "Svježi sok u sobi"),
    ],
  },
  {
    slug: "superior-double-room",
    roomTypeId: "1801900000000000004",
    sizeM2: 26,
    sizeLabel: { en: "Room size 26 m²", bs: "Veličina sobe 26 m²" },
    name: { en: "Superior Double Room", bs: "Superior dvokrevetna soba" },
    titleLines: { en: ["Superior", "Double Room"], bs: ["Superior", "dvokrevetna"] },
    feature: { en: "Armchairs & sofa", bs: "Naslonjači i sofa" },
    summary: {
      en: "Carefully equipped and decorated with well chosen materials and colours, with comfortable armchairs and sofas.",
      bs: "Pažljivo uređena i dekorisana odabranim materijalima i bojama, sa udobnim naslonjačima.",
    },
    description: {
      en: [
        "Superior room is carefully equipped and decorated with well chosen materials and colours, with comfortable armchairs and sofas, flat-screen TV, a spacious bathroom with shower and various amenities which would make you feel like at home.",
      ],
      bs: [
        "Superior sobe su pažljivo uređene i dekorisane odabranim materijalima i bojama, sa udobnim naslonjačima, LCD TV, prostranom kupaonicom sa tuš kabinom, te raznim dodacima koji će vam omogućiti da se osjećate kao kod kuće.",
      ],
    },
    highlights: {
      en: ["Armchairs & sofa", "Flat TV screen", "Spacious shower room", "Minibar / refrigerator", "Tea/coffee maker", "Writing desk", "Free WiFi"],
      bs: ["Udobni naslonjači", "LCD TV", "Prostrana kupaonica s tušem", "Minibar", "Kuhalo za kafu/čaj", "Radni stol", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Minibar / Refrigerator", "Tea/coffee maker", "Safety deposit box", "Flat TV screen", "Telephone", "Air conditioning", "Hairdryer", "Iron and ironing board", "Bathrobe/Slippers", "Writing desk", "Free toiletries", "Toilet", "Private bathroom with shower", "Wake-up service", "Closet", "Towels", "Linen", "Free WiFi"],
      bs: ["Minibar", "Sef", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Sušilo za kosu", "Pegla i daska za peglanje", "Ogrtač i papuče", "Radni stol", "Besplatan toaletni pribor", "WC", "Vlastita kupaonica – tuš/kada", "Usluga buđenja", "Kuhalo za vodu – kafa/čaj", "Ormar", "Ručnici", "Posteljina", "Besplatan WiFi"],
    },
    images: [
      img("img_9067.jpg", "Superior double room with damask wallpaper", "Superior dvokrevetna soba", "50% 60%"),
      img("img_9052.jpg", "Superior room with a sofa at the foot of the bed", "Superior soba sa sofom"),
      img("img_9064.jpg", "Seating corner in the superior room", "Kutak za sjedenje u superior sobi"),
      img("img_9076.jpg", "Glass shower in the superior bathroom", "Tuš kabina u kupaonici"),
      img("img_9088.jpg", "Writing desk with kettle", "Radni stol sa kuhalom"),
    ],
  },
  {
    slug: "family-room",
    roomTypeId: "1801900000000000006",
    sizeM2: 50,
    sizeLabel: { en: "Room size 50 m²", bs: "Veličina sobe 50 m²" },
    name: { en: "Family Room", bs: "Obiteljska soba" },
    titleLines: { en: ["Family", "Room"], bs: ["Obiteljska", "soba"] },
    feature: { en: "Two double beds", bs: "Dva bračna kreveta" },
    summary: {
      en: "More than 50 square meters in the modern, newly built part of the hotel — two high double beds or four single beds.",
      bs: "Preko 50 kvadrata u modernom, tek izgrađenom dijelu hotela — 2 udobna bračna kreveta ili 4 odvojena kreveta.",
    },
    description: {
      en: [
        "Family room – four bedded room / quadruple is located in a modern, newly built part of the hotel. It offers a space of more than 50 square meters and is equipped with two comfortable high double beds or four single beds.",
        "A perfect space for a family or a group of friends.",
      ],
      bs: [
        "Obiteljska – četverokrevetna soba nalazi se u modernom tek izgrađenom dijelu hotela. Pruža prostranost od preko 50 kvadrata i opremljena je sa 2 udobna bračna kreveta ili sa 4 odvojena kreveta. 2 kupatila.",
        "Savršena soba za porodicu ili grupu prijatelja.",
      ],
    },
    highlights: {
      en: ["Over 50 m²", "Two double or four single beds", "Sofa bed", "LCD flat screen TV", "Tea/coffee maker", "Bathrobe & slippers", "Free WiFi"],
      bs: ["Preko 50 m²", "2 bračna ili 4 odvojena kreveta", "Dva kupatila", "TV ravnog ekrana", "Kuhalo za kafu/čaj", "Ogrtač i papuče", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Safety deposit box", "LCD flat screen TV", "Tea/coffee maker", "Telephone", "Air conditioning", "Hairdryer", "Iron and ironing board", "Desk", "Toilet", "Free toiletries", "Private bathroom", "Bathrobe & slippers", "Wake-up service", "Wardrobe or closet", "Towels", "Sofa bed", "Free WiFi"],
      bs: ["Sef", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Sušilo za kosu", "Pegla i daska za peglanje", "Radni stol", "WC", "Vlastita kupaonica – tuš/kada", "Ogrtač i papuče", "Usluga buđenja", "Kuhalo za vodu – kafa/čaj", "Ormar", "Ručnici", "Besplatan WiFi"],
    },
    images: [
      img("family1-new.jpg", "Family room with geometric wallpaper", "Obiteljska soba", "50% 60%"),
      img("family2-new.jpg", "Bedside detail in the family room", "Detalj obiteljske sobe"),
      img("family3-new.jpg", "Family room with high double bed", "Obiteljska soba sa bračnim krevetom"),
      img("family4-new.jpg", "Family room bathroom", "Kupaonica obiteljske sobe"),
      img("s01.jpg", "Bedroom in the newly built wing", "Soba u novom dijelu hotela"),
    ],
  },
  {
    slug: "junior-suite",
    roomTypeId: "18019000000000000010",
    sizeM2: 37,
    sizeLabel: { en: "Room size 37 m²", bs: "Veličina sobe 37 m²" },
    name: { en: "Junior Suite", bs: "Junior Suite" },
    titleLines: { en: ["Junior", "Suite"], bs: ["Junior", "Suite"] },
    feature: { en: "King-size bed", bs: "King size krevet" },
    summary: {
      en: "Spacious suite with a flat-screen cable TV, a seating area, tea and coffee making facilities, a mini bar and a spacious bathroom.",
      bs: "Prostrani polu-apartman sa TV ravnog ekrana, udobnim prostorom za sjedenje, minibarom i prostranom kupaonicom.",
    },
    description: {
      en: [
        "Spacious suite with a flat-screen cable TV, a seating area, tea and coffee making facilities, a mini bar and a spacious bathroom.",
        "Free Wi-Fi is available in the room.",
      ],
      bs: [
        "Ovaj prostrani polu-apartman ima TV ravnog ekrana sa kablovskim programima, udoban prostor za sjedenje, kuhalo za pripremu čaja/kafe, mini bar i prostranu kupaonicu.",
        "U sobi je dostupan besplatni bežični pristup internetu.",
      ],
    },
    highlights: {
      en: ["Queen/King size bed", "Seating area", "Sofa", "Bath tub / shower", "Tea/coffee maker", "Mini bar", "Free WiFi"],
      bs: ["Visoki queen/king size krevet", "Prostor za sjedenje", "Sofa na rasklapanje", "Kada/tuš", "Kuhalo za kafu/čaj", "Minibar", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Tea/Coffee maker", "Mini bar", "Safety deposit box", "TV flat screen", "Cable channels", "Telephone", "Air conditioning", "Hairdryer", "Iron & ironing board", "Bathrobe & slippers", "Desk", "Seating area", "Free toiletries", "Toilet", "Private bathroom – shower/bath tub", "Queen/King size beds (> 2 metres)", "Closet", "Sofa", "Wake-up service", "Towels", "Linen", "Free WiFi"],
      bs: ["Kuhalo za pripremu kafe/čaja", "Minibar", "Kada/tuš", "Sef", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Sušilo za kosu", "Pegla i daska za peglanje", "Ogrtač i papuče", "Radni stol", "Prostor za sjedenje", "Besplatan toaletni pribor", "WC", "Vlastita kupaonica – tuš/kada", "Visoki queen/king size krevet", "Usluga buđenja", "Ormar", "Ručnici", "Posteljina", "Sofa/kauč na rasklapanje", "Besplatan WiFi"],
    },
    images: [
      img("junior02.jpg", "Junior suite bedroom", "Spavaći dio Junior suite", "50% 55%"),
      img("junior01.jpg", "Seating area of the junior suite", "Prostor za sjedenje u Junior suite"),
      img("junior03.jpg", "Junior suite with a king-size bed", "Junior suite sa king size krevetom"),
    ],
  },
  {
    slug: "presidential-suite",
    roomTypeId: "1801900000000000005",
    sizeM2: 53,
    sizeLabel: { en: "Apartment size 53 m²", bs: "Veličina apartmana 53 m²" },
    name: { en: "Presidential Suite", bs: "Predsjednički apartman" },
    titleLines: { en: ["Presidential", "Suite"], bs: ["Predsjednički", "apartman"] },
    feature: { en: "Private terrace", bs: "Vlastita terasa" },
    summary: {
      en: "A separate living room and bedroom with a high king-size bed, a fully equipped kitchen, two separate toilets and a terrace.",
      bs: "Odvojeni dnevni boravak i spavaća soba sa visokim king size krevetom, potpuno opremljena kuhinja, dva WC-a i terasa.",
    },
    description: {
      en: [
        "Elegantly decorated Presidential Suite consists of a separate living room and a bedroom with a high king-size bed, spacious bathroom, two separate toilets, fully equipped kitchen and terrace.",
        "Tastefully decorated with selected pieces of furniture, it appeals to luxury and elegance in order to make your stay more comfortable in the centre of Sarajevo.",
        "The Presidential suite offers complete diversity for those guests who are looking for luxury comfort and know to appreciate intimacy and peace, cold drinks, an always open corner for coffee and tea, and the possibility of making your own meals.",
      ],
      bs: [
        "Elegantno uređeni Predsjednički apartman sastoji se od odvojenog dnevnog boravka i spavaće sobe sa visokim king size krevetom, prostrane kupaonice, sa dva WC-a, potpuno opremljene kuhinje i terase.",
        "Lijepo uređen apartman sa biranim komadima namještaja odiše luksuzom i elegancijom, kako bi Vaš boravak bio što ugodniji, te će Vam omogućiti da u samom centru Sarajeva uživate na najbolji mogući način.",
        "Predsjednički apartman nudi potpunu raznolikost za one goste koji traže luksuznu udobnost, ali znaju cijeniti intimu i mir, rashlađena pića i uvijek otvoreni kutak za kafu i čaj, sa mogućnošću pripreme vlastitih obroka.",
      ],
    },
    highlights: {
      en: ["Separate living room", "High king-size bed", "Fully equipped kitchen", "Terrace", "Two separate toilets", "Bathtub", "Free WiFi"],
      bs: ["Odvojeni dnevni boravak", "Visoki king size krevet", "Potpuno opremljena kuhinja", "Terasa", "Dva odvojena toaleta", "Kada", "Besplatan WiFi"],
    },
    amenities: {
      en: ["Fully equipped kitchen", "Dining table", "LCD flat screen TV", "Telephone", "Air conditioning", "Safety deposit box", "Hairdryer", "Free toiletries", "Iron and ironing board", "Bathrobe and slippers", "Writing desk", "Toilets", "Private bathroom with bathtub", "Sofa – open couch (2 persons)", "Wake-up service", "Electric kettle and coffee machine", "Wardrobe – 2 closets", "Terrace", "Towels", "Free WiFi"],
      bs: ["Sef", "Potpuno opremljena kuhinja", "TV ravnog ekrana", "Kablovski kanali", "Telefon", "Klima uređaj – grijanje/hlađenje", "Kafe mašina za espresso kafu", "Stol za ručak", "Sušilo za kosu", "Pegla i daska za peglanje", "Radni stol", "Dva odvojena toaleta", "Kauč/sofa (za 2 osobe)", "Vlastita kupaonica – kada", "Terasa", "Ogrtač i papuče", "Usluga buđenja", "Kuhalo za vodu – kafa/čaj", "Ormar", "Ručnici", "Besplatan WiFi"],
    },
    images: [
      img("p05.jpg", "Living room of the presidential suite", "Dnevni boravak predsjedničkog apartmana", "50% 55%"),
      img("p01.jpg", "Presidential suite bedroom with king-size bed", "Spavaća soba sa king size krevetom"),
      img("p03.jpg", "Dining table and kitchen", "Stol za ručak i kuhinja"),
      img("p11.jpg", "Private terrace above the rooftops of Sarajevo", "Terasa apartmana"),
      img("p12.jpg", "Marble bathroom", "Kupaonica"),
      img("p14.jpg", "Coffee machine in the suite kitchen", "Aparat za kafu"),
    ],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
