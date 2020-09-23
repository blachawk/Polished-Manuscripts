<?php

//_ac - DEFAULT WP THEME SUPPORT OPTIONS WE CAN PLAY WITH
//https://developer.wordpress.org/reference/functions/add_theme_support/
//https://make.wordpress.org/core/2016/11/30/starter-content-for-themes-in-4-7/
//https://developer.wordpress.org/reference/functions/get_theme_starter_content/

function _ac_wp_theme_support()
{
   /*//examples:
    add_theme_support( 'custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    ) );


     // custom header
     add_theme_support( 'custom-header', $header_defaults ); 
     $header_defaults = array(
        'default-image'          => '',
        'width'                  => 300,
        'height'                 => 60,
        'flex-height'            => true,
        'flex-width'             => true,
        'default-text-color'     => '',
        'header-text'            => true,
        'uploads'                => true,
    );
    
    */


}

add_action('after_setup_theme','_ac_wp_theme_support');