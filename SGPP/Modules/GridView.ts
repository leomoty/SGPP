/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class GridView implements SteamGiftsModule {

        name(): string {
            return "GridView";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways' && ['created', 'entered', 'won'].indexOf(location.subpage) == -1;

        style = ".SGPP__gridView {display: flex; flex-wrap: wrap; justify-content: space-around; margin: 5px;}\n" +
			".tile_view_header {font-size: 12px; border-bottom: 1px solid #D2D6E0; box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.3); margin-bottom: 3px; text-align: center}\n" +
			".SGPP__gridAvatar_outer {float: right; display: inline-block; margin-left: 5px}\n" +
			".SGPP__gridAvatar {height: 27px; width: 27px}\n" +
			".SGPP__gridTile {margin: 5px}\n" +
			".SGPP__gridTile:not(:hover) .SGPP__gridTileTime {display: none}\n" +
			".SGPP__gridTile:hover {opacity: 1}\n" +
			".SGPP__gridTile:hover > .giveaway_image_thumbnail, .SGPP__gridTile:hover > .giveaway_image_thumbnail_missing {border-radius: 2px 2px 0 0}\n" +
			".SGPP__gridTile:hover > .SGPP__gridTileInfo {display: block; border-radius: 0 0 2px 2px}\n" +
			".SGPP__gridTileInfo {display: none; position:absolute; width:174px; border-width: 1px 0 0 0; border-top: 1px dotted #d2d6e0; z-index: 10}\n" +
			".SGPP__gridTileInfo .giveaway__icon {opacity: 0.7}\n" +
			".SGPP__gridTileTime {position: absolute; bottom: 0; left: 0; height: 16px; text-align: center; background-color: #FFF; border-radius: 0 3px 0 0; padding: 2px 4px}\n" +
			".SGPP__gridTileTime i {font-size: inherit; color:inherit}\n" +
			".SGPP__gridTileIcons {position: absolute; bottom: 0; right: 0}\n" +
			".SGPP__gridTileIcons > * {display: inline-block; width: 20px; height: 16px; text-align: center; padding: 2px; border-radius: 3px 0 0; vertical-align: middle}\n" +
			".SGPP__gridTileIcons > :not(:last-child) {padding-right: 4px; margin-right: -3px}\n" +
			".SGPP__gridTileIcons i {font-size: inherit; color: inherit}\n" +
			"";

        init = () => {

        }

        render = () => {
            var esg = $('.pagination').prev();

            SGPP.on("EndlessScrollGiveaways", "afterAddItems",(event: JQueryEventObject, pageContainer: JQuery, page: number, isReload: boolean) => {
                this.updateGridview(pageContainer);
            });

            SGPP.on("GiveawaysFilter", "gameFiltered", (event: JQueryEventObject, el: Element, visible: boolean) => {
                var $grid = $("#" + $(el).data('gridview'));

                $grid.toggleClass('giveaway-filtered', visible);
            });

            this.updateGridview(esg);

            esg.find(".giveaway__hide").click(function () {

                var $el = $(this);

                setTimeout(function () {
                    $(".popup--hide-games input[name=game_id]").val($el.parents('[data-game-id]').attr("data-game-id"));
                    $(".popup--hide-games .popup__heading__bold").text($el.closest("h2").find(".giveaway__heading__name").text())
                }, 100);
            });
        }

        private gridID = 0;

        getNextGridID = () => {
            this.gridID++;

            return 'sgpp_gridview_' + this.gridID;
        }

        updateGridview = (esg) => {
            var giveawaysList = esg.children('.giveaway__row-outer-wrap');
            if (!giveawaysList.length)
                return;

            $(giveawaysList).hide();

            var gridview = this.generateGridview(giveawaysList);
            esg.append(gridview);
        }

        generateGridview = (root: JQuery) => {
            function calcWinChance(copies: number, entries: number) : string {
                var chance = +(copies / entries) * 100;
                return chance < 0.01 ? '<0.01' : Math.min(chance, 100).toFixed(2);
            }

            // helping functions
            var strong = (txt) => '<strong>' + txt + '</strong>';
            var floatLeft = (el) => $('<div>', {style: 'float: left', append: el});
            var floatRight = (el) => $('<div>', {style: 'float: right', append: el});

            // containers
            var gridPage = $('<div>', {'class': 'SGPP__gridView'});
            var gridTile = $('<div>', {'class': 'SGPP__gridTile'});
            var tileInfo = $('<h2>', {'class': 'SGPP__gridTileInfo global__image-outer-wrap'});
            var tileIcns = $('<div>', {'class': 'SGPP__gridTileIcons'});

            root.find('.giveaway__row-inner-wrap').each((index: number, el: Element) => {
                var $el = $(el);
                if ($el.parents('.pinned-giveaways').length != 0)
                    return;

                var id = this.getNextGridID();

                $el.parent().attr('data-gridview', id);

                var thisTile = gridTile.clone().toggleClass('is-faded', $el.hasClass('is-faded')).toggleClass('giveaway-filtered', $el.parent().hasClass('giveaway-filtered'));

                thisTile.attr('id', id);
                thisTile.attr('data-game-id', $el.parent().attr('data-game-id'));

                var gameImg = $el.children('.giveaway_image_thumbnail, .giveaway_image_thumbnail_missing').appendTo(thisTile).css('position', 'relative');

                var gaColumns = $el.find('.giveaway__columns').children();
                var timeLeft = gaColumns.eq(0).addClass('SGPP__gridTileTime').appendTo(gameImg);
                timeLeft.find('span').text((i, txt) => txt.match(/\d+(?:\s+)./)[0].replace(' ', ''))
                var icons = gaColumns.slice(2);
                if (icons.length > 0) {
                    icons.filter('.giveaway__column--contributor-level').text((i, txt) => txt.replace('Level ', ''));
                    tileIcns.clone().append(icons).appendTo(gameImg);
                }

                var giveawayName = $el.find('.giveaway__heading__name').text();
                var avatar = $el.find('.giveaway_image_avatar').addClass('SGPP__gridAvatar');

                var thinText = $el.find('.giveaway__heading__thin').toArray();
                var cost = parseInt(thinText.pop().textContent.replace(/\D+/g, ""));
                var copies = thinText.length == 0 ? 1 : parseInt(thinText.pop().textContent.replace(/\D+/g, ""));

                var gaLinks = $el.find('.giveaway__links').children();
                var entries = parseInt(gaLinks.eq(0).text().replace(/\D+/g, ""));
                var comments = parseInt(gaLinks.eq(1).text().replace(/\D+/g, ""));

                var winChance = calcWinChance(copies, entries);

                tileInfo.clone().append(
                    $('<div>', { text: giveawayName, 'class': 'giveaway__heading__name tile_view_header' }),
                    $('<div>', {'class': "SGPP__gridAvatar_outer", title: 'Created ' + gaColumns.eq(1).text(), append: avatar}),
                    $('<div>', {style: 'display: inline-block; width: 140px'}).append(
                        floatLeft(strong(copies) + (copies > 1 ? ' Copies' : ' Copy')),
                        floatRight(strong(cost + 'P')),
                        $('<div>', {style: 'clear: both'}),
                        floatLeft(strong(winChance + '%')).attr('title', 'Probability to win'),
                        floatRight($el.find('.giveaway__icon'))
                    ),
                    $('<div>', {style: 'clear: both'}),
                    floatLeft(strong(entries) + ' Entries'),
                    floatRight(strong(comments) + ' Comments')
                ).appendTo(thisTile);

                gridPage.append(thisTile);
            });
            return gridPage;
        }

    }

}
