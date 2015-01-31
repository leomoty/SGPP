var ModuleDefinition;
(function (ModuleDefinition) {
    var FixedNavbarModule = (function () {
        function FixedNavbarModule() {
        }
        FixedNavbarModule.prototype.init = function () {
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
        FixedNavbarModule.prototype.render = function () {
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
        FixedNavbarModule.prototype.name = function () {
            return "FixedNavbar";
        };
        return FixedNavbarModule;
    })();
    ModuleDefinition.FixedNavbarModule = FixedNavbarModule;
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
    var EndlessScroll = (function () {
        function EndlessScroll() {
            this._currentPage = -1;
            this._lastPage = -1;
            this._numberOfPages = -1;
            this._isLoading = false;
            this._stopped = false;
        }
        Object.defineProperty(EndlessScroll.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EndlessScroll.prototype, "lastPage", {
            get: function () {
                return this._numberOfPages;
            },
            enumerable: true,
            configurable: true
        });
        EndlessScroll.prototype.canHandle = function () {
            return false;
        };
        EndlessScroll.prototype.getTest = function () {
            return true;
        };
        EndlessScroll.prototype.addStop = function (el) {
        };
        EndlessScroll.prototype.createLoadingElement = function () {
            var el = $('<div class="table__heading loading_es"><div class="table__column--width-fill"><p><i class="fa fa-refresh fa-spin"></i> Loading next page...</p></div></div>');
            this.addStop($(el).find('.loading_es p'));
            return el;
        };
        EndlessScroll.prototype.addLastPageElement = function () {
        };
        EndlessScroll.prototype.addLoadingElement = function () {
        };
        EndlessScroll.prototype.removeLoadingElement = function () {
        };
        EndlessScroll.prototype.loadNextPage = function () {
            if (this._isLoading || this._stopped) {
                return;
            }
            this._isLoading = true;
            this._currentPage++;
            if (this._currentPage > this._lastPage) {
                this.addLastPageElement();
                return;
            }
            this.addLoadingElement();
            var url = $('a[data-page-number=' + this._currentPage + ']').first().attr('href');
            var m = this;
            $.get(url, function (data) {
                var dom = $.parseHTML(data);
                m.parsePage(dom);
                m._isLoading = false;
                m._lastPage = Math.max(m._lastPage, parseInt($('.pagination__navigation a').last().data('page-number')));
                m.removeLoadingElement();
            });
        };
        EndlessScroll.prototype.parsePage = function (dom) {
            var new_nav = $(dom).find('.pagination__navigation').first();
            $('.pagination__navigation').first().html(new_nav.html());
        };
        EndlessScroll.prototype.render = function () {
            if (!this.canHandle() || $('div.pagination__navigation a.is-selected').length == 0)
                return;
            var elLastPage = $('.pagination__navigation a').last();
            this._currentPage = parseInt($('div.pagination__navigation a.is-selected').data('page-number'));
            this._lastPage = parseInt(elLastPage.data('page-number'));
            if (elLastPage.text() == "Last ") {
                this._numberOfPages = this._lastPage;
            }
            if (this._currentPage != 1) {
                return;
            }
            var m = this;
            $(window).scroll(function (event) {
                var scrollPos = $(window).scrollTop() + $(window).height();
                if (scrollPos > $('div.pagination').position().top) {
                    m.loadNextPage();
                }
            });
        };
        return EndlessScroll;
    })();
    ModuleDefinition.EndlessScroll = EndlessScroll;
})(ModuleDefinition || (ModuleDefinition = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScrollGiveaways = (function (_super) {
        __extends(EndlessScrollGiveaways, _super);
        function EndlessScrollGiveaways() {
            _super.apply(this, arguments);
        }
        EndlessScrollGiveaways.prototype.canHandle = function () {
            if (/^\/giveaway\/.*\/entries/.test(location.pathname))
                return false;
            else if (/^\/giveaway\/.*\/winners$/.test(location.pathname))
                return false;
            else if (/\/$/.test(location.pathname) || /^\/giveaways/.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollGiveaways.prototype.init = function () {
        };
        EndlessScrollGiveaways.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        EndlessScrollGiveaways.prototype.addLoadingElement = function () {
            $('.pagination').prev().append(this.createLoadingElement());
        };
        EndlessScrollGiveaways.prototype.removeLoadingElement = function () {
            $('.pagination').prev().find('.loading_es').remove();
        };
        EndlessScrollGiveaways.prototype.parsePage = function (dom) {
            var giveaways_div = $('.pagination').prev();
            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p>Page ' + this.currentPage + ' of ' + this.lastPage + '</p></div></div>');
            this.addStop($(el).find('p'));
            $(giveaways_div).append(el);
            $(dom).find('.pagination').prev().find('.giveaway__row-outer-wrap').each(function (i, el) {
                $(giveaways_div).append(el);
            });
            $(".giveaway__hide").click(function () {
                $(".popup--hide-games input[name=game_id]").val($(this).attr("data-game-id"));
                $(".popup--hide-games .popup__heading__bold").text($(this).closest("h2").find(".giveaway__heading__name").text());
            });
            $(".trigger-popup").click(function () {
                var a = $("." + $(this).attr("data-popup"));
                a.bPopup({
                    opacity: .85,
                    fadeSpeed: 200,
                    followSpeed: 500,
                    modalColor: "#3c424d"
                });
            });
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollGiveaways.prototype.name = function () {
            return "EndlessScrollGiveaways";
        };
        return EndlessScrollGiveaways;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollGiveaways = EndlessScrollGiveaways;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScrollGiveawayComments = (function (_super) {
        __extends(EndlessScrollGiveawayComments, _super);
        function EndlessScrollGiveawayComments() {
            _super.apply(this, arguments);
        }
        EndlessScrollGiveawayComments.prototype.canHandle = function () {
            if (/^\/giveaway\//.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollGiveawayComments.prototype.init = function () {
        };
        EndlessScrollGiveawayComments.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        EndlessScrollGiveawayComments.prototype.addLoadingElement = function () {
            $($('.comments')[0]).append(this.createLoadingElement());
        };
        EndlessScrollGiveawayComments.prototype.removeLoadingElement = function () {
            $($('.comments')[0]).find('.loading_es').remove();
        };
        EndlessScrollGiveawayComments.prototype.parsePage = function (dom) {
            $($('.comments')[0]).append($($(dom).find('.comments')[0]).html());
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollGiveawayComments.prototype.name = function () {
            return "EndlessScrollGiveawayComments";
        };
        return EndlessScrollGiveawayComments;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollGiveawayComments = EndlessScrollGiveawayComments;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScrollDiscussion = (function (_super) {
        __extends(EndlessScrollDiscussion, _super);
        function EndlessScrollDiscussion() {
            _super.apply(this, arguments);
        }
        EndlessScrollDiscussion.prototype.canHandle = function () {
            if (/^\/discussions/.test(location.pathname))
                return true;
            else if (/^\/trades/.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollDiscussion.prototype.init = function () {
            console.log("Test");
        };
        EndlessScrollDiscussion.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        EndlessScrollDiscussion.prototype.addLoadingElement = function () {
            $('.table__rows').first().append(this.createLoadingElement());
        };
        EndlessScrollDiscussion.prototype.removeLoadingElement = function () {
            $('.table__rows').first().find('.loading_es').remove();
        };
        EndlessScrollDiscussion.prototype.parsePage = function (dom) {
            var tablediv = $('.table__rows').first();
            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p>Page ' + this.currentPage + ' of ' + this.lastPage + '</p></div></div>');
            this.addStop($(el).find('p'));
            $(tablediv).append(el);
            $(dom).find('.table__rows').first().find('.table__row-outer-wrap').each(function (i, el) {
                $(tablediv).append(el);
            });
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollDiscussion.prototype.name = function () {
            return "EndlessScrollDiscussion";
        };
        return EndlessScrollDiscussion;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollDiscussion = EndlessScrollDiscussion;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScrollDiscussionReplies = (function (_super) {
        __extends(EndlessScrollDiscussionReplies, _super);
        function EndlessScrollDiscussionReplies() {
            _super.apply(this, arguments);
        }
        EndlessScrollDiscussionReplies.prototype.canHandle = function () {
            if (/^\/discussion\//.test(location.pathname))
                return true;
            else if (/^\/trade\//.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollDiscussionReplies.prototype.init = function () {
        };
        EndlessScrollDiscussionReplies.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.canHandle()) {
                if (true) {
                    var addReply = $('.comment--submit').first();
                    var elCommentHeader = $('<div id="esc_reply_header" class="page__heading"><div class="page__heading__breadcrumbs">Reply</div></div>');
                    if ($('.poll').length == 0)
                        $('.comments').first().after(elCommentHeader);
                    else
                        $('.poll').first().after(elCommentHeader);
                    $('#esc_reply_header').after(addReply);
                    $('.js__comment-reply-cancel').on('click', function () {
                        setTimeout(function () {
                            addReply.insertAfter('#esc_reply_header');
                        }, 10);
                    });
                }
            }
        };
        EndlessScrollDiscussionReplies.prototype.addLoadingElement = function () {
            $($('.comments')[1]).append(this.createLoadingElement());
        };
        EndlessScrollDiscussionReplies.prototype.removeLoadingElement = function () {
            $($('.comments')[1]).find('.loading_es').remove();
        };
        EndlessScrollDiscussionReplies.prototype.parsePage = function (dom) {
            $($('.comments')[1]).append($($(dom).find('.comments')[1]).html());
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollDiscussionReplies.prototype.name = function () {
            return "EndlessScrollDiscussionReplies";
        };
        return EndlessScrollDiscussionReplies;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollDiscussionReplies = EndlessScrollDiscussionReplies;
})(ModuleDefinition || (ModuleDefinition = {}));
(function ($) {
    var log = function (msg) {
        console.log("[" + new Date() + "] SGV2+ - " + msg);
    };
    var modules = {};
    var fixedNavbar = new ModuleDefinition.FixedNavbarModule();
    var gridView = new ModuleDefinition.GridView();
    var scrollingSidebar = new ModuleDefinition.ScrollingSidebar();
    var endlessScrollGiveaways = new ModuleDefinition.EndlessScrollGiveaways();
    modules[endlessScrollGiveaways.name()] = endlessScrollGiveaways;
    var endlessScrollDiscussion = new ModuleDefinition.EndlessScrollDiscussion();
    modules[endlessScrollDiscussion.name()] = endlessScrollDiscussion;
    var endlessScrollDiscussionReplies = new ModuleDefinition.EndlessScrollDiscussionReplies();
    modules[endlessScrollDiscussionReplies.name()] = endlessScrollDiscussionReplies;
    var endlessScrollGiveawayComments = new ModuleDefinition.EndlessScrollGiveawayComments();
    modules[endlessScrollGiveawayComments.name()] = endlessScrollGiveawayComments;
    for (var module in modules) {
        log("Module " + module + " init() call.");
        modules[module].init();
    }
    $(document).ready(function () {
        for (var module in modules) {
            log("Module " + module + " render() call.");
            modules[module].render();
        }
    });
})(jQuery);
