<?php
/** Page builders: Next.js layout blocks → Elementor containers + widgets. */
require_once __DIR__ . '/el.php';

class HC_Ctx {
    public $lang; public $dict; public $rooms; public $imgf; public $base;
    function __construct($lang, $dict, $rooms, $imgf) { $this->lang = $lang; $this->dict = $dict; $this->rooms = $rooms; $this->imgf = $imgf; }
    function img($src, $alt = '') { return call_user_func($this->imgf, basename($src), $alt); }
    function url($path) { return home_url('/' . $this->lang . ($path === '/' ? '' : '/' . trim($path, '/')) . '/'); }
    function link($l) { return !empty($l['external']) || ($l['kind'] ?? '') === 'external' ? $l['href'] : (preg_match('#^/(en|bs)(/.*)?$#', $l['href'], $m) ? home_url(rtrim($l['href'], '/') . '/') : $l['href']); }
}
function hc_p($s) { return '<p>' . esc_html($s) . '</p>'; }

function hc_kv($items, $tone, $extra = '') {
    $rows = [];
    foreach ($items as $f) $rows[] = HC_El::con('row', [HC_El::text(hc_p($f['k']), 'k'), HC_El::text(hc_p($f['v']), 'v')], ['flex_direction' => 'row']);
    return HC_El::con("hc-kv hc-label is-$tone $extra", $rows);
}
function hc_deco_w($variant, $tone = 'dark', $desktopOnly = true) {
    return HC_El::shortcode("[hc_deco variant=\"$variant\" tone=\"$tone\"]", 'hc-deco-w' . ($desktopOnly ? ' dk' : ''));
}

function hc_b_hero($b, $c) {
    $E = 'HC_El'; $im = $c->img($b['image']['src'], $b['image']['alt']);
    $cnt = str_pad((string) count($c->rooms), 2, '0', STR_PAD_LEFT);
    $meta = null;
    if (!empty($b['meta'])) $meta = $E::con('hc-hero__meta hc-label hc-fade hc-immediate hc-d-12', array_map(function ($m) use ($cnt, $E) { return $E::text(hc_p(str_replace('{roomCount}', $cnt, $m))); }, $b['meta']), ['flex_direction' => 'row']);
    return $E::con('hc-hero hc-ink', [
        $E::image($im, 'hc-hero__img', $b['image']['position'] ?? ''),
        $E::con('hc-hero__body', [
            $E::heading($b['eyebrow'], 'p', 'hc-eyebrow hc-label hc-fade hc-immediate hc-d-6'),
            $E::heading($b['title'], 'h1', 'hc-display hc-lines hc-fit-90-13 hc-immediate hc-d-4 hc-h1'),
            !empty($b['intro']) ? $E::text(hc_p($b['intro']), 'hc-hero__intro hc-body hc-fade hc-immediate hc-d-10') : null,
        ]),
        $meta,
    ]);
}

function hc_b_split($b, $c) {
    $E = 'HC_El'; $tone = $b['tone'] ?? 'ivory'; $dark = in_array($tone, ['deep', 'olive', 'ink']); $rev = !empty($b['reverse']);
    $im = $b['images']; $main = $c->img($im[0]['src'], $im[0]['alt']); $second = isset($im[1]) ? $c->img($im[1]['src'], $im[1]['alt']) : 0;
    $media = $E::con('hc-split__media', [
        $E::image($main, 'main hc-photo hc-grade hc-reveal hc-par-4', $im[0]['position'] ?? ''),
        $second ? $E::image($second, 'second hc-photo hc-grade hc-reveal', $im[1]['position'] ?? '') : null,
    ]);
    $body = []; foreach ($b['body'] as $i => $p) $body[] = $E::text(hc_p($p), 'hc-body hc-fade' . ($i ? ' op-80' : ''));
    $extra = [];
    if (!empty($b['facts'])) $extra[] = hc_kv($b['facts'], $dark ? 'light' : 'dark', 'facts');
    if (!empty($b['bullets'])) $extra[] = $E::con('hc-bullets', [$E::text(hc_p($b['bullets']['title']), 'hc-label op-60'), $E::list_($b['bullets']['items'], 'hc-bullet-list hc-label')]);
    if (!empty($b['primary'])) {
        $row = [$E::button($b['primary']['label'], $c->link($b['primary']['link']), 'hc-pill-w hc-tone-' . ($dark ? 'light' : 'dark'), !empty($b['primary']['link']['external']))];
        if (!empty($b['secondary'])) $row[] = $E::button($b['secondary']['label'], $b['secondary']['link']['href'], 'hc-text-link hc-label', !empty($b['secondary']['link']['external']));
        $extra[] = $E::con('hc-split__cta', $row, ['flex_direction' => 'row']);
    }
    $text = $E::con('hc-split__text', [
        $E::heading($b['title'], 'h2', 'hc-title hc-lines hc-fit-84-12'),
        $E::con('hc-split__body', $body),
        $extra ? $E::con('hc-split__extra', $extra) : null,
    ]);
    return $E::con("hc-split hc-$tone" . ($rev ? ' is-rev' : ''), [
        !empty($b['line']) ? hc_deco_w($b['line'], $dark ? 'light' : 'dark') : null,
        $E::con('hc-split__top hc-label', [$E::text(hc_p($b['label'])), !empty($b['index']) ? $E::text(hc_p($b['index'])) : null], ['flex_direction' => 'row']),
        $E::con('hc-split__grid', [$media, $text]),
        $second ? $E::con('hc-split__pad') : null,
    ]);
}

function hc_b_facts($b, $c) {
    $E = 'HC_El';
    return $E::con('hc-factsec hc-ivory', [$E::con('g', [$E::text(hc_p($b['label']), 'hc-label'), hc_kv($b['items'], 'dark')])]);
}
function hc_b_statement($b, $c) {
    $E = 'HC_El'; $tone = $b['tone'] ?? 'ivory';
    return $E::con("hc-statement hc-$tone", [!empty($b['label']) ? $E::text(hc_p($b['label']), 'hc-label') : null, $E::text(hc_p($b['text']), 'stmt hc-fade')]);
}
function hc_b_gallery($b, $c) {
    $E = 'HC_El'; $tone = $b['tone'] ?? 'ivory'; $ims = [];
    foreach (array_slice($b['images'], 0, 5) as $i => $im) $ims[] = $E::image($c->img($im['src'], $im['alt']), 'hc-photo hc-grade hc-reveal' . ($i % 2 ? ' hc-rv-down' : ''), $im['position'] ?? '');
    return $E::con("hc-gallery hc-$tone", [!empty($b['label']) ? $E::text(hc_p($b['label']), 'hc-label') : null, $E::con('g', $ims)]);
}
function hc_b_final($b, $c, $imgSrc = null, $imgAlt = null) {
    $E = 'HC_El'; $d = $c->dict['home']['final'];
    $src = $b['image'] ?? '/images/3067.jpg'; $alt = $b['alt'] ?? 'A suite at Hotel Central with a double bed and seating area';
    return $E::con('hc-final hc-ink', [
        $E::image($c->img($src, $alt), 'hc-hero__img hc-tint-final'),
        $E::con('hc-final__in', [
            $E::heading($d['label'], 'p', 'hc-eyebrow hc-label hc-fade'),
            $E::heading($d['title'], 'h2', 'hc-display hc-lines hc-fit-90-13 hc-title'),
            $E::text(hc_p($d['body']), 'hc-body hc-fade hc-d-2'),
            $E::con('hc-final__acts hc-fade hc-d-3', [
                $E::button($d['cta'], hc_data_booking_url(), 'hc-pill-w hc-tone-light', true),
                $E::shortcode('[hc_info field="phone_display" link="tel"]', 'hc-label hc-phone-link'),
            ]),
        ]),
    ]);
}
function hc_data_booking_url() { return hc_info('booking_url'); }

function hc_b_arrival($b, $c) {
    $E = 'HC_El'; $items = [];
    foreach ($b['transport'] as $t) $items[] = $E::con('li', [$E::text(hc_p($t['title']), 'hc-label'), $E::text(hc_p($t['body']), 'hc-body op-85')]);
    return $E::con('hc-arrival hc-ivory', [
        hc_deco_w('location'),
        $E::con('hc-arrival__g', [
            $E::con('', [
                $E::shortcode('[hc_map]'),
                $E::con('hc-arrival__bar', [$E::shortcode('[hc_info_line]', 'hc-label'), $E::button($c->dict['common']['directions'], hc_info('directions'), 'hc-pill-w hc-tone-dark', true)], ['flex_direction' => 'row']),
            ]),
            $E::con('', [$E::text(hc_p('(01) ' . $b['label']), 'hc-label hc-mb-6'), $E::con('ol', $items)]),
        ]),
    ]);
}
function hc_b_contact($b, $c) {
    $E = 'HC_El'; $p = $c->dict['home']['final']; $d = $c->dict;
    $item = function ($label, $body, $link) use ($E) { return $E::con('li', [$E::text(hc_p($label), 'hc-label op-60'), $E::text(hc_p($body), 'hc-body'), $link]); };
    return $E::con('hc-contact hc-ivory', [
        hc_deco_w('hotel'),
        $E::con('hc-contact__g', [
            $E::con('', [
                $E::con('hc-contact__list', [
                    $item($b['office']['label'], $b['office']['body'], $E::shortcode('[hc_info field="phone_display" link="tel" arrow="1"]', 'hc-label')),
                    $item($b['reservations']['label'], $b['reservations']['body'], $E::button($d['nav']['book'], hc_info('booking_url'), 'hc-text-link hc-arrowed hc-label', true)),
                    $item($b['write']['label'], hc_info('email'), $E::shortcode('[hc_info field="email" link="mail" arrow="1" label="' . esc_attr($d['common']['email']) . '"]', 'hc-label')),
                    $item($b['social']['label'], $b['social']['body'], $E::button('Facebook', hc_info('facebook'), 'hc-text-link hc-arrowed hc-label', true)),
                ]),
                $E::shortcode('[hc_address]'),
            ]),
            $E::con('', [$E::heading($d['contact']['formTitle'], 'h2', 'hc-form-title'), $E::shortcode('[hc_contact_form]')]),
        ]),
    ]);
}

function hc_build_blocks($blocks, $c) {
    $out = [];
    foreach ($blocks as $b) {
        switch ($b['type']) {
            case 'hero': $out[] = hc_b_hero($b, $c); break;
            case 'split': $out[] = hc_b_split($b, $c); break;
            case 'facts': $out[] = hc_b_facts($b, $c); break;
            case 'statement': $out[] = hc_b_statement($b, $c); break;
            case 'gallery': $out[] = hc_b_gallery($b, $c); break;
            case 'finalBooking': $out[] = hc_b_final($b, $c); break;
            case 'arrival': $out[] = hc_b_arrival($b, $c); break;
            case 'contact': $out[] = hc_b_contact($b, $c); break;
            case 'roomList': $out[] = HC_El::con('hc-roomlist-w', [HC_El::shortcode('[hc_room_list]')]); break;
        }
    }
    return $out;
}

/* ───────── Homepage ───────── */
function hc_build_home($c) {
    $E = 'HC_El'; $h = $c->dict['home']; $d = $c->dict;
    $meta = function ($left, $center = '', $index = '', $right = '', $sub = '') use ($E) {
        $r = [];
        if ($index || $right) $r[] = $E::con('row', [$index ? $E::text(hc_p($index)) : null, $right ? $E::text(hc_p($right)) : null], ['flex_direction' => 'row']);
        if ($sub) $r[] = $E::text(hc_p($sub), 'sub');
        return $E::con('hc-meta hc-label', [$E::text(hc_p($left), 'l'), $center ? $E::text(hc_p($center), 'c') : null, $r ? $E::con('r', $r) : null], ['flex_direction' => 'row']);
    };
    $titleW = function ($lines, $extra = '') use ($E) { return $E::heading($lines, 'h2', "hc-title hc-lines $extra"); };
    $photo = function ($file, $alt, $pos, $cls, $extra = 'hc-grade') use ($c, $E) { return $E::image($c->img($file, $alt), "hc-photo hc-rect hc-reveal $extra $cls", $pos); };
    $s = [];

    // 1 Hero
    $s[] = $E::con('hc-home-hero hc-ink', [
        $E::image($c->img('3075.jpg', "Hotel Central's corner tower and façade on Ćumurija street, lit at night"), 'hc-hero__img', '50% 42%'),
        $E::con('hc-home-hero__in', [
            $E::con('hc-home-hero__main', [
                $E::heading($h['heroLabel'], 'p', 'hc-eyebrow hc-label hc-fade hc-immediate hc-d-9'),
                $E::heading($h['heroTitle'], 'h1', 'hc-display hc-lines hc-immediate hc-d-5 hc-h1 hc-hero-title'),
                $E::con('hc-home-hero__book hc-fade hc-immediate hc-d-12', [$E::shortcode('[hc_booking_bar]')]),
            ]),
            $E::con('hc-home-hero__cap hc-fade hc-immediate hc-d-16', [$E::text(hc_p($h['heroTagline']), 'hc-label'), $E::text(hc_p($h['heroNote']), 'note')]),
        ]),
        $E::shortcode('<span class="hc-cue" aria-hidden="true"></span>', 'hc-cue-w'),
    ]);

    // 2 The hotel
    $o = $h['hotel'];
    $s[] = $E::con('hc-sec hc-ivory hc-s-hotel', [
        $E::heading(implode(' ', $o['title']), 'h2', 'sr-only'),
        $E::con('hc-meta-wrap', [$meta($o['metaLeft'], $o['metaCenter'], $o['metaIndex'], $o['metaRight'], $o['metaRightSub'])]),
        $E::con('hc-art', [
            hc_deco_w('hotel', 'dark', false),
            $titleW($o['title'], 'base hc-op-r-center'),
            $photo('final-6230.jpg', 'Relaxation lounge of the Club & Spa with a forest mural', '38% 50%', 'r-left hc-par-4'),
            $photo('3064.jpg', "The white façade and corner tower of Hotel Central in Sarajevo's old town", '56% 30%', 'r-center hc-par-3 hc-veil', 'hc-grade hc-grade-dark'),
            $photo('dorucak5.jpg', 'Restaurant Central breakfast buffet', '50% 50%', 'r-right hc-par-4'),
        ]),
        $E::con('hc-copy', [$E::text(hc_p($o['body']), 'hc-body hc-fade'), $E::button($o['cta'], $c->url('/about'), 'hc-pill-w hc-tone-dark')]),
    ]);

    // 3 Rooms carousel
    $s[] = $E::con('hc-rc-w', [$E::shortcode('[hc_room_carousel]')]);

    // 4 Spa
    $o = $h['spa'];
    $s[] = $E::con('hc-sec hc-olive hc-s-spa', [
        $E::heading(implode(' ', $o['title']), 'h2', 'sr-only'),
        $E::con('hc-meta-wrap', [$meta($o['metaLeft'], $o['metaCenter'], '', $o['metaRight'])]),
        $E::con('hc-art', [
            hc_deco_w('spa', 'light'),
            $titleW($o['title'], 'hc-op-big'),
            $photo('3069.jpg', 'The heated 25-metre indoor pool with a wave mosaic', '50% 60%', 'big hc-par-5', 'hc-grade hc-grade-dark'),
            $photo('final-6202.jpg', 'Candle-lit treatment room of the day spa', '50% 50%', 'sm hc-par-6'),
        ]),
        $E::con('hc-copy', [$E::text(hc_p($o['body']), 'hc-body hc-fade'), $E::list_($o['facts'], 'hc-facts'), $E::button($o['cta'], $c->url('/spa'), 'hc-pill-w hc-tone-light')]),
    ]);

    // 5 Restaurant
    $o = $h['restaurant'];
    $s[] = $E::con('hc-sec hc-ivory hc-s-rest', [
        $E::heading(implode(' ', $o['title']), 'h2', 'sr-only'),
        $E::con('hc-meta-wrap', [$meta($o['metaLeft'], $o['metaCenter'], '', $o['metaRight'])]),
        hc_deco_w('restaurant'),
        $E::heading(hc_split_mobile($o['title']), 'div', 'hc-title hc-lines hc-fit-74-13 hc-op-coffee'),
        $E::con('hc-art', [
            $photo('hc-comfort-2.jpg', 'Breakfast tray with tea, croissants and a single rose', '50% 50%', 'main hc-par-4'),
            $photo('dorucak6.jpg', 'Bosnian coffee served in a copper džezva', '40% 50%', 'coffee hc-par-6'),
            $photo('dorucak4.jpg', 'The breakfast buffet at Restaurant Central', '50% 50%', 'buffet', 'hc-grade hc-rv-left'),
        ]),
        $E::con('hc-copy', [$E::text(hc_p($o['body']), 'hc-body hc-fade'), $E::text(hc_p($o['body2']), 'hc-body hc-fade op-75'), $E::button($o['cta'], $c->url('/restaurant'), 'hc-pill-w hc-tone-dark')]),
    ]);

    // 6 Location
    $o = $h['location'];
    $s[] = $E::con('hc-sec hc-deep hc-s-loc', [
        hc_deco_w('location', 'light'),
        $E::con('hc-meta-wrap', [$meta($o['metaLeft'], $o['metaCenter'], '', $o['metaRight'])]),
        $E::con('hc-loc__grid', [
            $E::con('hc-loc__l', [
                $E::heading($o['title'], 'h2', 'hc-title hc-lines hc-fit-82-13'),
                $E::con('hc-loc__sub', [
                    $E::text(hc_p($o['body']), 'hc-body hc-fade'),
                    $E::con('', [hc_kv(array_map(function ($f) { return ['k' => $f['k'], 'v' => $f['v']]; }, $o['facts']), 'split', 'hc-fade hc-d-1'), $E::shortcode('[hc_address_line]', 'hc-label hc-addr')]),
                ]),
                $E::con('hc-loc__acts', [$E::button($d['common']['directions'], hc_info('directions'), 'hc-pill-w hc-tone-light', true), $E::button($o['cta'], $c->url('/location'), 'hc-text-link hc-arrowed hc-label')], ['flex_direction' => 'row']),
            ]),
            $E::con('hc-loc__r', [
                $E::shortcode('[hc_map]', 'hc-fade'),
                $E::image($c->img('3064.jpg', "Hotel Central's corner tower on Ćumurija street"), 'hc-photo hc-grade hc-reveal hc-loc__photo', '62% 30%'),
            ]),
        ]),
    ]);

    // 7 Events
    $o = $h['events'];
    $s[] = $E::con('hc-sec hc-ivory hc-s-ev', [
        $E::heading(implode(' ', $o['title']), 'h2', 'sr-only'),
        $E::con('hc-art', [
            $E::image($c->img('3073.jpg', 'The conference room on the third floor set up for a meeting'), 'hc-photo hc-rect hc-reveal hc-grade hc-grade-dark hc-veil photo-main hc-par-4 hc-rv-right'),
            $titleW($o['title'], 'base hc-op-photo-main'),
            $E::image($c->img('img_9216.jpg', 'Chairs and microphones in the conference room'), 'hc-photo hc-rect hc-reveal hc-grade photo-2 hc-rv-down', '50% 50%'),
            $E::con('metas hc-label', [$E::text(hc_p($o['metaLeft'])), $E::text(hc_p($o['metaCenter'])), $E::text(hc_p($o['metaRight']))], ['flex_direction' => 'row']),
        ]),
        $E::con('hc-copy', [$E::text(hc_p($o['metaLeft'] . ' · ' . $o['metaRight']), 'hc-label mobile-meta'), $E::text(hc_p($o['body']), 'hc-body hc-fade'), $E::button($o['cta'], $c->url('/meetings-events'), 'hc-pill-w hc-tone-dark')]),
    ]);

    // 8 Final booking
    $s[] = hc_b_final(['image' => '/images/3067.jpg'], $c);
    return $s;
}
function hc_split_mobile($lines) {
    if (count($lines) < 2) return $lines;
    $b = $lines[1]; $words = explode(' ', $b);
    if (count($words) < 2 || mb_strlen($b) <= 11) return $lines;
    $cut = (int) ceil(count($words) / 2);
    return [$lines[0], implode(' ', array_slice($words, 0, $cut)), implode(' ', array_slice($words, $cut))];
}
