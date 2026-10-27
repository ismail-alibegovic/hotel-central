<?php
// Pages are built in Elementor; the theme only supplies the header, footer and design system around the_content().
get_header();
while (have_posts()) : the_post();
  echo '<div class="hc-page">'; the_content(); echo '</div>';
endwhile;
get_footer();
