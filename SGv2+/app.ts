/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery_bPopup.d.ts" />

/// <reference path="Core.ts" />
/// <reference path="ModuleDefinition.ts" />

/// <reference path="Modules/CommentAndEnter.ts" />
/// <reference path="Modules/EntryCommenters.ts" />
/// <reference path="Modules/FixedNavbar.ts" />
/// <reference path="Modules/FixedFooter.ts" />
/// <reference path="Modules/GridView.ts" />
/// <reference path="Modules/LivePreview.ts" />
/// <reference path="Modules/ScrollingSidebar.ts" />
/// <reference path="Modules/Settings.ts" />
/// <reference path="Modules/MarkComments.ts" />

/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussion.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussionReplies.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveawayComments.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveaways.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollMyGiveaways.ts" />

var SGPP: ModuleDefinition.Core = new ModuleDefinition.Core();

//list of available modules
var modulesNames: Array<string> = new Array<string>(
    "CommentAndEnter",
    "EntryCommenters",
    "FixedNavbar",
    "FixedFooter",
    "GridView",
    "ScrollingSidebar",
    "MarkComments",
    "EndlessScrollDiscussion",
    "EndlessScrollDiscussionReplies",
    "EndlessScrollGiveaways",
    "EndlessScrollMyGiveaways",
    "EndlessScrollGiveawayComments"
);

(function ($) {
    
    //load needed modules into module list
    for (var pos in modulesNames) {
        //Load next module
        var m: ModuleDefinition.SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();

        //Checks if the module is enabled in LocalStorage, rule of thumb, if it didn't exist before, it isn't.
        //Also checks should run for the current page
        if (SGPP.settings.isModuleEnabled(modulesNames[pos]) && m.shouldRun(SGPP.location))
            SGPP.modules[m.name()] = m; //Put module into module list
    }

    //load modules
    for (var module in SGPP.modules) {
        //append stylesheet for each module
        SGPP.log("Module " + m.name() + " append css.");
        SGPP.appendCSS(SGPP.modules[module].style);

        //init each module
        SGPP.log("Module " + m.name() + " init() call.");
        SGPP.modules[module].init();
    }

    //render each module once the DOM is loaded
    $(document).on("DOMContentLoaded", function () {
        SGPP.render(); //Render core first
        for (var module in SGPP.modules) {
            SGPP.log("Module " + module + " render() call.");
            SGPP.modules[module].render();
        }
    });


})(jQuery);