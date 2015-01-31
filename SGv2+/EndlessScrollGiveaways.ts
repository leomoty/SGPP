/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/giveaways\/entered/.test(location.pathname))
                return false;
            else if (/^\/giveaways\/created/.test(location.pathname))
                return false;
            else if (/^\/giveaways\/won/.test(location.pathname))
                return false;
            if (/\/$/.test(location.pathname) || /^\/giveaways/.test(location.pathname))
                return true;

            return false;
        }

        init(): void {
            
        }

        render(): void {
            if (this.canHandle())
            {
                var m = this;

                $(window).scroll(function (event) {
                    var scrollPos = $(window).scrollTop() + $(window).height();

                    if (scrollPos > $('div.pagination').next().position().top + 400) {
                        //m.stopped = true;
                    }
                });

                this.preparePage();
            }
        }

        addLoadingElement(): void {
            $('.pagination').prev().append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $('.pagination').prev().find('.loading_es').remove();
        }

        parsePage(dom): void {

            var giveaways_div = $('.pagination').prev();

            $(giveaways_div).append(this.createPageElement(this.currentPage));

            $(dom).find('.pagination').prev().find('.giveaway__row-outer-wrap').each(function (i, el) {
                    $(giveaways_div).append(el);
            });

            // Fix hide popups
            $(".giveaway__hide").click(function () {
                $(".popup--hide-games input[name=game_id]").val($(this).attr("data-game-id"));
                $(".popup--hide-games .popup__heading__bold").text($(this).closest("h2").find(".giveaway__heading__name").text())
            });
            $(".trigger-popup").click(function () {
                var a:any = $("." + $(this).attr("data-popup"));

                a.bPopup({
                    opacity: .85,
                    fadeSpeed: 200,
                    followSpeed: 500,
                    modalColor: "#3c424d"
                });
            });

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollGiveaways";
        }

    }
} 