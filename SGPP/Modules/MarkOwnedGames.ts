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

        owns(link: string): boolean {
            var l = this.parseAppLink(link);

            if (!l)
                return null;

            if (l[0] == 'app')
                return this.ownsApp(l[1]);
            else if (l[0] == 'sub')
                return this.ownsApp(l[1]);
        }

        ownsApp(appid: number): boolean {
            return this.userdata.rgOwnedApps.indexOf(appid) !== -1;
        }

        ownsPackage(packageid: number): boolean {
            return this.userdata.rgOwnedPackages.indexOf(packageid) !== -1;
        }

        ignores(link: string): boolean {
            var l = this.parseAppLink(link);

            if (l[0] == 'app')
                return this.ignoresApp(l[1]);
            else if (l[0] == 'sub')
                return this.ignoresPackage(l[1]);
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

        parseAppLink(url: string): any {
            var m = url.match(/\/(app|sub)\/(\d+)\//);

            if (!m)
                return false;

            return [m[1], parseInt(m[2])];
        }

        render(): void {
            if (!SGPP.storage.containsItem("steam_userdata") || !SGPP.storage.containsItem("steam_userdata_date") || SGPP.storage.getItem("steam_userdata_date") < (Date.now() - 12 * 60 * 60 * 1000)) {
                this.refreshGamesFromSteam();
            }

            if (SGPP.storage.containsItem("steam_userdata")) {
                this.userdata = SGPP.storage.getItem("steam_userdata");
            }

            if (SGPP.location.pageKind == 'giveaway') {
                var link = $('a.global__image-outer-wrap--game-large').first().attr('href');
                var owned = false;
                var ignored = false;
                var linkInfo = this.parseAppLink(link);

                if (linkInfo) {
                    owned = this.owns(link);
                    ignored = this.ignores(link);
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

            } else if (SGPP.location.pageKind == 'giveaways') {
                this.filterGames();

                SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                    this.filterGame(el);
                });
            }
        }

        filterGames(): void {
            $('.giveaway__row-outer-wrap').each((i, el) => {
                this.filterGame(el);
            });
        }

        filterGame(el: Element): void {
            var show = true;
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            var linkInfo = this.parseAppLink(link);

            show = !this.owns(link);

            if (show) {
                $el.show();
            } else {
                console.log('Hiding');
                console.log(linkInfo);
                $el.hide();
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