/// <reference path="moduledefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    export class EndlessScrollGiveawayComments extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        canHandle(): boolean {
            if (/^\/giveaway\//.test(location.pathname))
                return true;

            return false;
        }

        init(): void {
            
        }

        render(): void {
            if (this.canHandle()) {

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
        }

        addLoadingElement(): void {
            $($('.comments')[0]).append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $($('.comments')[0]).find('.loading_es').remove();
        }

        parsePage(dom): void {

            $($('.comments')[0]).append($($(dom).find('.comments')[0]).html());

            super.parsePage(dom);
        }

        name(): string {
            return "EndlessScrollGiveawayComments";
        }

    }
} 