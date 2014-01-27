var SGPlusV2 = {
    giveawayColorByType: function (el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) el.css('background-color', '#F06969');
        else if (hasGroup) el.css('background-color', 'rgba(63,115,0,0.95)');
        else if (hasWhitelist) el.css('background-color', '#556da9');
        return el;
    },
    generateGridview: function () {
        var container = document.createElement('div');
        $(container).css({
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        });

        var parent = $('.page__heading')[0].next();

        $('.giveaway-summary__thumbnail-outer-wrap').css('margin', '5px');

        $('.giveaway-summary').each(function () {

            if ($(this).parents('.giveaway-container--featured').length != 0) return;

            var eachDiv = document.createElement('div');

            var whitelist = $(this).find('.giveaway-summary__column--whitelist');
            var group = $(this).find('.giveaway-summary__column--group');

            $(eachDiv).append(SGPlusV2.giveawayColorByType($(this).find('.giveaway-summary__thumbnail-outer-wrap'), group.length, whitelist.length));
            $(container).append(eachDiv);
        });

        $(parent).empty().append(container);
    },
    generateScrollingSidebar: function () {
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
    generateFixedNavbar: function () {
        $('body').css('margin-top', '39px');
        $('header').css({
            marginLeft: '-25px',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1
        });

        var nav = $('header').html();
        $('nav').remove();
        $('header').html('<div id="myowncontainer" style="padding:0 25px;"></div>');
        $('#myowncontainer').html(nav);

        $('nav .nav__button--is-dropdown-arrow').click(function () {
            var active = $(this).hasClass('is-selected');
            $('nav .nav__button').removeClass('is-selected');
            $('nav .nav__relative-dropdown').hide();
            if (!active) $(this).addClass('is-selected').siblings('.nav__relative-dropdown').show();
            return false;
        }).attr('unselectable', 'on').bind('selectstart', function () { return false; });
    }
};


(function ($) {
    if (window.location.pathname.indexOf('/giveaways/open') > -1)
        SGPlusV2.generateGridview();
    SGPlusV2.generateScrollingSidebar();
    SGPlusV2.generateFixedNavbar();
})(jQuery);
