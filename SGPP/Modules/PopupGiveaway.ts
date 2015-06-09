/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class PopupGiveaway implements SteamGiftsModule {

        style = ".SGPP__popup_giveaway { text-align: justify; width: 90%; max-width: 1000px }\n" +
        ".SGPP__popup_giveaway .page__outer-wrap { padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right:20px }\n" +
        ".SGPP__popup_giveaway .comment__parent { margin-top: 10px }\n" +
        ".SGPP__popup_giveaway .global__image-outer-wrap--avatar-small { margin-right: 5px }\n" +
        ".SGPP__popup_giveaway .page__description { max-height: 200px; overflow-y: auto }\n" +
        ".SGPP__popup_giveaway .markdown li { position:relative }\n" +
        ".SGPP__popup_giveaway .featured__outer-wrap form > * { background-color: #f0f2f5 }\n" +
        ".SGPP__popup_giveaway .featured__outer-wrap form { margin-top: 5px; }\n";

        private popupGiveaway = $('<div>', {
            'class': 'SGPP__popup_giveaway is-hidden',
        });

        init(): void {
            this.popupGiveaway.appendTo('body'); 
        }

        render(): void {
            this.handlePopupCreate($(document));

            SGPP.on(["EndlessScrollGiveaways", "EndlessScrollLists"], "afterAddItems",(event: JQueryEventObject, pageContainer: JQuery, page: number, isReload: boolean) => {
                this.handlePopupCreate(pageContainer);
            }); 
        }

        private handlePopupCreate = (dom) => {
            $('a[href^="/giveaway/"]:not([href$="/entries"],[href$="/comments"],[href$="/winners"])', dom).on("click",(e) => {
                e.preventDefault();
                this.handlePopup($(e.currentTarget));
            });
        }

        private headingHelper = (desc) => { return '<div class="page__heading"><div class="page__heading__breadcrumbs">' + desc + '</div></div>' };
        
        private handlePopup = (self) => {
            
            this.popupGiveaway.bPopup({
                onOpen: () => {
                    this.popupGiveaway.removeClass('is-hidden');
                    $.ajax({ url: self.attr('href') }).
                    done((page) => {

                        var featured = $('.featured__outer-wrap', page);

                        $('.featured__column--whitelist, .featured__column--group', featured).each(function () { this.childNodes[1].nodeValue = '' });

                        var pageOuterWrap = $('<div>', { 'class': 'page__outer-wrap' });

                        var enterButton = $('.sidebar form', page);

                        if (!enterButton.length)
                            enterButton = $('.sidebar__error', page);

                        var pageDescription = $('.page__description', page);

                        var commentArea = $('.comment--submit .comment__parent', page);
                        commentArea.find('span').addClass('b-close');

                        var commentButton = $('.js__submit-form', commentArea);

                        featured.find('.featured__summary').append(enterButton);

                        if (pageDescription.length) {
                            pageOuterWrap.append(
                                this.headingHelper("Description"),
                                pageDescription
                            );
                        }

                        pageOuterWrap.append(
                            this.headingHelper("Reply"),
                            commentArea
                        );

                        this.popupGiveaway.append(featured, pageOuterWrap);

                        this.popupGiveaway.css({
                            'top': Math.max(0,(($(window).height() - (/* featured height*/208 + pageOuterWrap.outerHeight())) / 2) + $(window).scrollTop()) + "px"
                        });

                        $(".sidebar__entry-insert, .sidebar__entry-delete", featured).on("click", (e) => {
                            var t = $(e.currentTarget);
                            t.addClass("is-hidden"),
                            t.closest("form").find(".sidebar__entry-loading").removeClass("is-hidden"),
                            t.closest("form").find("input[name=do]").val(t.attr("data-do")),
                            $.ajax({
                                url: '/ajax.php', type: "POST",
                                dataType: "json",
                                data: t.closest("form").serialize(),
                                success: function (e) {
                                    t.closest("form").find(".sidebar__entry-loading").addClass("is-hidden");

                                    if (e.type === "success") {
                                        if (t.hasClass("sidebar__entry-insert")) {
                                            t.closest("form").find(".sidebar__entry-delete").removeClass("is-hidden");
                                            self.closest('.giveaway__row-inner-wrap, .SGPP__gridTile').addClass('is-faded');
                                        } else if (t.hasClass("sidebar__entry-delete")) {
                                            t.closest("form").find(".sidebar__entry-insert").removeClass("is-hidden");
                                            self.closest('.giveaway__row-inner-wrap, .SGPP__gridTile').removeClass('is-faded');
                                        }
                                    } else if (e.type === "error") {
                                        t.closest("form").html("undefined" != typeof e.link && e.link !== !1 ?
                                            '<a href="' + e.link + '" class="sidebar__error"><i class="fa fa-exclamation-circle"></i> ' + e.msg + "</a>"
                                            : '<div class="sidebar__error is-disabled"><i class="fa fa-exclamation-circle"></i> ' + e.msg + "</div>");
                                    }

                                    if ("undefined" != typeof e.entry_count && e.entry_count !== !1) {
                                        $(".live__entry-count").text(e.entry_count);
                                        $(".nav__points").text(e.points);
                                    }
                                }
                            });
                        });

                        commentButton.on("click", (e) => {
                            e.preventDefault();

                            var el = $(e.currentTarget);
                            $.ajax({
                                url: self.attr('href'),
                                type: 'POST',
                                dataType: "json",
                                data: el.closest("form").serialize(),
                                complete: (e) => {
                                    if (e.getResponseHeader('TM-finalURL')) {
                                        el.closest("form").find("textarea").val("");
                                        el.hide();
                                    }
                                }
                            })
                        });
                    });
                },
                onClose: () => {
                    this.popupGiveaway.addClass('is-hidden');
                    this.popupGiveaway.empty();
                },
                follow: [true, false]
            });
        }

        name(): string {
            return "Popup Giveaway";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways';
    }

}