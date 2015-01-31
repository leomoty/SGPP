/// <reference path="moduledefinition.ts" />

module ModuleDefinition{

    export class FixedNavbar implements SteamGiftsModule {

        init(): void {
            $('head').append("<style> \
			                    .body { margin-top: 39px;} \
			                    .navbar_fixed { padding: 0 25px;} \
			                    .header { \
			                        position: fixed; \
			                        top: 0; \
			                        width: 100%; \
			                        z-index: 100 \
			                    } \
                            </style>");
        }

        render(): void {
            $('header').addClass('header');
            $('body').addClass('body');
            var nav = $('header').html();
            $('nav').remove();
            $('header').html('<div class="navbar_fixed"></div>');
            $('.navbar_fixed').html(nav);
            $('nav .nav__button--is-dropdown-arrow').click(function () {
                var active = $(this).hasClass('is-selected');
                $('nav .nav__button').removeClass('is-selected');
                $('nav .nav__relative-dropdown').addClass('is-hidden');
                if (!active) $(this).addClass('is-selected').siblings('.nav__relative-dropdown').removeClass('is-hidden');
                return false;
            }).attr('unselectable', 'on').bind('selectstart', function () { return false; });
        }

        name(): string {
            return "FixedNavbar";
        }
    }

} 