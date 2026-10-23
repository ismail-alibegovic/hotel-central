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
- **Navigation** (global): wording of the header and menu (menu/close/rooms/booking buttons, skip link, language label) and the menu entries (page path + wording per language + "show in menu"). The footer's "Explore" list is the same entries, minus Home. Administrator-only: adding, removing, reordering, destinations and visibility of entries (field access drops the values, and a second hook rejects structural changes with 403). The booking button's address always comes from code.
- **Footer** (global): wording (reservations strip, large statement, headings, rights, credits) per language, and social links (administrator-only, approved https hosts only; empty = Facebook as built in). Address, phone and e-mail stay in code.
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
Home-page copy, offers/FAQ/CTA sections, and creating new pages. Business contact details (address, phone, email, booking ids) deliberately stay in code.
