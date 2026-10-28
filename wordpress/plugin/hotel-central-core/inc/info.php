<?php
if (!defined('ABSPATH')) exit;
/* Hotel Information: one place for phone, e-mail, address, opening hours (used by header, menu, footer, contact page, schema.org, shortcodes)
   and — separately, administrators only — the booking-engine configuration.
   Editors can change the first screen; they cannot see or change the second. */

function hc_info_groups() {
    return [
        'contact' => ['name' => 'Hotel name', 'phone_display' => 'Main phone (as shown)', 'phone_href' => 'Phone link (tel:+387…)', 'email' => 'E-mail (also receives the contact form)',
            'street' => 'Street', 'postal_code' => 'Postal code', 'city' => 'City', 'country' => 'Country', 'facebook' => 'Facebook page URL', 'instagram' => 'Instagram page URL (optional)',
            'directions' => 'Directions link (Google Maps)', 'map_embed' => 'Map embed URL'],
        'hours' => ['hours_reception' => 'Reception', 'hours_breakfast' => 'Breakfast', 'hours_restaurant' => 'Restaurant', 'hours_spa' => 'Club & Spa', 'hours_checkin' => 'Check-in / check-out'],
        'booking' => ['booking_url' => 'Booking engine page ("Book now" links)', 'booking_action' => 'Booking engine search form address', 'hotel_id' => 'eZee hotel id', 'cal_format' => 'Booking engine date format',
            'max_adults' => 'Max. adults', 'max_children' => 'Max. children', 'max_rooms' => 'Max. rooms'],
    ];
}
function hc_info_urls() { return ['directions', 'map_embed', 'booking_url', 'booking_action', 'facebook', 'instagram']; }

add_action('admin_menu', function () {
    add_menu_page('Hotel Information', 'Hotel Information', 'edit_pages', 'hc-hotel-info', 'hc_info_page_contact', 'dashicons-building', 20);
    add_submenu_page('hc-hotel-info', 'Hotel Information', 'Contact & address', 'edit_pages', 'hc-hotel-info', 'hc_info_page_contact');
    add_submenu_page('hc-hotel-info', 'Opening hours', 'Opening hours', 'edit_pages', 'hc-hotel-hours', 'hc_info_page_hours');
    add_submenu_page('hc-hotel-info', 'Footer texts', 'Footer texts', 'edit_pages', 'hc-hotel-footer', 'hc_info_page_footer');
    add_submenu_page('hc-hotel-info', 'Booking engine', 'Booking engine (admin)', 'manage_options', 'hc-hotel-booking', 'hc_info_page_booking');
});
add_action('admin_init', function () {
    // one option, three screens: every screen registers the same option, so a single sanitizer works out which screen was submitted
    foreach (['contact' => 'edit_pages', 'hours' => 'edit_pages', 'booking' => 'manage_options'] as $g => $cap) {
        register_setting("hc_hotel_$g", 'hc_hotel', ['sanitize_callback' => 'hc_sanitize_info_post']);
        add_filter("option_page_capability_hc_hotel_$g", function () use ($cap) { return $cap; });
    }
});
function hc_sanitize_info_post($in) {
    $page = isset($_POST['option_page']) ? sanitize_key(wp_unslash($_POST['option_page'])) : '';
    $group = preg_match('/^hc_hotel_(contact|hours|booking)$/', $page, $m) ? $m[1] : '';
    return $group ? hc_sanitize_info($in, $group) : (array) get_option('hc_hotel', []);
}
/** Only the fields of the screen that was submitted are changed; the booking group is ignored unless the user is an administrator. */
function hc_sanitize_info($in, $group) {
    $old = (array) get_option('hc_hotel', []);
    if ($group === 'booking' && !current_user_can('manage_options')) return $old;
    foreach (hc_info_groups()[$group] as $k => $label) {
        if (!isset($in[$k])) continue;
        $v = wp_unslash($in[$k]);
        $old[$k] = in_array($k, hc_info_urls(), true) ? esc_url_raw($v, ['http', 'https', 'tel', 'mailto']) : sanitize_text_field($v);
    }
    return $old;
}
function hc_info_form($group, $title, $intro) {
    $cur = hc_info();
    echo '<div class="wrap"><h1>' . esc_html($title) . '</h1><p>' . esc_html($intro) . '</p><form method="post" action="options.php">';
    settings_fields("hc_hotel_$group");
    echo '<table class="form-table">';
    foreach (hc_info_groups()[$group] as $k => $label) printf('<tr><th><label for="hc_%1$s">%2$s</label></th><td><input class="regular-text" style="width:480px" id="hc_%1$s" name="hc_hotel[%1$s]" value="%3$s"></td></tr>', esc_attr($k), esc_html($label), esc_attr($cur[$k] ?? ''));
    echo '</table>';
    submit_button();
    echo '</form></div>';
}
function hc_info_page_contact() { hc_info_form('contact', 'Hotel Information', 'Used everywhere on the website: header, menu, footer, contact page, map and search-engine data. Change a value here and every page follows. Clear a field to fall back to the hotel\'s published details.'); }
function hc_info_page_hours() { hc_info_form('hours', 'Opening hours', 'Free text, e.g. "07:00 – 22:00". Show them on any page with the shortcode [hc_hours] in an Elementor Shortcode widget. Empty rows are not shown.'); }
function hc_info_page_booking() { hc_info_form('booking', 'Booking engine (administrators only)', 'Technical settings of the eZee booking integration. Changing these can stop online booking — ask the web developer before editing.'); }

/* ───────── Footer texts (per language). Empty field = the built-in wording (translated under Languages → Translations). ───────── */
function hc_footer_fields() {
    return ['reservations' => ['Reservations label', 'footer.reservations'], 'reservationsBody' => ['Reservations line', 'footer.reservationsBody'], 'statement0' => ['Big statement — line 1', 'footer.statement.0'], 'statement1' => ['Big statement — line 2', 'footer.statement.1'],
        'rights' => ['Copyright note (after "© year hotel name.")', 'footer.rights'], 'credits' => ['Credits line', 'footer.credits']];
}
/** Footer text for the current language: Hotel Information → Footer texts, else the built-in (translatable) wording. */
function hc_foot($key) {
    $all = (array) get_option('hc_footer', []); $v = trim((string) ($all[hc_lang()][$key] ?? ''));
    return $v !== '' ? $v : hc_t(hc_footer_fields()[$key][1]);
}
add_action('admin_init', function () {
    register_setting('hc_footer', 'hc_footer', ['sanitize_callback' => function ($in) {
        $out = []; $langs = function_exists('pll_languages_list') ? pll_languages_list(['fields' => 'slug']) : ['en', 'bs'];
        foreach ($langs as $l) foreach (hc_footer_fields() as $k => $_) $out[$l][$k] = sanitize_text_field(wp_unslash($in[$l][$k] ?? ''));
        return $out;
    }]);
    add_filter('option_page_capability_hc_footer', function () { return 'edit_pages'; });
});
function hc_info_page_footer() {
    $langs = function_exists('pll_languages_list') ? pll_languages_list(['fields' => 'slug']) : ['en', 'bs']; $cur = (array) get_option('hc_footer', []);
    echo '<div class="wrap"><h1>Footer texts</h1><p>The wording in the page footer, for each language. Leave a field empty to keep the standard wording. Address, phone, e-mail and social links come from <em>Contact &amp; address</em>; the footer link list from <em>Appearance → Menus → Footer links</em> (the main menu is used when no footer menu is assigned).</p><form method="post" action="options.php">';
    settings_fields('hc_footer'); echo '<table class="form-table">';
    foreach (hc_footer_fields() as $k => [$label, $path]) foreach ($langs as $l) {
        $std = ($l === hc_lang()) ? '' : ''; $ph = function_exists('hc_dict') ? (hc_data('dictionary')[$l] ? hc_get_path(hc_data('dictionary')[$l], $path) : '') : '';
        printf('<tr><th><label for="hf_%1$s_%2$s">%3$s <code>%2$s</code></label></th><td><input class="regular-text" style="width:480px" id="hf_%1$s_%2$s" name="hc_footer[%2$s][%1$s]" value="%4$s" placeholder="%5$s"></td></tr>', esc_attr($k), esc_attr($l), esc_html($label), esc_attr($cur[$l][$k] ?? ''), esc_attr($ph));
    }
    echo '</table>'; submit_button(); echo '</form></div>';
}
function hc_get_path($arr, $path) { foreach (explode('.', preg_replace('/^footer\./', '', $path)) as $k) { $arr = $arr['footer'] ?? $arr; if (!is_array($arr) || !isset($arr[$k])) return ''; $arr = $arr[$k]; } return is_string($arr) ? $arr : ''; }
