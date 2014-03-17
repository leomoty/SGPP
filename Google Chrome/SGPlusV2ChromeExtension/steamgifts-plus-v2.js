var SGPlusV2 = {
    location : window.location.pathname,
    config : {
        gridView: false,
        sidebar: true,
        fixedNavbar: true,
        shortenText: false,
        featuredWrapper: false,
        endlessScroll: true
    },
    images : {
        loader : 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
    },
    giveawayColorByType: function (el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) el.css('background-color', '#F06969');
        else if (hasGroup) el.css('background-color', 'rgba(63,115,0,0.95)');
        else if (hasWhitelist) el.css('background-color', '#556da9');
        return el;
    },
    generateStyles: function () {
        var styles = document.head.appendChild(document.createElement('style'));
        styles.innerHTML = '.short .markdown{overflow:hidden;max-height:100px;position:relative}.less__beautify{position:absolute;width:100%;bottom:0;display:none;background:-webkit-gradient(linear,left top,left bottom,from(rgba(240,242,245,0)),to(rgba(240,242,245,1)));background:-moz-linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));background:linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));height:20px}.less__beautify.sub{background:-webkit-gradient(linear,left top,left bottom,from(rgba(243,244,247,0)),to(rgba(243,244,247,1)));background:-moz-linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1));background:linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1))}.short .less__beautify{display:block}.comment_more{display:none}.short .comment_more{display:block}.short .comment_less{display:none}.body{margin-top:39px}.header{margin-left:-25px;position:fixed;top:0;width:100%;z-index:1}.navbar_fixed{padding:0 25px}.gridview_flex{display:flex;flex-wrap:wrap;justify-content:center}.center_endless_loading{margin:0 auto;width:10%}.center_endless_end{margin:0 auto;width:20%}';
    },
    generateGridview: function () {
        if (SGPlusV2.location.indexOf('/giveaways/open') == -1)
            return;
        var container = document.createElement('div');
        $(container).addClass('gridview_flex');
        var parent = $('.page__heading').next()[0];
        $('.giveaway-summary__thumbnail-outer-wrap').css('margin', '5px');
        $('.giveaway-summary-inner-wrap').each(function () {
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
        $('header').addClass('header');
        $('body').addClass('body');
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
    lastLoadedPage : 1,
    lastPage : 1,
    canLoadNewPage : true,
    generateEndlessScroll : function () {
        if (SGPlusV2.location.indexOf('/user/') >= 0)
            return;
        if (SGPlusV2.location.indexOf('/giveaways/open') == -1 && SGPlusV2.location.indexOf('/giveaways/closed') == -1
            && SGPlusV2.location.indexOf('/giveaways/coming-soon') == -1 && SGPlusV2.location.indexOf('/giveaways/today') == -1)
            return;
        $('.pagination').before($('<div id="loading" class="center_endless_loading is-hidden"><img src="'+ SGPlusV2.images.loader + '></img>"<span class="giveaway-summary__heading__name">Loading</span></div'));
        $('.pagination').before($('<div id="end" class="center_endless_end is-hidden"><span class="giveaway-summary__heading__name">You\'ve reached the end.</span></div'));
        $('.pagination').css('visibility','hidden');
        SGPlusV2.lastPage = $('.pagination__navigation > a').last().attr('data-page-number') || 1; //assumes this is the only page available if undefined
        $(window).scroll(function(){
            if(SGPlusV2.canLoadNewPage && $(window).scrollTop() >  ($('.pagination').offset().top - $(window).height())){
                var pos = SGPlusV2.lastLoadedPage + 1;
                SGPlusV2.canLoadNewPage = false;
                if(pos > SGPlusV2.lastPage){
                    $('#end').removeClass('is-hidden');
                    return;
                }
                $('#loading').removeClass('is-hidden');
                $.ajax({ url: SGPlusV2.location + '/page/' + pos})
                .done(function (html){
                    $('#loading').before('<div class="page__heading"><div class="page__heading__breadcrumbs">Page ' + pos + ' of ' + SGPlusV2.lastPage + ' </div></div>');
                    $('#loading').before($(html).find('.pagination').prev());
                    SGPlusV2.lastLoadedPage = pos;
                })
                .always(function(){
                    SGPlusV2.canLoadNewPage = true; //needs to assume something can go wrong
                    $('#loading').addClass('is-hidden');
                });
            }
        });
    },
    selectSidebarItem : function(el){
        $(el).children().prepend('<i class="fa fa-caret-right"></i>');
        $(el).addClass('is-selected');
        return el;
    },
    addGroupLink : function() {
        if(/\/giveaway\/\w{5}\//.test(SGPlusV2.location) === false)
            return;
        if($('.featured__columns > .giveaway-summary__column--group').length)
        {
            var groupsLocation = window.location.pathname.replace('comments','groups');
            var selected = /\/giveaway\/\w{5}\/(\w|\W)+\/groups/.test(SGPlusV2.location);
            var el = $('<li class="sidebar__navigation__item"><a class="sidebar__navigation__item__link" href="' + groupsLocation + '"><div class="sidebar__navigation__item__name">Groups</div><div class="sidebar__navigation__item__underline"></div></a></li>');
            if(selected)
                $('.sidebar__navigation').first().append(SGPlusV2.selectSidebarItem(el));
            else
                $('.sidebar__navigation').first().append(el);
        }
    },
    hideFeaturedWrapper : function(){
        if (SGPlusV2.location.indexOf('/giveaways/') == -1)
            return;
        if (SGPlusV2.location.indexOf('/user/') >= 0)
            return;
        $('.featured__outer-wrap').hide();
    },
    putImagesInPlace : function(){
        $('.comment__description.markdown').each(function(){
            var images = $(this).find('.comment__toggle-attached').parent();
            if(images.length == 0)
                return;
            var pivot = 0;
            $(this).find('a').each(function(){
                if(pivot < images.length && /(\w|\W)+\/img/.test($(this).prop('href'))){
                    $(this).parent().append(images[pivot]);
                    $(this).remove();
                    pivot++;
                 }
            });
        });
    },
    addHandlers : function(){
        $(".js__comment-edit-save, .js__comment-undelete").off("click","**");
        $(document).on("click", ".js__comment-edit-save, .js__comment-undelete", function(){
           var elem = $(this);
           $.ajax({
               url: $(this).closest('form').attr('action'),
               type: 'POST',
               data: $(this).closest('form').serialize(),
               success: function(data){
                   elem.closest('.comment .ajax').html(data);
                   SGPlusV2.putImagesInPlace();
               }
           });
           return false;
        });
    },
    init_nondelayed : function() {
        SGPlusV2.addHandlers();
        SGPlusV2.generateStyles();
        SGPlusV2.addGroupLink();
        SGPlusV2.putImagesInPlace();
    },
    init_delayed: function(){
        if(SGPlusV2.config.featuredWrapper === true)
            SGPlusV2.hideFeaturedWrapper();
        if(SGPlusV2.config.gridView === true)
            SGPlusV2.generateGridview();
        if(SGPlusV2.config.sidebar === true)
            SGPlusV2.generateScrollingSidebar();
        if(SGPlusV2.config.fixedNavbar === true)
            SGPlusV2.generateFixedNavbar();
        if(SGPlusV2.config.shortenText === true)
            SGPlusV2.generateShortenedText();
        if(SGPlusV2.config.endlessScroll === true)
            SGPlusV2.generateEndlessScroll();
    },
    init: function () {
        SGPlusV2.init_nondelayed();
        if (typeof chrome != 'undefined' && typeof chrome.storage != 'undefined' && typeof chrome.storage.sync != 'undefined') {
            chrome.storage.sync.get(function(settings){
                if(settings.gridview === undefined) { settings.gridview = SGPlusV2.config.gridView; chrome.storage.sync.set({'gridview': settings.gridview}); }
                if(settings.shorten_comments === undefined) { settings.shorten_comments = SGPlusV2.config.shortenText; chrome.storage.sync.set({'shorten_comments': settings.shorten_comments});}
                if(settings.scrolling_sidebar === undefined) { settings.scrolling_sidebar = SGPlusV2.config.sidebar; chrome.storage.sync.set({'scrolling_sidebar': settings.scrolling_sidebar}); }
                if(settings.fixed_navbar === undefined) { settings.fixed_navbar = SGPlusV2.config.fixedNavbar; chrome.storage.sync.set({'fixed_navbar': settings.fixed_navbar}); }
                if(settings.featured_wrapper === undefined) { settings.featured_wrapper = SGPlusV2.config.featuredWrapper; chrome.storage.sync.set({'featured_wrapper': settings.featured_wrapper}); }
                if(settings.endless_scroll === undefined) { settings.endless_scroll = SGPlusV2.config.endlessScroll; chrome.storage.sync.set({'endless_scroll': settings.endless_scroll}); }

                SGPlusV2.config.gridView = settings.gridview;
                SGPlusV2.config.shortenText =  settings.shorten_comments;
                SGPlusV2.config.sidebar = settings.scrolling_sidebar;
                SGPlusV2.config.fixedNavbar = settings.fixed_navbar;
                SGPlusV2.config.featuredWrapper = settings.featured_wrapper;
                SGPlusV2.config.endlessScroll = settings.endless_scroll;

                SGPlusV2.init_delayed();
            });
        } else {
            SGPlusV2.init_delayed();
        }
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
