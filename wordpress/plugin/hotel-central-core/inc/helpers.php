<?php
if (!defined('ABSPATH')) exit;

function hc_data($name) {
    static $c = [];
    if (!isset($c[$name])) $c[$name] = json_decode(file_get_contents(HC_DIR . "data/$name.json"), true);
    return $c[$name];
}
function hc_lang() {
    if (function_exists('pll_current_language')) { $l = pll_current_language(); if ($l) return $l; }
    return substr(get_locale(), 0, 2) === 'bs' ? 'bs' : 'en';
}
function hc_dict($lang = null) { $d = hc_data('dictionary'); return $d[$lang ?: hc_lang()]; }

/** UI string by path (e.g. "nav.book"). English source, translated through Polylang → Languages → Translations. */
function hc_t($path) {
    $en = hc_data('dictionary')['en'];
    foreach (explode('.', $path) as $k) { if (!is_array($en) || !isset($en[$k])) return $path; $en = $en[$k]; }
    if (!is_string($en)) return $path;
    return function_exists('pll__') ? pll__($en) : $en;
}
/** Array-valued UI strings (weekdays, months, subjects) translated element by element. */
function hc_ta($path) {
    $en = hc_data('dictionary')['en'];
    foreach (explode('.', $path) as $k) $en = $en[$k];
    return array_map(function ($s) { return function_exists('pll__') ? pll__($s) : $s; }, $en);
}
add_action('init', function () {
    if (!function_exists('pll_register_string')) return;
    $walk = function ($arr, $prefix) use (&$walk) {
        foreach ($arr as $k => $v) {
            $p = $prefix . '.' . $k;
            if (is_array($v)) { $walk($v, $p); }
            elseif (is_string($v) && $k !== 'href') pll_register_string($p, $v, 'Hotel Central', strlen($v) > 60);
        }
    };
    $en = hc_data('dictionary')['en'];
    foreach (['nav', 'booking', 'common', 'footer', 'contact', 'notFound'] as $g) $walk($en[$g], $g);
}, 20);

/** Language-aware URL: hc_url('/rooms') → https://site/en/rooms/ */
function hc_url($path = '/', $lang = null) {
    $lang = $lang ?: hc_lang();
    $base = function_exists('pll_home_url') ? pll_home_url($lang) : home_url('/');
    $path = trim($path, '/');
    return trailingslashit($base) . ($path ? $path . '/' : '');
}
function hc_lang_urls() {
    $out = [];
    if (!function_exists('pll_the_languages')) return $out;
    $langs = pll_the_languages(['raw' => 1, 'hide_if_empty' => 0]);
    foreach ((array) $langs as $slug => $l) $out[$slug] = ['url' => $l['url'], 'name' => strtoupper($slug), 'full' => $l['name'], 'current' => !empty($l['current_lang'])];
    return $out;
}

function hc_info($key = null) {
    $d = hc_data('hotel');
    $h = $d['hotel']; $b = $d['booking']; $m = $d['maps'];
    $defaults = [
        'name' => $h['name'], 'phone_display' => $h['phoneDisplay'], 'phone_href' => $h['phoneHref'], 'email' => $h['email'],
        'street' => $h['street'], 'postal_code' => $h['postalCode'], 'city' => $h['city'], 'country' => $h['country'],
        'facebook' => $h['facebook'], 'booking_url' => $b['bookingUrl'], 'booking_action' => $b['formAction'], 'hotel_id' => $b['hotelId'],
        'cal_format' => $b['calFormat'], 'directions' => $m['directions'], 'map_embed' => $m['embed'], 'max_adults' => $b['maxAdults'], 'max_children' => $b['maxChildren'], 'max_rooms' => $b['maxRooms'],
    ];
    $saved = get_option('hc_hotel', []);
    $all = array_merge($defaults, array_filter((array) $saved, function ($v) { return $v !== '' && $v !== null; }));
    return $key ? ($all[$key] ?? '') : $all;
}
function hc_room_booking_url($room_type_id) {
    if (!$room_type_id) return hc_info('booking_url'); // a room added by staff without an engine id still links to the booking page
    return 'https://live.ipms247.com/booking/roomwisedata.php?hid=' . rawurlencode(hc_info('hotel_id')) . '&roomtypeunkid=' . rawurlencode($room_type_id);
}

/** Media-library attachment imported from the repository's /public/images (see scripts/seed.php). */
function hc_att($file) {
    static $cache = [];
    if (isset($cache[$file])) return $cache[$file];
    global $wpdb;
    $id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_src' AND meta_value=%s LIMIT 1", $file));
    return $cache[$file] = (int) $id;
}
function hc_img_url($file, $size = 'full') {
    $id = hc_att($file);
    return $id ? wp_get_attachment_image_url($id, $size) : '';
}
function hc_img($att_id, $alt = '', $attrs = []) {
    return $att_id ? wp_get_attachment_image($att_id, 'full', false, array_merge(['alt' => $alt, 'loading' => 'lazy', 'decoding' => 'async', 'sizes' => '(min-width:1024px) 50vw, 100vw'], $attrs)) : '';
}
function hc_arrow($cls = '') {
    return '<svg aria-hidden="true" class="hc-arrow ' . esc_attr($cls) . '" viewBox="0 0 22 9" fill="none"><path d="M0 4.5h20.5M17 1l3.8 3.5L17 8" stroke="currentColor" stroke-width="0.9"/></svg>';
}
function hc_arrow_left() {
    return '<svg aria-hidden="true" class="hc-arrow" viewBox="0 0 22 9" fill="none"><path d="M22 4.5H1.5M5 1L1.2 4.5 5 8" stroke="currentColor" stroke-width="0.9"/></svg>';
}
function hc_lines_list($text) { return array_values(array_filter(array_map('trim', preg_split('/\R/', (string) $text)), 'strlen')); }
function hc_fit_vw($lines, $measure = 90, $max = 13) {
    $longest = 1; foreach ($lines as $l) $longest = max($longest, mb_strlen($l));
    return round(min($max, $measure / ($longest * 0.68)), 2) . 'vw';
}

/** Decorative hairline loops traced from the reference (viewBox 1025×640). */
function hc_deco_paths() {
    return [
        'hotel' => ['M-10 108 C 90 86, 236 78, 300 116 C 352 148, 346 300, 318 400 C 296 476, 230 512, 182 496 C 128 478, 128 400, 204 356 C 300 300, 470 268, 600 300 C 720 330, 800 420, 880 478 C 940 522, 990 540, 1040 548'],
        'rooms' => ['M96 650 C 150 560, 300 470, 520 452 C 700 438, 820 470, 900 420 C 980 370, 1000 270, 960 190 C 930 130, 980 90, 1040 100', 'M760 640 C 820 560, 900 520, 960 470 C 1010 430, 1000 360, 950 372 C 900 384, 900 456, 960 470'],
        'spa' => ['M-10 520 C 120 470, 220 560, 340 520 C 470 476, 470 330, 600 300 C 730 270, 760 400, 690 430 C 620 460, 600 360, 700 300 C 800 240, 920 190, 1040 130'],
        'restaurant' => ['M-10 200 C 80 170, 170 180, 220 240 C 280 312, 250 470, 170 500 C 90 530, 60 440, 120 400 C 220 330, 420 400, 560 440 C 700 480, 860 470, 1040 380'],
        'location' => ['M-10 90 C 160 140, 260 60, 380 110 C 500 160, 480 300, 420 320 C 360 340, 350 260, 420 240 C 560 200, 760 330, 1040 300'],
        'footer' => ['M-10 300 C 160 240, 300 360, 480 300 C 640 246, 700 120, 820 140 C 920 156, 920 260, 860 270 C 800 280, 790 200, 860 170 C 930 140, 990 150, 1040 170'],
    ];
}
function hc_deco($variant, $tone = 'dark') {
    $p = hc_deco_paths(); if (!isset($p[$variant])) return '';
    $o = '<svg aria-hidden="true" class="hc-deco' . ($tone === 'light' ? ' is-light' : '') . '" viewBox="0 0 1025 640" preserveAspectRatio="none" fill="none">';
    foreach ($p[$variant] as $i => $d) $o .= '<path class="hc-path" pathLength="1" style="transition-delay:' . (0.2 + $i * 0.4) . 's" d="' . esc_attr($d) . '"/>';
    return $o . '</svg>';
}
