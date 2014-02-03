var Storage = function () {
    function normalizeSetArgs(key, val, cb) {
        var toStore, callback;
        if ($.isPlainObject('object')) {
            toStore = key;
            callback = val;
        }
        else {
            toStore = {};
            toStore[key] = val;
            callback = cb;
        }
        return {
            data: toStore,
            callback: callback
        };
    }
    var localStorage;
    if (typeof chrome != 'undefined' && typeof chrome.storage != 'undefined' && typeof chrome.storage.sync != 'undefined') {
        localStorage = {
            get: function (key, cb) {
                chrome.storage.sync.get(key, function (result) {
                    cb(null, result && result[key]);
                });
            },
            set: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                chrome.storage.sync.set(args.data, function () {
                    args.callback && args.callback();
                });
            },
            setObject: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                chrome.storage.sync.set(args.data, function () {
                    args.callback && args.callback();
                });
            },
            getObject: function (key, cb) {
                chrome.storage.sync.get(key, function (result) {
                    cb(null, result && result[key]);
                });
            }
        };
    }
    else {
        localStorage = {
            get: function (key, cb) {
                cb(null, window.localStorage.getItem(key));
            },
            set: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                window.localStorage.setItem(key, val);
                args.callback && args.callback();
            },
            setObject: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                window.localStorage.setItem(key, JSON.stringify(val));
                args.callback && args.callback();
            },
            getObject: function (key, cb) {
                cb(null, JSON.parse(window.localStorage.getItem(key)));
            }
        };
    }
    return localStorage;
};

var SGPlusV2 = {
    localStorage: {
    },
    config : {
        gridView: false,
        sidebar: false,
        fixedNavbar: true,
        shortenText: false
    },
    giveawayColorByType: function (el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) el.css('background-color', '#F06969');
        else if (hasGroup) el.css('background-color', 'rgba(63,115,0,0.95)');
        else if (hasWhitelist) el.css('background-color', '#556da9');
        return el;
    },
    generateStyles: function () {
        var styles = document.head.appendChild(document.createElement('style'));
        styles.innerHTML = '.short .markdown{overflow:hidden;max-height:100px;position:relative}.less__beautify{position:absolute;width:100%;bottom:0;display:none;background:-webkit-gradient(linear,left top,left bottom,from(rgba(240,242,245,0)),to(rgba(240,242,245,1)));background:-moz-linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));background:linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));height:20px}.less__beautify.sub{background:-webkit-gradient(linear,left top,left bottom,from(rgba(243,244,247,0)),to(rgba(243,244,247,1)));background:-moz-linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1));background:linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1))}.short .less__beautify{display:block}.comment_more{display:none}.short .comment_more{display:block}.short .comment_less{display:none}body{margin-top:39px}header{margin-left:-25px;position:fixed;top:0;width:100%;z-index:1}.navbar_fixed{padding:0 25px}.gridview_flex{display:flex;flex-wrap:wrap;justify-content:center}';
    },
    generateGridview: function () {
        if (window.location.pathname.indexOf('/giveaways/open') == -1)
            return;
        var container = document.createElement('div');
        $(container).addClass('gridview_flex');
        var parent = $('.page__heading').next()[0];
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
        var nav = $('header').html();
        $('nav').remove();
        $('header').html('<div class="navbar_fixed"></div>');
        $('.navbar_fixed').html(nav);
        $('nav .nav__button--is-dropdown-arrow').click(function () {
            var active = $(this).hasClass('is-selected');
            $('nav .nav__button').removeClass('is-selected');
            $('nav .nav__relative-dropdown').addClass('is-hidden');
            if (!active) $(this).addClass('is-selected').siblings('.nav__relative-dropdown').removeClass('is-hidden');
            return false;
        }).attr('unselectable', 'on').bind('selectstart', function () { return false; });
    },
    generateShortenedText: function () {
        SGPlusV2.generateShortenedComments();
        SGPlusV2.generateShortenedDescriptions();
    },
    generateShortenedComments: function () {
        $('.comment__description.markdown').each(function () {
            if ($(this).find('form').length == 0) {
                if ($(this).innerHeight() > 120) {
                    $(this).parent().addClass('short');
                    var sub = ($(this).closest('.comment__children').length > 0) ? ' sub' : '';
                    $(this).append("<div class='less__beautify" + sub + "'></div>");
                    $(this).next().prepend("<div class='comment__actions__button comment_more'>More</div><div class='comment__actions__button comment_less'>Less</div>");
                }
            }
        });
        $(".comment_more, .comment_less").click(function () {
            var comment_div = $(this).parent().parent();
            comment_div.toggleClass('short');
            if (comment_div.hasClass('short') && comment_div.offset().top < $(window).scrollTop())
                $(window).scrollTop($(comment_div).offset().top - $('.sidebar').height());
        });
    },
    generateShortenedDescriptions: function () {
        $('.giveaway-description__display-state .ajax .markdown').each(function () {
            if ($(this).find('form').length == 0) {
                if ($(this).innerHeight() > 100) {
                    $(this).css({
                        'max-height': '500px',
                        'overflow': 'hidden'
                    })
                    .after("<div style='font-size:11px;color:#aaa;display:inline-block;margin-right:10px;' class='comment__actions__button description_more'>More</div>");
                }
            }
        });
        $(".description_more").click(function () {
            var description_div = $(this).prev();
            if (description_div.css('overflow') == 'hidden') {
                description_div.css({
                    'overflow': 'visible',
                    'max-height': 'none'
                });
                $(this).text("Less");
            } else {
                description_div.css({
                    'overflow': 'hidden',
                    'max-height': '500px'
                });
                $(this).text("More");
                if ($(description_div).offset().top < $(window).scrollTop())
                    $(window).scrollTop($(description_div).offset().top - $('.sidebar').height());
            }
        });
    },
    init: function () {
        SGPlusV2.localStorage = Storage();
        SGPlusV2.localStorage.getObject('config', function (key, value) {
            if (typeof value === 'undefined' || typeof value === 'null')
                SGPlusV2.localStorage.set('config', SGPlusV2.config, function () { console.log("Salvo"); });
            else
                SGPlusV2.config = value;
        });
        SGPlusV2.generateStyles();
        SGPlusV2.generateGridview();
        SGPlusV2.generateScrollingSidebar();
        SGPlusV2.generateFixedNavbar();
        SGPlusV2.generateShortenedText();
    }
};
if (typeof chrome === 'undefined') {
    (function ($) {
        SGPlusV2.init();
    })(jQuery);
} else {
    $(document).ready(function () {
        SGPlusV2.init();
    });
}
