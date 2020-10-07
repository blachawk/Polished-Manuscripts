"use strict";

// (function pmtest() {
//     //ES-TEST CONNECTION
//     console.log('ecmascript connected now!!!!!');
// })();

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

                //Scrolling the document to position "250" horizontally and "110" vertically 
                //https://www.w3schools.com/jsref/met_win_scrollto.asp
                //https://stackoverflow.com/a/50590388/957186
                //window.scrollTo(250, 110);

                //ADD AND OR REMOVE CLASS AS TOGGLE CLASS
                //https://www.digitalocean.com/community/tutorials/js-classlist
                //this.classList.toggle('cool');

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
            console.log('we picked base');
            //look for all hook points and toggle their classes to change colors back to base
            document.querySelector('.header').classList.remove('bg-cream');
            document.querySelector('.header').classList.add('bg-white');
        } else if (e.target.value == 'cream') {
            console.log('we picked cream');
            //look for all hook points and toggle their classes to change existing colors to cream
            //document.querySelector('body').classList.remove('bg-white');  
            document.querySelector('body').classList.add('bg-cream');
            document.querySelector('.header').classList.remove('bg-white');
            document.querySelector('.header').classList.add('bg-cream');
            document.querySelector('.intro h3').classList.remove('txt-brown');
            document.querySelector('.testimonial-title').classList.remove('bg-white');
            document.querySelector('.testimonial-title').classList.add('bg-cream');
            document.querySelector('.testimonial-title .pen-red').classList.add('pen-cream');
            //  document.querySelectorAll('.hook-testimonials ul')[0].classList.add('bg-white');
            //  document.querySelectorAll('.hook-testimonials ul')[1].classList.add('bg-white');
            //  document.querySelectorAll('.hook-testimonials ul')[2].classList.add('bg-white');

        } else {
            console.log('we picked endless night');
            //look for all hook points and toggle their classes to change existing colors to endless night
        }
    });

})();