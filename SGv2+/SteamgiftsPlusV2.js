var ModuleDefinition;
(function (ModuleDefinition) {
    var Core = (function () {
        function Core() {
            var _this = this;
            this.style = "";
            this.resolvePath = function () {
                var hash = "";
                var pageKind = "";
                var code = "";
                var description = "";
                var subpage = "";
                var windowLocation = window.location;
                if (windowLocation.hash.length > 1)
                    hash = windowLocation.hash.substring(1);
                if (windowLocation.pathname == '/') {
                    pageKind = "giveaways";
                }
                else {
                    var split = windowLocation.pathname.split("/").filter(function (a, b, c) {
                        return Boolean(a);
                    });
                    pageKind = split[0] || '';
                    description = split[2] || '';
                    if (split[0] == 'giveaway' || split[0] == 'trade' || split[0] == 'discussion') {
                        subpage = (split[3] == 'search' ? '' : split[3]) || '';
                        code = split[1] || '';
                    }
                    else {
                        subpage = split[1] || '';
                    }
                }
                var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function (s) {
                    return decodeURIComponent(s.replace(pl, " "));
                }, query = windowLocation.search.substring(1);
                var urlParams = {};
                while (match = search.exec(query)) {
                    urlParams[decode(match[1])] = decode(match[2]);
                }
                _this._sgLocation = {
                    pageKind: pageKind,
                    code: code,
                    description: description,
                    subpage: subpage,
                    hash: hash,
                    parameters: urlParams
                };
            };
            this.init = function () {
                _this.resolvePath();
            };
            this.init();
        }
        Object.defineProperty(Core.prototype, "location", {
            get: function () {
                return this._sgLocation;
            },
            enumerable: true,
            configurable: true
        });
        Core.prototype.render = function () {
        };
        Core.prototype.name = function () {
            return "Core";
        };
        Core.prototype.shouldRun = function (location) {
            return true;
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
            this.style = "";
            this.shouldRun = function (location) { return true; };
        }
        FixedNavbar.prototype.init = function () {
            var style = ".body {margin-top: 39px}" + ".header {position: fixed; top: 0; width: 100%; z-index: 100}";
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        };
        FixedNavbar.prototype.render = function () {
            $('body').addClass('body');
            $('header').addClass('header');
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
            this.style = "";
            this.shouldRun = function (location) { return true; };
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
            this.style = "";
            this.shouldRun = function (location) { return false; };
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
        return Math.min(res, 100).toFixed(2);
    }
    var GridView = (function () {
        function GridView() {
            this.style = "";
            this.shouldRun = function (location) { return location.pageKind == 'giveaways'; };
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
            this.style = "";
            this.shouldRun = function (location) { return location.pageKind == 'giveaway' && location.subpage == ''; };
        }
        CommentAndEnter.prototype.init = function () {
        };
        CommentAndEnter.prototype.render = function () {
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
var ModuleDefinition;
(function (ModuleDefinition) {
    var Settings = (function () {
        function Settings() {
            var _this = this;
            this.style = "";
            this.settingsNavIcon = $('<a class="nav__row sgpp_settings" href= "#">\n' + '<i class="icon-red fa fa-fw fa-bars"> </i>\n' + '<div class="nav__row__summary">\n' + '<p class="nav__row__summary__name" > SG++ Settings</p>\n' + '<p class="nav__row__summary__description"> Steamgifts++ settings.</p>\n' + '</div>\n' + '</a>\n');
            this.init = function () {
            };
            this.render = function () {
                $(".nav__absolute-dropdown a[href='/?logout']").before(_this.settingsNavIcon);
                $(".sgpp_settings").on("click", _this.handleSettingClick);
            };
            this.handleSettingClick = function () {
            };
            this.shouldRun = function (location) { return true; };
        }
        Settings.prototype.name = function () {
            return "Settings";
        };
        return Settings;
    })();
    ModuleDefinition.Settings = Settings;
})(ModuleDefinition || (ModuleDefinition = {}));
var ModuleDefinition;
(function (ModuleDefinition) {
    var EntryCommenters = (function () {
        function EntryCommenters() {
            var _this = this;
            this.url = 'http://www.steamgifts.com/giveaway/';
            this.cacheCompleted = false;
            this.isLoading = false;
            this.commenters = {};
            this.pageStart = 1337;
            this.elements = {
                button: $(document.createElement('i')).addClass('giveaway__icon fa fa-comments-o').attr('title', 'Check who commented'),
                loader: $(document.createElement('i')).addClass('giveaway__icon fa fa-refresh fa-spin').attr('title', 'loading comments').css('cursor', 'auto'),
                pos: $(document.createElement('span')).addClass('GAComm_pos fa-stack').attr('title', 'Commented').append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x')).append($(document.createElement('i')).addClass('fa fa-check fa-stack-1x')),
                neg: $(document.createElement('span')).addClass('GAComm_neg fa-stack').attr('title', 'Did not comment').append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x')).append($(document.createElement('i')).addClass('fa fa-times fa-stack-1x')),
            };
            this.style = (".GAComm_pos, .GAComm_neg {margin-left:-3px; vertical-align: inherit}\n" + ".GAComm_pos > i.fa.fa-check {color: #719A47}\n" + ".GAComm_neg > i.fa.fa-times {color: rgba(166, 93, 92, 0.85)}\n" + ".GAComm_pos > i.fa.fa-check, .GAComm_neg > i.fa.fa-times {font-size: 0.7em}\n");
            this.render = function () {
                _this.elements.button.click(_this.main);
                $('.page__heading__breadcrumbs').append(_this.elements.button);
                $('.page__heading__breadcrumbs').append(_this.elements.loader.hide());
            };
            this.main = function () {
                if (!_this.cacheCompleted) {
                    if (!_this.isLoading) {
                        _this.elements.button.hide();
                        _this.elements.loader.show();
                        _this.isLoading = true;
                        _this.getCommenters();
                    }
                    setTimeout(_this.main, 1000);
                    return;
                }
                _this.elements.loader.hide();
                _this.elements.button.show();
                $('.table__rows .table__column--width-fill').each(function (i, el) {
                    $('.GAComm_pos, .GAComm_neg', el).remove();
                    var wrapper = $('p.table__column__heading', el);
                    if (wrapper.length > 0)
                        el = wrapper[0];
                    if (_this.commenters[el.textContent.trim()]) {
                        _this.elements.pos.clone().appendTo(el);
                    }
                    else {
                        _this.elements.neg.clone().appendTo(el);
                    }
                });
            };
            this.getCommenters = function () {
                _this.url += SGPP.location.code + '/' + SGPP.location.description + '/search?page=';
                _this.page = _this.pageStart;
                _this.getCommentPage();
            };
            this.getCommentPage = function () {
                $.ajax({
                    type: 'GET',
                    url: _this.url + _this.page,
                    success: _this.handleCommentPage
                });
            };
            this.handleCommentPage = function (html) {
                var $html = $(html);
                $('.comment__username', $html).each(function (i, el) {
                    _this.commenters[el.textContent.trim()] = true;
                });
                if (_this.page == _this.pageStart) {
                    var pagination = $('a[data-page-number]', $html);
                    _this.page = pagination.length != 0 ? pagination.last().data().pageNumber : 1;
                }
                if (--_this.page > 0)
                    _this.getCommentPage();
                else
                    _this.cacheCompleted = true;
            };
        }
        EntryCommenters.prototype.init = function () {
        };
        EntryCommenters.prototype.name = function () {
            return "EntryCommenters";
        };
        EntryCommenters.prototype.shouldRun = function (loc) {
            return loc.pageKind == 'giveaway' && (loc.subpage == 'entries' || loc.subpage == 'winners');
        };
        return EntryCommenters;
    })();
    ModuleDefinition.EntryCommenters = EntryCommenters;
})(ModuleDefinition || (ModuleDefinition = {}));
var SGPP = new ModuleDefinition.Core();
(function ($) {
    var modules = {};
    var modulesNames = new Array("FixedNavbar", "ScrollingSidebar", "LivePreview", "CommentAndEnter", "GridView", "EntryCommenters");
    for (var pos in modulesNames) {
        var m = new ModuleDefinition[modulesNames[pos]]();
        if (m.shouldRun(SGPP.location)) {
            modules[m.name()] = m;
            SGPP.log("Module " + m.name() + " init() call.");
            modules[m.name()].init();
        }
    }
    $(document).ready(function () {
        for (var module in modules) {
            SGPP.log("Module " + module + " render() call.");
            modules[module].render();
        }
    });
})(jQuery);
