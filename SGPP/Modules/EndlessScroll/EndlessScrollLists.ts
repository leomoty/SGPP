/// <reference path="../../ModuleDefinition.ts" /> 
/// <reference path="EndlessScroll.ts" /> 


module ModuleDefinition {

    export class EndlessScrollLists extends ModuleDefinition.EndlessScroll implements SteamGiftsModule {

        style = "";

        shouldRun(): boolean {

            if (SGPP.location.pageKind == 'giveaways') {
                return SGPP.location.subpage == 'entered' || SGPP.location.subpage == 'created' || SGPP.location.subpage == 'won';
            } else if (SGPP.location.pageKind == 'bundle-games') {
                return true;
            } else if (SGPP.location.pageKind == 'giveaway') {
                return SGPP.location.subpage == 'entries' || SGPP.location.subpage == 'winners' || SGPP.location.subpage == 'groups';
            } else if (SGPP.location.pageKind == 'account') {
                return SGPP.location.subpage == 'manage' || SGPP.location.subpage == 'trades' || SGPP.location.subpage == 'steam' || SGPP.location.subpage == 'settings';
            }            

            return false;
        }

        init(): void {
            
        }

        render(): void {
            this.preparePage();
        }

        createPageContainerElement(): JQuery {
            return $('<div class="table__rows">');
        }

        getItemsElement(dom): JQuery {
            return $(dom).find('.table__rows').first();
        }

        getItems(dom: JQuery): JQuery {
            return dom.children('.table__row-outer-wrap');
        }

        afterAddItems(dom: JQuery): void {
            $(dom).find(".table__remove-default").click(function () {
                var e = $(this);
                e.addClass("is-hidden");
                e.siblings(".table__remove-loading").removeClass("is-hidden");
                $.ajax({
                    url: "/ajax.php",
                    type: "POST",
                    dataType: "json",
                    data: e.closest("form").serialize(),
                    success: function (t) {
                        e.siblings(".table__remove-loading").addClass("is-hidden");
                        e.siblings(".table__remove-complete").removeClass("is-hidden");
                        e.closest(".table__row-inner-wrap").addClass("is-faded");
                        if (typeof t.points !== "undefined" && t.points !== false) {
                            $(".nav__points").text(t.points)
                        }
                    }
                })
            });
        }

        name(): string {
            return "Endless Scroll everywhere else";
        }

    }
}