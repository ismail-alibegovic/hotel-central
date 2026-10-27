<?php
$items = hc_menu_items();
$cur = hc_current_key();
$previews = ['/' => '3075.jpg', '/about' => '3064.jpg', '/rooms' => 'p05.jpg', '/spa' => '3069.jpg', '/restaurant' => 'dorucak5.jpg', '/meetings-events' => '3073.jpg', '/location' => '3064.jpg', '/contact' => '3075.jpg'];
$langs = hc_lang_urls();
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#363a2a">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="hc-skip hc-label" href="#content"><?php echo esc_html(hc_t('nav.skip')); ?></a>
<header class="hc-header" id="hc-header">
  <div class="hc-header__bar">
    <div style="display:flex;align-items:center">
      <button type="button" class="hc-menu-btn hc-label" data-menu-btn aria-expanded="false" aria-controls="site-menu">
        <span class="hc-burger" aria-hidden="true"><i></i><i></i></span>
        <span data-menu-label data-open="<?php echo esc_attr(hc_t('nav.close')); ?>" data-closed="<?php echo esc_attr(hc_t('nav.menu')); ?>"><?php echo esc_html(hc_t('nav.menu')); ?></span>
      </button>
    </div>
    <a class="hc-wordmark" href="<?php echo esc_url(hc_url('/')); ?>" aria-label="<?php echo esc_attr(hc_info('name')); ?> — home"><span>Hotel Central</span></a>
    <div class="hc-header__right">
      <a class="hc-hdr-rooms hc-label" href="<?php echo esc_url(hc_url('/rooms')); ?>"><span class="hc-link-line"><?php echo esc_html(hc_t('nav.rooms')); ?></span></a>
      <a class="hc-hdr-book hc-label" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span class="hc-link-line"><?php echo esc_html(hc_t('nav.book')); ?></span></a>
    </div>
  </div>
</header>
<div class="hc-menu" id="site-menu" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr(hc_t('nav.menu')); ?>" data-menu>
  <div class="hc-menu__grid">
    <nav aria-label="<?php echo esc_attr(hc_t('nav.menu')); ?>">
      <ol>
        <?php foreach ($items as $i => $it): $k = hc_menu_key($it['href']); ?>
        <li><a href="<?php echo esc_url($it['href']); ?>" data-preview="<?php echo esc_attr($previews[$k] ?? '3075.jpg'); ?>" style="--i:<?php echo (int) $i; ?>"<?php echo $k === $cur ? ' aria-current="page"' : ''; ?>><span class="n hc-label-sm"><?php echo esc_html(hc_pad($i + 1)); ?></span><span class="t"><?php echo esc_html($it['label']); ?></span></a></li>
        <?php endforeach; ?>
      </ol>
    </nav>
    <aside>
      <div class="hc-menu__preview" aria-hidden="true">
        <?php $first = true; foreach (array_unique(array_values($previews)) as $f): ?><img data-img="<?php echo esc_attr($f); ?>" class="<?php echo $f === '3075.jpg' ? 'is-on' : ''; ?>" src="<?php echo esc_url(hc_img_url($f, 'large')); ?>" alt="" loading="lazy"><?php endforeach; ?>
      </div>
      <div class="hc-menu__info">
        <div class="hc-label"><p class="hc-opacity-50"><?php echo esc_html(hc_t('footer.address')); ?></p><p><?php echo esc_html(hc_info('street')); ?></p><p><?php echo esc_html(hc_info('postal_code') . ' ' . hc_info('city')); ?></p></div>
        <div class="hc-label"><p class="hc-opacity-50"><?php echo esc_html(hc_t('footer.contact')); ?></p><p><a class="hc-link-line" href="<?php echo esc_url(hc_info('phone_href')); ?>"><?php echo esc_html(hc_info('phone_display')); ?></a></p><p><a class="hc-link-line" style="text-transform:none;letter-spacing:.06em" href="mailto:<?php echo esc_attr(hc_info('email')); ?>"><?php echo esc_html(hc_info('email')); ?></a></p></div>
        <div class="hc-label hc-lang" aria-label="<?php echo esc_attr(hc_t('nav.language')); ?>"><?php foreach ($langs as $s => $l): ?><a href="<?php echo esc_url($l['url']); ?>" hreflang="<?php echo esc_attr($s); ?>" lang="<?php echo esc_attr($s); ?>" aria-current="<?php echo $l['current'] ? 'true' : 'false'; ?>" title="<?php echo esc_attr($l['full']); ?>"><?php echo esc_html($l['name']); ?></a><?php endforeach; ?></div>
        <a class="hc-pill hc-pill-light" style="justify-self:start" href="<?php echo esc_url(hc_info('booking_url')); ?>" target="_blank" rel="noopener noreferrer"><span><?php echo esc_html(hc_t('nav.book')); ?></span></a>
      </div>
    </aside>
  </div>
</div>
<main id="content">
