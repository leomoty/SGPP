/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class MessagesFilterTest implements SteamGiftsModule {

        style = ".message_filter_hidden { display: none; }\n" +
        ".message_filter_visible { }\n" +
        ".filterdrop { position: absolute; }\n" + 
        ".filterdrop a { display: block; }\n" + 
        ".message-filters { margin-left: 5px; }\n" +
        ".message-filter { cursor: pointer; }\n" + 
        ".message-filter i { margin: 0; }";

        private _filterElement: JQuery;

        shouldRun(): boolean {
            return (SGPP.location.pageKind == 'discussion' || SGPP.location.pageKind == 'trade');
        }

        private _hideRead = false;

        get hideRead(): boolean {
            return this._hideRead;
        }

        set hideRead(v: boolean) {
            this._hideRead = v;

            this._filterElement.find('.hideread i').toggleClass('fa-square-o', !v).toggleClass('fa-check-square-o', v);

            this.filterAll();
        }

        init(): void {
        }

        filterItem(el: Element): void {
            var $el = $(el);

            var visible = true;

            var is_new = !$el.hasClass('endless_not_new');
            var has_new_children = !$el.hasClass('endless_no_new_children');

            if (this.hideRead) {
                visible = visible && (is_new || has_new_children);
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
            SGPP.on("EndlessScrollDiscussionReplies", 'addItem', (event: JQueryEventObject, el: Element) => {
                this.filterItem(el);
            });

            var m = this;

            this._filterElement = $('<span class="message-filters"></span>');

            this._filterElement.append('<span class="message-filter hideread"><i class="fa fa-square-o"></i> Hide Read</span>').click(() => {
                m.hideRead = !m.hideRead;
            });

            $('.comments:eq(1)').prev().find('div').append(this._filterElement);

            this.filterAll();
        }

        name(): string {
            return "Hide Read Comments";
        }

    }
}