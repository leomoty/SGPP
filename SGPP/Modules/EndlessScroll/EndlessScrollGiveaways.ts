/// <reference path="../../ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        private _location: string = 'frontpage';

        style = "";

        shouldRun(): boolean {
            if (SGPP.location.pageKind == 'giveaways') {
                return !(SGPP.location.subpage == 'entered' || SGPP.location.subpage == 'created' || SGPP.location.subpage == 'won');
            } else if (/^\/user\/[^\/]+(\/giveaways\/won([^\/]+)?)?$/.test(location.pathname)) {
                this._location = 'profile';
                return true;
            }
            return false;
        }

        init(): void {
        }

        render(): void {
            this.preparePage();

            $(this).on('afterAddItems',(event: JQueryEventObject, pageContainer: JQuery, page: number, isReload: boolean) => {
                // Fix hide popups
                pageContainer.find(".giveaway__hide").click(function () {
                    $(".popup--hide-games input[name=game_id]").val($(this).attr("data-game-id"));
                    $(".popup--hide-games .popup__heading__bold").text($(this).closest("h2").find(".giveaway__heading__name").text())
                });
                pageContainer.find(".trigger-popup").click(function () {
                    $("." + $(this).attr("data-popup")).bPopup({
                        opacity: .85,
                        fadeSpeed: 200,
                        followSpeed: 500,
                        modalColor: "#3c424d"
                    });
                });
            });

            $('.popup--hide-games .js__submit-form').after('<div class="form__submit-button ajax_submit-form"><i class="fa fa-check-circle"></i> Yes</div>');
            $('.popup--hide-games .js__submit-form').hide();

            $('.popup--hide-games .ajax_submit-form').click((event) => {

                var form = $('.popup--hide-games form').first();

                $.post('/', form.serialize(),(data) => {

                    $('.popup--hide-games').bPopup().close();

                    this.hideGiveawaysByGameID($(".popup--hide-games input[name=game_id]").val());
                });

                return false;
            });
        }

        hideGiveawaysByGameID(game: number): void {
            $('.giveaway__row-outer-wrap').each(function (i: number, e: Element) {
                var $e = $(e);

                if ($e.find('.giveaway__hide').data('game-id') == game) {
                    $e.hide();
                }
            });
        }

        createPageContainerElement(): JQuery {
            return $('<div>');
        }

        getItemsElement(dom): JQuery {
            return $(dom).find('.pagination').prev();
        }

        getItems(dom: JQuery): JQuery {
            return dom.children('.giveaway__row-outer-wrap');
        }

        name(): string {
            return "Endless Scroll on Giveaways";
        }

    }
}