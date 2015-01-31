/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="moduledefinition.ts" />
/// <reference path="fixednavbar.ts" />
/// <reference path="scrollingsidebar.ts" />
/// <reference path="gridview.ts" />
/// <reference path="EndlessScrollGiveaways.ts" />
/// <reference path="EndlessScrollGiveawayComments.ts" />
/// <reference path="EndlessScrollDiscussion.ts" />
/// <reference path="EndlessScrollDiscussionReplies.ts" />

(function ($) {

    var log = function (msg: string) {
        console.log("[" + new Date() + "] SGV2+ - " + msg);
    }

    var modules: { [s: string]: ModuleDefinition.SteamGiftsModule; } = {};

    var fixedNavbar = new ModuleDefinition.FixedNavbarModule();
    //modules[fixedNavbar.name()] = fixedNavbar;

    var gridView = new ModuleDefinition.GridView();

    //modules[gridView.name()] = gridView;

    var scrollingSidebar = new ModuleDefinition.ScrollingSidebar();

    //modules[scrollingSidebar.name()] = scrollingSidebar;

    var endlessScrollGiveaways = new ModuleDefinition.EndlessScrollGiveaways();

    modules[endlessScrollGiveaways.name()] = endlessScrollGiveaways;

    var endlessScrollDiscussion = new ModuleDefinition.EndlessScrollDiscussion();

    modules[endlessScrollDiscussion.name()] = endlessScrollDiscussion;

    var endlessScrollDiscussionReplies = new ModuleDefinition.EndlessScrollDiscussionReplies();

    modules[endlessScrollDiscussionReplies.name()] = endlessScrollDiscussionReplies;

    var endlessScrollGiveawayComments = new ModuleDefinition.EndlessScrollGiveawayComments();

    modules[endlessScrollGiveawayComments.name()] = endlessScrollGiveawayComments;

    for (var module in modules) {
        log("Module " + module + " init() call.");
        modules[module].init();
    }

    $(document).ready(function () {
        for (var module in modules) {
            log("Module " + module + " render() call.");
            modules[module].render();
        }
    });


})(jQuery);