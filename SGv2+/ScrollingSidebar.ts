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

            $('.featured__inner-wrap .global__image-outer-wrap img').on('load', document,() => {
                offset = $sidebar.offset();
            });

            $window.scroll(function () {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() > offset.top ? $window.scrollTop() - offset.top + topPadding : 0
                });
            });
        }

        name(): string {
            return "ScrollingSidebar";
        }

        shouldRun = (location: SGLocation) => true;
    }

} 