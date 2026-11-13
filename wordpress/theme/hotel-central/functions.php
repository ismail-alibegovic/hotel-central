<?php
if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus(['primary' => 'Main menu (full-screen)', 'footer' => 'Footer links (optional)']);
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

add_filter('body_class', function ($c) { $c[] = 'hc'; $c[] = 'hc-lang-' . hc_lang(); return $c; });
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
    if (!$items) foreach (hc_dict()['nav']['items'] as $it) $items[] = ['href' => hc_url($it['href']), 'label' => $it['label']];
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
