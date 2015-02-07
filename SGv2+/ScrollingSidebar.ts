/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = "";

        init(): void {
           $('head').append("<style> \
                                .sidebar--wide{min-width:329px}\
                            </style>");
        }

        render(): void {

            //GAds
            var sideInner = $('.sidebar').addClass('SGPP__scrollingSidebar').wrapInner($(document).createElement('div')).addClass('sidebar--wide');
            var sideAds = side.find('.adsbygoogle');
            var delayedAdSlider = (function () {
                var timeout;
                return function (up) {
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        if (up)
                            sideAds.stop().slideUp()
                        else
                            sideAds.stop().slideDown();
                    }, 500);
                }
            })();

            var $win = $(window);
            var footerHeight = $('.footer__outer-wrap').outerHeight();
            var $widgetContainer = $('.page__inner-wrap .widget-container');
            var featHeight = $('.featured__container').height();
            var navbarOffset = $('header').outerHeight();
            var offset = 25 + (SGPP.modules['FixedNavbar'].shouldRun(SGPP.location) ? navbarOffset : 0);


            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', document,() => {
                featHeight = $('.featured__container').height();
            });

            var handleScrolling = funct() {
                var winTop = $win.scrollTop();
                if (winTop + sideInner.height() >= $widgetContainer.position().top + $widgetContainer.height()) {
                    sideInner.css({
                        position: 'fixed',
                        top: '',
                        bottom: footerHeight
                    });
                    delayedAdSlider(true);

                } else if (winTop <= (featHeight + offset)) {
                    sideInner.css({
                        position: 'static',
                        top: '',
                        left: ''
                    });
                    delayedAdSlider(false);

                } else {
                    sideInner.css({
                        position: 'fixed',
                        top: offset,
                        bottom: ''
                    }).show();
                    delayedAdSlider(true);
                }
            };

            handleScrolling();

            $(document).scroll(handleScrolling);
        }

        

        name(): string {
            return "ScrollingSidebar";
        }

        shouldRun = (location: SGLocation) => true;
    }

}