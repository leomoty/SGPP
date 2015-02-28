/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class CommentAndEnter implements SteamGiftsModule {

    	name(): string {
            return "Comment and Enter on Giveaways";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaway' && location.subpage == '';

        style = "div.SGPP_CommAndEnter {margin: 0 0 0 5px}\n";

        init = () => {

        }

        render = () => {
            var enterGa = $('.sidebar .sidebar__entry-insert');
            if (enterGa.length === 0) return; // assume the giveaway is unavailable
            var leaveGa = $('.sidebar .sidebar__entry-delete');
            var loadGa = $('.sidebar .sidebar__entry-loading');

            var submitBtn = $('.js__submit-form');
            var commLoading = loadGa.clone().addClass('SGPP_CommAndEnter').insertAfter(submitBtn);
            var commAndEnter = enterGa.clone().addClass('SGPP_CommAndEnter').text('Submit + Enter').insertAfter(submitBtn);

            var observer = new MutationObserver(function(mutations) {
                commAndEnter.toggleClass('is-hidden', enterGa.hasClass('is-hidden'));
                commLoading.toggleClass('is-hidden', loadGa.hasClass('is-hidden'));
            })

            var observerOptions = {attributes: true, attributeFilter: ['class']};
            observer.observe(enterGa[0], observerOptions);
            observer.observe(loadGa[0], observerOptions);

            commAndEnter.click(function(e) {
                enterGa.click();
                $('textarea.description').prop('disabled', true);

                var observer = new MutationObserver(function(mutations) {
                    if (!leaveGa.hasClass('is-hidden')) {
                        submitBtn.closest("input[name=do]").val("comment_new");
                        submitBtn.closest("form").submit();
                    }
                })
                observer.observe(leaveGa[0], observerOptions);
            })

        }

    }

}
