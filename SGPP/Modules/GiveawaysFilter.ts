/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class HideEnteredFilter implements GiveawayFilter {

        id = "HideEntered";

        private element;

        private settings = {
            hideEntered: false,
        };

        public renderControl(el: Element): void {
            var $el = $(el);

            this.element = $('<span><span class="fa fa-square-o"></span> <span class="filter-name">Hide Entered</span></span>');

            this.element.click(() => {
                this.settings.hideEntered = !this.settings.hideEntered;
                this.updateElement();
                $(this).trigger('filterChanged', [this.settings]);
            });

            this.updateElement();
            $el.append(this.element);
        }

        private updateElement(): void {
            if (this.element)
                this.element.find('span.fa').toggleClass('fa-square-o', !this.settings.hideEntered).toggleClass('fa-check-square', this.settings.hideEntered);
        }

        public shouldHide(el: Element): boolean {
            var $el = $(el);

            return this.settings.hideEntered && $el.children('.giveaway__row-inner-wrap').hasClass('is-faded');
        }

        public setState(state): void {
            this.settings = state;
            this.updateElement();
        }
    }

    export class GiveawaysFilter implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters { color: #4B72D4; font-size: 11px; padding-bottom: 15px; }\n" +
        "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 2px; padding-left: 10px; }\n" + 
        "#sidebar_sgpp_filters .filter-name { font-weight: bold; } " +
       ".giveaway-filtered { display:none; }";

        private filters: { [s: string]: ModuleDefinition.GiveawayFilter; } = {};

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaways';
        }

        init(): void {
            this.addFilter(new HideEnteredFilter());
        }

        addFilter(filter: GiveawayFilter): void {
            this.filters[filter.id] = filter;

            $(filter).on('filterChanged',(event, state) => {
                this.filterGames();

                SGPP.storage.setItem("giveaway_filter_" + filter.id, state);
            });

            if (SGPP.storage.containsItem("giveaway_filter_" + filter.id)) {
                filter.setState(SGPP.storage.getItem("giveaway_filter_" + filter.id));
            }
        }

        render(): void {
            $('.sidebar__search-container').after('<div id="sidebar_sgpp_filters"></div>');

            var sidebar = $('#sidebar_sgpp_filters');

            sidebar.append('<h3 class="sidebar__heading">Filter Giveaways</h3>');

            $.each(this.filters,(index, filter) => {
                var el = document.createElement('div');
                var $el = $(el);

                $el.addClass('filter_row');

                filter.renderControl(el);

                sidebar.append(el);
            });

            SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                this.filterGame(el);
            });

            this.filterGames();
        }

        filterGames(): void {
            $('.giveaway__row-outer-wrap').each((i, el) => {
                this.filterGame(el);
            });

            var totalPinned = $('.pinned-giveaways__outer-wrap .giveaway__row-outer-wrap').length;
            var hiddenPinned = $('.pinned-giveaways__outer-wrap .giveaway__row-outer-wrap.giveaway-filtered').length;

            if (totalPinned == hiddenPinned) {
                $('.pinned-giveaways__outer-wrap').hide();
            } else {
                $('.pinned-giveaways__outer-wrap').show();
            }
        }

        filterGame(el: Element): void {
            var hide = false;
            var $el = $(el);

            for (var id in this.filters) {
                var filter: ModuleDefinition.GiveawayFilter = this.filters[id];

                if (filter.shouldHide(el))
                    hide = true;
            }

            $el.toggleClass('giveaway-filtered', hide);
        }

        name(): string {
            return "Giveaways Filter";
        }

    }
}