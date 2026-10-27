# Installation

## A. Local / staging with the bundled script (SQLite)
`./scripts/setup.sh [port]` downloads official releases (WordPress, Elementor Free, Polylang Free, SQLite Database Integration, WP-CLI),
installs a site in `wordpress/site`, symlinks the theme and plugin, activates everything and runs `scripts/seed.php`.
Env: `WP_URL` (default `http://localhost:$PORT`), `WP_ADMIN_PASS`, `HC_DEV_MAIL=0` to send real mail.
Re-running `scripts/seed.php` (`wp eval-file scripts/seed.php`) is idempotent: it refreshes pages from `content/*.json`
(**it overwrites Elementor edits to the seeded pages** — run it only for fresh installs/rebuilds).

## B. Hosting with MySQL/MariaDB (staging or production-like)
1. Create a WordPress 6.x site (PHP ≥ 7.4, 8.1+ recommended) and database as usual.
2. Install and activate **Elementor** and **Polylang** (wp-admin → Plugins, or `wp plugin install elementor polylang --activate`).
3. Upload `wp-content/hotel-central-theme.zip` and `hotel-central-core-plugin.zip` (Appearance → Themes, Plugins → Add new → Upload); activate both.
4. Copy `media/images` next to `scripts/` (as in the package) and run: `wp eval-file scripts/seed.php` (creates languages EN/BS, rooms, 16 Elementor pages, menus, front page, Polylang UI strings, imports the photographs).
5. Settings → Permalinks → Save once. Hotel Information (admin menu) holds phone/e-mail/address/booking URLs.
6. Mail: configure SMTP (e.g. WP Mail SMTP) — the contact form reports success only if `wp_mail()` succeeds.

## Requirements
PHP extensions: gd, mbstring, xml, curl, zip, intl (+ mysqli *or* pdo_sqlite). Outbound HTTPS for Google Maps embed and the eZee booking engine.
