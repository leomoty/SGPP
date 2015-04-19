/// <reference path="../ModuleDefinition.ts" /> 
/// <reference path="GiveawaysFilter.ts" />

module ModuleDefinition {

    export class HideEnteredFilter implements GiveawaysFilter {
        public renderControl(el: Element): void {
            var $el = $(el);

            $el.append("<strong>Test</strong>");
        }
    }

    export class GiveawaysFilterExample implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 5px; }";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
            var GiveawaysFilter = <GiveawaysFilterBase> SGPP.modules["GiveawaysFilterBase"];
            
            GiveawaysFilter.addFilter(new HideEnteredFilter());
        }

        render(): void {
        }

        name(): string {
            return "Giveaways Filter";
        }

    }
}