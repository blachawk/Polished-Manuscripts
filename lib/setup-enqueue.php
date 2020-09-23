<?php

//_ac - CONNECT TO OUR CUSTOM STYLE SHEETS AND SCRIPTS FOR THIS CHILD THEME

function _ac_child_assets()
{
    //CSS
    wp_enqueue_style(
        '_ac-child-stylesheet',
        get_stylesheet_directory_uri().'/dist/css/pm_bundle.css',
        '1.0.0',
        'all'
    );

    //JS
    wp_enqueue_script(
        '_ac-child-script',
        get_stylesheet_directory_uri().'/dist/scripts/pm_bundle.js',
        '1.0.0',
        true
    );
}
    add_action('wp_enqueue_scripts', '_ac_child_assets');