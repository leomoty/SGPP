/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class CommentAndEnter implements SteamGiftsModule {

    	name(): string {
            return "CommentAndEnter";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaway' && location.subpage == '';

        style = "div.SGPP_CommAndEnter {margin: 0 0 0 5px}\n";

        init = () => {
        
        }

        render = () => {
            var enterGa = $('.sidebar .sidebar__entry-insert');
            if (enterGa.length === 0) return; // assume the giveaway is unavailable
            var leaveGa = $('.sidebar .sidebar__entry-delete');
            var sidebarLoading = $('.sidebar .sidebar__entry-loading');

            var submitBtn = $('.js__submit-form');
            var commLoading = sidebarLoading.clone().addClass('SGPP_CommAndEnter is-hidden').insertAfter(submitBtn);
            var commAndEnter = $('<div class="sidebar__entry-insert SGPP_CommAndEnter is-hidden">Submit + Enter</div>').insertAfter(submitBtn);

            commAndEnter.toggleClass('is-hidden', enterGa.hasClass('is-hidden'));

            var enterObserver = new MutationObserver(function(mutations) {
                for (var i=0; i < mutations.length; i++) {
                    var el = mutations[i].target;
                    if (el == enterGa[0])
                        commAndEnter.toggleClass('is-hidden', enterGa.hasClass('is-hidden'));
                    else if (el == sidebarLoading[0])
                        commLoading.toggleClass('is-hidden', sidebarLoading.hasClass('is-hidden'));
                }
            })

            var opt = {attributes: true, attributeFilter: ['class']};
            enterObserver.observe(enterGa[0], opt);
            enterObserver.observe(sidebarLoading[0], opt);

            commAndEnter.click(function(e) {
                commAndEnter.addClass('is-hidden');
                commLoading.removeClass('is-hidden');
                $('textarea.description').prop('disabled', true);
                enterGa.click();

                var leaveObserver = new MutationObserver(function(mutations) {
                    if (!leaveGa.hasClass('is-hidden')) {
                        submitBtn.closest("input[name=do]").val("comment_new");
                        submitBtn.closest("form").submit();
                    }
                })
                leaveObserver.observe(leaveGa[0], opt);
            })

        }

    }

}