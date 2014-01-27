// ==UserScript==
// @name            SteamGifts Plus v2
// @version         2.0.0 - BETA
// @namespace       steamgiftsplusv2
// @description     Adds various features.
// @copyright       2014 leomoty <leomoty@gmail.com>
// @license         MIT; http://en.wikipedia.org/wiki/Mit_license
// @match           http://www.steamsocial.com/*
// @run-at          document-end
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(run);

function run() {

    function summary_button(el) {
        el.css('z-index', '1');
        el.css('width', '18px');
        el.css('position', 'relative');
        el.css('float', 'right');
        el.css('left', '-10px');
        el.css('top', '-31px');
        el.css('padding-left', '8px');
        el.css('padding-right', '8px');
        el.css('padding-top', '2px');
        el.css('padding-bottom', '2px');
        return el;
    }

    function alternative(el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) {
            el.css('background-color', '#F06969');
        } else if (hasGroup) {
            el.css('background-color', 'rgba(63,115,0,0.95)');
        } else if (hasWhitelist) {
            el.css('background-color', '#556da9');
        }
        return el;
    }

    function gridView(alternate) {
        var div = document.createElement('div');
        $(div).css('display', 'inline-flex');
        $(div).css('flex-wrap', 'wrap');
        $(div).css('justify-content', 'center');

        var parent = $('.page__heading').next()[0];

        $('.giveaway-summary__thumbnail-outer-wrap').css('margin', '5px');

        $('.giveaway-summary').each(function () {

            if ($(this).parents('.giveaway-container--featured').length != 0)
                return;

            var eachDiv = document.createElement('div');

            var whitelist = $(this).find('.giveaway-summary__column--whitelist');
            var group = $(this).find('.giveaway-summary__column--group');

            if (!alternate) {
                $(eachDiv).append($(this).find('.giveaway-summary__thumbnail-outer-wrap'));
                if (whitelist.length) {
                    $(eachDiv).append(summary_button(whitelist));
                }

                if (group.length) {
                    $(eachDiv).append(summary_button(group));
                }
            } else {
                $(eachDiv).append(alternative($(this).find('.giveaway-summary__thumbnail-outer-wrap'), group.length, whitelist.length));
            }
            $(div).append(eachDiv);
        });
        $(parent).empty();
        $(parent).append(div);
    }

    function scrollingSidebar() {
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
    }

    function fixedNavbar() {
        $('header').css('margin-left', '-25px');
        $('body').css('margin-top', '39px');
        $('header').css('position', 'fixed');
        $('header').css('top', '0');
        $('header').css('width', '100%');
        $('header').css('z-index', '1');
    }


    $(document).ready(function () {
        if (window.location.pathname.indexOf('/giveaways/open') > -1)
            gridView(true);
        scrollingSidebar();
        fixedNavbar();
    });
}