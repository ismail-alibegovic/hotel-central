# Installation

## A. Local / staging with the bundled script (SQLite)
`./scripts/setup.sh [port]` downloads official releases (WordPress, Elementor Free, Polylang Free, SQLite Database Integration, WP-CLI),
installs a site in `wordpress/site`, symlinks the theme and plugin, activates everything and runs `scripts/seed.php`.
Env: `WP_URL` (default `http://localhost:$PORT`), `WP_ADMIN_PASS`, `HC_DEV_MAIL=0` to send real mail.
## Seeding is safe by default
`wp eval-file scripts/seed.php` creates what is missing and never overwrites edits: an Elementor page is refreshed only if it is unchanged since it was seeded (hash check); edited pages, existing rooms, menus, settings and translations are left alone and listed in a `NOTE — left untouched` line. The explicit **development-only reset** is `HC_SEED_RESET=1 wp eval-file scripts/seed.php` — it overwrites every seeded page/room/menu/setting and is refused when `WP_ENVIRONMENT_TYPE` is `production` (setup.sh writes `local`, or `WP_ENV`).

## B. MySQL / MariaDB (verified with MariaDB 10.11)
`WP_DB_NAME=hotel WP_DB_USER=hc WP_DB_PASS=secret WP_DB_HOST=127.0.0.1 WP_URL=https://staging.example WP_ENV=staging ./scripts/setup.sh` does everything below (empty database required). Manual route:
1. Create a WordPress 6.x site (PHP ≥ 7.4, 8.1+ recommended) and database as usual.
2. Install and activate **Elementor** and **Polylang** (wp-admin → Plugins, or `wp plugin install elementor polylang --activate`).
3. Upload `wp-content/hotel-central-theme.zip` and `hotel-central-core-plugin.zip` (Appearance → Themes, Plugins → Add new → Upload); activate both.
4. Copy `media/images` next to `scripts/` (as in the package) and run: `wp eval-file scripts/seed.php` (creates languages EN/BS, rooms, 16 Elementor pages, menus, front page, Polylang UI strings, imports the photographs).
5. Settings → Permalinks → Save once. Hotel Information (admin menu) holds phone/e-mail/address/booking URLs.
6. Mail: configure SMTP (e.g. WP Mail SMTP) — the contact form reports success only if `wp_mail()` succeeds.

## Requirements
PHP extensions: gd, mbstring, xml, curl, zip, intl (+ mysqli *or* pdo_sqlite). Outbound HTTPS for Google Maps embed and the eZee booking engine.
