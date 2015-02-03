/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussion extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            return SGV2P.location.pageKind == 'discussions' || SGV2P.location.pageKind == 'trades';
        }

        init(): void {
        }

        render(): void {
            if (this.canHandle()) {
                this.preparePage();
            }
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

        beforeAddItems(dom): void {
            window["EndlessScrollMarkComments"].markTopics(dom);
        }

        name(): string {
            return "EndlessScrollDiscussion";
        }

    }
} 