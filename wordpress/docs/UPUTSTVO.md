# Hotel Central — jednostavno uputstvo za uređivanje web stranice

Za osoblje hotela. Sve se radi u pregledniku, bez programiranja. Nazivi u zagradama (npr. *Pages*) su tačni nazivi na ekranu, jer je administracija na engleskom jeziku.

## 1. Prijava, zaboravljena lozinka
1. Otvorite `https://[adresa-sajta]/wp-admin/` i upišite korisničko ime i lozinku koje ste dobili.
2. **Zaboravili ste lozinku?** Kliknite *Lost your password?* na stranici za prijavu → upišite svoju e-mail adresu → stići će poruka s linkom → kliknite link, upišite novu lozinku. Link vrijedi samo jednom. Ako poruka ne stigne (provjerite *Spam*), obratite se administratoru.
3. Svoju lozinku i ime možete promijeniti u *Profile* (lijevi meni).
4. Uloge: **Administrator** (sve, uključujući korisnike, dodatke i postavke rezervacija) i **Urednik / Editor** (sadržaj stranica, sobe, ponude, mediji, meniji, podaci o hotelu). Nove korisnike dodaje samo administrator (*Users → Add New*).

## 2. Jezici: bosanski i engleski
* Svaka stranica postoji dva puta — engleska i bosanska verzija — i uređuju se **odvojeno**.
* Na vrhu ekrana (crna traka) je izbor jezika: *All languages / English / Bosanski*. To samo **filtrira liste**. Kad pravite **nešto novo**, provjerite u okviru *Languages* (desno) da je izabran pravi jezik.
* Bosansku verziju postojeće stranice pravite ovako: *Pages* → pređite mišem preko stranice → **Create BS copy** (ili *Create EN copy*). Cijeli izgled se kopira i povezuje kao prijevod; vi samo prevedete tekst i objavite. Adresa ostaje ista (`/bs/naziv/` i `/en/naziv/`).

## 3. Izmjena postojeće stranice (tekst, slike, dugmad)
1. *Pages* → pređite preko stranice → **Edit with Elementor**.
2. Kliknite na naslov, tekst, sliku ili dugme; promjena se radi u lijevoj koloni. Za dugme: tekst i *Link*.
3. **Slika:** kliknite sliku → *Choose Image* → *Upload files* (nova) ili *Media Library* (postojeća) → *Insert media*. Stara slika ostaje u biblioteci.
4. Gore desno: **Publish** objavljuje. Strelica pored njega (*Save Options*) → **Save Draft** sprema bez objave. Ikona oka (**Preview Changes**) otvara pregled u novom tabu prije objave.
5. Pogrešili ste? Ikona sata (*History*) → *Revisions* → izaberite raniju verziju → *Apply* → *Publish*.
6. Uređene stranice: Hotel (*About*), Klub i spa (*Club & Spa*, fitness i dnevni spa), Restoran/kafić (*Restaurant*), Sastanci i događaji (*Meetings & Events*), Lokacija, Kontakt, Sobe, Početna.

## 4. Sekcije: dodaj, kopiraj, premjesti, obriši
* **Dodaj gotovu sekciju:** ikona **mape** u praznom polju → kartica **Templates** → upišite „HC“ → *Insert*. Ima 33 gotova predloška (naslovnica stranice, tekst + slika, galerija, cjenovnik, radno vrijeme, ponude, mapa, kontakt, poziv na rezervaciju …). Zamijenite tekst i slike i objavite.
* **Dodaj sam:** povucite *Heading*, *Text Editor*, *Image*, *Button*, *Basic Gallery* (galerija slika), *Google Maps* iz lijeve kolone.
* **Kopiraj sekciju:** desni klik na tačkastu ručku iznad sekcije → *Duplicate*.
* **Premjesti:** povucite ručku gore/dolje.
* **Obriši:** desni klik na ručku → *Delete* (Ctrl+Z vraća).
* **Sakrij na telefonu:** označite element → *Advanced → Responsive → Hide On Mobile*. Ikone telefona/tableta gore prikazuju izgled na tim ekranima.
* **Cijene (cjenovnik):** predložak **HC · Price list** — mijenjate nazive usluga i cijene klikom na tekst.
* **Galerija:** *Basic Gallery* → *Add Images* → izaberite više slika.

## 5. Nova stranica (EN + BS)
1. *Pages → Add New* (provjerite jezik), upišite naslov → **Save Draft**.
2. Pri vrhu je dugme **Edit with Elementor**. Umetnite predložak (**HC · Page — landing page**) ili složite sekcije → **Publish**.
3. U listi stranica: **Create BS copy** → prevedite → **Publish**.
4. **Podstranica:** u okviru *Page Attributes* → *Parent* izaberite nadređenu stranicu (npr. *Club & Spa*). Adresa će biti `/bs/spa/naziv/`.
5. **U meni:** na ekranu stranice, okvir **Main menu** → kvačica „Show this page in the main menu“ → naziv u meniju → *Update*. Isto za bosansku verziju.

## 6. Meniji i podnožje (footer)
* **Glavni meni:** *Appearance → Menus* → izaberite „Main menu EN“ ili „Main menu BS“ → dodajte stranice ili *Custom Links* → redoslijed: otvorite stavku, polje **Menu Order** (npr. „1 of 9“) ili **Menu Parent** (podstavka) → **Save Menu**.
* **Linkovi u podnožju:** napravite meni „Footer links“ za jezik, dodajte stranice/linkove, u *Menu location* označite „Footer links … English/Bosanski“ → *Save Menu*. Ako ga ne napravite, podnožje koristi glavni meni.
* **Tekstovi u podnožju** (veliki natpis, „Rezervacije“, autorska prava): *Hotel Information → Footer texts* — posebna polja za engleski i bosanski; prazno polje = standardni tekst.
* **Adresa, telefon, e-mail, Facebook, Instagram:** *Hotel Information → Contact & address*. Promjena se odmah prikaže u zaglavlju, meniju, podnožju i na stranici Kontakt.
* **Radno vrijeme:** *Hotel Information → Opening hours*; prikazuje se gdje je umetnut predložak **HC · Opening hours** (ili `[hc_hours]`).

## 7. Sobe i ponude
* **Sobe:** *Rooms & Suites → Add new room*: naziv, kratki opis (*Excerpt*), veličina, glavne karakteristike, sadržaji, fotografije, **Price (optional)** (npr. „od 95 € po noći“; prazno = ne prikazuje se). Zatim **Create BS copy**. Soba se automatski pojavljuje na stranici Sobe i na početnoj. Polje „Booking-engine room type ID“ mijenja samo administrator.
* **Ponude:** *Offers → Add new offer*: naziv, kratki opis (*Excerpt*), fotografija (*Featured image*), **Price**, **Valid**, **Button text/link**. Ponude se prikazuju u predlošku **HC · Offers grid**. Za bosansku verziju: **Create BS copy**.

## 8. SEO i adrese
* Na ekranu stranice, okvir **Search engines & sharing**: naslov (kartica u pregledniku / Google), opis, slika za dijeljenje. Za bosansku verziju popunite posebno.
* **Alt tekst slike:** *Media → Library* → kliknite sliku → *Alternative Text* (opišite šta je na slici). Koristi se svugdje gdje stavite tu sliku.
* **Adresa (slug):** *Pages* → *Quick Edit* → polje *Slug* (mala slova, crtice). Stara adresa automatski preusmjerava na novu.

## 9. Šta NE radite / kome se obratiti
* Ne brišite traku za rezervaciju na početnoj stranici (povezana je s eZee sistemom).
* Postavke rezervacionog sistema, korisnici, dodaci, globalni izgled (*Elementor → Site Settings*) i prijevod dugmadi/menija (*Languages → Translations*) su samo za administratora.
* Zaglavlje i meni preko cijelog ekrana su dio teme; njihov sadržaj mijenjate preko *Menus* i *Hotel Information*.
* Ako se nešto čudno desi: ne klikajte dalje, sačuvajte kao nacrt (*Save Draft*) i javite administratoru.
