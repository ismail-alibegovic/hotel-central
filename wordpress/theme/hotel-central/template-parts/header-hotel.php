<?php
/**
 * Hotel Central header: menu button, the hotel logo (CH-001) and an always-visible "Book now" (CH-003).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$book  = hc_opt( 'booking_url' );
$phone = hc_opt( 'phone' );
?>
<header class="hc-header" data-hc-header>
	<div class="hc-header__bar">
		<div class="hc-header__left">
			<button class="hc-menu-toggle" type="button" aria-expanded="false" aria-controls="hc-menu" data-hc-menu-toggle>
				<span class="hc-burger" aria-hidden="true"><i></i><i></i></span>
				<span class="hc-menu-toggle__label" data-open="<?php echo esc_attr( hc_tr( 'Menu', 'Meni' ) ); ?>" data-close="<?php echo esc_attr( hc_tr( 'Close', 'Zatvori' ) ); ?>"><?php echo esc_html( hc_tr( 'Menu', 'Meni' ) ); ?></span>
			</button>
			<?php echo hc_languages(); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped inside. ?>
		</div>
		<a class="hc-header__logo" href="<?php echo esc_url( hc_home_url() ); ?>" aria-label="Hotel Central Sarajevo">
			<?php echo hc_logo( 'hotel-central-white.png', '' ); // phpcs:ignore ?>
		</a>
		<div class="hc-header__right">
			<a class="hc-header__link" href="<?php echo esc_url( hc_page_url( 'rooms' ) ); ?>"><?php echo esc_html( hc_tr( 'Rooms', 'Sobe' ) ); ?></a>
			<?php if ( $book ) : ?>
				<a class="hc-book" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book now', 'Rezerviši' ) ); ?></a>
			<?php endif; ?>
		</div>
	</div>
	<div class="hc-menu" id="hc-menu" hidden data-hc-menu>
		<div class="hc-menu__inner">
			<?php hc_menu( 'hotel_menu', 'hc-menu__list' ); ?>
			<div class="hc-menu__aside">
				<p class="hc-menu__label"><?php echo esc_html( hc_tr( 'Reservations', 'Rezervacije' ) ); ?></p>
				<?php if ( $phone ) : ?>
					<p><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a></p>
				<?php endif; ?>
				<p><a href="mailto:<?php echo esc_attr( antispambot( hc_opt( 'email' ) ) ); ?>"><?php echo esc_html( antispambot( hc_opt( 'email' ) ) ); ?></a></p>
				<p><?php echo esc_html( hc_opt( 'address' ) ); ?></p>
				<?php if ( $book ) : ?>
					<p><a class="hc-book" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book now', 'Rezerviši' ) ); ?></a></p>
				<?php endif; ?>
			</div>
		</div>
	</div>
</header>
<?php if ( $book ) : ?>
	<a class="hc-mobile-book" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book your stay', 'Rezervišite boravak' ) ); ?></a>
<?php endif; ?>
