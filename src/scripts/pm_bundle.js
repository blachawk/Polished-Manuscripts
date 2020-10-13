"use strict";





(function pmtest() {
    //ES-TEST CONNECTION
    //console.log('ecmascript connected now!!!!!');
    /*
    Excellent learning points:
    https://dev.to/shijiezhou/top-10-javascript-patterns-every-developers-like-168p
    https://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas 
    
    //Scrolling the document to position "250" horizontally and "110" vertically 
    //https://www.w3schools.com/jsref/met_win_scrollto.asp
    //https://stackoverflow.com/a/50590388/957186
    //window.scrollTo(250, 110);

    //ADD AND OR REMOVE CLASS AS TOGGLE CLASS
    //https://www.digitalocean.com/community/tutorials/js-classlist
    //this.classList.toggle('cool');
    
    // how to remove multiple instances of a classes at once
    // var els = document.querySelectorAll('.something.active');
    // for (var i = 0; i < els.length; i++) {
    //     els[i].classList.remove('active');
    // }    
    */
})();

(function pmdetect() {
    //ES-DETECT IF CSS3 ANIMATIONS ARE SUPPORTED
    var root = document.getElementsByTagName('html')[0];
    var animation = false;
    var elem = document.createElement('div');

    if (elem.style.animationName !== undefined) {
        animation = true;

        //IF CLASS NAME EXSIT ON HTML TAG...
        if (document.querySelector('.view01') !== null) {
            //IF SO ADD THE CUSTOM ANIMATION CLASS NAME
            root.className += " " + "css3animation";
        }
    }
})();

(function pmevents() {

    //ES-EVENTS ON ALL ANCHOR & BUTTON CLICKS
    var anchors = document.querySelectorAll('a, button');
    var mclick = 0;
    for (var i = 0, len = anchors.length; i < len; i++) {
        anchors[i].addEventListener('click', function (e) {

            //DISABLE ALL ANCHORLINKS DURING DEVELOPMENT
            e.preventDefault();

            //TOGGLE SCROLL & FADE ON SPECIFIC CLASS
            if (this.classList.contains('scroll-top-btn')) {

                //all credit to the following stack dev for this custom solution: 
                //https://bit.ly/2GklKpk
                //https://stackoverflow.com/a/23844067/957186
                //https://stackoverflow.com/a/50590388/957186
                scrollTo(0, 1000);

                // Element to move, time in ms to animate
                function scrollTo(element, duration) {
                    var e = document.documentElement;
                    if (e.scrollTop === 0) {
                        var t = e.scrollTop;
                        ++e.scrollTop;
                        e = t + 1 === e.scrollTop-- ? e : document.body;
                    }
                    scrollToC(e, e.scrollTop, element, duration);
                }

                // Element to move, element or px from, element or px to, time in ms to animate
                function scrollToC(element, from, to, duration) {
                    if (duration <= 0) return;
                    if (typeof from === "object") from = from.offsetTop;
                    if (typeof to === "object") to = to.offsetTop;

                    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
                }

                function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
                    if (t01 < 0 || t01 > 1 || speed <= 0) {
                        element.scrollTop = xTo;
                        return;
                    }
                    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
                    t01 += speed * step;

                    setTimeout(function () {
                        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
                    }, step);
                }

                function easeOutCuaic(t) {
                    t--;
                    return t * t * t + 1;
                }
            }

            //TOGGLE HAMBURGER ICON & NAV MENU ON CLICKS
            if (this.classList.contains('top-menu-btn')) {
                this.classList.toggle('es-clicked');
                document.querySelector('.top-menu').classList.toggle('es-fixed-on-top');
                document.querySelector('.top-menu').classList.toggle('es-animate');
            }

            //TOGGLE COLOR GENERATOR BTN FOR GENERATOR MENU ON CLICKS
            if (this.classList.contains('generator-btn')) {
                this.classList.toggle('es-clicked');
                document.querySelector('.generator-menu').classList.toggle('es-animate');
            }
        });
    }

    //ES-EVENTS ON SCROLL
    document.addEventListener("scroll", function (e) {

        //ES-TOGGLE CLASS ON SCROLL-BTN TO THEN ANIMIATE VIA CSS3
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var msrcbtn = document.querySelector(".scroll-top-btn");
        if (scrollTop > 200) {
            msrcbtn.classList.add("visible");
            msrcbtn.classList.remove("d-none");
            msrcbtn.classList.add("es-animate");
        } else {
            msrcbtn.classList.remove("visible");
            msrcbtn.classList.add("d-none");
            msrcbtn.classList.remove("es-animate");
        }
    });

    //ON SELECTOR OPTIONS FOR GENERATOR
    var mselect = document.querySelector(".select-options");
    mselect.addEventListener('change', (e) => {
        //console.log(`e.target.value = ${ e.target.value }`);
        if (e.target.value == 'base') {
            //BASE LAYOUT
            console.log('base');
            document.querySelector('body').setAttribute("class", "");

            document.querySelector('header img').src = "/dist/images/P-M_Original_2000X2000-Trans-BG-768x662.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-red border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-red shadow-inset hidden");

            document.querySelector('header').setAttribute("class", "header");
           
            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-fall animate redbooks bg-whitesmoke");
            }, 100);
           
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-red");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-grey-dark");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "p-lft-sm fstyle-italic fweight-400 txt-red");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "shadow-box");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-red");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-grey-dark txt-dec-white hover-txt-red active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-grey-light");
                el.querySelector('blockquote p').setAttribute("class", "txt-grey-dark lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg bg-dark-lines");
            document.querySelector('footer img').src = "/dist/images/pm_logo_onblack_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-white");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-red");
            });             

            document.querySelectorAll('footer .lnk').forEach(function (el) {
                el.setAttribute("class", "lnk trans hover-txt-red icon txt-white");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn font-reset p-sm hover-dark active-border-white");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-grey-dark txt-grey");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-white");

            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");

        } else if (e.target.value == 'cream') {
            //CREAM LAYOUT
            console.log('cream (palrod)');
            document.querySelector('body').setAttribute("class", "bg-palrod");

            document.querySelector('header img').src = "/dist/images/P-M_Original_2000X2000-Trans-BG-768x662.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-brown border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-olive shadow-inset hidden");

            document.querySelector('header').setAttribute("class", "bg-palrod");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-fall animate redbooks border-btm-brown");
            }, 100);

            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-cream");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-grey-dark");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "p-lft-sm fstyle-italic fweight-400 txt-red");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-red");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-grey-dark txt-dec-white hover-txt-red active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-palrod");
                el.querySelector('blockquote p').setAttribute("class", "txt-grey-dark lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg");
            document.querySelector('footer img').src = "/dist/images/pm_logo_full_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-grey-dark");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-red");
            });

            document.querySelectorAll('footer .lnk').forEach(function (el) {
               el.setAttribute("class", "lnk trans hover-txt-red icon txt-brown");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn font-reset p-sm hover-dark active-border-white border-color-brown");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-grey-dark txt-grey");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-white");

            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");

        } else {
            //DARK THEME LAYOUT
            console.log('endless night');
            document.querySelector('body').setAttribute("class", "bg-grey-dark");

            document.querySelector('header img').src = "/dist/images/pm_logo_onblack_294x253.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-red border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-white bg-grey-dark shadow-inset hidden");

            document.querySelector('header').setAttribute("class", "bg-grey-dark");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-fall animate redbooks bg-whitesmoke");
            }, 100);
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-white");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center shadow-fall");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-whitesmoke");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "fstyle-italic fweight-400 txt-white");
            
            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-grey");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-darksalmon txt-dec-grey-dark hover-txt-grey active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-white");
                el.querySelector('blockquote p').setAttribute("class", "txt-white lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg bg-grey-dark");
            document.querySelector('footer img').src = "/dist/images/pm_logo_full_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-white");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-darksalmon");
            });

            document.querySelectorAll('footer .lnk').forEach(function (el) {
                el.setAttribute("class", "lnk trans hover-txt-red icon txt-grey");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn font-reset p-sm hover-dark active-border-white");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-darksalmon txt-grey-dark");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-grey-dark ");
            
            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");
        }
    });
})();