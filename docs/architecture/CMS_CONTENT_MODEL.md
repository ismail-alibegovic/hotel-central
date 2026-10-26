# CMS content model (Phase 2)

The CMS is opt-in (`CMS_ENABLED=true`). With it off, the site is the static site and `/admin` and `/api/*` (except `/api/contact`) answer 404. With it on, every public page is still prerendered and is refreshed when an administrator publishes. Anything missing, unpublished, untranslated or unreachable falls back to the built-in content, so a CMS problem can never blank a page.

## Roles and publishing
| | Administrator | Editor |
| --- | --- | --- |
| Edit copy, photographs, sections, search-engine fields | yes | as **drafts** only |
| Publish, unpublish, delete | yes | no (API refuses, button not shown) |
| Manage users, change URL keys, booking ids, room order or visibility | yes | no (fields are dropped) |

Drafts are visible only to signed-in staff through Draft Mode (preview). Shared caches never store draft responses.

## Chrome (navigation + footer) rules
Header, menu and footer are the built-in dictionary with CMS values laid over it **field by field** (`src/cms/chromeMerge.ts`). Empty, untranslated, invalid or unreachable = the built-in value, so the chrome can never come out blank or mixed-language. Menu entries are all-or-nothing per language: entries without wording in that language are left out; if no usable entry remains, the built-in menu is used. Publishing refreshes the whole locale layout (`revalidatePath("/en", "layout")`, same for `/bs`). Editors can only save drafts (`requireEditorDraftGlobal`); drafts reach the page only in staff preview.

## Languages
Bosnian and English are edited independently (`fallback: false`). Text fields are per language; the **structure** of a page (which sections, in what order) is shared. A section that is not translated yet is left out of that language (and logged), never shown empty or in the other language.

## Collections
- **Rooms** (six): name, title lines, feature, size label, summary, description, highlights, amenities (per language); photographs; search-engine fields. Administrator-only: URL key, eZee room-type id (the site always uses the id from code), size, order, visibility.
- **Pages** (about, rooms, spa, restaurant, meetings-events, location, contact): an ordered list of **sections** built from existing Hotel Central components — hero, statement, split (text + photographs), facts, gallery, room list, final booking and so on — plus search-engine fields. Editors can change copy, photographs, order and which sections appear; they cannot create layouts the design does not support.
- **Page sections for offers, FAQ and calls to action** (new block types on the page editor, built from the existing design: ground tones, hairlines, serif headings, pill buttons):
  - *Offers (cards)*: up to 6 cards — optional photograph, small tag, title, description, "when valid" and "price" wording (free text written by the hotel, empty rows are not shown), optional button.
  - *Frequently asked questions*: up to 20 questions with answers (a new line starts a new paragraph). Native `<details>` disclosure — keyboard accessible, no client script. Real (non-sample) FAQs also emit `FAQPage` structured data.
  - *Call to action*: label, heading, text, main button and an optional text link.
  - **Buttons**: "Use the hotel's booking button" takes the destination from code (the booking engine address and ids are never typed); otherwise a validated link (internal path or approved https host, phone, e-mail).
  - **DEMO / SAMPLE content**: every one of these sections has a *DEMO / SAMPLE content* switch. A flagged section shows an unmissable "DEMO / SAMPLE — not a real offer" label, emits no structured data, and **cannot be published** (HTTP 400, also when only the status is sent) until the switch is cleared. Staging may lift this with `CMS_ALLOW_SAMPLE_PUBLISH=true` (a warning in `cms:preflight` for staging, an error for production). The shipped example wording (`src/cms/sampleBlocks.ts`) contains no prices, dates, benefits or policies.
- **Home page** (global): every text of the home page per language (top of page, hotel, rooms strip text, Club & Spa incl. its short list, restaurant, location incl. facts, meetings & events, reservations) and a replacement for each of its 13 photographs, plus search-engine title/description/social photograph. Not editable on purpose: the composition, animations, booking form, link destinations and the booking address.
  - *Empty = built-in*: every field left empty keeps the built-in text or photograph (lists replace the built-in list only with usable rows), so an untranslated language shows its own built-in text, never the other language. A replacement photograph replaces file, alt text and focus point together (alt text is required; the old photograph's description never stays with a new picture); the file choice is shared by both languages, so write the alt text in both. Mobile/desktop variants of the same photograph follow the same replacement.
  - *Static homepage*: with the CMS off, unreachable or the global missing, the home page is the static one. Proof: CMS-off HTML of all 28 public pages before and after this change is identical (`scripts/audit/compare-html.mjs`: 28 compared, 0 differ), and the seeded CMS-on pages equal the CMS-off build (`html-parity.spec.ts`).
  - *Preview and publishing*: editors save drafts (live preview shows the home page of the language being edited); only administrators publish. Publishing is **document-level**: an administrator's publish also publishes whatever draft is pending in the other language (the admin form shows the pending draft; an API call carrying only one language does the same). Review both languages before publishing.
- **Navigation** (global): wording of the header and menu (menu/close/rooms/booking buttons, skip link, language label) and the menu entries (page path + wording per language + "show in menu"). The footer's "Explore" list is the same entries, minus Home. Administrator-only: adding, removing, reordering, destinations and visibility of entries (field access drops the values, and a second hook rejects structural changes with 403). The booking button's address always comes from code.
- **Footer** (global): wording (reservations strip, large statement, headings, rights, credits) per language, and social links (administrator-only, approved https hosts only; empty = Facebook as built in). Address, phone and e-mail come from Hotel Information.
- **Hotel Information** (global `hotel-info`, `src/cms/globals/HotelInfo.ts`): phone numbers (number shared, label per language), e-mail addresses (address shared, label per language), the street address (street, postal code, city shared; country per language) and opening hours per place (place type, name/day names/note per language, times shared, or "Closed"). Editors save drafts, administrators publish (`requireEditorDraftGlobal`, `blockEditorPublishGlobal`, Publish button for administrators only); publishing refreshes every page (`revalidatePath("/", "layout")`).
  - *Where it is used*: the **first** phone number and e-mail address are the main ones and replace the built-in ones everywhere they were shown (header menu, footer, phone button on phones, “Book your stay” banner, Contact page details, home and Location map sections, `Hotel` structured data). Further numbers/addresses are listed under the main ones in the footer's contact column (none by default, so the page is unchanged). The map embed and "Directions" link follow the address. Opening hours are stored and validated; showing them on a page is a separate step (a section to be added).
  - *Fallback* (`src/cms/hotelInfoMerge.ts`): CMS off, unreachable, nothing published, empty or invalid = the verified values in `src/content/hotel.ts`. Lists are filtered row by row (an invalid number is left out, the others stay; nothing valid left = the built-in one); the address is used only when street, postal code and city are all present. The phone link is derived from the number (`+387 33 561 800` → `tel:+38733561800`), never typed. Validation (`src/cms/hotelInfoRules.ts`) runs in the form and again when rendering.
  - *Older page sections*: sections stored before this existed hold the built-in details as text (e.g. the Contact page's top strip and its call/e-mail buttons). Text that is **exactly** a built-in value (whole value, never part of a sentence) is shown as the current value (`followContact`), so they follow too.
  - *Never here, on purpose*: the contact-form recipient (`CONTACT_TO` / code), the booking engine address and ids, room rates and anything about reservations. Tested: the global has no such field, and the contact route does not read the CMS.
  - *Seed*: `cms:seed` fills in the verified phone, e-mail and address (both languages, published) so staff open a filled-in form; labels and opening hours are left empty (not published by the hotel, never invented).
- **New pages** (`custom-pages`): pages administrators add to the website, in addition to the seven built-in ones. One address per language (`/en/offers`, `/bs/ponude`), shared section structure (all the blocks above plus the existing ones), text per language, search-engine fields, draft/publish, live preview.
  - *Addresses*: lowercase ASCII letters, digits and single hyphens, one segment, up to 60 characters; reserved (`about`, `rooms`, `spa`, `restaurant`, `meetings-events`, `location`, `contact`, `admin`, `api`, `en`, `bs`, `sitemap`, `robots`, `images`, …) and duplicates *within a language* are refused. Bosnian addresses are written without diacritics. Only administrators create/delete pages and set or change addresses; editors write content as drafts.
  - *Languages*: a language has the page only if it has an address **and** at least one section complete in that language. Otherwise `/<lang>/<address>` is a plain 404 and the page is left out of that language's sitemap, `hreflang` alternates and language switcher (which then leads to that language's home page). Canonical and alternates use each language's own address.
  - *Not public until published*: public reads are limited to published documents (collection access), the route renders per request (so a link shared before publication starts working the moment it is published; a cached 404 would not), and drafts are visible only in staff Draft Mode.
  - *Preview*: the admin's Live Preview / `GET /api/preview?path=/<lang>/<address>` requires a valid staff session and an internal path; it sets Next Draft Mode, which alone is not enough (the data layer re-checks the staff session on every read), responses are `no-store`, and draft previews always carry `noindex`.
  - *Sitemap*: published, not-hidden pages, per language with their own address and only the alternates that exist. *Menu*: link a page from Navigation (admin) after publishing it, with a path per language.
  - *Static fallback*: the seven built-in pages are separate static routes and keep their fallback; the new-page route answers 404 whenever the CMS is off, the page is unpublished or untranslated, or the database is unreachable.
- **Media**: uploads (Vercel Blob in staging/production, local disk in development).
- **Users**.

## Links
Editors never type raw HTML or URLs freely. A link is one of: internal page, approved external site (https, allow-list in `src/cms/links.ts`), phone, or email. Validation runs when saving and again when rendering, so a bad value that arrives any other way (API, import) never becomes a link. Adding an external host is a code change on purpose.

## Search engines
Every page and room has a title (≤ 70 characters) and description (≤ 200) per language, a "hide from search engines" switch, and (pages) a social-share photograph. Empty = built-in text. Hiding a page adds `noindex` in both languages and removes it from the sitemap; the sitemap is refreshed on publish. Only **published** settings count: an editor's unpublished draft never changes metadata or the sitemap. Canonical and alternate-language links are always generated. The whole site stays noindexed unless `NEXT_PUBLIC_SITE_URL` is set on a non-preview deployment (`src/lib/site.ts`).

## Migration
`npm run cms:seed` creates the six rooms and the seven pages (both languages, published) from the built-in content. It is idempotent and never overwrites. Proof the migration is lossless: the seeded CMS content, merged back, equals the built-in content (`tests/int/rooms.int.spec.ts`, `tests/int/layouts.int.spec.ts`).

## How parity is guaranteed
1. **HTML parity** — the CMS-on build and a CMS-off build of the same code are compared element by element on all 28 public pages (`tests/cms-e2e/html-parity.spec.ts`).
2. **Pixel parity** — screenshots of key pages at 390 / 768 / 1440 px against the CI-rendered baselines.
3. **Old vs new** — the block refactor was compared with the previous hand-written pages (`scripts/audit/compare-html.mjs`): identical HTML.

## Not yet in the CMS
Nothing is left in code except layout, animation, booking and link destinations. Phone, e-mail, address and opening hours are in Hotel Information (with the code values as fallback); the booking ids, booking address and contact-form recipient deliberately stay in code.
