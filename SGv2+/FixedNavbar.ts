/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedNavbar implements SteamGiftsModule {

        init(): void {
            var style = ".body {margin-top: 39px}" +
                ".header {position: fixed; top: 0; width: 100%; z-index: 100}";
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        }

        render(): void {
            $('body').addClass('body');
            $('header').addClass('header');
        }

        name(): string {
            return "FixedNavbar";
        }
    }

} 