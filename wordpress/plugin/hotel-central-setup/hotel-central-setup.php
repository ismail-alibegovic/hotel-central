<?php
/**
 * Plugin Name:       Hotel Central — site settings & content import
 * Description:       Contact details, opening hours and social links for Hotel Central, Central Day Spa and Central Fitness Club (Appearance → Customize → Hotel Central), the shortcodes the pages use, and a one-time import of all pages (Elementor, English + Bosnian), menus and photos.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            Hotel Central Sarajevo
 * Text Domain:       hotel-central
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HC_SETUP_DIR', __DIR__ );

require_once __DIR__ . '/inc/settings.php';
require_once __DIR__ . '/inc/shortcodes.php';
require_once __DIR__ . '/inc/seo.php';
require_once __DIR__ . '/inc/import.php';

/*
 * Polylang only loads its API (PLL(), pll_*) in a context it recognises; a script that loads WordPress
 * to run the import (WP-CLI eval, the Playground blueprint) is none of them before any language exists.
 * Defining HC_IMPORTING before loading WordPress runs Polylang as in the dashboard.
 */
add_filter(
	'pll_context',
	static function ( $context ) {
		return defined( 'HC_IMPORTING' ) && HC_IMPORTING ? 'PLL_Admin' : $context;
	}
);
