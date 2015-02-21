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

        beforeAddItems(dom, page: number, isReload: boolean): void {
            if ("MarkComments" in SGPP.modules) {
                var MarkComments:any = SGPP.modules["MarkComments"];
                MarkComments.markTopics(dom);
            }
        }

        name(): string {
            return "EndlessScrollDiscussion";
        }

    }
}