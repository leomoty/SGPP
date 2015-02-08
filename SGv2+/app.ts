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

/// <reference path="Modules/EndlessScroll/EndlessScrollMarkComments.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussion.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussionReplies.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveawayComments.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveaways.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollMyGiveaways.ts" />

var SGPP: ModuleDefinition.Core = new ModuleDefinition.Core();

(function ($) {
    
    //List of available modules
    var modulesNames: Array<string> = new Array<string>(
        "CommentAndEnter",
        "EntryCommenters",
        "FixedNavbar",
        "FixedFooter",
        "GridView",
        "ScrollingSidebar",
        "Settings",
        "EndlessScrollMarkComments",
        "EndlessScrollDiscussion",
        "EndlessScrollDiscussionReplies",
        "EndlessScrollGiveaways",
        "EndlessScrollMyGiveaways",
        "EndlessScrollGiveawayComments"
    );

    for (var pos in modulesNames) {
        //Load next module
        var m: ModuleDefinition.SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();

        //Locationcheck
        if (m.shouldRun(SGPP.location)) {
            //Put module into module list
            SGPP.modules[m.name()] = m;

            //Init module
            SGPP.log("Module " + m.name() + " init() call.");
            SGPP.modules[m.name()].init();
        }
    }

    $(document).on("DOMContentLoaded", function () {
        //Render each module once the DOM is loaded
        for (var module in SGPP.modules) {
            SGPP.log("Module " + module + " render() call.");
            SGPP.modules[module].render();
        }
    });


})(jQuery);