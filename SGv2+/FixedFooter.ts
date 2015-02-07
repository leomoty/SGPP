/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedFooter implements SteamGiftsModule {

        style = "";

        init(): void {
            var style = "body {margin-bottom: 45px !important}" +
                ".footer__outer-wrap {position: fixed; bottom: 0; width: 100%; background-color: #95a4c0}";
            $('<style>').attr('type', 'text/css').html(style).appendTo('head');
        }

        render(): void {
        }

        name(): string {
            return "FixedFooter";
        }

        shouldRun = (location: SGLocation) => true;
    }

}