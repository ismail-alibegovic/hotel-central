<?php
/** Server-rendered pieces used by the dynamic room template (room pages are database content, not Elementor pages). */
if (!defined('ABSPATH')) exit;

function hc_r_lines($lines, $cls = '') { return '<span class="hc-lines ' . $cls . '">' . implode('<br>', array_map('esc_html', $lines)) . '</span>'; }

function hc_r_hero($att, $alt, $pos, $eyebrow, $title_lines, $meta = []) {
    $o = '<section class="hc-hero"><div class="hc-hero__img hc-tint">' . hc_img($att, $alt, ['loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '100vw']) . '</div>';
    $o .= '<div class="hc-hero__body"><p class="hc-eyebrow hc-label hc-fade" data-immediate style="--d:.6s">' . esc_html($eyebrow) . '</p>';
    $o .= '<h1 class="hc-display hc-lines hc-fit hc-h1" data-immediate data-fit="90,13" style="--d:.4s">' . implode('<br>', array_map('esc_html', $title_lines)) . '</h1></div>';
    if ($meta) $o .= '<div class="hc-hero__meta hc-label hc-fade" data-immediate style="--d:1.2s"><span>' . esc_html($meta[0]) . '</span><span>' . esc_html($meta[1]) . '</span><span>' . esc_html($meta[2]) . '</span></div>';
    return $o . '</section>';
}
function hc_r_final($att, $alt) {
    $o = '<section class="hc-final"><div class="hc-hero__img hc-tint-final">' . hc_img($att, $alt, ['sizes' => '100vw']) . '</div><div class="hc-final__in">';
    $o .= '<p class="hc-eyebrow hc-label hc-fade">' . esc_html(hc_final_t('label')) . '</p>';
    $o .= '<h2 class="hc-display hc-lines hc-fit hc-title" data-fit="90,13">' . esc_html(hc_final_t('title')[0]) . '<br>' . esc_html(hc_final_t('title')[1]) . '</h2>';
    $o .= '<p class="hc-body hc-fade" style="--d:.2s">' . esc_html(hc_final_t('body')) . '</p>';
    $o .= '<div class="hc-final__acts hc-fade" style="--d:.3s"><a class="hc-pill hc-pill-light" href="' . esc_url(hc_info('booking_url')) . '" target="_blank" rel="noopener noreferrer"><span>' . esc_html(hc_final_t('cta')) . '</span></a><a class="hc-label hc-link-line" style="opacity:.85" href="' . esc_url(hc_info('phone_href')) . '">' . esc_html(hc_info('phone_display')) . '</a></div></div></section>';
    return $o;
}
/** home.final strings (editable under Languages → Translations). */
function hc_final_t($k) {
    $en = hc_data('dictionary')['en']['home']['final'][$k];
    if (is_array($en)) return array_map(function ($s) { return function_exists('pll__') ? pll__($s) : $s; }, $en);
    return function_exists('pll__') ? pll__($en) : $en;
}
add_action('init', function () {
    if (!function_exists('pll_register_string')) return;
    foreach (hc_data('dictionary')['en']['home']['final'] as $k => $v) foreach ((array) $v as $i => $s) pll_register_string("home.final.$k.$i", $s, 'Hotel Central');
}, 22);

function hc_r_gallery($imgs, $tone = 'deep') {
    $o = '<section class="hc-gallery hc-' . $tone . '"><div class="g">';
    foreach (array_slice($imgs, 0, 5) as $i => $im) $o .= hc_photo($im['id'], $im['alt'], $im['pos'], '', $i % 2 ? 'down' : 'up');
    return $o . '</div></section>';
}
