/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussion extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/discussions/.test(location.pathname))
                return true;
            else if (/^\/trades/.test(location.pathname))
                return true;

            return false;
        }

        init(): void {
            console.log("Test");
        }

        render(): void {
            super.render();
        }

        addLoadingElement(): void {
            $('.table__rows').first().append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $('.table__rows').first().find('.loading_es').remove();
        }

        parsePage(dom): void {
            
            var tablediv = $('.table__rows').first();

            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p>Page ' + this.currentPage + ' of ' + this.lastPage + '</p></div></div>');

            this.addStop($(el).find('p'));

            $(tablediv).append(el);

            $(dom).find('.table__rows').first().find('.table__row-outer-wrap').each(function (i, el) {
                $(tablediv).append(el);
            });

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollDiscussion";
        }

    }
} 