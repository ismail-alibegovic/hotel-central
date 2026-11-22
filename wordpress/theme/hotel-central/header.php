<?php
/**
 * Header: one of three, by the page's brand (see functions.php → hc_brand()).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$brand = hc_brand();
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#content"><?php echo esc_html( hc_tr( 'Skip to content', 'Preskoči na sadržaj' ) ); ?></a>
<?php get_template_part( 'template-parts/header', $brand ); ?>
<main id="content" class="hc-main">
