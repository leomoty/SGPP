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

        addLoadingElement(): void {
            $('.table__rows').first().append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $('.table__rows').first().find('.loading_es').remove();
        }

        parsePage(dom): void {
            
            var tablediv = $('.table__rows').first();

            tablediv.append(this.createPageElement(this.currentPage));

            $(dom).find('.table__rows').first().find('.table__row-outer-wrap').each(function (i, el) {
                tablediv.append(el);
            });

            window["EndlessScrollMarkComments"].markTopics(dom);

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollDiscussion";
        }

    }
} 