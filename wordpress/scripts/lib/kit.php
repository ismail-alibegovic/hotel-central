<?php
/**
 * Hotel Central design system as Elementor Site Settings (the active Kit).
 * Everything an editor picks in Elementor — global colours, global fonts, heading/body/button/image styles, content width,
 * container padding, breakpoints — starts on-brand, so a brand-new page built from an empty canvas already looks like the site.
 */
function hc_kit_settings() {
    $f = function ($family, $size, $weight = '400', $extra = []) {
        return array_merge(['typography_typography' => 'custom', 'typography_font_family' => $family, 'typography_font_weight' => $weight, 'typography_font_size' => ['unit' => 'px', 'size' => $size]], $extra);
    };
    $vw = function ($d, $t, $m) { return ['typography_font_size' => ['unit' => 'vw', 'size' => $d], 'typography_font_size_tablet' => ['unit' => 'vw', 'size' => $t], 'typography_font_size_mobile' => ['unit' => 'vw', 'size' => $m]]; };
    $disp = ['typography_text_transform' => 'uppercase', 'typography_line_height' => ['unit' => 'em', 'size' => 0.9], 'typography_letter_spacing' => ['unit' => 'px', 'size' => 0.5]];
    $label = ['typography_text_transform' => 'uppercase', 'typography_line_height' => ['unit' => 'em', 'size' => 1.5], 'typography_letter_spacing' => ['unit' => 'px', 'size' => 1.7]];

    $system_colors = [
        ['_id' => 'primary', 'title' => 'Ink (headings)', 'color' => '#020D10'],
        ['_id' => 'secondary', 'title' => 'Olive', 'color' => '#50563F'],
        ['_id' => 'text', 'title' => 'Ink (text)', 'color' => '#020D10'],
        ['_id' => 'accent', 'title' => 'Sage', 'color' => '#A1AA82'],
    ];
    $custom_colors = [
        ['_id' => 'hcolive', 'title' => 'Olive', 'color' => '#50563F'],
        ['_id' => 'hcdeep', 'title' => 'Deep olive', 'color' => '#363A2A'],
        ['_id' => 'hcink', 'title' => 'Ink', 'color' => '#020D10'],
        ['_id' => 'hcsage', 'title' => 'Sage', 'color' => '#A1AA82'],
        ['_id' => 'hcivory', 'title' => 'Ivory (paper)', 'color' => '#F4F0EC'],
        ['_id' => 'hcwhite', 'title' => 'White', 'color' => '#FFFFFF'],
    ];

    $display = array_merge($f('Gilda Display', 96, '400', $disp), []);
    $system_typography = [
        ['_id' => 'primary', 'title' => 'Display (headings)'] + array_merge($display, $vw(6.6, 11, 13)),
        ['_id' => 'secondary', 'title' => 'Label (small caps)'] + $f('', 11, '400', $label),
        ['_id' => 'text', 'title' => 'Body text'] + $f('', 14, '400', ['typography_line_height' => ['unit' => 'em', 'size' => 1.55]]),
        ['_id' => 'accent', 'title' => 'Button'] + $f('', 10, '400', ['typography_text_transform' => 'uppercase', 'typography_letter_spacing' => ['unit' => 'px', 'size' => 1.8], 'typography_line_height' => ['unit' => 'em', 'size' => 1.5]]),
    ];
    $custom_typography = [
        ['_id' => 'hcxl', 'title' => 'Display XL — page titles'] + array_merge($display, $vw(6.6, 11, 13)),
        ['_id' => 'hcl', 'title' => 'Display L — section titles'] + array_merge($display, $vw(5, 9, 11)),
        ['_id' => 'hcm', 'title' => 'Display M — statements'] + array_merge($f('Gilda Display', 48, '400', ['typography_line_height' => ['unit' => 'em', 'size' => 1.05]]), $vw(3.4, 6, 8)),
        ['_id' => 'hcs', 'title' => 'Display S — list titles'] + array_merge($display, $vw(2.6, 5, 7)),
        ['_id' => 'hclabel', 'title' => 'Label — tracked caps'] + $f('', 11, '400', $label),
        ['_id' => 'hcbody', 'title' => 'Body'] + $f('', 14, '400', ['typography_line_height' => ['unit' => 'em', 'size' => 1.6], 'typography_font_size_mobile' => ['unit' => 'px', 'size' => 15]]),
    ];

    $g = function ($id) { return 'globals/typography?id=' . $id; };
    $s = [
        // Layout
        'container_width' => ['unit' => 'px', 'size' => 1368], 'container_width_tablet' => ['unit' => '%', 'size' => 100], 'container_width_mobile' => ['unit' => '%', 'size' => 100],
        'container_padding' => ['unit' => 'px', 'top' => '64', 'right' => '36', 'bottom' => '64', 'left' => '36', 'isLinked' => false],
        'container_padding_tablet' => ['unit' => 'px', 'top' => '56', 'right' => '24', 'bottom' => '56', 'left' => '24', 'isLinked' => false],
        'container_padding_mobile' => ['unit' => 'px', 'top' => '48', 'right' => '16', 'bottom' => '48', 'left' => '16', 'isLinked' => false],
        'space_between_widgets' => ['column' => '16', 'row' => '16', 'isLinked' => true, 'unit' => 'px', 'size' => 16],
        'viewport_tablet' => 1023, 'viewport_mobile' => 767,
        // Colours + fonts
        'system_colors' => $system_colors, 'custom_colors' => $custom_colors, 'system_typography' => $system_typography, 'custom_typography' => $custom_typography,
        // Page background
        'background_background' => 'classic', 'background_color' => '#F4F0EC',
        // Body + headings (no colour: headings inherit the section's colour, so they are white on dark sections automatically)
        'body_color' => '#020D10',
        'h1_typography_typography' => 'custom', 'h2_typography_typography' => 'custom', 'h3_typography_typography' => 'custom', 'h4_typography_typography' => 'custom', 'h5_typography_typography' => 'custom', 'h6_typography_typography' => 'custom',
        '__globals__' => [
            'body_typography_typography' => $g('text'),
            'h1_typography_typography' => $g('hcxl'), 'h2_typography_typography' => $g('hcl'), 'h3_typography_typography' => $g('hcm'), 'h4_typography_typography' => $g('hcs'),
            'h5_typography_typography' => $g('hclabel'), 'h6_typography_typography' => $g('hclabel'),
        ],
        // Buttons: Elementor's Kit button style also restyles every plain <button> on the page (menu, calendar…), so the pill look of
        // Elementor Button widgets is provided by the theme CSS instead (hc.css: "raw buttons").
        // Images: square, quiet (the "house grade" filter comes with the CSS class hc-grade)
        'image_border_radius' => ['unit' => 'px', 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0', 'isLinked' => true],
        'body_typography_typography' => 'custom',
    ];
    return $s;
}

function hc_apply_kit() {
    $kit = \Elementor\Plugin::$instance->kits_manager->get_active_kit();
    if (!$kit || !$kit->get_id()) return false;
    $cur = (array) get_post_meta($kit->get_id(), '_elementor_page_settings', true);
    $new = array_merge($cur, hc_kit_settings());
    $kit->save(['settings' => $new]);
    update_option('hc_kit_version', 1);
    return $kit->get_id();
}
