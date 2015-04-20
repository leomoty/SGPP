/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class GiveawaysFilterBase implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 5px; }";

        private filters: { [s: string]: ModuleDefinition.GiveawaysFilter; } = {};

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
        }

        addFilter(filter: GiveawaysFilter): void {
            this.filters[filter.id] = filter;

            $(filter).on('filterChanged',() => {
                this.filterGames();
            });
        }

        render(): void {
            this.filterGames();

            $('.sidebar__search-container').after('<div id="sidebar_sgpp_filters"></div>');

            var sidebar = $('#sidebar_sgpp_filters');

            $.each(this.filters,(index, filter) => {
                var el = document.createElement('div');

                filter.renderControl(el);

                sidebar.append(el);
            });

            SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                this.filterGame(el);
            });
        }

        filterGames(): void {
            $('.giveaway__row-outer-wrap').each((i, el) => {
                this.filterGame(el);
            });
        }

        filterGame(el: Element): void {
            var hide = false;
            var $el = $(el);

            for (var id in this.filters) {
                var filter: ModuleDefinition.GiveawaysFilter = this.filters[id];

                if (filter.shouldHide(el))
                    hide = true;
            }

            if (hide) {
                $el.hide();
            } else {
                $el.show();
            }
        }

        name(): string {
            return "Giveaways Filter";
        }

    }
}