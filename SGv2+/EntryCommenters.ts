/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition {

    export class EntryCommenters implements SteamGiftsModule {
        // On the giveaway entries page, add an icon next to the user names 
        // indicating whether the user commented or not on the giveaway.
        
        private url: string;
        private cacheCompleted: boolean = false;
        private isLoading: boolean = false;
        commenters: string[] = [];
        private page: number = 1;
        private maxPage: number;
        private elements: any = {
            pos: $(document.createElement('i')).addClass('GAComm_pos fa fa-comment-o').attr('title', 'Commented'),
            neg: $(document.createElement('span')).addClass('GAComm_neg fa-stack').attr('title', 'Did not comment')
                .append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x'))
                .append($(document.createElement('i')).addClass('fa fa-times fa-stack-1x')),
            loader: $(document.createElement('i')).addClass('giveaway__icon fa fa-refresh fa-spin').attr('title', 'loading comments').css('cursor', 'auto'),
            button: $(document.createElement('i')).addClass('giveaway__icon fa fa-comments-o').attr('title', 'Check who commented')
        };

        init(): void {
            var style = (
                ".GAComm_button {text-decoration: underline; font-size: 12px}\n" +
                ".GAComm_pos {vertical-align: super}\n" +
                ".GAComm_neg {vertical-align: inherit}\n"
            );
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        }

        render = () => {
            if (/.*steamgifts.com\/giveaway\/[a-zA-Z0-9]{5}\/.*?\/entries/.test(document.URL)) {
                this.elements.button.click(this.main);
                $('.page__heading__breadcrumbs').append(this.elements.button);
                $('.page__heading__breadcrumbs').append(this.elements.loader.hide());
            }

        }

        name(): string {
            return "Core";
        }

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
                // if ($.trim(el.textContent) in this.commenters) {
                if (this.commenters.indexOf($.trim(el.textContent)) > -1) {
                    this.elements.pos.clone().appendTo(el);
                } else {
                    this.elements.neg.clone().appendTo(el);
                }
            });
        }
        private getCommenters = () => {
            this.url = /.*steamgifts.com\/giveaway\/[a-zA-Z0-9]{5}\/.*?\//.exec(document.URL)[0];
            this.url += 'search?page=';
            this.page = 1;
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
                this.commenters.push(el.textContent);
            });

            if (this.maxPage === null) {
                var pagination = $('a[data-page-number]', $html);
                if (pagination.length === 0) {
                    this.maxPage = 1;
                } else {
                    pagination.each((i, el) => {
                        this.maxPage = Math.max($(el).data().pageNumber, this.maxPage);
                    });
                }
            }

            if (++this.page <= this.maxPage) this.getCommentPage();
            else this.cacheCompleted = true;

        }

    }

}