/// <reference path="ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 

module ModuleDefinition {

    class topicInfo {

        private localStorageKey: string;
        private _obj;

        get lastVisit(): number {
            return this._obj.lastVisit;
        }

        constructor(topicID: string) {
            this.localStorageKey = "endless_scroll_" + topicID;

            if (this.localStorageKey in localStorage) {
                this._obj = JSON.parse(localStorage[this.localStorageKey]);
            } else {
                this._obj = {
                    lastVisit: Date.now(),
                    lastCommentIDPages: {},
                };
                //this.save();
            }
        }

        public setLastVisit(): void {
            this._obj.lastVisit = Date.now();
            this.save();
        }

        public setLastCommentID(page: number, commentID: number): void {
            this._obj.lastCommentIDPages[page] = commentID;
            this.save();
        }

        public isNewComment(page: number, commentID: number): boolean {
            if (page in this._obj.lastCommentIDPages)
                return (commentID > this._obj.lastCommentIDPages[page]);
            else
                return true;
        }

        private save() {
            localStorage[this.localStorageKey] = JSON.stringify(this._obj);
        }
    }

    export class EndlessScrollDiscussionReplies extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        private topicInfo: topicInfo;

        canHandle(): boolean {
            if (/^\/discussion\//.test(location.pathname))
                return true;
            else if (/^\/trade\//.test(location.pathname))
                return true;

            return false;
        }

        getDiscussionId(): string {
            var match = /(discussion|trade)\/([^/]+)(\/|$)/.exec(location.pathname);

            if (!match)
                throw 'No Discussion ID';

            return match[1] + '_' + match[2];
        }

        init(): void {
            
            $('head').append("<style> \
			                    .endless_new .comment__parent .comment__summary, .endless_new > .comment__child {\
                                    background-color: rgba(180,180,222,0.1)\
                                } \
                                .endless_not_new .comment__parent .comment__summary,  .endless_not_new > .comment__child {\
                                } \
                                .endless_not_new:hover .comment__parent .comment__summary,  .endless_not_new:hover > .comment__child {\
                                } \
                            </style>");
        }

        getLatestCommentID(root): number {
            var id = 0;
            $(root).find('.comment[data-comment-id]').each(function (i, el) {
                var n = parseInt($(el).data('comment-id'));

                if (n > id)
                    id = n;
            });

            return id;
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

                this.topicInfo = new topicInfo(this.getDiscussionId());
                this.markNewComments(document);

                this.topicInfo.setLastVisit();

                this.topicInfo.setLastCommentID(this.currentPage, this.getLatestCommentID(document));
            }
        }

        markNewComments(root): void {
            var page = this.currentPage;

            $(root).find('.comment[data-comment-id]').each((i, el) => {
                var id = parseInt($(el).data('comment-id'));

                if (this.topicInfo.isNewComment(page, id)) {
                    $(el).addClass('endless_new');
                } else {
                    $(el).addClass('endless_not_new');
                }

            });
        }

        addLoadingElement(): void {
            $($('.comments')[1]).append(this.createLoadingElement());
        }

        removeLoadingElement(): void {
            $($('.comments')[1]).find('.loading_es').remove();
        }

        parsePage(dom): void {

            this.markNewComments(dom);

            this.topicInfo.setLastCommentID(this.currentPage, this.getLatestCommentID(dom));

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