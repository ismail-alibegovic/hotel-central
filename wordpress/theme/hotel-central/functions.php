<?php
if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus(['primary' => 'Main menu (full-screen)']);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
});

add_action('wp_enqueue_scripts', function () {
    $v = wp_get_theme()->get('Version');
    wp_enqueue_style('hc', get_theme_file_uri('assets/css/hc.css'), [], filemtime(get_theme_file_path('assets/css/hc.css')));
    wp_enqueue_script('hc', get_theme_file_uri('assets/js/hc.js'), [], filemtime(get_theme_file_path('assets/js/hc.js')), ['in_footer' => true, 'strategy' => 'defer']);
    wp_dequeue_style('wp-block-library'); wp_dequeue_style('global-styles'); wp_dequeue_style('classic-theme-styles');
}, 20);

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
    $items = [];
    $locs = get_nav_menu_locations();
    if (!empty($locs['primary'])) {
        foreach ((array) wp_get_nav_menu_items($locs['primary']) as $m) if ((int) $m->menu_item_parent === 0) $items[] = ['href' => $m->url, 'label' => $m->title];
    }
    if (!$items) foreach (hc_dict()['nav']['items'] as $it) $items[] = ['href' => hc_url($it['href']), 'label' => $it['label']];
    return $items;
}
function hc_menu_key($href) {
    $p = trim((string) wp_parse_url($href, PHP_URL_PATH), '/');
    $p = preg_replace('#^(en|bs)(/|$)#', '', $p);
    return '/' . $p;
}
function hc_current_key() { return hc_menu_key(home_url(add_query_arg([]))); }
require_once get_theme_file_path('inc/render.php');
