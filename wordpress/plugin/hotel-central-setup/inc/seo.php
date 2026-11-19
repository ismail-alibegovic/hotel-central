<?php
/**
 * A meta description per page (stored in the page's "hc_description" field by the import; editable in the page's
 * Custom Fields). Kept small on purpose: a full SEO plugin (e.g. Yoast or Rank Math free) can replace it later.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_head',
	function () {
		if ( ! is_singular() || defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) ) {
			return;
		}
		$d = get_post_meta( get_queried_object_id(), 'hc_description', true );
		if ( $d ) {
			printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( $d ) );
		}
	},
	1
);
