<?php get_header(); ?>
<section class="hc-404">
  <h1 class="hc-display hc-lines hc-fit" data-fit="80,13" style="font-size:var(--fs-m,11vw);line-height:.9"><?php echo esc_html(hc_t('notFound.title.0')); ?><br><?php echo esc_html(hc_t('notFound.title.1')); ?></h1>
  <p class="hc-body" style="margin:40px 0;max-width:36ch;opacity:.85"><?php echo esc_html(hc_t('notFound.body')); ?></p>
  <a class="hc-pill hc-pill-light" href="<?php echo esc_url(hc_url('/')); ?>"><span><?php echo esc_html(hc_t('common.backHome')); ?></span></a>
</section>
<?php get_footer();
