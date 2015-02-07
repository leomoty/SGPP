/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    function calculateWinChance(copies, entries) : any {
        var res = (+(parseFloat(copies) / parseFloat(entries)) * 100);
        return Math.min(res, 100).toFixed(2);
    }
    
    export class GridView implements SteamGiftsModule {

        style = "";

        init(): void {
            $('head').append("<style>\
                                .gridview_flex{display:flex;flex-wrap:wrap;justify-content:center;margin: 0 -5px;}\
                                .preview{box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;background-color:rgba(255,255,255,1);border:1px solid #cbcfdb;padding:5px; z-index:10;}\
                                .tile_view_header{min-height:35px;margin-top:5px;font-size:12px}\
                                .tile_view_avatar_outer{float: right;display: inline-block; margin-left:5px}\
                                .tile_view_avatar{height: 24px;width: 24px;padding: 2px}\
                                .tile_view_faded{width: 184px; height: 69px; margin-top:-69px; background-color:#fff; opacity: .75 }\
                            </style>");
        }

        render(): void {
            var content = this.generateGridview($('.pagination').prev());

            $($('.page__heading').next()[0]).html(content);
        }

        name(): string {
            return "GridView";
        }

        generateGridview(root: any): any {
            var container = document.createElement('div');
            $(container).addClass('gridview_flex');
            $(root).find('.giveaway__row-outer-wrap').css('margin', '5px');
            $(root).find('.giveaway__row-inner-wrap').each(function () {
                if ($(this).parents('.pinned-giveaways').length != 0) return;
                var eachDiv = document.createElement('div');
                $(this).children('.global__image-outer-wrap--game-medium').removeClass('global__image-outer-wrap--missing-image').children().first().wrapInner(document.createElement('div')).addClass('global__image-outer-wrap--missing-image');
                $(eachDiv).append($(this).find('.global__image-outer-wrap--game-medium'));
                $(eachDiv).css('margin', '5px');

                var gridview_extra = $('<div class="gridview_extra is-hidden preview" style="position:absolute; width:184px;margin-left:-5.8px; border-top: thick #ffffff;"></div>');
                var giveawayName = $(this).find('.giveaway__heading__name').text();
                var avatar = $(this).find('.global__image-outer-wrap--avatar-small');
                avatar.addClass('tile_view_avatar');

                var copies = "0";
                var cost = "0";
                if ($(this).find('.giveaway__heading__thin').length == 1) {
                    cost = $(this).find('.giveaway__heading__thin').text().replace("(", "").replace(")", "");
                    copies = "1";
                }
                else {
                    cost = $(this).find('.giveaway__heading__thin:nth(1)').text().replace("(", "").replace(")", "");
                    copies = $(this).find('.giveaway__heading__thin:nth(0)').text().replace("(", "").replace("Copies)", "");
                }

                var timeLeft = $(this).find('.fa-clock-o').next().text();
                var timeSplit = timeLeft.split(" ");
                var entries = $(this).find('.fa-tag').next().text();
                var entriesSplit = entries.split(" ");
                var comments = $(this).find('.fa-comment').next().text();
                var commentsSplit = comments.split(" ");

                var winChance = calculateWinChance(copies, entries.replace(",",""));
                
                if ($(this).hasClass('is-faded'))
                    $(eachDiv).children().first().append('<div class="tile_view_faded"></div>');

                gridview_extra.append('<div class="giveaway__heading__name tile_view_header">' + giveawayName + '</div>');
                gridview_extra.append('<div class="tile_view_avatar_outer">' + avatar[0].outerHTML + '</div>');
                gridview_extra.append('<div style="float:left;"><strong>' + copies + '</strong> Copies</div>');
                gridview_extra.append('<div style="float:right;"><strong>' + cost + '</strong></div>');
                gridview_extra.append('<div style="clear:both;"></div>');
                if (timeSplit[0] === "Ended")
                    gridview_extra.append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong></div>');
                else
                    gridview_extra.append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong> ' + timeSplit[1] + '</div>');
                gridview_extra.append('<div style="clear:both;"></div>');
                gridview_extra.append('<div style="float:left;"><strong>' + entriesSplit[0] + '</strong> Entries</div>');
                gridview_extra.append('<div style="float:right;"><strong>' + winChance + '</strong>% Chance</div>');
                gridview_extra.append('<div style="clear:both;"></div>');
                gridview_extra.append('<div><strong>' + commentsSplit[0] + '</strong> Comments</div>');
                $(eachDiv).children().first().append(gridview_extra);
                $(container).append(eachDiv);
            });
            $(container).append($('<div style="margin-top: 5px; margin-bottom: 20px;width: 0px;height: 69px;"></div>')); //tricks browser in case of last line only having 1 giveaway
            $(container).find('.global__image-outer-wrap--game-medium').hover(
                function () {
                    $(this).find('.gridview_extra').removeClass('is-hidden');
                },
                function () {
                    $(this).find('.gridview_extra').addClass('is-hidden');
                });
            return container;
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways' && ['created', 'entered', 'won'].indexOf(location.subpage) == -1;

    }

}