<?php
if (!defined('ABSPATH')) exit;
/* SEO: per-page title / description / social image (meta box), Open Graph, JSON-LD Hotel, robots.txt.
   hreflang alternates and the language-aware sitemap come from Polylang; indexing follows Settings → Reading
   ("Discourage search engines") — staging stays noindex until launch. */

function hc_seo_for($post) {
    $post = get_post($post);
    if (!$post) return [];
    $title = get_post_meta($post->ID, '_hc_seo_title', true);
    $desc = get_post_meta($post->ID, '_hc_seo_desc', true) ?: $post->post_excerpt;
    $img = (int) get_post_meta($post->ID, '_hc_seo_image', true);
    if (!$img && $post->post_type === 'hc_room') { $g = hc_room($post); $img = $g['images'][0]['id'] ?? 0; }
    return ['title' => $title, 'desc' => $desc, 'image' => $img ? wp_get_attachment_image_url($img, 'large') : ''];
}
add_filter('pre_get_document_title', function ($t) {
    if (!is_singular()) return $t;
    $s = hc_seo_for(get_queried_object_id());
    return !empty($s['title']) ? $s['title'] : $t;
});
add_filter('document_title_parts', function ($p) {
    if (is_singular('hc_room')) $p['title'] = get_the_title() . ' — ' . hc_info('name');
    return $p;
});
add_action('wp_head', function () {
    $desc = ''; $img = ''; $title = wp_get_document_title(); $url = '';
    if (is_singular()) {
        $s = hc_seo_for(get_queried_object_id()); $desc = $s['desc']; $img = $s['image']; $url = get_permalink();
    } elseif (is_front_page()) { $url = home_url('/'); }
    if (!$img) $img = hc_img_url('3075.jpg', 'large');
    if ($desc) echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
    echo '<meta property="og:type" content="website"><meta property="og:site_name" content="' . esc_attr(hc_info('name')) . '"><meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
    if ($desc) echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
    if ($url) echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
    if ($img) echo '<meta property="og:image" content="' . esc_url($img) . '">' . "\n";
    echo '<meta property="og:locale" content="' . (hc_lang() === 'bs' ? 'bs_BA' : 'en_GB') . '"><meta name="twitter:card" content="summary_large_image">' . "\n";
    if (is_front_page()) {
        $ld = ['@context' => 'https://schema.org', '@type' => 'Hotel', 'name' => hc_info('name'), 'url' => home_url('/'), 'telephone' => hc_info('phone_display'), 'email' => hc_info('email'),
            'starRating' => ['@type' => 'Rating', 'ratingValue' => 4], 'numberOfRooms' => 32, 'image' => $img,
            'address' => ['@type' => 'PostalAddress', 'streetAddress' => hc_info('street'), 'postalCode' => hc_info('postal_code'), 'addressLocality' => hc_info('city'), 'addressCountry' => 'BA'],
            'sameAs' => [hc_info('facebook')]];
        echo '<script type="application/ld+json">' . wp_json_encode($ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
}, 5);
add_filter('robots_txt', function ($out) {
    return $out . "\nSitemap: " . home_url('/wp-sitemap.xml') . "\n";
}, 10);
