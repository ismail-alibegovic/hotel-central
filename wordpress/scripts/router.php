<?php
// Router for PHP's built-in server (local/staging preview): serves static files, sends everything else to WordPress.
$root = realpath($_SERVER['DOCUMENT_ROOT'] ?: (__DIR__ . '/../site')); // the -t directory given to php -S
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = $root . $path;
if ($path !== '/' && is_file($file)) return false;
if (is_dir($file) && is_file($file . '/index.php') && substr($path, -1) === '/' && strpos($path, 'wp-admin') !== false) { chdir($file); require $file . '/index.php'; return true; }
chdir($root);
$_SERVER['SCRIPT_NAME'] = '/index.php'; $_SERVER['SCRIPT_FILENAME'] = $root . '/index.php';
if (preg_match('#\.php$#', $path) && is_file($file)) { chdir(dirname($file)); $_SERVER['SCRIPT_NAME'] = $path; $_SERVER['SCRIPT_FILENAME'] = $file; require $file; return true; }
require $root . '/index.php';
