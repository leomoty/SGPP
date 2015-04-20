/// <reference path="../ModuleDefinition.ts" /> 
/// <reference path="GiveawaysFilter.ts" />

module ModuleDefinition {

    export class HideEnteredFilter implements GiveawaysFilter {

        id = "HideEntered";

        private element;

        private settings = {
            hideEntered: false,
        };

        public renderControl(el: Element): void {
            var $el = $(el);

            this.element = $('<div class="filter_row"><span class="fa fa-square-o"></span> Hide Entered</div>');
            this.element.click(() => {
                this.settings.hideEntered = !this.settings.hideEntered;
                this.updateElement();
                $(this).trigger('filterChanged');
            });

            $el.append(this.element);
        }

        private updateElement() {
            this.element.find('span').toggleClass('fa-square-o', !this.settings.hideEntered).toggleClass('fa-check-square', this.settings.hideEntered);
        }

        public shouldHide(el: Element) {
            var $el = $(el);

            return this.settings.hideEntered && $el.children('.giveaway__row-inner-wrap').hasClass('is-faded');
        }
    }

    export class GiveawaysFilterExample implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
            SGPP.addGiveawayFilter(new HideEnteredFilter());
        }

        render(): void {
        }

        name(): string {
            return "Giveaways Filter";
        }

    }
}