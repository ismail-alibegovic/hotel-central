# Hotel Central — WordPress edition

The Hotel Central Sarajevo website rebuilt as **WordPress + Elementor Free + Polylang Free** with a lightweight custom theme.
The Next.js app in the repository root is untouched and remains the visual/content source of truth.

| Piece | Where |
| --- | --- |
| Theme (design system, header, full-screen menu, footer, animations) | `theme/hotel-central/` |
| Core plugin (rooms & offers post types, Hotel Information, booking bar, rooms carousel, contact form, SEO, redirects) | `plugin/hotel-central-core/` |
| Content export from the Next.js source (`src/content`) | `content/*.json` (`scripts/dump-content.ts`) |
| Installer + seeder (creates the real Elementor pages in EN and BS) | `scripts/setup.sh`, `scripts/seed.php`, `scripts/lib/` |
| Tests + evidence | `tests/` |
| Docs | `docs/` (INSTALL, ARCHITECTURE, EDITING, LAUNCH, VERIFICATION), `PROGRESS.md` |

## Quick start (local, no MySQL needed)
```bash
cd wordpress && ./scripts/setup.sh 8080          # downloads WP 6.9, Elementor 4.3.5, Polylang 3.9.1; installs; seeds
php -S 0.0.0.0:8080 -t site scripts/router.php   # http://localhost:8080  (admin / admin-change-me — change it)
node tests/functional.js && node tests/shots.js tests/shots   # needs Playwright
```
See `docs/INSTALL.md` for MySQL hosting and `docs/VERIFICATION.md` for what was and was not tested.
