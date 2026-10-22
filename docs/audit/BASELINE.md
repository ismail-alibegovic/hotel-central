# Hotel Central — Phase 0 Baseline Audit

Audit date: 2026-10-22 · Spec: `HOTEL_CENTRAL_CMS_IMPLEMENTATION_PLAN.md` (Phase 0)
Status legend: **PASS** · **FAIL** · **NOT TESTED** · **BLOCKED**

Nothing in this audit modified the live demo, `hotelcentral.ba`, Vercel settings, `main`, or any hotel account. Only public GET requests were made to the legacy site.

## 1. Repository state

| Item | Result |
| --- | --- |
| `origin/main` SHA | `1ec4979eedae29dd7b6ef9eea7a7cdea904e8ef0` (same as the earlier audit) — PASS |
| History | 2 commits (`d99252b` initial, `1ec4979` update) |
| Working tree | clean at start |
| Branch protection on `main` | **FAIL — `protected: false`** (GitHub API). Nothing prevents direct pushes; PR-only workflow relies on convention. Needs repo-owner action. |
| Open / past PRs | none |
| CI (`.github/`) | **FAIL — none**. No workflows; lint/type/build only run in Vercel's build. |
| Tests | **FAIL — none**. No unit, integration or e2e tests, no test script. This PR adds a smoke script (see §5). |
| `.env.example` | **FAIL — missing**, although `README.md` refers to it. |
| Working branch | `claude/youthful-brahmagupta-quy16y` (see "Deviation" in §9) |

## 2. Stack and versions (`package.json`, verified via `npm ls`)

Next.js **15.5.27** (App Router, SSG) · React **19.1.0** · Tailwind **4.3.3** · TypeScript **5.9.3** · Motion 14 · ESLint 9. Package manager: **npm** (`package-lock.json`). Node 22.22 / npm 10.9 locally; Vercel project Node **24.x**. No other runtime dependencies (no CMS, DB, analytics, email SDK, test runner).

## 3. Vercel (read-only API)

- Project `hotel-central` (`prj_pzW2fNtNg6pB1QcjeXAD9oesfq3A`), team "IA Production's projects", framework nextjs.
- Linked to GitHub `ismail-alibegovic/hotel-central`, branch `main`.
- Latest production deployment `dpl_F12qPWtYFfVGq9vV9HzwnaM9cm91`: **READY**, commit `1ec4979…` = current `main` — PASS.
- Domains: `hotel-central-pi.vercel.app` (+ two default Vercel aliases). No custom domain.
- Not inspected: environment variables (values never read); whether `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` are set. Behaviour of the demo implies the site URL is **unset** (see finding F2).

## 4. Code map

```
src/app/[locale]/{page,about,rooms,rooms/[slug],spa,restaurant,meetings-events,location,contact}  – SSG pages, locales en|bs
src/app/[locale]/layout.tsx      – fonts, JSON-LD, Header/Footer/MobileBookBar; dynamicParams=false; generateStaticParams = locales only
src/app/api/contact/route.ts     – only server route; Resend over fetch; in-memory rate limit
src/app/{sitemap,robots}.ts      – generated from src/content + hotel.siteUrl
src/middleware.ts                – redirects unprefixed paths to /en or /bs (Accept-Language bs|hr|sr|sh)
src/lib/{i18n,seo,contact,fit,useReducedMotionSafe}.ts
src/content/{hotel,rooms,dictionary,pages}.ts   – ALL content (≈1,030 lines), Localized<T> = {en,bs}
src/components/…                 – Header, FullscreenMenu, LanguageSwitcher, Footer, Photo, Reveal, ui, ContactForm,
                                   booking/{BookingBar,RangeCalendar}, home/*, page/PageParts
public/images/                   – ~130 JPGs (static, in git), public/icon.svg
```

### Route inventory (from `next build`, 34 static pages)

`/[locale]` · `/about` · `/rooms` · `/rooms/[slug]` (6 slugs × 2 locales: `single-room`, `standard-twin-double`, `superior-double-room`, `family-room`, `junior-suite`, `presidential-suite`) · `/spa` · `/restaurant` · `/meetings-events` · `/location` · `/contact` — each under `/en` and `/bs`. Dynamic: `/api/contact`, middleware. Static: `/robots.txt`, `/sitemap.xml`.

### Integrations

- **Booking (eZee/iPMS247, hotel id `hotelcentralsarajevo`)**: `BookingBar.tsx` posts a form to `https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo` in a new tab; room pages link to `roomwisedata.php?hid=…&roomtypeunkid=…`. `hidBodyLanguage` is hard-coded to `"en"` (`BookingBar.tsx:207`) even on `/bs`. Not exercised (no real/test bookings made).
- **Contact**: `ContactForm` → `POST /api/contact`: server validation (`src/lib/contact.ts`), honeypot (`company`), per-IP limit of 5/10 min stored in a module-level `Map`, Resend only if env set; otherwise 503 and the form says to email/call.
- **Environment variable names referenced in code**: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. No other secrets, no analytics, no cookie/consent code.

## 5. Test baseline

| Check | Command | Result |
| --- | --- | --- |
| Install | `npm ci` | PASS |
| Lint | `npm run lint` | **PASS** (exit 0, no warnings) |
| Typecheck | `npx tsc --noEmit` | **PASS** (exit 0) |
| Production build | `npm run build` | **PASS** — 34/34 static pages, shared JS 103 kB, middleware 34.3 kB |
| Unit/integration/e2e | — | **NOT TESTED — none exist** |
| Dependency audit | `npm audit --omit=dev` | **FAIL — 2 vulnerabilities (1 critical, 1 high)**, see F1 |
| Live-demo browser smoke | `node scripts/audit/smoke.mjs https://hotel-central-pi.vercel.app` (Playwright + preinstalled Chromium) | **PASS** — 48/48 checks |

Browser smoke detail: 16 URLs (`/en`, `/bs`, `/en/rooms`, all 6 room details, spa, restaurant, meetings-events, location, contact, `/bs/rooms`, `/bs/contact`) × 3 viewports (390, 768, 1440). Each asserted: HTTP 200, no horizontal overflow, exactly one `<h1>`, no broken `<img>`, no console errors, no sub-requests ≥ 400. Raw results: `docs/audit/smoke-live-2026-10-22.json`. This is a functional smoke only; **visual regression baselines (screenshots/pixel diff) are NOT TESTED** and still need to be captured before Phase 1 touches rendering.

HTTP checks on the live demo (curl): 24 URLs returned 200 (all 18 EN/BS section pages and room details, `robots.txt`, `sitemap.xml`), `/` → 307 `/en`, `/en/rooms/nope` → 404, `robots.txt` 200, `sitemap.xml` 200.

NOT TESTED: booking submission to eZee (would hit a hotel production service), real contact delivery, keyboard/focus/screen-reader accessibility, Safari/Firefox, Lighthouse.

## 6. Findings

| # | Severity | Finding | Evidence |
| --- | --- | --- | --- |
| F1 | **High** | `next@15.5.27` is in an advisory range (npm reports critical: image-optimizer RCE with SVG, Server Actions DoS) plus PostCSS (nested in Next) high. npm says the fix is `next@15.5.28` (inside the same minor). The site does not use Server Actions or SVG optimisation, so exposure is likely limited, but this should be patched. | `npm audit --omit=dev` |
| F2 | **High (SEO)** | The public demo is indexable and impersonates the live domain: `robots.txt` is `Allow: /`, canonical/hreflang/sitemap/OG all point at `https://www.hotelcentral.ba/...` because `siteUrl` defaults to it. A search engine could index the demo or treat it as duplicate/canonical-conflicting. | `curl` robots, sitemap, `<link rel=canonical>` |
| F3 | Medium | `main` is unprotected; no CI. | GitHub API, no `.github/` |
| F4 | Medium | No automated tests at all; no visual baseline. | repo |
| F5 | Medium | `dynamicParams = false` + `generateStaticParams` = locales only in `[locale]/layout.tsx`: any CMS-created URL (`/[locale]/[...slug]`) would 404 until the param model changes. Room slugs are generated from static `rooms.ts`. Directly relevant to Phase 2. | `layout.tsx:19-22` |
| F6 | Medium | Contact rate limiter is an in-process `Map`; on serverless it is per-instance and resets on cold starts, so it is not effective. Phase 3 item. | `route.ts:12-19` |
| F7 | Medium | `hidBodyLanguage` hard-coded `en`, so `/bs` visitors land on the English booking engine. Valid values are unverified (plan says fix only against verified values). | `BookingBar.tsx:207` |
| F8 | Low | hreflang inconsistency: page `<head>` uses `bs-BA`/`en`/`x-default`, sitemap uses `bs`/`en`. | `seo.ts:7`, `sitemap.ts:12` |
| F9 | Low | `README.md` references a missing `.env.example`; it also calls the site a "Grand Emily Hotel" adaptation (internal note, should not ship in handover docs). | repo |
| F10 | Low | README open item: EN vs BS airport taxi price differ (15 € vs 18 €) — content discrepancy to confirm with hotel, not to be "fixed" silently. | README |
| F11 | Info | Images are static files in git (~130 JPGs); README notes many are low resolution. Media strategy (object storage) is a Phase 1/2 decision. | `public/images` |

## 7. Legacy WordPress inventory (public, read-only)

Source: `https://www.hotelcentral.ba/robots.txt` → `wp-sitemap.xml` index (posts, pages, Avada portfolio, 4 taxonomy sitemaps) plus homepage internal links. WordPress theme is Avada. Full table with proposed targets: **`docs/audit/legacy-urls.csv`** (51 rows; `PROPOSAL` only — nothing published, no redirects configured, targets not yet verified on staging).

- 51 URLs: 29 pages + 3 posts + 3 taxonomy pages were requested (34 × 200, 1 × 301 — a post URL redirecting to its `/news/…` form); 16 Avada demo `portfolio-items`/`portfolio_category` URLs (lorem-ipsum slugs) were listed but **not requested** (NOT CHECKED).
- **The Bosnian site exists under `/bs/` on WordPress** (`/bs/` and `/bs/rooms/` return 200 with `lang="bs"` and their own canonical) but the public sitemap lists only the English URLs. The BS URL set is therefore **incomplete — BLOCKED: needs WPML/Polylang export or hotel sitemap access**. The BS rows are not in the CSV.
- Room slug differences (need 301s): `deluxe-superior-double-twin` → `superior-double-room`; `family-room-2-double-twin-with-connecting-door` → `family-room`; `presidental-suite` → `presidential-suite`. **`business-room-double-twin-single-use` has no counterpart** on the new site (7 legacy room pages vs 6 new).
- Legacy pages with no equivalent on the new site (hotel decision): club-spa `classes`, `results`, `staff`, `membership`; `galerija-slika`; `about/faq`; COVID-19 page; news posts and category; `/book-now/` (external booking engine).
- Legacy site URLs end in a trailing slash; the new site has none (Next.js default redirects `/x/` → `/x`, but this was not tested on the new site because locale-less legacy paths also need middleware redirects).
- Completeness caveat: this is not a full historic inventory (no analytics, Search Console, server logs, or WP admin — all out of scope per the plan).

## 8. Remaining blockers / unknowns

| Item | Status |
| --- | --- |
| Branch protection / required reviews on `main` | BLOCKED — repo owner action |
| Vercel env var presence and values (site URL, Resend) | NOT TESTED — values intentionally not read |
| Complete BS legacy URL list, old backlinks | BLOCKED — HOTEL ACCESS REQUIRED |
| Booking engine params (guests/rooms, language codes) | BLOCKED — needs a test search against the hotel's live engine; not performed |
| Production email (Resend domain verification) | BLOCKED — HOTEL ACCESS REQUIRED |
| Visual regression baselines (390/768/1440 screenshots) | NOT TESTED — to do at the start of Phase 1 so rendering changes are measurable |
| Accessibility audit, Safari/Firefox | NOT TESTED |
| DigitalVantage starter / Payload compatibility | NOT STARTED — Phase 1 |

## 9. Deviation from the plan (needs your confirmation)

The plan asks for branch `feat/hotel-central-cms-poc`. This session is configured to push only to `claude/youthful-brahmagupta-quy16y`, so Phase 0 is committed there (created from `origin/main` `1ec4979`). No PR was opened — the task asked to "prepare" one; say the word and it will be opened from this branch (or retargeted to `feat/hotel-central-cms-poc`).

## 10. Proposed approach for Phase 1 (not started)

1. First commit: visual baselines (Playwright screenshots at 390/768/1440) + `@playwright/test` smoke suite wired as `npm run test:e2e`, plus a GitHub Actions workflow (lint, tsc, build) — so every later change has a regression gate.
2. Patch Next to 15.5.28 in its own tiny PR (F1), after the baseline is in.
3. Compatibility review: pull DigitalVantage's `package.json`, LICENSE, Payload version and Next requirement and compare with Next 15.5.x. Payload 3 supports Next 15, so the working hypothesis is **(b) same-app, no framework upgrade needed**, but the starter itself targets Next 16 and states locale-prefixed routing is incomplete — to be evidenced, not assumed. Fallback is option (a) a separate Payload service consumed over its REST/Local API.
4. Choose one option in `docs/architecture/CMS_DECISION.md` with cost, rollback and the DB decision (MongoDB per starter vs Postgres — explicit, not silent), then build the PoC on a dedicated Vercel *preview/staging* project with Vercel Deployment Protection, never touching the current production project.
5. PoC scope exactly as the plan: Pages, Rooms, Media, Users, bs/en, drafts + preview, one room + one page, static content kept as fallback, role tests.

Decisions needed from you before Phase 1: confirm branch naming, whether I may create a *separate* Vercel staging project and a dev database (MongoDB Atlas free tier vs Neon/Postgres), and whether to open the Phase 0 PR now.
