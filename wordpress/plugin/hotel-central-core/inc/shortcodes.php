<?php
if (!defined('ABSPATH')) exit;

function hc_pad($n) { return str_pad((string) $n, 2, '0', STR_PAD_LEFT); }
function hc_photo($att_id, $alt, $pos = '50% 50%', $cls = '', $reveal = 'up', $par = 0, $style = '') {
    $c = 'hc-photo hc-grade' . ($reveal ? ' hc-reveal' : '') . ($par ? ' hc-par' : '') . ' ' . $cls;
    return '<div class="' . esc_attr($c) . '"' . ($reveal ? ' data-reveal="' . esc_attr($reveal) . '"' : '') . ($par ? ' data-par="' . (int) $par . '"' : '') . ' style="--op:' . esc_attr($pos) . ';' . esc_attr($style) . '">' . hc_img($att_id, $alt) . '</div>';
}

/* ───────── [hc_booking_bar] — hero booking interface, posts to the hotel's eZee engine ───────── */
add_shortcode('hc_booking_bar', function ($a) {
    $a = shortcode_atts(['drop_up' => ''], $a);
    $cfg = [
        'action' => hc_info('booking_action'), 'calFormat' => hc_info('cal_format'), 'maxAdults' => (int) hc_info('max_adults'), 'maxChildren' => (int) hc_info('max_children'), 'maxRooms' => (int) hc_info('max_rooms'),
        'locale' => hc_lang() === 'bs' ? 'bs-BA' : 'en-GB',
        't' => [
            'dates' => hc_t('booking.dates'), 'rooms' => hc_t('booking.rooms'), 'room' => hc_t('booking.room'), 'roomsPlural' => hc_t('booking.roomsPlural'), 'guests' => hc_t('booking.guests'),
            'adults' => hc_t('booking.adults'), 'children' => hc_t('booking.children'), 'selectDates' => hc_t('booking.selectDates'), 'night' => hc_t('booking.night'), 'nightsPlural' => hc_t('booking.nightsPlural'),
            'clear' => hc_t('booking.clear'), 'done' => hc_t('booking.done'), 'prevMonth' => hc_t('booking.prevMonth'), 'nextMonth' => hc_t('booking.nextMonth'),
            'weekdays' => hc_ta('booking.weekdays'), 'months' => hc_ta('booking.months'),
        ],
    ];
    $chev = '<svg aria-hidden="true" class="hc-bb__chev" viewBox="0 0 7 4"><path d="M0 0h7L3.5 4z" fill="currentColor"/></svg>';
    ob_start(); ?>
    <div class="hc-bb<?php echo $a['drop_up'] ? ' drop-up' : ''; ?>" data-hc-bb data-config="<?php echo esc_attr(wp_json_encode($cfg)); ?>">
        <form action="<?php echo esc_url(hc_info('booking_action')); ?>" method="post" target="_blank" hidden>
            <input type="hidden" name="eZ_chkin"><input type="hidden" name="eZ_chkout"><input type="hidden" name="eZ_Nights">
            <input type="hidden" name="eZ_adult" value="2"><input type="hidden" name="eZ_child" value="0"><input type="hidden" name="eZ_room" value="1">
            <input type="hidden" name="calformat" value="<?php echo esc_attr(hc_info('cal_format')); ?>"><input type="hidden" name="hidBodyLanguage" value="en">
        </form>
        <div class="hc-bb__row">
            <button type="button" class="hc-bb__field" data-panel="dates" aria-expanded="false"><span data-v="dates"><?php echo esc_html(hc_t('booking.dates')); ?></span><?php echo $chev; ?></button>
            <button type="button" class="hc-bb__field" data-panel="rooms" aria-expanded="false"><span data-v="rooms">1 <?php echo esc_html(hc_t('booking.room')); ?></span><?php echo $chev; ?></button>
            <button type="button" class="hc-bb__field" data-panel="guests" aria-expanded="false"><span data-v="guests">2 / 0</span><?php echo $chev; ?></button>
            <div class="hc-bb__go"><button type="button" class="hc-pill hc-pill-light" data-go aria-describedby="hc-bb-note"><span><?php echo esc_html(hc_t('booking.go')); ?></span></button><span id="hc-bb-note" class="sr-only"><?php echo esc_html(hc_t('booking.opensNew')); ?></span></div>
        </div>
    </div>
    <?php return ob_get_clean();
});

/* ───────── [hc_room_carousel] — homepage rooms carousel ───────── */
function hc_serif_size($lines, $measure, $max) {
    $longest = 1; foreach ($lines as $l) $longest = max($longest, mb_strlen($l));
    return round(min($max, $measure / ($longest * 0.7)), 2);
}
function hc_rc_payload($rooms) {
    $out = [];
    foreach ($rooms as $r) {
        $im = $r['images'][0] ?? null;
        $out[] = [
            'name' => $r['name'], 'size' => $r['size_label'], 'feature' => $r['feature'], 'lines' => $r['title_lines'], 'list' => array_slice($r['highlights'], 0, 8),
            'url' => $r['url'], 'book' => hc_room_booking_url($r['type_id']),
            'img' => $im ? wp_get_attachment_image_url($im['id'], 'full') : '', 'alt' => $im['alt'] ?? $r['name'], 'pos' => $im['pos'] ?? '50% 50%',
            'fsD' => hc_serif_size($r['title_lines'], 42, 7.15) . 'cqw', 'fsM' => hc_serif_size($r['title_lines'], 90, 15) . 'cqw',
        ];
    }
    return $out;
}
function hc_rc_layer($r) {
    $o = '<div class="hc-rc__layer" style="--fs-d:' . $r['fsD'] . ';--fs-m:' . $r['fsM'] . '"><p class="hc-rc__feat"><span>' . esc_html($r['feature']) . '</span></p><div class="hc-rc__name">';
    foreach ($r['lines'] as $l) $o .= '<span class="ln"><span>' . esc_html($l) . '</span></span>';
    return $o . '</div></div>';
}
add_shortcode('hc_room_carousel', function () {
    $rooms = hc_rooms();
    if (!$rooms) return '';
    $data = hc_rc_payload($rooms); $r = $data[0]; $total = count($rooms);
    $labels = ['metaLeft' => '', 'next' => hc_t('common.next'), 'prev' => hc_t('common.previous')];
    $d = hc_page_text('home_rooms');
    $amen = function ($list) { $o = '<ul class="hc-rc__list">'; foreach ($list as $x) $o .= '<li>' . esc_html($x) . '</li>'; return $o . '</ul>'; };
    $actions = '<div class="hc-rc__actions"><a class="hc-pill hc-pill-light no-arrow" data-book href="' . esc_url($r['book']) . '" target="_blank" rel="noopener noreferrer"><span>' . esc_html(hc_t('common.checkAvailability')) . '</span></a><a data-view class="hc-label hc-link-line" style="display:flex;gap:12px;align-items:center" href="' . esc_url($r['url']) . '">' . esc_html(hc_t('common.viewRoom')) . ' ' . hc_arrow() . '</a></div>';
    $controls = '<button type="button" data-prev aria-label="' . esc_attr($labels['prev']) . '">' . hc_arrow_left() . '</button><p class="hc-label-sm" aria-hidden="true" style="font-variant-numeric:tabular-nums"><span data-idx>01</span>/' . hc_pad($total) . '</p><button type="button" data-next aria-label="' . esc_attr($labels['next']) . '">' . hc_arrow() . '</button>';
    ob_start(); ?>
    <section class="hc-rc" data-hc-rc data-rooms="<?php echo esc_attr(wp_json_encode($data)); ?>" aria-roledescription="carousel" aria-label="<?php echo esc_attr(hc_t('nav.rooms')); ?>">
        <div class="hc-rc__mh hc-label"><p><?php echo esc_html($d['left']); ?></p><p><?php echo esc_html($d['center']); ?></p></div>
        <div class="hc-rc__art">
            <?php echo hc_deco('rooms', 'light'); ?>
            <div class="hc-label hc-rc__meta" style="left:2.54%;top:4.85%"><?php echo esc_html($d['left']); ?></div>
            <div class="hc-rc__meta" style="left:53.76%;top:4.85%;width:18.6%"><p class="hc-label"><?php echo esc_html($d['center']); ?></p><p style="margin-top:.9em;font-size:.82cqw;line-height:1.45;opacity:.9"><?php echo esc_html($d['body']); ?></p></div>
            <div class="hc-label hc-rc__meta" style="left:78.7%;top:4.85%" aria-live="polite"><p style="display:flex;gap:3.4em"><span style="font-variant-numeric:tabular-nums">(<span data-idx>01</span>)</span><span><?php echo esc_html($d['right']); ?></span></p><p class="hc-rc__fadeswap" data-meta style="margin-top:.4em;opacity:.8"><?php echo esc_html($r['name']); ?><br><?php echo esc_html($r['size']); ?></p></div>
            <div class="hc-rc__base" style="position:absolute;inset:0;z-index:1;pointer-events:none"><?php echo hc_rc_layer($r); ?></div>
            <div class="hc-rc__frame" data-frame><div class="hc-rc__slide"><img src="<?php echo esc_url($r['img']); ?>" alt="<?php echo esc_attr($r['alt']); ?>" style="object-position:<?php echo esc_attr($r['pos']); ?>"></div></div>
            <div class="hc-rc__over" aria-hidden="true" inert><?php echo hc_rc_layer($r); ?></div>
            <button type="button" class="hc-rc__next" data-next aria-label="<?php echo esc_attr($labels['next']); ?>"><span class="hc-label-sm"><?php echo esc_html($labels['next']); ?></span></button>
            <div class="hc-rc__dk" style="bottom:10.9%;left:53.76%" data-actions><?php echo $actions; ?></div>
            <div class="hc-rc__dk" style="bottom:10.9%;left:78.7%;font-size:.74cqw;text-transform:uppercase;line-height:1.5;letter-spacing:.1em"><div class="hc-rc__fadeswap" data-amen><?php echo $amen($r['list']); ?></div></div>
            <div class="hc-rc__dk hc-rc__ctl" style="left:2.54%;top:91.4%;width:45.66%"><?php echo $controls; ?></div>
        </div>
        <div class="hc-rc__mb">
            <p class="hc-label" style="margin-top:8px;opacity:.8" data-mmeta><?php echo esc_html($r['name'] . ' · ' . $r['size']); ?></p>
            <div class="list" data-mamen><?php echo $amen($r['list']); ?></div>
            <div class="acts" data-mact><?php echo $actions; ?></div>
            <div class="ctl hc-rc__ctl"><?php echo $controls; ?></div>
        </div>
        <p class="sr-only" aria-live="polite" data-live><?php echo esc_html($r['name'] . ', 01 / ' . hc_pad($total)); ?></p>
    </section>
    <?php return ob_get_clean();
});

/** Copy for homepage sections that PHP-rendered widgets need (stored as Polylang strings via the dictionary). */
function hc_page_text($key) {
    $h = hc_dict()['home']; $en = hc_data('dictionary')['en']['home'];
    if ($key === 'home_rooms') {
        $t = fn($k) => function_exists('pll__') ? pll__($en['rooms'][$k]) : $en['rooms'][$k];
        return ['left' => $t('metaLeft'), 'center' => $t('metaCenter'), 'body' => $t('body'), 'right' => $t('metaRight')];
    }
    return [];
}
add_action('init', function () {
    if (!function_exists('pll_register_string')) return;
    foreach (hc_data('dictionary')['en']['home']['rooms'] as $k => $v) pll_register_string('home.rooms.' . $k, $v, 'Hotel Central', $k === 'body');
}, 21);

/* ───────── [hc_room_list] — Rooms page ───────── */
add_shortcode('hc_room_list', function () {
    $rooms = hc_rooms(); $o = '<section class="hc-roomlist">';
    foreach ($rooms as $i => $r) {
        $flip = $i % 2 === 1; $im = $r['images'][0] ?? null;
        $o .= '<article class="' . ($flip ? 'flip' : '') . '"><a class="m" href="' . esc_url($r['url']) . '" aria-label="' . esc_attr($r['name']) . '">' . ($im ? hc_photo($im['id'], $im['alt'], $im['pos'], '', 'up', 3) : '') . '</a>';
        $o .= '<div class="t"><div class="top hc-label"><span style="font-variant-numeric:tabular-nums">(' . hc_pad($i + 1) . ')</span><span>' . esc_html($r['size_label']) . '</span></div><div class="mid">';
        $o .= '<p class="feat">' . esc_html($r['feature']) . '</p>';
        $o .= '<h2 class="hc-lines hc-fit" data-fit="84,13" data-hc-link="' . esc_url($r['url']) . '"><a href="' . esc_url($r['url']) . '">' . implode('<br>', array_map('esc_html', $r['title_lines'])) . '</a></h2>';
        $o .= '<p class="sum hc-body hc-fade">' . esc_html($r['summary']) . '</p></div>';
        $o .= '<div class="acts"><a class="hc-pill hc-pill-light no-arrow" href="' . esc_url(hc_room_booking_url($r['type_id'])) . '" target="_blank" rel="noopener noreferrer"><span>' . esc_html(hc_t('common.checkAvailability')) . '</span></a><a class="hc-label hc-link-line" href="' . esc_url($r['url']) . '">' . esc_html(hc_t('common.viewRoom')) . ' ' . hc_arrow() . '</a></div></div></article>';
    }
    return $o . '</section>';
});

/* ───────── [hc_map] ───────── */
add_shortcode('hc_map', function ($a) {
    $a = shortcode_atts(['class' => ''], $a);
    return '<div class="hc-mapbox ' . esc_attr($a['class']) . '"><iframe class="hc-map" title="' . esc_attr('Map — ' . hc_info('name') . ', ' . hc_info('street')) . '" src="' . esc_url(hc_info('map_embed')) . '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
});

/* ───────── [hc_info field="phone_display" link="tel" arrow="1"] — Hotel Information values inside Elementor ───────── */
add_shortcode('hc_info', function ($a) {
    $a = shortcode_atts(['field' => 'email', 'link' => '', 'arrow' => '', 'label' => ''], $a);
    $v = hc_info($a['field']);
    if (!$a['link']) return esc_html($v);
    $href = $a['link'] === 'tel' ? hc_info('phone_href') : ($a['link'] === 'mail' ? 'mailto:' . hc_info('email') : $v);
    $txt = $a['label'] ?: $v;
    return '<a class="hc-link-line' . ($a['arrow'] ? ' hc-arrowed' : '') . '" href="' . esc_url($href) . '">' . esc_html($txt) . '</a>';
});
add_shortcode('hc_info_line', function () { return '<address class="hc-label">' . esc_html(hc_info('name') . ' · ' . hc_info('street') . ', ' . hc_info('postal_code') . ' ' . hc_info('city')) . '</address>'; });
add_shortcode('hc_address_line', function () { return '<address class="hc-label" style="margin-top:24px;line-height:1.7">' . esc_html(hc_info('street') . ', ' . hc_info('postal_code') . ' ' . hc_info('city')) . '</address>'; });

/* ───────── [hc_address] ───────── */
add_shortcode('hc_address', function () {
    return '<address class="hc-label" style="line-height:1.8">' . esc_html(hc_info('name')) . '<br>' . esc_html(hc_info('street')) . '<br>' . esc_html(hc_info('postal_code') . ' ' . hc_info('city')) . '<br>' . esc_html(hc_info('country')) . '<br><a class="hc-link-line" style="margin-top:8px" href="' . esc_url(hc_info('directions')) . '" target="_blank" rel="noopener noreferrer">' . esc_html(hc_t('common.directions')) . '</a></address>';
});

/* ───────── [hc_contact_form] ───────── */
add_shortcode('hc_contact_form', function () {
    $c = hc_t('contact.name'); $subjects = hc_ta('contact.subjects');
    $cfg = ['rest' => esc_url_raw(rest_url('hc/v1/contact')), 'lang' => hc_lang(), 't' => [
        'sending' => hc_t('contact.sending'), 'send' => hc_t('contact.send'), 'success' => hc_t('contact.success'),
        'name' => hc_t('contact.errors.name'), 'email' => hc_t('contact.errors.email'), 'message' => hc_t('contact.errors.message'), 'consent' => hc_t('contact.errors.consent'),
        'unavailable' => hc_t('contact.errors.unavailable'), 'generic' => hc_t('contact.errors.generic')]];
    ob_start(); ?>
    <form class="hc-form" data-hc-form data-config="<?php echo esc_attr(wp_json_encode($cfg)); ?>" novalidate>
        <div class="f"><input id="hcf-name" name="name" required autocomplete="name" placeholder=" "><label class="l hc-label" for="hcf-name"><?php echo esc_html(hc_t('contact.name')); ?></label><p class="err" data-err="name" hidden></p></div>
        <div class="f"><input id="hcf-email" name="email" type="email" required autocomplete="email" placeholder=" "><label class="l hc-label" for="hcf-email"><?php echo esc_html(hc_t('contact.email')); ?></label><p class="err" data-err="email" hidden></p></div>
        <div class="f"><input id="hcf-phone" name="phone" type="tel" autocomplete="tel" placeholder=" "><label class="l hc-label" for="hcf-phone"><?php echo esc_html(hc_t('contact.phone')); ?></label></div>
        <div class="f sel"><select id="hcf-subject" name="subject"><?php foreach ($subjects as $s) echo '<option>' . esc_html($s) . '</option>'; ?></select><label class="l hc-label" for="hcf-subject"><?php echo esc_html(hc_t('contact.subject')); ?></label></div>
        <div class="f full"><textarea id="hcf-message" name="message" required rows="5" placeholder=" "></textarea><label class="l hc-label" for="hcf-message"><?php echo esc_html(hc_t('contact.message')); ?></label><p class="err" data-err="message" hidden></p></div>
        <div class="hp" aria-hidden="true"><label>Company<input name="company" tabindex="-1" autocomplete="off"></label></div>
        <label class="consent hc-body"><input type="checkbox" name="consent"><span><?php echo esc_html(hc_t('contact.consent')); ?></span></label><p class="err" data-err="consent" hidden></p>
        <button type="submit" class="hc-pill hc-pill-dark"><span><?php echo esc_html(hc_t('contact.send')); ?></span></button>
        <p class="status hc-body" role="status" aria-live="polite" data-status></p>
    </form>
    <?php return ob_get_clean();
});

/* ───────── [hc_offers] — offers custom post type as cards ───────── */
add_shortcode('hc_offers', function ($a) {
    $a = shortcode_atts(['limit' => 6], $a);
    $args = ['post_type' => 'hc_offer', 'numberposts' => (int) $a['limit'], 'orderby' => 'menu_order date', 'order' => 'ASC', 'suppress_filters' => false];
    if (function_exists('pll_current_language')) $args['lang'] = hc_lang();
    $posts = get_posts($args); if (!$posts) return '';
    $o = '<div class="hc-offers__g">';
    foreach ($posts as $p) {
        $o .= '<article class="hc-offer">' . (has_post_thumbnail($p) ? hc_photo(get_post_thumbnail_id($p), $p->post_title, '50% 50%', '', 'up') : '') . '<h3>' . esc_html($p->post_title) . '</h3><div class="hc-body">' . wp_kses_post(wpautop($p->post_excerpt ?: $p->post_content)) . '</div></article>';
    }
    return $o . '</div>';
});

/* ───────── [hc_deco variant="hotel" tone="light"] ───────── */
add_shortcode('hc_deco', function ($a) { $a = shortcode_atts(['variant' => 'hotel', 'tone' => 'dark'], $a); return hc_deco($a['variant'], $a['tone']); });

/* ───────── [hc_hours] — opening hours from Hotel Information → Opening hours ───────── */
add_shortcode('hc_hours', function () {
    $rows = ['hours_reception' => 'Reception', 'hours_breakfast' => 'Breakfast', 'hours_restaurant' => 'Restaurant', 'hours_spa' => 'Club & Spa', 'hours_checkin' => 'Check-in / check-out'];
    $o = '';
    foreach ($rows as $k => $label) if (hc_info($k)) $o .= '<div class="row"><span class="k hc-label">' . esc_html($label) . '</span><span class="v hc-label">' . esc_html(hc_info($k)) . '</span></div>';
    return $o ? '<div class="hc-kv hc-label is-dark">' . $o . '</div>' : '';
});
