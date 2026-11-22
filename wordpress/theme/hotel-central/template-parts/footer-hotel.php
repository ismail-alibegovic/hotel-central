<?php
/**
 * Hotel Central footer: the hotel logo instead of the large wordmark (CH-018), contact, menu, legal links (CH-020).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$book  = hc_opt( 'booking_url' );
$phone = hc_opt( 'phone' );
$email = antispambot( hc_opt( 'email' ) );
?>
<footer class="hc-footer">
	<div class="hc-footer__strip">
		<p><span><?php echo esc_html( hc_tr( 'Reservations', 'Rezervacije' ) ); ?></span> <?php echo esc_html( hc_tr( 'Book directly with Hotel Central for the best rate.', 'Rezervišite direktno kod Hotela Central.' ) ); ?></p>
		<div class="hc-footer__strip-actions">
			<?php if ( $phone ) : ?><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a><?php endif; ?>
			<?php if ( $book ) : ?><a class="hc-book" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book now', 'Rezerviši' ) ); ?></a><?php endif; ?>
		</div>
	</div>
	<div class="hc-footer__logo"><?php echo hc_logo( 'hotel-central-white.png', 'Hotel Central Sarajevo' ); // phpcs:ignore ?></div>
	<div class="hc-footer__cols">
		<div>
			<p class="hc-footer__label"><?php echo esc_html( hc_tr( 'Address', 'Adresa' ) ); ?></p>
			<p>Hotel Central Sarajevo<br><?php echo esc_html( hc_opt( 'address' ) ); ?></p>
			<p><a href="https://www.google.com/maps/dir/?api=1&amp;destination=Hotel+Central,+%C4%86umurija+8,+Sarajevo" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Directions', 'Upute' ) ); ?> ↗︎</a></p>
		</div>
		<div>
			<p class="hc-footer__label"><?php echo esc_html( hc_tr( 'Contact', 'Kontakt' ) ); ?></p>
			<?php if ( $phone ) : ?><p><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a></p><?php endif; ?>
			<p><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
			<p class="hc-footer__small"><?php echo esc_html( hc_opt( 'hours_checkin' ) ); ?></p>
		</div>
		<div>
			<p class="hc-footer__label"><?php echo esc_html( hc_tr( 'Explore', 'Istražite' ) ); ?></p>
			<?php hc_menu( 'hotel_menu', 'hc-footer__menu' ); ?>
		</div>
		<div>
			<p class="hc-footer__label"><?php echo esc_html( hc_tr( 'Follow', 'Pratite nas' ) ); ?></p>
			<?php echo do_shortcode( '[hc_social]' ); ?>
			<?php echo hc_languages(); // phpcs:ignore ?>
		</div>
	</div>
	<div class="hc-footer__bottom">
		<span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Hotel Central Sarajevo</span>
		<?php hc_menu( 'legal_menu', 'hc-footer__legal' ); ?>
	</div>
</footer>
