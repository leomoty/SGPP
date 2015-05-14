/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedNavbar implements SteamGiftsModule {

        style = "body.SPGG_FixedNavbar {padding-top: 39px}\n" +
        "header.SPGG_FixedNavbar {position: fixed; top: 0px; width: 100%; z-index: 100}\n" +
        ".comment__summary {margin-top: -44px !important; padding-top: 48px !important;}\n" +
        ".comment__actions > div, .comment__actions__button {position: relative; z-index: 5;}\n" +
		".page__heading__breadcrumbs {z-index: 5;}";

        init(): void {
        }

        render(): void {
            $('body').addClass('SPGG_FixedNavbar');
            $('header').addClass('SPGG_FixedNavbar');
        }

        name(): string {
            return "Fixed Navbar on top";
        }

        shouldRun = (location: SGLocation) => true;
    }

}
