/// <reference path="ModuleDefinition.ts" />
/// <reference path="LocalStorage.ts" />

module ModuleDefinition{

    export class Core implements SteamGiftsModule {

        //SGPP section

        private _sgLocation: SGLocation;
        private _debug = true;
        private _settings: ModuleDefinition.Settings = new ModuleDefinition.Settings();
        private _storage: ModuleDefinition.LocalStorage = new ModuleDefinition.LocalStorage();
        private _styleSheet: JQuery;
        private _currentUser: string;

        modules: { [s: string]: ModuleDefinition.SteamGiftsModule; } = {};

        constructor() {
            this.init();
        }

        get user(): string {
            return this._currentUser;
        }

        get settings(): Settings {
            return this._settings;
        }

        get location(): SGLocation {
            return this._sgLocation;
        }

        get storage(): LocalStorage {
            return this._storage;
        }

        log = (msg: string) => {
            if (this._debug)
                console.log("[" + new Date() + "] SGPP - " + msg);
        };

        appendCSS = (css: string) => {
            this._styleSheet.append(css);
        }

        on = (moduleName: string|string[], event: string, callback: any) => {
            if (typeof moduleName === 'string') {
                this.addOnCallbackHelper(moduleName, event, callback);
            } else {
                for (var pos in moduleName) {
                    this.addOnCallbackHelper(moduleName[pos], event, callback);
                }
            }
        }

        private addOnCallbackHelper(moduleName: string, event: string, callback: any) {
            if (moduleName in SGPP.modules) {
                SGPP.log("Handler attached on " + moduleName + " (" + event + ")");
                $(SGPP.modules[moduleName]).on(event, callback);
            }
        }

        addGiveawayFilter = (filter: GiveawayFilter): boolean => {
            if ("GiveawaysFilter" in SGPP.modules) {
                (<GiveawaysFilter> SGPP.modules["GiveawaysFilter"]).addFilter(filter);

                return true;
            }

            return false;
        }

        //core module section

        name(): string {
            return "Core";
        }

        shouldRun(location: SGLocation): boolean{
            return true;
        }

        style = "";

        init = () => {
            this.log("Steamgifts++ plugin started.");
         
            var userUrl = $('.nav__button-container a[href^="/user/"]');
            if (userUrl.length)
                this._currentUser = userUrl.attr('href').substr("/user/".length);

            //init SGLocation
            this.resolvePath();

            //init settings
            this._settings.init(this._storage);

            //create SGPP stylesheet section in the page head
            this._styleSheet = $(document.createElement('style')).attr('id', 'SGPP_StyleSheet').appendTo('head');
            this.appendCSS('/* SGPP Stylesheet */ ');

            this.appendCSS(this._settings.style);
        }

        render(): void {
            //render settings
            this._settings.render();
        }

        private resolvePath = () => {
            var hash = "";
            var pageKind = "";
            var code = "";
            var description = "";
            var subpage = "";
            var windowLocation = window.location;

            if (windowLocation.hash.length > 1)
                hash = windowLocation.hash.substring(1);

            if (windowLocation.pathname == '/') {
                pageKind = "giveaways";
            } else {
                var split = windowLocation.pathname.split("/").filter(function (a, b, c) { return Boolean(a) });

                pageKind = split[0] || '';
                description = split[2] || '';

                if (split[0] == 'giveaway' || split[0] == 'trade' || split[0] == 'discussion' || split[0] == 'user' || split[0] == 'group') {
                    subpage = (split[3] == 'search' ? '' : split[3]) || '';
                    code = split[1] || '';
                } else {
                    subpage = split[1] || '';
                }

            }

            var match,
                pl = /\+/g,
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query = windowLocation.search.substring(1);
            var urlParams = {};
            while (match = search.exec(query)) {
                urlParams[decode(match[1])] = decode(match[2]);
            }

            this._sgLocation = {
                pageKind: pageKind,
                code: code,
                description: description,
                subpage: subpage,
                hash: hash,
                parameters: urlParams
            }
        }
    
    }

}