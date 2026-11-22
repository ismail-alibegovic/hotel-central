<?php
/**
 * Central Day Spa header: links on the left, the logo in the centre, booking on the right;
 * light logo over the photograph, wine logo on cream once scrolled.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$book  = hc_opt( 'spa_booking_url' );
$lang  = function_exists( 'pll_current_language' ) && pll_current_language() ? pll_current_language() : 'en';
$book  = $book ? str_replace( '/en/', '/' . $lang . '/', $book ) : '';
$phone = hc_opt( 'spa_phone' );
?>
<header class="ds-header" data-hc-header>
	<div class="ds-header__bar">
		<a class="ds-header__logo" href="<?php echo esc_url( hc_page_url( 'dayspa' ) ); ?>" aria-label="Central Day Spa">
			<?php echo hc_logo( 'dayspa-on-dark.png', '', 'is-light' ); // phpcs:ignore ?>
			<?php echo hc_logo( 'dayspa-on-light-wordmark.png', '', 'is-dark' ); // phpcs:ignore ?>
		</a>
		<nav class="ds-header__nav" aria-label="Central Day Spa">
			<?php hc_menu( 'spa_menu', 'ds-nav' ); ?>
			<a class="ds-header__hotel" href="<?php echo esc_url( hc_home_url() ); ?>">← Hotel Central</a>
		</nav>
		<div class="ds-header__right">
			<?php echo hc_languages(); // phpcs:ignore ?>
			<?php if ( $book ) : ?>
				<a class="ds-header__book" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book a treatment', 'Rezerviši tretman' ) ); ?> <i aria-hidden="true">→</i></a>
			<?php endif; ?>
			<button class="hc-menu-toggle ds-toggle" type="button" aria-expanded="false" aria-controls="ds-menu" data-hc-menu-toggle><span class="hc-burger" aria-hidden="true"><i></i><i></i></span><span class="screen-reader-text"><?php echo esc_html( hc_tr( 'Menu', 'Meni' ) ); ?></span></button>
		</div>
	</div>
	<div class="hc-menu ds-menu" id="ds-menu" hidden data-hc-menu>
		<div class="hc-menu__inner">
			<?php hc_menu( 'spa_menu', 'hc-menu__list' ); ?>
			<div class="hc-menu__aside">
				<?php if ( $phone ) : ?><p><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>">✆ <?php echo esc_html( $phone ); ?></a></p><?php endif; ?>
				<?php if ( hc_opt( 'instagram_spa' ) ) : ?><p><a href="<?php echo esc_url( hc_opt( 'instagram_spa' ) ); ?>" target="_blank" rel="noopener">Instagram ↗︎</a></p><?php endif; ?>
				<p><a href="<?php echo esc_url( hc_home_url() ); ?>">← Hotel Central</a></p>
			</div>
		</div>
	</div>
</header>
