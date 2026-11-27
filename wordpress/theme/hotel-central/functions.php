<?php
/**
 * Hotel Central — child theme of Hello Elementor.
 *
 * Elementor (free) builds every page's content. What Elementor Free cannot do — a different header and footer per site
 * (Theme Builder is an Elementor Pro feature) — lives here: three headers and footers, chosen by the page's "brand":
 *   hotel  → Hotel Central (olive, Gilda Display)
 *   spa    → Central Day Spa (wine/lilac, Playfair Display + DM Sans)
 *   club   → Central Fitness Club (CFC green/cream, Jost)
 * The brand is stored in the page field "hc_brand" (set by the import; child pages inherit it from their parent).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HC_THEME_VERSION', '1.1.0' );

add_action(
	'after_setup_theme',
	function () {
		register_nav_menus(
			array(
				'hotel_menu' => 'Hotel Central — main menu',
				'spa_menu'   => 'Central Day Spa — menu',
				'club_menu'  => 'Central Fitness Club — menu',
				'legal_menu' => 'Footer — small links (privacy, FAQ…)',
			)
		);
		add_theme_support( 'title-tag' );
	}
);

/** The page's brand: its own field, or its parent's, or "hotel". */
function hc_brand(): string {
	if ( ! is_singular() ) {
		return 'hotel';
	}
	$id = get_queried_object_id();
	while ( $id ) {
		$b = get_post_meta( $id, 'hc_brand', true );
		if ( in_array( $b, array( 'hotel', 'spa', 'club' ), true ) ) {
			return $b;
		}
		$id = wp_get_post_parent_id( $id );
	}
	return 'hotel';
}

/** Theme-safe access to the plugin's settings (the theme still renders if the plugin is off). */
function hc_opt( string $key ): string {
	return function_exists( 'hc_setting' ) ? hc_setting( $key ) : '';
}

function hc_tr( string $en, string $bs ): string {
	$lang = function_exists( 'pll_current_language' ) ? pll_current_language() : 'en';
	return 'bs' === $lang ? $bs : $en;
}

/** Address of a page by its import key ("dayspa", "club-membership"…) in the current language. */
function hc_page_url( string $key, string $fallback = '/' ): string {
	$map  = get_option( 'hc_page_map', array() );
	$lang = function_exists( 'pll_current_language' ) && pll_current_language() ? pll_current_language() : 'en';
	$id   = $map[ $key ][ $lang ] ?? ( $map[ $key ]['en'] ?? 0 );
	return $id ? get_permalink( $id ) : home_url( $fallback );
}

function hc_home_url(): string {
	return function_exists( 'pll_home_url' ) ? pll_home_url() : home_url( '/' );
}

add_filter(
	'body_class',
	function ( $classes ) {
		$classes[] = 'hc-site';
		$classes[] = 'brand-' . hc_brand();
		return $classes;
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style( 'hc-fonts', 'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Inter:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Archivo:wdth,wght@62..125,400..800&display=swap', array(), null );
		wp_enqueue_style( 'hello-elementor', get_template_directory_uri() . '/style.css', array(), HC_THEME_VERSION );
		wp_enqueue_style( 'hotel-central', get_stylesheet_uri(), array( 'hello-elementor', 'hc-fonts' ), HC_THEME_VERSION );
		wp_enqueue_script( 'hotel-central', get_stylesheet_directory_uri() . '/assets/js/site.js', array(), HC_THEME_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
	},
	20
);

// Hello Elementor's own header/footer and page title are replaced by ours.
add_filter( 'hello_elementor_page_title', '__return_false' );
add_filter( 'hello_elementor_header_footer', '__return_true' );

/** Logo image from the theme. */
function hc_logo( string $file, string $alt, string $class = '' ): string {
	return sprintf( '<img class="%s" src="%s" alt="%s" decoding="async">', esc_attr( $class ), esc_url( get_stylesheet_directory_uri() . '/assets/brand/' . $file ), esc_attr( $alt ) );
}

/** Language links (EN / BS) to this page's translation. */
function hc_languages(): string {
	if ( ! function_exists( 'pll_the_languages' ) ) {
		return '';
	}
	$langs = pll_the_languages( array( 'raw' => 1, 'hide_if_no_translation' => 0 ) );
	$out   = '';
	foreach ( (array) $langs as $l ) {
		$out .= sprintf( '<a href="%s" hreflang="%s" lang="%s"%s>%s</a>', esc_url( $l['url'] ), esc_attr( $l['slug'] ), esc_attr( $l['slug'] ), $l['current_lang'] ? ' aria-current="true"' : '', esc_html( strtoupper( $l['slug'] ) ) );
	}
	return '<nav class="hc-langs" aria-label="' . esc_attr( hc_tr( 'Language', 'Jezik' ) ) . '">' . $out . '</nav>';
}

function hc_menu( string $location, string $class ): void {
	if ( has_nav_menu( $location ) ) {
		// Two levels: a page inside a section (e.g. Central Café under About) shows as a smaller entry below its parent.
		wp_nav_menu( array( 'theme_location' => $location, 'container' => false, 'menu_class' => $class, 'depth' => 2, 'fallback_cb' => false ) );
	}
}

/** Opening hours lines (e.g. for footers), or the "call us" fallback. */
function hc_hours_html( string $place ): string {
	return do_shortcode( '[hc_hours place="' . esc_attr( $place ) . '"]' );
}
