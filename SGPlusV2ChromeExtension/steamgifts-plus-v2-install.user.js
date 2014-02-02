// ==UserScript==
// @name            SteamGifts Plus v2
// @version         2.0.0 - BETA
// @namespace       steamgiftsplusv2
// @description     Initial Beta Release.
// @copyright       2014 leomoty <leomoty@gmail.com>
// @license         MIT; http://en.wikipedia.org/wiki/Mit_license
// @match           http://www.steamsocial.com/*
// @run-at          document-end
// ==/UserScript==

var Storage = function () {
    function normalizeSetArgs(key, val, cb) {
        var toStore, callback;
        if (typeof key === 'object') {
            toStore = key;
            callback = val;
        }
        else {
            toStore = {};
            toStore[key] = val;
            callback = cb;
        }
        return {
            data: toStore,
            callback: callback
        };
    }
    var localStorage;
    if (chrome && chrome.storage && chrome.storage.sync) {
        console.log("Chrome Storage Sync selected");
        localStorage = {
            get: function (key, cb) {
                chrome.storage.sync.get(key, function (result) {
                    cb(null, result && result[key]);
                });
            },
            set: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                chrome.storage.sync.set(args.data, function () {
                    args.callback && args.callback();
                });
            }
        };
    }
    else {
        console.log("Localstorage selected");
        localStorage = {
            get: function (key, cb) {
                cb(null, window.localStorage.getItem(key));
            },
            set: function (key, val, cb) {
                var args = normalizeSetArgs(key, val, cb);
                $.each(args, function (v, k) {
                    window.localStorage.setItem(k, v);
                });
                args.callback && args.callback();
            }
        };
    }
    return localStorage;
}();

if (window.top == window) {
    var SGPscript = document.createElement('script');
    SGPscript.type = 'text/javascript';
    SGPscript.src = 'https://raw2.github.com/leomoty/SGV2-/dev/steamgifts-plus-v2.js?v=' + new Date().getTime();
    SGPscript.onload = function () {
        SGPlusV2.localStorage = Storage;
    };
    document.body.appendChild(SGPscript);
}
