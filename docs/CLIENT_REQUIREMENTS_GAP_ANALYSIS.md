# Client requirements — gap analysis and CMS extension plan

Status: **analysis only. Nothing in this document is implemented.** No migration has been written or run, no production or staging
data was read or changed, and no Vercel or Supabase resource was touched.

Audited revision: `origin/main` at `4f2e651` ("Tests and findings: Contact page end to end, permissions, decisions list (#29)").
Open pull requests at the time of the audit: #12 (offers sections + stand-alone Offers collection, superseded in part by #14) and draft
#17 (per-language publishing, marked "do not merge").

Audience: the agency team, and — through the "Required hotel input" columns — Managing Director Nerina Hrvačić.

---

## 0. Summary

| # | Requirement area | Today | Gap size | Priority |
| - | --- | --- | --- | --- |
| 1 | Hotel information (phones, e-mails, address, opening hours, central updates) | **Hard-coded** in `src/content/hotel.ts`; repeated in ~10 components; no opening hours anywhere | Large (new global, wiring into the site chrome) | **P1** |
| 2 | Café menu (categories, items, BS/EN, prices, photos, visibility, order) | **Does not exist.** The restaurant page is breakfast/catering prose; the README records "no menus" on purpose | Large (new content model + one new section) | **P2** (blocked on hotel content) |
| 3 | SPA, wellness & fitness (services, memberships, durations, prices, hours, galleries, visibility, order) | Prose + facts + galleries are editable as page sections; **treatments, prices and memberships are not modelled** — the page links to the hotel's old price list | Large | **P2** (blocked on hotel content) |
| 4 | Special offers (validity dates, publication state, auto-hide, BS/EN, safe cache invalidation) | Offers are a **page section** with BS/EN text and a free-text "valid" field; **nothing hides them**; proposal written (`docs/admin-ux/OFFER_EXPIRY_PROPOSAL.md`) | Medium | **P1** |
| 5 | Page editing & media (sections, reorder/remove, simple photos, Live Preview, draft/publish) | **Largely done** (#14–#16, #22, #25, #28); document-level publishing across languages is the main remaining defect | Small–medium | **P1** (publishing), P3 (polish) |
| 6 | Handover (password reset, users, docs, Bosnian PDF guide, portability, ownership, backup/restore) | Users/roles done; restore drill done locally; **no e-mail adapter** (reset cannot work), no guide, no ownership transfer, some docs stale | Medium (mostly non-code) | **P1** (reset, backups), P2 (rest) |

Room rates stay in the eZee / ipms247 booking engine. Nothing below adds a room price field; the `Rooms` collection has none today and
must stay that way (see §7).

---

## 1. Hotel information

### Existing implementation
* `src/content/hotel.ts` holds the verified facts as constants: `phoneDisplay`, `phoneHref`, `email`, `street`, `postalCode`, `city`,
  `country`/`countryBs`, `facebook`. Source comment: "Do not add facts here that are not published by the hotel."
* They are read directly by: `Footer.tsx`, `FullscreenMenu.tsx`, `MobileBookBar.tsx`, `home/FinalBooking.tsx`, `home/LocationSection.tsx`,
  `blocks/BlockRenderer.tsx` (contact section links), `content/layouts.ts` (static hero meta and CTA buttons on several pages),
  `[locale]/layout.tsx` (JSON-LD: telephone, e-mail, postal address), `lib/seo.ts`, `cms/chromeMerge.ts` (Facebook fallback),
  `cms/seedGlobals.ts`, and `app/api/contact/route.ts` (default recipient when `CONTACT_TO` is unset).
* `maps` (query, directions, embed) is derived from the same address but written out separately.
* The **Contact page** "Reception — address and opening hours" and "Reservations — phone and e-mail" fields are free **text** in the
  `contact` block; the clickable phone/e-mail links next to them still come from code (`STAGING_ACCEPTANCE.md` D3 states this limit).
* The **Footer** global deliberately keeps address, phone and e-mail in code (comment in `src/cms/globals/Footer.ts`).
* **Opening hours: none.** No hours are published in code for reception, restaurant, café, spa, pool or gym (README: "Nothing was invented:
  no … opening hours").

### Missing functionality
1. One place to edit phone numbers, e-mail addresses and the postal address that updates header menu, footer, mobile bar, booking banner,
   contact section links and structured data together.
2. More than one phone/e-mail (reception, reservations, spa, events) with a per-language label.
3. Opening hours for each facility, per language, reusable by the contact, café and spa sections.
4. Admin sidebar entry ("Hotel Information" is explicitly left out of `navItems.ts` because it has no screen).

### Recommended solution
A new **global `hotel-info`** ("Hotel Information"), drafts + admin-only publish exactly like `Footer`/`Navigation`:

| Field | Type | Localized | Who edits |
| --- | --- | --- | --- |
| `phones[]` → `label`, `number`, `primary` | array (max 6) | label only | admin (structure), editor (labels, as drafts) |
| `emails[]` → `label`, `address`, `primary` | array (max 6) | label only | admin |
| `address` → `street`, `postalCode`, `city`, `country` | group | `country` only | admin |
| `mapsQuery` | text (optional; default derived from address) | no | admin |
| `hours[]` → `facility` (select: reception, restaurant, café, spa, pool, gym, other), `label`, `lines[]` (`days`, `time`), `note` | array | label/days/note | editor (drafts) |

Rules:
* **Fallback per field to `src/content/hotel.ts`**, as `chromeMerge.ts` does for the chrome: empty, invalid (phone not matching an E.164-ish
  pattern, e-mail not matching an address pattern) or unreachable → built-in value. The site can never render without a phone number.
* `phoneHref` is **derived** (`tel:` + digits), never typed.
* The **booking engine address and ids stay in code** (unchanged policy).
* The contact-form recipient stays `CONTACT_TO` (an environment variable) — a CMS edit must not silently redirect guest e-mail.
* Publishing revalidates the whole site (`revalidatePath("/", "layout")`, the existing `revalidateGlobalAfterChange`), because the values
  are in the layout.
* Implementation shape: a `getHotelInfo(locale)` server helper next to `getChrome()` (`src/cms/chrome.ts`), merged in the locale layout and
  passed down as props/context to the client components (`FullscreenMenu`, `MobileBookBar`) that today import `hotel` directly. Server
  components (`Footer`, `BlockRenderer`, JSON-LD) receive it the same way.

### Database impact
New tables for one global with drafts: `hotel_info`, `hotel_info_locales`, `hotel_info_phones` (+`_locales`), `hotel_info_emails`
(+`_locales`), `hotel_info_hours` (+`_locales`, + nested `lines`), and the matching `_hotel_info_v*` version tables. **Purely additive**
(new tables only; no existing table altered). One migration.

### Frontend impact
No visual change. Components switch from the `hotel` import to the merged value; with the CMS off or empty the HTML must be byte-identical
(the existing `scripts/audit/compare-html.mjs` and `html-parity.spec.ts` prove it). A new `openingHours` section (see §2/§3, reusing
`FactList` from `components/page/PageParts.tsx`) shows hours on Contact, Restaurant and Spa pages.

### Required hotel input
* Confirm which phone numbers and e-mail addresses are public (and their labels in BS/EN).
* **All opening hours** (reception, restaurant/café, spa, pool, gym), including seasonal or holiday exceptions, in both languages.
* Decide whether editors may change the numbers or only administrators (recommended: administrators only).

### Priority
**P1** — it is a "central updates" commitment and every other area reuses the opening hours.

---

## 2. Café menu management

### Existing implementation
* None. `/restaurant` shows breakfast and catering prose, a gallery and a CTA (editable as page sections). `src/content/pages.ts` line 5
  and the README state that no menu was published by the hotel, so none was invented.
* Reusable pieces: the block system (`src/cms/blocks/config.ts` → `resolve.ts` → `BlockRenderer.tsx`), the `roomList` block pattern
  (a section that renders data edited elsewhere), `imageField()` (the simplified photo field from #28), the `Offers` card component in
  `components/blocks/Sections.tsx`, `FactList` (name/value rows).

### Missing functionality
Everything: categories, items, BS/EN descriptions, prices, photos, visibility, ordering, and a place on the website to show it.

### Recommended solution
A new **global `cafe-menu`** ("Café Menu") rather than two collections:

```
cafe-menu (global, drafts, admin-only publish)
  currency           select  KM (BAM) | EUR, default KM            (not localized)
  note               textarea, localized   e.g. "Prices include VAT"
  categories[]       array (drag to reorder)
    name             text, localized, required
    intro            textarea, localized
    visible          checkbox, default true
    items[]          array (drag to reorder, max ~60)
      name           text, localized, required
      description    textarea, localized
      price          number (2 decimals, min 0)                   (not localized)
      unit           text, localized   e.g. "0,33 l", "250 g"
      photo          imageField()      optional
      tags           select hasMany: vegetarian, vegan, gluten-free, contains nuts, alcohol
      visible        checkbox, default true
```

Why a global, not `menu-categories` + `menu-items` collections:
* **One draft, one Preview, one Publish** for the whole menu — the existing publish summary (`PublishWithSummary.tsx`, per-language change
  list) and the editor-drafts-only rule work unchanged. With collections every changed item is a separate document to publish.
* Order is the array order (drag and drop); no `order` numbers to keep consistent.
* Matches the existing `Homepage` global pattern (tested guards: `requireEditorDraftGlobal`, `blockEditorPublishGlobal`).
* Trade-off: a very large menu (>300 items) makes one heavy form. If the hotel's menu is that large, switch to collections before building
  (decision point in PR breakdown).

Website: one new **section `priceList`** ("Price list (from Café Menu / Spa & Wellness)") with one field `source` (select: café menu,
spa treatments, memberships) and an optional category filter. Like `roomList` it has nothing else to fill in. It is placed on
`/restaurant` (or a new page created under *Pages → added pages*) by an administrator.

Prices: stored as numbers, formatted per locale (`12,50 KM` in BS, `12.50 KM` in EN) by one pure, unit-tested formatter. An item without
a price shows no price (never "0").

### Database impact
* Global tables `cafe_menu`, `cafe_menu_locales`, `cafe_menu_categories` (+`_locales`), `cafe_menu_categories_items` (+`_locales`),
  `…_items_tags`, plus `_cafe_menu_v*` versions. Additive.
* The new `priceList` block adds `pages_blocks_price_list`, `custom_pages_blocks_price_list` and both `_v` copies (blocks are shared by
  `pages` and `custom-pages`, so every new block creates **four** table sets). Additive.

### Frontend impact
New `PriceList` component in `components/blocks/Sections.tsx`, built from existing type styles (`label`, display serif headings,
hairline rules from `DecorativeLine`, tones from the existing `tone` select). No change to any existing section. New visual baselines for
the new section only; existing baselines must not change.

### Required hotel input
* **Is "Café" the same as Restaurant Central**, or a separate outlet (lobby café/bar)? Which page shows it, and does it need its own URL
  (`/en/cafe`, `/bs/kafe`)?
* The full menu in BS and EN, with prices, currency, VAT wording, units, allergen/dietary marking policy.
* Photos (or approval to use none; items work without photos).
* Who keeps prices current (editor drafts + admin publish is the default).

### Priority
**P2.** The model can be built and tested with clearly marked sample data, but **nothing is published without the hotel's real menu**
(the existing DEMO / SAMPLE guard applies to the `priceList` section if the source has sample data).

---

## 3. SPA, wellness & fitness management

### Existing implementation
* `/spa` is a `pages` document: hero, three `split` sections (pool, fitness, Wellness Day Spa), `facts`, `gallery` — all editable,
  reorderable, removable (`content/layouts.ts` case `spa`).
* Treatments and prices are **not** on the site: the Day Spa CTA links to `https://www.hotelcentral.ba/facilities/wellness-day-spa/`
  (`DAY_SPA_URL`, "prices change; we link rather than copy"). That link breaks when the old site is retired.
* Galleries: the `gallery` block, 1–5 photos per gallery (the design is a five-photo composition), any number of galleries per page.
* Home page `SpaShowcase` texts/photos are editable in the `Homepage` global.
* No memberships, packages, durations, opening hours or per-item visibility.

### Missing functionality
Treatment list with durations and prices, memberships/packages, opening hours (pool, spa, gym), per-item visibility and order.
Galleries exist but are capped at five photos each.

### Recommended solution
A new **global `spa-wellness`** ("Spa & Wellness"), same pattern as the café menu:

```
spa-wellness (global, drafts, admin-only publish)
  treatments[]                 array, drag to reorder
    category   select: massage, face, body, hands & feet, rituals, other   (labels BS/EN in code)
    name       text, localized, required
    description textarea, localized
    options[]  array  → minutes (number), price (number), label (text, localized, e.g. "for two")
    photo      imageField(), optional
    visible    checkbox
  memberships[]                array, drag to reorder
    kind       select: membership, package, day pass
    name, description          localized
    period     text, localized   e.g. "1 month", "10 visits"
    price      number
    includes[] text, localized
    visible    checkbox
  bookingNote  textarea, localized   e.g. "Book at reception or call …" (phone from Hotel Information)
```

* Opening hours live in **Hotel Information** (§1, facilities spa / pool / gym), not here, so there is one place for hours.
* Galleries: keep the existing `gallery` block (no new model). If the hotel needs more than five photos, add several gallery sections;
  raising `maxRows` would change the composition and is out of scope unless the design is extended.
* Website: the `priceList` section (§2) with `source = spa treatments | memberships`, and the `openingHours` section (§1). An admin
  replaces the external price-list CTA once real data is published.

### Database impact
Global tables `spa_wellness*` and `_spa_wellness_v*` (treatments, options, memberships, includes, locales). Additive. The `priceList` and
`openingHours` blocks are shared with §1/§2 (one migration if built together; otherwise one per PR).

### Frontend impact
Reuses `PriceList` (§2) with a duration column; `openingHours` reuses `FactList`. Existing spa sections unchanged.

### Required hotel input
* Treatment list, durations, prices, memberships/packages and their terms, in BS and EN.
* Pool / spa / gym opening hours (including guest vs. external-member hours if different).
* Whether external (non-guest) memberships are sold and may be advertised.
* Confirmation that the old price-list page can be replaced.
* Photos (the README already notes **no usable gym photography**).

### Priority
**P2**, built together with the café menu (same section, same tests). Blocked on hotel content for publication.

---

## 4. Special offers

### Existing implementation
* `offers` block (`blocks/config.ts`): up to 6 offers per section, each with photo, tag, name, description (BS/EN), free-text `validity`,
  `priceNote`, a button (booking button from code or a validated link). Rendered by `Offers` in `components/blocks/Sections.tsx`;
  resolved in `cms/resolve.ts` (rows untranslated in a language are dropped; a section without usable rows is skipped).
* Publication state = the **page's** draft/published state; DEMO / SAMPLE guard prevents publishing example offers.
* **No automatic hiding**: an expired offer stays until someone edits and publishes.
* Caching: built-in pages are prerendered and refreshed only on publish (`hooks/revalidate.ts`); added pages are `force-dynamic`.
* A detailed proposal exists: `docs/admin-ux/OFFER_EXPIRY_PROPOSAL.md` (`showFrom`/`showUntil` day-precision dates, Europe/Sarajevo
  calendar day, pure `isOfferVisible()`, hourly refresh or daily cron).
* Open PR #12 contains an older stand-alone Offers collection.

### Missing functionality
1. Validity dates that the website enforces.
2. A clear per-offer status for staff ("Live", "Starts 1 June", "Ended 31 August", "Page not published").
3. Expiry taking effect on prerendered pages without a publish.
4. Cache refresh that cannot replace CMS content with static fallback content during a database outage (see below).

### Recommended solution
Implement the existing proposal, with three corrections found in this audit:

1. **Keep offers as a page section** (no stand-alone collection). It needs two nullable columns instead of a new collection, relationship
   and section, and keeps the publish workflow staff already know. **Close PR #12 as superseded** (owner decision).
2. **Clear publication state without a database change:** a read-only status line in each offer row (a `ui` field, like `statusNote`)
   computed from the dates and the page's status: *"Live on the website"*, *"Scheduled — appears 1 June"*, *"Ended — hidden since 1
   September"*, *"Draft — publish the page to show it"*.
3. **Safe cache invalidation.** Adding `export const revalidate = 3600` to the built-in routes is the simplest refresh, **but** today
   `getCmsDoc()` turns a database error into "no document", which renders the *static* layout. During a background regeneration that
   result would be cached for an hour, i.e. a short database outage would replace published CMS content with the original built-in copy.
   Fix in the same PR: during ISR regeneration (not at build time, not in Draft Mode) a CMS read **error** must throw, so Next.js keeps
   serving the previous good page; only "document really absent" falls back to static. Covered by a new phase in
   `tests/cms-e2e/outage.spec.ts`.
4. The proposal says the migration touches "the offers-items table and its versions table". Because blocks are shared, it is **four**
   tables: `pages_blocks_offers_items`, `_pages_v_blocks_offers_items`, `custom_pages_blocks_offers_items`,
   `_custom_pages_v_blocks_offers_items` (exact names to be confirmed from the generated SQL).

Exact-midnight removal (a Vercel Cron calling a protected revalidation route) stays optional and needs a secret and a Vercel change —
**hotel/owner approval required**; the hourly refresh needs none.

### Database impact
`ALTER TABLE … ADD COLUMN show_from date NULL, ADD COLUMN show_until date NULL` on the four tables above. Additive, no default, no
rewrite, reversible. Existing offers behave exactly as before (no dates = no limit).

### Frontend impact
None visually; expired/not-yet-valid offers are removed before rendering, and a section whose offers are all hidden disappears (existing
resolver behaviour). HTML parity for pages without dates must remain byte-identical.

### Required hotel input
* Confirm day precision and Europe/Sarajevo is right ("valid until the 31st" = gone at 00:00 on the 1st).
* Accept "within an hour after midnight" or ask for exact midnight (cron).
* Real offers, texts and approved prices (the field help already says "Only enter real prices approved by the hotel").
* Decide PR #12's fate.

### Priority
**P1** — an expired offer left online is a commercial and legal risk; the proposal is ready.

---

## 5. Page editing & media

### Existing implementation (satisfied)
| Requirement | Status | Where |
| --- | --- | --- |
| Flexible predefined sections | **Done**: 12 section types (hero, text-with-photos, facts, statement, gallery, “Book your stay”, map & arrival, contact, room list, offers, FAQ, banner with button) | `cms/blocks/config.ts`, `components/blocks/*` |
| Reorder / remove sections | **Done** (drag; `minRows: 1`; untranslated sections skipped, never half-rendered) | `Pages.ts`, `CustomPages.ts`, `resolve.ts` |
| New pages | **Done** (admin creates, per-language URLs, sitemap, 404 while draft) | #15 |
| Simplified photo management | **Done**: current photo + *Replace photo*, options folded away (#28); library explains itself + *Add photos* (#26); one-step room photos (#22) | `PhotoCurrent.tsx`, `MediaIntro.tsx`, `RoomPhotosPanel.tsx` |
| Reliable Live Preview | **Done locally** (#25: numbered refresh requests, retries, status bar, narrow-screen behaviour) | `PreviewBar.tsx`, `LivePreviewListener.tsx`, `preview.spec.ts` |
| Draft / publish | **Done** with server-enforced roles; publish summary per language (#21) | `access.ts`, `hooks/blockEditorPublish.ts`, `PublishWithSummary.tsx` |

### Partial / missing
1. **Document-level publishing**: publishing one language also publishes the other language's pending draft (`PHASE2_READINESS.md`
   risk 1). The publish summary makes it visible but does not prevent it. Draft PR #17 (Payload `localizeStatus`) fixes it but is
   experimental and changes the version tables.
2. **Live Preview on the hosted staging site** has not been verified by a signed-in person (`REAL_STAGING_FINDINGS.md` §1 "Limits").
3. **Real Vercel Blob upload** never exercised on the hosted store (§2 of the findings).
4. **119 built-in photos are not in the library** (import needs approval; writes 119 rows and files).
5. **Page-form order** (text → photos → other sections → SEO → advanced) not investigated.
6. Known Payload quirk: occasionally one Publish click after an autosave is ignored (readiness risk 6).

### Recommended solution
* Staging verification of 2 and 3 by a signed-in person (checklist in `STAGING_ACCEPTANCE.md`) — **no code**.
* For 1: soak PR #17 on a **restored copy** of the staging database, then decide. Interim: keep the publish summary and train staff
  ("review both languages before publishing").
* For 4: only if the hotel wants built-in photos selectable from the library; otherwise "Photo already on the website" stays.
* 5 and 6: P3 polish.

### Database impact
None for 2, 3, 5, 6. PR #17 alters version tables (`_status` becomes per-locale) — the only non-additive change in this plan; needs a
backup and an approved migration window. Item 4 writes data, no schema change.

### Frontend impact
None.

### Required hotel input
Staff time for the hosted checks; decision on per-language publishing; decision on importing built-in photos.

### Priority
**P1** for per-language publishing decision and hosted checks; **P3** for the rest.

---

## 6. Client handover requirements

| Requirement | Existing | Missing | Recommended solution | DB impact | Hotel input | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| **Secure e-mail password reset** | Payload's `forgot-password` endpoint exists; the `users` table already has `reset_password_token/expiration/requested_at`; the answer is identical for known/unknown accounts (`security.int.spec.ts`); lockout after 5 failures | **No e-mail adapter is configured**, so no reset e-mail can be sent; the login page tells people to "ask the website administrator" | Add an e-mail adapter (`@payloadcms/email-resend`, since Resend is already used by the contact form; or SMTP via nodemailer), sender on a verified hotel domain; enable "Forgot password?" on the login screen; short token lifetime (1 h); English reset e-mail (admin is English) with a Bosnian line; Vercel Firewall rate-limit rule for `/api/users/login` and `/api/users/forgot-password` (needs approval, Vercel change) | **None** (columns exist) | Sending domain/DNS records on `hotelcentral.ba`; who owns the Resend (or SMTP) account | **P1** |
| **Admin / editor user management** | `Users` collection: admin/editor roles, only admins create users or change roles, editors see only themselves, 2 h sessions | No guard against **deleting or demoting the last administrator** (lock-out); no way to **deactivate** an account without deleting it; new users get a password typed by the admin | Hook: refuse delete/demote of the last admin; `active` checkbox (admin-only) checked at login (`beforeLogin` hook); "send set-password e-mail" on create (reuses the reset flow once e-mail works) | `active` = 1 nullable boolean column on `users` (additive) | List of staff, their roles, who are the (at least two) administrators | **P1** (guard) / P2 |
| **Technical documentation** | Extensive: `CMS_CONTENT_MODEL.md`, `CMS_STAGING.md` (runbook, env vars, backup), `TESTING.md`, `PAYLOAD_POC.md`, `DEPENDENCY_AUDIT.md`, README | No single handover document; **stale references to MongoDB Atlas** in `infra/staging/env.template` ("Atlas SRV string") and `PHASE2_READINESS.md` ("Provision … MongoDB Atlas"); content model doc must be extended for every new global | `docs/HANDOVER.md` (architecture, accounts, environments, deploy/migrate/rollback, costs, contacts); fix the stale files; update `CMS_CONTENT_MODEL.md` per PR | None | Who receives it (hotel IT / future agency) | **P2** (stale fixes: P1, trivial) |
| **Bosnian PDF user guide with screenshots** | English staff checklist `STAGING_ACCEPTANCE.md`; admin screenshots in `docs/admin-ux/` (English UI) | No Bosnian guide | Markdown source in `docs/guide/bs/` → PDF; screenshots captured by a Playwright script against a seeded local build (reproducible after every UI change, never against production data); the admin UI stays English, so the guide explains English button names in Bosnian ("kliknite **Publish Changes** (Objavi izmjene)") | None | Review by a Bosnian-speaking staff member; which tasks to cover | **P2** — write **after** P1/P2 features freeze the UI |
| **Hosting portability** | PostgreSQL via standard `pg` (portable); migrations committed; app is plain Next.js 16 (`next start` works off Vercel); `revalidatePath`/Draft Mode work self-hosted | Media adapter is Vercel-Blob-specific; no Dockerfile or non-Vercel runbook; never tested off Vercel | Document and test a portable path: `next build && next start` + any PostgreSQL + `@payloadcms/storage-s3` (S3-compatible: AWS, Cloudflare R2, Hetzner) behind the same env switch as Blob; `cms:backup-media` already exports files | None (storage swap keeps `media` rows; URLs must be rewritten if files move — a data step, needs approval) | Long-term hosting preference and budget | **P2** |
| **Repository & infrastructure ownership transfer** | Repo under the personal account `ismail-alibegovic`; Vercel project, Blob store and Supabase project under the agency's accounts (`CMS_STAGING.md` §6); branch protection on `main` not enabled | Transfer plan, hotel-owned accounts, secret rotation | Checklist: hotel creates GitHub org, Vercel team, Supabase org, Resend account, password manager → transfer repo (GitHub keeps redirects) → transfer Vercel project and Supabase project (both support transfer) → **rotate every secret** (`PAYLOAD_SECRET`, DB password, Blob token, Resend key) → enable branch protection → remove agency access last. Each step is an owner action, done by the hotel with us present | None | Account owners, billing details, timing; the decision on paid plans (Vercel Pro if commercial, Supabase Pro for backups) | **P2** (plan now, execute at launch) |
| **Backup & restore verification** | `npm run cms:restore-drill` (pg_dump → restore → login/locales/drafts/media verified) runs locally and in CI; runbook in `CMS_STAGING.md` §4 | Media backup **never run against a real Blob store**; Supabase Free has no reliable backups; no scheduled backup; never restored the **hosted** database | (a) scheduled `pg_dump` + `cms:backup-media` (GitHub Actions cron with encrypted secrets, artifacts kept 30–90 days, or Supabase Pro PITR); (b) a documented, timed restore of a hosted dump into a scratch project with sign-off; (c) quarterly re-test | None | Approval for the scheduled job/secrets and retention; choice of paid backup tier | **P1** before go-live |

---

## 7. Explicitly out of scope / guard rails

* **Room rates and availability** stay in eZee / ipms247. No price field on `Rooms`; the booking URL, hotel id and room-type ids stay in
  code (`src/content/hotel.ts`, admin-only `roomTypeId` that the site ignores). A test asserting `Rooms` has no price-like field should
  accompany the first PR that adds prices anywhere (café/spa), so the boundary cannot erode.
* The **public design** is preserved: new sections are composed from existing tokens/components; existing visual baselines must not change
  (CI `visual` job), CMS-off HTML must be identical (`compare-html.mjs`).
* **Admin interface stays English** (`src/cms/admin/i18n.ts`); website content stays bilingual with `fallback: false` (a missing
  translation is empty, never silently English); every new localized field follows the same rule and falls back to built-in copy where
  built-in copy exists.
* No scheduled publishing of whole pages, no promo codes, no online spa booking, no online ordering.

---

## 8. Database migrations required (summary)

All migrations are generated with `npm run cms:migrate -- create`, reviewed, tried on a restored copy, applied after a fresh `pg_dump`,
**and only with approval** (procedure: `CMS_STAGING.md` §3a). None has been written.

| # | Migration | Kind | Tables | Risk |
| - | --- | --- | --- | --- |
| M1 | `hotel_info` global | create tables | `hotel_info*`, `_hotel_info_v*` | low (additive) |
| M2 | offer validity dates | add 2 nullable `date` columns | 4 offers-items tables | low (additive, reversible) |
| M3 | `cafe_menu` + `spa_wellness` globals, `priceList` + `openingHours` blocks | create tables | globals + 4 table sets per block | low (additive) |
| M4 | `users.active` | add 1 boolean column | `users` | low |
| M5 | per-language publishing (PR #17) | **alter** version tables | `_pages_v`, `_custom_pages_v`, `_rooms_v`, globals' `_v` | **medium** — only non-additive change; separate approval |

Not needing a migration: password-reset e-mail, last-admin guard, cache/ISR changes, offer status line, docs, guide, backups, portability
docs, ownership transfer.

Deploy order for every migration: dump → migrate → deploy code (code that reads a new column must never run first).

---

## 9. Reusable frontend components

| Need | Reuse |
| --- | --- |
| Opening hours rows | `FactList` (`components/page/PageParts.tsx`) |
| Menu / treatment / membership lists | new `PriceList` built from `label` typography, `DecorativeLine`, `tone` palette; card variant from `Offers` (`components/blocks/Sections.tsx`) |
| Photos | `Photo` (`components/Photo.tsx`) via `resolveImage()`; admin `imageField()` |
| Headings / intros | `titleField`, `EditorialSplit` header pattern |
| Section that renders data edited elsewhere | `roomList` block → `BlockRenderer` pattern |
| Contact values in chrome | `getChrome()` / `mergeChrome()` merge-with-fallback pattern |
| Drafts, admin-only publish, editor guards | `adminOnlyPublish`, `requireEditorDraftGlobal`, `blockEditorPublishGlobal`, `statusNote` |
| Cache refresh | `revalidateGlobalAfterChange` (`/` layout) |
| DEMO / SAMPLE guard | `sampleField`, `refuseSamplePublish` |

---

## 10. Complexity and dependencies

| PR | Complexity | Depends on |
| --- | --- | --- |
| PR-A Docs fixes (stale Atlas refs) + `HANDOVER.md` skeleton | XS | — |
| PR-B Last-admin guard | S | — |
| PR-C Password reset e-mail | S (code) + DNS | hotel: sending domain |
| PR-D Offer validity dates + status line + safe ISR | M (~1.5 days incl. tests) | M2 approval |
| PR-E Hotel Information global + chrome wiring + `openingHours` section | M–L (~3 days) | M1 approval; hotel: contacts, hours |
| PR-F Café menu + Spa & Wellness globals + `priceList` section | L (~4–5 days) | M3 approval; PR-E (hours, phone in booking note); hotel: menu, treatments |
| PR-G Deactivate users (`active`) + set-password invite | S | PR-C, M4 |
| PR-H Scheduled backups + hosted restore drill | M | owner approval (secrets, Actions, retention) |
| PR-I Portability: S3 storage option + self-host runbook | M | — (testable locally with MinIO) |
| PR-J Bosnian PDF guide + screenshot script | M | PR-D, E, F merged (UI frozen) |
| PR-K Per-language publishing (PR #17) | M + soak | M5 approval; staging soak |

```
A ─┐
B ─┤
C ─┼─► G
D ─┤
E ─┼─► F ─┐
H ─┤      ├─► J
I ─┘      │
K (independent, after soak) ┘
```

---

## 11. Tasks: safe to implement now vs. needing hotel approval

### Safe to implement now (no hotel input; additive code only; migrations are *written and reviewed* in PRs but **applied only after approval**)
1. PR-A — fix stale MongoDB references; `HANDOVER.md` skeleton.
2. PR-B — last-administrator guard (no schema change).
3. PR-D — offer validity dates, status line, safe ISR (code + migration file; applying M2 needs approval, but the design was already
   presented in `OFFER_EXPIRY_PROPOSAL.md`).
4. PR-E — Hotel Information **model and wiring** with fallback to today's values (site unchanged until someone publishes); hours section
   built but empty until data arrives.
5. PR-C — e-mail adapter code behind an env switch (inactive until a key and domain exist).
6. PR-I — S3/self-host option and runbook (tested locally).
7. Screenshot-capture script for the guide (against seeded local data).

### Needs hotel approval or input first
1. Applying any migration to the hosted database (M1–M5).
2. Café: is it Restaurant Central or a separate outlet, which page/URL, the real menu and prices.
3. Spa: treatments, durations, prices, memberships, replacement of the old price-list link, photos.
4. Public phone numbers, e-mails, all opening hours.
5. Offers: exact-midnight cron vs. hourly; real offers; closing PR #12.
6. E-mail sending domain/DNS and account ownership.
7. Per-language publishing (PR #17) after a soak.
8. Importing the 119 built-in photos into the library.
9. Scheduled backup job, secrets, retention, paid tiers (Vercel Pro if commercial, Supabase backups).
10. Ownership transfer timing and hotel-owned accounts.
11. Bosnian guide review.

---

## 12. Proposed PR breakdown and prioritized implementation plan

Each PR: lint, typecheck, build, `test:int`, smoke, visual, CMS e2e green; CMS-off HTML identical; existing visual baselines unchanged;
content model doc updated; no secrets; no production data touched; merged only by the owner.

**Phase 1 — risk and commitments (P1)**
1. **PR-A** Docs: stale database references, handover skeleton. *(XS, now)*
2. **PR-B** Users: refuse deleting/demoting the last administrator. *(S, now)*
3. **PR-D** Offers: `showFrom`/`showUntil`, per-offer status line, Sarajevo-day rule, hourly refresh of built-in pages, ISR keeps the last good
   page on database errors. *(M; apply M2 after approval)*
4. **PR-E** Hotel Information global: phones, e-mails, address, opening hours; header/menu/footer/mobile bar/contact/JSON-LD read it with
   fallback; `openingHours` section; sidebar entry under Website Settings. *(M–L; apply M1 after approval; publish after hotel data)*
5. **PR-C** Password reset by e-mail (adapter behind env switch, "Forgot password?" on login, rate-limit rule documented). *(S; live after
   domain is verified)*
6. **PR-H** Scheduled database + media backups and one timed restore of a hosted dump into a scratch project. *(M; needs approval)*
7. Hosted checks by a signed-in person: Live Preview, real Blob upload, `cms:backup-media` against the real store. *(no code)*

**Phase 2 — new content areas (P2)**
8. **PR-F** Café Menu and Spa & Wellness globals + `priceList` section (+ test that rooms carry no prices). *(L; apply M3 after approval;
   publish only with real hotel content)*
9. **PR-G** Deactivate accounts + set-password invitation e-mail. *(S; M4)*
10. **PR-I** Hosting portability: S3-compatible storage option, `next start` runbook, tested locally. *(M)*
11. **PR-K** Per-language publishing — decide after soaking PR #17 on a restored copy. *(M; M5, separate approval)*

**Phase 3 — handover (P2/P3)**
12. **PR-J** Bosnian PDF user guide with reproducible screenshots (after Phase 2 freezes the UI).
13. Ownership transfer session (hotel-owned GitHub, Vercel, Supabase, Resend; secret rotation; branch protection; agency access removed).
14. Polish: page-form section order, built-in photo import (if approved), Payload publish-click quirk.

Nothing in this plan is implemented automatically; each PR starts only when the owner says so.
