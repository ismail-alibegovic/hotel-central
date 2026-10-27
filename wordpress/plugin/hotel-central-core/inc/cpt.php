<?php
if (!defined('ABSPATH')) exit;

function hc_register_cpts() {
    register_post_type('hc_room', [
        'labels' => ['name' => 'Rooms', 'singular_name' => 'Room', 'add_new_item' => 'Add new room', 'edit_item' => 'Edit room', 'menu_name' => 'Rooms & Suites'],
        'public' => true, 'show_in_rest' => false, 'has_archive' => false, 'menu_icon' => 'dashicons-admin-home', 'menu_position' => 21,
        'rewrite' => ['slug' => 'rooms', 'with_front' => false],
        'supports' => ['title', 'excerpt', 'page-attributes', 'revisions'],
    ]);
    register_post_type('hc_offer', [
        'labels' => ['name' => 'Offers', 'singular_name' => 'Offer', 'add_new_item' => 'Add new offer', 'edit_item' => 'Edit offer', 'menu_name' => 'Offers'],
        'public' => true, 'show_in_rest' => false, 'has_archive' => false, 'menu_icon' => 'dashicons-tag', 'menu_position' => 22,
        'rewrite' => ['slug' => 'offers', 'with_front' => false],
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
    ]);
    register_post_type('hc_enquiry', [
        'labels' => ['name' => 'Enquiries', 'singular_name' => 'Enquiry', 'menu_name' => 'Enquiries'],
        'public' => false, 'show_ui' => true, 'menu_icon' => 'dashicons-email', 'menu_position' => 23,
        'capability_type' => 'post', 'capabilities' => ['create_posts' => 'do_not_allow'], 'map_meta_cap' => true,
        'supports' => ['title', 'editor'],
    ]);
}
add_action('init', 'hc_register_cpts');

// Polylang: rooms and offers are translatable; structural fields are copied between translations.
add_filter('pll_get_post_types', function ($types) { $types['hc_room'] = 'hc_room'; $types['hc_offer'] = 'hc_offer'; return $types; });
add_filter('pll_copy_post_metas', function ($keys) { return array_merge($keys, ['hc_room_type_id', 'hc_size_m2', 'hc_gallery', 'hc_gallery_pos']); });

function hc_room_fields() {
    return [
        'hc_room_type_id' => ['Booking-engine room type ID', 'text', 'The eZee room type id used for the room-specific "Check availability" link.'],
        'hc_size_m2' => ['Size (m²)', 'number', ''],
        'hc_size_label' => ['Size label', 'text', 'e.g. "Room size 26 m²" / "Veličina sobe 26 m²"'],
        'hc_title_lines' => ['Display title (one line per row)', 'textarea', 'The serif title broken into editorial lines, e.g. "Standard" then "Twin/Double".'],
        'hc_feature' => ['Defining feature', 'text', 'Short line set in grotesk above the title.'],
        'hc_description' => ['Description (one paragraph per line)', 'textarea', ''],
        'hc_highlights' => ['Highlights for the homepage carousel (one per line, max 8)', 'textarea', ''],
        'hc_amenities' => ['Room facilities (one per line)', 'textarea', ''],
        'hc_gallery' => ['Photographs', 'gallery', 'First photo is the list/hero image, second the detail image, the rest form the gallery.'],
        'hc_gallery_pos' => ['Focal points (one per photo, e.g. "50% 60%")', 'textarea', 'Optional crop focus for each photograph, same order.'],
    ];
}

/** Rooms for a language, ordered as the site shows them. */
function hc_rooms($lang = null) {
    $lang = $lang ?: hc_lang();
    $args = ['post_type' => 'hc_room', 'numberposts' => -1, 'orderby' => 'menu_order title', 'order' => 'ASC', 'post_status' => 'publish', 'suppress_filters' => false];
    if (function_exists('pll_current_language')) $args['lang'] = $lang;
    $out = [];
    foreach (get_posts($args) as $p) $out[] = hc_room($p);
    return $out;
}
function hc_room($p) {
    $p = get_post($p); $id = $p->ID;
    $ids = array_values(array_filter(array_map('intval', explode(',', (string) get_post_meta($id, 'hc_gallery', true)))));
    $pos = hc_lines_list(get_post_meta($id, 'hc_gallery_pos', true));
    $imgs = [];
    foreach ($ids as $i => $a) $imgs[] = ['id' => $a, 'alt' => get_post_meta($a, '_wp_attachment_image_alt', true) ?: $p->post_title, 'pos' => $pos[$i] ?? '50% 50%'];
    return [
        'id' => $id, 'slug' => $p->post_name, 'name' => $p->post_title, 'url' => get_permalink($id), 'summary' => $p->post_excerpt,
        'type_id' => get_post_meta($id, 'hc_room_type_id', true), 'size_m2' => get_post_meta($id, 'hc_size_m2', true), 'size_label' => get_post_meta($id, 'hc_size_label', true),
        'title_lines' => hc_lines_list(get_post_meta($id, 'hc_title_lines', true)) ?: [$p->post_title], 'feature' => get_post_meta($id, 'hc_feature', true),
        'description' => hc_lines_list(get_post_meta($id, 'hc_description', true)), 'highlights' => hc_lines_list(get_post_meta($id, 'hc_highlights', true)),
        'amenities' => hc_lines_list(get_post_meta($id, 'hc_amenities', true)), 'images' => $imgs,
    ];
}
