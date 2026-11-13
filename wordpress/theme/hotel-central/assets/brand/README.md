# Logos — sources and what was done to them

| File | Source | Changes | Used for |
| --- | --- | --- | --- |
| `hotel-central-logo.png` | hotelcentral.ba header logo (`/wp-content/uploads/2018/11/hotelcentral-retina.png`, 260×360), byte-identical to `public/brand/hotel-central-logo-stars.png` | none (original) | light grounds |
| `hotel-central-logo-reversed.png` | derived from the file above | **single-colour reversal**: the dark ink is recoloured to the site's ivory `#f3efe6`; the four gold stars and the transparency are untouched | header (top of page) and footer, both dark — **needs the hotel's approval** |
| `central-fitness-club-white.svg`, `central-fitness-club-green.svg` | hotel's Drive → *GYM images* → `CFC SVG.svg`, `CFC SVG Green.svg` | only the solid background square was removed and a viewBox added (done on 13 Nov); the mark is untouched | Fitness Club header/footer, homepage, hotel footer |
| `day-spa-original.png` | hotel's Drive → *SPA images* → `Day spa SVG.svg` — a 652×468 **PNG wrapped in an SVG** (not vector), burgundy background baked in | none (original) | not used on the site (kept as the reference) |
| `day-spa-transparent.png` | derived from the file above | **background removed only**: pixels within a small distance of the solid background colour `#401215` become transparent and only the anti-aliased edges are un-mixed from it; every pixel of the mark itself keeps its original colour, fully opaque. Nothing was redrawn or recoloured. | Day Spa header/footer, homepage, hotel footer — **needs the hotel's approval** |

**Not "Hotel Central — Club & Spa".** The wordmark used on 13 Nov (`public/brand/hotel-central-wordmark-*.png`) is the hotel website's
*Club & Spa* logo (`white_no-westwood.png`, linked to `/westwood-club-spa/` on hotelcentral.ba). It is not used anywhere in the WordPress theme.

**To ask the hotel for:** vector (SVG/PDF/AI) originals of the Hotel Central logo (including an official light/reversed version) and of the Day Spa
logo on a transparent background, plus brand guidelines with colour codes. When they arrive, replace the two derived files above (same
names) — nothing else needs to change.
