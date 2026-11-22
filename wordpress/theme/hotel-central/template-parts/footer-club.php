<?php
/**
 * Central Fitness Club footer: dark, a big "Questions? Write to us", then address, contact, hours and the sister sites.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$phone = hc_opt( 'club_phone' ) ? hc_opt( 'club_phone' ) : hc_opt( 'phone' );
$email = antispambot( hc_opt( 'email' ) );
$insta = hc_opt( 'instagram_club' );
$book  = hc_opt( 'club_booking_url' );
$book  = $book ? str_replace( '/en/', '/' . hc_lang() . '/', $book ) : '';
?>
<footer class="cfc-footer" id="contact">
	<div class="cfc-footer__top">
		<p class="cfc-footer__title"><?php echo esc_html( hc_tr( 'Questions?', 'Imate pitanja?' ) ); ?><br><span><?php echo esc_html( hc_tr( 'Write to us', 'Pišite nam' ) ); ?></span></p>
		<a class="cfc-footer__write" href="mailto:<?php echo esc_attr( $email ); ?>?subject=Central%20Fitness%20Club"><?php echo esc_html( hc_tr( 'Contact', 'Kontakt' ) ); ?> →</a>
	</div>
	<div class="cfc-footer__cols">
		<div class="cfc-footer__brand"><?php echo hc_logo( 'cfc-white.png', 'Central Fitness Club' ); // phpcs:ignore ?><p><?php echo esc_html( hc_tr( 'Central Fitness Club is part of Hotel Central Sarajevo.', 'Central Fitness Club je dio Hotela Central Sarajevo.' ) ); ?></p></div>
		<div>
			<p class="cfc-footer__label"><?php echo esc_html( hc_tr( 'Address', 'Adresa' ) ); ?></p>
			<p><?php echo esc_html( hc_opt( 'address' ) ); ?></p>
			<p><a href="https://www.google.com/maps/dir/?api=1&amp;destination=Hotel+Central,+%C4%86umurija+8,+Sarajevo" target="_blank" rel="noopener">Google Maps ↗︎</a></p>
		</div>
		<div>
			<p class="cfc-footer__label"><?php echo esc_html( hc_tr( 'Contact', 'Kontakt' ) ); ?></p>
			<?php if ( $phone ) : ?><p><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a></p><?php endif; ?>
			<p><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
			<?php if ( $book ) : ?><p><a href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener"><?php echo esc_html( hc_tr( 'Book a class online', 'Rezervišite čas online' ) ); ?> ↗︎</a></p><?php endif; ?>
			<?php if ( $insta ) : ?><p><a href="<?php echo esc_url( $insta ); ?>" target="_blank" rel="noopener">Instagram · @central.fitness.club ↗︎</a></p><?php endif; ?>
			<p class="cfc-footer__label"><?php echo esc_html( hc_tr( 'Opening hours', 'Radno vrijeme' ) ); ?></p>
			<?php echo hc_hours_html( 'club' ); // phpcs:ignore ?>
		</div>
		<div>
			<p class="cfc-footer__label"><?php echo esc_html( hc_tr( 'Also at Hotel Central', 'Također u Hotelu Central' ) ); ?></p>
			<p><a href="<?php echo esc_url( hc_page_url( 'dayspa' ) ); ?>">Central Day Spa</a></p>
			<p><a href="<?php echo esc_url( hc_page_url( 'cafe' ) ); ?>">Central Café</a></p>
			<p><a href="<?php echo esc_url( hc_home_url() ); ?>">Hotel Central Sarajevo</a></p>
			<?php echo hc_languages(); // phpcs:ignore ?>
		</div>
	</div>
	<div class="cfc-footer__bottom"><span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Hotel Central Sarajevo</span><?php hc_menu( 'legal_menu', 'hc-footer__legal' ); ?><strong>Feel your power</strong></div>
</footer>
