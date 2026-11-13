<?php
/**
 * Round 1 (Nov 2026): Central Fitness Club and Central Day Spa — Elementor page builders.
 *
 * Content: content/club.json and content/dayspa.json (exported from src/content/club.ts and dayspa.ts).
 * The sections reuse the hotel's own building blocks (hero, split, facts, call-to-action, opening hours), so they are edited
 * exactly like every other page. The distinct brand (colours, display face, logo, sub-navigation) comes from the page's
 * "Brand" setting (body class hc-brand-club / hc-brand-spa), not from different markup — see theme/hotel-central/assets/css/hc.css.
 */
require_once __DIR__ . '/pages.php';

function hc_ph($c, $file, $en, $bs, $pos = '50% 50%') { return ['src' => "/images/$file", 'alt' => hc_alt($c, $en, $bs), 'position' => $pos]; }
function hc_contact_btns($c, $callLabel, $mailLabel) {
    $E = 'HC_El';
    return [
        $E::button($callLabel . ' ' . hc_info('phone_display'), hc_info('phone_href'), 'hc-pill-w hc-tone-light'),
        $E::button($mailLabel, 'mailto:' . hc_info('email'), 'hc-text-link hc-arrowed hc-label'),
    ];
}

/* ───────── Central Fitness Club: home ───────── */
function hc_build_club($c, $K) {
    $E = 'HC_El'; $o = $K[$c->lang]; $s = [];
    $s[] = hc_b_hero([
        'image' => hc_ph($c, 'cardio-treadmill.jpg', 'A member running on a treadmill by the tall windows of the club', 'Članica trči na traci uz visoke prozore kluba', '50% 40%'),
        'eyebrow' => $o['hero']['eyebrow'], 'title' => $o['hero']['title'], 'intro' => $o['hero']['intro'],
        'meta' => array_map(function ($x) { return $x['v'] . ' · ' . $x['k']; }, $o['stats']),
    ], $c);
    $g = $o['gym'];
    $s[] = hc_b_split(['tone' => 'ivory', 'label' => $g['label'], 'title' => $g['title'], 'body' => $g['body'],
        'images' => [hc_ph($c, 'kettlebells-window.jpg', 'Rows of kettlebells and sandbags under the windows', 'Redovi girja i vreća s pijeskom ispod prozora'), hc_ph($c, 'dumbbell-rack.jpg', 'Dumbbell rack in front of the mirrored weights floor', 'Stalak sa bučicama ispred zone sa tegovima')],
        'bullets' => ['title' => $g['equipment']['title'], 'items' => $g['equipment']['items']]], $c);
    $k = $o['classes'];
    $s[] = hc_b_split(['tone' => 'deep', 'reverse' => true, 'label' => $k['label'], 'title' => $k['title'], 'body' => [$k['body']],
        'images' => [hc_ph($c, 'studio-window.jpg', 'Stretching on a mat in the group exercise studio', 'Istezanje na prostirci u studiju za grupne treninge'), hc_ph($c, 'studio-roller.jpg', 'Mobility work with a foam roller in the studio', 'Vježbe mobilnosti s valjkom u studiju')],
        'bullets' => ['title' => $o['nav']['timetable'], 'items' => $k['list']],
        'primary' => ['label' => $k['cta'], 'link' => ['href' => $c->url('/centralfitnessclub/timetable')]]], $c);
    $p = $o['pool'];
    $s[] = hc_b_split(['tone' => 'ivory', 'label' => $p['label'], 'title' => $p['title'], 'body' => [$p['body']],
        'images' => [hc_ph($c, 'pool-lanes.jpg', 'Steps into the 25-metre pool between mosaic columns', 'Stepenice u bazen od 25 metara između stubova s mozaikom', '50% 60%'), hc_ph($c, 'pool-hydro.jpg', 'Hydrotherapy pools with water cascades beside the main pool', 'Hidroterapijski bazeni s vodenim kaskadama pored glavnog bazena')],
        'bullets' => ['title' => $p['label'], 'items' => $p['facts']]], $c);
    $s[] = hc_b_hours($o['hours'], 'gym,pool', $c, [
        ['cardio-elliptical.jpg', hc_alt($c, 'A member on the elliptical trainer beneath the “Feel your power” sign', 'Članica na eliptičnom trenažeru ispod natpisa „Feel your power”'), '50% 40%'],
        ['dumbbell-rack.jpg', hc_alt($c, 'Dumbbell rack in front of the mirrored weights floor', 'Stalak sa bučicama ispred zone sa tegovima'), '50% 50%'],
    ], 'ivory', 'hours');
    $s[] = hc_club_join($c, $o);
    return $s;
}
function hc_club_join($c, $o) {
    $E = 'HC_El'; $j = $o['join'];
    $split = hc_b_split(['tone' => 'deep', 'label' => '(—) ' . $o['nav']['contact'], 'title' => $j['title'], 'body' => [$j['body']],
        'images' => [hc_ph($c, 'merch.jpg', 'Central Fitness Club T-shirt and water bottle', 'Majica i boca Central Fitness Cluba')]], $c);
    $split['settings']['_element_id'] = 'join';
    // call + e-mail + membership as the section's actions
    $split['elements'][] = $E::con('hc-split__cta hc-join-acts', array_merge(hc_contact_btns($c, $j['call'], $j['email']), [$E::button($j['membership'], $c->url('/centralfitnessclub/membership'), 'hc-text-link hc-arrowed hc-label')]), ['flex_direction' => 'row']);
    return $split;
}

/* ───────── Central Fitness Club: membership (CH-011) ───────── */
function hc_build_club_membership($c, $K) {
    $E = 'HC_El'; $o = $K[$c->lang]; $m = $o['membership']; $s = [];
    $s[] = hc_b_hero(['image' => hc_ph($c, 'kettlebells-window.jpg', 'Rows of kettlebells and sandbags under the windows', 'Redovi girja i vreća s pijeskom ispod prozora'), 'eyebrow' => $m['hero']['eyebrow'], 'title' => $m['hero']['title'], 'intro' => $m['hero']['intro']], $c);
    $s[] = $E::con('hc-factsec hc-ivory', [$E::con('g', [$E::text(hc_p($m['includedLabel']), 'hc-label'), $E::list_($m['included'], 'hc-included hc-label')])]);
    $rows = [];
    foreach ($K['memberships'] as $ms) $rows[] = hc_price_row($ms['name'][$c->lang], $m['perPeriod'] . ' ' . $ms['period'][$c->lang], $ms['price'] . ' KM', array_map(function ($x) use ($c) { return $x[$c->lang]; }, $ms['includes'] ?? []));
    $s[] = $rows
        ? $E::con('hc-pricesec hc-ivory', [$E::con('hc-pricegroup', array_merge([$E::text(hc_p($m['optionsLabel']), 'hc-label op-60')], $rows))])
        : hc_b_cta(['tone' => 'deep', 'label' => $m['optionsLabel'], 'title' => $m['hero']['title'], 'body' => $m['pending'],
            'primary' => ['label' => $o['join']['call'] . ' ' . hc_info('phone_display'), 'link' => ['href' => hc_info('phone_href')]],
            'secondary' => ['label' => $o['join']['email'], 'link' => ['href' => 'mailto:' . hc_info('email')]]], $c);
    $s[] = hc_club_join($c, $o);
    return $s;
}

/* ───────── Central Fitness Club: class timetable (CH-012) ───────── */
function hc_build_club_timetable($c, $K) {
    $E = 'HC_El'; $o = $K[$c->lang]; $t = $o['timetableCopy']; $s = [];
    $s[] = hc_b_hero(['image' => hc_ph($c, 'studio-window.jpg', 'Stretching on a mat in the group exercise studio', 'Istezanje na prostirci u studiju za grupne treninge'), 'eyebrow' => $t['hero']['eyebrow'], 'title' => $t['hero']['title'], 'intro' => $t['hero']['intro']], $c);
    $slots = $K['timetable']['slots'] ?? [];
    if ($slots) {
        $days = [];
        foreach ($t['days'] as $i => $dn) {
            $rows = [];
            foreach ($slots as $sl) if ((int) $sl['day'] === $i + 1) $rows[] = hc_price_row($sl['name'][$c->lang], $sl['place'][$c->lang] ?? '', $sl['start'] . '–' . $sl['end']);
            $days[] = $E::con('hc-pricegroup', array_merge([$E::heading($dn, 'h3', 'hc-pricegroup__t')], $rows ?: [$E::text(hc_p($t['noClasses']), 'hc-body op-60')]));
        }
        $s[] = $E::con('hc-pricesec hc-ivory', [$E::text(hc_p($t['label'] . (isset($K['timetable']['month']) ? ' · ' . $K['timetable']['month'][$c->lang] : '')), 'hc-label op-60'), $E::con('hc-pricesec__g', $days)]);
    } else {
        $s[] = $E::con('hc-factsec hc-ivory', [$E::con('g', [
            $E::text(hc_p($t['label']), 'hc-label'),
            $E::con('', [$E::text(hc_p($t['pending']), 'hc-body'), $E::shortcode('[hc_info field="phone_display" link="tel" arrow="1"]', 'hc-label hc-mt-4'),
                $E::text(hc_p($t['classesLabel']), 'hc-label op-60 hc-mt-8'), $E::list_($o['classes']['list'], 'hc-included hc-label')]),
        ])]);
    }
    $s[] = hc_club_join($c, $o);
    return $s;
}

/* One editable price/timetable row: three text widgets (name · detail · price), plus optional "includes" lines. */
function hc_price_row($name, $detail, $price, $includes = []) {
    $E = 'HC_El';
    $kids = [$E::text(hc_p($name), 'n'), $E::text(hc_p($detail), 'd'), $E::text(hc_p($price), 'p')];
    if ($includes) $kids[] = $E::text('<p>' . esc_html(implode(' · ', $includes)) . '</p>', 'i');
    return $E::con('hc-price', $kids, ['flex_direction' => 'row']);
}

/* ───────── Central Day Spa (CH-013) ───────── */
function hc_build_dayspa($c, $S) {
    $E = 'HC_El'; $o = $S[$c->lang]; $L = $c->lang; $s = [];
    $book = $S['booking'][$L];
    $s[] = hc_b_hero(['image' => hc_ph($c, 'treatment-room.jpg', 'A treatment room in warm light, with the balneo bath behind a string curtain', 'Tretman soba u toplom svjetlu, s balneo kadom iza zavjese od niti', '50% 55%'),
        'eyebrow' => $o['hero']['eyebrow'], 'title' => $o['hero']['title'], 'intro' => $o['hero']['intro']], $c);
    $i = $o['intro'];
    $intro = hc_b_split(['tone' => 'ivory', 'label' => $i['label'], 'title' => $i['title'], 'body' => $i['body'],
        'images' => [hc_ph($c, 'pedicure-room.jpg', 'A treatment room seen through a string curtain, with an orchid on the shelf', 'Tretman soba viđena kroz zavjesu od niti, s orhidejom na polici'), hc_ph($c, 'maderotherapy.jpg', 'Wooden maderotherapy tools laid out on a towel', 'Drveni alati za maderoterapiju na peškiru')],
        'primary' => ['label' => $o['book']['online'], 'link' => ['href' => $book, 'external' => true]],
        'secondary' => ['label' => $o['nav']['treatments'], 'link' => ['href' => '#treatments']]], $c);
    $intro['settings']['_element_id'] = 'spa';
    $s[] = $intro;
    $s[] = hc_b_statement(['tone' => 'deep', 'text' => $o['perk']], $c);
    // Treatments & prices: every row is three ordinary text widgets — click a price in Elementor and type the new one.
    $m = $o['menu']; $groups = [];
    foreach ($S['treatmentGroups'] as $g) {
        $rows = [];
        foreach ($g['items'] as $it) $rows[] = hc_price_row($it['name'][$L], !empty($it['minutes']) ? $it['minutes'] . ' ' . $m['min'] : '', $L === 'bs' ? $it['price'] . ' KM' : 'KM ' . $it['price'], array_map(function ($x) use ($L) { return $x[$L]; }, $it['includes'] ?? []));
        $groups[] = $E::con('hc-pricegroup', array_merge([$E::heading($g['name'][$L], 'h3', 'hc-pricegroup__t')], $rows));
    }
    $s[] = $E::con('hc-pricesec hc-ivory', [
        $E::con('hc-pricesec__head', [$E::con('', [$E::text(hc_p($m['label']), 'hc-label op-60'), $E::heading($m['title'], 'h2', 'hc-title hc-lines')]), $E::text(hc_p($m['note']), 'hc-label op-60')], ['flex_direction' => 'row']),
        $E::con('hc-pricesec__g', $groups),
    ], ['_element_id' => 'treatments']);
    $b = $o['book'];
    $bk = hc_b_split(['tone' => 'deep', 'reverse' => true, 'label' => '(—) ' . $o['nav']['contact'], 'title' => $b['title'], 'body' => [$b['body'], $o['perk']],
        'images' => [hc_ph($c, 'facial.jpg', 'A facial treatment in progress', 'Tretman lica u toku')],
        'primary' => ['label' => $b['online'], 'link' => ['href' => $book, 'external' => true]]], $c);
    $bk['settings']['_element_id'] = 'book';
    $bk['elements'][] = $E::con('hc-split__cta hc-join-acts', hc_contact_btns($c, $b['call'], $b['email']), ['flex_direction' => 'row']);
    $s[] = $bk;
    $s[] = hc_b_hours($o['hours'], 'spa,pool', $c, [
        ['product-cabinet.jpg', hc_alt($c, "Glass cabinet with the spa's oils and skincare products", 'Vitrina sa uljima i kozmetikom spa centra'), '50% 50%'],
        ['yin-yang.jpg', hc_alt($c, 'Yin-yang inlay in the wooden floor of a treatment room', 'Yin-yang intarzija u drvenom podu tretman sobe'), '50% 50%'],
    ], 'ivory', 'hours');
    return $s;
}
