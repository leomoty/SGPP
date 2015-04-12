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

        render(): void {
            if (!SGPP.storage.containsItem("steam_userdata") || !SGPP.storage.containsItem("steam_userdata_date") || SGPP.storage.getItem("steam_userdata_date") < (Date.now() - 12 * 60 * 60 * 1000)) {
                this.refreshGamesFromSteam();
            } else {
                this.userdata = JSON.parse(SGPP.storage.getItem("steam_userdata"));
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

                    SGPP.storage.setItem("steam_usedata", userdata);
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