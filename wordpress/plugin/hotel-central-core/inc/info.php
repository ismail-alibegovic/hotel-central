<?php
if (!defined('ABSPATH')) exit;
// Hotel Information: phone, e-mail, address, booking engine and map in one place
// (used by header, menu, footer, contact page, booking bar and schema.org data).
add_action('admin_menu', function () {
    add_menu_page('Hotel Information', 'Hotel Information', 'manage_options', 'hc-hotel-info', 'hc_info_page', 'dashicons-building', 20);
});
add_action('admin_init', function () {
    register_setting('hc_hotel', 'hc_hotel', ['sanitize_callback' => function ($in) {
        $out = [];
        foreach ((array) $in as $k => $v) $out[sanitize_key($k)] = in_array($k, ['directions', 'map_embed', 'booking_url', 'booking_action', 'facebook'], true) ? esc_url_raw($v) : sanitize_text_field($v);
        return $out;
    }]);
});
function hc_info_page() {
    $fields = [
        'name' => 'Hotel name', 'phone_display' => 'Main phone (as shown)', 'phone_href' => 'Phone link (tel:+387…)', 'email' => 'E-mail (also receives the contact form)',
        'street' => 'Street', 'postal_code' => 'Postal code', 'city' => 'City', 'country' => 'Country', 'facebook' => 'Facebook URL',
        'booking_url' => 'Booking engine page ("Book now")', 'booking_action' => 'Booking engine search form action', 'hotel_id' => 'eZee hotel id', 'cal_format' => 'Booking engine date format',
        'directions' => 'Directions link', 'map_embed' => 'Map embed URL',
    ];
    $cur = hc_info();
    echo '<div class="wrap"><h1>Hotel Information</h1><p>Used everywhere on the website: header, menu, footer, contact page, booking and search-engine data. Clear a field to fall back to the hotel\'s published details.</p><form method="post" action="options.php">';
    settings_fields('hc_hotel');
    echo '<table class="form-table">';
    foreach ($fields as $k => $label) printf('<tr><th><label for="hc_%1$s">%2$s</label></th><td><input class="regular-text" style="width:480px" id="hc_%1$s" name="hc_hotel[%1$s]" value="%3$s"></td></tr>', esc_attr($k), esc_html($label), esc_attr($cur[$k]));
    echo '</table>';
    submit_button();
    echo '</form></div>';
}
