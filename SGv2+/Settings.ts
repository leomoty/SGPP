/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class Settings implements SteamGiftsModule {

        style = "";
        
        private settingsNavIcon: any = $('<a class="nav__row sgpp_settings" href= "#">\n' +
                                            '<i class="icon-red fa fa-fw fa-bars"> </i>\n' +
                                            '<div class="nav__row__summary">\n' +
                                            '<p class="nav__row__summary__name" > SG++ Settings</p>\n' +
                                            '<p class="nav__row__summary__description"> Steamgifts++ settings.</p>\n' +
                                            '</div>\n' +
                                            '</a>\n');

        init = () => {
            
        }

        render = () =>
        {
            $(".nav__absolute-dropdown a[href='/?logout']").before(this.settingsNavIcon);
            $(".sgpp_settings").on("click", this.handleSettingClick);
        }

        private handleSettingClick = () => {

        };

        name(): string {
            return "Settings";
        }

        shouldRun = (location) => true;

        
    }

}