/*
 * orange-confort-plus - version 5.0.0-beta.9 - 26/08/2025
 * Enhance user experience on web sites
 * © 2014 - 2025 Orange SA
 */
"use strict";

const PREFIX = "cplus-";

const JSON_NAME = "modeOfUse";

const DEFAULT_VALUE = "noModifications";

const DEFAULT_MODE = "facilePlus";

const APP_NAME = `${PREFIX}app-root`;

const VERSION = "5.0.0-beta.9";

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

/*!
 * OverlayScrollbars
 * Version: 2.11.5
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(t) {
    "use strict";
    const e = (t, e) => {
        const {o: n, i: r, u: o} = t;
        let s, i = n;
        const c = (t, e) => {
            const n = i, c = t, l = e || (r ? !r(n, c) : n !== c);
            return (l || o) && (i = c, s = n), [ i, l, s ];
        };
        return [ e ? t => c(e(i, s), t) : c, t => [ i, !!t, s ] ];
    }, n = "undefined" != typeof window && "undefined" != typeof HTMLElement && window.document ? window : {}, r = Math.max, o = Math.min, s = Math.round, i = Math.abs, c = Math.sign, l = n.cancelAnimationFrame, a = n.requestAnimationFrame, u = n.setTimeout, d = n.clearTimeout, p = t => void 0 !== n[t] ? n[t] : void 0, y = p("MutationObserver"), h = p("IntersectionObserver"), f = p("ResizeObserver"), v = p("ScrollTimeline"), b = t => void 0 === t, x = t => null === t, g = t => "number" == typeof t, w = t => "string" == typeof t, m = t => "boolean" == typeof t, $ = t => "function" == typeof t, S = t => Array.isArray(t), M = t => "object" == typeof t && !S(t) && !x(t), O = t => {
        const e = !!t && t.length, n = g(e) && e > -1 && e % 1 == 0;
        return !(!(S(t) || !$(t) && n) || e > 0 && M(t) && !(e - 1 in t));
    }, C = t => !!t && t.constructor === Object, L = t => t instanceof HTMLElement, D = t => t instanceof Element, T = () => performance.now(), k = (t, e, n, o, s) => {
        let i = 0;
        const c = T(), u = r(0, n), d = n => {
            const l = T(), p = l - c >= u, y = n ? 1 : 1 - (r(0, c + u - l) / u || 0), h = (e - t) * ($(s) ? s(y, y * u, 0, 1, u) : y) + t, f = p || 1 === y;
            o && o(h, y, f), i = f ? 0 : a((() => d()));
        };
        return d(), t => {
            l(i), t && d(t);
        };
    };
    function A(t, e) {
        if (O(t)) for (let n = 0; n < t.length && !1 !== e(t[n], n, t); n++) ; else t && A(Object.keys(t), (n => e(t[n], n, t)));
        return t;
    }
    const I = (t, e) => t.indexOf(e) >= 0, P = (t, e) => t.concat(e), H = (t, e, n) => (!w(e) && O(e) ? Array.prototype.push.apply(t, e) : t.push(e), 
    t), R = t => Array.from(t || []), z = t => S(t) ? t : !w(t) && O(t) ? R(t) : [ t ], E = t => !!t && !t.length, j = t => R(new Set(t)), _ = (t, e, n) => {
        A(t, (t => !t || t.apply(void 0, e || []))), n || (t.length = 0);
    }, V = "paddingTop", F = "paddingRight", N = "paddingLeft", U = "paddingBottom", B = "marginLeft", Y = "marginRight", q = "marginBottom", K = "overflowX", X = "overflowY", W = "width", Q = "height", Z = "visible", G = "hidden", J = "scroll", tt = (t, e, n, r) => {
        if (t && e) {
            let r = !0;
            return A(n, (n => {
                t[n] !== e[n] && (r = !1);
            })), r;
        }
        return !1;
    }, et = (t, e) => tt(t, e, [ "w", "h" ]), nt = (t, e) => tt(t, e, [ "x", "y" ]), rt = (t, e) => tt(t, e, [ "t", "r", "b", "l" ]), ot = (t, ...e) => t.bind(0, ...e), st = t => {
        let e;
        const n = t ? u : a, r = t ? d : l;
        return [ o => {
            r(e), e = n((() => o()), $(t) ? t() : t);
        }, () => r(e) ];
    }, it = t => {
        const e = $(t) ? t() : t;
        if (g(e)) {
            const t = e ? u : a, n = e ? d : l;
            return r => {
                const o = t((() => r()), e);
                return () => {
                    n(o);
                };
            };
        }
        return e && e._;
    }, ct = (t, e) => {
        const {p: n, v: r, S: o, m: s} = e || {};
        let i, c, l, a, u;
        const d = function(e) {
            c && c(), i && i(), u = c = i = l = void 0, t.apply(this, e);
        }, p = t => s && l ? s(l, t) : t, y = () => {
            c && d(p(a) || a);
        }, h = function() {
            const t = R(arguments), e = it(n);
            if (e) {
                const n = it(r), s = p(t) || t, h = d.bind(0, s);
                c && c(), o && !u ? (h(), u = !0, c = e((() => u = void 0))) : (c = e(h), n && !i && (i = n(y))), 
                l = a = s;
            } else d(t);
        };
        return h.O = y, h;
    }, lt = (t, e) => Object.prototype.hasOwnProperty.call(t, e), at = t => t ? Object.keys(t) : [], ut = (t, e, n, r, o, s, i) => {
        const c = [ e, n, r, o, s, i ];
        return "object" == typeof t && !x(t) || $(t) || (t = {}), A(c, (e => {
            A(e, ((n, r) => {
                const o = e[r];
                if (t === o) return !0;
                const s = S(o);
                if (o && C(o)) {
                    const e = t[r];
                    let n = e;
                    s && !S(e) ? n = [] : s || C(e) || (n = {}), t[r] = ut(n, o);
                } else t[r] = s ? o.slice() : o;
            }));
        })), t;
    }, dt = (t, e) => A(ut({}, t), ((t, e, n) => {
        void 0 === t ? delete n[e] : t && C(t) && (n[e] = dt(t));
    })), pt = t => !at(t).length, yt = () => {}, ht = (t, e, n) => r(t, o(e, n)), ft = t => j((S(t) ? t : (t || "").split(" ")).filter((t => t))), vt = (t, e) => t && t.getAttribute(e), bt = (t, e) => t && t.hasAttribute(e), xt = (t, e, n) => {
        A(ft(e), (e => {
            t && t.setAttribute(e, String(n || ""));
        }));
    }, gt = (t, e) => {
        A(ft(e), (e => t && t.removeAttribute(e)));
    }, wt = (t, e) => {
        const n = ft(vt(t, e)), r = ot(xt, t, e), o = (t, e) => {
            const r = new Set(n);
            return A(ft(t), (t => {
                r[e](t);
            })), R(r).join(" ");
        };
        return {
            C: t => r(o(t, "delete")),
            $: t => r(o(t, "add")),
            H: t => {
                const e = ft(t);
                return e.reduce(((t, e) => t && n.includes(e)), e.length > 0);
            }
        };
    }, mt = (t, e, n) => (wt(t, e).C(n), ot($t, t, e, n)), $t = (t, e, n) => (wt(t, e).$(n), 
    ot(mt, t, e, n)), St = (t, e, n, r) => (r ? $t : mt)(t, e, n), Mt = (t, e, n) => wt(t, e).H(n), Ot = t => wt(t, "class"), Ct = (t, e) => {
        Ot(t).C(e);
    }, Lt = (t, e) => (Ot(t).$(e), ot(Ct, t, e)), Dt = (t, e) => {
        const n = e ? D(e) && e : document;
        return n ? R(n.querySelectorAll(t)) : [];
    }, Tt = (t, e) => D(t) && t.matches(e), kt = t => Tt(t, "body"), At = t => t ? R(t.childNodes) : [], It = t => t && t.parentElement, Pt = (t, e) => D(t) && t.closest(e), Ht = t => document.activeElement, Rt = t => {
        A(z(t), (t => {
            const e = It(t);
            t && e && e.removeChild(t);
        }));
    }, zt = (t, e) => ot(Rt, t && e && A(z(e), (e => {
        e && t.appendChild(e);
    })));
    let Et;
    const jt = t => {
        const e = document.createElement("div");
        return xt(e, "class", t), e;
    }, _t = t => {
        const e = jt(), n = Et, r = t.trim();
        return e.innerHTML = n ? n.createHTML(r) : r, A(At(e), (t => Rt(t)));
    }, Vt = (t, e) => t.getPropertyValue(e) || t[e] || "", Ft = t => {
        const e = t || 0;
        return isFinite(e) ? e : 0;
    }, Nt = t => Ft(parseFloat(t || "")), Ut = t => Math.round(1e4 * t) / 1e4, Bt = t => `${Ut(Ft(t))}px`;
    function Yt(t, e) {
        t && e && A(e, ((e, n) => {
            try {
                const r = t.style, o = x(e) || m(e) ? "" : g(e) ? Bt(e) : e;
                0 === n.indexOf("--") ? r.setProperty(n, o) : r[n] = o;
            } catch (r) {}
        }));
    }
    function qt(t, e, r) {
        const o = w(e);
        let s = o ? "" : {};
        if (t) {
            const i = n.getComputedStyle(t, r) || t.style;
            s = o ? Vt(i, e) : R(e).reduce(((t, e) => (t[e] = Vt(i, e), t)), s);
        }
        return s;
    }
    const Kt = (t, e, n) => {
        const r = e ? `${e}-` : "", o = n ? `-${n}` : "", s = `${r}top${o}`, i = `${r}right${o}`, c = `${r}bottom${o}`, l = `${r}left${o}`, a = qt(t, [ s, i, c, l ]);
        return {
            t: Nt(a[s]),
            r: Nt(a[i]),
            b: Nt(a[c]),
            l: Nt(a[l])
        };
    }, Xt = (t, e) => `translate${M(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Wt = {
        w: 0,
        h: 0
    }, Qt = (t, e) => e ? {
        w: e[`${t}Width`],
        h: e[`${t}Height`]
    } : Wt, Zt = t => Qt("inner", t || n), Gt = ot(Qt, "offset"), Jt = ot(Qt, "client"), te = ot(Qt, "scroll"), ee = t => {
        const e = parseFloat(qt(t, W)) || 0, n = parseFloat(qt(t, Q)) || 0;
        return {
            w: e - s(e),
            h: n - s(n)
        };
    }, ne = t => t.getBoundingClientRect(), re = t => !(!t || !t[Q] && !t[W]), oe = (t, e) => {
        const n = re(t);
        return !re(e) && n;
    }, se = (t, e, n, r) => {
        A(ft(e), (e => {
            t && t.removeEventListener(e, n, r);
        }));
    }, ie = (t, e, n, r) => {
        var o;
        const s = null == (o = r && r.T) || o, i = r && r.I || !1, c = r && r.A || !1, l = {
            passive: s,
            capture: i
        };
        return ot(_, ft(e).map((e => {
            const r = c ? o => {
                se(t, e, r, i), n && n(o);
            } : n;
            return t && t.addEventListener(e, r, l), ot(se, t, e, r, i);
        })));
    }, ce = t => t.stopPropagation(), le = t => t.preventDefault(), ae = t => ce(t) || le(t), ue = (t, e) => {
        const {x: n, y: r} = g(e) ? {
            x: e,
            y: e
        } : e || {};
        g(n) && (t.scrollLeft = n), g(r) && (t.scrollTop = r);
    }, de = t => ({
        x: t.scrollLeft,
        y: t.scrollTop
    }), pe = (t, e) => {
        const {D: n, M: r} = t, {w: o, h: s} = e, l = (t, e, n) => {
            let r = c(t) * n, o = c(e) * n;
            if (r === o) {
                const n = i(t), s = i(e);
                o = n > s ? 0 : o, r = n < s ? 0 : r;
            }
            return r = r === o ? 0 : r, [ r + 0, o + 0 ];
        }, [a, u] = l(n.x, r.x, o), [d, p] = l(n.y, r.y, s);
        return {
            D: {
                x: a,
                y: d
            },
            M: {
                x: u,
                y: p
            }
        };
    }, ye = ({D: t, M: e}) => {
        const n = (t, e) => 0 === t && t <= e;
        return {
            x: n(t.x, e.x),
            y: n(t.y, e.y)
        };
    }, he = ({D: t, M: e}, n) => {
        const r = (t, e, n) => ht(0, 1, (t - n) / (t - e) || 0);
        return {
            x: r(t.x, e.x, n.x),
            y: r(t.y, e.y, n.y)
        };
    }, fe = t => {
        t && t.focus && t.focus({
            preventScroll: !0
        });
    }, ve = (t, e) => {
        A(z(e), t);
    }, be = t => {
        const e = new Map, n = (t, n) => {
            if (t) {
                const r = e.get(t);
                ve((t => {
                    r && r[t ? "delete" : "clear"](t);
                }), n);
            } else e.forEach((t => {
                t.clear();
            })), e.clear();
        }, r = (t, o) => {
            if (w(t)) {
                const r = e.get(t) || new Set;
                return e.set(t, r), ve((t => {
                    $(t) && r.add(t);
                }), o), ot(n, t, o);
            }
            m(o) && o && n();
            const s = at(t), i = [];
            return A(s, (e => {
                const n = t[e];
                n && H(i, r(e, n));
            })), ot(_, i);
        };
        return r(t || {}), [ r, n, (t, n) => {
            A(R(e.get(t)), (t => {
                n && !E(n) ? t.apply(0, n) : t();
            }));
        } ];
    }, xe = {}, ge = {}, we = (t, e, n) => at(t).map((r => {
        const {static: o, instance: s} = t[r], [i, c, l] = n || [], a = n ? s : o;
        if (a) {
            const t = n ? a(i, c, e) : a(e);
            return (l || ge)[r] = t;
        }
    })), me = t => ge[t], $e = "__osOptionsValidationPlugin", Se = `data-overlayscrollbars`, Me = "os-environment", Oe = `${Me}-scrollbar-hidden`, Ce = `${Se}-initialize`, Le = "noClipping", De = `${Se}-body`, Te = Se, ke = "host", Ae = `${Se}-viewport`, Ie = K, Pe = X, He = "arrange", Re = "measuring", ze = "scrolling", Ee = "scrollbarHidden", je = "noContent", _e = `${Se}-padding`, Ve = `${Se}-content`, Fe = "os-size-observer", Ne = `${Fe}-appear`, Ue = `${Fe}-listener`, Be = `${Ue}-scroll`, Ye = `${Ue}-item`, qe = `${Ye}-final`, Ke = "os-trinsic-observer", Xe = "os-theme-none", We = "os-scrollbar", Qe = `${We}-rtl`, Ze = `${We}-horizontal`, Ge = `${We}-vertical`, Je = `${We}-track`, tn = `${We}-handle`, en = `${We}-visible`, nn = `${We}-cornerless`, rn = `${We}-interaction`, on = `${We}-unusable`, sn = `${We}-auto-hide`, cn = `${sn}-hidden`, ln = `${We}-wheel`, an = `${Je}-interactive`, un = `${tn}-interactive`, dn = "__osSizeObserverPlugin", pn = (() => ({
        [dn]: {
            static: () => (t, e, n) => {
                const r = 3333333, o = "scroll", s = _t(`<div class="${Ye}" dir="ltr"><div class="${Ye}"><div class="${qe}"></div></div><div class="${Ye}"><div class="${qe}" style="width: 200%; height: 200%"></div></div></div>`), i = s[0], c = i.lastChild, u = i.firstChild, d = null == u ? void 0 : u.firstChild;
                let p, y = Gt(i), h = y, f = !1;
                const v = () => {
                    ue(u, r), ue(c, r);
                }, b = t => {
                    p = 0, f && (y = h, e(!0 === t));
                }, x = t => {
                    h = Gt(i), f = !t || !et(h, y), t ? (ce(t), f && !p && (l(p), p = a(b))) : b(!1 === t), 
                    v();
                }, g = [ zt(t, s), ie(u, o, x), ie(c, o, x) ];
                return Lt(t, Be), Yt(d, {
                    [W]: r,
                    [Q]: r
                }), a(v), [ n ? ot(x, !1) : v, g ];
            }
        }
    }))(), yn = (t, e) => {
        const {k: n} = e, [r, o] = t("showNativeOverlaidScrollbars");
        return [ r && n.x && n.y, o ];
    }, hn = t => 0 === t.indexOf(Z), fn = (t, e) => {
        if ("auto" === t) return e ? J : G;
        const n = t || G;
        return [ G, J, Z ].includes(n) ? n : G;
    }, vn = (t, e) => {
        const {overflowX: n, overflowY: r} = qt(t, [ K, X ]);
        return {
            x: fn(n, e.x),
            y: fn(r, e.y)
        };
    }, bn = "__osScrollbarsHidingPlugin", xn = (() => ({
        [bn]: {
            static: () => ({
                R: (t, e, n, r, o) => {
                    const {V: s, L: i} = t, {U: c, k: l, P: a} = r, u = !s && !c && (l.x || l.y), [d] = yn(o, r), p = t => {
                        const e = c || d ? 0 : 42, n = (t, n, r) => [ n && !c ? t ? e : r : 0, t && !!e ], [r, o] = n(l.x, t.x === J, a.x), [s, i] = n(l.y, t.y === J, a.y);
                        return {
                            N: {
                                x: r,
                                y: s
                            },
                            q: {
                                x: o,
                                y: i
                            }
                        };
                    }, y = t => {
                        if (!s) {
                            const {j: r} = n, o = ut({}, {
                                [Y]: 0,
                                [q]: 0,
                                [B]: 0
                            }), {N: s, q: i} = p(t), {x: c, y: l} = i, {x: a, y: d} = s, {B: y} = e, h = r ? B : Y, f = r ? N : F, v = y[h], b = y[q], x = y[f], g = y[U];
                            return o[W] = `calc(100% + ${d + -1 * v}px)`, o[h] = -d + v, o[q] = -a + b, u && (o[f] = x + (l ? d : 0), 
                            o[U] = g + (c ? a : 0)), o;
                        }
                    };
                    return {
                        X: (t, r, o) => {
                            if (u) {
                                const {B: s} = e, {N: c, q: l} = p(t), {x: a, y: u} = l, {x: d, y: y} = c, {j: h} = n, f = s[h ? F : N], v = s.paddingTop, b = r.w + o.w, x = r.h + o.h, g = {
                                    w: y && u ? `${y + b - f}px` : "",
                                    h: d && a ? `${d + x - v}px` : ""
                                };
                                Yt(i, {
                                    "--os-vaw": g.w,
                                    "--os-vah": g.h
                                });
                            }
                            return u;
                        },
                        Y: () => {
                            if (u) {
                                const {F: t, B: n} = e, r = vn(i, t), {q: o} = p(r), {x: s, y: c} = o, l = {}, a = t => A(t, (t => {
                                    l[t] = n[t];
                                }));
                                s && a([ q, V, U ]), c && a([ B, Y, N, F ]);
                                const u = qt(i, at(l)), d = mt(i, Ae, He);
                                return Yt(i, l), () => {
                                    Yt(i, ut({}, u, y(r))), d();
                                };
                            }
                            return yt;
                        },
                        W: y
                    };
                }
            })
        }
    }))(), gn = "__osClickScrollPlugin", wn = (() => ({
        [gn]: {
            static: () => (t, e, n, r) => {
                let o = !1, s = yt;
                const i = 133, c = 222, [l, a] = st(i), u = Math.sign(e), d = n * u, p = d / 2, y = t => 1 - (1 - t) * (1 - t), h = (e, n) => k(e, n, c, t, y), f = (n, r) => k(n, e - d, i * r, ((n, r, o) => {
                    t(n), o && (s = h(n, e));
                })), v = k(0, d, c, ((i, c, a) => {
                    if (t(i), a && (r(o), !o)) {
                        const t = e - i;
                        Math.sign(t - p) === u && l((() => {
                            const r = t - d, o = Math.sign(r) === u;
                            s = o ? f(i, Math.abs(r) / n) : h(i, e);
                        }));
                    }
                }), y);
                return t => {
                    o = !0, t && v(), a(), s();
                };
            }
        }
    }))(), mn = t => JSON.stringify(t, ((t, e) => {
        if ($(e)) throw 0;
        return e;
    })), $n = (t, e) => t ? `${e}`.split(".").reduce(((t, e) => t && lt(t, e) ? t[e] : void 0), t) : void 0, Sn = {
        paddingAbsolute: !1,
        showNativeOverlaidScrollbars: !1,
        update: {
            elementEvents: [ [ "img", "load" ] ],
            debounce: [ 0, 33 ],
            attributes: null,
            ignoreMutation: null
        },
        overflow: {
            x: "scroll",
            y: "scroll"
        },
        scrollbars: {
            theme: "os-theme-dark",
            visibility: "auto",
            autoHide: "never",
            autoHideDelay: 1300,
            autoHideSuspend: !1,
            dragScroll: !0,
            clickScroll: !1,
            pointers: [ "mouse", "touch", "pen" ]
        }
    }, Mn = (t, e) => {
        const n = {};
        return A(P(at(e), at(t)), (r => {
            const o = t[r], s = e[r];
            if (M(o) && M(s)) ut(n[r] = {}, Mn(o, s)), pt(n[r]) && delete n[r]; else if (lt(e, r) && s !== o) {
                let t = !0;
                if (S(o) || S(s)) try {
                    mn(o) === mn(s) && (t = !1);
                } catch (i) {}
                t && (n[r] = s);
            }
        })), n;
    }, On = (t, e, n) => r => [ $n(t, r), n || void 0 !== $n(e, r) ];
    let Cn, Ln;
    const Dn = () => (Ln || (Ln = (() => {
        const t = (t, e, n) => {
            zt(document.body, t), zt(document.body, t);
            const r = Jt(t), o = Gt(t), s = ee(e);
            return n && Rt(t), {
                x: o.h - r.h + s.h,
                y: o.w - r.w + s.w
            };
        }, r = _t(`<div class="${Me}"><div></div><style>${`.${Me}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Me} div{width:200%;height:200%;margin:10px 0}.${Oe}{scrollbar-width:none!important}.${Oe}::-webkit-scrollbar,.${Oe}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`}</style></div>`)[0], o = r.firstChild, s = r.lastChild, i = Cn;
        i && (s.nonce = i);
        const [c, , l] = be(), [a, u] = e({
            o: t(r, o),
            i: nt
        }, ot(t, r, o, !0)), [d] = u(), p = (t => {
            let e = !1;
            const n = Lt(t, Oe);
            try {
                e = "none" === qt(t, "scrollbar-width") || "none" === qt(t, "display", "::-webkit-scrollbar");
            } catch (r) {}
            return n(), e;
        })(r), y = {
            x: 0 === d.x,
            y: 0 === d.y
        }, h = {
            elements: {
                host: null,
                padding: !p,
                viewport: t => p && kt(t) && t,
                content: !1
            },
            scrollbars: {
                slot: !0
            },
            cancel: {
                nativeScrollbarsOverlaid: !1,
                body: null
            }
        }, f = ut({}, Sn), b = ot(ut, {}, f), x = ot(ut, {}, h), g = {
            P: d,
            k: y,
            U: p,
            G: !!v,
            J: ot(c, "r"),
            K: x,
            Z: t => ut(h, t) && x(),
            tt: b,
            nt: t => ut(f, t) && b(),
            ot: ut({}, h),
            st: ut({}, f)
        };
        if (gt(r, "style"), Rt(r), ie(n, "resize", (() => {
            l("r", []);
        })), $(n.matchMedia) && !p && (!y.x || !y.y)) {
            const t = e => {
                const r = n.matchMedia(`(resolution: ${n.devicePixelRatio}dppx)`);
                ie(r, "change", (() => {
                    e(), t(e);
                }), {
                    A: !0
                });
            };
            t((() => {
                const [t, e] = a();
                ut(g.P, t), l("r", [ e ]);
            }));
        }
        return g;
    })()), Ln), Tn = (t, e, n, r) => {
        let o = !1;
        const {et: s, ct: i, rt: c, it: l, lt: a, ut: u} = r || {}, d = ct((() => o && n(!0)), {
            p: 33,
            v: 99
        }), [p, h] = ((t, e, n) => {
            let r = !1;
            const o = !!n && new WeakMap, s = s => {
                if (o && n) {
                    const i = n.map((e => {
                        const [n, r] = e || [];
                        return [ r && n ? (s || Dt)(n, t) : [], r ];
                    }));
                    A(i, (n => A(n[0], (s => {
                        const i = n[1], c = o.get(s) || [];
                        if (t.contains(s) && i) {
                            const t = ie(s, i, (n => {
                                r ? (t(), o.delete(s)) : e(n);
                            }));
                            o.set(s, H(c, t));
                        } else _(c), o.delete(s);
                    }))));
                }
            };
            return s(), [ () => {
                r = !0;
            }, s ];
        })(t, d, c), f = i || [], v = P(s || [], f), b = (o, s) => {
            if (!E(s)) {
                const i = a || yt, c = u || yt, d = [], p = [];
                let y = !1, v = !1;
                if (A(s, (n => {
                    const {attributeName: o, target: s, type: a, oldValue: u, addedNodes: h, removedNodes: b} = n, x = "attributes" === a, g = "childList" === a, m = t === s, $ = x && o, S = $ && vt(s, o || ""), M = w(S) ? S : null, O = $ && u !== M, C = I(f, o) && O;
                    if (e && (g || !m)) {
                        const e = x && O, a = e && l && Tt(s, l), p = (a ? !i(s, o, u, M) : !x || e) && !c(n, !!a, t, r);
                        A(h, (t => H(d, t))), A(b, (t => H(d, t))), v = v || p;
                    }
                    !e && m && O && !i(s, o, u, M) && (H(p, o), y = y || C);
                })), h((t => j(d).reduce(((e, n) => (H(e, Dt(t, n)), Tt(n, t) ? H(e, n) : e)), []))), 
                e) return !o && v && n(!1), [ !1 ];
                if (!E(p) || y) {
                    const t = [ j(p), y ];
                    return o || n.apply(0, t), t;
                }
            }
        }, x = new y(ot(b, !1));
        return [ () => (x.observe(t, {
            attributes: !0,
            attributeOldValue: !0,
            attributeFilter: v,
            subtree: e,
            childList: e,
            characterData: e
        }), o = !0, () => {
            o && (p(), x.disconnect(), o = !1);
        }), () => {
            if (o) return d.O(), b(!0, x.takeRecords());
        } ];
    };
    let kn = null;
    const An = (t, n, r) => {
        const {ft: o} = r || {}, s = me(dn), [i] = e({
            o: !1,
            u: !0
        });
        return () => {
            const e = [], r = _t(`<div class="${Fe}"><div class="${Ue}"></div></div>`)[0], c = r.firstChild, l = t => {
                let e = !1, r = !1;
                if (S(t) && !E(t)) {
                    const n = t[0], [o, , s] = i(n.contentRect), c = re(o);
                    r = oe(o, s), e = !r && !c;
                } else r = !0 === t;
                e || n({
                    _t: !0,
                    ft: r
                });
            };
            if (f) {
                if (!m(kn)) {
                    const e = new f(yt);
                    e.observe(t, {
                        get box() {
                            kn = !0;
                        }
                    }), kn = kn || !1, e.disconnect();
                }
                const n = ct(l, {
                    p: 0,
                    v: 0
                }), o = t => n(t), s = new f(o);
                if (s.observe(kn ? t : c), H(e, [ () => {
                    s.disconnect();
                }, !kn && zt(t, r) ]), kn) {
                    const n = new f(o);
                    n.observe(t, {
                        box: "border-box"
                    }), H(e, (() => n.disconnect()));
                }
            } else {
                if (!s) return yt;
                {
                    const [n, i] = s(c, l, o);
                    H(e, P([ Lt(r, Ne), ie(r, "animationstart", n), zt(t, r) ], i));
                }
            }
            return ot(_, e);
        };
    }, In = (t, n) => {
        let r;
        const o = jt(Ke), [s] = e({
            o: !1
        }), i = (t, e) => {
            if (t) {
                const r = s((t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0)(t)), [, o] = r;
                return o && !e && n(r) && [ r ];
            }
        }, c = (t, e) => i(e.pop(), t);
        return [ () => {
            const e = [];
            if (h) r = new h(ot(c, !1), {
                root: t
            }), r.observe(o), H(e, (() => {
                r.disconnect();
            })); else {
                const t = () => {
                    const t = Gt(o);
                    i(t);
                };
                H(e, An(o, t)()), t();
            }
            return ot(_, H(e, zt(t, o)));
        }, () => r && c(!0, r.takeRecords()) ];
    }, Pn = (t, n, r, o) => {
        let s, i, c, l, a, u;
        const d = `[${Te}]`, p = `[${Ae}]`, y = [ "id", "class", "style", "open", "wrap", "cols", "rows" ], {dt: h, vt: v, L: b, gt: x, ht: w, V: m, bt: M, wt: O, yt: C, St: L} = t, T = t => "rtl" === qt(t, "direction"), k = {
            Ot: !1,
            j: T(h)
        }, A = Dn(), I = me(bn), [H] = e({
            i: et,
            o: {
                w: 0,
                h: 0
            }
        }, (() => {
            const e = I && I.R(t, n, k, A, r).Y, o = !(M && m) && Mt(v, Te, Le), s = !m && O(He), i = s && de(x), c = i && L(), l = C(Re, o), a = s && e && e(), u = te(b), d = ee(b);
            return a && a(), ue(x, i), c && c(), o && l(), {
                w: u.w + d.w,
                h: u.h + d.h
            };
        })), R = ct(o, {
            p: () => s,
            v: () => i,
            m(t, e) {
                const [n] = t, [r] = e;
                return [ P(at(n), at(r)).reduce(((t, e) => (t[e] = n[e] || r[e], t)), {}) ];
            }
        }), z = t => {
            const e = T(h);
            ut(t, {
                Ct: u !== e
            }), ut(k, {
                j: e
            }), u = e;
        }, E = (t, e) => {
            const [n, r] = t, s = {
                $t: r
            };
            return ut(k, {
                Ot: n
            }), e || o(s), s;
        }, j = ({_t: t, ft: e}) => {
            const n = t && !e || !A.U ? o : R, r = {
                _t: t || e,
                ft: e
            };
            z(r), n(r);
        }, _ = (t, e) => {
            const [, n] = H(), r = {
                xt: n
            };
            return z(r), n && !e && (t ? o : R)(r), r;
        }, V = (t, e, n) => {
            const r = {
                Ht: e
            };
            return z(r), e && !n && R(r), r;
        }, [F, N] = w ? In(v, E) : [], U = !m && An(v, j, {
            ft: !0
        }), [B, Y] = Tn(v, !1, V, {
            ct: y,
            et: y
        }), q = m && f && new f((t => {
            const e = t[t.length - 1].contentRect;
            j({
                _t: !0,
                ft: oe(e, a)
            }), a = e;
        })), K = ct((() => {
            const [, t] = H();
            o({
                xt: t,
                _t: M
            });
        }), {
            p: 222,
            S: !0
        });
        return [ () => {
            q && q.observe(v);
            const t = U && U(), e = F && F(), n = B(), r = A.J((t => {
                t ? R({
                    Et: t
                }) : K();
            }));
            return () => {
                q && q.disconnect(), t && t(), e && e(), l && l(), n(), r();
            };
        }, ({zt: t, Tt: e, It: n}) => {
            const r = {}, [o] = t("update.ignoreMutation"), [a, u] = t("update.attributes"), [h, f] = t("update.elementEvents"), [v, x] = t("update.debounce"), M = e || n;
            if (f || u) {
                c && c(), l && l();
                const [t, e] = Tn(w || b, !0, _, {
                    et: P(y, a || []),
                    rt: h,
                    it: d,
                    ut: (t, e) => {
                        const {target: n, attributeName: r} = t;
                        return !(e || !r || m) && ((t, e, n) => {
                            const r = Pt(t, e), o = t && ((t, e) => {
                                const n = e ? D(e) && e : document;
                                return n && n.querySelector(t);
                            })(n, r), s = Pt(o, e) === r;
                            return !(!r || !o) && (r === t || o === t || s && Pt(Pt(t, n), e) !== r);
                        })(n, d, p) || !!Pt(n, `.${We}`) || !!(t => $(o) && o(t))(t);
                    }
                });
                l = t(), c = e;
            }
            if (x) if (R.O(), S(v)) {
                const t = v[0], e = v[1];
                s = g(t) && t, i = g(e) && e;
            } else g(v) ? (s = v, i = !1) : (s = !1, i = !1);
            if (M) {
                const t = Y(), e = N && N(), n = c && c();
                t && ut(r, V(t[0], t[1], M)), e && ut(r, E(e[0], M)), n && ut(r, _(n[0], M));
            }
            return z(r), r;
        }, k ];
    }, Hn = (t, e) => $(e) ? e.apply(0, t) : e, Rn = (t, e, n, r) => {
        const o = b(r) ? n : r;
        return Hn(t, o) || e.apply(0, t);
    }, zn = (t, e, n, r) => {
        const o = b(r) ? n : r, s = Hn(t, o);
        return !!s && (L(s) ? s : e.apply(0, t));
    }, En = (t, e, n, r) => {
        const o = "--os-viewport-percent", s = "--os-scroll-percent", i = "--os-scroll-direction", {K: c} = Dn(), {scrollbars: l} = c(), {slot: a} = l, {dt: u, vt: d, L: p, At: y, gt: h, bt: f, V: b} = e, {scrollbars: x} = y ? {} : t, {slot: g} = x || {}, w = [], $ = [], S = [], M = zn([ u, d, p ], (() => b && f ? u : d), a, g), O = t => {
            if (v) {
                let e = null, r = [];
                const o = new v({
                    source: h,
                    axis: t
                }), s = () => {
                    e && e.cancel(), e = null;
                }, i = i => {
                    const {Dt: c} = n, l = ye(c)[t], a = "x" === t, u = [ Xt(0, a), Xt(`calc(100cq${a ? "w" : "h"} + -100%)`, a) ], d = l ? u : u.reverse();
                    return r[0] === d[0] && r[1] === d[1] || (s(), r = d, e = i.Mt.animate({
                        clear: [ "left" ],
                        transform: d
                    }, {
                        timeline: o
                    })), s;
                };
                return {
                    kt: i
                };
            }
        }, C = {
            x: O("x"),
            y: O("y")
        }, L = (t, e, n) => {
            const r = n ? Lt : Ct;
            A(t, (t => {
                r(t.Lt, e);
            }));
        }, D = (t, e) => {
            A(t, (t => {
                const [n, r] = e(t);
                Yt(n, r);
            }));
        }, T = (t, e, n) => {
            const r = m(n), o = !r || !n;
            (!r || n) && L($, t, e), o && L(S, t, e);
        }, k = t => {
            const e = t ? "x" : "y", n = jt(`${We} ${t ? Ze : Ge}`), o = jt(Je), s = jt(tn), i = {
                Lt: n,
                Ut: o,
                Mt: s
            }, c = C[e];
            return H(t ? $ : S, i), H(w, [ zt(n, o), zt(o, s), ot(Rt, n), c && c.kt(i), r(i, T, t) ]), 
            i;
        }, I = ot(k, !0), P = ot(k, !1);
        return I(), P(), [ {
            Pt: () => {
                const t = (() => {
                    const {Rt: t, Vt: e} = n, r = (t, e) => ht(0, 1, t / (t + e) || 0);
                    return {
                        x: r(e.x, t.x),
                        y: r(e.y, t.y)
                    };
                })(), e = t => e => [ e.Lt, {
                    [o]: Ut(t) + ""
                } ];
                D($, e(t.x)), D(S, e(t.y));
            },
            Nt: () => {
                if (!v) {
                    const {Dt: t} = n, e = he(t, de(h)), r = t => e => [ e.Lt, {
                        [s]: Ut(t) + ""
                    } ];
                    D($, r(e.x)), D(S, r(e.y));
                }
            },
            qt: () => {
                const {Dt: t} = n, e = ye(t), r = t => e => [ e.Lt, {
                    [i]: t ? "0" : "1"
                } ];
                D($, r(e.x)), D(S, r(e.y)), v && ($.forEach(C.x.kt), S.forEach(C.y.kt));
            },
            jt: () => {
                if (b && !f) {
                    const {Rt: t, Dt: e} = n, r = ye(e), o = he(e, de(h)), s = e => {
                        const {Lt: n} = e, s = It(n) === p && n, i = (t, e, n) => {
                            const r = e * t;
                            return Bt(n ? r : -r);
                        };
                        return [ s, s && {
                            transform: Xt({
                                x: i(o.x, t.x, r.x),
                                y: i(o.y, t.y, r.y)
                            })
                        } ];
                    };
                    D($, s), D(S, s);
                }
            },
            Bt: T,
            Ft: {
                Xt: $,
                Yt: I,
                Wt: ot(D, $)
            },
            Gt: {
                Xt: S,
                Yt: P,
                Wt: ot(D, S)
            }
        }, () => (zt(M, $[0].Lt), zt(M, S[0].Lt), ot(_, w)) ];
    }, jn = (t, e, n, r) => (o, c, l) => {
        const {vt: a, L: d, V: p, gt: y, Jt: h, St: f} = e, {Lt: v, Ut: b, Mt: x} = o, [g, w] = st(333), [m, S] = st(444), M = t => {
            $(y.scrollBy) && y.scrollBy({
                behavior: "smooth",
                left: t.x,
                top: t.y
            });
        };
        let O = !0;
        return ot(_, [ ie(x, "pointermove pointerleave", r), ie(v, "pointerenter", (() => {
            c(rn, !0);
        })), ie(v, "pointerleave pointercancel", (() => {
            c(rn, !1);
        })), !p && ie(v, "mousedown", (() => {
            const t = Ht();
            (bt(t, Ae) || bt(t, Te) || t === document.body) && u(ot(fe, d), 25);
        })), ie(v, "wheel", (t => {
            const {deltaX: e, deltaY: n, deltaMode: r} = t;
            O && 0 === r && It(v) === a && M({
                x: e,
                y: n
            }), O = !1, c(ln, !0), g((() => {
                O = !0, c(ln);
            })), le(t);
        }), {
            T: !1,
            I: !0
        }), ie(v, "pointerdown", (() => {
            const t = ie(h, "click", (t => {
                e(), ae(t);
            }), {
                A: !0,
                I: !0,
                T: !1
            }), e = ie(h, "pointerup pointercancel", (() => {
                e(), setTimeout(t, 150);
            }), {
                I: !0,
                T: !0
            });
        }), {
            I: !0,
            T: !0
        }), (() => {
            const e = "pointerup pointercancel lostpointercapture", r = `client${l ? "X" : "Y"}`, o = l ? W : Q, c = l ? "left" : "top", a = l ? "w" : "h", u = l ? "x" : "y", d = (t, e) => r => {
                const {Rt: o} = n, s = Gt(b)[a] - Gt(x)[a], i = e * r / s * o[u];
                ue(y, {
                    [u]: t + i
                });
            }, p = [];
            return ie(b, "pointerdown", (n => {
                const l = Pt(n.target, `.${tn}`) === x, v = l ? x : b, g = t.scrollbars, w = g[l ? "dragScroll" : "clickScroll"], {button: $, isPrimary: O, pointerType: C} = n, {pointers: L} = g;
                if (0 === $ && O && w && (L || []).includes(C)) {
                    _(p), S();
                    const t = !l && (n.shiftKey || "instant" === w), g = ot(ne, x), $ = ot(ne, b), O = (t, e) => (t || g())[c] - (e || $())[c], C = s(ne(y)[o]) / Gt(y)[a] || 1, L = d(de(y)[u], 1 / C), D = n[r], T = g(), k = $(), A = T[o], I = O(T, k) + A / 2, P = D - k[c], R = l ? 0 : P - I, z = t => {
                        _(V), v.releasePointerCapture(t.pointerId);
                    }, E = l || t, j = f(), V = [ ie(h, e, z), ie(h, "selectstart", (t => le(t)), {
                        T: !1
                    }), ie(b, e, z), E && ie(b, "pointermove", (t => L(R + (t[r] - D)))), E && (() => {
                        const t = de(y);
                        j();
                        const e = de(y), n = {
                            x: e.x - t.x,
                            y: e.y - t.y
                        };
                        (i(n.x) > 3 || i(n.y) > 3) && (f(), ue(y, t), M(n), m(j));
                    }) ];
                    if (v.setPointerCapture(n.pointerId), t) L(R); else if (!l) {
                        const t = me(gn);
                        if (t) {
                            const e = t(L, R, A, (t => {
                                t ? j() : H(V, j);
                            }));
                            H(V, e), H(p, ot(e, !0));
                        }
                    }
                }
            }));
        })(), w, S ]);
    }, _n = t => {
        const e = Dn(), {K: r, U: o} = e, {elements: s} = r(), {padding: i, viewport: c, content: l} = s, a = L(t), u = a ? {} : t, {elements: d} = u, {padding: p, viewport: y, content: h} = d || {}, f = a ? t : u.target, v = kt(f), b = f.ownerDocument, x = b.documentElement, g = () => b.defaultView || n, w = ot(Rn, [ f ]), m = ot(zn, [ f ]), $ = ot(jt, ""), S = ot(w, $, c), M = ot(m, $, l), O = S(y), C = O === f, D = C && v, T = !C && M(h), k = !C && O === T, A = D ? x : O, P = D ? A : f, R = !C && m($, i, p), z = !k && T, E = [ z, A, R, P ].map((t => L(t) && !It(t) && t)), j = t => t && I(E, t), V = !j(A) && (t => {
            const e = Gt(t), n = te(t), r = qt(t, K), o = qt(t, X);
            return n.w - e.w > 0 && !hn(r) || n.h - e.h > 0 && !hn(o);
        })(A) ? A : f, F = D ? x : A, N = {
            dt: f,
            vt: P,
            L: A,
            rn: R,
            ht: z,
            gt: F,
            Kt: D ? b : A,
            ln: v ? x : V,
            Jt: b,
            bt: v,
            At: a,
            V: C,
            an: g,
            wt: t => Mt(A, Ae, t),
            yt: (t, e) => St(A, Ae, t, e),
            St: () => St(F, Ae, ze, !0)
        }, {dt: U, vt: B, rn: Y, L: q, ht: W} = N, Q = [ () => {
            gt(B, [ Te, Ce ]), gt(U, Ce), v && gt(x, [ Ce, Te ]);
        } ];
        let Z = At([ W, q, Y, B, U ].find((t => t && !j(t))));
        const G = D ? U : W || q, J = ot(_, Q);
        return [ N, () => {
            const t = g(), e = Ht(), n = t => {
                zt(It(t), At(t)), Rt(t);
            }, r = t => ie(t, "focusin focusout focus blur", ae, {
                I: !0,
                T: !1
            }), s = "tabindex", i = vt(q, s), c = r(e);
            return xt(B, Te, C ? "" : ke), xt(Y, _e, ""), xt(q, Ae, ""), xt(W, Ve, ""), C || (xt(q, s, i || "-1"), 
            v && xt(x, De, "")), zt(G, Z), zt(B, Y), zt(Y || B, !C && q), zt(q, W), H(Q, [ c, () => {
                const t = Ht(), e = j(q), o = e && t === q ? U : t, c = r(o);
                gt(Y, _e), gt(W, Ve), gt(q, Ae), v && gt(x, De), i ? xt(q, s, i) : gt(q, s), j(W) && n(W), 
                e && n(q), j(Y) && n(Y), fe(o), c();
            } ]), o && !C && ($t(q, Ae, Ee), H(Q, ot(gt, q, Ae))), fe(!C && v && e === U && t.top === t ? q : e), 
            c(), Z = 0, J;
        }, J ];
    }, Vn = ({ht: t}) => ({Qt: e, un: n, It: r}) => {
        const {$t: o} = e || {}, {Ot: s} = n;
        t && (o || r) && Yt(t, {
            [Q]: s && "100%"
        });
    }, Fn = ({vt: t, rn: n, L: r, V: o}, s) => {
        const [i, c] = e({
            i: rt,
            o: Kt()
        }, ot(Kt, t, "padding", ""));
        return ({zt: t, Qt: e, un: l, It: a}) => {
            let [u, d] = c(a);
            const {U: p} = Dn(), {_t: y, xt: h, Ct: f} = e || {}, {j: v} = l, [b, x] = t("paddingAbsolute");
            (y || d || a || h) && ([u, d] = i(a));
            const g = !o && (x || f || d);
            if (g) {
                const t = !b || !n && !p, e = u.r + u.l, o = u.t + u.b, i = {
                    [Y]: t && !v ? -e : 0,
                    [q]: t ? -o : 0,
                    [B]: t && v ? -e : 0,
                    top: t ? -u.t : 0,
                    right: t ? v ? -u.r : "auto" : 0,
                    left: t ? v ? "auto" : -u.l : 0,
                    [W]: t && `calc(100% + ${e}px)`
                }, c = {
                    [V]: t ? u.t : 0,
                    [F]: t ? u.r : 0,
                    [U]: t ? u.b : 0,
                    [N]: t ? u.l : 0
                };
                Yt(n || r, i), Yt(r, c), ut(s, {
                    rn: u,
                    fn: !t,
                    B: n ? c : ut({}, i, c)
                });
            }
            return {
                _n: g
            };
        };
    }, Nn = (t, o) => {
        const s = Dn(), {vt: i, rn: c, L: l, V: u, Kt: d, gt: p, bt: y, yt: h, an: f} = t, {U: v} = s, b = y && u, x = ot(r, 0), g = {
            display: () => !1,
            direction: t => "ltr" !== t,
            flexDirection: t => t.endsWith("-reverse"),
            writingMode: t => "horizontal-tb" !== t
        }, w = at(g), m = {
            i: et,
            o: {
                w: 0,
                h: 0
            }
        }, $ = {
            i: nt,
            o: {}
        }, S = t => {
            h(Re, !b && t);
        }, M = t => {
            const e = w.some((e => {
                const n = t[e];
                return n && g[e](n);
            }));
            if (!e) return {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 1,
                    y: 1
                }
            };
            S(!0);
            const n = de(p), r = h(je, !0), o = ie(d, J, (t => {
                const e = de(p);
                t.isTrusted && e.x === n.x && e.y === n.y && ce(t);
            }), {
                I: !0,
                A: !0
            });
            ue(p, {
                x: 0,
                y: 0
            }), r();
            const s = de(p), i = te(p);
            ue(p, {
                x: i.w,
                y: i.h
            });
            const c = de(p);
            ue(p, {
                x: c.x - s.x < 1 && -i.w,
                y: c.y - s.y < 1 && -i.h
            });
            const l = de(p);
            return ue(p, n), a((() => o())), {
                D: s,
                M: l
            };
        }, O = (t, e) => {
            const r = n.devicePixelRatio % 1 != 0 ? 1 : 0, o = {
                w: x(t.w - e.w),
                h: x(t.h - e.h)
            };
            return {
                w: o.w > r ? o.w : 0,
                h: o.h > r ? o.h : 0
            };
        }, C = (t, e) => {
            const n = (t, e, n, r) => {
                const o = t === Z ? G : (t => t.replace(`${Z}-`, ""))(t), s = hn(t), i = hn(n);
                return e || r ? s && i ? Z : s ? e && r ? o : e ? Z : G : e ? o : i && r ? Z : G : G;
            };
            return {
                x: n(e.x, t.x, e.y, t.y),
                y: n(e.y, t.y, e.x, t.x)
            };
        }, L = t => {
            const e = t => [ Z, G, J ].map((e => N(fn(e), t))), n = e(!0).concat(e()).join(" ");
            h(n), h(at(t).map((e => N(t[e], "x" === e))).join(" "), !0);
        }, [D, T] = e(m, ot(ee, l)), [k, A] = e(m, ot(te, l)), [I, P] = e(m), [H] = e($), [R, z] = e(m), [E] = e($), [j] = e({
            i: (t, e) => tt(t, e, w),
            o: {}
        }, (() => (t => !!t && (t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length))(t))(l) ? qt(l, w) : {})), [_, V] = e({
            i: (t, e) => nt(t.D, e.D) && nt(t.M, e.M),
            o: {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 0,
                    y: 0
                }
            }
        }), F = me(bn), N = (t, e) => `${e ? Ie : Pe}${(t => {
            const e = String(t || "");
            return e ? e[0].toUpperCase() + e.slice(1) : "";
        })(t)}`;
        return ({zt: e, Qt: n, un: r, It: a}, {_n: u}) => {
            const {_t: d, Ht: p, xt: y, Ct: g, ft: w, Et: m} = n || {}, $ = F && F.R(t, o, r, s, e), {X: N, Y: U, W: B} = $ || {}, [Y, q] = yn(e, s), [K, X] = e("overflow"), W = hn(K.x), Q = hn(K.y), Z = d || u || y || g || m || q;
            let G = T(a), J = A(a), tt = P(a), et = z(a);
            if (q && v && h(Ee, !Y), Z) {
                Mt(i, Te, Le) && S(!0);
                const t = U && U(), [e] = G = D(a), [n] = J = k(a), r = Jt(l), o = b && Zt(f()), s = {
                    w: x(n.w + e.w),
                    h: x(n.h + e.h)
                }, c = {
                    w: x((o ? o.w : r.w + x(r.w - n.w)) + e.w),
                    h: x((o ? o.h : r.h + x(r.h - n.h)) + e.h)
                };
                t && t(), et = R(c), tt = I(O(s, c), a);
            }
            const [nt, rt] = et, [ot, st] = tt, [it, ct] = J, [lt, at] = G, [dt, pt] = H({
                x: ot.w > 0,
                y: ot.h > 0
            }), yt = W && Q && (dt.x || dt.y) || W && dt.x && !dt.y || Q && dt.y && !dt.x, ht = u || g || m || at || ct || rt || st || X || q || Z || p && b, [ft, vt] = j(a), bt = g || w || vt || pt || a, [xt, gt] = bt ? _(M(ft), a) : V();
            let wt = C(dt, K);
            S(!1), ht && (L(wt), wt = vn(l, dt), B && N && (N(wt, it, lt), Yt(l, B(wt))));
            const [mt, $t] = E(wt);
            return St(i, Te, Le, yt), St(c, _e, Le, yt), ut(o, {
                cn: mt,
                Vt: {
                    x: nt.w,
                    y: nt.h
                },
                Rt: {
                    x: ot.w,
                    y: ot.h
                },
                F: dt,
                Dt: pe(xt, ot)
            }), {
                sn: $t,
                tn: rt,
                nn: st,
                en: gt || st,
                dn: bt
            };
        };
    }, Un = t => {
        const [e, n, r] = _n(t), o = {
            rn: {
                t: 0,
                r: 0,
                b: 0,
                l: 0
            },
            fn: !1,
            B: {
                [Y]: 0,
                [q]: 0,
                [B]: 0,
                [V]: 0,
                [F]: 0,
                [U]: 0,
                [N]: 0
            },
            Vt: {
                x: 0,
                y: 0
            },
            Rt: {
                x: 0,
                y: 0
            },
            cn: {
                x: G,
                y: G
            },
            F: {
                x: !1,
                y: !1
            },
            Dt: {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 0,
                    y: 0
                }
            }
        }, {dt: s, gt: i, V: c, St: l} = e, {U: a, k: u} = Dn(), d = !a && (u.x || u.y), p = [ Vn(e), Fn(e, o), Nn(e, o) ];
        return [ n, t => {
            const e = {}, n = d && de(i), r = n && l();
            return A(p, (n => {
                ut(e, n(t, e) || {});
            })), ue(i, n), r && r(), c || ue(s, 0), e;
        }, o, e, r ];
    }, Bn = new WeakMap, Yn = t => Bn.get(t), qn = (t, e, n) => {
        const {tt: r} = Dn(), o = L(t), s = o ? t : t.target, i = Yn(s);
        if (e && !i) {
            let i = !1;
            const c = [], l = {}, a = t => {
                const e = dt(t), n = me($e);
                return n ? n(e, !0) : e;
            }, u = ut({}, r(), a(e)), [d, p, y] = be(), [h, f, v] = be(n), g = (t, e) => {
                v(t, e), y(t, e);
            }, [w, m, $, S, M] = ((t, e, n, r) => {
                let o = !1;
                const s = On(e, {}), [i, c, l, a, u] = Un(t), [d, p, y] = Pn(a, l, s, (t => {
                    x({}, t);
                })), [h, f, , v] = ((t, e, n, r, o, s) => {
                    let i, c, l, a, u, d = yt, p = 0;
                    const y = [ "mouse", "pen" ], h = t => y.includes(t.pointerType), [f, v] = st(), [b, x] = st(100), [g, w] = st(100), [m, $] = st((() => p)), [S, M] = En(t, o, r, jn(e, o, r, (t => h(t) && R()))), {vt: O, Kt: C, bt: L} = o, {Bt: D, Pt: T, Nt: k, qt: A, jt: I} = S, P = (t, e) => {
                        if ($(), t) D(cn); else {
                            const t = ot(D, cn, !0);
                            p > 0 && !e ? m(t) : t();
                        }
                    }, R = () => {
                        (l ? i : a) || (P(!0), b((() => {
                            P(!1);
                        })));
                    }, z = t => {
                        D(sn, t, !0), D(sn, t, !1);
                    }, E = t => {
                        h(t) && (i = l, l && P(!0));
                    }, j = [ $, x, w, v, () => d(), ie(O, "pointerover", E, {
                        A: !0
                    }), ie(O, "pointerenter", E), ie(O, "pointerleave", (t => {
                        h(t) && (i = !1, l && P(!1));
                    })), ie(O, "pointermove", (t => {
                        h(t) && c && R();
                    })), ie(C, "scroll", (t => {
                        f((() => {
                            k(), R();
                        })), s(t), I();
                    })) ];
                    return [ () => ot(_, H(j, M())), ({zt: t, It: e, Qt: o, Zt: s}) => {
                        const {tn: i, nn: y, sn: h, en: f} = s || {}, {Ct: v, ft: b} = o || {}, {j: x} = n, {k: w} = Dn(), {cn: m, F: $} = r, [S, M] = t("showNativeOverlaidScrollbars"), [O, H] = t("scrollbars.theme"), [R, E] = t("scrollbars.visibility"), [j, _] = t("scrollbars.autoHide"), [V, F] = t("scrollbars.autoHideSuspend"), [N] = t("scrollbars.autoHideDelay"), [U, B] = t("scrollbars.dragScroll"), [Y, q] = t("scrollbars.clickScroll"), [K, X] = t("overflow"), W = b && !e, Q = $.x || $.y, G = i || y || f || v || e, tt = h || E || X, et = S && w.x && w.y, nt = (t, e, n) => {
                            const r = t.includes(J) && (R === Z || "auto" === R && e === J);
                            return D(en, r, n), r;
                        };
                        if (p = N, W && (V && Q ? (z(!1), d(), g((() => {
                            d = ie(C, "scroll", ot(z, !0), {
                                A: !0
                            });
                        }))) : z(!0)), M && D(Xe, et), H && (D(u), D(O, !0), u = O), F && !V && z(!0), _ && (c = "move" === j, 
                        l = "leave" === j, a = "never" === j, P(a, !0)), B && D(un, U), q && D(an, !!Y), 
                        tt) {
                            const t = nt(K.x, m.x, !0), e = nt(K.y, m.y, !1);
                            D(nn, !(t && e));
                        }
                        G && (k(), T(), I(), f && A(), D(on, !$.x, !0), D(on, !$.y, !1), D(Qe, x && !L));
                    }, {}, S ];
                })(t, e, y, l, a, (t => g("scroll", [ C, t ]))), b = t => at(t).some((e => !!t[e])), x = (t, s) => {
                    if (n()) return !1;
                    const {pn: i, It: l, Tt: a, vn: u} = t, d = i || {}, h = !!l || !o, v = {
                        zt: On(e, d, h),
                        pn: d,
                        It: h
                    };
                    if (u) return f(v), !1;
                    const x = s || p(ut({}, v, {
                        Tt: a
                    })), g = c(ut({}, v, {
                        un: y,
                        Qt: x
                    }));
                    f(ut({}, v, {
                        Qt: x,
                        Zt: g
                    }));
                    const w = b(x), m = b(g), $ = w || m || !pt(d) || h;
                    return o = !0, $ && r(t, {
                        Qt: x,
                        Zt: g
                    }), $;
                };
                return [ () => {
                    const {ln: t, gt: e, St: n} = a, r = de(t), o = [ d(), i(), h() ], s = n();
                    return ue(e, r), s(), ot(_, o);
                }, x, () => ({
                    gn: y,
                    hn: l
                }), {
                    bn: a,
                    wn: v
                }, u ];
            })(t, u, (() => i), (({pn: t, It: e}, {Qt: n, Zt: r}) => {
                const {_t: o, Ct: s, $t: i, xt: c, Ht: l, ft: a} = n, {tn: u, nn: d, sn: p, en: y} = r;
                g("updated", [ C, {
                    updateHints: {
                        sizeChanged: !!o,
                        directionChanged: !!s,
                        heightIntrinsicChanged: !!i,
                        overflowEdgeChanged: !!u,
                        overflowAmountChanged: !!d,
                        overflowStyleChanged: !!p,
                        scrollCoordinatesChanged: !!y,
                        contentMutation: !!c,
                        hostMutation: !!l,
                        appear: !!a
                    },
                    changedOptions: t || {},
                    force: !!e
                } ]);
            })), O = t => {
                (t => {
                    Bn.delete(t);
                })(s), _(c), i = !0, g("destroyed", [ C, t ]), p(), f();
            }, C = {
                options(t, e) {
                    if (t) {
                        const n = e ? r() : {}, o = Mn(u, ut(n, a(t)));
                        pt(o) || (ut(u, o), m({
                            pn: o
                        }));
                    }
                    return ut({}, u);
                },
                on: h,
                off: (t, e) => {
                    t && e && f(t, e);
                },
                state() {
                    const {gn: t, hn: e} = $(), {j: n} = t, {Vt: r, Rt: o, cn: s, F: c, rn: l, fn: a, Dt: u} = e;
                    return ut({}, {
                        overflowEdge: r,
                        overflowAmount: o,
                        overflowStyle: s,
                        hasOverflow: c,
                        scrollCoordinates: {
                            start: u.D,
                            end: u.M
                        },
                        padding: l,
                        paddingAbsolute: a,
                        directionRTL: n,
                        destroyed: i
                    });
                },
                elements() {
                    const {dt: t, vt: e, rn: n, L: r, ht: o, gt: s, Kt: i} = S.bn, {Ft: c, Gt: l} = S.wn, a = t => {
                        const {Mt: e, Ut: n, Lt: r} = t;
                        return {
                            scrollbar: r,
                            track: n,
                            handle: e
                        };
                    }, u = t => {
                        const {Xt: e, Yt: n} = t, r = a(e[0]);
                        return ut({}, r, {
                            clone: () => {
                                const t = a(n());
                                return m({
                                    vn: !0
                                }), t;
                            }
                        });
                    };
                    return ut({}, {
                        target: t,
                        host: e,
                        padding: n || r,
                        viewport: r,
                        content: o || r,
                        scrollOffsetElement: s,
                        scrollEventElement: i,
                        scrollbarHorizontal: u(c),
                        scrollbarVertical: u(l)
                    });
                },
                update: t => m({
                    It: t,
                    Tt: !0
                }),
                destroy: ot(O, !1),
                plugin: t => l[at(t)[0]]
            };
            return H(c, [ M ]), ((t, e) => {
                Bn.set(t, e);
            })(s, C), we(xe, qn, [ C, d, l ]), ((t, e) => {
                const {nativeScrollbarsOverlaid: n, body: r} = e || {}, {k: o, U: s, K: i} = Dn(), {nativeScrollbarsOverlaid: c, body: l} = i().cancel, a = null != n ? n : c, u = b(r) ? l : r, d = (o.x || o.y) && a, p = t && (x(u) ? !s : u);
                return !!d || !!p;
            })(S.bn.bt, !o && t.cancel) ? (O(!0), C) : (H(c, w()), g("initialized", [ C ]), 
            C.update(), C);
        }
        return i;
    };
    return qn.plugin = t => {
        const e = S(t), n = e ? t : [ t ], r = n.map((t => we(t, qn)[0]));
        return (t => {
            A(t, (t => A(t, ((e, n) => {
                xe[n] = t[n];
            }))));
        })(n), e ? r : r[0];
    }, qn.valid = t => {
        const e = t && t.elements, n = $(e) && e();
        return C(n) && !!Yn(n.target);
    }, qn.env = () => {
        const {P: t, k: e, U: n, G: r, ot: o, st: s, K: i, Z: c, tt: l, nt: a} = Dn();
        return ut({}, {
            scrollbarsSize: t,
            scrollbarsOverlaid: e,
            scrollbarsHiding: n,
            scrollTimeline: r,
            staticDefaultInitialization: o,
            staticDefaultOptions: s,
            getDefaultInitialization: i,
            setDefaultInitialization: c,
            getDefaultOptions: l,
            setDefaultOptions: a
        });
    }, qn.nonce = t => {
        Cn = t;
    }, qn.trustedTypePolicy = t => {
        Et = t;
    }, t.ClickScrollPlugin = wn, t.OverlayScrollbars = qn, t.ScrollbarsHidingPlugin = xn, 
    t.SizeObserverPlugin = pn, Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
    }), t;
}({});

"use strict";

let filesServiceIsInstantiated;

class FilesService {
    path="";
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error("FilesService is already instantiated.");
        }
        filesServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
    }
    getJSONFile(file) {
        return fetch(`${this.path}assets/json/${file}.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        }));
    }
}

"use strict";

let i18nServiceIsInstantiated;

class I18nService {
    locale="en";
    path="";
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error("I18nService is already instantiated.");
        }
        i18nServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
        if ([ "en", "fr", "pl", "es" ].some((language => navigator.language.startsWith(language)))) {
            this.locale = navigator.language.slice(0, 2);
        }
        this.getJSON().then((result => {
            localStorage.setItem(`${PREFIX}i18n`, JSON.stringify(result));
        }));
    }
    getJSON() {
        return fetch(`${this.path}_locales/${this.locale}/messages.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving 'messages.json' file : ${error}.`);
            return error;
        }));
    }
    getMessages() {
        return localStorage.getItem(`${PREFIX}i18n`);
    }
    getMessage(message, substitutions = []) {
        if (!message || message.includes("undefined")) {
            console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
            return;
        }
        const translations = JSON.parse(this.getMessages());
        let content = translations[message]?.message || "";
        if (substitutions.length > 0) {
            if (substitutions.some((str => str?.includes("undefined")))) {
                console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
                return;
            }
            const placeholders = translations[message]?.placeholders;
            const matches = [ ...content.matchAll(/(\$.*?\$)/g) ];
            for (const match of matches) {
                const key = match[0].replaceAll("$", "").toLowerCase();
                const index = Number(placeholders[key]?.content.replace("$", ""));
                content = content.replaceAll(match[0], substitutions[index - 1]);
            }
        }
        return content.trim();
    }
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

let iconsServiceIsInstantiated;

class IconsService {
    constructor() {
        if (iconsServiceIsInstantiated) {
            throw new Error("IconsService is already instantiated.");
        }
        iconsServiceIsInstantiated = true;
    }
    get path() {
        return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
    }
    loadSprite(root) {
        return;
    }
}

"use strict";

let localStorageServiceIsInstantiated;

class LocalStorageService {
    constructor() {
        if (localStorageServiceIsInstantiated) {
            throw new Error("LocalStorageService is already instantiated.");
        }
        localStorageServiceIsInstantiated = true;
    }
    setItem(key, value) {
        localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return new Promise(((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem(`${PREFIX}${key}`)));
            reject(new Error("KO"));
        }));
    }
    removeItem(key) {
        localStorage.removeItem(`${PREFIX}${key}`);
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
        this.path = `${window.location.origin}/`;
    }
}

/*!
 * OverlayScrollbars
 * Version: 2.11.5
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(t) {
    "use strict";
    const e = (t, e) => {
        const {o: n, i: r, u: o} = t;
        let s, i = n;
        const c = (t, e) => {
            const n = i, c = t, l = e || (r ? !r(n, c) : n !== c);
            return (l || o) && (i = c, s = n), [ i, l, s ];
        };
        return [ e ? t => c(e(i, s), t) : c, t => [ i, !!t, s ] ];
    }, n = "undefined" != typeof window && "undefined" != typeof HTMLElement && window.document ? window : {}, r = Math.max, o = Math.min, s = Math.round, i = Math.abs, c = Math.sign, l = n.cancelAnimationFrame, a = n.requestAnimationFrame, u = n.setTimeout, d = n.clearTimeout, p = t => void 0 !== n[t] ? n[t] : void 0, y = p("MutationObserver"), h = p("IntersectionObserver"), f = p("ResizeObserver"), v = p("ScrollTimeline"), b = t => void 0 === t, x = t => null === t, g = t => "number" == typeof t, w = t => "string" == typeof t, m = t => "boolean" == typeof t, $ = t => "function" == typeof t, S = t => Array.isArray(t), M = t => "object" == typeof t && !S(t) && !x(t), O = t => {
        const e = !!t && t.length, n = g(e) && e > -1 && e % 1 == 0;
        return !(!(S(t) || !$(t) && n) || e > 0 && M(t) && !(e - 1 in t));
    }, C = t => !!t && t.constructor === Object, L = t => t instanceof HTMLElement, D = t => t instanceof Element, T = () => performance.now(), k = (t, e, n, o, s) => {
        let i = 0;
        const c = T(), u = r(0, n), d = n => {
            const l = T(), p = l - c >= u, y = n ? 1 : 1 - (r(0, c + u - l) / u || 0), h = (e - t) * ($(s) ? s(y, y * u, 0, 1, u) : y) + t, f = p || 1 === y;
            o && o(h, y, f), i = f ? 0 : a((() => d()));
        };
        return d(), t => {
            l(i), t && d(t);
        };
    };
    function A(t, e) {
        if (O(t)) for (let n = 0; n < t.length && !1 !== e(t[n], n, t); n++) ; else t && A(Object.keys(t), (n => e(t[n], n, t)));
        return t;
    }
    const I = (t, e) => t.indexOf(e) >= 0, P = (t, e) => t.concat(e), H = (t, e, n) => (!w(e) && O(e) ? Array.prototype.push.apply(t, e) : t.push(e), 
    t), R = t => Array.from(t || []), z = t => S(t) ? t : !w(t) && O(t) ? R(t) : [ t ], E = t => !!t && !t.length, j = t => R(new Set(t)), _ = (t, e, n) => {
        A(t, (t => !t || t.apply(void 0, e || []))), n || (t.length = 0);
    }, V = "paddingTop", F = "paddingRight", N = "paddingLeft", U = "paddingBottom", B = "marginLeft", Y = "marginRight", q = "marginBottom", K = "overflowX", X = "overflowY", W = "width", Q = "height", Z = "visible", G = "hidden", J = "scroll", tt = (t, e, n, r) => {
        if (t && e) {
            let r = !0;
            return A(n, (n => {
                t[n] !== e[n] && (r = !1);
            })), r;
        }
        return !1;
    }, et = (t, e) => tt(t, e, [ "w", "h" ]), nt = (t, e) => tt(t, e, [ "x", "y" ]), rt = (t, e) => tt(t, e, [ "t", "r", "b", "l" ]), ot = (t, ...e) => t.bind(0, ...e), st = t => {
        let e;
        const n = t ? u : a, r = t ? d : l;
        return [ o => {
            r(e), e = n((() => o()), $(t) ? t() : t);
        }, () => r(e) ];
    }, it = t => {
        const e = $(t) ? t() : t;
        if (g(e)) {
            const t = e ? u : a, n = e ? d : l;
            return r => {
                const o = t((() => r()), e);
                return () => {
                    n(o);
                };
            };
        }
        return e && e._;
    }, ct = (t, e) => {
        const {p: n, v: r, S: o, m: s} = e || {};
        let i, c, l, a, u;
        const d = function(e) {
            c && c(), i && i(), u = c = i = l = void 0, t.apply(this, e);
        }, p = t => s && l ? s(l, t) : t, y = () => {
            c && d(p(a) || a);
        }, h = function() {
            const t = R(arguments), e = it(n);
            if (e) {
                const n = it(r), s = p(t) || t, h = d.bind(0, s);
                c && c(), o && !u ? (h(), u = !0, c = e((() => u = void 0))) : (c = e(h), n && !i && (i = n(y))), 
                l = a = s;
            } else d(t);
        };
        return h.O = y, h;
    }, lt = (t, e) => Object.prototype.hasOwnProperty.call(t, e), at = t => t ? Object.keys(t) : [], ut = (t, e, n, r, o, s, i) => {
        const c = [ e, n, r, o, s, i ];
        return "object" == typeof t && !x(t) || $(t) || (t = {}), A(c, (e => {
            A(e, ((n, r) => {
                const o = e[r];
                if (t === o) return !0;
                const s = S(o);
                if (o && C(o)) {
                    const e = t[r];
                    let n = e;
                    s && !S(e) ? n = [] : s || C(e) || (n = {}), t[r] = ut(n, o);
                } else t[r] = s ? o.slice() : o;
            }));
        })), t;
    }, dt = (t, e) => A(ut({}, t), ((t, e, n) => {
        void 0 === t ? delete n[e] : t && C(t) && (n[e] = dt(t));
    })), pt = t => !at(t).length, yt = () => {}, ht = (t, e, n) => r(t, o(e, n)), ft = t => j((S(t) ? t : (t || "").split(" ")).filter((t => t))), vt = (t, e) => t && t.getAttribute(e), bt = (t, e) => t && t.hasAttribute(e), xt = (t, e, n) => {
        A(ft(e), (e => {
            t && t.setAttribute(e, String(n || ""));
        }));
    }, gt = (t, e) => {
        A(ft(e), (e => t && t.removeAttribute(e)));
    }, wt = (t, e) => {
        const n = ft(vt(t, e)), r = ot(xt, t, e), o = (t, e) => {
            const r = new Set(n);
            return A(ft(t), (t => {
                r[e](t);
            })), R(r).join(" ");
        };
        return {
            C: t => r(o(t, "delete")),
            $: t => r(o(t, "add")),
            H: t => {
                const e = ft(t);
                return e.reduce(((t, e) => t && n.includes(e)), e.length > 0);
            }
        };
    }, mt = (t, e, n) => (wt(t, e).C(n), ot($t, t, e, n)), $t = (t, e, n) => (wt(t, e).$(n), 
    ot(mt, t, e, n)), St = (t, e, n, r) => (r ? $t : mt)(t, e, n), Mt = (t, e, n) => wt(t, e).H(n), Ot = t => wt(t, "class"), Ct = (t, e) => {
        Ot(t).C(e);
    }, Lt = (t, e) => (Ot(t).$(e), ot(Ct, t, e)), Dt = (t, e) => {
        const n = e ? D(e) && e : document;
        return n ? R(n.querySelectorAll(t)) : [];
    }, Tt = (t, e) => D(t) && t.matches(e), kt = t => Tt(t, "body"), At = t => t ? R(t.childNodes) : [], It = t => t && t.parentElement, Pt = (t, e) => D(t) && t.closest(e), Ht = t => document.activeElement, Rt = t => {
        A(z(t), (t => {
            const e = It(t);
            t && e && e.removeChild(t);
        }));
    }, zt = (t, e) => ot(Rt, t && e && A(z(e), (e => {
        e && t.appendChild(e);
    })));
    let Et;
    const jt = t => {
        const e = document.createElement("div");
        return xt(e, "class", t), e;
    }, _t = t => {
        const e = jt(), n = Et, r = t.trim();
        return e.innerHTML = n ? n.createHTML(r) : r, A(At(e), (t => Rt(t)));
    }, Vt = (t, e) => t.getPropertyValue(e) || t[e] || "", Ft = t => {
        const e = t || 0;
        return isFinite(e) ? e : 0;
    }, Nt = t => Ft(parseFloat(t || "")), Ut = t => Math.round(1e4 * t) / 1e4, Bt = t => `${Ut(Ft(t))}px`;
    function Yt(t, e) {
        t && e && A(e, ((e, n) => {
            try {
                const r = t.style, o = x(e) || m(e) ? "" : g(e) ? Bt(e) : e;
                0 === n.indexOf("--") ? r.setProperty(n, o) : r[n] = o;
            } catch (r) {}
        }));
    }
    function qt(t, e, r) {
        const o = w(e);
        let s = o ? "" : {};
        if (t) {
            const i = n.getComputedStyle(t, r) || t.style;
            s = o ? Vt(i, e) : R(e).reduce(((t, e) => (t[e] = Vt(i, e), t)), s);
        }
        return s;
    }
    const Kt = (t, e, n) => {
        const r = e ? `${e}-` : "", o = n ? `-${n}` : "", s = `${r}top${o}`, i = `${r}right${o}`, c = `${r}bottom${o}`, l = `${r}left${o}`, a = qt(t, [ s, i, c, l ]);
        return {
            t: Nt(a[s]),
            r: Nt(a[i]),
            b: Nt(a[c]),
            l: Nt(a[l])
        };
    }, Xt = (t, e) => `translate${M(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Wt = {
        w: 0,
        h: 0
    }, Qt = (t, e) => e ? {
        w: e[`${t}Width`],
        h: e[`${t}Height`]
    } : Wt, Zt = t => Qt("inner", t || n), Gt = ot(Qt, "offset"), Jt = ot(Qt, "client"), te = ot(Qt, "scroll"), ee = t => {
        const e = parseFloat(qt(t, W)) || 0, n = parseFloat(qt(t, Q)) || 0;
        return {
            w: e - s(e),
            h: n - s(n)
        };
    }, ne = t => t.getBoundingClientRect(), re = t => !(!t || !t[Q] && !t[W]), oe = (t, e) => {
        const n = re(t);
        return !re(e) && n;
    }, se = (t, e, n, r) => {
        A(ft(e), (e => {
            t && t.removeEventListener(e, n, r);
        }));
    }, ie = (t, e, n, r) => {
        var o;
        const s = null == (o = r && r.T) || o, i = r && r.I || !1, c = r && r.A || !1, l = {
            passive: s,
            capture: i
        };
        return ot(_, ft(e).map((e => {
            const r = c ? o => {
                se(t, e, r, i), n && n(o);
            } : n;
            return t && t.addEventListener(e, r, l), ot(se, t, e, r, i);
        })));
    }, ce = t => t.stopPropagation(), le = t => t.preventDefault(), ae = t => ce(t) || le(t), ue = (t, e) => {
        const {x: n, y: r} = g(e) ? {
            x: e,
            y: e
        } : e || {};
        g(n) && (t.scrollLeft = n), g(r) && (t.scrollTop = r);
    }, de = t => ({
        x: t.scrollLeft,
        y: t.scrollTop
    }), pe = (t, e) => {
        const {D: n, M: r} = t, {w: o, h: s} = e, l = (t, e, n) => {
            let r = c(t) * n, o = c(e) * n;
            if (r === o) {
                const n = i(t), s = i(e);
                o = n > s ? 0 : o, r = n < s ? 0 : r;
            }
            return r = r === o ? 0 : r, [ r + 0, o + 0 ];
        }, [a, u] = l(n.x, r.x, o), [d, p] = l(n.y, r.y, s);
        return {
            D: {
                x: a,
                y: d
            },
            M: {
                x: u,
                y: p
            }
        };
    }, ye = ({D: t, M: e}) => {
        const n = (t, e) => 0 === t && t <= e;
        return {
            x: n(t.x, e.x),
            y: n(t.y, e.y)
        };
    }, he = ({D: t, M: e}, n) => {
        const r = (t, e, n) => ht(0, 1, (t - n) / (t - e) || 0);
        return {
            x: r(t.x, e.x, n.x),
            y: r(t.y, e.y, n.y)
        };
    }, fe = t => {
        t && t.focus && t.focus({
            preventScroll: !0
        });
    }, ve = (t, e) => {
        A(z(e), t);
    }, be = t => {
        const e = new Map, n = (t, n) => {
            if (t) {
                const r = e.get(t);
                ve((t => {
                    r && r[t ? "delete" : "clear"](t);
                }), n);
            } else e.forEach((t => {
                t.clear();
            })), e.clear();
        }, r = (t, o) => {
            if (w(t)) {
                const r = e.get(t) || new Set;
                return e.set(t, r), ve((t => {
                    $(t) && r.add(t);
                }), o), ot(n, t, o);
            }
            m(o) && o && n();
            const s = at(t), i = [];
            return A(s, (e => {
                const n = t[e];
                n && H(i, r(e, n));
            })), ot(_, i);
        };
        return r(t || {}), [ r, n, (t, n) => {
            A(R(e.get(t)), (t => {
                n && !E(n) ? t.apply(0, n) : t();
            }));
        } ];
    }, xe = {}, ge = {}, we = (t, e, n) => at(t).map((r => {
        const {static: o, instance: s} = t[r], [i, c, l] = n || [], a = n ? s : o;
        if (a) {
            const t = n ? a(i, c, e) : a(e);
            return (l || ge)[r] = t;
        }
    })), me = t => ge[t], $e = "__osOptionsValidationPlugin", Se = `data-overlayscrollbars`, Me = "os-environment", Oe = `${Me}-scrollbar-hidden`, Ce = `${Se}-initialize`, Le = "noClipping", De = `${Se}-body`, Te = Se, ke = "host", Ae = `${Se}-viewport`, Ie = K, Pe = X, He = "arrange", Re = "measuring", ze = "scrolling", Ee = "scrollbarHidden", je = "noContent", _e = `${Se}-padding`, Ve = `${Se}-content`, Fe = "os-size-observer", Ne = `${Fe}-appear`, Ue = `${Fe}-listener`, Be = `${Ue}-scroll`, Ye = `${Ue}-item`, qe = `${Ye}-final`, Ke = "os-trinsic-observer", Xe = "os-theme-none", We = "os-scrollbar", Qe = `${We}-rtl`, Ze = `${We}-horizontal`, Ge = `${We}-vertical`, Je = `${We}-track`, tn = `${We}-handle`, en = `${We}-visible`, nn = `${We}-cornerless`, rn = `${We}-interaction`, on = `${We}-unusable`, sn = `${We}-auto-hide`, cn = `${sn}-hidden`, ln = `${We}-wheel`, an = `${Je}-interactive`, un = `${tn}-interactive`, dn = "__osSizeObserverPlugin", pn = (() => ({
        [dn]: {
            static: () => (t, e, n) => {
                const r = 3333333, o = "scroll", s = _t(`<div class="${Ye}" dir="ltr"><div class="${Ye}"><div class="${qe}"></div></div><div class="${Ye}"><div class="${qe}" style="width: 200%; height: 200%"></div></div></div>`), i = s[0], c = i.lastChild, u = i.firstChild, d = null == u ? void 0 : u.firstChild;
                let p, y = Gt(i), h = y, f = !1;
                const v = () => {
                    ue(u, r), ue(c, r);
                }, b = t => {
                    p = 0, f && (y = h, e(!0 === t));
                }, x = t => {
                    h = Gt(i), f = !t || !et(h, y), t ? (ce(t), f && !p && (l(p), p = a(b))) : b(!1 === t), 
                    v();
                }, g = [ zt(t, s), ie(u, o, x), ie(c, o, x) ];
                return Lt(t, Be), Yt(d, {
                    [W]: r,
                    [Q]: r
                }), a(v), [ n ? ot(x, !1) : v, g ];
            }
        }
    }))(), yn = (t, e) => {
        const {k: n} = e, [r, o] = t("showNativeOverlaidScrollbars");
        return [ r && n.x && n.y, o ];
    }, hn = t => 0 === t.indexOf(Z), fn = (t, e) => {
        if ("auto" === t) return e ? J : G;
        const n = t || G;
        return [ G, J, Z ].includes(n) ? n : G;
    }, vn = (t, e) => {
        const {overflowX: n, overflowY: r} = qt(t, [ K, X ]);
        return {
            x: fn(n, e.x),
            y: fn(r, e.y)
        };
    }, bn = "__osScrollbarsHidingPlugin", xn = (() => ({
        [bn]: {
            static: () => ({
                R: (t, e, n, r, o) => {
                    const {V: s, L: i} = t, {U: c, k: l, P: a} = r, u = !s && !c && (l.x || l.y), [d] = yn(o, r), p = t => {
                        const e = c || d ? 0 : 42, n = (t, n, r) => [ n && !c ? t ? e : r : 0, t && !!e ], [r, o] = n(l.x, t.x === J, a.x), [s, i] = n(l.y, t.y === J, a.y);
                        return {
                            N: {
                                x: r,
                                y: s
                            },
                            q: {
                                x: o,
                                y: i
                            }
                        };
                    }, y = t => {
                        if (!s) {
                            const {j: r} = n, o = ut({}, {
                                [Y]: 0,
                                [q]: 0,
                                [B]: 0
                            }), {N: s, q: i} = p(t), {x: c, y: l} = i, {x: a, y: d} = s, {B: y} = e, h = r ? B : Y, f = r ? N : F, v = y[h], b = y[q], x = y[f], g = y[U];
                            return o[W] = `calc(100% + ${d + -1 * v}px)`, o[h] = -d + v, o[q] = -a + b, u && (o[f] = x + (l ? d : 0), 
                            o[U] = g + (c ? a : 0)), o;
                        }
                    };
                    return {
                        X: (t, r, o) => {
                            if (u) {
                                const {B: s} = e, {N: c, q: l} = p(t), {x: a, y: u} = l, {x: d, y: y} = c, {j: h} = n, f = s[h ? F : N], v = s.paddingTop, b = r.w + o.w, x = r.h + o.h, g = {
                                    w: y && u ? `${y + b - f}px` : "",
                                    h: d && a ? `${d + x - v}px` : ""
                                };
                                Yt(i, {
                                    "--os-vaw": g.w,
                                    "--os-vah": g.h
                                });
                            }
                            return u;
                        },
                        Y: () => {
                            if (u) {
                                const {F: t, B: n} = e, r = vn(i, t), {q: o} = p(r), {x: s, y: c} = o, l = {}, a = t => A(t, (t => {
                                    l[t] = n[t];
                                }));
                                s && a([ q, V, U ]), c && a([ B, Y, N, F ]);
                                const u = qt(i, at(l)), d = mt(i, Ae, He);
                                return Yt(i, l), () => {
                                    Yt(i, ut({}, u, y(r))), d();
                                };
                            }
                            return yt;
                        },
                        W: y
                    };
                }
            })
        }
    }))(), gn = "__osClickScrollPlugin", wn = (() => ({
        [gn]: {
            static: () => (t, e, n, r) => {
                let o = !1, s = yt;
                const i = 133, c = 222, [l, a] = st(i), u = Math.sign(e), d = n * u, p = d / 2, y = t => 1 - (1 - t) * (1 - t), h = (e, n) => k(e, n, c, t, y), f = (n, r) => k(n, e - d, i * r, ((n, r, o) => {
                    t(n), o && (s = h(n, e));
                })), v = k(0, d, c, ((i, c, a) => {
                    if (t(i), a && (r(o), !o)) {
                        const t = e - i;
                        Math.sign(t - p) === u && l((() => {
                            const r = t - d, o = Math.sign(r) === u;
                            s = o ? f(i, Math.abs(r) / n) : h(i, e);
                        }));
                    }
                }), y);
                return t => {
                    o = !0, t && v(), a(), s();
                };
            }
        }
    }))(), mn = t => JSON.stringify(t, ((t, e) => {
        if ($(e)) throw 0;
        return e;
    })), $n = (t, e) => t ? `${e}`.split(".").reduce(((t, e) => t && lt(t, e) ? t[e] : void 0), t) : void 0, Sn = {
        paddingAbsolute: !1,
        showNativeOverlaidScrollbars: !1,
        update: {
            elementEvents: [ [ "img", "load" ] ],
            debounce: [ 0, 33 ],
            attributes: null,
            ignoreMutation: null
        },
        overflow: {
            x: "scroll",
            y: "scroll"
        },
        scrollbars: {
            theme: "os-theme-dark",
            visibility: "auto",
            autoHide: "never",
            autoHideDelay: 1300,
            autoHideSuspend: !1,
            dragScroll: !0,
            clickScroll: !1,
            pointers: [ "mouse", "touch", "pen" ]
        }
    }, Mn = (t, e) => {
        const n = {};
        return A(P(at(e), at(t)), (r => {
            const o = t[r], s = e[r];
            if (M(o) && M(s)) ut(n[r] = {}, Mn(o, s)), pt(n[r]) && delete n[r]; else if (lt(e, r) && s !== o) {
                let t = !0;
                if (S(o) || S(s)) try {
                    mn(o) === mn(s) && (t = !1);
                } catch (i) {}
                t && (n[r] = s);
            }
        })), n;
    }, On = (t, e, n) => r => [ $n(t, r), n || void 0 !== $n(e, r) ];
    let Cn, Ln;
    const Dn = () => (Ln || (Ln = (() => {
        const t = (t, e, n) => {
            zt(document.body, t), zt(document.body, t);
            const r = Jt(t), o = Gt(t), s = ee(e);
            return n && Rt(t), {
                x: o.h - r.h + s.h,
                y: o.w - r.w + s.w
            };
        }, r = _t(`<div class="${Me}"><div></div><style>${`.${Me}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Me} div{width:200%;height:200%;margin:10px 0}.${Oe}{scrollbar-width:none!important}.${Oe}::-webkit-scrollbar,.${Oe}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`}</style></div>`)[0], o = r.firstChild, s = r.lastChild, i = Cn;
        i && (s.nonce = i);
        const [c, , l] = be(), [a, u] = e({
            o: t(r, o),
            i: nt
        }, ot(t, r, o, !0)), [d] = u(), p = (t => {
            let e = !1;
            const n = Lt(t, Oe);
            try {
                e = "none" === qt(t, "scrollbar-width") || "none" === qt(t, "display", "::-webkit-scrollbar");
            } catch (r) {}
            return n(), e;
        })(r), y = {
            x: 0 === d.x,
            y: 0 === d.y
        }, h = {
            elements: {
                host: null,
                padding: !p,
                viewport: t => p && kt(t) && t,
                content: !1
            },
            scrollbars: {
                slot: !0
            },
            cancel: {
                nativeScrollbarsOverlaid: !1,
                body: null
            }
        }, f = ut({}, Sn), b = ot(ut, {}, f), x = ot(ut, {}, h), g = {
            P: d,
            k: y,
            U: p,
            G: !!v,
            J: ot(c, "r"),
            K: x,
            Z: t => ut(h, t) && x(),
            tt: b,
            nt: t => ut(f, t) && b(),
            ot: ut({}, h),
            st: ut({}, f)
        };
        if (gt(r, "style"), Rt(r), ie(n, "resize", (() => {
            l("r", []);
        })), $(n.matchMedia) && !p && (!y.x || !y.y)) {
            const t = e => {
                const r = n.matchMedia(`(resolution: ${n.devicePixelRatio}dppx)`);
                ie(r, "change", (() => {
                    e(), t(e);
                }), {
                    A: !0
                });
            };
            t((() => {
                const [t, e] = a();
                ut(g.P, t), l("r", [ e ]);
            }));
        }
        return g;
    })()), Ln), Tn = (t, e, n, r) => {
        let o = !1;
        const {et: s, ct: i, rt: c, it: l, lt: a, ut: u} = r || {}, d = ct((() => o && n(!0)), {
            p: 33,
            v: 99
        }), [p, h] = ((t, e, n) => {
            let r = !1;
            const o = !!n && new WeakMap, s = s => {
                if (o && n) {
                    const i = n.map((e => {
                        const [n, r] = e || [];
                        return [ r && n ? (s || Dt)(n, t) : [], r ];
                    }));
                    A(i, (n => A(n[0], (s => {
                        const i = n[1], c = o.get(s) || [];
                        if (t.contains(s) && i) {
                            const t = ie(s, i, (n => {
                                r ? (t(), o.delete(s)) : e(n);
                            }));
                            o.set(s, H(c, t));
                        } else _(c), o.delete(s);
                    }))));
                }
            };
            return s(), [ () => {
                r = !0;
            }, s ];
        })(t, d, c), f = i || [], v = P(s || [], f), b = (o, s) => {
            if (!E(s)) {
                const i = a || yt, c = u || yt, d = [], p = [];
                let y = !1, v = !1;
                if (A(s, (n => {
                    const {attributeName: o, target: s, type: a, oldValue: u, addedNodes: h, removedNodes: b} = n, x = "attributes" === a, g = "childList" === a, m = t === s, $ = x && o, S = $ && vt(s, o || ""), M = w(S) ? S : null, O = $ && u !== M, C = I(f, o) && O;
                    if (e && (g || !m)) {
                        const e = x && O, a = e && l && Tt(s, l), p = (a ? !i(s, o, u, M) : !x || e) && !c(n, !!a, t, r);
                        A(h, (t => H(d, t))), A(b, (t => H(d, t))), v = v || p;
                    }
                    !e && m && O && !i(s, o, u, M) && (H(p, o), y = y || C);
                })), h((t => j(d).reduce(((e, n) => (H(e, Dt(t, n)), Tt(n, t) ? H(e, n) : e)), []))), 
                e) return !o && v && n(!1), [ !1 ];
                if (!E(p) || y) {
                    const t = [ j(p), y ];
                    return o || n.apply(0, t), t;
                }
            }
        }, x = new y(ot(b, !1));
        return [ () => (x.observe(t, {
            attributes: !0,
            attributeOldValue: !0,
            attributeFilter: v,
            subtree: e,
            childList: e,
            characterData: e
        }), o = !0, () => {
            o && (p(), x.disconnect(), o = !1);
        }), () => {
            if (o) return d.O(), b(!0, x.takeRecords());
        } ];
    };
    let kn = null;
    const An = (t, n, r) => {
        const {ft: o} = r || {}, s = me(dn), [i] = e({
            o: !1,
            u: !0
        });
        return () => {
            const e = [], r = _t(`<div class="${Fe}"><div class="${Ue}"></div></div>`)[0], c = r.firstChild, l = t => {
                let e = !1, r = !1;
                if (S(t) && !E(t)) {
                    const n = t[0], [o, , s] = i(n.contentRect), c = re(o);
                    r = oe(o, s), e = !r && !c;
                } else r = !0 === t;
                e || n({
                    _t: !0,
                    ft: r
                });
            };
            if (f) {
                if (!m(kn)) {
                    const e = new f(yt);
                    e.observe(t, {
                        get box() {
                            kn = !0;
                        }
                    }), kn = kn || !1, e.disconnect();
                }
                const n = ct(l, {
                    p: 0,
                    v: 0
                }), o = t => n(t), s = new f(o);
                if (s.observe(kn ? t : c), H(e, [ () => {
                    s.disconnect();
                }, !kn && zt(t, r) ]), kn) {
                    const n = new f(o);
                    n.observe(t, {
                        box: "border-box"
                    }), H(e, (() => n.disconnect()));
                }
            } else {
                if (!s) return yt;
                {
                    const [n, i] = s(c, l, o);
                    H(e, P([ Lt(r, Ne), ie(r, "animationstart", n), zt(t, r) ], i));
                }
            }
            return ot(_, e);
        };
    }, In = (t, n) => {
        let r;
        const o = jt(Ke), [s] = e({
            o: !1
        }), i = (t, e) => {
            if (t) {
                const r = s((t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0)(t)), [, o] = r;
                return o && !e && n(r) && [ r ];
            }
        }, c = (t, e) => i(e.pop(), t);
        return [ () => {
            const e = [];
            if (h) r = new h(ot(c, !1), {
                root: t
            }), r.observe(o), H(e, (() => {
                r.disconnect();
            })); else {
                const t = () => {
                    const t = Gt(o);
                    i(t);
                };
                H(e, An(o, t)()), t();
            }
            return ot(_, H(e, zt(t, o)));
        }, () => r && c(!0, r.takeRecords()) ];
    }, Pn = (t, n, r, o) => {
        let s, i, c, l, a, u;
        const d = `[${Te}]`, p = `[${Ae}]`, y = [ "id", "class", "style", "open", "wrap", "cols", "rows" ], {dt: h, vt: v, L: b, gt: x, ht: w, V: m, bt: M, wt: O, yt: C, St: L} = t, T = t => "rtl" === qt(t, "direction"), k = {
            Ot: !1,
            j: T(h)
        }, A = Dn(), I = me(bn), [H] = e({
            i: et,
            o: {
                w: 0,
                h: 0
            }
        }, (() => {
            const e = I && I.R(t, n, k, A, r).Y, o = !(M && m) && Mt(v, Te, Le), s = !m && O(He), i = s && de(x), c = i && L(), l = C(Re, o), a = s && e && e(), u = te(b), d = ee(b);
            return a && a(), ue(x, i), c && c(), o && l(), {
                w: u.w + d.w,
                h: u.h + d.h
            };
        })), R = ct(o, {
            p: () => s,
            v: () => i,
            m(t, e) {
                const [n] = t, [r] = e;
                return [ P(at(n), at(r)).reduce(((t, e) => (t[e] = n[e] || r[e], t)), {}) ];
            }
        }), z = t => {
            const e = T(h);
            ut(t, {
                Ct: u !== e
            }), ut(k, {
                j: e
            }), u = e;
        }, E = (t, e) => {
            const [n, r] = t, s = {
                $t: r
            };
            return ut(k, {
                Ot: n
            }), e || o(s), s;
        }, j = ({_t: t, ft: e}) => {
            const n = t && !e || !A.U ? o : R, r = {
                _t: t || e,
                ft: e
            };
            z(r), n(r);
        }, _ = (t, e) => {
            const [, n] = H(), r = {
                xt: n
            };
            return z(r), n && !e && (t ? o : R)(r), r;
        }, V = (t, e, n) => {
            const r = {
                Ht: e
            };
            return z(r), e && !n && R(r), r;
        }, [F, N] = w ? In(v, E) : [], U = !m && An(v, j, {
            ft: !0
        }), [B, Y] = Tn(v, !1, V, {
            ct: y,
            et: y
        }), q = m && f && new f((t => {
            const e = t[t.length - 1].contentRect;
            j({
                _t: !0,
                ft: oe(e, a)
            }), a = e;
        })), K = ct((() => {
            const [, t] = H();
            o({
                xt: t,
                _t: M
            });
        }), {
            p: 222,
            S: !0
        });
        return [ () => {
            q && q.observe(v);
            const t = U && U(), e = F && F(), n = B(), r = A.J((t => {
                t ? R({
                    Et: t
                }) : K();
            }));
            return () => {
                q && q.disconnect(), t && t(), e && e(), l && l(), n(), r();
            };
        }, ({zt: t, Tt: e, It: n}) => {
            const r = {}, [o] = t("update.ignoreMutation"), [a, u] = t("update.attributes"), [h, f] = t("update.elementEvents"), [v, x] = t("update.debounce"), M = e || n;
            if (f || u) {
                c && c(), l && l();
                const [t, e] = Tn(w || b, !0, _, {
                    et: P(y, a || []),
                    rt: h,
                    it: d,
                    ut: (t, e) => {
                        const {target: n, attributeName: r} = t;
                        return !(e || !r || m) && ((t, e, n) => {
                            const r = Pt(t, e), o = t && ((t, e) => {
                                const n = e ? D(e) && e : document;
                                return n && n.querySelector(t);
                            })(n, r), s = Pt(o, e) === r;
                            return !(!r || !o) && (r === t || o === t || s && Pt(Pt(t, n), e) !== r);
                        })(n, d, p) || !!Pt(n, `.${We}`) || !!(t => $(o) && o(t))(t);
                    }
                });
                l = t(), c = e;
            }
            if (x) if (R.O(), S(v)) {
                const t = v[0], e = v[1];
                s = g(t) && t, i = g(e) && e;
            } else g(v) ? (s = v, i = !1) : (s = !1, i = !1);
            if (M) {
                const t = Y(), e = N && N(), n = c && c();
                t && ut(r, V(t[0], t[1], M)), e && ut(r, E(e[0], M)), n && ut(r, _(n[0], M));
            }
            return z(r), r;
        }, k ];
    }, Hn = (t, e) => $(e) ? e.apply(0, t) : e, Rn = (t, e, n, r) => {
        const o = b(r) ? n : r;
        return Hn(t, o) || e.apply(0, t);
    }, zn = (t, e, n, r) => {
        const o = b(r) ? n : r, s = Hn(t, o);
        return !!s && (L(s) ? s : e.apply(0, t));
    }, En = (t, e, n, r) => {
        const o = "--os-viewport-percent", s = "--os-scroll-percent", i = "--os-scroll-direction", {K: c} = Dn(), {scrollbars: l} = c(), {slot: a} = l, {dt: u, vt: d, L: p, At: y, gt: h, bt: f, V: b} = e, {scrollbars: x} = y ? {} : t, {slot: g} = x || {}, w = [], $ = [], S = [], M = zn([ u, d, p ], (() => b && f ? u : d), a, g), O = t => {
            if (v) {
                let e = null, r = [];
                const o = new v({
                    source: h,
                    axis: t
                }), s = () => {
                    e && e.cancel(), e = null;
                }, i = i => {
                    const {Dt: c} = n, l = ye(c)[t], a = "x" === t, u = [ Xt(0, a), Xt(`calc(100cq${a ? "w" : "h"} + -100%)`, a) ], d = l ? u : u.reverse();
                    return r[0] === d[0] && r[1] === d[1] || (s(), r = d, e = i.Mt.animate({
                        clear: [ "left" ],
                        transform: d
                    }, {
                        timeline: o
                    })), s;
                };
                return {
                    kt: i
                };
            }
        }, C = {
            x: O("x"),
            y: O("y")
        }, L = (t, e, n) => {
            const r = n ? Lt : Ct;
            A(t, (t => {
                r(t.Lt, e);
            }));
        }, D = (t, e) => {
            A(t, (t => {
                const [n, r] = e(t);
                Yt(n, r);
            }));
        }, T = (t, e, n) => {
            const r = m(n), o = !r || !n;
            (!r || n) && L($, t, e), o && L(S, t, e);
        }, k = t => {
            const e = t ? "x" : "y", n = jt(`${We} ${t ? Ze : Ge}`), o = jt(Je), s = jt(tn), i = {
                Lt: n,
                Ut: o,
                Mt: s
            }, c = C[e];
            return H(t ? $ : S, i), H(w, [ zt(n, o), zt(o, s), ot(Rt, n), c && c.kt(i), r(i, T, t) ]), 
            i;
        }, I = ot(k, !0), P = ot(k, !1);
        return I(), P(), [ {
            Pt: () => {
                const t = (() => {
                    const {Rt: t, Vt: e} = n, r = (t, e) => ht(0, 1, t / (t + e) || 0);
                    return {
                        x: r(e.x, t.x),
                        y: r(e.y, t.y)
                    };
                })(), e = t => e => [ e.Lt, {
                    [o]: Ut(t) + ""
                } ];
                D($, e(t.x)), D(S, e(t.y));
            },
            Nt: () => {
                if (!v) {
                    const {Dt: t} = n, e = he(t, de(h)), r = t => e => [ e.Lt, {
                        [s]: Ut(t) + ""
                    } ];
                    D($, r(e.x)), D(S, r(e.y));
                }
            },
            qt: () => {
                const {Dt: t} = n, e = ye(t), r = t => e => [ e.Lt, {
                    [i]: t ? "0" : "1"
                } ];
                D($, r(e.x)), D(S, r(e.y)), v && ($.forEach(C.x.kt), S.forEach(C.y.kt));
            },
            jt: () => {
                if (b && !f) {
                    const {Rt: t, Dt: e} = n, r = ye(e), o = he(e, de(h)), s = e => {
                        const {Lt: n} = e, s = It(n) === p && n, i = (t, e, n) => {
                            const r = e * t;
                            return Bt(n ? r : -r);
                        };
                        return [ s, s && {
                            transform: Xt({
                                x: i(o.x, t.x, r.x),
                                y: i(o.y, t.y, r.y)
                            })
                        } ];
                    };
                    D($, s), D(S, s);
                }
            },
            Bt: T,
            Ft: {
                Xt: $,
                Yt: I,
                Wt: ot(D, $)
            },
            Gt: {
                Xt: S,
                Yt: P,
                Wt: ot(D, S)
            }
        }, () => (zt(M, $[0].Lt), zt(M, S[0].Lt), ot(_, w)) ];
    }, jn = (t, e, n, r) => (o, c, l) => {
        const {vt: a, L: d, V: p, gt: y, Jt: h, St: f} = e, {Lt: v, Ut: b, Mt: x} = o, [g, w] = st(333), [m, S] = st(444), M = t => {
            $(y.scrollBy) && y.scrollBy({
                behavior: "smooth",
                left: t.x,
                top: t.y
            });
        };
        let O = !0;
        return ot(_, [ ie(x, "pointermove pointerleave", r), ie(v, "pointerenter", (() => {
            c(rn, !0);
        })), ie(v, "pointerleave pointercancel", (() => {
            c(rn, !1);
        })), !p && ie(v, "mousedown", (() => {
            const t = Ht();
            (bt(t, Ae) || bt(t, Te) || t === document.body) && u(ot(fe, d), 25);
        })), ie(v, "wheel", (t => {
            const {deltaX: e, deltaY: n, deltaMode: r} = t;
            O && 0 === r && It(v) === a && M({
                x: e,
                y: n
            }), O = !1, c(ln, !0), g((() => {
                O = !0, c(ln);
            })), le(t);
        }), {
            T: !1,
            I: !0
        }), ie(v, "pointerdown", (() => {
            const t = ie(h, "click", (t => {
                e(), ae(t);
            }), {
                A: !0,
                I: !0,
                T: !1
            }), e = ie(h, "pointerup pointercancel", (() => {
                e(), setTimeout(t, 150);
            }), {
                I: !0,
                T: !0
            });
        }), {
            I: !0,
            T: !0
        }), (() => {
            const e = "pointerup pointercancel lostpointercapture", r = `client${l ? "X" : "Y"}`, o = l ? W : Q, c = l ? "left" : "top", a = l ? "w" : "h", u = l ? "x" : "y", d = (t, e) => r => {
                const {Rt: o} = n, s = Gt(b)[a] - Gt(x)[a], i = e * r / s * o[u];
                ue(y, {
                    [u]: t + i
                });
            }, p = [];
            return ie(b, "pointerdown", (n => {
                const l = Pt(n.target, `.${tn}`) === x, v = l ? x : b, g = t.scrollbars, w = g[l ? "dragScroll" : "clickScroll"], {button: $, isPrimary: O, pointerType: C} = n, {pointers: L} = g;
                if (0 === $ && O && w && (L || []).includes(C)) {
                    _(p), S();
                    const t = !l && (n.shiftKey || "instant" === w), g = ot(ne, x), $ = ot(ne, b), O = (t, e) => (t || g())[c] - (e || $())[c], C = s(ne(y)[o]) / Gt(y)[a] || 1, L = d(de(y)[u], 1 / C), D = n[r], T = g(), k = $(), A = T[o], I = O(T, k) + A / 2, P = D - k[c], R = l ? 0 : P - I, z = t => {
                        _(V), v.releasePointerCapture(t.pointerId);
                    }, E = l || t, j = f(), V = [ ie(h, e, z), ie(h, "selectstart", (t => le(t)), {
                        T: !1
                    }), ie(b, e, z), E && ie(b, "pointermove", (t => L(R + (t[r] - D)))), E && (() => {
                        const t = de(y);
                        j();
                        const e = de(y), n = {
                            x: e.x - t.x,
                            y: e.y - t.y
                        };
                        (i(n.x) > 3 || i(n.y) > 3) && (f(), ue(y, t), M(n), m(j));
                    }) ];
                    if (v.setPointerCapture(n.pointerId), t) L(R); else if (!l) {
                        const t = me(gn);
                        if (t) {
                            const e = t(L, R, A, (t => {
                                t ? j() : H(V, j);
                            }));
                            H(V, e), H(p, ot(e, !0));
                        }
                    }
                }
            }));
        })(), w, S ]);
    }, _n = t => {
        const e = Dn(), {K: r, U: o} = e, {elements: s} = r(), {padding: i, viewport: c, content: l} = s, a = L(t), u = a ? {} : t, {elements: d} = u, {padding: p, viewport: y, content: h} = d || {}, f = a ? t : u.target, v = kt(f), b = f.ownerDocument, x = b.documentElement, g = () => b.defaultView || n, w = ot(Rn, [ f ]), m = ot(zn, [ f ]), $ = ot(jt, ""), S = ot(w, $, c), M = ot(m, $, l), O = S(y), C = O === f, D = C && v, T = !C && M(h), k = !C && O === T, A = D ? x : O, P = D ? A : f, R = !C && m($, i, p), z = !k && T, E = [ z, A, R, P ].map((t => L(t) && !It(t) && t)), j = t => t && I(E, t), V = !j(A) && (t => {
            const e = Gt(t), n = te(t), r = qt(t, K), o = qt(t, X);
            return n.w - e.w > 0 && !hn(r) || n.h - e.h > 0 && !hn(o);
        })(A) ? A : f, F = D ? x : A, N = {
            dt: f,
            vt: P,
            L: A,
            rn: R,
            ht: z,
            gt: F,
            Kt: D ? b : A,
            ln: v ? x : V,
            Jt: b,
            bt: v,
            At: a,
            V: C,
            an: g,
            wt: t => Mt(A, Ae, t),
            yt: (t, e) => St(A, Ae, t, e),
            St: () => St(F, Ae, ze, !0)
        }, {dt: U, vt: B, rn: Y, L: q, ht: W} = N, Q = [ () => {
            gt(B, [ Te, Ce ]), gt(U, Ce), v && gt(x, [ Ce, Te ]);
        } ];
        let Z = At([ W, q, Y, B, U ].find((t => t && !j(t))));
        const G = D ? U : W || q, J = ot(_, Q);
        return [ N, () => {
            const t = g(), e = Ht(), n = t => {
                zt(It(t), At(t)), Rt(t);
            }, r = t => ie(t, "focusin focusout focus blur", ae, {
                I: !0,
                T: !1
            }), s = "tabindex", i = vt(q, s), c = r(e);
            return xt(B, Te, C ? "" : ke), xt(Y, _e, ""), xt(q, Ae, ""), xt(W, Ve, ""), C || (xt(q, s, i || "-1"), 
            v && xt(x, De, "")), zt(G, Z), zt(B, Y), zt(Y || B, !C && q), zt(q, W), H(Q, [ c, () => {
                const t = Ht(), e = j(q), o = e && t === q ? U : t, c = r(o);
                gt(Y, _e), gt(W, Ve), gt(q, Ae), v && gt(x, De), i ? xt(q, s, i) : gt(q, s), j(W) && n(W), 
                e && n(q), j(Y) && n(Y), fe(o), c();
            } ]), o && !C && ($t(q, Ae, Ee), H(Q, ot(gt, q, Ae))), fe(!C && v && e === U && t.top === t ? q : e), 
            c(), Z = 0, J;
        }, J ];
    }, Vn = ({ht: t}) => ({Qt: e, un: n, It: r}) => {
        const {$t: o} = e || {}, {Ot: s} = n;
        t && (o || r) && Yt(t, {
            [Q]: s && "100%"
        });
    }, Fn = ({vt: t, rn: n, L: r, V: o}, s) => {
        const [i, c] = e({
            i: rt,
            o: Kt()
        }, ot(Kt, t, "padding", ""));
        return ({zt: t, Qt: e, un: l, It: a}) => {
            let [u, d] = c(a);
            const {U: p} = Dn(), {_t: y, xt: h, Ct: f} = e || {}, {j: v} = l, [b, x] = t("paddingAbsolute");
            (y || d || a || h) && ([u, d] = i(a));
            const g = !o && (x || f || d);
            if (g) {
                const t = !b || !n && !p, e = u.r + u.l, o = u.t + u.b, i = {
                    [Y]: t && !v ? -e : 0,
                    [q]: t ? -o : 0,
                    [B]: t && v ? -e : 0,
                    top: t ? -u.t : 0,
                    right: t ? v ? -u.r : "auto" : 0,
                    left: t ? v ? "auto" : -u.l : 0,
                    [W]: t && `calc(100% + ${e}px)`
                }, c = {
                    [V]: t ? u.t : 0,
                    [F]: t ? u.r : 0,
                    [U]: t ? u.b : 0,
                    [N]: t ? u.l : 0
                };
                Yt(n || r, i), Yt(r, c), ut(s, {
                    rn: u,
                    fn: !t,
                    B: n ? c : ut({}, i, c)
                });
            }
            return {
                _n: g
            };
        };
    }, Nn = (t, o) => {
        const s = Dn(), {vt: i, rn: c, L: l, V: u, Kt: d, gt: p, bt: y, yt: h, an: f} = t, {U: v} = s, b = y && u, x = ot(r, 0), g = {
            display: () => !1,
            direction: t => "ltr" !== t,
            flexDirection: t => t.endsWith("-reverse"),
            writingMode: t => "horizontal-tb" !== t
        }, w = at(g), m = {
            i: et,
            o: {
                w: 0,
                h: 0
            }
        }, $ = {
            i: nt,
            o: {}
        }, S = t => {
            h(Re, !b && t);
        }, M = t => {
            const e = w.some((e => {
                const n = t[e];
                return n && g[e](n);
            }));
            if (!e) return {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 1,
                    y: 1
                }
            };
            S(!0);
            const n = de(p), r = h(je, !0), o = ie(d, J, (t => {
                const e = de(p);
                t.isTrusted && e.x === n.x && e.y === n.y && ce(t);
            }), {
                I: !0,
                A: !0
            });
            ue(p, {
                x: 0,
                y: 0
            }), r();
            const s = de(p), i = te(p);
            ue(p, {
                x: i.w,
                y: i.h
            });
            const c = de(p);
            ue(p, {
                x: c.x - s.x < 1 && -i.w,
                y: c.y - s.y < 1 && -i.h
            });
            const l = de(p);
            return ue(p, n), a((() => o())), {
                D: s,
                M: l
            };
        }, O = (t, e) => {
            const r = n.devicePixelRatio % 1 != 0 ? 1 : 0, o = {
                w: x(t.w - e.w),
                h: x(t.h - e.h)
            };
            return {
                w: o.w > r ? o.w : 0,
                h: o.h > r ? o.h : 0
            };
        }, C = (t, e) => {
            const n = (t, e, n, r) => {
                const o = t === Z ? G : (t => t.replace(`${Z}-`, ""))(t), s = hn(t), i = hn(n);
                return e || r ? s && i ? Z : s ? e && r ? o : e ? Z : G : e ? o : i && r ? Z : G : G;
            };
            return {
                x: n(e.x, t.x, e.y, t.y),
                y: n(e.y, t.y, e.x, t.x)
            };
        }, L = t => {
            const e = t => [ Z, G, J ].map((e => N(fn(e), t))), n = e(!0).concat(e()).join(" ");
            h(n), h(at(t).map((e => N(t[e], "x" === e))).join(" "), !0);
        }, [D, T] = e(m, ot(ee, l)), [k, A] = e(m, ot(te, l)), [I, P] = e(m), [H] = e($), [R, z] = e(m), [E] = e($), [j] = e({
            i: (t, e) => tt(t, e, w),
            o: {}
        }, (() => (t => !!t && (t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length))(t))(l) ? qt(l, w) : {})), [_, V] = e({
            i: (t, e) => nt(t.D, e.D) && nt(t.M, e.M),
            o: {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 0,
                    y: 0
                }
            }
        }), F = me(bn), N = (t, e) => `${e ? Ie : Pe}${(t => {
            const e = String(t || "");
            return e ? e[0].toUpperCase() + e.slice(1) : "";
        })(t)}`;
        return ({zt: e, Qt: n, un: r, It: a}, {_n: u}) => {
            const {_t: d, Ht: p, xt: y, Ct: g, ft: w, Et: m} = n || {}, $ = F && F.R(t, o, r, s, e), {X: N, Y: U, W: B} = $ || {}, [Y, q] = yn(e, s), [K, X] = e("overflow"), W = hn(K.x), Q = hn(K.y), Z = d || u || y || g || m || q;
            let G = T(a), J = A(a), tt = P(a), et = z(a);
            if (q && v && h(Ee, !Y), Z) {
                Mt(i, Te, Le) && S(!0);
                const t = U && U(), [e] = G = D(a), [n] = J = k(a), r = Jt(l), o = b && Zt(f()), s = {
                    w: x(n.w + e.w),
                    h: x(n.h + e.h)
                }, c = {
                    w: x((o ? o.w : r.w + x(r.w - n.w)) + e.w),
                    h: x((o ? o.h : r.h + x(r.h - n.h)) + e.h)
                };
                t && t(), et = R(c), tt = I(O(s, c), a);
            }
            const [nt, rt] = et, [ot, st] = tt, [it, ct] = J, [lt, at] = G, [dt, pt] = H({
                x: ot.w > 0,
                y: ot.h > 0
            }), yt = W && Q && (dt.x || dt.y) || W && dt.x && !dt.y || Q && dt.y && !dt.x, ht = u || g || m || at || ct || rt || st || X || q || Z || p && b, [ft, vt] = j(a), bt = g || w || vt || pt || a, [xt, gt] = bt ? _(M(ft), a) : V();
            let wt = C(dt, K);
            S(!1), ht && (L(wt), wt = vn(l, dt), B && N && (N(wt, it, lt), Yt(l, B(wt))));
            const [mt, $t] = E(wt);
            return St(i, Te, Le, yt), St(c, _e, Le, yt), ut(o, {
                cn: mt,
                Vt: {
                    x: nt.w,
                    y: nt.h
                },
                Rt: {
                    x: ot.w,
                    y: ot.h
                },
                F: dt,
                Dt: pe(xt, ot)
            }), {
                sn: $t,
                tn: rt,
                nn: st,
                en: gt || st,
                dn: bt
            };
        };
    }, Un = t => {
        const [e, n, r] = _n(t), o = {
            rn: {
                t: 0,
                r: 0,
                b: 0,
                l: 0
            },
            fn: !1,
            B: {
                [Y]: 0,
                [q]: 0,
                [B]: 0,
                [V]: 0,
                [F]: 0,
                [U]: 0,
                [N]: 0
            },
            Vt: {
                x: 0,
                y: 0
            },
            Rt: {
                x: 0,
                y: 0
            },
            cn: {
                x: G,
                y: G
            },
            F: {
                x: !1,
                y: !1
            },
            Dt: {
                D: {
                    x: 0,
                    y: 0
                },
                M: {
                    x: 0,
                    y: 0
                }
            }
        }, {dt: s, gt: i, V: c, St: l} = e, {U: a, k: u} = Dn(), d = !a && (u.x || u.y), p = [ Vn(e), Fn(e, o), Nn(e, o) ];
        return [ n, t => {
            const e = {}, n = d && de(i), r = n && l();
            return A(p, (n => {
                ut(e, n(t, e) || {});
            })), ue(i, n), r && r(), c || ue(s, 0), e;
        }, o, e, r ];
    }, Bn = new WeakMap, Yn = t => Bn.get(t), qn = (t, e, n) => {
        const {tt: r} = Dn(), o = L(t), s = o ? t : t.target, i = Yn(s);
        if (e && !i) {
            let i = !1;
            const c = [], l = {}, a = t => {
                const e = dt(t), n = me($e);
                return n ? n(e, !0) : e;
            }, u = ut({}, r(), a(e)), [d, p, y] = be(), [h, f, v] = be(n), g = (t, e) => {
                v(t, e), y(t, e);
            }, [w, m, $, S, M] = ((t, e, n, r) => {
                let o = !1;
                const s = On(e, {}), [i, c, l, a, u] = Un(t), [d, p, y] = Pn(a, l, s, (t => {
                    x({}, t);
                })), [h, f, , v] = ((t, e, n, r, o, s) => {
                    let i, c, l, a, u, d = yt, p = 0;
                    const y = [ "mouse", "pen" ], h = t => y.includes(t.pointerType), [f, v] = st(), [b, x] = st(100), [g, w] = st(100), [m, $] = st((() => p)), [S, M] = En(t, o, r, jn(e, o, r, (t => h(t) && R()))), {vt: O, Kt: C, bt: L} = o, {Bt: D, Pt: T, Nt: k, qt: A, jt: I} = S, P = (t, e) => {
                        if ($(), t) D(cn); else {
                            const t = ot(D, cn, !0);
                            p > 0 && !e ? m(t) : t();
                        }
                    }, R = () => {
                        (l ? i : a) || (P(!0), b((() => {
                            P(!1);
                        })));
                    }, z = t => {
                        D(sn, t, !0), D(sn, t, !1);
                    }, E = t => {
                        h(t) && (i = l, l && P(!0));
                    }, j = [ $, x, w, v, () => d(), ie(O, "pointerover", E, {
                        A: !0
                    }), ie(O, "pointerenter", E), ie(O, "pointerleave", (t => {
                        h(t) && (i = !1, l && P(!1));
                    })), ie(O, "pointermove", (t => {
                        h(t) && c && R();
                    })), ie(C, "scroll", (t => {
                        f((() => {
                            k(), R();
                        })), s(t), I();
                    })) ];
                    return [ () => ot(_, H(j, M())), ({zt: t, It: e, Qt: o, Zt: s}) => {
                        const {tn: i, nn: y, sn: h, en: f} = s || {}, {Ct: v, ft: b} = o || {}, {j: x} = n, {k: w} = Dn(), {cn: m, F: $} = r, [S, M] = t("showNativeOverlaidScrollbars"), [O, H] = t("scrollbars.theme"), [R, E] = t("scrollbars.visibility"), [j, _] = t("scrollbars.autoHide"), [V, F] = t("scrollbars.autoHideSuspend"), [N] = t("scrollbars.autoHideDelay"), [U, B] = t("scrollbars.dragScroll"), [Y, q] = t("scrollbars.clickScroll"), [K, X] = t("overflow"), W = b && !e, Q = $.x || $.y, G = i || y || f || v || e, tt = h || E || X, et = S && w.x && w.y, nt = (t, e, n) => {
                            const r = t.includes(J) && (R === Z || "auto" === R && e === J);
                            return D(en, r, n), r;
                        };
                        if (p = N, W && (V && Q ? (z(!1), d(), g((() => {
                            d = ie(C, "scroll", ot(z, !0), {
                                A: !0
                            });
                        }))) : z(!0)), M && D(Xe, et), H && (D(u), D(O, !0), u = O), F && !V && z(!0), _ && (c = "move" === j, 
                        l = "leave" === j, a = "never" === j, P(a, !0)), B && D(un, U), q && D(an, !!Y), 
                        tt) {
                            const t = nt(K.x, m.x, !0), e = nt(K.y, m.y, !1);
                            D(nn, !(t && e));
                        }
                        G && (k(), T(), I(), f && A(), D(on, !$.x, !0), D(on, !$.y, !1), D(Qe, x && !L));
                    }, {}, S ];
                })(t, e, y, l, a, (t => g("scroll", [ C, t ]))), b = t => at(t).some((e => !!t[e])), x = (t, s) => {
                    if (n()) return !1;
                    const {pn: i, It: l, Tt: a, vn: u} = t, d = i || {}, h = !!l || !o, v = {
                        zt: On(e, d, h),
                        pn: d,
                        It: h
                    };
                    if (u) return f(v), !1;
                    const x = s || p(ut({}, v, {
                        Tt: a
                    })), g = c(ut({}, v, {
                        un: y,
                        Qt: x
                    }));
                    f(ut({}, v, {
                        Qt: x,
                        Zt: g
                    }));
                    const w = b(x), m = b(g), $ = w || m || !pt(d) || h;
                    return o = !0, $ && r(t, {
                        Qt: x,
                        Zt: g
                    }), $;
                };
                return [ () => {
                    const {ln: t, gt: e, St: n} = a, r = de(t), o = [ d(), i(), h() ], s = n();
                    return ue(e, r), s(), ot(_, o);
                }, x, () => ({
                    gn: y,
                    hn: l
                }), {
                    bn: a,
                    wn: v
                }, u ];
            })(t, u, (() => i), (({pn: t, It: e}, {Qt: n, Zt: r}) => {
                const {_t: o, Ct: s, $t: i, xt: c, Ht: l, ft: a} = n, {tn: u, nn: d, sn: p, en: y} = r;
                g("updated", [ C, {
                    updateHints: {
                        sizeChanged: !!o,
                        directionChanged: !!s,
                        heightIntrinsicChanged: !!i,
                        overflowEdgeChanged: !!u,
                        overflowAmountChanged: !!d,
                        overflowStyleChanged: !!p,
                        scrollCoordinatesChanged: !!y,
                        contentMutation: !!c,
                        hostMutation: !!l,
                        appear: !!a
                    },
                    changedOptions: t || {},
                    force: !!e
                } ]);
            })), O = t => {
                (t => {
                    Bn.delete(t);
                })(s), _(c), i = !0, g("destroyed", [ C, t ]), p(), f();
            }, C = {
                options(t, e) {
                    if (t) {
                        const n = e ? r() : {}, o = Mn(u, ut(n, a(t)));
                        pt(o) || (ut(u, o), m({
                            pn: o
                        }));
                    }
                    return ut({}, u);
                },
                on: h,
                off: (t, e) => {
                    t && e && f(t, e);
                },
                state() {
                    const {gn: t, hn: e} = $(), {j: n} = t, {Vt: r, Rt: o, cn: s, F: c, rn: l, fn: a, Dt: u} = e;
                    return ut({}, {
                        overflowEdge: r,
                        overflowAmount: o,
                        overflowStyle: s,
                        hasOverflow: c,
                        scrollCoordinates: {
                            start: u.D,
                            end: u.M
                        },
                        padding: l,
                        paddingAbsolute: a,
                        directionRTL: n,
                        destroyed: i
                    });
                },
                elements() {
                    const {dt: t, vt: e, rn: n, L: r, ht: o, gt: s, Kt: i} = S.bn, {Ft: c, Gt: l} = S.wn, a = t => {
                        const {Mt: e, Ut: n, Lt: r} = t;
                        return {
                            scrollbar: r,
                            track: n,
                            handle: e
                        };
                    }, u = t => {
                        const {Xt: e, Yt: n} = t, r = a(e[0]);
                        return ut({}, r, {
                            clone: () => {
                                const t = a(n());
                                return m({
                                    vn: !0
                                }), t;
                            }
                        });
                    };
                    return ut({}, {
                        target: t,
                        host: e,
                        padding: n || r,
                        viewport: r,
                        content: o || r,
                        scrollOffsetElement: s,
                        scrollEventElement: i,
                        scrollbarHorizontal: u(c),
                        scrollbarVertical: u(l)
                    });
                },
                update: t => m({
                    It: t,
                    Tt: !0
                }),
                destroy: ot(O, !1),
                plugin: t => l[at(t)[0]]
            };
            return H(c, [ M ]), ((t, e) => {
                Bn.set(t, e);
            })(s, C), we(xe, qn, [ C, d, l ]), ((t, e) => {
                const {nativeScrollbarsOverlaid: n, body: r} = e || {}, {k: o, U: s, K: i} = Dn(), {nativeScrollbarsOverlaid: c, body: l} = i().cancel, a = null != n ? n : c, u = b(r) ? l : r, d = (o.x || o.y) && a, p = t && (x(u) ? !s : u);
                return !!d || !!p;
            })(S.bn.bt, !o && t.cancel) ? (O(!0), C) : (H(c, w()), g("initialized", [ C ]), 
            C.update(), C);
        }
        return i;
    };
    return qn.plugin = t => {
        const e = S(t), n = e ? t : [ t ], r = n.map((t => we(t, qn)[0]));
        return (t => {
            A(t, (t => A(t, ((e, n) => {
                xe[n] = t[n];
            }))));
        })(n), e ? r : r[0];
    }, qn.valid = t => {
        const e = t && t.elements, n = $(e) && e();
        return C(n) && !!Yn(n.target);
    }, qn.env = () => {
        const {P: t, k: e, U: n, G: r, ot: o, st: s, K: i, Z: c, tt: l, nt: a} = Dn();
        return ut({}, {
            scrollbarsSize: t,
            scrollbarsOverlaid: e,
            scrollbarsHiding: n,
            scrollTimeline: r,
            staticDefaultInitialization: o,
            staticDefaultOptions: s,
            getDefaultInitialization: i,
            setDefaultInitialization: c,
            getDefaultOptions: l,
            setDefaultOptions: a
        });
    }, qn.nonce = t => {
        Cn = t;
    }, qn.trustedTypePolicy = t => {
        Et = t;
    }, t.ClickScrollPlugin = wn, t.OverlayScrollbars = qn, t.ScrollbarsHidingPlugin = xn, 
    t.SizeObserverPlugin = pn, Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
    }), t;
}({});

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
                scrollAspectServiceInstance.setScrollAspect("bigScroll");
                break;
            }

          case CLICK_FACILITE_LONG_CLICK:
            {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect("bigScroll");
                this.longClick();
                break;
            }

          case CLICK_FACILITE_AUTO_CLICK:
            {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect("bigScroll");
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
            const closeMask = document.createElement("span");
            maskTopElt.setAttribute("id", `${this.maskTopEltID}`);
            maskBottomElt.setAttribute("id", `${this.maskBottomEltID}`);
            closeMask.setAttribute("id", `${this.closeTextID}`);
            closeMask.innerText = i18nServiceInstance.getMessage("readingGuide_closeMask");
            document.body.insertBefore(maskTopElt, document.querySelector(APP_NAME));
            document.body.insertBefore(maskBottomElt, document.querySelector(APP_NAME));
            document.body.insertBefore(closeMask, document.querySelector(APP_NAME));
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
    overlayScrollbars;
    scrollColor="";
    scrollColorHover="";
    scrollBorderColor="";
    scrollWidth="";
    activeInstances=[];
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
        this.initOverlayScrollbars();
    }
    initOverlayScrollbars() {
        if (typeof window !== "undefined" && window.OverlayScrollbarsGlobal) {
            this.overlayScrollbars = window.OverlayScrollbarsGlobal.OverlayScrollbars;
        } else {
            console.warn("OverlayScrollbars not available");
        }
    }
    setScrollAspect=value => {
        stylesServiceInstance.removeStyle("scroll-aspect");
        stylesServiceInstance.removeStyle("overlay-scrollbars-custom");
        document.body.classList.remove(`${PREFIX}big-scroll`);
        this.destroyOverlayScrollbars();
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
                this.scrollWidth = "20px";
                break;
            }
            this.scrollColor = value?.split("_")[1] ? value?.split("_")[1] : "lightgrey";
            let colorHover = this.scrollColorValues.find((o => o.color === this.scrollColor))?.hover;
            let borderColor = this.scrollColorValues.find((o => o.color === this.scrollColor))?.border;
            this.scrollColorHover = colorHover ? colorHover : "grey";
            this.scrollBorderColor = borderColor ? borderColor : "grey";
            this.initCustomScrollbars();
        }
    };
    initCustomScrollbars() {
        if (!this.overlayScrollbars) {
            console.warn("Using fallback native scrollbars");
            this.setNativeScrollbars();
            return;
        }
        try {
            const config = {
                scrollbars: {
                    theme: "os-theme-custom",
                    autoHide: "never",
                    autoHideDelay: 0,
                    clickScroll: true,
                    dragScroll: true
                },
                overflow: {
                    x: "scroll",
                    y: "scroll"
                },
                paddingAbsolute: false,
                showNativeOverlaidScrollbars: false,
                update: {
                    elementEvents: [ [ "img", "load" ] ],
                    debounce: [ 0, 33 ],
                    attributes: null,
                    ignoreMutation: null
                }
            };
            const bodyInstance = this.overlayScrollbars(document.body, config);
            if (bodyInstance) {
                this.activeInstances.push(bodyInstance);
            }
            const scrollableElements = document.querySelectorAll("div, section, article, main, aside");
            scrollableElements.forEach((element => {
                const computedStyle = window.getComputedStyle(element);
                if (computedStyle.overflow === "auto" || computedStyle.overflow === "scroll" || computedStyle.overflowY === "auto" || computedStyle.overflowY === "scroll" || computedStyle.overflowX === "auto" || computedStyle.overflowX === "scroll") {
                    const instance = this.overlayScrollbars(element, config);
                    if (instance) {
                        this.activeInstances.push(instance);
                    }
                }
            }));
            this.observeNewScrollableElements(config);
            this.setOverlayScrollbarsStyles();
        } catch (error) {
            console.warn("Failed to initialize OverlayScrollbars, falling back to native scrollbars:", error);
            this.setNativeScrollbars();
        }
    }
    observeNewScrollableElements(config) {
        const observer = new MutationObserver((mutations => {
            mutations.forEach((mutation => {
                mutation.addedNodes.forEach((node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node;
                        const computedStyle = window.getComputedStyle(element);
                        if (computedStyle.overflow === "auto" || computedStyle.overflow === "scroll" || computedStyle.overflowY === "auto" || computedStyle.overflowY === "scroll" || computedStyle.overflowX === "auto" || computedStyle.overflowX === "scroll") {
                            const instance = this.overlayScrollbars(element, config);
                            if (instance) {
                                this.activeInstances.push(instance);
                            }
                        }
                        const scrollableChildren = element.querySelectorAll("div, section, article, main, aside");
                        scrollableChildren.forEach((child => {
                            const childStyle = window.getComputedStyle(child);
                            if (childStyle.overflow === "auto" || childStyle.overflow === "scroll" || childStyle.overflowY === "auto" || childStyle.overflowY === "scroll" || childStyle.overflowX === "auto" || childStyle.overflowX === "scroll") {
                                const instance = this.overlayScrollbars(child, config);
                                if (instance) {
                                    this.activeInstances.push(instance);
                                }
                            }
                        }));
                    }
                }));
            }));
        }));
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    destroyOverlayScrollbars() {
        this.activeInstances.forEach((instance => {
            try {
                if (instance && typeof instance.destroy === "function") {
                    instance.destroy();
                }
            } catch (error) {
                console.warn("Error destroying OverlayScrollbars instance:", error);
            }
        }));
        this.activeInstances = [];
    }
    setOverlayScrollbarsStyles() {
        const customScrollbarStyles = `\n\t\t\t/* OverlayScrollbars custom theme */\n\t\t\t.os-theme-custom > .os-scrollbar > .os-scrollbar-track {\n\t\t\t\tbackground: transparent !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\n\t\t\t\tbackground-color: ${this.scrollColor} !important;\n\t\t\t\tborder: 1px solid ${this.scrollBorderColor} !important;\n\t\t\t\tborder-radius: 10px !important;\n\t\t\t\tcursor: pointer !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover {\n\t\t\t\tbackground-color: ${this.scrollColorHover} !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar-vertical {\n\t\t\t\twidth: ${this.scrollWidth} !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar-horizontal {\n\t\t\t\theight: ${this.scrollWidth} !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\n\t\t\t\tmin-height: 20px !important;\n\t\t\t\twidth: ${this.scrollWidth} !important;\n\t\t\t}\n\n\t\t\t.os-theme-custom > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\n\t\t\t\tmin-width: 20px !important;\n\t\t\t\theight: ${this.scrollWidth} !important;\n\t\t\t}\n\n\t\t\t/* Assurer que les scrollbars sont toujours visibles */\n\t\t\t.${PREFIX}big-scroll .os-scrollbar {\n\t\t\t\topacity: 1 !important;\n\t\t\t\tvisibility: visible !important;\n\t\t\t}\n\n\t\t\t.${PREFIX}big-scroll .os-scrollbar-track {\n\t\t\t\topacity: 1 !important;\n\t\t\t\tvisibility: visible !important;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("overlay-scrollbars-custom", customScrollbarStyles);
    }
    setNativeScrollbars() {
        const styleScroll = `\n\t\t\thtml {\n\t\t\t\toverflow: initial !important;\n\t\t\t}\n\n\t\t\t.d-none {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t/* WebKit (Chrome, Safari) */\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar {\n\t\t\t\twidth: ${this.scrollWidth};\n\t\t\t\theight: ${this.scrollWidth};\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: ${this.scrollColor};\n\t\t\t\tborder: 1px solid ${this.scrollBorderColor};\n\t\t\t\tborder-radius: 10px;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground-color: ${this.scrollColorHover};\n\t\t\t}\n\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-track,\n\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-track {\n\t\t\t\tbackground: transparent;\n\t\t\t}\n\n\t\t\t/* Firefox */\n\t\t\t@-moz-document url-prefix() {\n\t\t\t\t.${PREFIX}big-scroll,\n\t\t\t\t.${PREFIX}big-scroll * {\n\t\t\t\t\tscrollbar-width: thick;\n\t\t\t\t\tscrollbar-color: ${this.scrollColor} transparent;\n\t\t\t\t}\n\t\t\t\t.${PREFIX}big-scroll:hover,\n\t\t\t\t.${PREFIX}big-scroll *:hover {\n\t\t\t\t\tscrollbar-color: ${this.scrollColorHover} transparent;\n\t\t\t\t}\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("scroll-aspect", styleScroll);
    }
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
            const labelParts = content.split(",");
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

selectEditValueLayout.innerHTML = `\n\t<div class="d-flex flex-column" role="group">\n\t\t<div class="d-flex align-items-center justify-content-between gap-2">\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="prevValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\t\t\t<output></output>\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="nextValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_right"></app-icon>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n`;

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

editNavigationButtonsComponent.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-button-preset" data-name="buttonSet" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-pointing-delay" data-name="pointingDelay" data-label="true"></app-select-edit-value>\n\t</form>\n`;

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
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingButtonSet":
            if (event.detail.newValue === DEFAULT_VALUE) {
                this.buttonSetValue = DEFAULT_VALUE;
            } else {
                this.buttonSetValue = event.detail.newValue.split("_")[1];
            }
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

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n\t<h2 class="fs-6 m-0"><button id="change-mode-btn" type="button" class="btn btn-secondary bg-dark gap-2 p-0 border-0" data-i18n-title="otherUsagesModes">\n\t\t<span class="visually-hidden" data-i18n="otherUsagesModes"></span>\n\t\t<div class="sc-home__icon-mode bg-body rounded-circle text-body">\n\t\t\t<app-icon data-size="2.5em"></app-icon>\n\t\t</div>\n\t\t<div class="d-flex flex-column align-items-start">\n\t\t\t<span class="text-white" data-i18n="profile"></span>\n\t\t\t<span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n\t\t</div>\n\t</button></h2>\n\t<div class="d-grid gap-3 d-md-block">\n\t\t<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n\t\t\t<span id="pause-label" class="visually-hidden" data-i18n="pause"></span>\n\t\t\t<app-icon id="pause-icon" data-name="Pause"></app-icon>\n\t\t</button>\n\t</div>\n</section>\n\n<section class="gap-3 p-3">\n\t<p id="pause-info" class="d-none" data-i18n="pauseInfo"></p>\n\t<div class="sc-home__settings gap-3">\n\t\t<app-mode></app-mode>\n\t\t<button id="settings-btn" type="button" class="btn btn-secondary">\n\t\t\t<app-icon class="me-1" data-name="Settings"></app-icon>\n\t\t\t<span data-i18n="othersSettings"></span>\n\t\t</button>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-modes", "data-custom" ];
    changeModeBtn=null;
    settingsBtn=null;
    pauseBtn=null;
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
        this.pauseLabel = this.querySelector("#pause-label");
        this.pauseInfo = this.querySelector("#pause-info");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
        this.currentMode = this.querySelector("app-mode");
        this.changeModeBtn?.addEventListener("click", this.handler);
        this.settingsBtn?.addEventListener("click", this.handler);
        this.pauseBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.cleanupModeData();
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
            this.currentMode.setAttribute("data-pause", "true");
        } else {
            pauseServiceInstance.playSettings();
            this.settingsBtn.disabled = false;
            this.changeModeBtn.disabled = false;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("pause"));
            this.pauseLabel.innerText = i18nServiceInstance.getMessage("pause");
            this.pauseInfo.classList.add("d-none");
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

settingsLayout.innerHTML = `\n\t<section class="accordion mb-2">\n\t\t<app-text class="c-settings__category accordion-item"></app-text>\n\t\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t\t<app-picture-video class="c-settings__category accordion-item"></app-picture-video>\n\t\t<app-sound class="c-settings__category accordion-item"></app-sound>\n\t\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n\t\t<div class="border-top border-light border-1"></div>\n\t</section>\n\n\t<div class="p-3">\n\t\t<button id="${PREFIX}reset-mode" type="button" class="btn btn-secondary w-100" data-i18n="resetThisMode" data-i18n-title="resetThisModeTitle"></button>\n\t</div>\n\t<p class="px-3 small text-muted">\n\t\t<a href="https://confort-plus.orange.com/#footer" id="${PREFIX}about-link"></a>.\n\t</p>\n`;

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

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Affichage" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-magnifier class="c-category__setting" data-can-edit="true"></app-magnifier>\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t\t<app-zoom class="c-category__setting" data-can-edit="true"></app-zoom>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Navigation" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>\n\t\t\t\t<app-scroll-aspect class="c-category__setting" data-can-edit="true"></app-scroll-aspect>\n\t\t\t\t<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>\n\t\t\t\t<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">\n\t\t\t<app-icon data-name="Photo_Video" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="medias"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-picture-video">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-stop-animations class="c-category__setting" data-can-edit="true"></app-stop-animations>\n\t\t\t\t<app-delete-background-images class="c-category__setting" data-can-edit="true"></app-delete-background-images>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class PictureVideoComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

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

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="d-flex flex-column gap-2">\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-capital-letters class="c-category__setting" data-can-edit="true"></app-capital-letters>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

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