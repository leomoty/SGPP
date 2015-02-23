/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class MessagesFilterTest implements SteamGiftsModule {

        style = ".message_filter_hidden { display: none; } .message_filter_visible { } .filterdrop { position: absolute; } .filterdrop a { display: block; }";

        private _filterElement: JQuery;

        shouldRun(): boolean {
            return (SGPP.location.pageKind == 'discussion' || SGPP.location.pageKind == 'trade');
        }

        private _displayMode = 'all';

        get displayMode(): string {
            return this._displayMode;
        }

        set displayMode(v: string) {
            this._displayMode = v;

            this.filterAll();
        }

        init(): void {
        }

        filterItem(el: Element): void {
            var $el = $(el);

            var visible = true;

            if (this.displayMode == 'new_only') {
                visible = !($el.hasClass('endless_no_new') || $el.hasClass('endless_no_new_children'));
            }

            $el.toggleClass('message_filter_hidden', !visible);
            $el.toggleClass('message_filter_visible', visible);
        }

        filterAll(): void {
            // TODO: Proper filtering
            $('.comment').each((i: number, el: Element) => {
                this.filterItem(el);
            });
        }

        render(): void {

            if ("EndlessScrollDiscussionReplies" in SGPP.modules) {
                $(SGPP.modules["EndlessScrollDiscussionReplies"]).on('addItem',(event: JQueryEventObject, el: Element) => {
                    this.filterItem(el);
                });
            }

            var m = this;

            this._filterElement = $('<div class="pull-right"><div class="btn">Filter messages <i class="fa fa-angle-down"></i></div><div class="filterdrop is-hidden"><div class="filter"><a href="#" data-filter="all">All</a></div><div class="filter"><a href="#" data-filter="new_only">New only</a></div></div></div>');

            this._filterElement.find('.btn').click(function () {
                $(this).parent().find('.filterdrop').toggleClass('is-hidden');
            });

            this._filterElement.find('.filter a').click(function () {
                m.displayMode = $(this).data('filter');

                return false;
            });

            $('.comments:eq(1)').prev().append(this._filterElement);

            this.filterAll();
        }

        name(): string {
            return "MessagesFilterTest";
        }

    }
}