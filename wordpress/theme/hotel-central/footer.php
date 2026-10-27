</main>
<?php $items = hc_menu_items(); $langs = hc_lang_urls(); ?>
<footer class="hc-footer">
  <?php echo hc_deco('footer', 'light'); ?>
  <div class="hc-foot-res">
    <div class="t hc-label"><span class="hc-opacity-50"><?php echo esc_html(hc_t('footer.reservations')); ?></span><span style="opacity:.9"><?php echo esc_html(hc_t('footer.reservationsBody')); ?></span></div>
    <div class="a"><a class="hc-label hc-link-line" href="<?php echo esc_url(hc_info('phone_href')); ?>"><?php echo esc_html(hc_info('phone_display')); ?></a><a class="hc-pill hc-pill-light" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('nav.book')); ?></span></a></div>
  </div>
  <div class="hc-foot-stmt"><p aria-hidden="true" class="hc-display hc-lines" style="line-height:.84"><?php echo esc_html(hc_t('footer.statement.0')); ?><br><?php echo esc_html(hc_t('footer.statement.1')); ?></p></div>
  <div class="hc-foot-info hc-label">
    <div><h3><?php echo esc_html(hc_t('footer.address')); ?></h3><p><?php echo esc_html(hc_info('name')); ?></p><address><?php echo esc_html(hc_info('street')); ?><br><?php echo esc_html(hc_info('postal_code') . ' ' . hc_info('city')); ?><br><?php echo esc_html(hc_info('country')); ?></address><a class="hc-link-line" style="margin-top:12px;opacity:.8" href="<?php echo esc_url(hc_info('directions')); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(hc_t('common.directions')); ?></a></div>
    <div><h3><?php echo esc_html(hc_t('footer.contact')); ?></h3><p><a class="hc-link-line" href="<?php echo esc_url(hc_info('phone_href')); ?>"><?php echo esc_html(hc_info('phone_display')); ?></a></p><p><a class="hc-link-line lc" href="mailto:<?php echo esc_attr(hc_info('email')); ?>"><?php echo esc_html(hc_info('email')); ?></a></p></div>
    <nav class="nav" aria-label="<?php echo esc_attr(hc_t('footer.explore')); ?>"><h3><?php echo esc_html(hc_t('footer.explore')); ?></h3><ul><?php foreach ($items as $it) { if (hc_menu_key($it['href']) === '/') continue; echo '<li><a class="hc-link-line" href="' . esc_url($it['href']) . '">' . esc_html($it['label']) . '</a></li>'; } ?></ul></nav>
    <div><h3><?php echo esc_html(hc_t('footer.follow')); ?></h3><a class="hc-link-line" href="<?php echo esc_url(hc_info('facebook')); ?>" target="_blank" rel="noopener noreferrer">Facebook</a></div>
    <div><h3><?php echo esc_html(hc_t('nav.language')); ?></h3><div class="hc-lang"><?php foreach ($langs as $s => $l): ?><a href="<?php echo esc_url($l['url']); ?>" hreflang="<?php echo esc_attr($s); ?>" lang="<?php echo esc_attr($s); ?>" aria-current="<?php echo $l['current'] ? 'true' : 'false'; ?>" title="<?php echo esc_attr($l['full']); ?>"><?php echo esc_html($l['name']); ?></a><?php endforeach; ?></div></div>
  </div>
  <div class="hc-foot-end hc-label-sm"><p>© <?php echo esc_html(date('Y') . ' ' . hc_info('name')); ?>. <?php echo esc_html(hc_t('footer.rights')); ?></p><p><?php echo esc_html(hc_t('footer.credits')); ?></p></div>
</footer>
<div class="hc-bookbar" data-bookbar><div>
  <a class="hc-pill hc-pill-light no-arrow" style="padding:0 20px" href="<?php echo esc_url(hc_info('phone_href')); ?>" aria-label="<?php echo esc_attr(hc_t('common.call') . ' ' . hc_info('phone_display')); ?>"><svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1"><path d="M3.5 1.5h2.6l1.2 3.2-1.7 1.1a8.6 8.6 0 0 0 4.6 4.6l1.1-1.7 3.2 1.2v2.6c0 .6-.5 1-1.1 1C7 13.2 2.8 9 2.5 2.6c0-.6.4-1.1 1-1.1Z"/></svg></a>
  <a class="hc-pill is-fill" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('nav.book')); ?></span></a>
</div></div>
<?php wp_footer(); ?>
</body>
</html>
