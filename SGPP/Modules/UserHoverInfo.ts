/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class UserHoverInfo implements SteamGiftsModule {

        style = '.SGPP_UserInfo_balloon {position: absolute; border: solid 2px black; z-index: 99; min-width: 200px; border-radius: 3px; min-height: 100px; background-color: inherit}\n' +
            '.SGPP_UserInfo_balloon:after {position: absolute; right: 100%; top: 5px; content: ""; height: 0; width: 0; border-style: solid; border-color: transparent black; border-width: 15px 20px 15px 0px}\n' +
            '.SGPP_UserInfo_balloon.right:after {right: -20px; border-width: 15px 0 15px 20px}\n' +

            '.SGPP_UserInfo_balloon .featured__outer-wrap.featured__outer-wrap--user {width: auto; padding: 15px 0}\n' +
            '.SGPP_UserInfo_balloon .featured__heading i {font-size: inherit}\n' +
            
            // smaller table
            '.SGPP_UserInfo_balloon .featured__table__column {width: 175px}\n' +
            '.SGPP_UserInfo_balloon .featured__table .featured__table__row {padding: 5px 0px}\n' +
            '.SGPP_UserInfo_balloon .featured__table__column:not(:first-child) {margin-left: 15px}\n' +
            
            // avatar
            '.SGPP_UserInfo_balloon .featured__outer-wrap .global__image-outer-wrap {float: left; margin: 10px 7px 0px 0px; padding: 2px; width: 48px; height: 48px}\n' +
            '.SGPP_UserInfo_balloon .SGPP_UserOnline {background: linear-gradient(to bottom, #8FB93B 5%, #6E8C31 95%) repeat scroll 0% 0% transparent}\n' +
            '.SGPP_UserInfo_balloon .SGPP_UserOffline {background: linear-gradient(to bottom, rgba(106, 106, 106, 0.45) 5%, rgba(85, 85, 85, 1) 95%) repeat scroll 0% 0% transparent}\n' +
            
            // buttons
            '.SGPP_UserInfo_balloon .sidebar__shortcut-inner-wrap {width: 130px; color: rgba(255, 255, 255, 0.4)}\n' +
            '.SGPP_UserInfo_balloon .sidebar__shortcut-inner-wrap > * {line-height: 10px; text-shadow: none; background: none; border: none}\n' +
            '.SGPP_UserInfo_balloon .sidebar__shortcut-inner-wrap > :not(.is-disabled):hover {background: none}\n' +
            '.SGPP_UserInfo_balloon .sidebar__shortcut-inner-wrap > :not(.is-disabled):active {box-shadow: none; position: relative; top: 1px; background: none; text-shadow: none}\n' +
            '';

        init(): void {
        }

        render(): void {
            function generateBalloonInfo(page) {
                var userHeader = $('.featured__outer-wrap.featured__outer-wrap--user', page);
                var tableCells = $('.featured__table__row', userHeader);
                var username = $('.featured__heading', userHeader).css('display', 'block');

                // move avatar
                var avatar = $('.global__image-outer-wrap', userHeader).prependTo(username);

                // add color to represent online status
                var status = tableCells.eq(1).children().last().text().trim();
                if (status.toLowerCase().indexOf('online') > -1)
                    avatar.attr('title', status).addClass('SGPP_UserOnline');
                else
                    avatar.attr('title', 'Online ' + status).addClass('SGPP_UserOffline');
                tableCells.eq(1).remove();

                // move CV bar
                var cv = tableCells.last().children().last();
                cv[0].title = 'Contributor Value: ' + $('span', cv)[0].title;
                $('span', cv).removeAttr('title');
                cv.appendTo(username);
                tableCells.last().remove();

                // add sidebar buttons
                $('.sidebar__shortcut-inner-wrap', page).insertAfter(cv);

                return userHeader;
            }

            var bubble = $(document.createElement('div'))
                .attr('id', 'SGPP_UserInfo_balloon')
                .addClass('SGPP_UserInfo_balloon')
                .appendTo('body').hide();

            var cacheDiv = $(document.createElement('div'))
                .attr('id', 'SGPP_UserInfo_cache')
                .appendTo('body').hide();

            var cacheList = {};

            var loading = $(document.createElement('div'))
                .css('color', 'black')
                .append(
                    $(document.createElement('i'))
                    .addClass('fa fa-refresh fa-spin fa-4x')
                    .css({
                        margin: '30px 80px',
                        fontSize: '4em', // damn it, cg, fix your css!
                        color: "#6B7A8C"
                    })
            );

            bubble.append(loading);

            var delayedBubble = {
                timeout: null,
                run: function(url, style, right) {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(function() {
                        bubble.css(style);
                        bubble.children().appendTo(cacheDiv);
                        if (right) {
                            bubble.addClass('right');
                        } else {
                            bubble.removeClass('right');
                        }
                        var username = url.match(/\/user\/(.+?)(?:\/|$)/)[1];
                        if (username !== undefined && username in cacheList) {
                            bubble.append(cacheList[username]).stop(true).show();
                        } else {
                            bubble.append(loading).stop(true).show();
                            $.ajax({
                                url: url,
                                type: 'GET',
                                dataType: 'html',
                                success: function(html) {
                                    var info = generateBalloonInfo(html).data('user', username);
                                    cacheList[username] = info;
                                    bubble.children().appendTo(cacheDiv);
                                    bubble.append(info);
                                }
                            });
                        }
                    }, 1500);
                },
                close: function() {
                    clearTimeout(this.timeout);
                    bubble.stop(true).delay(500).fadeOut('slow');
                }
            };

            $('a[href^="/user/"]:not(.nav__avatar-outer-wrap)').hover(function(e) {
                var $el = $(e.target);
                
                if ($el.attr('href').split('/').length > 3 || $el.prop('href') == document.URL)
                    return;

                var pos = $el.offset();
                var style;
                var winWidth = $(window).width();
                var right = e.target.getBoundingClientRect().left > winWidth / 2;
                if (right) {
                    style = {
                        top: pos.top + ($el.height() / 2) - 25,
                        right: winWidth - pos.left + 20,
                        left: ''
                    };
                } else {
                    style = {
                        top: pos.top + ($el.height() / 2) - 25,
                        left: pos.left + $el.width() + 20,
                        right: ''
                    };
                }

                delayedBubble.run($el.attr('href'), style, right);

            }, function() {
                delayedBubble.close();
            });

            bubble.hover(function() {
                bubble.stop(true).fadeIn('fast');
            }, function() {
                delayedBubble.close();
            });
        }

        name(): string {
            return "UserHoverInfo";
        }

        shouldRun = (location: SGLocation) => true;
    }

}