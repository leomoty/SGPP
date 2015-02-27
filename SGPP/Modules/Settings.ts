/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class Settings implements SteamGiftsModule {

        style = ".SGPP__settings { cursor: pointer; }\n" +
        ".SGPP__settings_page { min-height: 400px; max-height: 500px; overflow-y: scroll; overflow-x: hidden; }\n" +
        ".SGPP__settings_icon { width: 48px; }";

        private settingsNavIcon: string = '<a class="nav__row SGPP__settings">\n' +
            '<i class="icon-red fa fa-fw fa-bars"> </i>\n' +
            '<div class="nav__row__summary">\n' +
            '<p class="nav__row__summary__name" > SG++ Settings</p>\n' +
            '<p class="nav__row__summary__description"> Steamgifts++ settings.</p>\n' +
            '</div>\n' +
            '</a>\n';

        private settingsPage = (modules) => {
            return '<div class="popup SGPP__settings_popup">\n' +
                '<i class="popup__icon fa fa-bars SGPP__settings_icon"></i>\n' +
                '<p class="popup__heading">Steamgifts++ Settings</p>\n' +
                '<div class="form__rows SGPP__settings_page">' + modules + '</div>\n' +
                '<p class="popup__actions" style="margin-top:5px;">\n' +
                '<span class="SGPP__settings-save b-close">Save</span>\n' +
                '<span class="b-close">Close</span>\n' +
                '</p>\n' +
                '</div>\n'
        };

        private moduleSetting = (num, friendlyName, name, current: boolean) => {
            return '<div class="form__row" style="margin-bottom:10px;">\n' +
                '<div class="form__heading"><div class="form__heading__number">' + num + '</div><div class="form__heading__text">' + friendlyName + '</div></div>\n' +
                '<div class= "form__row__indent">\n' +
                '<div>\n' +
                '<input type="hidden" name="' + name + '" value="' + (current ? "1" : "0") + '">\n' +
                '<div class= "SGPP__settings-checkbox ' + (current ? 'is-selected' : 'is-disabled') + '">\n' +
                '<i class= "form__checkbox__default fa fa-circle-o"> </i><i class="form__checkbox__hover fa fa-circle"> </i><i class= "form__checkbox__selected fa fa-check-circle"> </i>Enabled\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n'
        };

        init = () => {

        }

        render = () => {
            $(".nav__absolute-dropdown a[href^='/?logout']").before(this.settingsNavIcon);

            var modules: string = "";
            var i = 0;
            for (var pos in modulesNames) {
                i++;
                var SGModule: SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();
                modules += this.moduleSetting(i, SGModule.name(), modulesNames[pos], false);//this.isModuleEnabled(modulesNames[pos]));
            }

            var completeSettingsPage = this.settingsPage(modules);

            $('.footer__outer-wrap').before(completeSettingsPage);
            $('.SGPP__settings').on('click', this.handleSettingClick);

            $('.SGPP__settings-save').on("click", this.handleSaveSettings);

            $('.SGPP__settings-checkbox').on("click", this.handleSettingsCheckboxClick);
        }

        private handleSettingsCheckboxClick = function () {
            var input = $(this).siblings("input");

            if ($(this).hasClass('is-selected')) {
                $(this).removeClass('is-selected');
                $(this).addClass('is-disabled');
                input.val('0');
            } else {
                $(this).removeClass('is-disabled');
                $(this).addClass('is-selected');
                input.val('1');
            }
        };

        private handleSettingClick = () => {
            var popup: JQueryBPopup = $(".SGPP__settings_popup").bPopup({ opacity: .85, fadeSpeed: 200, followSpeed: 500, modalColor: "#3c424d" });
            $(".SGPP__settings_popup .SGPP__settings-checkbox").addClass("form__checkbox");

            $('.SGPP__settings_popup input').each((index, element) => {
                var input = $(element);
                var value = SGPP.storage.getItem(input.attr('name'));
                input.val(value);
                
                var checkbox = input.siblings('.SGPP__settings-checkbox');

                checkbox.toggleClass('is-selected', value == 1);
                checkbox.toggleClass('is-disabled', value != 1);

            });
        };
        
        private handleSaveSettings = () => {
            $('.SGPP__settings_popup input').each((index, element) => {
                var input = $(element);
                SGPP.storage.setItem(input.attr('name'), input.val());
            });
            window.location.reload();
        };

        name(): string {
            return "Settings";
        }

        shouldRun = (location) => true;

        isModuleEnabled = (module: string) => {
            return SGPP.storage.getItem(module) == "1";
        }

     
    }

}