<?php
if (!defined('ABSPATH')) exit;
/* Hotel Information: one place for phone, e-mail, address, opening hours (used by header, menu, footer, contact page, schema.org, shortcodes)
   and — separately, administrators only — the booking-engine configuration.
   Editors can change the first screen; they cannot see or change the second. */

function hc_info_groups() {
    return [
        'contact' => ['name' => 'Hotel name', 'phone_display' => 'Main phone (as shown)', 'phone_href' => 'Phone link (tel:+387…)', 'email' => 'E-mail (also receives the contact form)',
            'street' => 'Street', 'postal_code' => 'Postal code', 'city' => 'City', 'country' => 'Country', 'facebook' => 'Facebook page URL',
            'directions' => 'Directions link (Google Maps)', 'map_embed' => 'Map embed URL'],
        'hours' => ['hours_reception' => 'Reception', 'hours_breakfast' => 'Breakfast', 'hours_restaurant' => 'Restaurant', 'hours_spa' => 'Club & Spa', 'hours_checkin' => 'Check-in / check-out'],
        'booking' => ['booking_url' => 'Booking engine page ("Book now" links)', 'booking_action' => 'Booking engine search form address', 'hotel_id' => 'eZee hotel id', 'cal_format' => 'Booking engine date format',
            'max_adults' => 'Max. adults', 'max_children' => 'Max. children', 'max_rooms' => 'Max. rooms'],
    ];
}
function hc_info_urls() { return ['directions', 'map_embed', 'booking_url', 'booking_action', 'facebook']; }

add_action('admin_menu', function () {
    add_menu_page('Hotel Information', 'Hotel Information', 'edit_pages', 'hc-hotel-info', 'hc_info_page_contact', 'dashicons-building', 20);
    add_submenu_page('hc-hotel-info', 'Hotel Information', 'Contact & address', 'edit_pages', 'hc-hotel-info', 'hc_info_page_contact');
    add_submenu_page('hc-hotel-info', 'Opening hours', 'Opening hours', 'edit_pages', 'hc-hotel-hours', 'hc_info_page_hours');
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
