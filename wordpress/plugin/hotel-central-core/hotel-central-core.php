<?php
/**
 * Plugin Name: Hotel Central Core
 * Description: Rooms, offers, hotel information, booking bar, rooms carousel, contact form, SEO and redirects for the Hotel Central Sarajevo website. Works with the hotel-central theme, Elementor (free) and Polylang (free).
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Text Domain: hotel-central
 */
if (!defined('ABSPATH')) exit;
define('HC_DIR', plugin_dir_path(__FILE__));
define('HC_URL', plugin_dir_url(__FILE__));
foreach (['helpers', 'cpt', 'info', 'shortcodes', 'contact', 'seo', 'redirects', 'admin'] as $f) require_once HC_DIR . "inc/$f.php";
register_activation_hook(__FILE__, function () { hc_register_cpts(); flush_rewrite_rules(); });
