<?php get_header(); ?>
<div class="hc-plain">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <article><h1><?php the_title(); ?></h1><div class="hc-body"><?php the_content(); ?></div></article>
<?php endwhile; endif; ?>
</div>
<?php get_footer();
