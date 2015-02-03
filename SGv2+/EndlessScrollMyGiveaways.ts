/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollMyGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (SGV2P.location.pageKind == 'giveaways') {
                return SGV2P.location.subpage == 'entered' || SGV2P.location.subpage == 'created' || SGV2P.location.subpage == 'won';
            }
            else if (SGV2P.location.pageKind == 'giveaway') {
                return SGV2P.location.subpage == 'entries' || SGV2P.location.subpage == 'winners' || SGV2P.location.subpage == 'groups';
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

        addLoadingElement(): void {
            $('.pagination').prev().append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $('.pagination').prev().find('.loading_es').remove();
        }

        parsePage(dom): void {

            var tablediv = $('.table__rows').first();

            tablediv.append(this.createPageElement(this.currentPage));

            $(dom).find('.table__rows').find('.table__row-outer-wrap').each(function (i, el) {
                    tablediv.append(el);
            });

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollMyGiveaways";
        }

    }
} 