# Hotel Central

Hotel Central Sarajevo is a four-star, Irish-owned boutique hotel on Ćumurija 8 in Sarajevo's old town. Its website is editorial and led by photography: warm ivory paper, deep olive grounds, oversized uppercase serif titles, tiny tracked labels and hairline rules. Nothing is loud. The same palette, in a calmer and friendlier form, runs the staff-facing **Website Manager** (the Payload CMS admin).

This system was extracted from `ismail-alibegovic/hotel-central` at `9e652c8`: tokens from `src/app/globals.css` and `src/app/(payload)/custom.css`, type from `next/font` in the locale layout, components from `src/components/` and the admin stylesheet.

## Content fundamentals

- **Voice**: calm, hospitable and concrete. Short titles split into two stacked lines: "Your stay / starts here", "A moment / of stillness", "The art / of slow mornings", "In the heart / of Sarajevo".
- **Case**: display titles and labels are UPPERCASE (`text-transform`, never typed in caps). Statements and body copy are sentence case.
- **Facts over adjectives**: "The heated 25-metre indoor pool", "Six categories, each completely refurbished and designed with your comfort in mind."
- **Two languages**: every string exists in English and Bosnian (`/en`, `/bs`). Leave room: Bosnian lines run longer, which is why titles are fitted to the viewport (`fitStyle`).
- **Website Manager copy** is written for hotel staff, not developers: say what a section holds, who can see a change, and what to do next ("Saved as draft — not visible to guests yet.").
- Alt text describes the photograph in plain words; decorative duplicates get `alt=""`.

## Visual foundations

### Colour
Five reference colours plus a warm paper tone. Each section takes ONE tone from the `tones` map and keeps its text pairing:

| Section tone | Ground | Text |
| --- | --- | --- |
| ivory (default) | `ivory` | `ink` |
| deep | `deep` | `white` |
| olive | `olive` | `white` |
| sage | `sage` | `ink` (white on sage fails contrast) |
| ink | `ink` | `white` |

- Rules are hairlines, never borders: `hairline-dark` on light grounds, `hairline-light` on dark grounds and photographs.
- Hover states change fill and text together (a dark pill fills `ink` with `ivory` text) and never introduce a new hue.
- The only non-palette colour on the site is `error`, for form validation.
- The browser `theme-color` is `deep`.
- **Website Manager** has light and dark themes (`theme-*` tokens). Primary actions use `admin-primary` (deep in light, sage in dark); status rules use `olive` (published), `sage` (new) and `status-draft` (draft).

### Typography
- **Display**: Gilda Display (OFL, Google Fonts), uppercase, weight 400, leading 0.9–0.92, tracking 0.005em. It stands in for the reference's commercial Balkind, which was never licensed. To switch, load Balkind with `next/font/local` and point `--font-gilda` at it.
- **Interface**: Helvetica Neue → Helvetica → Inter (Google Fonts) → Arial. The `label` style (10.5px, 0.16em, uppercase) does most of the work: navigation, meta rows, facts and buttons.
- Display sizes are fluid (`vw` and container-query `cqw`). The text-style values are measured at a 1440px viewport. Mobile titles are fitted so their longest line stays within about 90vw.
- Body copy runs 13–15px with a 44–52ch measure.

### Space and layout
- Horizontal padding is always `--gutter` = clamp(`gutter-min`, 2.5vw, `gutter-max`).
- Editorial layouts need at least 1024px (the `md` breakpoint is 64rem). Tablets get the recomposed mobile layouts.
- The homepage's first three sections are container-query artboards measured from a 1025×640 reference frame: positions in %, type in `cqw`.
- Galleries are asymmetric (5/3/4 column frames with vertical offsets), never a uniform grid.
- Header height: `header-h` / `header-h-desktop`. Hit areas: `touch-min`.

### Shape
- The site is square (`radius-none`) except for pills and stepper circles (`radius-pill`). There are no shadows on the public site.
- The Website Manager softens this with `hc-radius` cards and banners.

### Photography
- The archive photos are very saturated, so every photo gets a restrained CSS grade that pulls it toward the muted palette without altering content: `.grade` by default, `.grade-dark` behind text, `.grade-soft` for food and interiors, and the stronger hero grade under page titles.
- Text over a photograph always sits on an `ink` gradient overlay.
- Where a title crosses a photograph, a clipped copy of the title re-colours it: white on dark frames, `mix-blend-mode: difference` in the rooms carousel.

### Motion
- Easing: `ease-out` cubic-bezier(0.22, 1, 0.36, 1) for reveals and hovers; `ease-inout` cubic-bezier(0.65, 0, 0.35, 1) for drawn lines.
- Slow and cinematic: masked line reveals, clip-path image reveals with a settle-scale (1.12 → 1), gentle parallax, hairline paths drawing over 3.2s, 0.5–0.6s hover transitions.
- `prefers-reduced-motion` sets every duration to zero. No scroll hijacking.

## Iconography and marks

- **There is no logo file.** The wordmark is live type: "Hotel Central" in the sans, uppercase, tracked 0.34–0.42em. Never redraw it as an image.
- The **HC monogram** (Gilda "HC" in `ivory` on a `deep` tile) is the favicon and the admin's collapsed-sidebar icon. The admin also has a two-line "HOTEL CENTRAL / WEBSITE MANAGER" lockup. All three are in **Logos**.
- Icons are drawn inline as 0.9px hairline strokes in `currentColor`: the 22×9 arrow, the two-line menu, the 7×4 triangle chevron and the −/+ glyphs. There is no icon library. Do not add filled or rounded icon sets.
- The six **Lines** are the decorative hairline loops behind sections.

## Using this system

- Load `tokens.css`, then `components/bundle.css`, which imports Gilda Display and Inter from Google Fonts and ports the site's component classes (`font-display`, `label`, `body-copy`, `pill`, `link-line`, `grade*`, `tone-*`, `hc-*`).
- Pick a section tone, then put `label` text, a `display` title and at most one `pill` in it.
- The component cards are **static renditions** of the React components. Their props are in `components/index.d.ts`, and each README names the source file.

## Not synced

- **Fonts**: Gilda Display and Inter are served by Google Fonts through `next/font/google`. The repository has no font files, so `type.fonts` is empty and the faces are named in `type.families`.
- **Not tokenized**: `--gutter` (a clamp, recorded as its bounds), fluid `vw`/`cqw` display sizes (recorded at 1440px), the easing curves (no motion family; documented above), and the opacity steps 0.5–0.9 used for secondary text.
- **Components not built**: no JS bundle was produced (static route, previews are plain HTML and CSS). Not carded: FullscreenMenu, LanguageSwitcher, MobileBookBar, RangeCalendar, Photo, Reveal/RevealLines, EditorialSplit, Gallery, the home sections (Hero, HotelExperience, RoomCarousel, SpaShowcase, RestaurantShowcase, LocationSection, EventsSection, FinalBooking), and the admin's PreviewBar, PublishWithSummary and RoomPhotosPanel.
- **Photography**: 10 of the 130+ photos in `public/images/`, the homepage set.
