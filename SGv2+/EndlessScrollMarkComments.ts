/// <reference path="ModuleDefinition.ts" /> 

module ModuleDefinition {

    class topicInfo {

        private localStorageKey: string;
        private _obj;
        private _isDataStored: boolean = false;

        constructor(topicID: string) {
            this.localStorageKey = "endless_scroll_" + topicID;

            if (this.localStorageKey in localStorage) {
                this._obj = JSON.parse(localStorage[this.localStorageKey]);

                if (!("numberOfComments" in this._obj)) {
                    this._obj.numberOfComments = 0;
                }

                if (!("lastSeenPage" in this._obj)) {
                    this._obj.lastSeenPage = 0;
                }

                this._isDataStored = true;
            } else {
                this._obj = {
                    lastVisit: Date.now(),
                    lastCommentIDPages: {},
                    numberOfComments: 0,
                };
            }
        }

        get isDataStored(): boolean {
            return this._isDataStored;
        }

        get lastVisit(): number {
            return this._obj.lastVisit;
        }

        public getNumComments(): number {
            return this._obj.numberOfComments;
        }

        public setLastVisit(): void {
            this._obj.lastVisit = Date.now();
            this.save();
        }

        public setLastSeenPage(page: number): void {
            this._obj.lastSeenPage = page;
            this.save();
        }

        public setLastCommentID(page: number, commentID: number, numComments: number): void {
            this._obj.lastCommentIDPages[page] = commentID;
            this._obj.numberOfComments = numComments;
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

        private topicInfo: topicInfo;

        getDiscussionId(url:string): string {
            var match = /(discussion|trade)\/([^/]+)(\/|$)/.exec(url);

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
            $('head').append("<style> \
			    .endless_new .comment__parent .comment__summary, .endless_new > .comment__child {\
                    background-color: rgba(180,180,222,0.1)\
                } \
                .endless_not_new .comment__parent .comment__summary,  .endless_not_new > .comment__child {\
                } \
                .endless_not_new:hover .comment__parent .comment__summary,  .endless_not_new:hover > .comment__child {\
                } \
                .endless_new_comments h3 a {\
                    color: black;\
                }\
            </style>");

            window["EndlessScrollMarkComments"] = this;
        }

        render(): void {            
            if (SGV2P.location.pageKind == 'discussion' || SGV2P.location.pageKind == 'trade') {
                this.topicInfo = new topicInfo(this.getDiscussionId(location.pathname));

                var page = 1;

                var currentPageNavEl = $('div.pagination__navigation a.is-selected');
                if (currentPageNavEl.length != 0)
                    page = currentPageNavEl.first().data('page-number');
                
                this.markComments(document, page, true);

                this.topicInfo.setLastVisit();
            }
            else if (SGV2P.location.pageKind == 'discussions' || SGV2P.location.pageKind == 'trades') {
                this.markTopics(document);
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
                var numComments = parseInt($('.comments:eq(1)').prev().find('a').text().split(' ')[0]);

                this.topicInfo.setLastCommentID(page, this.getLatestCommentID(dom), numComments);
            }
        }

        markTopics(dom): void {

            $(dom).find('.table__row-outer-wrap').each((i: number, el: Element) => {
                var link = $(el).find('h3 a').first();
                var tInfo = new topicInfo(this.getDiscussionId(link.attr('href')));

                // Only mark new comments for topics we have visited
                if (tInfo.isDataStored) {
                    var numComments = parseInt($(el).find('.table__column--width-small a.table__column__secondary-link').text());

                    var lastComments = tInfo.getNumComments();
                    var newComments = numComments - lastComments;

                    if (newComments > 0) {
                        $(el).addClass('endless_new_comments');
                        $(el).find('.table__column--width-fill > p').first().append(' - <strong>' + newComments + ' new comments</strong>');
                    }
                    else {
                        $(el).addClass('endless_no_new_comments');
                        $(el).find('.table__column--width-fill > p').first().append(' - no new comments</strong>');
                    }
                }

            });
        }

        name(): string {
            return "EndlessScrollMarkComments";
        }

    }
} 