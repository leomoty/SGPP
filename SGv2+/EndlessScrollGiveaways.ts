/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/giveaway\/.*\/entries/.test(location.pathname))
                return false;
            else if (/^\/giveaway\/.*\/winners$/.test(location.pathname))
                return false;
            else if (/\/$/.test(location.pathname) || /^\/giveaways/.test(location.pathname))
                return true;

            return false;
        }

        init(): void {
            
        }

        render(): void {
            super.render();
        }

        addLoadingElement(): void {
            $('div.page__heading:nth-child(2)').append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $('div.page__heading:nth-child(2)').find('.loading_es').remove();
        }

        parsePage(dom): void {

            var giveaways_div = $('div.page__heading:nth-child(2)').next();

            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p>Page ' + this.currentPage + ' of ' + this.lastPage + '</p></div></div>');

            this.addStop($(el).find('p'));

            $(giveaways_div).append(el);

            $(dom).find('div.page__heading:nth-child(2)').next().find('.giveaway__row-outer-wrap').each(
                function (i, el) {
                    $(giveaways_div).append(el);
                });


            var new_nav = $(dom).find('.pagination__navigation').first();
            $('.pagination__navigation').first().html(new_nav.html());

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