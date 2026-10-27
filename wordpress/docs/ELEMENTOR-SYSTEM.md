# Elementor Free editing system — design, library, what is native and what is custom

## Design system (Elementor → Site Settings, stored in the active Kit; seeded by `scripts/lib/kit.php`)
* **Global colours:** Ink, Deep olive, Olive, Ivory, Sand, Line, Muted + system Primary/Secondary/Text/Accent. Dark sections flip them automatically.
* **Global fonts:** Display (Gilda Display, uppercase, tight), Label (11 px tracked caps), Body (Inter 14/1.55), Button; custom sizes XL/L/M/S/Label/Body with fluid `vw` sizes and tablet/mobile values. H1–H6 are mapped to them, so a plain *Heading* widget dragged onto an empty page already looks like the site.
* **Layout:** boxed container width 1368 px, gutters 64/56/36→16, 16 px widget gap; breakpoints tablet ≤ 1023, mobile ≤ 767; ivory page background; images square-cornered.
* **Buttons:** Elementor *Button* widgets get the pill outline style from the theme CSS (the Kit button settings would also restyle every `<button>`, including the booking bar, so they are intentionally unset).
* **Seeded vs. new elements:** elements created by the seeder/templates carry the marker classes `hc-c` / `hc-w` and own their spacing and typography (pixel parity with the Next.js site); anything an editor adds has no marker and uses the Kit.

## Saved-template library (Elementor → Templates → Saved Templates, "HC · …"; `scripts/lib/templates.php`)
Page hero · Homepage hero with booking bar · Editorial split ×7 (light/deep/olive, photo left/right, with facts) · Fact table · Large statement · Photo gallery ×3 · Text band + button ×2 · Booking call-to-action · Map + arrival list · Map + text (Elementor Google Maps, any address) · Contact details + form · Rooms list · Rooms carousel · Offers grid · four homepage "artboard" compositions · 3 full-page templates (landing, content, starter). Inserted from the editor's folder icon → *Templates*. The seeder refreshes a template only if nobody edited it.

## Native Elementor vs. custom
| Native Elementor Free (editable in the editor) | Custom (needs code; kept only because it is functional) |
|---|---|
| All page sections: heroes, editorial splits, fact tables, statements, galleries, bands, maps (Google Maps widget), CTA, contact layout, homepage artboards — containers + Heading / Text Editor / Image / Button / Icon List widgets | Booking bar + eZee form handoff (`[hc_booking_bar]` in the hero), rooms carousel & list, offers grid (shortcodes reading the post types) |
| Global colours/fonts/spacing (Kit), responsive settings, entrance animations (replayed by theme JS without Elementor's front-end JS), revisions | Contact form (REST + Enquiries), hotel-info shortcodes (`[hc_info] [hc_address] [hc_map] [hc_hours]`), decorative hairline loops (`[hc_deco]`) |
| Pages, translations (Polylang), per-language menus | Header, full-screen menu, footer (no Theme Builder in Free) — driven by Hotel Information and Appearance → Menus |

Admin additions (plugin `hotel-central-core`): Hotel Information (contact / hours for Editors, booking engine for administrators only), *Create <lang> copy* row action and meta box, *Main menu* meta box, room fields (room-type id admin-only), Editor role capabilities (`edit_theme_options` for menus; no plugins/themes/options).

## Genuine Elementor Free / Polylang Free limitations
* No Theme Builder: header/menu/footer are not drawn in Elementor. No Custom CSS, no Motion/Parallax effects beyond entrance animations (the site's parallax and image reveals come from the theme and apply to elements with the `hc-par-*`/`hc-reveal` classes, i.e. seeded/template photos).
* Elementor's template library also lists Elementor's own Pro/remote blocks (marked PRO); our templates are under the **Templates** tab.
* Polylang Free: no automatic translation, no translated slugs (same slug in both languages by design), strings (button/menu words) are translated in Languages → Translations by administrators; the language chosen in the admin bar decides the language of a *new* page/room — use `new_lang` (the filter) or the Language box.
* Elementor's editor preview shows the transparent header over an empty canvas; the public page switches to a solid bar when a page does not open with a photo/dark section.
* Editors can open *Site Settings* in Elementor; changing them restyles the whole site (revisions of the Kit exist). Restrict by role if undesired.
* The `wp-auth-check` heartbeat of WordPress core raises a harmless `hasClass` console error while the Elementor editor is open.
