/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedNavbar implements SteamGiftsModule {

        style = "body.SPGG_FixedNavbar {padding-top: 39px}\n" +
        "header.SPGG_FixedNavbar {position: fixed; top: 0px; width: 100%; z-index: 100}\n" + 
        ".comment__summary { margin-top: -44px !important; padding-top: 48px !important; }\n" + 
        "a { position: relative; z-index: 99; } ";

        init(): void {
        }

        render(): void {
            $('body').addClass('SPGG_FixedNavbar');
            $('header').addClass('SPGG_FixedNavbar');
        }

        name(): string {
            return "FixedNavbar";
        }

        shouldRun = (location: SGLocation) => true;
    }

}