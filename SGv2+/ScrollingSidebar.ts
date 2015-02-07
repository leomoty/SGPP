/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = "";

        init(): void {
           
        }

        render(): void {
            var side = $('.sidebar');
            var sideInner = side.wrapInner(side).children().first().addClass('SGPP__scrollingSidebar');
            var sideAds = side.find('.adsbygoogle');

            var $win = $(window);
            var $footer = $('.footer__outer-wrap');
            var footerHeight = $footer.outerHeight();
            var $widgetContainer = $('.page__inner-wrap .widget-container');
            var featHeight = $('.featured__container').height();
            var navbarOffset = $('header').outerHeight();
            var offset = 25 + (SGPP.modules['FixedNavbar'].shouldRun(SGPP.location) ? navbarOffset : 0);


            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', document,() => {
                featHeight = $('.featured__container').height();
            });

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

            var handleScrolling = function () {
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