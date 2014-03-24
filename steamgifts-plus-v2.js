//Project page can be found here: https://code.google.com/p/pagedown/, license at https://code.google.com/p/pagedown/source/browse/LICENSE.txt
var Markdown;if(typeof exports==="object"&&typeof require==="function")Markdown=exports;else Markdown={};(function(){function e(e){return e}function t(e){return false}function n(){}function r(){}n.prototype={chain:function(t,n){var r=this[t];if(!r)throw new Error("unknown hook "+t);if(r===e)this[t]=n;else this[t]=function(e){var t=Array.prototype.slice.call(arguments,0);t[0]=r.apply(null,t);return n.apply(null,t)}},set:function(e,t){if(!this[e])throw new Error("unknown hook "+e);this[e]=t},addNoop:function(t){this[t]=e},addFalse:function(e){this[e]=t}};Markdown.HookCollection=n;r.prototype={set:function(e,t){this["s_"+e]=t},get:function(e){return this["s_"+e]}};Markdown.Converter=function(){function u(e){e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(e,n,r,s,o,u){n=n.toLowerCase();t.set(n,O(r));if(o){return s}else if(u){i.set(n,u.replace(/"/g,"&quot;"))}return""});return e}function a(e){var t="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,f);e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,f);e=e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,f);e=e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,f);e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,f);return e}function f(e,t){var n=t;n=n.replace(/^\n+/,"");n=n.replace(/\n+$/g,"");n="\n\n~K"+(s.push(n)-1)+"K\n\n";return n}function c(t,n){t=e.preBlockGamut(t,l);t=b(t);var r="<hr />\n";t=t.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,r);t=t.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,r);t=t.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,r);t=w(t);t=x(t);t=L(t);t=e.postBlockGamut(t,l);t=a(t);t=A(t,n);return t}function h(t){t=e.preSpanGamut(t);t=N(t);t=p(t);t=M(t);t=m(t);t=d(t);t=j(t);t=t.replace(/~P/g,"://");t=O(t);t=k(t);t=t.replace(/  +\n/g," <br>\n");t=e.postSpanGamut(t);return t}function p(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");t=z(t,e.charAt(1)=="!"?"\\`*_/":"\\`*_");return t});return e}function d(e){e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,v);e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,v);e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,v);return e}function v(e,n,r,s,o,u,a,f){if(f==undefined)f="";var l=n;var c=r.replace(/:\/\//g,"~P");var h=s.toLowerCase();var p=o;var d=f;if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{if(l.search(/\(\s*\)$/m)>-1){p=""}else{return l}}}p=U(p);p=z(p,"*_");var v='<a href="'+p+'"';if(d!=""){d=g(d);d=z(d,"*_");v+=' title="'+d+'"'}v+=">"+c+"</a>";return v}function m(e){e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,y);e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,y);return e}function g(e){return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function y(e,n,r,s,o,u,a,f){var l=n;var c=r;var h=s.toLowerCase();var p=o;var d=f;if(!d)d="";if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{return l}}c=z(g(c),"*_[]()");p=z(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';d=g(d);d=z(d,"*_");v+=' title="'+d+'"';v+=" />";return v}function b(e){e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return"<h1>"+h(t)+"</h1>\n\n"});e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return"<h2>"+h(t)+"</h2>\n\n"});e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return"<h"+r+">"+h(n)+"</h"+r+">\n\n"});return e}function w(e,t){e+="~0";var n=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(o){e=e.replace(n,function(e,n,r){var i=n;var s=r.search(/[*+-]/g)>-1?"ul":"ol";var o=S(i,s,t);o=o.replace(/\s+$/,"");o="<"+s+">"+o+"</"+s+">\n";return o})}else{n=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;e=e.replace(n,function(e,t,n,r){var i=t;var s=n;var o=r.search(/[*+-]/g)>-1?"ul":"ol";var u=S(s,o);u=i+"<"+o+">\n"+u+"</"+o+">\n";return u})}e=e.replace(/~0/,"");return e}function S(e,t,n){o++;e=e.replace(/\n{2,}$/,"\n");e+="~0";var r=E[t];var i=new RegExp("(^[ \\t]*)("+r+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+r+")[ \\t]+))","gm");var s=false;e=e.replace(i,function(e,t,r,i){var o=i;var u=t;var a=/\n\n$/.test(o);var f=a||o.search(/\n{2,}/)>-1;if(f||s){o=c(I(o),true)}else{o=w(I(o),true);o=o.replace(/\n$/,"");if(!n)o=h(o)}s=a;return"<li>"+o+"</li>\n"});e=e.replace(/~0/g,"");o--;return e}function x(e){e+="~0";e=e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t;var i=n;r=C(I(r));r=q(r);r=r.replace(/^\n+/g,"");r=r.replace(/\n+$/g,"");r="<pre><code>"+r+"\n</code></pre>";return"\n\n"+r+"\n\n"+i});e=e.replace(/~0/,"");return e}function T(e){e=e.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(s.push(e)-1)+"K\n\n"}function N(e){e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;s=s.replace(/^([ \t]*)/g,"");s=s.replace(/[ \t]*$/g,"");s=C(s);s=s.replace(/:\/\//g,"~P");return t+"<code>"+s+"</code>"});return e}function C(e){e=e.replace(/&/g,"&");e=e.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;");e=z(e,"*_{}[]\\",false);return e}function k(e){e=e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4");e=e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4");return e}function L(e){e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;n=n.replace(/^[ \t]*>[ \t]?/gm,"~0");n=n.replace(/~0/g,"");n=n.replace(/^[ \t]+$/gm,"");n=c(n);n=n.replace(/(^|\n)/g,"$1  ");n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;n=n.replace(/^  /mg,"~0");n=n.replace(/~0/g,"");return n});return T("<blockquote>\n"+n+"\n</blockquote>")});return e}function A(e,t){e=e.replace(/^\n+/g,"");e=e.replace(/\n+$/g,"");var n=e.split(/\n{2,}/g);var r=[];var i=/~K(\d+)K/;var o=n.length;for(var u=0;u<o;u++){var a=n[u];if(i.test(a)){r.push(a)}else if(/\S/.test(a)){a=h(a);a=a.replace(/^([ \t]*)/g,"<p>");a+="</p>";r.push(a)}}if(!t){o=r.length;for(var u=0;u<o;u++){var f=true;while(f){f=false;r[u]=r[u].replace(/~K(\d+)K/g,function(e,t){f=true;return s[t]})}}}return r.join("\n\n")}function O(e){e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&");e=e.replace(/<(?![a-z\/?!]|~D)/gi,"&lt;");return e}function M(e){e=e.replace(/\\(\\)/g,W);e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,W);return e}function B(e,t,n,r){if(t)return e;if(r.charAt(r.length-1)!==")")return"<"+n+r+">";var i=r.match(/[()]/g);var s=0;for(var o=0;o<i.length;o++){if(i[o]==="("){if(s<=0)s=1;else s++}else{s--}}var u="";if(s<0){var a=new RegExp("\\){1,"+ -s+"}$");r=r.replace(a,function(e){u=e;return""})}if(u){var f=r.charAt(r.length-1);if(!H.test(f)){u=f+u;r=r.substr(0,r.length-1)}}return"<"+n+r+">"+u}function j(t){t=t.replace(P,B);var n=function(t,n){return'<a href="'+n+'">'+e.plainLinkText(n)+"</a>"};t=t.replace(/<((https?|ftp):[^'">\s]+)>/gi,n);return t}function F(e){e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)});return e}function I(e){e=e.replace(/^(\t|[ ]{1,4})/gm,"~0");e=e.replace(/~0/g,"");return e}function q(e){if(!/\t/.test(e))return e;var t=["    ","   ","  "," "],n=0,r;return e.replace(/[\n\t]/g,function(e,i){if(e==="\n"){n=i+1;return e}r=(i-n)%4;n=i+1;return t[r]})}function U(e){if(!e)return"";var t=e.length;return e.replace(R,function(n,r){if(n=="~D")return"%24";if(n==":"){if(r==t-1||/[0-9\/]/.test(e.charAt(r+1)))return":"}return"%"+n.charCodeAt(0).toString(16)})}function z(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";if(n){r="\\\\"+r}var i=new RegExp(r,"g");e=e.replace(i,W);return e}function W(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}var e=this.hooks=new n;e.addNoop("plainLinkText");e.addNoop("preConversion");e.addNoop("postNormalization");e.addNoop("preBlockGamut");e.addNoop("postBlockGamut");e.addNoop("preSpanGamut");e.addNoop("postSpanGamut");e.addNoop("postConversion");var t;var i;var s;var o;this.makeHtml=function(n){if(t)throw new Error("Recursive call to converter.makeHtml");t=new r;i=new r;s=[];o=0;n=e.preConversion(n);n=n.replace(/~/g,"~T");n=n.replace(/\$/g,"~D");n=n.replace(/\r\n/g,"\n");n=n.replace(/\r/g,"\n");n="\n\n"+n+"\n\n";n=q(n);n=n.replace(/^[ \t]+$/mg,"");n=e.postNormalization(n);n=a(n);n=u(n);n=c(n);n=F(n);n=n.replace(/~D/g,"$$");n=n.replace(/~T/g,"~");n=e.postConversion(n);s=i=t=null;return n};var l=function(e){return c(e)};var E={ol:"\\d+[.]",ul:"[*+-]"};var _="[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",D="[-A-Z0-9+&@#/%=~_|[\\])]",P=new RegExp('(="|<)?\\b(https?|ftp)(://'+_+"*"+D+")(?=$|\\W)","gi"),H=new RegExp(D,"i");var R=/(?:["'*()[\]:]|~D)/g}})()

var SGPlusV2 = {
    location : window.location.pathname,
    markdownConverter : new Markdown.Converter(),
    config : {
        gridView: false,
        sidebar: true,
        fixedNavbar: true,
        shortenText: false,
        featuredWrapper: false,
        endlessScroll: true
    },
    images : {
        loader : 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
    },
    tags : {
        spoiler_pre_tag : '<span class="spoiler_blur"><span class="spoiler">',
        spoiler_pos_tag : '</span></span>'
    },
    giveawayColorByType: function (el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) el.css('background-color', '#F06969');
        else if (hasGroup) el.css('background-color', 'rgba(63,115,0,0.95)');
        else if (hasWhitelist) el.css('background-color', '#556da9');
        return el;
    },
    generateStyles: function () {
        var styles = document.head.appendChild(document.createElement('style'));
        styles.innerHTML = '.short .markdown{overflow:hidden;max-height:100px;position:relative}.less__beautify{position:absolute;width:100%;bottom:0;display:none;background:-webkit-gradient(linear,left top,left bottom,from(rgba(240,242,245,0)),to(rgba(240,242,245,1)));background:-moz-linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));background:linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));height:20px}.less__beautify.sub{background:-webkit-gradient(linear,left top,left bottom,from(rgba(243,244,247,0)),to(rgba(243,244,247,1)));background:-moz-linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1));background:linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1))}.short .less__beautify{display:block}.comment_more{display:none}.short .comment_more{display:block}.short .comment_less{display:none}.body{margin-top:39px}.header{margin-left:-25px;position:fixed;top:0;width:100%;z-index:1}.navbar_fixed{padding:0 25px}.gridview_flex{display:flex;flex-wrap:wrap;justify-content:center}.center_endless_loading{margin:0 auto;width:10%}.center_endless_end{margin:0 auto;width:20%}.settings_logo{color:#494c64}.preview{box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;background-color:rgba(255,255,255,.2);border:1px solid #cbcfdb;border-radius:4px;padding:15px;margin-top:10px}.preview_text{font-weight:700;margin-bottom:10px;color:#4b72d4}.highlight{border-radius:4px;box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;border:1px solid #da5d88;padding:15px}';
    },
    generateGridview: function (root) {
        if (SGPlusV2.location.indexOf('/user/') >= 0)
            return;
        if (SGPlusV2.location.indexOf('/giveaways/open') == -1 && SGPlusV2.location.indexOf('/giveaways/closed') == -1
            && SGPlusV2.location.indexOf('/giveaways/coming-soon') == -1 && SGPlusV2.location.indexOf('/giveaways/today') == -1)
            return;
        var container = document.createElement('div');
        $(container).addClass('gridview_flex');
        $(root).find('.giveaway-summary__thumbnail-outer-wrap').css('margin', '5px');
        $(root).find('.giveaway-summary-inner-wrap').each(function () {
            if ($(this).parents('.giveaway-container--featured').length != 0) return;
            var eachDiv = document.createElement('div');
            var whitelist = $(this).find('.giveaway-summary__column--whitelist');
            var group = $(this).find('.giveaway-summary__column--group');
            $(eachDiv).append(SGPlusV2.giveawayColorByType($(this).find('.giveaway-summary__thumbnail-outer-wrap'), group.length, whitelist.length));
            $(container).append(eachDiv);
        });
        return container;
    },
    generateScrollingSidebar: function () {
        var $sidebar = $(".sidebar"),
		$window = $(window),
		offset = $sidebar.offset(),
		topPadding = 64;
        $window.scroll(function () {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });
    },
    generateFixedNavbar: function () {
        $('header').addClass('header');
        $('body').addClass('body');
        var nav = $('header').html();
        $('nav').remove();
        $('header').html('<div class="navbar_fixed"></div>');
        $('.navbar_fixed').html(nav);
        $('nav .nav__button--is-dropdown-arrow').click(function () {
            var active = $(this).hasClass('is-selected');
            $('nav .nav__button').removeClass('is-selected');
            $('nav .nav__relative-dropdown').addClass('is-hidden');
            if (!active) $(this).addClass('is-selected').siblings('.nav__relative-dropdown').removeClass('is-hidden');
            return false;
        }).attr('unselectable', 'on').bind('selectstart', function () { return false; });
    },
    generateShortenedText: function () {
        SGPlusV2.generateShortenedComments();
        SGPlusV2.generateShortenedDescriptions();
    },
    generateShortenedComments: function () {
        $('.comment__description.markdown').each(function () {
            if ($(this).find('form').length == 0) {
                if ($(this).innerHeight() > 120) {
                    $(this).parent().addClass('short');
                    var sub = ($(this).closest('.comment__children').length > 0) ? ' sub' : '';
                    $(this).append("<div class='less__beautify" + sub + "'></div>");
                    $(this).next().prepend("<div class='comment__actions__button comment_more'>More</div><div class='comment__actions__button comment_less'>Less</div>");
                }
            }
        });
        $(".comment_more, .comment_less").click(function () {
            var comment_div = $(this).parent().parent();
            comment_div.toggleClass('short');
            if (comment_div.hasClass('short') && comment_div.offset().top < $(window).scrollTop())
                $(window).scrollTop($(comment_div).offset().top - $('.sidebar').height());
        });
    },
    generateShortenedDescriptions: function () {
        $('.giveaway-description__display-state .ajax .markdown').each(function () {
            if ($(this).find('form').length == 0) {
                if ($(this).innerHeight() > 100) {
                    $(this).css({
                        'max-height': '500px',
                        'overflow': 'hidden'
                    })
                    .after("<div style='font-size:11px;color:#aaa;display:inline-block;margin-right:10px;' class='comment__actions__button description_more'>More</div>");
                }
            }
        });
        $(".description_more").click(function () {
            var description_div = $(this).prev();
            if (description_div.css('overflow') == 'hidden') {
                description_div.css({
                    'overflow': 'visible',
                    'max-height': 'none'
                });
                $(this).text("Less");
            } else {
                description_div.css({
                    'overflow': 'hidden',
                    'max-height': '500px'
                });
                $(this).text("More");
                if ($(description_div).offset().top < $(window).scrollTop())
                    $(window).scrollTop($(description_div).offset().top - $('.sidebar').height());
            }
        });
    },
    lastLoadedPage : 1,
    lastPage : 1,
    canLoadNewPage : true,
    generateEndlessScroll : function () {
        if (SGPlusV2.location.indexOf('/user/') >= 0)
            return;
        if (SGPlusV2.location.indexOf('/giveaways/open') == -1 && SGPlusV2.location.indexOf('/giveaways/closed') == -1
            && SGPlusV2.location.indexOf('/giveaways/coming-soon') == -1 && SGPlusV2.location.indexOf('/giveaways/today') == -1)
            return;
        $('.pagination').before($('<div id="loading" class="center_endless_loading is-hidden"><img src="'+ SGPlusV2.images.loader + '"></img>"<span class="giveaway-summary__heading__name">Loading</span></div'));
        $('.pagination').before($('<div id="end" class="center_endless_end is-hidden"><span class="giveaway-summary__heading__name">You\'ve reached the end.</span></div'));
        $('.pagination').css('visibility','hidden');
        SGPlusV2.lastPage = $('.pagination__navigation > a').last().attr('data-page-number') || 1; //assumes this is the only page available if undefined
        $(window).scroll(function(){
            if(SGPlusV2.canLoadNewPage && $(window).scrollTop() >  ($('.pagination').offset().top - $(window).height())){
                var pos = SGPlusV2.lastLoadedPage + 1;
                SGPlusV2.canLoadNewPage = false;
                if(pos > SGPlusV2.lastPage){
                    $('#end').removeClass('is-hidden');
                    return;
                }
                $('#loading').removeClass('is-hidden');
                $.ajax({ url: SGPlusV2.location + '/page/' + pos})
                .done(function (html){
                    $('#loading').before('<div class="page__heading"><div class="page__heading__breadcrumbs">Page ' + pos + ' of ' + SGPlusV2.lastPage + ' </div></div>');
                    if(SGPlusV2.config.gridView)
                        $('#loading').before(SGPlusV2.generateGridview($(html).find('.pagination').prev()));
                    else
                        $('#loading').before($(html).find('.pagination').prev());
                    SGPlusV2.lastLoadedPage = pos;
                })
                .always(function(){
                    SGPlusV2.canLoadNewPage = true; //needs to assume something can go wrong
                    $('#loading').addClass('is-hidden');
                });
            }
        });
    },
    parseSpoiler : function(content, start){
        if(start > content.length)
            return content;
        var spoilerStart = content.indexOf("~", start);
        var spoilerEnd = content.indexOf("~", spoilerStart + 1);
        var paragraphEnd = content.indexOf("</p>", spoilerStart + 1);
        if(spoilerStart == - 1 || spoilerEnd == - 1)
            return content;
        if(paragraphEnd != -1 && paragraphEnd < spoilerEnd)
            return SGPlusV2.parseSpoiler(content, paragraphEnd + 4);
        if((spoilerStart + 1 == spoilerEnd) || content.charAt(spoilerStart + 1) === ' ' || content.charAt(spoilerEnd + 1) === '~' || content.charAt(spoilerEnd - 1) === ' ')
            return SGPlusV2.parseSpoiler(content, spoilerEnd);
        return SGPlusV2.parseSpoiler(content.substr(0,spoilerStart) +  SGPlusV2.tags.spoiler_pre_tag + content.substr(spoilerStart +1 , spoilerEnd - spoilerStart - 1) + SGPlusV2.tags.spoiler_pos_tag + content.substr(spoilerEnd + 1, content.length - spoilerEnd), spoilerEnd + 1);
    },
    generateMarkdownLivePreview : function(){
        $('.comment__description textarea').on("keyup",function(){
            if(!$(this).val().length)
                $(this).siblings('.preview').remove();
            else if(!$(this).parents('.comment__description').find('.livepreview').length){
                $(this).parents('.comment__description form').append('<div class="preview"><div class="preview_text">Live Preview</div><div class="livepreview markdown"></div></div>');
            }
            $(this).siblings('.preview').children('.livepreview').html(SGPlusV2.parseSpoiler(SGPlusV2.markdownConverter.makeHtml($(this).val()),0));
        });
    },
    selectSidebarItem : function(el){
        $(el).children().prepend('<i class="fa fa-caret-right"></i>');
        $(el).addClass('is-selected');
        return el;
    },
    addGroupLink : function() {
        if(/\/giveaway\/\w{5}\//.test(SGPlusV2.location) === false)
            return;
        if($('.featured__columns > .giveaway-summary__column--group').length)
        {
            var groupsLocation = window.location.pathname.replace('comments','groups');
            var selected = /\/giveaway\/\w{5}\/(\w|\W)+\/groups/.test(SGPlusV2.location);
            var el = $('<li class="sidebar__navigation__item"><a class="sidebar__navigation__item__link" href="' + groupsLocation + '"><div class="sidebar__navigation__item__name">Groups</div><div class="sidebar__navigation__item__underline"></div></a></li>');
            if(selected)
                $('.sidebar__navigation').first().append(SGPlusV2.selectSidebarItem(el));
            else
                $('.sidebar__navigation').first().append(el);
        }
    },
    hideFeaturedWrapper : function(){
        if (SGPlusV2.location.indexOf('/giveaways/') == -1)
            return;
        if (SGPlusV2.location.indexOf('/user/') >= 0)
            return;
        $('.featured__outer-wrap').hide();
    },
    putImagesInPlace : function(){
        $('.comment__description.markdown').each(function(){
            var images = $(this).find('.comment__toggle-attached').parent();
            if(images.length == 0)
                return;
            var pivot = 0;
            $(this).find('a').each(function(){
                if(pivot < images.length && /(\w|\W)+\/img/.test($(this).prop('href'))){
                    $(this).parent().append(images[pivot]);
                    $(this).remove();
                    pivot++;
                 }
            });
        });
    },
    createSettingsPageLink : function(){
        $('.nav__right-container a[href="/account/sync"]:last').after($('<a target="_blank" class="nav__row" href="chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/settings.html"><i class="settings_logo fa fa-cog fa-fw"></i><div class="nav__row__summary"><p class="nav__row__summary__name">Steamgifts Plus V2</p><p class="nav__row__summary__description">Open Steamgifts Plus V2 settings page.</p></div></a>'));
    },
    addHandlers : function(){
        $(".js__comment-edit-save, .js__comment-undelete").off("click","**");
        $(document).on("click", ".js__comment-edit-save, .js__comment-undelete", function(){
           var elem = $(this);
            $.ajax({
            url: '/ajax.php',
            type: 'POST',
            dataType: 'json',
            data: $(this).closest('form').serialize(),
            success: function(data){
                if (data.type === 'success'){
                    elem.closest('.comment .ajax').html(data.comment);
                    SGPlusV2.putImagesInPlace();
                }
            }
        });
        return false;
        });
    },
    highlightComment : function() {
        if(SGPlusV2.location.indexOf('/discussion') == 0 && $(window.location.hash).length){
            $(window.location.hash).parent().addClass('highlight');
            if(SGPlusV2.config.fixedNavbar)
                $(window).scrollTop($(window).scrollTop() - 60);
        }
    },
    init_nondelayed : function() {
        SGPlusV2.addHandlers();
        SGPlusV2.generateStyles();
        SGPlusV2.addGroupLink();
        SGPlusV2.putImagesInPlace();
        SGPlusV2.generateMarkdownLivePreview();
    },
    init_delayed: function(){
        if(SGPlusV2.config.featuredWrapper === true)
            SGPlusV2.hideFeaturedWrapper();
        if(SGPlusV2.config.gridView === true){
            var content = SGPlusV2.generateGridview($('.pagination').prev());
            $($('.page__heading').next()[0]).html(content);
        }
        if(SGPlusV2.config.sidebar === true)
            SGPlusV2.generateScrollingSidebar();
        if(SGPlusV2.config.fixedNavbar === true)
            SGPlusV2.generateFixedNavbar();
        if(SGPlusV2.config.shortenText === true)
            SGPlusV2.generateShortenedText();
        if(SGPlusV2.config.endlessScroll === true)
            SGPlusV2.generateEndlessScroll();
        SGPlusV2.highlightComment();
    },
    init: function () {
        SGPlusV2.init_nondelayed();
        if (typeof chrome != 'undefined' && typeof chrome.storage != 'undefined' && typeof chrome.storage.sync != 'undefined') {
            chrome.storage.sync.get(function(settings){
                if(settings.gridview === undefined) { settings.gridview = SGPlusV2.config.gridView; chrome.storage.sync.set({'gridview': settings.gridview}); }
                if(settings.shorten_comments === undefined) { settings.shorten_comments = SGPlusV2.config.shortenText; chrome.storage.sync.set({'shorten_comments': settings.shorten_comments});}
                if(settings.scrolling_sidebar === undefined) { settings.scrolling_sidebar = SGPlusV2.config.sidebar; chrome.storage.sync.set({'scrolling_sidebar': settings.scrolling_sidebar}); }
                if(settings.fixed_navbar === undefined) { settings.fixed_navbar = SGPlusV2.config.fixedNavbar; chrome.storage.sync.set({'fixed_navbar': settings.fixed_navbar}); }
                if(settings.featured_wrapper === undefined) { settings.featured_wrapper = SGPlusV2.config.featuredWrapper; chrome.storage.sync.set({'featured_wrapper': settings.featured_wrapper}); }
                if(settings.endless_scroll === undefined) { settings.endless_scroll = SGPlusV2.config.endlessScroll; chrome.storage.sync.set({'endless_scroll': settings.endless_scroll}); }

                SGPlusV2.config.gridView = settings.gridview;
                SGPlusV2.config.shortenText =  settings.shorten_comments;
                SGPlusV2.config.sidebar = settings.scrolling_sidebar;
                SGPlusV2.config.fixedNavbar = settings.fixed_navbar;
                SGPlusV2.config.featuredWrapper = settings.featured_wrapper;
                SGPlusV2.config.endlessScroll = settings.endless_scroll;

                SGPlusV2.createSettingsPageLink(); //only for chrome for now

                SGPlusV2.init_delayed();
            });
        } else {
            SGPlusV2.init_delayed();
        }
    }
};
if (typeof chrome === 'undefined') {
    (function ($) {
        SGPlusV2.init();
    })(jQuery);
} else {
    $(document).ready(function () {
        SGPlusV2.init();
    });
}
