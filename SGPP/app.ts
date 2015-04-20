/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery_bpopup.d.ts" />
/// <reference path="Scripts/typings/greasemonkey/greasemonkey.d.ts" />


/// <reference path="Core.ts" />
/// <reference path="ModuleDefinition.ts" />

/// <reference path="Modules/GiveawaysFilter.ts" />

/// <reference path="Modules/CommentAndEnter.ts" />
/// <reference path="Modules/EntryCommenters.ts" />
/// <reference path="Modules/FixedNavbar.ts" />
/// <reference path="Modules/FixedFooter.ts" />
/// <reference path="Modules/GridView.ts" />
/// <reference path="Modules/LivePreview.ts" />
/// <reference path="Modules/ScrollingSidebar.ts" />
/// <reference path="Modules/Settings.ts" />
/// <reference path="Modules/UserHoverInfo.ts" />
/// <reference path="Modules/UserTags.ts" />
/// <reference path="Modules/MarkComments.ts" />
/// <reference path="Modules/MarkOwnedGames.ts" />
/// <reference path="Modules/MessagesFilterTest.ts" />
/// <reference path="Modules/PopupGiveaway.ts" />

/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussion.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollDiscussionReplies.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveawayComments.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollGiveaways.ts" />
/// <reference path="Modules/EndlessScroll/EndlessScrollLists.ts" />

var SGPP: ModuleDefinition.Core = new ModuleDefinition.Core();

//list of available modules
var modulesNames: Array<string> = new Array<string>(
    "GiveawaysFilter", // Needs to be before any modules containing giveaway filters
    "CommentAndEnter",
    "EntryCommenters",
    "FixedNavbar",
    "FixedFooter",
    "GridView",
    "ScrollingSidebar",
    "UserHoverInfo",
    "UserTags",
    "MarkComments",
    "MarkOwnedGames",
    "MessagesFilterTest",
    "PopupGiveaway",
    "EndlessScrollDiscussion",
    "EndlessScrollDiscussionReplies",
    "EndlessScrollGiveaways",
    "EndlessScrollGiveawayComments",
    "EndlessScrollLists"

    );

var defaultModules = {
    "FixedNavbar": { "enabled": true },
    "ScrollingSidebar": { "enabled": true }
    };

var currentVersion = "0.3.0";

(function ($) {

    if (!SGPP.storage.containsItem("Version")) {
        SGPP.storage.clear();
        SGPP.storage.setItem("Version", currentVersion);
    }

    if (!SGPP.storage.containsItem(ModuleDefinition.Settings.SETTINGS_KEY)) {
        SGPP.storage.setItem(ModuleDefinition.Settings.SETTINGS_KEY, defaultModules);
    }

    //load needed modules into module list
    for (var pos in modulesNames) {
        //Load next module
        var m: ModuleDefinition.SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();

        //Checks if the module is enabled in LocalStorage, rule of thumb, if it didn't exist before, it isn't.
        //Also checks should run for the current page
        if (SGPP.settings.isModuleEnabled(modulesNames[pos]) && m.shouldRun(SGPP.location))
            SGPP.modules[modulesNames[pos]] = m; //Put module into module list
    }

    //load modules
    for (var module in SGPP.modules) {
        //append stylesheet for each module
        SGPP.log("Module " + module + " append css.");
        SGPP.appendCSS(SGPP.modules[module].style);

        //init each module
        SGPP.log("Module " + module + " init() call.");
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
