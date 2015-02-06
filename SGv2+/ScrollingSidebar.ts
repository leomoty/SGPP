/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = "";

        init(): void {
           
        }

        render(): void {
            var $sidebar = $(".sidebar"),
                $window = $(window),
                offset = $sidebar.offset(),
                topPadding = 64;
            $window.scroll(function () {
                if ($window.scrollTop() > offset.top) {
                    $sidebar.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                    });
                } else {
                    $sidebar.stop().animate({
                        marginTop: 0
                    });
                }
            });
        }

        name(): string {
            return "ScrollingSidebar";
        }

        shouldRun = (location: SGLocation) => true;
    }

} 