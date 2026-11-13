<?php
if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus(['primary' => 'Main menu (full-screen)', 'footer' => 'Footer links (optional)', 'club' => 'Central Fitness Club — section menu', 'spa' => 'Central Day Spa — section menu']);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
});

add_action('wp_enqueue_scripts', function () {
    $v = wp_get_theme()->get('Version');
    wp_enqueue_style('hc', get_theme_file_uri('assets/css/hc.css'), [], filemtime(get_theme_file_path('assets/css/hc.css')));
    wp_enqueue_script('hc', get_theme_file_uri('assets/js/hc.js'), [], filemtime(get_theme_file_path('assets/js/hc.js')), ['in_footer' => true, 'strategy' => 'defer']);
    wp_dequeue_style('wp-block-library'); wp_dequeue_style('global-styles'); wp_dequeue_style('classic-theme-styles');
}, 999);

add_action('wp_head', function () {
    echo '<script>document.documentElement.classList.add("hc-js")</script>' . "\n";
    echo '<link rel="preload" href="' . esc_url(get_theme_file_uri('assets/fonts/gilda-display.ttf')) . '" as="font" type="font/ttf" crossorigin>' . "\n";
    // focal points chosen in the page builder: class hc-pos-<x>-<y> → object-position
    $pos = get_option('hc_positions', []);
    if ($pos) { $css = ''; foreach ($pos as $c => $v) $css .= '.' . preg_replace('/[^a-z0-9-]/', '', $c) . '{--op:' . esc_attr($v) . '}'; echo '<style id="hc-positions">' . $css . '</style>' . "\n"; }
}, 1);

add_filter('body_class', function ($c) { $c[] = 'hc'; $c[] = 'hc-lang-' . hc_lang(); if ($b = hc_brand()) { $c[] = 'hc-brand'; $c[] = 'hc-brand-' . $b; } return $c; });

/* ───────── Round 1: Central Fitness Club and Central Day Spa (distinct brands inside the hotel's site) ─────────
   A page belongs to a brand when it, or a parent page, has the "Brand" setting (post meta _hc_brand = club|spa; set by the seeder,
   shown in the page's "Section" box). Brand pages keep the hotel's menu and usability, with their own logo, colours, type and sub-menu. */
function hc_brand($id = null) {
    if ($id === null) { if (!is_singular('page')) return ''; $id = get_queried_object_id(); }
    foreach (array_merge([(int) $id], get_post_ancestors((int) $id)) as $p) { $b = get_post_meta($p, '_hc_brand', true); if (in_array($b, ['club', 'spa'], true)) return $b; }
    return '';
}
function hc_page_by_key($key, $lang = null) {
    global $wpdb; $lang = $lang ?: hc_lang();
    $id = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_key' AND meta_value=%s LIMIT 1", "page:$key:$lang"));
    return $id && get_post_status($id) === 'publish' ? $id : 0;
}
function hc_brand_info($b) {
    $L = hc_lang(); $logo = get_theme_file_uri('assets/brand/');
    if ($b === 'club') {
        $k = hc_data('club')[$L]; $home = hc_page_by_key('club'); $mem = hc_page_by_key('club-membership');
        return ['name' => 'Central Fitness Club', 'home' => $home ? get_permalink($home) : hc_url('/centralfitnessclub'), 'logo' => $logo . 'central-fitness-club-white.svg', 'w' => 628, 'h' => 740,
            'cta' => ['label' => $k['nav']['join'], 'url' => $mem ? get_permalink($mem) : hc_url('/centralfitnessclub/membership'), 'ext' => false], 'part' => $k['footer']['part'], 'back' => $k['footer']['back'], 'loc' => 'club'];
    }
    $k = hc_data('dayspa'); $home = hc_page_by_key('dayspa');
    return ['name' => 'Central Day Spa', 'home' => $home ? get_permalink($home) : hc_url('/dayspa'), 'logo' => $logo . 'day-spa-transparent.png', 'w' => 544, 'h' => 394,
        'cta' => ['label' => $k[$L]['nav']['book'], 'url' => $k['booking'][$L], 'ext' => true], 'part' => $k[$L]['footer']['part'], 'back' => $k[$L]['footer']['back'], 'loc' => 'spa'];
}
/** Items of a section menu (Appearance → Menus → "Central Fitness Club — section menu" / "Central Day Spa — section menu"). */
function hc_location_items($loc) {
    $locs = get_nav_menu_locations(); $out = [];
    if (!empty($locs[$loc])) foreach ((array) wp_get_nav_menu_items($locs[$loc]) as $m) if ((int) $m->menu_item_parent === 0) $out[] = ['href' => $m->url, 'label' => $m->title];
    return $out;
}
add_filter('elementor/frontend/print_google_fonts', '__return_false');
add_filter('show_admin_bar', function ($show) { return $show; });
add_filter('wp_robots', function ($r) { return $r; });

/** Main-menu items for the current language: the Menus screen if set up, else the built-in list. */
function hc_menu_items() {
    $items = []; $locs = get_nav_menu_locations();
    if (!empty($locs['primary'])) {
        $all = (array) wp_get_nav_menu_items($locs['primary']); $kids = [];
        foreach ($all as $m) if ((int) $m->menu_item_parent) $kids[(int) $m->menu_item_parent][] = ['href' => $m->url, 'label' => $m->title];
        foreach ($all as $m) if ((int) $m->menu_item_parent === 0) $items[] = ['href' => $m->url, 'label' => $m->title, 'children' => $kids[(int) $m->ID] ?? []];
    }
    if (!$items) { $n = hc_dict()['nav']; foreach ($n['items'] as $it) $items[] = ['href' => hc_url($it['href']), 'label' => $it['label'], 'children' => array_map(function ($c) { return ['href' => hc_url($c['href']), 'label' => $c['label']]; }, $n['children'][$it['href']] ?? [])]; }
    return $items;
}
/** Footer "Explore" list: the Footer links menu of the current language when one is assigned, otherwise the main menu. */
function hc_footer_items() {
    $locs = get_nav_menu_locations(); $items = [];
    if (!empty($locs['footer'])) foreach ((array) wp_get_nav_menu_items($locs['footer']) as $m) if ((int) $m->menu_item_parent === 0) $items[] = ['href' => $m->url, 'label' => $m->title, 'blank' => in_array('hc-blank', (array) $m->classes, true) || $m->target === '_blank'];
    return $items ?: hc_menu_items();
}
function hc_menu_key($href) {
    $p = trim((string) wp_parse_url($href, PHP_URL_PATH), '/');
    $p = preg_replace('#^(en|bs)(/|$)#', '', $p);
    return '/' . $p;
}
function hc_current_key() { return hc_menu_key(home_url(add_query_arg([]))); }
require_once get_theme_file_path('inc/render.php');

/* ───────── Performance ─────────
   Elementor's front-end JavaScript (≈ 300 KB with jQuery) is only needed by interactive widgets (accordion, tabs, toggle, carousels,
   galleries/lightbox, counters, video…). The public site drops it on pages that use only static widgets (heading, text, image, button,
   icon list, shortcode, HTML, spacer, divider, icon / image box, map…); Elementor "Entrance animations" are handled by hc.js.
   The editor and preview always load everything. As soon as an editor adds an interactive widget, the scripts come back by themselves. */
function hc_static_widgets() { return ['heading', 'text-editor', 'image', 'button', 'icon-list', 'shortcode', 'html', 'spacer', 'divider', 'icon', 'icon-box', 'image-box', 'google_maps', 'star-rating', 'menu-anchor', 'read-more', 'text-path', 'social-icons', 'sidebar', 'wp-widget-text']; }
function hc_widget_types($elements, &$out = []) {
    foreach ((array) $elements as $el) {
        if (($el['elType'] ?? '') === 'widget') $out[$el['widgetType'] ?? '?'] = true;
        if (!empty($el['elements'])) hc_widget_types($el['elements'], $out);
    }
    return array_keys($out);
}
function hc_page_needs_elementor_js($post_id) {
    $key = 'hc_wt_' . $post_id . '_' . get_post_modified_time('U', true, $post_id);
    $cached = get_transient($key);
    if ($cached === false) {
        $data = json_decode((string) get_post_meta($post_id, '_elementor_data', true), true);
        $cached = array_values(array_diff(hc_widget_types($data ?: []), hc_static_widgets())) ? 'yes' : 'no';
        set_transient($key, $cached, DAY_IN_SECONDS);
    }
    return $cached === 'yes';
}
add_action('wp_enqueue_scripts', function () {
    if (is_admin() || !class_exists('\Elementor\Plugin')) return;
    $p = \Elementor\Plugin::$instance;
    if ($p->preview->is_preview_mode() || $p->editor->is_edit_mode() || isset($_GET['elementor-preview'])) return;
    if (is_singular() && hc_page_needs_elementor_js(get_queried_object_id())) return;
    foreach (['elementor-frontend', 'elementor-frontend-modules', 'elementor-webpack-runtime', 'elementor-waypoints', 'elementor-core-js', 'swiper', 'share-link', 'elementor-dialog', 'e-sticky'] as $h) { wp_dequeue_script($h); wp_deregister_script($h); }
    wp_dequeue_script('jquery-migrate');
}, 1000);
