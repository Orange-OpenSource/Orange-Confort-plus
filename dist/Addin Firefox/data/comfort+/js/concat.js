// Source: app/js/jquery.min.js
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});

// Source: app/conf/extensionFirefox/hebergement.js
var uci_classic_toolbar_css = self.options.css;
var imagesPath = {
    btnclosecross: self.options.btnclosecross,
    btnminus: self.options.btnminus,
    btnplus: self.options.btnplus,
    arrows: self.options.arrows,
    icoinit: self.options.icoinit,
    icohelp: self.options.icohelp,
};
var fontsPath = {
    opendyslexicregular: self.options.opendyslexicregular,
    opendyslexicitalic: self.options.opendyslexicitalic,
    opendyslexicbold: self.options.opendyslexicbold,
    opendyslexicbolditalic: self.options.opendyslexicbolditalic,
};
var jquery_min_js = self.options.jquery;
var ruler_js = self.options.ruler;
var helpPath = {
    fr: self.options.helpfr,
    en: self.options.helpen,
    es: self.options.helpes
};
var hebergementFullPath='';
// Source: app/js/ToolbarStrings.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/* 
 * String localization Manager
 */
var traduction = [];
function ToolbarStrings() {
    /**
     * A {String} reprensenting Locale code
     * @private
     */
    var locale = "en";
    /**
     * A {String} reprensenting default Locale code
     * @private
     */
    var defaultLocale = "en";
    /* local to default to - see setLocale() */

    /**
     * Set in which language the toolbar is supposed to speak
     * based on html@lang or body@lang
     * if none is set or none can be found in localeStrings[]
     * then locale = defaultLocale
     * @return nothing
     */
    this.setLocale = function () {
        var htmlTag = document.getElementsByTagName("html")[0];
        /* HTML tag <html> of the page */
        var bodyTag = document.getElementsByTagName("body")[0];
        /* HTML tag <body> of the page */        
        this.locale = ((htmlTag.lang) ? htmlTag.lang : (htmlTag.getAttribute("xml:lang")) ? htmlTag.getAttribute("xml:lang") : (bodyTag.lang) ? bodyTag.lang : defaultLocale).substr(0,2);
        if (!this.locale || !traduction[this.locale]) {
            this.locale = defaultLocale;
        }
        //Debug.log("locale (final): " + locale);
        
    };

    /**
     * Get the locale code used by the tool-bar
     * @return {String} the locale used
     */
    this.getLocale = function () {
        return this.locale;
    };

    /**
     * Fonction permettant de mettre a jour la variable locale concernant la langue
     * @param {String} str the string reference to language
     */
    this.setMyLocale = function (langue) {
        this.locale = langue;
    };

    /**
     * Get the text corresponding to the specified reference in the defined language
     * @param {String} str the string reference to get
     * @return {String} txt the desired text
     */
    this.get = function (str) {
        return traduction[this.locale][str];
    };
}
// Source: app/js/UciUserPref.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
/**
 * User pref stackv3 generic class.<br />
 @class Collection of user preference
 */
function UciUserPref() {
this.storedValue = false;
    this.finish = false;
 
    
    /**
     * Collection of mask used to get value of necessary bits
     * for each encoded variable
     * @private
     */
    this.couleurs={"00": "#FFFFFF",  "01": "#330000",  "02": "#331900",  "03": "#333300",  "04": "#193300",  "05": "#003300",  "06": "#003319",  "07": "#003333",  "08": "#001933",  "09": "#000033",  "10": "#190033",  "11": "#330033",  "12": "#330019",  "13": "#000000",  "14": "#990000",  "15": "#994C00",  "16": "#999900",  "17": "#4C9900",  "18": "#009900",  "19": "#00994C",  "20": "#009999",  "21": "#004C99",  "22": "#000099",  "23": "#4C0099",  "24": "#990099",  "25": "#99004C",  "26": "#404040",  "27": "#FF0000",  "28": "#FF8000",  "29": "#FFFF00",  "30": "#80FF00",  "31": "#00FF00",  "32": "#00FF80",  "33": "#00FFFF",  "34": "#0080FF",  "35": "#0000FF",  "36": "#7F00FF",  "37": "#FF00FF",  "38": "#FF007F",  "39": "#808080",  "40": "#FF6666",  "41": "#FFB266",  "42": "#FFFF66",  "43": "#B2FF66",  "44": "#66FF66",  "45": "#66FFB2",  "46": "#66FFFF",  "47": "#66B2FF",  "48": "#6666FF",  "49": "#B266FF",  "50": "#FF66FF",  "51": "#FF66B2",  "52": "#C0C0C0",  "53": "#FFCCCC",  "54": "#FFE5CC",  "55": "#FFFFCC",  "56": "#E5FFCC",  "57": "#CCFFCC",  "58": "#CCFFE5",  "59": "#CCFFFF",  "60": "#CCE5FF",  "61": "#CCE5FF",  "62": "#E5CCFF",  "63": "#FFCCFF",  "64": "#FFCCE5",  "65": "#000000"};
    
    /**
     * Convertion matrix used to get associated string value corresponding
     * to encoded bit. Each key and value are prefixed by param name in
     * order to ensure bijection as it or when matrix is reverted.
     * @private
     */
    this.convertMatrixv3 = {
        "a11yApercuAuto-0":     "a11yApercuAuto-false",
        "a11yApercuAuto-1":     "a11yApercuAuto-off",
        "a11ySiteWebEnabled-0": "a11ySiteWebEnabled-on",
        "a11ySiteWebEnabled-1": "a11ySiteWebEnabled-off",
        "a11yToolbarEnable-0": "a11yToolbarEnable-off",
        "a11yToolbarEnable-1": "a11yToolbarEnable-on",
        "a11yLanguage-0": "a11yLanguage-keepit",
        "a11yLanguage-1": "a11yLanguage-fr",
        "a11yLanguage-2": "a11yLanguage-en",
        "a11yLanguage-3": "a11yLanguage-es",
        "a11yJumpToContent-0": "a11yJumpToContent-false",
        "a11yJumpToContent-1": "a11yJumpToContent-true",
        "a11yLinearize-0": "a11yLinearize-false",
        "a11yLinearize-1": "a11yLinearize-true",
        //Gestion de la taille de police
        "a11yBigger-0": "a11yBigger-keepit",
        "a11yBigger-1": "a11yBigger-150",
        "a11yBigger-2": "a11yBigger-200",
        "a11yVisualSettings-0": "a11yVisualSettings-predefined",
        "a11yVisualSettings-1": "a11yVisualSettings-personnal",
        "a11yVisualPredefinedSettings-0": "a11yVisualPredefinedSettings-keepit",
        "a11yVisualPredefinedSettings-1": "a11yVisualPredefinedSettings-whiteonblack",
        "a11yVisualPredefinedSettings-2": "a11yVisualPredefinedSettings-blackonwhite",
        "a11yMotorModeEnabled-0": "a11yMotorModeEnabled-false",
        "a11yMotorModeEnabled-1": "a11yMotorModeEnabled-true",
        "a11yMotorMode-0": "a11yMotorMode-remote",
        "a11yMotorMode-1": "a11yMotorMode-looping",
        "a11yDelayBeforeClick-0": "a11yDelayBeforeClick-1",
        "a11yDelayBeforeClick-1": "a11yDelayBeforeClick-2",
        "a11yDelayBeforeClick-2": "a11yDelayBeforeClick-3",
        "a11yDelayBeforeClick-3": "a11yDelayBeforeClick-6",
        "a11yMenuPositionning-0": "a11yMenuPositionning-center",
        "a11yMenuPositionning-1": "a11yMenuPositionning-nextto",
        "a11yDelayBeforeLoop-0": "a11yDelayBeforeLoop-1",
        "a11yDelayBeforeLoop-1": "a11yDelayBeforeLoop-2",
        "a11yDelayBeforeLoop-2": "a11yDelayBeforeLoop-3",
        "a11yDelayBeforeLoop-3": "a11yDelayBeforeLoop-6",
        "a11yQuickMode-0": "a11yQuickMode-2",
        "a11yQuickMode-1": "a11yQuickMode-5",
        "a11yQuickMode-2": "a11yQuickMode-10",
        "a11yCharSpacement-0": "a11yCharSpacement-keepit",
        "a11yCharSpacement-1": "a11yCharSpacement-0.2",
        "a11yCharSpacement-2": "a11yCharSpacement-0.5",
        "a11yDyslexyFontEnabled-0": "a11yDyslexyFontEnabled-false",
        "a11yDyslexyFontEnabled-1": "a11yDyslexyFontEnabled-on",
        "a11yDyslexyFont-0": "a11yDyslexyFont-arial",
        "a11yDyslexyFont-1": "a11yDyslexyFont-opendyslexic",
        "a11yLineSpacement-0": "a11yLineSpacement-keepit",
        "a11yLineSpacement-1": "a11yLineSpacement-2",
        "a11yLineSpacement-2": "a11yLineSpacement-3",
        //gestion de l'espacement des mot
        "a11ySpacement-0": "a11ySpacement-keepit",
        "a11ySpacement-1": "a11ySpacement-0.5",
        "a11ySpacement-2": "a11ySpacement-1",
        //gestion de la casse des mots
        "a11yModifCasseEnabled-0" : "a11yModifCasseEnabled-false",
        "a11yModifCasseEnabled-1" : "a11yModifCasseEnabled-on",
        "a11yModifCasse-0": "a11yModifCasse-capitalize",
        "a11yModifCasse-1": "a11yModifCasse-uppercase",
        "a11yModifCasse-2": "a11yModifCasse-lowercase",
        //gestion de l'apparence ; Alignement a gauche
        "a11yLeftText-0":           "a11yLeftText-false",
        "a11yLeftText-1":           "a11yLeftText-left",
        //gestion de l'apparence ; Numeroatation en mode list
        "a11yNumerotationList-0":   "a11yNumerotationList-false",
        "a11yNumerotationList-1":   "a11yNumerotationList-decimal",
        //gestion des liens
        "a11yNavLienEnabled-0":     "a11yNavLienEnabled-false",
        "a11yNavLienEnabled-1":     "a11yNavLienEnabled-true",
        //gestion liens selectionnées
        "a11yNavLienSelStyle-0":    "a11yNavLienSelStyle-keepit",
        "a11yNavLienSelStyle-1":    "a11yNavLienSelStyle-border",
        "a11yNavLienSelStyle-2":    "a11yNavLienSelStyle-underline",
        "a11yNavLienSelStyle-3":    "a11yNavLienSelStyle-bold",
        //gestion liens Non visités
        "a11yNavLienNonVisStyle-0":    "a11yNavLienNonVisStyle-keepit",
        "a11yNavLienNonVisStyle-1":    "a11yNavLienNonVisStyle-border",
        "a11yNavLienNonVisStyle-2":    "a11yNavLienNonVisStyle-underline",
        "a11yNavLienNonVisStyle-3":    "a11yNavLienNonVisStyle-bold",
        //gestion liens Visités
        "a11yNavLienVisStyle-0":    "a11yNavLienVisStyle-keepit",
        "a11yNavLienVisStyle-1":    "a11yNavLienVisStyle-border",
        "a11yNavLienVisStyle-2":    "a11yNavLienVisStyle-underline",
        "a11yNavLienVisStyle-3":    "a11yNavLienVisStyle-bold",
        //gestion règle
        "a11yRegleEnabled-0":      "a11yRegleEnabled-false",
        "a11yRegleEnabled-1":       "a11yRegleEnabled-true",
        "a11yRegleVertical-0" :     "a11yRegleVertical-false",
        "a11yRegleVertical-1" :     "a11yRegleVertical-true",
        "a11yRegleHorizontal-0" :   "a11yRegleHorizontal-false",
        "a11yRegleHorizontal-1" :   "a11yRegleHorizontal-true",

        "a11yRegleEpaisseur-0" :    "a11yRegleEpaisseur-thin",
        "a11yRegleEpaisseur-1" :    "a11yRegleEpaisseur-medium",
        "a11yRegleEpaisseur-2" :    "a11yRegleEpaisseur-thick",

        "a11ySupEffetTransp-0":     "a11ySupEffetTransp-false",
        "a11ySupEffetTransp-1":     "a11ySupEffetTransp-1",
        "a11ySupImageFont-0" :      "a11ySupImageFont-false",
        "a11ySupImageFont-1" :      "a11ySupImageFont-true",
        "a11ySupImageFirstPlan-0" : "a11ySupImageFirstPlan-false",
        "a11ySupImageFirstPlan-1" :  "a11ySupImageFirstPlan-true",
        /**
         * Reverse the matrix. Keys becomes values and values becomes keys.*/
        reverse: function () {
            var temp = {}, prop;
            for (prop in this) {
                if (prop !== "reverse") {
                    temp[this[prop]] = prop;
                }
            }
            return temp;
        }
    };
    
    /**
     * Create the var for each color
     */
    this.create_color = function(paramname){
        for(var key in this.couleurs){
            this.convertMatrixv3[paramname + key]=paramname+this.couleurs[key];
        }
    };

    this.create_color('a11yFontColor-');
    this.create_color('a11yBackgroundColor-');
    this.create_color('a11yNavLienSelColor-');
    this.create_color('a11yNavLienNonVisColor-');
    this.create_color('a11yNavLienVisColor-');
    this.create_color('a11yRegleColor-');
    
    this.maskMatrixv3 = {
        // Mask Name                | Dec Value
        "a11ySiteWebEnabled":     [46,1],
        "a11yApercuAuto":         [45,1],
        "a11yToolbarEnable":      [44,1],
        "a11yLanguage":           [43,1],
        "a11yJumpToContent":      [42,1],
        "a11yLinearize":          [41,1],
        "a11yBigger":             [40,1],
        "a11yVisualSettings":     [39,1],
        "a11yVisualPredefinedSettings": [38,1],
        "a11yFontColor":          [36,2],
        "a11yBackgroundColor":    [34,2],
        "a11yMotorModeEnabled":   [33,1],
        "a11yMotorMode":          [32,1],
        "a11yDelayBeforeClick":   [31,1],
        "a11yMenuPositionning":   [30,1],
        "a11yDelayBeforeLoop":    [29,1],
        "a11yQuickMode":          [28,1],
        "a11yCharSpacement":      [27,1],
        "a11yDyslexyFontEnabled": [26,1],
        "a11yDyslexyFont":        [25,1],
        "a11yLineSpacement":      [24,1],
        "a11ySpacement":          [23,1],
        "a11yModifCasseEnabled":  [22,1],
        "a11yModifCasse":         [21,1],
        "a11yLeftText":           [20,1],
        "a11yNumerotationList":   [19,1],
        "a11yNavLienEnabled":     [18,1],
        "a11yNavLienSelColor":    [16,2],
        "a11yNavLienSelStyle":    [15,1],
        "a11yNavLienNonVisColor": [13,2],
        "a11yNavLienNonVisStyle": [12,1],
        "a11yNavLienVisColor":    [10,2],
        "a11yNavLienVisStyle":    [9,1],
        "a11yRegleEnabled":       [8,1],
        "a11yRegleVertical" :     [7,1],
        "a11yRegleHorizontal" :   [6,1],
        "a11yRegleColor":         [4,2],
        "a11yRegleEpaisseur" :    [3,1],
        "a11ySupEffetTransp":     [2,1],
        "a11ySupImageFont" :      [1,1],
        "a11ySupImageFirstPlan" : [0,1]
    };
    
    /**
     * User preference stackv3. Used to save user preference.
     * Initialized with default value.
     * @private
     */
    this.stackv3 = {
        "a11yToolbarEnable": "off",
        "a11yLanguage": "keepit",
        "a11yJumpToContent": "false",
        "a11yLinearize": "false",
        "a11yBigger": "keepit",
        "a11yVisualSettings": "predefined",
        "a11yVisualPredefinedSettings": "keepit",
        "a11yFontColor": "#000000",
        "a11yBackgroundColor": "#FFFFFF",
        "a11yMotorModeEnabled": "false",
        "a11yMotorMode": "remote",
        "a11yDelayBeforeClick": "1",
        "a11yMenuPositionning": "center",
        "a11yDelayBeforeLoop": "1",
        "a11yQuickMode": "2",
        "a11yCharSpacement": "keepit",
        "a11yDyslexyFontEnabled": "false",
        "a11yDyslexyFont": "arial",
        "a11yLineSpacement" : "keepit",
        "a11ySpacement": "keepit",
        "a11yModifCasseEnabled": "false",
        "a11yModifCasse" : "capitalize",
        "a11yLeftText":           "false",
        "a11yNumerotationList":   "false",
        "a11yNavLienEnabled":     "false",
        "a11yNavLienSelColor":    "#000000",
        "a11yNavLienSelStyle":    "keepit",
        "a11yNavLienNonVisColor": "#000000",
        "a11yNavLienNonVisStyle": "keepit",
        "a11yNavLienVisColor":    "#000000",
        "a11yNavLienVisStyle":    "keepit",
        "a11yRegleEnabled":       "false",
        "a11yRegleVertical" :     "false",
        "a11yRegleHorizontal" :   "true",
        "a11yRegleColor" :        "#000000",
        "a11yRegleEpaisseur" :    "thin",
        "a11ySupEffetTransp":     "false",
        "a11ySupImageFont" :     "false",
        "a11ySupImageFirstPlan" : "false",
        "a11ySiteWebEnabled" : "on",
        "a11yApercuAuto" : "false"
    };
    
    /***************************************************Ancienne version du cookie************************************/
    var maskMatrix = {
        // Mask Name            | Dec Value    |  Bin Value
        "a11yJumpToContent": 1            // 00000000000000000000000000000001
        , "a11yLinearize": 2            // 00000000000000000000000000000010
        , "a11yBigger": 12                // 00000000000000000000000000001100
        , "a11yVisualSettings": 48        // 00000000000000000000000000110000
        , "a11yFontColor": 1984            // 00000000000000000000011111000000
        , "a11yBackgroundColor": 63488    // 00000000000000001111100000000000
        , "a11yMotorModeEnabled": 65536    // 00000000000000010000000000000000
        , "a11yMotorMode": 131072        // 00000000000000100000000000000000
        , "a11yDelayBeforeClick": 786432// 00000000000011000000000000000000
        , "a11yMenuPositionning": 1048576// 00000000000100000000000000000000
        , "a11yDelayBeforeLoop": 6291456// 00000000011000000000000000000000
        , "a11yQuickMode": 25165824        // 1100000000000000000000000
    };
    
    /**
     * Convertion matrix used to get associated string value corresponding
     * to encoded bit. Each key and value are prefixed by param name in
     * order to ensure bijection as it or when matrix is reverted.
     * @private
     */
    var convertMatrix = {
        // Mask+Value                        | Literal Value                        | Bin Mask Value
        // ------------------------------------------------------------------------------------------------------------
        "a11yJumpToContent-0"            :    "a11yJumpToContent-false"
        ,"a11yJumpToContent-1"            :    "a11yJumpToContent-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yLinearize-0"                :    "a11yLinearize-false"
        ,"a11yLinearize-2"                :    "a11yLinearize-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yBigger-0"                    :    "a11yBigger-keepit"
        ,"a11yBigger-4"                    :    "a11yBigger-150"
        ,"a11yBigger-8"                    :    "a11yBigger-200"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yVisualSettings-0"            :    "a11yVisualSettings-predefined"
        ,"a11yVisualSettings-16"        :    "a11yVisualSettings-personnal"
        ,"a11yVisualSettings-32"        :    "a11yVisualSettings-personnal"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yFontColor-0"                :    "a11yFontColor-#FFFFFF"
        ,"a11yFontColor-64"                :    "a11yFontColor-#000000"
        ,"a11yFontColor-128"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-192"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-256"            :    "a11yFontColor-#FF8000"
        ,"a11yFontColor-320"            :    "a11yFontColor-#FFB266"
        ,"a11yFontColor-384"            :    "a11yFontColor-#FFFF00"
        ,"a11yFontColor-448"            :    "a11yFontColor-#FFFF00"
        ,"a11yFontColor-512"            :    "a11yFontColor-#B2FF66"
        ,"a11yFontColor-576"            :    "a11yFontColor-#80FF00"
        ,"a11yFontColor-640"            :    "a11yFontColor-#00FF80"
        ,"a11yFontColor-704"            :    "a11yFontColor-#00FF80"
        ,"a11yFontColor-768"            :    "a11yFontColor-#00FFFF"
        ,"a11yFontColor-832"            :    "a11yFontColor-#00FFFF"
        ,"a11yFontColor-896"            :    "a11yFontColor-#0080FF"
        ,"a11yFontColor-960"            :    "a11yFontColor-#0080FF"
        ,"a11yFontColor-1024"            :    "a11yFontColor-#0000FF"
        ,"a11yFontColor-1088"            :    "a11yFontColor-#0000FF"
        ,"a11yFontColor-1152"            :    "a11yFontColor-#000099"
        ,"a11yFontColor-1216"            :    "a11yFontColor-#4C0099"
        ,"a11yFontColor-1280"            :    "a11yFontColor-#7F00FF"
        ,"a11yFontColor-1344"            :    "a11yFontColor-#B266FF"
        ,"a11yFontColor-1408"            :    "a11yFontColor-#FF00FF"
        ,"a11yFontColor-1472"            :    "a11yFontColor-#FF00FF"
        ,"a11yFontColor-1536"            :    "a11yFontColor-#FF66B2"
        ,"a11yFontColor-1600"            :    "a11yFontColor-#FF007F"
        ,"a11yFontColor-1664"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-1728"            :    "a11yFontColor-#990000"
        ,"a11yFontColor-1792"            :    "a11yFontColor-#330000"
        ,"a11yFontColor-1856"            :    "a11yFontColor-#330000"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yBackgroundColor-0"        :    "a11yBackgroundColor-#FFFFFF"
        ,"a11yBackgroundColor-2048"        :    "a11yBackgroundColor-#000000"
        ,"a11yBackgroundColor-4096"        :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-6144"        :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-8192"        :    "a11yBackgroundColor-#FF8000"
        ,"a11yBackgroundColor-10240"    :    "a11yBackgroundColor-#FFB266"
        ,"a11yBackgroundColor-12288"    :    "a11yBackgroundColor-#FFFF00"
        ,"a11yBackgroundColor-14336"    :    "a11yBackgroundColor-#FFFF00"
        ,"a11yBackgroundColor-16384"    :    "a11yBackgroundColor-#B2FF66"
        ,"a11yBackgroundColor-18432"    :    "a11yBackgroundColor-#80FF00"
        ,"a11yBackgroundColor-20480"    :    "a11yBackgroundColor-#00FF80"
        ,"a11yBackgroundColor-22528"    :    "a11yBackgroundColor-#00FF80"
        ,"a11yBackgroundColor-24576"    :    "a11yBackgroundColor-#00FFFF"
        ,"a11yBackgroundColor-26624"    :    "a11yBackgroundColor-#00FFFF"
        ,"a11yBackgroundColor-28672"    :    "a11yBackgroundColor-#0080FF"
        ,"a11yBackgroundColor-30720"    :    "a11yBackgroundColor-#0080FF"
        ,"a11yBackgroundColor-32768"    :    "a11yBackgroundColor-#0000FF"
        ,"a11yBackgroundColor-34816"    :    "a11yBackgroundColor-#0000FF"
        ,"a11yBackgroundColor-36864"    :    "a11yBackgroundColor-#000099"
        ,"a11yBackgroundColor-38912"    :    "a11yBackgroundColor-#4C0099"
        ,"a11yBackgroundColor-40960"    :    "a11yBackgroundColor-#7F00FF"
        ,"a11yBackgroundColor-43008"    :    "a11yBackgroundColor-#B266FF"
        ,"a11yBackgroundColor-45056"    :    "a11yBackgroundColor-#FF00FF"
        ,"a11yBackgroundColor-47104"    :    "a11yBackgroundColor-#FF00FF"
        ,"a11yBackgroundColor-49152"    :    "a11yBackgroundColor-#FF66B2"
        ,"a11yBackgroundColor-51200"    :    "a11yBackgroundColor-#FF007F"
        ,"a11yBackgroundColor-53248"    :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-55296"    :    "a11yBackgroundColor-#990000"
        ,"a11yBackgroundColor-57344"    :    "a11yBackgroundColor-#330000"
        ,"a11yBackgroundColor-59392"    :    "a11yBackgroundColor-#330000"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMotorModeEnabled-0"        :    "a11yMotorModeEnabled-false"
        ,"a11yMotorModeEnabled-65536"    :    "a11yMotorModeEnabled-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMotorMode-0"                :    "a11yMotorMode-remote"
        ,"a11yMotorMode-131072"            :    "a11yMotorMode-looping"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yDelayBeforeClick-0"        :    "a11yDelayBeforeClick-1"
        ,"a11yDelayBeforeClick-262144"    :    "a11yDelayBeforeClick-2"
        ,"a11yDelayBeforeClick-524288"    :    "a11yDelayBeforeClick-3"
        ,"a11yDelayBeforeClick-786432"    :    "a11yDelayBeforeClick-6"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMenuPositionning-0"        :    "a11yMenuPositionning-center"
        ,"a11yMenuPositionning-1048576"    :    "a11yMenuPositionning-nextto"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yDelayBeforeLoop-0"        :    "a11yDelayBeforeLoop-1"
        ,"a11yDelayBeforeLoop-2097152"    :    "a11yDelayBeforeLoop-2"
        ,"a11yDelayBeforeLoop-4194304"    :    "a11yDelayBeforeLoop-3"
        ,"a11yDelayBeforeLoop-6291456"    :    "a11yDelayBeforeLoop-6"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yQuickMode-0"                :    "a11yQuickMode-2"
        ,"a11yQuickMode-8388608"        :    "a11yQuickMode-5"
        ,"a11yQuickMode-16777216"        :    "a11yQuickMode-10"
        // ------------------------------------------------------------------------------------------------------------

        /**
         * Reverse the matrix. Keys becomes values and values becomes keys.
         */
        , reverse: function () {
            var temp = {};
            for (var prop in this) {
                if (prop != "reverse") {
                    temp[this[prop]] = prop;
                }
            }
            return temp;
        }
    };

    /**
     * Decode an encoded pref using mask matrix and convert matrix.
     * The encoded pref is a representation of a number in hexadecimal.
     * each mask of the matrix is applied in order to get the corresponding bit
     * of a pref. This value is used as an index with the convert matrix to get
     * the corresponding textual value.
     * @param {String} pref representing a number in
     * hexadecimal representation
     */
    /*jshint validthis:true */
    this.decode = function (/* String*/ pref) {
        var prefName;
        // uniquement si le nombre de caractères du cookie est correct!
        if(pref.length===47)
        {
           
          for (prefName in this.maskMatrixv3) {
             this.stackv3[prefName]= this.convertMatrixv3[prefName + "-" +pref.substr(this.maskMatrixv3[prefName][0],this.maskMatrixv3[prefName][1])].replace(/.*-/, "");
          }
        }else{
            //ancienne version du cookie
            for (var prefName in maskMatrix) {
                this.stackv3[prefName] = convertMatrix[prefName + "-" + (parseInt(pref, 16) & maskMatrix[prefName])].replace(/.*-/, "");
            }
            // then update the cookie value
            this.updateUserPref();
        }
    };

    /**
     * Encode the user preference stackv3 in a hexadecimal number.
     * Each user preference is used as an index in the convert matrix reversed.
     * the corresponding value is then merged.
     * @return {String} representation of a number in hexadecimal representation
     */
    this.encode = function () {
        var pref = "";
        var tempMatrix = this.convertMatrixv3.reverse();
        var prefName;
        for (prefName in this.maskMatrixv3) {
            if (prefName !== "") {
                // si la pref existe dans le stack sinon 0
                if(prefName in this.stackv3) {
                    pref = tempMatrix[prefName + "-" + this.stackv3[prefName]].replace(/.*-/, "") + pref;
                }
                // on garantie la longeur de la chaine
                else {
                    pref = "0"+pref;
                }
            }
        }
        pref = pref.substring(0,pref.length-1);
        return pref;
    };

    /**
     * Return the value of a given user preference name
     * @param {String} param representing the user preference name
     * @return {String} value : the corresponding user preference value. Could be a string or a number.
     */
    this.get = function (/*String*/param) {
        return (this.stackv3[param] !== null ? this.stackv3[param] : "");
    };

    /**
     * Save the value of a given user preference name into the stackv3
     * @param {String} prefName the user preference name
     * @param {String} prefValue the corresponding user preference value.
     */
    /*jshint validthis:true */
    this.set = function (/* String */prefName, /* String */prefValue) {
        this.stackv3[prefName] = prefValue;
    };

    /**
     * Concatenate user preference into a string with the format : param1=val1&param2=val2....paramX=valX.
     * @return {String} stackv3String : string representing user preference concatenation
     */
    this.stackv3ToString = function () {
        var stackv3String = "";
        var prop;
        for (prop in stackv3) {
            if (prop !== "") {
                stackv3String += prop + "=" + this.stackv3[prop] + "&";
            }
        }
        return stackv3String.replace(/&$/, "");
    };
    /*
     * @constructor init
     */
    this.setStoredValue = function (storedValue) {
        this.storedValue = storedValue;
        this.readUserPref();
    };

    /**
     * Read browser cookies and save each user preference into the user
     * preference stackv3.
     */
    this.readUserPref = function () {
        if(this.storedValue !== false)
        {
            this.decode(this.storedValue);
        }
        this.finish = true;
    };

    /**
     * Wait for callback completed and user preference stackv3 updated
     * @return {Boolean} true if user preference is loaded, false otherwise.
     */
    this.isUserPrefLoaded = function () {
        return this.finish;
    };
}
// Source: app/js/UciSimpleStorage.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
/**
 * User pref stackv3 used by the toolbar stored in extension (simple-storage API).<br />


 *  Can retrieve data from PNS or cookie
 @class Collection of user preference
 */

function UciStorage() {
/*****************************************************************************************************************/

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function() {
        // Update the cdu cookies with the stackv3 value
        var pref = this.encode();
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = ''+pref+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
        this.postMessage("orangecomfort+userprefsave", pref, document.location.href);
        if(accessibilitytoolbar.needToReload)
        {
            accessibilitytoolbar.reloadToolbar();
        }
    };
    
    this.postMessage = function(message, value, targetOrigin) {
    	if(typeof chrome === 'undefined') {
        	// extension firefox
			if(value) {
				message = message + "_" + value;
			}
        	window.postMessage(message, targetOrigin);
        }
        else {
        	// extension chrome
			if(value) {
				chrome.runtime.sendMessage({message: message, value:value});
			} 
			else {
				chrome.runtime.sendMessage({message: message});
			}
        }
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = this.storedValue.substr(0,this.storedValue.length-1)+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
        this.postMessage("orangecomfort+blacklistsave", document.location.hostname, document.location.href);
    };

    this.postMessage("orangecomfort+userprefget", null, document.location.href);
}

UciStorage.prototype = new UciUserPref();

// Source: app/language/en.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['en']={
  uci_link_hide_toolbar:"hide toolbar",
  uci_alt_logo:"Comfort+",
  uci_serv_name:"Comfort",
  uci_title_fontsize_radio_normal:"default font size",
  uci_title_fontsize_radio_medium:"average font size",
  uci_title_fontsize_radio_large:"large font size",
  uci_title_color_default:"default colors ",
  uci_title_color_blackandwhite:"black text on white background",
  uci_checkbox_disable_apercuauto:"deactivate automatic preview of my settings",
  uci_help_disable_apercuauto:"by default settings preview applies to the site, you can deactivite this feature checking the matching box",
  uci_button_valid:"save my settings",
  uci_button_cancel:"do not save my settings",
  uci_txt_more_settings:"more settings",
  uci_txt_low_settings_display:"less settings",
  uci_txt_low_settings:"close more settings panel",
  uci_txt_disable_cdu:"deactivate Comfort<span class='uci-plus-orange'>+</span> on this site",
  uci_txt_enable_cdu:"activate Comfort<span class='uci-plus-orange'>+</span> on this site",
  uci_title_disable_cdu:"deactivate Comfort+ on this site",
  uci_title_enable_cdu:"activate Comfort+ on this site",
  uci_txt_link_menu_open:"show menu",
  uci_txt_link_menu_close:"hide menu",
  uci_menu_help:"visit general help",
  uci_menu_remove_all:"cancel all settings",
  uci_txt_menu_change_lang_fr:"show this service in french",
  uci_txt_menu_change_lang_en:"show this service in english",
  uci_txt_menu_change_lang_es:"show this service in spanish",
  uci_txt_onglet_typo:"typography",
  uci_txt_onglet_apparence:"layout",
  uci_txt_onglet_color:"colors",
  uci_txt_onglet_motor_help:"behaviour",
  uci_typo_titre_fontsize:"font size",
  uci_typo_titre_wordspacing:"word spacing",
  uci_typo_titre_charspacing:"character spacing",
  uci_typo_titre_linespacing:"line spacing",
  uci_typo_titre_fontfamily:"font face",
  uci_typo_titre_changecase:"text case",
  uci_typo_help_fontfamily:"This feature allows to modify the site defined font to improve reading comfort",
  uci_typo_help_changecase:"This feature allows to modify texts display to meet your needs",
  uci_title_wordspacing_radio_normal:"default word spacing ",
  uci_title_wordspacing_radio_medium:"medium word spacing",
  uci_title_wordspacing_radio_large:"large word spacing",
  uci_title_charspacing_radio_normal:"default character spacing",
  uci_title_charspacing_radio_medium:"medium character spacing",
  uci_title_charspacing_radio_large:"large character spacing",
  uci_title_linespacing_radio_normal:"default line spacing",
  uci_title_linespacing_radio_medium:"medium line spacing",
  uci_title_linespacing_radio_large:"large line spacing",
  uci_title_minfont_radio_normal:"minimal text size 12px",
  uci_title_minfont_radio_medium:"minimal text size 16px",
  uci_title_minfont_radio_large:"minimal text size 18px",
  uci_title_fontfamily_radio_arial:"Arial font face",
  uci_title_fontfamily_radio_opendys:"Open Dyslexic font face",
  uci_changecase_firstlettre:"First Character Of Each Word To Upper Case",
  uci_changecase_toupper:"UPPER CASE TEXT",
  uci_changecase_tolower:"lower case text",
  uci_label_listmode:"cancel layout",
  uci_label_alignleft:"text align left",
  uci_label_putnumonlist:"numbering list elements",
  uci_label_disabletransp:"cancel transparency effects",
  uci_label_disablebgpictures:"disable background images",
  uci_label_disablepppictures:"cancel foreground images",
  uci_link_display_picture:"view this picture:",
  uci_link_display_picture_no_alt:"description not available",
  uci_titre_links:"navigation links appearence",
  uci_txt_notvisited:"links",
  uci_txt_visited:"visited links",
  uci_txt_active:"selected link",
  uci_title_link_notvisited_color:"default links color",
  uci_title_link_visited_color:"visited links color",
  uci_title_link_active_color:"selected link color",
  uci_title_link_notvisited_render:"links formatting",
  uci_title_link_visited_render:"visited links additionnal formatting",
  uci_title_link_active_render:"selected link additionnal formatting",
  uci_link_render_options_default:"by default",
  uci_link_render_options_underline:"underline",
  uci_link_render_options_border:"box",
  uci_link_render_options_bold:"bold",
  uci_title_regle:"show a reading ruler",
  uci_txt_regle_color:"ruler color",
  uci_txt_regle_size:"ruler width ",
  uci_title_regle_thin:"thin",
  uci_title_regle_medium:"medium",
  uci_title_regle_big:"thick",
  uci_label_regle_vertical:"show a vertical ruler",
  uci_label_regle_horizontale:"show a horizontal ruler",
  uci_help_listmode:"This feature replaces site font faces with your default font faces (those defined in your browser or computeur). Moreover, the content is linearised and displayed without columns.",
  uci_help_disabletransp:"This feature allows deactivation of possible transparency effects in the page. This minimises disturbance when reading content.",
  uci_help_disablepppictures:"This feature hides images of the page to avoid reading disturbance. Those are replaced by their text alternatives. A link allows to show the image  on demand.",
  uci_help_links:"This feature allows to define the appearence of links. You can choose color, and formatting parameters.",
  uci_help_regle:"This feature allows to show a horizontal and/or vertical ruler following the mouse pointer that helps reading text. You can set their color and width.",
  uci_color_titre:"combination of preset colors",
  uci_title_color_whiteandblack:"white text on black background",
  uci_color_titre_use_personal:"select personalized colors",
  uci_color_txt_texte:"font color",
  uci_color_txt_background:"background color",
  uci_color_warning_title:"insufficient contrast",
  uci_color_warning_content:"Text and background colors has an insufficient contrast. This may make it difficult to read and cause eyestrain.",
  uci_label_jumptocontent:"always skip to content",
  uci_help_jumptocontent:"allow an automatic positioning on main page content, in particular,  by jumping navigation links",
  uci_enableMotorMode:"motor help",
  uci_label_telecomande:"navigation on hover",
  uci_help_telecomande:"Add vertical scrolling arrows on rollover. Allow also, clickable links activation on rollover after a defined delay",
  uci_legend_delai_clic:"delay before automatic click",
  uci_label_1sec:"1 second",
  uci_label_2sec:"2 seconds",
  uci_label_3sec:"3 seconds",
  uci_label_6sec:"6 seconds",
  uci_label_automove:"automatic selection of elements",
  uci_help_automove:"Select clickable elements one after the other. Press the ",
  uci_legend_menupos:"menu position",
  uci_label_centeredmenu:"center on the page",
  uci_label_nearelemtmenu:"next to the selected item",
  uci_legend_time_before_sel:"elements selection delay",
  uci_help_quickmode:"(number of \253 ignored \273 elements between to selected elements)",
  uci_legend_pasquickmode:"quick mode steps",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Warning",
  uci_securityCookieChange:"Comfort<span class='uci-plus-orange'>+</span> service has to store your comfort settings.",
  uci_securityCookieChangeLinkPage:"Configure my browser now to authorize Comfort<span class='uci-plus-orange'>+</span> service to store my comfort settings.",
  uci_doClick:"Click",
  uci_loopActivable:"Navigate through items",
  uci_loopActivableQuick:"Navigate quickly through items",
  uci_loopBackward:"Navigate backwards",
  uci_stopLoop:"Pause navigation",
  uci_closeButton:"close",
  uci_modif_not_saved:"Your unsaved settings will be lost, do you want to continue ?",
  uci_remove_all_settings:"All your settings will be deleted, do you want to continue ?",
  uci_radio_default:"default",
  uci_radio_medium:"medium",
  uci_radio_large:"large",
  uci_new_window:"New window",
  uci_iframe_cookie:"Technical Content Orange Comfort+"
};
// Source: app/language/es.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['es']={
  uci_link_hide_toolbar:"esconder el panel",
  uci_alt_logo:"Confort+",
  uci_serv_name:"Confort",
  uci_title_fontsize_radio_normal:"tama\361o de letra normal",
  uci_title_fontsize_radio_medium:"tama\361o de letra medio",
  uci_title_fontsize_radio_large:"tama\361o de letra grande",
  uci_title_color_default:"colores por defecto",
  uci_title_color_blackandwhite:"texto negro en fondo blanco",
  uci_checkbox_disable_apercuauto:"desactivar la vista previa autom\341tica de mis ajustes",
  uci_help_disable_apercuauto:"Por defecto la vista previa de los ajustes se aplica autom\341ticamente al sitio, puedes desactivar esta funcionalidad punteando la casilla asociada.",
  uci_button_valid:"memorizar mis ajustes",
  uci_button_cancel:"no memorizar mis ajustes",
  uci_txt_more_settings:"m\341s ajustes",
  uci_txt_low_settings_display:"menos ajustes",
  uci_txt_low_settings:"cerrar el panel m\341s ajustes",
  uci_txt_disable_cdu:"desactivar Confort<span class='uci-plus-orange'>+</span> para este sitio",
  uci_txt_enable_cdu:"activar Confort<span class='uci-plus-orange'>+</span> para este sitio",
  uci_title_disable_cdu:"desactivar Confort+ para este sitio",
  uci_title_enable_cdu:"activar Confort+ para este sitio",
  uci_txt_link_menu_open:"mostrar men\372",
  uci_txt_link_menu_close:"ocultar men\372",
  uci_menu_help:"consultar  ayuda general",
  uci_menu_remove_all:"anular todos los ajustes",
  uci_txt_menu_change_lang_fr:"mostrar el servicio en franc\351s",
  uci_txt_menu_change_lang_en:"mostrar el servicio en ingles",
  uci_txt_menu_change_lang_es:"mostrar el servicio en espa\361ol",
  uci_txt_onglet_typo:"tipograf\355a",
  uci_txt_onglet_apparence:"apariencia",
  uci_txt_onglet_color:"colores",
  uci_txt_onglet_motor_help:"comportamiento",
  uci_typo_titre_fontsize:"tama\361o del texto",
  uci_typo_titre_wordspacing:"espacio entre palabras",
  uci_typo_titre_charspacing:"espacio entre caracteres",
  uci_typo_titre_linespacing:"espacio interlineal",
  uci_typo_titre_fontfamily:"tipo de fuente",
  uci_typo_titre_changecase:"alternar MAY/min",
  uci_typo_help_fontfamily:"Este comando permite modificar la fuente definida por el sitio web, con el fin de mejorar la Confort<span class='uci-plus-orange'>+</span>",
  uci_typo_help_changecase:"Este comando permite modificar la presentaci\363n del texto seg\372n tus necesidades",
  uci_title_wordspacing_radio_normal:"espacio normal entre palabras",
  uci_title_wordspacing_radio_medium:"espacio medio entre palabras",
  uci_title_wordspacing_radio_large:"espacio grande entre palabras",
  uci_title_charspacing_radio_normal:"espacio normal entre caracteres",
  uci_title_charspacing_radio_medium:"espacio medio entre caracteres",
  uci_title_charspacing_radio_large:"espacio grande entre caracteres",
  uci_title_linespacing_radio_normal:"espacio normal entre lineas",
  uci_title_linespacing_radio_medium:"espacio medio entre lineas",
  uci_title_linespacing_radio_large:"espacio grande entre lineas",
  uci_title_minfont_radio_normal:"tama\361o m\355nimo de letra 12 ptos",
  uci_title_minfont_radio_medium:"tama\361o m\355nimo de letra 16 ptos",
  uci_title_minfont_radio_large:"tama\361o m\355nimo de letra 18 ptos",
  uci_title_fontfamily_radio_arial:"tipo de letra Arial",
  uci_title_fontfamily_radio_opendys:"tipo de letra Open Dyslexic",
  uci_changecase_firstlettre:"primera letra de cada palabra en May\372scula",
  uci_changecase_toupper:"TEXTO EN MAYUSCULAS",
  uci_changecase_tolower:"texto en min\372sculas",
  uci_label_listmode:"desactiva el dise\361o de la p\341gina ",
  uci_label_alignleft:"alinea  textos a la izquierda",
  uci_label_putnumonlist:"numeriza los esquemas",
  uci_label_disabletransp:"anula  efectos de transparencia",
  uci_label_disablebgpictures:"anula im\341genes de fondo",
  uci_label_disablepppictures:"anula im\341genes del primer plano",
  uci_link_display_picture:"visualizar la imagen :",
  uci_link_display_picture_no_alt:"descripci\363n no disponible",
  uci_titre_links:"apariencia enlaces de navegaci\363n ",
  uci_txt_notvisited:"enlaces",
  uci_txt_visited:"enlaces consultados",
  uci_txt_active:"enlace seleccionado",
  uci_title_link_notvisited_color:"color de enlaces por defecto",
  uci_title_link_visited_color:"color de enlaces consultados",
  uci_title_link_active_color:"color de enlace seleccionado",
  uci_title_link_notvisited_render:"formato de enlaces",
  uci_title_link_visited_render:"formato complementario de enlaces consultados",
  uci_title_link_active_render:"formato complementario del enlace seleccioan",
  uci_link_render_options_default:"por defecto ",
  uci_link_render_options_underline:"subrayado",
  uci_link_render_options_border:"encuadrado",
  uci_link_render_options_bold:"en negrita",
  uci_title_regle:"visualizar regla de lectura",
  uci_txt_regle_color:"color de la regla",
  uci_txt_regle_size:"espesor  de la regla",
  uci_title_regle_thin:"fina",
  uci_title_regle_medium:"normal",
  uci_title_regle_big:"espesa",
  uci_label_regle_vertical:"visualizar regla vertical",
  uci_label_regle_horizontale:"visualizar regla horizontal",
  uci_help_listmode:"Este comando reemplaza el tipo de letra del sitio por las tuyas por defecto (aquellas que has definido en tu ordenador o tu navegador). Adem\341s el contenido se vuelve completamente lineal y sin columnas.",
  uci_help_disabletransp:"Este comando desactiva los efectos de transparencia eventuales de la p\341gina, limitando as\355 las perturbaciones de lectura del contenido",
  uci_help_disablepppictures:"Este comando suprime la visualizaci\363n de im\341genes en la p\341gina y son reemplazadas por sus alternativas textuales. Un enlace permite visualizar las im\341genes a petici\363n ",
  uci_help_links:"Este comando define la apariencia de los enlaces en la p\341gina. Puedes elegir el color y el formato de los enlaces",
  uci_help_regle:"Este comando muestra una regla horizontal y/o vertical que sigue el foco del rat\363n para facilitar la lectura del texto. \nPuedes elegir el color y el espesor de las reglas.",
  uci_color_titre:"combinaci\363n de colores predefinidos",
  uci_title_color_whiteandblack:"texto blanco y fondo negro",
  uci_color_titre_use_personal:"selecionar colores personalizados",
  uci_color_txt_texte:"color de texto",
  uci_color_txt_background:"color de fondo",
  uci_color_warning_title:"contrate insuficiente",
  uci_color_warning_content:"Los colores de texto y fondo tienen un contraste insuficiente, en consecuencia la lectura puede ser inconfortable y provocar un cansancio visual.\nTe recomendamos modificar la combinaci\363n de colores",
  uci_label_jumptocontent:"saltar siempre al contenido principal",
  uci_help_jumptocontent:"Permite posicionarse autom\341ticamente en el contenido principal de la p\341gina, saltandose en particular todos los enlaces de navegaci\363n ",
  uci_enableMotorMode:"asistencia motriz",
  uci_label_telecomande:"navegaci\363n con clic autom\341tico",
  uci_help_telecomande:"A\361ade flechas verticales para recorrer la p\341gina, activadas al pasar el rat\363n por encima.\nActiva los elementos clicables al pasar el rat\363n por encima, y con un retraso predefinido en los ajustes",
  uci_legend_delai_clic:"temporizaci\363n del clic autom\341tico",
  uci_label_1sec:"1 segundo",
  uci_label_2sec:"2 segundos",
  uci_label_3sec:"3 segundos",
  uci_label_6sec:"6 segundos",
  uci_label_automove:"navegaci\363n con selecci\363n autom\341tica de elementos",
  uci_help_automove:"Selecciona uno tras otro los elementos clicables\nPresiona la tecla Entrar o Espacio para abrir el men\372 que te permite activar el elemento seleccionado, o bien modificar el tipo de recorrido de la p\341gina (r\341pido, atr\341s, parar)",
  uci_legend_menupos:"posici\363n del men\372",
  uci_label_centeredmenu:"centrar en la p\341gina",
  uci_label_nearelemtmenu:"al lado del elemento seleccionado",
  uci_legend_time_before_sel:"temporizaci\363n de selecci\363n de elementos",
  uci_help_quickmode:"(cantidad de elementos \253 ignorados \273 entre 2 elementos seleccionados)",
  uci_legend_pasquickmode:"pasos de modo r\341pido",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Atenci\363n ",
  uci_securityCookieChange:"El servicio Confort<span class='uci-plus-orange'>+</span> necesita memorizar tus ajustes",
  uci_securityCookieChangeLinkPage:"Configurar mi navegador ahora, para autorizar Confort<span class='uci-plus-orange'>+</span> a salvaguardar mis preferencias",
  uci_doClick:"Pulsar",
  uci_loopActivable:"Recorrer la p\341gina",
  uci_loopActivableQuick:"Navegar r\341pidamente",
  uci_loopBackward:"Navegar hacia atr\341s",
  uci_stopLoop:"Parar la navegaci\363n",
  uci_closeButton:"cerrar",
  uci_modif_not_saved:"Los ajustes no memorizados se perder\341n \277 Deseas proseguir esta acci\363n ?",
  uci_remove_all_settings:"Se borrar\341n todos los ajustes \277 Estas seguro de querer proseguir ?",
  uci_radio_default:"normal",
  uci_radio_medium:"medio",
  uci_radio_large:"grande",
  uci_new_window:"Nueva ventana",
  uci_iframe_cookie:"Contenido t\351cnico Orange Comfort+"
};
// Source: app/language/fr.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['fr']={
  uci_link_hide_toolbar:"masquer la barre",
  uci_alt_logo:"Confort+",
  uci_serv_name:"Confort",
  uci_title_fontsize_radio_normal:"taille de police normale",
  uci_title_fontsize_radio_medium:"taille de police moyenne",
  uci_title_fontsize_radio_large:"taille de police grande",
  uci_title_color_default:"couleurs par d\351faut",
  uci_title_color_blackandwhite:"texte en noir sur fond blanc",
  uci_checkbox_disable_apercuauto:"d\351sactiver l'aper\347u automatique de mes r\351glages",
  uci_help_disable_apercuauto:"Par d\351faut l\47aper\347u des r\351glages s\47applique automatiquement au site, vous pouvez d\351sactiver cette fonctionnalit\351 en cochant la case associ\351e.",
  uci_button_valid:"enregistrer mes r\351glages",
  uci_button_cancel:"ne pas enregistrer mes r\351glages",
  uci_txt_more_settings:"plus de r\351glages",
  uci_txt_low_settings_display:"moins de r\351glages",
  uci_txt_low_settings:"fermer la zone plus de r\351glages",
  uci_txt_disable_cdu:"d\351sactiver Confort<span class='uci-plus-orange'>+</span> pour ce site",
  uci_txt_enable_cdu:"activer Confort<span class='uci-plus-orange'>+</span> pour ce site",
  uci_title_disable_cdu:"d\351sactiver Confort+ pour ce site",
  uci_title_enable_cdu:"activer Confort+ pour ce site",
  uci_txt_link_menu_open:"afficher le menu",
  uci_txt_link_menu_close:"masquer le menu",
  uci_menu_help:"consulter l\47aide g\351n\351rale",
  uci_menu_remove_all:"annuler tous les r\351glages",
  uci_txt_menu_change_lang_fr:"afficher le service en fran\347ais",
  uci_txt_menu_change_lang_en:"afficher le service en anglais",
  uci_txt_menu_change_lang_es:"afficher le service en espagnol",
  uci_txt_onglet_typo:"typographie",
  uci_txt_onglet_apparence:"agencement",
  uci_txt_onglet_color:"couleurs",
  uci_txt_onglet_motor_help:"comportement",
  uci_typo_titre_fontsize:"taille du texte ",
  uci_typo_titre_wordspacing:"espacement entre les mots ",
  uci_typo_titre_charspacing:"espacement entre les caract\350res",
  uci_typo_titre_linespacing:"espacement entre les lignes",
  uci_typo_titre_fontfamily:"police de caract\350re",
  uci_typo_titre_changecase:"casse du texte",
  uci_typo_help_fontfamily:"Permet de modifier la police d\351finie par le site internet afin d\47am\351liorer le confort lors de la lecture.",
  uci_typo_help_changecase:"Permet de modifier l\47affichage des textes en fonction de vos besoins.",
  uci_title_wordspacing_radio_normal:"espace normal entre les mots",
  uci_title_wordspacing_radio_medium:"espace moyen entre les mots",
  uci_title_wordspacing_radio_large:"espace grand entre les mots",
  uci_title_charspacing_radio_normal:"espace normal entre les caract\350res",
  uci_title_charspacing_radio_medium:"espace moyen entre les caract\350res",
  uci_title_charspacing_radio_large:"espace grand entre les caract\350res",
  uci_title_linespacing_radio_normal:"espace normal entre les lignes",
  uci_title_linespacing_radio_medium:"espace moyen entre les lignes",
  uci_title_linespacing_radio_large:"espace grand entre les lignes",
  uci_title_minfont_radio_normal:"taille minimale du texte 12px",
  uci_title_minfont_radio_medium:"taille minimale du texte 16px",
  uci_title_minfont_radio_large:"taille minimale du texte 18px",
  uci_title_fontfamily_radio_arial:"police de caract\350res Arial",
  uci_title_fontfamily_radio_opendys:"police de caract\350res Open Dyslexic",
  uci_changecase_firstlettre:"Premi\350re Lettre De Chaque Mot En Majuscule",
  uci_changecase_toupper:"TEXTE EN MAJUSCULE",
  uci_changecase_tolower:"texte en minuscule",
  uci_label_listmode:"suppression de la mise en page",
  uci_label_alignleft:"alignement des textes \340 gauche ",
  uci_label_putnumonlist:"num\351rotation des \351l\351ments de liste",
  uci_label_disabletransp:"suppression des effets de transparence",
  uci_label_disablebgpictures:"suppression des images de fond",
  uci_label_disablepppictures:"suppression des images de premier plan",
  uci_link_display_picture:"voir cette image :",
  uci_link_display_picture_no_alt:"description non disponible",
  uci_titre_links:"apparence des liens de navigation",
  uci_txt_notvisited:"liens",
  uci_txt_visited:"liens visit\351s",
  uci_txt_active:"lien s\351lectionn\351",
  uci_title_link_notvisited_color:"couleur des liens par d\351faut",
  uci_title_link_visited_color:"couleur des liens visit\351s",
  uci_title_link_active_color:"couleur du lien s\351lectionn\351",
  uci_title_link_notvisited_render:"mise en forme des liens",
  uci_title_link_visited_render:"mise en forme compl\351mentaire des liens visit\351s",
  uci_title_link_active_render:"mise en forme compl\351mentaire du lien s\351lectionn\351",
  uci_link_render_options_default:"par d\351fault",
  uci_link_render_options_underline:"soulign\351",
  uci_link_render_options_border:"encadr\351",
  uci_link_render_options_bold:"mis en gras",
  uci_title_regle:"affichage d\47une r\350gle de lecture",
  uci_txt_regle_color:"couleur de la r\350gle",
  uci_txt_regle_size:"\351paisseur de la r\350gle",
  uci_title_regle_thin:"fine",
  uci_title_regle_medium:"normale",
  uci_title_regle_big:"\351paisse",
  uci_label_regle_vertical:"affichage d\47une r\350gle verticale",
  uci_label_regle_horizontale:"affichage d\47une r\350gle horizontale",
  uci_help_listmode:"Cette commande remplace les polices du site par vos polices par d\351faut (celles que vous avez d\351finies dans votre ordinateur ou votre navigateur). De plus le contenu devient compl\350tement lin\351aire et sans colonnes.",
  uci_help_disabletransp:"Cette commande permet de d\351sactiver les effets de transparence \351ventuels de la page. Cela limite les perturbations lors de la lecture du contenu.",
  uci_help_disablepppictures:"Cette commande permet de supprimer l\47affichage des images dans la page qui peuvent g\352ner la lecture. Celles-ci sont alors remplac\351es par leurs alternatives textuelles. Un lien permet d\47afficher l\47image \340 la demande.",
  uci_help_links:"Cette commande permet de d\351finir l\47apparence des liens dans la page. Vous pouvez choisir la couleur et la mise en forme de ceux-ci.",
  uci_help_regle:"Cette commande permet d\47afficher une r\350gle horizontale et/ou verticale qui suit le curseur souris ce qui facilite la lecture du texte. Vous pouvez choisir la couleur et l\47\351paisseur de celles-ci.",
  uci_color_titre:"combinaison de couleurs pr\351d\351finies",
  uci_title_color_whiteandblack:"texte blanc sur fond noir",
  uci_color_titre_use_personal:"combinaison de couleurs personnalis\351es",
  uci_color_txt_texte:"couleur du texte",
  uci_color_txt_background:"couleur du fond",
  uci_color_warning_title:"contraste insuffisant ",
  uci_color_warning_content:"La couleur du texte pr\351sente un contraste insuffisant avec la couleur du fond. Ceci risque de rendre la lecture inconfortable et de provoquer une fatigue visuelle. \nNous vous recommandons de modifier la combinaison de couleurs.",
  uci_label_jumptocontent:"aller automatiquement au contenu ",
  uci_help_jumptocontent:"Permet de se positionner automatiquement sur le contenu principal de la page, en sautant notamment tous les liens de navigation.",
  uci_enableMotorMode:"aide motrice",
  uci_label_telecomande:"navigation par pointage",
  uci_help_telecomande:"Ajoute des fl\350ches de d\351filement vertical activ\351es au survol de la souris.\nPermet aussi d\47activer les \351l\351ments cliquables au survol de la souris apr\350s le d\351lai param\351tr\351.",
  uci_legend_delai_clic:"d\351lai avant le clic automatique",
  uci_label_1sec:"1 seconde",
  uci_label_2sec:"2 secondes",
  uci_label_3sec:"3 secondes",
  uci_label_6sec:"6 secondes",
  uci_label_automove:"s\351lection automatique des \351l\351ments",
  uci_help_automove:"S\351lectionne l\47un apr\350s l\47autre les \351l\351ments cliquables.\nAppuyez sur la touche entr\351e ou espace pour ouvrir le menu qui permet soit d\47activer l\47\351l\351ment s\351lectionn\351, soit de modifier le mode de parcours (rapide, arri\350re, arr\352ter)",
  uci_legend_menupos:"position du menu",
  uci_label_centeredmenu:"centr\351 sur la page",
  uci_label_nearelemtmenu:"\340 c\364t\351 de l'\351l\351ment s\351lectionn\351",
  uci_legend_time_before_sel:"d\351lai de s\351lection des \351l\351ments",
  uci_help_quickmode:"(nombre d\47\351l\351ments \253 ignor\351s \273 entre deux \351l\351ments s\351lectionn\351s)",
  uci_legend_pasquickmode:"pas du mode rapide",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Avertissement",
  uci_securityCookieChange:"Le service Confort<span class='uci-plus-orange'>+</span> a besoin de m\351moriser vos r\351glages.",
  uci_securityCookieChangeLinkPage:"Configurer mon navigateur maintenant, pour autoriser Confort<span class='uci-plus-orange'>+</span> a m\351moriser mes r\351glages",
  uci_doClick:"Cliquer",
  uci_loopActivable:"Parcourir la page",
  uci_loopActivableQuick:"Naviguer rapidement",
  uci_loopBackward:"Naviguer en arri\351re",
  uci_stopLoop:"Arr\352ter la  navigation",
  uci_closeButton:"fermer",
  uci_modif_not_saved:"Vos r\351glages en cours ne seront pas sauvegard\351s, souhaitez-vous poursuivre cette action?",
  uci_remove_all_settings:"Tous vos r\351glages seront supprim\351s, souhaitez-vous poursuivre cette action?",
  uci_radio_default:"normal",
  uci_radio_medium:"moyen",
  uci_radio_large:"grand",
  uci_new_window:"Nouvelle fen\352tre",
  uci_iframe_cookie:"Contenu technique Orange Confort+"
};
// Source: app/js/UciAideMotrice.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet aide motrice
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
UciAideMotrice = {
    /**
     * @property
     * @private
     */
    attr_aide_motrice: "",
    attr_onglet: "",
    attr_aide_motrice: "",
    /*
     * @constructor
     */
    InitUciAideMotrice: function () {
        attr_aide_motrice = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_aidemotrice'>"; //uci_contenu_onglet_aidemotrice
        attr_aide_motrice += "<div id='setting-bloc-content'>";
        attr_aide_motrice += "<input type='checkbox' value='true' name='a11yJumpToContent' id='a11yJumpToContent'"+(accessibilitytoolbar.userPref.get("a11yJumpToContent") === "true" ? " checked='checked'" : "") + ">";
        attr_aide_motrice += "<label for='a11yJumpToContent'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_jumptocontent');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_jumptocontent'>";
        attr_aide_motrice += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_aide_motrice += "<span class='uci_span_help_bulle cdu_n' id='uci_help_jumptocontent'><p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_jumptocontent');
        attr_aide_motrice += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_aide_motrice += "</div>"; //setting-bloc-content
/**********************************************Gestion réglage motor*********************************************************/
        attr_aide_motrice += "<div id='uci_div_motor'>";
        attr_aide_motrice += "<input type='checkbox' value='true' name='a11yMotorModeEnabled'  id='a11yMotorModeEnabled' "+(accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true" ? " checked='checked'" : "") + ">";
        attr_aide_motrice += "<label for='a11yMotorModeEnabled'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_enableMotorMode');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "</div>"; //uci_div_motor
        if (accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true") {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:block'>";
        } else {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:none'>";
        }
/******************************************************Navigation par pointage ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_left'>";
        attr_aide_motrice += "<input type='radio' name='a11yMotorMode' id='a11yMotorMode-remote' value='remote' ";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "remote" ? "checked='checked'" : "";
        attr_aide_motrice += "/>";
        attr_aide_motrice += "<label for='a11yMotorMode-remote'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_telecomande');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_telecomande');
        attr_aide_motrice += '</p>';
        
        attr_aide_motrice += "<div id='uci_motor_mode' class='setting-sub-container'>";
        attr_aide_motrice += "<p >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_delai_clic');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop' role='radiogroup' aria-labelledby='a11yDelayBeforeLoop0'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        attr_aide_motrice += "</div>"; //uci_motor_mode
        
        attr_aide_motrice += "</div>"; //uci_motor_div_left
/******************************************************Fin Navigation par pointage ******************************************************************/

/******************************************************Parcours automatique des elements cliquable ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_right'>";
        
        attr_aide_motrice += "<div class='btn-check btn-check-large'>";
        attr_aide_motrice += "<input type='radio' value='looping' id='a11yMotorMode-looping' name='a11yMotorMode'";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "looping" ? "checked='checked'" : "";
        attr_aide_motrice += ">";
        attr_aide_motrice += "<label for='a11yMotorMode-looping'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_automove');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_automove');
        attr_aide_motrice += '</p>';
        attr_aide_motrice += "</div>"; //btn-check btn-check-large

        //gestion de la position du menu
        attr_aide_motrice += "<div>";
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_menupos');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yMenuPositionning' role='radiogroup' aria-labelledby='a11yMenuPositionning'>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_center' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_centeredmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_nextto' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_nearelemtmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion du clic automatique
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_time_before_sel');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop_auto' role='radiogroup' aria-labelledby='a11yDelayBeforeClick'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick-2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion pas du mode rapide
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_pasquickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_help_quickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yQuickMode' role='radiogroup' aria-labelledby='a11yQuickMode'>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2par2');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_5par5');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_10' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_10par10');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        
        attr_aide_motrice += "</div>";
        attr_aide_motrice += "</div>"; //uci_motor_div_right
/******************************************************Fin parcours automatique des éléments cliquables******************************************************************/
        attr_aide_motrice += "</div>"; //uci_motor_general
        attr_aide_motrice += "</div>"; //uci_contenu_onglet_aidemotrice
        return attr_aide_motrice;
    },

    activate_aide_motrice: function () {
        if (document.getElementById('a11yMotorModeEnabled').checked) {
            document.getElementById('uci_motor_general').style.display = "block";
        } else {
            document.getElementById('uci_motor_general').style.display = "none";
        }
    }

}
// Source: app/js/UciCouleur.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_couleur
 * @classdesc Cette classe permettra d'implémenter l'onglet couleur
 * @property {string}  attr_couleur : the string containt hinner html for couleur.
 */
/*global window */
/*global document: false */
/* global alert */
function UciCouleur() {

/*
     * @property
     * @private
     */
    var attr_onglet, attr_couleur;
    attr_couleur = "";

    var mesCouleurs=[
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ];
    /*
     * @constructor
     */
    UciCouleur.prototype.InitUciCouleur = function () {
        attr_couleur = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_couleur'>";
/*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs prédéfinies
*****************************************************************************************************************************/
        //couleur predefinie
        attr_couleur += "<div id='uci_div_couleur_predefinie'>";
        attr_couleur += "<input type='radio' name='a11yVisualSettings' value='predefined' id='uci_couleur_predefenie_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" ? " checked='checked'" : '')+"><label for='uci_couleur_predefenie_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre');
        attr_couleur += "</label>";
       
        attr_couleur += "<ul class='uci_liste_bton' id='uci_reponses_couleurpredefinie' role='radiogroup' aria-labelledby='uci_couleur_predefenie_input'>";
        attr_couleur += "<!--[if IE 8 ]>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class=' uci_choix ie8_uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<![endif]-->";
        attr_couleur += "<!--[if (!IE 8) | (!IE)]><!-->";        
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<!--<![endif]-->";
        attr_couleur += "</ul>";
        //gestion des message d'erreur de contraste et de luminosite
        attr_couleur += "<div id='uci_message_constraste' style='display:none;' class='message_couleur'>";
        attr_couleur += "<p style='color: black !important; background-color: #FFFFFF !important;'>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</p>";
        attr_couleur += "<span style='color: black !important; background-color: #FFFFFF !important;' id='uci_message_contraste_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_content');
        attr_couleur += "</span>";
        attr_couleur += "</div>";

        /*gestion message luminosite
        attr_couleur += "<div id='uci_message_luminosite' class='message_couleur' style='display:none'>";
        attr_couleur += "<h4>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</h4>";
        attr_couleur += "<label id='uci_message_luminosite_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_title');
        attr_couleur += "</label>";
        attr_couleur += "</div>";*/
        attr_couleur += "</div>";



        /*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs personnalisées
 *****************************************************************************************************************************/
        attr_couleur += "<div id='uci_div_right_couleur'>";
        attr_couleur += "<div><input type='radio' name='a11yVisualSettings' value='personnal' id='uci_couleur_personnalisees_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" ? " checked='checked'" : "")+"><label for='uci_couleur_personnalisees_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre_use_personal');
        attr_couleur += "</label></div>";
        attr_couleur += "<div id='uci_couleur_police' class='cdu_c'>";
        attr_couleur += "<span id='aria_label_texte' >"+accessibilitytoolbar.get('uci_color_txt_texte')+"</span>";
        //couleur de police                
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurpolice' role='radiogroup' aria-labelledby='aria_label_texte'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yFontColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yFontColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';        
        attr_couleur += tableauCouleurPolice;
        attr_couleur += "</div>";
        
        //Couleur de fond
        attr_couleur += "<div id='uci_couleur_fond' class='cdu_c'>";
        attr_couleur += "<span id='uci_aria_label_fond' class='uci_couleur_clear'>"+accessibilitytoolbar.get('uci_color_txt_background')+"</span>";
        var tableauCouleurFond = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurbackground' role='radiogroup' aria-labelledby='uci_aria_label_fond'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurFond += "<li id='uci_a11yBackgroundColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yBackgroundColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";                    
                    tableauCouleurFond += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurFond += '</ul>';
        
        attr_couleur += tableauCouleurFond;
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        return attr_couleur;
    };
}
// Source: app/js/UciApparence.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet apparence
 * @property {string}  attr_apparence : the string containt hinner html for apparence.
 */
/*global window */
/*global document: false */
/* global alert */
UciApparence = {
    /**
     * @property
     * @private
     */
    attr_apparence: "",
    attr_onglet: "",
    attr_apparence: "",
    /*
     * @constructor init
     */

    mesCouleurs: [
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ],

    InitUciApparence: function () {
        attr_apparence = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_apparence'>";
/************************************gestion de la partie gauche********************************************************/
        attr_apparence += "<div id='uci_apparence_div_left'>";

        //Gestion de la mise en page : supprimer la mise en page
        attr_apparence += "<div id='uci_div_supprimer_miseenpage'>";

        attr_apparence += "<input type='checkbox' value='true' name='a11yLinearize'  id='a11yLinearize'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLinearize") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='a11yLinearize'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_listmode');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_listmode'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_listmode'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_listmode');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //Gestion de la mise en page : alignement a gauche
        attr_apparence += "<div id='uci_div_alignement_gauche'>";
        attr_apparence += "<input type='checkbox' value='left' name='a11yLeftText' id='alignement_gauche'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLeftText") === "left" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='alignement_gauche'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_alignleft');
        attr_apparence += "</label>";
        attr_apparence += "</div>";


        //Gestion de la mise en page : numerotation des ligne
        attr_apparence += "<div id='uci_div_numero_ligne'>";
        attr_apparence += "<input type='checkbox' value='decimal'  name='a11yNumerotationList' id='putNumOnList'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNumerotationList") === "decimal" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='putNumOnList'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_putnumonlist');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //gestion de l'apparence des liens
        attr_apparence += "<div id='uci_div_apparence_liens'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11yNavLienEnabled' id='apparence_lien'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNavLienEnabled") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='apparence_lien'>";
        attr_apparence += accessibilitytoolbar.get('uci_titre_links');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_links'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_links'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_links');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //gestion du lien actif : couleur
        if(accessibilitytoolbar.userPref.get("a11yNavLienEnabled")=== "true"){
            attr_apparence += "<div id='uci_gestion_lien' style='display:block' >";
        }else {
            attr_apparence += "<div id='uci_gestion_lien' style='display:none' >";
        }

        attr_apparence += "<div id='uci_div_lien_selectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_active')+"</span>";        
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienSel' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_active_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_active_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence += "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_selectionne' style='display:none'>";
        //couleur de police
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_sel' role='radiogroup' aria-labelledby='uci_a11yNavLienSelColor'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        var focus_li;
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienSelColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li cdu_c "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienSelColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
          


        //gestion du lien actif : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienSelStyle' title=\""+accessibilitytoolbar.get("uci_title_link_active_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += "</div>";

        //gestion des liens non visite
        //gestion des liens non visite : couleur 
        attr_apparence += "<div id='uci_div_lien_notselectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_notvisited')+"</span>";
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienNonVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_notselectionne' style='display:none'>";        
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_notsel' role='radiogroup' aria-labelledby='uci_a11yNavLienNonVisColorSpan'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienNonVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'"  : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";

                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
        //gestion des liens non visite : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienNonVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_notvisited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += "</div>";

        //gestion des liens visités
        //gestion des liens visite : couleur
        
        
        attr_apparence += "<div id='uci_div_lien_visite'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_visited')+"</span>";
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_visited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_visited_color')+"</span>";
        attr_apparence +="</a>";


        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_visite' style='display:none'>";
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_visite' role='radiogroup' aria-labelledby='uci_a11yNavLienVisColorSpan'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";           

        //gestion des liens visité : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_visited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += '</div>';
        attr_apparence += '</div>';

        //gestion de l'affichage de la règle
        attr_apparence += "<div id='uci_div_affichage_regle'>";

        attr_apparence += "<div id='uci_regle_enabled'>";
        if(accessibilitytoolbar.getCompatible('a11yRegleEnabled')) {
            attr_apparence += "<input value='true' name='a11yRegleEnabled' type='checkbox' id='uci_check_regle'";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleEnabled") === "true" ? " checked='checked'>" : ">");
        } else {
            attr_apparence += "<input value='true' name='a11yRegleEnabled' type='checkbox' id='uci_check_regle' disabled>";        
        }
        attr_apparence += "<label for='uci_check_regle'>";
        attr_apparence += accessibilitytoolbar.get('uci_title_regle');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_regle'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_regle'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_regle');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>"; //uci_regle_enabled
        
        if(accessibilitytoolbar.getCompatible('a11yRegleEnabled')) {                  
            if(accessibilitytoolbar.userPref.get("a11yRegleEnabled") === 'true'){
                attr_apparence += "<div id='uci_div_regle' style='display:block'>";
            }else {
                attr_apparence += "<div id='uci_div_regle' style='display:none'>";
            }
            attr_apparence += "<div id='uci_div_regle_horizontal'>";
            attr_apparence += " <input type='checkbox' value='true' name='a11yRegleHorizontal' id='uci_check_regle_horizontal'";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleHorizontal") === "true" ? " checked='checked'>" : ">");
            attr_apparence += "<label for='uci_check_regle_horizontal'>";
            attr_apparence += accessibilitytoolbar.get('uci_label_regle_horizontale');
            attr_apparence += "</label>";
            attr_apparence += "</div>";
    
            attr_apparence += "<div id='uci_div_regle_verticale' >";
            attr_apparence += " <input type='checkbox' value='true' name='a11yRegleVertical' id='uci_check_regle_verticale'";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleVertical") === "true" ? " checked='checked'>" : ">");
            attr_apparence += "<label for='uci_check_regle_verticale'>";
            attr_apparence += accessibilitytoolbar.get('uci_label_regle_vertical');
            attr_apparence += "</label>";
            attr_apparence += "</div>";
    
            //gestion réglage de la règle
            attr_apparence += "<div id='uci_div_more_reglage_regle'>";
            //gestion couleur de la règle
            attr_apparence += "<div id='uci_regle_couleur'>";
            attr_apparence += "<span class='cdu_c uci_regle_couleur_span cdu_left'>"+accessibilitytoolbar.get('uci_txt_regle_color')+"</span>";
            attr_apparence += "<div class='cdu_left'><a href='#' id='uci_regle_couleur_lien' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_txt_regle_color')+"\" style='background-color:"+accessibilitytoolbar.userPref.get("a11yRegleColor")+ "!important'>";
            attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_txt_regle_color')+"</span> ";
            attr_apparence +="</a>";
            attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_regle' style='display:none'>";
            
            tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_regle' role='radiogroup' aria-labelledby='uci_a11yRegleColorSpan'>";
            index = 0;
            indexCouleur = 0;
            currentLine = "";
            moreclass = "";
            for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
                if(UciApparence.mesCouleurs[index] instanceof Array)
                {
                    indexCouleur = 0;
                    currentLine = UciApparence.mesCouleurs[index];
                    for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                        tableauCouleurPolice += "<li id='uci_a11yRegleColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yRegleColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                        tableauCouleurPolice += "</li>";
                        moreclass = "";
                    }
                    moreclass = "uci_couleur_clear";
                }
            }
            tableauCouleurPolice += '</ul>';
            attr_apparence += tableauCouleurPolice;
            attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
            attr_apparence += "</div>";
            attr_apparence += "</div>";
            //epaisseur de la régle
            attr_apparence += "<div id='uci_regle_epaisseur'>";
    
            attr_apparence += "<span id='uci_title_epaisseur_regle' class='cdu_left'>";
            attr_apparence += accessibilitytoolbar.get('uci_txt_regle_size');
            attr_apparence += "</span>";
            attr_apparence += "<ul class='uci_liste_bton' id='uci_reponses_epaisseurregle' role='radiogroup' aria-labelledby='uci_title_epaisseur_regle'>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_thin' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "thin" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_regle_thin');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_medium' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "medium" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence += accessibilitytoolbar.get('uci_title_regle_medium');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_thick' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "thick" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_regle_big');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "</lu>";
            attr_apparence += "</div>";
            attr_apparence += "</div>"; //uci_div_regle
        }
        attr_apparence += "</div>"; //uci_div_affichage_regle
/*********************************************Fin de la partie gauche******************************************************/
        attr_apparence += "</div>"; //uci_apparence_div_left

/**********************************************Gestion de la partie de droite**********************************************/

        attr_apparence += "<div id='uci_apparence_div_right'>";
        //desactiver la transparence
        attr_apparence += "<div id='uci_div_desactiver_transparence'>";
        attr_apparence += "<input type='checkbox' value='1' name='a11ySupEffetTransp' id='uci_desactiver_transparence'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupEffetTransp") === "1" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_desactiver_transparence'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disabletransp');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_disabletransp'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_disabletransp'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disabletransp');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de fond
        attr_apparence += "<div id='uci_div_disabled_fond_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFont' id='uci_label_disablebgpictures'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFont") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_label_disablebgpictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablebgpictures');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de premier plan
        attr_apparence += "<div id='uci_div_disabled_first_plan_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFirstPlan' id='uci_label_disablepppictures' ";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_label_disablepppictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablepppictures');
        attr_apparence += "</label >";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_disablepppictures'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_disablepppictures'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disablepppictures');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";
/**********************************************Fin de la partie de droite*************************************************/
        attr_apparence += "</div>";
/*************************************************Fin de la partie apparence**********************************************/
        attr_apparence += "</div>";
        return attr_apparence;
    },

    displayLien: function (elementparent,id) {

            if (document.getElementById(elementparent).checked) {
                document.getElementById(id).style.display = "block";
            }else {
                document.getElementById(id).style.display = "none";
            }
    },

    displayLienCouleur: function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id).focus();
        }else {
        	
            UciApparence.hideLienCouleur(id);
        }
    },

    hideLienCouleur: function (id) {
            document.getElementById(id).style.display = "none";
    },

    uciFermetureOverlay: function(_event_, id) {
    	var winObj="";
        if ( window.event )
            winObj = window.event;
        // --- Netscape and other explorers
        else
            winObj = _event_;

        var intKeyCode = winObj.keyCode;
        if (intKeyCode ===13 || intKeyCode ===27){
            document.getElementById(id).style.display = "none";
        }
    }
}
// Source: app/js/UciTypographie.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet typographie
 */
/*global window */
/*global document: false */
/* global alert */
UciTypographie = {
    /*
    * @property
    * @private
     */
    attr_typography: "",
    /*
     * @constructor
     */
    InitUciTypographie: function () {
        attr_typography = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_typographie' style='display: block'>";

/************************************gestion de la partie gauche********************************************************/
        attr_typography += "<div id='uci_typo_div_left' class='cdu_c'>";
        /*gestion de la taille de police*/
        attr_typography += "<div class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontsize');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_bigger' role='radiogroup'>";
        attr_typography += "<li id='uci_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        //gestion de l'espacement entre les mots            
        attr_typography += "<div id='uci_typo_espacement_mot' class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<span id='uci_espacement_word_aria_label' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_wordspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_wordspacing' role='radiogroup' aria-labelledby='uci_espacement_word_aria_label'>";
        attr_typography += "<li id='uci_a11ySpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_0.5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_medium')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/******************************************************Fin partie de gauche**************************************************/
        attr_typography += "</div>";
/************************************gestion de la partie centrale********************************************************/
        attr_typography += "<div id='uci_typo_div_centre' class='cdu_c'>";

        // gestion de l'espacement entre les caractère
        attr_typography += "<div class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span id='uci_typo_font_caractere' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_charspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_charspacing' role='radiogroup' aria-labelledby='uci_typo_font_caractere'>";
        attr_typography += "<li id='uci_a11yCharSpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_medium')+"\">";  
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        // gestion espacement entre les lignes
        attr_typography += "<div id='uci_typo_spacement_line' class='uci_aria_button_group cdu_c uci_clear'>";        
        attr_typography += "<span id='uci_typo_spacement_line_aria_label' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_linespacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_linespacement' role='radiogroup' aria-labelledby='uci_typo_spacement_line_aria_label'>";
        attr_typography += "<li id='uci_a11yLineSpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_normal')+"\">";       
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_medium')+"\">";         
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_large')+"\">";    
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/************************************Fin de la partie centrale*************************************************************/
        attr_typography += "</div>";
/***************************************Debut de la partie droite*************************************************************/
        attr_typography += "<div id='uci_typo_div_right' class='cdu_c'>";


        // Gestion de la police à utiliser pour les dysléxique
        attr_typography += "<div id='uci_typo_dyslexy_font' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<div id='box-a11yDyslexyFontEnabled_off'>" ;
        
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' id='uci_chekbox_dyslexy_font' "+(accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on" ? " checked='checked'" : "")+">";
            attr_typography += "<label for='uci_chekbox_dyslexy_font' id='uci_title_typographie'>";
        } else {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' id='uci_chekbox_dyslexy_font' disabled>";
            attr_typography += "<label for='uci_chekbox_dyslexy_font' id='uci_title_typographie' class='uci_disable_label'>";
        }                
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_fontfamily');
        attr_typography += "</label>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_fontfamily'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_fontfamily'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_fontfamily');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        
        // only if compatible
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            if (accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on"){
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:block'>";
            }else {
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:none'>";
            }
    
            attr_typography += "<span class='cdu_n'>";
            attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontfamily');
            attr_typography += "</span>";
            
            attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_fontfamily' role='radiogroup' aria-labelledby='uci_title_typographie'>";
            attr_typography += "<li id='uci_a11yDyslexyFont_arial' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_arial')+"\">";
            attr_typography += "Arial";
            attr_typography += "</li>";
            attr_typography += "<li id='uci_a11yDyslexyFont_opendyslexic' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_opendys')+"\">";
            attr_typography += "Open Dyslexic";
            attr_typography += "</li>";
            attr_typography += "</ul>";
            attr_typography += "</div>"; //uci_fieldset_fontfamily
        }
        attr_typography += "</div>";
        // Gestion de la casse du texte
        attr_typography += "<div id='uci_typo_modif_casse' class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<div id='box-a11yModifCasseEnabled_off'>";
        attr_typography += "<input type='checkbox' name='a11yModifCasseEnabled' id='uci_chekbox_casse'"+(accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on" ? " checked='checked'" : "")+">";
        attr_typography += "<label for='uci_chekbox_casse'>";
        attr_typography += "<span>";
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "</label>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_changecase'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_changecase'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_changecase');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        if (accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on"){
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:block'>";
        }else {
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:none'>";
        }
        attr_typography += "<span class='cdu_n'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_changecasse' role='radiogroup' aria-labelledby='uci_fieldset_changecasse'>";
        attr_typography += "<li id='uci_a11yModifCasse_capitalize' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography +=  accessibilitytoolbar.get('uci_changecase_firstlettre');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_uppercase' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_toupper');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_lowercase' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_tolower');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        attr_typography += "</div>";
/***************************************Fin de la partie droite*************************************************************/
        attr_typography += "</div>";
/***************************************Fin de la partie Typographie********************************************************/
        attr_typography += "</div>";
        return attr_typography;
    },

    displayFieldset: function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    }
    
    


}

// Source: app/js/UciValidation.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_validation
 * @classdesc Cette classe permettra d'implémenter la validation
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
UciValidation = {
    /**
     * @property
     * @private
     */
    attr_validation: "",
    /*
     * @constructor init
     */
    InitUciValidation: function () {
        this.attr_validation = "<div id='uci_validation_button'>";
        this.attr_validation += "<input type='submit' class='uci_button_valider' id='uci_valider' value=\""+accessibilitytoolbar.get('uci_button_valid')+"\" />";
        this.attr_validation += "<input type='reset' class='uci_button_reset' id='uci_annuler' value=\""+accessibilitytoolbar.get('uci_button_cancel')+"\" />";
        this.attr_validation += "</div>";
        return this.attr_validation;
    },

    Validation: function (/*event*/e) {
        var event = e || window.event;
        if (event && event.stopPropagation) {
            event.stopPropagation();
            event.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        document.getElementById("uci-onoffswitch").focus();
        
        accessibilitytoolbar.setCSS();
        accessibilitytoolbar.hasDoneSettings = true;
        accessibilitytoolbar.saveUserPref();
        document.getElementById('uci_validation').className = "cdu_n";
        UciIhm.hide_more_confort();
        return false;
    },

    Annulation: function () {
        document.getElementById("uci-onoffswitch").focus();
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.storedValue);
        // Keep the toolbar open
        accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
        accessibilitytoolbar.reloadToolbar();
        return false;
    }
}
// Source: app/js/UciIhm.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class IHM
 * @classdesc Cette classe permettra de gérer les appels des onglets de la toolbar
 */
/*global window */
/*global document: false */
/* global alert */
/**
 * @class Entry point for the accessibility tool-bar
 */
UciIhm = {
    /*
     * @public
     * @constructor
     * 	constructor uci_ihm() : Constructeur de la class uciIhm
     *
     */
    InitUciIHM: function () {
        var attr_ihm = "<div class='cdu_c'>";
        attr_ihm += "<div id='uci_toolbar-quick' class='cdu_c'>";
        /****************************Integration dans la toolbar du menu de gauche********************************************
         * Mise en place du lien "masquer la barre", qui permettra de masquer la barre du confort d'utilisateur
         * Mise en place du logo " + de confort" pour donner identité graphique à la barre de confort
         * *********************************************************************************************************************/

        attr_ihm += "<div class='uci_logo_plus_de_confort cdu_c'>";
        attr_ihm += "<h1 class='uci_alt_logo'>";
        attr_ihm += accessibilitytoolbar.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        attr_ihm += "</h1>"+        
            "<div class='cdu_c uci-onoffswitch'>"+
                "<a class='"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?"uci-onoffswitch-label-on' title=\""+accessibilitytoolbar.get('uci_title_disable_cdu')+"\"":"uci-onoffswitch-label' title=\""+accessibilitytoolbar.get('uci_title_enable_cdu')+"\"")+" id='uci-onoffswitch' href='#'>"+
                    "<span class='uci-onoffswitch-inner-before'>ON</span>"+
                    "<span class='uci-onoffswitch-switch'></span>"+
                    "<span class='uci-onoffswitch-inner-after'>OFF</span>"+
                "</a>"+
            "</div>";
    
        attr_ihm += "</div>";
        attr_ihm += "<div class='uci_right'>";
        
        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c uci_notmask ie7'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {            
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c uci_notmask'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {            
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";    
        attr_ihm += "<!--<![endif]-->";
        
        /***************************************Fin menu de gauche*************************************************************/

        /**********************************************Menu central de la toolbar**********************************************
         * Mise en place des choix rapides concernant les tailles de police : 3 choix possibles
         * Mise en place des choix rapides concernant les contraste de couleur de police et d'arriere plan : 2 choix possibles
         * Mise en place du lien " + plus de confort" pour permettre l'ouverture complète aux options du CDU
         ***********************************************************************************************************************/
        /*
         * gestion de la police
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_bigger_quick_set' role='radiogroup'>";
        attr_ihm += "<li id='uci_quick_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        /**
         * Gestion des couleurs
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_couleurpredefinie_quick_set' role='radiogroup'>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_default')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_default')+"</span>";
        if(accessibilitytoolbar.isModern) {
	        attr_ihm += UciIhm.displayIconPalette('0 -5 36 36');
        } else {
        	attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-test\"><span class=\"cdu-icon path1\"></span><span class=\"cdu-icon path2\"></span><span class=\"cdu-icon path3\"></span><span class=\"cdu-icon path4\"></span><span class=\"cdu-icon path5\"></span><span class=\"cdu-icon path6\"></span><span class=\"cdu-icon path7\"></span><span class=\"cdu-icon path8\"></span><span class=\"cdu-icon path9\"></span><span class=\"cdu-icon path10\"></span></span>";
        }
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"</span>";
        if(accessibilitytoolbar.isModern) {
	        attr_ihm += UciIhm.displayIconPalette('0 -5 36 36');
        } else {
        	attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-test\"><span class=\"cdu-icon path1\"></span><span class=\"cdu-icon path2\"></span><span class=\"cdu-icon path3\"></span><span class=\"cdu-icon path4\"></span><span class=\"cdu-icon path5\"></span><span class=\"cdu-icon path6\"></span><span class=\"cdu-icon path7\"></span><span class=\"cdu-icon path8\"></span><span class=\"cdu-icon path9\"></span><span class=\"cdu-icon path10\"></span></span>";
        }
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>";
        /***************************************** Fin bloc uci_left_toolbar de la toolbar *****************************************/
        
        
        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c uci_notmask ie7'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {        
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c uci_notmask'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {        
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";    
        attr_ihm += "<!--<![endif]-->";

        //  gestion du lien "+ de confort"          
        attr_ihm += "<a class='uci_lien_plus_reglage cdu_c' href=\"#\" id='uci_moreconfort'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-plus2\" id=\"uci_icon_moreconfort\">"+""+"</span>";
        attr_ihm += "<span id='uci_moreconfort_content'>"+accessibilitytoolbar.get('uci_txt_more_settings')+"</span>";
        attr_ihm += "</a>";
        attr_ihm += "</div>";

        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_right_toolbar' class='cdu_c uci_notmask ie7'>";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_right_toolbar' class='cdu_c uci_notmask'>";  
        attr_ihm += "<!--<![endif]-->";
        
        /************************************************Menu de droite de la toolbar*******************************************         
         * Mise en place du menu facebook tout a droite, permettant d'un menu comprenant :
         * le choix de langues
         * la consultation de l'aide générale
         * la reinitialisation de tout mes réglages
         * le masquage de la barre "+ de confort"
         **********************************************************************************************************************/
        
        attr_ihm += "<ul>"+
                        "<li class='uci_inline'>"+
                            "<button id='uci_menu_remove_all' class='uci_bton_menu cdu_c' title='"+accessibilitytoolbar.get('uci_menu_remove_all')+"'>"+
                                "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-reload2\"></span>"+
                                "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_menu_remove_all')+"</span>"+
                            "</button>"+
                        "</li>"+ 
                        "<li class='uci_inline'>"+
                                "<button class='uci_bton_menu cdu_c' id='uci_activer_menu' title=\""+accessibilitytoolbar.get('uci_txt_link_menu_open')+"\">"+
                                    "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon cdu-icon-help\"></span>"+
                                    "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_txt_link_menu_open')+"</span>"+
                                "</button>";
        //gestion du menu deroulant du menu
        attr_ihm += "<div class='uci_cdu_menu_relative'>";
        attr_ihm += "<div id='uci_cdu_menu' style='display:none;'>";
        attr_ihm += "<button class='uci_bton_menu cdu_c' id=\"uci_fermeture_cdu_menu\" title='"+accessibilitytoolbar.get('uci_txt_link_menu_close')+"'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-croix\"></span>"
        attr_ihm += "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_txt_link_menu_close')+"</span>"
        attr_ihm += "</button>";
        attr_ihm += "<ul>";
        attr_ihm += "<li>";
        attr_ihm += "<div id='uci_language'>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "fr"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_fr' value='fr' id='uci_fr' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "en"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_en' value='en' id='uci_en' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_en')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "es"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_sp' value='sp' id='uci_sp' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_es')+"\"/>";
        attr_ihm += "</div>";
        
        attr_ihm += "</li>";
        attr_ihm += "<li><a id='uci_menu_ouverture_aide' href=\""+helpPath[accessibilitytoolbar.strings.getLocale()]+"\" title=\""+(accessibilitytoolbar.get('uci_menu_help')+" ("+accessibilitytoolbar.get('uci_new_window'))+")\">";
        attr_ihm += '<span aria-hidden=\"true\" class="cdu-icon cdu-icon-help"></span><span>' + accessibilitytoolbar.get('uci_menu_help') + '</span>';
        attr_ihm += "</a></li>";
        
        attr_ihm += "</ul>";
        attr_ihm += "</div></div></li>"; // fin menu     
        
        attr_ihm += "<li class='uci_inline'><button id='uci_menu_activer_menu' class='uci_bton_menu cdu_c' title='"+accessibilitytoolbar.get('uci_link_hide_toolbar')+"'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-croix\"></span>"
        attr_ihm += "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_link_hide_toolbar')+"</span>"
        attr_ihm += "</button></li></ul>";
        
        attr_ihm += "</div>"; // fin div uci_right_toolbar
        attr_ihm += "</div>"; // fin div uci_right
        attr_ihm += "</div>"; // fin div toolbar quick
        /*********************************************Gestion du menu d'onglet*****************************************************
         Mise en place d'un système d'onglet, pour la gestion des différents onglets composant le CDU :
         - Onglet typographie : reprenant les différents éléments en rapport
         * à la police d'écriture
         * aux tailles des texte
         * aux tailles des espacements des mots,des lignes, des caractères
         * à la casse du texte.
         - Onglet agencement : reprenant les différents éléments en rapport :
         * à la gestion de la mise en page
         * à l'alignement des texte
         * à l'apparence des liens de navigations
         * à la supression des effet de transparence, aux images de fond, à la suppréssion des images de premier plan
         - Onglet couleurs : reprenant les différents éléments suivant :
         * Utilisation prédéfinis de couleurs de fond et d'écriture
         * Ou utilisation de couleurs prédéfinies
         * Gestion du contraste entre les couleurs
         - Onglet aide motrices : reprenant les différents comportement d'aide à la motricité :
         * Sauter le contenu
         * Gestion de la navigation par pointage
         * Gestion de la sélection automatique des éléments
         ***************************************************************************************************************************/

        attr_ihm += "<div class='uci_systeme_onglets cdu_c' id=\"uci_zone_form\" style='display:none;'>";
        
        attr_ihm += "<button id='uci_fermeture_more_comfort' class='uci_bton_menu cdu_c' title='"+accessibilitytoolbar.get('uci_txt_low_settings')+"' style='display:none;'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-croix\"></span>"
        attr_ihm += "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_txt_low_settings')+"</span>"
        attr_ihm += "</button>";
        
        
        attr_ihm += "<div id=\"uci_activateOnglet\" style='display:none;'>"; // uci_activateOnglet        
        attr_ihm += "<!--[if IE 7]><div class='uci_onglets uci_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_onglets'><!--<![endif]-->"; // uci_onglets
        attr_ihm += "<div>"; // 2
        attr_ihm += "<div class='uci_container_onglets'>";  // 1

        attr_ihm += "<ul id='uci_onglet_confort' role='tablist' class='cdu_c'>";
        attr_ihm += "<li role='tab' aria-selected='true' aria-controls='uci_contenu_onglet_typographie' tabindex='0' class='uci_inline'> <span class=\"onglet_1 onglet\" id=\"onglet_typographie\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-typographie icon\"></span>";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_typo');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_apparence' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_apparence\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-agencement icon\"></span>";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_apparence');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_couleur' tabindex='-1' class='uci_inline'> <span  class=\"onglet_0 onglet\" id=\"onglet_couleur\">";
        if(accessibilitytoolbar.isModern) {
	        attr_ihm += UciIhm.displayIconPalette('0 0 33 33');
        } else {
        	attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-couleurs icon\"></span>";
        }
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_color');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_aidemotrice' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_aidemotrice\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-comportement icon\"></span>";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_motor_help');
        attr_ihm += "</span></li>";
        attr_ihm += "</ul>";

        attr_ihm += "</div>"; // fin 1
        attr_ihm += "</div>"; // fin 2
        attr_ihm += "</div>"; // fin uci_onglets

        attr_ihm += "<div class='uci_div_conteneur_contenu_onglets'>";
        attr_ihm += "<!--[if IE 7]><div class='uci_contenu_onglets uci_contenu_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_contenu_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_contenu_onglets'><!--<![endif]-->"; // uci_contenu_onglets
        attr_ihm += UciTypographie.InitUciTypographie();
        attr_ihm += UciApparence.InitUciApparence();
        var couleur = new UciCouleur();
        attr_ihm += couleur.InitUciCouleur();
        attr_ihm += UciAideMotrice.InitUciAideMotrice();
        attr_ihm += "</div>"; // fin contenu onglets
        attr_ihm += "</div>"; // fin clear
        attr_ihm += "</div>"; // fin uci_activateOnglet


        //var validation =  new UciValidation();
        var strValidation = UciValidation.InitUciValidation();
        attr_ihm += "<div id='uci_validation' class='cdu_n'>"+strValidation+"</div></form>";

        attr_ihm += "</div>"; // fin uci_zone_form
        attr_ihm += "</div>"; // fin container
        return attr_ihm;
    },
    

    /* Permet de désactiver l’affichage du menu facebook.
       @param nofocus boolean true if focus don't need to be pushed
    */


    close_menu: function (nofocus) {
        document.getElementById('uci_cdu_menu').style.display = "none";
        var button = document.getElementById("uci_activer_menu");
        if(button.nodeName === 'BUTTON') {
            button.title = accessibilitytoolbar.get('uci_txt_link_menu_open');
            var img = (button.firstElementChild || button.children[0]);
            if(img.nodeName === 'IMG') {
                img.alt = accessibilitytoolbar.get('uci_txt_link_menu_open');
            }
        }
        if(nofocus) return false;
        document.getElementById("uci_activer_menu").focus();
    },
    /*Permet d’activer le menu facebook du confort d’utilisation*/
    uci_activate_menu: function (e) {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        if (document.getElementById('uci_cdu_menu').style.display === "none") {
            document.getElementById('uci_cdu_menu').style.display = "block";
            var button = document.getElementById("uci_activer_menu");
            if(button.nodeName === 'BUTTON') {
                button.title = accessibilitytoolbar.get('uci_txt_link_menu_close');
                var img = (button.firstElementChild || button.children[0]);
                if(img.nodeName === 'IMG') {
                    img.alt = accessibilitytoolbar.get('uci_txt_link_menu_close');
                }
            }
            document.getElementById("uci_activer_menu").focus();
        } else {
            UciIhm.close_menu();
        }
        accessibilitytoolbar.stopEvt(e);
		return false;
    },
    /*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
    more_confort: function () {
    	if (document.getElementById('uci_activateOnglet').style.display === "none") {
            UciIhm.close_menu();
            document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-moins2";
            document.getElementById('uci_activateOnglet').style.display = "block";
            if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','-2');   
            document.getElementById('uci_menu_remove_all').setAttribute('tabindex','-2');   
            document.getElementById('uci_menu_activer_menu').setAttribute('tabindex','-2');                        
            document.getElementById('uci_activer_menu').setAttribute('tabindex','-2');
            if(document.getElementById('uci_zone_form'))
            {
                document.getElementById('uci_zone_form').style.display = "block";
            }
            document.getElementById('uci_fermeture_more_comfort').style.display = "block";            
            document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");
            document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','true');         
            document.getElementById('uci_moreconfort').title=accessibilitytoolbar.get('uci_txt_low_settings');
            document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_low_settings_display');
            // disable hide the toolbar
            // disable hide fontsize buttons
            // disable color button
            var elmt = document.getElementById('uci_onglet_confort');
            for(var i=0;i<elmt.children.length;i++){
                var elmt_enfant = elmt.children[i];
                if (elmt_enfant.getAttribute('tabindex') === '0' && elmt_enfant.getElementsByTagName('li')){
                   elmt_enfant.focus();
                }
            }

        } else {
            UciIhm.hide_more_confort();
        }
        return false;
    },
    hide_more_confort: function () {
    	document.getElementById("uci-onoffswitch").focus();
        document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-plus2";
        document.getElementById('uci_activateOnglet').style.display = "none";
        if(document.getElementById('uci_zone_form'))
        {
            document.getElementById('uci_zone_form').style.display = "none";
        }
        document.getElementById('uci_fermeture_more_comfort').style.display = "none";
        document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','false');              
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");      
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','false');
        
        if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','0');        
        document.getElementById('uci_menu_remove_all').removeAttribute('tabindex');
        document.getElementById('uci_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_menu_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_moreconfort').removeAttribute('title');  
        document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_more_settings');
        return false;
    },

    activate_liens: function (id_liens) {
        if (document.getElementById(id_liens).style.display === "none") {
            document.getElementById(id_liens).style.display = "block";
            document.getElementById(checked_apparence).checked = "true";
        } else {
            document.getElementById(id_liens).style.display = "none";
            document.getElementById(checked_apparence).checked = "false";
        }
        return false;
    },

    changement_langue: function (/* String*/langue) {
        // if stack value not equal to storedValue then display a confirm message to inform the user
        var tempMatrix = accessibilitytoolbar.userPref.convertMatrixv3.reverse();
        if ((accessibilitytoolbar.userPref.encode()+tempMatrix['a11ySiteWebEnabled' + "-" + accessibilitytoolbar.userPref.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "") === accessibilitytoolbar.userPref.storedValue) 
                || confirm(accessibilitytoolbar.get('uci_modif_not_saved'))){
            accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.storedValue);
            accessibilitytoolbar.userPref.set("a11yLanguage", langue);
            accessibilitytoolbar.needToReload = true;
            accessibilitytoolbar.userPref.updateUserPref();
            // when the user change the lang of the interface, wee need to reload after save is done
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },
    remove_all: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        if(confirm(accessibilitytoolbar.get('uci_remove_all_settings'))) {
            var defaultstoredValue = "0000651000650650650000000000000000006500000010"+(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled')==='on'?'0':'1');
            accessibilitytoolbar.userPref.setStoredValue(defaultstoredValue);
            accessibilitytoolbar.userPref.updateUserPref();
            accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },


    desactiveCDUForWebSite: function () {
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
            document.getElementById('uci_left_toolbar').style.display='';
            document.getElementById('uci_middle_toolbar').style.display='';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_disable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label-on";
            document.getElementById("uci-onoffswitch").focus();
        } else {
            UciIhm.hide_more_confort();
            document.getElementById('uci_left_toolbar').style.display='none';
            document.getElementById('uci_middle_toolbar').style.display='none';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_enable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label";
            document.getElementById("uci-onoffswitch").focus();
        }    
        accessibilitytoolbar.userPref.updateBlackList();
        
        accessibilitytoolbar.cleanImgDisabled();
        accessibilitytoolbar.setCSS();
        UciIhm.close_menu(true);
        return false;
    },

    ToolbarHide: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.storedValue);
        accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
        accessibilitytoolbar.userPref.updateUserPref();

        accessibilitytoolbar.hide();
        if(accessibilitytoolbar.idLinkModeContainer){
            document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
        }else{
            document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
        }
        return false;
    }, 
    
    displayIconPalette: function(viewport) {
    	return  '<svg version="1.1" viewBox="' + viewport + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="cdu-icon-palette" role="image" alt="" aria-hidden="true" >\n\
<path class="path1" d="M0.476 17.181c0 3.272 1.443 6.063 4.234 8.468s6.832 3.561 12.029 3.561c1.732 0 3.176-0.577 4.33-1.732s1.732-2.598 1.732-4.33c0-1.251 0.385-2.213 1.251-2.694 0.77-0.481 2.117-0.77 3.849-0.77 1.636 0 2.983-0.577 3.849-1.636s1.347-2.598 1.347-4.33c0-0.866-0.289-1.925-0.962-3.079s-1.54-2.31-2.598-3.368c-1.155-1.059-2.598-2.021-4.33-2.791-1.828-0.77-3.657-1.155-5.678-1.155-2.694 0-5.1 0.289-7.314 0.77s-4.138 1.251-5.966 2.31c-1.732 1.059-3.176 2.502-4.138 4.234-1.155 1.828-1.636 3.945-1.636 6.544zM14.141 23.147c0-0.674 0.289-1.347 0.77-1.828s1.155-0.77 1.828-0.77c0.674 0 1.347 0.289 1.828 0.77s0.77 1.155 0.77 1.828c0 0.674-0.289 1.347-0.77 1.828s-1.155 0.77-1.828 0.77c-0.674 0-1.347-0.289-1.828-0.77s-0.77-1.155-0.77-1.828z"></path>\n\
<path class="path2" d="M0.476 16.218c0 3.272 1.443 6.063 4.234 8.468s6.832 3.561 12.029 3.561c1.732 0 3.176-0.577 4.33-1.732s1.732-2.598 1.732-4.33c0-1.251 0.385-2.213 1.251-2.694 0.77-0.481 2.117-0.77 3.849-0.77 1.636 0 2.983-0.577 3.849-1.636s1.347-2.598 1.347-4.33c0-0.866-0.289-1.925-0.962-3.079s-1.54-2.31-2.598-3.368c-1.155-1.059-2.598-2.021-4.33-2.791-1.828-0.77-3.657-1.155-5.678-1.155-2.694 0-5.1 0.289-7.314 0.77s-4.138 1.251-5.966 2.31c-1.732 1.059-3.176 2.502-4.138 4.234-1.155 1.828-1.636 3.945-1.636 6.544zM14.141 22.185c0-0.674 0.289-1.347 0.77-1.828s1.155-0.77 1.828-0.77c0.674 0 1.347 0.289 1.828 0.77s0.77 1.155 0.77 1.828c0 0.674-0.289 1.347-0.77 1.828s-1.155 0.77-1.828 0.77c-0.674 0-1.347-0.289-1.828-0.77s-0.77-1.155-0.77-1.828z"></path>\n\
<path class="path3" d="M25.304 14.486c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.481-0.481-0.674-0.962-0.674-1.54z"></path>\n\
<path class="path4" d="M19.915 10.444c-0.385-0.385-0.674-0.962-0.674-1.54s0.192-1.059 0.674-1.54c0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.443 0.674c0.385 0.385 0.577 0.962 0.577 1.54s-0.192 1.059-0.577 1.54c-0.385 0.385-0.866 0.674-1.443 0.674s-1.059-0.192-1.54-0.674z"></path>\n\
<path class="path5" d="M12.409 9.001c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.385-0.481-0.674-0.962-0.674-1.54z"></path>\n\
<path class="path6" d="M5.672 12.369c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.481-0.385-0.674-0.866-0.674-1.54z"></path>\n\
<path class="path7" d="M25.304 13.524c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.481-0.481-0.674-0.962-0.674-1.54z"></path>\n\
<path class="path8" d="M19.915 9.482c-0.385-0.385-0.674-0.962-0.674-1.54s0.192-1.059 0.674-1.54c0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.443 0.674c0.385 0.385 0.577 0.962 0.577 1.54s-0.192 1.059-0.577 1.54c-0.385 0.385-0.866 0.674-1.443 0.674s-1.059-0.192-1.54-0.674z"></path>\n\
<path class="path9" d="M12.409 8.039c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.385-0.481-0.674-0.962-0.674-1.54z"></path>\n\
<path class="path10" d="M5.672 11.407c0-0.577 0.192-1.059 0.674-1.54 0.385-0.385 0.962-0.674 1.54-0.674s1.059 0.192 1.54 0.674c0.385 0.385 0.674 0.962 0.674 1.54s-0.192 1.059-0.674 1.54c-0.385 0.385-0.962 0.674-1.54 0.674s-1.059-0.192-1.54-0.674c-0.481-0.385-0.674-0.866-0.674-1.54z"></path>\n\
</svg>';
    }
};
// Source: app/js/toolbar.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/*global window */
/*global document: false */
/* global alert */
function LoopingMenu() {
// attribut
    // private
    /**
     * {LoopingMenu} Internal reference to this object instance
     * @private
     */
    var that = this;
    /**
     * {int} Current display position of the menu
     * @privatent.createElement("ul");

     menuContainer.appe
     */
    var position;
    /**
     * {Array} Items collection to display
     * @private
     */
    var items;
    /**
     * {DivHTMLTag} Html tag &lt;div&gt; containing the menu
     * @private
     */
    var menuContainer;
    /**
     * {H2HTMLTag} Html tag &lt;h2&gt; containing the title
     * @private
     */
    var menuTitle;
    /**
     * {UlHTMLTag} Html tag &lt;ul&gt; containing the items collection
     * @private
     */
    var menuList;

    // public
    /**
     * {int} Define menu position to center screen
     */
    this.CENTER = 1;
    /**
     * {int} Define menu position to be next to the selected item
     */
    this.NEXT_TO = 2;
    /*  */

// method
    // private
    /**
     * Initialisation of the items collection and creation of the menu html structure.
     * @private
     */
    /**
     * Create the menu html structure and set its default rendering
     * @private
     */
    var createMenu = function () {
        if (!document.getElementById("loopingBar")) {
            // Create the structure
            menuContainer = document.createElement("div");
            menuContainer.setAttribute("id", "loopingBar");
            menuTitle = document.createElement("h2");
            menuTitle.setAttribute("style", "display:none;");
            menuList = document.createElement("ul");
            menuContainer.appendChild(menuTitle);
            menuContainer.appendChild(menuList);

            document.getElementsByTagName("body")[0].appendChild(menuContainer);

            // Define default rendering
            that.setPosition(LoopingMenuPosition.CENTER);
            that.hide();
        }
    };

    var init = function () {
        createMenu();
        items = [];
    };

    /**
     * Set the menu rendering to display in the center of the screen
     * @private
     */
    var setCenter = function () {
        var decalage = 0;       /* Offset of the viewport from the top of the page */
        var windowWidth = 0;    /* Width of the viewport */
        var windowHeight = 0;   /* Height of the viewport */
        var top = 0;            /* Top position of the menu */
        var left = 0;           /* Left position of the menu */

        // Get the screen center
        if (window.innerWidth) {
            // Client viewport under common browser
            decalage = window.pageYOffset;
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else if ( document.documentElement !== 'undefined' && document.documentElement.clientWidth !== 'undefined'
            && document.documentElement.clientWidth !== 0) {
            decalage = document.documentElement.scrollTop;
            windowWidth = document.documentElement.clientWidth, windowHeight = document.documentElement.clientHeight
        }
        // and for older IE ...
        else {
            decalage = document.body.scrollTop;
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        top = (windowHeight-menuContainer.offsetHeight)/2;
        left = (windowWidth-menuContainer.offsetWidth)/2;

        menuContainer.style.top = (top+decalage)+"px";
        menuContainer.style.left = (left)+"px";
    }

    /**
     * Set the menu rendering to display next to the selected item.
     * @private
     */
    var setNextTo = function() {
        var left=0;				/* Left position of the menu */
        var top =0;				/* Top position of the menu */
        var currentItem;		/* Local reference to the selected item */
        var currentItemWidth;	/* Width of the selected item */
        var currentItemHeight;	/* Height of the selected item */
        var currentItemTop;		/* Top position of the selected item */
        var currentItemLeft;	/* Left position of the selected item */

        // Getting the screen viewport
        var decalage = 0;		/* Offset of the viewport from the top of the page */
        var delta;				/* Used to determine if the menu could be render under the selected item */
        var windowWidth = 0;    /* Width of the viewport */
        var windowHeight = 0;   /* Height of the viewport */
        if (window.innerWidth) {
            // Client viewport under : common browser
            decalage = window.pageYOffset;
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } // For IE..
        else if (typeof document.documentElement !== 'undefined'
            && typeof document.documentElement.clientWidth !== 'undefined'
            && document.documentElement.clientWidth !== 0)
        {
            decalage = document.documentElement.scrollTop;
            windowWidth = document.documentElement.clientWidth,
                windowHeight = document.documentElement.clientHeight;
        }
        // and for older IE ...
        else {
            decalage = document.body.scrollTop;
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // Getting selected item top,left,height and width
        if(LoopingUtility.getFocusedElement()<0) {
            return setCenter();
        }
        currentItem = LoopingUtility.getFocusedElement();
        currentItemWidth = currentItem.offsetWidth;
        currentItemTop = 0;
        currentItemLeft = 0;
        do {
            currentItemTop += currentItem.offsetTop;
            currentItemLeft += currentItem.offsetLeft;
        }
        while(currentItem = currentItem.offsetParent);

        // Horizontal positionning tool-bar next to the selected item
        if((currentItemLeft+currentItemWidth+menuContainer.offsetWidth) < windowWidth) {
            left = (currentItemLeft+currentItemWidth+10);
        }
        else {
            left = ((currentItemLeft+currentItemWidth+menuContainer.offsetWidth)-windowWidth);
        }

        // Vertical positionning tool-bar next to the selected item
        delta = ((decalage+windowHeight)-(currentItemTop+menuContainer.offsetHeight));
        /* Fixed menu height for correct implementation */
        if(currentItemTop > (decalage+10) && delta > 0) {
            top = currentItemTop;
        }
        else if(currentItemTop <= (decalage+10)) {
            top = (decalage+10);
        }
        else {
            top = (decalage+windowHeight-menuContainer.offsetHeight-10);
        }

        // Affecting position
        menuContainer.style.top = top+"px";
        menuContainer.style.left = left+"px";
    };

    var getMenuTitle = function() {
        return menuTitle;
    };

    // public
    /**
     * Set the position where to display the menu
     * @param {int} pos, the menu position of the screen. Could be to the center or next to the item
     */
    this.setPosition = function (pos) {
        // Check if specified position exist
        if(pos === LoopingMenuPosition.CENTER || pos === LoopingMenuPosition.NEXT_TO) {
            position = pos;
            //Delegate the rendering to the right internal method
            if(position === LoopingMenuPosition.CENTER) {
                setCenter();
            }
            if(position === LoopingMenuPosition.NEXT_TO) {
                setNextTo();
            }
        }
    };

    /**
     * Check if the current rendering position is in the center of the screen
     * @return {Boolean} true if the current rendering position is set to center, or false either
     */
    this.isCenter = function() {
        if(position === LoopingMenuPosition.CENTER) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Check if the current rendering position is next to the selected item
     * @return {Boolean} true if the current rendering position is set to center, or false either
     */
    this.isNextTo = function() {
        if(position === LoopingMenuPosition.NEXT_TO) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Check if the menu is shown on the screen
     * @return {Boolean} true if the menu is currently shown, false either.
     */
    this.isShown = function() {
        if(menuContainer.className.match(/cdu_displayN/i)){
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * Display the menu
     */
    this.show = function() {
        menuContainer.className="show";
        if(that.isCenter()) {
            setCenter();
        } else if (that.isNextTo()) {
            setNextTo();
        }
    };

    /**
     * Hide the menu
     */
    this.hide = function() {
        menuContainer.className="cdu_displayN";
    };

    /**
     * Add an item to the menu
     * @param {String} name, the string to display in the menu
     * @param {Function} callback, the function to call on item activation
     * @param {String} id, the desired id for the menu item
     */
    this.addItem = function(/* String */name, /* function */callback, /* String */id, /* boolean */ defaut) {
        var link = document.createElement("a");
        var item = document.createElement("li");
        // Create Text
        var text = null;
        if(defaut) {
            text = document.createElement("strong");
            text.appendChild(document.createTextNode(name));
        }
        else {
            text = document.createTextNode(name);
        }
        // Create link
        link.appendChild(text);
        link.setAttribute("href","#");
        link.onclick = callback;
        if ( id !== null){
            link.id = id;
        }
        item.appendChild(link);
        menuList.appendChild(item);
        // Save item reference
        items.push([name,link]);
    };

    /**
     * Remove the specified item from the menu
     * @param {String} name, the item's name
     */
    this.removeItem = function(/* String */name) {
        //Parsing items collection
        for(var i=0; i<items.length; i++) {
            if(items[i][0] === name) {
                //Remove from HTML structure and collection
                menuList.removeChild(items[i][1].parentNode);
                return items.splice(i,i);
            }
        }
    };

    /**
     * Remove all items
     */
    this.clean = function() {
        while(items.length > 0) {
            menuList.removeChild(items[0][1].parentNode);
            items.shift();
        }
    };

    /**
     * Set the menu title
     * @param {String} title, the menu title
     */
    this.setTitle = function(title) {
        // If the has been already be specified, remove it
        if(getMenuTitle().hasChildNodes()){
            getMenuTitle().removeChild(getMenuTitle().firstChild);
        }
        // Set the new one
        getMenuTitle().removeAttribute("style");
        getMenuTitle().appendChild(document.createTextNode(title));
    };

    /**
     * Get the current menu title
     * @return {String} title, the menu title. If it has not been defined, return an empty string
     */
    this.getTitle = function() {
        return menuTitle.textContent;
    };

    /**
     * Get the menu items collection
     * @return {Array} menuItems, the collection of html tag <a> assiociated to items
     */
    this.getItems = function() {
        var menuItems = [];
        for(var i=0; i<items.length; i++) {
            menuItems.push(items[i][1]);
        }
        return menuItems;
    };

    /**
     * Get the current selected item in the menu
     * @return {AHtmlTag} link, the current focused html tag <a> in the menu
     */
    this.getSelectedItem = function() {
        for(var i=0; items.length; i++) {
            if(items[i][1].className.match(/a11y-focused/)) {
                return items[i][1];
            }
        }
    };

    /**
     * Get the current position in the menu of the specified item
     * @param {AHtmlTag} elt a HTML tag <a> in the menu
     * @return {int} pos its position in the menu
     */
    this.getItemIndex = function(elt) {
        for(var i=0; items.length; i++) {
            if(items[i][1] === elt) {
                return i;
            }
        }
    };

    /**
     * Get the menu HTML tag used as container
     * @return {DivHtmlNode} container, the menu container
     */
    this.getContainer = function() {
        return menuContainer;
    };

// Constructor
    init();
}

/**
 * Looping Menu position definition
 * @class General definition of menu position
 */
var LoopingMenuPosition = {
    /**
     * Define menu position to center screen
     * @field
     * @type {int}
     */
    CENTER: 1,
    /**
     * Define menu position to be next to the selected item
     * @field
     * @type {int}
     */
    NEXT_TO: 2
};
/**
 * Allow navigation with a single touch
 * @class Manager of the remote control
 */
function LoopingMode() {
// attribut
    // private
    /**
     * Local reference to this object
     * @private
     */
    var that = this;
    /**
     * Reference Looping menu Manage manager
     * @see {LoopingMenu}
     * @private
     */
    var menu = null;
    /**
     * Value of the step for quick mode
     * @private
     */
    var quickStep = 5;
    /**
     * Value of the step by default
     * @private
     */
    var defaultStep = 1;
    /**
     * Flag to know if looping mode is enable or not
     * @private
     */
    var isMenuEnabled = 1;

    // public
// method
    // private
    /**
     * Initialisation of the object instance.
     * Creation of the menu, registration of trigger
     * and setting default value.
     * @private
     */
    var init = function() {
        // Creating Looping Menu
        menu = new LoopingMenu();
        // Setting default value
        LoopingUtility.step = 1;
        // Registering trigger
        that.registerTrigger();
        LoopingUtility.registerFocusedHandler();
    };

    // Looping menu items definition
    // --> Looping Filter methods for Menu item
    /**
     * Check if the specified element is a looping menu item
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterMenu = function(elt) {
        if(elt.nodeName.match(/^A$/gi) &&
            LoopingUtility.isMenuItem(elt) ) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing a Looping menu item
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusMenu = function(elt) {
        elt.className="a11y-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a Looping menu item
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurMenu = function(elt) {
        elt.className = elt.className.replace(/a11y-focused {0,1}/,"");
    };

    // --> Looping Filter methods for html tag <a> and <area>
    /**
     * Check if the specified element is an elligible link
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterLink = function(elt) {
        if(elt.nodeName.match(/^A|AREA$/gi) && !LoopingUtility.isMenuItem(elt)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible link
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusLink = function(elt) {
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring an elligible link
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurLink = function(elt) {
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter methods for form element
    /**
     * Check if the specified element is an elligible form element
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterForm = function(elt) {
        if(elt.nodeName.match(/^TEXTAREA|SELECT|BUTTON/gi)) {
            return true;
        }
        else if(elt.nodeName.match(/^INPUT/gi) &&
            elt.disabled !== true &&
            ((elt.getAttribute("type")!== null && !elt.getAttribute("type").match(/hidden/)) || (elt.getAttribute("type")=== null))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible form element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusForm = function(elt) {
        var lab = null;
        // Check if a label is associated to the form element
        if(elt.getAttribute("id") !== null) {
            var labels = document.getElementsByTagName("label");
            for(var i=0; i<labels.length; i++) {
                if(labels[i].htmlFor === elt.id) {
                    lab = labels[i];
                }
            }
        }
        // Style the label (if exists) and form element
        if(lab !== null) {
            lab.className = "loopingmode-focused "+lab.className;
        }
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a elligible form element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurForm = function(elt) {
        var lab = null;
        // Check if a label is associated to the form element
        if(elt.getAttribute("id") !== null) {
            var labels = document.getElementsByTagName("label");
            for(var i=0; i<labels.length; i++) {
                if(labels[i].htmlFor === elt.id) {
                    lab = labels[i];
                }
            }
        }
        // Remove the style of the label (if exists) and form element
        if(lab !== null) {
            lab.className = lab.className.replace(/loopingmode-focused {0,1}/,"");
        }
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter methods for mouse clickable element
    /**
     * Check if the specified element is activable by mouse
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterOnclick = function(elt) {
        if(elt.onclick && elt.onclick !== null && !LoopingUtility.isMenuItem(elt))
            return true;
        else return false;
    };
    /**
     * Function to call on focusing a elligible mouse clickable element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusOnclick = function(elt) {
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a elligible mouse clickable element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurOnclick = function(elt) {
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter for flash element
    /**
     * Check if the specified element is an elligible flash element
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterFlash = function(elt) {
        if(elt.nodeName.match(/^OBJECT|EMBED/gi)) {
            if (elt.type.match(/x-shockwave-flash/) && elt.hasConfortdelecture && (elt.hasConfortdelecture() === true)){
                return true;
            } else{
                return false;
            }
        } else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible flash
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusFlash = function(elt) {
        LoopingUtility.hasToStop = true;
        elt.focus();
        elt.restartLoopingMode();
    };
    /**
     * Function to call on bluring an elligible flash
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurFlash = function(elt) {

    };

    // --> Looping Filter for global looping
    /**
     * Check if the specified element could be handled by a sub filter
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterGeneric = function(elt) {        
        if (elt.tabIndex && elt.tabIndex<0) {
            return false;
        }
        if(LoopingUtility.isVisible(elt)) {
            // Case of clickable elements
            if(filterOnclick(elt)){
                return true;
            }
            // Case of form element
            else if(filterForm(elt)){
                return true;
            }
            // Case of link
            else if(filterLink(elt)){
                return true;
            }
            // Case of flash element
            else if(filterFlash(elt)) {
                return true;
            } else {
                return false;
            }
        } else{
            return false;
        }
    };
    /**
     * Function to call on focusing a generic element
     * Delegate treatment to a sub callbackFocus method
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusGeneric = function(elt) {
        // Case of Link
        if(filterLink(elt)) {
            callbackFocusLink(elt);
        } else if(filterOnclick(elt)){
            callbackFocusOnclick(elt);
        } else if(filterForm(elt)) {
            callbackFocusForm(elt);
        } else if(filterFlash(elt)){
            callbackFocusFlash(elt);
        }
    };
    /**
     * Function to call on bluring a generic element
     * Delegate treatement to a sub callbackBlur method
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurGeneric = function(elt) {
        // Case of link
        if(filterLink(elt)){
            callbackBlurLink(elt);
        }
        // Case of activable element
        else if(filterOnclick(elt)) {
            callbackBlurOnclick(elt);
        }
        // Case of form element
        else if(filterForm(elt)) {
            callbackBlurForm(elt);
        }
        // Case of flash element
        else if(filterFlash(elt)){
            callbackBlurFlash(elt);
        }
    };

    // Publics methods
    /**
     * Register trigger function for key pressed and key released.
     * Call back on key pressed (onkeypress event) just prevent default action
     * Call back on key released (onkeyup event) show the looping menu or activate the menu item
     * @return nothing
     */
    this.registerTrigger = function() {
        // Callback function for onkeyup event
        var keyUpFunc = function(/*Event*/ e) {
            if(!that.isMenuEnabled) return true;
            if(LoopingKey.keyPressed(e) === LoopingKey.ENTER || LoopingKey.keyPressed(e) === LoopingKey.SPACE) {
                // Prevent default action
                that.stopLoop();
                accessibilitytoolbar.stopEvt(e);
                if(!menu.isShown()) {
                    // Check DOM to append items to the menu before showing it
                    var hasLink, hasForm, hasOnclick, hasFlash = false;
                    var nbActivable = 0;
                    var domElts = document.getElementsByTagName("*");
                    for(var i=0; i<domElts.length; i++) {
                        // Check if DOM has links
                        if(filterLink(domElts[i])) {
                            hasLink = true;
                            nbActivable++;
                        }
                        // Check if DOM has form elements
                        if(filterForm(domElts[i])) {
                            hasForm = true;
                            nbActivable++;
                        }
                        // Check if DOM has activable elements
                        if(filterOnclick(domElts[i])) {
                            hasOnclick = true;
                            nbActivable++;
                        }
                        // Check if DOM has flashs
                        if(filterFlash(domElts[i])) {
                            hasFlash = true;
                            nbActivable++;
                        }
                    }
                    // Add items to the menu
                    if(LoopingUtility.getFocusedElement() !== -1 &&
                        (filterLink(LoopingUtility.getFocusedElement()) || filterForm(LoopingUtility.getFocusedElement()))) {
                        menu.addItem(that.getToolbar().get("uci_doClick"),that.doClick, "do_click", true);
                    }
                    if(hasLink || hasForm || hasOnclick || hasFlash) {
                        menu.addItem(that.getToolbar().get("uci_loopActivable"),that.startLoopGeneric, "activable_to_activable");
                        if(nbActivable > quickStep){
                            menu.addItem(that.getToolbar().get("uci_loopActivableQuick"),that.startFastLoopGeneric, "activable_to_activable_fast");
                        }
                        menu.addItem(that.getToolbar().get("uci_loopBackward"),that.startBackLoopGeneric, "activable_to_activable_backward");
                    }
                    menu.addItem(that.getToolbar().get("uci_stopLoop"),that.stopLoop, "stop_loop");
                    // Show the menu
                    menu.show();
                    // And start looping on it
                    that.startLoopMenu();
                }
                else {
                    // Launch the action associated to the selected menu item
                    menu.getSelectedItem().onclick();
                    menu.hide();
                    menu.clean();
                }
                return false;
            }
            else {
                return true;
            }
        };
        // Call back function for onkeypress event
        var keyPressFunc = function(/*Event*/ e) {
            if(LoopingKey.keyPressed(e) === LoopingKey.ENTER || LoopingKey.keyPressed(e) === LoopingKey.SPACE) {
                accessibilitytoolbar.stopEvt(e);
                return false;
            }
        };
        // Call back function for onclick event
        var mouseClickFunc = function(/*Event*/ e) {
            // Launch the action associated to the clicked menu item
            that.stopLoop();
            menu.hide();
            menu.clean();
        };

        // Registering call back for W3C Browser
        if(document.addEventListener) {
            // onkeyup event
            document.addEventListener('keyup',keyUpFunc,true);
            // onkeypress event
            document.addEventListener('keydown',keyPressFunc,true);
            // Mouse click event
            menu.getContainer().addEventListener('click',mouseClickFunc,false);
        }
        // Registering call back for IE Browser
        else if(document.attachEvent) {
            // onkeyup event
            document.attachEvent('onkeyup',keyUpFunc);
            // onkeypress event
            document.attachEvent('onkeypress',keyPressFunc);
            // Mouse click event
            menu.getContainer().attachEvent('onclick',mouseClickFunc);
        }
        // Registering call back for older browser
        else {
            document.onkeyup = keyUpFunc;
            menu.getContainer().onclick = mouseClickFunc;
        }
        document.onkeypress = keyPressFunc;
    };
    /**
     * Start the loop over the looping menu item collection
     */
    this.startLoopMenu = function() {
        LoopingUtility.setCurrentSet(menu.getItems());
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterMenu,callbackFocusMenu,callbackBlurMenu));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = null;
        LoopingUtility.step = defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the forward looping over the page elements collection
     */
    this.startLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the backward looping over the page elements collection
     */
    this.startBackLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = -defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the forward fast looping over the page elements collection
     */
    this.startFastLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = quickStep;
        LoopingUtility.loopOver();
    };
    /**
     * Simulate an user click on the focused element
     */
    this.doClick = function() {
        var elt = LoopingUtility.getFocusedElement();
        if(elt !== -1) {
            // Case of a link ... we do a simple redirection
            if(elt.nodeName.match(/^A|AREA$/i) && elt.href  && elt.href !== "" && !elt.href.match(/#(motor-bloc|visual-bloc|help-bloc)/) && elt.href.match(/.*(#.+).+?/)) {
                window.location = elt.href;
            }
            // Case of a form item ... we do a simple click
            else if(elt.nodeName.match(/^INPUT|SELECT|TEXTAREA$/i)) {
                if(elt.nodeName.match(/^SELECT|TEXTAREA$/i) ||
                    (elt.nodeName.match(/^INPUT$/i) && elt.type === "text")) {
                    elt.focus();
                } else {
                    elt.click();
                }
            }
            // Case of a form label ... we click the associated form item
            else if(elt.nodeName.match(/^LABEL$/i)) {
                document.getElementById(elt.htmlFor).click();
            }
            // Case of an activable onclick item ... we just launch the function
            else if(elt.onclick && elt.onclick !== null) {
                elt.onclick();
            }
            // By default, simulate a click
            else {
                var fakeClick = null;
                /* Case of W3C Compliant Browser */
                if (document.createEvent) {
                    fakeClick = document.createEvent ("MouseEvent");
                    fakeClick.initMouseEvent (
                        "click",
                        true,
                        true,
                        window,
                        0,
                        /*event.screenX*/0,
                        /*event.screenY*/0,
                        /*event.clientX*/0,
                        /*event.clientY*/0,
                        /*event.ctrlKey*/false,
                        /*event.altKey*/false,
                        /*event.shiftKey*/false,
                        /*event.metaKey*/false,
                        0,
                        null);
                    elt.dispatchEvent(fakeClick);
                } else {
                    /* Case of IE */
                    if (document.createEventObject) {
                        fakeClick = document.createEventObject(window.event);
                        fakeClick.button = 1;
                        elt.fireEvent ("onclick", fakeClick);
                    }
                }
            }
        }
    };
    /**
     * Start the default looping mode
     */
    this.start = function() {
        that.isMenuEnabled = 1;
        that.startLoopGeneric();
    };
    /**
     * Restart the default looping mode
     */
    this.restartLoopingmode = function() {
        that.startLoopGeneric();
        //TODO : maybe calling loopOver should be better
    };
    /**
     * Stop the loop over items collection
     */
    this.stopLoop = function() {
        clearTimeout(LoopingUtility.timerId);
    };

    /**
     * Stop the looping mode properly
     */
    this.killLoopingMode = function() {
        this.stopLoop();
        clearTimeout(LoopingUtility.timerId);
        that.isMenuEnabled = 0;
        var elt = LoopingUtility.getFocusedElement();
        if(elt){
            // Case of link
            if(filterLink(elt)){
                callbackBlurLink(elt);
            }
            // Case of activable element
            else if(filterOnclick(elt)) {
                callbackBlurOnclick(elt);
            }
            // Case of form element
            else if(filterForm(elt)) {
                callbackBlurForm(elt);
            }
            // Case of flash element
            else if(filterFlash(elt)){
                callbackBlurFlash(elt);
            }
        }
        if(menu.isShown()) {
            menu.hide();
            menu.clean();
        }
    };

    // public Api used by accessibilitytoolbar
    /**
     * Set the position of the looping menu
     * @param {int} pos the looping menu position (CENTER or NEXT_TO)
     */
    this.setPosition = function(pos) {
        menu.setPosition(pos);
    };
    /**
     * Set the delay before loop
     * @param {int} timeout the delay before loop
     */
    this.setTimeout = function(timeout) {
        LoopingUtility.timeOut = timeout;
    };
    /**
     * Set the step value for quick mode
     * @param {int} _step the step for quick mode
     */
    this.setQuickModeStep = function(_step) {
        quickStep = _step;
    };

    /**
     * Return the accessibilitytoolbar instance
     * @return {AccessibilityToolbar} toolbar the accessibilitytoolbar
     */
    this.getToolbar = function() {
        if(accessibilitytoolbar) {
            return accessibilitytoolbar;
        } else {
            return null;
        }
    };

// Constructor
    init();
}
/**
 * @class Toolbox of the looping mode
 */
LoopingUtility = {
// attribut
    /**
     * Reference to the current focused element
     * @private
     */
    focusedElement: null,
    /**
     * Reference to the timer used for looping
     * @private
     */
    timerId: null,
    /**
     * Delay before loop EXPRESS IN SECOND
     * @private
     */
    timeOut: null,
    /**
     * The increment (if someone have a better definition)
     * @private
     */
    step: null,
    /**
     * Index of the previous focused item
     * @private
     */
    prevIndex: null,
    /**
     * Index of the item to focus
     * @private
     */
    nextIndex: null,
    /**
     * Index of the last item in the page focused (not taking count of looping menu or other toolbar parts
     * @private
     */
    lastDOMIndex: null,
    /**
     * Collection of items to iterate
     * @private
     */
    currentSet: null,
    /**
     * Collection of items of the previously iteration
     * @private
     */
    previousSet: null,
    /**
     * Filter to applicate to the current item collection
     * @private
     */
    currentFilter: null,
    /**
     * Filter to applicate to the previous item collection
     * @private
     */
    previousFilter: null,
    /**
     * Flag to stop loop with user action
     * @private
     */
    hasToStop: false,
    /**
     * Internal flag to remember if we double the first or last item.
     * DO NOT CALL THIS ATTRIBUT OUTTER THIS OBJECT
     * use the "hasToDouble" method instead
     * @private
     */
    hasToStay: false,
    /**
     * Internal check of "hasToDouble" flag.
     * DO NOT CALL THIS ATTRIBUT OUTTER THIS OBJECT
     * use the "hasToDouble" method instead
     * @private
     */
    hasStayed: true,

// method
    /**
     * Register the focus call back
     */
    registerFocusedHandler:function() {
        // Focus callback
var getFocus = function(evt) {
            evt = evt || window.event;
            var target = evt.target || evt.srcElement;
            // Save the element reference if it has been focused by the toolbar
            if(target.className &&
                target.className.match(/loopingmode-focused/) &&
                !LoopingUtility.isMenuItem(target)) {
                LoopingUtility.focusedElement = target;
            }
        };
        // Register focus callback for W3C browser
        if(window.addEventListener && !window.opera) {
            window.addEventListener('focus',getFocus,true);
            // Register focus callback for IE
        } else if(window.addEventListener && window.opera){
            window.addEventListener('DOMFocusIn',getFocus,true);
        } else {
            document.onfocusin = getFocus;
        }
    },
    /**
     * Get the current focused element
     * @return {HtmlNode} elt return the current focused element, -1 either
     */
    getFocusedElement: function () {
if (LoopingUtility.focusedElement !== null) {
            return LoopingUtility.focusedElement;
        }
        else {
            return -1;
        }
    },

    /**
     * Tell the looping manager if it have to stay on the first (if looping forward)
     * or the last (if looping backward) DOM element
     * @param {boolean} flag set to true to double the first or last element
     */
    hasToDouble: function (flag) {
LoopingUtility.hasToStay = flag;
        LoopingUtility.hasStayed = flag;
    },

    /**
     * Save the old filter and use the specified one on the item collection
     * @param {LoopingFilter} filter the filter to use on current set
     */
    setCurrentFilter: function (filter) {
LoopingUtility.previousFilter = LoopingUtility.currentFilter;
        LoopingUtility.currentFilter = filter;
    },

    /**
     * Save the old item collection and use the specified one as item collection to iterate
     * @param {Array} set the items collection to iterate
     */
    setCurrentSet: function (set) {
LoopingUtility.previousSet = LoopingUtility.currentSet;
        LoopingUtility.currentSet = set;
    },

    /**
     * Seek the index of the next elligible element with the current filter in the items collection
     */
    computeNextIndex: function () {
// initialisation
        var raf = Math.abs(LoopingUtility.step);
        var currentElt = null;

        // If we are on the elligible element and if we have to double
        if ((LoopingUtility.hasToStay && !LoopingUtility.hasStayed) &&
            (LoopingUtility.nextIndex !== null && LoopingUtility.currentFilter.filter(LoopingUtility.currentSet[LoopingUtility.nextIndex]))
            ) {
            // Save the fact that we have double and quit without increment pointer
            LoopingUtility.hasStayed = true;
            return;
        }
        // Default value of the pointer
        if (LoopingUtility.nextIndex === null) {
            // If we have to double, initialise internal flag
            if (LoopingUtility.hasToStay) {
                LoopingUtility.hasStayed = false;
            }
            //Initialize pointer value
            if (LoopingUtility.step > 0) {
                LoopingUtility.nextIndex = 0;
            } else {
                LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
            }
        }
        else {
            // Pointer incrementation and prevent array out of bound
            if (LoopingUtility.step > 0) {
                // Case of forward looping
                LoopingUtility.nextIndex++;
                if (LoopingUtility.nextIndex >= LoopingUtility.currentSet.length) {
                    LoopingUtility.nextIndex = 0;
                    //If we have to double, reset internal flag
                    if (LoopingUtility.hasToStay) {
                        LoopingUtility.hasStayed = false;
                    }
                }
            } else {
                // Case of backward looping
                LoopingUtility.nextIndex--;
                if (LoopingUtility.nextIndex < 0) {
                    LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
                    //If we have to double, reset internal flag
                    if (LoopingUtility.hasToStay) {
                        LoopingUtility.hasStayed = false;
                    }
                }
            }
        }
        // While we have iteration to do
        while (raf > 0) {
            currentElt = LoopingUtility.currentSet[LoopingUtility.nextIndex];
            // If element is elligible to the current filter, decrement iteration to do
            if (LoopingUtility.currentFilter.filter(currentElt)) {
                raf--;
            }
            // If element is invalid to the filter or if we still have incrementation to do
            if (!LoopingUtility.currentFilter.filter(currentElt) || raf > 0) {
                // Pointer incrementation and prevent array out of bound
                if (LoopingUtility.step > 0) {
                    // Case of forward looping
                    LoopingUtility.nextIndex++;
                    if (LoopingUtility.nextIndex >= LoopingUtility.currentSet.length) {
                        LoopingUtility.nextIndex = 0;
                        // If we have to double, reset internal flag
                        if (LoopingUtility.hasToStay) {
                            LoopingUtility.hasStayed = false;
                        }
                    }
                } else {
                    // Case of backward looping
                    LoopingUtility.nextIndex--;
                    if (LoopingUtility.nextIndex < 0) {
                        LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
                        //If we have to double, reset internal flag
                        if (LoopingUtility.hasToStay) {
                            LoopingUtility.hasStayed = false;
                        }
                    }
                }
            }
        }
    },

    /**
     * Iterate for the items collection and check if element are elligible to the current filter.
     * If so, focus it and apply style on it.
     */
    loopOver: function () {
var currentElt;
        // Check if required data are specified
        if (LoopingUtility.currentFilter !== null && LoopingUtility.currentSet !== null) {
            LoopingUtility.computeNextIndex();
            // Update current element
            currentElt = LoopingUtility.currentSet[LoopingUtility.nextIndex];
            // Suppress effect on previous element, if exists, by calling the filter blur callback
            if(LoopingUtility.prevIndex !== null) {
                //	Use previous filter if element is invalid for the current filter
                if(LoopingUtility.previousFilter !== null && (LoopingUtility.prevIndex > LoopingUtility.currentSet.length ||
                    !LoopingUtility.currentFilter.filter(LoopingUtility.currentSet[LoopingUtility.prevIndex]))) {
                    LoopingUtility.previousFilter.blur(LoopingUtility.previousSet[LoopingUtility.prevIndex]);
                }
                else {
                    LoopingUtility.currentFilter.blur(LoopingUtility.currentSet[LoopingUtility.prevIndex]);
                }
            }

            // Call the filter callback for focus action
            LoopingUtility.currentFilter.focus(currentElt);

            // Update DOM pointer
            if(!LoopingUtility.isMenuItem(currentElt)) {
                LoopingUtility.lastDOMIndex = LoopingUtility.nextIndex;
            }
            LoopingUtility.prevIndex = LoopingUtility.nextIndex;

            // Prepare respawn
            if(!LoopingUtility.hasToStop) {
                if(LoopingUtility.timerId !== null) clearTimeout(LoopingUtility.timerId);
                LoopingUtility.timerId = setTimeout(LoopingUtility.loopOver,LoopingUtility.timeOut*1000);
            }
            else {
                LoopingUtility.hasToStop = false;

            }
        }
    },

    /**
     * Check if specified element is part of the looping menu
     * @param {HtmlNode} elt the element to check
     * @return true if the specified element is a looping menu item, false either
     */
    isMenuItem:function(elt) {
if(elt &&
            elt.parentNode &&
            elt.parentNode.parentNode &&
            elt.parentNode.parentNode.parentNode &&
            elt.parentNode.parentNode.parentNode.id &&
            elt.parentNode.parentNode.parentNode.id.match(/loopingBar/)) {
            return true;
        }
        else  {
            return false;
        }
    },

    /**
     * Check if specified element is visible and can be focused
     * @param {HtmlNode} obj the element to check
     * @return true if the specified element is visible, false either
     */
    isVisible:function(obj)
    {
if (obj === document){
            return true;
        }
        if (!obj){
            return false;
        }
        if (!obj.parentNode){
            return false;
        }
        if (obj.style) {
            if (obj.style.display === 'none'){
                return false;
            }
            if (obj.style.visibility === 'hidden'){
                return false;
            }
        }

        //Try the computed style in a standard way
        if (window.getComputedStyle) {
            var style = window.getComputedStyle(obj, "");
            if (style.display === 'none'){
                return false;
            }
            if (style.visibility === 'hidden'){
                return false;
            }
        }

        //Or get the computed style using IE's silly proprietary way
        var styleobj = obj.currentStyle;
        if (styleobj) {
            if (styleobj['display'] === 'none') {
                return false;
            }
            if (styleobj['visibility'] === 'hidden') {
                return false;
            }
        }
        return LoopingUtility.isVisible(obj.parentNode);
    }
}

/**
 * Abstract class to define filter item
 * @class Generic definition of item filtering
 * @param {Function} _filter : function returning a {Boolean} to determine if the {HTMLNode} element is eligible.
 * @param {Function} _callbackFocus : function to be called when the given {HTMLNode} element get focus.
 * @param {Function} _callbackBlur : function to be called when the given {HTMLNode} element lost focus.
 */
function LoopingFilter(_filter, _callbackFocus, _callbackBlur) {
// attribut
    //privé
    //public
    /**
     * Filter function to check elligibility of an {HTMLNode} element
     */
    this.filter = _filter;
    /**
     * Focus callback to be called when {HTMLNode} element get focus
     */
    this.focus = _callbackFocus;
    /**
     * Blur callback to be called when {HTMLNode} element lost focus
     */
    this.blur = _callbackBlur;
    // methode
    //privé
    //public
// Constructor
}

/**
 * @class General definition of key pressed
 */
LoopingKey = {
    /**
     * Return the key pressed
     * @param {Event} e the event to check
     * @return {int} keycode the key pressed
     */
    keyPressed:function(/*Event*/ e) {

        var charCode = [];
        // For IE browser
        if(window.event) {
            charCode[0] = window.event.keyCode;
            charCode[1] = 0;
        }
        // For W3C Browser
        else if(e) {
            charCode[0] = e.keyCode;
            charCode[1] = e.which;
        }
        else return -1;

        // Return the corresponding key code
        if((charCode[0] == 32 || charCode[1] == 32))
            return LoopingKey.ENTER;
        if((charCode[0] == 13 || charCode[1] == 13))
            return LoopingKey.SPACE;
        return LoopingKey.OTHER;
    },

    /*
     * Key definition
     */
    /**
     * Enter key representation
     */
    ENTER: 1,
    /**
     * Space key representation
     */
    SPACE: 2,
    /**
     * Unknown key representation
     */
    OTHER: -1
};


/**
 * For motor disabilites.
 * This creates a visible remote control in the bottom-right corner of the screen
 * on mouse over it scrolls
 * on mouse over links it clicks on them
 * @class Manager of the remote control mode
 */
var RemoteControlMode = function () {
    // Attributs
    // Private attributs
    /**
     * Reference Remote control pad manager
     * @see {RemoteControlPad}
     * @private
     */
    var pad = null;
    /**
     * Reposition the remote every repositionTimer in milliseconds (this is part of the 'special IE6' treat)
     * @private
     */
    var repositionTimer = 50;
    /**
     * Number of pixels to scroll at a time
     * @private
     */
    var scrollSteps = 10;
    /**
     * Scroll every scrollTimer in milliseconds
     * @private
     */
    var scrollTimer = 50;
    /**
     * Internal reference to this object
     * @private
     */
    var that = this;

    // Public attributs 
    /**
     * global timerID for setTimeout and clearTimeout
     */
    this.timerId = null;
    /**
     * number of pixels to scroll at a time
     */
    this.scrollSteps = 10;
    /**
     * Element hovered by the mouse at a T time
     */
    this.selectedElt = null;
    /**
     * Timer for click on hovsder, EXPRESSED IN SECONDS
     */
    this.hoverTimer = 3;

    // Methods
    // Private methods
    /**
     * Lists all {HTMLA} and {HTMLArea} links and adds event handlers
     * @private
     */
    var makeLinksHoverable = function () {
        var elts = document.getElementsByTagName("*");
        for (var cpt = 0; cpt < elts.length; cpt++) {
            if (that.isActivable(elts[cpt]))
            {
                that.makeLinkClickableOnHover(elts[cpt]);
            }
        }
    };

    /**
     * Function to stop help motor
     */
    this.stopHelpMotor = function () {
       //Remove remotecontrol
        if(document.getElementById('remotecontrol')){
            var fleche = document.getElementById('remotecontrol');
            fleche.parentNode.removeChild(fleche);
        }
        //on recupere l'ensemble des elements du site
        var element = document.getElementsByTagName("*");
        //On boucle sur l'ensemble des élément du site'
        for (var cpt = 0; cpt < element.length; cpt++) {
            //On test si l'element est activable, si il est activable alors on detache les événements appliqués
            if (that.isActivable(element[cpt])){
                // For W3C Browser
                if (element[cpt].addEventListener) {
                    element[cpt].removeEventListener('mouseover',that.mouseOverActivableTrigger , false);
                    element[cpt].removeEventListener('mouseout', that.mouseOutActivableTrigger, false);
                    element[cpt].removeEventListener('mouseover',that.mouseOverClickableTrigger , false);
                }
                //For IE browser
                else if (element[cpt].attachEvent) {
                    element[cpt].detachEvent('onmouseover', that.mouseOverActivableTrigger);
                    element[cpt].detachEvent('onmouseout', that.mouseOutActivableTrigger);
                    element[cpt].detachEvent('onmouseout', that.mouseOverClickableTrigger);
                }
            }
        }
        // clean selectd element if exist
        if(accessibilitytoolbar.remotecontrol.selectedElt !== null) {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
        }
    };

    /**
     * Trigger a click after time out expiration
     * @param {Event} evt : event to be processed
     * @private
     */
    this.mouseOverActivableTrigger = function (evt) {
        var target = evt.target || evt.srcElement;
        var hoverTime = null;
        if (accessibilitytoolbar.remotecontrol) {
            hoverTime = accessibilitytoolbar.remotecontrol.hoverTimer * 1000;
            /* test */
            var hasParentSelected = false;
            var currentElt = target;
            while (accessibilitytoolbar.remotecontrol.selectedElt !== null && currentElt.parentNode !== null) {
                if (currentElt.parentNode == accessibilitytoolbar.remotecontrol.selectedElt)
                    hasParentSelected = true;
                else currentElt = currentElt.parentNode;
            }
            if (!hasParentSelected) {
                if (accessibilitytoolbar.remotecontrol.selectedElt !== null)
                    accessibilitytoolbar.remotecontrol.unselectEltStyle();
                /* fin test */
                accessibilitytoolbar.remotecontrol.selectedElt = target;
                accessibilitytoolbar.remotecontrol.selectEltStyle();
                /* modif du 25/03 */
                if (accessibilitytoolbar.remotecontrol.timerId !== null)
                    clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
                /* fin modif */
                accessibilitytoolbar.remotecontrol.timerId = setTimeout("accessibilitytoolbar.remotecontrol.doClick()", hoverTime);
            } // test
        }
        //DEBUG : part for self working
        else {
            hoverTime = that.hoverTimer * 1000;
            that.selectedElt = target;
            that.selectEltStyle();
            that.timerId = setTimeout("that.doClick()", hoverTime);
        }
    };
    // Trigger function called when the mouse is leaving an item
    /**
     * Clear time out if element is no longer hovered
     * @param {Event} evt : event to be processed
     * @private
     */
    this.mouseOutActivableTrigger = function (evt) {
        if (accessibilitytoolbar.remotecontrol) {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
            accessibilitytoolbar.remotecontrol.selectedElt = null;
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
        }
        //DEBUG : part for self working
        else {
            that.unselectEltStyle();
            clearTimeout(that.timerId);
        }
    }
    /**
     * Register call-back on a given element to trigger a click
     * after a time out.
     * @param {HtmlNode} elt element hovered upon
     * @public
     */
    this.makeLinkClickableOnHover = function (elt) {
        // Trigger function called when the mouse is hovering an item

        //Registering callback to elt
        if (!elt.onmouseover) { /* prevents a blunder if some DHTML is present */

            // For W3C Browser
            if (elt.addEventListener) {
                elt.addEventListener('mouseover', that.mouseOverActivableTrigger, false);
                elt.addEventListener('mouseout', that.mouseOutActivableTrigger, false);
            }
            //For IE browser
            else if (elt.attachEvent) {
                elt.attachEvent('onmouseover', that.mouseOverActivableTrigger);
                elt.attachEvent('onmouseout', that.mouseOutActivableTrigger);
            }
            //For Rusty browser
            else {
                elt.onmouseover = that.mouseOverActivableTrigger;
                elt.onmouseout = that.mouseOutActivableTrigger;
            }
        }
    }

    this.mouseOverClickableTrigger = function (/* Event */ evt) {
        var target = evt.target || evt.srcElement;
        var hoverTime = null;
        if (accessibilitytoolbar.remotecontrol.isActivable(target)) {
            if (accessibilitytoolbar.remotecontrol.selectedElt == null) {
                hoverTime = accessibilitytoolbar.remotecontrol.hoverTimer * 1000;
                accessibilitytoolbar.remotecontrol.selectedElt = target;
                accessibilitytoolbar.remotecontrol.selectEltStyle();
                accessibilitytoolbar.remotecontrol.timerId = setTimeout("accessibilitytoolbar.remotecontrol.doClick()", hoverTime);
            }
            else {
                if (!accessibilitytoolbar.remotecontrol.hasParent(target, accessibilitytoolbar.remotecontrol.selectedElt)) {
                    accessibilitytoolbar.remotecontrol.unselectEltStyle();
                    accessibilitytoolbar.remotecontrol.selectedElt = null;
                    clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
                }
            }
        }
        else {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
            accessibilitytoolbar.remotecontrol.selectedElt = null;
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
        }
    }
    /**
     * Register an event delegation to manage the hovering click function
     * @private
     */
    var registerHoverable = function () {
        /**
         * Trigger a click after time out expiration
         * @param {Event} evt : event to be processed
         * @private
         */

        // For W3C Browser
        if (document.addEventListener) {
            document.addEventListener('mouseover', that.mouseOverClickableTrigger, false);
        }
        //For IE browser
        else if (document.attachEvent) {
            document.attachEvent('onmouseover', that.mouseOverClickableTrigger);
        }
        //For Rusty browser
        else {
            document.onmouseover = mouseOverClickableTrigger;
            document.onmouseout = mouseOutClickableTrigger;
        }
    }

    /**
     * Turns the {HTMLArea} tag of the pad into a scroll control that goes either up or down
     * @private
     */
    var makeScrollControl = function () {
        var elt = null;
        //Trigger function called when mouse is hovering the pad's area
        /**
         * Trigger a scroll after time out expiration
         * @param {Event} evt : event to be processed
         * @private
         */
        var mouseOverScrollTrigger = function (evt) {
            var target = evt.target || evt.srcElement;
            var scrollDir = (target.className.match(/scrollup/)) ? -1 : (target.className.match(/scrolldown/)) ? 1 : 0;
            if (scrollDir !== 0 && accessibilitytoolbar.remotecontrol) {
                var scrollBy = accessibilitytoolbar.remotecontrol.getScrollStep() * scrollDir;
                var timeOut = accessibilitytoolbar.remotecontrol.getTimeOut();
                accessibilitytoolbar.remotecontrol.timerId = setInterval("window.scrollBy(0," + scrollBy + ")", timeOut);
            }
            //DEBUG : part for self working
            else if (scrollDir !== 0) {
                var scrollBy = that.scrollSteps * scrollDir;
                var timeOut = that.scrollTimer;
                that.timerId = setInterval("window.scrollBy(0," + scrollBy + ")", timeOut);
            }
        };
        //Trigger function called when mouse is leaving the pad's area
        /**
         * Clear scroll time out if the pad is no longer hovered
         * @param {Event} evt : event to be processed
         * @private
         */
        var mouseOutScrollTrigger = function (evt) {
            if (accessibilitytoolbar.remotecontrol) {
                clearInterval(accessibilitytoolbar.remotecontrol.timerId);
            }
            //DEBUG : part for self working
            else {
                clearInterval(that.timerId);
            }
        }
        //Registering callback to the pad's area
        for (var i = 0; i < pad.getAreaTag().length; i++) {
            elt = pad.getAreaTag()[i];
            // For W3C Browser
            if (elt.addEventListener) {
                elt.addEventListener('mouseover', mouseOverScrollTrigger, false);
                elt.addEventListener('mouseout', mouseOutScrollTrigger, false);
            }
            //For IE browser
            else if (elt.attachEvent) {
                elt.attachEvent('onmouseover', mouseOverScrollTrigger);
                elt.attachEvent('onmouseout', mouseOutScrollTrigger);
            }
            //For Rusty browser
            else {
                elt.onmouseover = mouseOverScrollTrigger;
                elt.onmouseout = mouseOutScrollTrigger;
            }
            elt.onclick = function () {
                return false;
            }
        }
    }

    // Methodes publiques
    /**
     * Special IE6 positioning routine
     */
    this.setPosition = function () {
        pad.setPosition();
    }

    /**
     * Return the scrolling step of the page
     * @return {int} step the scroll step
     */
    this.getScrollStep = function () {
        return scrollSteps;
    }

    /**
     * Return the timeout for activate link
     * @return {int} timeout the timeout before link activation
     */
    this.getTimeOut = function () {
        return scrollTimer;
    }

    /**
     * Check if the given element is activable
     * @param {HtmlTag} elt the {HTMLNode} to check
     * @return {Boolean} true if the {HTMLNode} is activable, false either
     */
    this.isActivable = function(elt) {
        // Skip specific element (like pad area)
    	nav = accessibilitytoolbar.getNavigateur();
        if((nav.indexOf('MSIE') > 0) && (nav < 'MSIE 8')) {        	
        	className = elt.className;
        } else {
        	className = elt.getAttribute("class");
        }
    	if((className && className.match(/dontclick/)) ) {
            return false;
        } else {
            // Check elligible form element
            if (elt.nodeName.match(new RegExp("^INPUT|BUTTON|TEXTAREA|SELECT|OPTION"))) {
                if(elt.disabled == true || elt.type == "hidden" || (elt.tabIndex && elt.tabIndex<0)) {
                    return false;
                }
                else  {
                    return true;
                }
            }
            // Check label with associated form element
            else if(elt.nodeName.match(/^LABEL$/i) && elt.htmlFor !== null && document.getElementById(elt.htmlFor) !== null) {
                return true;
            }
            // Check regular activable element
            else if(elt.nodeName.match(new RegExp("^A|AREA"))) {
                return true;
            }
            // Check element with event specified
            /*else if(elt.nodeName.match(/^SPAN|IMG$/i) && elt.parentNode && that.isActivable(elt.parentNode)) {
                return true;
            } */
            else {
                return false;
            }
        }
    }

    /**
     * Check if the element has the specified parent element into his hierarchy
     * @param {HtmlTag} elt the element to check
     * @param {HtmlTag} parent the parent to look for
     * @return {Boolean} true if the element is a descendant of parent.
     */
    this.hasParent = function (elt, parent) {
        if (elt !== null) {
            if (elt.parentNode !== null) {
                if (elt.parentNode == parent)
                    return true;
                else return that.hasParent(elt.parentNode, parent);
            }
            else return false;
        }
        else return false;
    }

    /**
     * Swap the style apply to the current hovered element
     */
    this.toggleSelectedEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt) {
            // If the selected element is a form element, check if it has an associated label
            if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
                var labels = document.getElementsByTagName("label");
                for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                    if (labels[cptLab].htmlFor == that.selectedElt.id)
                        associatedLabel = labels[cptLab];
                }
            }
            // If current element has the hovered style applyed, remove it
            if (that.selectedElt.className.match(/remotecontrol-selected/)) {
                that.selectedElt.className = that.selectedElt.className.replace(/ {0,1}remotecontrol-selected/, "");
                if (associatedLabel !== null)
                    associatedLabel.className = associatedLabel.className.replace(/ {0,1}remotecontrol-selected/, "");
                // Else, apply it
            } else {
                that.selectedElt.className = that.selectedElt.className + " remotecontrol-selected";
                if (associatedLabel !== null)
                    associatedLabel.className = associatedLabel.className + " remotecontrol-selected";
            }
        }
    }

    /**
     * Apply selected style on element
     */
    this.selectEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
            var labels = document.getElementsByTagName("label");
            for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                if (labels[cptLab].htmlFor == that.selectedElt.id)
                    associatedLabel = labels[cptLab];
            }
        }
        if (!that.selectedElt.className.match(/^remotecontrol-selected$/i)) {
            that.selectedElt.className = that.selectedElt.className + " remotecontrol-selected";
        }
        if (associatedLabel !== null)
            if (!associatedLabel.className.match(/^remotecontrol-selected$/i))
                associatedLabel.className = associatedLabel.className + " remotecontrol-selected";
    }
    /**
     * Remove selected style on element
     */
    this.unselectEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt) {
            if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
                var labels = document.getElementsByTagName("label");
                for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                    if (labels[cptLab].htmlFor == that.selectedElt.id)
                        associatedLabel = labels[cptLab];
                }
            }
            // If current element has the hovered style applyed, remove it
            that.selectedElt.className = that.selectedElt.className.replace(/ {0,1}remotecontrol-selected/gi, "");
            if (associatedLabel !== null)
                associatedLabel.className = associatedLabel.className.replace(/ {0,1}remotecontrol-selected/gi, "");
        }
    }
    /**
     * Simulate a user click on the selected element
     */
    this.doClick = function () {
        if (that.selectedElt !== null) {
            // go to parent while elt is not activable
            while(!accessibilitytoolbar.remotecontrol.isActivable(that.selectedElt))
            {
                that.selectedElt = that.selectedElt.parentNode;
            }
            // Case of a link ... we do a simple redirection
            if (that.selectedElt.nodeName.match(/^A|AREA$/i) && that.selectedElt.href && that.selectedElt.href !== "" && !that.selectedElt.href.match(new RegExp("#$"))) {
                window.location = that.selectedElt.href;
            }
             else if ((that.selectedElt.nodeName.match(/^SELECT|TEXTAREA$/i)) ||
                ((that.selectedElt.nodeName.match(/^INPUT$/i)) &&
                    ((that.selectedElt.type) &&
                        (that.selectedElt.type == "text" || that.selectedElt.type == "password")) )) {
                that.selectedElt.focus();
            }
            // Case of a form item ... we do a simple click 
            else if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|OPTION$/i)) {
                that.selectedElt.click();
            }
            // Case of a form label ... we click the associated form item
            else if (that.selectedElt.nodeName.match(/^LABEL$/i)) {
                document.getElementById(that.selectedElt.htmlFor).click();
            }
            else if (that.selectedElt.nodeName.match(/^SPAN|IMG$/i) && that.selectedElt.parentNode && that.isActivable(that.selectedElt.parentNode)) {
                var elt = that.selectedElt;
                that.selectedElt = that.selectedElt.parentNode;
                that.doClick();
                that.selectedElt = elt;
            }
            // Case of an activable onclick item ... we just launch the function
            else if (that.selectedElt.onclick && that.selectedElt.onclick !== null) {
                that.selectedElt.onclick();
            }
            // By default, simulate a click
            else {
                var fakeClick = null;
                /* Case of W3C Compliant Browser */
                if (document.createEvent) {
                    fakeClick = document.createEvent("MouseEvent");
                    fakeClick.initMouseEvent(
                        "click"
                        , true
                        , true
                        , window
                        , 0
                        , /*event.screenX*/0
                        , /*event.screenY*/0
                        , /*event.clientX*/0
                        , /*event.clientY*/0
                        , /*event.ctrlKey*/false
                        , /*event.altKey*/false
                        , /*event.shiftKey*/false
                        , /*event.metaKey*/false
                        , 0
                        , null);
                    that.selectedElt.dispatchEvent(fakeClick);
                } else {
                    /* Case of IE */
                    if (document.createEventObject) {
                        fakeClick = document.createEventObject();
                        fakeClick.button = 1;
                        that.selectedElt.fireEvent("onclick", fakeClick);
                    }
                }
            }
        }
    }

    /**
     * Initialize the remotecontrol object on demand
     */
    this.init = function () {
        pad = new RemoteControlPad();

        /* dealing with IE6's inability to do position:fixed */
        var v = navigator.appVersion;
        if (navigator.appName.match(/Internet Explorer/)) {
            if (parseInt(v.substring(v.indexOf("MSIE") + 5)) > 0 && parseInt(v.substring(v.indexOf("MSIE") + 5)) <= 6) {
                setInterval("accessibilitytoolbar.remotecontrol.setPosition()", repositionTimer);
            }
        }
        makeScrollControl();
        makeLinksHoverable();
    };

    // Constructeur
    this.init();
}
/**
 * Remote control used in remote control mode to allow user
 * to scroll the page
 * @class Graphical scroll remote control
 */
function RemoteControlPad() {
    // Privates attributes 
    /**
     * Remote control pad image
     * @private
     */
    var imgSrc = imagesPath['arrows'] + "?v=1";
    /**
     * Remote control pad image width
     * @private
     */
    var imgWidth = 73;
    /**
     * Remote control pad image height
     * @private
     */
    var imgHeight = 132;
    /**
     * Remote control pad image distance form screen border
     * @private
     */
    var imgFromBorder = 20;
    /**
     * Reference to {HTMLDiv} tag used to render the remote control pad
     * @private
     */
    var pad = null;
    /**
     * Local reference to this object
     * @private
     */
    var that = this;


    // Privates Methods
    /**
     * Initialisation of the remote control pad (creation of the html structure)
     * @private
     */
    var init = function () {
        createRemoteHTML();
    };

    /**
     * Create the remote and append it to the document
     * @private
     */
    var createRemoteHTML = function () {
        pad = document.createElement("div");
        pad.id = "remotecontrol";
        /* rect: left-x, top-y, right-x, bottom-y. */
        pad.innerHTML = "<map name='remotemap'>"
            + "<area href='#' class='dontclick scrollup' shape='rect' coords='0,0," + imgWidth + "," + (imgHeight / 2) + "' alt='" + accessibilitytoolbar.get("remotepad_scrollup") + "' />"
            + "<area href='#' class='dontclick scrolldown' shape='rect' coords='0," + (imgHeight / 2) + "," + (imgHeight / 2) + "," + imgHeight + "' alt='" + accessibilitytoolbar.get("remotepad_scrolldown") + "' />"
            + "</map>";
        var i = document.createElement("img");
        i.src = imgSrc;
        i.width = imgWidth;
        i.height = imgHeight;
        i.useMap = "#remotemap";
        pad.appendChild(i);
        document.getElementsByTagName("body")[0].appendChild(pad);
    };

    // Publics methods
    /**
     * Special IE6 positioning routine
     */
    this.setPosition = function () {
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        var st = document.documentElement.scrollTop;
        var sl = document.documentElement.scrollLeft;
        pad.style.pixelTop = st + h - imgFromBorder - imgHeight;
        pad.style.pixelLeft = sl + w - imgFromBorder - imgWidth;
    }

    /**
     * Define the pad image source location
     * @param {String} location, the URL of the image
     */
    this.setImgSrc = function (location) {
        pad.childNodes[1].setAttribute("src", location);
    }

    /**
     * Get the collection of {HTMLArea} tag used by the pad
     * @return {Array} nodes, the {HTMLArea} tag collection
     */
    this.getAreaTag = function () {
        return pad.childNodes[0].childNodes;
    }

    // Constructeur
    init();
}

document.confortdelecture = true;
/**
 * Method to check if toolbar is launched.
 * @return {Boolean} true when the accessbilitytoolbar is launched.
 */
function hasConfortdelecture() {
    return true;
}
/**
 * @class Entry point for the accessibility tool-bar
 */
accessibilitytoolbar = {
    
	/**
     * {bool}
     */
    isModern: true,

	/**
     * {object}
     */
    uncompatibility: {
        /**************************************Tableau des nom des navigateurs*****************************
         ie X => MSIE X (exemple MSIE 7.0)
         Firefox X => Firefox v (ex Firefox 31.0)
        ***************************************************************************************************/
        a11yDyslexyFontEnabled: ['MSIE 7.0','MSIE 8.0']
    },
        
    /**
     * {ToolbarStrings} String localization Manager
     */
    strings: new ToolbarStrings(),
    
    /**
     * {Array} of all possible values for the content to skip to
     */
    contentToLookFor: ["contenu", "content"],

    /**
     * {string} css class containt Link
     */
    cssLinkModeClassName: null,

    /**
     * {string} id of skipLink
     */
    idSkipLinkIdLinkMode: null,

    /**
     * {string} skiplink of application
     */
    skipLinkCreate: null,

    /**
     * {string} class of skiLink
     */
    cssSkipLinkClassName : "cdu_hide",

    /**
     * {boolean} using skip link or not
     */
    skipLink : false,
    /**
     * {String} Id contain the link of using confort
     */
    idLinkModeContainer : null,

    /**
     * Value to jump to
     */
    contentToJumpTo: null,
    /**
     * Cookie error message
     */
    secCookie: null,
    /**
     * User preference manager
     */
    userPref: null,
    /**
     * Flag to check if user has change is preference
     */
    hasDoneSettings: false,

    /**
     * {LoopingMode} Looping mode Manager
     */

    loopingmode: null,
    /**
     * {storedValue} cookie value received or not
     */
    storedValue: false,

    /**
     * {RemoteControlMode} Remote control Manager
     */
    remotecontrol: null,

    /**
     * Reference the ruler
     */
    toolbarRuler : false,

    /**
     * array of css stylesheets removed
     */
    savesStylesheets : [],

    /**
     * array of elements where style attribute have been removed
     */
    savStyleElmtAtt : [],

    /**
     * array of style value indexed ontot the same key as elements removed
     */
    savStyleAttElmt : [],


    // when the user change the lang of the interface, wee need to reload after save is done
    needToReload : false,
    
    // addevent input params : 
    // 1- for addeventlistenername
    // 2- for attacheventlistener
    // 3- the object
    // 4- the callback function to call when event occurs
    uciAttachEvent: function(wichAdd,wichAttach,obj,callBack) {
        if(obj)
        {
        if(obj.addEventListener){
            obj.addEventListener(wichAdd, callBack, false);
        }else if (obj.attachEvent){
            obj.attachEvent(wichAttach, callBack);
        }else{
            obj.onclick = callBack;
        }
        }
    },

    //
    uci_MenuButtonEvent: function(e){
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        //On récupere le parent de l'élément
        var target_enfant = target;
        var className = target.className;
        if((typeof className === "string" && className.indexOf('cdu-icon') > -1) ) {     
         
        	target=target.parentNode;
        }
        // case of path svg
        if(typeof className === 'object' && 'baseVal' in className) {              
        	target=target.parentNode.parentNode;                
        }        
        target=target.parentNode;
        var tagId = target.id;
        var etat = target.getAttribute('aria-selected');
        if(e.type == 'click' && etat == 'false')
        {
            accessibilitytoolbar.uci_OuvrirMenuOnglet(target);
        }
        else if(e.type == 'keydown')
        {
            // Touche Entré
            if(e.keyCode == '13' && etat == 'false')
            {
                accessibilitytoolbar.uci_OuvrirMenuOnglet(target);
            }
            // Touches haut ou bas
            else if(e.keyCode == '38 ' || e.keyCode == '37')
            {
                // accede à l'onglet pr�c�dent, soit il existe, soit on revient au dernier �l�ment
                accessibilitytoolbar.uci_OuvrirMenuOnglet(accessibilitytoolbar.previousElementSibling(target_enfant) || target.children[(target.children.length-1)]);
                accessibilitytoolbar.stopEvt(e);
            }
            // Touches bas ou droite
            else if(e.keyCode == '40' || e.keyCode == '39')
            {
                // accede à l'onglet suivant, soit il existe, soit on revient au premier �l�ment
                accessibilitytoolbar.uci_OuvrirMenuOnglet(accessibilitytoolbar.nextElementSibling(target_enfant) || target.children[0]);

                // on stoppe la propagation de l'�v�nement
                accessibilitytoolbar.stopEvt(e);
            }
        }
    },
    previousElementSibling : function( el ) {
        if( el.previousElementSibling ) {
            return el.previousElementSibling;
        } else {
            while( el = el.previousSibling ) {
                if( el.nodeType === 1 ) return el;
            }
        }
    },
    nextElementSibling : function( el ) {
        if( el.nextElementSibling ) {
            return el.nextElementSibling;
        } else {
            while( el = el.nextSibling ) {
                if( el.nodeType === 1 ) return el;
            }
        }
    },
    // callback of event on radiobuttons
    uciRadioButtonEvent: function(e) {
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        // on boucle jusqu'� remonter sur un li si l'event est envoy� depuis un sous �l�ment
        var tagId = target.id;
        var targetEnfant = target;
        while(tagId==='')
        {
            target=target.parentNode;
            tagId = target.id;
        }
        var etat = target.getAttribute('aria-checked');
        if(document.getElementById('uci_activateOnglet').style.display !== 'block' || tagId.match(/uci_quick/g) == null){
        // check if clicked
            if(e.type == 'click')
            {
                accessibilitytoolbar.uciCocherRadioButton(target);
            }
            else if(e.type == 'keydown')
            {
                // Touche Espace
                if(e.keyCode == '32')
                {
                    accessibilitytoolbar.uciCocherRadioButton(target);
                }
                // Touches haut ou gauche
                else if(e.keyCode == '38' || e.keyCode == '37')
                {
                    // coche le bouton pr�c�dent, soit il existe, soit on revient au dernier �l�ment
                    accessibilitytoolbar.uciCocherRadioButton(accessibilitytoolbar.previousElementSibling(target) || target.parentNode.children[(target.parentNode.children.length-1)]);

                    accessibilitytoolbar.stopEvt(e);
                }
                // Touches bas ou droite
                else if(e.keyCode == '40' || e.keyCode == '39')
                {
                    // coche le bouton suivant, soit il existe, soit on revient au premier �l�ment
                    accessibilitytoolbar.uciCocherRadioButton(accessibilitytoolbar.nextElementSibling(target) || target.parentNode.children[0]);

                    // on stoppe la propagation de l'�v�nement
                    //IE9 & Other Browsers
                    accessibilitytoolbar.stopEvt(e);
                }
            }
        }
    },
    uciCocherRadioButton: function(elmt) {
        // on active le bouton en question
        elmt.setAttribute('aria-checked','true');
        elmt.tabIndex='0';
        //var bIsColorPalette = false;
        var clearColor = "";
        // remove selected class if present
        elmt.className = elmt.className.replace(/ uci_couleur_li_selected{0,1}/,"");
        elmt.className = elmt.className.replace(/ uci_choix_selected{0,1}/,"");
        // add the selected class
        elmt.className = elmt.className.replace(/uci_couleur_li{0,1}/,"uci_couleur_li uci_couleur_li_selected");
        elmt.className = elmt.className.replace(/uci_choix{0,1}/,"uci_choix uci_choix_selected");
        if(elmt.id.match(/a11yBigger/g) || elmt.id.match(/a11yVisualPredefined/g)){
            if(document.getElementById('uci_activateOnglet').style.display == 'block' && elmt.id.match(/uci_a11y/gi) !=null){
                var element = /^uci_(\S+)$/.exec(elmt.id);
                // on vérifie que son copain existe dans les réglages rapides
                if(document.getElementById('uci_quick_'+ element[1]))
                {
                    accessibilitytoolbar.uciCocherRadioButton (document.getElementById('uci_quick_'+ element[1]));
                    elmt.focus();
                }
            }else if(document.getElementById('uci_activateOnglet').style.display == 'none' && elmt.id.match(/uci_quick/gi) !=null){
                var element = /^uci_quick_(\S+)$/.exec(elmt.id);
                accessibilitytoolbar.uciCocherRadioButton (document.getElementById('uci_'+ element[1]));
                elmt.focus();
            }
        } else {
            elmt.focus();
        }

        // on d�sactive ses fr�res
        var reponses = elmt.parentNode;
        var iterator;
        for(iterator = 0; iterator<reponses.children.length;iterator++) {
            // on r�cup�re un fils
            if(reponses.children[iterator]!=elmt)
            {
                reponses.children[iterator].setAttribute('aria-checked','false');
                reponses.children[iterator].tabIndex='-1';
                
                // remove selected class if present
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ uci_couleur_li_selected{0,1}/,"");
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ uci_choix_selected{0,1}/,"");
            }
            // use the value of iterator to change the cookie value
            else
            {
                // Here iterator is equal to the index of the radio option 0 first option selected , 1 the second one etc..
                // so from here set the stackv3[myoption]='myvalue-'+iterator;
                // The other option is to define an id wich contains the key and value like id="uciOptions_a11yBigger_keepit"
                var resArray=elmt.id.split('_');
                // key, value
                // make switch case on prefname
                prefName=resArray[resArray.length-2];
                value= resArray[resArray.length-1];
                if (prefName === 'a11yRegleColor'){
                    document.getElementById('uci_regle_couleur_lien').style.backgroundColor = value;
                    if(document.getElementById('uci_regle_couleur_lien').style.setProperty)
                        document.getElementById('uci_regle_couleur_lien').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienSelColor'){
                    document.getElementById('uci_NavLienSel').style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').style.setProperty)
                        document.getElementById('uci_NavLienSel').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienNonVisColor'){
                    document.getElementById('uci_NavLienNonVis').style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').style.setProperty)
                        document.getElementById('uci_NavLienNonVis').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienVisColor'){
                    document.getElementById('uci_NavLienVis').style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').style.setProperty)
                        document.getElementById('uci_NavLienVis').style.setProperty ("background-color", value, "important");
                }
                accessibilitytoolbar.userPref.set(prefName,value);
                // if the user change the font or background color without activating the option, then activate it
                if((accessibilitytoolbar.userPref.get('a11yVisualSettings') !=='personnal') && (resArray[resArray.length-2] === 'a11yFontColor' || resArray[resArray.length-2] === 'a11yBackgroundColor')){
                    accessibilitytoolbar.userPref.set('a11yVisualSettings','personnal');
                    document.getElementById('uci_couleur_personnalisees_input').checked='checked';
                    document.getElementById('uci_couleur_predefenie_input').removeAttribute('checked');
                } else{ if(accessibilitytoolbar.userPref.get('a11yVisualSettings') ==='personnal' && resArray[resArray.length-2] === 'a11yVisualPredefinedSettings'){
                            accessibilitytoolbar.userPref.set('a11yVisualSettings','predefined');
                            document.getElementById('uci_couleur_predefenie_input').checked='checked';
                            document.getElementById('uci_couleur_personnalisees_input').removeAttribute('checked');
                        }
                    }
            }
        }
        if(document.getElementById('uci_validation').className==='cdu_n'){
            document.getElementById('uci_validation').className="";
        }
        document.getElementById('uci_zone_form').style.display="block";
        if(accessibilitytoolbar.userPref.get("a11yApercuAuto")!=="off"){
            accessibilitytoolbar.setCSS();

            // jump to content if needed
            accessibilitytoolbar.jumpToContent();
        }
    },

    uci_OuvrirMenuOnglet: function(elmt){
        elmt.setAttribute('aria-selected','true');
        elmt.tabIndex='0';
        elmt.parentNode.tabIndex='0';
        var spanId = /^uci_contenu_(\S+)$/.exec(elmt.getAttribute('aria-controls'));
        document.getElementById(spanId[1]).className='onglet_1 onglet';
        document.getElementById(elmt.getAttribute('aria-controls')).style.display="block";
        elmt.focus();
        // on d�sactive ses fr�res
        var reponses = elmt.parentNode;
        var iterator = 0;
        for(iterator = 0; iterator<reponses.children.length;iterator++) {
            // on r�cup�re un fils
            if(reponses.children[iterator]!=elmt)
            {
                reponses.children[iterator].setAttribute('aria-selected','false');
                reponses.children[iterator].tabIndex='-1';
                reponses.children[iterator].parentNode.tabIndex='-1';
                var spanIdOther = /^uci_contenu_(\S+)$/.exec(reponses.children[iterator].getAttribute('aria-controls'));
                document.getElementById(spanIdOther[1]).className='onglet_0 onglet';
                document.getElementById(reponses.children[iterator].getAttribute('aria-controls')).style.display="none";
            }
        }
    },

    uci_aria_radio_simulation: function(uciIdListe){
        // Gestion des boutons radio simul�s en ARIA
        var reponses = document.getElementById(uciIdListe);
        if(reponses){
            var iterator = 0;
            var children;
            // parcours de tous les enfants de la liste
            for(iterator = 0; iterator<reponses.children.length;iterator++) {
                // on r�cup�re un fils
                children = reponses.children[iterator];
                accessibilitytoolbar.uciAttachEvent('click','onclick',children,accessibilitytoolbar.uciRadioButtonEvent);
                accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',children,accessibilitytoolbar.uciRadioButtonEvent);
            }
        }
    },

    uci_aria_menu_simulation: function(uciIdListe){
        // Gestion du systeme d'onglet simulé en ARIA
        var reponses = document.getElementById(uciIdListe);
        if(reponses){
            var iterator = 0;
            var children;
            // parcours de tous les enfants de la liste
            for(iterator = 0; iterator<reponses.children.length;iterator++) {
                // on r�cup�re un fils
                children = reponses.children[iterator];
                accessibilitytoolbar.uciAttachEvent('click','onclick',children,accessibilitytoolbar.uci_MenuButtonEvent);
                accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',children,accessibilitytoolbar.uci_MenuButtonEvent);
            }
        }
    },

    /**
     * Get the localized string associated to the specified reference
     * in the correct language
     * @param {String} string the text reference
     * @return {String} the text in the right language
     */
    get: function (str) {
        return this.strings.get(str);
    },

    /**
     * Retourne si le navigateur est compatible ou pas
     * @param {string}
     * @return {bool}
     * @function
     */
    getCompatible: function(toolsToolbar){
        var testNavigateur = this.getNavigateur();
        if(this.uncompatibility[toolsToolbar]){
            for (var i = 0; i< this.uncompatibility[toolsToolbar].length; i++){
                if (this.uncompatibility[toolsToolbar][i] == testNavigateur) {
                    return false;
                }
            }
        }
        return true;
    },

    getNavigateur : function(){
        var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/([\.\d]+)/i))!== null) M[2]= tem[1];
        return M.join(' ');
    },

    /**
     * Add the right CSS link to the head for our tool-bar
     */
    createToolbarCSSLink: function () {
        var l = document.createElement('LINK');
        l.rel = "stylesheet";
        l.type = "text/css";
        l.href = uci_classic_toolbar_css;
        l.id = "a11yCSS";
        this.head.appendChild(l);
    },

    /**
     *
     */
    toolbarCDUContent: function (){   
        var str = "";
        if(accessibilitytoolbar.idLinkModeContainer){
            str = accessibilitytoolbar.toolbarCreateLink();
        }else{
            str = accessibilitytoolbar.toolbarCreateButton();
        }
        return str;
    },

    /**
     * Generates the accessibility too-bar with a button
     *
     */
    toolbarCreateButton: function () {
        var str="";
            str += "<div id='cdu_zone'>";
            if(accessibilitytoolbar.userPref.get('a11yToolbarEnable')=='on'){
                str += "<p id='cdu_close' style='display:none'><button title=\"";
            }else{
                str += "<p id='cdu_close' style='display:block'><button title=\"";
            }

            str +=this.get('uci_alt_logo');
            str += "\">";
            str += this.get('uci_serv_name');
            str += "<span>+</span></button></p>";
            str += "<div id='cdu_content' class='cdu_displayN' >";
            str += accessibilitytoolbar.createToolbar();
        return str;
    },

    /**
     * Generates the accessibility too-bar with a link
     *
     */
    toolbarCreateLink: function () {
        var str="";
        var style = ".cdu_hide {display:none} #cdu_close {display:none}";
        var newStyle = document.createElement("style");
        newStyle.setAttribute("type", "text/css");
        if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
            newStyle.styleSheet.cssText = style;
        }else { // standards-oriented browsers
            newStyle.appendChild(document.createTextNode(style));
        }
        var _head = document.getElementsByTagName('head')[0];
        // newStyle
        _head.insertBefore(newStyle, _head.firstChild);


        //initialisation str for using into createToolbar function
        //search link container
        this.node = document.getElementById(accessibilitytoolbar.idLinkModeContainer);
        //create link with attribute
        this.lien = document.createElement("a");
        this.lien.innerHTML =  this.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        if(accessibilitytoolbar.cssLinkModeClassName){
            this.lien.className=accessibilitytoolbar.cssLinkModeClassName;
        }
        this.lien.setAttribute("id" ,'uci_link');
        this.lien.setAttribute("title", this.get('uci_alt_logo'));
        this.lien.setAttribute("href", "#");
        this.node.appendChild(this.lien);

        //create skipLink for accessibility
        //search link container
        var skipLinkCreate = document.createElement("a");
        skipLinkCreate.innerHTML = this.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        skipLinkCreate.className=accessibilitytoolbar.cssSkipLinkClassName;
        skipLinkCreate.setAttribute("id" ,'idCduSkip');
        skipLinkCreate.setAttribute("title",  this.get('uci_alt_logo'));
        skipLinkCreate.setAttribute("href", "#");
        if(accessibilitytoolbar.idLinkModeContainer){
            if(accessibilitytoolbar.idSkipLinkIdLinkMode){
                this.node = document.getElementById(accessibilitytoolbar.idSkipLinkIdLinkMode);
                this.node.appendChild(skipLinkCreate);
            }else{
                this.body.insertBefore(skipLinkCreate, this.body.firstChild);
            }
        }
        //create cdu_content zone
        str += "<div id='cdu_zone'>";

        //create content of CDU
        str += "<div id='cdu_content' class='cdu_displayN' >";
        str += accessibilitytoolbar.createToolbar();
        str += "</div>";
        return str;

    },

    /**
     * Generates the accessibility tool-bar per se
     */
    createToolbar: function () {
        var str = '';
        
        str += "<form onsubmit='return false;' onreset='return false;' name='uci_form' action='#' id='uci_form'>";
        if (accessibilitytoolbar.secCookie !== null) {
            str += "<p id='cdu_secu'>";
            str += "<span class='cdu_hide'>";
            str += this.get('uci_securityCookieChangeAlert');
            str += "</span>";
            str += this.get("uci_securityCookieChange");
            str += "&nbsp;<a href=\""+helpPath[accessibilitytoolbar.strings.getLocale()]+"#_Gestion_des_cookies\">" + this.get("uci_securityCookieChangeLinkPage") + "</a>";
            str += "</p>";
        }else {
            str += UciIhm.InitUciIHM();
        }
        str += "</form>";

        return str;
    },

    /**
     * Add object to objectList for toolbar events
     */
    createObjectBehaviour: function (){
        //declarate my object list in array
        var myObject=[];
        myObject.push(document.getElementById("cdu_jump_link"));
        if(accessibilitytoolbar.idLinkModeContainer){
            myObject.push(document.getElementById("uci_link"));
            myObject.push(document.getElementById("closeLink"));
            myObject.push(document.getElementById("idCduSkip"));
        }
        if(document.getElementById("cdu_close"))
        {
            myObject.push(document.getElementById("cdu_close").getElementsByTagName("button")[0]);
        }
        accessibilitytoolbar.eventToolbar(myObject);

        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_bigger');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_bigger_quick_set');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpredefinie_quick_set');

        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_wordspacing');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_charspacing');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_linespacement');
        if(this.getCompatible('a11yDyslexyFontEnabled'))
        {
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_fontfamily');
        }
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_changecasse');
        if(this.getCompatible('a11yRegleEnabled'))
        {
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_epaisseurregle');
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_regle');
        }
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpredefinie');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpolice');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurbackground');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_visite');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_notsel');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_sel');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_DelayBeforeLoop');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_a11yMenuPositionning');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_DelayBeforeLoop_auto');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_a11yQuickMode');

        //gestion des evenement sur les onglets :
        accessibilitytoolbar.uci_aria_menu_simulation('uci_onglet_confort');
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_moreconfort'),UciIhm.more_confort);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_menu_activer_menu'),UciIhm.ToolbarHide);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_fermeture_more_comfort'),UciIhm.hide_more_confort);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_menu_remove_all'),UciIhm.remove_all);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_activer_menu'),UciIhm.uci_activate_menu);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_fermeture_cdu_menu'), UciIhm.uci_activate_menu);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_fr'), function() {return UciIhm.changement_langue('fr');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_en'), function() {return UciIhm.changement_langue('en');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_sp'), function() {return UciIhm.changement_langue('es');});
        accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form'), UciValidation.Validation);
        accessibilitytoolbar.uciAttachEvent('reset','onreset',document.getElementById('uci_form'), UciValidation.Annulation);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci-onoffswitch'), UciIhm.desactiveCDUForWebSite);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_chekbox_dyslexy_font'), function() {return UciTypographie.displayFieldset('uci_fieldset_fontfamily');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_chekbox_casse'), function() {return UciTypographie.displayFieldset('uci_fieldset_changecasse');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_fontfamily'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_fontfamily');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_fontfamily'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_typo_help_fontfamily');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_changecase'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_changecase');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_changecase'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_typo_help_changecase');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_jumptocontent'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_jumptocontent');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_jumptocontent'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_jumptocontent');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_listmode'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_listmode');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_listmode'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_listmode');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_links'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_links');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_links'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_links');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_regle'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_regle');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_regle'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_regle');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_disabletransp'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_disabletransp');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_disabletransp'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_disabletransp');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_disablepppictures'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_disablepppictures');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_disablepppictures'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_disablepppictures');}); 
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('a11yMotorModeEnabled'), UciAideMotrice.activate_aide_motrice);
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('apparence_lien'), function() {UciApparence.displayLien('apparence_lien','uci_gestion_lien');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_check_regle'), function() {UciApparence.displayLien('uci_check_regle','uci_div_regle');});    

        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_sel'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_selectionne");});    
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_notsel'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_notselectionne");});  
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_visite'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_visite");});  
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_regle'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_regle");}); 

    },
    /**
     * Function event implementation
     * Create an object list with
     */

    eventToolbar: function(myObject){
        var i=0,theFrames,theFrame;
        while( i < myObject.length){
            if(myObject[i]){
                accessibilitytoolbar.uciAttachEvent('click','onclick',myObject[i],accessibilitytoolbar.toggle);
            }
            i++;
        }
        i = 0;        
        theFrames=document.getElementsByTagName('iframe');
        if(theFrames.length>0)
        {
            while(theFrame = theFrames[i]){
                try{                        
                    theFrameDocument = theFrame.document || theFrame.contentDocument;               
                    // attach event to frame onload to reload the css...
                     accessibilitytoolbar.uciAttachEvent('load','onload',theFrame,accessibilitytoolbar.setCSS);
                } catch(e){}
                i++;
            }
        }
        i = 0;        
        theFrames=document.getElementsByTagName('frame');
        if(theFrames.length>0)
        {
            while(theFrame = theFrames[i]){
                try{                        
                    theFrameDocument = theFrame.document || theFrame.contentDocument;               
                    // attach event to frame onload to reload the css...
                     accessibilitytoolbar.uciAttachEvent('load','onload',theFrame,accessibilitytoolbar.setCSS);
                } catch(e){}
                i++;
            }
        }
        

        if (accessibilitytoolbar.secCookie === null) {
            var actionButtons = document.getElementById("cdu_content").getElementsByTagName("input");
            var selectButtons = document.getElementById("cdu_content").getElementsByTagName("select");
        
            // User settings behaviour
            var toolbar = document.getElementById("cdu_content");
            for (var i = 0; i < actionButtons.length; i++) {
                if(actionButtons[i].type && actionButtons[i].type!=='submit' && actionButtons[i].type!=='reset'
                && !(actionButtons[i].id && (actionButtons[i].id==='uci_fr' || actionButtons[i].id==='uci_en' || actionButtons[i].id==='uci_sp' )) && !actionButtons[i].disabled)
                    accessibilitytoolbar.uciAttachEvent('click','onclick',actionButtons[i],accessibilitytoolbar.setPref);
            }
            for (i = 0; i < selectButtons.length; i++) {
                accessibilitytoolbar.uciAttachEvent('change','onchange',selectButtons[i],accessibilitytoolbar.setPref);
            }

            accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienSel'),accessibilitytoolbar.displayOrNot);
            accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienNonVis'),accessibilitytoolbar.displayOrNot);
            accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienVis'),accessibilitytoolbar.displayOrNot);
            accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_regle_couleur_lien'),accessibilitytoolbar.displayOrNot);

            var liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_sel").getElementsByTagName("li");
            for (i=0; i < liButtonsPalette.length; i++){
               accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
               accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
            }

            liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_notsel").getElementsByTagName("li");
            for (i=0; i < liButtonsPalette.length; i++){
               accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
               accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
            }
            liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_visite").getElementsByTagName("li");
            for (i=0; i < liButtonsPalette.length; i++){
               accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
               accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
            }
            liButtonsPalette = document.getElementById("uci_reponses_couleur_regle").getElementsByTagName("li");
            for (i=0; i < liButtonsPalette.length; i++){
               accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
               accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
            }
        }
    },

    /**
     * Gestion des ouvertures d element en display= none
     */
    displayOrNot : function (e) {
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        //On récupere le parent de l'élément
        tagId = target.id;
        var idCible;
        var idEnfant;
        switch(tagId) {
            case 'uci_NavLienSel':
                idCible = "uci_palette_couleur_lien_selectionne";
                idEnfant = document.getElementById('uci_a11yNavLienSelColor_'+accessibilitytoolbar.userPref.get("a11yNavLienSelColor"));
                break;
            case 'uci_NavLienNonVis':
                idCible = "uci_palette_couleur_lien_notselectionne";
                idEnfant = document.getElementById('uci_a11yNavLienNonVisColor_'+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor"));
                break;
            case 'uci_NavLienVis':
                idCible = "uci_palette_couleur_lien_visite";
                idEnfant = document.getElementById('uci_a11yNavLienVisColor_'+accessibilitytoolbar.userPref.get("a11yNavLienVisColor"));
                break;
            case 'uci_regle_couleur_lien':
                idCible = "uci_palette_couleur_regle";
                idEnfant = document.getElementById('uci_a11yRegleColor_'+accessibilitytoolbar.userPref.get("a11yRegleColor"));
                break;
        }
        if(document.getElementById(idCible)!== null) {
            if (document.getElementById(idCible).style.display === "none") {
                document.getElementById(idCible).style.display = "block";
                idEnfant.focus();
            }else {
                document.getElementById(idCible).style.display = "none";
            }
        }
        accessibilitytoolbar.stopEvt(e);
    },

    /**
     * Couleur div hide
     */
    HidePaletColor: function (e){
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        setTimeout(function(){accessibilitytoolbar.HideColorPalettePret(target)},5);
    },

    HideColorPalettePret: function(target){
       // var element = /^uci_a11yNavLienSelColor(\S+)$/.exec(document.activeElement.id);
        if(document.activeElement.parentNode.id !== target.parentNode.id){
            if(document.getElementById('uci_palette_couleur_lien_selectionne').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_selectionne').style.display = "none";
            }else if (document.getElementById('uci_palette_couleur_lien_notselectionne').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_notselectionne').style.display = "none";
            }else if(document.getElementById('uci_palette_couleur_lien_visite').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_visite').style.display = "none";
            }else {
                document.getElementById('uci_palette_couleur_regle').style.display = "none";
            }
        }
    },

    /**
     * If user has change his preference, save the change
     * @see {ToolbarData}
     */
    saveUserPref: function () {
        if (this.hasDoneSettings) {
            this.hasDoneSettings = false;
            this.userPref.updateUserPref();
        }
    },

    /*
     * next 2 functions control behaviour for the graphic toolbar :
     * - show
     * - hide
     */

    /**
     * Toggle the display of the toolbar. If its shown then it will be
     * hided and if its hide, then it will be shown
     * @param {Event} e Event to be processed.
     */
    toggle: function (/*Event*/e) {
        var toolbarContent = document.getElementById("cdu_content");

        if (toolbarContent.className.match(/cdu_displayN/)) {
            if(document.getElementById('cdu_close'))
            {
                document.getElementById('cdu_close').style.display = "none";
            }
            accessibilitytoolbar.show();
        } else {
            accessibilitytoolbar.hide();
        }
        accessibilitytoolbar.stopEvt(e);
    },
    /**
     * Show the graphic tool-bar
     */
    show: function (e) {
        // check if need to update the cookie
        accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
        document.getElementById("cdu_content").className = "";
        if(!accessibilitytoolbar.idLinkModeContainer){
            var closeLink = document.getElementById("cdu_zone").getElementsByTagName("button")[0];
            closeLink.setAttribute("title", accessibilitytoolbar.get("uci_closeButton"));
            closeLink.innerHTML = accessibilitytoolbar.get("uci_closeButton") + "<span>&times;</span>";
        }
        try{
            document.getElementById("uci-onoffswitch").focus();
        }
        catch(e){}
    },

    toolbarDisplayHelp: function (id_parent) {
        if (document.getElementById(id_parent)) {
            // if help was hidden, then display it  
            if(document.getElementById(id_parent).className==='uci_span_help_bulle cdu_n') {
                document.getElementById(id_parent).className='uci_span_help_bulle';
            } else { // otherwise, hide it
                this.toolbarHideHelp(id_parent);
            }
        }
    },

    toolbarHideHelp: function (id_parent) {
        if (document.getElementById(id_parent)) {
            document.getElementById(id_parent).className='uci_span_help_bulle cdu_n';
        }
    },

    /**
     *
     */
    displayHelpNone:function () {
        if (document.getElementById('help')) {
            var element = document.getElementById('help');
            element.parentNode.removeChild(element);
        }
    },

    /**
     * Hide the graphic tool-bar
     */
    hide: function () {
        UciIhm.close_menu(true);
        if(document.getElementById('cdu_close'))
        {
            document.getElementById('cdu_close').style.display = "block";
        }
        document.getElementById("cdu_content").className = 'cdu_displayN';
        if (accessibilitytoolbar.hasDoneSettings) {
            accessibilitytoolbar.saveUserPref();
        } else {
            if(!accessibilitytoolbar.idLinkModeContainer){
                var openLink = document.getElementById("cdu_zone").getElementsByTagName("button")[0];
                openLink.setAttribute("title", this.get("uci_alt_logo"));
                openLink.innerHTML = this.get('uci_serv_name')+'<span>+</span>';
            }
            if (document.location.href.match(new RegExp("#" + accessibilitytoolbar.contentToJumpTo))) {
                document.location.reload();
            }
        }

    },
    
    close: function () {
    	var toolbar = document.getElementById('accessibilitytoolbarGraphic');
        if(toolbar) {
        	document.body.removeChild(toolbar);
        }
        var script = document.getElementById('a11yCSS');
        if(script) {
        	document.head.removeChild(script);
        }
        var content = document.getElementById('accessibilitytoolbarWrapper');
        if(content) {
        	content.outerHTML = content.innerHTML;
        }
        
    },

    /**
     * Adds load to the page
     * tries to add it as soon as the dom has loaded if possible
     * else adds it to the window.onload stack
     * inspired by the discussion at http://dean.edwards.name/weblog/2006/06/again/
     * @param {Function}func : the function to be added
     */
    addOnLoad: function (/*function*/func) {
        var ignited = false;
        /* for Mozilla/Opera9 */
        if (document.addEventListener && !ignited) {
            document.addEventListener("DOMContentLoaded", func, false);
            //Debug.log("addEventListener triggered");
            ignited = true;
        }

        /* For IE not so rusty */
        if (window.attachEvent && !ignited) {
            window.attachEvent('onload', func);
            ignited = true;
        }
        /* end */

        /* for Safari */
        if (/WebKit/i.test(navigator.userAgent) && !ignited) { // sniff
            var _timer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState) && !ignited) {
                    func(); // call the onload handler
                    ignited = true;
                }
            }, 10);
        }

        if (!ignited) {
            var oldonload = window.onload;
            if (typeof window.onload !== 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                }
            }
            ignited = true;
        }
    },

    /**
     * Apply selected preference to the current page.
     * @param {Event} e : the event to be processed
     */
    setPref: function (e) {
        var event = e || window.event;
        var target = e.target || window.event.srcElement;
        var prefName = target.getAttribute("name");
        var prefType = target.getAttribute("type");
        var elementLists = null;
        var parent = null;

        if(document.getElementById('uci_validation').className==='cdu_n'){
            document.getElementById('uci_validation').className="";
            document.getElementById('uci_zone_form').style.display="block";
        }
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') == 'off'){

        }
        var value = target.value;
        // for checkbox default value when unckecked = false
        if(target.type == "checkbox" && (!target.checked || !target.checked=="checked") )
        {
            value = "false";
        }
        // when the user disable the auto-preview, we need to get back the css with the cookie saved value
        if(prefName==="a11yApercuAuto" && value==="off"){
            accessibilitytoolbar.removePreviewCss();
        }
        accessibilitytoolbar.userPref.set(prefName, value);

        if(accessibilitytoolbar.userPref.get("a11yApercuAuto")!=="off"){
            accessibilitytoolbar.setCSS();
            // jump to content if needed
            accessibilitytoolbar.jumpToContent();
        }
    },

    /**
     * Jump to content if chosen so by the visitor
     */
    jumpToContent: function () {
        if (this.userPref.get("a11yJumpToContent") === "true" && this.contentToJumpTo) {
            if (!document.location.href.match(/#.+$/)) {
                document.location.href = "#" + this.contentToJumpTo;
            }
        } else {
            if (document.location.hash ==='#'+this.contentToJumpTo) {
                document.location.hash = "";
            }
        }
    },

    removeOrStartRemote: function () {
        if (this.userPref.get("a11ySiteWebEnabled") !== "off" && this.userPref.get("a11yMotorModeEnabled") == "true" && this.userPref.get("a11yMotorMode") == "remote"){
            if(this.remotecontrol == null){
                this.startRemote();
            }
        }else {
            if(this.remotecontrol !== null){
                this.remotecontrol.stopHelpMotor();
                clearTimeout(this.remotecontrol.timerId);
                this.remotecontrol = null;
            }

        }
    },
    /**
     * If visitor asked for the remotecontrol, then start it (obvious, isn't it)
     */
    startRemote: function () {
            this.remotecontrol = new RemoteControlMode();
            if (this.userPref.get("a11yDelayBeforeClick") && this.userPref.get("a11yDelayBeforeClick") > 0) {
                this.remotecontrol.hoverTimer = this.userPref.get("a11yDelayBeforeClick");
            }
    },

    removeOrStartLoopingMode: function (){
        if (this.userPref.get("a11ySiteWebEnabled") !== "off" && this.userPref.get("a11yMotorModeEnabled") == "true" && this.userPref.get("a11yMotorMode") == "looping") {
            this.startLoopingmode();
        }else{
            if(this.loopingmode !== null){
                this.loopingmode.killLoopingMode();
            }
        }
    },


            /**
     * If visitor wants looping mode ("navigation une touche"), start it
     */
    startLoopingmode: function () {
        // Create a new looping mode manager
        if (this.loopingmode == null) this.loopingmode = new LoopingMode();
        // Set the user prefered position
        if (this.userPref.get("a11yMenuPositionning") == "center") {
            this.loopingmode.setPosition(LoopingMenuPosition.CENTER);
        }
        else this.loopingmode.setPosition(LoopingMenuPosition.NEXT_TO);
        // Set the user prefered speed
        if (this.userPref.get("a11yDelayBeforeLoop") > 0) {
            this.loopingmode.setTimeout(this.userPref.get("a11yDelayBeforeLoop"));
        }
        else this.loopingmode.setTimeout(loopingmode.defaultLoopTimeout);
        // Set the user prefered quick mode step
        if (this.userPref.get("a11yQuickMode") > 0) {
            this.loopingmode.setQuickModeStep(this.userPref.get("a11yQuickMode"));
        }
        else this.loopingmode.setQuickModeStep(this.loopingmode.defaultQuickmode);
        // Start the looping mode
        var axsTb = this;
        setTimeout(function () {
            axsTb.loopingmode.start();
        }, 1000);
    },



    /**
     * Public method that can be used if loopingmode has been stopped
     * (for instance by a flash that has the Flex Confort de Lecture component)
     */
    restartLoopingmode: function () {
        this.loopingmode.restartLoopingmode();
        /* easy does it :) */
    },

    complete : function(){
        // if toolbarRuler isn't already launched
        if(!UciRuler.settings.launched)
        {
        	UciRuler.rulerEventCreate();
        }                                              
        // throw move event to update the ruler
        UciRuler.settings.color=this.userPref.get("a11yRegleColor");
        UciRuler.settings.thickness=this.userPref.get("a11yRegleEpaisseur");
        UciRuler.settings.showVertical= this.userPref.get("a11yRegleVertical") == "true";
        UciRuler.settings.showHorizontal= this.userPref.get("a11yRegleHorizontal")== "true";   
        $(document).mousemove();
    },

    removePreviewCss: function(){
        // get the current stack values
        var currentStackv3value = this.userPref.encode()+'0';
        // put the cookie value into the stackv3
        this.userPref.decode(accessibilitytoolbar.userPref.storedValue);
        this.cleanImgDisabled();
        // then apply the cookie css value
        this.setCSS();  
        // then come back to the current settings
        this.userPref.decode(currentStackv3value);

    },

    /**
     * Set new CSS rules
     * 1. linearize if need be by destroying all CSS informations
     * 2. add a new STYLE node with the user's preferences
     */
    setCSS: function () {   
        var links, i, allElts, scriptJquery, done, ruler, doneRuler, imageAlt, spanImage, element, image_uci, s = "", indexFrame, theFrame, theFrameDocument, theFrames;
        if (accessibilitytoolbar.userPref.get("a11yToolbarEnable") !== "off" && document.getElementById("cdu_content").className.match(/cdu_displayN/)) {
            if(document.getElementById('cdu_close'))
            {
                document.getElementById('cdu_close').style.display == 'none';
            }
            accessibilitytoolbar.show();
        }           
        accessibilitytoolbar.removeOrStartRemote();
        accessibilitytoolbar.removeOrStartLoopingMode();   
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled")!="off"){
            // 1. linearize ? -- which is the same as: get rid of all CSS info first
            if (accessibilitytoolbar.userPref.get("a11yLinearize") !== "false") {
                // delete all the CSS references
                links = document.getElementsByTagName("link");
                for (i = links.length - 1; i >= 0; i--) {
                    if (links[i].rel.match(/stylesheet/i) && (!links[i].id || !links[i].id.match(/a11yCSS/))) {
                        accessibilitytoolbar.savesStylesheets.push(links[i]);
                        links[i].parentNode.removeChild(links[i]);
                    }
                }

                // remove the style attribute
                allElts = accessibilitytoolbar.body.getElementsByTagName("*");
                for (i = 0; i < allElts.length; i++) {
                    if ((allElts[i].className  instanceof String && !allElts[i].className.match(/uci_/) && !allElts[i].className.match(/cdu_/)) ||  (allElts[i].id && !allElts[i].id.match(/uci_/) && !allElts[i].id.match(/cdu_/))) {
                        if(allElts[i].getAttribute("style"))
                        {
                            accessibilitytoolbar.savStyleElmtAtt[i]=allElts[i];
                            accessibilitytoolbar.savStyleAttElmt[i]=allElts[i].getAttribute("style");
                            allElts[i].removeAttribute("style");
                        }
                    }
                }
            }
            // if the user remove the option, we need to put back the stylesheets and styles attributes
            else{
                if(accessibilitytoolbar.savesStylesheets.length>0)
                {
                    for (i = accessibilitytoolbar.savesStylesheets.length - 1; i >= 0; i--) {
                        document.getElementsByTagName('head')[0].insertBefore(accessibilitytoolbar.savesStylesheets[i],document.getElementById('a11yCSS'));
                    }
                    // then clean the array
                    accessibilitytoolbar.savesStylesheets = [];
                }
                if(accessibilitytoolbar.savStyleElmtAtt.length>0)
                {
                    i = "";
                    for (i in accessibilitytoolbar.savStyleElmtAtt) {
                        accessibilitytoolbar.savStyleElmtAtt[i].setAttribute("style",accessibilitytoolbar.savStyleAttElmt[i]);
                    }
                    // then clean the array
                    accessibilitytoolbar.savStyleElmtAtt = [];
                    accessibilitytoolbar.savStyleAttElmt = [];
                }   
            }

            
            // generate the CSS instructions
            // 1. do we want bigger fonts?
            if (accessibilitytoolbar.userPref.get("a11yBigger") !== "keepit") {
                s += "html { font-size:" + accessibilitytoolbar.userPref.get("a11yBigger") + "% !important; }\n";
            }

            //gestion de l'affichage du mode espacement des mots
            if (accessibilitytoolbar.userPref.get("a11ySpacement") !== "keepit") {
                s += "*{ word-spacing:" + accessibilitytoolbar.userPref.get("a11ySpacement") + "em !important; }\n";
            }

            //gestion de l'affichage du mode espacement des lignes
            if (accessibilitytoolbar.userPref.get("a11yLineSpacement") !== "keepit") {
                s += "*{ line-height:" + accessibilitytoolbar.userPref.get("a11yLineSpacement") + " !important; }\n";
            }

            //gestion de l'espacement des caractères
            if (accessibilitytoolbar.userPref.get("a11yCharSpacement") !== "keepit") {
              if(accessibilitytoolbar.isModern) {
                s += "* :not(.cdu-icon) {letter-spacing:" + accessibilitytoolbar.userPref.get("a11yCharSpacement") + "em !important; }\n";
              } else{
                s += "*{letter-spacing:" + accessibilitytoolbar.userPref.get("a11yCharSpacement") + "em !important; }\n";
              }
            }

            //gestion de la casse : a11yModifCase
            if (accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") !== "false") {
                s += "*{ text-transform:" + accessibilitytoolbar.userPref.get("a11yModifCasse") + " !important; }\n";
            }

            //gestion de la police d'écriture
            if (accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled') && accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") !== "false") {
                //load the font face
                if(accessibilitytoolbar.userPref.get("a11yDyslexyFont")==='opendyslexic')
                {
                    s += "@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicregular'] +";font-style: normal;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicitalic'] +";font-style: italic;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicbold'] +";font-weight: bold;font-style: normal;}@font-face{font-family: \"opendyslexic\";src: " + fontsPath['opendyslexicbolditalic'] + ";font-weight: bold;font-style: italic;} ";
                }
                if(accessibilitytoolbar.isModern) {
                  s += "* :not(.cdu-icon) {font-family:" + accessibilitytoolbar.userPref.get("a11yDyslexyFont") + " !important; }\n";
                } else{
                  s += "*{font-family:" + accessibilitytoolbar.userPref.get("a11yDyslexyFont") + " !important; }\n"; 
                }
            }

            //gestion alignement des texte à gauche
            if (accessibilitytoolbar.userPref.get("a11yLeftText") !== "false") {
                s += "* {text-align:" + accessibilitytoolbar.userPref.get("a11yLeftText") + "!important; }\n";
            }

            //numerotation en mode liste
            if (accessibilitytoolbar.userPref.get("a11yNumerotationList") !== "false") {

                s += "ul, ol  {list-style-position:initial !important; list-style-image: none !important; list-style-type: " + accessibilitytoolbar.userPref.get("a11yNumerotationList") + "!important; }\n";
            }

            //gestion des liens de navigations
            if (accessibilitytoolbar.userPref.get("a11yNavLienEnabled") !== "false"){
                //gestion des liens non visités
                if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border") {
                    s += "a:link  {border: 1px solid !important; color : " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }  else if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold") {
                    s += "a:link  {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline") {
                    s += "a:link  {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else {
                    s += "a:link  {color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }

                //gestion des liens visités
                if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border") {
                    s += "a:visited {border: 1px solid !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold") {
                    s += "a:visited {font-weight: bold !important; color : " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline") {
                    s += "a:visited {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else {
                    s += "a:visited {color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }

                //gestion du lien actif
                if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border") {
                    s += "a:active {border: 1px solid #FF7900!important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {border: 1px solid #FF7900 !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {border: 1px solid #FF7900 !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline") {
                    s += "a:active {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }
                else if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold") {
                    s += "a:active {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }else {
                    s += "a:active {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";

                }
            }

            //gestion de la regle
            if (accessibilitytoolbar.userPref.get("a11yRegleEnabled") !== "false") {
                //load jquery if not loaded
                if (typeof jQuery == 'undefined') {
                    scriptJquery = document.createElement('script');
                    scriptJquery.src = jquery_min_js;
                    done = false;
                    // wait for jquery complete load
                    scriptJquery.onload = scriptJquery.onreadystatechange = function () {
                        if (!done && ( !this.readyState
                            || this.readyState == "loaded"
                            || this.readyState == "complete")) {
                            done = true;
                            // load the ruler
                            if (!accessibilitytoolbar.toolbarRuler) {
                                ruler = document.createElement('script');
                                ruler.src = ruler_js;
                                doneRuler = false;
                                // wait until ruler complete loaded
                                ruler.onload = ruler.onreadystatechange = function () {
                                    if (!doneRuler && ( !this.readyState
                                        || this.readyState == "loaded"
                                        || this.readyState == "complete")) {
                                        doneRuler = true;
                                        //run the ruler
                                        accessibilitytoolbar.complete();
                                    }
                                };
                                document.getElementsByTagName('body')[0].appendChild(ruler);
                                accessibilitytoolbar.toolbarRuler = true;
                            }
                        }
                    };
                    document.getElementsByTagName('body')[0].appendChild(scriptJquery);
                }

                // if jquery loaded, check if ruler loaded
                if (typeof jQuery !== 'undefined' && !accessibilitytoolbar.toolbarRuler) {
                    ruler = document.createElement('script');
                    ruler.src = ruler_js;
                    doneRuler = false;
                    // wait until ruler complete loaded
                    ruler.onload = ruler.onreadystatechange = function () {
                        if (!doneRuler && ( !this.readyState
                            || this.readyState == "loaded"
                            || this.readyState == "complete")) {
                        doneRuler = true;
                            //run the ruler
                            accessibilitytoolbar.complete();
                        }
                    };
                    document.getElementsByTagName('body')[0].appendChild(ruler);
                }
                if (typeof jQuery !== 'undefined' && accessibilitytoolbar.toolbarRuler) {
                    accessibilitytoolbar.complete();
                }
            }
            // if ruler was launch before deactivation kill!
            else if(accessibilitytoolbar.toolbarRuler && UciRuler.settings.launched)
            {
                UciRuler.rulerEventRemove();
            }

            //suppression des effets de transparences
            if (accessibilitytoolbar.userPref.get("a11ySupEffetTransp") !== "false") {                            
                s += "*  { opacity: 1 !important; -ms-filter: 'none'; filter: none !important }";                
            }

            //supression des images de fond
            if (accessibilitytoolbar.userPref.get("a11ySupImageFont") !== "false") {
                s += "*  { background-image: none !important; }\n";
            }

            
            var listeimg,i,backGroundColor,fontColor,uminositeFond,LuminositePolice,newStyle;
            //suppression des images de premier plan
            
            if (accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") !== "false" && !document.getElementById("spanImage1")){
                listeimg = document.images;
                for (i = 0; i < listeimg.length; i++) {
                    if(!document.getElementById("spanImage"+i)){
                        if(!(/^uci_(\S+)$/.exec(listeimg[i].parentNode.id))){
                            imageAlt = listeimg[i].alt;
                            spanImage = document.createElement("span");
                            spanImage.setAttribute("id", "spanImage" + i);
                            var newlink = document.createElement('a');
                            if (imageAlt === ""){
                                newlink.innerHTML = accessibilitytoolbar.get('uci_link_display_picture') + " " + accessibilitytoolbar.get('uci_link_display_picture_no_alt');
                            }else {
                                newlink.innerHTML = accessibilitytoolbar.get('uci_link_display_picture') + " " + imageAlt;
                            }
                            newlink.href = "#uci_img_" + i;
                            accessibilitytoolbar.uciAttachEvent('click','onclick',newlink,accessibilitytoolbar.activationPicture);
                            spanImage.appendChild(newlink);
                            listeimg[i].parentNode.insertBefore(spanImage, listeimg[i]);
                            listeimg[i].className=listeimg[i].className+" uci_disable_image";        
                        }
                    }
                }
            }else if (accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") == "false"){                
                accessibilitytoolbar.cleanImgDisabled();
            } 

            //gestion des couleurs
            // 2. add a new STYLE node with the user's preferences only if font color wasn't equal to the background one
            document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className.replace(/ uci_black{0,1}/,"");
            document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className.replace(/ uci_black{0,1}/,"");            
            if((accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" && accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") !=="keepit") || (accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" && accessibilitytoolbar.userPref.get("a11yFontColor") !== accessibilitytoolbar.userPref.get("a11yBackgroundColor")))
            {
                if (accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined") {
                    document.getElementById('uci_message_constraste').style.display= 'none';
                    element = document.getElementById('uci_reponses_bigger_quick_set');
                    backGroundColor = "#FFF";
                    fontColor = "#000";           
                    /*defect 67 */ 
                    if(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") == "whiteonblack")
                    {                                       
                        document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className + " uci_black";
                        document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className + " uci_black";
                        fontColor = "#FFF";
                        backGroundColor = "#000";
                    }
                }
                else {
                    /**
                     * Convert hexa colo to rgb
                    */
                    /* Implemented algorithm                                         
                    R = hexToR("#FFFFFF");
                    G = hexToG("#FFFFFF");
                    B = hexToB("#FFFFFF");
                    
                    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
                    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
                    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
                    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
                    
                    Puis application calcul luminosité relative
                    http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef                    
                    
                    */                    
                    LuminositeFond = accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yBackgroundColor").substring(1,3),16)) * 0.2126 
                        + accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yBackgroundColor").substring(3,5),16)) * 0.7152 
                        + accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yBackgroundColor").substring(5,7),16)) * 0.0722;
                    
                    LuminositePolice = accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yFontColor").substring(1,3),16)) * 0.2126 
                        + accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yFontColor").substring(3,5),16)) * 0.7152 
                        + accessibilitytoolbar.conversionColor(parseInt(accessibilitytoolbar.userPref.get("a11yFontColor").substring(5,7),16)) * 0.0722;

                    //calcul du contraste entre 2 couleurs
                    /*
                      contrast ratio
                        (L1 + 0.05) / (L2 + 0.05), where
                            L1 is the relative luminance of the lighter of the colors, and
                            L2 is the relative luminance of the darker of the colors.
                    */
                    if (((Math.max(LuminositePolice, LuminositeFond) + 0.05)/(Math.min(LuminositePolice, LuminositeFond) + 0.05)) < 4.5 ) {
                        if (document.getElementById('uci_message_constraste').style.display  === 'none'){
                            document.getElementById('uci_message_constraste').style.display = 'block';
                        }
                    } else if (document.getElementById('uci_message_constraste').style.display === 'block'){
                        document.getElementById('uci_message_constraste').style.display= 'none';
                    }
                    fontColor = accessibilitytoolbar.userPref.get("a11yFontColor");
                    backGroundColor = accessibilitytoolbar.userPref.get("a11yBackgroundColor");                        
                }
                
                s += "* { color:" + fontColor + " !important; }\n";
                s += "fieldset, button, input { border-color:" + fontColor + " !important; }\n";
                //s += "button, input[type='submit'], input[type='text'] { border-style:outset !important; border-color:" + fontColor + " !important; }\n";
                s += "td,th {border:1px solid " + fontColor + " !important; padding:.2em !important;}";
                s += "table {border-collapse: collapse !important;}";
                s += "* { background-color:" + backGroundColor + " !important; background:" + backGroundColor + " !important; }\n";
                s += "*:link, *:visited , *:hover { color:" + fontColor + ";}\n";     
                
                document.getElementById('cdu_zone').className = 'uci_a11yVisualPredefinedSettings_enabled';
            }
            else {
                document.getElementById('cdu_zone').className = 'uci_a11yVisualPredefinedSettings_disabled';
            }
        }
        
        // Remove previous user style
        if (document.getElementById("a11yUserPrefStyle")) {
            document.getElementsByTagName("head")[0].removeChild(document.getElementById("a11yUserPrefStyle"));
            /*
             * remove css to frames if possible
             * Works only if frame src is onto the same domain
             *
             */
            indexFrame = 0;
            theFrames=window.frames;
            //theFrames=document.getElementsByTagName("iframe");
            if(theFrames.length>0)
            {
                while(theFrame = theFrames[indexFrame]){
                    try{
                        //theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
                        theFrameDocument = theFrame.document || theFrame.contentDocument;
                        if(theFrameDocument.getElementsByTagName('head')[0]){
                            theFrameDocument.getElementsByTagName('head')[0].removeChild(theFrameDocument.getElementById("a11yUserPrefStyle"));
                        }
                    } catch(e){}
                    indexFrame++;
                }
            }
        }    
        // create a new style sheet
        if (s !== "") {
            newStyle = document.createElement("style");
            newStyle.setAttribute("type", "text/css");
            newStyle.id = "a11yUserPrefStyle";
            if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
                newStyle.styleSheet.cssText = s;
            }
            else { // standards-oriented browsers
                newStyle.appendChild(document.createTextNode(s));
            }
            document.getElementsByTagName('head')[0].appendChild(newStyle);
            /*
             * Apply css to frames if possible
             * Works only if frame src is onto the same domain
             *
             */
            indexFrame = 0;
            theFrames=window.frames;
            //frames=document.getElementsByTagName("iframe");
            if(theFrames.length>0)
            {
                while(theFrame = theFrames[indexFrame]){
                    try{                        
                        theFrameDocument = theFrame.document || theFrame.contentDocument;
                        if(theFrameDocument.getElementsByTagName('head')[0]){
                            theFrameDocument.getElementsByTagName('head')[0].appendChild(newStyle.cloneNode(true));
                        }                        
                    } catch(e){}
                    indexFrame++;
                }
            }
        }

    },
             
    /*
     * remove the link from pictures disabled
     */
    cleanImgDisabled : function(){
        var i,image_uci, listeimg = document.images;
        for(i = 0; i < listeimg.length; i++) {
            image_uci = /^uci_(\S+)$/.exec(listeimg[i].parentNode.id) ;
            if(!image_uci){
                if(document.getElementById("spanImage"+i)){
                    element = document.getElementById("spanImage"+i);
                    element.parentNode.removeChild(element);
                    listeimg[i].className = listeimg[i].className.replace(/ uci_disable_image{0,1}/,"");
                }
                else // if there is no span, stop the loop
                {
                    i=listeimg.length;
                }
            }
        }
    },
                
    /*
     * reload the toolbar
     */
    reloadToolbar : function(){
        document.getElementById('accessibilitytoolbarGraphic').lang = this.strings.getLocale();
        if(accessibilitytoolbar.userPref.get('a11yLanguage') !== "keepit"){
            accessibilitytoolbar.strings.setMyLocale(accessibilitytoolbar.userPref.get('a11yLanguage'));
        }else{
            accessibilitytoolbar.strings.setLocale();
        }

        if(accessibilitytoolbar.loopingmode !== null){
            accessibilitytoolbar.loopingmode.killLoopingMode();
        }
        if(accessibilitytoolbar.remotecontrol !== null){
            accessibilitytoolbar.remotecontrol.stopHelpMotor();
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
            accessibilitytoolbar.remotecontrol = null;
        }
        if(accessibilitytoolbar.idLinkModeContainer){
            var str ="";
            // remove the opent link
            var myChildNode = document.getElementById('uci_link');
            myChildNode.parentNode.removeChild(myChildNode);
            // remove the skip link
            var myChildNodeSkip = document.getElementById('idCduSkip');
            myChildNodeSkip.parentNode.removeChild(myChildNodeSkip);
            str = accessibilitytoolbar.toolbarCreateLink();
            document.getElementById('accessibilitytoolbarGraphic').innerHTML = str;
        }else{
            document.getElementById('accessibilitytoolbarGraphic').innerHTML = accessibilitytoolbar.toolbarCreateButton();
        }
        accessibilitytoolbar.loadTheToolbar();
    },

    /**
     * Activation de l'image via le lien
     */
    activationPicture : function(e){    
        var target = e.target || e.srcElement;
        var indexImg = target.hash.split("_");        
        document.images[indexImg[2]].className = document.images[indexImg[2]].className.replace(/ uci_disable_image{0,1}/,"");        
        element = document.getElementById("spanImage"+indexImg[2]);
        element.parentNode.removeChild(element);
        accessibilitytoolbar.stopEvt(e);
    },
    
    /**
     * convert rgb color for relative luminance
     *
     *     if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
     *     
     *     if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
     *     
     *     if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
     *     
     *     and RsRGB, GsRGB, and BsRGB are defined as:
     *     
     *         RsRGB = R8bit/255
     *     
     *         GsRGB = G8bit/255
     *     
     *         BsRGB = B8bit/255     
     *          
     */
    conversionColor : function(color){
        color = color/255;
        if(color <= 0.03928){
            color = color/12.92;
        }else{
            color = Math.pow(((color+0.055)/1.055),2.4);
        }
        return(color);
    },

    /**
     * Initialise the toolbar
     */
    init: function () {
        // Bypass the default idLinkModeContainer
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.idLinkModeContainer){
            if(document.getElementById(window.accessibilitytoolbar_custom.idLinkModeContainer)){
                accessibilitytoolbar.idLinkModeContainer = window.accessibilitytoolbar_custom.idLinkModeContainer;
            }
            if( window.accessibilitytoolbar_custom.cssLinkModeClassName){
                accessibilitytoolbar.cssLinkModeClassName = window.accessibilitytoolbar_custom.cssLinkModeClassName;
            }
            if( window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode){
                if(document.getElementById(window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode)){
                    accessibilitytoolbar.idSkipLinkIdLinkMode = window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode;
                }
            }
            if( window.accessibilitytoolbar_custom.cssSkipLinkClassName){
                accessibilitytoolbar.cssSkipLinkClassName = window.accessibilitytoolbar_custom.cssSkipLinkClassName;
            }
        }

        // Bypass the default toolbar theme
        // Check if user preference has finished loading
        if (!accessibilitytoolbar.userPref.isUserPrefLoaded()) {
            setTimeout(accessibilitytoolbar.init, "100");
            return;
        }
        // if a global contentToLookFor is found then we'll use it
        // it has to be declared before our script is inserted
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.contentToLookFor) {
            accessibilitytoolbar.contentToLookFor = accessibilitytoolbar.contentToLookFor.concat(window.accessibilitytoolbar_custom.contentToLookFor);
        }
        // this looks for an anchor named after one of the items in the contentToLookFor array
        for (var i = 0; i < accessibilitytoolbar.contentToLookFor.length; i++) {
            if (document.getElementById(accessibilitytoolbar.contentToLookFor[i])) {
                accessibilitytoolbar.contentToJumpTo = accessibilitytoolbar.contentToLookFor[i];
                break;
            }
        }
        // this creates a few hooks to hold to
        accessibilitytoolbar.head = document.getElementsByTagName('head')[0];
        accessibilitytoolbar.body = document.getElementsByTagName('body')[0];
        accessibilitytoolbar.html = document.getElementsByTagName('html')[0];

        if(accessibilitytoolbar.userPref.get('a11yLanguage') !== "keepit"){

            accessibilitytoolbar.strings.setMyLocale(accessibilitytoolbar.userPref.get('a11yLanguage'));
        }
        accessibilitytoolbar.firstInitToolbar();
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.callback && typeof window.accessibilitytoolbar_custom.callback ==='function' ){
            window.accessibilitytoolbar_custom.callback();        
        }
    },

    firstInitToolbar: function(){
        // let's create the toolbar
        var style = "#accessibilitytoolbarGraphic {display:none}";
        var newStyle = document.createElement("style");
        newStyle.setAttribute("type", "text/css");
        if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
            newStyle.styleSheet.cssText = style;
        }else { // standards-oriented browsers
            newStyle.appendChild(document.createTextNode(style));
        }
        var _head = document.getElementsByTagName('head')[0];
        // newStyle
        _head.insertBefore(newStyle, _head.firstChild);
        // And now we create the toolbar...
        this.createToolbarCSSLink();
        var d = document.createElement('div');
        d.id = "accessibilitytoolbarGraphic";
        d.lang = this.strings.getLocale();
        d.className = 'cdu_modern_browser';
        accessibilitytoolbar.isModern = true;
        var nav = this.getNavigateur();
        var list = ['MSIE 8.', 'MSIE 7.', 'MSIE 6.'];
        try {
            for(var i = 0, len = list.length; i < len; ++i) {
                var pos = nav.indexOf(list[i]);
                if(pos !== -1) {
                    throw "OldBrowser";
                }
            }
        } catch(e) {
        	accessibilitytoolbar.isModern = false;
            d.className = 'cdu_old_browser';
        }
        d.innerHTML = accessibilitytoolbar.toolbarCDUContent();
        this.body.insertBefore(d, this.body.firstChild);
        accessibilitytoolbar.loadTheToolbar();

    },

    loadTheToolbar: function () {
        accessibilitytoolbar.createObjectBehaviour();
        if (accessibilitytoolbar.secCookie === null) {
            accessibilitytoolbar.cleanImgDisabled();
            // set CSS to the user's settings
            accessibilitytoolbar.setCSS();
            // jump to content if needed
            accessibilitytoolbar.jumpToContent();
        }

    },
    
    /**
     * @function isTouchDevice
     * @returns {boolean}
     */
    isTouchDevice: function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|android|ipad|playbook|silk|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        {
            return true;
        }
            return false;
    },
    
    /**
     * @function isInFrame
     * check if Orange Confort+ is displayed into a frame or iframe, then don't display the toolbar
     * @returns {boolean} return true if in frame
     */
     inIframe: function () {
    	try {
            return (window.frameElement);// || window.opener);
            //return (window.parent != window);// || window.opener);
        } catch (e) {
            return true;
        }
    },

    /**
     * Stop the event bubbling and prevent default action
     * @param {Event} e the event
     */
    stopEvt: function (/*Event*/ e) {
        // For W3C Browser
if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        return false;
    },

    /**
     * Start the thing
     */
    start: function () {
        // detect the browser 
        if(!this.isTouchDevice(navigator.userAgent || navigator.vendor || window.opera) && !this.inIframe()){            
            if (!document.getElementById || !document.getElementsByTagName || !document.createElement) {
                return;
            }
            /*  clean escape just in case you're using a very rusty browser */
            if (document.getElementById("a11yToolbar")) {
                document.getElementById("a11yToolbar").setAttribute("uci_language", "unknown");
            } else {
                // doesn't work on ie<7 so we test before
                if (window.postMessage) {
                    // when the data response was received, launch the init of the toolbar
                    // find the locale for correct language  
                    this.strings.setLocale();
                    this.userPref = new UciStorage();
                    if (document.readyState !== 'loading') {
                        this.init();
                    }
                    else {
                        this.addOnLoad(this.init);
                    }
                }
            }
        }

    }
    
};
// Source: app/js/ruler.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
UciRuler = {
        settings: {
            showVertical : false,
            showHorizontal : false,
            color : '#000',   //#000,  #32C832, #CD3C14, #527EDB, #FFCC00
            thickness : 'medium',			   //thin,medium,thick
            launched : false
        },

        vMouse: null,
        hMouse: null,

        init: function() {
	        if ((!window.Modernizer) || !Modernizr.touch) { 
	            vMouse = document.createElement("div");
	            vMouse.className="vMouse";
	            hMouse = document.createElement("div");
	            hMouse.className="hMouse";
	            document.getElementsByTagName("body")[0].appendChild(vMouse);
	            document.getElementsByTagName("body")[0].appendChild(hMouse);  

	            // Mouse crosshair
	            if (!UciRuler.settings.showVertical ) {
	            	jQuery('.vMouse').hide();              
	            }
	            if (!UciRuler.settings.showHorizontal ) {
	            	jQuery('.hMouse').hide(); 
	                
	            }   
	        	
	        }
        },
        
        rulerEventCreate: function() {              
        	jQuery(document).on("mousemove.ruler",this.rulerEvent);
            UciRuler.settings.launched = true;
        },        
     
        rulerEventRemove: function() {    
        	jQuery(document).unbind("mousemove.ruler",this.rulerEvent);  
            // if the vertical ruler was launched before, removed it from the dom
        	jQuery('.vMouse').hide();      
            // if the horizontal ruler was launched before, removed it from the dom
        	jQuery('.hMouse').hide(); 
            UciRuler.settings.launched = false;
        },
        
        rulerEvent: function(e) {
            // vertical
            if (UciRuler.settings.showVertical) {     
            	jQuery('.vMouse').show();                  
            	jQuery('.vMouse').css("left",e.pageX+1);
            	jQuery('.vMouse').css('borderLeft',UciRuler.settings.thickness+' solid '+UciRuler.settings.color);
            } 
            else
            {
                // if the vertical ruler was launched before, removed it from the dom
            	jQuery('.vMouse').hide();
            }
                
            // horizontal    
            if (UciRuler.settings.showHorizontal) { 
            	jQuery('.hMouse').show();             
            	jQuery('.hMouse').css("top",e.pageY-(jQuery(document).scrollTop())+1);
            	jQuery('.hMouse').css('borderBottom',UciRuler.settings.thickness+' solid '+UciRuler.settings.color);                    
            }  
            else
            {    
                // if the horizontal ruler was launched before, removed it from the dom
            	jQuery('.hMouse').hide(); 
            }                    
        }
}
UciRuler.init();
accessibilitytoolbar.toolbarRuler = true;
// Source: app/js/start.extensionFirefox.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
var block = false;

window.addEventListener('message', function(event) {
	if(block == false) {
	    if (  typeof event.data === 'object')
	            return false;
	      var split = event.data.split('_');
	      var message = split[0];
	      var value = split[1];
		  if(message === 'orangecomfort+helpfr') {
	          self.port.emit('openhelp', 'fr');
	      }
	      if(message === 'orangecomfort+helpen') {
	          self.port.emit('openhelp', 'en');
	      }
	      if(message === 'orangecomfort+helpes') {
	          self.port.emit('openhelp', 'es');
	      }
	      if(message === 'orangecomfort+userprefget') {
			  self.port.emit('orangecomfort+userprefget', document.location.hostname);
	      }
	      if(message === 'orangecomfort+userprefsave') {
			  self.port.emit('orangecomfort+userprefsave', value);
	      }
	      if(message === 'orangecomfort+blacklistsave') {
	          self.port.emit('orangecomfort+blacklistsave', value);
	      }
	}
  
}, true);

self.port.on('orangecomfort+userprefgetresponse', function(value) {
	if(block == false) {
		accessibilitytoolbar.userPref.setStoredValue(value);
	}
});

self.port.on('orangecomfort+closecdu', function() {
	if(block == false) {
		accessibilitytoolbar.userPref.setStoredValue('00006510006506506500000000000000000065000000100');
		accessibilitytoolbar.reloadToolbar();
		accessibilitytoolbar.close();
	}
});

self.port.on('orangecomfort+loadcdu', function() {
	toolbarServer = document.querySelector("script[src*='crossdom/js']");
	head = document.querySelector("head");
	body = document.querySelector("body");
	if((toolbarServer == null) && (head != null) && (body != null) && (window.location.href != 'about:blank')) {
		accessibilitytoolbar.start();
	} else {
		block = true;
	}
});