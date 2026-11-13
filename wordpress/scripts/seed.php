<?php
/**
 * Idempotent content seed (run with: wp eval-file scripts/seed.php).
 * Languages · media · rooms · Elementor pages (EN + BS) · menus · front page · settings.
 * Content comes from wordpress/content/*.json, which scripts/dump-content.ts exports from the Next.js source of truth.
 */
if (!defined('ABSPATH')) exit;
require_once __DIR__ . '/lib/pages.php';
require_once __DIR__ . '/lib/kit.php';
require_once __DIR__ . '/lib/templates.php';
require_once __DIR__ . '/lib/brands.php';
@set_time_limit(0); ini_set('memory_limit', '1024M');
global $wpdb, $RESET, $FIRST;
wp_set_current_user(1);
$ROOT = dirname(__DIR__);
$IMG_DIR = realpath($ROOT . '/../public/images');
// Photographs live in public/images and its sub-folders (club/, dayspa/, hotel/ since Round 1); logos in the theme's assets/brand.
$IMG_INDEX = [];
foreach ([$IMG_DIR, $ROOT . '/theme/hotel-central/assets/brand'] as $dir) if ($dir && is_dir($dir))
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS)) as $f)
        if (preg_match('/\.(jpe?g|png|webp|svg)$/i', $f->getFilename()) && !isset($IMG_INDEX[$f->getFilename()])) $IMG_INDEX[$f->getFilename()] = $f->getPathname();
$say = function ($m) { fwrite(STDERR, "[seed] $m\n"); };

/* ── Safety: the seeder never silently overwrites content.
   • first run  → creates everything and records `hc_seeded`
   • re-run     → creates what is missing; refreshes an Elementor page only if nobody edited it since it was seeded;
                  skips edited pages/rooms/menus/settings and says so
   • HC_SEED_RESET=1 (development/staging only, refused on production) → deliberately overwrites everything seeded. ── */
$RESET = getenv('HC_SEED_RESET') === '1';
$FIRST = !get_option('hc_seeded');
if ($RESET && wp_get_environment_type() === 'production') { fwrite(STDERR, "[seed] REFUSED: HC_SEED_RESET=1 on a production environment (set WP_ENVIRONMENT_TYPE=local|development|staging for a dev reset).\n"); exit(1); }
if ($RESET) $say('RESET requested: seeded content, menus and settings will be overwritten (all Elementor edits lost).');
$GLOBALS['hc_skipped'] = [];

/* ───────── 1. Polylang: English (default) + Bosnian, /en/ and /bs/ prefixes ───────── */
$opts = get_option('polylang', []);
if (empty($opts['default_lang']) || !function_exists('PLL')) { /* first run: Polylang creates its options on activation */ }
$model = PLL()->model;
if (!class_exists('PLL_Admin_Model')) require_once WP_PLUGIN_DIR . '/polylang/admin/admin-model.php';
$amodel = new PLL_Admin_Model(PLL()->options);
$have = wp_list_pluck($model->get_languages_list(), 'slug');
foreach ([['English', 'en', 'en_US', 'gb'], ['Bosanski', 'bs', 'bs_BA', 'ba']] as $i => [$name, $slug, $loc, $flag]) {
    if (in_array($slug, $have, true)) continue;
    $r = $amodel->add_language(['name' => $name, 'slug' => $slug, 'locale' => $loc, 'rtl' => 0, 'term_group' => $i, 'flag' => $flag]);
    $say("language $slug: " . (is_wp_error($r) ? $r->get_error_message() : 'added'));
}
if ($FIRST || $RESET) $r = PLL()->options->merge(['default_lang' => 'en', 'force_lang' => 1, 'hide_default' => false, 'rewrite' => true, 'browser' => true, 'redirect_lang' => true, 'media_support' => false,
    'post_types' => array_values(array_unique(array_merge((array) PLL()->options->get('post_types'), ['hc_room', 'hc_offer'])))]);
if (($FIRST || $RESET) && is_wp_error($r) && $r->get_error_message()) $say('polylang options: ' . $r->get_error_message());
PLL()->options->save();
PLL()->model->clean_languages_cache();

/* ───────── 2. Site settings ───────── */
if ($FIRST || $RESET) {
update_option('blogname', 'Hotel Central Sarajevo');
update_option('blogdescription', 'Four-star boutique hotel in the heart of Sarajevo');
update_option('timezone_string', 'Europe/Sarajevo');
update_option('date_format', 'j. n. Y.');
update_option('permalink_structure', '/%postname%/');
update_option('blog_public', 0); // staging: noindex. Set to 1 at launch (docs/LAUNCH.md).
update_option('show_on_front', 'page');
    foreach (['elementor_disable_color_schemes' => 'yes', 'elementor_disable_typography_schemes' => 'yes', 'elementor_google_font' => '0', 'elementor_load_fa4_shim' => '', 'elementor_unfiltered_files_upload' => '0',
          'elementor_cpt_support' => ['page', 'hc_offer'], 'elementor_optimized_gutenberg_loading' => '1', 'elementor_element_cache_ttl' => '', 'elementor_allow_tracking' => 'no', 'elementor_onboarded' => '1', 'elementor_tracker_notice' => '1'] as $k => $v) update_option($k, $v);
update_option('elementor_experiment-container', 'active');
    // Elementor 4's "atomic"/V4 editor is a second, class-based widget system. The site is built on the classic container + widgets (which the design
    // system and the template library target), so the panel offers only those — one clear set of widgets for the hotel staff.
    foreach (['e_atomic_elements', 'e_opt_in_v4'] as $x) update_option('elementor_experiment-' . $x, 'inactive');
    $say('design system (Elementor Kit) → kit #' . hc_apply_kit());
} else $say('settings left untouched (already seeded)');

/* ───────── 3. Content + media helpers ───────── */
$D = json_decode(file_get_contents($ROOT . '/content/dictionary.json'), true);
$LAY = json_decode(file_get_contents($ROOT . '/content/layouts.json'), true);
$PG = json_decode(file_get_contents($ROOT . '/content/pages.json'), true);
$ROOMS = json_decode(file_get_contents($ROOT . '/content/rooms.json'), true);
$CLUB = json_decode(file_get_contents($ROOT . '/content/club.json'), true);
$SPA = json_decode(file_get_contents($ROOT . '/content/dayspa.json'), true);
require_once ABSPATH . 'wp-admin/includes/image.php'; require_once ABSPATH . 'wp-admin/includes/file.php'; require_once ABSPATH . 'wp-admin/includes/media.php';

$importImage = function ($file, $alt = '') use ($IMG_INDEX, $say) {
    static $cache = [];
    $key = $file . '|' . $alt;
    if (isset($cache[$key])) return $cache[$key];
    global $wpdb;
    $base = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_src' AND meta_value=%s LIMIT 1", $file));
    if (!$base) {
        $src = $IMG_INDEX[$file] ?? '';
        if (!is_file($src)) { $say("missing image $file"); return 0; }
        $up = wp_upload_dir(); $name = wp_unique_filename($up['path'], $file); copy($src, "$up[path]/$name");
        $base = wp_insert_attachment(['post_mime_type' => wp_check_filetype($name)['type'], 'post_title' => preg_replace('/\.[^.]+$/', '', $file), 'post_status' => 'inherit'], "$up[path]/$name");
        wp_update_attachment_metadata($base, wp_generate_attachment_metadata($base, "$up[path]/$name"));
        update_post_meta($base, '_hc_src', $file); update_post_meta($base, '_wp_attachment_image_alt', $alt);
        return $cache[$key] = $base;
    }
    if (!$alt || get_post_meta($base, '_wp_attachment_image_alt', true) === $alt) return $cache[$key] = $base;
    // same photograph, different alt text: an alias attachment sharing the file and its generated sizes
    $alias = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_alias' AND meta_value=%s LIMIT 1", $key));
    if (!$alias) {
        $p = get_post($base);
        $alias = wp_insert_attachment(['post_mime_type' => $p->post_mime_type, 'post_title' => $p->post_title, 'post_status' => 'inherit', 'guid' => $p->guid], get_attached_file($base));
        update_post_meta($alias, '_wp_attached_file', get_post_meta($base, '_wp_attached_file', true));
        update_post_meta($alias, '_wp_attachment_metadata', get_post_meta($base, '_wp_attachment_metadata', true));
        update_post_meta($alias, '_hc_alias', $key); update_post_meta($alias, '_wp_attachment_image_alt', $alt);
    }
    return $cache[$key] = $alias;
};

// earlier versions of the template library created alias attachments / library alt texts reading "Replace this photograph": remove them (rows only — the files belong to the original attachments)
$bad = $wpdb->get_col("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_alias' AND meta_value LIKE '%|Replace this photograph'");
foreach ($bad as $aid) { $wpdb->delete($wpdb->postmeta, ['post_id' => $aid]); $wpdb->delete($wpdb->posts, ['ID' => $aid]); clean_post_cache($aid); }
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE meta_key='_wp_attachment_image_alt' AND meta_value='Replace this photograph'");
if ($bad) $say('removed ' . count($bad) . ' placeholder alias attachments');

add_filter('upload_mimes', function ($m) { $m['svg'] = 'image/svg+xml'; return $m; });
add_filter('wp_check_filetype_and_ext', function ($d, $file, $name) { return substr($name, -4) === '.svg' ? ['ext' => 'svg', 'type' => 'image/svg+xml', 'proper_filename' => $name] : $d; }, 10, 3);
$GLOBALS['hc_slugs'] = [];
function hc_is_new() { return $GLOBALS['hc_last_new']; }
function hc_upsert_post($type, $slug, $lang, $args, $key) {
    global $wpdb;
    $id = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_key' AND meta_value=%s LIMIT 1", $key));
    $args = array_merge(['post_type' => $type, 'post_status' => 'publish', 'post_name' => $slug], $args);
    global $RESET;
    $GLOBALS['hc_last_new'] = true;
    if ($id && get_post($id)) {
        $GLOBALS['hc_last_new'] = false;
        if ($RESET) { $args['ID'] = $id; wp_update_post($args); }
    } else { $id = wp_insert_post($args); update_post_meta($id, '_hc_key', $key); }
    if ($GLOBALS['hc_last_new'] || $RESET) pll_set_post_language($id, $lang);
    // Polylang allows the same slug in each language; WordPress would have suffixed it before the language was known.
    $GLOBALS['hc_slugs'][$id] = $slug;
    return $id;
}

/* ───────── 4. Rooms (custom post type, both languages) ───────── */
$roomIds = ['en' => [], 'bs' => []];
foreach ($ROOMS as $i => $r) {
    $trans = [];
    foreach (['en', 'bs'] as $lang) {
        $gal = []; $pos = [];
        foreach ($r['images'] as $im) { $gal[] = $importImage(basename($im['src']), $im['alt'][$lang]); $pos[] = $im['position'] ?? '50% 50%'; }
        $id = hc_upsert_post('hc_room', $r['slug'], $lang, ['post_title' => $r['name'][$lang], 'post_excerpt' => $r['summary'][$lang], 'menu_order' => $i], "room:{$r['slug']}:$lang");
        if (hc_is_new() || $RESET) foreach ([
            'hc_room_type_id' => $r['roomTypeId'], 'hc_size_m2' => $r['sizeM2'], 'hc_size_label' => $r['sizeLabel'][$lang], 'hc_title_lines' => implode("\n", $r['titleLines'][$lang]),
            'hc_feature' => $r['feature'][$lang], 'hc_description' => implode("\n", $r['description'][$lang]), 'hc_highlights' => implode("\n", $r['highlights'][$lang]),
            'hc_amenities' => implode("\n", $r['amenities'][$lang]), 'hc_gallery' => implode(',', $gal), 'hc_gallery_pos' => implode("\n", $pos),
        ] as $k => $v) update_post_meta($id, $k, $v);
        $trans[$lang] = $id; $roomIds[$lang][$r['slug']] = $id;
    }
    pll_save_post_translations($trans);
}
$say('rooms: ' . count($ROOMS) . ' × 2 languages');

/* ───────── 5. Elementor pages — Round 1 sitemap (Nov 2026) ─────────
   Pages are identified by a stable key (post meta _hc_key), never by position. Address = slug under the parent's address. */
$navTitle = function ($lang, $href) use ($D) {
    $n = $D[$lang]['nav'];
    foreach ($n['items'] as $it) if ($it['href'] === $href) return $it['label'];
    foreach ($n['children'] as $kids) foreach ($kids as $it) if ($it['href'] === $href) return $it['label'];
    return null;
};
$T = function ($href, $fallbackEn) use ($navTitle) { return ['en' => $navTitle('en', $href) ?: $fallbackEn, 'bs' => $navTitle('bs', $href) ?: $fallbackEn]; };
$pageDefs = [ // key => [slug, titles, parent key, brand, href]
    'home' => ['home', ['en' => 'Home', 'bs' => 'Početna'], null, '', '/'],
    'about' => ['about', $T('/about', 'About'), null, '', '/about'],
    'cafe' => ['cafe', $T('/about/cafe', 'Central Café'), 'about', '', '/about/cafe'],
    'rooms' => ['rooms', $T('/rooms', 'Rooms & Suites'), null, '', '/rooms'],
    'club' => ['centralfitnessclub', $T('/centralfitnessclub', 'Central Fitness Club'), null, 'club', '/centralfitnessclub'],
    'club-membership' => ['membership', $T('/centralfitnessclub/membership', 'Membership'), 'club', 'club', '/centralfitnessclub/membership'],
    'club-timetable' => ['timetable', $T('/centralfitnessclub/timetable', 'Class timetable'), 'club', 'club', '/centralfitnessclub/timetable'],
    'dayspa' => ['dayspa', $T('/dayspa', 'Central Day Spa'), null, 'spa', '/dayspa'],
    'conference' => ['conference', $T('/conference', 'Meetings & Events'), null, '', '/conference'],
    'location' => ['location', $T('/location', 'Location'), null, '', '/location'],
    'contact' => ['contact', $T('/contact', 'Contact'), null, '', '/contact'],
];
$layoutKey = ['cafe' => 'restaurant', 'conference' => 'meetings-events'];
$findKey = function ($k) use ($wpdb) { return (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_key' AND meta_value=%s LIMIT 1", $k)); };

// Existing installs (seeded before Round 1): keep the old pages and every edit on them, only give them their new key and address.
foreach (['restaurant' => 'cafe', 'meetings-events' => 'conference'] as $old => $new) foreach (['en', 'bs'] as $lang) {
    $id = $findKey("page:$old:$lang");
    if (!$id || $findKey("page:$new:$lang")) continue;
    update_post_meta($id, '_hc_key', "page:$new:$lang"); update_post_meta($id, '_hc_old_key', $old);
    $say("page $old/$lang (#$id) → now '$new' (content kept; the old address redirects)");
}
// The combined "Club & Spa" page is replaced by Central Fitness Club and Central Day Spa (CH-009): set to Draft, never deleted.
foreach (['en', 'bs'] as $lang) {
    $id = $findKey("page:spa:$lang");
    if ($id && get_post_status($id) === 'publish') { wp_update_post(['ID' => $id, 'post_status' => 'draft']); update_post_meta($id, '_hc_retired', 'round1'); $say("page spa/$lang (#$id) → Draft (replaced by Fitness Club + Day Spa; restore from Pages → Drafts if ever needed)"); }
}

$pageIds = [];
foreach ($pageDefs as $key => [$slug, $titles, $parentKey, $brand]) {
    $trans = [];
    foreach (['en', 'bs'] as $lang) {
        $ctx = new HC_Ctx($lang, $D[$lang], $ROOMS, $importImage);
        $ctx->rooms = $ROOMS; $ogFile = '3075.jpg';
        switch ($key) {
            case 'home': $elements = hc_build_home($ctx); $meta = $D[$lang]['meta']; break;
            case 'club': $elements = hc_build_club($ctx, $CLUB); $meta = $CLUB[$lang]['meta']; $ogFile = 'cardio-treadmill.jpg'; break;
            case 'club-membership': $elements = hc_build_club_membership($ctx, $CLUB); $meta = $CLUB[$lang]['membership']['meta']; $ogFile = 'kettlebells-window.jpg'; break;
            case 'club-timetable': $elements = hc_build_club_timetable($ctx, $CLUB); $meta = $CLUB[$lang]['timetableCopy']['meta']; $ogFile = 'studio-window.jpg'; break;
            case 'dayspa': $elements = hc_build_dayspa($ctx, $SPA); $meta = $SPA[$lang]['meta']; $ogFile = 'treatment-room.jpg'; break;
            default:
                $lay = $LAY[$lang][$layoutKey[$key] ?? $key]; $elements = hc_build_blocks($lay['blocks'], $ctx); $meta = $lay['meta']; $ogFile = basename($lay['ogImage'] ?? '3075.jpg');
                if ($key === 'cafe') { // opening hours straight after the hero (CH-007)
                    $h = $PG[$lang]['restaurant']['hours'];
                    array_splice($elements, 1, 0, [hc_b_hours($h, 'cafe,breakfast', $ctx, [
                        ['restaurant-arches.jpg', hc_alt($ctx, "The café's dining room with tall arched windows onto the street", 'Sala sa lučnim prozorima prema ulici'), '50% 60%'],
                        ['cafe-corner.jpg', hc_alt($ctx, 'A corner table by the window looking onto Ćumurija street', 'Sto uz prozor sa pogledom na Ćumuriju'), '50% 70%'],
                    ], 'ivory', 'hours', $h['note'] ?? '')]);
                }
        }
        $title = $titles[$lang];
        $parentId = $parentKey ? ($pageIds[$parentKey][$lang] ?? 0) : 0;
        $id = hc_upsert_post('page', $slug, $lang, ['post_title' => $title, 'post_excerpt' => $meta['description'], 'post_content' => '', 'post_parent' => $parentId], "page:$key:$lang");
        $new = hc_is_new();
        // structure (address, parent, brand, published) follows the approved sitemap; content is only touched when unedited
        if (!$new && (int) get_post_field('post_parent', $id) !== $parentId) wp_update_post(['ID' => $id, 'post_parent' => $parentId]);
        if (!$new && get_post_status($id) !== 'publish' && !get_post_meta($id, '_hc_retired', true)) { /* an editor unpublished it: respect that */ }
        if ($brand) update_post_meta($id, '_hc_brand', $brand); else delete_post_meta($id, '_hc_brand');
        $stored = (string) get_post_meta($id, '_elementor_data', true);
        $pristine = $new || ($stored !== '' && md5($stored) === get_post_meta($id, '_hc_seed_hash', true));
        if ($RESET || $pristine) {
            if ($new || $RESET || get_post_meta($id, '_hc_old_key', true)) {
                update_post_meta($id, '_hc_seo_title', $key === 'home' ? $meta['title'] : $meta['title'] . ' — Hotel Central Sarajevo');
                update_post_meta($id, '_hc_seo_desc', $meta['description']);
                update_post_meta($id, '_hc_seo_image', $importImage($ogFile, ''));
                if (!$new) wp_update_post(['ID' => $id, 'post_title' => $title, 'post_excerpt' => $meta['description']]);
            }
            update_post_meta($id, '_elementor_edit_mode', 'builder'); update_post_meta($id, '_elementor_template_type', 'wp-page'); update_post_meta($id, '_wp_page_template', 'default');
            $doc = \Elementor\Plugin::$instance->documents->get($id, false);
            $doc->save(['elements' => $elements, 'settings' => ['post_status' => 'publish', 'template' => 'default']]);
            update_post_meta($id, '_hc_seed_hash', md5((string) get_post_meta($id, '_elementor_data', true)));
            $say("page $key/$lang → $id " . ($new ? 'created' : ($RESET ? 'RESET' : 'refreshed (unedited)')) . ' (' . count($elements) . ' sections)');
        } else { $GLOBALS['hc_skipped'][] = "page $key/$lang (#$id) was edited in Elementor"; $say("page $key/$lang → $id SKIPPED (edited in Elementor; address/parent updated, content kept; HC_SEED_RESET=1 overwrites)"); }
        $trans[$lang] = $id; $pageIds[$key][$lang] = $id;
    }
    pll_save_post_translations($trans);
}
if ($FIRST || $RESET) { update_option('page_on_front', $pageIds['home']['en']); update_option('page_for_posts', 0); }
update_option('hc_positions', array_merge((array) get_option('hc_positions', []), HC_El::$positions));

/* ───────── 5b. Template library (Elementor → Saved Templates) ───────── */
hc_seed_templates(new HC_Ctx('en', $D['en'], $ROOMS, $importImage), $RESET, $say);

/* ───────── 6. Menus — built by page key (never by position), with sub-pages; one per language ─────────
   Main menu: the approved sitemap. Fitness Club / Day Spa menus: the sub-navigation shown in those sections.
   A menu an editor has changed is left alone (reported); a menu still exactly as seeded is updated. */
$theme = get_option('stylesheet'); $nav = (array) PLL()->options->get('nav_menus');
$hrefKey = []; foreach ($pageDefs as $k => $def) $hrefKey[$def[4]] = $k;
$menuSig = function ($mid) { $o = []; foreach ((array) wp_get_nav_menu_items($mid) as $it) $o[] = $it->object_id . '|' . $it->menu_item_parent . '|' . $it->title . '|' . $it->url; return md5(implode("\n", $o)); };
$oldOrder = ['home', 'about', 'rooms', 'spa', 'cafe', 'conference', 'location', 'contact']; // what the pre-Round-1 seeder created
$isOldSeeded = function ($mid, $lang) use ($pageIds, $oldOrder, $findKey) {
    $ids = array_map(function ($it) { return (int) $it->object_id; }, (array) wp_get_nav_menu_items($mid));
    $want = array_map(function ($k) use ($pageIds, $lang, $findKey) { return $k === 'spa' ? $findKey("page:spa:$lang") : (int) ($pageIds[$k][$lang] ?? 0); }, $oldOrder);
    return $ids === $want;
};
$build = function ($name, $loc, $lang, $items) use (&$nav, $theme, $menuSig, $isOldSeeded, $RESET, $say) {
    $menu = wp_get_nav_menu_object($name);
    if ($menu && !$RESET) {
        $seeded = get_term_meta($menu->term_id, '_hc_seed_sig', true);
        $untouched = $seeded ? $seeded === $menuSig($menu->term_id) : ($loc === 'primary' && $isOldSeeded($menu->term_id, $lang));
        if (!$untouched) { $nav[$theme][$loc][$lang] = $nav[$theme][$loc][$lang] ?? $menu->term_id; $GLOBALS['hc_skipped'][] = "menu '$name' (edited — add the new pages under Appearance → Menus)"; $say("menu $name SKIPPED (edited by an editor)"); return; }
    }
    $mid = $menu ? $menu->term_id : wp_create_nav_menu($name);
    foreach ((array) wp_get_nav_menu_items($mid) as $it) wp_delete_post($it->ID, true);
    $pos = 0;
    $add = function ($it, $parent) use ($mid, &$pos) {
        $args = ['menu-item-title' => $it['label'], 'menu-item-status' => 'publish', 'menu-item-position' => ++$pos, 'menu-item-parent-id' => $parent];
        if (!empty($it['page'])) $args += ['menu-item-object' => 'page', 'menu-item-object-id' => $it['page'], 'menu-item-type' => 'post_type'];
        else $args += ['menu-item-type' => 'custom', 'menu-item-url' => $it['url']];
        return wp_update_nav_menu_item($mid, 0, $args);
    };
    foreach ($items as $it) { $pid = $add($it, 0); foreach ($it['children'] ?? [] as $ch) $add($ch, $pid); }
    update_term_meta($mid, '_hc_seed_sig', $menuSig($mid));
    $nav[$theme][$loc][$lang] = $mid; $say("menu $name → " . count($items) . ' items');
};
foreach (['en', 'bs'] as $lang) {
    $n = $D[$lang]['nav']; $main = [];
    foreach ($n['items'] as $it) {
        $k = $hrefKey[$it['href']] ?? null; if (!$k) continue;
        $kids = [];
        foreach ($n['children'][$it['href']] ?? [] as $ch) if (isset($hrefKey[$ch['href']])) $kids[] = ['label' => $ch['label'], 'page' => $pageIds[$hrefKey[$ch['href']]][$lang]];
        $main[] = ['label' => $it['label'], 'page' => $pageIds[$k][$lang], 'children' => $kids];
    }
    $build('Main menu ' . strtoupper($lang), 'primary', $lang, $main);
    $cn = $CLUB[$lang]['nav']; $club = get_permalink($pageIds['club'][$lang]);
    $build('Fitness Club menu ' . strtoupper($lang), 'club', $lang, [
        ['label' => $cn['club'], 'page' => $pageIds['club'][$lang]], ['label' => $cn['membership'], 'page' => $pageIds['club-membership'][$lang]],
        ['label' => $cn['timetable'], 'page' => $pageIds['club-timetable'][$lang]], ['label' => $cn['contact'], 'url' => $club . '#join'],
    ]);
    $sn = $SPA[$lang]['nav']; $spa = get_permalink($pageIds['dayspa'][$lang]);
    $build('Day Spa menu ' . strtoupper($lang), 'spa', $lang, [
        ['label' => $sn['spa'], 'url' => $spa . '#spa'], ['label' => $sn['treatments'], 'url' => $spa . '#treatments'],
        ['label' => $sn['hours'], 'url' => $spa . '#hours'], ['label' => $sn['contact'], 'url' => $spa . '#book'],
    ]);
}
PLL()->options->set('nav_menus', $nav); PLL()->options->save();
// Polylang only translates locations that also exist in the theme's own location setting: register every location there too.
$tm = (array) get_theme_mod('nav_menu_locations', []);
foreach (['primary', 'club', 'spa'] as $loc) if (empty($tm[$loc]) && !empty($nav[$theme][$loc]['en'])) $tm[$loc] = $nav[$theme][$loc]['en'];
set_theme_mod('nav_menu_locations', $tm);

/* ───────── 7. Polylang string translations (UI strings: Bosnian from the dictionary) ───────── */
$seen = []; $n = 0;
$walk = function ($en, $bs) use (&$walk, &$seen, &$n) {
    foreach ($en as $k => $v) {
        if (is_array($v)) { $walk($v, $bs[$k]); continue; }
        if (!is_string($v) || $k === 'href') continue;
        $seen[$v] = $bs[$k]; $n++;
    }
};
foreach (['nav', 'booking', 'common', 'footer', 'contact', 'notFound'] as $g) $walk($D['en'][$g], $D['bs'][$g]);
$walk($D['en']['home']['rooms'], $D['bs']['home']['rooms']); $walk($D['en']['home']['final'], $D['bs']['home']['final']);
$bsLang = PLL()->model->get_language('bs');
$mo = new PLL_MO(); $mo->import_from_db($bsLang);
foreach ($seen as $en => $bs) if ($RESET || $mo->translate($en) === $en) $mo->add_entry($mo->make_entry($en, $bs)); // never replaces a translation an editor changed
$mo->export_to_db($bsLang);
$say("UI strings translated: " . count($seen));

// Polylang allows the same slug in each language; WordPress suffixed it (-2) before the language was known, and Elementor's save re-runs that check.
foreach ($GLOBALS['hc_slugs'] as $pid => $slug) { $wpdb->update($wpdb->posts, ['post_name' => $slug], ['ID' => $pid]); clean_post_cache($pid); }
\Elementor\Plugin::$instance->files_manager->clear_cache();
PLL()->model->clean_languages_cache(); // static front page per language is cached on the language objects
flush_rewrite_rules(true);
update_option('hc_seeded', time());
if ($GLOBALS['hc_skipped']) $say('NOTE — left untouched: ' . implode('; ', $GLOBALS['hc_skipped']));
$say('done');
