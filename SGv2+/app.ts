/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="moduledefinition.ts" />
/// <reference path="fixednavbar.ts" />
/// <reference path="scrollingsidebar.ts" />
/// <reference path="gridview.ts" />
/// <reference path="EndlessScrollGiveaways.ts" />

(function ($) {

    var log = function (msg: string) {
        console.log("[" + new Date() + "] SGV2+ - " + msg);
    }

    var modules: { [s: string]: ModuleDefinition.SteamGiftsModule; } = {};

    var fixedNavbar = new ModuleDefinition.FixedNavbarModule();
    modules[fixedNavbar.name()] = fixedNavbar;

    var gridView = new ModuleDefinition.GridView();

    modules[gridView.name()] = gridView;

    var scrollingSidebar = new ModuleDefinition.ScrollingSidebar();

    modules[scrollingSidebar.name()] = scrollingSidebar;

    var endlessScrollGiveaways = new ModuleDefinition.EndlessScrollGiveaways();

    modules[endlessScrollGiveaways.name()] = endlessScrollGiveaways;

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