</main>
<?php $items = hc_footer_items(); $langs = hc_lang_urls(); ?>
<footer class="hc-footer">
  <?php $brand = get_theme_file_uri('assets/brand/'); ?>
  <?php echo hc_deco('footer', 'light'); ?>
  <div class="hc-foot-res">
    <div class="t hc-label"><span class="hc-opacity-50"><?php echo esc_html(hc_foot('reservations')); ?></span><span style="opacity:.9"><?php echo esc_html(hc_foot('reservationsBody')); ?></span></div>
    <div class="a"><a class="hc-label hc-link-line" href="<?php echo esc_url(hc_info('phone_href')); ?>"><?php echo esc_html(hc_info('phone_display')); ?></a><a class="hc-pill hc-pill-light" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('nav.book')); ?></span></a></div>
  </div>
  <?php $B = ($fb = hc_brand()) ? hc_brand_info($fb) : null; ?>
  <?php if ($B): ?>
  <div class="hc-foot-brand is-sub">
    <div class="hc-foot-sublead"><a href="<?php echo esc_url($B['home']); ?>"><img src="<?php echo esc_url($B['logo']); ?>" width="<?php echo (int) $B['w']; ?>" height="<?php echo (int) $B['h']; ?>" alt="<?php echo esc_attr($B['name']); ?>" loading="lazy"></a></div>
    <div class="hc-foot-subs">
      <p class="hc-label-sm"><?php echo esc_html($B['part']); ?></p>
      <a class="hc-foot-endorse" href="<?php echo esc_url(hc_url('/')); ?>"><img src="<?php echo esc_url($brand . 'hotel-central-logo-reversed.png'); ?>" width="260" height="360" alt="<?php echo esc_attr(hc_t('footer.primaryLogo')); ?>" loading="lazy"></a>
      <a class="hc-label hc-link-line" href="<?php echo esc_url(hc_url('/')); ?>">← <?php echo esc_html($B['back']); ?></a>
    </div>
  </div>
  <?php else: ?>
  <div class="hc-foot-brand">
    <a class="hc-foot-logo" href="<?php echo esc_url(hc_url('/')); ?>"><img src="<?php echo esc_url($brand . 'hotel-central-logo-reversed.png'); ?>" width="260" height="360" alt="<?php echo esc_attr(hc_t('footer.primaryLogo')); ?>" loading="lazy" decoding="async"></a>
    <div class="hc-foot-subs">
      <p class="hc-label-sm"><?php echo esc_html(hc_t('footer.alsoAt')); ?></p>
      <div class="hc-foot-subs__row">
        <a href="<?php echo esc_url(hc_url('/centralfitnessclub')); ?>"><img src="<?php echo esc_url($brand . 'central-fitness-club-white.svg'); ?>" width="628" height="740" alt="Central Fitness Club" loading="lazy"></a>
        <a href="<?php echo esc_url(hc_url('/dayspa')); ?>"><img src="<?php echo esc_url($brand . 'day-spa-transparent.png'); ?>" width="544" height="394" alt="Central Day Spa — Hotel Central Sarajevo" loading="lazy"></a>
      </div>
    </div>
  </div>
  <?php endif; ?>
  <div class="hc-foot-info hc-label">
    <div><p class="ft"><?php echo esc_html(hc_t('footer.address')); ?></p><p><?php echo esc_html(hc_info('name')); ?></p><address><?php echo esc_html(hc_info('street')); ?><br><?php echo esc_html(hc_info('postal_code') . ' ' . hc_info('city')); ?><br><?php echo esc_html(hc_info('country')); ?></address><a class="hc-link-line" style="margin-top:12px;opacity:.8" href="<?php echo esc_url(hc_info('directions')); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(hc_t('common.directions')); ?></a></div>
    <div><p class="ft"><?php echo esc_html(hc_t('footer.contact')); ?></p><p><a class="hc-link-line" href="<?php echo esc_url(hc_info('phone_href')); ?>"><?php echo esc_html(hc_info('phone_display')); ?></a></p><p><a class="hc-link-line lc" href="mailto:<?php echo esc_attr(hc_info('email')); ?>"><?php echo esc_html(hc_info('email')); ?></a></p></div>
    <nav class="nav" aria-label="<?php echo esc_attr(hc_t('footer.explore')); ?>"><p class="ft"><?php echo esc_html(hc_t('footer.explore')); ?></p><ul><?php foreach ($items as $it) { if (hc_menu_key($it['href']) === '/') continue; echo '<li><a class="hc-link-line" href="' . esc_url($it['href']) . '"' . (!empty($it['blank']) ? ' target="_blank" rel="noopener noreferrer"' : '') . '>' . esc_html($it['label']) . '</a></li>'; } ?></ul></nav>
    <div><p class="ft"><?php echo esc_html(hc_t('footer.follow')); ?></p><a class="hc-link-line" href="<?php echo esc_url(hc_info('facebook')); ?>" target="_blank" rel="noopener noreferrer">Facebook</a><?php if (hc_info('instagram')) : ?><a class="hc-link-line" style="margin-top:8px" href="<?php echo esc_url(hc_info('instagram')); ?>" target="_blank" rel="noopener noreferrer">Instagram</a><?php endif; ?></div>
    <div><p class="ft"><?php echo esc_html(hc_t('nav.language')); ?></p><div class="hc-lang"><?php foreach ($langs as $s => $l): ?><a href="<?php echo esc_url($l['url']); ?>" hreflang="<?php echo esc_attr($s); ?>" lang="<?php echo esc_attr($s); ?>" aria-current="<?php echo $l['current'] ? 'true' : 'false'; ?>" title="<?php echo esc_attr($l['full']); ?>"><?php echo esc_html($l['name']); ?></a><?php endforeach; ?></div></div>
  </div>
  <div class="hc-foot-end hc-label-sm"><p>© <?php echo esc_html(date('Y') . ' ' . hc_info('name')); ?>. <?php echo esc_html(hc_foot('rights')); ?></p><p><?php echo esc_html(hc_foot('credits')); ?></p></div>
</footer>
<aside class="hc-bookbar" data-bookbar aria-label="<?php echo esc_attr(hc_t('nav.book')); ?>"><div>
  <a class="hc-pill hc-pill-light no-arrow" style="padding:0 20px" href="<?php echo esc_url(hc_info('phone_href')); ?>" aria-label="<?php echo esc_attr(hc_t('common.call') . ' ' . hc_info('phone_display')); ?>"><svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1"><path d="M3.5 1.5h2.6l1.2 3.2-1.7 1.1a8.6 8.6 0 0 0 4.6 4.6l1.1-1.7 3.2 1.2v2.6c0 .6-.5 1-1.1 1C7 13.2 2.8 9 2.5 2.6c0-.6.4-1.1 1-1.1Z"/></svg></a>
  <a class="hc-pill is-fill" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('nav.book')); ?></span></a>
</div></aside>
<?php wp_footer(); ?>
</body>
</html>
