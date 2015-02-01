var ModuleDefinition;
(function (ModuleDefinition) {
    var FixedNavbar = (function () {
        function FixedNavbar() {
        }
        FixedNavbar.prototype.init = function () {
            $('head').append("<style> \
			                    .body { margin-top: 39px;} \
			                    .navbar_fixed { padding: 0 25px;} \
			                    .header { \
			                        position: fixed; \
			                        top: 0; \
			                        width: 100%; \
			                        z-index: 100 \
			                    } \
                            </style>");
        };
        FixedNavbar.prototype.render = function () {
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
                if (!active)
                    $(this).addClass('is-selected').siblings('.nav__relative-dropdown').removeClass('is-hidden');
                return false;
            }).attr('unselectable', 'on').bind('selectstart', function () {
                return false;
            });
        };
        FixedNavbar.prototype.name = function () {
            return "FixedNavbar";
        };
        return FixedNavbar;
    })();
    ModuleDefinition.FixedNavbar = FixedNavbar;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var ScrollingSidebar = (function () {
        function ScrollingSidebar() {
        }
        ScrollingSidebar.prototype.init = function () {
        };
        ScrollingSidebar.prototype.render = function () {
            var $sidebar = $(".sidebar"), $window = $(window), offset = $sidebar.offset(), topPadding = 64;
            $window.scroll(function () {
                if ($window.scrollTop() > offset.top) {
                    $sidebar.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                    });
                }
                else {
                    $sidebar.stop().animate({
                        marginTop: 0
                    });
                }
            });
        };
        ScrollingSidebar.prototype.name = function () {
            return "ScrollingSidebar";
        };
        return ScrollingSidebar;
    })();
    ModuleDefinition.ScrollingSidebar = ScrollingSidebar;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var LivePreview = (function () {
        function LivePreview() {
        }
        LivePreview.prototype.init = function () {
        };
        LivePreview.prototype.render = function () {
        };
        LivePreview.prototype.name = function () {
            return "LivePreview";
        };
        return LivePreview;
    })();
    ModuleDefinition.LivePreview = LivePreview;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    function calculateWinChance(copies, entries) {
        var res = (+(parseFloat(copies) / parseFloat(entries)) * 100);
        return res === Number.POSITIVE_INFINITY ? 100 : res > 100 ? 100 : res.toFixed(2);
    }
    var GridView = (function () {
        function GridView() {
        }
        GridView.prototype.init = function () {
            $('head').append("<style> \
                                .gridview_flex{display:flex;flex-wrap:wrap;justify-content:center} \
                                .preview{box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;background-color:rgba(255,255,255,1);border:1px solid #cbcfdb;padding:5px; z-index:10;}\
                                .tile_view_header{min-height:35px;margin-top:5px;font-size:12px} \
                                .tile_view_avatar_outer{float: right;display: inline-block; margin-left:5px}\
                                .tile_view_avatar{height: 24px;width: 24px;padding: 2px}\
                                .tile_view_faded{width: 184px; height: 69px; margin-top:-69px; background-color:#fff; opacity: .75 }\
                            </style>");
        };
        GridView.prototype.render = function () {
            var content = this.generateGridview($('.pagination').prev());
            $($('.page__heading').next()[0]).html(content);
        };
        GridView.prototype.name = function () {
            return "GridView";
        };
        GridView.prototype.generateGridview = function (root) {
            var container = document.createElement('div');
            $(container).addClass('gridview_flex');
            $(root).find('.giveaway__row-outer-wrap').css('margin', '5px');
            $(root).find('.giveaway__row-inner-wrap').each(function () {
                if ($(this).parents('.pinned-giveaways').length != 0)
                    return;
                var eachDiv = document.createElement('div');
                $(eachDiv).append($(this).find('.global__image-outer-wrap--game-medium'));
                $(eachDiv).css('margin', '5px');
                var gridview_extra = $('<div class="gridview_extra is-hidden preview" style="position:absolute; width:184px;margin-left:-5.8px; border-top: thick #ffffff;"></div>');
                var giveawayName = $(this).find('.giveaway__heading__name').text();
                var avatar = $(this).find('.global__image-outer-wrap--avatar-small');
                avatar.addClass('tile_view_avatar');
                var copies = "0";
                var cost = "0";
                if ($(this).find('.giveaway__heading__thin').length == 1) {
                    cost = $(this).find('.giveaway__heading__thin').text().replace("(", "").replace(")", "");
                    copies = "1";
                }
                else {
                    cost = $(this).find('.giveaway__heading__thin:nth(1)').text().replace("(", "").replace(")", "");
                    copies = $(this).find('.giveaway__heading__thin:nth(0)').text().replace("(", "").replace("Copies)", "");
                }
                var timeLeft = $(this).find('.fa-clock-o').next().text();
                var timeSplit = timeLeft.split(" ");
                var entries = $(this).find('.fa-tag').next().text();
                var entriesSplit = entries.split(" ");
                var comments = $(this).find('.fa-comment').next().text();
                var commentsSplit = comments.split(" ");
                var winChance = calculateWinChance(copies, entries.replace(",", ""));
                if ($(this).hasClass('is-faded'))
                    $(eachDiv).children().first().append('<div class="tile_view_faded"></div>');
                $(gridview_extra).append('<div class="giveaway__heading__name tile_view_header">' + giveawayName + '</div>');
                $(gridview_extra).append('<div class="tile_view_avatar_outer">' + avatar[0].outerHTML + '</div>');
                $(gridview_extra).append('<div style="float:left;"><strong>' + copies + '</strong> Copies</div>');
                $(gridview_extra).append('<div style="float:right;"><strong>' + cost + '</strong></div>');
                $(gridview_extra).append('<div style="clear:both;"></div>');
                if (timeSplit[0] === "Ended")
                    $(gridview_extra).append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong></div>');
                else
                    $(gridview_extra).append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong> ' + timeSplit[1] + '</div>');
                $(gridview_extra).append('<div style="clear:both;"></div>');
                $(gridview_extra).append('<div style="float:left;"><strong>' + entriesSplit[0] + '</strong> Entries</div>');
                $(gridview_extra).append('<div style="float:right;"><strong>' + winChance + '</strong>% Chance</div>');
                $(gridview_extra).append('<div style="clear:both;"></div>');
                $(gridview_extra).append('<div><strong>' + commentsSplit[0] + '</strong> Comments</div>');
                $(eachDiv).children().first().append(gridview_extra);
                $(container).append(eachDiv);
            });
            $(container).append($('<div style="margin-top: 5px; margin-bottom: 20px;width: 0px;height: 69px;"></div>'));
            $(container).find('.global__image-outer-wrap--game-medium').hover(function () {
                $(this).find('.gridview_extra').removeClass('is-hidden');
            }, function () {
                $(this).find('.gridview_extra').addClass('is-hidden');
            });
            return container;
        };
        return GridView;
    })();
    ModuleDefinition.GridView = GridView;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var Core = (function () {
        function Core() {
        }
        Core.prototype.init = function () {
        };
        Core.prototype.render = function () {
        };
        Core.prototype.name = function () {
            return "Core";
        };
        Core.prototype.log = function (msg) {
            console.log("[" + new Date() + "] SGV2+ - " + msg);
        };
        return Core;
    })();
    ModuleDefinition.Core = Core;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var CommentAndEnter = (function () {
        function CommentAndEnter() {
        }
        CommentAndEnter.prototype.init = function () {
        };
        CommentAndEnter.prototype.render = function () {
            if (window.location.pathname.indexOf('/giveaway/') == -1)
                return;
            $('.js__submit-form').after('<div class="sidebar__entry-insert comment_submit" style="margin-bottom:0px;">Comment and Enter</div>');
            $('.comment_submit').on("click", function () {
                var elem = $('.sidebar .sidebar__entry-insert');
                elem.closest('form').find('.sidebar__entry-insert, .sidebar__entry-delete').addClass('is-hidden');
                elem.closest('form').find('.sidebar__entry-loading').removeClass('is-hidden');
                elem.closest('form').find('input[name=do]').val(elem.attr('data-do'));
                $.ajax({
                    url: '/ajax.php',
                    type: 'POST',
                    dataType: 'json',
                    data: elem.closest('form').serialize(),
                    success: function (data) {
                        elem.closest('form').find('.sidebar__entry-loading').addClass('is-hidden');
                        if (data.type == 'success') {
                            if (elem.hasClass('sidebar__entry-insert')) {
                                elem.closest('form').find('.sidebar__entry-delete').removeClass('is-hidden');
                            }
                            else if (elem.hasClass('sidebar__entry-delete')) {
                                elem.closest('form').find('.sidebar__entry-insert').removeClass('is-hidden');
                            }
                            if ($('.comment_submit').hasClass('js__edit-giveaway')) {
                                $('.comment_submit').closest('form').find('input[name=next_step]').val("1");
                            }
                            $('.comment_submit').closest('form').submit();
                            return false;
                        }
                        else if (data.type == 'error') {
                            if (typeof data.link !== 'undefined' && data.link !== false) {
                                elem.closest('form').html('<a href="' + data.link + '" class="sidebar__error"><i class="fa fa-exclamation-circle"></i> ' + data.msg + '</a>');
                            }
                            else {
                                elem.closest('form').html('<div class="sidebar__error"><i class="fa fa-exclamation-circle"></i> ' + data.msg + '</div>');
                            }
                        }
                        if (typeof data.entry_count !== 'undefined' && data.entry_count !== false) {
                            $('.live__entry-count').text(data.entry_count);
                        }
                        $('.nav__points').text(data.points);
                    }
                });
            });
        };
        CommentAndEnter.prototype.name = function () {
            return "CommentAndEnter";
        };
        return CommentAndEnter;
    })();
    ModuleDefinition.CommentAndEnter = CommentAndEnter;
})(ModuleDefinition || (ModuleDefinition = {}));
(function ($) {
    var modules = {};
    var SGV2P = new ModuleDefinition.Core();
    var modulesNames = new Array("GridView", "FixedNavbar", "ScrollingSidebar", "LivePreview", "CommentAndEnter");
    for (var pos in modulesNames) {
        var m = new ModuleDefinition[modulesNames[pos]]();
        modules[m.name()] = m;
        SGV2P.log("Module " + m.name() + " init() call.");
        modules[m.name()].init();
    }
    $(document).ready(function () {
        for (var module in modules) {
            SGV2P.log("Module " + module + " render() call.");
            modules[module].render();
        }
    });
})(jQuery);
