/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedNavbar implements SteamGiftsModule {

        style = "";

        init(): void {
            var style = "body {padding-top: 39px !important}" +
                        "header {position: fixed; top: 0; width: 100%; z-index: 100}";
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        }

        render(): void {
        }

        name(): string {
            return "FixedNavbar";
        }

        shouldRun = (location: SGLocation) => true;
    }

}