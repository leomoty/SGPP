/// <reference path="../../ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollGiveawayComments extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'giveaway' && SGPP.location.subpage == '';
        }

        init(): void {

        }

        render(): void {
            if (true) { // TODO Add setting for this
                var addReply = $('.comment--submit').first();

                var elCommentHeader = $('<div id="esc_reply_header" class="page__heading"><div class="page__heading__breadcrumbs">Reply</div></div>');

                $('.comments').prev().before(elCommentHeader);

                $('#esc_reply_header').after(addReply);

                // Move back to correct location after clicking cancel
                $('.js__comment-reply-cancel').on('click', function () {
                    setTimeout(function () {
                        addReply.insertAfter('#esc_reply_header');
                    }, 10);
                });
            }

            this.preparePage();
        }

        createPageContainerElement(): JQuery {
            return $('<div class="comments">');
        }

        get reverseItems(): boolean {
            return SGPP.settings.getSettingForModule("EndlessScrollGiveawayComments", "reversedGiveawayComments") || false;
        }

        getItemsElement(dom): JQuery {
            return $(dom).find('.comments').first();
        }

        getItems(dom: JQuery): JQuery {
            return dom.children('.comment');
        }

        name(): string {
            return "Endless Scroll on Giveaway comments";
        }

    }
}