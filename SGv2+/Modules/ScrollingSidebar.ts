/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = ".ad{margin:0!important}";

        init(): void {
            
        }

        render(): void {

            var side = $('.sidebar');
            var sideOuter = $(document.createElement('div')).addClass(side.attr('class'));
            var sideInner = side.wrapInner(sideOuter).children().first().addClass('SGPP__scrollingSidebar');

            //GoogleAds
            var sideAds = sideInner.children().first().css('text-align','center');
            $(document).ready(() => {
                if(sideAds.outerHeight(true) == 15)
                    $('.sidebar__search-container').prev().addClass('ad');
            });
            var delayedAdSlider = (() => {
                var timeout;
                return (up) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        if (up)
                            sideAds.stop().slideUp()
                        else
                            sideAds.stop().slideDown();
                    }, 250);
                }
            })();

            var $win = $(window);
            var footerHeight = $('.footer__outer-wrap').outerHeight();
            var $widgetContainer = $('.page__inner-wrap .widget-container');
            var featHeight = $('.featured__container').height();
            var navbarOffset = $('header').outerHeight();
            var offset = 25 + (SGPP.modules['FixedNavbar'] != undefined ? navbarOffset : 0);

            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', document,() => {
                featHeight = $('.featured__container').height();
            });

            var handleScrolling = () => {
                var winTop = $win.scrollTop();
                if (winTop + sideInner.height() >= $widgetContainer.position().top + $widgetContainer.height()) {
                    sideInner.css({
                        position: 'fixed',
                        top: '',
                        bottom: footerHeight
                    });
                    delayedAdSlider(true);

                } else if (winTop <= featHeight) {
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