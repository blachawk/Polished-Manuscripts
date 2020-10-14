"use strict";

(function pmdefaults() {

        //IE11 HACK TO GET FOREACH FULLY WORKING
        if (typeof NodeList.prototype.forEach !== 'function')  {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }    
})();

(function pmdetect() {

    //ES-DETECT IF CSS3 ANIMATIONS ARE SUPPORTED
    var root = document.getElementsByTagName('html')[0];
    var animation = false;
    var elem = document.createElement('div');

    if (elem.style.animationName !== undefined) {
        animation = true;

        //IF CLASS NAME EXSIT ON HTML TAG...
        if (document.querySelector('.view') !== null) {
            //IF SO ADD THE CUSTOM ANIMATION CLASS NAME
            root.className += " " + "css3animation";
        }
    }
})();

(function pmevents() {

    //PREDEFINE IMAGE PATHS
    //LOCAL
     var bgpath = '/dist/images/';
    //BH
    //var bgpath = '/dist/images/';
    
    //ES-EVENTS ON ALL ANCHOR & BUTTON CLICKS
    var anchors = document.querySelectorAll('a, button');
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

            //TOGGLE HAMBURGER ICON & TOP MENU ON CLICKS
            if (this.classList.contains('top-menu-btn')) {
             
                //convert the inner borders to x shape
                this.classList.toggle('es-clicked');

                //define the top menu to reference below in multiple places
                var model = document.querySelector('.top-menu');

                //animate the inner bg on top menu
                model.classList.toggle('es-bg-animate');

                //improve the fade in and fade out process of the top menu
                if (model.classList.contains("trans-opt-0") || model.classList.contains("trans-opt-1")) {
                    model.classList.toggle("trans-opt-0");
                    model.classList.toggle("trans-opt-1");
                } else {
                    if (window.getComputedStyle(model).getPropertyValue("opacity") == 0) {
                        model.classList.add("trans-opt-1")
                    } else {
                        model.classList.add("trans-opt-0");
                    }
                }
            }

            //TOGGLE COLOR GENERATOR BTN FOR GENERATOR MENU ON CLICKS
            if (this.classList.contains('generator-btn')) {
                //convert inner color to lighter shade
                this.classList.toggle('es-clicked');
                //bring out the generator menu
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
      
        if (e.target.value == 'white') {

            //WHITE

            document.querySelector('body').setAttribute("class", "");

            document.querySelector('header img').src = bgpath + "pm_logo_trans_768x662.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-red border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-red bg-white shadow-inset trans-opt-0");
            document.querySelectorAll('.top-menu ul li').forEach(function (el) {
                el.querySelector('a').setAttribute("class", "trans txt-red fweight-400 after-bg-darkslate"); 
            });

            document.querySelector('header').setAttribute("class", "header");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-fall animate redbooks bg-whitesmoke");
            }, 100);
            document.querySelector('main .intro div').setAttribute("class", "col wmin-300 wmax-800 p-md p-y-lg txt-center");
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-red");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-grey-dark");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "p-lft-sm fstyle-italic fweight-400 txt-red");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "shadow-box");
                el.querySelector('img').setAttribute("class", "tint");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-red");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-grey-dark txt-dec-white hover-txt-red active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-grey-light");
                el.querySelector('blockquote p').setAttribute("class", "txt-grey-dark lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg bg-dark-lines");
            document.querySelector('footer img').src = bgpath + "pm_logo_onblack_294x178.png";
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

        } else if (e.target.value == 'paleGoldenrod') {

            //PALGOLDENROD

            document.querySelector('body').setAttribute("class", "bg-palrod");

            document.querySelector('header img').src = bgpath + "pm_logo_trans_768x662.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-brown border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-olive bg-white shadow-inset trans-opt-0");
            document.querySelectorAll('.top-menu ul li').forEach(function (el) {
                el.querySelector('a').setAttribute("class", "trans txt-olive fweight-400 after-bg-darkslate"); 
            });

            document.querySelector('header').setAttribute("class", "bg-palrod");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-fall animate redbooks border-btm-brown");
            }, 100);
            document.querySelector('main .intro div').setAttribute("class", "col wmin-300 wmax-800 p-md p-y-lg txt-center");
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-cream");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-grey-dark");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "p-lft-sm fstyle-italic fweight-400 txt-red");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "");
                el.querySelector('img').setAttribute("class", "tint");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-red");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-grey-dark txt-dec-white hover-txt-red active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-palrod");
                el.querySelector('blockquote p').setAttribute("class", "txt-grey-dark lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg");
            document.querySelector('footer img').src = bgpath + "pm_logo_full_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-grey-dark");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-red");
            });

            document.querySelectorAll('footer .lnk').forEach(function (el) {
                el.setAttribute("class", "lnk trans hover-txt-red icon txt-brown");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn font-reset p-sm hover-dark active-border-white border-color-brown");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-olive txt-palrod");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-white");

            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");

        } else if (e.target.value == 'tan') {

            //TAN

            document.querySelector('body').setAttribute("class", "bg-floralwhite");

            document.querySelector('header img').src = bgpath + "pm_logo_trans_768x662.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-tan border-grey hover-sienna");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-tan bg-floralwhite shadow-inset trans-opt-0");
            document.querySelectorAll('.top-menu ul li').forEach(function (el) {
                el.querySelector('a').setAttribute("class", "trans txt-sienna fweight-400 after-bg-darkslatev2"); 
            });

            document.querySelector('header').setAttribute("class", "bg-whitesmoke");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-whitesmoke border-btm-peru");
            }, 100);
            document.querySelector('main .intro div').setAttribute("class", "col wmin-300 p-md p-y-lg txt-center");
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-sienna");
            document.querySelector('main .title').setAttribute("class", "title");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center shadow-fall");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-sienna");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "fstyle-italic fweight-400 txt-grey-dark");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "");
                el.querySelector('img').setAttribute("class", "tint shadow-box-dark");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-grey");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-sienna txt-dec-floralwhite hover-txt-saddlebrown active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-tan");
                el.querySelector('blockquote p').setAttribute("class", "txt-grey-dark lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg bg-sienna-lines shadow-box-top m-top-md");
            document.querySelector('footer img').src = bgpath + "pm_logo_full_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-white");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-darksalmon");
            });

            document.querySelectorAll('footer .lnk').forEach(function (el) {
                el.setAttribute("class", "lnk trans hover-txt-sienna icon txt-white");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn-tan font-reset p-sm hover-sienna active-border-white");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-black shadow-fall txt-bisque");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-tan");

            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");

        } else {

            //DARK THEME LAYOUT

            document.querySelector('body').setAttribute("class", "bg-grey-dark");

            document.querySelector('header img').src = bgpath + "pm_logo_onblack_294x253.png";

            document.querySelector(".top-menu-btn").setAttribute("class", "top-menu-btn fsize-125 bg-red border-grey txt-grey hover-red active-red");
            document.querySelector(".top-menu-btn span").setAttribute("class", "bars-white");
            document.querySelector(".top-menu").setAttribute("class", "top-menu border-bisque bg-grey-dark shadow-inset trans-opt-0");
            document.querySelectorAll('.top-menu ul li').forEach(function (el) {
                el.querySelector('a').setAttribute("class", "trans txt-bisque fweight-400 after-bg-bisque"); 
            });

            document.querySelector('header').setAttribute("class", "bg-dark-lines");

            document.querySelector('main .intro').classList.remove('animate');
            setTimeout(function () {
                document.querySelector('main .intro').setAttribute("class", "intro row bg-floralwhite shadow-inset animate redbooks bg-whitesmoke");
            }, 100);
            document.querySelector('main .intro div').setAttribute("class", "col wmin-300 wmax-800 p-md p-y-lg txt-center");
            document.querySelector('main .intro h3').setAttribute("class", "fstyle-italic fweight-800 txt-grey-dark");
            document.querySelector('main .intro h5').setAttribute("class", "p-x-lg fstyle-italic fweight-500 txt-grey-dark");
            document.querySelector('main .title').setAttribute("class", "title pen-white");

            document.querySelector('main .testimonial-title').setAttribute("class", "testimonial-title row jc-center shadow-fall");
            document.querySelector('main .testimonial-title h3').setAttribute("class", "txt-whitesmoke");
            document.querySelector('main .testimonial-title h6').setAttribute("class", "fstyle-italic fweight-400 txt-peru");

            document.querySelectorAll('main .testimonials ul').forEach(function (el) {
                el.setAttribute("class", "");
                el.querySelector('img').setAttribute("class", "tint img-round-150");
                el.querySelector('h6').setAttribute("class", "fweight-500 txt-grey");
                el.querySelector('h4 a').setAttribute("class", "trans fweight-bold txt-white txt-dec-grey-dark hover-txt-grey active-txt-red");
                el.querySelector('blockquote').setAttribute("class", "border-left-white");
                el.querySelector('blockquote p').setAttribute("class", "txt-white lh-125");
            });

            document.querySelector('footer').setAttribute("class", "p-top-lg bg-grey-dark");
            document.querySelector('footer img').src = bgpath + "pm_logo_full_294x178.png";
            document.querySelector('footer h3').setAttribute("class", "txt-white");

            document.querySelectorAll('footer h5').forEach(function (el) {
                el.setAttribute("class", "txt-white p-btm-sm txt-darksalmon");
            });

            document.querySelectorAll('footer .lnk').forEach(function (el) {
                el.setAttribute("class", "lnk trans hover-txt-bisque icon txt-grey");
            });

            document.querySelector('footer .btn').setAttribute("class", "trans btn font-reset p-sm hover-dark active-border-white");
            document.querySelector('footer .copy div').setAttribute("class", "col bg-black shadow-inset txt-grey-light");
            document.querySelector('footer .copy div a').setAttribute("class", "txt-grey-light");

            document.querySelector(".scroll-top-btn").setAttribute("class", "scroll-top-btn op-05 d-none bg-grey hover-child-goldenrod");
        }
    });
})();