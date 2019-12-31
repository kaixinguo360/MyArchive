<?php
error_reporting(0);

// Pre Process
include 'config.default.php';
if (is_file('config.php')) { include 'config.php'; }
chdir($root_dir);

// Read Input
$ids = json_decode(file_get_contents('php://input'), true);
$nodes = array();

// Read Nodes
if (is_array($ids) && !empty($ids)) {
  foreach ($ids as $id) {
    $node = get_node_by_id($id);
    if ($node) array_push($nodes, $node);
  }
} else {
  $node = get_root_node();
  if ($node) array_push($nodes, $node);
}

// Return results
echo(json_encode($nodes));

// Get ... by ...
function get_node_by_id($id) {
  global $root_id;
  if ($id == $root_id) return get_root_node();
  $path = get_path_by_id($id);
  if (!$path) return null;
  $node = get_node_by_path($path);
  return $node ? $node : null;
}
function get_path_by_id($id) {
  $path = exec("find -L . -inum $id 2>/dev/null");
  return substr($path, 0, 2) == './'
    ? substr($path, 2)
    : $path;
}
function get_id_by_path($path) {
  global $root_id;
  return '' . (($path == '.') ? $root_id : fileinode($path));
}
function get_node_by_path($path) {
  $node = array();
  $node['id'] = get_id_by_path($path);
  $node['parent'] = get_id_by_path(pathinfo($path)['dirname']);
  $node['name'] = end(explode('/', $path));
  $node['atime'] = time() * 1000;
  $node['mtime'] = filemtime($path) * 1000;
  $node['ctime'] = filectime($path) * 1000;
  if (is_dir($path)) {
    return read_dir($path, $node);
  } elseif (is_file($path)) {
    return read_file($path, $node);
  } else  {
    return null;
  }
}
function get_root_node() {
  global $root_id;
  $node = array();
  $node['id'] = $root_id;
  $node['parent'] = null;
  $node['name'] = 'Home';
  $node['atime'] = time() * 1000;
  $node['mtime'] = filemtime('.') * 1000;
  $node['ctime'] = filectime('.') * 1000;
  return read_dir('.', $node);
}

// Readers
function read_file($path, $node) {
  global $root_url;
  $node['type'] = 'file';
  $node['data'] = $root_url . $path;
  return $node;
}
function read_dir($path, $node) {
  $node['type'] = 'dir';
  $node['data'] = array();
  $handle = opendir($path);
  while($name = readdir($handle)){
    if($name !== '..' && $name !== '.'){
      $node['data'][$name] = get_id_by_path($path . '/' . $name);
    }
  }
  return $node;
}
