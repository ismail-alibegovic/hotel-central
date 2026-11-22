# Hotel Central — WordPress + Elementor (free)

The WordPress version of hotelcentral.ba: Hotel Central Sarajevo, plus the two sub-sites
**Central Day Spa** (`/dayspa/`) and **Central Fitness Club** (`/centralfitnessclub/`, with
`/membership/` and `/timetable/`), each with its own design. English is the default language,
Bosnian lives under `/bs/`.

Everything is built with free plugins only:

| Piece | What it does |
| --- | --- |
| Hello Elementor (parent theme) | the theme Elementor recommends |
| **Hotel Central** child theme (`theme/hotel-central`) | the three headers and footers (hotel, spa, club), all styling, fonts, the menu script |
| Elementor (free) | every page's content: texts, photos, buttons, price lists, FAQ |
| Polylang (free) | English / Bosnian, linked translations, per-language menus |
| **Hotel Central setup** plugin (`plugin/hotel-central-setup`) | contact details, hours and social links in *Appearance → Customize → Hotel Central*; shortcodes `[hc_contact]`, `[hc_hours]`, `[hc_social]`; page meta descriptions; one-time import of all pages, menus and photos |

Elementor free has no Theme Builder, so headers and footers are in the child theme. A page picks
the hotel, spa or club header/footer from its parent: anything under *Central Day Spa* gets the spa
design, anything under *Central Fitness Club* the club design, the rest the hotel design.

## Preview (no installation)

Open this link; WordPress Playground builds the whole site in the browser (allow 1–2 minutes,
it downloads Elementor, Polylang and about 23 MB of photos):

https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/ismail-alibegovic/hotel-central/refs/heads/main/wordpress/blueprint.json

You are logged in as admin, so *Edit with Elementor* works on every page. Nothing is saved:
closing the tab discards the site.

## Install on real hosting

1. Install WordPress 6.8+ (PHP 8.1+).
2. *Appearance → Themes → Add New*: install **Hello Elementor** (do not activate).
3. *Plugins → Add New*: install and activate **Elementor** and **Polylang**.
4. *Appearance → Themes → Add New → Upload*: `dist/hotel-central-theme.zip`, activate it.
5. *Plugins → Add New → Upload*: `dist/hotel-central-setup.zip`, activate it.
6. *Tools → Hotel Central import → Import*. Photos come from GitHub by default; on a server
   without access to GitHub, upload the repository's `public/` folder (e.g. to
   `/home/USER/hc-public/`) and enter that folder path instead. The import runs once.
7. *Appearance → Customize → Hotel Central*: check phone numbers, e-mail, hours and links.
8. *Settings → Permalinks*: click *Save* once (refreshes the addresses).

## What the hotel edits where

- **Texts, photos, prices, FAQ, room details**: open the page → *Edit with Elementor*.
  The Bosnian page is a separate page (Polylang links them); edit both.
- **Phone, e-mail, hours, Instagram/Facebook, booking links**: *Customize → Hotel Central*.
  Pages show them through shortcodes, so one change updates every page and footer.
- **Menus**: *Appearance → Menus* — one menu per site (hotel, spa, club, legal) and language.
- **Club timetable and membership prices**: on those pages, notes with a ✎ mark (visible only
  when logged in) say what to fill in.

## Rebuilding the package (developers)

Pages are generated from the same content as the Next.js site (`src/content/*`) plus the
WordPress-only copy in `build/generate.mts`:

```bash
wordpress/build/package.sh
```

This writes `plugin/hotel-central-setup/data/site.json` and the two zips in `dist/`.

Local preview with Playground (photos are read from the repository's `public/` folder):

```bash
cd wordpress && npx -y @wp-playground/cli@3.1.65 server --blueprint=build/blueprint.local.json --port=9400 --mount=./theme/hotel-central:/wordpress/wp-content/themes/hotel-central --mount=./plugin/hotel-central-setup:/wordpress/wp-content/plugins/hotel-central-setup --mount=../public:/wordpress/hc-public
```
