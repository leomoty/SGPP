﻿/// <reference path="../../ModuleDefinition.ts" /> 
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

        afterAddItems(pageContainer: JQuery): void {
            // Fix hide popups
            pageContainer.find(".giveaway__hide").click(function () {
                $(".popup--hide-games input[name=game_id]").val($(this).attr("data-game-id"));
                $(".popup--hide-games .popup__heading__bold").text($(this).closest("h2").find(".giveaway__heading__name").text())
            });
            pageContainer.find(".trigger-popup").click(function () {
                var a: any = $("." + $(this).attr("data-popup"));

                a.bPopup({
                    opacity: .85,
                    fadeSpeed: 200,
                    followSpeed: 500,
                    modalColor: "#3c424d"
                });
            });
        }

        name(): string {
            return "EndlessScrollGiveaways";
        }

    }
}