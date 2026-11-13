# Hotel Central — editing guide (for hotel staff)

> Bosanska verzija ovog uputstva: **UPUTSTVO.md**. Plan obuke: **TRAINING.md**.

You need a WordPress account with the **Editor** role. Everything below is done in the browser; no code, no FTP.
Log in at `/wp-admin/`. The language switch in the top admin bar ("All languages / English / Bosanski") only filters lists — **always check the Language box** (or use *Add new* while the filter shows the language you want) when you create something new.

## 1. Change what is already on a page
1. **Pages → hover the page → Edit with Elementor** (pick the English or the Bosnian entry — they are edited separately).
2. Click a heading, text, photo or button; change it in the left panel; press **Publish** (green button, bottom left of the top bar).
3. **Photo:** click it → *Choose Image* → *Upload files* or pick from the library. The old file stays in the library.
4. **Colours / fonts:** on a ready-made section leave them alone (they follow the brand). On something you added yourself use *Style*; the defaults already are the brand colours and fonts. Brand settings for the whole site: ☰ menu (top-left) → *Site Settings* → *Global Colors / Global Fonts*.
5. **Mistake?** Clock icon (History) → *Revisions* → click an older version → *Apply* → *Publish*.

## 2. Sections: add, duplicate, move, delete
* **Add:** click the **＋** between sections (or the grey *Add new container* area) → drag *Heading*, *Text Editor*, *Button*, *Image*, *Google Maps* … from the left panel.
* **Add a ready-made section:** click the **folder icon** → tab **Templates** → search "HC" → *Insert*. There are 33 (see the list below). Replace text and photos, publish.
* **Duplicate:** right-click the section's small dotted handle (top-centre of the selected section) → *Duplicate*.
* **Move:** drag the section's dotted handle up or down. (Or open *Structure* and drag there.)
* **Delete:** right-click the handle → *Delete* (or select it and press Delete). Undo with Ctrl+Z.
* **Hide on phone/tablet:** select the element → *Advanced* → *Responsive* → *Hide On Mobile*.
* **Preview phone/tablet:** the three device icons in the top bar. Anything you change while a device is selected only applies to that device.
* **Fade-in / slide-in:** *Advanced* → *Motion Effects* → *Entrance Animation*.

## 3. New page (English + Bosnian)
1. **Pages → Add New** (with the filter on *English*), type the title, **Save draft**, then **Edit with Elementor**.
2. Click the **folder icon** → *Templates* → *HC · Page — landing page* (or *content page* / *starter*) → *Insert*; or build from sections (step 2).
3. **Publish.** The address becomes `/en/<title>/`.
4. Back in **Pages**, hover the page → **Create BS copy**. This copies the whole layout as a Bosnian draft, linked as its translation and with the same address (`/bs/<title>/`). Edit it in Elementor, translate the text, publish.
5. **Menu:** open the page in the normal editor (not Elementor) → right-hand box **Main menu** → tick *Show in the main menu*, set the label → *Update*. Do the same for the Bosnian copy. (Order / sub-items: Appearance → Menus.)
6. The language switcher in the footer/menu now jumps between the two versions of this very page. Search-engine title/description: box *Search engines & sharing* under the page.

## 4. Rooms, offers, hotel information
* **Rooms & Suites → Add new room**: title, summary (Excerpt), size, highlights, amenities, photos, *Order*. Click *Create BS copy* afterwards. The room appears automatically on the Rooms page, in the homepage carousel and in the sitemap. A room without a booking-engine id links to the general booking page — the web developer can add the id later.
* **Offers → Add new**: appear wherever an *Offers grid* is placed.
* **Hotel Information → Contact & address:** phone, e-mail, address, links. Change once; header, menu, footer, contact page, map, search-engine data all follow. **Opening hours:** show them anywhere with a *Shortcode* widget containing `[hc_hours]`.
* **Booking engine** settings (eZee hotel id, form address) are visible to administrators only.
* **Button / menu words** ("Book now", footer labels): administrators — Languages → Translations.

## 5. What not to do
* Do not delete the booking bar on the homepage hero (it is the connection to the booking engine) — copy another hero instead.
* Do not use Elementor's *Theme Builder*, *Pro* widgets or *Custom CSS* (not part of the free version). The header, menu and footer are part of the theme and are changed with Hotel Information and Appearance → Menus.
* Colours/fonts of the "HC ·" templates are built in; if you change *Site Settings* globally, everything you built yourself changes with it.
