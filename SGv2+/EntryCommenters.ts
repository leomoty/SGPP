/// <reference path="ModuleDefinition.ts" />
 
module ModuleDefinition {

    export class EntryCommenters implements SteamGiftsModule {
        // On the giveaway entries page, add an icon next to the user names 
        // indicating whether the user commented or not on the giveaway.

        init(): void {
            var style = (
                ".GAComm_button {text-decoration: underline; font-size: 12px}\n" +
                ".GAComm_pos {vertical-align: super}\n" +
                ".GAComm_neg {vertical-align: inherit}\n"
                );
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        }

        render(): void {
            var $pos = $(document.createElement('i')).addClass('GAComm_pos fa fa-comment-o').attr('title', 'Commented');
            var $neg = $(document.createElement('span')).addClass('GAComm_neg fa-stack').attr('title', 'Did not comment')
                .append($(document.createElement('i')).addClass('fa fa-comment-o fa-stack-1x'))
                .append($(document.createElement('i')).addClass('fa fa-times fa-stack-1x'));
            var $loader = $(document.createElement('i')).addClass('giveaway__icon fa fa-refresh fa-spin').attr('title', 'loading comments').css('cursor', 'auto');
            var $button = $(document.createElement('i')).addClass('giveaway__icon fa fa-comments-o').attr('title', 'Check who commented');
            var commenters = {};
            var cacheIsComplete = false;
            var isLoading = false;

            function main() {
                if (!cacheIsComplete) {
                    if (!isLoading) {
                        $button.hide();
                        $loader.show();

                        isLoading = true;
                        getCommenters();
                    }

                    setTimeout(main, 1000);
                    return;
                }

                $loader.hide();
                $button.show();

                console.log(commenters);
                $('.table__rows .table__column--width-fill').each(function(i, el) {
                    $('.GAComm_pos, .GAComm_neg', el).remove();
                    if ($.trim(el.textContent) in commenters) {
                        $pos.clone().appendTo(el);
                    } else {
                        $neg.clone().appendTo(el);
                    }
                });
            }

            function getCommenters() {
                var url = /.*steamgifts.com\/giveaway\/[a-zA-Z0-9]{5}\/.*?\//.exec(document.URL)[0];
                url += 'search?page=';
                console.log(url);
                var page = 1;
                var maxPage = null;
                getNextPage();

                function getNextPage() {
                    $.ajax({
                        type: 'GET',
                        url: url + page,
                        success: handleCommentPage
                    });
                }

                function handleCommentPage(html) {
                    var $html = $(html);
                    $('.comment__username', $html).each(function(i, el) {
                        commenters[el.textContent] = true;
                    });

                    if (maxPage === null) {
                        var pagination = $('a[data-page-number]', $html);
                        if (pagination.length === 0) {
                            maxPage = 1;
                        } else {
                            pagination.each(function(i, el) {
                                maxPage = Math.max($(el).data().pageNumber, maxPage);
                            });
                            console.log('maxPage =', maxPage);
                        }
                    }

                    if (++page <= maxPage) getNextPage();
                    else cacheIsComplete = true;

                }
            }


            if (/.*steamgifts.com\/giveaway\/[a-zA-Z0-9]{5}\/.*?\/entries/.test(document.URL)) {
                $button.click(main);
                $('.page__heading__breadcrumbs').append($button);
                $('.page__heading__breadcrumbs').append($loader.hide());

                $(".table__rows").bind('DOMNodeInserted', function(e) {
                    if ($(e.target).hasClass('table__row-outer-wrap')) {
                        main();
                    }
                });
            }
        }

        name(): string {
            return "Core";
        }

    }

}