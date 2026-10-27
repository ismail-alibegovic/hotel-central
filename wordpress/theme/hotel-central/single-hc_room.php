<?php
get_header();
while (have_posts()) : the_post();
  $r = hc_room(get_the_ID()); $all = hc_rooms(); $n = count($all);
  $idx = 0; foreach ($all as $i => $x) if ($x['id'] === $r['id']) $idx = $i;
  $others = array_values(array_filter($all, function ($x) use ($r) { return $x['id'] !== $r['id']; }));
  $next = $all[($idx + 1) % $n];
  $im = $r['images']; $first = $im[0] ?? null; $second = $im[1] ?? $first;
  echo hc_r_hero($first['id'] ?? 0, $first['alt'] ?? '', $first['pos'] ?? '50% 50%', $r['feature'], $r['title_lines'], ['(' . hc_pad($idx + 1) . '/' . hc_pad($n) . ')', $r['size_label'], 'Hotel Central']);
  $big = [$r['size_m2'] . ' m²', $r['feature']];
?>
<section class="hc-room-desc">
  <?php echo hc_deco('hotel'); ?>
  <div class="hc-room-desc__g">
    <div>
      <p class="hc-label" style="margin-bottom:32px"><?php echo esc_html($r['name']); ?></p>
      <p class="big hc-lines hc-fit" data-fit="86,12"><?php echo implode('<br>', array_map('esc_html', $big)); ?></p>
      <div class="txt"><?php foreach ($r['description'] as $i => $p) echo '<p class="hc-body hc-fade' . ($i ? ' op-80' : '') . '" style="--d:' . ($i * .08) . 's">' . esc_html($p) . '</p>'; ?></div>
      <div class="acts"><a class="hc-pill hc-pill-dark" href="<?php echo esc_url(hc_room_booking_url($r['type_id'])); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('common.checkAvailability')); ?></span></a><a class="hc-label hc-link-line" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(hc_t('nav.book')); ?></a></div>
    </div>
    <div>
      <?php if ($second) echo hc_photo($second['id'], $second['alt'], $second['pos'], 'pic', 'up', 4); ?>
      <div class="hc-amen"><p class="hc-label" style="margin-bottom:20px"><?php echo esc_html(hc_t('common.amenities')); ?></p><ul class="hc-label"><?php foreach ($r['amenities'] as $a) echo '<li>' . esc_html($a) . '</li>'; ?></ul></div>
    </div>
  </div>
</section>
<?php if (count($im) > 2) echo hc_r_gallery(array_merge(array_slice($im, 2), [$im[0]]), 'deep'); ?>
<section class="hc-other">
  <div class="top hc-label"><span><?php echo esc_html(hc_t('common.otherRooms')); ?></span><a class="hc-link-line" href="<?php echo esc_url(hc_url('/rooms')); ?>"><?php echo esc_html(hc_t('common.allRooms')); ?></a></div>
  <ul><?php foreach ($others as $o) echo '<li><a href="' . esc_url($o['url']) . '"><span class="nm">' . esc_html($o['name']) . '</span><span class="sz hc-label"><span>' . esc_html($o['size_label']) . '</span>' . hc_arrow() . '</span></a></li>'; ?></ul>
  <div class="nx"><a class="hc-label hc-link-line" href="<?php echo esc_url($next['url']); ?>"><?php echo esc_html(hc_t('common.next') . ': ' . $next['name']); ?> <?php echo hc_arrow(); ?></a></div>
</section>
<?php
  echo hc_r_final($first['id'] ?? 0, $first['alt'] ?? '');
endwhile;
get_footer();
