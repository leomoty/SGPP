/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export interface GiveawaysFilter {
    }

    export class GiveawaysFilterBase implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 5px; }";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
        }

        addFilter(filter: GiveawaysFilter): void {
        }

        render(): void {
            this.filterGames();

            $('.sidebar__search-container').after('<div id="sidebar_sgpp_filters"></div>');

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