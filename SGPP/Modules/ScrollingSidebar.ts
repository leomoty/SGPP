/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = "";

        init(): void {

        }

        render(): void {

            var side = $('.sidebar');
            var sideOuter = $(document.createElement('div')).addClass(side.attr('class'));
            var sideInner = side.wrapInner(sideOuter).children().first().addClass('SGPP__scrollingSidebar');
            var sideAds = side.find('.adsbygoogle'); // GoogleAds

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
            var offset = 25; // space between .sidebar and .featured__container
            var navHeight = 0;

            if (SGPP.modules['FixedNavbar'] !== undefined)
                offset += $('header').outerHeight();
            else
                navHeight += $('header').outerHeight();

            var handleScrolling = () => {
                var winTop = $win.scrollTop();
                if (winTop + sideInner.height() >= $widgetContainer.position().top + $widgetContainer.height()) {
                    sideInner.css({
                        position: 'fixed',
                        top: '',
                        bottom: footerHeight
                    });
                    delayedAdSlider(true);

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

            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', () => {
                featHeight = $('.featured__container').height();
                handleScrolling();
            });

            handleScrolling();

            $(document).scroll(handleScrolling);
        }



        name(): string {
            return "Scrolling Sidebar";
        }

        shouldRun = (location: SGLocation) => true;
    }

}
