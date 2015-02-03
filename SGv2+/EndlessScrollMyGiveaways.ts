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

        createPageContainerElement(): JQuery {
            return $('<div class="table__rows">');
        }

        getItemsElement(dom): JQuery {
            return $(dom).find('.table__rows').first();
        }

        parsePage(dom, pageContainer: JQuery): void {

            $(dom).find('.table__rows').find('.table__row-outer-wrap').each(function (i, el) {
                pageContainer.append(el);
            });

            //super.parsePage(dom, pageContainer);
        }

        name(): string {
            return "EndlessScrollMyGiveaways";
        }

    }
} 