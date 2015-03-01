/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class PopupGiveaway implements SteamGiftsModule {

        style = "";

        private popupGiveaway = $('<div>', {
            'class': 'SGPP__popup_giveaway is-hidden',
            'style': 'text-align: justify; width: 90%; max-width: 1000px; min-height: 550px;'
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
            $('a[href^="/giveaway/"]:not([href$="/entries"],[href$="/comments"])', dom).on("click",(e) => {
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
                        done( (page) => {

                            var featured = $('.featured__outer-wrap', page);

                            var pageOuterWrap = $('<div>', { 'class': 'page__outer-wrap', style: 'padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right:20px;' });

                            var enterButton = $('.sidebar form', page);

                            if (!enterButton.length)
                                enterButton = $('.sidebar__error', page);

                            var commentArea = $('.comment--submit .comment__parent', page).css('margin-top', '10px');
                            commentArea.find('.global__image-outer-wrap--avatar-small').css('margin-right', '5px');
                            commentArea.find('span').addClass('b-close');

                            var commentButton = $('.js__submit-form', commentArea);

                            pageOuterWrap.append(
                                enterButton,
                                this.headingHelper("Description"),
                                $('.page__description', page),
                                $(this.headingHelper("Reply")).css('margin-top', '10px'),
                                commentArea
                                );

                            this.popupGiveaway.append(featured, pageOuterWrap);

                            $(".sidebar__entry-insert, .sidebar__entry-delete", pageOuterWrap).on("click", (e) => {
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
                follow: [false, false]
            });
        }

        name(): string {
            return "Popup Giveaway";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways';
    }

}