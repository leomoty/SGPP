/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class Settings implements SteamGiftsModule {

        public static SETTINGS_KEY: string = "Settings";

        private _lsSettings = {};

        style = ".SGPP__settings { cursor: pointer; }\n";

        private settingsNavIcon: string = '<a class="nav__row SGPP__settings" href="/sgpp">\n' +
        '<i class="icon-red fa fa-fw fa-bars"> </i>\n' +
        '<div class="nav__row__summary">\n' +
        '<p class="nav__row__summary__name" > SG++ Settings</p>\n' +
        '<p class="nav__row__summary__description"> Steamgifts++ settings.</p>\n' +
        '</div>\n' +
        '</a>\n';

        init = (storage?: ModuleDefinition.LocalStorage) => {
            this._lsSettings = storage.getItem(ModuleDefinition.Settings.SETTINGS_KEY, {});

            if (window.location.pathname == '/sgpp') {
                unsafeWindow.window['$'] = $;
                $('head').html(GM_getResourceText("head"));
                $('body').html(GM_getResourceText("settings"));
            }
        }

        render = () => {
            if (SGPP.location.pageKind != 'sgpp') {
                $(".nav__absolute-dropdown a[href^='/?logout']").before(this.settingsNavIcon);
            } else {
                $('.SGPP__form__checkbox').each((index, el) =>{
                    var elem = $(el);
                    var setting = elem.attr('name');
                    if (elem.parent('.SGPP__Module').length) {
                        elem.prop('checked', this.isModuleEnabled(setting));
                    } else {
                        var module = elem.closest('.form__row').find('.SGPP__Module input').attr('name');
                        elem.prop('checked', this.getSettingForModule(module, setting) || false);
                    }
                });

                $('.SGPP__form__checkbox').on("click",(e) => {
                    var target = $(e.target);
                    var checked = target.prop('checked');

                    if (target.parent('.SGPP__Module').length) {
                        var module = target.attr('name');

                        if (this._lsSettings.hasOwnProperty(module)) {
                            this._lsSettings[module].enabled = checked;
                        } else {
                            this._lsSettings[module] = {
                                "enabled": checked
                            };
                        }
                    } else {
                        var module = target.closest('.form__row').find('.SGPP__Module input').attr('name');
                        var property = target.attr('name');

                        if (!this._lsSettings.hasOwnProperty(module)) {
                            this._lsSettings[module] = {
                                "enabled": false
                            };
                        }

                        this._lsSettings[module][property] = checked;
                    }

                    this.persistSettings();
                });
            }
        }


        name(): string {
            return "Settings";
        }

        shouldRun = (location) => true;

        isModuleEnabled = (module: string) => {
            return this._lsSettings.hasOwnProperty(module) && this._lsSettings[module].enabled;
        }

        getSettingForModule = (module: string, setting: string) => {
            return !this._lsSettings.hasOwnProperty(module) ? null : this._lsSettings[module][setting];
        }

        private persistSettings = () => {
            SGPP.storage.setItem(ModuleDefinition.Settings.SETTINGS_KEY, this._lsSettings);
        }
     
    }

}