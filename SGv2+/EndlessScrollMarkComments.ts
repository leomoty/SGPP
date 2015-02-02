/// <reference path="ModuleDefinition.ts" /> 

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

                if (!("numberOfComments" in this._obj)) {
                    this._obj.numberOfComments = 0;
                }

            } else {
                this._obj = {
                    lastVisit: Date.now(),
                    lastCommentIDPages: {},
                    numberOfComments: 0,
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

    export class EndlessScrollMarkComments implements SteamGiftsModule {

        private section: string;
        private pageType: string;
        private topicInfo: topicInfo;

        getDiscussionId(): string {
            var match = /(discussion|trade)\/([^/]+)(\/|$)/.exec(location.pathname);

            if (!match)
                throw 'No Discussion ID';

            return match[1] + '_' + match[2];
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

        init(): void {
            if (/^\/discussion\//.test(location.pathname)) {
                this.section = 'discussion';
                this.pageType = 'comments';
            }
            else if (/^\/trade\//.test(location.pathname)) {
                this.section = 'trades';
                this.pageType = 'comments';
            }
            else if (/^\/discussions/.test(location.pathname)) {
                this.section = 'discussion';
                this.pageType = 'topics';
            }
            else if (/^\/trades/.test(location.pathname)) {
                this.section = 'trades';
                this.pageType = 'topics';
            } else {
                return;
            }

            $('head').append("<style> \
			    .endless_new .comment__parent .comment__summary, .endless_new > .comment__child {\
                    background-color: rgba(180,180,222,0.1)\
                } \
                .endless_not_new .comment__parent .comment__summary,  .endless_not_new > .comment__child {\
                } \
                .endless_not_new:hover .comment__parent .comment__summary,  .endless_not_new:hover > .comment__child {\
                } \
            </style>");

            window["EndlessScrollMarkComments"] = this;
        }

        render(): void {
            if (this.pageType == 'comments') {
                this.topicInfo = new topicInfo(this.getDiscussionId());

                var page = 1;

                var currentPageNavEl = $('div.pagination__navigation a.is-selected');
                if (currentPageNavEl.length != 0)
                    currentPageNavEl.first().data('page-number');
                
                this.markComments(document, page, true);

                this.topicInfo.setLastVisit();
            }
            else if (this.pageType == 'topics') {

            }
        }

        markComments(dom, page: number, markRead: boolean = false): void {

            $(dom).find('.comment[data-comment-id]').each((i, el) => {
                var id = parseInt($(el).data('comment-id'));

                if (this.topicInfo.isNewComment(page, id)) {
                    $(el).addClass('endless_new');
                } else {
                    $(el).addClass('endless_not_new');
                }

            });

            if (markRead) {
                this.topicInfo.setLastCommentID(page, this.getLatestCommentID(dom));
            }
        }

        markTopics(dom): void {
        }

        name(): string {
            return "EndlessScrollMarkComments";
        }

    }
} 