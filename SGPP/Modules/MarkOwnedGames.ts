/// <reference path="../ModuleDefinition.ts" /> 

module ModuleDefinition {

    export class HideIgnored implements GiveawayFilter {

        id = "HideIgnored";

        private element;

        private settings = {
            hide: false,
        };

        private module: MarkOwnedGames;

        constructor(module: MarkOwnedGames) {
            this.module = module;
        }

        public renderControl(el: Element): void {
            var $el = $(el);

            this.element = $('<div class="filter_row"><span class="fa fa-square-o"></span> Hide Not Interested</div>');
            this.element.click(() => {
                this.settings.hide = !this.settings.hide;
                this.updateElement();
                $(this).trigger('filterChanged', [this.settings]);
            });

            this.updateElement();
            $el.append(this.element);
        }

        private updateElement() {
            if (this.element)
                this.element.find('span').toggleClass('fa-square-o', !this.settings.hide).toggleClass('fa-check-square', this.settings.hide);
        }

        public shouldHide(el: Element) {
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            var linkInfo = this.module.parseAppLink(link);

            return this.settings.hide && this.module.ignores(link);
        }

        public setState(state): void {
            this.settings = state;
            this.updateElement();
        }
    }

    export class HideOwned implements GiveawayFilter {

        id = "HideOwned";

        private element;

        private settings = {
            hide: false,
        };

        private module: MarkOwnedGames;

        constructor(module: MarkOwnedGames) {
            this.module = module;
        }

        public renderControl(el: Element): void {
            var $el = $(el);

            this.element = $('<div class="filter_row"><span class="fa fa-square-o"></span> Hide Owned</div>');
            this.element.click(() => {
                this.settings.hide = !this.settings.hide;
                this.updateElement();
                $(this).trigger('filterChanged', [this.settings]);
            });

            this.updateElement();
            $el.append(this.element);
        }

        private updateElement() {
            if (this.element)
                this.element.find('span').toggleClass('fa-square-o', !this.settings.hide).toggleClass('fa-check-square', this.settings.hide);
        }

        public shouldHide(el: Element) {
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            var linkInfo = this.module.parseAppLink(link);

            return this.settings.hide && this.module.owns(link);
        }

        public setState(state): void {
            this.settings = state;
            this.updateElement();
        }
    }

    export class MarkOwnedGames implements SteamGiftsModule {

        style = "";

        private userdata = { rgWishlist: [], rgOwnedPackages: [], rgOwnedApps: [], rgPackagesInCart: [], rgAppsInCart: [], rgRecommendedTags: [], rgIgnoredApps: [], rgIgnoredPackages: [] };
        private blacklistData = { apps: [], subs: [] };

        private elFilterOwns: JQuery;
        private elFilterIgnored: JQuery;
        private elFilterEntered: JQuery;

        shouldRun(): boolean {
            return true;
        }

        init(): void {
            SGPP.addGiveawayFilter(new HideIgnored(this));
            SGPP.addGiveawayFilter(new HideOwned(this));
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
            return "Filter Games";
        }

    }
}