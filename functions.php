<?php
require_once 'lib/setup-enqueue.php';       //_ac - style sheets and scripts
require_once 'lib/setup-header.php';        //_ac - customize the <head></head> section of our templates
require_once 'lib/setup-theme-support.php'; //_ac - default wp theme support options
require_once 'lib/setup-ac-hooks.php';    //_ac - astra hook options, if any | https://wpastra.com/docs/using-hooks/ | https://developers.wpastra.com/theme-visual-hooks/?_ga=2.200446761.607926558.1600891062-486929842.1600891062

/*
multi-line commenting via vscode:
https://stackoverflow.com/questions/34316156/how-to-comment-multiple-lines-in-visual-studio-code 

apply my own custom hooks
https://developer.wordpress.org/plugins/hooks/custom-hooks/

get an author image outside of loop
https://developer.wordpress.org/reference/functions/get_avatar/
https://developer.wordpress.org/reference/functions/get_avatar_url/
for more flexibility look into the "WP User Avatar" plugin 

this is how a title attribute should be implemented...
<?php // your other code here ?>
<h2 class="m-title">
    <a href="<?php echo esc_url(get_permalink()); ?>" title="<?php the_title_attribute(); ?>">
        <?php the_title(); ?>
    </a>
</h2>

how to add a class directly onto a nav menu
wp_nav_menu( array(
    'theme_location' => 'top-menu',
    'container' => false,
    'items_wrap' => '<ul class="nav your_custom_class">%3$s</ul>',
));

how to reference argument data with wp_nav_menu()
function get_nav_args($overrides = array()) {
    $defaults = array(
        'theme_location' => 'main-menu',
        'menu_class' => 'list-inline',
        'add_li_class'  => 'list-inline-item',
    );
    return shortcode_atts($defaults, apply_filters('some_custom_identifier_nav_menu_args', $overrides, $defaults) );
}
then just do wp_nav_menu(get_nav_args())


A modern way of creating new pages in WP
https://developer.wordpress.org/themes/template-files-section/page-template-files/
A quick, safe method for creating a new page template is to make a copy of page.php and give the new file a distinct filename. That way, you start off with the HTML structure of your other pages and you can edit the new file as needed.



How to return the featured image of any given post with a shortcode...
function mfeaturedimage( $atts ) {
    $a = shortcode_atts( array(
        'size' => 'medium',
    ), $atts );
    return the_post_thumbnail("{$a['size']}");
}
add_shortcode( 'feature', 'mfeaturedimage' );

..and take it further by calling it on a custom page like so... 
echo do_shortcode("[feature size='your-choice']");
...or a function
function feature($size){
    echo do_shortcode("[feature size='{$size}']");
} 

Pros and cons of a custom page vs custom post type template file:
"The main difference is semantical. A page is something that stands by itself, while a post type in a categorization of content. The only other difference is that pages can have flexible URLs and you can basically put a page anywhere."


How to hook a custom style sheet for the login screen of wordpress...

add_action( 'login_enqueue_scripts', 'wpse_login_styles' );
function wpse_login_styles() {
    wp_enqueue_style( 'wpse-custom-login', get_stylesheet_directory_uri() . '/style-login.css' );
}

...Then you can create a styles-login.css file in the root of your child theme directory (or adjust the path in wp_enqueue_script based on your needs).

i.e. change the logo in CSS like so
#login h1 a, .login h1 a {
    background-image: url(path/to/login/logo.png);
    padding-bottom: 30px;
}

custom login page - https://codex.wordpress.org/Customizing_the_Login_Form#Make_a_Custom_Login_Page
login hooks - https://codex.wordpress.org/Customizing_the_Login_Form#Login_Hooks


About loops... 
"First we should talk about why you need to use wp_reset_query() in the first place.

What wp_reset_query() does is reset the global $wp_query object back to it's original state. Since you're creating a new WP_Query object / instance, it does not overwrite the global $wp_query object. The only real case you would need to call this function is if you're using query_posts() which you shouldn't be in 99% of cases."


Whenever you loop through a custom WP_Query ( using The Loop as you have above ) it will overwrite the global $post object which means we should be using wp_reset_postdata() instead. Since it only happens during The Loop process, we should call the function after The Loop.

$myquery = new WP_Query( $args );

if( $myquery->have_posts() ) {

    while( $myquery->have_posts() ) {
        $myquery->the_post();
        //Content
    }

    wp_reset_postdata();
}


@blackhawk I believe if you need to run the custom loop ( seen above ) twice, you would need to put $myquery->rewind_posts() either at the end ( but inside ) of the first conditional or above the second conditional. If you don't rewind the posts before it hits the second conditional, have_posts() will probably fail


Search for theme shortcodes:
simply search in vscode for add_shortcode()

How to use shortcodes
https://firstsiteguide.com/wordpress-shortcodes-guide/

How to create our own shortcodes
https://youtu.be/XwhF_Cbans4


*/
