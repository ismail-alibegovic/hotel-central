<?php
if (!defined('ABSPATH')) exit;
/* Admin UI: room fields, search-engine fields on pages / rooms / offers, simple photo picker. */

add_action('add_meta_boxes', function () {
    add_meta_box('hc_room', 'Room details', 'hc_room_box', 'hc_room', 'normal', 'high');
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
        } else printf('<input class="regular-text" type="%1$s" id="%2$s" name="%2$s" value="%3$s">', esc_attr($type), esc_attr($k), esc_attr($v));
        if ($help) echo '<p class="description">' . esc_html($help) . '</p>';
        echo '</td></tr>';
    }
    echo '</table><p class="description">The room name is the title above, the short summary is the Excerpt. Create the Bosnian version with the language box (+ icon) on the right.</p>';
}
add_action('save_post_hc_room', function ($id) {
    if (!isset($_POST['hc_room_n']) || !wp_verify_nonce($_POST['hc_room_n'], 'hc_room') || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $id)) return;
    foreach (hc_room_fields() as $k => [$l, $type]) if (isset($_POST[$k])) update_post_meta($id, $k, $type === 'textarea' ? sanitize_textarea_field(wp_unslash($_POST[$k])) : sanitize_text_field(wp_unslash($_POST[$k])));
});

function hc_seo_box($post) {
    wp_nonce_field('hc_seo', 'hc_seo_n');
    $t = get_post_meta($post->ID, '_hc_seo_title', true); $d = get_post_meta($post->ID, '_hc_seo_desc', true); $i = get_post_meta($post->ID, '_hc_seo_image', true);
    echo '<p><label>Page title (browser tab & search results)<br><input class="large-text" name="_hc_seo_title" value="' . esc_attr($t) . '"></label></p>';
    echo '<p><label>Description (search results & link previews; the Excerpt is used when empty)<br><textarea class="large-text" rows="2" name="_hc_seo_desc">' . esc_textarea($d) . '</textarea></label></p>';
    echo '<p><label>Sharing image (media ID, optional)<br><input type="number" name="_hc_seo_image" value="' . esc_attr($i) . '"></label></p>';
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
