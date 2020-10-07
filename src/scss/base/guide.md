
## **Offline training on SCSS**

* A good guide to look into for loops - [Source](https://www.gavsblog.com/blog/for-each-while-loops-sass-scss)

* Anthoer good article on key value pairs - [Source](https://www.koderhq.com/tutorial/sass/map/)


```scss


//variable styles

$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);


$variable: value 1;
.rule-1 {
  value: $variable;
}


$global-variable: global value;
.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}


//mixin styles

//example 1
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}

//example 2

@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}


//example 3

@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}

//example 4

@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}


//example 5

@use "sass:meta";

@mixin syntax-colors($args...) {

  @debug meta.keywords($args); //for testing purposes
  // (string: #080, comment: #800, variable: $60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)

//example 6

@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: $60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)


// example 7

If you want to be flexible in what information you pass to a content block, consider passing it a map that contains information it may need!

// sub example 1

$font-weights: ("regular": 400, "medium": 500, "bold": 700);
@debug map.get($font-weights, "medium"); // 500

// sub example 2

$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}

// sub example 3 | adding to map

@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// (
//   "lightest": 100,
//   "light": 300,
//   "medium": 500,
//   "bold": 700
// )


// sub example 4

Maps in Sass are immutable, which means that the contents of a map value never changes. Sass’s map functions all return new maps rather than modifying the originals. Immutability helps avoid lots of sneaky bugs that can creep in when the same map is shared across different parts of the stylesheet.

You can still update your state over time by assigning new maps to the same variable, though. This is often used in functions and mixins to track configuration in a map.

@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@mixin add-browser-prefix($browser, $prefix) {
  $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global;
}

@include add-browser-prefix("opera", o);
@debug $prefixes-by-browser;
// ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)

@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}


// debug

@debug 100;


//lists

@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3


```
