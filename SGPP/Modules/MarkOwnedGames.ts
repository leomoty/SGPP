/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class MarkOwnedGames implements SteamGiftsModule {

        style = "";

        private userdata = { rgWishlist: [], rgOwnedPackages: [], rgOwnedApps: [], rgPackagesInCart: [], rgAppsInCart: [], rgRecommendedTags: [], rgIgnoredApps: [], rgIgnoredPackages: [] };

        shouldRun(): boolean {
            return true;
        }

        init(): void {
        }

        ownsApp(appid: number): boolean {
            return this.userdata.rgOwnedApps.indexOf(appid) !== -1;
        }

        ownsPackage(packageid: number): boolean {
            return this.userdata.rgOwnedPackages.indexOf(packageid) !== -1;
        }

        ignoresApp(appid: number): boolean {
            return this.userdata.rgIgnoredApps.indexOf(appid) !== -1;
        }

        ignoresPackage(packageid: number): boolean {
            return this.userdata.rgIgnoredPackages.indexOf(packageid) !== -1;
        }

        isWishlisted(appid: number): boolean {
            return this.userdata.rgWishlist.indexOf(appid) !== -1;
        }

        render(): void {
            if (!SGPP.storage.containsItem("steam_userdata") || !SGPP.storage.containsItem("steam_userdata_date") || SGPP.storage.getItem("steam_userdata_date") < (Date.now() - 12 * 60 * 60 * 1000)) {
                this.refreshGamesFromSteam();
            }

            if (SGPP.storage.containsItem("steam_userdata")) {
                this.userdata = SGPP.storage.getItem("steam_userdata");
            }

            console.log(this.userdata);

            if (SGPP.location.pageKind == 'giveaway') {
                var link = $('a.global__image-outer-wrap--game-large').first().attr('href');
                var owned = false;
                var ignored = false;
                var appid = -1;

                var m = link.match(/\/app\/(\d+)\//);

                if (m) {
                    appid = parseInt(m[1]);
                    owned = this.ownsApp(appid);
                    ignored = this.ignoresApp(appid);

                    console.log(owned);
                    console.log(ignored);
                    console.log(appid);
                }

                var sidebar = $('.sidebar').last();

                if (owned) {
                    if ($('.sidebar__entry-insert').length != 0) {
                        $('.sidebar__entry-insert').before('<div class="sidebar__error is-disabled"><i class="fa fa-exclamation-circle"></i> Exists in Account</div>');
                        $('.sidebar__entry-insert').hide();
                    }
                }
                if (ignored) {
                    sidebar.prepend('<div>Ignored</div>');
                }
            }
        }

        refreshGamesFromSteam(): void {
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://store.steampowered.com/dynamicstore/userdata/",
                onload: (response) => {

                    var userdata = JSON.parse(response.responseText);

                    if (userdata.rgOwnedApps.length == 0) {
                        alert('You are not logged in to Steam.');
                    }

                    SGPP.storage.setItem("steam_userdata", userdata);
                    SGPP.storage.setItem("steam_userdata_date", Date.now());

                    this.userdata = userdata;
                }
            });
        }

        name(): string {
            return "Mark Games testing";
        }

    }
}