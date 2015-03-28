/// <reference path="../ModuleDefinition.ts" />

// == TO DO: ==
//
// - adjust css styles
// - add quick preview on config
// - remove tags on some places (?)


module ModuleDefinition{

    class UserTagConfig {
        private background = $('<div>', {'class': 'SGPP__tagModal_background'}).appendTo('body');
        private content = $('<div>', {'class': 'SGPP__tagModal popup'}).appendTo('body');
        private config: JQuery[] = [];
        private callback: (name: string, config: string[]) => any;
        private $name: JQuery;

        constructor(callback: (name: string, config: string[]) => any) {
            this.callback = callback;

            $('<i>', {'class': 'popup__icon fa fa-tag'}).appendTo(this.content);
            $('<p>', {'class': 'popup__heading', append: [
                'Edit custom tag for ',
                this.$name = $('<span>', {'class': 'popup__heading__bold'}),
                ':'
            ]}).appendTo(this.content)

            var container = $('<div>', {'class': 'SGPP__tagOptions'}).appendTo(this.content)

            var optionline = (optionName: string, inputType: string) => {
                var input = $('<input>', {type: inputType});
                this.config.push(input);
                return $('<div>').append($('<span>', {'class': 'form__heading__text', text: optionName}), input)
            }
            var options = [ ['Tag text', 'text'], ['Background color', 'color'], ['Text color', 'color'] ]
            for (var i=0; i < options.length; i++) {
                container.append(optionline(options[i][0], options[i][1]))
            }

            $('<div>', {'class': 'popup__actions'}).appendTo(this.content).append(
                $('<span>', {text: 'save', click: this.save}),
                $('<span>', {text: 'cancel', click: this.hide})
            )

            this.background.click(this.hide);
            this.hide();
        }

        update = (name: string, config: string[]) => {
            this.$name.text(name);
            for (var i=0; i < this.config.length; i++) {
                this.config[i].val(config[i])
            }
            return this;
        }

        show = () => {
            this.background.show();
            this.content.show();
            return this;
        }

        hide = () => {
            this.background.hide();
            this.content.hide();
            return this;
        }

        save = () => {
            var args = [];
            for (var i=0; i < this.config.length; i++)
                args.push(this.config[i].val());
            this.callback(this.$name.text(), args);
            return this.hide();
        }

    }


    export class UserTags implements SteamGiftsModule {
        tagConfigModal: UserTagConfig;
        usertagsCache: {[id: string]: string[]};

        style = '.SGPP__tagIcon {margin-left: 5px; transform: rotate(-45deg); opacity: 0.35; cursor: pointer; text-shadow: none}\n' +
            '.SGPP__tagIcon:hover {opacity: 0.7}\n' +
            '.comment__username--op .SGPP__tagIcon {color: #FFF}\n' +
            '.SGPP__userTag {display: inline-block; color: #465670; background-color: #FFF; font-weight: initial; text-shadow: none; padding: 0 4px; border-radius: 3px; border: 1px solid #D2D6E0; line-height: normal; margin-left: 5px; cursor: pointer}\n' +

            '.SGPP__tagModal_background {position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(60, 66, 77, 0.85); cursor: pointer; z-index: 9998}\n' +
            '.SGPP__tagModal {display: block; position: fixed; top: 50px; left: 50%; width: 300px; margin-left: -250px; z-index: 9999}\n' +
            '.SGPP__tagModal .popup__icon {width: 48px; text-indent: 5px}\n' +

            '.SGPP__tagOptions {margin-bottom: 15px}\n' +
            '.SGPP__tagOptions > div {display: flex; justify-content: space-between}\n' +
            '.SGPP__tagOptions > div > input {width: 125px; height: 30px;}\n' +
            '.SGPP__tagOptions > div :not(:first-child) { margin-top: 5px;}\n' +
            '.SGPP__tagOptions .popup__actions {margin-top: 15px}\n' +
            '.SGPP__tagOptions > div > span { line-height: 35px;}\n' +
            '.SGPP__tagOptions > div > input[type="color"] { padding: 3px 6px;}\n' +
            '';

        init(): void {}

        render = () => {
            this.tagConfigModal = new UserTagConfig(this.updateTags);

            var usersLinks = $('a[href^="/user/"]:not(.global__image-outer-wrap, .nav__avatar-outer-wrap)');
            this.usertagsCache = SGPP.storage.getItem('createdTags', {});
            usersLinks.each((i, el) => {
                var pathSplit = $(el).prop('pathname').split('/');
                var username = el.textContent.trim();

                if (pathSplit.length != 3 || pathSplit[2] != username)
                    return;
                else
                    this.createTag(username).insertAfter(el);
            });

            $('body').on('click', '.SGPP__tagIcon, .SGPP__userTag', (e) => {
                var name = $(e.target).siblings('a[href^="/user/"]').text();
                if (name in this.usertagsCache) {
                    var config = this.usertagsCache[name];
                } else {
                    var config = ['', '#FFFFFF', '#465670'];  // Default
                }
                this.tagConfigModal.update(name, config).show();
            })
        }

        name(): string {
            return "Custom Tags to Users";
        }

        shouldRun = (location: SGLocation) => ['about', 'sales', 'legal', 'roles'].indexOf(location.pageKind) < 0;

        private createTag = (username: string) => {
            if (username in this.usertagsCache) {
                var config = this.usertagsCache[username];
                return $('<div>', {
                    text: config[0],
                    'class': 'SGPP__userTag',
                    css: {backgroundColor: config[1], color: config[2]}
                });
            } else
                 return $('<i>', {'class': 'fa fa-tag SGPP__tagIcon'});
        }

        updateTags = (user: string, config: string[]) => {
            if (config[0] === '')
                delete this.usertagsCache[user];
            else
                this.usertagsCache[user] = config;
            SGPP.storage.setItem('createdTags', this.usertagsCache);

            console.log(1, user)
            $('a[href="/user/' + user + '"]').each((i, el) => {
                var tag = $(el).siblings('.SGPP__userTag, .SGPP__tagIcon');
                if (tag.length === 0)
                    return;
                else {
                    tag.remove();
                    this.createTag(user).insertAfter(el);
                }
            })
        }
    }

}