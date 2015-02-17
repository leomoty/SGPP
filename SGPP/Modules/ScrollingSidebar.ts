/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = ".sidebarAdNoMargin{margin-bottom:0px}"; //removes margin in case of an ad blocker

        init(): void {
            
        }

        render(): void {

            var side = $('.sidebar');
            var sideOuter = $(document.createElement('div')).addClass(side.attr('class'));
            var sideInner = side.wrapInner(sideOuter).children().first().addClass('SGPP__scrollingSidebar');
            var sideAds = sideInner.children('.sidebar__mpu'); // GoogleAds

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

            var adsContainer = sideAds.children('.adsbygoogle');
            if(adsContainer.children().length == 0)
                sideAds.addClass('sidebarAdNoMargin');
            adsContainer.on("DOMNodeInserted",(event) => {
                if(adsContainer.children().length > 0)
                    sideAds.removeClass('sidebarAdNoMargin');
            });

            var $win = $(window);
            var footerHeight = $('.footer__outer-wrap').outerHeight();
            var $widgetContainer = $('.page__inner-wrap .widget-container');
            var featHeight = $('.featured__container').height();
            var offset = 25; // space between .sidebar and .featured__container
            var navHeight = 0;

            if (SGPP.modules['FixedNavbar'] !== undefined) {
                offset += $('header').outerHeight();
            } else {
                navHeight += $('header').outerHeight();
            }

            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', document, () => {
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

                // } else if (winTop <= featHeight + navbarOffset) { // in case navbar is NOT fixed
                } else if (winTop <= featHeight + navHeight) {
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