/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        private _location: string = 'frontpage';

        canHandle(): boolean {
            if (SGV2P.location.pageKind == 'giveaways') {
                return !(SGV2P.location.subpage == 'entered' || SGV2P.location.subpage == 'created' || SGV2P.location.subpage == 'won');
            }
            else if (/^\/user\/[^\/]+(\/giveaways\/won([^\/]+)?)?$/.test(location.pathname)) {
                this._location = 'profile';
                return true;
            }
            return false;
        }

        init(): void {
            
        }

        render(): void {
            if (this.canHandle())
            {
                this.preparePage();
            }
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

        parsePage(dom, pageContainer): void {

            $(dom).find('.pagination').prev().find('.giveaway__row-outer-wrap').each(function (i, el) {
                pageContainer.append(el);
            });

            // Fix hide popups
            pageContainer.find(".giveaway__hide").click(function () {
                $(".popup--hide-games input[name=game_id]").val($(this).attr("data-game-id"));
                $(".popup--hide-games .popup__heading__bold").text($(this).closest("h2").find(".giveaway__heading__name").text())
            });
            pageContainer.find(".trigger-popup").click(function () {
                var a:any = $("." + $(this).attr("data-popup"));

                a.bPopup({
                    opacity: .85,
                    fadeSpeed: 200,
                    followSpeed: 500,
                    modalColor: "#3c424d"
                });
            });

            //super.parsePage(dom, pageContainer);
        }

        name(): string {
            return "EndlessScrollGiveaways";
        }

    }
} 