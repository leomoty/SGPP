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
        private elements: any = {
            button: $(document.createElement('i')).addClass('giveaway__icon fa fa-comments-o').attr('title', 'Check who commented'),
            loader: $(document.createElement('i')).addClass('giveaway__icon fa fa-refresh fa-spin').attr('title', 'loading comments').css('cursor', 'auto'),
            pos: $(document.createElement('span')).addClass('GAComm_pos fa-stack').attr('title', 'Commented')
                .append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x'))
                .append($(document.createElement('i')).addClass('fa fa-check fa-stack-1x')),
            neg: $(document.createElement('span')).addClass('GAComm_neg fa-stack').attr('title', 'Did not comment')
                .append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x'))
                .append($(document.createElement('i')).addClass('fa fa-times fa-stack-1x')),
        };

        style = ".GAComm_pos, .GAComm_neg{margin-left:-3px;vertical-align:inherit}"+
                ".GAComm_pos > i.fa.fa-check{color:#719A47}"+
                ".GAComm_neg > i.fa.fa-times{color:rgba(166,93,92,0.85)}"+
                ".GAComm_neg{color:rgba(166,93,92,0.85)}"+
                ".GAComm_pos{color:#719A47}"+
                ".GAComm_pos > i.fa.fa-check, .GAComm_neg > i.fa.fa-times{font-size:0.7em}";

        /*ToDo: readd CSS comments
        // only interior
        // only interior
        // fully colored
        // fully colored*/

        init(): void {}

        render = () => {
            this.elements.button.click(this.main);
            $('.page__heading__breadcrumbs').append(this.elements.button);
            $('.page__heading__breadcrumbs').append(this.elements.loader.hide());
            
        }

        name(): string {
            return "EntryCommenters";
        }

        shouldRun(loc: SGLocation): boolean {return loc.pageKind == 'giveaway' && (loc.subpage == 'entries' || loc.subpage == 'winners')}

        private main = () => {
            if (!this.cacheCompleted) {
                if (!this.isLoading) {
                    this.elements.button.hide();
                    this.elements.loader.show();

                    this.isLoading = true;
                    this.getCommenters();
                }

                setTimeout(this.main, 1000);
                return;
            }

            this.elements.loader.hide();
            this.elements.button.show();

            $('.table__rows .table__column--width-fill').each((i, el) => {
                $('.GAComm_pos, .GAComm_neg', el).remove();
                var wrapper = $('p.table__column__heading', el);
                if (wrapper.length > 0) el = wrapper[0];

                if (this.commenters[el.textContent.trim()]) {
                    this.elements.pos.clone().appendTo(el);
                } else {
                    this.elements.neg.clone().appendTo(el);
                }
            });
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
            $('.comment__username', $html).each((i, el) => {
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