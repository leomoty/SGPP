/// <reference path="../ModuleDefinition.ts" /> 

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

                if (!("collapsed" in this._obj)) {
                    this._obj.collapsed = {};
                }

                this._isDataStored = true;
            } else {
                this._obj = {
                    lastVisit: Date.now(),
                    lastCommentIDPages: {},
                    collapsed: {},
                    numberOfComments: 0
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

        public setCommentState(id: number, collapsed:boolean): void {
            if (!collapsed) {
                delete this._obj.collapsed[id];
            } else {
                this._obj.collapsed[id] = 1;
            }

            this.save();
        }

        public getCommentState(id: number): boolean {
            return id in this._obj.collapsed;
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

        public forget(): void {
            if (this.localStorageKey in localStorage) {
                localStorage.removeItem(this.localStorageKey);
            }
        }

        private save() {
            localStorage[this.localStorageKey] = JSON.stringify(this._obj);
        }
    }

    export class MarkComments implements SteamGiftsModule {

        private topicInfo: topicInfo;

        get topic(): topicInfo {
            return this.topicInfo;
        }

        style = ".endless_new .comment__parent .comment__summary, .endless_new > .comment__child{}" +
            ".endless_not_new .comment__parent .comment__summary, .endless_not_new > .comment__child{}" +
            ".endless_not_new:hover .comment__parent .comment__summary, .endless_not_new:hover > .comment__child{}" +
            ".endless_badge_new, .endless_badge_new_child {border-radius: 4px; margin-left:5px; padding: 3px 5px; background-color: #C50000;text-shadow: none;color: white; font-weight: bold;}" +
            ".endless_badge_new_child { display: none; }" +
            ".comment--collapsed .endless_badge_new_child { display: block; }\n" +
            ".table__row-outer-wrap .markcomments_controls { display: none; }\n" +
            ".table__row-outer-wrap:hover .markcomments_controls { display: inline; }" +
            ".markcomments_controls i { opacity: 0.5; cursor: pointer; }\n" +
            ".markcomments_controls i:hover { opacity: 1; }";

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

        shouldRun(): boolean {
            return true;
        }

        init(): void {
        }

        render(): void {
            if (SGPP.location.pageKind == 'discussion' || SGPP.location.pageKind == 'trade') {
                this.topicInfo = new topicInfo(this.getDiscussionId(location.pathname));

                var page = 1;

                var currentPageNavEl = $('div.pagination__navigation a.is-selected');
                if (currentPageNavEl.length != 0)
                    page = currentPageNavEl.first().data('page-number');

                this.markComments($(document), page, true);

                this.topicInfo.setLastVisit();

                var m = this;

                $("body").on('click', '.comment__collapse-button', function () {
                    var $this = $(this);
                    var parent = $this.parents('.comment');
                    var comment_id = parseInt(parent.data('comment-id'));

                    m.topicInfo.setCommentState(comment_id, true);
                });

                $("body").on('click', '.comment__expand-button', function () {
                    var $this = $(this);
                    var parent = $this.parents('.comment');
                    var comment_id = parseInt(parent.data('comment-id'));

                    m.topicInfo.setCommentState(comment_id, false);
                });

                SGPP.on("EndlessScrollDiscussionReplies", 'beforeAddItems',(event: JQueryEventObject, dom:JQuery, page: number, isReload: boolean) => {
                    this.markComments(dom, page, true, isReload);
                });
            }
            else if (SGPP.location.pageKind == 'discussions' || SGPP.location.pageKind == 'trades') {
                this.markTopics($(document));

                var m = this;

                $("body").on('click', '.markcomments_forget', function () {
                    var $this = $(this);
                    var parent = $this.parents('h3')
                    var link = parent.children('a');

                    var tInfo = new topicInfo(m.getDiscussionId(link.attr('href')));

                    tInfo.forget();

                    parent.find('.endless_badge_new').remove();
                    $this.remove();
                });

                SGPP.on("EndlessScrollDiscussion", 'beforeAddItems',(event: JQueryEventObject, dom: JQuery, page: number, isReload: boolean) => {
                    this.markTopics(dom);
                });
            }
            else if (SGPP.location.pageKind == 'giveaways' && SGPP.location.subpage == '') {
                this.markTopics($('.widget-container').last().prev().prev());
            }
        }

        // 
        checkNewComments(dom, page: number): boolean {

            var has_new = false;

            $(dom).find('.comment[data-comment-id]').each((i, el) => {
                var id = parseInt($(el).data('comment-id'));

                if (this.topicInfo.isNewComment(page, id)) {
                    has_new = true;
                }

            });

            return has_new;
        }

        markComments(dom: JQuery, page: number, markRead: boolean = false, forceMark: boolean = false): void {
            // Don't mark if topic wasn't viewed before, unless asked to.
            if (this.topicInfo.isDataStored || forceMark) {
                dom.find('.comment[data-comment-id]').each((i, el) => {
                    var id = parseInt($(el).data('comment-id'));

                    var is_new = this.topicInfo.isNewComment(page, id);
                    var collapsed = this.topicInfo.getCommentState(id);

                    if (collapsed) {
                        $(el).addClass('comment--collapsed');
                    }

                    if (is_new) {
                        $(el).addClass('endless_new');

                        $(el).find('.comment__username').first().after($('<span>').addClass('endless_badge_new').text('New').attr('title', 'New since last visit'));
                    } else {
                        $(el).addClass('endless_not_new');
                    }

                    if (this.checkNewComments(el, page)) {

                        if (!is_new) {
                            $(el).find('.comment__username').first().after($('<span>').addClass('endless_badge_new_child').text('New replies').attr('title', 'New since last visit'));
                        }

                        $(el).addClass('endless_new_children');
                    } else {
                        $(el).addClass('endless_no_new_children');
                    }
                });
            }

            if (markRead) {
                var numComments = parseInt($('.comments:eq(1)').prev().find('a').text().split(' ')[0].replace(',', ''));

                this.topicInfo.setLastCommentID(page, this.getLatestCommentID(dom), numComments);
            }
        }

        markTopics(dom: JQuery): void {

            dom.find('.table__row-outer-wrap').each((i: number, el: Element) => {
                try {
                    var link = $(el).find('h3 a').first();
                    var tInfo = new topicInfo(this.getDiscussionId(link.attr('href')));

                    // Make sure links go to last page if using reversed messages
                    if (SGPP.settings.getSettingForModule("EndlessScrollDiscussionReplies", "reversedDiscussionReplies") || false) {
                        link.attr('href', link.attr('href') + '/search?page=31337');
                    }

                    // Only mark new comments for topics we have visited
                    if (tInfo.isDataStored) {
                        var numComments = parseInt($(el).find('.table__column--width-small a.table__column__secondary-link').text().replace(',', ''));

                        var lastComments = tInfo.getNumComments();
                        var newComments = numComments - lastComments;

                        if (newComments > 0) {
                           
                            $(el).addClass('endless_new_comments');

                            // TODO: settings for this
                            if (true)
                                link.after($('<span>').addClass('endless_badge_new').text(newComments).attr('title', newComments + ' new comments since last visit'));
                            else
                                $(el).find('.table__column--width-fill > p').first().append(' - <strong>' + newComments + ' new comments</strong>');
                        }
                        else {
                            $(el).addClass('endless_no_new_comments');
                            $(el).find('.table__column--width-fill > p').first().append(' - no new comments</strong>');
                        }

                        $(el).find('h3').first().append('<span class="markcomments_controls pull-right"><i class="fa fa-remove markcomments_forget" title="Forget this topic"></i></span>');
                    }
                }
                catch (err) {
                    // Not proper discussion link, can be skipped
                }
            });
        }

        name(): string {
            return "Mark Comments";
        }

    }
}