#!/usr/bin/env bash
# Step 14 of the editorial journey: install a NEW release of the theme and the core plugin over a site that holds edited content,
# exactly like Appearance → Themes → Add New → Upload (real copies, not symlinks), and prove nothing the editors made is lost.
# Usage: tests/update-persistence.sh <site-dir>   (run it on a development copy, never on production)
set -euo pipefail
SITE="${1:?site dir}"; HERE="$(cd "$(dirname "$0")/.." && pwd)"; WP="php -d memory_limit=512M $HERE/.cache/wp-cli.phar --path=$SITE --allow-root"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
snap() { $WP eval '
global $wpdb; $o=[];
$o["pages"]=$wpdb->get_var("SELECT MD5(GROUP_CONCAT(CONCAT(p.ID,pm.meta_value) ORDER BY p.ID)) FROM $wpdb->posts p JOIN $wpdb->postmeta pm ON pm.post_id=p.ID AND pm.meta_key=\"_elementor_data\" LEFT JOIN $wpdb->postmeta sh ON sh.post_id=p.ID AND sh.meta_key=\"_hc_seed_hash\" WHERE p.post_type IN (\"page\",\"elementor_library\") AND p.post_status<>\"trash\" AND (sh.meta_value IS NULL OR sh.meta_value<>MD5(pm.meta_value))"); // content edited by people (unedited seeded copies may legitimately be refreshed)
$o["n_pages"]=(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_type=\"page\" AND post_status=\"publish\"");
$o["n_templates"]=(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_type=\"elementor_library\" AND post_status=\"publish\"");
$o["rooms"]=(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_type=\"hc_room\" AND post_status=\"publish\"");
$o["kit"]=md5(serialize(get_post_meta(get_option("elementor_active_kit"),"_elementor_page_settings",true)));
$o["hotel"]=md5(serialize(get_option("hc_hotel")));
$o["menus"]=md5(serialize(get_option("nav_menus")).serialize(wp_get_nav_menus()));
$o["translations"]=md5(serialize($wpdb->get_results("SELECT object_id,term_taxonomy_id FROM $wpdb->term_relationships WHERE term_taxonomy_id IN (SELECT term_taxonomy_id FROM $wpdb->term_taxonomy WHERE taxonomy IN (\"language\",\"post_translations\")) ORDER BY 1,2")));
$o["media"]=(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_type=\"attachment\"");
$o["theme"]=wp_get_theme("hotel-central")->get("Version"); $o["plugin"]=get_plugin_data(WP_PLUGIN_DIR."/hotel-central-core/hotel-central-core.php")["Version"];
echo json_encode($o);'; }
before=$(snap); echo "before: $before"
# build "v1.0.1" zips from the repository with a bumped version (and a harmless CSS change) so the files really differ
cp -r "$HERE/theme/hotel-central" "$T/hotel-central"; cp -r "$HERE/plugin/hotel-central-core" "$T/hotel-central-core"
REL=1.0.$(date +%s)
sed -i "s/^Version: .*/Version: $REL/" "$T/hotel-central/style.css"; sed -i "s/ \* Version: .*/ * Version: $REL/" "$T/hotel-central-core/hotel-central-core.php"
echo "/* release 1.0.1 */" >> "$T/hotel-central/assets/css/hc.css"
(cd "$T" && zip -qr theme.zip hotel-central && zip -qr plugin.zip hotel-central-core)
C="$SITE/wp-content"
# turn symlinked dev installs into real copies first (rm on a symlink only removes the link)
[ -L "$C/themes/hotel-central" ] && { cp -rL "$C/themes/hotel-central" "$T/_t" && rm "$C/themes/hotel-central" && mv "$T/_t" "$C/themes/hotel-central"; }
[ -L "$C/plugins/hotel-central-core" ] && { cp -rL "$C/plugins/hotel-central-core" "$T/_p" && rm "$C/plugins/hotel-central-core" && mv "$T/_p" "$C/plugins/hotel-central-core"; }
$WP theme install "$T/theme.zip" --force 2>&1 | tail -2
$WP plugin install "$T/plugin.zip" --force 2>&1 | tail -2
$WP plugin is-active hotel-central-core && echo "plugin still active"; $WP theme is-active hotel-central && echo "theme still active"
after=$(snap); echo "after:  $after"
python3 - "$before" "$after" <<'PY'
import json,sys
b,a=json.loads(sys.argv[1]),json.loads(sys.argv[2]); bad=0
for k in b:
    if k in('theme','plugin'): ok=a[k]!=b[k]
    else: ok=a[k]==b[k]
    print(('PASS ' if ok else 'FAIL ')+k, b[k] if k in('theme','plugin') else '', '→ '+str(a[k]) if k in('theme','plugin') else ''); bad+=not ok
sys.exit(1 if bad else 0)
PY
# the seeder must not touch edited content either (re-run without HC_SEED_RESET)
$WP eval-file "$HERE/scripts/seed.php" 2>&1 | grep -i "NOTE\|untouched" | head -3 || true
seeded=$(snap)
python3 - "$after" "$seeded" <<'PY' && echo "PASS seeder re-run left edited pages, settings, menus and rooms untouched" || { echo "FAIL seeder re-run changed edited content"; exit 1; }
import json,sys
a,b=json.loads(sys.argv[1]),json.loads(sys.argv[2]); d=[k for k in ("pages","hotel","menus","rooms","kit","n_pages","media","translations") if a[k]!=b[k]]
print("changed:",d) if d else None; sys.exit(1 if d else 0)
PY
