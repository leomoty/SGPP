/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollGiveawayComments extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/giveaway\//.test(location.pathname))
                return true;

            return false;
        }

        init(): void {
            
        }

        render(): void {
            super.render();
        }

        addLoadingElement(): void {
            $($('.comments')[0]).append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $($('.comments')[0]).find('.loading_es').remove();
        }

        parsePage(dom): void {

            $($('.comments')[0]).append($($(dom).find('.comments')[0]).html());

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollGiveawayComments";
        }

    }
} 