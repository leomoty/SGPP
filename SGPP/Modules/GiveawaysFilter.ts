/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export interface GiveawaysFilter {
        renderControl(element: Element): void;
    }

    export class GiveawaysFilterBase implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 5px; }";

        private filters: Array<GiveawaysFilter> = new Array<GiveawaysFilter>();

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
        }

        addFilter(filter: GiveawaysFilter): void {
            this.filters.push(filter);
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

            /*var link = $el.find('a.giveaway__icon').attr('href');

            var linkInfo = this.parseAppLink(link);

            if (this.hideOwned && this.owns(link))
                hide = true;

            if (this.hideIgnored && this.ignores(link))
                hide = true;

            if (this.hideEntered && $el.children('.giveaway__row-inner-wrap').hasClass('is-faded'))
                hide = true;

            if (!hide) {
                $el.show();
            } else {
                $el.hide();
            }*/
        }

        name(): string {
            return "Giveaways Filter";
        }

    }
}