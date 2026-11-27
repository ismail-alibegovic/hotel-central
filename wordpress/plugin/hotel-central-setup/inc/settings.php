<?php
/**
 * Site-wide details edited by hotel staff in Appearance → Customize → Hotel Central.
 * Pages, headers and footers read them through hc_setting(), so a phone number or opening hours change in one place.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Fields: key => [label, translated per language?]. */
function hc_setting_fields(): array {
	return array(
		'phone'           => array( 'Main phone (reception)', false ),
		'email'           => array( 'Main e-mail', false ),
		'spa_phone'       => array( 'Central Day Spa phone', false ),
		'spa_email'       => array( 'Central Day Spa e-mail', false ),
		'club_phone'      => array( 'Central Fitness Club phone', false ),
		'address'         => array( 'Address (one line)', false ),
		'booking_url'     => array( 'Room booking address (eZee)', false ),
		'spa_booking_url' => array( 'Spa booking address (Lime Booking)', false ),
		'club_booking_url' => array( 'Club class booking address (Lime Booking)', false ),
		'facebook'        => array( 'Facebook', false ),
		'instagram_hotel' => array( 'Instagram — Hotel Central', false ),
		'instagram_club'  => array( 'Instagram — Central Fitness Club', false ),
		'instagram_spa'   => array( 'Instagram — Central Day Spa', false ),
		'hours_spa'       => array( 'Opening hours — Day Spa', true ),
		'hours_club'      => array( 'Opening hours — Fitness Club', true ),
		'hours_cafe'      => array( 'Opening hours — Central Café', true ),
		'hours_breakfast' => array( 'Breakfast hours', true ),
		'hours_checkin'   => array( 'Check-in / check-out', true ),
	);
}

function hc_lang(): string {
	$lang = function_exists( 'pll_current_language' ) ? pll_current_language() : '';
	return $lang ? $lang : 'en';
}

/** A setting in the current language (translated fields are stored as key_en / key_bs). */
function hc_setting( string $key, string $lang = '' ): string {
	$all    = get_option( 'hc_settings', array() );
	$fields = hc_setting_fields();
	if ( ! empty( $fields[ $key ][1] ) ) {
		$key = $key . '_' . ( $lang ? $lang : hc_lang() );
	}
	return isset( $all[ $key ] ) ? trim( (string) $all[ $key ] ) : '';
}

function hc_tel( string $phone ): string {
	return 'tel:' . preg_replace( '/[^0-9+]/', '', $phone );
}

add_action(
	'customize_register',
	function ( WP_Customize_Manager $c ) {
		$c->add_section(
			'hotel_central',
			array(
				'title'       => 'Hotel Central',
				'description' => 'Phone numbers, e-mail, booking links, social profiles and opening hours. Used on every page, in the headers and footers of the hotel, the Day Spa and the Fitness Club. Empty opening hours show “Call us for today’s hours”.',
				'priority'    => 30,
			)
		);
		foreach ( hc_setting_fields() as $key => list( $label, $translated ) ) {
			foreach ( $translated ? array( 'en', 'bs' ) : array( '' ) as $lang ) {
				$id = $lang ? "{$key}_{$lang}" : $key;
				$c->add_setting( "hc_settings[$id]", array( 'type' => 'option', 'sanitize_callback' => str_contains( $key, 'url' ) || str_starts_with( $key, 'instagram' ) || 'facebook' === $key ? 'esc_url_raw' : 'sanitize_text_field' ) );
				$c->add_control( "hc_settings[$id]", array( 'section' => 'hotel_central', 'label' => $label . ( $lang ? ' (' . strtoupper( $lang ) . ')' : '' ), 'type' => 'text' ) );
			}
		}
	}
);
