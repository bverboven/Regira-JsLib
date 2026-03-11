import { trim as W } from "../utilities/string-utility.js";
const y = (t) => typeof t == "object" && t !== null && Object.prototype.toString.call(t) === "[object Object]", M = (t) => {
  const n = (r, s) => s === "" ? r : `${s}.${r}`, e = (r, s = "", o = {}) => {
    if (Array.isArray(r))
      for (let c = 0; c < r.length; c++)
        e(r, `${s}[${c}]`, o);
    else if (typeof r != "object")
      o[s] = r;
    else
      for (const c of Object.entries(r)) {
        const a = c[0], u = c[1];
        if (Array.isArray(u))
          for (let l in u) {
            const h = n(`${a}[${l}]`, s);
            e(u[l], h, o);
          }
        else {
          const l = n(a, s);
          typeof u == "object" && u !== null && Object.keys(u).length > 0 ? e(u, l, o) : o[l] = u;
        }
      }
    return o;
  };
  return e(t);
}, x = (t, n) => n.split(".").reduce((e, r) => e == null ? null : e[r], t), ot = (t) => {
  const n = (r, s) => r.filter(s)[0], e = (r, s = []) => {
    if (r === null || typeof r != "object")
      return r;
    const o = n(s, (a) => a.original === r);
    if (o)
      return o.copy;
    if (r instanceof Date)
      return new Date(r);
    const c = Array.isArray(r) ? [] : {};
    return s.push({ original: r, copy: c }), Object.keys(r).forEach((a) => {
      c[a] = e(r[a], s);
    }), c;
  };
  return e(t);
}, D = (t, ...n) => {
  function e(s, o, c) {
    const a = s[c];
    return y(o) && y(a) ? s[c] = r(a, o) : s[c] = o, s;
  }
  function r(s, o) {
    return Object.keys(o).reduce((c, a) => e(c, o[a], a), s);
  }
  return n.reduce((s, o) => r(s, o), t);
}, I = (t) => t ? Object.keys(t).filter((n) => typeof t[n] < "u") : [], p = (t, n) => {
  const e = I(n);
  return !e.length || e.every((r) => {
    const s = n[r];
    if (typeof s == "function")
      return s.apply(t, [r]);
    if ((s instanceof Date || typeof s == "number") && !(r in t)) {
      const c = r[3].toLowerCase() + (r.length > 4 ? r.substring(4) : ""), a = t[c];
      if (r.startsWith("min"))
        return a >= s;
      if (r.startsWith("max"))
        return a <= s;
    }
    const o = W(r, "*");
    if (typeof s == "string" && (typeof t[o] == "string" || typeof t[o] > "u")) {
      const c = s?.toUpperCase(), a = t[o]?.toUpperCase();
      if (a == null && c != null)
        return !1;
      if (r.startsWith("*") && r.endsWith("*"))
        return a?.includes(c) ?? !1;
      if (r.startsWith("*"))
        return a?.endsWith(c) ?? !1;
      if (r.endsWith("*"))
        return a?.startsWith(c) ?? !1;
    }
    if (r in t) {
      const c = t[r];
      return Array.isArray(s) && !Array.isArray(c) ? s.some((a) => a == c) : Array.isArray(c) && !Array.isArray(s) ? c.some((a) => a == s) : Array.isArray(c) && Array.isArray(s) ? s.every((a) => c.some((u) => u == a)) : s instanceof Object ? p(c, s) : c == s;
    }
    return !0;
  });
}, ct = {
  isPlainObject: y,
  flattenObject: M,
  crawlObject: x,
  mixin: D,
  filterObject: p
}, b = (t, n, e) => {
  let r, s, o = 0;
  const c = /(\d+)|(\D+)/g, a = /\d/;
  if (isFinite(Number(e(t))) && isFinite(Number(e(n))))
    return Number(e(t)) - Number(e(n));
  const u = String(e(t)).toLowerCase(), l = String(e(n)).toLowerCase();
  if (u === l)
    return 0;
  if (!(a.test(u) && a.test(l)))
    return u > l ? 1 : -1;
  const h = u.match(c) ?? [], g = l.match(c) ?? [], w = h.length > g.length ? g.length : h.length;
  for (; o < w; )
    if (r = h[o], s = g[o++], r !== s)
      if (isFinite(Number(r)) && isFinite(Number(s))) {
        const C = r.charAt(0) === "0" ? +("." + r) : Number(r), N = s.charAt(0) === "0" ? +("." + s) : Number(s);
        return C - N;
      } else
        return r > s ? 1 : -1;
  return h.length - g.length;
}, A = (t = 0, n = t) => {
  if (n === t && (t = 0), n <= t) {
    if (t === 0)
      return 0;
    const e = "Invalid input (max should be greater than min)";
    throw console.error(e, { min: t, max: n }), Error(e);
  }
  return Math.floor(Math.random() * (n - t + 1)) + t;
}, at = {
  naturalCompare: b,
  getRandom: A
}, f = (t) => t, K = (t, n, e) => {
  const r = e(t), s = e(n);
  return r < s ? -1 : r > s ? 1 : 0;
}, E = (t, n, e) => {
  const r = e(t), s = e(n);
  return r > s ? -1 : r < s ? 1 : 0;
}, m = (t) => Array.isArray(t), O = (t) => t != null && typeof t[Symbol.iterator] == "function", i = (t) => t ? m(t) ? t : O(t) ? [...t] : Object.values(t) : [], S = (t) => [...Array(t)], $ = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => K(r, s, n)), e;
}, B = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => E(r, s, n)), e;
}, U = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => b(r, s, n)), e;
}, F = (t) => {
  const n = [...t];
  return [...Array(n.length)].map(() => {
    const e = A(n.length - 1);
    return n.splice(e, 1)[0];
  });
}, j = (t, n, e = f, r = f, s = (o) => o) => {
  const o = [], c = i(t), a = i(n);
  return c.forEach((u) => {
    a.filter((h) => e(u) === r(h)).forEach((h) => {
      o.push(s(u, h));
    });
  }), o;
}, P = (t, n) => {
  const e = i(t);
  return d(e.map(n)).map((s) => [s, e.filter((o, c, a) => s === n(o, c, a))]);
}, V = (t, n, e = f, r = f, s = (o, c) => [o, c]) => {
  const o = i(n);
  return i(t).map((c, a, u) => [c, o.filter((l, h, g) => e(c, a, u) === r(l, h, g))]).map(([c, a]) => s(c, a));
}, it = (t, n, e = f, r = f) => {
  const s = i(n);
  return i(t).filter((o) => !s.some((c) => e(o) === r(c)));
}, J = (t, n) => {
  const e = i(t);
  return n ? e.filter(n).length : e.length;
}, L = (t, n) => {
  const e = i(t);
  return n ? e.find(n) : e[0];
}, q = (t, n) => {
  const e = i(t);
  if (!n)
    return e.length ? e[e.length - 1] : void 0;
  for (let r = e.length - 1; r >= 0; r--)
    if (n(e[r]))
      return e[r];
}, z = (t, n) => i(t).reduce((r, s) => r.some((o) => n(o) === n(s)) ? r : r.concat([s]), []), d = (t) => [...new Set(i(t))], G = (t, n) => d(i(t).concat(i(n))), H = (t, n) => i(t).slice(0, n), R = (t, n) => i(t).slice(n), Q = (t, n, e = 0) => {
  const r = n * e;
  return i(t).slice(r, r + n);
}, T = (t, n) => {
  const e = i(t).length;
  return Math.ceil(e / n);
}, X = (t, n = f) => {
  const e = i(t);
  if (e.length)
    return e.reduce((r, s) => {
      const o = n(s);
      return r == null || o < r ? o : r;
    }, null);
}, Y = (t, n = f) => {
  const e = i(t);
  if (e.length)
    return e.reduce((r, s) => {
      const o = n(s);
      return r == null || o > r ? o : r;
    }, null);
}, v = (t, n) => {
  const e = n ?? f;
  return i(t).reduce((r, s) => r + e(s), 0);
}, Z = (t, n) => {
  const e = i(t);
  return v(e, n) / e.length;
}, _ = (t, n, e) => {
  const r = e ?? f;
  return i(t).reduce((o, c, a) => {
    const u = n(c), l = r(c, a, o);
    return o.set(u, l);
  }, /* @__PURE__ */ new Map());
}, k = (t, n, e = !0) => {
  if (t === n)
    return !0;
  if (t == null || n == null)
    return !1;
  const r = i(t), s = i(n);
  if (r.length !== s.length)
    return !1;
  if (e) {
    for (let o = 0; o < r.length; o++)
      if (r[o] !== s[o])
        return !1;
    return !0;
  }
  return j(r, s).length === r.length;
}, tt = (t, n) => i(t).filter((r) => p(r, n)), rt = (t) => {
  let n = 0;
  return {
    get selectedIndex() {
      return n;
    },
    set selectedIndex(e) {
      e >= 0 && e < t.length && (n = e);
    },
    get length() {
      return t.length;
    },
    get current() {
      return n >= 0 && n < t.length ? t[n] : null;
    },
    first() {
      n = 0;
    },
    previous() {
      return n > 0 && n--, n > 0;
    },
    next() {
      return n < t.length - 1 && n++, n < t.length;
    },
    last() {
      n = t.length - 1;
    }
  };
}, nt = (t, n, e) => {
  const r = t.indexOf(n);
  r !== -1 && (t.splice(r, 1), t.splice(e, 0, n));
}, et = (t, n) => {
  t.splice(0, t.length, ...n);
}, ut = {
  isArray: m,
  isIterable: O,
  toArray: i,
  newArray: S,
  orderBy: $,
  orderByDesc: B,
  naturalSort: U,
  shuffle: F,
  innerJoin: j,
  groupBy: P,
  groupJoin: V,
  count: J,
  first: L,
  last: q,
  distinctBy: z,
  distinct: d,
  union: G,
  take: H,
  skip: R,
  page: Q,
  countPages: T,
  min: X,
  max: Y,
  sum: v,
  average: Z,
  toMap: _,
  sameContent: k,
  query: tt,
  getEnumerator: rt,
  move: nt,
  reFill: et
};
export {
  j as A,
  nt as B,
  U as C,
  S as D,
  $ as E,
  et as F,
  k as G,
  F as H,
  v as I,
  _ as J,
  G as K,
  H as a,
  ut as b,
  Z as c,
  Y as d,
  ot as e,
  M as f,
  B as g,
  O as h,
  m as i,
  d as j,
  J as k,
  q as l,
  X as m,
  at as n,
  ct as o,
  Q as p,
  tt as q,
  T as r,
  R as s,
  i as t,
  z as u,
  it as v,
  L as w,
  rt as x,
  P as y,
  V as z
};
