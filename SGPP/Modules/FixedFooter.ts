/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedFooter implements SteamGiftsModule {

        style = "html, body{box-sizing:border-box;height:100%}" +
                ".page__outer-wrap{box-sizing:border-box;min-height:100%}" +
                ".offer__outer-wrap{padding-bottom:59px!important}" +
                ".footer__outer-wrap{position:fixed;bottom:0;width:100%;z-index:101;background-color:#95a4c0}";


        init(): void {
            
        }

        render(): void {
        }

        name(): string {
            return "FixedFooter";
        }

        shouldRun = (location: SGLocation) => true;
    }

}