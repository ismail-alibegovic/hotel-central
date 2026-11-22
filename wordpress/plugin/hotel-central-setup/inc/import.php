<?php
/**
 * One-time import of the Hotel Central site from data/site.json (generated from the Next.js site's content by
 * wordpress/build/generate.mts): languages (Polylang), photos, pages with Elementor content in English and Bosnian,
 * menus, the front page and the site settings.
 *
 * Run it from Tools → Hotel Central import, or in code: hc_site_import( $media_base_url ).
 * It refuses to run twice (option hc_import_done); delete that option to import again on an empty site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const HC_MEDIA_BASE_DEFAULT = 'https://raw.githubusercontent.com/ismail-alibegovic/hotel-central/refs/heads/main/public/';

function hc_import_log( string $msg ): void {
	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		WP_CLI::log( $msg );
	}
	$GLOBALS['hc_import_log'][] = $msg;
}

function hc_site_import( string $media_base = '' ): array {
	if ( get_option( 'hc_import_done' ) ) {
		return array( 'Already imported. Delete the option "hc_import_done" to import again.' );
	}
	$GLOBALS['hc_import_log'] = array();
	// Elementor checks capabilities when page data is saved: run as the first administrator when called from code.
	if ( ! current_user_can( 'manage_options' ) ) {
		$admins = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID' ) );
		if ( $admins ) {
			wp_set_current_user( (int) $admins[0] );
		}
	}
	$media_base               = $media_base ? trailingslashit( $media_base ) : HC_MEDIA_BASE_DEFAULT;
	$site                     = json_decode( (string) file_get_contents( HC_SETUP_DIR . '/data/site.json' ), true );
	if ( ! $site ) {
		return array( 'data/site.json is missing or invalid.' );
	}
	@set_time_limit( 0 );

	// 1. Site basics.
	update_option( 'blogname', 'Hotel Central Sarajevo' );
	update_option( 'blogdescription', 'Four-star boutique hotel in the heart of Sarajevo' );
	update_option( 'timezone_string', 'Europe/Sarajevo' );
	update_option( 'permalink_structure', '/%postname%/' );
	$settings = $site['settings'];
	$flat     = array();
	foreach ( $settings as $k => $v ) {
		if ( 'hours' === $k ) {
			foreach ( $v as $place => $by_lang ) {
				foreach ( $by_lang as $lang => $text ) {
					$flat[ "hours_{$place}_{$lang}" ] = $text;
				}
			}
		} else {
			$flat[ $k ] = $v;
		}
	}
	update_option( 'hc_settings', $flat );

	// 2. Elementor: no default colours or fonts (the theme carries the three brands), Hello Elementor with our child theme.
	update_option( 'elementor_disable_color_schemes', 'yes' );
	update_option( 'elementor_disable_typography_schemes', 'yes' );
	update_option( 'elementor_load_fa4_shim', '' );
	update_option( 'elementor_onboarded', true );
	update_option( 'elementor_cpt_support', array( 'page', 'post' ) );
	// Lazy-loaded backgrounds only appear once Elementor's script marks each section as seen; the photos are part of the design, so load them at once.
	update_option( 'elementor_experiment-e_lazyload', 'inactive' );

	// 3. Languages (Polylang): English is the default (no prefix, like the current site), Bosnian under /bs/.
	$langs = array();
	if ( function_exists( 'PLL' ) ) {
		foreach ( $site['languages'] as $i => $l ) {
			if ( ! PLL()->model->get_language( $l['slug'] ) ) {
				PLL()->model->languages->add( array( 'name' => $l['name'], 'slug' => $l['slug'], 'locale' => $l['locale'], 'rtl' => false, 'term_group' => $i, 'flag' => 'en' === $l['slug'] ? 'gb' : 'ba' ) );
			}
			$langs[] = $l['slug'];
		}
		PLL()->options->set( 'default_lang', 'en' );
		PLL()->options->set( 'force_lang', 1 );
		PLL()->options->set( 'hide_default', true );
		PLL()->options->set( 'rewrite', true );
		PLL()->options->set( 'browser', false );
		PLL()->options->set( 'redirect_lang', false );
		PLL()->options->save();
		PLL()->model->clean_languages_cache();
	} else {
		$langs = array( 'en' );
		hc_import_log( 'Polylang is not active: importing English only.' );
	}

	// 4. Photos.
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	add_filter( 'intermediate_image_sizes_advanced', '__return_empty_array' ); // full size only: fast import, Elementor uses "full".
	add_filter( 'big_image_size_threshold', '__return_false' );
	$media = array();
	foreach ( $site['media'] as $m ) {
		$id = hc_import_photo( $media_base . $m['path'], $m['path'], $m['alt'] );
		if ( $id ) {
			$media[ $m['path'] ] = $id;
		}
	}
	update_option( 'hc_media_map', $media, false );
	hc_import_log( sprintf( 'Photos: %d of %d imported.', count( $media ), count( $site['media'] ) ) );

	// The default content WordPress ships with goes first, so it does not hold our slugs (privacy-policy).
	foreach ( array( 'hello-world', 'sample-page', 'privacy-policy' ) as $slug ) {
		foreach ( get_posts( array( 'name' => $slug, 'post_type' => array( 'post', 'page' ), 'post_status' => 'any', 'numberposts' => -1 ) ) as $old ) {
			if ( ! get_post_meta( $old->ID, 'hc_key', true ) ) {
				wp_delete_post( $old->ID, true );
			}
		}
	}

	// 5. Pages: create all first (links need permalinks), then fill in their Elementor content.
	$ids = array(); // [key][lang] => post id
	foreach ( $site['pages'] as $p ) {
		foreach ( $langs as $lang ) {
			$t      = $p['translations'][ $lang ];
			$parent = $p['parent'] ? ( $ids[ $p['parent'] ][ $lang ] ?? 0 ) : 0;
			$id     = wp_insert_post(
				array(
					'post_type'   => 'page',
					'post_status' => 'publish',
					'post_title'  => $t['title'],
					'post_name'   => $t['slug'],
					'post_parent' => $parent,
					'menu_order'  => 0,
				)
			);
			$ids[ $p['key'] ][ $lang ] = $id;
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, $lang );
			}
			update_post_meta( $id, 'hc_brand', $p['brand'] );
			update_post_meta( $id, 'hc_key', $p['key'] );
			update_post_meta( $id, 'hc_description', $t['description'] );
		}
		if ( function_exists( 'pll_save_post_translations' ) && count( $langs ) > 1 ) {
			pll_save_post_translations( $ids[ $p['key'] ] );
		}
	}
	update_option( 'hc_page_map', $ids, false );

	$elementor_version = defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.0.0';
	foreach ( $site['pages'] as $p ) {
		foreach ( $langs as $lang ) {
			$id   = $ids[ $p['key'] ][ $lang ];
			$data = hc_resolve( $p['translations'][ $lang ]['elementor'], $lang, $ids, $media );
			update_post_meta( $id, '_elementor_edit_mode', 'builder' );
			update_post_meta( $id, '_elementor_template_type', 'wp-page' );
			update_post_meta( $id, '_elementor_version', $elementor_version );
			update_post_meta( $id, '_wp_page_template', 'elementor_header_footer' );
			update_post_meta( $id, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
			// A plain-text copy in post_content keeps the page searchable and readable without Elementor.
			wp_update_post( array( 'ID' => $id, 'post_content' => hc_plain_text( $data ) ) );
		}
	}
	hc_import_log( sprintf( 'Pages: %d × %d languages.', count( $site['pages'] ), count( $langs ) ) );

	// 6. Front page (Polylang serves the Bosnian translation at /bs/).
	foreach ( $site['pages'] as $p ) {
		if ( ! empty( $p['front'] ) ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $ids[ $p['key'] ]['en'] );
		}
	}

	// 7. Menus, one per brand and language, assigned to the theme's locations.
	$locations = array( 'hotel' => 'hotel_menu', 'spa' => 'spa_menu', 'club' => 'club_menu', 'legal' => 'legal_menu' );
	$by_loc    = array();
	foreach ( $site['menus'] as $brand => $by_lang ) {
		foreach ( $langs as $lang ) {
			$menu_id = wp_create_nav_menu( "Hotel Central — {$brand} ({$lang})" );
			if ( is_wp_error( $menu_id ) ) {
				continue;
			}
			foreach ( $by_lang[ $lang ] as $i => $item ) {
				list( $key, $hash ) = array_pad( explode( '#', $item['target'], 2 ), 2, '' );
				$post_id            = $ids[ $key ][ $lang ] ?? 0;
				$args               = $hash || ! $post_id
					? array( 'menu-item-title' => $item['label'], 'menu-item-url' => ( $post_id ? get_permalink( $post_id ) : home_url( '/' ) ) . ( $hash ? "#$hash" : '' ), 'menu-item-type' => 'custom' )
					: array( 'menu-item-title' => $item['label'], 'menu-item-object' => 'page', 'menu-item-object-id' => $post_id, 'menu-item-type' => 'post_type' );
				wp_update_nav_menu_item( $menu_id, 0, $args + array( 'menu-item-status' => 'publish', 'menu-item-position' => $i + 1 ) );
			}
			$by_loc[ $locations[ $brand ] ][ $lang ] = $menu_id;
		}
	}
	$theme = get_stylesheet();
	set_theme_mod( 'nav_menu_locations', array_map( fn( $l ) => $l['en'] ?? 0, $by_loc ) );
	if ( function_exists( 'PLL' ) ) {
		$nav = PLL()->options->get( 'nav_menus' );
		foreach ( $by_loc as $loc => $per_lang ) {
			$nav[ $theme ][ $loc ] = $per_lang;
		}
		PLL()->options->set( 'nav_menus', $nav );
		PLL()->options->save();
	}

	update_option( 'wp_page_for_privacy_policy', $ids['privacy']['en'] ?? 0 );

	flush_rewrite_rules( false );
	if ( class_exists( '\Elementor\Plugin' ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	update_option( 'hc_import_done', gmdate( 'c' ) );
	hc_import_log( 'Done.' );
	return $GLOBALS['hc_import_log'];
}

/** Downloads one photo into the media library (reused if it was imported before). */
function hc_import_photo( string $url, string $path, string $alt ): int {
	$existing = get_posts( array( 'post_type' => 'attachment', 'meta_key' => 'hc_source', 'meta_value' => $path, 'fields' => 'ids', 'numberposts' => 1 ) );
	if ( $existing ) {
		return (int) $existing[0];
	}
	if ( str_starts_with( $url, '/' ) ) {
		// A folder on this server (e.g. the repository's public/ folder uploaded next to WordPress).
		$tmp = wp_tempnam( basename( $path ) );
		if ( ! @copy( $url, $tmp ) ) {
			$tmp = new WP_Error( 'hc_copy', 'file not found: ' . $url );
		}
	} else {
		$tmp = download_url( $url, 120 );
	}
	if ( is_wp_error( $tmp ) ) {
		hc_import_log( "Photo not downloaded: $path (" . $tmp->get_error_message() . ')' );
		return 0;
	}
	$name = str_replace( '/', '-', $path );
	$id   = media_handle_sideload( array( 'name' => $name, 'tmp_name' => $tmp ), 0, $alt ? $alt : null );
	if ( is_wp_error( $id ) ) {
		@unlink( $tmp );
		hc_import_log( "Photo not imported: $path (" . $id->get_error_message() . ')' );
		return 0;
	}
	update_post_meta( $id, 'hc_source', $path );
	if ( $alt ) {
		update_post_meta( $id, '_wp_attachment_image_alt', $alt );
	}
	return (int) $id;
}

/** A web address, or an absolute folder on this server (starting with /). */
function hc_clean_media_base( string $base ): string {
	$base = trim( $base );
	return str_starts_with( $base, '/' ) ? sanitize_text_field( $base ) : esc_url_raw( $base );
}

/** Replaces hc-media:// and hc-page:// placeholders with this site's photos and page addresses. */
function hc_resolve( $node, string $lang, array $ids, array $media ) {
	if ( is_array( $node ) ) {
		if ( isset( $node['url'] ) && is_string( $node['url'] ) && str_starts_with( $node['url'], 'hc-media://' ) ) {
			$path = substr( $node['url'], strlen( 'hc-media://' ) );
			$id   = $media[ $path ] ?? 0;
			return array( 'url' => $id ? wp_get_attachment_url( $id ) : '', 'id' => $id ) + ( $id ? array( 'alt' => get_post_meta( $id, '_wp_attachment_image_alt', true ), 'source' => 'library' ) : array() );
		}
		foreach ( $node as $k => $v ) {
			$node[ $k ] = hc_resolve( $v, $lang, $ids, $media );
		}
		return $node;
	}
	if ( is_string( $node ) && str_contains( $node, 'hc-page://' ) ) {
		return preg_replace_callback(
			'#hc-page://([a-z0-9-]+)(\#[a-z0-9-]+)?#',
			function ( $m ) use ( $ids, $lang ) {
				$id = $ids[ $m[1] ][ $lang ] ?? 0;
				return ( $id ? get_permalink( $id ) : home_url( '/' ) ) . ( $m[2] ?? '' );
			},
			$node
		);
	}
	return $node;
}

/** Headings and texts of an Elementor tree as simple HTML (search, feeds, and a fallback if Elementor is switched off). */
function hc_plain_text( array $elements ): string {
	$out = '';
	foreach ( $elements as $el ) {
		$s = $el['settings'] ?? array();
		if ( 'heading' === ( $el['widgetType'] ?? '' ) && ! empty( $s['title'] ) ) {
			$out .= '<p><strong>' . wp_strip_all_tags( str_replace( '<br>', ' ', $s['title'] ) ) . '</strong></p>';
		} elseif ( 'text-editor' === ( $el['widgetType'] ?? '' ) && ! empty( $s['editor'] ) ) {
			$out .= wp_kses_post( $s['editor'] );
		}
		if ( ! empty( $el['elements'] ) ) {
			$out .= hc_plain_text( $el['elements'] );
		}
	}
	return $out;
}

/** Tools → Hotel Central import (for a real hosting account). */
add_action(
	'admin_menu',
	function () {
		add_management_page(
			'Hotel Central import',
			'Hotel Central import',
			'manage_options',
			'hc-import',
			function () {
				echo '<div class="wrap"><h1>Hotel Central import</h1>';
				if ( isset( $_POST['hc_import'] ) && check_admin_referer( 'hc_import' ) ) {
					$log = hc_site_import( hc_clean_media_base( (string) wp_unslash( $_POST['hc_media_base'] ?? '' ) ) );
					echo '<pre>' . esc_html( implode( "\n", $log ) ) . '</pre>';
				} elseif ( get_option( 'hc_import_done' ) ) {
					echo '<p>The site was imported on ' . esc_html( get_option( 'hc_import_done' ) ) . '.</p>';
				} else {
					echo '<p>Creates all pages (English and Bosnian, built with Elementor), menus and photos. Run it once, on a site with Elementor, Polylang and the Hotel Central theme active.</p>';
					echo '<form method="post">';
					wp_nonce_field( 'hc_import' );
					echo '<p><label>Photos from: <input type="text" class="regular-text" name="hc_media_base" value="' . esc_attr( HC_MEDIA_BASE_DEFAULT ) . '"></label></p>';
					submit_button( 'Import the site', 'primary', 'hc_import' );
					echo '</form>';
				}
				echo '</div>';
			}
		);
	}
);
