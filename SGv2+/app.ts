/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="moduledefinition.ts" />
/// <reference path="fixednavbar.ts" />
/// <reference path="scrollingsidebar.ts" />
/// <reference path="livepreview.ts" />
/// <reference path="gridview.ts" />
/// <reference path="EndlessScrollDiscussion.ts" />
/// <reference path="EndlessScrollDiscussionReplies.ts" />
/// <reference path="EndlessScrollGiveawayComments.ts" />
/// <reference path="EndlessScrollGiveaways.ts" />
/// <reference path="EndlessScrollMyGiveaways.ts" />

(function ($) {

    var log = function (msg: string) {
        console.log("[" + new Date() + "] SGV2+ - " + msg);
    }

    var modules: { [s: string]: ModuleDefinition.SteamGiftsModule; } = {};
    
    var modulesNames: Array<string> = new Array<string>("EndlessScrollDiscussion", "EndlessScrollDiscussionReplies", "EndlessScrollGiveaways", "EndlessScrollMyGiveaways", "EndlessScrollGiveawayComments");
    // "GridView", "FixedNavbar", "ScrollingSidebar", "LivePreview",

    for (var pos in modulesNames) {
        var m: ModuleDefinition.SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();
        modules[m.name()] = m;

        log("Module " + m.name() + " init() call.");
        modules[m.name()].init();
    }

    $(document).ready(function () {
        for (var module in modules) {
            log("Module " + module + " render() call.");
            modules[module].render();
        }
    });


})(jQuery);