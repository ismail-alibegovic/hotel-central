<?php
/**
 * Central Fitness Club header: dark, transparent over the hero photograph, white CFC logo and "Become a member".
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<header class="cfc-header" data-hc-header>
	<div class="cfc-header__bar">
		<a class="cfc-header__logo" href="<?php echo esc_url( hc_page_url( 'club' ) ); ?>" aria-label="Central Fitness Club">
			<?php echo hc_logo( 'cfc-white.png', '', 'is-full' ); // phpcs:ignore ?>
			<?php echo hc_logo( 'cfc-white-wordmark.png', '', 'is-wordmark' ); // phpcs:ignore ?>
		</a>
		<nav class="cfc-header__nav" aria-label="Central Fitness Club">
			<?php hc_menu( 'club_menu', 'cfc-nav' ); ?>
			<a class="cfc-header__hotel" href="<?php echo esc_url( hc_home_url() ); ?>">← Hotel Central</a>
		</nav>
		<div class="cfc-header__right">
			<?php echo hc_languages(); // phpcs:ignore ?>
			<a class="cfc-header__join" href="<?php echo esc_url( hc_page_url( 'club-membership' ) ); ?>"><?php echo esc_html( hc_tr( 'Become a member', 'Postani član' ) ); ?> →</a>
			<button class="hc-menu-toggle cfc-toggle" type="button" aria-expanded="false" aria-controls="cfc-menu" data-hc-menu-toggle><span class="hc-burger" aria-hidden="true"><i></i><i></i></span><span class="screen-reader-text"><?php echo esc_html( hc_tr( 'Menu', 'Meni' ) ); ?></span></button>
		</div>
	</div>
	<div class="hc-menu cfc-menu" id="cfc-menu" hidden data-hc-menu>
		<div class="hc-menu__inner">
			<?php hc_menu( 'club_menu', 'hc-menu__list' ); ?>
			<div class="hc-menu__aside">
				<p><a class="cfc-header__join" href="<?php echo esc_url( hc_page_url( 'club-membership' ) ); ?>"><?php echo esc_html( hc_tr( 'Become a member', 'Postani član' ) ); ?> →</a></p>
				<?php if ( hc_opt( 'instagram_club' ) ) : ?><p><a href="<?php echo esc_url( hc_opt( 'instagram_club' ) ); ?>" target="_blank" rel="noopener">Instagram ↗</a></p><?php endif; ?>
				<p><a href="<?php echo esc_url( hc_home_url() ); ?>">← Hotel Central</a></p>
			</div>
		</div>
	</div>
</header>
