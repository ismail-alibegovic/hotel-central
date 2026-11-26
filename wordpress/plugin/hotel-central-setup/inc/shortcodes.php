<?php
/**
 * Shortcodes used inside Elementor's free "Shortcode" widget, so phone numbers and opening hours come from one place.
 *   [hc_contact what="phone|email|spa_phone|spa_email|club_phone" style="button"]
 *   [hc_hours place="spa|club|cafe|breakfast|checkin"]
 *   [hc_social]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function hc_t( string $en, string $bs ): string {
	return 'bs' === hc_lang() ? $bs : $en;
}

add_shortcode(
	'hc_contact',
	function ( $atts ) {
		$a     = shortcode_atts( array( 'what' => 'phone', 'style' => '' ), $atts );
		$value = hc_setting( $a['what'] );
		if ( '' === $value && 'club_phone' === $a['what'] ) {
			$value = hc_setting( 'phone' );
		}
		if ( '' === $value && 'spa_email' === $a['what'] ) {
			$value = hc_setting( 'email' );
		}
		if ( '' === $value ) {
			return '';
		}
		$is_mail = in_array( $a['what'], array( 'email', 'spa_email' ), true );
		$href    = $is_mail ? 'mailto:' . antispambot( $value ) : hc_tel( $value );
		$label   = $is_mail ? antispambot( $value ) : $value;
		if ( 'button' === $a['style'] ) {
			return sprintf( '<a class="hc-contact-button" href="%s">%s %s</a>', esc_attr( $href ), $is_mail ? '✉' : '✆', esc_html( $label ) );
		}
		return sprintf( '<a class="hc-contact-link" href="%s">%s</a>', esc_attr( $href ), esc_html( $label ) );
	}
);

add_shortcode(
	'hc_hours',
	function ( $atts ) {
		$a     = shortcode_atts( array( 'place' => 'spa' ), $atts );
		$hours = hc_setting( 'hours_' . sanitize_key( $a['place'] ) );
		if ( '' === $hours ) {
			return '<p class="hc-hours hc-hours--empty">' . esc_html( hc_t( 'Call us for today’s hours.', 'Pozovite nas za današnje radno vrijeme.' ) ) . '</p>';
		}
		return '<p class="hc-hours">' . nl2br( esc_html( $hours ) ) . '</p>';
	}
);

add_shortcode(
	'hc_social',
	function () {
		$links = array(
			'Facebook'                       => hc_setting( 'facebook' ),
			'Instagram · Hotel Central'      => hc_setting( 'instagram_hotel' ),
			'Instagram · Central Fitness Club' => hc_setting( 'instagram_club' ),
			'Instagram · Central Day Spa'    => hc_setting( 'instagram_spa' ),
		);
		$out = '';
		foreach ( array_filter( $links ) as $label => $url ) {
			$out .= sprintf( '<li><a href="%s" target="_blank" rel="noopener">%s</a></li>', esc_url( $url ), esc_html( $label ) );
		}
		return $out ? '<ul class="hc-social">' . $out . '</ul>' : '';
	}
);
