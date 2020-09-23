<?php

//_ac - ACCESS CORE FILTERS TO DYNAMICALLY ADD STUFF TO HEADER
function _ac_core_filters_add_to_head()
{
    //examples:
    //echo '<link rel="Shortcut Icon" type="image/x-icon" href="/wp-content/uploads/favicon-32x32.png" />';
    //echo '<style>body {border:solid 2em purple;}</style>';
}
add_action('wp_head', '_ac_core_filters_add_to_head');
add_action('login_head', '_ac_core_filters_add_to_head');
add_action('admin_head', '_ac_core_filters_add_to_head');