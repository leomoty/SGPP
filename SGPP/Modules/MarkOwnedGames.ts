/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class MarkOwnedGames implements SteamGiftsModule {

        style = "";

        private userdata = { rgWishlist: [], rgOwnedPackages: [], rgOwnedApps: [], rgPackagesInCart: [], rgAppsInCart: [], rgRecommendedTags: [], rgIgnoredApps: [], rgIgnoredPackages: [] };

        private elFilterOwns: JQuery;

        shouldRun(): boolean {
            return true;
        }

        init(): void {
        }

        private _hideOwned = false;

        get hideOwned(): boolean {
            return this._hideOwned;
        }

        set hideOwned(v: boolean) {
            this._hideOwned = v;

            this.elFilterOwns.find('span').toggleClass('fa-square-o', !v).toggleClass('fa-check-square', v);

            SGPP.storage.setItem("games_filter_owned", v);

            this.filterGames();
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
                        $('.sidebar__entry-insert').before('<div class="sidebar__ignored sidebar__error"><i class="fa fa-exclamation-circle"></i> Owned in Steam</div>');
                        $('.sidebar__entry-insert').hide();
                    }
                }

                if (ignored) {
                    if ($('.sidebar__entry-insert').length != 0) {
                        $('.sidebar__entry-insert').before('<div class="sidebar__ignored sidebar__error"><i class="fa fa-exclamation-circle"></i> Not Interested</div>');
                        $('.sidebar__entry-insert').hide();
                    }
                }

                $('.sidebar__ignored').click(() => { $('.sidebar__entry-insert').show(); $('.sidebar__ignored').hide(); });

            } else if (SGPP.location.pageKind == 'giveaways') {
                this.filterGames();

                $('.sidebar__search-container').after('<div id="sidebar_sgpp_filters"></div>');

                this.elFilterOwns = $('<div><span class="fa fa-square-o"></span> Hide Owned</div>');
                this.elFilterOwns.click(() => {
                    this.hideOwned = !this.hideOwned;
                });

                $('#sidebar_sgpp_filters').append(this.elFilterOwns);

                this.hideOwned = SGPP.storage.getItem("games_filter_owned", true);

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

            show = show && (!this.hideOwned || !this.owns(link));

            if (show) {
                $el.show();
            } else {
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
            return "Filter Owned Games";
        }

    }
}