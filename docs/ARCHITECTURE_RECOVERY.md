# Architecture recovery — WordPress edition vs. Next.js/Payload (2026-11-13)

Based only on the repository's branches, commits and files (`git fetch` of all 46 remote branches). Nothing was deleted, rewritten or deployed.

## 1. Where the WordPress implementation is

| | |
| --- | --- |
| Branch | `claude/elegant-cerf-vj7kdw` (9 commits, 27–28 Oct 2026, never merged into `main`) |
| Folder | `wordpress/` — 226 files, nothing outside that folder |
| Theme | `wordpress/theme/hotel-central/` (header, full-screen menu, footer, `assets/css/hc.css`, `assets/js/hc.js`) |
| Plugin | `wordpress/plugin/hotel-central-core/` (rooms/offers/enquiries post types, Hotel Information, booking bar, contact form, SEO box, redirects, editor hardening) |
| Installer/seeder | `wordpress/scripts/setup.sh`, `seed.php`, `lib/pages.php` (Elementor page builders), `lib/templates.php` (33-template library), `lib/kit.php` (design system) |
| Docs | `wordpress/README.md`, `PROGRESS.md`, `docs/` (ARCHITECTURE, EDITING, ELEMENTOR-SYSTEM, CLIENT_ACCEPTANCE, UPUTSTVO, TRAINING, INSTALL, LAUNCH, VERIFICATION, FIDELITY) |
| Stack | WordPress 6.9/7.1, Elementor 4.3.5 Free, Polylang 3.9.1 Free, MariaDB 10.11, PHP 8.3 |

It was not on `main` and not in the clone this session started with, which is why the earlier report only described Next.js + Payload.

## 2. How the implementations relate

They are **sequential, not parallel or connected**:

1. **22–26 Oct — Next.js 16 + Payload** (`main`, PRs #1–#31). The site was built in Next.js; `docs/architecture/CMS_DECISION.md` approved Payload on 23 Oct and 15 CMS requirements were implemented against it.
2. **27–28 Oct — WordPress edition** (`claude/elegant-cerf-vj7kdw`, branched from `main` @ `9e652c8`). A port of the same site to WordPress + Elementor. Its README: *"The Next.js app … remains the visual/content source of truth."* `wordpress/scripts/dump-content.ts` exports `src/content/*.ts` to JSON; `seed.php` builds real Elementor pages (EN+BS) from it. The same 15 requirements were re-verified on WordPress: **14 PASS, 1 PARTIAL** (real SMTP), 65/65 acceptance checks, ≤1.2 % visual difference vs. Next.js.
3. **4 Nov and 13 Nov — Round 1 client changes**, built again on `main` (Next.js/Payload), not on the WordPress branch:
   - `claude/tender-sagan-b4iz47` (13 Nov, 2 commits) — the latest, complete version: sitemap, redirects, Fitness Club, Day Spa, Café, `/conference`, homepage, logos, Drive photography, EN/BS, `docs/ROUND1_REQUIREMENTS_MATRIX.md`.
   - `claude/optimistic-clarke-hqqyso` (4 Nov, includes `…client-feedback-764i2a`) — an earlier attempt with a Payload database migration. Superseded; left untouched.

No code connects WordPress and Payload at runtime. The only link is the one-way content export (Next.js source → JSON → WordPress seeder).

**Why Next.js/Payload exists:** it was the first build and the approved CMS until the WordPress port. The WordPress edition reused the Next.js design and content instead of redesigning, so the Next.js app worked as the design reference.

## 3. Is the WordPress version suitable for finishing the site?

Yes. Its editing workflows (Elementor visual editing and preview, EN/BS via Polylang, rooms, offers, Hotel Information, menus, SEO, roles) are built and tested. What it lacks is the Round 1 content and structure, which was added to Next.js after the port.

## 4. What was done in this session (non-destructive)

- Branch `claude/adoring-pasteur-dhsf07` = `tender-sagan` (Round 1) + merge of `elegant-cerf` (WordPress). The two branches change **disjoint paths** (`wordpress/` vs `src/`, `public/`, `docs/`), so the merge is clean and changes neither. Both source branches remain as they were.
- `dump-content.ts` was run against the Round 1 source as a dry run and succeeds. The output was **not committed** (see risk R1).

## 5. Reusable Round 1 work → WordPress

| Round 1 item | Reaches WordPress via | Work needed in `wordpress/` |
| --- | --- | --- |
| EN/BS copy for home, about, rooms, conference, location, contact | `dump-content.ts` (dictionary/pages/layouts) | Re-export once seeder is updated |
| New sitemap (`/about/cafe`, `/dayspa`, `/conference`, `/centralfitnessclub/*`) | `src/lib/pagePaths.ts` (exported via layouts.pagePaths) | `seed.php` `$pageDefs` slugs + parent pages; menu by key with sub-items |
| Redirects `/spa`, `/restaurant`, `/meetings-events` | `legacyRedirects` | Update targets in `plugin/.../data/redirects.json`; on installed sites use the existing "remembered old slugs" 301 |
| Central Fitness Club (3 pages), Central Day Spa (price list, Lime Booking) | `src/content/club.ts`, `dayspa.ts` — **not exported** | Extend `dump-content.ts`; new Elementor builders; per-brand header/footer (body class) and colours/fonts in `hc.css`; prices as editable Elementor content (existing *Price list* template) |
| Central Café, opening hours | pages + Hotel Information | WordPress already has Hotel Information → Opening hours (`[hc_hours]`) |
| Homepage (logo, daylight hero, Club & Spa band with 2 logos, gold Book now, Meetings before Location) | dictionary + CSS in `globals.css` | Update `hc_build_home()` order/blocks and port CSS to `hc.css` |
| Contact without a form | layouts | Remove `[hc_contact_form]` from `hc_b_contact` |
| Photography and logos (26 files in `public/images/{club,dayspa,hotel}`, `public/brand`) | files | Seeder looks up `public/images/<basename>` only; make lookup recursive (no name collisions found) |

## 6. Risks found

- **R1 — menu mismatch.** `seed.php` assigns nav labels **by index** to a hard-coded page order (`spa`, `restaurant`, `meetings-events`). The Round 1 dictionary would put "Central Fitness Club" on the old Club & Spa page and "Central Day Spa" on Restaurant. Update the seeder before committing a new export.
- **R2 — installed sites.** The seeder never overwrites edited pages (by design). Renaming slugs on an existing install needs an explicit, reviewed step, not `HC_SEED_RESET=1`.
- **R3 — lockfile.** `package-lock.json` is out of sync with `package.json` on `main` (`npm ci` fails: missing `yaml@2.9.1`). Pre-existing; CI should be checked.

## 7. Recommendation

| Option | Rework | Risk | Staff editing |
| --- | --- | --- | --- |
| **A. Port Round 1 into the existing WordPress edition** (recommended) | Seeder, 4–5 new page builders, CSS, export script | Low: additive, tested pipeline, safe seeding | Elementor visual editing, already accepted |
| B. Headless WordPress feeding Next.js | New data layer; Elementor editing lost | High | Form-based only |
| C. Keep Next.js + Payload | None now | Contradicts the WordPress requirement | Form-based Payload admin |

**Choose A.** Keep the Next.js app as the design reference and content source for the export until the port is complete, and do not develop Payload further. Do not delete either implementation.

### Order of work
1. Seeder: page definitions/slugs/parents for the new sitemap; menu built by key with sub-items (fixes R1); recursive image lookup.
2. `dump-content.ts`: export `club.ts`, `dayspa.ts`, `legacyRedirects`; re-export; update `redirects.json`.
3. Builders + CSS: homepage changes, Café, Conference band, Contact without a form.
4. Fitness Club and Day Spa: per-brand chrome, membership/timetable with pending states, editable price list.
5. Re-run only the affected WordPress suites (functional, acceptance, fidelity for changed pages) and update `CLIENT_ACCEPTANCE.md` (requirement 3 now has separate Fitness Club and Day Spa pages).

### Still needed from the hotel (from the Round 1 matrix)
Café hours, membership prices, monthly timetable, conference packages, Instagram links, privacy/legal pages, room review, brand hex confirmation, approval of Bosnian spa treatment names.
