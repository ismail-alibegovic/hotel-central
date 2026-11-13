<?php
if (!defined('ABSPATH')) exit;
/* Admin UI: room fields, search-engine fields on pages / rooms / offers, simple photo picker. */

add_action('add_meta_boxes', function () {
    add_meta_box('hc_room', 'Room details', 'hc_room_box', 'hc_room', 'normal', 'high');
    add_meta_box('hc_offer', 'Offer details', 'hc_offer_box', 'hc_offer', 'normal', 'high');
    foreach (['page', 'hc_room', 'hc_offer'] as $pt) add_meta_box('hc_seo', 'Search engines & sharing', 'hc_seo_box', $pt, 'normal', 'default');
});
add_action('init', function () { add_post_type_support('page', 'excerpt'); });

function hc_room_box($post) {
    wp_nonce_field('hc_room', 'hc_room_n');
    echo '<table class="form-table">';
    foreach (hc_room_fields() as $k => [$label, $type, $help]) {
        $v = get_post_meta($post->ID, $k, true);
        echo '<tr><th><label for="' . esc_attr($k) . '">' . esc_html($label) . '</label></th><td>';
        if ($type === 'textarea') printf('<textarea class="large-text" rows="4" id="%1$s" name="%1$s">%2$s</textarea>', esc_attr($k), esc_textarea($v));
        elseif ($type === 'gallery') {
            printf('<input type="hidden" id="%1$s" name="%1$s" value="%2$s"><div id="hc-gal" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px">', esc_attr($k), esc_attr($v));
            foreach (array_filter(explode(',', (string) $v)) as $id) echo '<img data-id="' . (int) $id . '" src="' . esc_url(wp_get_attachment_image_url((int) $id, 'thumbnail')) . '" style="width:90px;height:90px;object-fit:cover">';
            echo '</div><button type="button" class="button" id="hc-pick">Choose photographs…</button>';
        } elseif ($k === 'hc_room_type_id' && !current_user_can('manage_options')) {
            printf('<input class="regular-text" type="text" value="%s" readonly disabled> <em>Set by an administrator (booking integration).</em>', esc_attr($v));
        } else printf('<input class="regular-text" type="%1$s" id="%2$s" name="%2$s" value="%3$s">', esc_attr($type), esc_attr($k), esc_attr($v));
        if ($help) echo '<p class="description">' . esc_html($help) . '</p>';
        echo '</td></tr>';
    }
    echo '</table><p class="description">The room name is the title above, the short summary is the Excerpt. Create the Bosnian version with the language box (+ icon) on the right.</p>';
}
add_action('save_post_hc_room', function ($id) {
    if (!isset($_POST['hc_room_n']) || !wp_verify_nonce($_POST['hc_room_n'], 'hc_room') || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $id)) return;
    foreach (hc_room_fields() as $k => [$l, $type]) if (isset($_POST[$k]) && ($k !== 'hc_room_type_id' || current_user_can('manage_options'))) update_post_meta($id, $k, $type === 'textarea' ? sanitize_textarea_field(wp_unslash($_POST[$k])) : sanitize_text_field(wp_unslash($_POST[$k])));
});

function hc_offer_box($post) {
    wp_nonce_field('hc_offer', 'hc_offer_n'); echo '<table class="form-table">';
    foreach (hc_offer_fields() as $k => [$label, $type, $help]) printf('<tr><th><label for="%1$s">%2$s</label></th><td><input class="large-text" type="%3$s" id="%1$s" name="%1$s" value="%4$s"><p class="description">%5$s</p></td></tr>', esc_attr($k), esc_html($label), esc_attr($type), esc_attr(get_post_meta($post->ID, $k, true)), esc_html($help));
    echo '</table><p class="description">Title = offer name; the Excerpt = short description shown on the cards; Featured image (right) = photograph.</p>';
}
add_action('save_post_hc_offer', function ($id) {
    if (!isset($_POST['hc_offer_n']) || !wp_verify_nonce($_POST['hc_offer_n'], 'hc_offer') || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $id)) return;
    foreach (hc_offer_fields() as $k => [$l, $type]) if (isset($_POST[$k])) update_post_meta($id, $k, $type === 'url' ? esc_url_raw(wp_unslash($_POST[$k])) : sanitize_text_field(wp_unslash($_POST[$k])));
});

function hc_seo_box($post) {
    wp_nonce_field('hc_seo', 'hc_seo_n');
    $t = get_post_meta($post->ID, '_hc_seo_title', true); $d = get_post_meta($post->ID, '_hc_seo_desc', true); $i = get_post_meta($post->ID, '_hc_seo_image', true);
    echo '<p><label>Page title (browser tab & search results)<br><input class="large-text" name="_hc_seo_title" value="' . esc_attr($t) . '"></label></p>';
    echo '<p><label>Description (search results & link previews; the Excerpt is used when empty)<br><textarea class="large-text" rows="2" name="_hc_seo_desc">' . esc_textarea($d) . '</textarea></label></p>';
    echo '<p>Sharing image (optional)<br><input type="hidden" id="hc_seo_image" name="_hc_seo_image" value="' . esc_attr($i) . '"><span id="hc_seo_thumb">' . ($i ? wp_get_attachment_image((int) $i, [120, 80]) : '') . '</span> <button type="button" class="button" id="hc_seo_pick">Choose image…</button> <button type="button" class="button-link" id="hc_seo_clear">remove</button></p>';
    echo '<p class="description">Picture alt texts (for search engines and screen readers) are edited in Media → Library → click the picture → "Alternative Text". The address (URL slug) is in the page\'s Permalink / Quick Edit.</p>';
    echo '<script>jQuery(function($){var f;$("#hc_seo_pick").on("click",function(e){e.preventDefault();f=f||wp.media({title:"Sharing image",multiple:false,library:{type:"image"}});f.off("select").on("select",function(){var a=f.state().get("selection").first().toJSON();$("#hc_seo_image").val(a.id);$("#hc_seo_thumb").html("<img src=\""+(a.sizes&&a.sizes.thumbnail?a.sizes.thumbnail.url:a.url)+"\" style=\"max-width:120px;height:auto\">")});f.open()});$("#hc_seo_clear").on("click",function(){$("#hc_seo_image").val("");$("#hc_seo_thumb").empty()})});</script>';
}
add_action('save_post', function ($id) {
    if (!isset($_POST['hc_seo_n']) || !wp_verify_nonce($_POST['hc_seo_n'], 'hc_seo') || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $id)) return;
    foreach (['_hc_seo_title', '_hc_seo_desc', '_hc_seo_image'] as $k) if (isset($_POST[$k])) update_post_meta($id, $k, sanitize_textarea_field(wp_unslash($_POST[$k])));
});
add_action('admin_enqueue_scripts', function ($hook) {
    if (!in_array($hook, ['post.php', 'post-new.php'], true)) return;
    wp_enqueue_media();
    wp_add_inline_script('jquery', <<<'JS'
jQuery(function($){var f;$('#hc-pick').on('click',function(e){e.preventDefault();f=f||wp.media({title:'Room photographs',multiple:'add',library:{type:'image'}});f.off('select').on('select',function(){var ids=[],h='';f.state().get('selection').each(function(a){ids.push(a.id);var u=(a.attributes.sizes&&a.attributes.sizes.thumbnail||a.attributes).url;h+='<img data-id="'+a.id+'" src="'+u+'" style="width:90px;height:90px;object-fit:cover">';});$('#hc_gallery').val(ids.join(','));$('#hc-gal').html(h);});f.on('open',function(){var s=f.state().get('selection');($('#hc_gallery').val()||'').split(',').filter(Boolean).forEach(function(id){s.add(wp.media.attachment(id));});});f.open();});});
JS);
});


/* ───────── Roles: what a hotel Editor may do ─────────
   WordPress Editors already manage pages, rooms, offers, media and Elementor. We add one capability so they can maintain the
   navigation menus (Appearance → Menus) without touching themes or plugins. Booking settings stay administrator-only (see info.php). */
add_action('admin_init', function () {
    if (get_option('hc_caps_version') >= 1) return;
    if ($r = get_role('editor')) $r->add_cap('edit_theme_options');
    update_option('hc_caps_version', 1);
});
register_activation_hook(HC_DIR . 'hotel-central-core.php', function () { if ($r = get_role('editor')) $r->add_cap('edit_theme_options'); });
add_action('admin_menu', function () {
    if (current_user_can('manage_options')) return;
    // editors get Menus only: no theme customiser, widgets or editor screens
    remove_submenu_page('themes.php', 'customize.php'); remove_submenu_page('themes.php', 'themes.php'); remove_submenu_page('themes.php', 'widgets.php');
}, 999);
add_action('admin_menu', function () { // runs last: whatever WordPress, the theme or Elementor added, an Editor keeps Appearance → Menus only
    if (current_user_can('manage_options')) return;
    global $submenu;
    if (!empty($submenu['themes.php'])) $submenu['themes.php'] = array_values(array_filter($submenu['themes.php'], function ($i) { return $i[2] === 'nav-menus.php'; }));
    remove_menu_page('tools.php'); remove_menu_page('edit-comments.php');
}, PHP_INT_MAX);
add_action('admin_init', function () {
    global $pagenow; if (current_user_can('manage_options')) return;
    if (in_array($pagenow, ['themes.php', 'customize.php', 'widgets.php', 'site-editor.php'], true) && !isset($_GET['page'])) { wp_safe_redirect(admin_url('nav-menus.php')); exit; }
});
add_action('admin_head', function () {
    if (current_user_can('manage_options')) return;
    echo '<style>#adminmenu a[href*="page=elementor-app"]{display:none!important}</style>'; // Elementor Pro promotion page (Theme Builder is not part of the free version)
});
/* "Additional CSS" is code: Editors cannot add it. */
add_filter('map_meta_cap', function ($caps, $cap) { return $cap === 'edit_css' && !current_user_can('manage_options') ? ['do_not_allow'] : $caps; }, 10, 2);
/* Site-wide design is administrator-only: the Elementor Site Settings (global colours, fonts, spacing, breakpoints) restyle every page.
   Editors keep full page editing and the saved templates but cannot change the Kit. Define HC_EDITORS_MAY_EDIT_DESIGN as true in wp-config.php to lift this. */
add_filter('map_meta_cap', function ($caps, $cap, $user_id, $args) {
    if (!in_array($cap, ['edit_post', 'delete_post', 'publish_post', 'edit_page', 'delete_page'], true) || empty($args[0])) return $caps;
    if ((defined('HC_EDITORS_MAY_EDIT_DESIGN') && HC_EDITORS_MAY_EDIT_DESIGN) || (int) $args[0] !== (int) get_option('elementor_active_kit')) return $caps;
    return user_can($user_id, 'manage_options') ? $caps : ['do_not_allow'];
}, 10, 4);

/* ───────── "Show in main menu" box on pages ───────── */
function hc_primary_menu_id($lang) {
    if (!function_exists('PLL')) return 0;
    $nav = (array) PLL()->options->get('nav_menus'); $theme = get_option('stylesheet');
    return (int) ($nav[$theme]['primary'][$lang] ?? 0);
}
function hc_menu_item_for($menu_id, $post_id) {
    foreach ((array) wp_get_nav_menu_items($menu_id, ['post_status' => 'any']) as $it) if ((int) $it->object_id === (int) $post_id && $it->object === get_post_type($post_id)) return $it;
    return null;
}
add_action('add_meta_boxes', function () {
    add_meta_box('hc_nav', 'Main menu', function ($post) {
        $lang = function_exists('pll_get_post_language') ? (pll_get_post_language($post->ID) ?: pll_default_language()) : 'en';
        $menu = hc_primary_menu_id($lang); $it = $menu ? hc_menu_item_for($menu, $post->ID) : null;
        wp_nonce_field('hc_nav', 'hc_nav_n');
        if (!$menu) { echo '<p>No main menu is assigned for this language yet (Appearance → Menus).</p>'; return; }
        echo '<p><label><input type="checkbox" name="hc_nav_on" value="1"' . checked((bool) $it, true, false) . '> Show this page in the main menu (' . esc_html(strtoupper($lang)) . ')</label></p>';
        echo '<p><label>Menu label<br><input type="text" class="widefat" name="hc_nav_label" value="' . esc_attr($it ? $it->title : '') . '" placeholder="' . esc_attr($post->post_title ?: 'Page title') . '"></label></p>';
        echo '<p class="description">New entries are added at the end. Change the order in Appearance → Menus.</p>';
    }, 'page', 'side', 'default');
});
add_action('save_post_page', function ($id, $post) {
    if (!isset($_POST['hc_nav_n']) || !wp_verify_nonce($_POST['hc_nav_n'], 'hc_nav') || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_theme_options') || wp_is_post_revision($id)) return;
    $lang = function_exists('pll_get_post_language') ? (pll_get_post_language($id) ?: pll_default_language()) : 'en';
    $menu = hc_primary_menu_id($lang); if (!$menu) return;
    $it = hc_menu_item_for($menu, $id); $on = !empty($_POST['hc_nav_on']); $label = sanitize_text_field(wp_unslash($_POST['hc_nav_label'] ?? ''));
    if ($on && ($post->post_status === 'publish' || $post->post_status === 'future')) {
        $args = ['menu-item-title' => $label ?: $post->post_title, 'menu-item-object' => 'page', 'menu-item-object-id' => $id, 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish'];
        if (!$it) $args['menu-item-position'] = count((array) wp_get_nav_menu_items($menu)) + 1;
        wp_update_nav_menu_item($menu, $it ? $it->ID : 0, $args);
    } elseif (!$on && $it) wp_delete_post($it->ID, true);
}, 20, 2);

/* ───────── "Create <language> copy": duplicates a page / room / offer into the other language ─────────
   Polylang Free creates an empty translation. This copies the whole Elementor layout (or the room fields), links it as the
   translation, keeps the slug and opens it — the editor then only translates the words. */
function hc_copy_meta_blacklist() { return ['_edit_lock', '_edit_last', '_hc_key', '_hc_seed_hash', '_pll_menu_item', '_wp_old_slug', '_elementor_css', '_elementor_element_cache', '_elementor_page_assets', '_elementor_controls_usage']; }
add_filter('page_row_actions', 'hc_row_actions', 10, 2); add_filter('post_row_actions', 'hc_row_actions', 10, 2);
function hc_row_actions($actions, $post) {
    if (!in_array($post->post_type, ['page', 'hc_room', 'hc_offer'], true) || !function_exists('pll_get_post_translations') || !current_user_can('edit_post', $post->ID)) return $actions;
    $have = pll_get_post_translations($post->ID);
    foreach (pll_languages_list(['fields' => 'slug']) as $l) {
        if (isset($have[$l])) continue;
        $url = wp_nonce_url(admin_url('admin-post.php?action=hc_copy_translation&post=' . $post->ID . '&lang=' . $l), 'hc_copy_' . $post->ID . $l);
        $actions['hc_copy_' . $l] = '<a href="' . esc_url($url) . '">Create ' . esc_html(strtoupper($l)) . ' copy</a>';
    }
    return $actions;
}
add_action('add_meta_boxes', function () {
    foreach (['page', 'hc_room', 'hc_offer'] as $pt) add_meta_box('hc_copy', 'Other language', function ($post) {
        if (!function_exists('pll_get_post_translations') || $post->post_status === 'auto-draft') { echo '<p>Save the page first.</p>'; return; }
        $have = pll_get_post_translations($post->ID); $any = false;
        foreach (pll_languages_list(['fields' => 'slug']) as $l) {
            if (isset($have[$l])) continue; $any = true;
            $url = wp_nonce_url(admin_url('admin-post.php?action=hc_copy_translation&post=' . $post->ID . '&lang=' . $l), 'hc_copy_' . $post->ID . $l);
            echo '<p><a class="button" href="' . esc_url($url) . '">Create ' . esc_html(strtoupper($l)) . ' copy of this page</a></p>';
        }
        echo $any ? '<p class="description">Copies the whole layout and links it as the translation. Then translate the text. Save this page first.</p>' : '<p class="description">All languages exist (see Languages box).</p>';
    }, $pt, 'side', 'default');
});
add_action('admin_post_hc_copy_translation', function () {
    $id = (int) ($_GET['post'] ?? 0); $lang = sanitize_key($_GET['lang'] ?? '');
    check_admin_referer('hc_copy_' . $id . $lang);
    $src = get_post($id);
    if (!$src || !current_user_can('edit_post', $id) || !current_user_can('edit_pages') || !function_exists('pll_save_post_translations') || !in_array($lang, pll_languages_list(['fields' => 'slug']), true)) wp_die('Not allowed.');
    $have = pll_get_post_translations($id);
    if (isset($have[$lang])) { wp_safe_redirect(get_edit_post_link($have[$lang], 'raw')); exit; }
    global $wpdb;
    $new = wp_insert_post(['post_type' => $src->post_type, 'post_status' => 'draft', 'post_title' => $src->post_title, 'post_excerpt' => $src->post_excerpt, 'post_content' => $src->post_content, 'menu_order' => $src->menu_order, 'post_name' => $src->post_name, 'post_parent' => ($src->post_parent && function_exists('pll_get_post') ? (int) pll_get_post($src->post_parent, $lang) : 0)]);
    if (is_wp_error($new) || !$new) wp_die('Could not create the copy.');
    pll_set_post_language($new, $lang);
    foreach ($wpdb->get_results($wpdb->prepare("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=%d", $id)) as $m) {
        if (in_array($m->meta_key, hc_copy_meta_blacklist(), true) || strpos($m->meta_key, '_pll') === 0) continue;
        update_post_meta($new, $m->meta_key, wp_slash(maybe_unserialize($m->meta_value)));
    }
    delete_post_meta($new, '_elementor_css');
    $have[pll_get_post_language($id)] = $id; $have[$lang] = $new; pll_save_post_translations($have);
    $wpdb->update($wpdb->posts, ['post_name' => $src->post_name], ['ID' => $new]); clean_post_cache($new); // same address in every language: /en/about/ ↔ /bs/about/
    $to = get_post_meta($new, '_elementor_edit_mode', true) === 'builder' ? admin_url('post.php?post=' . $new . '&action=elementor') : get_edit_post_link($new, 'raw');
    wp_safe_redirect($to); exit;
});

/* Pages are built in Elementor; the WordPress block editor adds nothing for them. The classic screen keeps the boxes editors need
   (permalink, Parent, Language, Search engines & sharing, Main menu) in plain sight instead of a collapsed "Meta Boxes" bar. */
add_filter('use_block_editor_for_post_type', function ($use, $type) { return $type === 'page' ? false : $use; }, 10, 2);
