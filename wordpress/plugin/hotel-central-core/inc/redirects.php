<?php
if (!defined('ABSPATH')) exit;
/* Redirects:
   1. Legacy hotelcentral.ba URLs (docs/audit/legacy-urls.csv, rows with a confirmed 301 target) → new pages.
   2. Un-prefixed paths (/rooms/, /about/ …) → /en/… or /bs/… (Bosnian/Croatian/Serbian browsers get /bs).
   Both only act on requests that would otherwise 404, so real content is never shadowed. */
add_action('template_redirect', function () {
    if (!is_404() || is_admin()) return;
    $path = '/' . trim(wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $home = rtrim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
    if ($home && strpos($path, $home) === 0) $path = substr($path, strlen($home)) ?: '/';
    $map = hc_data('redirects');
    if (isset($map[$path])) { wp_safe_redirect(home_url($map[$path]), 301); exit; }
    $first = explode('/', trim($path, '/'))[0] ?? '';
    $langs = function_exists('pll_languages_list') ? pll_languages_list() : ['en', 'bs'];
    if ($first && !in_array($first, $langs, true) && !preg_match('#^(wp-|feed|robots|favicon)#', $first)) {
        $accept = strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '');
        $pref = preg_match('/^(bs|hr|sr|sh)\b/', $accept) ? 'bs' : 'en';
        $target = home_url('/' . $pref . $path);
        if (url_to_postid(trailingslashit($target))) { wp_safe_redirect(trailingslashit($target), 301); exit; }
    }
}, 1);

/* Same slug in both languages (/en/about/ and /bs/about/, as on the Next.js site):
   WordPress resolves "pagename" with get_page_by_path(), which returns the first match regardless of language.
   Resolve it within the requested Polylang language instead and query the page by ID. */
add_filter('request', function ($qv) {
    foreach (['hc_room', 'hc_offer'] as $cpt) {
        if (!empty($qv[$cpt]) && !empty($qv['lang']) && function_exists('pll_get_post_language')) {
            global $wpdb;
            foreach ($wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_name=%s AND post_type=%s AND post_status='publish'", $qv[$cpt], $cpt)) as $id)
                if (pll_get_post_language((int) $id) === $qv['lang']) { unset($qv[$cpt], $qv['name']); $qv['p'] = (int) $id; $qv['post_type'] = $cpt; break; }
        }
    }
    if (empty($qv['pagename']) || empty($qv['lang']) || !function_exists('pll_get_post_language')) return $qv;
    global $wpdb;
    $path = trim($qv['pagename'], '/');
    $ids = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_name=%s AND post_type='page' AND post_status='publish'", basename($path)));
    foreach ($ids as $id) {
        if (pll_get_post_language((int) $id) === $qv['lang'] && get_page_uri((int) $id) === $path) { unset($qv['pagename']); $qv['page_id'] = (int) $id; break; }
    }
    return $qv;
}, 20);

/* WordPress suffixes a slug (-2) when any other post uses it; Polylang only de-duplicates within one language when it knows the
   post's language. Saving a page in Elementor must never turn /en/about/ into /en/about-2/ just because /bs/about/ exists. */
add_filter('wp_unique_post_slug', function ($slug, $post_id, $status, $type, $parent, $original) {
    if ($slug === $original || !function_exists('pll_get_post_language')) return $slug;
    $lang = pll_get_post_language((int) $post_id);
    if (!$lang) return $slug;
    global $wpdb;
    $ids = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_name=%s AND post_type=%s AND post_parent=%d AND ID<>%d AND post_status NOT IN ('trash','auto-draft')", $original, $type, (int) $parent, (int) $post_id));
    foreach ($ids as $id) if (pll_get_post_language((int) $id) === $lang) return $slug;
    return $original;
}, 20, 6);

/* Renamed addresses keep working: when an editor changes a page / room / offer slug, the old address is remembered and
   redirects (301) to the new one — within the same language. WordPress' own old-slug redirect does not survive Polylang's language prefixes. */
add_action('post_updated', function ($id, $after, $before) {
    if (!in_array($after->post_type, ['page', 'hc_room', 'hc_offer'], true) || $before->post_status !== 'publish' || !$before->post_name || $before->post_name === $after->post_name) return;
    $old = (array) get_post_meta($id, '_hc_old_slugs', true); $old = array_values(array_unique(array_filter(array_merge($old, [$before->post_name]))));
    update_post_meta($id, '_hc_old_slugs', $old);
}, 10, 3);
add_action('template_redirect', function () {
    if (!is_404() || is_admin() || !function_exists('pll_get_post_language')) return;
    $path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'); $seg = explode('/', $path); $slug = sanitize_title(end($seg));
    if (!$slug) return;
    global $wpdb; $lang = hc_lang();
    $ids = $wpdb->get_col($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_old_slugs' AND meta_value LIKE %s", '%"' . $wpdb->esc_like($slug) . '"%'));
    foreach ($ids as $pid) if (get_post_status($pid) === 'publish' && pll_get_post_language($pid) === $lang) { wp_safe_redirect(get_permalink($pid), 301); exit; }
}, 2);
