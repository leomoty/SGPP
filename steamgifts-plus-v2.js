(function ($) {

    var SGPlusV2 = (function () {
        giveawayColorByType = function (el, hasGroup, hasWhitelist) {
            if (hasGroup && hasWhitelist) {
                el.css('background-color', '#F06969');
            } else if (hasGroup) {
                el.css('background-color', 'rgba(63,115,0,0.95)');
            } else if (hasWhitelist) {
                el.css('background-color', '#556da9');
            }
            return el;
        },
        generateGridview = function () {
            var container = document.createElement('div');
            $(container).css('display', 'inline-flex');
            $(container).css('flex-wrap', 'wrap');
            $(container).css('justify-content', 'center');

            var parent = $('.page__heading').next()[0];

            $('.giveaway-summary__thumbnail-outer-wrap').css('margin', '5px');

            $('.giveaway-summary').each(function () {

                if ($(this).parents('.giveaway-container--featured').length != 0)
                    return;

                var eachDiv = document.createElement('div');

                var whitelist = $(this).find('.giveaway-summary__column--whitelist');
                var group = $(this).find('.giveaway-summary__column--group');

                $(eachDiv).append(giveawayColorByType($(this).find('.giveaway-summary__thumbnail-outer-wrap'), group.length, whitelist.length));
                $(container).append(eachDiv);
            });
            $(parent).empty();
            $(parent).append(container);
        },
        generateScrollingSidebar = function () {
            var $sidebar = $(".sidebar"),
            $window = $(window),
            offset = $sidebar.offset(),
            topPadding = 64;

            $window.scroll(function () {
                if ($window.scrollTop() > offset.top) {
                    $sidebar.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                    });
                } else {
                    $sidebar.stop().animate({
                        marginTop: 0
                    });
                }
            });
        },
        generateFixedNavbar = function () {
            $('header').css('margin-left', '-25px');
            $('body').css('margin-top', '39px');
            $('header').css('position', 'fixed');
            $('header').css('top', '0');
            $('header').css('width', '100%');
            $('header').css('z-index', '1');
            //$('.nav__left-container').css('margin-left', '25px');
            //$('.nav__right-container').css('margin-right', '25px');
        }

        return {
            generateGridview: generateGridview,
            generateScrollingSidebar: generateScrollingSidebar,
            generateFixedNavbar: generateFixedNavbar
        };
    })();

    $(document).ready(function () {
        if (window.location.pathname.indexOf('/giveaways/open') > -1)
            SGPlusV2.generateGridview();
        SGPlusV2.generateScrollingSidebar();
        SGPlusV2.generateFixedNavbar();
    });
})(jQuery);