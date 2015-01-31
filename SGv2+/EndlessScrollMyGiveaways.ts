/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollMyGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
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
        }

        init(): void {
            
        }

        render(): void {
            if (this.canHandle())
            {
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

            var tablediv = $('.table__rows');

            $(tablediv).append(this.createPageElement(this.currentPage));

            $(dom).find('.table__rows').find('.table__row-outer-wrap').each(function (i, el) {
                    $(tablediv).append(el);
            });

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollMyGiveaways";
        }

    }
} 