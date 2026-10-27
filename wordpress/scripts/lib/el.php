<?php
/**
 * Tiny builder for genuine Elementor (free) element data: flex containers + core widgets
 * (heading, text-editor, image, button, icon-list, shortcode). Output is saved through Elementor's own
 * document API, so every page opens and edits normally in the Elementor editor.
 */
class HC_El {
    static $n = 0;
    static $positions = [];
    static function id() { return substr(md5('hc-el-' . (++self::$n)), 0, 7); }

    static function con($cls, $kids = [], $s = []) {
        $kids = array_values(array_filter($kids));
        foreach ($kids as &$k) if ($k['elType'] === 'container') $k['isInner'] = true;
        return ['id' => self::id(), 'elType' => 'container', 'isInner' => false, 'settings' => array_merge([
            'content_width' => 'full', 'flex_direction' => 'column', 'css_classes' => trim($cls . ' hc-c'),
            'flex_gap' => ['column' => '0', 'row' => '0', 'isLinked' => true, 'unit' => 'px', 'size' => 0],
        ], $s), 'elements' => $kids];
    }
    static function w($type, $settings, $cls = '') {
        $settings['_css_classes'] = trim($cls . ' hc-w');
        return ['id' => self::id(), 'elType' => 'widget', 'widgetType' => $type, 'settings' => $settings, 'elements' => []];
    }
    /** @param array|string $title lines joined with <br> */
    static function heading($title, $tag, $cls) { return self::w('heading', ['title' => is_array($title) ? implode('<br>', $title) : $title, 'header_size' => $tag], $cls); }
    static function text($html, $cls = '') { return self::w('text-editor', ['editor' => $html], $cls); }
    static function shortcode($sc, $cls = '') { return self::w('shortcode', ['shortcode' => $sc], $cls); }
    static function button($text, $url, $cls, $external = false) {
        return self::w('button', ['text' => $text, 'link' => ['url' => $url, 'is_external' => $external ? 'on' : '', 'nofollow' => '', 'custom_attributes' => ''], 'align' => 'left'], $cls);
    }
    static function list_($items, $cls) {
        $rows = []; foreach ($items as $i => $t) $rows[] = ['_id' => substr(md5("li$i$t"), 0, 7), 'text' => $t, 'selected_icon' => ['value' => '', 'library' => '']];
        return self::w('icon-list', ['icon_list' => $rows, 'view' => 'traditional'], $cls);
    }
    /** Image widget from a media-library attachment; focal point becomes a class (CSS var, printed by the theme). */
    static function image($att, $cls, $pos = '') {
        if ($pos !== '' && preg_match('/(-?\d+)%?\s+(-?\d+)%?/', $pos, $m)) { $c = "hc-pos-$m[1]-$m[2]"; self::$positions[$c] = "$m[1]% $m[2]%"; $cls .= ' ' . $c; }
        return self::w('image', ['image' => ['url' => wp_get_attachment_url($att), 'id' => $att, 'size' => '', 'alt' => '', 'source' => 'library'], 'image_size' => 'full', 'link_to' => 'none'], $cls);
    }
}
