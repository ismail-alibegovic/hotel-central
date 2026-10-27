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
