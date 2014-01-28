// ==UserScript==
// @name            SteamGifts Plus v2
// @version         2.0.0 - BETA
// @namespace       steamgiftsplusv2
// @description     Adds various features.
// @copyright       2014 leomoty <leomoty@gmail.com>
// @license         MIT; http://en.wikipedia.org/wiki/Mit_license
// @match           http://www.steamsocial.com/*
// @run-at          document-end
// ==/UserScript==

if (window.top == window) {
    var SGPscript = document.createElement('script');
    SGPscript.type = 'text/javascript';
    SGPscript.src = 'https://raw2.github.com/leomoty/SGV2-/master/steamgifts-plus-v2.js?v=' + new Date().getTime();
    document.body.appendChild(SGPscript);
    
    var SGPstyle = document.head.appendChild(window.createElement('style'));
    SGPstyle.innerHTML = '@import url("https://raw2.github.com/leomoty/SGV2-/master/steamgifts-plus-v2.css?v=' + new Date().getTime() + '")';
}
