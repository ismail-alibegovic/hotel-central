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
| Djelimično (implementirano, čeka materijal klijenta) | **2** (CH‑024, CH‑043) |
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

## 4. Testovi i provjere

| Provjera | Rezultat |
| --- | --- |
| `npm run lint` | 0 grešaka |
| `npm run typecheck` | prolazi |
| `npm run build` (produkcija) | prolazi |
| Playwright smoke (`tests/e2e/smoke*`, EN/BS × 390/768/1440, 144 testa) | **144/144** lokalno (nakon jedne popravke preliva na BS klubu) |
| Vlastiti QA prolaz: 19 ruta × 2 jezika × 375, 390, 768, 1280, 1440, 1920 px (228 provjera) | **0 problema**: HTTP 200, bez horizontalnog preliva, bez slomljenih slika, tačno jedan H1, meta opis, canonical, alt na svakoj slici, bez grešaka u konzoli |
| Vizuelno (Playwright screenshoti) | naslovna, O nama, kafić, kontakt, klub (hero 1280×720, raspored, članarine), spa (krug, paketi), mobilni meniji hotela i kluba |
| Vitest (CMS integracija, lokalni PostgreSQL 16) | 282 prolazi, **16 pada — svi već padaju i na `main`** (na `main` 17; ovaj PR jedan popravlja, nijedan novi). Padovi: seed/round‑trip statičnih stranica u CMS‑u, footer social linkovi, ID rezervacije junior suite u testu. Nisu dio ovog kruga — preporuka zaseban zadatak. |
| PHP lint (`php -l`) svih fajlova teme i plugina | bez grešaka |
| WordPress paket | `generate.mts` → 19 stranica × 2 jezika, 95 fotografija; zipovi obnovljeni |
| WordPress Playground (lokalno: WP latest, PHP 8.3, Elementor, Polylang, tema + plugin iz ove grane, puni uvoz) | uvoz bez greške; 10 provjerenih stranica (EN/BS) 200, bez preliva; meni hotela s „Central Café“ ispod „O nama“, novi nazivi; meni kluba bez „Timetable“; raspored i opisi časova, 135 KM, spa e‑mail i „Closed“ prikazani |
| Vercel Preview (stvarni deployment) | 24 stranice (EN/BS) 200, bez preliva, slomljenih slika i grešaka u konzoli; `/en/restaurant` i `/bs/cafe` preusmjeravaju na `/…/about/cafe` |
| SEO / sitemap | `/about/cafe` u sitemapu, `/restaurant` i `/cafe` uklonjeni + 308 redirect; meta opisi ažurirani (kafić, klub, članarine, raspored) |

**CI:** na `main` su sva tri testna joba padala na instalaciji Playwrighta jer je `ubuntu-latest` prešao na Ubuntu 26.04 (Playwright 1.56 nema Chromium za tu verziju). Jobovi su vraćeni na `ubuntu-24.04`. Vizuelne bazne slike (`tests/e2e/__screenshots__`) će se razlikovati jer su boje i fotografije namjerno promijenjene — treba pokrenuti workflow „Update visual baselines“ na ovoj grani prije spajanja.

## 5. WordPress / CMS

- **WordPress (finalna verzija za klijenta):** iste izmjene; importer sada podržava stavku menija ispod roditelja (kafić pod O nama); nova postavka *Customize → Hotel Central → Central Day Spa e‑mail*; shortcode `[hc_contact what=spa_email]`; spa radno vrijeme s „Closed“; klub header s pillom „← Hotel Central“; raspored časova unaprijed popunjen (uređuje se u Elementoru); opisi časova; nove zelene boje. Elementor, Polylang (BS/EN), uloge i uređivanje teksta/fotografija ostaju kako su bili.
- **Payload CMS (opcionalni, isključen na demo stranici):** statički sadržaj je izvor kad CMS nije uključen. Ako je na *hotel-central-cms-demo* već spremljen sadržaj stranica/soba/kluba, on ima prednost — te zapise treba ažurirati u adminu (ili ponovo seedati) da bi se vidjele izmjene. Spremljene stavke menija `/restaurant` i `/cafe` automatski vode na `/about/cafe`. Nova fotografija naslovne je u `public/images/home/`, pa nije trebala migracija baze.
- **Migracija:** ništa nije migrirano; produkcijska domena i hosting Hotela Central nisu dirani.

## 6. Šta treba pitati Daru / Nerinu

1. **Članarine (CH‑044):** 135 KM i 90 KM — mjesečno? Trenutno je prikazano bez perioda.
2. **Opisi časova (CH‑043):** u rasporedu su i *Pilates, Full Body Sculpt, Total Body Sculpt, Body Attack, Full Body Burn, Kettlebells*, ali za njih nema opisa u „class description“. Također: *Body Balance* ima opis, ali nije u rasporedu — da li se još održava?
3. **Hero kluba (CH‑040):** odobrenje izabrane fotografije (strength floor) ili prijedlog druge.
4. **Fotografije (CH‑024 / CH‑019):** poboljšane / nove fotografije visoke rezolucije koje je Dara spomenula; brošurna fotografija ima 1086 px i preslaba je za hero.
5. **Radno vrijeme Central Caféa** (i kluba) — još nije objavljeno nigdje, pa ga stranica ne prikazuje.
6. **Članska specijalna ponuda u Day Spa (CH‑047):** WP stranica spa ima blok „Members' treatments“ s cijenama s Instagrama (30/45/60 KM) označen za provjeru — potvrditi prije objave.
7. **Statistika kluba:** „20 group classes a week“ zamijenjeno s „7 days a week of group classes“ (raspored ima 19 časova); potvrditi formulaciju.

## 7. Linkovi

- Pull request: https://github.com/ismail-alibegovic/hotel-central/pull/42
- Vercel Preview (zaštićen Vercel prijavom): https://hotel-central-git-claude-elegan-2f1a59-ia-production-s-projects.vercel.app (deployment `hotel-central-4cs0lngua-ia-production-s-projects.vercel.app`, commit `aef8788`). Za klijenta napraviti share link u Vercelu.

## 8. Spremnost za isporuku i migraciju

- **Next.js demo:** spremno za pregled klijenta na Preview linku. Spajanje u `main` tek nakon regeneracije vizuelnih baznih slika i odobrenja klijenta.
- **WordPress paket:** spreman za ponovni uvoz (Playground / staging). Finalna migracija na hosting Hotela Central nije izvršena i čeka posebno odobrenje.
- **Otvoreno:** pitanja iz §6 (nijedno ne blokira pregled), pre‑postojeći CMS integracioni testovi.

## 9. Prijedlog narednih koraka

1. Poslati Preview Dari i Nerini zajedno s pitanjima iz §6.
2. Pokrenuti „Update visual baselines“ na ovoj grani, provjeriti CI, zatim spojiti PR.
3. Zaseban zadatak: popraviti 16 pre‑postojećih CMS integracionih testova (seed statičnih stranica, social linkovi, ID rezervacije).
4. Zaseban zadatak: Next.js prijavljuje sigurnosnu ranjivost u verziji 16.4.2 — nadograditi Next.js (i `eslint-config-next`) u posebnom PR‑u.
5. Nakon dostave fotografija: zamijeniti fotografije (CH‑019/CH‑024) i dopuniti opise preostalih časova.
6. Dogovoriti termin migracije WordPress verzije na produkcijski hosting.
