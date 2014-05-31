//Project page can be found here: https://code.google.com/p/pagedown/, license at https://code.google.com/p/pagedown/source/browse/LICENSE.txt
var Markdown;if(typeof exports==="object"&&typeof require==="function")Markdown=exports;else Markdown={};(function(){function e(e){return e}function t(e){return false}function n(){}function r(){}n.prototype={chain:function(t,n){var r=this[t];if(!r)throw new Error("unknown hook "+t);if(r===e)this[t]=n;else this[t]=function(e){var t=Array.prototype.slice.call(arguments,0);t[0]=r.apply(null,t);return n.apply(null,t)}},set:function(e,t){if(!this[e])throw new Error("unknown hook "+e);this[e]=t},addNoop:function(t){this[t]=e},addFalse:function(e){this[e]=t}};Markdown.HookCollection=n;r.prototype={set:function(e,t){this["s_"+e]=t},get:function(e){return this["s_"+e]}};Markdown.Converter=function(){function u(e){e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(e,n,r,s,o,u){n=n.toLowerCase();t.set(n,O(r));if(o){return s}else if(u){i.set(n,u.replace(/"/g,"&quot;"))}return""});return e}function a(e){var t="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,f);e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,f);e=e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,f);e=e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,f);e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,f);return e}function f(e,t){var n=t;n=n.replace(/^\n+/,"");n=n.replace(/\n+$/g,"");n="\n\n~K"+(s.push(n)-1)+"K\n\n";return n}function c(t,n){t=e.preBlockGamut(t,l);t=b(t);var r="<hr />\n";t=t.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,r);t=t.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,r);t=t.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,r);t=w(t);t=x(t);t=L(t);t=e.postBlockGamut(t,l);t=a(t);t=A(t,n);return t}function h(t){t=e.preSpanGamut(t);t=N(t);t=p(t);t=M(t);t=m(t);t=d(t);t=j(t);t=t.replace(/~P/g,"://");t=O(t);t=k(t);t=t.replace(/  +\n/g," <br>\n");t=e.postSpanGamut(t);return t}function p(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");t=z(t,e.charAt(1)=="!"?"\\`*_/":"\\`*_");return t});return e}function d(e){e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,v);e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,v);e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,v);return e}function v(e,n,r,s,o,u,a,f){if(f==undefined)f="";var l=n;var c=r.replace(/:\/\//g,"~P");var h=s.toLowerCase();var p=o;var d=f;if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{if(l.search(/\(\s*\)$/m)>-1){p=""}else{return l}}}p=U(p);p=z(p,"*_");var v='<a href="'+p+'"';if(d!=""){d=g(d);d=z(d,"*_");v+=' title="'+d+'"'}v+=">"+c+"</a>";return v}function m(e){e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,y);e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,y);return e}function g(e){return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function y(e,n,r,s,o,u,a,f){var l=n;var c=r;var h=s.toLowerCase();var p=o;var d=f;if(!d)d="";if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{return l}}c=z(g(c),"*_[]()");p=z(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';d=g(d);d=z(d,"*_");v+=' title="'+d+'"';v+=" />";return v}function b(e){e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return"<h1>"+h(t)+"</h1>\n\n"});e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return"<h2>"+h(t)+"</h2>\n\n"});e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return"<h"+r+">"+h(n)+"</h"+r+">\n\n"});return e}function w(e,t){e+="~0";var n=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(o){e=e.replace(n,function(e,n,r){var i=n;var s=r.search(/[*+-]/g)>-1?"ul":"ol";var o=S(i,s,t);o=o.replace(/\s+$/,"");o="<"+s+">"+o+"</"+s+">\n";return o})}else{n=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;e=e.replace(n,function(e,t,n,r){var i=t;var s=n;var o=r.search(/[*+-]/g)>-1?"ul":"ol";var u=S(s,o);u=i+"<"+o+">\n"+u+"</"+o+">\n";return u})}e=e.replace(/~0/,"");return e}function S(e,t,n){o++;e=e.replace(/\n{2,}$/,"\n");e+="~0";var r=E[t];var i=new RegExp("(^[ \\t]*)("+r+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+r+")[ \\t]+))","gm");var s=false;e=e.replace(i,function(e,t,r,i){var o=i;var u=t;var a=/\n\n$/.test(o);var f=a||o.search(/\n{2,}/)>-1;if(f||s){o=c(I(o),true)}else{o=w(I(o),true);o=o.replace(/\n$/,"");if(!n)o=h(o)}s=a;return"<li>"+o+"</li>\n"});e=e.replace(/~0/g,"");o--;return e}function x(e){e+="~0";e=e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t;var i=n;r=C(I(r));r=q(r);r=r.replace(/^\n+/g,"");r=r.replace(/\n+$/g,"");r="<pre><code>"+r+"\n</code></pre>";return"\n\n"+r+"\n\n"+i});e=e.replace(/~0/,"");return e}function T(e){e=e.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(s.push(e)-1)+"K\n\n"}function N(e){e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;s=s.replace(/^([ \t]*)/g,"");s=s.replace(/[ \t]*$/g,"");s=C(s);s=s.replace(/:\/\//g,"~P");return t+"<code>"+s+"</code>"});return e}function C(e){e=e.replace(/&/g,"&");e=e.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;");e=z(e,"*_{}[]\\",false);return e}function k(e){e=e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4");e=e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4");return e}function L(e){e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;n=n.replace(/^[ \t]*>[ \t]?/gm,"~0");n=n.replace(/~0/g,"");n=n.replace(/^[ \t]+$/gm,"");n=c(n);n=n.replace(/(^|\n)/g,"$1  ");n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;n=n.replace(/^  /mg,"~0");n=n.replace(/~0/g,"");return n});return T("<blockquote>\n"+n+"\n</blockquote>")});return e}function A(e,t){e=e.replace(/^\n+/g,"");e=e.replace(/\n+$/g,"");var n=e.split(/\n{2,}/g);var r=[];var i=/~K(\d+)K/;var o=n.length;for(var u=0;u<o;u++){var a=n[u];if(i.test(a)){r.push(a)}else if(/\S/.test(a)){a=h(a);a=a.replace(/^([ \t]*)/g,"<p>");a+="</p>";r.push(a)}}if(!t){o=r.length;for(var u=0;u<o;u++){var f=true;while(f){f=false;r[u]=r[u].replace(/~K(\d+)K/g,function(e,t){f=true;return s[t]})}}}return r.join("\n\n")}function O(e){e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&");e=e.replace(/<(?![a-z\/?!]|~D)/gi,"&lt;");return e}function M(e){e=e.replace(/\\(\\)/g,W);e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,W);return e}function B(e,t,n,r){if(t)return e;if(r.charAt(r.length-1)!==")")return"<"+n+r+">";var i=r.match(/[()]/g);var s=0;for(var o=0;o<i.length;o++){if(i[o]==="("){if(s<=0)s=1;else s++}else{s--}}var u="";if(s<0){var a=new RegExp("\\){1,"+ -s+"}$");r=r.replace(a,function(e){u=e;return""})}if(u){var f=r.charAt(r.length-1);if(!H.test(f)){u=f+u;r=r.substr(0,r.length-1)}}return"<"+n+r+">"+u}function j(t){t=t.replace(P,B);var n=function(t,n){return'<a href="'+n+'">'+e.plainLinkText(n)+"</a>"};t=t.replace(/<((https?|ftp):[^'">\s]+)>/gi,n);return t}function F(e){e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)});return e}function I(e){e=e.replace(/^(\t|[ ]{1,4})/gm,"~0");e=e.replace(/~0/g,"");return e}function q(e){if(!/\t/.test(e))return e;var t=["    ","   ","  "," "],n=0,r;return e.replace(/[\n\t]/g,function(e,i){if(e==="\n"){n=i+1;return e}r=(i-n)%4;n=i+1;return t[r]})}function U(e){if(!e)return"";var t=e.length;return e.replace(R,function(n,r){if(n=="~D")return"%24";if(n==":"){if(r==t-1||/[0-9\/]/.test(e.charAt(r+1)))return":"}return"%"+n.charCodeAt(0).toString(16)})}function z(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";if(n){r="\\\\"+r}var i=new RegExp(r,"g");e=e.replace(i,W);return e}function W(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}var e=this.hooks=new n;e.addNoop("plainLinkText");e.addNoop("preConversion");e.addNoop("postNormalization");e.addNoop("preBlockGamut");e.addNoop("postBlockGamut");e.addNoop("preSpanGamut");e.addNoop("postSpanGamut");e.addNoop("postConversion");var t;var i;var s;var o;this.makeHtml=function(n){if(t)throw new Error("Recursive call to converter.makeHtml");t=new r;i=new r;s=[];o=0;n=e.preConversion(n);n=n.replace(/~/g,"~T");n=n.replace(/\$/g,"~D");n=n.replace(/\r\n/g,"\n");n=n.replace(/\r/g,"\n");n="\n\n"+n+"\n\n";n=q(n);n=n.replace(/^[ \t]+$/mg,"");n=e.postNormalization(n);n=a(n);n=u(n);n=c(n);n=F(n);n=n.replace(/~D/g,"$$");n=n.replace(/~T/g,"~");n=e.postConversion(n);s=i=t=null;return n};var l=function(e){return c(e)};var E={ol:"\\d+[.]",ul:"[*+-]"};var _="[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",D="[-A-Z0-9+&@#/%=~_|[\\])]",P=new RegExp('(="|<)?\\b(https?|ftp)(://'+_+"*"+D+")(?=$|\\W)","gi"),H=new RegExp(D,"i");var R=/(?:["'*()[\]:]|~D)/g}})()

/*** Spectrum Colorpicker v1.3.3 https://github.com/bgrins/spectrum Author: Brian Grinstead License: MIT ***/
var SpectrumCSS = '.sp-container{position:absolute;top:0;left:0;display:inline-block;*display:inline;*zoom:1;z-index:9999994;overflow:hidden}.sp-container.sp-flat{position:relative}.sp-container,.sp-container *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.sp-top{position:relative;width:100%;display:inline-block}.sp-top-inner{position:absolute;top:0;left:0;bottom:0;right:0}.sp-color{position:absolute;top:0;left:0;bottom:0;right:20%}.sp-hue{position:absolute;top:0;right:0;bottom:0;left:84%;height:100%}.sp-clear-enabled .sp-hue{top:33px;height:77.5%}.sp-fill{padding-top:80%}.sp-sat,.sp-val{position:absolute;top:0;left:0;right:0;bottom:0}.sp-alpha-enabled .sp-top{margin-bottom:18px}.sp-alpha-enabled .sp-alpha{display:block}.sp-alpha-handle{position:absolute;top:-4px;bottom:-4px;width:6px;left:50%;cursor:pointer;border:1px solid #000;background:#fff;opacity:.8}.sp-alpha{display:none;bottom:-14px;right:0;left:0;height:8px}.sp-alpha-inner{border:solid 1px #333}.sp-clear{display:none}.sp-clear.sp-clear-display{background-position:center}.sp-clear-enabled .sp-clear{display:block;position:absolute;top:0;right:0;bottom:0;left:84%;height:28px}.sp-alpha,.sp-alpha-handle,.sp-clear,.sp-container,.sp-container button,.sp-container.sp-dragging .sp-input,.sp-dragger,.sp-preview,.sp-replacer,.sp-slider{-webkit-user-select:none;-moz-user-select:-moz-none;-o-user-select:none;user-select:none}.sp-container.sp-buttons-disabled .sp-button-container,.sp-container.sp-input-disabled .sp-input-container,.sp-initial-disabled .sp-initial,.sp-palette-disabled .sp-palette-container,.sp-palette-only .sp-picker-container{display:none}.sp-sat{background-image:-webkit-gradient(linear,0 0,100% 0,from(#FFF),to(rgba(204,154,129,0)));background-image:-webkit-linear-gradient(left,#FFF,rgba(204,154,129,0));background-image:-moz-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:-o-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:-ms-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:linear-gradient(to right,#fff,rgba(204,154,129,0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=#FFFFFFFF, endColorstr=#00CC9A81)";filter:progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr="#FFFFFFFF", endColorstr="#00CC9A81")}.sp-val{background-image:-webkit-gradient(linear,0 100%,0 0,from(#000),to(rgba(204,154,129,0)));background-image:-webkit-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-moz-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-o-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-ms-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:linear-gradient(to top,#000,rgba(204,154,129,0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)";filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00CC9A81", endColorstr="#FF000000")}.sp-hue{background:-moz-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-ms-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-o-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-webkit-gradient(linear,left top,left bottom,from(red),color-stop(0.17,#ff0),color-stop(0.33,#0f0),color-stop(0.5,#0ff),color-stop(0.67,#00f),color-stop(0.83,#f0f),to(red));background:-webkit-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}.sp-1{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0000", endColorstr="#ffff00")}.sp-2{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffff00", endColorstr="#00ff00")}.sp-3{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ff00", endColorstr="#00ffff")}.sp-4{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ffff", endColorstr="#0000ff")}.sp-5{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#0000ff", endColorstr="#ff00ff")}.sp-6{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff00ff", endColorstr="#ff0000")}.sp-hidden{display:none!important}.sp-cf:after,.sp-cf:before{content:"";display:table}.sp-cf:after{clear:both}.sp-cf{*zoom:1}@media (max-device-width:480px){.sp-color{right:40%}.sp-hue{left:63%}.sp-fill{padding-top:60%}}.sp-dragger{border-radius:5px;height:5px;width:5px;border:1px solid #fff;background:#000;cursor:pointer;position:absolute;top:0;left:0}.sp-slider{position:absolute;top:0;cursor:pointer;height:3px;left:-1px;right:-1px;border:1px solid #000;background:#fff;opacity:.8}.sp-container{border-radius:0;background-color:#ECECEC;border:solid 1px #f0c49B;padding:0}.sp-clear,.sp-color,.sp-container,.sp-container button,.sp-container input,.sp-hue{font:400 12px "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Verdana,sans-serif;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.sp-top{margin-bottom:3px}.sp-clear,.sp-color,.sp-hue{border:solid 1px #666}.sp-input-container{float:right;width:100px;margin-bottom:4px}.sp-initial-disabled .sp-input-container{width:100%}.sp-input{font-size:12px!important;border:1px inset;padding:4px 5px;margin:0;width:100%;background:0 0;border-radius:3px;color:#222}.sp-input:focus{border:1px solid orange}.sp-input.sp-validation-error{border:1px solid red;background:#fdd}.sp-palette-container,.sp-picker-container{float:left;position:relative;padding:10px;padding-bottom:300px;margin-bottom:-290px}.sp-picker-container{width:172px;border-left:solid 1px #fff}.sp-palette-container{border-right:solid 1px #ccc}.sp-palette .sp-thumb-el{display:block;position:relative;float:left;cursor:pointer}.sp-palette .sp-thumb-el.sp-thumb-active,.sp-palette .sp-thumb-el:hover{border-color:orange}.sp-initial{float:left;border:solid 1px #333}.sp-initial span{width:30px;height:25px;border:none;display:block;float:left;margin:0}.sp-initial .sp-clear-display{background-position:center}.sp-button-container{float:right}.sp-replacer{margin:0;overflow:hidden;cursor:pointer;padding:4px;display:inline-block;*zoom:1;*display:inline;border:solid 1px #91765d;background:#eee;color:#333;vertical-align:middle}.sp-replacer.sp-active,.sp-replacer:hover{border-color:#F0C49B;color:#111}.sp-replacer.sp-disabled{cursor:default;border-color:silver;color:silver}.sp-dd{padding:2px 0;height:16px;line-height:16px;float:left;font-size:10px}.sp-preview{width:25px;height:20px;border:solid 1px #222;margin-right:5px;float:left;z-index:0}.sp-palette{*width:220px;max-width:220px}.sp-palette .sp-thumb-el{width:16px;height:16px;margin:2px 1px;border:solid 1px #d0d0d0}.sp-container{padding-bottom:0}.sp-container button{background-color:#eee;background-image:-webkit-linear-gradient(top,#eee,#ccc);background-image:-moz-linear-gradient(top,#eee,#ccc);background-image:-ms-linear-gradient(top,#eee,#ccc);background-image:-o-linear-gradient(top,#eee,#ccc);background-image:linear-gradient(to bottom,#eee,#ccc);border:1px solid #ccc;border-bottom:1px solid #bbb;border-radius:3px;color:#333;font-size:14px;line-height:1;padding:5px 4px;text-align:center;text-shadow:0 1px 0 #eee;vertical-align:middle}.sp-container button:hover{background-color:#ddd;background-image:-webkit-linear-gradient(top,#ddd,#bbb);background-image:-moz-linear-gradient(top,#ddd,#bbb);background-image:-ms-linear-gradient(top,#ddd,#bbb);background-image:-o-linear-gradient(top,#ddd,#bbb);background-image:linear-gradient(to bottom,#ddd,#bbb);border:1px solid #bbb;border-bottom:1px solid #999;cursor:pointer;text-shadow:0 1px 0 #ddd}.sp-container button:active{border:1px solid #aaa;border-bottom:1px solid #888;-webkit-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-moz-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-ms-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-o-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee}.sp-cancel{font-size:11px;color:#d93f3f!important;margin:0;padding:2px;margin-right:5px;vertical-align:middle;text-decoration:none}.sp-cancel:hover{color:#d93f3f!important;text-decoration:underline}.sp-palette span.sp-thumb-active,.sp-palette span:hover{border-color:#000}.sp-alpha,.sp-preview,.sp-thumb-el{position:relative;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.sp-alpha-inner,.sp-preview-inner,.sp-thumb-inner{display:block;position:absolute;top:0;left:0;bottom:0;right:0}.sp-palette .sp-thumb-inner{background-position:50% 50%;background-repeat:no-repeat}.sp-palette .sp-thumb-light.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYBhsgJFMffxAXABlN5JruT4Q3wfi/0DsT64h8UD8HmpIPCWG/KemIfOJCUB+Aoacx6EGBZyHBqI+WsDCwuQ9mhxeg2A210Ntfo8klk9sOMijaURm7yc1UP2RNCMbKE9ODK1HM6iegYLkfx8pligC9lCD7KmRof0ZhjQACDAAceovrtpVBRkAAAAASUVORK5CYII=)}.sp-palette .sp-thumb-dark.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAMdJREFUOE+tkgsNwzAMRMugEAahEAahEAZhEAqlEAZhEAohEAYh81X2dIm8fKpEspLGvudPOsUYpxE2BIJCroJmEW9qJ+MKaBFhEMNabSy9oIcIPwrB+afvAUFoK4H0tMaQ3XtlrggDhOVVMuT4E5MMG0FBbCEYzjYT7OxLEvIHQLY2zWwQ3D+9luyOQTfKDiFD3iUIfPk8VqrKjgAiSfGFPecrg6HN6m/iBcwiDAo7WiBeawa+Kwh7tZoSCGLMqwlSAzVDhoK+6vH4G0P5wdkAAAAASUVORK5CYII=)}.sp-clear-display{background-repeat:no-repeat;background-position:center;background-image:url(data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAJmZmZ2dnZ6enqKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq/Hx8fLy8vT09PX19ff39/j4+Pn5+fr6+vv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAUABQAAAihAP9FoPCvoMGDBy08+EdhQAIJCCMybCDAAYUEARBAlFiQQoMABQhKUJBxY0SPICEYHBnggEmDKAuoPMjS5cGYMxHW3IiT478JJA8M/CjTZ0GgLRekNGpwAsYABHIypcAgQMsITDtWJYBR6NSqMico9cqR6tKfY7GeBCuVwlipDNmefAtTrkSzB1RaIAoXodsABiZAEFB06gIBWC1mLVgBa0AAOw==)}';

(function(window,$,undefined){var defaultOpts={beforeShow:noop,move:noop,change:noop,show:noop,hide:noop,color:false,flat:false,showInput:false,allowEmpty:false,showButtons:true,clickoutFiresChange:false,showInitial:false,showPalette:false,showPaletteOnly:false,showSelectionPalette:true,localStorageKey:false,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",clearText:"Clear Color Selection",preferredFormat:false,className:"",showAlpha:false,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:false},spectrums=[],IE=!!/msie/i.exec(window.navigator.userAgent),rgbaSupport=function(){function contains(str,substr){return!!~(""+str).indexOf(substr)}var elem=document.createElement("div");var style=elem.style;style.cssText="background-color:rgba(0,0,0,.5)";return contains(style.backgroundColor,"rgba")||contains(style.backgroundColor,"hsla")}(),inputTypeColorSupport=function(){var colorInput=$("<input type='color' value='!' />")[0];return colorInput.type==="color"&&colorInput.value!=="!"}(),replaceInput=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),markup=function(){var gradientFix="";if(IE)for(var i=1;i<=6;i++)gradientFix+="<div class='sp-"+i+"'></div>";return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",gradientFix,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button class='sp-choose'></button>","</div>","</div>","</div>"].join("")}();function paletteTemplate(p,color,className){var html=[];for(var i=0;i<p.length;i++){var current=p[i];if(current){var tiny=tinycolor(current);var c=tiny.toHsl().l<0.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";c+=tinycolor.equals(color,current)?" sp-thumb-active":"";var swatchStyle=rgbaSupport?"background-color:"+tiny.toRgbString():"filter:"+tiny.toFilter();html.push('<span title="'+tiny.toRgbString()+'" data-color="'+tiny.toRgbString()+'" class="'+c+'"><span class="sp-thumb-inner" style="'+swatchStyle+';" /></span>')}else{var cls="sp-clear-display";html.push('<span title="No Color Selected" data-color="" style="background-color:transparent;" class="'+cls+'"></span>')}}return"<div class='sp-cf "+className+"'>"+html.join("")+"</div>"}function hideAll(){for(var i=0;i<spectrums.length;i++)if(spectrums[i])spectrums[i].hide()}function instanceOptions(o,callbackContext){var opts=$.extend({},defaultOpts,o);opts.callbacks={"move":bind(opts.move,callbackContext),"change":bind(opts.change,callbackContext),"show":bind(opts.show,callbackContext),"hide":bind(opts.hide,callbackContext),"beforeShow":bind(opts.beforeShow,callbackContext)};return opts}function spectrum(element,o){var opts=instanceOptions(o,element),flat=opts.flat,showSelectionPalette=opts.showSelectionPalette,localStorageKey=opts.localStorageKey,theme=opts.theme,callbacks=opts.callbacks,resize=throttle(reflow,10),visible=false,dragWidth=0,dragHeight=0,dragHelperHeight=0,slideHeight=0,slideWidth=0,alphaWidth=0,alphaSlideHelperWidth=0,slideHelperHeight=0,currentHue=0,currentSaturation=0,currentValue=0,currentAlpha=1,palette=[],paletteArray=[],paletteLookup={},selectionPalette=opts.selectionPalette.slice(0),maxSelectionSize=opts.maxSelectionSize,draggingClass="sp-dragging",shiftMovementDirection=null;var doc=element.ownerDocument,body=doc.body,boundElement=$(element),disabled=false,container=$(markup,doc).addClass(theme),dragger=container.find(".sp-color"),dragHelper=container.find(".sp-dragger"),slider=container.find(".sp-hue"),slideHelper=container.find(".sp-slider"),alphaSliderInner=container.find(".sp-alpha-inner"),alphaSlider=container.find(".sp-alpha"),alphaSlideHelper=container.find(".sp-alpha-handle"),textInput=container.find(".sp-input"),paletteContainer=container.find(".sp-palette"),initialColorContainer=container.find(".sp-initial"),cancelButton=container.find(".sp-cancel"),clearButton=container.find(".sp-clear"),chooseButton=container.find(".sp-choose"),isInput=boundElement.is("input"),isInputTypeColor=isInput&&(inputTypeColorSupport&&boundElement.attr("type")==="color"),shouldReplace=isInput&&!flat,replacer=shouldReplace?$(replaceInput).addClass(theme).addClass(opts.className):$([]),offsetElement=shouldReplace?replacer:boundElement,previewElement=replacer.find(".sp-preview-inner"),initialColor=opts.color||isInput&&boundElement.val(),colorOnShow=false,preferredFormat=opts.preferredFormat,currentPreferredFormat=preferredFormat,clickoutFiresChange=!opts.showButtons||opts.clickoutFiresChange,isEmpty=!initialColor,allowEmpty=opts.allowEmpty&&!isInputTypeColor;function applyOptions(){if(opts.showPaletteOnly)opts.showPalette=true;if(opts.palette){palette=opts.palette.slice(0);paletteArray=$.isArray(palette[0])?palette:[palette];paletteLookup={};for(var i=0;i<paletteArray.length;i++)for(var j=0;j<paletteArray[i].length;j++){var rgb=tinycolor(paletteArray[i][j]).toRgbString();paletteLookup[rgb]=true}}container.toggleClass("sp-flat",flat);container.toggleClass("sp-input-disabled",!opts.showInput);container.toggleClass("sp-alpha-enabled",opts.showAlpha);container.toggleClass("sp-clear-enabled",allowEmpty);container.toggleClass("sp-buttons-disabled",!opts.showButtons);container.toggleClass("sp-palette-disabled",!opts.showPalette);container.toggleClass("sp-palette-only",opts.showPaletteOnly);container.toggleClass("sp-initial-disabled",!opts.showInitial);container.addClass(opts.className);reflow()}function initialize(){if(IE)container.find("*:not(input)").attr("unselectable","on");applyOptions();if(shouldReplace)boundElement.after(replacer).hide();if(!allowEmpty)clearButton.hide();if(flat)boundElement.after(container).hide();else{var appendTo=opts.appendTo==="parent"?boundElement.parent():$(opts.appendTo);if(appendTo.length!==1)appendTo=$("body");appendTo.append(container)}updateSelectionPaletteFromStorage();offsetElement.bind("click.spectrum touchstart.spectrum",function(e){if(!disabled)toggle();e.stopPropagation();if(!$(e.target).is("input"))e.preventDefault()});if(boundElement.is(":disabled")||opts.disabled===true)disable();container.click(stopPropagation);textInput.change(setFromTextInput);textInput.bind("paste",function(){setTimeout(setFromTextInput,1)});textInput.keydown(function(e){if(e.keyCode==13)setFromTextInput()});cancelButton.text(opts.cancelText);cancelButton.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();hide("cancel")});clearButton.attr("title",opts.clearText);clearButton.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();isEmpty=true;move();if(flat)updateOriginalInput(true)});chooseButton.text(opts.chooseText);chooseButton.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();if(isValid()){updateOriginalInput(true);hide()}});draggable(alphaSlider,function(dragX,dragY,e){currentAlpha=dragX/alphaWidth;isEmpty=false;if(e.shiftKey)currentAlpha=Math.round(currentAlpha*10)/10;move()},dragStart,dragStop);draggable(slider,function(dragX,dragY){currentHue=parseFloat(dragY/slideHeight);isEmpty=false;if(!opts.showAlpha)currentAlpha=1;move()},dragStart,dragStop);draggable(dragger,function(dragX,dragY,e){if(!e.shiftKey)shiftMovementDirection=null;else if(!shiftMovementDirection){var oldDragX=currentSaturation*dragWidth;var oldDragY=dragHeight-currentValue*dragHeight;var furtherFromX=Math.abs(dragX-oldDragX)>Math.abs(dragY-oldDragY);shiftMovementDirection=furtherFromX?"x":"y"}var setSaturation=!shiftMovementDirection||shiftMovementDirection==="x";var setValue=!shiftMovementDirection||shiftMovementDirection==="y";if(setSaturation)currentSaturation=parseFloat(dragX/dragWidth);if(setValue)currentValue=parseFloat((dragHeight-dragY)/dragHeight);isEmpty=false;if(!opts.showAlpha)currentAlpha=1;move()},dragStart,dragStop);if(!!initialColor){set(initialColor);updateUI();currentPreferredFormat=preferredFormat||tinycolor(initialColor).format;addColorToSelectionPalette(initialColor)}else updateUI();if(flat)show();function palletElementClick(e){if(e.data&&e.data.ignore){set($(this).data("color"));move()}else{set($(this).data("color"));move();updateOriginalInput(true);hide()}return false}var paletteEvent=IE?"mousedown.spectrum":"click.spectrum touchstart.spectrum";paletteContainer.delegate(".sp-thumb-el",paletteEvent,palletElementClick);initialColorContainer.delegate(".sp-thumb-el:nth-child(1)",paletteEvent,{ignore:true},palletElementClick)}function updateSelectionPaletteFromStorage(){if(localStorageKey&&window.localStorage){try{var oldPalette=window.localStorage[localStorageKey].split(",#");if(oldPalette.length>1){delete window.localStorage[localStorageKey];$.each(oldPalette,function(i,c){addColorToSelectionPalette(c)})}}catch(e){}try{selectionPalette=window.localStorage[localStorageKey].split(";")}catch(e){}}}function addColorToSelectionPalette(color){if(showSelectionPalette){var rgb=tinycolor(color).toRgbString();if(!paletteLookup[rgb]&&$.inArray(rgb,selectionPalette)===-1){selectionPalette.push(rgb);while(selectionPalette.length>maxSelectionSize)selectionPalette.shift()}if(localStorageKey&&window.localStorage)try{window.localStorage[localStorageKey]=selectionPalette.join(";")}catch(e){}}}function getUniqueSelectionPalette(){var unique=[];if(opts.showPalette)for(i=0;i<selectionPalette.length;i++){var rgb=tinycolor(selectionPalette[i]).toRgbString();if(!paletteLookup[rgb])unique.push(selectionPalette[i])}return unique.reverse().slice(0,opts.maxSelectionSize)}function drawPalette(){var currentColor=get();var html=$.map(paletteArray,function(palette,i){return paletteTemplate(palette,currentColor,"sp-palette-row sp-palette-row-"+i)});updateSelectionPaletteFromStorage();if(selectionPalette)html.push(paletteTemplate(getUniqueSelectionPalette(),currentColor,"sp-palette-row sp-palette-row-selection"));paletteContainer.html(html.join(""))}function drawInitial(){if(opts.showInitial){var initial=colorOnShow;var current=get();initialColorContainer.html(paletteTemplate([initial,current],current,"sp-palette-row-initial"))}}function dragStart(){if(dragHeight<=0||(dragWidth<=0||slideHeight<=0))reflow();container.addClass(draggingClass);shiftMovementDirection=null;boundElement.trigger("dragstart.spectrum",[get()])}function dragStop(){container.removeClass(draggingClass);boundElement.trigger("dragstop.spectrum",[get()])}function setFromTextInput(){var value=textInput.val();if((value===null||value==="")&&allowEmpty){set(null);updateOriginalInput(true)}else{var tiny=tinycolor(value);if(tiny.ok){set(tiny);updateOriginalInput(true)}else textInput.addClass("sp-validation-error")}}function toggle(){if(visible)hide();else show()}function show(){var event=$.Event("beforeShow.spectrum");if(visible){reflow();return}boundElement.trigger(event,[get()]);if(callbacks.beforeShow(get())===false||event.isDefaultPrevented())return;hideAll();visible=true;$(doc).bind("click.spectrum",hide);$(window).bind("resize.spectrum",resize);replacer.addClass("sp-active");container.removeClass("sp-hidden");reflow();updateUI();colorOnShow=get();drawInitial();callbacks.show(colorOnShow);boundElement.trigger("show.spectrum",[colorOnShow])}function hide(e){if(e&&(e.type=="click"&&e.button==2))return;if(!visible||flat)return;visible=false;$(doc).unbind("click.spectrum",hide);$(window).unbind("resize.spectrum",resize);replacer.removeClass("sp-active");container.addClass("sp-hidden");var colorHasChanged=!tinycolor.equals(get(),colorOnShow);if(colorHasChanged)if(clickoutFiresChange&&e!=="cancel")updateOriginalInput(true);else revert();callbacks.hide(get());boundElement.trigger("hide.spectrum",[get()])}function revert(){set(colorOnShow,true)}function set(color,ignoreFormatChange){if(tinycolor.equals(color,get())){updateUI();return}var newColor,newHsv;if(!color&&allowEmpty)isEmpty=true;else{isEmpty=false;newColor=tinycolor(color);newHsv=newColor.toHsv();currentHue=newHsv.h%360/360;currentSaturation=newHsv.s;currentValue=newHsv.v;currentAlpha=newHsv.a}updateUI();if(newColor&&(newColor.ok&&!ignoreFormatChange))currentPreferredFormat=preferredFormat||newColor.format}function get(opts){opts=opts||{};if(allowEmpty&&isEmpty)return null;return tinycolor.fromRatio({h:currentHue,s:currentSaturation,v:currentValue,a:Math.round(currentAlpha*100)/100},{format:opts.format||currentPreferredFormat})}function isValid(){return!textInput.hasClass("sp-validation-error")}function move(){updateUI();callbacks.move(get());boundElement.trigger("move.spectrum",[get()])}function updateUI(){textInput.removeClass("sp-validation-error");updateHelperLocations();var flatColor=tinycolor.fromRatio({h:currentHue,s:1,v:1});dragger.css("background-color",flatColor.toHexString());var format=currentPreferredFormat;if(currentAlpha<1&&!(currentAlpha===0&&format==="name"))if(format==="hex"||(format==="hex3"||(format==="hex6"||format==="name")))format="rgb";var realColor=get({format:format}),displayColor="";previewElement.removeClass("sp-clear-display");previewElement.css("background-color","transparent");if(!realColor&&allowEmpty)previewElement.addClass("sp-clear-display");else{var realHex=realColor.toHexString(),realRgb=realColor.toRgbString();if(rgbaSupport||realColor.alpha===1)previewElement.css("background-color",realRgb);else{previewElement.css("background-color","transparent");previewElement.css("filter",realColor.toFilter())}if(opts.showAlpha){var rgb=realColor.toRgb();rgb.a=0;var realAlpha=tinycolor(rgb).toRgbString();var gradient="linear-gradient(left, "+realAlpha+", "+realHex+")";if(IE)alphaSliderInner.css("filter",tinycolor(realAlpha).toFilter({gradientType:1},realHex));else{alphaSliderInner.css("background","-webkit-"+gradient);alphaSliderInner.css("background","-moz-"+gradient);alphaSliderInner.css("background","-ms-"+gradient);alphaSliderInner.css("background","linear-gradient(to right, "+realAlpha+", "+realHex+")")}}displayColor=realColor.toString(format)}if(opts.showInput)textInput.val(displayColor);if(opts.showPalette)drawPalette();drawInitial()}function updateHelperLocations(){var s=currentSaturation;var v=currentValue;if(allowEmpty&&isEmpty){alphaSlideHelper.hide();slideHelper.hide();dragHelper.hide()}else{alphaSlideHelper.show();slideHelper.show();dragHelper.show();var dragX=s*dragWidth;var dragY=dragHeight-v*dragHeight;dragX=Math.max(-dragHelperHeight,Math.min(dragWidth-dragHelperHeight,dragX-dragHelperHeight));dragY=Math.max(-dragHelperHeight,Math.min(dragHeight-dragHelperHeight,dragY-dragHelperHeight));dragHelper.css({"top":dragY+"px","left":dragX+"px"});var alphaX=currentAlpha*alphaWidth;alphaSlideHelper.css({"left":alphaX-alphaSlideHelperWidth/2+"px"});var slideY=currentHue*slideHeight;slideHelper.css({"top":slideY-slideHelperHeight+"px"})}}function updateOriginalInput(fireCallback){var color=get(),displayColor="",hasChanged=!tinycolor.equals(color,colorOnShow);if(color){displayColor=color.toString(currentPreferredFormat);addColorToSelectionPalette(color)}if(isInput)boundElement.val(displayColor);colorOnShow=color;if(fireCallback&&hasChanged){callbacks.change(color);boundElement.trigger("change",[color])}}function reflow(){dragWidth=dragger.width();dragHeight=dragger.height();dragHelperHeight=dragHelper.height();slideWidth=slider.width();slideHeight=slider.height();slideHelperHeight=slideHelper.height();alphaWidth=alphaSlider.width();alphaSlideHelperWidth=alphaSlideHelper.width();if(!flat){container.css("position","absolute");container.offset(getOffset(container,offsetElement))}updateHelperLocations();if(opts.showPalette)drawPalette();boundElement.trigger("reflow.spectrum")}function destroy(){boundElement.show();offsetElement.unbind("click.spectrum touchstart.spectrum");container.remove();replacer.remove();spectrums[spect.id]=null}function option(optionName,optionValue){if(optionName===undefined)return $.extend({},opts);if(optionValue===undefined)return opts[optionName];opts[optionName]=optionValue;applyOptions()}function enable(){disabled=false;boundElement.attr("disabled",false);offsetElement.removeClass("sp-disabled")}function disable(){hide();disabled=true;boundElement.attr("disabled",true);offsetElement.addClass("sp-disabled")}initialize();var spect={show:show,hide:hide,toggle:toggle,reflow:reflow,option:option,enable:enable,disable:disable,set:function(c){set(c);updateOriginalInput()},get:get,destroy:destroy,container:container};spect.id=spectrums.push(spect)-1;return spect}function getOffset(picker,input){var extraY=0;var dpWidth=picker.outerWidth();var dpHeight=picker.outerHeight();var inputHeight=input.outerHeight();var doc=picker[0].ownerDocument;var docElem=doc.documentElement;var viewWidth=docElem.clientWidth+$(doc).scrollLeft();var viewHeight=docElem.clientHeight+$(doc).scrollTop();var offset=input.offset();offset.top+=inputHeight;offset.left-=Math.min(offset.left,offset.left+dpWidth>viewWidth&&viewWidth>dpWidth?Math.abs(offset.left+dpWidth-viewWidth):0);offset.top-=Math.min(offset.top,offset.top+dpHeight>viewHeight&&viewHeight>dpHeight?Math.abs(dpHeight+inputHeight-extraY):extraY);return offset}function noop(){}function stopPropagation(e){e.stopPropagation()}function bind(func,obj){var slice=Array.prototype.slice;var args=slice.call(arguments,2);return function(){return func.apply(obj,args.concat(slice.call(arguments)))}}function draggable(element,onmove,onstart,onstop){onmove=onmove||function(){};onstart=onstart||function(){};onstop=onstop||function(){};var doc=element.ownerDocument||document;var dragging=false;var offset={};var maxHeight=0;var maxWidth=0;var hasTouch="ontouchstart"in window;var duringDragEvents={};duringDragEvents["selectstart"]=prevent;duringDragEvents["dragstart"]=prevent;duringDragEvents["touchmove mousemove"]=move;duringDragEvents["touchend mouseup"]=stop;function prevent(e){if(e.stopPropagation)e.stopPropagation();if(e.preventDefault)e.preventDefault();e.returnValue=false}function move(e){if(dragging){if(IE&&(document.documentMode<9&&!e.button))return stop();var touches=e.originalEvent.touches;var pageX=touches?touches[0].pageX:e.pageX;var pageY=touches?touches[0].pageY:e.pageY;var dragX=Math.max(0,Math.min(pageX-offset.left,maxWidth));var dragY=Math.max(0,Math.min(pageY-offset.top,maxHeight));if(hasTouch)prevent(e);onmove.apply(element,[dragX,dragY,e])}}function start(e){var rightclick=e.which?e.which==3:e.button==2;var touches=e.originalEvent.touches;if(!rightclick&&!dragging)if(onstart.apply(element,arguments)!==false){dragging=true;maxHeight=$(element).height();maxWidth=$(element).width();offset=$(element).offset();$(doc).bind(duringDragEvents);$(doc.body).addClass("sp-dragging");if(!hasTouch)move(e);prevent(e)}}function stop(){if(dragging){$(doc).unbind(duringDragEvents);$(doc.body).removeClass("sp-dragging");onstop.apply(element,arguments)}dragging=false}$(element).bind("touchstart mousedown",start)}function throttle(func,wait,debounce){var timeout;return function(){var context=this,args=arguments;var throttler=function(){timeout=null;func.apply(context,args)};if(debounce)clearTimeout(timeout);if(debounce||!timeout)timeout=setTimeout(throttler,wait)}}function log(){if(window.console){if(Function.prototype.bind)log=Function.prototype.bind.call(console.log,console);else log=function(){Function.prototype.apply.call(console.log,console,arguments)};log.apply(this,arguments)}}var dataID="spectrum.id";$.fn.spectrum=function(opts,extra){if(typeof opts=="string"){var returnValue=this;var args=Array.prototype.slice.call(arguments,1);this.each(function(){var spect=spectrums[$(this).data(dataID)];if(spect){var method=spect[opts];if(!method)throw new Error("Spectrum: no such method: '"+opts+"'");if(opts=="get")returnValue=spect.get();else if(opts=="container")returnValue=spect.container;else if(opts=="option")returnValue=spect.option.apply(spect,args);else if(opts=="destroy"){spect.destroy();$(this).removeData(dataID)}else method.apply(spect,args)}});return returnValue}return this.spectrum("destroy").each(function(){var options=$.extend({},opts,$(this).data());var spect=spectrum(this,options);$(this).data(dataID,spect.id)})};$.fn.spectrum.load=true;$.fn.spectrum.loadOpts={};$.fn.spectrum.draggable=draggable;$.fn.spectrum.defaults=defaultOpts;$.spectrum={};$.spectrum.localization={};$.spectrum.palettes={};$.fn.spectrum.processNativeColorInputs=function(){if(!inputTypeColorSupport)$("input[type=color]").spectrum({preferredFormat:"hex6"})};(function(){var trimLeft=/^[\s,#]+/,trimRight=/\s+$/,tinyCounter=0,math=Math,mathRound=math.round,mathMin=math.min,mathMax=math.max,mathRandom=math.random;function tinycolor(color,opts){color=color?color:"";opts=opts||{};if(typeof color=="object"&&color.hasOwnProperty("_tc_id"))return color;var rgb=inputToRGB(color);var r=rgb.r,g=rgb.g,b=rgb.b,a=rgb.a,roundA=mathRound(100*a)/100,format=opts.format||rgb.format;if(r<1)r=mathRound(r);if(g<1)g=mathRound(g);if(b<1)b=mathRound(b);return{ok:rgb.ok,format:format,_tc_id:tinyCounter++,alpha:a,getAlpha:function(){return a},setAlpha:function(value){a=boundAlpha(value);roundA=mathRound(100*a)/100},toHsv:function(){var hsv=rgbToHsv(r,g,b);return{h:hsv.h*360,s:hsv.s,v:hsv.v,a:a}},toHsvString:function(){var hsv=rgbToHsv(r,g,b);var h=mathRound(hsv.h*360),s=mathRound(hsv.s*100),v=mathRound(hsv.v*100);return a==1?"hsv("+h+", "+s+"%, "+v+"%)":"hsva("+h+", "+s+"%, "+v+"%, "+roundA+")"},toHsl:function(){var hsl=rgbToHsl(r,g,b);return{h:hsl.h*360,s:hsl.s,l:hsl.l,a:a}},toHslString:function(){var hsl=rgbToHsl(r,g,b);var h=mathRound(hsl.h*360),s=mathRound(hsl.s*100),l=mathRound(hsl.l*100);return a==1?"hsl("+h+", "+s+"%, "+l+"%)":"hsla("+h+", "+s+"%, "+l+"%, "+roundA+")"},toHex:function(allow3Char){return rgbToHex(r,g,b,allow3Char)},toHexString:function(allow3Char){return"#"+this.toHex(allow3Char)},toHex8:function(){return rgbaToHex(r,g,b,a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:mathRound(r),g:mathRound(g),b:mathRound(b),a:a}},toRgbString:function(){return a==1?"rgb("+mathRound(r)+", "+mathRound(g)+", "+mathRound(b)+")":"rgba("+mathRound(r)+", "+mathRound(g)+", "+mathRound(b)+", "+roundA+")"},toPercentageRgb:function(){return{r:mathRound(bound01(r,255)*100)+"%",g:mathRound(bound01(g,255)*100)+"%",b:mathRound(bound01(b,255)*100)+"%",a:a}},toPercentageRgbString:function(){return a==1?"rgb("+mathRound(bound01(r,255)*100)+"%, "+mathRound(bound01(g,255)*100)+"%, "+mathRound(bound01(b,255)*100)+"%)":"rgba("+mathRound(bound01(r,255)*100)+"%, "+mathRound(bound01(g,255)*100)+"%, "+mathRound(bound01(b,255)*100)+"%, "+roundA+")"},toName:function(){if(a===0)return"transparent";return hexNames[rgbToHex(r,g,b,true)]||false},toFilter:function(secondColor){var hex8String="#"+rgbaToHex(r,g,b,a);var secondHex8String=hex8String;var gradientType=opts&&opts.gradientType?"GradientType = 1, ":"";if(secondColor){var s=tinycolor(secondColor);secondHex8String=s.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")"},toString:function(format){var formatSet=!!format;format=format||this.format;var formattedString=false;var hasAlphaAndFormatNotSet=!formatSet&&(a<1&&a>0);var formatWithAlpha=hasAlphaAndFormatNotSet&&(format==="hex"||(format==="hex6"||(format==="hex3"||format==="name")));if(format==="rgb")formattedString=this.toRgbString();if(format==="prgb")formattedString=this.toPercentageRgbString();if(format==="hex"||format==="hex6")formattedString=this.toHexString();if(format==="hex3")formattedString=this.toHexString(true);if(format==="hex8")formattedString=this.toHex8String();if(format==="name")formattedString=this.toName();if(format==="hsl")formattedString=this.toHslString();if(format==="hsv")formattedString=this.toHsvString();if(formatWithAlpha)return this.toRgbString();return formattedString||this.toHexString()}}}tinycolor.fromRatio=function(color,opts){if(typeof color=="object"){var newColor={};for(var i in color)if(color.hasOwnProperty(i))if(i==="a")newColor[i]=color[i];else newColor[i]=convertToPercentage(color[i]);color=newColor}return tinycolor(color,opts)};function inputToRGB(color){var rgb={r:0,g:0,b:0};var a=1;var ok=false;var format=false;if(typeof color=="string")color=stringInputToObject(color);if(typeof color=="object"){if(color.hasOwnProperty("r")&&(color.hasOwnProperty("g")&&color.hasOwnProperty("b"))){rgb=rgbToRgb(color.r,color.g,color.b);ok=true;format=String(color.r).substr(-1)==="%"?"prgb":"rgb"}else if(color.hasOwnProperty("h")&&(color.hasOwnProperty("s")&&color.hasOwnProperty("v"))){color.s=convertToPercentage(color.s);color.v=convertToPercentage(color.v);rgb=hsvToRgb(color.h,color.s,color.v);ok=true;format="hsv"}else if(color.hasOwnProperty("h")&&(color.hasOwnProperty("s")&&color.hasOwnProperty("l"))){color.s=convertToPercentage(color.s);color.l=convertToPercentage(color.l);rgb=hslToRgb(color.h,color.s,color.l);ok=true;format="hsl"}if(color.hasOwnProperty("a"))a=color.a}a=boundAlpha(a);return{ok:ok,format:color.format||format,r:mathMin(255,mathMax(rgb.r,0)),g:mathMin(255,mathMax(rgb.g,0)),b:mathMin(255,mathMax(rgb.b,0)),a:a}}function rgbToRgb(r,g,b){return{r:bound01(r,255)*255,g:bound01(g,255)*255,b:bound01(b,255)*255}}function rgbToHsl(r,g,b){r=bound01(r,255);g=bound01(g,255);b=bound01(b,255);var max=mathMax(r,g,b),min=mathMin(r,g,b);var h,s,l=(max+min)/2;if(max==min)h=s=0;else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h/=6}return{h:h,s:s,l:l}}function hslToRgb(h,s,l){var r,g,b;h=bound01(h,360);s=bound01(s,100);l=bound01(l,100);function hue2rgb(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p}if(s===0)r=g=b=l;else{var q=l<0.5?l*(1+s):l+s-l*s;var p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)}return{r:r*255,g:g*255,b:b*255}}function rgbToHsv(r,g,b){r=bound01(r,255);g=bound01(g,255);b=bound01(b,255);var max=mathMax(r,g,b),min=mathMin(r,g,b);var h,s,v=max;var d=max-min;s=max===0?0:d/max;if(max==min)h=0;else{switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h/=6}return{h:h,s:s,v:v}}function hsvToRgb(h,s,v){h=bound01(h,360)*6;s=bound01(s,100);v=bound01(v,100);var i=math.floor(h),f=h-i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s),mod=i%6,r=[v,q,p,p,t,v][mod],g=[t,v,v,q,p,p][mod],b=[p,p,t,v,v,q][mod];return{r:r*255,g:g*255,b:b*255}}function rgbToHex(r,g,b,allow3Char){var hex=[pad2(mathRound(r).toString(16)),pad2(mathRound(g).toString(16)),pad2(mathRound(b).toString(16))];if(allow3Char&&(hex[0].charAt(0)==hex[0].charAt(1)&&(hex[1].charAt(0)==hex[1].charAt(1)&&hex[2].charAt(0)==hex[2].charAt(1))))return hex[0].charAt(0)+hex[1].charAt(0)+hex[2].charAt(0);return hex.join("")}function rgbaToHex(r,g,b,a){var hex=[pad2(convertDecimalToHex(a)),pad2(mathRound(r).toString(16)),pad2(mathRound(g).toString(16)),pad2(mathRound(b).toString(16))];return hex.join("")}tinycolor.equals=function(color1,color2){if(!color1||!color2)return false;return tinycolor(color1).toRgbString()==tinycolor(color2).toRgbString()};tinycolor.random=function(){return tinycolor.fromRatio({r:mathRandom(),g:mathRandom(),b:mathRandom()})};tinycolor.desaturate=function(color,amount){amount=amount===0?0:amount||10;var hsl=tinycolor(color).toHsl();hsl.s-=amount/100;hsl.s=clamp01(hsl.s);return tinycolor(hsl)};tinycolor.saturate=function(color,amount){amount=amount===0?0:amount||10;var hsl=tinycolor(color).toHsl();hsl.s+=amount/100;hsl.s=clamp01(hsl.s);return tinycolor(hsl)};tinycolor.greyscale=function(color){return tinycolor.desaturate(color,100)};tinycolor.lighten=function(color,amount){amount=amount===0?0:amount||10;var hsl=tinycolor(color).toHsl();hsl.l+=amount/100;hsl.l=clamp01(hsl.l);return tinycolor(hsl)};tinycolor.darken=function(color,amount){amount=amount===0?0:amount||10;var hsl=tinycolor(color).toHsl();hsl.l-=amount/100;hsl.l=clamp01(hsl.l);return tinycolor(hsl)};tinycolor.complement=function(color){var hsl=tinycolor(color).toHsl();hsl.h=(hsl.h+180)%360;return tinycolor(hsl)};tinycolor.triad=function(color){var hsl=tinycolor(color).toHsl();var h=hsl.h;return[tinycolor(color),tinycolor({h:(h+120)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+240)%360,s:hsl.s,l:hsl.l})]};tinycolor.tetrad=function(color){var hsl=tinycolor(color).toHsl();var h=hsl.h;return[tinycolor(color),tinycolor({h:(h+90)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+180)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+270)%360,s:hsl.s,l:hsl.l})]};tinycolor.splitcomplement=function(color){var hsl=tinycolor(color).toHsl();var h=hsl.h;return[tinycolor(color),tinycolor({h:(h+72)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+216)%360,s:hsl.s,l:hsl.l})]};tinycolor.analogous=function(color,results,slices){results=results||6;slices=slices||30;var hsl=tinycolor(color).toHsl();var part=360/slices;var ret=[tinycolor(color)];for(hsl.h=(hsl.h-(part*results>>1)+720)%360;--results;){hsl.h=(hsl.h+part)%360;ret.push(tinycolor(hsl))}return ret};tinycolor.monochromatic=function(color,results){results=results||6;var hsv=tinycolor(color).toHsv();var h=hsv.h,s=hsv.s,v=hsv.v;var ret=[];var modification=1/results;while(results--){ret.push(tinycolor({h:h,s:s,v:v}));v=(v+modification)%1}return ret};tinycolor.readability=function(color1,color2){var a=tinycolor(color1).toRgb();var b=tinycolor(color2).toRgb();var brightnessA=(a.r*299+a.g*587+a.b*114)/1E3;var brightnessB=(b.r*299+b.g*587+b.b*114)/1E3;var colorDiff=Math.max(a.r,b.r)-Math.min(a.r,b.r)+Math.max(a.g,b.g)-Math.min(a.g,b.g)+Math.max(a.b,b.b)-Math.min(a.b,b.b);return{brightness:Math.abs(brightnessA-brightnessB),color:colorDiff}};tinycolor.readable=function(color1,color2){var readability=tinycolor.readability(color1,color2);return readability.brightness>125&&readability.color>500};tinycolor.mostReadable=function(baseColor,colorList){var bestColor=null;var bestScore=0;var bestIsReadable=false;for(var i=0;i<colorList.length;i++){var readability=tinycolor.readability(baseColor,colorList[i]);var readable=readability.brightness>125&&readability.color>500;var score=3*(readability.brightness/125)+readability.color/500;if(readable&&!bestIsReadable||(readable&&(bestIsReadable&&score>bestScore)||!readable&&(!bestIsReadable&&score>bestScore))){bestIsReadable=readable;bestScore=score;bestColor=tinycolor(colorList[i])}}return bestColor};var names=tinycolor.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};var hexNames=tinycolor.hexNames=flip(names);function flip(o){var flipped={};for(var i in o)if(o.hasOwnProperty(i))flipped[o[i]]=i;return flipped}function boundAlpha(a){a=parseFloat(a);if(isNaN(a)||(a<0||a>1))a=1;return a}function bound01(n,max){if(isOnePointZero(n))n="100%";var processPercent=isPercentage(n);n=mathMin(max,mathMax(0,parseFloat(n)));if(processPercent)n=parseInt(n*max,10)/100;if(math.abs(n-max)<1E-6)return 1;return n%max/parseFloat(max)}function clamp01(val){return mathMin(1,mathMax(0,val))}function parseIntFromHex(val){return parseInt(val,16)}function isOnePointZero(n){return typeof n=="string"&&(n.indexOf(".")!=-1&&parseFloat(n)===1)}function isPercentage(n){return typeof n==="string"&&n.indexOf("%")!=-1}function pad2(c){return c.length==1?"0"+c:""+c}function convertToPercentage(n){if(n<=1)n=n*100+"%";return n}function convertDecimalToHex(d){return Math.round(parseFloat(d)*255).toString(16)}function convertHexToDecimal(h){return parseIntFromHex(h)/255}var matchers=function(){var CSS_INTEGER="[-\\+]?\\d+%?";var CSS_NUMBER="[-\\+]?\\d*\\.\\d+%?";var CSS_UNIT="(?:"+CSS_NUMBER+")|(?:"+CSS_INTEGER+")";var PERMISSIVE_MATCH3="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?";var PERMISSIVE_MATCH4="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?";return{rgb:new RegExp("rgb"+PERMISSIVE_MATCH3),rgba:new RegExp("rgba"+PERMISSIVE_MATCH4),hsl:new RegExp("hsl"+PERMISSIVE_MATCH3),hsla:new RegExp("hsla"+PERMISSIVE_MATCH4),hsv:new RegExp("hsv"+PERMISSIVE_MATCH3),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function stringInputToObject(color){color=color.replace(trimLeft,"").replace(trimRight,"").toLowerCase();var named=false;if(names[color]){color=names[color];named=true}else if(color=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var match;if(match=matchers.rgb.exec(color))return{r:match[1],g:match[2],b:match[3]};if(match=matchers.rgba.exec(color))return{r:match[1],g:match[2],b:match[3],a:match[4]};if(match=matchers.hsl.exec(color))return{h:match[1],s:match[2],l:match[3]};if(match=matchers.hsla.exec(color))return{h:match[1],s:match[2],l:match[3],a:match[4]};if(match=matchers.hsv.exec(color))return{h:match[1],s:match[2],v:match[3]};if(match=matchers.hex8.exec(color))return{a:convertHexToDecimal(match[1]),r:parseIntFromHex(match[2]),g:parseIntFromHex(match[3]),b:parseIntFromHex(match[4]),format:named?"name":"hex8"};if(match=matchers.hex6.exec(color))return{r:parseIntFromHex(match[1]),g:parseIntFromHex(match[2]),b:parseIntFromHex(match[3]),format:named?"name":"hex"};if(match=matchers.hex3.exec(color))return{r:parseIntFromHex(match[1]+""+match[1]),g:parseIntFromHex(match[2]+""+match[2]),b:parseIntFromHex(match[3]+""+match[3]),format:named?"name":"hex"};return false}window.tinycolor=tinycolor})();$(function(){if($.fn.spectrum.load)$.fn.spectrum.processNativeColorInputs()})})(window,jQuery);


var SGPlusV2 = {
    location : window.location.pathname,
    user : "",
    markdownConverter : new Markdown.Converter(),
    config : {
        gridView: false,
        sidebar: true,
        fixedNavbar: true,
        shortenText: false,
        featuredWrapper: false,
        endlessScroll: true,
        usersTagged: new Object(),
        imagesList: "https://github.com/leomoty/SGv2-Assets/raw/master/images-list.json"
    },
    images : {
        loader : 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
    },
    tags : {
        spoiler_pre_tag : '<span class="spoiler_blur"><span class="spoiler">',
        spoiler_pos_tag : '</span></span>'
    },
    clearGiveawayName : function (giveaway){
        return giveaway.replace(/[0-9]+ Copies of /, "");
    },
    getNumberOfCopies : function (giveaway){
        var index = giveaway.indexOf("Copies of");
        if(index == -1)
            return "1";
        return giveaway.substr(0,index - 1);
    },
    giveawayColorByType: function (el, hasGroup, hasWhitelist) {
        if (hasGroup && hasWhitelist) el.css('background-color', '#F06969');
        else if (hasGroup) el.css('background-color', 'rgba(63,115,0,0.95)');
        else if (hasWhitelist) el.css('background-color', '#556da9');
        return el;
    },
    generateStyles: function () {
        var styles = document.head.appendChild(document.createElement('style'));
        styles.innerHTML = '.short .markdown{overflow:hidden;max-height:100px;position:relative}.less__beautify{position:absolute;width:100%;bottom:0;display:none;background:-webkit-gradient(linear,left top,left bottom,from(rgba(240,242,245,0)),to(rgba(240,242,245,1)));background:-moz-linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));background:linear-gradient(top,rgba(240,242,245,0),rgba(240,242,245,1));height:20px}.less__beautify.sub{background:-webkit-gradient(linear,left top,left bottom,from(rgba(243,244,247,0)),to(rgba(243,244,247,1)));background:-moz-linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1));background:linear-gradient(top,rgba(243,244,247,0),rgba(243,244,247,1))}.short .less__beautify{display:block}.comment_more{display:none}.short .comment_more{display:block}.short .comment_less{display:none}.body{margin-top:39px}.header{margin-left:-25px;position:fixed;top:0;width:100%;z-index:100}.navbar_fixed{padding:0 25px}.gridview_flex{display:flex;flex-wrap:wrap;justify-content:center}.center_endless_loading{margin:0 auto;width:10%}.center_endless_end{margin:0 auto;width:20%}.settings_logo{color:#494c64}.preview{box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;background-color:rgba(255,255,255,.2);border:1px solid #cbcfdb;border-radius:4px;padding:15px;margin-top:10px}.preview_text{font-weight:700;margin-bottom:10px;color:#4b72d4}.highlight{border-radius:4px;box-shadow:1px 1px 0 #fff inset,0 7px 7px rgba(255,255,255,.37)inset;border:1px solid #da5d88;padding:15px}.gridview_flex .giveaway-summary__thumbnail-outer-wrap:hover{position:absolute;z-index:5;padding-bottom:116px}.tile_view_header{min-height:35px;margin-top:5px;font-size:12px}.hide_pagination{visibility:hidden;height:0;padding:0;margin:0}.tile_view_avatar_outer{float:right;display:inline-block;margin-left:5px}.tile_view_avatar{height:24px;width:24px;padding:2px}.tile_view_faded{width:184px;height:69px;margin-top:-69px;background-color:#fff;opacity:.75}';
        var spectrum = document.head.appendChild(document.createElement('style'));
        spectrum.innerHTML = SpectrumCSS;
    },
    calculateWinChance: function(copies, entries){
        var res = (+(parseFloat(copies)/parseFloat(entries))*100);
        return res === Number.POSITIVE_INFINITY ? 100 : res > 100 ? 100 : res.toFixed(2);
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
            $(eachDiv).css('height','91px'); //Chrome Canary 35 is calculating this div height wrongly, after gridview hover is applied once the extra space will stay.
            var whitelist = $(this).find('.giveaway-summary__column--whitelist');
            var group = $(this).find('.giveaway-summary__column--group');
            $(eachDiv).append(SGPlusV2.giveawayColorByType($(this).find('.giveaway-summary__thumbnail-outer-wrap'), group.length, whitelist.length));

            var gridview_extra = $('<div class="gridview_extra is-hidden"></div>');
            var giveawayName = $(this).find('.giveaway-summary__heading__name').text();
            var avatar = $(this).find('.giveaway-summary__avatar-outer-wrap');
            avatar.addClass('tile_view_avatar');
            var cost = $(this).find('.giveaway-summary__heading__points').text();
            cost = cost.substr(1,cost.length-2);
            var timeLeft = $(this).find('.fa-clock-o').next().text();
            var timeSplit = timeLeft.split(" ");
            var entries = $(this).find('.fa-tag').next().text();
            var entriesSplit = entries.split(" ");
            var comments = $(this).find('.fa-comment').next().text();
            var commentsSplit = comments.split(" ");
            var copies = SGPlusV2.getNumberOfCopies(giveawayName);
            if($(this).hasClass('is-faded'))
                $(eachDiv).children().first().append('<div class="tile_view_faded"></div>');

            $(gridview_extra).append('<div class="giveaway-summary__heading__name tile_view_header">' + SGPlusV2.clearGiveawayName(giveawayName) +  '</div>');
            $(gridview_extra).append('<div class="tile_view_avatar_outer">'+ avatar[0].outerHTML +'</div>');
            $(gridview_extra).append('<div style="float:left;"><strong>' + copies + '</strong> Copies</div>');
            $(gridview_extra).append('<div style="float:right;"><strong>' + cost + '</strong></div>');
            $(gridview_extra).append('<div style="clear:both;"></div>');
            if(timeSplit[0] === "Ended")
                $(gridview_extra).append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong></div>');
            else
                $(gridview_extra).append('<div style="margin-top:-14px;"><strong>' + timeSplit[0] + '</strong> ' + timeSplit[1] + '</div>');
            $(gridview_extra).append('<div style="clear:both;"></div>');
            $(gridview_extra).append('<div style="float:left;"><strong>' + entriesSplit[0] + '</strong> Entries</div>');
            $(gridview_extra).append('<div style="float:right;"><strong>' + SGPlusV2.calculateWinChance(copies,entriesSplit[0]) + '</strong>% Chance</div>');
            $(gridview_extra).append('<div style="clear:both;"></div>');
            $(gridview_extra).append('<div><strong>' + commentsSplit[0] + '</strong> Comments</div>');
            $(eachDiv).children().first().append(gridview_extra);
            $(container).append(eachDiv);
        });
        $(container).append($('<div style="margin-top: 5px; margin-bottom: 20px;width: 0px;height: 69px;"></div>')); //tricks browser in case of last line only having 1 giveaway
        $(container).find('.giveaway-summary__thumbnail-outer-wrap').hover(
            function(){
                $(this).find('.gridview_extra').removeClass('is-hidden');
            },
            function(){
                $(this).find('.gridview_extra').addClass('is-hidden');
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
        $('.pagination').addClass('hide_pagination');
        SGPlusV2.lastPage = $('.pagination__navigation > a').last().attr('data-page-number') || 1; //assumes this is the only page available if undefined
        $(window).scroll(function(){
            if(SGPlusV2.canLoadNewPage && $(window).scrollTop() >  ($('.pagination').offset().top - $(window).height())){
                var pos = SGPlusV2.lastLoadedPage + 1;
                SGPlusV2.canLoadNewPage = false;
                if(pos > SGPlusV2.lastPage){
                    $('#end').removeClass('is-hidden');
                    return;
                }
                $('.content').css('height','');
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
        if (SGPlusV2.location.indexOf('/giveaways/') == -1 || SGPlusV2.location.indexOf('/user/') >= 0 || SGPlusV2.location.indexOf('/giveaways/new') >= 0)
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
    userTaggingSelectedColor : "",
    isUserTaggingPromptVisible : true,
    tagComments : function(){
        /** Needs a check to see if it is a valid page **/
        var users = SGPlusV2.config.usersTagged;
        for(var x in users)
            $('.comment__username a[href="/user/' + x + '"]').parent().append('<a style="margin-left: 5px; color:'+users[x].color + '">' + users[x].tag + '</a>');
    },
    persistUserTagging : function(){
        chrome.storage.sync.set({'users_tagged': SGPlusV2.config.usersTagged});
    },
    toggleUserTagging : function(){
        if(SGPlusV2.location.indexOf('/user/') == -1)
            return;

        var userName = $('.featured__heading').text().trim();

        if(SGPlusV2.user == userName)
            return;

        var content = SGPlusV2.config.usersTagged.hasOwnProperty(userName) ? SGPlusV2.config.usersTagged[userName].tag : "";
        var color = SGPlusV2.config.usersTagged.hasOwnProperty(userName) ? SGPlusV2.config.usersTagged[userName].color : "#000000";

        if(!SGPlusV2.isUserTaggingPromptVisible)            
            $('.featured__heading').append($('<div class="color-target" style="margin-left:10px; color:'+color+'">' + content + '</div><div style="margin-left: 10px;"><input type="text" value="' + color + '" class="color-palette is-hidden"></div>'));
        else{
            $('.featured__heading').append($('<div style="margin-left:10px;"><input class="color-target" type="text" style="height: 40px;width: 200px; color:'+color+'"></div><div style="margin-left: 10px;"><input type="text" value="' + color + '" class="color-palette is-hidden"><div style="margin-left: 10px" class="form__submit-button user-tagging-submit">Save</div></div>'));
            $('.color-target').val(content);
            $('.user-tagging-submit').on("click", function(){
                SGPlusV2.config.usersTagged[userName] = {tag: $('.color-target').val(), color: SGPlusV2.userTaggingSelectedColor};
                SGPlusV2.persistUserTagging();
            });
        }
        $(".color-palette").spectrum({
            showPalette: true,
            clickoutFiresChange: true,
            showSelectionPalette: false,
            palette: [
                ['green', 'red', 'blue'],
                ['purple', 'pink', 'orange']
            ],
            change: function(color){
                SGPlusV2.userTaggingSelectedColor = color.toHexString();
                $('.color-target').css('color',color.toHexString());
            }
        });
    },
    createSettingsPageLink : function(){
        $('.nav__right-container a[href="/account/sync"]:last').after($('<a target="_blank" class="nav__row" href="chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/settings.html"><i class="settings_logo fa fa-cog fa-fw"></i><div class="nav__row__summary"><p class="nav__row__summary__name">Steamgifts Plus V2</p><p class="nav__row__summary__description">Open Steamgifts Plus V2 settings page.</p></div></a>'));
    },
    addHandlers : function(){

        $('.sidebar').next().addClass('content');

        var scriptImage = document.head.appendChild(document.createElement('script'));
        scriptImage.innerHTML = " \
        var callImages = function(json){\
			needle = $('.sidebar').find(\"a[href*='store.steampowered.com']\").attr('href');\
			$.each(json.images, function(index, value){\
				if(needle.indexOf(value.app) >= 0)\
					$('.featured__outer-wrap').css('background-image','url(' + value.link + ')');\
			});\
    	}"

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
	/** Hides comment i from page (starting from 0) **/
	hideComment : function(i) {
		if(SGPlusV2.location.indexOf('/giveaway') == 0 || SGPlusV2.location.indexOf('/discussion') == 0){
			if(SGPlusV2.location.indexOf('/discussion') == 0){
					i++; //comments on forum pages begin at 1
			}
			//hides comment from view
			$("#" + $(".comment__summary")[i].id).parent().hide();
		}
	},
	/** Makes visible comment i from page (starting from 0) **/
	showComment : function(i) {
		if(SGPlusV2.location.indexOf('/giveaway') == 0 || SGPlusV2.location.indexOf('/discussion') == 0){
			if(SGPlusV2.location.indexOf('/discussion') == 0){
					i++; //comments on forum pages begin at 1
			}
			//returns comment to view
			$("#" + $(".comment__summary")[i].id).parent().show();
		}
	},
    setGiveawayCustomBackground : function(){
    	if(SGPlusV2.location.indexOf('/giveaway/') == -1)
    		return;
		$.ajax({
			url: SGPlusV2.config.imagesList,
			jsonp: "callImages",
		    dataType: "jsonp"
		});
    },
    init_nondelayed : function() {
    	SGPlusV2.user = $('.nav__avatar-inner-wrap').attr('href').replace('/user/','');
        SGPlusV2.addHandlers();
        SGPlusV2.generateStyles();
        SGPlusV2.addGroupLink();
        SGPlusV2.putImagesInPlace();
        SGPlusV2.generateMarkdownLivePreview();
        SGPlusV2.highlightComment();
        SGPlusV2.setGiveawayCustomBackground();
    },
    init_delayed: function(){
        if(SGPlusV2.config.featuredWrapper === true)
            SGPlusV2.hideFeaturedWrapper();
        if(SGPlusV2.config.gridView === true){
            var content = SGPlusV2.generateGridview($('.pagination').prev());
            $($('.page__heading').next()[0]).html(content);

            //bug fix, force the div size to be recalculated else it might keep the old height (chrome 34).
            if (SGPlusV2.location.indexOf('/user/') == -1 && (SGPlusV2.location.indexOf('/giveaways/open') >= 0 || SGPlusV2.location.indexOf('/giveaways/closed') >= 0
            || SGPlusV2.location.indexOf('/giveaways/coming-soon') >= 0 || SGPlusV2.location.indexOf('/giveaways/today') >= 0)){
	            var sum = 0;
	            $('.content').children().each(function(){
	            	sum += $(this).height();
	            }); 
	            $('.content').height(sum+100); 
	            $(window).scrollTop(0);
            }
        }
        if(SGPlusV2.config.sidebar === true)
            SGPlusV2.generateScrollingSidebar();
        if(SGPlusV2.config.fixedNavbar === true)
            SGPlusV2.generateFixedNavbar();
        if(SGPlusV2.config.shortenText === true)
            SGPlusV2.generateShortenedText();
        if(SGPlusV2.config.endlessScroll === true)
            SGPlusV2.generateEndlessScroll();
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
                if(settings.users_tagged === undefined) {
                    SGPlusV2.persistUserTagging();
                } else {
                    SGPlusV2.config.usersTagged = settings.users_tagged;
                }                

                SGPlusV2.config.gridView = settings.gridview;
                SGPlusV2.config.shortenText =  settings.shorten_comments;
                SGPlusV2.config.sidebar = settings.scrolling_sidebar;
                SGPlusV2.config.fixedNavbar = settings.fixed_navbar;
                SGPlusV2.config.featuredWrapper = settings.featured_wrapper;
                SGPlusV2.config.endlessScroll = settings.endless_scroll;
                

                SGPlusV2.createSettingsPageLink(); //only for chrome for now
                SGPlusV2.toggleUserTagging(); //it won't work with firefox since we don't have settings there yet...
                SGPlusV2.tagComments();

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
