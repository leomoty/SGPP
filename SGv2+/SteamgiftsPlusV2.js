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
    var CommentAndEnter = (function () {
        function CommentAndEnter() {
        }
        CommentAndEnter.prototype.init = function () {
        };
        CommentAndEnter.prototype.render = function () {
            if (window.location.pathname.indexOf('/giveaway/') == -1)
                return;
            $('.js__submit-form').after('<div class="sidebar__entry-insert comment_submit" style="margin-bottom:0px; margin-left: 5px;">Comment and Enter</div>');
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
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScroll = (function () {
        function EndlessScroll() {
            this._currentPage = 1;
            this._lastPage = 1;
            this._numberOfPages = 1;
            this._isLoading = false;
            this._stopped = false;
        }
        Object.defineProperty(EndlessScroll.prototype, "stopped", {
            get: function () {
                return this._stopped;
            },
            set: function (v) {
                this._stopped = v;
            },
            enumerable: true,
            configurable: true
        });
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
        EndlessScroll.prototype.createPageElement = function (page) {
            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p>...</p></div></div>');
            if (this._numberOfPages > 0)
                $(el).find('p').text('Page ' + page + ' of ' + this._numberOfPages);
            else
                $(el).find('p').text('Page ' + page);
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
        EndlessScroll.prototype.preparePage = function () {
            if (!this.canHandle() || $('div.pagination__navigation a.is-selected').length == 0)
                return;
            var elLastPage = $('.pagination__navigation a').last();
            this._currentPage = parseInt($('div.pagination__navigation a.is-selected').data('page-number'));
            this._lastPage = parseInt(elLastPage.data('page-number'));
            if (elLastPage.text().trim() == "Last") {
                this._numberOfPages = this._lastPage;
            }
            if (this._currentPage != 1) {
                return;
            }
            var m = this;
            $(window).scroll(function (event) {
                var scrollPos = $(window).scrollTop() + $(window).height();
                if (scrollPos > $('div.pagination').position().top - 200) {
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
        };
        EndlessScrollDiscussion.prototype.render = function () {
            if (this.canHandle()) {
                this.preparePage();
            }
        };
        EndlessScrollDiscussion.prototype.addLoadingElement = function () {
            $('.table__rows').first().append(this.createLoadingElement());
        };
        EndlessScrollDiscussion.prototype.removeLoadingElement = function () {
            $('.table__rows').first().find('.loading_es').remove();
        };
        EndlessScrollDiscussion.prototype.parsePage = function (dom) {
            var tablediv = $('.table__rows').first();
            $(tablediv).append(this.createPageElement(this.currentPage));
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
    var topicInfo = (function () {
        function topicInfo(topicID) {
            this.localStorageKey = "endless_scroll_" + topicID;
            if (this.localStorageKey in localStorage) {
                this._obj = JSON.parse(localStorage[this.localStorageKey]);
            }
            else {
                this._obj = {
                    lastVisit: Date.now(),
                    lastCommentIDPages: {},
                };
            }
        }
        Object.defineProperty(topicInfo.prototype, "lastVisit", {
            get: function () {
                return this._obj.lastVisit;
            },
            enumerable: true,
            configurable: true
        });
        topicInfo.prototype.setLastVisit = function () {
            this._obj.lastVisit = Date.now();
            this.save();
        };
        topicInfo.prototype.setLastCommentID = function (page, commentID) {
            this._obj.lastCommentIDPages[page] = commentID;
            this.save();
        };
        topicInfo.prototype.isNewComment = function (page, commentID) {
            if (page in this._obj.lastCommentIDPages)
                return (commentID > this._obj.lastCommentIDPages[page]);
            else
                return true;
        };
        topicInfo.prototype.save = function () {
            localStorage[this.localStorageKey] = JSON.stringify(this._obj);
        };
        return topicInfo;
    })();
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
        EndlessScrollDiscussionReplies.prototype.getDiscussionId = function () {
            var match = /(discussion|trade)\/([^/]+)(\/|$)/.exec(location.pathname);
            if (!match)
                throw 'No Discussion ID';
            return match[1] + '_' + match[2];
        };
        EndlessScrollDiscussionReplies.prototype.init = function () {
            $('head').append("<style> \
			                    .endless_new .comment__parent .comment__summary, .endless_new > .comment__child {\
                                    background-color: rgba(180,180,222,0.1)\
                                } \
                                .endless_not_new .comment__parent .comment__summary,  .endless_not_new > .comment__child {\
                                } \
                                .endless_not_new:hover .comment__parent .comment__summary,  .endless_not_new:hover > .comment__child {\
                                } \
                            </style>");
        };
        EndlessScrollDiscussionReplies.prototype.getLatestCommentID = function (root) {
            var id = 0;
            $(root).find('.comment[data-comment-id]').each(function (i, el) {
                var n = parseInt($(el).data('comment-id'));
                if (n > id)
                    id = n;
            });
            return id;
        };
        EndlessScrollDiscussionReplies.prototype.render = function () {
            if (this.canHandle()) {
                if (true) {
                    var addReply = $('.comment--submit').first();
                    if (addReply.length == 1) {
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
                this.preparePage();
                this.topicInfo = new topicInfo(this.getDiscussionId());
                this.markNewComments(document);
                this.topicInfo.setLastVisit();
                this.topicInfo.setLastCommentID(this.currentPage, this.getLatestCommentID(document));
            }
        };
        EndlessScrollDiscussionReplies.prototype.markNewComments = function (root) {
            var _this = this;
            var page = this.currentPage;
            $(root).find('.comment[data-comment-id]').each(function (i, el) {
                var id = parseInt($(el).data('comment-id'));
                if (_this.topicInfo.isNewComment(page, id)) {
                    $(el).addClass('endless_new');
                }
                else {
                    $(el).addClass('endless_not_new');
                }
            });
        };
        EndlessScrollDiscussionReplies.prototype.addLoadingElement = function () {
            $($('.comments')[1]).append(this.createLoadingElement());
        };
        EndlessScrollDiscussionReplies.prototype.removeLoadingElement = function () {
            $($('.comments')[1]).find('.loading_es').remove();
        };
        EndlessScrollDiscussionReplies.prototype.parsePage = function (dom) {
            this.markNewComments(dom);
            this.topicInfo.setLastCommentID(this.currentPage, this.getLatestCommentID(dom));
            var comments_div = $('.comments')[1];
            $(comments_div).append(this.createPageElement(this.currentPage));
            $(comments_div).append($($(dom).find('.comments')[1]).html());
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollDiscussionReplies.prototype.name = function () {
            return "EndlessScrollDiscussionReplies";
        };
        return EndlessScrollDiscussionReplies;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollDiscussionReplies = EndlessScrollDiscussionReplies;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var EndlessScrollGiveawayComments = (function (_super) {
        __extends(EndlessScrollGiveawayComments, _super);
        function EndlessScrollGiveawayComments() {
            _super.apply(this, arguments);
        }
        EndlessScrollGiveawayComments.prototype.canHandle = function () {
            if (/^\/giveaway\/.*\/entries/.test(location.pathname))
                return false;
            else if (/^\/giveaway\/.*\/winners$/.test(location.pathname))
                return false;
            else if (/^\/giveaway\/.*\/groups$/.test(location.pathname))
                return false;
            if (/^\/giveaway\//.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollGiveawayComments.prototype.init = function () {
        };
        EndlessScrollGiveawayComments.prototype.render = function () {
            if (this.canHandle()) {
                if (true) {
                    var addReply = $('.comment--submit').first();
                    var elCommentHeader = $('<div id="esc_reply_header" class="page__heading"><div class="page__heading__breadcrumbs">Reply</div></div>');
                    $('.comments').prev().before(elCommentHeader);
                    $('#esc_reply_header').after(addReply);
                    $('.js__comment-reply-cancel').on('click', function () {
                        setTimeout(function () {
                            addReply.insertAfter('#esc_reply_header');
                        }, 10);
                    });
                }
                this.preparePage();
            }
        };
        EndlessScrollGiveawayComments.prototype.addLoadingElement = function () {
            $($('.comments')[0]).append(this.createLoadingElement());
        };
        EndlessScrollGiveawayComments.prototype.removeLoadingElement = function () {
            $($('.comments')[0]).find('.loading_es').remove();
        };
        EndlessScrollGiveawayComments.prototype.parsePage = function (dom) {
            var comments_div = $('.comments')[0];
            $(comments_div).append(this.createPageElement(this.currentPage));
            $(comments_div).append($($(dom).find('.comments')[0]).html());
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
    var EndlessScrollGiveaways = (function (_super) {
        __extends(EndlessScrollGiveaways, _super);
        function EndlessScrollGiveaways() {
            _super.apply(this, arguments);
            this._location = 'frontpage';
        }
        EndlessScrollGiveaways.prototype.canHandle = function () {
            if (/^\/giveaways\/entered/.test(location.pathname))
                return false;
            else if (/^\/giveaways\/created/.test(location.pathname))
                return false;
            else if (/^\/giveaways\/won/.test(location.pathname))
                return false;
            if (/\/$/.test(location.pathname) || /^\/giveaways/.test(location.pathname))
                return true;
            if (/^\/user\/[^\/]+(\/giveaways\/won([^\/]+)?)?$/.test(location.pathname)) {
                this._location = 'profile';
                return true;
            }
            return false;
        };
        EndlessScrollGiveaways.prototype.init = function () {
        };
        EndlessScrollGiveaways.prototype.render = function () {
            if (this.canHandle()) {
                this.preparePage();
            }
        };
        EndlessScrollGiveaways.prototype.addLoadingElement = function () {
            $('.pagination').prev().append(this.createLoadingElement());
        };
        EndlessScrollGiveaways.prototype.removeLoadingElement = function () {
            $('.pagination').prev().find('.loading_es').remove();
        };
        EndlessScrollGiveaways.prototype.parsePage = function (dom) {
            var giveaways_div = $('.pagination').prev();
            $(giveaways_div).append(this.createPageElement(this.currentPage));
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
    var EndlessScrollMyGiveaways = (function (_super) {
        __extends(EndlessScrollMyGiveaways, _super);
        function EndlessScrollMyGiveaways() {
            _super.apply(this, arguments);
        }
        EndlessScrollMyGiveaways.prototype.canHandle = function () {
            if (/^\/giveaways\/entered/.test(location.pathname))
                return true;
            else if (/^\/giveaways\/created/.test(location.pathname))
                return true;
            else if (/^\/giveaways\/won/.test(location.pathname))
                return true;
            else if (/^\/giveaway\/.*\/entries/.test(location.pathname))
                return true;
            else if (/^\/giveaway\/.*\/winners$/.test(location.pathname))
                return true;
            else if (/^\/giveaway\/.*\/groups$/.test(location.pathname))
                return true;
            return false;
        };
        EndlessScrollMyGiveaways.prototype.init = function () {
        };
        EndlessScrollMyGiveaways.prototype.render = function () {
            if (this.canHandle()) {
                this.preparePage();
            }
        };
        EndlessScrollMyGiveaways.prototype.addLoadingElement = function () {
            $('.pagination').prev().append(this.createLoadingElement());
        };
        EndlessScrollMyGiveaways.prototype.removeLoadingElement = function () {
            $('.pagination').prev().find('.loading_es').remove();
        };
        EndlessScrollMyGiveaways.prototype.parsePage = function (dom) {
            var tablediv = $('.table__rows');
            $(tablediv).append(this.createPageElement(this.currentPage));
            $(dom).find('.table__rows').find('.table__row-outer-wrap').each(function (i, el) {
                $(tablediv).append(el);
            });
            _super.prototype.parsePage.call(this, dom);
        };
        EndlessScrollMyGiveaways.prototype.name = function () {
            return "EndlessScrollMyGiveaways";
        };
        return EndlessScrollMyGiveaways;
    })(ModuleDefinition.EndlessScroll);
    ModuleDefinition.EndlessScrollMyGiveaways = EndlessScrollMyGiveaways;
})(ModuleDefinition || (ModuleDefinition = {}));
var SGV2P = new ModuleDefinition.Core();
(function ($) {
    var modules = {};
    var modulesNames = new Array("EndlessScrollDiscussion", "EndlessScrollDiscussionReplies", "EndlessScrollGiveaways", "EndlessScrollMyGiveaways", "EndlessScrollGiveawayComments");
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
