/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition{

    export class ScrollingSidebar implements SteamGiftsModule {

        style = "";

        init(): void {
           
        }

        render(): void {
            $('.sidebar').wrapInner($(document.createElement('div')).addClass('inner__sidebar').css('min-width', '206px'));
            var $sidebar = $('.inner__sidebar');
            var $window = $(window);
            var $footer = $('.footer__outer-wrap');

            $(document).scroll(function(){
                if($window.scrollTop() + $sidebar.height()  >= $footer.position().top){
                    $sidebar.css('position', 'fixed');
                    $sidebar.css('top', '');
                    $sidebar.css('bottom', '69px');
                    console.log('footer');
                } else {
                if($window.scrollTop() <= ($('.featured__container').height() + 39)){
                    $sidebar.css('position', 'absolute');
                    $sidebar.css('top', '');
                    $sidebar.css('bottom', '');
                    console.log('top');
                }
                    else {
                        $sidebar.css('position', 'fixed');
                        $sidebar.css('top', '25px');
                        $sidebar.css('bottom', '');
                        console.log('moving');
                    }
                }
            });
        }

        name(): string {
            return "ScrollingSidebar";
        }

        shouldRun = (location: SGLocation) => true;
    }

} 