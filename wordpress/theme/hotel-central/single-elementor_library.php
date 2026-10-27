<?php
// Preview of a Saved Template (Templates → Saved Templates → hover → Preview): full width, inside the site header/footer.
get_header();
while (have_posts()) : the_post();
  echo '<div class="hc-page">'; the_content(); echo '</div>';
endwhile;
get_footer();
