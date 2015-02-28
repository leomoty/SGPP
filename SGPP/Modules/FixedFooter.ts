/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class FixedFooter implements SteamGiftsModule {

        style = "body.SGPP_FixedFooter {padding-bottom: 45px}\n" +
            ".footer__outer-wrap.SGPP_FixedFooter_outerWrap {padding: 15px 0px; z-index: 100; bottom: 0px; position: fixed; width: 100%; background: inherit}\n" +
            ".footer__inner-wrap.SGPP_FixedFooter_innerWrap {margin: 0px 25px}\n";

        init(): void {
        }

        render(): void {
            $('body').addClass('SGPP_FixedFooter');
            $('.footer__outer-wrap').addClass('SGPP_FixedFooter_outerWrap');
            $('.footer__inner-wrap').addClass('SGPP_FixedFooter_innerWrap');
        }

        name(): string {
            return "Fixed Footer on bottom";
        }

        shouldRun = (location: SGLocation) => true;
    }

}
