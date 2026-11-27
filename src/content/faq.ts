import type { Locale } from "@/lib/i18n";

export type FaqSection = { title: string; items: { q: string; a: string[] }[] };

/** The hotel's own FAQ (hotelcentral.ba), from wordpress/content/faq.{en,bs}.txt. Used by /faq and the WordPress version. */
export const faqSections: Record<Locale, FaqSection[]> = {
 "en": [
  {
   "title": "Hotel & Accommodation",
   "items": [
    {
     "q": "Where is Hotel Central Sarajevo located?",
     "a": [
      "Hotel Central is located in the heart of Sarajevo, just a short walk from the historic Old Town (Baščaršija), shopping streets, restaurants and major attractions."
     ]
    },
    {
     "q": "Does Hotel Central offer parking?",
     "a": [
      "The hotel does not have private parking facilities. However, several public and commercial parking options are available nearby, and our reception team can provide guidance."
     ]
    },
    {
     "q": "What time are check-in and check-out?",
     "a": [
      "Check-in is from 15:00 and check-out is until 11:00. Early check-in or late check-out may be available upon request, subject to availability."
     ]
    },
    {
     "q": "Is breakfast included in my stay?",
     "a": [
      "Buffet style breakfast, with a selection of both hot and cold dishes is included with all hotel stays and runs from 07:00 until 10:00 each morning"
     ]
    },
    {
     "q": "Does Hotel Central offer free Wi-Fi?",
     "a": [
      "Yes, complimentary Wi-Fi is available to hotel guests."
     ]
    }
   ]
  },
  {
   "title": "Central Fitness Club",
   "items": [
    {
     "q": "Does Hotel Central have a gym and swimming pool?",
     "a": [
      "Yes. Central Fitness Club features an extensive range of fitness equipment, a 25-metre indoor swimming pool and additional wellness facilities."
     ]
    },
    {
     "q": "Can non-hotel guests use Central Fitness Club?",
     "a": [
      "Absolutely! Central Fitness Club operates as a standalone fitness facility, offering membership options to the public as well as access for hotel guests."
     ]
    },
    {
     "q": "Is access to Central Fitness Club included with my hotel stay?",
     "a": [
      "Access to our fitness and wet area facilities is included with all stays at Hotel Central. During your stay, feel free to make use of our full fitness facilities, including our 25m swimming pool, sauna and steam rooms!"
     ]
    }
   ]
  },
  {
   "title": "Day Spa",
   "items": [
    {
     "q": "Does Hotel Central have a spa?",
     "a": [
      "Yes. Our dedicated Day Spa offers a range of professional massage, beauty and wellness treatments in a relaxing environment."
     ]
    },
    {
     "q": "Can I book a spa treatment without staying at the hotel?",
     "a": [
      "Yes absolutely! Central Day Spa is open to the public and hotel guests from Tuesday to Saturday from 11:00 until 20:00. Advance reservations are recommended to secure your preferred treatment and appointment time.",
      "Also, with every treatment booked, you can use our pool and thermal facilities for up to 2 hours at no extra cost."
     ]
    },
    {
     "q": "How can I book a spa treatment?",
     "a": [
      "You can contact our Day Spa team directly on +387 33 561 830 or at dayspa@hotelcentral.ba, or enquire through hotel reception for treatment information, availability and reservations."
     ]
    }
   ]
  },
  {
   "title": "Café & Additional Services",
   "items": [
    {
     "q": "Does Hotel Central have a café?",
     "a": [
      "Yes. Central Café offers quality coffee, tea, cold beverages and a selection of cakes and sweet treats in a welcoming city-centre setting."
     ]
    },
    {
     "q": "Does Hotel Central offer conference or meeting facilities?",
     "a": [
      "Yes. We provide meeting and conference facilities suitable for corporate gatherings, presentations and professional events. Contact our team for availability and arrangements."
     ]
    },
    {
     "q": "How far is Hotel Central from Sarajevo International Airport?",
     "a": [
      "The hotel is approximately 10–12 km from Sarajevo International Airport. Approximately 20-25 minutes by car, but travel times may vary depending on traffic conditions."
     ]
    },
    {
     "q": "How can I contact Hotel Central to get more information or make a booking?",
     "a": [
      "You can reach our reception team by telephone at +387 33 561 800, by email at info@hotelcentral.ba, and we’ll be happy to answer any additional questions you might have! You can also book directly on our website."
     ]
    }
   ]
  }
 ],
 "bs": [
  {
   "title": "Hotel i smještaj",
   "items": [
    {
     "q": "Gdje se nalazi Hotel Central Sarajevo?",
     "a": [
      "Hotel Central smješten je u samom srcu Sarajeva, na svega nekoliko minuta hoda od historijske jezgre grada (Baščaršije), trgovačkih ulica, restorana i glavnih turističkih atrakcija."
     ]
    },
    {
     "q": "Da li Hotel Central ima parking?",
     "a": [
      "Hotel ne raspolaže vlastitim parkingom. Međutim, u neposrednoj blizini dostupno je nekoliko javnih i komercijalnih parkinga, a naše osoblje na recepciji rado će vam pružiti dodatne informacije."
     ]
    },
    {
     "q": "U koliko sati je prijava i odjava iz hotela?",
     "a": [
      "Prijava u hotel (check-in) moguća je od 15:00 sati, a odjava (check-out) do 11:00 sati. Ranija prijava ili kasnija odjava mogu biti omogućene na zahtjev, u zavisnosti od raspoloživosti."
     ]
    },
    {
     "q": "Da li je doručak uključen u cijenu smještaja?",
     "a": [
      "Da, doručak na bazi švedskog stola uključen je u cijenu svakog boravka u hotelu. Gostima je na raspolaganju raznovrstan izbor toplih i hladnih jela, a doručak se poslužuje svakog jutra od 07:00 do 10:00 sati."
     ]
    },
    {
     "q": "Da li Hotel Central nudi besplatan Wi-Fi?",
     "a": [
      "Da, svim gostima hotela dostupan je besplatan bežični internet (Wi-Fi)."
     ]
    }
   ]
  },
  {
   "title": "Central Fitness Club",
   "items": [
    {
     "q": "Da li Hotel Central ima teretanu i bazen?",
     "a": [
      "Da. Central Fitness Club nudi širok izbor savremene fitness opreme, zatvoreni bazen dužine 25 metara i dodatne wellness sadržaje."
     ]
    },
    {
     "q": "Mogu li Central Fitness Club koristiti osobe koje nisu gosti hotela?",
     "a": [
      "Naravno! Central Fitness Club posluje i kao samostalni fitness centar, nudeći različite mogućnosti članstva za vanjske korisnike, kao i pristup gostima hotela."
     ]
    },
    {
     "q": "Da li je korištenje Central Fitness Cluba uključeno u cijenu boravka u hotelu?",
     "a": [
      "Da, korištenje fitness i wellness sadržaja uključeno je u cijenu svakog boravka u Hotelu Central. Tokom boravka možete besplatno koristiti našu kompletno opremljenu teretanu, zatvoreni bazen dužine 25 metara, saunu i parna kupatila."
     ]
    }
   ]
  },
  {
   "title": "Day Spa",
   "items": [
    {
     "q": "Da li Hotel Central ima spa centar?",
     "a": [
      "Da. Naš Day Spa nudi raznovrsne profesionalne masaže, kozmetičke i wellness tretmane u ugodnom i opuštajućem ambijentu."
     ]
    },
    {
     "q": "Mogu li rezervisati spa tretman ako nisam gost hotela?",
     "a": [
      "Naravno! Central Day Spa otvoren je za sve posjetioce, kao i za goste hotela, od utorka do subote, u periodu od 11:00 do 20:00 sati. Preporučujemo rezervaciju unaprijed kako biste osigurali željeni tretman i termin.",
      "Također, uz svaki rezervisani tretman, možete koristiti naš bazen i termalne sadržaje do 2 sata bez dodatnih troškova."
     ]
    },
    {
     "q": "Kako mogu rezervisati spa tretman?",
     "a": [
      "Za informacije o tretmanima, slobodnim terminima i rezervacijama možete direktno kontaktirati naš Day Spa tim (+387 33 561 830, dayspa@hotelcentral.ba) ili se obratiti recepciji hotela."
     ]
    }
   ]
  },
  {
   "title": "Central Café i dodatne usluge",
   "items": [
    {
     "q": "Da li Hotel Central ima kafić?",
     "a": [
      "Da. Central Café nudi kvalitetnu kafu, čajeve, hladne napitke te izbor kolača i slatkih poslastica u ugodnom ambijentu u samom centru Sarajeva."
     ]
    },
    {
     "q": "Da li Hotel Central nudi prostor za konferencije i poslovne sastanke?",
     "a": [
      "Da. Hotel raspolaže prostorom za sastanke i konferencije, pogodnim za poslovna okupljanja, prezentacije i profesionalne događaje. Kontaktirajte naš tim za više informacija o raspoloživosti i organizaciji."
     ]
    },
    {
     "q": "Koliko je Hotel Central udaljen od Međunarodnog aerodroma Sarajevo?",
     "a": [
      "Hotel je udaljen približno 10–12 km od Međunarodnog aerodroma Sarajevo. Vožnja automobilom obično traje oko 20–25 minuta, u zavisnosti od saobraćajnih uslova."
     ]
    },
    {
     "q": "Kako mogu kontaktirati Hotel Central za dodatne informacije ili rezervaciju?",
     "a": [
      "Našu recepciju možete kontaktirati telefonom na broj +387 33 561 800 ili putem e-maila na info@hotelcentral.ba. Naš tim rado će odgovoriti na sva vaša dodatna pitanja!",
      "Rezervaciju smještaja možete izvršiti i direktno putem naše web stranice."
     ]
    }
   ]
  }
 ]
};
