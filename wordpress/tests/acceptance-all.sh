#!/usr/bin/env bash
# Client-requirements acceptance run on a development copy: clean the test data, reseed, then run every acceptance step.
# Usage: tests/acceptance-all.sh <site-dir> <base-url>
set -uo pipefail
SITE="${1:?site dir}"; BASE="${2:-http://localhost:8090}"; HERE="$(cd "$(dirname "$0")/.." && pwd)"
WP="php -d memory_limit=512M $HERE/.cache/wp-cli.phar --path=$SITE --allow-root"
for u in staff_editor second_admin; do $WP user delete "$u" --yes >/dev/null 2>&1; done
for t in page hc_room hc_offer attachment; do for id in $($WP post list --post_type=$t --post_status=any --fields=ID,post_title --format=csv | grep -iE "weekend|garden|vrtni|special offers|day spa|wellness|spa prices|cjenik|spring escape|proljetni|breakfast-table|new-photo|room-photo" | cut -d, -f1); do $WP post delete "$id" --force >/dev/null; done; done
$WP menu delete "Footer links EN" >/dev/null 2>&1; $WP option delete hc_hotel hc_footer >/dev/null 2>&1; rm -f /tmp/hc-accept-state.json
HC_SEED_RESET=1 $WP eval-file "$HERE/scripts/seed.php" | tail -1
cd "$HERE"; mkdir -p tests/evidence/acceptance
node tests/acceptance.js "$BASE" --only=A,B,C,D,E,F,G,H,I,J,K,L 2>&1 | grep -v '^$' | tee tests/evidence/acceptance/RESULT.txt
