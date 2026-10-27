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
@set_time_limit(0); ini_set('memory_limit', '1024M');
global $wpdb, $RESET, $FIRST;
wp_set_current_user(1);
$ROOT = dirname(__DIR__);
$IMG_DIR = realpath($ROOT . '/../public/images');
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
require_once ABSPATH . 'wp-admin/includes/image.php'; require_once ABSPATH . 'wp-admin/includes/file.php'; require_once ABSPATH . 'wp-admin/includes/media.php';

$importImage = function ($file, $alt = '') use ($IMG_DIR, $say) {
    static $cache = [];
    $key = $file . '|' . $alt;
    if (isset($cache[$key])) return $cache[$key];
    global $wpdb;
    $base = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_src' AND meta_value=%s LIMIT 1", $file));
    if (!$base) {
        $src = "$IMG_DIR/$file";
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

/* ───────── 5. Elementor pages ───────── */
$pageDefs = [ // key => [slug, titles, layout key]
    'home' => ['home', ['en' => 'Home', 'bs' => 'Početna']],
    'about' => ['about', ['en' => 'About', 'bs' => 'O nama']],
    'rooms' => ['rooms', ['en' => 'Rooms & Suites', 'bs' => 'Sobe i apartmani']],
    'spa' => ['spa', ['en' => 'Club & Spa', 'bs' => 'Club & Spa']],
    'restaurant' => ['restaurant', ['en' => 'Restaurant', 'bs' => 'Restoran']],
    'meetings-events' => ['meetings-events', ['en' => 'Meetings & Events', 'bs' => 'Sastanci i događaji']],
    'location' => ['location', ['en' => 'Location', 'bs' => 'Lokacija']],
    'contact' => ['contact', ['en' => 'Contact', 'bs' => 'Kontakt']],
];
$pageIds = [];
foreach ($pageDefs as $key => [$slug, $titles]) {
    $trans = [];
    foreach (['en', 'bs'] as $lang) {
        $ctx = new HC_Ctx($lang, $D[$lang], $ROOMS, $importImage);
        $ctx->rooms = $ROOMS;
        if ($key === 'home') {
            $elements = hc_build_home($ctx); $meta = $D[$lang]['meta']; $title = $titles[$lang]; $ogFile = '3075.jpg';
        } else {
            $lay = $LAY[$lang][$key]; $elements = hc_build_blocks($lay['blocks'], $ctx); $meta = $lay['meta']; $title = $titles[$lang]; $ogFile = basename($lay['ogImage'] ?? '3075.jpg');
        }
        $id = hc_upsert_post('page', $slug === 'home' ? 'home' : $slug, $lang, ['post_title' => $title, 'post_excerpt' => $meta['description'], 'post_content' => ''], "page:$key:$lang");
        $new = hc_is_new();
        $stored = (string) get_post_meta($id, '_elementor_data', true);
        $pristine = $new || ($stored !== '' && md5($stored) === get_post_meta($id, '_hc_seed_hash', true));
        if ($RESET || $pristine) {
            if ($new || $RESET) {
                update_post_meta($id, '_hc_seo_title', $key === 'home' ? $meta['title'] : $meta['title'] . ' — Hotel Central Sarajevo');
                update_post_meta($id, '_hc_seo_desc', $meta['description']);
                update_post_meta($id, '_hc_seo_image', $importImage($ogFile, ''));
            }
            update_post_meta($id, '_elementor_edit_mode', 'builder'); update_post_meta($id, '_elementor_template_type', 'wp-page'); update_post_meta($id, '_wp_page_template', 'default');
            $doc = \Elementor\Plugin::$instance->documents->get($id, false);
            $doc->save(['elements' => $elements, 'settings' => ['post_status' => 'publish', 'template' => 'default']]);
            update_post_meta($id, '_hc_seed_hash', md5((string) get_post_meta($id, '_elementor_data', true)));
            $say("page $key/$lang → $id " . ($new ? 'created' : ($RESET ? 'RESET' : 'refreshed (unedited)')));
        } else { $GLOBALS['hc_skipped'][] = "page $key/$lang (#$id) was edited in Elementor"; $say("page $key/$lang → $id SKIPPED (edited in Elementor; HC_SEED_RESET=1 overwrites)"); }
        $trans[$lang] = $id; $pageIds[$key][$lang] = $id;
        $say("page $key/$lang → $id (" . count($elements) . ' sections)');
    }
    pll_save_post_translations($trans);
}
if ($FIRST || $RESET) { update_option('page_on_front', $pageIds['home']['en']); update_option('page_for_posts', 0); }
update_option('hc_positions', array_merge((array) get_option('hc_positions', []), HC_El::$positions));

/* ───────── 5b. Template library (Elementor → Saved Templates) ───────── */
hc_seed_templates(new HC_Ctx('en', $D['en'], $ROOMS, $importImage), $RESET, $say);

/* ───────── 6. Menus (one per language, assigned to the theme location) ───────── */
$theme = get_option('stylesheet'); $nav = (array) PLL()->options->get('nav_menus');
foreach (['en', 'bs'] as $lang) {
    $name = 'Main menu ' . strtoupper($lang);
    $menu = wp_get_nav_menu_object($name);
    if ($menu && !$RESET) { $nav[$theme]['primary'][$lang] = $nav[$theme]['primary'][$lang] ?? $menu->term_id; continue; }
    $mid = $menu ? $menu->term_id : wp_create_nav_menu($name);
    foreach ((array) wp_get_nav_menu_items($mid) as $it) wp_delete_post($it->ID, true);
    $order = ['home', 'about', 'rooms', 'spa', 'restaurant', 'meetings-events', 'location', 'contact'];
    foreach ($order as $n => $key) wp_update_nav_menu_item($mid, 0, ['menu-item-title' => $D[$lang]['nav']['items'][$n]['label'], 'menu-item-object' => 'page', 'menu-item-object-id' => $pageIds[$key][$lang], 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish', 'menu-item-position' => $n + 1]);
    $nav[$theme]['primary'][$lang] = $mid;
}
PLL()->options->set('nav_menus', $nav); PLL()->options->save();

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
