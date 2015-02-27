/// <reference path="../../ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussion extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'discussions' || SGPP.location.pageKind == 'trades';
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

        getItems(dom: JQuery): JQuery {
            return dom.children('.table__row-outer-wrap');
        }

        name(): string {
            return "Endless Scroll on Discussions page";
        }

    }
}