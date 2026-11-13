# Visual fidelity: WordPress vs. the Next.js original

**Method** (`tests/compare.js`, `tests/compare-sheet.py`): the Next.js app (same commit, `next dev`) and the WordPress site were rendered side by side in Chromium at 390 / 768 / 1440 px with reduced motion, scrolled through to trigger reveals, and compared by (1) full-page height, (2) element probes (position, size, font size, letter-spacing, margins of the same elements in both sites) and (3) side-by-side review of every section. Sheets: `tests/evidence/compare/<page>_<width>.jpg` (left = Next.js, right = WordPress).

## Page height difference (WordPress − Next.js), 11 pages × 3 widths
| width | page | difference |
| --- | --- | --- |
| 1440 | en_home | -8 (-0.1%) |
| 1440 | en_about | -40 (-0.5%) |
| 1440 | en_rooms | -8 (-0.1%) |
| 1440 | en_rooms_standard-twin-double | -8 (-0.1%) |
| 1440 | en_spa | -8 (-0.1%) |
| 1440 | en_restaurant | -8 (-0.1%) |
| 1440 | en_meetings-events | -8 (-0.1%) |
| 1440 | en_location | -8 (-0.2%) |
| 1440 | en_contact | 11 (0.5%) |
| 1440 | bs_home | -8 (-0.1%) |
| 1440 | bs_rooms_superior-double-room | -8 (-0.1%) |
| 768 | en_home | 14 (0.1%) |
| 768 | en_about | -39 (-0.4%) |
| 768 | en_rooms | -7 (-0.1%) |
| 768 | en_rooms_standard-twin-double | -7 (-0.1%) |
| 768 | en_spa | -42 (-0.4%) |
| 768 | en_restaurant | -7 (-0.1%) |
| 768 | en_meetings-events | -43 (-0.5%) |
| 768 | en_location | -15 (-0.3%) |
| 768 | en_contact | 28 (0.8%) |
| 768 | bs_home | 14 (0.1%) |
| 768 | bs_rooms_superior-double-room | -63 (-0.9%) |
| 390 | en_home | 4 (0.0%) |
| 390 | en_about | -39 (-0.5%) |
| 390 | en_rooms | -7 (-0.1%) |
| 390 | en_rooms_standard-twin-double | -7 (-0.1%) |
| 390 | en_spa | -26 (-0.4%) |
| 390 | en_restaurant | -7 (-0.1%) |
| 390 | en_meetings-events | -25 (-0.4%) |
| 390 | en_location | -15 (-0.3%) |
| 390 | en_contact | 26 (0.8%) |
| 390 | bs_home | 20 (0.2%) |
| 390 | bs_rooms_superior-double-room | 9 (0.2%) |

All pages are within ±1.2 % of the original's height; the home page is within 0.1 %.

## Differences found and fixed in this pass
* **Base resets beating component classes** — `button{font:inherit}` made the booking bar and pills 14 px instead of 10–12 px (now zero-specificity `:where()` resets, also for `a`, `p`, headings).
* **Elementor widget defaults** — 20 px bottom margin on every widget, `width:100%` on widgets (killed `max-width` copy measures, negative-margin titles and `auto`-width bars), default `<h2>` margins, grid on the Spa facts wrapper, Elementor's later-loaded CSS overriding the theme (theme CSS now loads last).
* **Heading line-height** (0.92 → 0.9 as in the original), eyebrow/title spacing and margin collapse of the masked-line headings (hero titles now land on the same pixel row as Next.js).
* **Hero** overlay (`::before` gradient was missing on the home hero), eyebrow spacing, booking-bar typography; **final-booking** copy width; **contact form** (two-column grid, 12 px consent, pill button), arrows on contact links, **arrival bar**, **rooms carousel** (stray mobile control), mobile **meta rows**, mobile **copy measures**, **footer** column spacing and language separator, mobile **menu** item spacing.

## Remaining known differences (cosmetic)
* Google Maps tiles depend on network access (blank in an offline sandbox for both sites).
* Elementor wraps every widget in extra `div`s; pixel output is identical but the DOM is deeper.
* Animations (masked line reveals, clip-path photo reveals, parallax, path drawing, carousel wipe, menu clip) were ported with the same durations/easings but were **not frame-compared** against Framer-Motion's output — only visually reviewed with real scrolling.
* Full-page screenshots of the WordPress home show the mobile "Book now" bar at the hero's foot (artefact of the screenshot tool resizing the viewport; the bar is verified hidden at the top in `tests/mobile.js`).
* Only Chromium was available; Firefox/Safari were not tested.
