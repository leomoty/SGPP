/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class EntryCommenters implements SteamGiftsModule {
        // On the giveaway entries page, add an icon next to the user names 
        // indicating whether they commented or not.

        private url: string = 'http://www.steamgifts.com/giveaway/';
        private cacheCompleted: boolean = false;
        private isLoading: boolean = false;
        commenters: any = {};
        private page: number;
        private pageStart: number = 1337; // goes down
        private button: JQuery;
        private elements: any;

        style =
            ".SGPP_EntryComm {margin: 0 10px}\n"+
            ".SGPP_EntryComm > i {margin: 0}\n"+
            ".SGPP_EntryComm:not(.loading) > .fa-spin {display: none}\n" +
            ".SGPP_EntryComm.loading > .fa-comments-o {display: none}\n" +
            ".SGPP_EntryComm.active > .fa-comments-o {opacity: 0.7}\n" +
            ".SGPP_EntryComm:hover > .fa-comments-o {opacity: 1}\n" +

            "span.SGPP_EntryComm_comment {vertical-align: inherit; text-shadow: none}\n" +
            ".SGPP_EntryComm_disabled .SGPP_EntryComm_comment {visibility: hidden}\n" +
            ".SGPP_EntryComm_comment > i.fa.fa-check, .SGPP_EntryComm_comment > i.fa.fa-times {font-size: 0.7em}\n" +
            ".SGPP_EntryComm_comment > i.fa.fa-check {color: #719A47}\n" +                  // only interior
            ".SGPP_EntryComm_comment > i.fa.fa-times {color: rgba(166, 93, 92, 0.85)}\n" +  // only interior
            // ".SGPP_EntryComm_comment.positive {color: #719A47}\n" +                      // fully colored
            // ".SGPP_EntryComm_comment.negative {color: rgba(166, 93, 92, 0.85)}\n" +      // fully colored
            '';

        init(): void {
            var balloons = $(document.createElement('i')).addClass('giveaway__icon fa fa-comments-o').attr('title', 'Check who commented');
            var spinner = $(document.createElement('i')).addClass('giveaway__icon fa fa-refresh fa-spin').attr('title', 'Loading comments...').css('cursor', 'auto');

            this.button = $(document.createElement('span')).addClass('SGPP_EntryComm').append(balloons, spinner);

            var balloon = $(document.createElement('span')).addClass('SGPP_EntryComm_comment fa-stack').append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x'));
            var pos = $(document.createElement('i')).addClass('fa fa-check fa-stack-1x');
            var neg = $(document.createElement('i')).addClass('fa fa-times fa-stack-1x');

            this.elements = {
                pos: balloon.clone().addClass('positive').attr('title', 'Commented').append(pos),
                neg: balloon.clone().addClass('negative').attr('title', 'Did not comment').append(neg),
            }
        }

        render = () => {
            this.button.appendTo('.page__heading__breadcrumbs').one('click', this.firstRun);
        }

        name(): string {
            return "Checks if entries/winners commented on Giveaways";
        }

        shouldRun(loc: SGLocation): boolean {return loc.pageKind == 'giveaway' && (loc.subpage == 'entries' || loc.subpage == 'winners')}

        private firstRun = () => {
            if (!this.cacheCompleted) {
                if (!this.isLoading) {
                    this.button.addClass('loading');

                    this.isLoading = true;
                    this.getCommenters();
                }

                setTimeout(this.firstRun, 1000);
                return;
            }

            this.button.removeClass('loading');
            $('.table__rows .table__column--width-fill > a').each(this.main);

            this.button.addClass('active');
            this.button.click(this.toggleState);

            var observer = new MutationObserver((mutations) => {
                for (var i = 0; i < mutations.length; i++) {
                    $('.table__rows').toggleClass('SGPP_EntryComm_disabled', !this.button.hasClass('active'));
                    $(mutations[i].addedNodes).find('.table__column--width-fill > a').each(this.main)
                };
            })
            observer.observe($('.table')[0], {
                childList: true,
                subtree: true
            })

        }

        private toggleState = () => {
            this.button.toggleClass('active');
            $('.table__rows').toggleClass('SGPP_EntryComm_disabled', !this.button.hasClass('active'));
        }

        private main = (i, el) => {
            // the winners list is wrapped in a <p> element, god knows why.
            var wrapper = $('p.table__column__heading', el);
            if (wrapper.length > 0) el = wrapper[0];

            if (this.commenters[el.textContent.trim()]) {
                this.elements.pos.clone().appendTo(el);
            } else {
                this.elements.neg.clone().appendTo(el);
            }
        }

        private getCommenters = () => {
            this.url += SGPP.location.code + '/' + SGPP.location.description + '/search?page='
            this.page = this.pageStart;
            this.getCommentPage();
        }

        private getCommentPage = () => {
            $.ajax({
                type: 'GET',
                url: this.url + this.page,
                success: this.handleCommentPage
            });
        }

        private handleCommentPage = (html: string) => {
            var $html = $(html);
            $('.comments .comment__username', $html).each((i, el) => {
                this.commenters[el.textContent.trim()] = true;
            });

            if (this.page == this.pageStart) {
                var pagination = $('a[data-page-number]', $html);
                this.page = pagination.length != 0 ? pagination.last().data().pageNumber : 1
            }

            if (--this.page > 0)
                this.getCommentPage();
            else
                this.cacheCompleted = true;

        }

    }

}
