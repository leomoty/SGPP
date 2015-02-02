/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    interface SGLocation {
        pageKind: string;
        code: string;
        description: string;
        subpage: string;
        hash: string;
        parameters: any;
    }

    export class Core implements SteamGiftsModule {

        private _sgLocation: SGLocation;

        get location(): SGLocation {
            return this._sgLocation;
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

                if (split[0] == 'giveaway' || split[0] == 'trade' || split[0] == 'discussion') {
                    switch (split.length) {
                        case 4:
                            subpage = split[3];
                        case 3:
                            description = split[2];
                        case 2:
                            code = split[1];
                        case 1:
                            pageKind = split[0];
                    }
                } else if (split[0] == 'giveaways' || split[0] == 'trades' || split[0] == 'discussions' || split[0] == 'support' || split[0] == 'roles'
                            || split[0] == 'legal' || split[0] == 'about') {
                    pageKind = split[0];
                    subpage = (split[1] == 'search' ? '' : split[1]) || '';
                } else if(split[1] == 'sales'){
                    pageKind = split[0];
                    subpage = split[1];
                    description = split[2] || '';
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

        constructor() {
            this.init();
        }

        init = () => {
            this.resolvePath();
        }

        render(): void {
            
        }

        name(): string {
            return "Core";
        }

        log(msg: string): void {
            console.log("[" + new Date() + "] SGV2+ - " + msg);
        }
    }

} 