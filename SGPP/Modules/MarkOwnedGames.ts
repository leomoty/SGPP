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

            this.element = $('<span><span class="fa fa-square-o"></span> <span class="filter-name">Hide Not Interested</span></span>');
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
                this.element.find('span.fa').toggleClass('fa-square-o', !this.settings.hide).toggleClass('fa-check-square', this.settings.hide);
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

            this.element = $('<span><span class="fa fa-square-o"></span> <span class="filter-name">Hide Owned</span></span>');
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
                this.element.find('span.fa').toggleClass('fa-square-o', !this.settings.hide).toggleClass('fa-check-square', this.settings.hide);
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

    export class HighlightWishlist implements GiveawayFilter {

        id = "HighlightWishlist";

        private element;

        private settings = {
            highlight: false,
        };

        private module: MarkOwnedGames;

        constructor(module: MarkOwnedGames) {
            this.module = module;
        }

        public renderControl(el: Element): void {
            var $el = $(el);

            this.element = $('<span><span class="fa fa-square-o"></span> <span class="filter-name">Show only wishlisted</span></span>');
            this.element.click(() => {
                this.settings.highlight = !this.settings.highlight;
                this.updateElement();
                $(this).trigger('filterChanged', [this.settings]);
            });

            this.updateElement();
            $el.append(this.element);
        }

        private updateElement() {
            if (this.element)
                this.element.find('span.fa').toggleClass('fa-square-o', !this.settings.highlight).toggleClass('fa-check-square', this.settings.highlight);
        }

        public shouldHide(el: Element) {
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            return this.settings.highlight && !this.module.wishlisted(link, false);
        }

        public setState(state): void {
            this.settings = state;
            this.updateElement();
        }
    }

    export class MarkOwnedGames implements SteamGiftsModule {

        style = ".wishlisted-giveaway .giveaway__heading__name, .wishlisted-giveaway .featured__heading__medium { background: url(\"data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/ IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8 + IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTM3OEVDNTUyMUM0MTFFNDgxN0ZEN0MzNjYzNzcxOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTM3OEVDNTYyMUM0MTFFNDgxN0ZEN0MzNjYzNzcxOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMzc4RUM1MzIxQzQxMUU0ODE3RkQ3QzM2NjM3NzE5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMzc4RUM1NDIxQzQxMUU0ODE3RkQ3QzM2NjM3NzE5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI / Ps9jzFQAAACPSURBVHjaYvz//z+DkJDQdQYGhpsMCMAKxMZAHPXu3bt9cFGQYkFBwQ0gGoaBfAEgzgfibUDsBxNnYsAOfgKxJBBvAeIZMEEWZBVA52xA5gOdUAEUc8NQDBTkBEoGMOAByCYLAjUsRzM5AKtioMQzIEW0ydjcHIBTMSE3M0Ij5RKQfQ6HGiOgIXogBkCAAQDGVT+0v+n6EQAAAABJRU5ErkJggg==\") no-repeat scroll 2px center; padding-left: 15px; }";

        private userdata = { rgWishlist: [], rgOwnedPackages: [], rgOwnedApps: [], rgPackagesInCart: [], rgAppsInCart: [], rgRecommendedTags: [], rgIgnoredApps: [], rgIgnoredPackages: [] };
        private blacklistData = { apps: [], subs: [] };

        shouldRun(): boolean {
            return true;
        }

        init(): void {
            SGPP.addGiveawayFilter(new HideIgnored(this));
            SGPP.addGiveawayFilter(new HideOwned(this));
            SGPP.addGiveawayFilter(new HighlightWishlist(this));

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

            if (!l)
                return false;

            if (l[0] == 'app')
                return this.ignoresApp(l[1]);
            else if (l[0] == 'sub')
                return this.ignoresPackage(l[1]);
        }

        blacklisted(link: string): boolean {
            var l = this.parseAppLink(link);

            if (!l)
                return false;

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

        wishlisted(link: string, ignore_packages: boolean = true): boolean {
            var l = this.parseAppLink(link);

            if (!l)
                return false;

            if (l[0] == 'app')
                return this.isWishlisted(l[1]);
            else if (l[0] == 'sub')
                return !ignore_packages;
        }

        isWishlisted(appid: number): boolean {
            return this.userdata.rgWishlist.indexOf(appid) !== -1;
        }

        parseAppLink(url: string): any {
            if (!url)
                return false;

            var m = url.match(/\/(app|sub)\/(\d+)\//);

            if (!m)
                return false;

            return [m[1], parseInt(m[2])];
        }

        render(): void {
            if (SGPP.location.pageKind == 'giveaway') {
                var link = $('a.global__image-outer-wrap--game-large').first().attr('href');
                var owned = false;
                var ignored = false;
                var blacklisted = false;
                var wishlisted = false;
                var linkInfo = this.parseAppLink(link);

                if (linkInfo) {
                    owned = this.owns(link);
                    ignored = this.ignores(link);
                    blacklisted = this.blacklisted(link);
                    wishlisted = this.wishlisted(link);
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

                if (wishlisted) {
                    $('div.featured__summary').addClass('wishlisted-giveaway');
                }

                $('.sidebar__ignored').click(() => { $('.sidebar__entry-insert').show(); $('.sidebar__ignored').hide(); });

            } else if (SGPP.location.pageKind == 'giveaways') {
                this.markGames();

                SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                    this.markGame(el);
                });
            }
        }

        markGames(): void {
            $('.giveaway__row-outer-wrap').each((i, el) => {
                this.markGame(el);
            });
        }

        markGame(el: Element): void {
            var hide = false;
            var $el = $(el);

            var link = $el.find('a.giveaway__icon').attr('href');

            $el.toggleClass('wishlisted-giveaway', this.wishlisted(link));
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