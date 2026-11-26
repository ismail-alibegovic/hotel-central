<?php
/**
 * Central Day Spa footer: centred logo over a line, four columns (address, contact, hours, sister sites), a bottom line.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$phone = hc_opt( 'spa_phone' );
$email = antispambot( hc_opt( 'spa_email' ) ? hc_opt( 'spa_email' ) : hc_opt( 'email' ) ); // CH-054: the spa's own address
$insta = hc_opt( 'instagram_spa' );
?>
<footer class="ds-footer" id="contact">
	<div class="ds-footer__top">
		<?php echo hc_logo( 'dayspa-on-dark.png', 'Central Day Spa', 'ds-footer__logo' ); // phpcs:ignore ?>
		<p class="ds-footer__muted"><?php echo esc_html( hc_tr( 'Central Day Spa is part of Hotel Central Sarajevo.', 'Central Day Spa je dio Hotela Central Sarajevo.' ) ); ?></p>
	</div>
	<div class="ds-footer__cols">
		<div>
			<p class="ds-footer__label"><?php echo esc_html( hc_tr( 'Address', 'Adresa' ) ); ?></p>
			<p><?php echo esc_html( hc_opt( 'address' ) ); ?></p>
			<p><a class="ds-footer__muted-link" href="https://www.google.com/maps/dir/?api=1&amp;destination=Hotel+Central,+%C4%86umurija+8,+Sarajevo" target="_blank" rel="noopener">Google Maps ↗︎</a></p>
		</div>
		<div>
			<p class="ds-footer__label"><?php echo esc_html( hc_tr( 'Contact', 'Kontakt' ) ); ?></p>
			<?php if ( $phone ) : ?><p><a href="<?php echo esc_attr( hc_tel( $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a></p><?php endif; ?>
			<p><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
			<?php if ( $insta ) : ?><p><a class="ds-footer__muted-link" href="<?php echo esc_url( $insta ); ?>" target="_blank" rel="noopener">Instagram · @central.day.spa ↗︎</a></p><?php endif; ?>
		</div>
		<div>
			<p class="ds-footer__label"><?php echo esc_html( hc_tr( 'Opening hours', 'Radno vrijeme' ) ); ?></p>
			<?php echo hc_hours_html( 'spa' ); // phpcs:ignore ?>
		</div>
		<div>
			<p class="ds-footer__label"><?php echo esc_html( hc_tr( 'Also at Hotel Central', 'Također u Hotelu Central' ) ); ?></p>
			<p><a href="<?php echo esc_url( hc_home_url() ); ?>">Hotel Central Sarajevo</a></p>
			<p><a href="<?php echo esc_url( hc_page_url( 'club' ) ); ?>">Central Fitness Club</a></p>
			<p><a href="<?php echo esc_url( hc_page_url( 'cafe' ) ); ?>">Central Café</a></p>
			<?php echo hc_languages(); // phpcs:ignore ?>
		</div>
	</div>
	<div class="ds-footer__bottom"><span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Hotel Central Sarajevo</span><?php hc_menu( 'legal_menu', 'hc-footer__legal' ); ?><em><?php echo esc_html( hc_tr( 'Relax · Restore · Rebalance', 'Opuštanje · Obnova · Ravnoteža' ) ); ?></em></div>
</footer>
