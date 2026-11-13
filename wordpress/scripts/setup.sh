#!/usr/bin/env bash
# Reproducible local/staging install of the Hotel Central WordPress site.
# Usage: ./scripts/setup.sh [port]     (default 8080)
#   SQLite (default, nothing else needed)  — or MySQL/MariaDB: WP_DB_NAME=… WP_DB_USER=… WP_DB_PASS=… [WP_DB_HOST=127.0.0.1] ./scripts/setup.sh
#   WP_ENV=local|development|staging (default local) is written to wp-config; HC_SEED_RESET=1 is the explicit dev-only reset (docs/INSTALL.md).
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT=$PWD; SITE=$ROOT/site; PORT=${1:-8080}; URL=${WP_URL:-http://localhost:$PORT}
CACHE=$ROOT/.cache; mkdir -p "$CACHE"
dl() { [ -f "$CACHE/$2" ] || curl -fsSL -o "$CACHE/$2" "$1"; }
dl https://wordpress.org/wordpress-6.9.4.zip wp.zip 2>/dev/null || dl https://wordpress.org/latest.zip wp.zip
for p in elementor polylang sqlite-database-integration; do dl https://downloads.wordpress.org/plugin/$p.latest-stable.zip $p.zip; done
dl https://github.com/wp-cli/wp-cli/releases/download/v2.12.0/wp-cli-2.12.0.phar wp-cli.phar
WP="php -d memory_limit=512M $CACHE/wp-cli.phar --path=$SITE --allow-root"
if [ ! -f "$SITE/wp-load.php" ]; then
  rm -rf "$SITE"; unzip -q "$CACHE/wp.zip" -d "$CACHE/x" && mv "$CACHE/x/wordpress" "$SITE" && rmdir "$CACHE/x"
  for p in elementor polylang; do unzip -q "$CACHE/$p.zip" -d "$SITE/wp-content/plugins"; done
  if [ -n "${WP_DB_NAME:-}" ]; then
    $WP config create --dbname="$WP_DB_NAME" --dbuser="${WP_DB_USER:-root}" --dbpass="${WP_DB_PASS:-}" --dbhost="${WP_DB_HOST:-127.0.0.1}" --skip-check
    DBMODE=mysql
  else
    unzip -q "$CACHE/sqlite-database-integration.zip" -d "$SITE/wp-content/plugins"
    cp "$SITE/wp-content/plugins/sqlite-database-integration/db.copy" "$SITE/wp-content/db.php"
    sed -i "s#{SQLITE_IMPLEMENTATION_FOLDER_PATH}#$SITE/wp-content/plugins/sqlite-database-integration#; s#{SQLITE_PLUGIN}#sqlite-database-integration/load.php#" "$SITE/wp-content/db.php"
    cp "$SITE/wp-config-sample.php" "$SITE/wp-config.php"
    sed -i "s/database_name_here/hotel/; s/username_here/x/; s/password_here/x/" "$SITE/wp-config.php"
    mkdir -p "$SITE/wp-content/database"; touch "$SITE/wp-content/database/.ht.sqlite"
  fi
  $WP core install --url="$URL" --title="Hotel Central Sarajevo" --admin_user=admin --admin_password="${WP_ADMIN_PASS:-admin-change-me}" --admin_email=info@hotelcentral.ba --skip-email
  $WP config set WP_ENVIRONMENT_TYPE "${WP_ENV:-local}" --type=constant --quiet
fi
# Theme + custom plugin are symlinked so edits in the repo are live.
ln -sfn "$ROOT/theme/hotel-central" "$SITE/wp-content/themes/hotel-central"
ln -sfn "$ROOT/plugin/hotel-central-core" "$SITE/wp-content/plugins/hotel-central-core"
# Local/staging: log outgoing mail to a file instead of sending (remove for production; see docs/INSTALL.md)
[ "${HC_DEV_MAIL:-1}" = 1 ] && $WP config set HC_MAIL_LOG "$SITE/wp-content/mail.log" --type=constant --quiet || true
$WP plugin activate elementor polylang hotel-central-core
$WP theme activate hotel-central
$WP eval-file "$ROOT/scripts/seed.php"
echo "Ready. Serve with: php -S 0.0.0.0:$PORT -t $SITE $ROOT/scripts/router.php   (admin / WP_ADMIN_PASS)"
