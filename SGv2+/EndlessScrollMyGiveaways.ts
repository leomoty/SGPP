/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollMyGiveaways extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {
            if (SGPP.location.pageKind == 'giveaways') {
                return SGPP.location.subpage == 'entered' || SGPP.location.subpage == 'created' || SGPP.location.subpage == 'won';
            }
            else if (SGPP.location.pageKind == 'giveaway') {
                return SGPP.location.subpage == 'entries' || SGPP.location.subpage == 'winners' || SGPP.location.subpage == 'groups';
            }

            return false;
        }

        init(): void {
            
        }

        render(): void {
            this.preparePage();
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