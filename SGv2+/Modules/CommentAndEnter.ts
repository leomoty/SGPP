/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class CommentAndEnter implements SteamGiftsModule {

    	name(): string {
            return "CommentAndEnter";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaway' && location.subpage == '';

        style = ".comment_submit{margin-bottom:0!important}";

        init = () => {
        
        }

        render = () => {
        	var submit = $('.js__submit-form');
            submit.before('<div class="sidebar__entry-insert comment_submit is-hidden">Comment and Enter</div>');
            submit.before('<div class="sidebar__entry-loading is-disabled is-hidden comment_submit"><i class="fa fa-refresh fa-spin"></i> Please wait...</div>');
            var insert = $('.sidebar .sidebar__entry-insert');
            var remove = $('.sidebar .sidebar__entry-delete');
            var button = $('.comment_submit.sidebar__entry-insert');
            var loading = $('.comment_submit.sidebar__entry-loading');

            if(!insert.hasClass('is-hidden'))
                button.removeClass('is-hidden');
            insert.on('click', function() {
                button.addClass('is-hidden');
                loading.removeClass('is-hidden');
            });
            remove.on('click', function() {
                loading.addClass('is-hidden');
                button.removeClass('is-hidden');
            });
            button.on('click', function() {
                insert.click();
                button.addClass('is-hidden');
                loading.removeClass('is-hidden');

                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (!$(mutation.target).hasClass('is-hidden'))
                            $('.js__submit-form').hasClass("js__edit-giveaway") && $('.js__submit-form').closest("form").find("input[name=next_step]").val('1'), $('.js__submit-form').closest("form").submit(), !1
                    });
                });

                observer.observe(remove[0], { attributes: true, attributeFilter: ['class'] });

            });
        }

    }

}