/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class MarkOwnedGames implements SteamGiftsModule {

        style = "#sidebar_sgpp_filters .filter_row { cursor: pointer; padding: 5px; }";

        private userdata = { rgWishlist: [], rgOwnedPackages: [], rgOwnedApps: [], rgPackagesInCart: [], rgAppsInCart: [], rgRecommendedTags: [], rgIgnoredApps: [], rgIgnoredPackages: [] };
        private blacklistData = { apps: [], subs: [] };

        private elFilterOwns: JQuery;
        private elFilterIgnored: JQuery;

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

        private _hideIgnored = false;

        get hideIgnored(): boolean {
            return this._hideIgnored;
        }

        set hideIgnored(v: boolean) {
            this._hideIgnored = v;

            this.elFilterIgnored.find('span').toggleClass('fa-square-o', !v).toggleClass('fa-check-square', v);

            SGPP.storage.setItem("games_filter_ignored", v);

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

        blacklisted(link: string): boolean {
            var l = this.parseAppLink(link);

            if (l[0] == 'app')
                return this.blacklistedApp(l[1]);
            else if (l[0] == 'sub')
                return this.blacklistedSub(l[1]);
        }


        blacklistedApp(appid: number): boolean {
            return this.blacklistData.apps.indexOf(appid) !== -1;
        }

        blacklistedSub(packageid: number): boolean {
            return this.blacklistData.subs.indexOf(packageid) !== -1;
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

            if (!SGPP.storage.containsItem("blacklist_data") || !SGPP.storage.containsItem("blacklist_date") || SGPP.storage.getItem("blacklist_date") < (Date.now() - 12 * 60 * 60 * 1000)) {
                this.refreshBlacklistFromSG();
            }

            if (SGPP.storage.containsItem("steam_userdata")) {
                this.userdata = SGPP.storage.getItem("steam_userdata");
            }

            if (SGPP.storage.containsItem("steam_userdata")) {
                this.blacklistData = SGPP.storage.getItem("blacklist_data");
            }

            if (SGPP.location.pageKind == 'giveaway') {
                var link = $('a.global__image-outer-wrap--game-large').first().attr('href');
                var owned = false;
                var ignored = false;
                var blacklisted = false;
                var linkInfo = this.parseAppLink(link);

                if (linkInfo) {
                    owned = this.owns(link);
                    ignored = this.ignores(link);
                    blacklisted = this.blacklisted(link);
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

                if (blacklisted) {
                    if ($('.sidebar__entry-insert').length != 0) {
                        $('.sidebar__entry-insert').before('<div class="sidebar__ignored sidebar__error"><i class="fa fa-exclamation-circle"></i> Game Hidden</div>');
                        $('.sidebar__entry-insert').hide();
                    }
                }

                $('.sidebar__ignored').click(() => { $('.sidebar__entry-insert').show(); $('.sidebar__ignored').hide(); });

            } else if (SGPP.location.pageKind == 'giveaways') {
                this.filterGames();

                $('.sidebar__search-container').after('<div id="sidebar_sgpp_filters"></div>');

                this.elFilterOwns = $('<div class="filter_row"><span class="fa fa-square-o"></span> Hide Owned</div>');
                this.elFilterOwns.click(() => {
                    this.hideOwned = !this.hideOwned;
                });

                this.elFilterIgnored = $('<div class="filter_row"><span class="fa fa-square-o"></span> Hide Not Interested</div>');
                this.elFilterIgnored.click(() => {
                    this.hideIgnored = !this.hideIgnored;
                });

                $('#sidebar_sgpp_filters').append(this.elFilterOwns);
                $('#sidebar_sgpp_filters').append(this.elFilterIgnored);

                this.hideOwned = SGPP.storage.getItem("games_filter_owned", true);
                this.hideIgnored = SGPP.storage.getItem("games_filter_ignored", true);

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
            var hide = false;
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            var linkInfo = this.parseAppLink(link);

            if (this.hideOwned && this.owns(link))
                hide = true;

            if (this.hideIgnored && this.ignores(link))
                hide = true;

            if (!hide) {
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

        loadBlacklistPage(page: number, callback, blacklistData): void {

            $.get("http://www.steamgifts.com/account/settings/giveaways/filters/search?page=" + page,(data) => {

                var dom = $($.parseHTML(data));

                $(dom).find('.table__rows').children().each((i, el) => {
                    console.log(el);

                    var $el = $(el);

                    var link = $el.find('a.table__column__secondary-link');

                    if (!link.length)
                        return;

                    var a = this.parseAppLink(link.attr('href'));

                    if (a) {
                        if (a[0] == 'app')
                            blacklistData.apps.push(a[1]);
                        else if (a[0] == 'sub')
                            blacklistData.subs.push(a[1]);
                    }
                });

                var elLastPage = dom.find('.pagination a').last();

                if (elLastPage.length && page < parseInt(elLastPage.data('page-number')))
                    this.loadBlacklistPage(page + 1, callback, blacklistData);
                else
                    callback(blacklistData);

            });
        }

        refreshBlacklistFromSG(): void {
            var data = { apps: [], subs: [] };
            this.loadBlacklistPage(1,(blacklist) => {

                SGPP.storage.setItem("blacklist_data", blacklist);
                SGPP.storage.setItem("blacklist_date", Date.now());
            }, data);
        }

        name(): string {
            return "Filter Owned Games";
        }

    }
}