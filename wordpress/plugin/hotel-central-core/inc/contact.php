<?php
if (!defined('ABSPATH')) exit;

/* Contact form delivery — same rules as the Next.js /api/contact route:
   honeypot, validation (name ≥2, valid e-mail, message ≥10, consent), rate limit 5 / 10 min / IP,
   and it never reports a delivery that did not happen (503 "unavailable" when wp_mail fails). */
add_action('rest_api_init', function () {
    register_rest_route('hc/v1', '/contact', ['methods' => 'POST', 'permission_callback' => '__return_true', 'callback' => 'hc_contact_handler']);
});

function hc_contact_handler(WP_REST_Request $req) {
    $b = $req->get_json_params() ?: [];
    if (!empty($b['company'])) return new WP_REST_Response(['ok' => true], 200); // bots fill the hidden field

    $err = [];
    $name = trim((string) ($b['name'] ?? '')); $email = trim((string) ($b['email'] ?? '')); $msg = trim((string) ($b['message'] ?? ''));
    if (mb_strlen($name) < 2 || mb_strlen($name) > 120) $err['name'] = true;
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $email) || strlen($email) > 200) $err['email'] = true;
    if (mb_strlen($msg) < 10 || mb_strlen($msg) > 5000) $err['message'] = true;
    if (empty($b['consent'])) $err['consent'] = true;
    if ($err) return new WP_REST_Response(['ok' => false, 'error' => 'validation', 'errors' => $err], 422);

    $key = 'hc_rl_' . md5($_SERVER['REMOTE_ADDR'] ?? 'local');
    $hits = array_filter((array) get_transient($key), function ($t) { return $t > time() - 600; });
    $hits[] = time(); set_transient($key, $hits, 600);
    if (count($hits) > 5) return new WP_REST_Response(['ok' => false, 'error' => 'rate'], 429);

    $phone = sanitize_text_field($b['phone'] ?? ''); $subject = sanitize_text_field($b['subject'] ?? 'Other'); $lang = sanitize_text_field($b['locale'] ?? 'en');
    $name = sanitize_text_field($name); $msg = sanitize_textarea_field($msg);
    $body = "Name: $name\nEmail: $email\nPhone: " . ($phone ?: '—') . "\nSubject: $subject\nLanguage: $lang\n\n$msg";

    $id = wp_insert_post(['post_type' => 'hc_enquiry', 'post_status' => 'private', 'post_title' => "$subject — $name", 'post_content' => $body]);
    $sent = wp_mail(hc_info('email'), '[' . wp_parse_url(home_url(), PHP_URL_HOST) . "] $subject — $name", $body, ['Reply-To: ' . $name . ' <' . $email . '>']);
    if (!$sent) return new WP_REST_Response(['ok' => false, 'error' => 'unavailable', 'saved' => (bool) $id], 503);
    return new WP_REST_Response(['ok' => true], 200);
}

/* Local/staging mail catcher: define('HC_MAIL_LOG', '/path/file') to log mails instead of sending. */
add_filter('pre_wp_mail', function ($null, $atts) {
    if (!defined('HC_MAIL_LOG') || !HC_MAIL_LOG) return $null;
    file_put_contents(HC_MAIL_LOG, wp_json_encode(['to' => $atts['to'], 'subject' => $atts['subject'], 'message' => $atts['message'], 'headers' => $atts['headers']]) . "\n", FILE_APPEND);
    return true;
}, 10, 2);
