#!/usr/bin/env bash
# Full editorial journey on a development copy: reset the content to the seeded state, run steps 1-13 in the browser,
# install a new theme + plugin release over the edited site, then run step 14. Usage: tests/journey-all.sh <site-dir> <base-url>
set -uo pipefail
SITE="${1:?site dir}"; BASE="${2:-http://localhost:8090}"; HERE="$(cd "$(dirname "$0")/.." && pwd)"
WP="php -d memory_limit=512M $HERE/.cache/wp-cli.phar --path=$SITE --allow-root"
for t in page hc_room; do for id in $($WP post list --post_type=$t --post_status=any --fields=ID,post_title --format=csv | grep -iE "weekend|garden|vrtni" | cut -d, -f1); do $WP post delete "$id" --force >/dev/null; done; done
$WP option delete hc_hotel >/dev/null 2>&1
$WP eval 'foreach(wp_get_nav_menus() as $m){foreach(wp_get_nav_menu_items($m->term_id) as $i){ if(stripos($i->title,"weekend")!==false) wp_delete_post($i->ID,true);} }'
HC_SEED_RESET=1 $WP eval-file "$HERE/scripts/seed.php" | tail -1
rm -f /tmp/hc-journey-state.json
cd "$HERE"; node tests/editor-journey.js "$BASE" --only=1,2,3,4,5,6,8,9,10,11,12,13 | grep -v '^$' | tee tests/evidence/editor-journey/RESULT.txt
tests/update-persistence.sh "$SITE" | tee tests/evidence/editor-journey/RESULT-update.txt
node tests/editor-journey.js "$BASE" --only=14 | grep -v '^$' | tee -a tests/evidence/editor-journey/RESULT.txt
