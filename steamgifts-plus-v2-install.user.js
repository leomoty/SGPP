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
    var steamgiftsPlus = document.createElement('script');
    steamgiftsPlus.type = 'text/javascript';
    steamgiftsPlus.src = 'https://sgplus-alternative.googlecode.com/svn/trunk/steamgifts-plus.js';
    document.body.appendChild(steamgiftsPlus);
}