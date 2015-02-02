/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollDiscussionReplies extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/discussion\//.test(location.pathname))
                return true;
            else if (/^\/trade\//.test(location.pathname))
                return true;

            return false;
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

        addLoadingElement(): void {
            $($('.comments')[1]).append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $($('.comments')[1]).find('.loading_es').remove();
        }

        parsePage(dom): void {

            window["EndlessScrollMarkComments"].markComments(dom, this.currentPage, true);

            var comments_div = $('.comments')[1];

            $(comments_div).append(this.createPageElement(this.currentPage));

            $(comments_div).append($($(dom).find('.comments')[1]).html());

            

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollDiscussionReplies";
        }

    }
} 