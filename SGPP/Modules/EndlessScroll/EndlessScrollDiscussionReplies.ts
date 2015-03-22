/// <reference path="../../ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussionReplies extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {
            return SGPP.location.pageKind == 'discussion' || SGPP.location.pageKind == 'trade';
        }

        init(): void {
        }

        render(): void {
            if (true) { // TODO Add setting for this
                var addReply = $('.comment--submit').first();

                // No reply form on closed topics
                if (addReply.length == 1) {

                    var elCommentHeader = $('<div id="esc_reply_header" class="page__heading"><div class="page__heading__breadcrumbs">Reply</div></div>');

                    if ($('.poll').length == 0)
                        $('.comments').first().after(elCommentHeader);
                    else
                        $('.poll').first().after(elCommentHeader);

                    $('#esc_reply_header').after(addReply);

                    // Move back to correct location after clicking cancel
                    $('.js__comment-reply-cancel').on('click', function () {
                        setTimeout(function () {
                            addReply.insertAfter('#esc_reply_header');
                        }, 10);
                    });
                }
            }

            this.preparePage();
        }

        get BaseUrl(): string {
            return '/' + SGPP.location.pageKind + '/' + SGPP.location.code + '/' + SGPP.location.description;
        }

        get reverseItems(): boolean {
            return SGPP.settings.getSettingForModule("EndlessScrollDiscussionReplies", "reversedDiscussionReplies") || false;
        }

        createPageContainerElement(): JQuery {
            return $('<div class="comments">');
        }

        getItemsElement(dom): JQuery {
            return $(dom).find('.comments:eq(1)');
        }

        getItems(dom: JQuery): JQuery {
            return dom.children('.comment');
        }

        name(): string {
            return "Endless Scroll on Discussion comments";
        }

    }
}