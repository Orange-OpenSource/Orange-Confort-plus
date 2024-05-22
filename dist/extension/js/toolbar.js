/*
 * orange-confort-plus - version 5.0.0-alpha.4 - 12/06/2024
 * Enhance user experience on web sites
 * © 2014 - 2024 Orange SA
 */
(function() {
    "use strict";
    var n = window.Document.prototype.createElement, p = window.Document.prototype.createElementNS, aa = window.Document.prototype.importNode, ba = window.Document.prototype.prepend, ca = window.Document.prototype.append, da = window.DocumentFragment.prototype.prepend, ea = window.DocumentFragment.prototype.append, q = window.Node.prototype.cloneNode, r = window.Node.prototype.appendChild, t = window.Node.prototype.insertBefore, u = window.Node.prototype.removeChild, v = window.Node.prototype.replaceChild, w = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), y = window.Element.prototype.attachShadow, z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), A = window.Element.prototype.getAttribute, B = window.Element.prototype.setAttribute, C = window.Element.prototype.removeAttribute, D = window.Element.prototype.toggleAttribute, E = window.Element.prototype.getAttributeNS, F = window.Element.prototype.setAttributeNS, G = window.Element.prototype.removeAttributeNS, H = window.Element.prototype.insertAdjacentElement, fa = window.Element.prototype.insertAdjacentHTML, ha = window.Element.prototype.prepend, ia = window.Element.prototype.append, ja = window.Element.prototype.before, ka = window.Element.prototype.after, la = window.Element.prototype.replaceWith, ma = window.Element.prototype.remove, na = window.HTMLElement, I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), oa = window.HTMLElement.prototype.insertAdjacentElement, pa = window.HTMLElement.prototype.insertAdjacentHTML;
    var qa = new Set;
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach((function(a) {
        return qa.add(a);
    }));
    function ra(a) {
        var b = qa.has(a);
        a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
        return !b && a;
    }
    var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function J(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        if (sa(a)) return !0;
        for (;a && !(a.__CE_isImportDocument || a instanceof Document); ) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function K(a) {
        var b = a.children;
        if (b) return Array.prototype.slice.call(b);
        b = [];
        for (a = a.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && b.push(a);
        return b;
    }
    function L(a, b) {
        for (;b && b !== a && !b.nextSibling; ) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null;
    }
    function M(a, b, d) {
        for (var f = a; f; ) {
            if (f.nodeType === Node.ELEMENT_NODE) {
                var c = f;
                b(c);
                var e = c.localName;
                if ("link" === e && "import" === c.getAttribute("rel")) {
                    f = c.import;
                    void 0 === d && (d = new Set);
                    if (f instanceof Node && !d.has(f)) for (d.add(f), f = f.firstChild; f; f = f.nextSibling) M(f, b, d);
                    f = L(a, c);
                    continue;
                } else if ("template" === e) {
                    f = L(a, c);
                    continue;
                }
                if (c = c.__CE_shadowRoot) for (c = c.firstChild; c; c = c.nextSibling) M(c, b, d);
            }
            f = f.firstChild ? f.firstChild : L(a, f);
        }
    }
    function N() {
        var a = !(null === O || void 0 === O || !O.noDocumentConstructionObserver), b = !(null === O || void 0 === O || !O.shadyDomFastWalk);
        this.m = [];
        this.g = [];
        this.j = !1;
        this.shadyDomFastWalk = b;
        this.I = !a;
    }
    function P(a, b, d, f) {
        var c = window.ShadyDOM;
        if (a.shadyDomFastWalk && c && c.inUse) {
            if (b.nodeType === Node.ELEMENT_NODE && d(b), b.querySelectorAll) for (a = c.nativeMethods.querySelectorAll.call(b, "*"), 
            b = 0; b < a.length; b++) d(a[b]);
        } else M(b, d, f);
    }
    function ta(a, b) {
        a.j = !0;
        a.m.push(b);
    }
    function ua(a, b) {
        a.j = !0;
        a.g.push(b);
    }
    function Q(a, b) {
        a.j && P(a, b, (function(d) {
            return R(a, d);
        }));
    }
    function R(a, b) {
        if (a.j && !b.__CE_patched) {
            b.__CE_patched = !0;
            for (var d = 0; d < a.m.length; d++) a.m[d](b);
            for (d = 0; d < a.g.length; d++) a.g[d](b);
        }
    }
    function S(a, b) {
        var d = [];
        P(a, b, (function(c) {
            return d.push(c);
        }));
        for (b = 0; b < d.length; b++) {
            var f = d[b];
            1 === f.__CE_state ? a.connectedCallback(f) : T(a, f);
        }
    }
    function U(a, b) {
        var d = [];
        P(a, b, (function(c) {
            return d.push(c);
        }));
        for (b = 0; b < d.length; b++) {
            var f = d[b];
            1 === f.__CE_state && a.disconnectedCallback(f);
        }
    }
    function V(a, b, d) {
        d = void 0 === d ? {} : d;
        var f = d.J, c = d.upgrade || function(g) {
            return T(a, g);
        }, e = [];
        P(a, b, (function(g) {
            a.j && R(a, g);
            if ("link" === g.localName && "import" === g.getAttribute("rel")) {
                var h = g.import;
                h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
                h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", (function() {
                    var k = g.import;
                    if (!k.__CE_documentLoadHandled) {
                        k.__CE_documentLoadHandled = !0;
                        var l = new Set;
                        f && (f.forEach((function(m) {
                            return l.add(m);
                        })), l.delete(k));
                        V(a, k, {
                            J: l,
                            upgrade: c
                        });
                    }
                }));
            } else e.push(g);
        }), f);
        for (b = 0; b < e.length; b++) c(e[b]);
    }
    function T(a, b) {
        try {
            var d = b.ownerDocument, f = d.__CE_registry;
            var c = f && (d.defaultView || d.__CE_isImportDocument) ? W(f, b.localName) : void 0;
            if (c && void 0 === b.__CE_state) {
                c.constructionStack.push(b);
                try {
                    try {
                        if (new c.constructorFunction !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        c.constructionStack.pop();
                    }
                } catch (k) {
                    throw b.__CE_state = 2, k;
                }
                b.__CE_state = 1;
                b.__CE_definition = c;
                if (c.attributeChangedCallback && b.hasAttributes()) {
                    var e = c.observedAttributes;
                    for (c = 0; c < e.length; c++) {
                        var g = e[c], h = b.getAttribute(g);
                        null !== h && a.attributeChangedCallback(b, g, null, h, null);
                    }
                }
                J(b) && a.connectedCallback(b);
            }
        } catch (k) {
            X(k);
        }
    }
    N.prototype.connectedCallback = function(a) {
        var b = a.__CE_definition;
        if (b.connectedCallback) try {
            b.connectedCallback.call(a);
        } catch (d) {
            X(d);
        }
    };
    N.prototype.disconnectedCallback = function(a) {
        var b = a.__CE_definition;
        if (b.disconnectedCallback) try {
            b.disconnectedCallback.call(a);
        } catch (d) {
            X(d);
        }
    };
    N.prototype.attributeChangedCallback = function(a, b, d, f, c) {
        var e = a.__CE_definition;
        if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
            e.attributeChangedCallback.call(a, b, d, f, c);
        } catch (g) {
            X(g);
        }
    };
    function va(a, b, d, f) {
        var c = b.__CE_registry;
        if (c && (null === f || "http://www.w3.org/1999/xhtml" === f) && (c = W(c, d))) try {
            var e = new c.constructorFunction;
            if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + d + "': The returned value was not constructed with the HTMLElement constructor.");
            if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + d + "': The constructed element's namespace must be the HTML namespace.");
            if (e.hasAttributes()) throw Error("Failed to construct '" + d + "': The constructed element must not have any attributes.");
            if (null !== e.firstChild) throw Error("Failed to construct '" + d + "': The constructed element must not have any children.");
            if (null !== e.parentNode) throw Error("Failed to construct '" + d + "': The constructed element must not have a parent node.");
            if (e.ownerDocument !== b) throw Error("Failed to construct '" + d + "': The constructed element's owner document is incorrect.");
            if (e.localName !== d) throw Error("Failed to construct '" + d + "': The constructed element's local name is incorrect.");
            return e;
        } catch (g) {
            return X(g), b = null === f ? n.call(b, d) : p.call(b, f, d), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), 
            b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
        }
        b = null === f ? n.call(b, d) : p.call(b, f, d);
        R(a, b);
        return b;
    }
    function X(a) {
        var b = "", d = "", f = 0, c = 0;
        a instanceof Error ? (b = a.message, d = a.sourceURL || a.fileName || "", f = a.line || a.lineNumber || 0, 
        c = a.column || a.columnNumber || 0) : b = "Uncaught " + String(a);
        var e = void 0;
        void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", {
            cancelable: !0,
            message: b,
            filename: d,
            lineno: f,
            colno: c,
            error: a
        }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, d, f), 
        e.preventDefault = function() {
            Object.defineProperty(this, "defaultPrevented", {
                configurable: !0,
                get: function() {
                    return !0;
                }
            });
        });
        void 0 === e.error && Object.defineProperty(e, "error", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return a;
            }
        });
        window.dispatchEvent(e);
        e.defaultPrevented || console.error(a);
    }
    function wa() {
        var a = this;
        this.g = void 0;
        this.F = new Promise((function(b) {
            a.l = b;
        }));
    }
    wa.prototype.resolve = function(a) {
        if (this.g) throw Error("Already resolved.");
        this.g = a;
        this.l(a);
    };
    function xa(a) {
        var b = document;
        this.l = void 0;
        this.h = a;
        this.g = b;
        V(this.h, this.g);
        "loading" === this.g.readyState && (this.l = new MutationObserver(this.G.bind(this)), 
        this.l.observe(this.g, {
            childList: !0,
            subtree: !0
        }));
    }
    function ya(a) {
        a.l && a.l.disconnect();
    }
    xa.prototype.G = function(a) {
        var b = this.g.readyState;
        "interactive" !== b && "complete" !== b || ya(this);
        for (b = 0; b < a.length; b++) for (var d = a[b].addedNodes, f = 0; f < d.length; f++) V(this.h, d[f]);
    };
    function Y(a) {
        this.s = new Map;
        this.u = new Map;
        this.C = new Map;
        this.A = !1;
        this.B = new Map;
        this.o = function(b) {
            return b();
        };
        this.i = !1;
        this.v = [];
        this.h = a;
        this.D = a.I ? new xa(a) : void 0;
    }
    Y.prototype.H = function(a, b) {
        var d = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
        za(this, a);
        this.s.set(a, b);
        this.v.push(a);
        this.i || (this.i = !0, this.o((function() {
            return Aa(d);
        })));
    };
    Y.prototype.define = function(a, b) {
        var d = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        za(this, a);
        Ba(this, a, b);
        this.v.push(a);
        this.i || (this.i = !0, this.o((function() {
            return Aa(d);
        })));
    };
    function za(a, b) {
        if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
        if (W(a, b)) throw Error("A custom element with name '" + (b + "' has already been defined."));
        if (a.A) throw Error("A custom element is already being defined.");
    }
    function Ba(a, b, d) {
        a.A = !0;
        var f;
        try {
            var c = d.prototype;
            if (!(c instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var e = function(m) {
                var x = c[m];
                if (void 0 !== x && !(x instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
                return x;
            };
            var g = e("connectedCallback");
            var h = e("disconnectedCallback");
            var k = e("adoptedCallback");
            var l = (f = e("attributeChangedCallback")) && d.observedAttributes || [];
        } catch (m) {
            throw m;
        } finally {
            a.A = !1;
        }
        d = {
            localName: b,
            constructorFunction: d,
            connectedCallback: g,
            disconnectedCallback: h,
            adoptedCallback: k,
            attributeChangedCallback: f,
            observedAttributes: l,
            constructionStack: []
        };
        a.u.set(b, d);
        a.C.set(d.constructorFunction, d);
        return d;
    }
    Y.prototype.upgrade = function(a) {
        V(this.h, a);
    };
    function Aa(a) {
        if (!1 !== a.i) {
            a.i = !1;
            for (var b = [], d = a.v, f = new Map, c = 0; c < d.length; c++) f.set(d[c], []);
            V(a.h, document, {
                upgrade: function(k) {
                    if (void 0 === k.__CE_state) {
                        var l = k.localName, m = f.get(l);
                        m ? m.push(k) : a.u.has(l) && b.push(k);
                    }
                }
            });
            for (c = 0; c < b.length; c++) T(a.h, b[c]);
            for (c = 0; c < d.length; c++) {
                for (var e = d[c], g = f.get(e), h = 0; h < g.length; h++) T(a.h, g[h]);
                (e = a.B.get(e)) && e.resolve(void 0);
            }
            d.length = 0;
        }
    }
    Y.prototype.get = function(a) {
        if (a = W(this, a)) return a.constructorFunction;
    };
    Y.prototype.whenDefined = function(a) {
        if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.B.get(a);
        if (b) return b.F;
        b = new wa;
        this.B.set(a, b);
        var d = this.u.has(a) || this.s.has(a);
        a = -1 === this.v.indexOf(a);
        d && a && b.resolve(void 0);
        return b.F;
    };
    Y.prototype.polyfillWrapFlushCallback = function(a) {
        this.D && ya(this.D);
        var b = this.o;
        this.o = function(d) {
            return a((function() {
                return b(d);
            }));
        };
    };
    function W(a, b) {
        var d = a.u.get(b);
        if (d) return d;
        if (d = a.s.get(b)) {
            a.s.delete(b);
            try {
                return Ba(a, b, d());
            } catch (f) {
                X(f);
            }
        }
    }
    Y.prototype.define = Y.prototype.define;
    Y.prototype.upgrade = Y.prototype.upgrade;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.whenDefined = Y.prototype.whenDefined;
    Y.prototype.polyfillDefineLazy = Y.prototype.H;
    Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
    function Z(a, b, d) {
        function f(c) {
            return function(e) {
                for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
                h = [];
                for (var k = [], l = 0; l < g.length; l++) {
                    var m = g[l];
                    m instanceof Element && J(m) && k.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) h.push(m); else h.push(m);
                }
                c.apply(this, g);
                for (g = 0; g < k.length; g++) U(a, k[g]);
                if (J(this)) for (g = 0; g < h.length; g++) k = h[g], k instanceof Element && S(a, k);
            };
        }
        void 0 !== d.prepend && (b.prepend = f(d.prepend));
        void 0 !== d.append && (b.append = f(d.append));
    }
    function Ca(a) {
        Document.prototype.createElement = function(b) {
            return va(a, this, b, null);
        };
        Document.prototype.importNode = function(b, d) {
            b = aa.call(this, b, !!d);
            this.__CE_registry ? V(a, b) : Q(a, b);
            return b;
        };
        Document.prototype.createElementNS = function(b, d) {
            return va(a, this, d, b);
        };
        Z(a, Document.prototype, {
            prepend: ba,
            append: ca
        });
    }
    function Da(a) {
        function b(f) {
            return function(c) {
                for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];
                g = [];
                for (var h = [], k = 0; k < e.length; k++) {
                    var l = e[k];
                    l instanceof Element && J(l) && h.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) g.push(l); else g.push(l);
                }
                f.apply(this, e);
                for (e = 0; e < h.length; e++) U(a, h[e]);
                if (J(this)) for (e = 0; e < g.length; e++) h = g[e], h instanceof Element && S(a, h);
            };
        }
        var d = Element.prototype;
        void 0 !== ja && (d.before = b(ja));
        void 0 !== ka && (d.after = b(ka));
        void 0 !== la && (d.replaceWith = function(f) {
            for (var c = [], e = 0; e < arguments.length; ++e) c[e] = arguments[e];
            e = [];
            for (var g = [], h = 0; h < c.length; h++) {
                var k = c[h];
                k instanceof Element && J(k) && g.push(k);
                if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k); else e.push(k);
            }
            h = J(this);
            la.apply(this, c);
            for (c = 0; c < g.length; c++) U(a, g[c]);
            if (h) for (U(a, this), c = 0; c < e.length; c++) g = e[c], g instanceof Element && S(a, g);
        });
        void 0 !== ma && (d.remove = function() {
            var f = J(this);
            ma.call(this);
            f && U(a, this);
        });
    }
    function Ea(a) {
        function b(c, e) {
            Object.defineProperty(c, "innerHTML", {
                enumerable: e.enumerable,
                configurable: !0,
                get: e.get,
                set: function(g) {
                    var h = this, k = void 0;
                    J(this) && (k = [], P(a, this, (function(x) {
                        x !== h && k.push(x);
                    })));
                    e.set.call(this, g);
                    if (k) for (var l = 0; l < k.length; l++) {
                        var m = k[l];
                        1 === m.__CE_state && a.disconnectedCallback(m);
                    }
                    this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
                    return g;
                }
            });
        }
        function d(c, e) {
            c.insertAdjacentElement = function(g, h) {
                var k = J(h);
                g = e.call(this, g, h);
                k && U(a, h);
                J(g) && S(a, h);
                return g;
            };
        }
        function f(c, e) {
            function g(h, k) {
                for (var l = []; h !== k; h = h.nextSibling) l.push(h);
                for (k = 0; k < l.length; k++) V(a, l[k]);
            }
            c.insertAdjacentHTML = function(h, k) {
                h = h.toLowerCase();
                if ("beforebegin" === h) {
                    var l = this.previousSibling;
                    e.call(this, h, k);
                    g(l || this.parentNode.firstChild, this);
                } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l); else if ("beforeend" === h) l = this.lastChild, 
                e.call(this, h, k), g(l || this.firstChild, null); else if ("afterend" === h) l = this.nextSibling, 
                e.call(this, h, k), g(this.nextSibling, l); else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            };
        }
        y && (Element.prototype.attachShadow = function(c) {
            c = y.call(this, c);
            if (a.j && !c.__CE_patched) {
                c.__CE_patched = !0;
                for (var e = 0; e < a.m.length; e++) a.m[e](c);
            }
            return this.__CE_shadowRoot = c;
        });
        z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ua(a, (function(c) {
            b(c, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    return q.call(this, !0).innerHTML;
                },
                set: function(e) {
                    var g = "template" === this.localName, h = g ? this.content : this, k = p.call(document, this.namespaceURI, this.localName);
                    for (k.innerHTML = e; 0 < h.childNodes.length; ) u.call(h, h.childNodes[0]);
                    for (e = g ? k.content : k; 0 < e.childNodes.length; ) r.call(h, e.childNodes[0]);
                }
            });
        }));
        Element.prototype.setAttribute = function(c, e) {
            if (1 !== this.__CE_state) return B.call(this, c, e);
            var g = A.call(this, c);
            B.call(this, c, e);
            e = A.call(this, c);
            a.attributeChangedCallback(this, c, g, e, null);
        };
        Element.prototype.setAttributeNS = function(c, e, g) {
            if (1 !== this.__CE_state) return F.call(this, c, e, g);
            var h = E.call(this, c, e);
            F.call(this, c, e, g);
            g = E.call(this, c, e);
            a.attributeChangedCallback(this, e, h, g, c);
        };
        Element.prototype.removeAttribute = function(c) {
            if (1 !== this.__CE_state) return C.call(this, c);
            var e = A.call(this, c);
            C.call(this, c);
            null !== e && a.attributeChangedCallback(this, c, e, null, null);
        };
        D && (Element.prototype.toggleAttribute = function(c, e) {
            if (1 !== this.__CE_state) return D.call(this, c, e);
            var g = A.call(this, c), h = null !== g;
            e = D.call(this, c, e);
            h !== e && a.attributeChangedCallback(this, c, g, e ? "" : null, null);
            return e;
        });
        Element.prototype.removeAttributeNS = function(c, e) {
            if (1 !== this.__CE_state) return G.call(this, c, e);
            var g = E.call(this, c, e);
            G.call(this, c, e);
            var h = E.call(this, c, e);
            g !== h && a.attributeChangedCallback(this, e, g, h, c);
        };
        oa ? d(HTMLElement.prototype, oa) : H && d(Element.prototype, H);
        pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);
        Z(a, Element.prototype, {
            prepend: ha,
            append: ia
        });
        Da(a);
    }
    var Fa = {};
    function Ga(a) {
        function b() {
            var d = this.constructor;
            var f = document.__CE_registry.C.get(d);
            if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
            var c = f.constructionStack;
            if (0 === c.length) return c = n.call(document, f.localName), Object.setPrototypeOf(c, d.prototype), 
            c.__CE_state = 1, c.__CE_definition = f, R(a, c), c;
            var e = c.length - 1, g = c[e];
            if (g === Fa) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
            c[e] = Fa;
            Object.setPrototypeOf(g, d.prototype);
            R(a, g);
            return g;
        }
        b.prototype = na.prototype;
        Object.defineProperty(HTMLElement.prototype, "constructor", {
            writable: !0,
            configurable: !0,
            enumerable: !1,
            value: b
        });
        window.HTMLElement = b;
    }
    function Ha(a) {
        function b(d, f) {
            Object.defineProperty(d, "textContent", {
                enumerable: f.enumerable,
                configurable: !0,
                get: f.get,
                set: function(c) {
                    if (this.nodeType === Node.TEXT_NODE) f.set.call(this, c); else {
                        var e = void 0;
                        if (this.firstChild) {
                            var g = this.childNodes, h = g.length;
                            if (0 < h && J(this)) {
                                e = Array(h);
                                for (var k = 0; k < h; k++) e[k] = g[k];
                            }
                        }
                        f.set.call(this, c);
                        if (e) for (c = 0; c < e.length; c++) U(a, e[c]);
                    }
                }
            });
        }
        Node.prototype.insertBefore = function(d, f) {
            if (d instanceof DocumentFragment) {
                var c = K(d);
                d = t.call(this, d, f);
                if (J(this)) for (f = 0; f < c.length; f++) S(a, c[f]);
                return d;
            }
            c = d instanceof Element && J(d);
            f = t.call(this, d, f);
            c && U(a, d);
            J(this) && S(a, d);
            return f;
        };
        Node.prototype.appendChild = function(d) {
            if (d instanceof DocumentFragment) {
                var f = K(d);
                d = r.call(this, d);
                if (J(this)) for (var c = 0; c < f.length; c++) S(a, f[c]);
                return d;
            }
            f = d instanceof Element && J(d);
            c = r.call(this, d);
            f && U(a, d);
            J(this) && S(a, d);
            return c;
        };
        Node.prototype.cloneNode = function(d) {
            d = q.call(this, !!d);
            this.ownerDocument.__CE_registry ? V(a, d) : Q(a, d);
            return d;
        };
        Node.prototype.removeChild = function(d) {
            var f = d instanceof Element && J(d), c = u.call(this, d);
            f && U(a, d);
            return c;
        };
        Node.prototype.replaceChild = function(d, f) {
            if (d instanceof DocumentFragment) {
                var c = K(d);
                d = v.call(this, d, f);
                if (J(this)) for (U(a, f), f = 0; f < c.length; f++) S(a, c[f]);
                return d;
            }
            c = d instanceof Element && J(d);
            var e = v.call(this, d, f), g = J(this);
            g && U(a, f);
            c && U(a, d);
            g && S(a, d);
            return e;
        };
        w && w.get ? b(Node.prototype, w) : ta(a, (function(d) {
            b(d, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    for (var f = [], c = this.firstChild; c; c = c.nextSibling) c.nodeType !== Node.COMMENT_NODE && f.push(c.textContent);
                    return f.join("");
                },
                set: function(f) {
                    for (;this.firstChild; ) u.call(this, this.firstChild);
                    null != f && "" !== f && r.call(this, document.createTextNode(f));
                }
            });
        }));
    }
    var O = window.customElements;
    function Ia() {
        var a = new N;
        Ga(a);
        Ca(a);
        Z(a, DocumentFragment.prototype, {
            prepend: da,
            append: ea
        });
        Ha(a);
        Ea(a);
        window.CustomElementRegistry = Y;
        a = new Y(a);
        document.__CE_registry = a;
        Object.defineProperty(window, "customElements", {
            configurable: !0,
            enumerable: !0,
            value: a
        });
    }
    O && !O.forcePolyfill && "function" == typeof O.define && "function" == typeof O.get || Ia();
    window.__CE_installPolyfill = Ia;
}).call(self);

"use strict";

const PREFIX = "cplus-";

const JSON_NAME = "modeOfUse";

const DEFAULT_VALUE = "noModifications";

const PAGE_HOME = "home";

const PAGE_MODES = "modes";

const PAGE_SETTINGS = "settings";

const PAGE_EDIT_SETTING = "edit-setting";

"use strict";

let filesServiceIsInstantiated;

class FilesService {
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error("FilesService is already instantiated.");
        }
        filesServiceIsInstantiated = true;
    }
    getJSONFile(file) {
        return fetch(chrome.runtime.getURL(`assets/json/${file}.json`)).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        }));
    }
}

"use strict";

let i18nServiceIsInstantiated;

class I18nService {
    locale="en";
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error("I18nService is already instantiated.");
        }
        i18nServiceIsInstantiated = true;
        this.locale = chrome.i18n.getUILanguage();
    }
    getMessage=message => chrome.i18n.getMessage(message);
    translate(root) {
        const elements = root.querySelectorAll("[data-i18n]");
        for (const element of elements) {
            element.innerHTML = this.getMessage(element.dataset?.i18n);
        }
        const elementsTitle = root.querySelectorAll("[data-i18n-title]");
        for (const element of elementsTitle) {
            element.title = this.getMessage(element.dataset?.i18nTitle);
        }
    }
}

"use strict";

let pathServiceIsInstantiated;

class PathService {
    path="";
    constructor() {
        if (pathServiceIsInstantiated) {
            throw new Error("PathService is already instantiated.");
        }
        pathServiceIsInstantiated = true;
        this.path = chrome.runtime.getURL("/");
    }
}

"use strict";

let iconsServiceIsInstantiated;

class IconsService {
    constructor() {
        if (iconsServiceIsInstantiated) {
            throw new Error("IconsService is already instantiated.");
        }
        iconsServiceIsInstantiated = true;
    }
    get path() {
        return "";
    }
    loadSprite(root) {
        fetch(chrome.runtime.getURL("assets/icons/orange-icons-sprite.svg")).then((response => response.text())).then((svg => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = svg;
            wrapper.hidden = true;
            root.insertBefore(wrapper, root.firstChild);
        }));
    }
}

"use strict";

let localStorageServiceIsInstantiated;

class LocalStorageService {
    hostname="";
    tabId;
    constructor() {
        if (localStorageServiceIsInstantiated) {
            throw new Error("LocalStorageService is already instantiated.");
        }
        localStorageServiceIsInstantiated = true;
        this.hostname = window.location.hostname;
        chrome.runtime.sendMessage({
            getTabId: true
        }).then((response => {
            this.tabId = response.tabId;
        })).catch((error => console.error(error)));
    }
    setItem(key, value) {
        chrome.storage.local.set({
            [`${PREFIX}${key}-${this.hostname}`]: value
        });
        chrome.storage.local.set({
            [`latest-${PREFIX}${key}`]: value
        });
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
        if (key === "is-opened" && this.tabId) {
            chrome.storage.local.set({
                [`${PREFIX}${key}-${this.tabId}`]: value
            });
        }
    }
    getItem(key) {
        if (key === "is-opened" && this.tabId) {
            return chrome.storage.local.get([ `${PREFIX}${key}-${this.tabId}` ]).then((datas => {
                if (datas[`${PREFIX}${key}-${this.tabId}`]) {
                    return new Promise(((resolve, reject) => {
                        resolve(datas[`${PREFIX}${key}-${this.tabId}`]);
                        reject(new Error(`Could not get ${PREFIX}${key}-${this.tabId} in storage.`));
                    }));
                }
            }));
        } else {
            return chrome.storage.local.get([ `${PREFIX}${key}-${this.hostname}` ]).then((datas => {
                if (datas[`${PREFIX}${key}-${this.hostname}`]) {
                    return new Promise(((resolve, reject) => {
                        resolve(datas[`${PREFIX}${key}-${this.hostname}`]);
                        reject(new Error(`Could not get ${PREFIX}${key}-${this.hostname} in storage.`));
                    }));
                } else {
                    return chrome.storage.local.get([ `latest-${PREFIX}${key}` ]).then((datas => new Promise(((resolve, reject) => {
                        resolve(datas[`latest-${PREFIX}${key}`]);
                        reject(new Error(`Could not get latest-${PREFIX}${key} in storage.`));
                    }))));
                }
            }));
        }
    }
    removeItem(key) {
        chrome.storage.local.remove([ `${PREFIX}${key}-${this.hostname}` ]);
    }
}

"use strict";

let categoriesServiceIsInstantiated;

class CategoriesService {
    selectedMode;
    settingAccordions=[ {
        name: "app-text",
        open: false
    }, {
        name: "app-layout",
        open: false
    }, {
        name: "app-picture-video",
        open: false
    }, {
        name: "app-sound",
        open: false
    }, {
        name: "app-navigation",
        open: false
    } ];
    constructor() {
        if (categoriesServiceIsInstantiated) {
            throw new Error("CategoriesService is already instantiated.");
        }
        categoriesServiceIsInstantiated = true;
    }
    openCategory=(category, open) => {
        const mainIndex = this.settingAccordions.findIndex((o => o.name === category.toLowerCase()));
        this.settingAccordions[mainIndex].open = open;
    };
    openMainCategory=selectedMode => {
        let mainAccordion;
        if (this.selectedMode !== selectedMode) {
            this.selectedMode = selectedMode;
            switch (selectedMode) {
              case "visionPlus":
                mainAccordion = "app-layout";
                break;

              case "facilePlus":
              default:
                mainAccordion = "app-text";
                break;
            }
            this.settingAccordions = this.settingAccordions.map((accordion => ({
                ...accordion,
                open: accordion.name === mainAccordion
            })));
        }
    };
}

"use strict";

let modeOfUseServiceIsInstantiated;

class ModeOfUseService {
    constructor() {
        if (modeOfUseServiceIsInstantiated) {
            throw new Error("ModeOfUseService is already instantiated.");
        }
        modeOfUseServiceIsInstantiated = true;
    }
    setSelectedMode=newSelectedMode => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.selectedMode = newSelectedMode;
            localStorageServiceInstance.setItem(JSON_NAME, json);
        }));
    };
    getSelectedMode(json) {
        let selectedMode;
        json.modes.forEach((mode => {
            if (Object.entries(mode)[0][0] === json.selectedMode) {
                selectedMode = mode;
            }
        }));
        return JSON.stringify(selectedMode);
    }
    setSettingValue(key, newIndex, newValue) {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(key)));
                    if (setting) {
                        let settingValues = Object.entries(setting)[0][1];
                        if (newValue) {
                            let newValues = settingValues.values.split(",");
                            newValues.length === 4 ? newValues[3] = newValue : newValues.push(newValue);
                            settingValues.values = newValues.toString();
                        }
                        settingValues.valueSelected = newIndex;
                        localStorageServiceInstance.setItem(JSON_NAME, json);
                        jsonIsEdited = true;
                    }
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("Your settings could not be saved.");
            return jsonIsEdited;
        }));
    }
    getCustomValue(settingName) {
        let customValue = "";
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)));
                    customValue = Object.entries(setting)[0][1].values.split(",")[3];
                }
            }));
            return customValue;
        })).catch((error => {
            console.error("The custom value of this setting could not be return.");
            return customValue;
        }));
    }
}

"use strict";

let pauseServiceIsInstantiated;

class PauseService {
    settingsServices=[];
    constructor() {
        if (pauseServiceIsInstantiated) {
            throw new Error("PauseService is already instantiated.");
        }
        pauseServiceIsInstantiated = true;
        this.settingsServices = [ {
            name: "capitalLetters",
            instanceService: capitalLettersServiceInstance.setCapitalLetters.bind(this),
            value: ""
        }, {
            name: "clearlyLinks",
            instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(this),
            value: ""
        }, {
            name: "clickFacilite",
            instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this),
            value: ""
        }, {
            name: "colorContrast",
            instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this),
            value: ""
        }, {
            name: "cursorAspect",
            instanceService: cursorAspectServiceInstance.setCursor.bind(this),
            value: ""
        }, {
            name: "deleteBackgroundImages",
            instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this),
            value: ""
        }, {
            name: "focusAspect",
            instanceService: focusAspectServiceInstance.setFocus.bind(this),
            value: ""
        }, {
            name: "fontFamily",
            instanceService: fontFamilyServiceInstance.setFontFamily.bind(this),
            value: ""
        }, {
            name: "linkStyle",
            instanceService: linkStyleServiceInstance.setLinkStyle.bind(this),
            value: ""
        }, {
            name: "magnifier",
            instanceService: magnifierServiceInstance.setMagnifier.bind(this),
            value: ""
        }, {
            name: "marginAlign",
            instanceService: marginAlignServiceInstance.setMargin.bind(this),
            value: ""
        }, {
            name: "readingGuide",
            instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(this),
            value: ""
        }, {
            name: "scroll",
            instanceService: scrollServiceInstance.setScroll.bind(this),
            value: ""
        }, {
            name: "stopAnimations",
            instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(this),
            value: ""
        }, {
            name: "textSize",
            instanceService: textSizeServiceInstance.setFontSize.bind(this),
            value: ""
        }, {
            name: "textSpacing",
            instanceService: textSpacingServiceInstance.setSpacingText.bind(this),
            value: ""
        } ];
    }
    pauseSettings=currentSettings => {
        const settings = JSON.parse(currentSettings);
        settings.forEach((setting => {
            let settingValues = Object.values(setting)[0];
            this.settingsServices.forEach((settingsService => {
                if (settingsService.name === Object.keys(setting)[0]) {
                    settingsService.value = this.getSelectedValue(settingValues);
                }
                settingsService.instanceService("noModifications");
            }));
        }));
    };
    getSelectedValue=setting => setting.values.split(",")[setting.valueSelected];
    playSettings=() => {
        this.settingsServices.forEach((settingsService => {
            settingsService.instanceService(settingsService.value);
        }));
    };
}

"use strict";

let routeServiceIsInstantiated;

class RouteService {
    currentRoute;
    historyRoute=[];
    toolbar=null;
    routes=[ PAGE_HOME, PAGE_MODES, PAGE_SETTINGS, PAGE_EDIT_SETTING ];
    constructor() {
        if (routeServiceIsInstantiated) {
            throw new Error("RouteService is already instantiated.");
        }
        routeServiceIsInstantiated = true;
    }
    initPages=root => {
        this.toolbar = root;
        return localStorageServiceInstance.getItem("current-route").then((result => {
            if (this.routes.some((route => result === route))) {
                this.navigate(result);
                return result;
            } else {
                this.navigate(PAGE_HOME);
                return PAGE_HOME;
            }
        }));
    };
    navigate=newRoute => {
        if (newRoute !== this.currentRoute) {
            this.routes.forEach((route => {
                if (route === newRoute) {
                    const element = `<app-${route}></app-${route}>`;
                    this.toolbar.insertAdjacentHTML("beforeend", element);
                    const page = this.toolbar.querySelector(`app-${route}`);
                    i18nServiceInstance.translate(page);
                } else if (route === this.currentRoute) {
                    this.toolbar.querySelector(`app-${route}`)?.remove();
                }
            }));
            this.setHistoryAndHeader(newRoute);
            this.currentRoute = newRoute;
            localStorageServiceInstance.setItem("current-route", newRoute);
        }
    };
    setHistoryAndHeader=newRoute => {
        const header = this.toolbar.querySelector("#header");
        switch (newRoute) {
          case PAGE_HOME:
            {
                routeServiceInstance.historyRoute = [];
                header?.setAttribute("data-display", "primary");
                header?.setAttribute("data-page-title", "");
                break;
            }

          case PAGE_SETTINGS:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleSettings");
                header?.setAttribute("data-page-icon", "Settings");
                break;
            }

          case PAGE_EDIT_SETTING:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME, PAGE_SETTINGS ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleEditSetting");
                header?.setAttribute("data-page-icon", "Settings");
                break;
            }

          case PAGE_MODES:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleModes");
                header?.setAttribute("data-page-icon", "");
                break;
            }
        }
    };
}

"use strict";

let capitalLettersServiceIsInstantiated;

class CapitalLettersService {
    constructor() {
        if (capitalLettersServiceIsInstantiated) {
            throw new Error("CapitalLettersService is already instantiated.");
        }
        capitalLettersServiceIsInstantiated = true;
    }
    setCapitalLetters=value => {
        let styleCapitalLetters = "";
        switch (value) {
          case "uppercase":
            styleCapitalLetters = `\n\t\t\t\t*, *::before, *::after {\n\t\t\t\t\ttext-transform: uppercase !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          case "capitalize":
            styleCapitalLetters = `\n\t\t\t\t*, *::before, *::after {\n\t\t\t\t\ttext-transform: capitalize !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          default:
            stylesServiceInstance.removeStyle("capital-letters");
            break;
        }
    };
}

"use strict";

let clearlyLinksServiceIsInstantiated;

class ClearlyLinksService {
    constructor() {
        if (clearlyLinksServiceIsInstantiated) {
            throw new Error("ClearlyLinksService is already instantiated.");
        }
        clearlyLinksServiceIsInstantiated = true;
    }
    setClearlyLinks=value => {
        let styleClearlyLinks = "";
        switch (value) {
          case "bold_underline":
            styleClearlyLinks = `\n\t\t\t\t\ta:any-link {\n\t\t\t\t\t\tfont-weight: bold !important;\n\t\t\t\t\t\ttext-decoration: underline !important;\n\t\t\t\t\t}`;
            stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
            this.resetInverseBorder();
            break;

          case "bold_boxed":
            styleClearlyLinks = `\n\t\t\t\t\ta:any-link {\n\t\t\t\t\t\tfont-weight: bold !important;\n\t\t\t\t\t\tborder: 2px solid black !important;\n\t\t\t\t\t}`;
            stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
            this.applyInverseBorder();
            break;

          default:
            stylesServiceInstance.removeStyle("clearly-links");
            this.resetInverseBorder();
            break;
        }
    };
    applyInverseBorder=() => {
        const elements = document.querySelectorAll("a");
        elements.forEach((element => {
            const bgColor = this.getEffectiveBackgroundColor(element);
            const rgb = bgColor.match(/\d+/g);
            if (rgb) {
                const hex = rgb.map((x => ("0" + parseInt(x).toString(16)).slice(-2))).join("");
                const invertedColor = this.invertedColor(hex);
                element.style.setProperty("border-color", invertedColor, "important");
            }
        }));
    };
    getEffectiveBackgroundColor=element => {
        let currentElement = element;
        while (currentElement) {
            const bgColor = window.getComputedStyle(currentElement).backgroundColor;
            const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);
            if (rgba) {
                const alpha = rgba[4] ? parseFloat(rgba[4]) : 1;
                if (alpha !== 0) {
                    return bgColor;
                }
            }
            currentElement = currentElement.parentElement;
        }
        return "rgb(255, 255, 255)";
    };
    invertedColor=hex => {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const invertedR = 255 - r;
        const invertedG = 255 - g;
        const invertedB = 255 - b;
        const invertedHex = ((1 << 24) + (invertedR << 16) + (invertedG << 8) + invertedB).toString(16).slice(1).toUpperCase();
        return `#${invertedHex}`;
    };
    resetInverseBorder=() => {
        const elements = document.querySelectorAll("a");
        elements.forEach((element => {
            element.style.removeProperty("borderColor");
        }));
    };
}

"use strict";

let clickFaciliteServiceIsInstantiated;

class ClickFaciliteService {
    selectedElt;
    delay;
    isClicking=false;
    clickableElements=[ "A", "INPUT", "SELECT", "OPTION", "TEXTAREA", "LABEL", "BUTTON" ];
    timer=null;
    handlerClickFacilite;
    constructor() {
        if (clickFaciliteServiceIsInstantiated) {
            throw new Error("ClickFaciliteService is already instantiated.");
        }
        clickFaciliteServiceIsInstantiated = true;
        this.handlerClickFacilite = this.createHandlerClickFacilite();
    }
    setClickFacilite=value => {
        let paramName = value.split("_")[0];
        this.delay = Number(value.split("_")[1]) * 1e3;
        switch (paramName) {
          case "bigZone":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "",
                    bigScrollActivated: true
                });
                break;
            }

          case "longClick":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "scrollOnClick",
                    bigScrollActivated: true
                });
                this.longClick();
                break;
            }

          case "autoClick":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "scrollOnClick",
                    bigScrollActivated: true
                });
                this.autoClick();
                break;
            }

          default:
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "",
                    bigScrollActivated: false
                });
                break;
            }
        }
    };
    getClickableElt=event => {
        let pointedElt = event.target;
        let closestPointedElt = pointedElt.closest(this.clickableElements.join(","));
        return this.clickableElements.includes(pointedElt.nodeName) ? pointedElt : closestPointedElt ? closestPointedElt : pointedElt;
    };
    longClick=() => {
        document.addEventListener("click", this.handlerClickFacilite);
        document.addEventListener("mousedown", this.handlerClickFacilite);
        document.addEventListener("mouseup", this.handlerClickFacilite);
    };
    autoClick=() => {
        document.addEventListener("mouseover", this.handlerClickFacilite);
        document.addEventListener("mouseout", this.handlerClickFacilite);
    };
    resetEventClick=() => {
        document.removeEventListener("click", this.handlerClickFacilite);
        document.removeEventListener("mouseover", this.handlerClickFacilite);
        document.removeEventListener("mouseout", this.handlerClickFacilite);
        document.removeEventListener("mousedown", this.handlerClickFacilite);
        document.removeEventListener("mouseup", this.handlerClickFacilite);
    };
    doClick=elt => {
        if (this.clickableElements.includes(elt.nodeName)) {
            switch (elt.nodeName) {
              case "A":
              case "AREA":
                this.clickLink(elt);
                break;

              case "INPUT":
                this.clickInput(elt);
                break;

              case "SELECT":
              case "TEXTAREA":
                elt.focus();
                break;

              case "OPTION":
                this.selectOption(elt);
                break;

              case "LABEL":
                document.getElementById(elt.htmlFor).click();
                break;

              default:
                elt.click();
                break;
            }
        } else if (elt.onclick && elt.onclick !== null) {
            elt.onclick();
        } else {
            elt.click();
        }
    };
    clickLink=elt => {
        if (elt.href && elt.href !== "") {
            window.location = elt.href;
        }
    };
    clickInput=elt => {
        elt.focus();
        switch (elt.type) {
          case "radio":
            elt.checked = true;
            break;

          case "checkbox":
            elt.checked = !elt.checked;
            break;
        }
    };
    selectOption=elt => {
        let options = elt.closest("SELECT")?.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].text === elt.text) {
                options[i].selected = true;
                elt.focus();
            } else {
                options[i].selected = false;
            }
        }
    };
    createHandlerClickFacilite=() => event => {
        switch (event.type) {
          case "click":
            event.preventDefault();
            break;

          case "mousedown":
          case "mouseover":
            this.setTimeoutClick(event);
            break;

          case "mouseup":
          case "mouseout":
            this.clearTimeout();
            break;
        }
    };
    setTimeoutClick=event => {
        this.timer = setTimeout((() => {
            this.doClick(this.getClickableElt(event));
        }), this.delay);
    };
    clearTimeout=() => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
    };
}

"use strict";

let colorContrastServiceIsInstantiated;

class ColorContrastService {
    constructor() {
        if (colorContrastServiceIsInstantiated) {
            throw new Error("ColorContrastService is already instantiated.");
        }
        colorContrastServiceIsInstantiated = true;
    }
    setColorsContrasts=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("color-contrast");
        } else {
            let color = "";
            let backgroundColor = "";
            if (value === "reinforcedContrasts") {
                color = "#000";
                backgroundColor = "#fff";
            } else if (value === "daltonism") {
                color = "#000";
                backgroundColor = "#fff";
            } else {
                color = value.split("_")[0];
                backgroundColor = value.split("_")[1];
            }
            let styleColorContrast = `\n\t\t\t\t\t\t\t* {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t\tbackground-color: ${backgroundColor} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tli a {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tfieldset,\n\t\t\t\t\t\t\tbutton {\n\t\t\t\t\t\t\t\tborder-color: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tinput, td, th {\n\t\t\t\t\t\t\t\tborder: 2px solid ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttd, th {\n\t\t\t\t\t\t\t\tpadding: .2em !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttable {\n\t\t\t\t\t\t\t\tborder-collapse: collapse !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t*:link,\n\t\t\t\t\t\t\t*:visited,\n\t\t\t\t\t\t\t*:hover {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
            stylesServiceInstance.setStyle("color-contrast", styleColorContrast);
        }
    };
}

"use strict";

let colourThemeServiceIsInstantiated;

class ColourThemeService {
    constructor() {
        if (colourThemeServiceIsInstantiated) {
            throw new Error("ColourThemeService is already instantiated.");
        }
        colourThemeServiceIsInstantiated = true;
    }
}

"use strict";

let cursorAspectServiceIsInstantiated;

class CursorAspectService {
    constructor() {
        if (cursorAspectServiceIsInstantiated) {
            throw new Error("CursorAspectService is already instantiated.");
        }
        cursorAspectServiceIsInstantiated = true;
    }
    drawCursor=(type, size, color, strokeWidth) => {
        let path = "";
        switch (type) {
          case "pointer":
            path = "M43.074 4C52.2 4 52.2 13.064 52.2 13.064v52.368-21.653s1.014-9.063 10.14-9.063c9.127 0 10.141 8.56 10.141 8.56v23.666-15.106s2.535-8.056 9.633-8.056c7.099 0 9.126 8.056 9.126 8.056v19.638-9.064s2.029-8.56 10.141-8.56S110 62.41 110 62.41V99.17c-1.014 9.567-11.661 19.806-21.802 23.162-6.084 2.015-31.434 2.015-39.547 1.008-8.112-1.008-19.342-9.463-24.843-20.142C13.967 84.095 6.779 70.803 4.54 64.425c-2.12-6.043 2.535-10.575 4.563-11.582 2.028-1.007 7.099-2.743 13.69 4.028 5.152 5.293 10.647 17.12 10.647 17.12V13.065S33.948 4 43.074 4Z";
            break;

          case "text":
            path = "M14.857 69.158h7.857v39.053c0 4.053-3.442 7.473-7.857 7.473H8.286c-2.844 0-5.286 2.235-5.286 5.158C3 123.765 5.442 126 8.286 126h6.571c5.134 0 9.793-2.029 13.143-5.319 3.35 3.29 8.009 5.319 13.143 5.319h6.571c2.844 0 5.286-2.235 5.286-5.158 0-2.923-2.442-5.158-5.286-5.158h-6.571c-4.415 0-7.857-3.42-7.857-7.473V69.158h7.857c2.843 0 5.286-2.235 5.286-5.158 0-2.923-2.443-5.158-5.286-5.158h-7.857V19.79c0-4.054 3.442-7.474 7.857-7.474h6.571c2.844 0 5.286-2.235 5.286-5.158C53 4.235 50.558 2 47.714 2h-6.571C36.009 2 31.35 4.03 28 7.319 24.65 4.029 19.991 2 14.857 2H8.286C5.442 2 3 4.235 3 7.158c0 2.923 2.442 5.158 5.286 5.158h6.571c4.415 0 7.857 3.42 7.857 7.473v39.053h-7.857c-2.843 0-5.286 2.235-5.286 5.158 0 2.923 2.443 5.158 5.286 5.158Z";
            break;

          case "default":
          default:
            path = "M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z";
            break;
        }
        return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="black" stroke-width="${strokeWidth}"/></svg>`;
    };
    setCursor=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("cursor-aspect");
        } else {
            let color = value.split("_")[1];
            let size = value.split("_")[0] === "big" ? 56 : 128;
            let styleCursor = `\n\t\t\t\t* {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("default", size, color, 10)}') 0 0, default !important;\n\t\t\t\t}\n\n\t\t\t\ta:link,\n\t\t\t\ta:visited,\n\t\t\t\tbutton {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("pointer", size, color, 10)}') ${size / 3} 0, pointer !important;\n\t\t\t\t}\n\n\t\t\t\th1, h2, h3, h4, h5, h6,\n\t\t\t\tp, ul, ol, dl, blockquote,\n\t\t\t\tpre, td, th,\n\t\t\t\tinput, textarea, legend {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("text", size, color, 4)}') ${size / 4} ${size / 4}, text !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("cursor-aspect", styleCursor);
        }
    };
}

"use strict";

let deleteBackgroundImagesServiceIsInstantiated;

class DeleteBackgroundImagesService {
    constructor() {
        if (deleteBackgroundImagesServiceIsInstantiated) {
            throw new Error("DeleteBackgroundImagesService is already instantiated.");
        }
        deleteBackgroundImagesServiceIsInstantiated = true;
    }
    setDeleteBackgroundImages=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("delete-background-images");
        } else {
            let styleDeleteBackgroundImages = `\n\t\t\t\t*, *::before, *::after {\n\t\t\t\t\tbackground-image: none !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("delete-background-images", styleDeleteBackgroundImages);
        }
    };
}

"use strict";

let focusAspectServiceIsInstantiated;

class FocusAspectService {
    constructor() {
        if (focusAspectServiceIsInstantiated) {
            throw new Error("FocusAspectService is already instantiated.");
        }
        focusAspectServiceIsInstantiated = true;
    }
    setFocus=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("focus-aspect");
        } else {
            let size = value.split("_")[0] === "big" ? "4px" : "10px";
            let color = value.split("_")[1];
            let styleFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline: ${color} solid ${size} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("focus-aspect", styleFocus);
        }
    };
}

"use strict";

let fontFamilyServiceIsInstantiated;

class FontFamilyService {
    fontDictionnary=[ {
        name: "Accessible_DfA",
        size: "91.125%",
        folder: "accessibleDfA",
        files: [ {
            name: "AccessibleDfA-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "AccessibleDfA-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "AccessibleDfA-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "B612_Mono",
        size: "75%",
        folder: "B612",
        files: [ {
            name: "B612Mono-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "B612Mono-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "B612Mono-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "B612Mono-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Comic Sans MS",
        size: "100%",
        folder: "comic",
        files: [ {
            name: "comic-Sans-MS.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Lexand Deca",
        size: "92%",
        folder: "lexendDeca",
        files: [ {
            name: "LexendDeca-Black.woff2",
            style: "normal",
            weight: "900"
        }, {
            name: "LexendDeca-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "LexendDeca-ExtraBold.woff2",
            style: "normal",
            weight: "800"
        }, {
            name: "LexendDeca-ExtraLight.woff2",
            style: "normal",
            weight: "200"
        }, {
            name: "LexendDeca-Light.woff2",
            style: "normal",
            weight: "300"
        }, {
            name: "LexendDeca-Medium.woff2",
            style: "normal",
            weight: "500"
        }, {
            name: "LexendDeca-Regular.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "LexendDeca-SemiBold.woff2",
            style: "normal",
            weight: "600"
        }, {
            name: "LexendDeca-Thin.woff2",
            style: "normal",
            weight: "100"
        } ]
    }, {
        name: "Luciole",
        size: "87.5%",
        folder: "luciole",
        files: [ {
            name: "Luciole-Bold-Italic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "Luciole-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "Luciole-Regular-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "Luciole-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Sylexiad Sans",
        size: "125%",
        folder: "sylexiadSans",
        files: [ {
            name: "SylexiadSansMedium-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansMedium-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansMedium-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansMedium.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedMed-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedMed-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedMed-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedMed.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedThin-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedThin-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedThin-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedThin.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansThin-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansThin-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansThin-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansThin.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Verdana",
        size: "87.5%",
        folder: "verdana",
        files: [ {
            name: "Verdana-Bold-Italic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "Verdana-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "Verdana-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "Verdana.woff2",
            style: "normal",
            weight: "400"
        } ]
    } ];
    constructor() {
        if (fontFamilyServiceIsInstantiated) {
            throw new Error("FontFamilyService is already instantiated.");
        }
        fontFamilyServiceIsInstantiated = true;
        const fontFaceList = [];
        this.fontDictionnary.forEach((font => {
            for (const file of font.files) {
                fontFaceList.push(`\n\t\t\t\t\t@font-face {\n\t\t\t\t\t\tfont-family:"${font.name}";\n\t\t\t\t\t\tsrc: local("${font.name}"), url("${appPath}assets/fonts/${font.folder}/${file.name}");\n\t\t\t\t\t\tfont-style: ${file.style};\n\t\t\t\t\t\tfont-weight: ${file.weight};\n\t\t\t\t\t\tfont-display: swap;\n\t\t\t\t\t\tsize-adjust: ${font.size};\n\t\t\t\t\t}`);
            }
        }));
        stylesServiceInstance.setStyle("font-family", fontFaceList.join(""));
    }
    setFontFamily=value => {
        if (value === DEFAULT_VALUE) {
            document.body.style.fontFamily = null;
        } else {
            document.body.style.fontFamily = value;
        }
    };
}

"use strict";

let linkStyleServiceIsInstantiated;

class LinkStyleService {
    constructor() {
        if (linkStyleServiceIsInstantiated) {
            throw new Error("LinkStyleService is already instantiated.");
        }
        linkStyleServiceIsInstantiated = true;
    }
    setLinkStyle=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("link");
        } else {
            let linkColor = value.split("_")[0];
            let linkPointedColor = value.split("_")[1];
            let linkVisitedColor = value.split("_")[2];
            let styleLink = `\n\t\t\t\ta:link {\n\t\t\t\t\tcolor: ${linkColor} !important;\n\t\t\t\t}\n\t\t\t\ta:visited {\n\t\t\t\t\tcolor: ${linkVisitedColor} !important;\n\t\t\t\t}\n\t\t\t\ta:active, a:hover, a:focus {\n\t\t\t\t\tcolor: ${linkPointedColor} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("link", styleLink);
        }
    };
}

"use strict";

let magnifierServiceIsInstantiated;

class MagnifierService {
    shape;
    zoom;
    handler;
    magnifierWidth=300;
    magnifierHeight=300;
    ofs_x;
    ofs_y;
    pos_x;
    pos_y;
    magnifier;
    magnifierContent;
    magnifierBody;
    observerObj;
    syncTimeout;
    styleMagnifier=`\n\t\t#${PREFIX}magnifier {\n\t\t\tbackground-color: white;\n\t\t\tborder: 1px solid black;\n\t\t\tborder-radius: 0.5rem;\n\t\t\twidth: ${this.magnifierWidth}px;\n\t\t\theight: ${this.magnifierHeight}px;\n\t\t\tposition: fixed;\n\t\t\toverflow: hidden;\n\t\t\tz-index: 2147483645;\n\t\t}\n\n\t\t#${PREFIX}magnifier-content {\n\t\t\tdisplay: block;\n\t\t\tmargin-left: 0;\n\t\t\tmargin-top: 0;\n\t\t\tpadding-top: 0;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\toverflow: visible;\n\t\t\ttransform-origin: left top;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t#${PREFIX}magnifier-glass {\n\t\t\tbackground-color: white;\n\t\t\topacity: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tcursor: move;\n\t\t}\n\t`;
    constructor() {
        if (magnifierServiceIsInstantiated) {
            throw new Error("MagnifierService is already instantiated.");
        }
        magnifierServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setMagnifier=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle("magnifier");
            document.querySelector(`#${PREFIX}magnifier`)?.remove();
            this.unBindDOMObserver();
        } else {
            stylesServiceInstance.setStyle("magnifier", this.styleMagnifier);
            this.shape = value.split("_")[0];
            this.zoom = Number(value.split("_")[1]);
            this.initMagnifier();
        }
    };
    initMagnifier=() => {
        if (!document.querySelector(`#${PREFIX}magnifier`)) {
            this.setMagnifierElements();
        }
        this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
        this.magnifierContent = document.querySelector(`#${PREFIX}magnifier-content`);
        window.addEventListener("resize", this.handler, false);
        window.addEventListener("scroll", this.handler, true);
        window.addEventListener("scrollend", this.handler, true);
        this.setShapeAndZoom();
        this.makeDraggable();
        this.setPosition(this.magnifier, 250, 250);
        this.syncContent();
        this.bindDOMObserver();
    };
    setMagnifierElements=() => {
        let fragment = document.createDocumentFragment();
        const magnifier = document.createElement("div");
        const magnifierContent = document.createElement("div");
        const magnifierGlass = document.createElement("div");
        magnifier.setAttribute("id", `${PREFIX}magnifier`);
        magnifierContent.setAttribute("id", `${PREFIX}magnifier-content`);
        magnifierGlass.setAttribute("id", `${PREFIX}magnifier-glass`);
        magnifier.appendChild(magnifierContent);
        magnifier.appendChild(magnifierGlass);
        fragment.appendChild(magnifier);
        document.body.appendChild(fragment);
    };
    setShapeAndZoom=() => {
        switch (this.shape) {
          case "square":
            this.magnifier.style.borderRadius = null;
            break;

          case "circle":
            this.magnifier.style.borderRadius = "50%";
            break;
        }
        this.magnifierContent.style.transform = `scale(${this.zoom})`;
    };
    setPosition=(element, left, top) => {
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    };
    syncContent=() => {
        this.prepareContent();
        this.syncViewport();
        this.syncScrollBars();
    };
    prepareContent=() => {
        this.magnifierContent.innerHTML = "";
        const bodyOriginal = document.body;
        const bodyCopy = bodyOriginal.cloneNode(true);
        const color = bodyOriginal.style.backgroundColor;
        if (color) {
            this.magnifier.style.backgroundColor = color;
        }
        bodyCopy.style.cursor = "auto";
        bodyCopy.style.paddingTop = "0px";
        bodyCopy.style.position = "relative";
        bodyCopy.setAttribute("unselectable", "on");
        const canvasOriginal = bodyOriginal.querySelectorAll("canvas");
        const canvasCopy = bodyCopy.querySelectorAll("canvas");
        if (canvasOriginal.length > 0 && canvasOriginal.length === canvasCopy.length) {
            for (let i = 0; i < canvasOriginal.length; i++) {
                let ctx = canvasCopy[i].getContext("2d");
                try {
                    ctx?.drawImage(canvasOriginal[i], 0, 0);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        this.removeSelectors(bodyCopy, "script");
        this.removeSelectors(bodyCopy, "audio");
        this.removeSelectors(bodyCopy, "video");
        this.removeSelectors(bodyCopy, `app-root`);
        this.removeSelectors(bodyCopy, `#${PREFIX}magnifier`);
        this.magnifierContent.appendChild(bodyCopy);
        this.magnifierContent.style.width = `${document.body.clientWidth}px`;
        this.magnifierContent.style.height = `${document.body.clientHeight}px`;
        this.magnifierBody = this.magnifierContent.querySelector("body");
        this.magnifier?.classList.add(`${PREFIX}magnifier-ignore-class`);
        this.magnifierContent?.classList.add(`${PREFIX}magnifier-ignore-class`);
        this.magnifierBody?.classList.add(`${PREFIX}magnifier-ignore-class`);
        const bodyCopyElements = this.magnifierBody.querySelectorAll("*");
        bodyCopyElements.forEach((element => {
            element.classList.add(`${PREFIX}magnifier-ignore-class`);
        }));
    };
    syncViewport=() => {
        const x1 = this.magnifier?.offsetLeft;
        const y1 = this.magnifier?.offsetTop;
        const x2 = document.body.scrollLeft;
        const y2 = document.body.scrollTop;
        const left = -x1 * this.zoom - x2 * this.zoom - this.magnifierWidth / 2;
        const top = -y1 * this.zoom - y2 * this.zoom - this.magnifierHeight / 2;
        this.setPosition(this.magnifierContent, left, top);
    };
    syncScrollBars=() => {
        if (this.magnifierBody !== null) {
            const x2 = window.scrollX || document.documentElement.scrollLeft;
            const y2 = window.scrollY || document.documentElement.scrollTop;
            this.setPosition(this.magnifierBody, -x2, -y2);
        }
    };
    stopSyncScrollBars=() => {
        if (this.magnifierBody !== null) {
            this.magnifierBody = null;
        }
        if (this.magnifier !== null) {
            this.magnifier = null;
        }
    };
    removeSelectors=(container, selector) => {
        const elements = container.querySelectorAll(selector);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].parentNode?.removeChild(elements[i]);
            }
        }
    };
    syncContentQueued=() => {
        window.clearTimeout(this.syncTimeout);
        this.syncTimeout = window.setTimeout(this.syncContent.bind(this), 100);
    };
    domChanged=() => {
        this.syncContentQueued();
    };
    unBindDOMObserver=() => {
        if (this.observerObj) {
            this.observerObj.disconnect();
            this.observerObj = null;
        }
    };
    bindDOMObserver=() => {
        this.observerObj = new MutationObserver((mutations => {
            for (let i = 0; i < mutations.length; i++) {
                this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
                if (!mutations[i].target?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`) && !mutations[i].target?.firstChild?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`)) {
                    this.domChanged();
                }
            }
        }));
        this.observerObj.observe(document, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [ "class", "width", "height", "style" ],
            attributeOldValue: true,
            characterDataOldValue: true
        });
    };
    makeDraggable=() => {
        this.magnifier.style.cursor = "move";
        this.magnifier.addEventListener("pointerdown", this.handler);
        this.magnifier.addEventListener("pointermove", this.handler);
        this.magnifier.addEventListener("pointerup", this.handler);
    };
    downHandler=event => {
        this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
        const pageX = event.pageX || event.touches && event.touches[0].pageX;
        const pageY = event.pageY || event.touches && event.touches[0].pageY;
        this.ofs_x = this.magnifier.getBoundingClientRect().left - this.magnifier.offsetLeft;
        this.ofs_y = this.magnifier.getBoundingClientRect().top - this.magnifier.offsetTop;
        this.pos_x = pageX - (this.magnifier.getBoundingClientRect().left + window.scrollX || document.documentElement.scrollLeft);
        this.pos_y = pageY - (this.magnifier.getBoundingClientRect().top + window.scrollY || document.documentElement.scrollTop);
        event.preventDefault();
    };
    moveHandler=event => {
        if (this.magnifier !== null) {
            const pageX = event.pageX || event.touches && event.touches[0].pageX;
            const pageY = event.pageY || event.touches && event.touches[0].pageY;
            const left = pageX - this.pos_x - this.ofs_x - (window.scrollX || document.documentElement.scrollLeft);
            const top = pageY - this.pos_y - this.ofs_y - (window.scrollY || document.documentElement.scrollTop);
            this.setPosition(this.magnifier, left, top);
            this.syncViewport();
        }
    };
    upHandler=() => {
        if (this.magnifier !== null) {
            this.magnifier = null;
        }
    };
    resizeWindow=() => {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout((() => {
            this.stopSyncScrollBars();
            return;
        }), 100);
        this.syncContent();
    };
    createHandler=() => event => {
        switch (event.type) {
          case "resize":
            this.magnifierBody = this.magnifierContent.querySelector("body");
            this.resizeWindow();
            break;

          case "scroll":
            this.magnifierBody = this.magnifierContent.querySelector("body");
            this.syncScrollBars();
            break;

          case "scrollend":
            this.stopSyncScrollBars();
            break;

          case "pointerdown":
            this.downHandler(event);
            break;

          case "pointermove":
            this.moveHandler(event);
            break;

          case "pointerup":
            this.upHandler();
            break;
        }
    };
}

"use strict";

let marginAlignServiceIsInstantiated;

class MarginAlignService {
    constructor() {
        if (marginAlignServiceIsInstantiated) {
            throw new Error("MarginAlignService is already instantiated.");
        }
        marginAlignServiceIsInstantiated = true;
    }
    setMargin=value => {
        const elements = value === "margeList" ? document.querySelectorAll("ul, ol") : document.body.querySelectorAll("*");
        elements.forEach((elt => {
            const element = elt;
            switch (value) {
              case "alignLeft":
                {
                    element.style.textAlign = "left";
                    break;
                }

              case "marginLeft":
                {
                    element.style.textAlign = "left";
                    element.style.marginLeft = "40px";
                    break;
                }

              case "margeList":
                {
                    element.style.listStylePosition = "initial";
                    element.style.listStyleImage = "none";
                    element.style.listStyleType = "decimal";
                    break;
                }

              default:
                {
                    element.style.textAlign = null;
                    element.style.marginLeft = null;
                    element.style.listStylePosition = null;
                    element.style.listStyleImage = null;
                    element.style.listStyleType = null;
                    break;
                }
            }
        }));
    };
}

"use strict";

let navigationAutoServiceIsInstantiated;

class NavigationAutoService {
    constructor() {
        if (navigationAutoServiceIsInstantiated) {
            throw new Error("NavigationAutoService is already instantiated.");
        }
        navigationAutoServiceIsInstantiated = true;
    }
}

"use strict";

let navigationButtonsServiceIsInstantiated;

class NavigationButtonsService {
    constructor() {
        if (navigationButtonsServiceIsInstantiated) {
            throw new Error("NavigationButtonsService is already instantiated.");
        }
        navigationButtonsServiceIsInstantiated = true;
    }
}

"use strict";

let readAloudServiceIsInstantiated;

class ReadAloudService {
    handler;
    tooltipReadAloud;
    scriptsElements;
    confortPlusElement;
    readAloudTooltipId=`${PREFIX}read-aloud-tooltip`;
    readAloudSpan=`${PREFIX}read-aloud-span`;
    readAloudPreventFlexbox=`${PREFIX}read-aloud-prevent-flexbox`;
    regexWord=/\S+\s*[.,!?]*/g;
    regexSentence=/[^\.!\?]+[\.!\?]+["']?|.+$/g;
    classReadAloud=`\n\t#${this.readAloudTooltipId} {\n\t\tposition: fixed;\n\t\tbackground-color: rgba(0, 0, 0, 0.7);\n\t\tcolor: white;\n\t\twidth: fit-content;\n\t\tpadding: 1rem;\n\t\tpointer-events: none;\n\t\ttransform: translate(0%, 75%);\n\t\tz-index: 2147483645;\n\t}\n\n\t.${this.readAloudPreventFlexbox} {\n\t\twhite-space: pre-wrap;\n\t}`;
    constructor() {
        if (readAloudServiceIsInstantiated) {
            throw new Error("ReadAloudService is already instantiated.");
        }
        readAloudServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setReadAloud=value => {
        this.resetBody();
        if (value === "noModifications") {
            this.resetReadAloud();
        } else {
            switch (value) {
              case "word":
                this.setBodyToSpeech(this.regexWord);
                break;

              case "sentence":
                this.setBodyToSpeech(this.regexSentence);
                break;

              default:
                break;
            }
            this.setTooltip();
            document.addEventListener("pointerdown", this.handler);
            document.addEventListener("keydown", this.handler);
            document.addEventListener("contextmenu", this.handler);
        }
    };
    setTooltip=() => {
        const fragment = document.createDocumentFragment();
        const tooltip = document.createElement("div");
        tooltip.setAttribute("id", this.readAloudTooltipId);
        tooltip.textContent = i18nServiceInstance.getMessage("readAloudTooltip");
        fragment.appendChild(tooltip);
        document.body.insertBefore(fragment, document.body.firstChild);
        stylesServiceInstance.setStyle("read-aloud", this.classReadAloud);
        this.tooltipReadAloud = document.querySelector(`#${this.readAloudTooltipId}`);
        document.addEventListener("pointermove", this.handler);
    };
    setBodyToSpeech=regex => {
        const elements = document.body.querySelectorAll(":not(script):not(app-root)");
        elements.forEach((element => {
            let newNodes = [];
            element.childNodes.forEach((node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0) {
                    const items = node.textContent.trim().match(regex);
                    if (items?.length > 0) {
                        const template = document.createElement("template");
                        items?.forEach((item => {
                            const span = document.createElement("span");
                            span.classList.add(this.readAloudSpan);
                            span.innerText = item.trim() + " ";
                            template.content.appendChild(span);
                        }));
                        newNodes.push(...template.content.childNodes);
                    } else {
                        newNodes.push(node);
                    }
                } else if (node.nodeType !== Node.TEXT_NODE) {
                    newNodes.push(node);
                }
            }));
            element.innerHTML = "";
            newNodes.forEach((node => {
                element.appendChild(node);
            }));
            this.addClassForSpecificCase(element);
        }));
    };
    addClassForSpecificCase=element => {
        const style = window.getComputedStyle(element);
        if (style.display === "flex" || style.display === "inline-flex") {
            element.classList.add(this.readAloudPreventFlexbox);
        }
    };
    resetBody=() => {
        this.tooltipReadAloud?.remove();
        const elements = Array.from(document.body.querySelectorAll(":not(script):not(app-root)"));
        const parser = new DOMParser;
        elements.forEach((element => {
            element.classList.remove(this.readAloudPreventFlexbox);
            let newChilds = document.createDocumentFragment();
            let textChilds = "";
            Array.from(element.childNodes).forEach((child => {
                if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains(this.readAloudSpan)) {
                    textChilds += child.innerHTML.trim() + " ";
                    if (!(child.nextSibling && child.nextSibling.nodeType === Node.ELEMENT_NODE && child.nextSibling.classList.contains(this.readAloudSpan))) {
                        let decodedText = parser.parseFromString(textChilds, "text/html").documentElement.textContent;
                        let textNode = document.createTextNode(decodedText);
                        newChilds.appendChild(textNode);
                        textChilds = "";
                    }
                } else if (!(child.nodeType === Node.TEXT_NODE && child.textContent.trim().length < 1)) {
                    newChilds.appendChild(child);
                }
            }));
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(newChilds);
        }));
    };
    resetReadAloud=() => {
        stylesServiceInstance.removeStyle("read-aloud");
        document.removeEventListener("pointermove", this.handler);
        document.removeEventListener("pointerdown", this.handler);
        document.removeEventListener("keydown", this.handler);
        document.removeEventListener("contextmenu", this.handler);
    };
    downHandler=event => {
        let textToSpeech = new SpeechSynthesisUtterance(event.target.innerText);
        speechSynthesis.speak(textToSpeech);
    };
    stopReadAloud=() => {
        speechSynthesis.cancel();
    };
    createHandler=() => event => {
        switch (event.type) {
          case "pointermove":
            this.tooltipReadAloud.style.left = `${event.pageX}px`;
            this.tooltipReadAloud.style.top = `${event.pageY}px`;
            break;

          case "pointerdown":
            this.downHandler(event);
            break;

          case "keydown":
            if (event.key === "Escape" || event.key === "Esc") {
                this.stopReadAloud();
            }
            break;

          case "contextmenu":
            this.stopReadAloud();
            break;
        }
    };
}

"use strict";

let readingGuideServiceIsInstantiated;

class ReadingGuideService {
    topGuideElt=null;
    bottomGuideElt=null;
    readingGuideElt=null;
    guideType="";
    sizeGuide=40;
    handlerReadingGuide;
    classRuleGuide=`\n\t\t#${PREFIX}vertical-guide-elt {\n\t\t\tborder-left: 4px solid black;\n\t\t\tbackground: white;\n\t\t\theight: 100%;\n\t\t\twidth: 6px;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#${PREFIX}mask-guide--top-elt,\n\t\t#${PREFIX}mask-guide--bottom-elt {\n\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t\t#${PREFIX}mask-guide--top-elt {\n\t\t\ttop: 0;\n\t\t}\n\t\t#${PREFIX}mask-guide--bottom-elt {\n\t\t\tbottom: 0;\n\t\t}\n\t`;
    constructor() {
        if (readingGuideServiceIsInstantiated) {
            throw new Error("ReadingGuideService is already instantiated.");
        }
        readingGuideServiceIsInstantiated = true;
        this.readingGuideElt = document.querySelector(`#${PREFIX}vertical-guide-elt`);
        this.topGuideElt = document.querySelector(`#${PREFIX}top-guide-elt`);
        this.bottomGuideElt = document.querySelector(`#${PREFIX}bottom-guide-elt`);
        this.handlerReadingGuide = this.createHandlerReadingGuide();
    }
    setReadingMaskGuide=value => {
        switch (value) {
          case "ruleGuide":
            {
                this.resetGuide();
                this.guideType = "rule";
                this.setGuide();
                break;
            }

          case "maskGuide":
            {
                this.resetGuide();
                this.guideType = "mask";
                this.setGuide();
                break;
            }

          default:
            {
                this.resetGuide();
            }
        }
    };
    setGuide=() => {
        let styleGuide = "";
        if (this.guideType === "rule") {
            styleGuide = this.classRuleGuide;
        } else if (this.guideType === "mask") {
            styleGuide = this.classMaskGuide;
        }
        stylesServiceInstance.setStyle("reading-guide", styleGuide);
        if (this.guideType === "rule") {
            const readingElt = document.createElement("div");
            readingElt.setAttribute("id", `${PREFIX}vertical-guide-elt`);
            document.body.appendChild(readingElt);
        } else if (this.guideType === "mask") {
            const maskTopElt = document.createElement("div");
            const maskBottomElt = document.createElement("div");
            maskTopElt.setAttribute("id", `${PREFIX}mask-guide--top-elt`);
            maskBottomElt.setAttribute("id", `${PREFIX}mask-guide--bottom-elt`);
            document.body.appendChild(maskTopElt);
            document.body.appendChild(maskBottomElt);
        }
        document.addEventListener("mousemove", this.handlerReadingGuide);
    };
    resetGuide=() => {
        this.guideType = "";
        stylesServiceInstance.removeStyle("reading-guide");
        document.querySelector(`#${PREFIX}vertical-guide-elt`)?.remove();
        document.querySelector(`#${PREFIX}mask-guide--top-elt`)?.remove();
        document.querySelector(`#${PREFIX}mask-guide--bottom-elt`)?.remove();
    };
    createHandlerReadingGuide=() => event => {
        if (event.type === "mousemove") {
            if (this.guideType === "rule") {
                document.querySelector(`#${PREFIX}vertical-guide-elt`).style.left = `${event.x + 2}px`;
            } else if (this.guideType === "mask") {
                document.querySelector(`#${PREFIX}mask-guide--top-elt`).style.height = `${event.y - this.sizeGuide}px`;
                document.querySelector(`#${PREFIX}mask-guide--bottom-elt`).style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        }
    };
}

"use strict";

let scrollServiceIsInstantiated;

class ScrollService {
    btnScrollUp=null;
    btnScrollDown=null;
    btnState="";
    bigScrollActivated=false;
    scrollSteps=10;
    scrollTimer=50;
    settingsValues=[];
    constructor() {
        if (scrollServiceIsInstantiated) {
            throw new Error("ScrollService is already instantiated.");
        }
        scrollServiceIsInstantiated = true;
        this.setScrollClass();
    }
    setScrollClass=() => {
        let styleScroll = `\n\t\t\t#${PREFIX}container-scroll-buttons {\n\t\t\t\tdisplay: flex;\n\t\t\t\tgap: 1rem;\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 1rem;\n\t\t\t\tright: 1rem;\n\t\t\t\tz-index: 2147483647;\n\t\t\t}\n\n\t\t\t#${PREFIX}container-scroll-buttons button {\n\t\t\t\tbackground: #f16e00;\n\t\t\t\tcolor: #000;\n\t\t\t\tborder: none;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tpadding: 1rem 2rem;\n\t\t\t}\n\t\t\t.d-none {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t/* WebKit (Chrome, Safari) */\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar {\n\t\t\t\t\twidth: 2rem;\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: lightgrey;\n\t\t\t\tborder-radius: 1.75rem\n\t\t\t\twidth: 2rem;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground-color: grey;\n\t\t\t}\n\n\t\t\t/* Firefox */\n\t\t\t.${PREFIX}big-scroll,\n\t\t\t.${PREFIX}big-scroll * {\n\t\t\t\tscrollbar-width: auto;\n\t\t\t\tscrollbar-color: lightgrey transparent;\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll:hover,\n\t\t\t.${PREFIX}big-scroll *:hover {\n\t\t\t\tscrollbar-color: grey transparent;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("scroll", styleScroll);
    };
    setScroll=value => {
        let bigScroll;
        let btnState;
        if (value === DEFAULT_VALUE) {
            bigScroll = false;
            btnState = "";
        } else if (value === "bigScroll") {
            bigScroll = true;
            btnState = "";
        } else {
            bigScroll = false;
            btnState = value;
        }
        const scrollSettingValues = {
            name: "scroll",
            btnState: btnState,
            bigScrollActivated: bigScroll
        };
        this.setScrollParams(scrollSettingValues);
    };
    setScrollParams=values => {
        const existingIndex = this.settingsValues.findIndex((item => item.name === values.name));
        if (existingIndex >= 0) {
            this.settingsValues[existingIndex] = values;
        } else {
            this.settingsValues.push(values);
        }
        this.calculatePriority(values);
        this.setBigScroll();
        this.setBtnScroll();
    };
    calculatePriority=values => {
        let tmpBigScroll = false;
        let tmpBtnState = "";
        for (let setting of this.settingsValues) {
            tmpBigScroll = Boolean(tmpBigScroll || setting.bigScrollActivated);
            tmpBtnState = setting.btnState ? setting.btnState : tmpBtnState;
        }
        this.bigScrollActivated = tmpBigScroll;
        this.btnState = tmpBtnState;
    };
    setBigScroll=() => {
        if (this.bigScrollActivated) {
            document.body.classList.add(`${PREFIX}big-scroll`);
        } else {
            document.body.classList.remove(`${PREFIX}big-scroll`);
        }
    };
    setBtnScroll=() => {
        document.querySelector(`#${PREFIX}container-scroll-buttons`)?.remove();
        if (this.btnState) {
            let intervalUp;
            let intervalDown;
            const btnArray = [ {
                id: `${PREFIX}scroll-up`,
                label: i18nServiceInstance.getMessage("scrollUp"),
                element: this.btnScrollUp,
                interval: intervalUp
            }, {
                id: `${PREFIX}scroll-down`,
                label: i18nServiceInstance.getMessage("scrollDown"),
                element: this.btnScrollDown,
                interval: intervalDown
            } ];
            let fragment = document.createDocumentFragment();
            const container = document.createElement("div");
            container.setAttribute("id", `${PREFIX}container-scroll-buttons`);
            btnArray.forEach((button => {
                let btn = document.createElement("button");
                btn.setAttribute("id", button.id);
                btn.type = "button";
                btn.innerHTML = button.label;
                container.appendChild(btn);
                fragment.appendChild(container);
                document.body.appendChild(fragment);
                button.element = document.querySelector(`#${button.id}`);
                let scrollDir = button.id.includes("up") ? -1 : button.id.includes("down") ? 1 : 0;
                let scrollBy = scrollDir * this.scrollSteps;
                if (this.btnState === "scrollOnMouseover") {
                    button.element?.addEventListener("mouseover", (event => {
                        button.interval = setInterval((function() {
                            window.scrollBy(0, scrollBy);
                        }), this.scrollTimer);
                    }));
                    button.element?.addEventListener("mouseleave", (event => {
                        clearInterval(button.interval);
                    }));
                } else {
                    button.element?.addEventListener("click", (event => {
                        window.scrollBy(0, scrollBy);
                    }));
                }
            }));
        }
    };
}

"use strict";

let skipToContentServiceIsInstantiated;

class SkipToContentService {
    constructor() {
        if (skipToContentServiceIsInstantiated) {
            throw new Error("SkipToContentService is already instantiated.");
        }
        skipToContentServiceIsInstantiated = true;
    }
}

"use strict";

let stopAnimationsServiceIsInstantiated;

class StopAnimationsService {
    constructor() {
        if (stopAnimationsServiceIsInstantiated) {
            throw new Error("StopAnimationsService is already instantiated.");
        }
        stopAnimationsServiceIsInstantiated = true;
    }
    styleStopAnimations=`\n\t\t*, *::before, *::after {\n\t\t\tanimation: none !important;\n\t\t\tanimation-fill-mode: forwards !important;\n\t\t\ttransition: none !important;\n\t\t\ttransition-duration: 0.00001s !important;\n\t\t}\n\t`;
    setStopAnimations=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("stop-animations");
            this.unFreezeAllAnimations();
        } else {
            stylesServiceInstance.setStyle("stop-animations", this.styleStopAnimations);
            this.freezeAllAnimations();
        }
    };
    freezeAnimation=img => {
        const width = img.width;
        const height = img.height;
        const alt = img.alt;
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.title = alt;
        canvas.classList.add(`${PREFIX}freeze-animation--canvas`);
        canvas.setAttribute("aria-hidden", "true");
        img.classList.add(`${PREFIX}freeze-animation--img`);
        let freeze = () => {
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            canvas.style.position = "absolute";
            img.parentNode.insertBefore(canvas, img);
            img.style.opacity = 0;
        };
        if (img.complete) {
            freeze();
        } else {
            img.addEventListener("load", freeze, true);
        }
    };
    freezeAllAnimations=() => {
        document.querySelectorAll('img:is([src$=".gif"], [src$=".png"], [src$=".webp"], [src$=".avif"])').forEach((img => {
            this.freezeAnimation(img);
        }));
    };
    unFreezeAllAnimations=() => {
        document.querySelectorAll(`.${PREFIX}freeze-animation--canvas`).forEach((canvas => {
            canvas.remove();
        }));
        document.querySelectorAll(`.${PREFIX}freeze-animation--img`).forEach((img => {
            img.style.opacity = 1;
        }));
    };
}

"use strict";

let textSizeServiceIsInstantiated;

class TextSizeService {
    constructor() {
        if (textSizeServiceIsInstantiated) {
            throw new Error("TextSizeService is already instantiated.");
        }
        textSizeServiceIsInstantiated = true;
    }
    setFontSize=value => {
        if (value === DEFAULT_VALUE) {
            document.documentElement.style.fontSize = null;
        } else {
            document.documentElement.style.fontSize = `${value}%`;
        }
    };
}

"use strict";

let textSpacingServiceIsInstantiated;

class TextSpacingService {
    constructor() {
        if (textSpacingServiceIsInstantiated) {
            throw new Error("TextSpacingService is already instantiated.");
        }
        textSpacingServiceIsInstantiated = true;
    }
    setSpacingText=value => {
        const spacingTextValues = [ {
            name: "spacingTextLabelSmall",
            wordSpacing: ".10em",
            lineHeight: "2em",
            letterSpacing: ".0625em"
        }, {
            name: "spacingTextLabelBig",
            wordSpacing: ".25em",
            lineHeight: "2.5em",
            letterSpacing: ".25em"
        }, {
            name: "spacingTextLabelHuge",
            wordSpacing: ".5em",
            lineHeight: "3em",
            letterSpacing: ".5em"
        } ];
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("text-spacing");
        } else {
            let objSpacingText = spacingTextValues?.find((o => o.name === value));
            let styleSpacingText = `\n\t\t\t\t* {\n\t\t\t\t\tword-spacing: ${objSpacingText.wordSpacing} !important;\n\t\t\t\t\tline-height: ${objSpacingText.lineHeight} !important;\n\t\t\t\t\tletter-spacing: ${objSpacingText.letterSpacing} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("text-spacing", styleSpacingText);
        }
    };
}

"use strict";

let stringServiceIsInstantiated;

class StringService {
    constructor() {
        if (stringServiceIsInstantiated) {
            throw new Error("StringService is already instantiated.");
        }
        stringServiceIsInstantiated = true;
    }
    normalizeID(string) {
        return string?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").split("-").join("");
    }
    normalizeSettingName(string) {
        return string?.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace("app-", "").normalize("NFD").replace(/[\u0300-\u036f\s]/g, "");
    }
    normalizeSettingCamelCase(string) {
        return string?.replace("app-", "").normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").replace(/-./g, (x => x[1].toUpperCase()));
    }
}

"use strict";

let stylesServiceIsInstantiated;

class StylesService {
    prefixStyle=`${PREFIX}style-`;
    constructor() {
        if (stylesServiceIsInstantiated) {
            throw new Error("StylesService is already instantiated.");
        }
        stylesServiceIsInstantiated = true;
    }
    setStyle=(name, style) => {
        if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
            let styleElement = document.createElement("style");
            styleElement.setAttribute("id", `${this.prefixStyle}${name}`);
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        } else {
            document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
        }
    };
    removeStyle=name => {
        document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
    };
}

"use strict";

"use strict";

const pathServiceInstance = new PathService;

Object.freeze(pathServiceInstance);

const appPath = pathServiceInstance.path;

const i18nServiceInstance = new I18nService;

Object.freeze(i18nServiceInstance);

const iconsServiceInstance = new IconsService;

Object.freeze(iconsServiceInstance);

const filesServiceInstance = new FilesService;

Object.freeze(filesServiceInstance);

const modeOfUseServiceInstance = new ModeOfUseService;

Object.freeze(modeOfUseServiceInstance);

const stylesServiceInstance = new StylesService;

Object.freeze(stylesServiceInstance);

const stringServiceInstance = new StringService;

Object.freeze(stringServiceInstance);

const categoriesServiceInstance = new CategoriesService;

Object.seal(categoriesServiceInstance);

const localStorageServiceInstance = new LocalStorageService;

Object.seal(localStorageServiceInstance);

const routeServiceInstance = new RouteService;

Object.seal(routeServiceInstance);

const capitalLettersServiceInstance = new CapitalLettersService;

Object.seal(capitalLettersServiceInstance);

const clearlyLinksServiceInstance = new ClearlyLinksService;

Object.seal(clearlyLinksServiceInstance);

const clickFaciliteServiceInstance = new ClickFaciliteService;

Object.seal(clickFaciliteServiceInstance);

const colorContrastServiceInstance = new ColorContrastService;

Object.seal(colorContrastServiceInstance);

const colourThemeServiceInstance = new ColourThemeService;

Object.seal(colourThemeServiceInstance);

const cursorAspectServiceInstance = new CursorAspectService;

Object.seal(cursorAspectServiceInstance);

const deleteBackgroundImagesServiceInstance = new DeleteBackgroundImagesService;

Object.seal(deleteBackgroundImagesServiceInstance);

const focusAspectServiceInstance = new FocusAspectService;

Object.seal(focusAspectServiceInstance);

const fontFamilyServiceInstance = new FontFamilyService;

Object.seal(fontFamilyServiceInstance);

const linkStyleServiceInstance = new LinkStyleService;

Object.seal(linkStyleServiceInstance);

const magnifierServiceInstance = new MagnifierService;

Object.seal(magnifierServiceInstance);

const marginAlignServiceInstance = new MarginAlignService;

Object.seal(marginAlignServiceInstance);

const navigationAutoServiceInstance = new NavigationAutoService;

Object.seal(navigationAutoServiceInstance);

const navigationButtonsServiceInstance = new NavigationButtonsService;

Object.seal(navigationButtonsServiceInstance);

const readAloudServiceInstance = new ReadAloudService;

Object.seal(readAloudServiceInstance);

const readingGuideServiceInstance = new ReadingGuideService;

Object.seal(readingGuideServiceInstance);

const scrollServiceInstance = new ScrollService;

Object.seal(scrollServiceInstance);

const skipToContentServiceInstance = new SkipToContentService;

Object.seal(skipToContentServiceInstance);

const stopAnimationsServiceInstance = new StopAnimationsService;

Object.seal(stopAnimationsServiceInstance);

const textSizeServiceInstance = new TextSizeService;

Object.seal(textSizeServiceInstance);

const textSpacingServiceInstance = new TextSpacingService;

Object.seal(textSpacingServiceInstance);

const pauseServiceInstance = new PauseService;

Object.freeze(pauseServiceInstance);

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light" style="display:none">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3em" data-name="Accessibility"></app-icon>\n\t</button>\n\t<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>\n</div>\n`;

class AppComponent extends HTMLElement {
    confortPlusBtn=null;
    confortPlusToolbar=null;
    closeBtn=null;
    link;
    handler;
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this?.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.link = document.createElement("link");
        this.link.rel = "stylesheet";
        this.link.href = `${appPath}css/styles.min.css`;
        this.link.onload = () => {
            this?.shadowRoot?.querySelector("[data-bs-theme]").removeAttribute("style");
        };
        this.shadowRoot?.appendChild(this.link);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        customElements.upgrade(this);
        iconsServiceInstance.loadSprite(this.shadowRoot);
        setTimeout((() => {
            i18nServiceInstance.translate(this.shadowRoot);
        }));
        this.confortPlusBtn = this?.shadowRoot?.getElementById("confort");
        this.closeBtn = this?.shadowRoot?.getElementById("close-toolbar");
        this.confortPlusToolbar = this?.shadowRoot?.getElementById("toolbar");
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        localStorageServiceInstance.getItem("is-opened").then((result => {
            if (result === "true") {
                this.showToolbar();
            } else {
                this.hideToolbar();
            }
        }));
        this.confortPlusToolbar.addEventListener("closeEvent", this.handler);
        this.confortPlusBtn.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener("closeEvent", this.handler);
        this.confortPlusBtn?.removeEventListener("click", this.handler);
    }
    createHandler=() => event => {
        switch (event.type) {
          case "closeEvent":
            this.hideToolbar();
            break;

          case "click":
            this.showToolbar();
            break;

          default:
            break;
        }
    };
    showToolbar=() => {
        this.confortPlusToolbar.removeAttribute("style");
        this.closeBtn?.focus();
        this.confortPlusBtn.classList.add("d-none");
        localStorageServiceInstance.setItem("is-opened", "true");
    };
    hideToolbar=() => {
        this.confortPlusToolbar.style.transform = "translateX(100%)";
        this.confortPlusToolbar.style.visibility = "hidden";
        this.confortPlusBtn.classList.remove("d-none");
        this.confortPlusBtn?.focus();
        localStorageServiceInstance.setItem("is-opened", "false");
    };
}

customElements.define("app-root", AppComponent);

"use strict";

class AbstractSetting extends HTMLElement {
    static observedAttributes=[ "data-values" ];
    settingBtn=null;
    modalBtn=null;
    canEdit=false;
    activesValues;
    separator=",";
    name="";
    handler;
    callback;
    constructor() {
        super();
        this.canEdit = this.dataset?.canEdit === "true" || this.canEdit;
        this.name = stringServiceInstance.normalizeSettingName(this.tagName);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("app-btn-setting");
        this.modalBtn = this.querySelector("app-btn-modal");
        this.settingBtn.setAttribute("data-name", this.name);
        this.modalBtn.setAttribute("data-name", this.name);
        if (this.canEdit) {
            this.modalBtn.classList.remove("d-none");
            this.settingBtn.classList.add("sc-btn-setting--with-btn-modal");
        }
        this.setSettingBtn(this.activesValues);
        this.settingBtn.addEventListener("changeSettingEvent", this.handler);
    }
    disconnectedCallback() {
        this.modalBtn.removeEventListener("clickModalEvent", this.handler);
        this.settingBtn.removeEventListener("changeSettingEvent", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues.values.split(",")[this.activesValues.valueSelected]);
            }
        }
    }
    setSettingBtn=activesValues => {
        this.settingBtn.setAttribute("data-values", activesValues.values);
        this.settingBtn.setAttribute("data-active-value", activesValues.valueSelected.toString());
        this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(activesValues.values.split(",")[activesValues.valueSelected]));
    };
    setCallback=callback => {
        this.callback = callback;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "changeSettingEvent":
            this.changeSettingEvent(event);
            break;
        }
    };
    changeSettingEvent=event => {
        let newIndex = event.detail.index;
        let newValue = event.detail.value;
        modeOfUseServiceInstance.setSettingValue(this.name, newIndex).then((success => {
            if (!success) {
                this.callback(newValue);
                this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(newValue));
            }
        }));
    };
}

"use strict";

const tmplCapitalLetters = document.createElement("template");

tmplCapitalLetters.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CapitalLettersComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(capitalLettersServiceInstance.setCapitalLetters.bind(this));
        this.appendChild(tmplCapitalLetters.content.cloneNode(true));
    }
}

customElements.define("app-capital-letters", CapitalLettersComponent);

"use strict";

const tmplClearlyLinks = document.createElement("template");

tmplClearlyLinks.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClearlyLinksComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(clearlyLinksServiceInstance.setClearlyLinks.bind(this));
        this.appendChild(tmplClearlyLinks.content.cloneNode(true));
    }
}

customElements.define("app-clearly-links", ClearlyLinksComponent);

"use strict";

const tmplClickFacilite = document.createElement("template");

tmplClickFacilite.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClickFaciliteComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},longClick_2,autoClick_2`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(clickFaciliteServiceInstance.setClickFacilite.bind(this));
        this.appendChild(tmplClickFacilite.content.cloneNode(true));
    }
}

customElements.define("app-click-facilite", ClickFaciliteComponent);

"use strict";

const tmplColorContrast = document.createElement("template");

tmplColorContrast.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ColorContrastComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},reinforcedContrasts,white_black`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(colorContrastServiceInstance.setColorsContrasts.bind(this));
        this.appendChild(tmplColorContrast.content.cloneNode(true));
    }
}

customElements.define("app-color-contrast", ColorContrastComponent);

"use strict";

const tmplColourTheme = document.createElement("template");

tmplColourTheme.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class ColourThemeComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplColourTheme.content.cloneNode(true));
    }
}

customElements.define("app-colour-theme", ColourThemeComponent);

"use strict";

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},big_black,huge_green`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(cursorAspectServiceInstance.setCursor.bind(this));
        this.appendChild(tmplCursorAspect.content.cloneNode(true));
    }
}

customElements.define("app-cursor-aspect", CursorAspectComponent);

"use strict";

const tmplDeleteBackgroundImages = document.createElement("template");

tmplDeleteBackgroundImages.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this));
        this.appendChild(tmplDeleteBackgroundImages.content.cloneNode(true));
    }
}

customElements.define("app-delete-background-images", DeleteBackgroundImagesComponent);

"use strict";

const tmplFocusAspect = document.createElement("template");

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},big_blue,veryBig_red`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(focusAspectServiceInstance.setFocus.bind(this));
        this.appendChild(tmplFocusAspect.content.cloneNode(true));
    }
}

customElements.define("app-focus-aspect", FocusAspectComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FontFamilyComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},Accessible_DfA,Luciole`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(fontFamilyServiceInstance.setFontFamily.bind(this));
        this.appendChild(tmplFontFamily.content.cloneNode(true));
    }
}

customElements.define("app-font-family", FontFamilyComponent);

"use strict";

const tmplLinkStyle = document.createElement("template");

tmplLinkStyle.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LinkStyleComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},lightblue_orange_lightgreen,yellow_orange_lightgreen`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));
        this.appendChild(tmplLinkStyle.content.cloneNode(true));
    }
}

customElements.define("app-link-style", LinkStyleComponent);

"use strict";

const tmplMagnifier = document.createElement("template");

tmplMagnifier.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MagnifierComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(magnifierServiceInstance.setMagnifier.bind(this));
        this.appendChild(tmplMagnifier.content.cloneNode(true));
    }
}

customElements.define("app-magnifier", MagnifierComponent);

"use strict";

const tmplMarginAlign = document.createElement("template");

tmplMarginAlign.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MarginAlignComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},alignLeft,margeList`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(marginAlignServiceInstance.setMargin.bind(this));
        this.appendChild(tmplMarginAlign.content.cloneNode(true));
    }
}

customElements.define("app-margin-align", MarginAlignComponent);

"use strict";

const tmplNavigationAuto = document.createElement("template");

tmplNavigationAuto.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class NavigationAutoComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplNavigationAuto.content.cloneNode(true));
    }
}

customElements.define("app-navigation-auto", NavigationAutoComponent);

"use strict";

const tmplNavigationButtons = document.createElement("template");

tmplNavigationButtons.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class NavigationButtonsComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplNavigationButtons.content.cloneNode(true));
    }
}

customElements.define("app-navigation-buttons", NavigationButtonsComponent);

"use strict";

const tmplReadAloud = document.createElement("template");

tmplReadAloud.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadAloudComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(readAloudServiceInstance.setReadAloud.bind(this));
        this.appendChild(tmplReadAloud.content.cloneNode(true));
    }
}

customElements.define("app-read-aloud", ReadAloudComponent);

"use strict";

const tmplReadingGuide = document.createElement("template");

tmplReadingGuide.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadingGuideComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},ruleGuide,maskGuide`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(readingGuideServiceInstance.setReadingMaskGuide.bind(this));
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
    }
}

customElements.define("app-reading-guide", ReadingGuideComponent);

"use strict";

const tmplScroll = document.createElement("template");

tmplScroll.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},bigScroll,scrollOnMouseover`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(scrollServiceInstance.setScroll.bind(this));
        this.appendChild(tmplScroll.content.cloneNode(true));
    }
}

customElements.define("app-scroll", ScrollComponent);

"use strict";

const tmplSkipToContent = document.createElement("template");

tmplSkipToContent.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class SkipToContentComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplSkipToContent.content.cloneNode(true));
    }
}

customElements.define("app-skip-to-content", SkipToContentComponent);

"use strict";

const tmplStopAnimations = document.createElement("template");

tmplStopAnimations.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class StopAnimationsComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(stopAnimationsServiceInstance.setStopAnimations.bind(this));
        this.appendChild(tmplStopAnimations.content.cloneNode(true));
    }
}

customElements.define("app-stop-animations", StopAnimationsComponent);

"use strict";

const tmplIncreaseTextSize = document.createElement("template");

tmplIncreaseTextSize.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class IncreaseTextSizeComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},110,130`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(textSizeServiceInstance.setFontSize.bind(this));
        this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
}

customElements.define("app-text-size", IncreaseTextSizeComponent);

"use strict";

const tmplSpacingText = document.createElement("template");

tmplSpacingText.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class TextSpacingComponent extends AbstractSetting {
    activesValues={
        values: `${DEFAULT_VALUE},spacingTextLabelSmall,spacingTextLabelBig`,
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(textSpacingServiceInstance.setSpacingText.bind(this));
        this.appendChild(tmplSpacingText.content.cloneNode(true));
    }
}

customElements.define("app-text-spacing", TextSpacingComponent);

"use strict";

const tmplTextTransform = document.createElement("template");

tmplTextTransform.innerHTML = `\n<style>\n\t\tapp-text-transform {\n\t\t\t\tmargin-bottom: 1rem;\n\t\t}\n</style>\n<button type="button" id="normal-btn" data-i18n="default"></button>\n<button type="button" id="first-letter-btn" data-i18n="firstLetter"></button>\n<button type="button" id="lowercase-btn" data-i18n="lowercase"></button>\n<button type="button" id="uppercase-btn" data-i18n="uppercase"></button>\n`;

class TextTransformComponent extends HTMLElement {
    bodyElt=null;
    normalBtn=null;
    firstLetterBtn=null;
    lowercaseBtn=null;
    uppercaseBtn=null;
    handler;
    constructor() {
        super();
        this.appendChild(tmplTextTransform.content.cloneNode(true));
        this.normalBtn = this.querySelector("#normal-btn");
        this.firstLetterBtn = this.querySelector("#first-letter-btn");
        this.lowercaseBtn = this.querySelector("#lowercase-btn");
        this.uppercaseBtn = this.querySelector("#uppercase-btn");
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.bodyElt = document.body;
        this.normalBtn?.addEventListener("click", this.handler);
        this.firstLetterBtn?.addEventListener("click", this.handler);
        this.lowercaseBtn?.addEventListener("click", this.handler);
        this.uppercaseBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener("click", this.handler);
        this.firstLetterBtn?.removeEventListener("click", this.handler);
        this.lowercaseBtn?.removeEventListener("click", this.handler);
        this.uppercaseBtn?.removeEventListener("click", this.handler);
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.normalBtn:
                this.bodyElt.style.textTransform = ``;
                break;

              case this.firstLetterBtn:
                this.bodyElt.style.textTransform = `capitalize`;
                break;

              case this.lowercaseBtn:
                this.bodyElt.style.textTransform = `lowercase`;
                break;

              case this.uppercaseBtn:
                this.bodyElt.style.textTransform = `uppercase`;
                break;
            }
        }
    };
}

customElements.define("app-text-transform", TextTransformComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `\n\t<button type="button" class="btn btn-primary pe-4 sc-btn-modal">\n\t\t<app-icon data-name="Plus_small"></app-icon>\n\t</button>`;

class BtnModalComponent extends HTMLElement {
    static observedAttributes=[ "data-name", "data-disabled" ];
    modalBtn=null;
    settingName=null;
    indexValue=null;
    disabled=false;
    handler;
    constructor() {
        super();
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(btnModalLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.modalBtn = this.querySelector("button");
        this.modalBtn?.addEventListener("click", this.handler);
        this.modalBtn.disabled = this.disabled;
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-name" === name) {
            this.settingName = newValue;
        }
    }
    setA11yName=label => {
        let span = document.createElement("span");
        span.classList.add("visually-hidden");
        span.innerText = label;
        this.modalBtn?.appendChild(span);
        this.modalBtn.setAttribute("title", label);
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.modalBtn:
                let clickEvent = new CustomEvent("changeRoute", {
                    bubbles: true,
                    detail: {
                        route: PAGE_EDIT_SETTING,
                        setting: this.settingName
                    }
                });
                this.modalBtn?.dispatchEvent(clickEvent);
                break;
            }
        }
    };
}

customElements.define("app-btn-modal", BtnModalComponent);

"use strict";

const btnSettingLayout = document.createElement("template");

btnSettingLayout.innerHTML = `\n\t<button type="button" class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">\n\t\t<div class="d-flex flex-column">\n\t\t\t<span></span>\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t</div>\n\t\t<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-values", "data-active-value", "data-name", "data-disabled" ];
    settingBtn=null;
    btnContentSlots=null;
    index;
    value;
    label="";
    slot="";
    separator=",";
    settingsList=[];
    disabled=false;
    handler;
    constructor() {
        super();
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        this.btnContentSlots = this.querySelector("ul");
        this.settingBtn.addEventListener("click", this.handler);
        this.setDisabledState();
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.settingsList = newValue.split(this.separator);
        }
        if ("data-active-value" === name) {
            this.setIndex(Number(newValue));
        }
        if ("data-name" === name) {
            const settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.label = settingName;
            const span = this.querySelector("span");
            const icon = this.querySelector("app-icon");
            span.innerText = i18nServiceInstance.getMessage(settingName);
            icon?.setAttribute("data-name", settingName);
        }
        if ("data-disabled" === name) {
            this.disabled = newValue === "true";
            this.setDisabledState();
        }
    }
    setIndex=index => {
        if (index?.toString()) {
            this.index = index;
        } else {
            let i = this.index + 1;
            this.index = i >= this.settingsList.length ? 0 : i;
        }
        if (this.index === 0) {
            this.settingBtn?.classList.add("sc-btn-setting--default");
        } else {
            this.settingBtn?.classList.remove("sc-btn-setting--default");
        }
        this.calculateList();
    };
    setDisabledState=() => {
        this.settingBtn.disabled = this.disabled;
    };
    calculateList=() => {
        this.slot = "";
        this.settingsList.forEach(((value, index) => {
            let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
            if (index === this.index) {
                point = '<li class="border border-4 border-black rounded-circle"></li>';
                this.value = value;
            }
            this.slot = `${this.slot}${point}`;
        }));
        this.btnContentSlots.innerHTML = this.slot;
    };
    createHandler=() => event => {
        if (event.type === "click") {
            this.setIndex();
            let clickEvent = new CustomEvent("changeSettingEvent", {
                bubbles: true,
                detail: {
                    value: this.value,
                    index: this.index
                }
            });
            this.settingBtn?.dispatchEvent(clickEvent);
        }
    };
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">\n\t\t\t\t<span class="visually-hidden" data-i18n="previous"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="page-block-title" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon id="mode-icon" class="border-end border-white pe-1"></app-icon>\n\t\t\t\t<app-icon id="page-icon" data-name="Settings"></app-icon>\n\t\t\t\t<span id="page-title"></span>\n\t\t\t</span>\n\n\t\t\t<span id="app-title" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Reduire_C+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-display", "data-page-title", "data-page-icon", "data-selected-mode" ];
    closeBtn=null;
    prevBtn=null;
    appTitle=null;
    pageBlockTitle=null;
    pageTitle=null;
    modeIcon=null;
    pageIcon=null;
    display="primary";
    handler;
    constructor() {
        super();
        this.appendChild(headerLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.closeBtn = this.querySelector("#close-toolbar");
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.appTitle = this.querySelector("#app-title");
        this.pageBlockTitle = this.querySelector("#page-block-title");
        this.pageTitle = this.querySelector("#page-title");
        this.modeIcon = this.querySelector("#mode-icon");
        this.pageIcon = this.querySelector("#page-icon");
        this.displayMode(this.display);
        this.closeBtn.addEventListener("click", this.handler);
        this.prevBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", this.handler);
        this.prevBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-display" === name) {
            this.displayMode(newValue);
        }
        if ("data-page-title" === name) {
            this.pageTitle.innerText = i18nServiceInstance.getMessage(newValue);
        }
        if ("data-page-icon" === name) {
            newValue.length === 0 ? this.pageIcon.classList.add("d-none") : this.pageIcon?.setAttribute("data-name", newValue);
        }
        if ("data-selected-mode" === name) {
            this.modeIcon?.setAttribute("data-name", `${newValue}_border`);
        }
    }
    displayMode=mode => {
        this.prevBtn?.classList.toggle("d-none", mode === "primary");
        this.pageBlockTitle?.classList.toggle("d-none", mode === "primary");
        this.appTitle?.classList.toggle("d-none", mode === "secondary");
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.closeBtn:
                this.closeButtonEvent();
                break;

              case this.prevBtn:
                this.prevButtonEvent();
                break;
            }
        }
    };
    closeButtonEvent=() => {
        let clickCloseEvent = new CustomEvent("closeEvent", {
            bubbles: true
        });
        this.closeBtn?.dispatchEvent(clickCloseEvent);
    };
    prevButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: routeServiceInstance.historyRoute[routeServiceInstance.historyRoute.length - 1]
            }
        });
        this.prevBtn?.dispatchEvent(clickEvent);
    };
}

customElements.define("app-header", HeaderComponent);

"use strict";

const iconLayout = document.createElement("template");

iconLayout.innerHTML = `<svg fill="currentColor" aria-hidden="true" focusable="false"><use/></svg>`;

class IconComponent extends HTMLElement {
    static observedAttributes=[ "data-name" ];
    sprite="";
    icon="";
    size="1.5em";
    constructor() {
        super();
        this.sprite = iconsServiceInstance.path;
        this.icon = this.dataset?.name || this.icon;
        this.size = this.dataset?.size || this.size;
        this.appendChild(iconLayout.content.cloneNode(true));
    }
    connectedCallback() {
        let svg = this.querySelector("svg");
        svg?.setAttribute("width", this.size);
        svg?.setAttribute("height", this.size);
        let use = this.querySelector("use");
        use?.setAttribute("href", `${this.sprite}#ic_${this.icon}`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let use = this.querySelector("use");
        if ("data-name" === name) {
            use?.setAttribute("href", `${this.sprite}#ic_${newValue}`);
        }
    }
}

customElements.define("app-icon", IconComponent);

"use strict";

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<input type="radio" name="modes" class="sc-select-mode__input">\n\t<label class="d-flex flex-column align-items-start gap-1 p-1 sc-select-mode__label btn btn-tertiary">\n\t\t<div class="d-flex align-items-center gap-2">\n\t\t\t<app-icon data-size="2em"></app-icon>\n\t\t\t<span class="fs-5 text"></span>\n\t\t</div>\n\t\t<span class="fs-6 fw-normal m-0"></span>\n\t</label>\n`;

class SelectModeComponent extends HTMLElement {
    inputElement=null;
    iconElement=null;
    labelElement=null;
    textElement=null;
    descriptionElement=null;
    label="";
    checked=false;
    disabled=false;
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.checked = this.dataset?.checked === "true" || this.checked;
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.inputElement = this.querySelector("input");
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("div span");
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = stringServiceInstance.normalizeID(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.inputElement.disabled = this.disabled;
        this.labelElement?.setAttribute("for", stringServiceInstance.normalizeID(this.label));
        this.iconElement?.setAttribute("data-name", `${this.label}_border`);
        this.textElement.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
    }
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = `\n\t<div class="gap-1 p-3 text-body">\n\t\t<div class="d-flex align-items-center gap-2 mb-2">\n\t\t\t<app-icon id="edit-setting-icon" data-size="2rem"></app-icon>\n\t\t\t<p id="edit-setting-title" class="fs-4 fw-bold mb-0"></p>\n\t\t</div>\n\n\t\t<p id="edit-setting-instruction"></p>\n\n\t\t<app-edit-font-family class="sc-edit-setting__setting"></app-edit-font-family>\n\t\t<app-edit-text-size class="sc-edit-setting__setting"></app-edit-text-size>\n\t\t<app-edit-reading-guide class="sc-edit-setting__setting"></app-edit-reading-guide>\n\t\t<app-edit-margin-align class="sc-edit-setting__setting"></app-edit-margin-align>\n\t\t<app-edit-magnifier class="sc-edit-setting__setting"></app-edit-magnifier>\n\t\t<app-edit-read-aloud class="sc-edit-setting__setting"></app-edit-read-aloud>\n\t\t<app-edit-text-spacing class="sc-edit-setting__setting"></app-edit-text-spacing>\n\t\t<app-edit-focus-aspect class="sc-edit-setting__setting"></app-edit-focus-aspect>\n\t\t<app-edit-click-facilite class="sc-edit-setting__setting"></app-edit-click-facilite>\n\t\t<app-edit-cursor-aspect class="sc-edit-setting__setting"></app-edit-cursor-aspect>\n\t\t<app-edit-color-contrast class="sc-edit-setting__setting"></app-edit-color-contrast>\n\t\t<app-edit-link-style class="sc-edit-setting__setting"></app-edit-link-style>\n\t\t<app-edit-stop-animations class="sc-edit-setting__setting"></app-edit-stop-animations>\n\t\t<app-edit-scroll class="sc-edit-setting__setting"></app-edit-scroll>\n\t</div>\n`;

class EditSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-setting" ];
    settingIcon=null;
    settingTitle=null;
    settingInstruction=null;
    settingName=null;
    settingsDictionnary=[];
    constructor() {
        super();
        this.appendChild(editSettingLayout.content.cloneNode(true));
        this.querySelectorAll(".sc-edit-setting__setting").forEach((element => {
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
        }));
    }
    connectedCallback() {
        this.settingIcon = this.querySelector("#edit-setting-icon");
        this.settingTitle = this.querySelector("#edit-setting-title");
        this.settingInstruction = this.querySelector("#edit-setting-instruction");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-setting" === name) {
            this.settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.settingIcon?.setAttribute("data-name", this.settingName);
            this.settingTitle.innerText = i18nServiceInstance.getMessage(this.settingName);
            this.settingInstruction.innerText = i18nServiceInstance.getMessage(`${this.settingName}Instruction`);
            this.displaySetting(`edit-${newValue}`);
        }
    }
    displaySetting=settingName => {
        this.settingsDictionnary.forEach((setting => {
            if (settingName !== setting.name) {
                this.querySelector(setting.element).classList.add("d-none");
            }
        }));
    };
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const editClickFaciliteLayout = document.createElement("template");

editClickFaciliteLayout.innerHTML = `\n\t<p>Edit click facilite works !</p>\n`;

class EditClickFaciliteComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editClickFaciliteLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-click-facilite", EditClickFaciliteComponent);

"use strict";

const editColorContrastLayout = document.createElement("template");

editColorContrastLayout.innerHTML = `\n\t<p>Edit color contrast works !</p>\n`;

class EditColorContrastComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editColorContrastLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-color-contrast", EditColorContrastComponent);

"use strict";

const editCursorAspectLayout = document.createElement("template");

editCursorAspectLayout.innerHTML = `\n\t<p>Edit cursor aspect works !</p>\n`;

class EditCursorAspectComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editCursorAspectLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-cursor-aspect", EditCursorAspectComponent);

"use strict";

const editFocusAspectLayout = document.createElement("template");

editFocusAspectLayout.innerHTML = `\n\t<p>Edit focus aspect works !</p>\n`;

class EditFocusAspectComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editFocusAspectLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-focus-aspect", EditFocusAspectComponent);

"use strict";

const editFontFamilyLayout = document.createElement("template");

editFontFamilyLayout.innerHTML = `\n\t<p>Edit font family works !</p>\n`;

class EditFontFamilyComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editFontFamilyLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-font-family", EditFontFamilyComponent);

"use strict";

const editLinkStyleLayout = document.createElement("template");

editLinkStyleLayout.innerHTML = `\n\t<p>Edit link style works !</p>\n`;

class EditLinkStyleComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editLinkStyleLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-link-style", EditLinkStyleComponent);

"use strict";

const editMagnifierLayout = document.createElement("template");

editMagnifierLayout.innerHTML = `\n\t<p>Edit magnifier works !</p>\n`;

class EditMagnifierComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editMagnifierLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-magnifier", EditMagnifierComponent);

"use strict";

const editMarginAlignLayout = document.createElement("template");

editMarginAlignLayout.innerHTML = `\n\t<p>Edit margin align works !</p>\n`;

class EditMarginAlignComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editMarginAlignLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-margin-align", EditMarginAlignComponent);

"use strict";

const editReadAloudLayout = document.createElement("template");

editReadAloudLayout.innerHTML = `\n\t<p>Edit read aloud works !</p>\n`;

class EditReadAloudComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editReadAloudLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-read-aloud", EditReadAloudComponent);

"use strict";

const editReadingGuideLayout = document.createElement("template");

editReadingGuideLayout.innerHTML = `\n\t<p>Edit reading guide works !</p>\n`;

class EditReadingGuideComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editReadingGuideLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-reading-guide", EditReadingGuideComponent);

"use strict";

const editScrollLayout = document.createElement("template");

editScrollLayout.innerHTML = `\n\t<p>Edit scroll works !</p>\n`;

class EditScrollComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editScrollLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-scroll", EditScrollComponent);

"use strict";

const editStopAnimationsLayout = document.createElement("template");

editStopAnimationsLayout.innerHTML = `\n\t<p>Edit stop animations works !</p>\n`;

class EditStopAnimationsComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editStopAnimationsLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-stop-animations", EditStopAnimationsComponent);

"use strict";

const editTextSizeLayout = document.createElement("template");

editTextSizeLayout.innerHTML = `\n\t<form class="d-flex align-items-center justify-content-between gap-2">\n\t\t<button id="edit-btn-prev" type="button" class="btn btn-icon btn-primary">\n\t\t\t<span class="visually-hidden" data-i18n="increaseTextSize"></span>\n\t\t\t<app-icon data-name="Minus_small"></app-icon>\n\t\t</button>\n\t\t<output id="selected-value"></output>\n\t\t<button id="edit-btn-next" type="button" class="btn btn-icon btn-primary">\n\t\t\t<span class="visually-hidden" data-i18n="reduceTextSize"></span>\n\t\t\t<app-icon data-name="Plus_small"></app-icon>\n\t\t</button>\n\t</form>\n`;

class EditTextSizeComponent extends HTMLElement {
    selectedValue=null;
    btnPrevValue=null;
    btnNextValue=null;
    currentIndex=null;
    currentValue=null;
    textSizeValues=[ "110", "130", "160", "200", "350", "500" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSizeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectedValue = this.querySelector("#selected-value");
        this.btnPrevValue = this.querySelector("#edit-btn-prev");
        this.btnNextValue = this.querySelector("#edit-btn-next");
        this.btnPrevValue?.addEventListener("click", this.handler);
        this.btnNextValue?.addEventListener("click", this.handler);
        modeOfUseServiceInstance.getCustomValue("textSize").then((result => {
            if (result) {
                this.currentIndex = this.textSizeValues.findIndex((i => i === result));
                this.moveTextSize(this.currentIndex);
            } else {
                this.moveTextSize(0);
            }
        }));
    }
    moveTextSize=index => {
        this.currentIndex = index;
        this.btnPrevValue.disabled = false;
        this.btnNextValue.disabled = false;
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
            this.btnPrevValue.disabled = true;
            this.btnNextValue.disabled = false;
        } else if (this.currentIndex >= this.textSizeValues.length - 1) {
            this.currentIndex = this.textSizeValues.length - 1;
            this.btnPrevValue.disabled = false;
            this.btnNextValue.disabled = true;
        }
        this.currentValue = this.textSizeValues[this.currentIndex];
        this.selectedValue.innerText = this.currentValue;
        modeOfUseServiceInstance.setSettingValue("textSize", 3, this.currentValue);
        textSizeServiceInstance.setFontSize(this.currentValue);
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.btnPrevValue:
                this.moveTextSize(this.currentIndex - 1);
                break;

              case this.btnNextValue:
                this.moveTextSize(this.currentIndex + 1);
                break;
            }
        }
    };
}

customElements.define("app-edit-text-size", EditTextSizeComponent);

"use strict";

const editTextSpacingLayout = document.createElement("template");

editTextSpacingLayout.innerHTML = `\n\t<p>Edit text spacing works !</p>\n`;

class EditTextSpacingComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editTextSpacingLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-text-spacing", EditTextSpacingComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n\t\t<div class="d-flex gap-2">\n\t\t\t\t<div class="sc-home__icon-mode bg-body rounded-circle text-body">\n\t\t\t\t\t\t<app-icon data-size="5em"></app-icon>\n\t\t\t\t</div>\n\t\t\t\t<div class="d-flex justify-content-center flex-column">\n\t\t\t\t\t\t<span class="text-white" data-i18n="profile"></span>\n\t\t\t\t\t\t<span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n\t\t\t\t</div>\n\t\t</div>\n\t\t<div class="d-grid gap-3 d-md-block">\n\t\t\t\t<button id="settings-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">\n\t\t\t\t\t\t<span class="visually-hidden" data-i18n="openSettingsMode"></span>\n\t\t\t\t\t\t<app-icon data-name="Settings"></app-icon>\n        </button>\n\t\t\t\t<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n            <span id="pause-label" class="visually-hidden" data-i18n="pause"></span>\n\t\t\t\t\t\t<app-icon id="pause-icon" data-name="Pause"></app-icon>\n        </button>\n    </div>\n</section>\n\n<section class="gap-3 p-3">\n\t<p id="pause-info" class="d-none" data-i18n="pauseInfo"></p>\n\t<div class="sc-home__settings gap-3">\n\t\t<app-mode></app-mode>\n\t\t<div class="d-flex">\n\t\t\t<button id="change-mode-btn" class="btn btn-link" type="button" data-i18n="otherModes"></button>\n\t\t</div>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-modes", "data-custom" ];
    changeModeBtn=null;
    settingsBtn=null;
    pauseBtn=null;
    modeName=null;
    modeIcon=null;
    currentMode=null;
    currentModeSettings;
    pauseState=false;
    handler;
    constructor() {
        super();
        this.appendChild(homeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.changeModeBtn = this.querySelector("#change-mode-btn");
        this.settingsBtn = this.querySelector("#settings-btn");
        this.pauseBtn = this.querySelector("#pause-btn");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
        this.currentMode = this.querySelector("app-mode");
        this.changeModeBtn?.addEventListener("click", this.handler);
        this.settingsBtn?.addEventListener("click", this.handler);
        this.pauseBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.changeModeBtn?.removeEventListener("click", this.handler);
        this.settingsBtn?.removeEventListener("click", this.handler);
        this.pauseBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let selectedModeName = Object.entries(JSON.parse(selectedMode))[0][0];
            this.modeName.innerText = i18nServiceInstance.getMessage(`${selectedModeName}Name`);
            this.modeIcon?.setAttribute("data-name", selectedModeName);
            this.currentModeSettings = JSON.stringify(Object.entries(JSON.parse(selectedMode))[0][1]);
            this.currentMode.setAttribute("data-settings", this.currentModeSettings);
        }
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.changeModeBtn:
                this.changeModeButtonEvent();
                break;

              case this.settingsBtn:
                this.settingsButtonEvent();
                break;

              case this.pauseBtn:
                this.setPauseState();
                break;
            }
        }
    };
    changeModeButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_MODES
            }
        });
        this.changeModeBtn?.dispatchEvent(clickEvent);
    };
    settingsButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_SETTINGS
            }
        });
        this.settingsBtn?.dispatchEvent(clickEvent);
    };
    setPauseState=() => {
        this.pauseState = !this.pauseState;
        this.querySelector("#pause-icon").setAttribute("data-name", this.pauseState ? "Play" : "Pause");
        if (this.pauseState) {
            pauseServiceInstance.pauseSettings(this.currentModeSettings);
            this.settingsBtn.disabled = true;
            this.changeModeBtn.disabled = true;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("play"));
            this.pauseBtn.querySelector("#pause-label").innerText = i18nServiceInstance.getMessage("play");
            this.querySelector("#pause-info").classList.remove("d-none");
            this.currentMode.setAttribute("data-pause", "true");
        } else {
            pauseServiceInstance.playSettings();
            this.settingsBtn.disabled = false;
            this.changeModeBtn.disabled = false;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("pause"));
            this.pauseBtn.querySelector("#pause-label").innerText = i18nServiceInstance.getMessage("pause");
            this.querySelector("#pause-info").classList.add("d-none");
            this.currentMode.setAttribute("data-pause", "false");
        }
    };
}

customElements.define("app-home", HomeComponent);

"use strict";

const tmplMode = document.createElement("template");

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting"></app-font-family>\n\t<app-text-size class="sc-mode__setting"></app-text-size>\n\t<app-capital-letters class="sc-mode__setting"></app-capital-letters>\n\t<app-text-spacing class="sc-mode__setting"></app-text-spacing>\n\t<app-reading-guide class="sc-mode__setting"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting"></app-margin-align>\n\t<app-magnifier class="sc-mode__setting"></app-magnifier>\n\t<app-read-aloud class="sc-mode__setting"></app-read-aloud>\n\t<app-colour-theme class="sc-mode__setting"></app-colour-theme>\n\t<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>\n\t<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting"></app-color-contrast>\n\t<app-link-style class="sc-mode__setting"></app-link-style>\n\t<app-clearly-links class="sc-mode__setting"></app-clearly-links>\n\t<app-stop-animations class="sc-mode__setting"></app-stop-animations>\n\t<app-delete-background-images class="sc-mode__setting"></app-delete-background-images>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-skip-to-content class="sc-mode__setting"></app-skip-to-content>\n\t<app-navigation-buttons class="sc-mode__setting"></app-navigation-buttons>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-click-facilite class="sc-mode__setting"></app-click-facilite>\n\t<app-navigation-auto class="sc-mode__setting"></app-navigation-auto>\n</div>\n`;

class ModeComponent extends HTMLElement {
    static observedAttributes=[ "data-settings", "data-pause" ];
    modeContent=null;
    settingsDictionnary=[];
    constructor() {
        super();
        this.appendChild(tmplMode.content.cloneNode(true));
        this.querySelectorAll(".sc-mode__setting").forEach((element => {
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
        }));
    }
    connectedCallback() {
        this.modeContent = this.querySelector("#mode-content");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ("data-pause" === name) {
            this.disableSettings(newValue === "true");
        }
    }
    displaySettings=settings => {
        let elements = this.querySelectorAll(".sc-mode__setting");
        elements.forEach((element => {
            element.classList.add("d-none");
        }));
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            let settingElement = this.querySelector(settingObj?.element);
            settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
            if (Object.entries(setting)[0][1].isTool) {
                settingElement?.classList.remove("d-none");
            }
        }));
    };
    disableSettings=disabled => {
        let elements = this.querySelectorAll(".sc-mode__setting");
        elements.forEach((element => {
            element.querySelector("app-btn-setting").setAttribute("data-disabled", String(disabled));
        }));
    };
}

customElements.define("app-mode", ModeComponent);

"use strict";

const modesLayout = document.createElement("template");

modesLayout.innerHTML = `\n<form class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4 text-body">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n\n\t<div class="d-grid">\n\t\t<button id="select-mode-btn" class="btn btn-primary" type="submit" data-i18n="validateThisMode"></button>\n\t</div>\n</form>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    selectModeForm=null;
    selectModeBtn=null;
    selectModeZone=null;
    handler;
    constructor() {
        super();
        this.appendChild(modesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectModeForm = this.querySelector("form");
        this.selectModeBtn = this.querySelector("#select-mode-btn");
        this.selectModeZone = this.querySelector("#select-mode-zone");
        this.selectModeForm?.addEventListener("submit", this.handler);
    }
    disconnectedCallback() {
        this.selectModeForm?.removeEventListener("submit", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.displayListMode(JSON.parse(newValue));
        }
    }
    displayListMode=json => {
        const listMode = json.modes;
        const selectedMode = json.selectedMode;
        let radioModeList = "";
        listMode.forEach((mode => {
            let settingsList = Object.entries(mode)[0][1];
            let disabled = settingsList.length === 0;
            let isChecked = Object.keys(mode)[0] === selectedMode ? true : false;
            let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}" data-disabled="${disabled}"></app-select-mode>`;
            radioModeList = radioModeList + radioMode;
        }));
        this.selectModeZone.innerHTML = radioModeList;
    };
    getSelectedMode=() => this.querySelector("input:checked").value;
    createHandler=() => event => {
        switch (event.type) {
          case "submit":
            this.selectModeFormEvent(event);
            break;
        }
    };
    selectModeFormEvent=event => {
        event.preventDefault();
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_HOME
            }
        });
        modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
        this.selectModeBtn?.dispatchEvent(clickEvent);
    };
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n<section class="accordion mb-2">\n\t<app-text class="c-settings__category accordion-item"></app-text>\n\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t<app-picture-video class="c-settings__category accordion-item"></app-picture-video>\n\t<app-sound class="c-settings__category accordion-item"></app-sound>\n\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n</section>\n`;

class SettingsComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.openOrHideCategories(newValue);
            let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let elements = this.querySelectorAll(".c-settings__category");
            const settings = Object.entries(JSON.parse(selectedMode))[0][1];
            elements.forEach((element => {
                element.setAttribute("data-settings", JSON.stringify(settings));
            }));
        }
    }
    openOrHideCategories=mode => {
        categoriesServiceInstance.openMainCategory(JSON.parse(mode).selectedMode);
        categoriesServiceInstance.settingAccordions.forEach((accordion => {
            this.querySelector(accordion.name).setAttribute("data-open", (!accordion.open).toString());
        }));
    };
}

customElements.define("app-settings", SettingsComponent);

"use strict";

class AbstractCategory extends HTMLElement {
    static observedAttributes=[ "data-settings", "data-open" ];
    btnAccordion=null;
    accordionContainer=null;
    settingsContainer=null;
    btnMoreSettings=null;
    settingsDictionnary=[];
    settingsElements=[];
    displayAllSettings=false;
    CLASS_NAME_SHOW="show";
    CLASS_NAME_COLLAPSED="collapsed";
    _triggerArray=[];
    handler;
    constructor() {
        super();
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.btnAccordion = this.querySelector("button.accordion-button");
        this.accordionContainer = this.querySelector("div.accordion-collapse");
        this.settingsContainer = this.querySelector(".c-category__settings-container");
        this.btnMoreSettings = this.querySelector(".c-category__btn-more");
        this.querySelectorAll(".c-category__setting").forEach((element => {
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
            this.settingsElements.push(this.querySelector(element.tagName));
        }));
        this._triggerArray.push(this.btnAccordion);
        this.btnAccordion?.addEventListener("click", this.handler);
        this.btnMoreSettings?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.btnAccordion?.removeEventListener("click", this.handler);
        this.btnMoreSettings?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ("data-open" === name) {
            this.addAriaAndCollapsedClass(this._triggerArray, JSON.parse(newValue));
        }
    }
    isShown=(element = this.accordionContainer) => element.classList.contains(this.CLASS_NAME_SHOW);
    addAriaAndCollapsedClass=(triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element?.classList.toggle(this.CLASS_NAME_COLLAPSED, isOpen);
            element?.setAttribute("aria-expanded", String(isOpen));
            categoriesServiceInstance.openCategory(this.tagName, !isOpen);
        }
    };
    displaySettings=settings => {
        this.btnMoreSettings?.classList.add("d-none");
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element => {
                element.removeAttribute("data-default-setting");
                element.classList.add("d-none");
            }));
        }
        let nbActifSetting = 0;
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            let settingElement = this.querySelector(settingObj?.element);
            settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
            settingElement?.setAttribute("data-default-setting", "true");
            settingElement?.classList.remove("d-none");
            if (settingObj) {
                nbActifSetting++;
            }
        }));
        if (nbActifSetting !== this.settingsDictionnary.length) {
            this.btnMoreSettings?.classList.remove("d-none");
        }
    };
    displayOrHideOthersSettings=() => {
        this.displayAllSettings = !this.displayAllSettings;
        this.settingsElements.forEach((element => {
            if (!element.hasAttribute("data-default-setting")) {
                if (element.classList.contains("d-none")) {
                    this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("lessSettings");
                } else {
                    this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("moreSettings");
                }
                element.classList.toggle("d-none");
            }
        }));
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.btnAccordion:
                this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
                break;

              case this.btnMoreSettings:
                this.displayOrHideOthersSettings();
                break;
            }
        }
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Agencement" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-magnifier class="c-category__setting" data-can-edit="true"></app-magnifier>\n\t\t\t\t<app-colour-theme class="c-category__setting" data-can-edit="true"></app-colour-theme>\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Nav" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>\n\t\t\t\t<app-scroll class="c-category__setting" data-can-edit="true"></app-scroll>\n\t\t\t\t<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>\n\t\t\t\t<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">\n\t\t\t<app-icon data-name="Photo_Video" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="medias"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-picture-video">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-stop-animations class="c-category__setting" data-can-edit="true"></app-stop-animations>\n\t\t\t\t<app-delete-background-images class="c-category__setting" data-can-edit="true"></app-delete-background-images>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class PictureVideoComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">\n\t\t\t<app-icon data-name="Audio" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="audio"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-sound">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-read-aloud class="c-category__setting" data-can-edit="true"></app-read-aloud>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class SoundComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplSound.content.cloneNode(true));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-capital-letters class="c-category__setting" data-can-edit="true"></app-capital-letters>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class TextComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplText.content.cloneNode(true));
    }
}

customElements.define("app-text", TextComponent);

"use strict";

const tmplToolbar = document.createElement("template");

tmplToolbar.innerHTML = `\n<app-header id="header"></app-header>\n`;

class ToolbarComponent extends HTMLElement {
    header=null;
    json;
    defaultJson;
    handler;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        filesServiceInstance.getJSONFile("modes-of-use").then((result => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(JSON_NAME).then((result => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                } else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(JSON_NAME, this.defaultJson);
                }
                this.initCurrentMode();
            }));
        }));
        window.addEventListener(`storage-${JSON_NAME}`, this.handler);
        this.addEventListener("changeRoute", this.handler);
    }
    initCurrentMode=() => {
        if (this.json.selectedMode) {
            routeServiceInstance.initPages(this).then((result => {
                if (result) {
                    this.setCurrentPage(result);
                }
            }));
        } else {
            routeServiceInstance.navigate(PAGE_MODES);
        }
    };
    setCurrentPage=page => {
        this.header?.setAttribute("data-selected-mode", this.json.selectedMode);
        setTimeout((() => {
            let currentPage = this.querySelector(`app-${page}`);
            if (currentPage) {
                currentPage?.setAttribute("data-modes", JSON.stringify(this.json));
            }
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "changeRoute":
            this.changeRouteEvent(event);
            break;

          case `storage-${JSON_NAME}`:
            this.storageEvent();
            break;
        }
    };
    changeRouteEvent=event => {
        let newRoute = event.detail.route;
        this.header?.focus();
        if (event.detail.mode) {
            this.json.selectedMode = event.detail.mode;
            this.querySelector(`app-${PAGE_HOME}`)?.focus();
        }
        routeServiceInstance.navigate(newRoute);
        this.setCurrentPage(newRoute);
        if (event.detail.setting) {
            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
            editSettingElement?.setAttribute("data-setting", event.detail.setting);
        }
    };
    storageEvent=() => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            this.json = result;
            this.setCurrentPage(routeServiceInstance.currentRoute);
        }));
    };
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);