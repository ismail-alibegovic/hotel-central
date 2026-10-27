<?php
/**
 * Elementor "Saved Templates" library: one ready-made, on-brand template for every section type of the website.
 * Insert in the editor: click the folder icon ("Add Template") → My Templates → Insert. Then replace text and photographs.
 * Section templates are container templates (`hc/section/*`), page templates start a whole page (`hc/page/*`).
 */
require_once __DIR__ . '/pages.php';

function hc_b_band($c, $tone = 'ivory', $title = ['A short', 'headline'], $text = 'Write one or two sentences here. Select this text in the editor to change it.', $cta = 'Call to action') {
    $E = 'HC_El'; $dark = in_array($tone, ['deep', 'olive', 'ink']);
    return $E::con("hc-band hc-$tone", [$E::con('hc-band__in', [
        $E::heading($title, 'h2', 'hc-title hc-lines hc-fit-84-12'),
        $E::text(hc_p($text), 'hc-body hc-fade'),
        $E::button($cta, '#', 'hc-pill-w hc-tone-' . ($dark ? 'light' : 'dark')),
    ])]);
}
function hc_b_native_map($c) {
    $E = 'HC_El';
    return $E::con('hc-mapsec hc-ivory', [$E::con('hc-mapsec__g', [
        $E::w('google_maps', ['address' => 'Hotel Central, Ćumurija 8, 71000 Sarajevo', 'zoom' => ['unit' => 'px', 'size' => 15], 'height' => ['unit' => 'px', 'size' => 460]], 'hc-map-w'),
        $E::con('hc-mapsec__t', [
            $E::text(hc_p('(01) Getting here'), 'hc-label'),
            $E::heading(['Find us', 'in the centre'], 'h2', 'hc-title hc-lines hc-fit-84-12'),
            $E::text(hc_p('Type any address into the map widget on the left (Content → Address). Describe the way here in a few lines.'), 'hc-body'),
            $E::button('Get directions', hc_info('directions'), 'hc-pill-w hc-tone-dark', true),
        ]),
    ])]);
}
function hc_b_dynamic($shortcode, $cls, $tone = 'deep') {
    return HC_El::con("hc-dyn hc-$tone $cls", [HC_El::shortcode($shortcode)]);
}

/** @return array<string, array{title:string,type:string,elements:array}> */
function hc_template_defs($c) {
    $E = 'HC_El'; $T = [];
    $img = fn($f, $alt = 'Replace this photograph') => ['src' => "/images/$f", 'alt' => $alt];
    $hero = ['type' => 'hero', 'image' => $img('3064.jpg'), 'eyebrow' => 'Eyebrow line', 'title' => ['Page', 'title'], 'intro' => 'Write a short introduction to this page here.', 'meta' => ['Hotel Central', '(Section)', 'Ćumurija 8']];
    $split = fn($tone, $rev, $line) => ['type' => 'split', 'tone' => $tone, 'reverse' => $rev, 'label' => '(01) Section label', 'index' => 'Hotel Central, Sarajevo', 'title' => ['Section', 'title'],
        'body' => ['Write the main paragraph of this section here. Keep it short and warm.', 'A second, quieter paragraph is optional — delete it if you do not need it.'], 'line' => $line,
        'images' => [$img('3075.jpg'), $img('p11.jpg')], 'primary' => ['label' => 'Call to action', 'link' => ['kind' => 'internal', 'href' => '#', 'external' => false]]];
    $splitFacts = $split('ivory', false, 'hotel'); $splitFacts['facts'] = [['k' => 'Label', 'v' => 'Value'], ['k' => 'Label', 'v' => 'Value'], ['k' => 'Label', 'v' => 'Value']]; unset($splitFacts['primary']);
    $gal = fn($tone) => ['type' => 'gallery', 'tone' => $tone, 'images' => array_map(fn($f) => $img($f), ['p05.jpg', 'final-6202.jpg', '3073.jpg', 'dorucak5.jpg', 'junior02.jpg'])];
    $final = ['image' => '/images/3067.jpg', 'alt' => 'Replace this photograph'];
    $sec = function ($key, $title, $el) use (&$T) { $T["hc/section/$key"] = ['title' => "HC · $title", 'type' => 'container', 'elements' => [$el]]; };

    $sec('hero', 'Page hero (photo, title, intro, meta row)', hc_b_hero($hero, $c));
    $sec('split-light', 'Editorial split — light, photo left', hc_b_split($split('ivory', false, 'hotel'), $c));
    $sec('split-light-reverse', 'Editorial split — light, photo right', hc_b_split($split('ivory', true, 'hotel'), $c));
    $sec('split-deep', 'Editorial split — deep olive, photo left', hc_b_split($split('deep', false, 'rooms'), $c));
    $sec('split-deep-reverse', 'Editorial split — deep olive, photo right', hc_b_split($split('deep', true, 'rooms'), $c));
    $sec('split-olive', 'Editorial split — olive, photo left', hc_b_split($split('olive', false, 'spa'), $c));
    $sec('split-olive-reverse', 'Editorial split — olive, photo right', hc_b_split($split('olive', true, 'spa'), $c));
    $sec('split-facts', 'Editorial split with fact table', hc_b_split($splitFacts, $c));
    $sec('facts', 'Fact table (label / value rows)', hc_b_facts(['label' => 'Facilities', 'items' => [['k' => 'Label', 'v' => 'Value'], ['k' => 'Label', 'v' => 'Value'], ['k' => 'Label', 'v' => 'Value'], ['k' => 'Label', 'v' => 'Value']]], $c));
    $sec('statement', 'Large statement', hc_b_statement(['label' => '(—)', 'text' => 'One sentence that says what makes this place special.', 'tone' => 'ivory'], $c));
    $sec('gallery-light', 'Photo gallery — light', hc_b_gallery($gal('ivory'), $c));
    $sec('gallery-deep', 'Photo gallery — deep olive', hc_b_gallery($gal('deep'), $c));
    $sec('gallery-olive', 'Photo gallery — olive', hc_b_gallery($gal('olive'), $c));
    $sec('band-light', 'Text band + button — light', hc_b_band($c, 'ivory'));
    $sec('band-deep', 'Text band + button — dark', hc_b_band($c, 'deep'));
    $sec('final-booking', 'Booking call-to-action (full-width photo)', hc_b_final($final, $c));
    $sec('arrival', 'Map + arrival list (uses Hotel Information)', hc_b_arrival(['label' => 'Getting here', 'transport' => [['title' => 'By taxi', 'body' => 'Describe this option.'], ['title' => 'By tram', 'body' => 'Describe this option.'], ['title' => 'On foot', 'body' => 'Describe this option.']]], $c));
    $sec('map-native', 'Map + text (Elementor Google Maps widget, any address)', hc_b_native_map($c));
    $sec('contact', 'Contact details + enquiry form', hc_b_contact(['office' => ['label' => 'Hotel office', 'body' => 'Please contact our hotel office for all general questions.'], 'reservations' => ['label' => 'Reservation office', 'body' => 'We have agents waiting to talk to you about your hotel booking.'], 'write' => ['label' => 'Send us an email'], 'social' => ['label' => 'Social media', 'body' => 'Visit us on Facebook for the latest updates and news.']], $c));
    $sec('rooms-list', 'Rooms list (automatic, from Rooms & Suites)', hc_b_dynamic('[hc_room_list]', 'hc-dyn--rooms'));
    $sec('rooms-carousel', 'Rooms carousel (automatic, from Rooms & Suites)', HC_El::con('hc-rc-w', [HC_El::shortcode('[hc_room_carousel]')]));
    $sec('offers', 'Offers grid (automatic, from Offers)', HC_El::con('hc-offers hc-ivory', [HC_El::heading(['Offers'], 'h2', 'hc-title hc-lines hc-fit-84-12'), HC_El::shortcode('[hc_offers limit="6"]')]));
    $home = hc_build_home($c);
    $sec('home-hero', 'Homepage hero with booking bar', $home[0]);
    $sec('composition-hotel', 'Artboard — three photos + overprinted title', $home[1]);
    $sec('composition-spa', 'Artboard — large photo, small photo, facts (olive)', $home[3]);
    $sec('composition-restaurant', 'Artboard — staggered photos, title, text', $home[4]);
    $sec('composition-location', 'Artboard — title, fact list, map + photo (dark)', $home[5]);
    $sec('composition-events', 'Artboard — half-page photo + title', $home[6]);

    $T['hc/page/landing'] = ['title' => 'HC · Page — landing page (hero, text, gallery, booking CTA)', 'type' => 'page', 'elements' => [hc_b_hero($hero, $c), hc_b_band($c, 'ivory'), hc_b_gallery($gal('deep'), $c), hc_b_final($final, $c)]];
    $T['hc/page/content'] = ['title' => 'HC · Page — content page (hero, two editorial splits, booking CTA)', 'type' => 'page', 'elements' => [hc_b_hero($hero, $c), hc_b_split($split('ivory', false, 'hotel'), $c), hc_b_split($split('deep', true, 'rooms'), $c), hc_b_final($final, $c)]];
    $T['hc/page/starter'] = ['title' => 'HC · Page — starter (hero and booking CTA only)', 'type' => 'page', 'elements' => [hc_b_hero($hero, $c), hc_b_final($final, $c)]];
    return $T;
}

/** Create or refresh the library (never overwrites a template an editor has changed, unless $reset). */
function hc_seed_templates($c, $reset, $say) {
    $src = \Elementor\Plugin::$instance->templates_manager->get_source('local');
    $n = 0; $kept = 0;
    foreach (hc_template_defs($c) as $key => $t) {
        global $wpdb;
        $id = (int) $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_hc_template_key' AND meta_value=%s LIMIT 1", $key));
        $json = wp_json_encode($t['elements']);
        if ($id && get_post($id) && get_post_status($id) !== 'trash') {
            $stored = (string) get_post_meta($id, '_elementor_data', true);
            $pristine = $stored !== '' && md5($stored) === get_post_meta($id, '_hc_seed_hash', true);
            if (!$reset && !$pristine) { $kept++; continue; }
            $doc = \Elementor\Plugin::$instance->documents->get($id, false);
            $doc->save(['elements' => $t['elements'], 'settings' => []]);
        } else {
            $r = $src->save_item(['type' => $t['type'], 'title' => $t['title'], 'content' => $t['elements'], 'page_settings' => []]);
            if (is_wp_error($r)) { $say("template $key: " . $r->get_error_message()); continue; }
            $id = (int) $r; update_post_meta($id, '_hc_template_key', $key);
        }
        update_post_meta($id, '_hc_seed_hash', md5((string) get_post_meta($id, '_elementor_data', true)));
        $n++;
    }
    $say("template library: $n created/refreshed, $kept left untouched (edited)");
}
