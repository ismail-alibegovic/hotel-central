# Hotel Central Sarajevo — završni krug izmjena (26.11.2026)

Izvor zahtjeva: Google Sheet „Hotel Website sitemap“, tab **Website Changes** (pročitane stvarne vrijednosti ćelija, boje pozadine i bilješke preko Sheets API‑ja, ne CSV). Ostali tabovi (Current Sitemap, PROPOSED Sitemap, Global Elements, Instructions) nemaju novih (bijelih) zahtjeva. Sheet nije mijenjan.

Prilozi koje je Dara 26.11.2026 dodao na Drive i koji su korišteni:

| Fajl (Drive) | Za šta je korišten |
| --- | --- |
| `HOTEL images / image.png`, `Untitled design (1).svg` | referenca svjetline i boje za naslovnu fotografiju (CH‑023) — sama slika je 1086 px i AI‑obrađena, preslaba za hero od 1920 px, pa je isti kadar napravljen iz originalne fotografije `3064.jpg` |
| `GYM images / Copy of Timetable Sept 2026.svg` | sedmični raspored časova (CH‑043) |
| `GYM images / class description.png` | opisi 11 časova, EN i BS (CH‑043) |
| `DAY SPA images / Untitled design.svg` | pregledano (flyer s logotipom i relax sobom); nije tražena izmjena na osnovu njega |

Kanonska implementacija: **Next.js stranica** (Vercel demo, `src/content` je izvor sadržaja). **WordPress paket** (`wordpress/`) generiše se iz istog sadržaja (`wordpress/build/generate.mts`) i ažuriran je u istom PR‑u, pa izmjene ne postoje samo na Vercel demonstraciji.

Polazno stanje: grana `claude/elegant-knuth-6rrpar` = `main` @ `5675801`, što je i trenutni produkcijski Vercel deployment (`hotel-central-pi.vercel.app`).

---

## 1. Sažetak

| | Broj |
| --- | --- |
| Novi zahtjevi (bijeli redovi CH‑021 – CH‑055) | **35** |
| Implementirano u potpunosti | **33** |
| Implementirano s dostupnim materijalom, čeka dopunu klijenta | **2** (CH‑024: postojeće fotografije posvijetljene do dostave novih; CH‑043: raspored + 11 dostavljenih opisa, 6 časova bez opisa — ništa nije izmišljeno) |
| Blokirano | **0** |
| Ranije završeni (zeleni, CH‑001 – CH‑020) | 20 — nisu mijenjani, osim gdje novi zahtjev to izričito traži (CH‑022 mijenja CH‑007) |

Regresije: nijedna zelena stavka nije vraćena. Usput su ispravljene dvije postojeće greške koje su zahtjevi otkrili: tekst „Trenirajte na svoj način,“ na klubu je na telefonu (BS) izlazio izvan ekrana, a zaglavlje kluba na 1280 px je odsijecalo dugme „Become a member“.

---

## 2. Matrica zahtjeva

Statusi: COMPLETED (završeno ranije, zeleno), NEW → implementirano u ovom krugu, PARTIALLY IMPLEMENTED, BLOCKED — CLIENT INPUT REQUIRED.

### Ranije završeno (zeleno)

CH‑001 – CH‑020 (Website Changes!A2:A21): **COMPLETED**. Provjereno da su i dalje na snazi (logo u headeru, vidljivo „Book now“, odvojeni klub i spa, kontakt bez forme, footer s logom, privatnost).

### Novi zahtjevi

| ID (ćelija) | Stranica | Prije | Izmjena | Status | Verifikacija |
| --- | --- | --- | --- | --- | --- |
| CH‑021 (A22/E22) | Meni | „Fitness Club“, „Day Spa“ | „Central Fitness Club“, „Central Day Spa“ (EN, BS, WP meni) | Implementirano | meni na 390/1440, smoke test redoslijeda linkova |
| CH‑022 (A23/E23) | Meni / O nama | Odvojeni Restaurant i Central Café | Jedna stranica **Central Café** pod O nama (`/about/cafe`), u meniju uvučena ispod „O nama“; ponuda: topli napici (kafa, čaj, topla čokolada), hladni napici, juice bar, smoothieji, slatkiši; ketering za goste i poslovne događaje na upit. `/restaurant` i `/cafe` → 308 na `/about/cafe`. Sekcija na naslovnoj sada vodi na kafić. Spomeni „restorana“ uklonjeni (doručak, sastanci). Bez cijena i menija. | Implementirano | screenshot kafića 1440, redirect, smoke |
| CH‑023 (A24/E24) | Naslovna | Desaturisan, taman hero | Ista fotografija fasade obrađena prema brošuri: topla bijela fasada, zasićeno plavo nebo, lagani veo samo radi čitljivosti (`public/images/home/facade-warm.jpg`) | Implementirano | screenshot 1440×900 |
| CH‑024 (A25/E25) | Sve fotografije | CSS „grade“ smanjivao zasićenost (0,42–0,6) | Grade sada samo posvjetljava i dodaje toplinu (zasićenost 1,05–1,12), i u hero sekcijama podstranica i završnoj rezervaciji | **Djelimično** — tehnički urađeno; Dara je ponudila AI‑poboljšane fotografije u Driveu, još nisu dostavljene | vizuelno na svim stranicama |
| CH‑025 (A26/E26) | Boje | Sivkasta maslinasta (#50563F, #363A2A, #A1AA82) | Bogatija, svjetlija zelena: #3E6A48, #22402C, #A3BF8F (Next.js + WP tema, theme‑color) | Implementirano | screenshoti O nama, footer |
| CH‑026 (A27/E27) | O nama / sobe | Prazan prostor iznad „Comfort, thoughtfully designed“, naslov preko slike | Tekst kreće u visini fotografije i ne prelazi preko nje (vrijedi za sve split sekcije) | Implementirano | screenshot O nama |
| CH‑027 (A28/E28) | O nama / unwind | Prazan prostor iznad „After a day of sightseeing“ | Isto rješenje | Implementirano | screenshot |
| CH‑028 (A29/E29) | O nama / unwind | Fitness club = pill sa strelicom, Day Spa = obični link | Oba dugmeta isti pill sa strelicom (sve split sekcije) | Implementirano | screenshot |
| CH‑029 (A30/E30) | O nama / Good to know | Kartice „Central Café“ + „FAQ → nova stranica“ | „Good to know“ je sam FAQ (svih 16 pitanja, harmonika) na O nama, s FAQPage strukturiranim podacima; footer link „FAQ“ vodi na `/about#faq` | Implementirano | screenshot, QA |
| CH‑030 (A31/E31) | „Your stay starts here“ | Fasada noću, jako zatamnjena | Svijetla sunčana lounge fotografija, lagani veo; default završne sekcije u WP je svijetla fasada | Implementirano | screenshot |
| CH‑031 (A32/E32) | Rooms & Suites | Linija „High large bed“, „Seating area“… iznad naziva | Uklonjena | Implementirano | QA, HTML |
| CH‑032 (A33/E33) | Single Room | „Free upgrade“, minibar, WC, posteljina, ormar, peškiri, telefon | „Upgrade available upon request“ / „Prelazak (upgrade) u višu kategoriju dostupan je na upit“; navedeni sadržaji uklonjeni (EN+BS), minibar i iz istaknutih stavki | Implementirano | grep, stranica sobe |
| CH‑033 (A34/E34) | Standard Twin/Double | Minibar u opisu i sadržajima | Uklonjen iz opisa; minibar, WC, posteljina, ormar („Closet“ i „Wardrobe or closet“), peškiri, telefon uklonjeni | Implementirano | grep |
| CH‑034 (A35/E35) | Superior Double | | Minibar, WC, toalet papir, posteljina, ormar, peškiri, telefon uklonjeni | Implementirano | grep |
| CH‑035 (A36/E36) | Family Room | | WC, peškiri, ormar uklonjeni | Implementirano | grep |
| CH‑036 (A37/E37) | Junior Suite | Minibar u opisu | Uklonjen iz opisa; minibar, WC, posteljina, ormar, peškiri, telefon uklonjeni | Implementirano | grep |
| CH‑037 (A38/E38) | Presidential Suite | | Peškiri, toaleti, toalet papir, telefon uklonjeni iz sadržaja (opis „dva odvojena toaleta“ ostaje) | Implementirano | grep |
| CH‑038 (A39/E39) | Meetings & Events | „Third floor“; prazan prostor iznad „Entrust us with it“ | „First floor“/„Prvi sprat“ svuda (stranica, naslovna, ponuda, meta opis); nova činjenica „Catering — Available upon request“; tekst sekcije bez praznog prostora; „Coffee breaks & catering — available upon request“ | Implementirano | grep, screenshot |
| CH‑039 (A40/E40) | Kontakt | Naslov izlazio preko rubova | Veličina naslova se prilagođava najdužem redu, uvijek stane na ekran | Implementirano | screenshot 1440 |
| CH‑040 (A42/E42) | Klub – hero | Natpis „Feel your power“ u pozadini | Nova fotografija (strength floor, bez natpisa) | Implementirano (Dara je pitala „what do you think?“ — potvrditi izbor fotografije) | screenshot |
| CH‑041 (A43/E43) | Klub | Na laptopima (npr. 1280×720) hero fiksne visine odsijecao je traku sa statistikama | Hero raste sa sadržajem, naslov se skalira po visini ekrana | Implementirano | screenshot 1280×720 |
| CH‑042 (A44/E44) | Klub | Prazan prostor iznad „The latest cardio…“ | Tekst poravnat s naslovom | Implementirano | screenshot |
| CH‑043 (A45/E45) | Klub / Timetable | Prazan raspored; Timetable zasebna stavka menija | Raspored iz slike unesen kao tabela (19 časova, Pon–Ned), opisi časova iz „class description“ (EN+BS, s trajanjem); „Classes“ u meniju vodi na stranicu „Classes & timetable“, zasebne stavke Timetable više nema (Next + WP) | **Djelimično** — 6 časova iz rasporeda nema opis (vidi §6) | screenshot, smoke |
| CH‑044 (A46/E46) | Membership | „Price on request“ | Full membership **135 KM**, Student **90 KM** | Implementirano (period plaćanja nije naveden — vidi §6) | screenshot |
| CH‑045 (A47/E47) | Membership | „…and Central Day Spa“ | „Full access to the club, 7 days a week“ | Implementirano | |
| CH‑046 (A48/E48) | Membership | Drugačiji opis studentske | Isti opis kao puna, niža cijena | Implementirano | |
| CH‑047 (A49/E49) | Membership – uključeno | | + „Members-only specials at Central Day Spa“; „Access to all group classes weekly“; „Access to our pool, sauna and steam room“ | Implementirano | |
| CH‑048 (A50/E50) | Pool & saunas | Caldarium, hidromasažni bazeni, finska sauna | Bazen 25 m s hidromasažnim mlazovima, sauna, parno kupatilo, bazen za hlađenje, „New recovery experience — coming soon“. Statistika „5 zona“ → „4“, caldarium uklonjen i s naslovne | Implementirano | grep |
| CH‑049 (A51/E51) | Meni kluba | Samo strelica „←“ | Pill „← Hotel Central“ uz logo (kao na spa headeru), i u mobilnom meniju; WP isto | Implementirano | screenshot 1280–1920, mobilni meni |
| CH‑050 (A52/E52) | Day Spa | „Relax the body, quiet the mind“ | „Relax the body, and the mind“ / „Opustite tijelo i um“ | Implementirano | HTML |
| CH‑051 (A53/E53) | Day Spa – rotirajući krug | Tekst se preklapao („centrcentral day spa“) | „Central Day Spa · Book now ·“ tačno jednom oko kruga | Implementirano | screenshot |
| CH‑052 (A54/E54) | Our treatments | „…face and calm“ | „Treatments for body, face and mind“ / „…lice i um“ | Implementirano | HTML |
| CH‑053 (A55/E55) | Packages | „Most chosen“ desno; prazan prostor | „Most popular“ / „Najpopularnije“ centrirano na vrhu kartice; „Why Central Day Spa“ bez praznog prostora | Implementirano | screenshot |
| CH‑054 (A56/E56) | Day Spa kontakt | Hotelski e‑mail | dayspa@hotelcentral.ba: spa stranica, spa footer, kontakt stranica (kartica Day Spa), FAQ; u WP nova postavka „Central Day Spa e‑mail“ | Implementirano | HTML (8 pojavljivanja na /dayspa) |
| CH‑055 (A57/E57) | Radno vrijeme | „Sunday, Monday: —“ | „Sunday, Monday: Closed“ / „Zatvoreno“ (spa i klub, WP postavka) | Implementirano | HTML |

---

## 3. Pregled izmjena po stranicama

- **Naslovna:** svijetli topli hero; sekcija „Central Café“ (umjesto restorana) s fotografijom kafića i linkom na `/about/cafe`; spa tekst bez caldariuma.
- **Header / meni / overlay:** novi nazivi; Central Café kao uvučena podstavka ispod O nama; brojevi samo za glavne stavke; footer „Explore“ uključuje kafić.
- **O nama:** split sekcije bez praznog prostora, isti pillovi, FAQ na stranici, svijetla završna fotografija.
- **Central Café (`/about/cafe`):** ponuda pića i slatkiša, ketering (e‑mail upit + link na sastanke), lounge, završna rezervacija. Restoran više ne postoji kao stranica.
- **Sobe:** lista bez linije s osobinom; detalji soba prema CH‑032–037.
- **Meetings & Events:** prvi sprat, ketering na upit.
- **Kontakt:** naslov stane; kartica Day Spa s brojem i e‑mailom.
- **Central Fitness Club:** nova hero fotografija, hero bez odsijecanja, intro bez praznog prostora, pill nazad na hotel, „Classes“ → raspored + opisi, članarine s cijenama, nova lista pogodnosti, zona bazena.
- **Central Day Spa:** naslov, krug, naslov tretmana, „Most popular“, spa e‑mail, „Closed“.
- **Boje i fotografije (globalno):** nove zelene vrijednosti, grade bez desaturacije.
- **WordPress:** sve gore navedeno u generatoru stranica, temi i pluginu (vidi §5).

## 4. Testovi i provjere (drugi krug, 26.11.2026 navečer)

Sheet je ponovo pročitan (vrijednosti, boje, bilješke) — identičan prvom čitanju; na Driveu nema novijih materijala.

| Provjera | Rezultat |
| --- | --- |
| Automatska provjera svih 35 zahtjeva (`verify.cjs`: 64 tvrdnje, EN + BS, uključujući izmjerene pozicije — naslov u visini fotografije, centriran „Most popular“, traka sa statistikom vidljiva na 1280×720 / 1366×768 / 1440×800, krug spa s tekstom jednom) | **64/64** |
| QA prolaz: 19 ruta × 2 jezika × 375, 390, 768, 1280, 1440, 1920 px (228 provjera) | **0 problema** (HTTP 200, bez horizontalnog preliva, slike, jedan H1, meta opis, canonical, alt, konzola) |
| Crawler linkova (sve stranice dostupne iz menija/footera, oba jezika) | 36 stranica, 138 slika, sva sidra (#…) — **0 neispravnih**; 13 vanjskih linkova (letsbook.me, Lime Booking, Instagram, Facebook, Google Maps) — svi **200** |
| `npm run lint` / `typecheck` / `build` | prolaze (Next.js **16.4.6**) |
| Playwright smoke (144) | **144/144** (lokalno i CI) |
| Vitest — CMS integracija (lokalni PostgreSQL 16) | **302/302** (prije: 16 padova, svi i na `main`) |
| CMS end‑to‑end (Payload admin, API, uloge, nacrti, parity CMS↔statično, outage baze) | **206 prošlo, 0 palo** (+ outage faza 3/3, sken tajni u klijentskom bundleu i runtime trace — čisto); 18 CMS‑only screenshotova renderuje CI |
| Backup + restore drill | prolazi (5,7 s) |
| Vizuelne bazne slike | pregledane ručno (sve stranice, desktop/tablet/mobile, meni, footer, CMS sekcije), zatim regenerisane na CI runneru (72 slike, workflow „Update visual baselines“); zastarjele `en-restaurant.png` uklonjene |
| WordPress | `site.json` provjeren za svaki zahtjev (sadrži nove tekstove, ne sadrži uklonjene); PHP lint čist; Playground uvoz (WP latest, PHP 8.3, Elementor, Polylang) radi |
| Vercel Preview | 24 stranice EN/BS 200, redirecti `/restaurant` i `/cafe` → `/about/cafe` |

### Popravke u drugom krugu

- **CI:** runneri na `ubuntu-24.04` (Playwright 1.56 nema Chromium za 26.04); baseline workflow dobio PostgreSQL servis kao CI.
- **16 CMS integracionih testova:** zastarjela očekivanja (ID junior suite iz #34, Instagram u footeru) sada se čitaju iz koda; **stvarne greške ispravljene:** CMS je gubio „svijetli“ stil hero sekcije kafića (novo polje `variant` + migracija `20261126_164036_hero_variant`), stranica Sastanci i događaji nije se mogla seedati jer link `#enquiry` nije bio dozvoljen (sidra na istoj stranici sada su validna), meta opis kafića skraćen na ≤200 znakova, mailto bez `?subject=`.
- **CMS end‑to‑end:** suite nije radio na CI‑u od kvara runnera, pa je opisivao sajt prije #34; ažuriran (kafić pod O nama, letsbook.me linkovi, stranice umjesto uklonjenog `/spa`, nove stavke admin menija). **Stvarna greška:** rezervna rečenica forme za upit (Sastanci i događaji) nije pratila telefon iz „Hotel Information“ — ispravljeno.
- **Next.js 16.4.2 → 16.4.6:** zatvara objavljene ranjivosti (use‑cache otkrivanje podataka, SVG zaobilaženje u optimizeru slika). Preostala upozorenja `npm audit` odnose se na tranzitivne pakete Payloada 3.92 (lexical, drizzle‑kit, esbuild‑kit) bez kompatibilne ispravke — build/dev ili admin editor, ne javni sajt; preporuka: nadogradnja Payloada u zasebnom PR‑u.

## 5. WordPress / CMS

- **WordPress (finalna verzija za klijenta):** iste izmjene kao Next.js; importer podržava stavku menija ispod roditelja; postavka *Central Day Spa e‑mail*; `[hc_contact what=spa_email]`; spa radno vrijeme s „Closed“; pill „← Hotel Central“ uz logo kluba; raspored i opisi časova (uređivi u Elementoru); nove zelene boje. Elementor, Polylang, uloge i uređivanje sadržaja nepromijenjeni.
- **CMS baza i „override“ sadržaj:** javni Vercel projekt (`hotel-central`, uključujući Preview) nema nijednu varijablu okruženja → CMS je isključen i baza ne može poništiti nove izmjene. Hostovani CMS demo (`hotel-central-cms-demo`) ima CMS uključen, ali je njegova Supabase baza **pauzirana** (stranice padaju na statični sadržaj); nije je moguće pročitati bez ponovnog pokretanja, što nisam radio. Novi alat **`npm run cms:check-overrides`** (samo čitanje) navodi svaku spremljenu stranicu, sobu, meni, naslovnu, članarine/raspored i spa cjenovnik koji se razlikuje od koda; na svježe seedanoj bazi daje „0 razlika“. Pokrenuti ga nakon buđenja baze, prije uključivanja CMS‑a za klijenta, pa razlike ažurirati u adminu. Migracija `hero_variant` mora se primijeniti (`npm run cms:migrate`) na toj bazi.
- **Sigurnosna napomena:** u `hotel-central-cms-demo` i dalje postoje (prazne) varijable `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — runbook kaže da ih treba obrisati u Vercel dashboardu.
- **Migracija na hotelski hosting:** nije rađena; domena i hosting Hotela Central nisu dirani.

## 6. Šta treba pitati Daru / Nerinu

1. **Članarine (CH‑044):** 135 KM i 90 KM — mjesečno? Trenutno prikazano bez perioda.
2. **Opisi časova (CH‑043):** nedostaju za *Pilates, Full Body Sculpt, Total Body Sculpt, Body Attack, Full Body Burn, Kettlebells*. *Body Balance* ima opis, ali nije u rasporedu — održava li se još?
3. **Hero kluba (CH‑040):** odobrenje izabrane fotografije (strength floor).
4. **Fotografije (CH‑024 / CH‑019):** poboljšane / nove fotografije visoke rezolucije (do tada ostaju trenutno posvijetljene).
5. **Radno vrijeme Central Caféa i kluba** — nije objavljeno nigdje.
6. **Tretmani za članove u Day Spa** (WP blok s cijenama 30/45/60 KM s Instagrama) — potvrditi.
7. **Statistika kluba:** „20 group classes a week“ → „7 days a week of group classes“ (raspored ima 19 časova) — potvrditi formulaciju.

## 7. Linkovi

- Pull request: https://github.com/ismail-alibegovic/hotel-central/pull/42
- Vercel Preview (grana): https://hotel-central-git-claude-elegan-2f1a59-ia-production-s-projects.vercel.app — za pristup bez prijave koristi se share link iz završne poruke (vrijedi 23 h; novi se pravi u Vercelu → Share).

## 8. Spremnost

- **Tehnički spremno za finalno odobrenje klijenta:** svih 35 zahtjeva implementirano i automatski provjereno, testovi zeleni, Next.js i WordPress usklađeni.
- **Ne spajati u `main`** prije odobrenja klijenta; nije rađena migracija na hosting Hotela Central.
- Otvoreno (ne blokira pregled): pitanja iz §6; pregled CMS baze alatom `cms:check-overrides` kad se demo baza probudi.

## 9. Naredni koraci

1. Poslati Preview share link i pitanja iz §6 Dari i Nerini.
2. Nakon odobrenja: spojiti PR #42; za CMS demo — probuditi Supabase, `pg_dump`, `npm run cms:migrate`, `npm run cms:check-overrides`, ažurirati razlike u adminu, obrisati `SEED_ADMIN_*` varijable.
3. Kad stignu fotografije i opisi časova: zamijeniti fotografije (CH‑019/024), dopuniti opise (CH‑043).
4. Zaseban PR: nadogradnja Payloada (tranzitivna `npm audit` upozorenja).
5. Dogovoriti termin migracije WordPress verzije na hotelski hosting.
