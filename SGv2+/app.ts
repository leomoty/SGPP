/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Core.ts" />
/// <reference path="ModuleDefinition.ts" />
/// <reference path="FixedNavbar.ts" />
/// <reference path="FixedFooter.ts" />
/// <reference path="ScrollingSidebar.ts" />
/// <reference path="LivePreview.ts" />
/// <reference path="GridView.ts" />
/// <reference path="CommentAndEnter.ts" />
/// <reference path="Settings.ts" />
/// <reference path="EntryCommenters.ts" />

var SGPP: ModuleDefinition.Core = new ModuleDefinition.Core();

(function ($) {

    var modulesNames: Array<string> = new Array<string>("Settings", "FixedNavbar", "FixedFooter", "ScrollingSidebar", "CommentAndEnter", "GridView", "EntryCommenters");

    for (var pos in modulesNames) {
        var m: ModuleDefinition.SteamGiftsModule = new ModuleDefinition[modulesNames[pos]]();

        if (m.shouldRun(SGPP.location)) {
            SGPP.modules[m.name()] = m;

            SGPP.log("Module " + m.name() + " init() call.");
            SGPP.modules[m.name()].init();
        }
    }

    $(document).on("DOMContentLoaded", function () {
        for (var module in SGPP.modules) {
            SGPP.log("Module " + module + " render() call.");
            SGPP.modules[module].render();
        }
    });


})(jQuery);
