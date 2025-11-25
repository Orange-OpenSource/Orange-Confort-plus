/*
 * orange-confort-plus - version 5.1.0 - 28/11/2025
 * Enhance user experience on web sites
 * © 2014 - 2025 Orange SA
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

function Readability(doc, options) {
    if (options && options.documentElement) {
        doc = options;
        options = arguments[2];
    } else if (!doc || !doc.documentElement) {
        throw new Error("First argument to Readability constructor should be a document object.");
    }
    options = options || {};
    this._doc = doc;
    this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
    this._articleTitle = null;
    this._articleByline = null;
    this._articleDir = null;
    this._articleSiteName = null;
    this._attempts = [];
    this._metadata = {};
    this._debug = !!options.debug;
    this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
    this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
    this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
    this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
    this._keepClasses = !!options.keepClasses;
    this._serializer = options.serializer || function(el) {
        return el.innerHTML;
    };
    this._disableJSONLD = !!options.disableJSONLD;
    this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;
    this._linkDensityModifier = options.linkDensityModifier || 0;
    this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
    if (this._debug) {
        let logNode = function(node) {
            if (node.nodeType == node.TEXT_NODE) {
                return `${node.nodeName} ("${node.textContent}")`;
            }
            let attrPairs = Array.from(node.attributes || [], (function(attr) {
                return `${attr.name}="${attr.value}"`;
            })).join(" ");
            return `<${node.localName} ${attrPairs}>`;
        };
        this.log = function() {
            if (typeof console !== "undefined") {
                let args = Array.from(arguments, (arg => {
                    if (arg && arg.nodeType == this.ELEMENT_NODE) {
                        return logNode(arg);
                    }
                    return arg;
                }));
                args.unshift("Reader: (Readability)");
                console.log(...args);
            } else if (typeof dump !== "undefined") {
                var msg = Array.prototype.map.call(arguments, (function(x) {
                    return x && x.nodeName ? logNode(x) : x;
                })).join(" ");
                dump("Reader: (Readability) " + msg + "\n");
            }
        };
    } else {
        this.log = function() {};
    }
}

Readability.prototype = {
    FLAG_STRIP_UNLIKELYS: 1,
    FLAG_WEIGHT_CLASSES: 2,
    FLAG_CLEAN_CONDITIONALLY: 4,
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DEFAULT_MAX_ELEMS_TO_PARSE: 0,
    DEFAULT_N_TOP_CANDIDATES: 5,
    DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
    DEFAULT_CHAR_THRESHOLD: 500,
    REGEXPS: {
        unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
        okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
        positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
        negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|footer|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|widget/i,
        extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
        byline: /byline|author|dateline|writtenby|p-author/i,
        replaceFonts: /<(\/?)font[^>]*>/gi,
        normalize: /\s{2,}/g,
        videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
        shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
        nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
        prevLink: /(prev|earl|old|new|<|«)/i,
        tokenize: /\W+/g,
        whitespace: /^\s*$/,
        hasContent: /\S$/,
        hashUrl: /^#.+/,
        srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
        b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
        commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
        jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/,
        adWords: /^(ad(vertising|vertisement)?|pub(licité)?|werb(ung)?|广告|Реклама|Anuncio)$/iu,
        loadingWords: /^((loading|正在加载|Загрузка|chargement|cargando)(…|\.\.\.)?)$/iu
    },
    UNLIKELY_ROLES: [ "menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog" ],
    DIV_TO_P_ELEMS: new Set([ "BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL" ]),
    ALTER_TO_DIV_EXCEPTIONS: [ "DIV", "ARTICLE", "SECTION", "P", "OL", "UL" ],
    PRESENTATIONAL_ATTRIBUTES: [ "align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace" ],
    DEPRECATED_SIZE_ATTRIBUTE_ELEMS: [ "TABLE", "TH", "TD", "HR", "PRE" ],
    PHRASING_ELEMS: [ "ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA", "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL", "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q", "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TEXTAREA", "TIME", "VAR", "WBR" ],
    CLASSES_TO_PRESERVE: [ "page" ],
    HTML_ESCAPE_MAP: {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'"
    },
    _postProcessContent(articleContent) {
        this._fixRelativeUris(articleContent);
        this._simplifyNestedElements(articleContent);
        if (!this._keepClasses) {
            this._cleanClasses(articleContent);
        }
    },
    _removeNodes(nodeList, filterFn) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
            throw new Error("Do not pass live node lists to _removeNodes");
        }
        for (var i = nodeList.length - 1; i >= 0; i--) {
            var node = nodeList[i];
            var parentNode = node.parentNode;
            if (parentNode) {
                if (!filterFn || filterFn.call(this, node, i, nodeList)) {
                    parentNode.removeChild(node);
                }
            }
        }
    },
    _replaceNodeTags(nodeList, newTagName) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
            throw new Error("Do not pass live node lists to _replaceNodeTags");
        }
        for (const node of nodeList) {
            this._setNodeTag(node, newTagName);
        }
    },
    _forEachNode(nodeList, fn) {
        Array.prototype.forEach.call(nodeList, fn, this);
    },
    _findNode(nodeList, fn) {
        return Array.prototype.find.call(nodeList, fn, this);
    },
    _someNode(nodeList, fn) {
        return Array.prototype.some.call(nodeList, fn, this);
    },
    _everyNode(nodeList, fn) {
        return Array.prototype.every.call(nodeList, fn, this);
    },
    _getAllNodesWithTag(node, tagNames) {
        if (node.querySelectorAll) {
            return node.querySelectorAll(tagNames.join(","));
        }
        return [].concat.apply([], tagNames.map((function(tag) {
            var collection = node.getElementsByTagName(tag);
            return Array.isArray(collection) ? collection : Array.from(collection);
        })));
    },
    _cleanClasses(node) {
        var classesToPreserve = this._classesToPreserve;
        var className = (node.getAttribute("class") || "").split(/\s+/).filter((cls => classesToPreserve.includes(cls))).join(" ");
        if (className) {
            node.setAttribute("class", className);
        } else {
            node.removeAttribute("class");
        }
        for (node = node.firstElementChild; node; node = node.nextElementSibling) {
            this._cleanClasses(node);
        }
    },
    _isUrl(str) {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    },
    _fixRelativeUris(articleContent) {
        var baseURI = this._doc.baseURI;
        var documentURI = this._doc.documentURI;
        function toAbsoluteURI(uri) {
            if (baseURI == documentURI && uri.charAt(0) == "#") {
                return uri;
            }
            try {
                return new URL(uri, baseURI).href;
            } catch (ex) {}
            return uri;
        }
        var links = this._getAllNodesWithTag(articleContent, [ "a" ]);
        this._forEachNode(links, (function(link) {
            var href = link.getAttribute("href");
            if (href) {
                if (href.indexOf("javascript:") === 0) {
                    if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
                        var text = this._doc.createTextNode(link.textContent);
                        link.parentNode.replaceChild(text, link);
                    } else {
                        var container = this._doc.createElement("span");
                        while (link.firstChild) {
                            container.appendChild(link.firstChild);
                        }
                        link.parentNode.replaceChild(container, link);
                    }
                } else {
                    link.setAttribute("href", toAbsoluteURI(href));
                }
            }
        }));
        var medias = this._getAllNodesWithTag(articleContent, [ "img", "picture", "figure", "video", "audio", "source" ]);
        this._forEachNode(medias, (function(media) {
            var src = media.getAttribute("src");
            var poster = media.getAttribute("poster");
            var srcset = media.getAttribute("srcset");
            if (src) {
                media.setAttribute("src", toAbsoluteURI(src));
            }
            if (poster) {
                media.setAttribute("poster", toAbsoluteURI(poster));
            }
            if (srcset) {
                var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, (function(_, p1, p2, p3) {
                    return toAbsoluteURI(p1) + (p2 || "") + p3;
                }));
                media.setAttribute("srcset", newSrcset);
            }
        }));
    },
    _simplifyNestedElements(articleContent) {
        var node = articleContent;
        while (node) {
            if (node.parentNode && [ "DIV", "SECTION" ].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
                if (this._isElementWithoutContent(node)) {
                    node = this._removeAndGetNext(node);
                    continue;
                } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
                    var child = node.children[0];
                    for (var i = 0; i < node.attributes.length; i++) {
                        child.setAttributeNode(node.attributes[i].cloneNode());
                    }
                    node.parentNode.replaceChild(child, node);
                    node = child;
                    continue;
                }
            }
            node = this._getNextNode(node);
        }
    },
    _getArticleTitle() {
        var doc = this._doc;
        var curTitle = "";
        var origTitle = "";
        try {
            curTitle = origTitle = doc.title.trim();
            if (typeof curTitle !== "string") {
                curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
            }
        } catch (e) {}
        var titleHadHierarchicalSeparators = false;
        function wordCount(str) {
            return str.split(/\s+/).length;
        }
        if (/ [\|\-\\\/>»] /.test(curTitle)) {
            titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
            let allSeparators = Array.from(origTitle.matchAll(/ [\|\-\\\/>»] /gi));
            curTitle = origTitle.substring(0, allSeparators.pop().index);
            if (wordCount(curTitle) < 3) {
                curTitle = origTitle.replace(/^[^\|\-\\\/>»]*[\|\-\\\/>»]/gi, "");
            }
        } else if (curTitle.includes(": ")) {
            var headings = this._getAllNodesWithTag(doc, [ "h1", "h2" ]);
            var trimmedTitle = curTitle.trim();
            var match = this._someNode(headings, (function(heading) {
                return heading.textContent.trim() === trimmedTitle;
            }));
            if (!match) {
                curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
                if (wordCount(curTitle) < 3) {
                    curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
                } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
                    curTitle = origTitle;
                }
            }
        } else if (curTitle.length > 150 || curTitle.length < 15) {
            var hOnes = doc.getElementsByTagName("h1");
            if (hOnes.length === 1) {
                curTitle = this._getInnerText(hOnes[0]);
            }
        }
        curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
        var curTitleWordCount = wordCount(curTitle);
        if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
            curTitle = origTitle;
        }
        return curTitle;
    },
    _prepDocument() {
        var doc = this._doc;
        this._removeNodes(this._getAllNodesWithTag(doc, [ "style" ]));
        if (doc.body) {
            this._replaceBrs(doc.body);
        }
        this._replaceNodeTags(this._getAllNodesWithTag(doc, [ "font" ]), "SPAN");
    },
    _nextNode(node) {
        var next = node;
        while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) {
            next = next.nextSibling;
        }
        return next;
    },
    _replaceBrs(elem) {
        this._forEachNode(this._getAllNodesWithTag(elem, [ "br" ]), (function(br) {
            var next = br.nextSibling;
            var replaced = false;
            while ((next = this._nextNode(next)) && next.tagName == "BR") {
                replaced = true;
                var brSibling = next.nextSibling;
                next.remove();
                next = brSibling;
            }
            if (replaced) {
                var p = this._doc.createElement("p");
                br.parentNode.replaceChild(p, br);
                next = p.nextSibling;
                while (next) {
                    if (next.tagName == "BR") {
                        var nextElem = this._nextNode(next.nextSibling);
                        if (nextElem && nextElem.tagName == "BR") {
                            break;
                        }
                    }
                    if (!this._isPhrasingContent(next)) {
                        break;
                    }
                    var sibling = next.nextSibling;
                    p.appendChild(next);
                    next = sibling;
                }
                while (p.lastChild && this._isWhitespace(p.lastChild)) {
                    p.lastChild.remove();
                }
                if (p.parentNode.tagName === "P") {
                    this._setNodeTag(p.parentNode, "DIV");
                }
            }
        }));
    },
    _setNodeTag(node, tag) {
        this.log("_setNodeTag", node, tag);
        if (this._docJSDOMParser) {
            node.localName = tag.toLowerCase();
            node.tagName = tag.toUpperCase();
            return node;
        }
        var replacement = node.ownerDocument.createElement(tag);
        while (node.firstChild) {
            replacement.appendChild(node.firstChild);
        }
        node.parentNode.replaceChild(replacement, node);
        if (node.readability) {
            replacement.readability = node.readability;
        }
        for (var i = 0; i < node.attributes.length; i++) {
            replacement.setAttributeNode(node.attributes[i].cloneNode());
        }
        return replacement;
    },
    _prepArticle(articleContent) {
        this._cleanStyles(articleContent);
        this._markDataTables(articleContent);
        this._fixLazyImages(articleContent);
        this._cleanConditionally(articleContent, "form");
        this._cleanConditionally(articleContent, "fieldset");
        this._clean(articleContent, "object");
        this._clean(articleContent, "embed");
        this._clean(articleContent, "footer");
        this._clean(articleContent, "link");
        this._clean(articleContent, "aside");
        var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
        this._forEachNode(articleContent.children, (function(topCandidate) {
            this._cleanMatchedNodes(topCandidate, (function(node, matchString) {
                return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
            }));
        }));
        this._clean(articleContent, "iframe");
        this._clean(articleContent, "input");
        this._clean(articleContent, "textarea");
        this._clean(articleContent, "select");
        this._clean(articleContent, "button");
        this._cleanHeaders(articleContent);
        this._cleanConditionally(articleContent, "table");
        this._cleanConditionally(articleContent, "ul");
        this._cleanConditionally(articleContent, "div");
        this._replaceNodeTags(this._getAllNodesWithTag(articleContent, [ "h1" ]), "h2");
        this._removeNodes(this._getAllNodesWithTag(articleContent, [ "p" ]), (function(paragraph) {
            var contentElementCount = this._getAllNodesWithTag(paragraph, [ "img", "embed", "object", "iframe" ]).length;
            return contentElementCount === 0 && !this._getInnerText(paragraph, false);
        }));
        this._forEachNode(this._getAllNodesWithTag(articleContent, [ "br" ]), (function(br) {
            var next = this._nextNode(br.nextSibling);
            if (next && next.tagName == "P") {
                br.remove();
            }
        }));
        this._forEachNode(this._getAllNodesWithTag(articleContent, [ "table" ]), (function(table) {
            var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
            if (this._hasSingleTagInsideElement(tbody, "TR")) {
                var row = tbody.firstElementChild;
                if (this._hasSingleTagInsideElement(row, "TD")) {
                    var cell = row.firstElementChild;
                    cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
                    table.parentNode.replaceChild(cell, table);
                }
            }
        }));
    },
    _initializeNode(node) {
        node.readability = {
            contentScore: 0
        };
        switch (node.tagName) {
          case "DIV":
            node.readability.contentScore += 5;
            break;

          case "PRE":
          case "TD":
          case "BLOCKQUOTE":
            node.readability.contentScore += 3;
            break;

          case "ADDRESS":
          case "OL":
          case "UL":
          case "DL":
          case "DD":
          case "DT":
          case "LI":
          case "FORM":
            node.readability.contentScore -= 3;
            break;

          case "H1":
          case "H2":
          case "H3":
          case "H4":
          case "H5":
          case "H6":
          case "TH":
            node.readability.contentScore -= 5;
            break;
        }
        node.readability.contentScore += this._getClassWeight(node);
    },
    _removeAndGetNext(node) {
        var nextNode = this._getNextNode(node, true);
        node.remove();
        return nextNode;
    },
    _getNextNode(node, ignoreSelfAndKids) {
        if (!ignoreSelfAndKids && node.firstElementChild) {
            return node.firstElementChild;
        }
        if (node.nextElementSibling) {
            return node.nextElementSibling;
        }
        do {
            node = node.parentNode;
        } while (node && !node.nextElementSibling);
        return node && node.nextElementSibling;
    },
    _textSimilarity(textA, textB) {
        var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        if (!tokensA.length || !tokensB.length) {
            return 0;
        }
        var uniqTokensB = tokensB.filter((token => !tokensA.includes(token)));
        var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
        return 1 - distanceB;
    },
    _isValidByline(node, matchString) {
        var rel = node.getAttribute("rel");
        var itemprop = node.getAttribute("itemprop");
        var bylineLength = node.textContent.trim().length;
        return (rel === "author" || itemprop && itemprop.includes("author") || this.REGEXPS.byline.test(matchString)) && !!bylineLength && bylineLength < 100;
    },
    _getNodeAncestors(node, maxDepth) {
        maxDepth = maxDepth || 0;
        var i = 0, ancestors = [];
        while (node.parentNode) {
            ancestors.push(node.parentNode);
            if (maxDepth && ++i === maxDepth) {
                break;
            }
            node = node.parentNode;
        }
        return ancestors;
    },
    _grabArticle(page) {
        this.log("**** grabArticle ****");
        var doc = this._doc;
        var isPaging = page !== null;
        page = page ? page : this._doc.body;
        if (!page) {
            this.log("No body found in document. Abort.");
            return null;
        }
        var pageCacheHtml = page.innerHTML;
        while (true) {
            this.log("Starting grabArticle loop");
            var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
            var elementsToScore = [];
            var node = this._doc.documentElement;
            let shouldRemoveTitleHeader = true;
            while (node) {
                if (node.tagName === "HTML") {
                    this._articleLang = node.getAttribute("lang");
                }
                var matchString = node.className + " " + node.id;
                if (!this._isProbablyVisible(node)) {
                    this.log("Removing hidden node - " + matchString);
                    node = this._removeAndGetNext(node);
                    continue;
                }
                if (node.getAttribute("aria-modal") == "true" && node.getAttribute("role") == "dialog") {
                    node = this._removeAndGetNext(node);
                    continue;
                }
                if (!this._articleByline && !this._metadata.byline && this._isValidByline(node, matchString)) {
                    var endOfSearchMarkerNode = this._getNextNode(node, true);
                    var next = this._getNextNode(node);
                    var itemPropNameNode = null;
                    while (next && next != endOfSearchMarkerNode) {
                        var itemprop = next.getAttribute("itemprop");
                        if (itemprop && itemprop.includes("name")) {
                            itemPropNameNode = next;
                            break;
                        } else {
                            next = this._getNextNode(next);
                        }
                    }
                    this._articleByline = (itemPropNameNode ?? node).textContent.trim();
                    node = this._removeAndGetNext(node);
                    continue;
                }
                if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
                    this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
                    shouldRemoveTitleHeader = false;
                    node = this._removeAndGetNext(node);
                    continue;
                }
                if (stripUnlikelyCandidates) {
                    if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
                        this.log("Removing unlikely candidate - " + matchString);
                        node = this._removeAndGetNext(node);
                        continue;
                    }
                    if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
                        this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
                        node = this._removeAndGetNext(node);
                        continue;
                    }
                }
                if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
                    node = this._removeAndGetNext(node);
                    continue;
                }
                if (this.DEFAULT_TAGS_TO_SCORE.includes(node.tagName)) {
                    elementsToScore.push(node);
                }
                if (node.tagName === "DIV") {
                    var p = null;
                    var childNode = node.firstChild;
                    while (childNode) {
                        var nextSibling = childNode.nextSibling;
                        if (this._isPhrasingContent(childNode)) {
                            if (p !== null) {
                                p.appendChild(childNode);
                            } else if (!this._isWhitespace(childNode)) {
                                p = doc.createElement("p");
                                node.replaceChild(p, childNode);
                                p.appendChild(childNode);
                            }
                        } else if (p !== null) {
                            while (p.lastChild && this._isWhitespace(p.lastChild)) {
                                p.lastChild.remove();
                            }
                            p = null;
                        }
                        childNode = nextSibling;
                    }
                    if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < .25) {
                        var newNode = node.children[0];
                        node.parentNode.replaceChild(newNode, node);
                        node = newNode;
                        elementsToScore.push(node);
                    } else if (!this._hasChildBlockElement(node)) {
                        node = this._setNodeTag(node, "P");
                        elementsToScore.push(node);
                    }
                }
                node = this._getNextNode(node);
            }
            var candidates = [];
            this._forEachNode(elementsToScore, (function(elementToScore) {
                if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined") {
                    return;
                }
                var innerText = this._getInnerText(elementToScore);
                if (innerText.length < 25) {
                    return;
                }
                var ancestors = this._getNodeAncestors(elementToScore, 5);
                if (ancestors.length === 0) {
                    return;
                }
                var contentScore = 0;
                contentScore += 1;
                contentScore += innerText.split(this.REGEXPS.commas).length;
                contentScore += Math.min(Math.floor(innerText.length / 100), 3);
                this._forEachNode(ancestors, (function(ancestor, level) {
                    if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined") {
                        return;
                    }
                    if (typeof ancestor.readability === "undefined") {
                        this._initializeNode(ancestor);
                        candidates.push(ancestor);
                    }
                    if (level === 0) {
                        var scoreDivider = 1;
                    } else if (level === 1) {
                        scoreDivider = 2;
                    } else {
                        scoreDivider = level * 3;
                    }
                    ancestor.readability.contentScore += contentScore / scoreDivider;
                }));
            }));
            var topCandidates = [];
            for (var c = 0, cl = candidates.length; c < cl; c += 1) {
                var candidate = candidates[c];
                var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
                candidate.readability.contentScore = candidateScore;
                this.log("Candidate:", candidate, "with score " + candidateScore);
                for (var t = 0; t < this._nbTopCandidates; t++) {
                    var aTopCandidate = topCandidates[t];
                    if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
                        topCandidates.splice(t, 0, candidate);
                        if (topCandidates.length > this._nbTopCandidates) {
                            topCandidates.pop();
                        }
                        break;
                    }
                }
            }
            var topCandidate = topCandidates[0] || null;
            var neededToCreateTopCandidate = false;
            var parentOfTopCandidate;
            if (topCandidate === null || topCandidate.tagName === "BODY") {
                topCandidate = doc.createElement("DIV");
                neededToCreateTopCandidate = true;
                while (page.firstChild) {
                    this.log("Moving child out:", page.firstChild);
                    topCandidate.appendChild(page.firstChild);
                }
                page.appendChild(topCandidate);
                this._initializeNode(topCandidate);
            } else if (topCandidate) {
                var alternativeCandidateAncestors = [];
                for (var i = 1; i < topCandidates.length; i++) {
                    if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= .75) {
                        alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
                    }
                }
                var MINIMUM_TOPCANDIDATES = 3;
                if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
                    parentOfTopCandidate = topCandidate.parentNode;
                    while (parentOfTopCandidate.tagName !== "BODY") {
                        var listsContainingThisAncestor = 0;
                        for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
                            listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
                        }
                        if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
                            topCandidate = parentOfTopCandidate;
                            break;
                        }
                        parentOfTopCandidate = parentOfTopCandidate.parentNode;
                    }
                }
                if (!topCandidate.readability) {
                    this._initializeNode(topCandidate);
                }
                parentOfTopCandidate = topCandidate.parentNode;
                var lastScore = topCandidate.readability.contentScore;
                var scoreThreshold = lastScore / 3;
                while (parentOfTopCandidate.tagName !== "BODY") {
                    if (!parentOfTopCandidate.readability) {
                        parentOfTopCandidate = parentOfTopCandidate.parentNode;
                        continue;
                    }
                    var parentScore = parentOfTopCandidate.readability.contentScore;
                    if (parentScore < scoreThreshold) {
                        break;
                    }
                    if (parentScore > lastScore) {
                        topCandidate = parentOfTopCandidate;
                        break;
                    }
                    lastScore = parentOfTopCandidate.readability.contentScore;
                    parentOfTopCandidate = parentOfTopCandidate.parentNode;
                }
                parentOfTopCandidate = topCandidate.parentNode;
                while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
                    topCandidate = parentOfTopCandidate;
                    parentOfTopCandidate = topCandidate.parentNode;
                }
                if (!topCandidate.readability) {
                    this._initializeNode(topCandidate);
                }
            }
            var articleContent = doc.createElement("DIV");
            if (isPaging) {
                articleContent.id = "readability-content";
            }
            var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * .2);
            parentOfTopCandidate = topCandidate.parentNode;
            var siblings = parentOfTopCandidate.children;
            for (var s = 0, sl = siblings.length; s < sl; s++) {
                var sibling = siblings[s];
                var append = false;
                this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
                this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
                if (sibling === topCandidate) {
                    append = true;
                } else {
                    var contentBonus = 0;
                    if (sibling.className === topCandidate.className && topCandidate.className !== "") {
                        contentBonus += topCandidate.readability.contentScore * .2;
                    }
                    if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
                        append = true;
                    } else if (sibling.nodeName === "P") {
                        var linkDensity = this._getLinkDensity(sibling);
                        var nodeContent = this._getInnerText(sibling);
                        var nodeLength = nodeContent.length;
                        if (nodeLength > 80 && linkDensity < .25) {
                            append = true;
                        } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
                            append = true;
                        }
                    }
                }
                if (append) {
                    this.log("Appending node:", sibling);
                    if (!this.ALTER_TO_DIV_EXCEPTIONS.includes(sibling.nodeName)) {
                        this.log("Altering sibling:", sibling, "to div.");
                        sibling = this._setNodeTag(sibling, "DIV");
                    }
                    articleContent.appendChild(sibling);
                    siblings = parentOfTopCandidate.children;
                    s -= 1;
                    sl -= 1;
                }
            }
            if (this._debug) {
                this.log("Article content pre-prep: " + articleContent.innerHTML);
            }
            this._prepArticle(articleContent);
            if (this._debug) {
                this.log("Article content post-prep: " + articleContent.innerHTML);
            }
            if (neededToCreateTopCandidate) {
                topCandidate.id = "readability-page-1";
                topCandidate.className = "page";
            } else {
                var div = doc.createElement("DIV");
                div.id = "readability-page-1";
                div.className = "page";
                while (articleContent.firstChild) {
                    div.appendChild(articleContent.firstChild);
                }
                articleContent.appendChild(div);
            }
            if (this._debug) {
                this.log("Article content after paging: " + articleContent.innerHTML);
            }
            var parseSuccessful = true;
            var textLength = this._getInnerText(articleContent, true).length;
            if (textLength < this._charThreshold) {
                parseSuccessful = false;
                page.innerHTML = pageCacheHtml;
                this._attempts.push({
                    articleContent: articleContent,
                    textLength: textLength
                });
                if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
                    this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
                } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
                    this._removeFlag(this.FLAG_WEIGHT_CLASSES);
                } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
                    this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
                } else {
                    this._attempts.sort((function(a, b) {
                        return b.textLength - a.textLength;
                    }));
                    if (!this._attempts[0].textLength) {
                        return null;
                    }
                    articleContent = this._attempts[0].articleContent;
                    parseSuccessful = true;
                }
            }
            if (parseSuccessful) {
                var ancestors = [ parentOfTopCandidate, topCandidate ].concat(this._getNodeAncestors(parentOfTopCandidate));
                this._someNode(ancestors, (function(ancestor) {
                    if (!ancestor.tagName) {
                        return false;
                    }
                    var articleDir = ancestor.getAttribute("dir");
                    if (articleDir) {
                        this._articleDir = articleDir;
                        return true;
                    }
                    return false;
                }));
                return articleContent;
            }
        }
    },
    _unescapeHtmlEntities(str) {
        if (!str) {
            return str;
        }
        var htmlEscapeMap = this.HTML_ESCAPE_MAP;
        return str.replace(/&(quot|amp|apos|lt|gt);/g, (function(_, tag) {
            return htmlEscapeMap[tag];
        })).replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (function(_, hex, numStr) {
            var num = parseInt(hex || numStr, hex ? 16 : 10);
            if (num == 0 || num > 1114111 || num >= 55296 && num <= 57343) {
                num = 65533;
            }
            return String.fromCodePoint(num);
        }));
    },
    _getJSONLD(doc) {
        var scripts = this._getAllNodesWithTag(doc, [ "script" ]);
        var metadata;
        this._forEachNode(scripts, (function(jsonLdElement) {
            if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") {
                try {
                    var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
                    var parsed = JSON.parse(content);
                    if (Array.isArray(parsed)) {
                        parsed = parsed.find((it => it["@type"] && it["@type"].match(this.REGEXPS.jsonLdArticleTypes)));
                        if (!parsed) {
                            return;
                        }
                    }
                    var schemaDotOrgRegex = /^https?\:\/\/schema\.org\/?$/;
                    var matches = typeof parsed["@context"] === "string" && parsed["@context"].match(schemaDotOrgRegex) || typeof parsed["@context"] === "object" && typeof parsed["@context"]["@vocab"] == "string" && parsed["@context"]["@vocab"].match(schemaDotOrgRegex);
                    if (!matches) {
                        return;
                    }
                    if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
                        parsed = parsed["@graph"].find((it => (it["@type"] || "").match(this.REGEXPS.jsonLdArticleTypes)));
                    }
                    if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) {
                        return;
                    }
                    metadata = {};
                    if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
                        var title = this._getArticleTitle();
                        var nameMatches = this._textSimilarity(parsed.name, title) > .75;
                        var headlineMatches = this._textSimilarity(parsed.headline, title) > .75;
                        if (headlineMatches && !nameMatches) {
                            metadata.title = parsed.headline;
                        } else {
                            metadata.title = parsed.name;
                        }
                    } else if (typeof parsed.name === "string") {
                        metadata.title = parsed.name.trim();
                    } else if (typeof parsed.headline === "string") {
                        metadata.title = parsed.headline.trim();
                    }
                    if (parsed.author) {
                        if (typeof parsed.author.name === "string") {
                            metadata.byline = parsed.author.name.trim();
                        } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
                            metadata.byline = parsed.author.filter((function(author) {
                                return author && typeof author.name === "string";
                            })).map((function(author) {
                                return author.name.trim();
                            })).join(", ");
                        }
                    }
                    if (typeof parsed.description === "string") {
                        metadata.excerpt = parsed.description.trim();
                    }
                    if (parsed.publisher && typeof parsed.publisher.name === "string") {
                        metadata.siteName = parsed.publisher.name.trim();
                    }
                    if (typeof parsed.datePublished === "string") {
                        metadata.datePublished = parsed.datePublished.trim();
                    }
                } catch (err) {
                    this.log(err.message);
                }
            }
        }));
        return metadata ? metadata : {};
    },
    _getArticleMetadata(jsonld) {
        var metadata = {};
        var values = {};
        var metaElements = this._doc.getElementsByTagName("meta");
        var propertyPattern = /\s*(article|dc|dcterm|og|twitter)\s*:\s*(author|creator|description|published_time|title|site_name)\s*/gi;
        var namePattern = /^\s*(?:(dc|dcterm|og|twitter|parsely|weibo:(article|webpage))\s*[-\.:]\s*)?(author|creator|pub-date|description|title|site_name)\s*$/i;
        this._forEachNode(metaElements, (function(element) {
            var elementName = element.getAttribute("name");
            var elementProperty = element.getAttribute("property");
            var content = element.getAttribute("content");
            if (!content) {
                return;
            }
            var matches = null;
            var name = null;
            if (elementProperty) {
                matches = elementProperty.match(propertyPattern);
                if (matches) {
                    name = matches[0].toLowerCase().replace(/\s/g, "");
                    values[name] = content.trim();
                }
            }
            if (!matches && elementName && namePattern.test(elementName)) {
                name = elementName;
                if (content) {
                    name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
                    values[name] = content.trim();
                }
            }
        }));
        metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values.title || values["twitter:title"] || values["parsely-title"];
        if (!metadata.title) {
            metadata.title = this._getArticleTitle();
        }
        const articleAuthor = typeof values["article:author"] === "string" && !this._isUrl(values["article:author"]) ? values["article:author"] : undefined;
        metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values.author || values["parsely-author"] || articleAuthor;
        metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values.description || values["twitter:description"];
        metadata.siteName = jsonld.siteName || values["og:site_name"];
        metadata.publishedTime = jsonld.datePublished || values["article:published_time"] || values["parsely-pub-date"] || null;
        metadata.title = this._unescapeHtmlEntities(metadata.title);
        metadata.byline = this._unescapeHtmlEntities(metadata.byline);
        metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
        metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
        metadata.publishedTime = this._unescapeHtmlEntities(metadata.publishedTime);
        return metadata;
    },
    _isSingleImage(node) {
        while (node) {
            if (node.tagName === "IMG") {
                return true;
            }
            if (node.children.length !== 1 || node.textContent.trim() !== "") {
                return false;
            }
            node = node.children[0];
        }
        return false;
    },
    _unwrapNoscriptImages(doc) {
        var imgs = Array.from(doc.getElementsByTagName("img"));
        this._forEachNode(imgs, (function(img) {
            for (var i = 0; i < img.attributes.length; i++) {
                var attr = img.attributes[i];
                switch (attr.name) {
                  case "src":
                  case "srcset":
                  case "data-src":
                  case "data-srcset":
                    return;
                }
                if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                    return;
                }
            }
            img.remove();
        }));
        var noscripts = Array.from(doc.getElementsByTagName("noscript"));
        this._forEachNode(noscripts, (function(noscript) {
            if (!this._isSingleImage(noscript)) {
                return;
            }
            var tmp = doc.createElement("div");
            tmp.innerHTML = noscript.innerHTML;
            var prevElement = noscript.previousElementSibling;
            if (prevElement && this._isSingleImage(prevElement)) {
                var prevImg = prevElement;
                if (prevImg.tagName !== "IMG") {
                    prevImg = prevElement.getElementsByTagName("img")[0];
                }
                var newImg = tmp.getElementsByTagName("img")[0];
                for (var i = 0; i < prevImg.attributes.length; i++) {
                    var attr = prevImg.attributes[i];
                    if (attr.value === "") {
                        continue;
                    }
                    if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                        if (newImg.getAttribute(attr.name) === attr.value) {
                            continue;
                        }
                        var attrName = attr.name;
                        if (newImg.hasAttribute(attrName)) {
                            attrName = "data-old-" + attrName;
                        }
                        newImg.setAttribute(attrName, attr.value);
                    }
                }
                noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
            }
        }));
    },
    _removeScripts(doc) {
        this._removeNodes(this._getAllNodesWithTag(doc, [ "script", "noscript" ]));
    },
    _hasSingleTagInsideElement(element, tag) {
        if (element.children.length != 1 || element.children[0].tagName !== tag) {
            return false;
        }
        return !this._someNode(element.childNodes, (function(node) {
            return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
        }));
    },
    _isElementWithoutContent(node) {
        return node.nodeType === this.ELEMENT_NODE && !node.textContent.trim().length && (!node.children.length || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
    },
    _hasChildBlockElement(element) {
        return this._someNode(element.childNodes, (function(node) {
            return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
        }));
    },
    _isPhrasingContent(node) {
        return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.includes(node.tagName) || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
    },
    _isWhitespace(node) {
        return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
    },
    _getInnerText(e, normalizeSpaces) {
        normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
        var textContent = e.textContent.trim();
        if (normalizeSpaces) {
            return textContent.replace(this.REGEXPS.normalize, " ");
        }
        return textContent;
    },
    _getCharCount(e, s) {
        s = s || ",";
        return this._getInnerText(e).split(s).length - 1;
    },
    _cleanStyles(e) {
        if (!e || e.tagName.toLowerCase() === "svg") {
            return;
        }
        for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
            e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
        }
        if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.includes(e.tagName)) {
            e.removeAttribute("width");
            e.removeAttribute("height");
        }
        var cur = e.firstElementChild;
        while (cur !== null) {
            this._cleanStyles(cur);
            cur = cur.nextElementSibling;
        }
    },
    _getLinkDensity(element) {
        var textLength = this._getInnerText(element).length;
        if (textLength === 0) {
            return 0;
        }
        var linkLength = 0;
        this._forEachNode(element.getElementsByTagName("a"), (function(linkNode) {
            var href = linkNode.getAttribute("href");
            var coefficient = href && this.REGEXPS.hashUrl.test(href) ? .3 : 1;
            linkLength += this._getInnerText(linkNode).length * coefficient;
        }));
        return linkLength / textLength;
    },
    _getClassWeight(e) {
        if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
            return 0;
        }
        var weight = 0;
        if (typeof e.className === "string" && e.className !== "") {
            if (this.REGEXPS.negative.test(e.className)) {
                weight -= 25;
            }
            if (this.REGEXPS.positive.test(e.className)) {
                weight += 25;
            }
        }
        if (typeof e.id === "string" && e.id !== "") {
            if (this.REGEXPS.negative.test(e.id)) {
                weight -= 25;
            }
            if (this.REGEXPS.positive.test(e.id)) {
                weight += 25;
            }
        }
        return weight;
    },
    _clean(e, tag) {
        var isEmbed = [ "object", "embed", "iframe" ].includes(tag);
        this._removeNodes(this._getAllNodesWithTag(e, [ tag ]), (function(element) {
            if (isEmbed) {
                for (var i = 0; i < element.attributes.length; i++) {
                    if (this._allowedVideoRegex.test(element.attributes[i].value)) {
                        return false;
                    }
                }
                if (element.tagName === "object" && this._allowedVideoRegex.test(element.innerHTML)) {
                    return false;
                }
            }
            return true;
        }));
    },
    _hasAncestorTag(node, tagName, maxDepth, filterFn) {
        maxDepth = maxDepth || 3;
        tagName = tagName.toUpperCase();
        var depth = 0;
        while (node.parentNode) {
            if (maxDepth > 0 && depth > maxDepth) {
                return false;
            }
            if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode))) {
                return true;
            }
            node = node.parentNode;
            depth++;
        }
        return false;
    },
    _getRowAndColumnCount(table) {
        var rows = 0;
        var columns = 0;
        var trs = table.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {
            var rowspan = trs[i].getAttribute("rowspan") || 0;
            if (rowspan) {
                rowspan = parseInt(rowspan, 10);
            }
            rows += rowspan || 1;
            var columnsInThisRow = 0;
            var cells = trs[i].getElementsByTagName("td");
            for (var j = 0; j < cells.length; j++) {
                var colspan = cells[j].getAttribute("colspan") || 0;
                if (colspan) {
                    colspan = parseInt(colspan, 10);
                }
                columnsInThisRow += colspan || 1;
            }
            columns = Math.max(columns, columnsInThisRow);
        }
        return {
            rows: rows,
            columns: columns
        };
    },
    _markDataTables(root) {
        var tables = root.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var role = table.getAttribute("role");
            if (role == "presentation") {
                table._readabilityDataTable = false;
                continue;
            }
            var datatable = table.getAttribute("datatable");
            if (datatable == "0") {
                table._readabilityDataTable = false;
                continue;
            }
            var summary = table.getAttribute("summary");
            if (summary) {
                table._readabilityDataTable = true;
                continue;
            }
            var caption = table.getElementsByTagName("caption")[0];
            if (caption && caption.childNodes.length) {
                table._readabilityDataTable = true;
                continue;
            }
            var dataTableDescendants = [ "col", "colgroup", "tfoot", "thead", "th" ];
            var descendantExists = function(tag) {
                return !!table.getElementsByTagName(tag)[0];
            };
            if (dataTableDescendants.some(descendantExists)) {
                this.log("Data table because found data-y descendant");
                table._readabilityDataTable = true;
                continue;
            }
            if (table.getElementsByTagName("table")[0]) {
                table._readabilityDataTable = false;
                continue;
            }
            var sizeInfo = this._getRowAndColumnCount(table);
            if (sizeInfo.columns == 1 || sizeInfo.rows == 1) {
                table._readabilityDataTable = false;
                continue;
            }
            if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
                table._readabilityDataTable = true;
                continue;
            }
            table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
        }
    },
    _fixLazyImages(root) {
        this._forEachNode(this._getAllNodesWithTag(root, [ "img", "picture", "figure" ]), (function(elem) {
            if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
                var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
                if (parts[1] === "image/svg+xml") {
                    return;
                }
                var srcCouldBeRemoved = false;
                for (var i = 0; i < elem.attributes.length; i++) {
                    var attr = elem.attributes[i];
                    if (attr.name === "src") {
                        continue;
                    }
                    if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                        srcCouldBeRemoved = true;
                        break;
                    }
                }
                if (srcCouldBeRemoved) {
                    var b64starts = parts[0].length;
                    var b64length = elem.src.length - b64starts;
                    if (b64length < 133) {
                        elem.removeAttribute("src");
                    }
                }
            }
            if ((elem.src || elem.srcset && elem.srcset != "null") && !elem.className.toLowerCase().includes("lazy")) {
                return;
            }
            for (var j = 0; j < elem.attributes.length; j++) {
                attr = elem.attributes[j];
                if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") {
                    continue;
                }
                var copyTo = null;
                if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
                    copyTo = "srcset";
                } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
                    copyTo = "src";
                }
                if (copyTo) {
                    if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
                        elem.setAttribute(copyTo, attr.value);
                    } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, [ "img", "picture" ]).length) {
                        var img = this._doc.createElement("img");
                        img.setAttribute(copyTo, attr.value);
                        elem.appendChild(img);
                    }
                }
            }
        }));
    },
    _getTextDensity(e, tags) {
        var textLength = this._getInnerText(e, true).length;
        if (textLength === 0) {
            return 0;
        }
        var childrenLength = 0;
        var children = this._getAllNodesWithTag(e, tags);
        this._forEachNode(children, (child => childrenLength += this._getInnerText(child, true).length));
        return childrenLength / textLength;
    },
    _cleanConditionally(e, tag) {
        if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
            return;
        }
        this._removeNodes(this._getAllNodesWithTag(e, [ tag ]), (function(node) {
            var isDataTable = function(t) {
                return t._readabilityDataTable;
            };
            var isList = tag === "ul" || tag === "ol";
            if (!isList) {
                var listLength = 0;
                var listNodes = this._getAllNodesWithTag(node, [ "ul", "ol" ]);
                this._forEachNode(listNodes, (list => listLength += this._getInnerText(list).length));
                isList = listLength / this._getInnerText(node).length > .9;
            }
            if (tag === "table" && isDataTable(node)) {
                return false;
            }
            if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
                return false;
            }
            if (this._hasAncestorTag(node, "code")) {
                return false;
            }
            if ([ ...node.getElementsByTagName("table") ].some((tbl => tbl._readabilityDataTable))) {
                return false;
            }
            var weight = this._getClassWeight(node);
            this.log("Cleaning Conditionally", node);
            var contentScore = 0;
            if (weight + contentScore < 0) {
                return true;
            }
            if (this._getCharCount(node, ",") < 10) {
                var p = node.getElementsByTagName("p").length;
                var img = node.getElementsByTagName("img").length;
                var li = node.getElementsByTagName("li").length - 100;
                var input = node.getElementsByTagName("input").length;
                var headingDensity = this._getTextDensity(node, [ "h1", "h2", "h3", "h4", "h5", "h6" ]);
                var embedCount = 0;
                var embeds = this._getAllNodesWithTag(node, [ "object", "embed", "iframe" ]);
                for (var i = 0; i < embeds.length; i++) {
                    for (var j = 0; j < embeds[i].attributes.length; j++) {
                        if (this._allowedVideoRegex.test(embeds[i].attributes[j].value)) {
                            return false;
                        }
                    }
                    if (embeds[i].tagName === "object" && this._allowedVideoRegex.test(embeds[i].innerHTML)) {
                        return false;
                    }
                    embedCount++;
                }
                var innerText = this._getInnerText(node);
                if (this.REGEXPS.adWords.test(innerText) || this.REGEXPS.loadingWords.test(innerText)) {
                    return true;
                }
                var contentLength = innerText.length;
                var linkDensity = this._getLinkDensity(node);
                var textishTags = [ "SPAN", "LI", "TD" ].concat(Array.from(this.DIV_TO_P_ELEMS));
                var textDensity = this._getTextDensity(node, textishTags);
                var isFigureChild = this._hasAncestorTag(node, "figure");
                const shouldRemoveNode = () => {
                    const errs = [];
                    if (!isFigureChild && img > 1 && p / img < .5) {
                        errs.push(`Bad p to img ratio (img=${img}, p=${p})`);
                    }
                    if (!isList && li > p) {
                        errs.push(`Too many li's outside of a list. (li=${li} > p=${p})`);
                    }
                    if (input > Math.floor(p / 3)) {
                        errs.push(`Too many inputs per p. (input=${input}, p=${p})`);
                    }
                    if (!isList && !isFigureChild && headingDensity < .9 && contentLength < 25 && (img === 0 || img > 2) && linkDensity > 0) {
                        errs.push(`Suspiciously short. (headingDensity=${headingDensity}, img=${img}, linkDensity=${linkDensity})`);
                    }
                    if (!isList && weight < 25 && linkDensity > .2 + this._linkDensityModifier) {
                        errs.push(`Low weight and a little linky. (linkDensity=${linkDensity})`);
                    }
                    if (weight >= 25 && linkDensity > .5 + this._linkDensityModifier) {
                        errs.push(`High weight and mostly links. (linkDensity=${linkDensity})`);
                    }
                    if (embedCount === 1 && contentLength < 75 || embedCount > 1) {
                        errs.push(`Suspicious embed. (embedCount=${embedCount}, contentLength=${contentLength})`);
                    }
                    if (img === 0 && textDensity === 0) {
                        errs.push(`No useful content. (img=${img}, textDensity=${textDensity})`);
                    }
                    if (errs.length) {
                        this.log("Checks failed", errs);
                        return true;
                    }
                    return false;
                };
                var haveToRemove = shouldRemoveNode();
                if (isList && haveToRemove) {
                    for (var x = 0; x < node.children.length; x++) {
                        let child = node.children[x];
                        if (child.children.length > 1) {
                            return haveToRemove;
                        }
                    }
                    let li_count = node.getElementsByTagName("li").length;
                    if (img == li_count) {
                        return false;
                    }
                }
                return haveToRemove;
            }
            return false;
        }));
    },
    _cleanMatchedNodes(e, filter) {
        var endOfSearchMarkerNode = this._getNextNode(e, true);
        var next = this._getNextNode(e);
        while (next && next != endOfSearchMarkerNode) {
            if (filter.call(this, next, next.className + " " + next.id)) {
                next = this._removeAndGetNext(next);
            } else {
                next = this._getNextNode(next);
            }
        }
    },
    _cleanHeaders(e) {
        let headingNodes = this._getAllNodesWithTag(e, [ "h1", "h2" ]);
        this._removeNodes(headingNodes, (function(node) {
            let shouldRemove = this._getClassWeight(node) < 0;
            if (shouldRemove) {
                this.log("Removing header with low class weight:", node);
            }
            return shouldRemove;
        }));
    },
    _headerDuplicatesTitle(node) {
        if (node.tagName != "H1" && node.tagName != "H2") {
            return false;
        }
        var heading = this._getInnerText(node, false);
        this.log("Evaluating similarity of header:", heading, this._articleTitle);
        return this._textSimilarity(this._articleTitle, heading) > .75;
    },
    _flagIsActive(flag) {
        return (this._flags & flag) > 0;
    },
    _removeFlag(flag) {
        this._flags = this._flags & ~flag;
    },
    _isProbablyVisible(node) {
        return (!node.style || node.style.display != "none") && (!node.style || node.style.visibility != "hidden") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.includes && node.className.includes("fallback-image"));
    },
    parse() {
        if (this._maxElemsToParse > 0) {
            var numTags = this._doc.getElementsByTagName("*").length;
            if (numTags > this._maxElemsToParse) {
                throw new Error("Aborting parsing document; " + numTags + " elements found");
            }
        }
        this._unwrapNoscriptImages(this._doc);
        var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
        this._removeScripts(this._doc);
        this._prepDocument();
        var metadata = this._getArticleMetadata(jsonLd);
        this._metadata = metadata;
        this._articleTitle = metadata.title;
        var articleContent = this._grabArticle();
        if (!articleContent) {
            return null;
        }
        this.log("Grabbed: " + articleContent.innerHTML);
        this._postProcessContent(articleContent);
        if (!metadata.excerpt) {
            var paragraphs = articleContent.getElementsByTagName("p");
            if (paragraphs.length) {
                metadata.excerpt = paragraphs[0].textContent.trim();
            }
        }
        var textContent = articleContent.textContent;
        return {
            title: this._articleTitle,
            byline: metadata.byline || this._articleByline,
            dir: this._articleDir,
            lang: this._articleLang,
            content: this._serializer(articleContent),
            textContent: textContent,
            length: textContent.length,
            excerpt: metadata.excerpt,
            siteName: metadata.siteName || this._articleSiteName,
            publishedTime: metadata.publishedTime
        };
    }
};

if (typeof module === "object") {
    module.exports = Readability;
}

"use strict";

const PREFIX = "cplus-";

const JSON_NAME = "modeOfUse";

const DEFAULT_VALUE = "noModifications";

const DEFAULT_MODE = "facilePlus";

const APP_NAME = `${PREFIX}app-root`;

const VERSION = "5.1.0";

const PAGE_HOME = "home";

const PAGE_MODES = "modes";

const PAGE_SETTINGS = "settings";

const PAGE_EDIT_SETTING = "edit-setting";

const PAGE_P_MARKUP_SELECTOR = `body > :not([id^=${PREFIX}]) p, body > p`;

const FOCUS_SIZE_BIG = "4px";

const FOCUS_SIZE_HUGE = "10px";

const CURSOR_SIZE_BIG = 56;

const CURSOR_SIZE_HUGE = 128;

const SCROLL_SIZE_BIG = "32px";

const SCROLL_SIZE_HUGE = "48px";

const BTN_RIGHT_POS_DEFAULT = "2em";

const BTN_RIGHT_POS_OPEN = "26em";

const CLICK_FACILITE_BIG_ZONE = "bigZone";

const CLICK_FACILITE_LONG_CLICK = "longClick";

const CLICK_FACILITE_AUTO_CLICK = "autoClick";

const CONTAINER_BUTTONS_ID = `${PREFIX}container-buttons`;

const TEXT_COLOR_SPAN_CLASS = `${PREFIX}colored-text`;

const TEXT_ALTERNATE_LINES = `${PREFIX}alternateLines`;

const BODY_ELEMENTS_FILTER = "script,style,link,meta";

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
    getMessage=(message, substitutions = []) => {
        if (!message || message.includes("undefined")) {
            console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
            return;
        }
        if (substitutions.length > 0 && substitutions.some((str => str?.includes("undefined")))) {
            console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
            return;
        }
        return chrome.i18n.getMessage(message, substitutions).trim();
    };
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
        if ([ "is-opened", "is-paused" ].includes(key) && this.tabId) {
            chrome.storage.local.set({
                [`${PREFIX}${key}-${this.tabId}`]: value
            });
        }
    }
    getItem(key) {
        if ([ "is-opened", "is-paused" ].includes(key) && this.tabId) {
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
    openCategory=category => {
        let currentCategory = "allClosed";
        const mainIndex = this.settingAccordions.findIndex((o => o.name === category.toLowerCase()));
        this.settingAccordions.forEach(((accordion, index) => {
            accordion.open = index === mainIndex ? !accordion.open : false;
            if (accordion.open) {
                currentCategory = accordion.name;
            }
        }));
        localStorageServiceInstance.setItem("current-category", currentCategory);
    };
    openMainCategory=selectedMode => {
        let mainAccordion;
        return localStorageServiceInstance.getItem("current-category").then((result => {
            if (result) {
                mainAccordion = result;
            } else {
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
                }
            }
            this.settingAccordions.forEach(((accordion, index) => {
                accordion.open = accordion.name === mainAccordion;
            }));
            return this.settingAccordions;
        }));
    };
}

"use strict";

let domServiceIsInstantiated;

class DomService {
    excludedElements=`${APP_NAME}, script`;
    constructor() {
        if (domServiceIsInstantiated) {
            throw new Error("DomService is already instantiated.");
        }
        domServiceIsInstantiated = true;
    }
    getFocusableElements=() => {
        const not = {
            inert: "[inert],[inert] *",
            negTabIndex: '[tabindex^="-"]',
            disabled: ":disabled"
        };
        const focusableElt = [ `a[href]:not(${not.inert},${not.negTabIndex}`, `area[href]:not(${not.inert},${not.negTabIndex}`, `input:not([type="hidden"],[type="radio"],${not.inert},${not.negTabIndex},${not.disabled}`, `input[type="radio"]:not(${not.inert},${not.negTabIndex},${not.disabled}`, `select:not(${not.inert},${not.negTabIndex},${not.disabled}`, `textarea:not(${not.inert},${not.negTabIndex},${not.disabled}`, `button:not(${not.inert},${not.negTabIndex},${not.disabled}`, `details:not(${not.inert} > summary:first-of-type,${not.negTabIndex}`, `iframe:not(${not.inert},${not.negTabIndex}`, `audio[controls]:not(${not.inert},${not.negTabIndex}`, `video[controls]:not(${not.inert},${not.negTabIndex}`, `[contenteditable]:not(${not.inert},${not.negTabIndex}`, `[tabindex]:not(${not.inert},${not.negTabIndex}` ];
        return Array.from(document.querySelectorAll(focusableElt.join(","))).filter((el => !el.disabled && el.tabIndex >= 0));
    };
    addButtonsInDom=(button, start = false) => {
        let container;
        let fragment = document.createDocumentFragment();
        let rightPosition = document.querySelector(APP_NAME)?.shadowRoot?.querySelector("app-toolbar")?.classList.contains("close") ? BTN_RIGHT_POS_DEFAULT : BTN_RIGHT_POS_OPEN;
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
            container = document.querySelector(`#${CONTAINER_BUTTONS_ID}`);
        } else {
            container = document.createElement("div");
            container.setAttribute("id", CONTAINER_BUTTONS_ID);
            let styleContainerButtons = `\n\t\t\t\t#${CONTAINER_BUTTONS_ID} {\n\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t\tgap: 1em;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 1em;\n\t\t\t\t\tright: ${rightPosition};\n\t\t\t\t\tz-index: calc(infinity);\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} .button-row {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tgap: 1em;\n\t\t\t\t\tjustify-content: flex-end;\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} button {\n\t\t\t\t\tbackground: #f16e00;\n\t\t\t\t\tcolor: #000;\n\t\t\t\t\tborder: 2px solid currentColor;\n\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\tpadding: 1em 2em;\n\t\t\t\t\toutline: 2px solid #fff;\n\t\t\t\t\tbox-shadow: 0 0 6px 3px #bbb;\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} button:hover {\n\t\t\t\t\tbackground: #000;\n\t\t\t\t\tcolor: #fff;\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} button:active {\n\t\t\t\t\tbackground: #fff;\n\t\t\t\t\tcolor: #000;\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} button:focus {\n\t\t\t\t\toutline: 3px solid #000;\n    \t\t\toutline-offset: 2px;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("container-buttons", styleContainerButtons);
        }
        const isScrollButton = this.isScrollButton(button);
        const rowClass = isScrollButton ? "scroll-row" : "navigation-row";
        let targetRow = container.querySelector(`.${rowClass}`);
        if (!targetRow) {
            targetRow = document.createElement("div");
            targetRow.className = `button-row ${rowClass}`;
            if (isScrollButton) {
                container.appendChild(targetRow);
            } else {
                const scrollRow = container.querySelector(".scroll-row");
                if (scrollRow) {
                    container.insertBefore(targetRow, scrollRow);
                } else {
                    container.appendChild(targetRow);
                }
            }
        }
        let btn = document.createElement("button");
        btn.setAttribute("id", `${CONTAINER_BUTTONS_ID}__${button}`);
        btn.type = "button";
        btn.tabIndex = -1;
        btn.innerText = i18nServiceInstance.getMessage(button);
        if (start) {
            targetRow.prepend(btn);
        } else {
            targetRow.appendChild(btn);
        }
        fragment.appendChild(container);
        document.body.appendChild(fragment);
    };
    isScrollButton=button => button.includes("scroll_");
    removeButtonsInDom=button => {
        const buttonElement = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button}`);
        const parentRow = buttonElement?.parentElement;
        buttonElement?.remove();
        if (parentRow && parentRow.children.length === 0) {
            parentRow.remove();
        }
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.children.length === 0) {
            document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.remove();
            stylesServiceInstance.removeStyle("container-buttons");
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
    setSelectedMode=newSelectedModeName => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            if (json.selectedMode !== undefined && json.selectedMode === newSelectedModeName) {
                filesServiceInstance.getJSONFile("modes-of-use").then((result => {
                    const defaultJson = result;
                    let resetMode;
                    defaultJson.modes.forEach((mode => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            resetMode = mode;
                        }
                    }));
                    json.modes.forEach(((mode, index) => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            json.modes[index] = resetMode;
                        }
                    }));
                    json.selectedMode = newSelectedModeName;
                    localStorageServiceInstance.setItem(JSON_NAME, json);
                    localStorageServiceInstance.setItem("selectedModeName", newSelectedModeName);
                }));
            } else {
                json.selectedMode = newSelectedModeName;
                localStorageServiceInstance.setItem(JSON_NAME, json);
                localStorageServiceInstance.setItem("selectedModeName", newSelectedModeName);
            }
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
    setSettingValue=(settingName, newIndex, removeCustom = false) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)));
                    let settingValues = Object.entries(setting)[0][1];
                    let values = settingValues.values.split(",");
                    let indexSetting = modeSettings.indexOf(setting);
                    modeSettings.splice(indexSetting, 1);
                    if (removeCustom && values[3]) {
                        values.pop();
                        settingValues.values = values.toString();
                    }
                    settingValues.valueSelected = newIndex;
                    modeSettings.push(setting);
                    localStorageServiceInstance.setItem(JSON_NAME, json);
                    jsonIsEdited = true;
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("Your setting could not be saved.");
            return jsonIsEdited;
        }));
    };
    getSetting(settingName) {
        let setting;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    setting = Object.entries(modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName))))[0][1];
                }
            }));
            return setting;
        })).catch((error => {
            console.error("Values of this setting could not be return.");
            return setting;
        }));
    }
    addSettingCustomValue=(settingName, newIndex, newValue) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = Object.entries(modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName))))[0][1];
                    let values = setting.values.split(",");
                    if (setting) {
                        values[3] = newValue;
                        setting.valueSelected = newIndex;
                        setting.values = values.toString();
                        localStorageServiceInstance.setItem(JSON_NAME, json);
                        jsonIsEdited = true;
                    }
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("The custom value of this setting could not be saved.");
            return jsonIsEdited;
        }));
    };
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
            value: DEFAULT_VALUE
        }, {
            name: "clearlyLinks",
            instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "clickFacilite",
            instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "colorContrast",
            instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "cursorAspect",
            instanceService: cursorAspectServiceInstance.setCursor.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "deleteBackgroundImages",
            instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "focusAspect",
            instanceService: focusAspectServiceInstance.setFocus.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "fontFamily",
            instanceService: fontFamilyServiceInstance.setFontFamily.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "linkStyle",
            instanceService: linkStyleServiceInstance.setLinkStyle.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "magnifier",
            instanceService: magnifierServiceInstance.setMagnifier.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "marginAlign",
            instanceService: marginAlignServiceInstance.setMargin.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "navigationAuto",
            instanceService: navigationAutoServiceInstance.setNavigationAuto.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "navigationButtons",
            instanceService: navigationButtonsServiceInstance.setNavigationButtons.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "readAloud",
            instanceService: readAloudServiceInstance.setReadAloud.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "readingGuide",
            instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "scroll",
            instanceService: scrollAspectServiceInstance.setScrollAspect.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "stopAnimations",
            instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "textSize",
            instanceService: textSizeServiceInstance.setFontSize.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "textSpacing",
            instanceService: textSpacingServiceInstance.setSpacingText.bind(this),
            value: DEFAULT_VALUE
        }, {
            name: "zoom",
            instanceService: zoomServiceInstance.setZoom.bind(this),
            value: DEFAULT_VALUE
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
                settingsService.instanceService(DEFAULT_VALUE);
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
    initPages=(root, shouldLoad = false) => {
        this.toolbar = root;
        return localStorageServiceInstance.getItem("current-route").then((result => {
            if (this.routes.some((route => result === route))) {
                this.navigate(result, shouldLoad, this.toolbar);
                return result;
            } else {
                this.navigate(PAGE_HOME, false, this.toolbar);
                return PAGE_HOME;
            }
        }));
    };
    navigate=(newRoute, shouldLoad = false, root) => {
        this.toolbar = root;
        if (shouldLoad) {
            this.loadRoute(newRoute, this.toolbar);
            this.setCurrentRoute(newRoute, this.toolbar);
        } else if (newRoute !== this.currentRoute) {
            this.routes.forEach((route => {
                if (route === newRoute) {
                    this.loadRoute(route, this.toolbar);
                } else if (route === this.currentRoute) {
                    this.toolbar.querySelector(`app-${route}`)?.remove();
                }
            }));
            this.setCurrentRoute(newRoute, this.toolbar);
        }
    };
    setHistoryAndHeader=(newRoute, root) => {
        this.toolbar = root;
        const header = this.toolbar.querySelector("#header");
        switch (newRoute) {
          case PAGE_HOME:
            {
                routeServiceInstance.historyRoute = [];
                header?.setAttribute("data-display", "primary");
                header?.setAttribute("data-page-title", "");
                header?.setAttribute("data-prev-btn", "");
                break;
            }

          case PAGE_SETTINGS:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleSettings");
                header?.setAttribute("data-page-icon", "Settings");
                header?.setAttribute("data-prev-btn", "backToHome");
                break;
            }

          case PAGE_EDIT_SETTING:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME, PAGE_SETTINGS ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleEditSetting");
                header?.setAttribute("data-page-icon", "Settings");
                header?.setAttribute("data-prev-btn", "backToSettings");
                break;
            }

          case PAGE_MODES:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleModes");
                header?.setAttribute("data-page-icon", "");
                header?.setAttribute("data-prev-btn", "backToHome");
                break;
            }
        }
    };
    loadRoute=(route, root) => {
        this.toolbar = root;
        const element = `<app-${route}></app-${route}>`;
        this.toolbar.insertAdjacentHTML("beforeend", element);
        const page = this.toolbar.querySelector(`app-${route}`);
        i18nServiceInstance.translate(page);
    };
    setCurrentRoute=(route, root) => {
        this.setHistoryAndHeader(route, root);
        this.currentRoute = route;
        localStorageServiceInstance.setItem("current-route", route);
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
            styleCapitalLetters = `\n\t\t\t\t*:not(${APP_NAME}), *:not(${APP_NAME})::before, *:not(${APP_NAME})::after {\n\t\t\t\t\ttext-transform: uppercase !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          case "capitalize":
            styleCapitalLetters = `\n\t\t\t\t*:not(${APP_NAME}), *:not(${APP_NAME})::before, *:not(${APP_NAME})::after {\n\t\t\t\t\ttext-transform: capitalize !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          default:
            stylesServiceInstance.removeStyle("capital-letters");
            break;
        }
    };
}

"use strict";

class BodySelectorService {
    getBodyElements() {
        return document.body.querySelectorAll(`:not(${APP_NAME},${BODY_ELEMENTS_FILTER})`);
    }
    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: node => node.nodeValue.trim() !== "" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        });
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }
        return textNodes;
    }
    isAlreadyEdited(node, className) {
        return node.parentNode instanceof HTMLElement && node.parentNode.classList.contains(className);
    }
    resetToDefaultBody=classToDelete => {
        const spans = document.querySelectorAll(classToDelete.map((c => `.${c}`)).join(", "));
        spans.forEach((span => {
            const textNode = document.createTextNode(span.textContent);
            span.replaceWith(textNode);
        }));
        const body = document.body;
        this.concatTextNodes(body);
    };
    concatTextNodes=element => {
        let child = element.firstChild;
        while (child) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                this.concatTextNodes(child);
            }
            if (child.nodeType === Node.TEXT_NODE) {
                while (child.nextSibling && child.nextSibling.nodeType === Node.TEXT_NODE) {
                    child.textContent += child.nextSibling.textContent;
                    child.parentNode.removeChild(child.nextSibling);
                }
            }
            child = child.nextSibling;
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
        this.delay = parseInt(value.split("_")[1]?.replace(/\D/g, ""), 10) * 1e3;
        switch (paramName) {
          case CLICK_FACILITE_BIG_ZONE:
            {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect("big_black");
                break;
            }

          case CLICK_FACILITE_LONG_CLICK:
            {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect("big_black");
                this.longClick();
                break;
            }

          case CLICK_FACILITE_AUTO_CLICK:
            {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect("big_black");
                this.autoClick();
                break;
            }

          default:
            {
                scrollAspectServiceInstance.setScrollAspect(DEFAULT_VALUE);
                scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
                this.resetEventClick();
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
    colorContrastDictionnary=[ {
        name: DEFAULT_VALUE,
        cursor: DEFAULT_VALUE,
        focus: DEFAULT_VALUE,
        scroll: DEFAULT_VALUE,
        link: DEFAULT_VALUE
    }, {
        name: "reinforcedContrasts",
        cursor: "bigCursor_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_orange_brown"
    }, {
        name: "ivory_black",
        cursor: "bigCursor_ivory",
        focus: "big_ivory",
        scroll: "big_ivory",
        link: "lightblue_orange_lightgreen"
    }, {
        name: "black_ivory",
        cursor: "bigCursor_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_orange_brown"
    }, {
        name: "white_red",
        cursor: "bigCursor_white",
        focus: "big_white",
        scroll: "big_white",
        link: "yellow_darkblue_lightgreen"
    }, {
        name: "black_yellow",
        cursor: "bigCursor_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_purple_darkgreen"
    }, {
        name: "white_blue",
        cursor: "bigCursor_white",
        focus: "big_white",
        scroll: "big_white",
        link: "yellow_orange_lightgreen"
    }, {
        name: "yellow_blue",
        cursor: "bigCursor_yellow",
        focus: "big_yellow",
        scroll: "big_yellow",
        link: "white_darkgreen_lightgreen"
    }, {
        name: "black_green",
        cursor: "bigCursor_black",
        focus: "big_black",
        scroll: "big_black",
        link: "yellow_orange_blue"
    } ];
    matrixFilter=`\n\t\t0.8,   0.2,   0,     0, 0\n    0.258, 0.742, 0,     0, 0\n    0,     0.142, 0.858, 0, 0\n    0,     0,     0,     1, 0`;
    svgFilterDaltonism=`<svg xmlns="http://www.w3.org/2000/svg"><filter id="daltonism"><feColorMatrix in="SourceGraphic" type="matrix" values="${this.matrixFilter.replace(/\s+/g, " ").trim()}"/></filter></svg>`;
    styleFilterDaltonism=`\n\t\thtml body > *:not(${APP_NAME}) {\n\t\t\tfilter: url('data:image/svg+xml;utf8,${this.svgFilterDaltonism}#daltonism');\n\t\t}\n\t`;
    constructor() {
        if (colorContrastServiceIsInstantiated) {
            throw new Error("ColorContrastService is already instantiated.");
        }
        colorContrastServiceIsInstantiated = true;
    }
    setColorsContrasts=value => {
        stylesServiceInstance.removeStyle("color-contrast");
        stylesServiceInstance.removeStyle("filter-daltonism");
        this.setServices(DEFAULT_VALUE);
        switch (value) {
          case DEFAULT_VALUE:
            break;

          case "daltonism":
            stylesServiceInstance.setStyle("filter-daltonism", this.styleFilterDaltonism);
            break;

          case "reinforcedContrasts":
          default:
            let color;
            let backgroundColor;
            if (value === "reinforcedContrasts") {
                color = "#000";
                backgroundColor = "#fff";
                this.setServices("reinforcedContrasts");
            } else {
                color = value?.split("_")[0];
                backgroundColor = value?.split("_")[1];
                this.setServices(`${color}_${backgroundColor}`);
            }
            this.setColorContrastStyle(color, backgroundColor);
            break;
        }
    };
    setColorContrastStyle=(color, backgroundColor) => {
        let styleColorContrast = `\n\t\t\t*:not(.${PREFIX}container-buttons) {\n\t\t\t\tcolor: ${color} !important;\n\t\t\t\tbackground-color: ${backgroundColor} !important;\n\t\t\t}\n\n\t\t\tfieldset,\n\t\t\tbutton {\n\t\t\t\tborder-color: ${color} !important;\n\t\t\t}\n\n\t\t\tinput, td, th {\n\t\t\t\tborder: 2px solid ${color} !important;\n\t\t\t}\n\n\t\t\ttd, th {\n\t\t\t\tpadding: .2em !important;\n\t\t\t}\n\n\t\t\ttable {\n\t\t\t\tborder-collapse: collapse !important;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("color-contrast", styleColorContrast);
    };
    setServices=value => {
        const colorParams = this.colorContrastDictionnary.find((o => o.name === value));
        cursorAspectServiceInstance.setCursor(colorParams?.cursor);
        focusAspectServiceInstance.setFocus(colorParams?.focus);
        scrollAspectServiceInstance.setScrollAspect(colorParams?.scroll);
        linkStyleServiceInstance.setLinkStyle(colorParams?.link);
    };
}

"use strict";

let deleteBackgroundImagesServiceIsInstantiated;

class DeleteBackgroundImagesService {
    listImgElements;
    classDeleteBackgroundImg=`${PREFIX}delete-background-img`;
    classDeleteForegroundImg=`${PREFIX}delete-foreground-img`;
    classSpanImage=`${PREFIX}delete-background-images__span`;
    styleDeleteBackgroundImages=`\n\t\t.${this.classDeleteBackgroundImg},\n\t\t.${this.classDeleteBackgroundImg}:before,\n\t\t.${this.classDeleteBackgroundImg}:after\n\t\t::not(.${TEXT_COLOR_SPAN_CLASS}) {\n\t\t\tbackground-image: none !important;\n\t\t\tbackground-color: white;\n\t\t\tcolor: black;\n\t\t}\n\n\t\t.${this.classDeleteBackgroundImg} * {\n\t\t\tcolor: black;\n\t\t}\n\t`;
    styleDeleteForegroundImages=`\n\t\t.${this.classSpanImage} {\n\t\t\tfont-size: 1rem;\n\t\t}\n\n\t\t.${this.classDeleteForegroundImg} {\n\t\t\tvisibility: hidden !important;\n\t\t}\n\t`;
    styleDeleteTransparencyEffects=`\n\t\t*, *::before, *::after {\n\t\t\topacity: 1 !important;\n\t\t\tfilter: none !important\n\t\t}\n\t`;
    constructor() {
        if (deleteBackgroundImagesServiceIsInstantiated) {
            throw new Error("DeleteBackgroundImagesService is already instantiated.");
        }
        deleteBackgroundImagesServiceIsInstantiated = true;
    }
    setDeleteBackgroundImages=value => {
        this.resetStyleDeleteBackground();
        if (value !== DEFAULT_VALUE) {
            this.setStyleDeleteBackground(value);
        }
    };
    setStyleDeleteBackground=value => {
        let styleToDelete = "";
        const arrayValues = value.match(/[A-Z]?[a-z]+/g);
        arrayValues.forEach((value => {
            switch (value.toLowerCase()) {
              case "background":
                styleToDelete += this.styleDeleteBackgroundImages;
                const allElements = Array.from(document.querySelectorAll(`*:not(${domServiceInstance.excludedElements})`));
                allElements.forEach((element => {
                    if (window.getComputedStyle(element).getPropertyValue("background-image") !== "none" || window.getComputedStyle(element, "::before").getPropertyValue("background-image") !== "none" || window.getComputedStyle(element, "::after").getPropertyValue("background-image") !== "none") {
                        element.classList.add(this.classDeleteBackgroundImg);
                    }
                }));
                break;

              case "foreground":
                styleToDelete += this.styleDeleteForegroundImages;
                const imgElements = document.querySelectorAll("img, svg, canvas, area");
                imgElements.forEach((element => {
                    element.classList.add(this.classDeleteForegroundImg);
                    let imageAlt = this.getAccessibleLabel(element);
                    if (imageAlt !== "") {
                        let spanImage = document.createElement("span");
                        spanImage.classList.add(this.classSpanImage);
                        spanImage.textContent = `${i18nServiceInstance.getMessage("textContentImageHidden")} ${imageAlt}`;
                        element.parentNode.insertBefore(spanImage, element);
                    }
                }));
                break;

              case "transparent":
                styleToDelete += this.styleDeleteTransparencyEffects;
                break;

              default:
                break;
            }
        }));
        stylesServiceInstance.setStyle("delete-background-images", styleToDelete);
    };
    getAccessibleLabel=element => {
        if (element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute("aria-labelledby")}`)?.textContent) {
            return element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute("aria-labelledby")}`)?.textContent;
        } else {
            let a11yLabel = [];
            if (element.querySelector("title")) {
                a11yLabel.push(element.querySelector("title").textContent);
            } else if (element.querySelector("desc")) {
                a11yLabel.push(element.querySelector("desc").textContent);
            } else if (element.querySelector("text")) {
                a11yLabel.push(element.querySelector("text").textContent);
            }
            return a11yLabel.join(" ");
        }
    };
    resetStyleDeleteBackground=() => {
        stylesServiceInstance.removeStyle("delete-background-images");
        document.querySelectorAll(`.${this.classSpanImage}`).forEach((element => {
            element.remove();
        }));
        document.querySelectorAll(`.${this.classDeleteForegroundImg}`).forEach((element => {
            element.classList.remove(this.classDeleteForegroundImg);
        }));
        document.querySelectorAll(`.${this.classDeleteBackgroundImg}`).forEach((element => {
            element.classList.remove(this.classDeleteBackgroundImg);
        }));
    };
}

"use strict";

let deleteLayoutServiceIsInstantiated;

class DeleteLayoutService {
    storedStyles=[];
    constructor() {
        if (deleteLayoutServiceIsInstantiated) {
            throw new Error("DeleteLayoutService is already instantiated.");
        }
        deleteLayoutServiceIsInstantiated = true;
    }
    setDeleteLayout=value => {
        this.storedStyles?.forEach((style => {
            style.parent.appendChild(style.stylesheet);
        }));
        if (value !== DEFAULT_VALUE) {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
            Array.from(stylesheets).filter((style => {
                if (!style.id.startsWith(PREFIX)) {
                    const storedStyle = {
                        stylesheet: style,
                        parent: style.parentElement
                    };
                    this.storedStyles.push(storedStyle);
                    style.remove();
                }
            }));
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
        } else if (value) {
            const [size, color] = value.split("_");
            const styleFocusSize = size !== DEFAULT_VALUE ? `outline-width: ${size === "big" ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE} !important;` : "";
            const styleFocusColor = color !== DEFAULT_VALUE ? `outline-color: ${color} !important;` : "";
            let styleFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline-style: solid !important;\n\t\t\t\t\t${styleFocusSize}\n\t\t\t\t\t${styleFocusColor}\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("focus-aspect", styleFocus);
        }
    };
}

"use strict";

let fontFamilyServiceIsInstantiated;

class FontFamilyService {
    fontDictionnary=[ {
        name: "AccessibleDfA",
        size: "82.5%",
        folder: "accessibleDfA",
        generic: "serif",
        files: [ {
            name: "AccessibleDfA-VF.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "AccessibleDfA-VF.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "AccessibleDfA-VF.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "B612Mono",
        size: "75%",
        folder: "B612",
        generic: "monospace",
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
        name: "BelleAllure",
        size: "80%",
        folder: "BelleAllure",
        generic: "cursive",
        files: [ {
            name: "BelleAllureCM-Fin.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "BelleAllureCM-Gros.woff2",
            style: "normal",
            weight: "700"
        } ]
    }, {
        name: "LexendDeca",
        size: "92%",
        folder: "lexendDeca",
        generic: "sans-serif",
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
        generic: "sans-serif",
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
        name: "SylexiadSans",
        size: "122.5%",
        folder: "sylexiadSans",
        generic: "sans-serif",
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
        name: "HelveticaNeue",
        size: "100%",
        folder: "HelveticaNeue",
        generic: "sans-serif",
        files: [ {
            name: "HelvNeue55_W1G.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "HelvNeue75_W1G.woff2",
            style: "normal",
            weight: "700"
        } ]
    } ];
    constructor() {
        if (fontFamilyServiceIsInstantiated) {
            throw new Error("FontFamilyService is already instantiated.");
        }
        fontFamilyServiceIsInstantiated = true;
    }
    setFontFamily=value => {
        stylesServiceInstance.removeStyle("font-family");
        if (value !== DEFAULT_VALUE) {
            let fontFaceStyle = [];
            this.fontDictionnary.forEach((font => {
                for (const file of font.files) {
                    fontFaceStyle.push(`\n\t\t\t\t\t\t@font-face {\n\t\t\t\t\t\t\tfont-family:"${font.name}";\n\t\t\t\t\t\t\tsrc: local("${font.name}"), url("${appPath}assets/fonts/${font.folder}/${file.name}");\n\t\t\t\t\t\t\tfont-style: ${file.style};\n\t\t\t\t\t\t\tfont-weight: ${file.weight};\n\t\t\t\t\t\t\tfont-display: swap;\n\t\t\t\t\t\t\tsize-adjust: ${font.size};\n\t\t\t\t\t\t}`);
                }
            }));
            fontFaceStyle.push(`\n\t\t\t\t* { font-family: ${value} !important; }\n\n\t\t\t\tbody {\n\t\t\t\t\tfont-synthesis: none;\n\t\t\t\t\tfont-variant-ligatures: normal;\n\t\t\t\t\ttext-rendering: optimizeLegibility;\n\t\t\t\t}`);
            stylesServiceInstance.setStyle("font-family", fontFaceStyle.join(""));
        }
    };
    getFontInfo=fontName => this.fontDictionnary.find((font => font.name === fontName));
    getFontList=() => {
        let fontList = this.fontDictionnary.map((font => font.name));
        fontList.unshift(DEFAULT_VALUE);
        return fontList;
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
        } else if (value) {
            const [linkColor, linkPointedColor, linkVisitedColor] = value.split("_");
            const styleColorLink = linkColor !== DEFAULT_VALUE ? `a:link { color: ${linkColor} !important; }` : "";
            const styleColorActiveLink = linkPointedColor !== DEFAULT_VALUE ? `a:active, a:hover, a:focus { color: ${linkPointedColor} !important; }` : "";
            const styleColorVisitedLink = linkVisitedColor !== DEFAULT_VALUE ? `a:visited { color: ${linkVisitedColor} !important; }` : "";
            let styleLink = `${styleColorLink} ${styleColorVisitedLink} ${styleColorActiveLink}`;
            stylesServiceInstance.setStyle("link", styleLink);
        }
    };
}

"use strict";

let magnifierServiceIsInstantiated;

class MagnifierService {
    zoom;
    handler;
    magnifierWidth=300;
    magnifierHeight=300;
    magnifierTransition=300;
    ofs_x;
    ofs_y;
    pos_x;
    pos_y;
    magnifier;
    magnifierContent;
    magnifierBody;
    observerObj;
    syncTimeout;
    magnifierClickTimer;
    styleMagnifier=`\n\t\t#${PREFIX}magnifier {\n\t\t\tbackground-color: white;\n\t\t\tborder: 1px solid black;\n\t\t\tborder-radius: 0.5em;\n\t\t\twidth: ${this.magnifierWidth}px;\n\t\t\theight: ${this.magnifierHeight}px;\n\t\t\tposition: fixed;\n\t\t\toverflow: hidden;\n\t\t\tpointer-events: none;\n\t\t\ttransition: box-shadow ease ${this.magnifierTransition}ms;\n\t\t\tz-index: calc(infinity);\n\t\t}\n\n\t\t#${PREFIX}magnifier-content {\n\t\t\tdisplay: block;\n\t\t\tmargin-left: 0;\n\t\t\tmargin-top: 0;\n\t\t\tpadding-top: 0;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\toverflow: visible;\n\t\t\ttransform-origin: left top;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t#${PREFIX}magnifier-glass {\n\t\t\tbackground-color: white;\n\t\t\topacity: 0 !important;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tcursor: move;\n\t\t}\n\t`;
    constructor() {
        if (magnifierServiceIsInstantiated) {
            throw new Error("MagnifierService is already instantiated.");
        }
        magnifierServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setMagnifier=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("magnifier");
            document.querySelector(`#${PREFIX}magnifier`)?.remove();
            this.unBindDOMObserver();
        } else {
            stylesServiceInstance.setStyle("magnifier", this.styleMagnifier);
            this.zoom = parseInt(value.replace(/\D/g, ""), 10);
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
        window.addEventListener("pointerdown", this.handler);
        window.addEventListener("pointerup", this.handler);
        this.magnifierContent.style.transform = `scale(${this.zoom})`;
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
        document.body.insertBefore(fragment, document.querySelector(APP_NAME));
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
        this.removeSelectors(bodyCopy, APP_NAME);
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
        const left = -x1 * this.zoom - x2 * this.zoom - (this.zoom - 1) * (this.magnifierWidth / 2);
        const top = -y1 * this.zoom - y2 * this.zoom - (this.zoom - 1) * (this.magnifierHeight / 2);
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
        this.magnifier.addEventListener("pointermove", this.handler);
    };
    downHandler=event => {
        this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
        const pageX = event.pageX || event.touches && event.touches[0].pageX;
        const pageY = event.pageY || event.touches && event.touches[0].pageY;
        this.ofs_x = this.magnifier?.getBoundingClientRect().left - this.magnifier?.offsetLeft;
        this.ofs_y = this.magnifier?.getBoundingClientRect().top - this.magnifier?.offsetTop;
        this.pos_x = pageX - (this.magnifier?.getBoundingClientRect().left + window.scrollX || document.documentElement.scrollLeft);
        this.pos_y = pageY - (this.magnifier?.getBoundingClientRect().top + window.scrollY || document.documentElement.scrollTop);
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
    pointerIsInMagnifier=event => {
        const {clientX: clientX, clientY: clientY} = event;
        const {offsetLeft: offsetLeft, offsetTop: offsetTop} = this.magnifier;
        return clientX > offsetLeft && clientX < offsetLeft + this.magnifierWidth && clientY > offsetTop && clientY < offsetTop + this.magnifierHeight;
    };
    setMovingStyle=() => {
        this.magnifier.style.pointerEvents = "auto";
        this.magnifier.style.boxShadow = "0 0 20px 10px rgba(0,0,0, 0.25)";
    };
    setStaticStyle=() => {
        this.magnifier.style.pointerEvents = null;
        this.magnifier.style.boxShadow = null;
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
            this.magnifierClickTimer = setTimeout((() => {
                if (this.magnifier && this.pointerIsInMagnifier(event)) {
                    document.body.style.userSelect = "none";
                    this.setMovingStyle();
                }
            }), this.magnifierTransition);
            break;

          case "pointermove":
            this.moveHandler(event);
            break;

          case "pointerup":
            document.body.style.userSelect = null;
            if (this.magnifier) {
                this.setStaticStyle();
                clearTimeout(this.magnifierClickTimer);
            }
            this.upHandler();
            break;
        }
    };
}

"use strict";

let marginAlignServiceIsInstantiated;

class MarginAlignService {
    alignLeftStyle=`\n\t\tp {\n\t\t\ttext-align: left !important;\n\t\t}\n\t`;
    marginStyle=`\n\t\tp, h1, h2, h3, h4, h5, h6 {\n\t\t\tposition: relative;\n\t\t\ttext-align: left !important;\n\t\t\tmargin-left: 1lh !important;\n\t\t}\n\n\t\tp *, h1 *, h2 *, h3 *, h4 *, h5 *, h6 * {\n\t\t\tmargin-left: 0 !important;\n\t\t}\n\t`;
    marginLeftStyle=`\n\t\t${this.marginStyle}\n\n\t\tp:before, h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {\n\t\t\tcontent: "";\n\t\t\tbackground: currentColor;\n\t\t\tborder-radius: 10px;\n\t\t\twidth: 12px;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\tleft: -24px;\n\t\t}\n\t`;
    marginListStyle=`\n\t\t${this.marginStyle}\n\n\t\tul, ol {\n\t\t\tlist-style-position: initial !important;\n\t\t\tlist-style-image: none !important;\n\t\t\tlist-style-type: decimal !important;\n\t\t}\n\n\t\tp:before, h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {\n\t\t\tcontent: "";\n\t\t\tbackground: radial-gradient(ellipse at center, currentColor 10%, currentColor 30%, transparent 30%);\n\t\t\tbackground-repeat: repeat-y;\n\t\t\tbackground-position-x: right;\n\t\t\tbackground-size: 1lh 1lh;\n\t\t\twidth: 1lh;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\tleft: -1lh;\n\t\t}\n\t`;
    constructor() {
        if (marginAlignServiceIsInstantiated) {
            throw new Error("MarginAlignService is already instantiated.");
        }
        marginAlignServiceIsInstantiated = true;
    }
    setMargin=value => {
        stylesServiceInstance.removeStyle("align-left");
        stylesServiceInstance.removeStyle("margin-left");
        stylesServiceInstance.removeStyle("margin-list");
        switch (value) {
          case "alignLeft":
            {
                stylesServiceInstance.setStyle("align-left", this.alignLeftStyle);
                break;
            }

          case "marginLeft":
            {
                stylesServiceInstance.setStyle("margin-left", this.marginLeftStyle);
                break;
            }

          case "marginList":
            {
                stylesServiceInstance.setStyle("margin-list", this.marginListStyle);
                break;
            }
        }
    };
}

"use strict";

let navigationAutoServiceIsInstantiated;

class NavigationAutoService {
    currentFocusElt;
    currentIndex;
    handler;
    timer=null;
    constructor() {
        if (navigationAutoServiceIsInstantiated) {
            throw new Error("NavigationAutoService is already instantiated.");
        }
        navigationAutoServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setNavigationAuto=value => {
        window.removeEventListener("focus", this.handler);
        this.clearIntervalFocus();
        if (value !== DEFAULT_VALUE) {
            window.addEventListener("focus", this.handler, true);
            let delay = parseInt(value.split("_")[1]?.replace(/\D/g, ""), 10) * 1e3;
            this.setIntervalFocus(delay);
        }
    };
    focusElement=() => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = (currentIndex + 1) % focusableElements.length;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    setIntervalFocus=delay => {
        this.timer = setInterval((() => {
            this.focusElement();
        }), delay);
    };
    clearIntervalFocus=() => {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    createHandler() {
        return event => {
            if (event.currentTarget) {
                this.currentFocusElt = event.currentTarget;
            }
        };
    }
}

"use strict";

let navigationButtonsServiceIsInstantiated = false;

class NavigationButtonsService {
    currentFocusElt;
    handlerNavigationButtons;
    navigationButtonSet=DEFAULT_VALUE;
    delay=0;
    hoverTimeoutIds={};
    constructor() {
        if (navigationButtonsServiceIsInstantiated) {
            throw new Error("NavigationButtonsService is already instantiated.");
        }
        navigationButtonsServiceIsInstantiated = true;
        this.handlerNavigationButtons = this.createHandlerNavigationButtons();
    }
    navigationButtonsList=[ "escape", "start", "previous", "next", "click" ];
    fullButtonsList=[ "escape", "start", "content", "previous", "next", "click" ];
    currentList=this.navigationButtonsList;
    setNavigationButtons=value => {
        this.navigationButtonSet = value.split("_")[0];
        this.delay = this.getDelay(value.split("_")[1]);
        this.resetNavigationButtons();
        switch (this.navigationButtonSet) {
          case "scrollSet":
            this.currentList = [];
            if (this.delay <= 0) {
                scrollTypeServiceInstance.setScrollType("scrollOnClick");
            } else {
                scrollTypeServiceInstance.setScrollType("scrollOnMouseover", this.delay);
            }
            break;

          case "navigationSet":
            this.currentList = this.navigationButtonsList;
            this.getFocusedElement();
            this.addNavigationButtons();
            break;

          case "fullSet":
            this.currentList = this.fullButtonsList;
            this.getFocusedElement();
            this.addNavigationButtons();
            if (this.delay <= 0) {
                scrollTypeServiceInstance.setScrollType("scrollOnClick");
            } else {
                scrollTypeServiceInstance.setScrollType("scrollOnMouseover", this.delay);
            }
            break;

          default:
            break;
        }
    };
    resetNavigationButtons=() => {
        scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
        this.currentList.forEach((navigationButton => {
            domServiceInstance.removeButtonsInDom(navigationButton);
            if (this.hoverTimeoutIds[navigationButton]) {
                clearTimeout(this.hoverTimeoutIds[navigationButton]);
                this.hoverTimeoutIds[navigationButton] = null;
            }
        }));
        document.removeEventListener("click", this.handlerNavigationButtons);
        document.removeEventListener("focusout", this.handlerNavigationButtons);
    };
    addNavigationButtons=() => {
        this.currentList.forEach((navigationButton => {
            domServiceInstance.addButtonsInDom(navigationButton);
            let btnNav = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${navigationButton}`);
            if (btnNav) {
                btnNav.addEventListener("mousedown", (event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.simulateKeyEvent(navigationButton);
                }));
                if (this.delay > 0) {
                    btnNav.addEventListener("mouseenter", (() => {
                        if (this.hoverTimeoutIds[navigationButton]) {
                            clearTimeout(this.hoverTimeoutIds[navigationButton]);
                        }
                        this.hoverTimeoutIds[navigationButton] = window.setTimeout((() => {
                            this.simulateKeyEvent(navigationButton);
                            this.hoverTimeoutIds[navigationButton] = null;
                        }), this.delay);
                    }));
                    btnNav.addEventListener("mouseleave", (() => {
                        if (this.hoverTimeoutIds[navigationButton]) {
                            clearTimeout(this.hoverTimeoutIds[navigationButton]);
                            this.hoverTimeoutIds[navigationButton] = null;
                        }
                    }));
                }
            }
        }));
    };
    simulateKeyEvent=name => {
        switch (name) {
          case "next":
            this.focusElement("next");
            break;

          case "previous":
            this.focusElement("previous");
            break;

          case "click":
            this.currentFocusElt?.click();
            break;

          case "escape":
            this.simulateKeydownEscape();
            break;

          case "start":
            restartTopLeftServiceInstance.setRestartTopLeft();
            break;

          case "content":
            skipToContentServiceInstance.setSkipToContent();
            break;

          default:
            break;
        }
    };
    focusElement=direction => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
            newIndex = newIndex > focusableElements.length - 1 ? 0 : newIndex < 0 ? focusableElements.length - 1 : newIndex;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    getFocusedElement=() => {
        document.addEventListener("focus", this.handlerNavigationButtons);
    };
    simulateKeydownEscape=() => {
        var event = new KeyboardEvent("keydown", {
            key: "Escape",
            keyCode: 27,
            code: "Escape",
            which: 27,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    };
    createHandlerNavigationButtons=() => event => {
        if (event.type === "focusout") {
            this.currentFocusElt = event.currentTarget;
        }
    };
    getDelay=delay => {
        if (delay !== "clicAction") {
            return parseInt(delay?.replace(/\D/g, ""), 10) * 1e3;
        }
        return 0;
    };
}

"use strict";

let readAloudServiceIsInstantiated;

class ReadAloudService extends BodySelectorService {
    handler;
    tooltipReadAloud;
    readAloudTooltipId=`${PREFIX}read-aloud-tooltip`;
    readAloudSpan=`${PREFIX}read-aloud-span`;
    regexWord=/\S+\s*[.,!?]*/g;
    regexSentence=/[^\.!\?]+[\.!\?]+["']?|.+$/g;
    classReadAloud=`\n\t\t#${this.readAloudTooltipId} {\n\t\t\tposition: fixed;\n\t\t\tbackground-color: rgba(0, 0, 0, 0.7);\n\t\t\tcolor: white;\n\t\t\tborder: 1px solid currentColor;\n\t\t\twidth: fit-content;\n\t\t\tpadding: 1em;\n\t\t\tpointer-events: none;\n\t\t\tz-index: calc(infinity);\n\t\t\ttransform: translate(75px, 50%);\n\t\t}\n\n\t\th1, h2, h3, h4, h5, h6,\n\t\tp, ul, ol, dl, blockquote,\n\t\tpre, td, th,\n\t\tinput, textarea, legend {\n\t\t\tcursor: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M114.821 60.554c0 33.882-26.402 56.278-56.846 56.278-6.216 0-21.82-2.872-25.265-5.743C26.394 117.406 9.168 122 9.168 122c-.374-.298.176-1.564 1.067-3.613 1.913-4.401 5.396-12.415 4.675-22.229C6.87 85.822 4 74.911 4 60.554 4 30.108 28.105 6 58.55 6c32.73 0 56.271 24.693 56.271 54.554Zm-28.55 4.38a3.532 3.532 0 1 1 0-7.064 3.532 3.532 0 0 1 0 7.063Zm-27.075 0a3.532 3.532 0 1 1 0-7.064 3.532 3.532 0 0 1 0 7.063Zm-30.607-3.532a3.532 3.532 0 1 0 7.063 0 3.532 3.532 0 0 0-7.063 0Z" stroke="white" stroke-width="6"/></svg>') 24 24, text !important;\n\t\t}\n\t`;
    constructor() {
        super();
        if (readAloudServiceIsInstantiated) {
            throw new Error("ReadAloudService is already instantiated.");
        }
        readAloudServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setReadAloud=value => {
        if (speechSynthesis.speaking) speechSynthesis.cancel();
        this.resetBody();
        if (value === DEFAULT_VALUE) {
            this.resetReadAloud();
        } else {
            switch (value) {
              case "word":
                this.setBodyToSpeech(this.regexWord);
                break;

              case "sentence":
                this.setBodyToSpeech(this.regexSentence);
                break;

              case "all":
                document.addEventListener("focusin", this.handler);
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
    setBodyToSpeech=regex => {
        const bodyChildren = this.getBodyElements();
        bodyChildren.forEach((child => {
            const textNodes = this.getTextNodes(child);
            textNodes.forEach((node => {
                const text = node.nodeValue;
                if (text && !this.isAlreadyEdited(node, this.readAloudSpan)) {
                    const parent = node.parentNode;
                    if (parent && !BODY_ELEMENTS_FILTER.split(",").includes(parent.nodeName.toLowerCase())) {
                        const fragment = this.createFragmentForText(text, regex);
                        parent.insertBefore(fragment, node);
                        parent.removeChild(node);
                    }
                }
            }));
        }));
    };
    createFragmentForText(text, regex) {
        const fragment = document.createDocumentFragment();
        const items = text.match(regex);
        if (items?.length > 0) {
            items?.forEach(((item, index) => {
                const span = document.createElement("span");
                span.classList.add(this.readAloudSpan);
                span.textContent = item;
                fragment.appendChild(span);
                if (index < items.length - 1) {
                    fragment.appendChild(document.createTextNode(" "));
                }
            }));
        }
        return fragment;
    }
    resetBody=() => {
        this.tooltipReadAloud?.remove();
        this.resetToDefaultBody([ this.readAloudSpan, TEXT_COLOR_SPAN_CLASS ]);
    };
    resetReadAloud=() => {
        stylesServiceInstance.removeStyle("read-aloud");
        document.removeEventListener("pointermove", this.handler);
        document.removeEventListener("pointerdown", this.handler);
        document.removeEventListener("keydown", this.handler);
        document.removeEventListener("contextmenu", this.handler);
        document.removeEventListener("focusin", this.handler);
    };
    setTooltip=() => {
        const fragment = document.createDocumentFragment();
        const tooltip = document.createElement("div");
        tooltip.setAttribute("id", this.readAloudTooltipId);
        tooltip.textContent = i18nServiceInstance.getMessage("readAloud_tooltip");
        fragment.appendChild(tooltip);
        document.body.insertBefore(fragment, document.body.firstChild);
        stylesServiceInstance.setStyle("read-aloud", this.classReadAloud);
        this.tooltipReadAloud = document.querySelector(`#${this.readAloudTooltipId}`);
        document.addEventListener("pointermove", this.handler);
    };
    getInnerText=element => element.classList.contains(`${PREFIX}colored-text`) ? element.parentElement.innerText : element.innerText;
    createHandler=() => event => {
        switch (event.type) {
          case "pointermove":
            this.tooltipReadAloud.style.left = `${event.pageX - (window.scrollX || document.documentElement.scrollLeft)}px`;
            this.tooltipReadAloud.style.top = `${event.pageY - (window.scrollY || document.documentElement.scrollTop)}px`;
            break;

          case "pointerdown":
            if (speechSynthesis.speaking) speechSynthesis.cancel();
            speechSynthesis.speak(new SpeechSynthesisUtterance(this.getInnerText(event.target)));
            break;

          case "keydown":
            if (event.key === "Escape" || event.key === "Esc") {
                if (speechSynthesis.speaking) speechSynthesis.cancel();
            }
            break;

          case "contextmenu":
            if (speechSynthesis.speaking) speechSynthesis.cancel();
            break;

          case "focusin":
            if (speechSynthesis.speaking) speechSynthesis.cancel();
            speechSynthesis.speak(new SpeechSynthesisUtterance(document.activeElement.innerText));
            break;
        }
    };
}

"use strict";

let readingGuideServiceIsInstantiated;

class ReadingGuideService {
    guideType="";
    sizeGuide=40;
    handler;
    horizontalGuideID=`${PREFIX}horizontal-guide-elt`;
    maskTopEltID=`${PREFIX}mask-guide__top-elt`;
    maskBottomEltID=`${PREFIX}mask-guide__bottom-elt`;
    closeTextID=`${PREFIX}mask-guide__close-text`;
    classRuleGuide=`\n\t\t#${this.horizontalGuideID} {\n\t\t\tborder-top: 4px solid black;\n\t\t\tborder-bottom: 4px solid white;\n\t\t\tbackground: black;\n\t\t\theight: 1px;\n\t\t\twidth: 100%;\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tz-index: calc(infinity);\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#${this.maskTopEltID},\n\t\t#${this.maskBottomEltID} {\n\t\t\tbackground: rgba(0, 0, 0, 0.5) !important;\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tz-index: calc(infinity);\n\t\t}\n\t\t#${this.maskTopEltID} {\n\t\t\ttop: 0;\n\t\t}\n\t\t#${this.maskBottomEltID} {\n\t\t\tbottom: 0;\n\t\t}\n\n\t\t#${this.closeTextID} {\n\t\t\tbackground: rgba(255, 255, 255, 0.4) !important;\n\t\t\tpadding: 0.25em 1em;\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tline-height: 2em;\n\t\t\ttransform: translate(0, -100%);\n\t\t\tz-index: calc(infinity);\n\t\t}\n\t`;
    classAlternatingLinesGuide=`\n\t${PAGE_P_MARKUP_SELECTOR} {\n\t\tbackground: repeating-linear-gradient(\n\t\t\tto bottom,\n\t\t\trgba(255, 255, 255, 0.4) 0 1lh,\n\t\t\trgba(0, 0, 0, 0.2) 1lh 2lh\n\t\t)\n\t}\n\t`;
    constructor() {
        if (readingGuideServiceIsInstantiated) {
            throw new Error("ReadingGuideService is already instantiated.");
        }
        readingGuideServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setReadingMaskGuide=value => {
        switch (value) {
          case "ruleGuide":
            this.resetGuide();
            this.guideType = "rule";
            this.setGuide();
            break;

          case "maskGuide":
            this.resetGuide();
            this.guideType = "mask";
            this.setGuide();
            break;

          case "alternatingLines":
            this.resetGuide();
            this.guideType = "alternatingLines";
            this.setGuide();
            break;

          default:
            this.resetGuide();
        }
    };
    setGuide=() => {
        let styleGuide = "";
        if (this.guideType === "rule") {
            styleGuide = this.classRuleGuide;
        } else if (this.guideType === "mask") {
            styleGuide = this.classMaskGuide;
        } else if (this.guideType === "alternatingLines") {
            this.setPagePMarkupElementsFlag();
            styleGuide = this.classAlternatingLinesGuide;
        }
        stylesServiceInstance.setStyle("reading-guide", styleGuide);
        if (this.guideType === "rule") {
            const readingElt = document.createElement("div");
            readingElt.setAttribute("id", `${this.horizontalGuideID}`);
            document.body.insertBefore(readingElt, document.querySelector(APP_NAME));
        } else if (this.guideType === "mask") {
            const maskTopElt = document.createElement("div");
            const maskBottomElt = document.createElement("div");
            maskTopElt.setAttribute("id", `${this.maskTopEltID}`);
            maskBottomElt.setAttribute("id", `${this.maskBottomEltID}`);
            document.body.insertBefore(maskTopElt, document.querySelector(APP_NAME));
            document.body.insertBefore(maskBottomElt, document.querySelector(APP_NAME));
        }
        document.addEventListener("mousemove", this.handler);
    };
    resetGuide=() => {
        this.guideType = "";
        stylesServiceInstance.removeStyle("reading-guide");
        document.querySelector(`#${this.horizontalGuideID}`)?.remove();
        document.querySelector(`#${this.maskTopEltID}`)?.remove();
        document.querySelector(`#${this.maskBottomEltID}`)?.remove();
        document.querySelector(`#${this.closeTextID}`)?.remove();
        document.removeEventListener("mousemove", this.handler);
        this.removePagePMarkupElementsFlag();
    };
    setPagePMarkupElementsFlag=() => {
        const elts = document.querySelectorAll(PAGE_P_MARKUP_SELECTOR);
        elts.forEach((elt => {
            if (!elt.classList.contains(TEXT_ALTERNATE_LINES)) {
                elt.classList.add(TEXT_ALTERNATE_LINES);
            }
        }));
    };
    removePagePMarkupElementsFlag=() => {
        const elts = document.querySelectorAll(PAGE_P_MARKUP_SELECTOR);
        elts.forEach((elt => {
            if (elt.classList.contains(TEXT_ALTERNATE_LINES)) {
                elt.classList.remove(TEXT_ALTERNATE_LINES);
            }
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "mousemove":
            if (this.guideType === "rule") {
                document.querySelector(`#${PREFIX}horizontal-guide-elt`).style.top = `${event.y + 2}px`;
            } else if (this.guideType === "mask") {
                document.querySelector(`#${this.maskTopEltID}`).style.height = `${event.y - this.sizeGuide}px`;
                document.querySelector(`#${this.maskBottomEltID}`).style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
                document.querySelector(`#${this.closeTextID}`).style.top = `${event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
            break;
        }
    };
}

"use strict";

let readingPageServiceIsInstantiated;

class ReadingPageService {
    readingPageDictionary=[ {
        name: DEFAULT_VALUE,
        fontSize: DEFAULT_VALUE,
        backgroundColor: DEFAULT_VALUE,
        textColor: DEFAULT_VALUE
    }, {
        name: "onlyContent110IvoryBlack",
        fontSize: "110%",
        backgroundColor: "ivory",
        textColor: "black"
    } ];
    originalContent=null;
    readingPageContainer=null;
    constructor() {
        if (readingPageServiceIsInstantiated) {
            throw new Error("ReadingPageService is already instantiated.");
        }
        readingPageServiceIsInstantiated = true;
    }
    setReadingPage=value => {
        this.restoreOriginalContent();
        stylesServiceInstance.removeStyle("reading-page");
        if (value === DEFAULT_VALUE) {
            return;
        }
        const readingPageConfig = this.readingPageDictionary.find((config => config.name === value));
        if (!readingPageConfig) {
            return;
        }
        this.extractAndDisplayContent(readingPageConfig);
    };
    extractAndDisplayContent=config => {
        try {
            if (!this.originalContent) {
                this.originalContent = document.body.cloneNode(true);
            }
            let documentClone;
            try {
                documentClone = document.cloneNode(true);
            } catch (error) {
                documentClone = document.implementation.createHTMLDocument(document.title);
                const htmlElement = document.documentElement.cloneNode(false);
                const headClone = document.head.cloneNode(true);
                const bodyClone = this.createSafeBodyClone();
                htmlElement.appendChild(headClone);
                htmlElement.appendChild(bodyClone);
                documentClone.replaceChild(htmlElement, documentClone.documentElement);
            }
            const reader = new Readability(documentClone);
            const article = reader.parse();
            if (!article) {
                console.warn("[ReadingPage]: Unable to extract the page content");
                return;
            }
            this.createReadingPageContainer(article, config);
        } catch (error) {
            console.error("[ReadingPage]: Error while extracting content:", error);
        }
    };
    createReadingPageContainer=(article, config) => {
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach((child => {
            if (!child.tagName.toLowerCase().includes("app-") && !child.id.includes("cplus-")) {
                child.style.display = "none";
            }
        }));
        this.readingPageContainer = document.createElement("main");
        this.readingPageContainer.id = `${PREFIX}reading-page-container`;
        this.readingPageContainer.innerHTML = `\n\t\t\t\t<h1>${article.title || ""}</h1>\n\t\t\t\t<div class="${PREFIX}reading-page-article">${article.content || ""}</div>\n\t\t`;
        document.body.appendChild(this.readingPageContainer);
        this.applyReadingPageStyles(config);
    };
    applyReadingPageStyles=config => {
        const styles = `\n\t\t\t#${PREFIX}reading-page-container {\n\t\t\t\tposition: fixed;\n\t\t\t\tinset: 0;\n\t\t\t\tbackground-color: ${config.backgroundColor} !important;\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tfont-size: ${config.fontSize} !important;\n\t\t\t\toverflow-y: auto;\n\t\t\t\tpadding: 2rem;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tpadding: 32px 532px;\n\t\t\t\tline-height: 1.6;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container h1 {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tfont-size: 2em !important;\n\t\t\t\tmargin-bottom: 1em !important;\n\t\t\t\tfont-weight: bold !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container :is(h2, h3, h4, h5, h6) {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tmargin: 1em 0 0.5em 0 !important;\n\t\t\t\tfont-weight: bold !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container p {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tmargin: 1em 0 !important;\n\t\t\t\tline-height: 1.6 !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container a {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\ttext-decoration: underline !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container is(ol,ul) {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tmargin: 1em 0 !important;\n\t\t\t\tpadding-left: 2em !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container li {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tmargin: 0.5em 0 !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container img {\n\t\t\t\tmax-width: 100% !important;\n\t\t\t\theight: auto !important;\n\t\t\t\tmargin: 1em 0 !important;\n\t\t\t}\n\n\t\t\t#${PREFIX}reading-page-container blockquote {\n\t\t\t\tcolor: ${config.textColor} !important;\n\t\t\t\tborder-left: 4px solid ${config.textColor} !important;\n\t\t\t\tpadding-left: 1em !important;\n\t\t\t\tmargin: 1em 0 !important;\n\t\t\t\tfont-style: italic !important;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("reading-page", styles);
    };
    createSafeBodyClone() {
        const bodyClone = document.createElement("body");
        Array.from(document.body.attributes).forEach((attr => {
            bodyClone.setAttribute(attr.name, attr.value);
        }));
        this.cloneChildrenSafely(document.body, bodyClone);
        return bodyClone;
    }
    cloneChildrenSafely(source, target) {
        Array.from(source.childNodes).forEach((child => {
            try {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const element = child;
                    if (element.tagName.includes("-") || element.tagName.toLowerCase().includes("app-")) {
                        return;
                    }
                }
                const clonedChild = child.cloneNode(false);
                target.appendChild(clonedChild);
                if (child.nodeType === Node.ELEMENT_NODE && child.hasChildNodes()) {
                    this.cloneChildrenSafely(child, clonedChild);
                }
            } catch (error) {
                console.debug("Élément ignoré lors du clonage:", child);
            }
        }));
    }
    restoreOriginalContent=() => {
        if (this.readingPageContainer) {
            this.readingPageContainer.remove();
            this.readingPageContainer = null;
        }
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach((child => {
            if (!child.tagName.toLowerCase().includes("app-") && !child.id.includes("cplus-")) {
                child.style.display = "";
            }
        }));
    };
}

"use strict";

let restartTopLeftServiceIsInstantiated;

class RestartTopLeftService {
    firstElement;
    constructor() {
        if (restartTopLeftServiceIsInstantiated) {
            throw new Error("RestartTopLeftService is already instantiated.");
        }
        restartTopLeftServiceIsInstantiated = true;
    }
    setRestartTopLeft=() => {
        this.firstElement?.remove();
        this.addAndFocusFirstElement();
    };
    addAndFocusFirstElement=() => {
        this.firstElement = document.createElement("a");
        document.body.insertBefore(this.firstElement, document.querySelector(APP_NAME));
        this.firstElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };
}

"use strict";

let scrollAspectServiceIsInstantiated;

class ScrollAspectService {
    scrollColor="";
    scrollColorHover="";
    scrollBorderColor="";
    scrollWidth="";
    scrollColorValues=[ {
        color: "white",
        hover: "lightgrey",
        border: "black"
    }, {
        color: "blue",
        hover: "darkblue",
        border: "blue"
    }, {
        color: "red",
        hover: "darkred",
        border: "red"
    }, {
        color: "yellow",
        hover: "gold",
        border: "yellow"
    }, {
        color: "green",
        hover: "darkgreen",
        border: "green"
    }, {
        color: "black",
        hover: "darkgrey",
        border: "black"
    } ];
    constructor() {
        if (scrollAspectServiceIsInstantiated) {
            throw new Error("ScrollAspectService is already instantiated.");
        }
        scrollAspectServiceIsInstantiated = true;
    }
    setScrollAspect=value => {
        stylesServiceInstance.removeStyle("scroll-aspect");
        document.body.classList.remove(`${PREFIX}big-scroll`);
        if (value !== DEFAULT_VALUE) {
            document.body.classList.add(`${PREFIX}big-scroll`);
            switch (value?.split("_")[0]) {
              case "big":
                this.scrollWidth = SCROLL_SIZE_BIG;
                break;

              case "huge":
                this.scrollWidth = SCROLL_SIZE_HUGE;
                break;

              default:
                this.scrollWidth = "auto";
                break;
            }
            this.scrollColor = value?.split("_")[1] ? value?.split("_")[1] : "lightgrey";
            let colorHover = this.scrollColorValues.find((o => o.color === this.scrollColor))?.hover;
            let borderColor = this.scrollColorValues.find((o => o.color === this.scrollColor))?.border;
            this.scrollColorHover = colorHover ? colorHover : "grey";
            this.scrollBorderColor = borderColor ? borderColor : "grey";
            this.setScrollClass();
        }
    };
    setScrollClass=() => {
        let styleScroll = `\n\t\t\t\thtml {\n\t\t\t\t\toverflow: initial !important;\n\t\t\t\t}\n\n\t\t\t\t.d-none {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\n\t\t\t\t/* WebKit (Chrome, Safari) */\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar {\n\t\t\t\t\twidth: ${this.scrollWidth};\n\t\t\t\t}\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground-color: ${this.scrollColor};\n\t\t\t\t\tborder: 1px solid ${this.scrollBorderColor};\n\t\t\t\t\tborder-radius: 10px;\n\t\t\t\t\twidth: ${this.scrollWidth};\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground-color: ${this.scrollColorHover};\n\t\t\t\t}\n\n\t\t\t\t/* Firefox */\n\t\t\t\t@-moz-document url-prefix() {\n\t\t\t\t\t.${PREFIX}big-scroll,\n\t\t\t\t\t.${PREFIX}big-scroll * {\n\t\t\t\t\t\tscrollbar-width: auto;\n\t\t\t\t\t\tscrollbar-color: ${this.scrollColor} transparent;\n\t\t\t\t\t}\n\t\t\t\t\t.${PREFIX}big-scroll:hover,\n\t\t\t\t\t.${PREFIX}big-scroll *:hover {\n\t\t\t\t\t\tscrollbar-color: ${this.scrollColorHover} transparent;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t`;
        stylesServiceInstance.setStyle("scroll-aspect", styleScroll);
    };
}

"use strict";

let scrollTypeServiceIsInstantiated = false;

class ScrollTypeService {
    btnState="";
    scrollSteps=100;
    scrollTimer=50;
    scrollDelay=0;
    hoverTimeoutIds={};
    constructor() {
        if (scrollTypeServiceIsInstantiated) {
            throw new Error("ScrollTypeService is already instantiated.");
        }
        scrollTypeServiceIsInstantiated = true;
    }
    setScrollType=(value, delay = 0) => {
        this.btnState = value;
        this.scrollDelay = delay;
        this.setBtnScroll();
    };
    setBtnScroll=() => {
        let intervalUp = null;
        let intervalDown = null;
        const buttonsList = [ {
            name: "scroll_down",
            intervalRef: intervalDown
        }, {
            name: "scroll_up",
            intervalRef: intervalUp
        } ];
        buttonsList.forEach((scrollButton => {
            domServiceInstance.removeButtonsInDom(scrollButton.name);
            if (this.hoverTimeoutIds[scrollButton.name]) {
                clearTimeout(this.hoverTimeoutIds[scrollButton.name]);
                this.hoverTimeoutIds[scrollButton.name] = null;
            }
            if (scrollButton.intervalRef) {
                clearInterval(scrollButton.intervalRef);
                scrollButton.intervalRef = null;
            }
        }));
        if (this.btnState !== DEFAULT_VALUE) {
            buttonsList.forEach((button => {
                domServiceInstance.addButtonsInDom(button.name, true);
                let btnScroll = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button.name}`);
                let scrollDir = button.name.includes("up") ? -1 : button.name.includes("down") ? 1 : 0;
                let scrollBy = scrollDir * this.scrollSteps;
                if (this.btnState === "scrollOnMouseover") {
                    btnScroll.addEventListener("mouseenter", (() => {
                        if (this.scrollDelay > 0) {
                            if (this.hoverTimeoutIds[button.name]) {
                                clearTimeout(this.hoverTimeoutIds[button.name]);
                            }
                            this.hoverTimeoutIds[button.name] = window.setTimeout((() => {
                                this.startScrolling(button, scrollBy);
                                this.hoverTimeoutIds[button.name] = null;
                            }), this.scrollDelay);
                        } else {
                            this.startScrolling(button, scrollBy);
                        }
                    }));
                    btnScroll.addEventListener("mouseleave", (() => this.stopScrolling(button)));
                } else {
                    btnScroll.addEventListener("click", (() => {
                        window.scrollBy(0, scrollBy);
                    }));
                }
            }));
        }
    };
    startScrolling(button, scrollBy) {
        if (button.intervalRef) {
            clearInterval(button.intervalRef);
        }
        button.intervalRef = setInterval((() => {
            window.scrollBy(0, scrollBy);
        }), this.scrollTimer);
    }
    stopScrolling(button) {
        if (this.hoverTimeoutIds[button.name]) {
            clearTimeout(this.hoverTimeoutIds[button.name]);
            this.hoverTimeoutIds[button.name] = null;
        }
        if (button.intervalRef) {
            clearInterval(button.intervalRef);
            button.intervalRef = null;
        }
    }
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
    setSkipToContent=() => {
        this.goToMain();
    };
    goToMain=() => {
        let mainElement;
        mainElement = document.querySelector("main") || document.querySelector('[role="main"]') || document.querySelector('[id="main"]') || document.querySelector('[class="main"]') || document.querySelector('[id="content"]') || document.querySelector('[class="content"]');
        if (mainElement) {
            mainElement.tabIndex = -1;
            mainElement.focus();
        }
    };
}

"use strict";

let stopAnimationsServiceIsInstantiated;

class StopAnimationsService {
    imgClass=`${PREFIX}stop-animations--img`;
    canvasClass=`${PREFIX}stop-animations--canvas`;
    mediaClass=`${PREFIX}stop-animations--media`;
    constructor() {
        if (stopAnimationsServiceIsInstantiated) {
            throw new Error("StopAnimationsService is already instantiated.");
        }
        stopAnimationsServiceIsInstantiated = true;
    }
    styleStopAnimations=`\n\t\t*, *::before, *::after {\n\t\t\tanimation: none !important;\n\t\t\tanimation-fill-mode: forwards !important;\n\t\t\ttransition: none !important;\n\t\t\ttransition-duration: 0.00001s !important;\n\t\t}\n\t`;
    setStopAnimations=value => {
        this.unFreezeAllAnimations();
        stylesServiceInstance.removeStyle("stop-animations");
        if (value !== DEFAULT_VALUE) {
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
        canvas.classList.add(this.canvasClass);
        canvas.setAttribute("aria-hidden", "true");
        img.classList.add(this.imgClass);
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
        document.querySelectorAll("audio, video").forEach((media => {
            if (!media.paused) {
                media.classList.add(this.mediaClass);
                media.pause();
            }
        }));
    };
    unFreezeAllAnimations=() => {
        document.querySelectorAll(`.${this.canvasClass}`).forEach((canvas => {
            canvas.remove();
        }));
        document.querySelectorAll(`.${this.imgClass}`).forEach((img => {
            img.style.opacity = 1;
        }));
        document.querySelectorAll(`.${this.mediaClass}`).forEach((media => {
            media.classList.remove(this.mediaClass);
            media.play();
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
        const nbValue = Number(value);
        const fontSize = value === DEFAULT_VALUE ? null : `${value}%`;
        document.documentElement.style.fontSize = fontSize;
        const lineHeight = !isNaN(nbValue) && nbValue >= 130 ? `${.75 * nbValue / 100}` : DEFAULT_VALUE;
        document.documentElement.style.lineHeight = lineHeight;
        const layoutState = nbValue >= 200 ? "active" : DEFAULT_VALUE;
        deleteLayoutServiceInstance.setDeleteLayout(layoutState);
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
            name: "spacingTextSmall",
            wordSpacing: ".10em",
            lineHeight: "2em",
            letterSpacing: ".0625em"
        }, {
            name: "spacingTextBig",
            wordSpacing: ".25em",
            lineHeight: "2.5em",
            letterSpacing: ".25em"
        }, {
            name: "spacingTextHuge",
            wordSpacing: ".5em",
            lineHeight: "3em",
            letterSpacing: ".5em"
        } ];
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("text-spacing");
        } else {
            let objSpacingText = spacingTextValues?.find((o => o.name === value));
            let styleSpacingText = `\n\t\t\t\t*:not(${APP_NAME}) {\n\t\t\t\t\tword-spacing: ${objSpacingText.wordSpacing} !important;\n\t\t\t\t\tline-height: ${objSpacingText.lineHeight} !important;\n\t\t\t\t\tletter-spacing: ${objSpacingText.letterSpacing} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("text-spacing", styleSpacingText);
        }
    };
}

"use strict";

let zoomServiceIsInstantiated;

class ZoomService {
    constructor() {
        if (zoomServiceIsInstantiated) {
            throw new Error("ZoomService is already instantiated.");
        }
        zoomServiceIsInstantiated = true;
    }
    setZoom=value => {
        const nbValue = Number(value);
        const zoomValue = value === DEFAULT_VALUE ? null : (nbValue / 100).toString();
        const noZoomValue = value === DEFAULT_VALUE ? null : (100 / nbValue).toString();
        const zoomStyle = `\n\t\tbody {\n\t\t\tzoom: ${zoomValue};\n\t\t}\n\t\t${APP_NAME}, body > [id^=${PREFIX}], body::-webkit-scrollbar {\n\t\t\tzoom: ${noZoomValue} !important;\n\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("zoom", zoomStyle);
        const layoutState = nbValue >= 300 ? "active" : DEFAULT_VALUE;
        deleteLayoutServiceInstance.setDeleteLayout(layoutState);
    };
}

"use strict";

let cursorAspectServiceIsInstantiated;

class CursorAspectService {
    colorCursorValues=[ {
        fill: "white",
        stroke: "black"
    }, {
        fill: "ivory",
        stroke: "black"
    }, {
        fill: "blue",
        stroke: "white"
    }, {
        fill: "red",
        stroke: "black"
    }, {
        fill: "yellow",
        stroke: "black"
    }, {
        fill: "green",
        stroke: "white"
    }, {
        fill: "black",
        stroke: "white"
    } ];
    constructor() {
        if (cursorAspectServiceIsInstantiated) {
            throw new Error("CursorAspectService is already instantiated.");
        }
        cursorAspectServiceIsInstantiated = true;
    }
    drawCursor=(type, size, color, strokeWidth) => {
        let stroke = this.colorCursorValues.find((o => o.fill === color))?.stroke;
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
        return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="${stroke}" stroke-width="${strokeWidth}"/></svg>`;
    };
    setCursor=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("cursor-aspect");
        } else if (value) {
            let color = value.split("_")[1] === DEFAULT_VALUE ? "black" : value.split("_")[1];
            let size = value.split("_")[0] === "bigCursor" ? CURSOR_SIZE_BIG : CURSOR_SIZE_HUGE;
            let styleCursor = `\n\t\t\t\t*:not(${APP_NAME}) {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("default", size, color, 6)}') 0 0, default !important;\n\t\t\t\t}\n\n\t\t\t\ta:link,\n\t\t\t\ta:visited,\n\t\t\t\tbutton {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("pointer", size, color, 6)}') ${size / 3} 0, pointer !important;\n\t\t\t\t}\n\n\t\t\t\th1, h2, h3, h4, h5, h6,\n\t\t\t\tp, ul, ol, dl, blockquote,\n\t\t\t\tpre, td, th,\n\t\t\t\tinput, textarea, legend {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("text", size, color, 4)}') ${size / 4} ${size / 4}, text !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("cursor-aspect", styleCursor);
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
    capitalizeFirstLetter=string => string.charAt(0).toUpperCase() + string.slice(1);
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

const domServiceInstance = new DomService;

Object.freeze(domServiceInstance);

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

const cursorAspectServiceInstance = new CursorAspectService;

Object.seal(cursorAspectServiceInstance);

const deleteBackgroundImagesServiceInstance = new DeleteBackgroundImagesService;

Object.seal(deleteBackgroundImagesServiceInstance);

const deleteLayoutServiceInstance = new DeleteLayoutService;

Object.seal(deleteLayoutServiceInstance);

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

const readingPageServiceInstance = new ReadingPageService;

Object.seal(readingPageServiceInstance);

const restartTopLeftServiceInstance = new RestartTopLeftService;

Object.seal(restartTopLeftServiceInstance);

const scrollAspectServiceInstance = new ScrollAspectService;

Object.seal(scrollAspectServiceInstance);

const scrollTypeServiceInstance = new ScrollTypeService;

Object.seal(scrollTypeServiceInstance);

const skipToContentServiceInstance = new SkipToContentService;

Object.seal(skipToContentServiceInstance);

const stopAnimationsServiceInstance = new StopAnimationsService;

Object.seal(stopAnimationsServiceInstance);

const textSizeServiceInstance = new TextSizeService;

Object.seal(textSizeServiceInstance);

const textSpacingServiceInstance = new TextSpacingService;

Object.seal(textSpacingServiceInstance);

const zoomServiceInstance = new ZoomService;

Object.seal(zoomServiceInstance);

const pauseServiceInstance = new PauseService;

Object.freeze(pauseServiceInstance);

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light" style="display:none">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3em" data-name="Accessibility"></app-icon>\n\t\t<span id="pause-indicator" class="sc-confort-plus-pause-icon">\n\t\t\t<app-icon data-size="2em" data-name="Pause"></app-icon>\n\t\t</span>\n\t</button>\n\t<app-toolbar class="bg-body position-fixed top-0 end-0" id="${PREFIX}toolbar"></app-toolbar>\n</div>\n`;

class AppComponent extends HTMLElement {
    confortPlusBtn=null;
    confortPlusToolbar=null;
    closeBtn=null;
    pauseIndicator=null;
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
        iconsServiceInstance.loadSprite(this.shadowRoot);
        setTimeout((() => {
            i18nServiceInstance.translate(this.shadowRoot);
        }));
        this.confortPlusBtn = this?.shadowRoot?.getElementById("confort");
        this.closeBtn = this?.shadowRoot?.getElementById("close-toolbar");
        this.pauseIndicator = this?.shadowRoot?.getElementById("pause-indicator");
        this.confortPlusToolbar = this?.shadowRoot?.getElementById(`${PREFIX}toolbar`);
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        localStorageServiceInstance.getItem("is-opened").then((isOpened => {
            if (isOpened === "true") {
                this.showToolbar();
            } else {
                this.hideToolbar();
            }
        }));
        this.setPauseIndicator();
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
        this.setContainerButtonsPosition(BTN_RIGHT_POS_OPEN);
        this.confortPlusToolbar.classList.remove("close");
        this.confortPlusBtn.classList.add("d-none");
        this.closeBtn?.focus();
        localStorageServiceInstance.setItem("is-opened", "true");
    };
    hideToolbar=() => {
        this.setContainerButtonsPosition(BTN_RIGHT_POS_DEFAULT);
        this.confortPlusToolbar.classList.add("close");
        this.confortPlusBtn.classList.remove("d-none");
        this.confortPlusBtn?.focus();
        localStorageServiceInstance.setItem("is-opened", "false");
        this.setPauseIndicator();
    };
    setContainerButtonsPosition=position => {
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
            document.querySelector(`#${CONTAINER_BUTTONS_ID}`).style.right = position;
        }
    };
    setPauseIndicator=() => {
        localStorageServiceInstance.getItem("is-paused").then((isPaused => {
            this.pauseIndicator.hidden = !isPaused;
            this.confortPlusBtn.classList.toggle("sc-confort-plus--paused", isPaused ?? false);
        }));
    };
}

customElements.define(APP_NAME, AppComponent);

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
        this.settingBtn?.setAttribute("data-name", this.name);
        this.modalBtn?.setAttribute("data-name", this.name);
        this.setSettingBtn(this.activesValues);
        if (this.canEdit) {
            this.modalBtn?.classList.remove("d-none");
        }
        this.settingBtn?.addEventListener("changeSettingEvent", this.handler);
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("clickModalEvent", this.handler);
        this.settingBtn?.removeEventListener("changeSettingEvent", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues?.values.split(",")[this.activesValues?.valueSelected]);
            }
        }
    }
    setSettingBtn=activesValues => {
        this.settingBtn?.setAttribute("data-values", activesValues?.values);
        this.settingBtn?.setAttribute("data-active-value", activesValues?.valueSelected.toString());
        this.modalBtn?.setAttribute("data-value", i18nServiceInstance.getMessage(activesValues?.values?.split(",")[activesValues?.valueSelected]));
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
                this.modalBtn?.setAttribute("data-value", i18nServiceInstance.getMessage(newValue));
            }
        }));
    };
}

"use strict";

const tmplCapitalLetters = document.createElement("template");

tmplCapitalLetters.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class CapitalLettersComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,uppercase,capitalize",
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

tmplClearlyLinks.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class ClearlyLinksComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,bold_underline,bold_boxed",
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

tmplClickFacilite.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClickFaciliteComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,bigZone,longClick_delay2",
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

tmplColorContrast.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ColorContrastComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,reinforcedContrasts,ivory_black",
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

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_black,huge_black",
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

tmplDeleteBackgroundImages.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,backgroundTransparent,backgroundForegroundTransparent",
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

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_black,huge_black",
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

tmplFontFamily.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FontFamilyComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,AccessibleDfA,HelveticaNeue",
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

tmplLinkStyle.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LinkStyleComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,darkblue_orange_brown,lightblue_orange_lightgreen",
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

tmplMagnifier.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MagnifierComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,zoom2,zoom5",
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

tmplMarginAlign.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MarginAlignComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,alignLeft,marginLeft",
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

tmplNavigationAuto.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class NavigationAutoComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,autoFocus_delay2",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(navigationAutoServiceInstance.setNavigationAuto.bind(this));
        this.appendChild(tmplNavigationAuto.content.cloneNode(true));
    }
}

customElements.define("app-navigation-auto", NavigationAutoComponent);

"use strict";

const tmplNavigationButtons = document.createElement("template");

tmplNavigationButtons.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class NavigationButtonsComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,scrollSet_clicAction,navigationSet_clicAction,fullSet_clicAction",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(navigationButtonsServiceInstance.setNavigationButtons.bind(this));
        this.appendChild(tmplNavigationButtons.content.cloneNode(true));
    }
}

customElements.define("app-navigation-buttons", NavigationButtonsComponent);

"use strict";

const tmplReadAloud = document.createElement("template");

tmplReadAloud.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadAloudComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,sentence,paragraph",
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

tmplReadingGuide.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class ReadingGuideComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,ruleGuide,maskGuide,alternatingLinesGuide",
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

const tmplReadingPage = document.createElement("template");

tmplReadingPage.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class ReadingPageComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,onlyContent110IvoryBlack",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(readingPageServiceInstance.setReadingPage.bind(this));
        this.appendChild(tmplReadingPage.content.cloneNode(true));
    }
}

customElements.define("app-reading-page", ReadingPageComponent);

"use strict";

const tmplScrollAspect = document.createElement("template");

tmplScrollAspect.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_black,huge_black",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(scrollAspectServiceInstance.setScrollAspect.bind(this));
        this.appendChild(tmplScrollAspect.content.cloneNode(true));
    }
}

customElements.define("app-scroll-aspect", ScrollAspectComponent);

"use strict";

const tmplStopAnimations = document.createElement("template");

tmplStopAnimations.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class StopAnimationsComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,active",
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

tmplIncreaseTextSize.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class IncreaseTextSizeComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,110,130",
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

tmplSpacingText.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class TextSpacingComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,spacingTextSmall,spacingTextBig",
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

const tmplZoom = document.createElement("template");

tmplZoom.innerHTML = `\n<div class="d-flex align-items-center gap-2 h-100">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ZoomComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,130,200",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(zoomServiceInstance.setZoom.bind(this));
        this.appendChild(tmplZoom.content.cloneNode(true));
    }
}

customElements.define("app-zoom", ZoomComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `\n\t<button type="button" class="btn btn-primary pe-4" data-i18n="moreChoice">\n\t</button>`;

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
            switch (event.currentTarget) {
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

btnSettingLayout.innerHTML = `\n\t<button type="button" class="sc-btn-setting btn btn-primary border-0 flex-column align-items-start justify-content-between w-100 h-100 px-2 position-relative overflow-hidden">\n\t\t<span class="d-flex align-items-start gap-1">\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t\t<span class="sc-btn-setting__name text-start lh-base"></span>\n\t\t</span>\n\t\t<span class="sc-btn-setting__values d-flex gap-1 align-items-center justify-content-center mt-2 mb-0 w-100"></span>\n\t\t<span class="sc-btn-setting__selected-value btn btn-primary border-0 position-absolute d-none w-100 h-100"></span>\n\t\t<span class="sc-btn-setting__label visually-hidden"></span>\n\t</button>\n\t<div class="tooltip bs-tooltip-top sc-btn-setting__tooltip d-none mt-2" role="tooltip">\n\t\t<div class="tooltip-inner text-bg-secondary fw-normal">\n\t\t\t<p class="sc-btn-setting__tooltip-instruction mb-2"></p>\n\t\t\t<p class="sc-btn-setting__tooltip-value"></p>\n  \t</div>\n\t</div>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-values", "data-active-value", "data-name", "data-disabled" ];
    settingBtn=null;
    btnContentSlots=null;
    btnLabel=null;
    index=0;
    value;
    name;
    slot="";
    separator=",";
    settingsList=[];
    disabled=false;
    tooltip=null;
    selectedValue=null;
    timeoutTooltip;
    timeoutSelectedValue;
    handler;
    constructor() {
        super();
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        this.tooltip = this.querySelector(".tooltip");
        this.selectedValue = this.querySelector(".sc-btn-setting__selected-value");
        this.btnContentSlots = this.querySelector(".sc-btn-setting__values");
        this.btnLabel = this.querySelector(".sc-btn-setting__label");
        this.settingBtn.addEventListener("click", this.handler);
        this.settingBtn.addEventListener("focusin", this.handler);
        this.settingBtn.addEventListener("focusout", this.handler);
        this.settingBtn.addEventListener("mouseover", this.handler);
        this.settingBtn.addEventListener("mouseout", this.handler);
        this.setDisabledState();
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", this.handler);
        this.settingBtn?.removeEventListener("focusin", this.handler);
        this.settingBtn?.removeEventListener("focusout", this.handler);
        this.settingBtn?.removeEventListener("mouseover", this.handler);
        this.settingBtn?.removeEventListener("mouseout", this.handler);
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
            this.name = settingName;
            const buttonName = this.querySelector(".sc-btn-setting__name");
            const tooltipInstruction = this.querySelector(".sc-btn-setting__tooltip-instruction");
            const icon = this.querySelector("app-icon");
            buttonName.innerText = i18nServiceInstance.getMessage(`setting_${this.name}`);
            tooltipInstruction.innerText = i18nServiceInstance.getMessage(`setting_${this.name}_instruction`);
            icon?.setAttribute("data-name", this.name);
            this.setTitle();
        }
        if ("data-disabled" === name) {
            this.disabled = newValue === "true";
            this.setDisabledState();
        }
    }
    getValueLabel=value => {
        if (value?.includes("_")) {
            let arrayValues = [];
            value.split("_").forEach((item => {
                const value = i18nServiceInstance.getMessage(item);
                if (value) arrayValues.push(value);
            }));
            return i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        } else {
            return i18nServiceInstance.getMessage(`${this.name}_${value}`);
        }
    };
    setTitle=() => {
        const settingsNumber = this.settingsList.length;
        if (settingsNumber > 0 && this.value) {
            const currentValueLabel = this.getValueLabel(this.value);
            const nextValueIndex = settingsNumber === this.index + 1 ? 0 : this.index + 1;
            const nextValueLabel = this.getValueLabel(this.settingsList[nextValueIndex]);
            let content = "";
            if (currentValueLabel === "active") {
                content = i18nServiceInstance.getMessage("multiclicToggleOn");
            } else if (nextValueLabel === "active") {
                content = i18nServiceInstance.getMessage("multiclicToggleOff");
            } else {
                const currentIndex = this.index + 1;
                content = i18nServiceInstance.getMessage("multiclic", [ currentValueLabel, String(currentIndex), String(settingsNumber), nextValueLabel, String(nextValueIndex + 1) ]);
            }
            const labelParts = content.split(" — ");
            const tooltipValue = this.querySelector(".sc-btn-setting__tooltip-value");
            tooltipValue.innerHTML = labelParts && labelParts.length > 1 ? `<span class="fw-bold">${labelParts[0]}</span>` : content;
            this.btnLabel.innerHTML = content;
        }
    };
    setIndex=index => {
        if (index?.toString()) {
            this.index = index;
        } else {
            let i = this.index + 1;
            this.index = i >= this.settingsList.length ? 0 : i;
            if (!this.settingsList[this.index]) {
                let i = this.index + 1;
                this.index = i >= this.settingsList.length ? 0 : i;
            }
        }
        if (this.index === 0) {
            this.settingBtn?.classList.add("sc-btn-setting--default");
        } else {
            this.settingBtn?.classList.remove("sc-btn-setting--default");
        }
        this.calculateList();
    };
    setDisabledState=() => {
        if (this.settingBtn) {
            this.settingBtn.disabled = this.disabled;
        }
    };
    calculateList=() => {
        this.slot = "";
        this.settingsList.forEach(((value, index) => {
            if (value) {
                let point = '<span class="sc-btn-setting__value rounded-circle"></span>';
                if (index === this.index) {
                    point = '<span class="sc-btn-setting__value sc-btn-setting__current-value rounded-circle"></span>';
                    this.value = value;
                }
                this.slot = `${this.slot}${point}`;
            }
        }));
        this.btnContentSlots.innerHTML = this.slot;
        this.setTitle();
    };
    showTooltip=() => {
        this.hideTooltip();
        this.timeoutTooltip = setTimeout((() => {
            this.tooltip?.classList.remove("d-none");
            this.settingBtn.classList.add("sc-btn-setting--show-tooltip");
        }), 3e3);
    };
    hideTooltip=() => {
        clearTimeout(this.timeoutTooltip);
        this.tooltip?.classList.add("d-none");
        this.settingBtn.classList.remove("sc-btn-setting--show-tooltip");
    };
    showSelectedValue=() => {
        this.selectedValue.innerText = this.getValueLabel(this.value);
        clearTimeout(this.timeoutSelectedValue);
        this.selectedValue?.classList.remove("d-none");
        this.timeoutSelectedValue = setTimeout((() => {
            this.selectedValue?.classList.add("d-none");
        }), 3e3);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "click":
            this.setIndex();
            this.showSelectedValue();
            let clickEvent = new CustomEvent("changeSettingEvent", {
                bubbles: true,
                detail: {
                    value: this.value,
                    index: this.index
                }
            });
            this.settingBtn?.dispatchEvent(clickEvent);
            setTimeout((() => {
                this.settingBtn?.focus();
            }), 300);
            break;

          case "focusin":
          case "mouseover":
            this.showTooltip();
            break;

          case "focusout":
          case "mouseout":
            this.hideTooltip();
            break;
        }
    };
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary">\n\t\t\t\t<span class="visually-hidden"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t\t<app-icon id="mode-icon"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="page-block-title" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon id="page-icon" data-name="Settings"></app-icon>\n\t\t\t\t<span id="page-title"></span>\n\t\t\t</span>\n\n\t\t\t<h1 id="app-title" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white m-0">\n\t\t\t\t<app-icon data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</h1>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Reduire_C+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-display", "data-page-title", "data-page-icon", "data-prev-btn" ];
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
        if ("data-page-title" === name && newValue) {
            this.pageTitle.innerText = i18nServiceInstance.getMessage(newValue);
        }
        if ("data-page-icon" === name) {
            newValue.length === 0 ? this.pageIcon.classList.add("d-none") : this.pageIcon?.setAttribute("data-name", newValue);
        }
        if ("data-prev-btn" === name && newValue) {
            localStorageServiceInstance.getItem("selectedModeName").then((selectedMode => {
                if (!selectedMode) {
                    this.prevBtn.classList.add("d-none");
                    this.pageBlockTitle.classList.remove("ms-2");
                } else {
                    this.prevBtn.title = i18nServiceInstance.getMessage(newValue);
                    this.prevBtn.querySelector("span").innerText = i18nServiceInstance.getMessage(newValue);
                    this.prevBtn.classList.remove("d-none");
                    this.pageBlockTitle.classList.add("ms-2");
                    this.modeIcon?.setAttribute("data-name", `${selectedMode}_border`);
                }
            }));
        }
    }
    displayMode=mode => {
        this.prevBtn?.classList.toggle("d-none", mode === "primary");
        this.pageBlockTitle?.classList.toggle("d-none", mode === "primary");
        this.appTitle?.classList.toggle("d-none", mode === "secondary");
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
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
        this.appendChild(iconLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.sprite = iconsServiceInstance.path;
        this.icon = this.dataset?.name || this.icon;
        this.size = this.dataset?.size || this.size;
        let svg = this.querySelector("svg");
        svg?.setAttribute("width", this.size);
        svg?.setAttribute("height", this.size);
        let use = this.querySelector("use");
        use?.setAttribute("href", `${this.sprite}#ic_${this.icon}`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let use = this.querySelector("use");
        if ("data-name" === name && newValue) {
            use?.setAttribute("href", `${this.sprite}#ic_${newValue}`);
        }
    }
}

customElements.define("app-icon", IconComponent);

"use strict";

const selectEditValueLayout = document.createElement("template");

selectEditValueLayout.innerHTML = `\n\t<div class="d-flex flex-column" role="group">\n\t\t<div class="d-flex align-items-center justify-content-between mt-2 gap-2">\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="prevValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\t\t\t<output></output>\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="nextValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_right"></app-icon>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n`;

class SelectEditValueComponent extends HTMLElement {
    static observedAttributes=[ "data-name", "data-index", "data-setting-values", "data-label" ];
    selectedValue=null;
    btnPrevValue=null;
    btnNextValue=null;
    name="";
    values=[];
    currentIndex=null;
    currentValue=null;
    handler;
    constructor() {
        super();
        this.name = this.dataset?.name || this.name;
        this.appendChild(selectEditValueLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectedValue = this.querySelector("output");
        this.btnPrevValue = this.querySelector("button:first-of-type");
        this.btnNextValue = this.querySelector("button:last-of-type");
        this.btnPrevValue?.addEventListener("click", this.handler);
        this.btnNextValue?.addEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-index" === name) {
            this.currentIndex = Number(newValue);
            this.moveEditValue(this.currentIndex);
        }
        if ("data-setting-values" === name) {
            this.values = newValue.split(",");
        }
        if ("data-label" === name) {
            let groupElement = this.querySelector('div[role="group"]');
            let selectLabel = document.createElement("label");
            selectLabel.innerText = i18nServiceInstance.getMessage(`${this.name}_label`);
            selectLabel.setAttribute("id", `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
            groupElement.insertBefore(selectLabel, groupElement.firstChild);
            groupElement.setAttribute("aria-labelledby", `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
        }
    }
    moveEditValue=index => {
        this.currentIndex = index;
        this.btnPrevValue.disabled = false;
        this.btnNextValue.disabled = false;
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
            this.btnPrevValue.disabled = true;
            this.btnNextValue.disabled = false;
        } else if (this.currentIndex >= this.values.length - 1) {
            this.currentIndex = this.values.length - 1;
            this.btnPrevValue.disabled = false;
            this.btnNextValue.disabled = true;
        }
        this.currentValue = this.values[this.currentIndex];
        if (this.currentValue?.includes("_")) {
            let arrayValues = [];
            this.currentValue.split("_").forEach((item => {
                arrayValues.push(i18nServiceInstance.getMessage(item));
            }));
            this.selectedValue.innerText = i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        } else {
            let message = `${this.name}_${this.currentValue}`;
            this.selectedValue.innerText = i18nServiceInstance.getMessage(message);
        }
        this.changeEditValue();
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.btnPrevValue:
                this.moveEditValue(this.currentIndex - 1);
                break;

              case this.btnNextValue:
                this.moveEditValue(this.currentIndex + 1);
                break;
            }
        }
    };
    changeEditValue=() => {
        let editValueEvent = new CustomEvent(`editSetting${stringServiceInstance.capitalizeFirstLetter(this.name)}`, {
            bubbles: true,
            detail: {
                newValue: this.currentValue
            }
        });
        this.dispatchEvent(editValueEvent);
    };
}

customElements.define("app-select-edit-value", SelectEditValueComponent);

"use strict";

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<input type="radio" name="modes" class="sc-select-mode__input">\n\t<div class="d-flex flex-column align-items-start gap-1 p-2 position-relative sc-select-mode__label btn btn-tertiary">\n\t\t<label class="stretched-link">\n\t\t\t<div class="d-flex align-items-center gap-2 w-100">\n\t\t\t\t<app-icon data-size="2em"></app-icon>\n\t\t\t\t<span class="fs-5 text flex-fill"></span>\n\t\t\t</div>\n\t\t\t<span class="fs-6 fw-normal m-0 mb-3"></span>\n\t\t</label>\n\t\t<button class="btn btn-primary position-relative z-1" type="submit"></button>\n\t</div>\n`;

class SelectModeComponent extends HTMLElement {
    inputElement=null;
    submitBtnElement=null;
    iconElement=null;
    labelElement=null;
    textElement=null;
    descriptionElement=null;
    label="";
    checked=false;
    disabled=false;
    active=false;
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.checked = this.dataset?.checked === "true" || this.checked;
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.active = this.dataset?.active === "true" || this.active;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.inputElement = this.querySelector("input");
        this.submitBtnElement = this.querySelector("button");
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("app-icon + span");
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = stringServiceInstance.normalizeID(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.inputElement.disabled = this.disabled;
        this.submitBtnElement.innerText = i18nServiceInstance.getMessage(this.active ? "resetThisMode" : "validateThisMode");
        this.submitBtnElement.title = this.active ? i18nServiceInstance.getMessage("resetThisModeTitle") : "";
        this.labelElement?.setAttribute("for", stringServiceInstance.normalizeID(this.label));
        this.iconElement?.setAttribute("data-name", `${this.label}_border`);
        this.textElement.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
        if (this.active) {
            this.setActiveState();
        }
    }
    setActiveState=() => {
        let span = document.createElement("span");
        span.classList.add("fs-5", "text");
        span.innerText = i18nServiceInstance.getMessage("activeMode");
        this.querySelector("label div").appendChild(span);
    };
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = `\n\t<div class="gap-1 p-3 text-body">\n\t\t<div class="d-flex align-items-center gap-2 mb-2">\n\t\t\t<app-icon id="edit-setting-icon" data-size="2em"></app-icon>\n\t\t\t<p id="edit-setting-title" class="fs-4 fw-bold mb-0"></p>\n\t\t</div>\n\n\t\t<p id="edit-setting-instruction" class="mb-4"></p>\n\n\t\t<app-edit-capital-letters class="sc-edit-setting__setting"></app-edit-capital-letters>\n\t\t<app-edit-clearly-links class="sc-edit-setting__setting"></app-edit-clearly-links>\n\t\t<app-edit-click-facilite class="sc-edit-setting__setting"></app-edit-click-facilite>\n\t\t<app-edit-color-contrast class="sc-edit-setting__setting"></app-edit-color-contrast>\n\t\t<app-edit-cursor-aspect class="sc-edit-setting__setting"></app-edit-cursor-aspect>\n\t\t<app-edit-delete-background-images class="sc-edit-setting__setting"></app-edit-delete-background-images>\n\t\t<app-edit-focus-aspect class="sc-edit-setting__setting"></app-edit-focus-aspect>\n\t\t<app-edit-font-family class="sc-edit-setting__setting"></app-edit-font-family>\n\t\t<app-edit-link-style class="sc-edit-setting__setting"></app-edit-link-style>\n\t\t<app-edit-magnifier class="sc-edit-setting__setting"></app-edit-magnifier>\n\t\t<app-edit-margin-align class="sc-edit-setting__setting"></app-edit-margin-align>\n\t\t<app-edit-navigation-auto class="sc-edit-setting__setting"></app-edit-navigation-auto>\n\t\t<app-edit-read-aloud class="sc-edit-setting__setting"></app-edit-read-aloud>\n\t\t<app-edit-reading-guide class="sc-edit-setting__setting"></app-edit-reading-guide>\n\t\t<app-edit-scroll-aspect class="sc-edit-setting__setting"></app-edit-scroll-aspect>\n\t\t<app-edit-scroll-type class="sc-edit-setting__setting"></app-edit-scroll-type>\n\t\t<app-edit-stop-animations class="sc-edit-setting__setting"></app-edit-stop-animations>\n\t\t<app-edit-text-size class="sc-edit-setting__setting"></app-edit-text-size>\n\t\t<app-edit-text-spacing class="sc-edit-setting__setting"></app-edit-text-spacing>\n\t\t<app-edit-zoom class="sc-edit-setting__setting"></app-edit-zoom>\n\t\t<app-edit-navigation-buttons class="sc-edit-setting__setting"></app-edit-navigation-buttons>\n\t</div>\n`;

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
            element.classList.add("d-none");
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
    disconnectedCallback() {
        localStorageServiceInstance.removeItem("current-setting");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-setting" === name) {
            this.settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.settingIcon?.setAttribute("data-name", this.settingName);
            this.settingTitle.innerText = i18nServiceInstance.getMessage(`setting_${this.settingName}`);
            this.settingInstruction.innerText = i18nServiceInstance.getMessage(`setting_${this.settingName}_instruction`);
            this.displaySetting(`edit-${newValue}`);
            localStorageServiceInstance.setItem("current-setting", newValue);
        }
    }
    displaySetting=settingName => {
        this.querySelector(".sc-edit-setting__setting:not(.d-none)")?.classList.add("d-none");
        const setting = this.settingsDictionnary.find((setting => settingName === setting.name));
        this.querySelector(setting.element).classList.remove("d-none");
    };
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const editClickFaciliteLayout = document.createElement("template");

editClickFaciliteLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-click-type" data-name="clickType"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-click-delay" class="d-none" data-name="clickDelay"></app-select-edit-value>\n\t</form>\n`;

class EditClickFaciliteComponent extends HTMLElement {
    selectClickTypeElement=null;
    selectClickDelayElement=null;
    settingValues=null;
    clickTypeValue="";
    clickDelayValue="";
    clickTypeValues=[ `clickType_${DEFAULT_VALUE}`, `clickType_${CLICK_FACILITE_BIG_ZONE}`, `clickType_${CLICK_FACILITE_LONG_CLICK}`, `clickType_${CLICK_FACILITE_AUTO_CLICK}` ];
    clickDelayValues=[ "clickDelay_delay1", "clickDelay_delay2", "clickDelay_delay3", "clickDelay_delay6" ];
    handler;
    constructor() {
        super();
        this.appendChild(editClickFaciliteLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectClickTypeElement = this.querySelector(`#${PREFIX}select-click-type`);
        this.selectClickDelayElement = this.querySelector(`#${PREFIX}select-click-delay`);
        this.selectClickTypeElement.addEventListener("editSettingClickType", this.handler);
        this.selectClickDelayElement.addEventListener("editSettingClickDelay", this.handler);
        this.selectClickTypeElement.setAttribute("data-setting-values", this.clickTypeValues.join(","));
        this.selectClickDelayElement.setAttribute("data-setting-values", this.clickDelayValues.join(","));
        modeOfUseServiceInstance.getSetting("clickFacilite").then((result => {
            this.settingValues = result.values.split(",");
            this.clickTypeValue = this.settingValues[result.valueSelected].split("_")[0];
            this.clickDelayValue = this.settingValues[result.valueSelected].split("_")[1];
            const currentIndexClickType = this.clickTypeValues.findIndex((i => i === `clickType_${this.clickTypeValue}`));
            const currentIndexClickDelay = this.clickDelayValue ? this.clickDelayValues.findIndex((i => i === `clickDelay_${this.clickDelayValue}`)) : 0;
            this.selectClickTypeElement.setAttribute("data-index", currentIndexClickType.toString());
            this.selectClickDelayElement.setAttribute("data-index", currentIndexClickDelay.toString());
        }));
    }
    setClickFacilite=() => {
        let value = "";
        if (this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE) {
            value = this.clickTypeValue;
        } else {
            value = `${this.clickTypeValue}_${this.clickDelayValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("clickFacilite", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("clickFacilite", 3, value);
        }
        clickFaciliteServiceInstance.setClickFacilite(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingClickType":
            this.clickTypeValue = event.detail.newValue.split("_")[1];
            this.selectClickDelayElement.classList.toggle("d-none", this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE);
            this.setClickFacilite();
            break;

          case "editSettingClickDelay":
            this.clickDelayValue = event.detail.newValue.split("_")[1];
            this.setClickFacilite();
            break;
        }
    };
}

customElements.define("app-edit-click-facilite", EditClickFaciliteComponent);

"use strict";

const editColorContrastLayout = document.createElement("template");

editColorContrastLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="colorContrast"></app-select-edit-value>\n\t</form>\n`;

class EditColorContrastComponent extends HTMLElement {
    selectColorContrastElement=null;
    settingValues=null;
    colorContrastValues=[ DEFAULT_VALUE, "reinforcedContrasts", "ivory_black", "black_ivory", "white_red", "black_yellow", "white_blue", "yellow_blue", "black_green" ];
    handler;
    constructor() {
        super();
        this.appendChild(editColorContrastLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectColorContrastElement = this.querySelector("app-select-edit-value");
        this.selectColorContrastElement.addEventListener("editSettingColorContrast", this.handler);
        this.selectColorContrastElement.setAttribute("data-setting-values", this.colorContrastValues.join(","));
        modeOfUseServiceInstance.getSetting("colorContrast").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.colorContrastValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectColorContrastElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setColorContrast=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        let color = value?.split("_")[0];
        let backgroundColor = value?.split("_")[1];
        if (value === "reinforcedContrasts") {
            color = "#000";
            backgroundColor = "#fff";
        } else if (value === DEFAULT_VALUE) {
            color = "inherit";
            backgroundColor = "inherit";
        }
        this.selectColorContrastElement.querySelector("output").style.color = color;
        this.selectColorContrastElement.querySelector("output").style.backgroundColor = backgroundColor;
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("colorContrast", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("colorContrast", 3, value);
        }
        colorContrastServiceInstance.setColorsContrasts(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingColorContrast":
            this.setColorContrast(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-color-contrast", EditColorContrastComponent);

"use strict";

const editCursorAspectLayout = document.createElement("template");

editCursorAspectLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-cursor-size" data-name="cursorSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-cursor-color" class="d-none" data-name="cursorColor" data-label="true"></app-select-edit-value>\n\n\t\t<div class="d-flex flex-wrap gap-2 bg-light p-3" id="${PREFIX}example-cursor"></div>\n\t</form>\n`;

class EditCursorAspectComponent extends HTMLElement {
    selectCursorSizeElement=null;
    selectCursorColorElement=null;
    settingValues=null;
    cursorSizeValue="";
    cursorColorValue="";
    cursorSizeValues=[ `cursorSize_${DEFAULT_VALUE}`, "cursorSize_bigCursor", "cursorSize_hugeCursor" ];
    cursorColorValues=[ `cursorColor_${DEFAULT_VALUE}`, "cursorColor_white", "cursorColor_blue", "cursorColor_red", "cursorColor_yellow", "cursorColor_green", "cursorColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editCursorAspectLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectCursorSizeElement = this.querySelector(`#${PREFIX}select-cursor-size`);
        this.selectCursorColorElement = this.querySelector(`#${PREFIX}select-cursor-color`);
        this.selectCursorSizeElement.addEventListener("editSettingCursorSize", this.handler);
        this.selectCursorColorElement.addEventListener("editSettingCursorColor", this.handler);
        this.selectCursorSizeElement.setAttribute("data-setting-values", this.cursorSizeValues.join(","));
        this.selectCursorColorElement.setAttribute("data-setting-values", this.cursorColorValues.join(","));
        modeOfUseServiceInstance.getSetting("cursorAspect").then((result => {
            this.settingValues = result.values.split(",");
            this.cursorSizeValue = this.settingValues[result.valueSelected].split("_")[0];
            this.cursorColorValue = this.settingValues[result.valueSelected].split("_")[1];
            const currentIndexCursorSize = this.cursorSizeValues.findIndex((i => i === `cursorSize_${this.cursorSizeValue}`));
            const currentIndexCursorColor = this.cursorColorValues.findIndex((i => i === `cursorColor_${this.cursorColorValue}`));
            this.selectCursorSizeElement.setAttribute("data-index", currentIndexCursorSize.toString());
            this.selectCursorColorElement.setAttribute("data-index", currentIndexCursorColor.toString());
        }));
    }
    setCursorAspect=() => {
        let value = "";
        if (this.cursorSizeValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
            this.setExampleCursor(true);
        } else {
            value = `${this.cursorSizeValue}_${this.cursorColorValue}`;
            this.setExampleCursor();
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("cursorAspect", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("cursorAspect", 3, value);
        }
        cursorAspectServiceInstance.setCursor(value);
    };
    setExampleCursor=(deleteExample = false) => {
        let containerExample = this.querySelector(`#${PREFIX}example-cursor`);
        containerExample.innerHTML = "";
        if (deleteExample) {
            containerExample.innerText = i18nServiceInstance.getMessage("cursorAspect_empty_example");
        } else {
            let size = this.cursorSizeValue === "bigCursor" ? CURSOR_SIZE_BIG : CURSOR_SIZE_HUGE;
            const cursorArray = [ {
                name: "default",
                strokeWidth: 6
            }, {
                name: "pointer",
                strokeWidth: 6
            }, {
                name: "text",
                strokeWidth: 4
            } ];
            cursorArray.forEach((cursor => {
                const cursorSvg = cursorAspectServiceInstance.drawCursor(cursor.name, Number(size), this.cursorColorValue, cursor.strokeWidth);
                let cursorElt = (new DOMParser).parseFromString(cursorSvg, "text/html");
                containerExample.appendChild(cursorElt.documentElement.querySelector("svg"));
            }));
        }
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingCursorSize":
            this.cursorSizeValue = event.detail.newValue.split("_")[1];
            this.selectCursorColorElement.classList.toggle("d-none", this.cursorSizeValue === `cursorSize_${DEFAULT_VALUE}`);
            this.setCursorAspect();
            break;

          case "editSettingCursorColor":
            this.cursorColorValue = event.detail.newValue.split("_")[1] === DEFAULT_VALUE ? "black" : event.detail.newValue.split("_")[1];
            this.setCursorAspect();
            break;
        }
    };
}

customElements.define("app-edit-cursor-aspect", EditCursorAspectComponent);

"use strict";

const editDeleteBackgroundImagesLayout = document.createElement("template");

editDeleteBackgroundImagesLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="deleteBackgroundImages"></app-select-edit-value>\n\t</form>\n`;

class EditDeleteBackgroundImagesComponent extends HTMLElement {
    selectDeleteBgImgElement=null;
    settingValues=null;
    deleteBackgroundImagesValues=[ DEFAULT_VALUE, "backgroundTransparent", "backgroundForegroundTransparent" ];
    handler;
    constructor() {
        super();
        this.appendChild(editDeleteBackgroundImagesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectDeleteBgImgElement = this.querySelector("app-select-edit-value");
        this.selectDeleteBgImgElement.addEventListener("editSettingDeleteBackgroundImages", this.handler);
        this.selectDeleteBgImgElement.setAttribute("data-setting-values", this.deleteBackgroundImagesValues.join(","));
        modeOfUseServiceInstance.getSetting("deleteBackgroundImages").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.deleteBackgroundImagesValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectDeleteBgImgElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setDeleteBackgroundImages=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("deleteBackgroundImages", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("deleteBackgroundImages", 3, value);
        }
        deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingDeleteBackgroundImages":
            this.setDeleteBackgroundImages(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-delete-background-images", EditDeleteBackgroundImagesComponent);

"use strict";

const editFocusAspectLayout = document.createElement("template");

editFocusAspectLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-focus-size" data-name="focusSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-focus-color" data-name="focusColor" data-label="true"></app-select-edit-value>\n\n\t\t<p>Exemple de texte avec le <span id="${PREFIX}example-focus">focus</span>.</p>\n\t</form>\n`;

class EditFocusAspectComponent extends HTMLElement {
    selectFocusSizeElement=null;
    selectFocusColorElement=null;
    settingValues=null;
    focusSizeValue="";
    focusColorValue="";
    focusSizeValues=[ DEFAULT_VALUE, "focusSize_big", "focusSize_huge" ];
    focusColorValues=[ DEFAULT_VALUE, "focusColor_white", "focusColor_blue", "focusColor_red", "focusColor_yellow", "focusColor_green", "focusColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editFocusAspectLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectFocusSizeElement = this.querySelector(`#${PREFIX}select-focus-size`);
        this.selectFocusColorElement = this.querySelector(`#${PREFIX}select-focus-color`);
        this.selectFocusSizeElement.addEventListener("editSettingFocusSize", this.handler);
        this.selectFocusColorElement.addEventListener("editSettingFocusColor", this.handler);
        this.selectFocusSizeElement.setAttribute("data-setting-values", this.focusSizeValues.join(","));
        this.selectFocusColorElement.setAttribute("data-setting-values", this.focusColorValues.join(","));
        modeOfUseServiceInstance.getSetting("focusAspect").then((result => {
            this.settingValues = result.values.split(",");
            this.focusSizeValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.focusColorValue = this.settingValues[result.valueSelected]?.split("_")[1];
            const currentIndexFocusSize = this.focusSizeValues.findIndex((i => i === `focusSize_${this.focusSizeValue}`));
            const currentIndexFocusColor = this.focusColorValues.findIndex((i => i === `focusColor_${this.focusColorValue}`));
            this.selectFocusSizeElement.setAttribute("data-index", currentIndexFocusSize.toString());
            this.selectFocusColorElement.setAttribute("data-index", currentIndexFocusColor.toString());
        }));
    }
    setFocusAspect=() => {
        let value = "";
        if (this.focusSizeValue === DEFAULT_VALUE && this.focusColorValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.focusSizeValue}_${this.focusColorValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("focusAspect", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("focusAspect", 3, value);
        }
        this.setExampleFocus();
        focusAspectServiceInstance.setFocus(value);
    };
    setExampleFocus=() => {
        let spanExample = this.querySelector(`#${PREFIX}example-focus`);
        let size = this.focusSizeValue;
        let color = this.focusColorValue;
        const styleFocusSize = size !== DEFAULT_VALUE ? size === "big" ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE : "";
        const styleFocusColor = color !== DEFAULT_VALUE ? color : "";
        spanExample.style.outlineStyle = "solid";
        spanExample.style.outlineWidth = styleFocusSize;
        spanExample.style.outlineColor = styleFocusColor;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingFocusSize":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.focusSizeValue = DEFAULT_VALUE;
            } else {
                this.focusSizeValue = event.detail.newValue.split("_")[1];
            }
            this.setFocusAspect();
            break;

          case "editSettingFocusColor":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.focusColorValue = DEFAULT_VALUE;
            } else {
                this.focusColorValue = event.detail.newValue.split("_")[1];
            }
            this.setFocusAspect();
            break;
        }
    };
}

customElements.define("app-edit-focus-aspect", EditFocusAspectComponent);

"use strict";

const editFontFamilyLayout = document.createElement("template");

editFontFamilyLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="fontFamily"></app-select-edit-value>\n\t</form>\n`;

class EditFontFamilyComponent extends HTMLElement {
    selectFontFamilyElement=null;
    settingValues=null;
    fontFamilyValues=fontFamilyServiceInstance.getFontList();
    handler;
    constructor() {
        super();
        this.appendChild(editFontFamilyLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectFontFamilyElement = this.querySelector("app-select-edit-value");
        this.selectFontFamilyElement.addEventListener("editSettingFontFamily", this.handler);
        this.selectFontFamilyElement.setAttribute("data-setting-values", this.fontFamilyValues.join(","));
        modeOfUseServiceInstance.getSetting("fontFamily").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.fontFamilyValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectFontFamilyElement.setAttribute("data-index", currentIndex.toString());
            this.applyFontPreview(this.settingValues[result.valueSelected]);
        }));
    }
    setFontFamily=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("fontFamily", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("fontFamily", 3, value);
        }
        this.applyFontPreview(value);
        fontFamilyServiceInstance.setFontFamily(value);
    };
    applyFontPreview=fontValue => {
        if (!this.selectFontFamilyElement) return;
        this.selectFontFamilyElement.style.fontFamily = "";
        if (fontValue === DEFAULT_VALUE) {
            return;
        }
        const fontInfo = fontFamilyServiceInstance.getFontInfo(fontValue);
        if (fontInfo) {
            this.selectFontFamilyElement.querySelector("output").setAttribute("style", `font-family: ${fontValue}, ${fontInfo.generic} !important`);
        }
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingFontFamily":
            this.setFontFamily(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-font-family", EditFontFamilyComponent);

"use strict";

const editLinkStyleLayout = document.createElement("template");

editLinkStyleLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-color-link" data-name="linkColor" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-color-active-link" data-name="linkPointedColor" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-color-visited-link" data-name="linkVisitedColor" data-label="true"></app-select-edit-value>\n\t</form>\n`;

class EditLinkStyleComponent extends HTMLElement {
    selectColorLinkElement=null;
    selectColorActiveLinkElement=null;
    selectColorVisitedLinkElement=null;
    settingValues=null;
    colorLinkValue="";
    colorActiveLinkValue="";
    colorVisitedLinkValue="";
    colorLinkValues=[ `linkColor_${DEFAULT_VALUE}`, "linkColor_lightblue", "linkColor_lightgreen", "linkColor_yellow", "linkColor_orange", "linkColor_pink", "linkColor_black", "linkColor_darkblue", "linkColor_darkgreen", "linkColor_red", "linkColor_purple", "linkColor_brown" ];
    handler;
    constructor() {
        super();
        this.appendChild(editLinkStyleLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectColorLinkElement = this.querySelector(`#${PREFIX}select-color-link`);
        this.selectColorActiveLinkElement = this.querySelector(`#${PREFIX}select-color-active-link`);
        this.selectColorVisitedLinkElement = this.querySelector(`#${PREFIX}select-color-visited-link`);
        this.selectColorLinkElement.addEventListener("editSettingLinkColor", this.handler);
        this.selectColorActiveLinkElement.addEventListener("editSettingLinkPointedColor", this.handler);
        this.selectColorVisitedLinkElement.addEventListener("editSettingLinkVisitedColor", this.handler);
        this.selectColorLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        this.selectColorActiveLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        this.selectColorVisitedLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        modeOfUseServiceInstance.getSetting("linkStyle").then((result => {
            this.settingValues = result.values.split(",");
            this.colorLinkValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.colorActiveLinkValue = this.settingValues[result.valueSelected]?.split("_")[1];
            this.colorVisitedLinkValue = this.settingValues[result.valueSelected]?.split("_")[2];
            const currentIndexColorLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorLinkValue}`));
            const currentIndexColorActiveLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorActiveLinkValue}`));
            const currentIndexColorVisitedLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorVisitedLinkValue}`));
            this.selectColorLinkElement.setAttribute("data-index", currentIndexColorLink.toString());
            this.selectColorActiveLinkElement.setAttribute("data-index", currentIndexColorActiveLink.toString());
            this.selectColorVisitedLinkElement.setAttribute("data-index", currentIndexColorVisitedLink.toString());
        }));
    }
    setLinkStyle=() => {
        let value = "";
        if (this.colorLinkValue === DEFAULT_VALUE && this.colorActiveLinkValue === DEFAULT_VALUE && this.colorVisitedLinkValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.colorLinkValue}_${this.colorActiveLinkValue}_${this.colorVisitedLinkValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("linkStyle", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("linkStyle", 3, value);
        }
        linkStyleServiceInstance.setLinkStyle(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingLinkColor":
            this.colorLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;

          case "editSettingLinkPointedColor":
            this.colorActiveLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;

          case "editSettingLinkVisitedColor":
            this.colorVisitedLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;
        }
    };
}

customElements.define("app-edit-link-style", EditLinkStyleComponent);

"use strict";

const editMagnifierLayout = document.createElement("template");

editMagnifierLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="magnifier"></app-select-edit-value>\n\t</form>\n`;

class EditMagnifierComponent extends HTMLElement {
    selectMagnifierElement=null;
    settingValues=null;
    magnifierValues=[ DEFAULT_VALUE, "zoom2", "zoom5", "zoom10", "zoom15" ];
    handler;
    constructor() {
        super();
        this.appendChild(editMagnifierLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectMagnifierElement = this.querySelector("app-select-edit-value");
        this.selectMagnifierElement.addEventListener("editSettingMagnifier", this.handler);
        this.selectMagnifierElement.setAttribute("data-setting-values", this.magnifierValues.join(","));
        this.querySelector("form").addEventListener("change", this.handler);
        modeOfUseServiceInstance.getSetting("magnifier").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.magnifierValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectMagnifierElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setMagnifier=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("magnifier", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("magnifier", 3, value);
        }
        magnifierServiceInstance.setMagnifier(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingMagnifier":
            this.setMagnifier(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-magnifier", EditMagnifierComponent);

"use strict";

const editMarginAlignLayout = document.createElement("template");

editMarginAlignLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="marginAlign"></app-select-edit-value>\n\t</form>\n`;

class EditMarginAlignComponent extends HTMLElement {
    selectMarginAlignElement=null;
    settingValues=null;
    marginAlignValues=[ DEFAULT_VALUE, "alignLeft", "marginLeft", "marginList" ];
    handler;
    constructor() {
        super();
        this.appendChild(editMarginAlignLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectMarginAlignElement = this.querySelector("app-select-edit-value");
        this.selectMarginAlignElement.addEventListener("editSettingMarginAlign", this.handler);
        this.selectMarginAlignElement.setAttribute("data-setting-values", this.marginAlignValues.join(","));
        modeOfUseServiceInstance.getSetting("marginAlign").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.marginAlignValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectMarginAlignElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setMarginAlign=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("marginAlign", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("marginAlign", 3, value);
        }
        marginAlignServiceInstance.setMargin(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingMarginAlign":
            this.setMarginAlign(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-margin-align", EditMarginAlignComponent);

"use strict";

const editNavigationAutoLayout = document.createElement("template");

editNavigationAutoLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<fieldset>\n\t\t\t<legend class="fs-5" data-i18n="navigationAuto_label"></legend>\n\t\t\t<div class="btn-group w-100" role="group">\n\t\t\t\t\t<input class="btn-check" type="radio" name="navigationAuto" id="${PREFIX}${DEFAULT_VALUE}-navigation-auto" value="${DEFAULT_VALUE}" autocomplete="off">\n\t\t\t\t\t<label class="btn btn-secondary" for="${PREFIX}${DEFAULT_VALUE}-navigation-auto" data-i18n="navigationAuto_inactive"></label>\n\t\t\t\t\t<input class="btn-check" type="radio" name="navigationAuto" id="${PREFIX}autoFocus-navigation-auto" value="autoFocus" autocomplete="off">\n\t\t\t\t\t<label class="btn btn-secondary" for="${PREFIX}autoFocus-navigation-auto" data-i18n="navigationAuto_active"></label>\n\t\t\t</div>\n\t\t</fieldset>\n\n\t\t<app-select-edit-value class="d-none" data-name="navigationDelay"></app-select-edit-value>\n\t</form>\n`;

class EditNavigationAutoComponent extends HTMLElement {
    selectNavigationDelayElement=null;
    settingValues=null;
    navigationDelayValues=[ "navigationDelay_delay1", "navigationDelay_delay2", "navigationDelay_delay3", "navigationDelay_delay6" ];
    navigationAuto;
    delay;
    handler;
    constructor() {
        super();
        this.appendChild(editNavigationAutoLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectNavigationDelayElement = this.querySelector("app-select-edit-value");
        this.selectNavigationDelayElement.addEventListener("editSettingNavigationDelay", this.handler);
        this.selectNavigationDelayElement.setAttribute("data-setting-values", this.navigationDelayValues.join(","));
        this.querySelector("form").addEventListener("change", this.handler);
        modeOfUseServiceInstance.getSetting("navigationAuto").then((result => {
            this.settingValues = result.values.split(",");
            this.navigationAuto = this.settingValues[result.valueSelected].split("_")[0];
            this.delay = this.settingValues[result.valueSelected].split("_")[1];
            this.querySelector(`input[name="navigationAuto"][id="${PREFIX}${this.navigationAuto}-navigation-auto"]`).checked = true;
            const currentIndex = this.delay ? this.navigationDelayValues.findIndex((i => i === `navigationDelay_${this.delay}`)) : 0;
            this.selectNavigationDelayElement.classList.toggle("d-none", this.navigationAuto === DEFAULT_VALUE);
            this.selectNavigationDelayElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setNavigationAuto=() => {
        let value = "";
        if (this.navigationAuto === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.navigationAuto}_${this.delay}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("navigationAuto", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("navigationAuto", 3, value);
        }
        navigationAutoServiceInstance.setNavigationAuto(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "change":
            this.navigationAuto = this.querySelector(`input[name="navigationAuto"]:checked`).value;
            this.selectNavigationDelayElement.classList.toggle("d-none", this.navigationAuto === DEFAULT_VALUE);
            this.setNavigationAuto();
            break;

          case "editSettingNavigationDelay":
            this.delay = event.detail.newValue.split("_")[1];
            this.setNavigationAuto();
            break;
        }
    };
}

customElements.define("app-edit-navigation-auto", EditNavigationAutoComponent);

"use strict";

const editReadAloudLayout = document.createElement("template");

editReadAloudLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="readAloud"></app-select-edit-value>\n\t</form>\n`;

class EditReadAloudComponent extends HTMLElement {
    selectReadAloudElement=null;
    settingValues=null;
    readAloudValues=[ DEFAULT_VALUE, "word", "sentence", "paragraph", "all" ];
    handler;
    constructor() {
        super();
        this.appendChild(editReadAloudLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadAloudElement = this.querySelector("app-select-edit-value");
        this.selectReadAloudElement.addEventListener("editSettingReadAloud", this.handler);
        this.selectReadAloudElement.setAttribute("data-setting-values", this.readAloudValues.join(","));
        modeOfUseServiceInstance.getSetting("readAloud").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.readAloudValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectReadAloudElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setReadAloud=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("readAloud", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("readAloud", 3, value);
        }
        readAloudServiceInstance.setReadAloud(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingReadAloud":
            this.setReadAloud(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-read-aloud", EditReadAloudComponent);

"use strict";

const editReadingGuideLayout = document.createElement("template");

editReadingGuideLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="readingGuide"></app-select-edit-value>\n\t</form>\n`;

class EditReadingGuideComponent extends HTMLElement {
    selectReadingGuideElement=null;
    settingValues=null;
    readingGuideValues=[ DEFAULT_VALUE, "ruleGuide", "maskGuide", "alternatingLines" ];
    handler;
    constructor() {
        super();
        this.appendChild(editReadingGuideLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadingGuideElement = this.querySelector("app-select-edit-value");
        this.selectReadingGuideElement.addEventListener("editSettingReadingGuide", this.handler);
        this.selectReadingGuideElement.setAttribute("data-setting-values", this.readingGuideValues.join(","));
        modeOfUseServiceInstance.getSetting("readingGuide").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.readingGuideValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectReadingGuideElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setReadingGuide=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("readingGuide", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("readingGuide", 3, value);
        }
        readingGuideServiceInstance.setReadingMaskGuide(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingReadingGuide":
            this.setReadingGuide(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-reading-guide", EditReadingGuideComponent);

"use strict";

const editScrollAspectLayout = document.createElement("template");

editScrollAspectLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-scroll-size" data-name="scrollSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-scroll-color" data-name="scrollColor" data-label="true"></app-select-edit-value>\n\t</form>\n`;

class EditScrollAspectComponent extends HTMLElement {
    selectScrollSizeElement=null;
    selectScrollColorElement=null;
    settingValues=null;
    scrollSizeValue="";
    scrollColorValue="";
    scrollSizeValues=[ DEFAULT_VALUE, "scrollSize_big", "scrollSize_huge" ];
    scrollColorValues=[ DEFAULT_VALUE, "scrollColor_white", "scrollColor_blue", "scrollColor_red", "scrollColor_yellow", "scrollColor_green", "scrollColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editScrollAspectLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectScrollSizeElement = this.querySelector(`#${PREFIX}select-scroll-size`);
        this.selectScrollColorElement = this.querySelector(`#${PREFIX}select-scroll-color`);
        this.selectScrollSizeElement.addEventListener("editSettingScrollSize", this.handler);
        this.selectScrollColorElement.addEventListener("editSettingScrollColor", this.handler);
        this.selectScrollSizeElement.setAttribute("data-setting-values", this.scrollSizeValues.join(","));
        this.selectScrollColorElement.setAttribute("data-setting-values", this.scrollColorValues.join(","));
        modeOfUseServiceInstance.getSetting("scrollAspect").then((result => {
            this.settingValues = result.values?.split(",");
            this.scrollSizeValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.scrollColorValue = this.settingValues[result.valueSelected]?.split("_")[1];
            const currentIndexScrollSize = this.scrollSizeValues.findIndex((i => i === `scrollSize_${this.scrollSizeValue}`));
            const currentIndexScrollColor = this.scrollColorValues.findIndex((i => i === `scrollColor_${this.scrollColorValue}`));
            this.selectScrollSizeElement.setAttribute("data-index", currentIndexScrollSize.toString());
            this.selectScrollColorElement.setAttribute("data-index", currentIndexScrollColor.toString());
        }));
    }
    setScrollAspect=() => {
        let value = "";
        if (this.scrollColorValue === DEFAULT_VALUE) {
            value = this.scrollSizeValue;
        } else {
            value = `${this.scrollSizeValue}_${this.scrollColorValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("scrollAspect", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("scrollAspect", 3, value);
        }
        scrollAspectServiceInstance.setScrollAspect(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingScrollSize":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.scrollSizeValue = DEFAULT_VALUE;
            } else {
                this.scrollSizeValue = event.detail.newValue.split("_")[1];
            }
            this.setScrollAspect();
            break;

          case "editSettingScrollColor":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.scrollColorValue = DEFAULT_VALUE;
            } else {
                this.scrollColorValue = event.detail.newValue.split("_")[1];
            }
            this.setScrollAspect();
            break;
        }
    };
}

customElements.define("app-edit-scroll-aspect", EditScrollAspectComponent);

"use strict";

const editTextSizeLayout = document.createElement("template");

editTextSizeLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="textSize"></app-select-edit-value>\n\t</form>\n`;

class EditTextSizeComponent extends HTMLElement {
    selectTextSizeElement=null;
    settingValues=null;
    textSizeValues=[ DEFAULT_VALUE, "110", "130", "160", "200", "350", "500" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSizeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectTextSizeElement = this.querySelector("app-select-edit-value");
        this.selectTextSizeElement.addEventListener("editSettingTextSize", this.handler);
        this.selectTextSizeElement.setAttribute("data-setting-values", this.textSizeValues.join(","));
        modeOfUseServiceInstance.getSetting("textSize").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.textSizeValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectTextSizeElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setTextSize=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("textSize", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("textSize", 3, value);
        }
        textSizeServiceInstance.setFontSize(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingTextSize":
            this.setTextSize(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-text-size", EditTextSizeComponent);

"use strict";

const editTextSpacingLayout = document.createElement("template");

editTextSpacingLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="textSpacing"></app-select-edit-value>\n\t</form>\n`;

class EditTextSpacingComponent extends HTMLElement {
    selectTextSpacingElement=null;
    settingValues=null;
    textSpacingValues=[ DEFAULT_VALUE, "spacingTextSmall", "spacingTextBig", "spacingTextHuge" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSpacingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectTextSpacingElement = this.querySelector("app-select-edit-value");
        this.selectTextSpacingElement.addEventListener("editSettingTextSpacing", this.handler);
        this.selectTextSpacingElement.setAttribute("data-setting-values", this.textSpacingValues.join(","));
        modeOfUseServiceInstance.getSetting("textSpacing").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.textSpacingValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectTextSpacingElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setSpacingText=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("textSpacing", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("textSpacing", 3, value);
        }
        textSpacingServiceInstance.setSpacingText(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingTextSpacing":
            this.setSpacingText(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-text-spacing", EditTextSpacingComponent);

"use strict";

const editZoomLayout = document.createElement("template");

editZoomLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="zoom"></app-select-edit-value>\n\t</form>\n`;

class EditZoomComponent extends HTMLElement {
    selectZoomElement=null;
    settingValues=null;
    zoomValues=[ DEFAULT_VALUE, "110", "130", "160", "200", "350", "500" ];
    handler;
    constructor() {
        super();
        this.appendChild(editZoomLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectZoomElement = this.querySelector("app-select-edit-value");
        this.selectZoomElement.addEventListener("editSettingZoom", this.handler);
        this.selectZoomElement.setAttribute("data-setting-values", this.zoomValues.join(","));
        modeOfUseServiceInstance.getSetting("zoom").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.zoomValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectZoomElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setZoom(value) {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex === -1) {
            modeOfUseServiceInstance.addSettingCustomValue("zoom", 3, value);
        } else {
            modeOfUseServiceInstance.setSettingValue("zoom", newSettingIndex, true);
        }
        zoomServiceInstance.setZoom(value);
    }
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingZoom":
            this.setZoom(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-zoom", EditZoomComponent);

"use strict";

const editNavigationButtonsComponent = document.createElement("template");

editNavigationButtonsComponent.innerHTML = `\n\t<form class="d-flex flex-column gap-4 text-center">\n\t\t<app-select-edit-value id="${PREFIX}select-button-preset" data-name="buttonSet" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-pointing-delay" data-name="pointingDelay" data-label="true"></app-select-edit-value>\n\t</form>\n`;

class EditNavigationButtonsComponent extends HTMLElement {
    selectButtonPresetElement=null;
    selectPointingDelayElement=null;
    settingValues=null;
    buttonSetValue="";
    pointingDelayValue="";
    buttonSetValues=[ `buttonSet_${DEFAULT_VALUE}`, "buttonSet_scrollSet", "buttonSet_navigationSet", "buttonSet_fullSet" ];
    pointingDelayValues=[ `pointingDelay_clicAction`, "pointingDelay_delay1", "pointingDelay_delay2", "pointingDelay_delay3", "pointingDelay_delay6" ];
    handler;
    constructor() {
        super();
        this.appendChild(editNavigationButtonsComponent.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectButtonPresetElement = this.querySelector(`#${PREFIX}select-button-preset`);
        this.selectPointingDelayElement = this.querySelector(`#${PREFIX}select-pointing-delay`);
        this.selectButtonPresetElement.addEventListener("editSettingButtonSet", this.handler);
        this.selectPointingDelayElement.addEventListener("editSettingPointingDelay", this.handler);
        this.selectButtonPresetElement.setAttribute("data-setting-values", this.buttonSetValues.join(","));
        this.selectPointingDelayElement.setAttribute("data-setting-values", this.pointingDelayValues.join(","));
        modeOfUseServiceInstance.getSetting("navigationButtons").then((result => {
            this.settingValues = result.values?.split(",");
            this.buttonSetValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.pointingDelayValue = this.settingValues[result.valueSelected]?.split("_")[1];
            const currentIndexButtonPreset = this.buttonSetValues.findIndex((i => i === `buttonSet_${this.buttonSetValue}`));
            const currentIndexPointingDelay = this.pointingDelayValues.findIndex((i => i === `pointingDelay_${this.pointingDelayValue}`));
            this.selectButtonPresetElement.setAttribute("data-index", currentIndexButtonPreset.toString());
            this.selectPointingDelayElement.setAttribute("data-index", currentIndexPointingDelay.toString());
            this.togglePointingDelayVisibility();
        }));
    }
    setNavigationButtons=() => {
        let value = `${this.buttonSetValue}_${this.pointingDelayValue}`;
        if (value === `${DEFAULT_VALUE}_clicAction`) {
            value = DEFAULT_VALUE;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("navigationButtons", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("navigationButtons", 3, value);
        }
        navigationButtonsServiceInstance.setNavigationButtons(value);
    };
    togglePointingDelayVisibility=() => {
        if (this.buttonSetValue === DEFAULT_VALUE) {
            this.selectPointingDelayElement.style.display = "none";
        } else {
            this.selectPointingDelayElement.style.display = "";
        }
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingButtonSet":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.buttonSetValue = DEFAULT_VALUE;
            } else {
                this.buttonSetValue = event.detail.newValue.split("_")[1];
            }
            this.togglePointingDelayVisibility();
            this.setNavigationButtons();
            break;

          case "editSettingPointingDelay":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.pointingDelayValue = DEFAULT_VALUE;
            } else {
                this.pointingDelayValue = event.detail.newValue.split("_")[1];
            }
            this.setNavigationButtons();
            break;
        }
    };
}

customElements.define("app-edit-navigation-buttons", EditNavigationButtonsComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n\t<h2 class="fs-6 m-0"><button id="change-mode-btn" type="button" class="btn btn-secondary bg-dark gap-2 p-0 border-0" data-i18n-title="otherUsagesModes">\n\t\t<span class="visually-hidden" data-i18n="otherUsagesModes"></span>\n\t\t<div class="sc-home__icon-mode bg-body rounded-circle text-body">\n\t\t\t<app-icon data-size="2.5em"></app-icon>\n\t\t</div>\n\t\t<div class="d-flex flex-column align-items-start">\n\t\t\t<span class="text-white" data-i18n="profile"></span>\n\t\t\t<span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n\t\t</div>\n\t</button></h2>\n\t<div class="d-grid gap-3 d-md-block">\n\t\t<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n\t\t\t<span id="pause-label" class="visually-hidden" data-i18n="pause"></span>\n\t\t\t<app-icon id="pause-icon" data-name="Pause"></app-icon>\n\t\t</button>\n\t</div>\n</section>\n\n<section class="gap-3 p-3">\n\t<div id="pause-info" class="d-none text-center">\n\t\t<div class="d-flex align-items-center justify-content-center gap-2 mb-3">\n\t\t\t<p class="m-0" data-i18n="pauseInfo"></p>\n\t\t\t<app-icon data-name="Pause" class="text-body"></app-icon>\n\t\t</div>\n\t\t<div class="d-flex flex-column align-items-center gap-2">\n\t\t\t<button id="reactivate-btn" type="button" class="rounded-circle btn btn-icon btn-inverse btn-secondary sc-reactivate-btn p-2" data-i18n-title="reactivateConfortPlus">\n\t\t\t\t<app-icon data-name="Play" class="ms-1"></app-icon>\n\t\t\t</button>\n\t\t\t<span class="text-body" data-i18n="reactivateBtn"></span>\n\t\t</div>\n\t</div>\n\t<div id="mode-settings" class="sc-home__settings gap-3">\n\t\t<app-mode></app-mode>\n\t\t<button id="settings-btn" type="button" class="btn btn-secondary" data-i18n-title="openSettingsMode">\n\t\t\t<app-icon class="me-1" data-name="Settings"></app-icon>\n\t\t\t<span data-i18n="othersSettings"></span>\n\t\t</button>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-modes", "data-custom" ];
    changeModeBtn=null;
    modeSettings=null;
    settingsBtn=null;
    pauseBtn=null;
    reactivateBtn=null;
    pauseLabel=null;
    pauseInfo=null;
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
        this.reactivateBtn = this.querySelector("#reactivate-btn");
        this.modeSettings = this.querySelector("#mode-settings");
        this.pauseLabel = this.querySelector("#pause-label");
        this.pauseInfo = this.querySelector("#pause-info");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
        this.currentMode = this.querySelector("app-mode");
        this.changeModeBtn?.addEventListener("click", this.handler);
        this.settingsBtn?.addEventListener("click", this.handler);
        this.pauseBtn?.addEventListener("click", this.handler);
        this.reactivateBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.cleanupModeData();
        this.changeModeBtn?.removeEventListener("click", this.handler);
        this.settingsBtn?.removeEventListener("click", this.handler);
        this.pauseBtn?.removeEventListener("click", this.handler);
        this.reactivateBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let selectedModeName = Object.entries(JSON.parse(selectedMode))[0][0];
            this.modeName.innerText = i18nServiceInstance.getMessage(`${selectedModeName}Name`);
            this.modeIcon?.setAttribute("data-name", selectedModeName);
            this.currentModeSettings = JSON.stringify(Object.entries(JSON.parse(selectedMode))[0][1]);
            this.currentMode.setAttribute("data-settings", this.currentModeSettings);
            localStorageServiceInstance.getItem("is-paused").then((isPaused => {
                if (isPaused) {
                    this.setPauseState();
                }
            }));
        }
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.changeModeBtn:
                this.changeModeButtonEvent();
                break;

              case this.settingsBtn:
                this.settingsButtonEvent();
                break;

              case this.pauseBtn:
              case this.reactivateBtn:
                this.setPauseState();
                break;
            }
        }
    };
    changeModeButtonEvent=() => {
        this.cleanupModeData();
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
        localStorageServiceInstance.setItem("is-paused", this.pauseState);
        if (this.pauseState) {
            pauseServiceInstance.pauseSettings(this.currentModeSettings);
            this.settingsBtn.disabled = true;
            this.changeModeBtn.disabled = true;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("play"));
            this.pauseLabel.innerText = i18nServiceInstance.getMessage("play");
            this.pauseInfo.classList.remove("d-none");
            this.modeSettings.classList.add("d-none");
            this.currentMode.setAttribute("data-pause", "true");
        } else {
            pauseServiceInstance.playSettings();
            this.settingsBtn.disabled = false;
            this.changeModeBtn.disabled = false;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("pause"));
            this.pauseLabel.innerText = i18nServiceInstance.getMessage("pause");
            this.pauseInfo.classList.add("d-none");
            this.modeSettings.classList.remove("d-none");
            this.currentMode.setAttribute("data-pause", "false");
        }
    };
    cleanupModeData=() => {
        this.modeName.innerText = "";
        this.modeIcon?.removeAttribute("data-name");
        this.currentMode.removeAttribute("data-settings");
        this.currentModeSettings = null;
    };
}

customElements.define("app-home", HomeComponent);

"use strict";

const tmplMode = document.createElement("template");

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting d-none"></app-font-family>\n\t<app-text-size class="sc-mode__setting d-none"></app-text-size>\n\t<app-capital-letters class="sc-mode__setting d-none"></app-capital-letters>\n\t<app-text-spacing class="sc-mode__setting d-none"></app-text-spacing>\n\t<app-reading-guide class="sc-mode__setting d-none"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting d-none"></app-margin-align>\n\t<app-magnifier class="sc-mode__setting d-none"></app-magnifier>\n\t<app-read-aloud class="sc-mode__setting d-none"></app-read-aloud>\n\t<app-cursor-aspect class="sc-mode__setting d-none"></app-cursor-aspect>\n\t<app-focus-aspect class="sc-mode__setting d-none"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting d-none"></app-color-contrast>\n\t<app-link-style class="sc-mode__setting d-none"></app-link-style>\n\t<app-clearly-links class="sc-mode__setting d-none"></app-clearly-links>\n\t<app-stop-animations class="sc-mode__setting d-none"></app-stop-animations>\n\t<app-delete-background-images class="sc-mode__setting d-none"></app-delete-background-images>\n\t<app-scroll-aspect class="sc-mode__setting d-none"></app-scroll-aspect>\n\t<app-navigation-buttons class="sc-mode__setting d-none"></app-navigation-buttons>\n\t<app-click-facilite class="sc-mode__setting d-none"></app-click-facilite>\n\t<app-navigation-auto class="sc-mode__setting d-none"></app-navigation-auto>\n\t<app-zoom class="sc-mode__setting d-none"></app-zoom>\n</div>\n`;

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
    disconnectedCallback() {
        this.modeContent.innerHTML = "";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name && newValue) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ("data-pause" === name) {
            this.disableSettings(newValue === "true");
        }
    }
    displaySettings=settings => {
        let orderedElements = [];
        let othersElements = [];
        settings.forEach((setting => {
            const settingObj = Object.values(setting)[0];
            let settingName = Object.keys(setting)[0];
            let settingRef = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(settingName)));
            let settingElement = this.querySelector(settingRef?.element);
            if (settingElement) {
                settingElement.setAttribute("data-values", JSON.stringify(settingObj));
                settingElement.classList.toggle("d-none", !settingObj.isTool);
                settingObj.order ? orderedElements[settingObj.order - 1] = settingElement : othersElements.push(settingElement);
                settingElement.remove();
            }
        }));
        const elementsToDisplay = orderedElements.filter((el => el)).concat(othersElements);
        elementsToDisplay.forEach((element => {
            this.modeContent.appendChild(element);
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

modesLayout.innerHTML = `\n<form class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4 text-body">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n</form>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    selectModeForm=null;
    selectModeZone=null;
    handler;
    constructor() {
        super();
        this.appendChild(modesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectModeForm = this.querySelector("form");
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
        const selectedMode = json.selectedMode ? json.selectedMode : DEFAULT_MODE;
        let radioModeList = "";
        listMode.forEach((mode => {
            let settingsList = Object.entries(mode)[0][1];
            let disabled = settingsList.length === 0;
            let isChecked = Object.keys(mode)[0] === selectedMode;
            let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}" data-active="${json.selectedMode === mode}" data-disabled="${disabled}"></app-select-mode>`;
            radioModeList = radioModeList + radioMode;
        }));
        this.selectModeZone.innerHTML = radioModeList;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "submit":
            this.selectModeFormEvent(event);
            break;
        }
    };
    selectModeFormEvent=event => {
        event.preventDefault();
        const selectedModeName = this.querySelector("input:checked").value;
        modeOfUseServiceInstance.setSelectedMode(selectedModeName);
        localStorageServiceInstance.setItem("current-category", null);
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_HOME,
                mode: selectedModeName
            }
        });
        this.dispatchEvent(clickEvent);
    };
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n\t<section class="accordion mb-2">\n\t\t<app-text class="c-settings__category accordion-item"></app-text>\n\t\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t\t<app-sound class="c-settings__category accordion-item"></app-sound>\n\t\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n\t\t<div class="border-top border-light border-1"></div>\n\t</section>\n\n\t<div class="p-3">\n\t\t<button id="${PREFIX}reset-mode" type="button" class="btn btn-secondary w-100" data-i18n="resetThisMode" data-i18n-title="resetThisModeTitle"></button>\n\t</div>\n\t<p class="px-3 small text-muted">\n\t\t<a href="https://confort-plus.orange.com/#footer" id="${PREFIX}about-link"></a>.\n\t</p>\n`;

class SettingsComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    resetModeElement=null;
    aboutLinkElement=null;
    selectedMode="";
    handler;
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.aboutLinkElement = this.querySelector(`#${PREFIX}about-link`);
        this.aboutLinkElement.innerText = i18nServiceInstance.getMessage("aboutLink", [ VERSION ]);
        this.resetModeElement = this.querySelector(`#${PREFIX}reset-mode`);
        this.resetModeElement.addEventListener("click", this.handler);
        this.addEventListener("collapsedCategory", this.handler);
    }
    disconnectedCallback() {
        this.removeEventListener("collapsedCategory", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.openOrHideCategories(newValue);
            this.selectedMode = JSON.parse(newValue).selectedMode;
            let mode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let elements = this.querySelectorAll(".c-settings__category");
            const settings = Object.entries(JSON.parse(mode))[0][1];
            elements.forEach((element => {
                element.setAttribute("data-settings", JSON.stringify(settings));
            }));
        }
    }
    openOrHideCategories=mode => {
        categoriesServiceInstance.openMainCategory(JSON.parse(mode).selectedMode).then((result => {
            result.forEach((accordion => {
                this.querySelector(accordion.name).setAttribute("data-open", (!accordion.open).toString());
            }));
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "collapsedCategory":
            categoriesServiceInstance.settingAccordions.forEach((accordion => {
                this.querySelector(accordion.name).setAttribute("data-open", (!accordion.open).toString());
            }));
            break;

          case "click":
            modeOfUseServiceInstance.setSelectedMode(this.selectedMode);
            break;
        }
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
    addAriaAndCollapsedClass=(triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element?.classList.toggle(this.CLASS_NAME_COLLAPSED, isOpen);
            element?.setAttribute("aria-expanded", String(isOpen));
        }
    };
    displaySettings=settings => {
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element => {
                element.removeAttribute("data-default-setting");
                element.classList.add("d-none");
            }));
        }
        let nbActifSetting = 0;
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            if (settingObj) {
                nbActifSetting++;
                let settingElement = this.querySelector(settingObj?.element);
                settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
                settingElement?.setAttribute("data-default-setting", "true");
                settingElement?.classList.remove("d-none");
            }
        }));
        if (nbActifSetting === 0 || nbActifSetting === this.settingsDictionnary.length) {
            this.settingsElements.forEach((element => {
                element.classList.remove("d-none");
            }));
            this.btnMoreSettings?.classList.add("d-none");
        }
    };
    displayOrHideOthersSettings=() => {
        this.displayAllSettings = !this.displayAllSettings;
        this.settingsElements.forEach((element => {
            if (!element.hasAttribute("data-default-setting")) {
                element.classList.toggle("d-none");
            }
        }));
        if (this.displayAllSettings) {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("lessSettings");
        } else {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("moreSettings");
        }
    };
    createHandler=() => event => {
        if (event.type === "click") {
            if (event.currentTarget === this.btnAccordion || this.btnAccordion.contains(event.currentTarget)) {
                categoriesServiceInstance.openCategory(this.tagName);
                let clickCollapsedEvent = new CustomEvent("collapsedCategory", {
                    bubbles: true
                });
                this.btnAccordion?.dispatchEvent(clickCollapsedEvent);
            } else if (event.currentTarget === this.btnMoreSettings) {
                this.displayOrHideOthersSettings();
            }
        }
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Affichage" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-zoom class="c-category__setting" data-can-edit="true"></app-zoom>\n\t\t\t\t<app-magnifier class="c-category__setting" data-can-edit="true"></app-magnifier>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-scroll-aspect class="c-category__setting" data-can-edit="true"></app-scroll-aspect>\n\t\t\t\t<app-stop-animations class="c-category__setting" data-can-edit="true"></app-stop-animations>\n\t\t\t\t<app-delete-background-images class="c-category__setting" data-can-edit="true"></app-delete-background-images>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Navigation" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>\n\t\t\t\t<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">\n\t\t\t<app-icon data-name="Audio" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="audio"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-sound">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-read-aloud class="c-category__setting" data-can-edit="true"></app-read-aloud>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class SoundComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplSound.content.cloneNode(true));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-reading-page class="c-category__setting" data-can-edit="true"></app-reading-page>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-capital-letters class="c-category__setting" data-can-edit="true"></app-capital-letters>\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-read-aloud class="c-category__setting" data-can-edit="true"></app-read-aloud>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

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
    state;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        this.state = this.parentNode.parentNode.host.getAttribute("data-state");
        filesServiceInstance.getJSONFile("modes-of-use").then((result => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(JSON_NAME).then((result => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                } else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(JSON_NAME, this.defaultJson);
                }
                this.initCurrentMode(this.state === "restored");
            }));
        }));
        window.addEventListener(`storage-${JSON_NAME}`, this.handler);
        this.addEventListener("changeRoute", this.handler);
    }
    initCurrentMode=(shouldLoad = false) => {
        if (this.json.selectedMode) {
            routeServiceInstance.initPages(this, shouldLoad).then((result => {
                if (result) {
                    this.setCurrentPage(result);
                }
            }));
        } else {
            routeServiceInstance.navigate(PAGE_MODES, false, this);
            setTimeout((() => {
                this.querySelector("app-modes")?.setAttribute("data-modes", JSON.stringify(this.json));
            }));
        }
    };
    setCurrentPage=page => {
        setTimeout((() => {
            let currentPage = this.querySelector(`app-${page}`);
            if (currentPage) {
                currentPage?.setAttribute("data-modes", JSON.stringify(this.json));
                if (page === PAGE_EDIT_SETTING) {
                    localStorageServiceInstance.getItem("current-setting").then((result => {
                        if (result) {
                            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
                            editSettingElement?.setAttribute("data-setting", result);
                        }
                    }));
                }
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
        routeServiceInstance.navigate(newRoute, false, this);
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

const appRootElt = document.createElement(APP_NAME);

document.body.prepend(appRootElt);