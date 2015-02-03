/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussionReplies extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            return SGV2P.location.pageKind == 'discussion' || SGV2P.location.pageKind == 'trade';
        }

        init(): void {
        }

        render(): void {
            if (this.canHandle()) {

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

        beforeAddItems(dom): void {
            window["EndlessScrollMarkComments"].markComments(dom, this.currentPage, true);
        }

        name(): string {
            return "EndlessScrollDiscussionReplies";
        }

    }
} 