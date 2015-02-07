/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class Settings implements SteamGiftsModule {

        style = "";
        
        private settingsNavIcon: any = '<a class="nav__row sgpp-settings" href= "#">\n' +
                                       '<i class="icon-red fa fa-fw fa-bars"> </i>\n' +
                                       '<div class="nav__row__summary">\n' +
                                       '<p class="nav__row__summary__name" > SG++ Settings</p>\n' +
                                       '<p class="nav__row__summary__description"> Steamgifts++ settings.</p>\n' +
                                       '</div>\n' +
                                       '</a>\n';

        private settingsPage: any = '<div class="popup sgpp-settings-popup">\n' +
                                    //'<i class="popup__icon fa fa-bars"></i>\n' +
                                    '<p class="popup__heading">Steamgifts++ Settings</p>\n' +
                                    '<p class="popup__actions">\n' +
                                    '<span class="b-close">Save</span>\n' +
                                    '<span class="b-close">Close</span>\n' +
                                    '</p>\n' +
                                    '</div>\n';

        init = () => {
            
        }

        render = () =>
        {
            $(".nav__absolute-dropdown a[href^='/?logout']").before(this.settingsNavIcon);
            $('.footer__outer-wrap').before(this.settingsPage);
            $('.sgpp-settings').on('click', this.handleSettingClick);
        }

        private handleSettingClick = () => {
            $(".sgpp-settings-popup").bPopup({ opacity: .85, fadeSpeed: 200, followSpeed: 500, modalColor: "#3c424d"});
        };

        name(): string {
            return "Settings";
        }

        shouldRun = (location) => true;

        
    }

}