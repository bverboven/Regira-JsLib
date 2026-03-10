import { trim as w } from "../utilities/string-utility.js";
const g = (t) => typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]", C = (t) => {
  const r = (n, s) => s === "" ? n : `${s}.${n}`, e = (n, s = "", o = {}) => {
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++)
        e(n, `${s}[${c}]`, o);
    else if (typeof n != "object")
      o[s] = n;
    else
      for (const c of Object.entries(n)) {
        const i = c[0], u = c[1];
        if (Array.isArray(u))
          for (let f in u) {
            const h = r(`${i}[${f}]`, s);
            e(u[f], h, o);
          }
        else {
          const f = r(i, s);
          typeof u == "object" && Object.keys(u).length > 0 ? e(u, f, o) : o[f] = u;
        }
      }
    return o;
  };
  return e(t);
}, W = (t, r) => r.split(".").reduce((e, n) => e == null ? null : e[n], t), nt = (t) => {
  const r = (n, s) => n.filter(s)[0], e = (n, s = []) => {
    if (n === null || typeof n != "object")
      return n;
    const o = r(s, (i) => i.original === n);
    if (o)
      return o.copy;
    if (n instanceof Date)
      return new Date(n);
    const c = Array.isArray(n) ? [] : {};
    return s.push({ original: n, copy: c }), Object.keys(n).forEach((i) => {
      c[i] = e(n[i], s);
    }), c;
  };
  return e(t);
}, x = (t, ...r) => {
  function e(s, o, c) {
    const i = s[c];
    return g(o) && g(i) ? s[c] = n(i, o) : s[c] = o, s;
  }
  function n(s, o) {
    return Object.keys(o).reduce((c, i) => e(c, o[i], i), s);
  }
  return r.reduce((s, o) => n(s, o), t);
}, D = (t) => t ? Object.keys(t).filter((r) => typeof t[r] < "u") : [], y = (t, r) => {
  const e = D(r);
  return !e.length || e.every((n) => {
    const s = r[n];
    if (typeof s == "function")
      return s.apply(t, n);
    if ((s instanceof Date || typeof s == "number") && !(n in t)) {
      const c = n[3].toLowerCase() + (n.length > 4 ? n.substring(4) : ""), i = t[c];
      if (n.startsWith("min"))
        return i >= s;
      if (n.startsWith("max"))
        return i <= s;
    }
    const o = w(n, "*");
    if (typeof s == "string" && (typeof t[o] == "string" || typeof t[o] > "u")) {
      const c = s?.toUpperCase(), i = t[o]?.toUpperCase();
      if (i == null && c != null)
        return !1;
      if (n.startsWith("*") && n.endsWith("*"))
        return i?.includes(c);
      if (n.startsWith("*"))
        return i?.endsWith(c);
      if (n.endsWith("*"))
        return i?.startsWith(c);
    }
    if (n in t) {
      const c = t[n];
      return Array.isArray(s) && !Array.isArray(c) ? s.some((i) => i == c) : Array.isArray(c) && !Array.isArray(s) ? c.some((i) => i == s) : Array.isArray(c) && Array.isArray(s) ? s.every((i) => c.some((u) => u == i)) : s instanceof Object ? y(c, s) : c == s;
    }
    return !0;
  });
}, et = {
  isPlainObject: g,
  flattenObject: C,
  crawlObject: W,
  mixin: x,
  filterObject: y
}, p = (t, r, e) => {
  let n, s, o, c, i = 0, u = /(\d+)|(\D+)/g, f = /\d/;
  if (isFinite(e(t)) && isFinite(e(r)))
    return e(t) - e(r);
  if (n = String(e(t)).toLowerCase(), s = String(e(r)).toLowerCase(), n === s)
    return 0;
  if (!(f.test(n) && f.test(s)))
    return n > s ? 1 : -1;
  n = n.match(u), s = s.match(u);
  const h = n.length > s.length ? s.length : n.length;
  for (; i < h; )
    if (o = n[i], c = s[i++], o !== c)
      return isFinite(o) && isFinite(c) ? (o.charAt(0) === "0" && (o = "." + o), c.charAt(0) === "0" && (c = "." + c), o - c) : o > c ? 1 : -1;
  return n.length - s.length;
}, A = (t = 0, r = t) => {
  if (r === t && (t = 0), r <= t) {
    if (t === 0)
      return 0;
    const e = "Invalid input (max should be greater than min)";
    throw console.error(e, { min: t, max: r }), Error(e);
  }
  return Math.floor(Math.random() * (r - t + 1)) + t;
}, st = {
  naturalCompare: p,
  getRandom: A
}, l = (t) => t, I = (t, r, e) => e(t) < e(r) ? -1 : e(t) > e(r) ? 1 : 0, K = (t, r, e) => e(t) > e(r) ? -1 : e(t) < e(r) ? 1 : 0, m = (t) => Array.isArray(t), b = (t) => t != null && typeof t[Symbol.iterator] == "function", a = (t) => t ? m(t) ? t : b(t) ? [...t] : Object.values(t) : [], E = (t) => [...Array(t)], M = (t, r = l) => {
  const e = [...t];
  return e.sort((n, s) => I(n, s, r)), e;
}, S = (t, r = l) => {
  const e = [...t];
  return e.sort((n, s) => K(n, s, r)), e;
}, $ = (t, r = l) => {
  const e = [...t];
  return e.sort((n, s) => p(n, s, r)), e;
}, B = (t) => {
  const r = [...t];
  return [...Array(r.length)].map(() => {
    const e = A(r.length - 1);
    return r.splice(e, 1)[0];
  });
}, j = (t, r, e = l, n = l, s = e) => {
  const o = [], c = a(t), i = a(r);
  return c.forEach((u) => {
    i.filter((h) => e(u) === n(h)).forEach((h) => {
      o.push(s(u, h));
    });
  }), o;
}, U = (t, r) => d(t.map(r)).map((n) => [n, t.filter((s, o, c) => n === r(s, o, c))]), F = (t, r, e = l, n = l, s = (o, c) => [o, c]) => {
  const o = a(r);
  return a(t).map((c, i, u) => [c, o.filter((f, h, v) => e(c, i, u) === n(f, h, v))]).map(([c, i]) => s(c, i));
}, ot = (t, r, e = l, n = l) => {
  const s = a(r);
  return a(t).filter((o) => !s.some((c) => e(o) === n(c)));
}, V = (t, r) => {
  const e = a(t);
  return r ? e.filter(r).length : e.length;
}, J = (t, r) => {
  const e = a(t);
  return r ? e.find(r) : e[0];
}, L = (t, r) => {
  const e = a(t);
  if (!r)
    return e.length ? e[e.length - 1] : void 0;
  for (let n = e.length - 1; n >= 0; n--)
    if (r(e[n]))
      return e[n];
}, P = (t, r) => a(t).reduce((n, s) => n.some((o) => r(o) === r(s)) ? n : n.concat([s]), []), d = (t) => [...new Set(t)], q = (t, r) => d(a(t).concat(a(r))), z = (t, r) => a(t).slice(0, r), G = (t, r) => a(t).slice(r), H = (t, r, e = 0) => {
  const n = r * e;
  return a(t).slice(n, n + r);
}, R = (t, r) => {
  const e = a(t).length;
  return Math.ceil(e / r);
}, N = (t, r = l) => {
  const e = a(t);
  if (e.length)
    return e.reduce((n, s) => {
      const o = r(s);
      return n == null || o < n ? o : n;
    }, null);
}, Q = (t, r = l) => {
  const e = a(t);
  if (e.length)
    return e.reduce((n, s) => {
      const o = r(s);
      return n == null || o > n ? o : n;
    }, null);
}, O = (t, r = l) => a(t).reduce((e, n) => e + r(n), 0), T = (t, r) => O(t, r) / t.length, X = (t, r, e = l) => a(t).reduce((s, o, c) => {
  const i = r(o), u = e(o, c, s);
  return s.set(i, u);
}, /* @__PURE__ */ new Map()), Y = (t, r, e = !0) => {
  if (t === r)
    return !0;
  if (t == null || r == null)
    return !1;
  const n = a(t), s = a(r);
  if (n.length !== s.length)
    return !1;
  if (e) {
    for (let o = 0; o < n.length; o++)
      if (n[o] !== s[o])
        return !1;
    return !0;
  }
  return j(n, s).length === n.length;
}, Z = (t, r) => a(t).filter((n) => y(n, r)), _ = (t) => {
  let r = 0;
  return {
    get selectedIndex() {
      return r;
    },
    set selectedIndex(e) {
      e >= 0 && e < t.length && (r = e);
    },
    get length() {
      return t.length;
    },
    get current() {
      return r >= 0 && r < t.length ? t[r] : null;
    },
    first() {
      r = 0;
    },
    previous() {
      return r > 0 && r--, r > 0;
    },
    next() {
      return r < t.length - 1 && r++, r < t.length;
    },
    last() {
      r = t.length - 1;
    }
  };
}, k = (t, r, e) => {
  const n = t.indexOf(r);
  n !== -1 && (t.splice(n, 1), t.splice(e, 0, r));
}, tt = (t, r) => {
  t.splice(0, t.length, ...r);
}, ct = {
  isArray: m,
  isIterable: b,
  toArray: a,
  newArray: E,
  orderBy: M,
  orderByDesc: S,
  naturalSort: $,
  shuffle: B,
  innerJoin: j,
  groupBy: U,
  groupJoin: F,
  count: V,
  first: J,
  last: L,
  distinctBy: P,
  distinct: d,
  union: q,
  take: z,
  skip: G,
  page: H,
  countPages: R,
  min: N,
  max: Q,
  sum: O,
  average: T,
  toMap: X,
  sameContent: Y,
  query: Z,
  getEnumerator: _,
  move: k,
  reFill: tt
};
export {
  F as A,
  j as B,
  k as C,
  $ as D,
  E,
  M as F,
  tt as G,
  Y as H,
  B as I,
  X as J,
  q as K,
  ct as a,
  z as b,
  T as c,
  O as d,
  Q as e,
  C as f,
  nt as g,
  S as h,
  m as i,
  b as j,
  d as k,
  L as l,
  N as m,
  st as n,
  et as o,
  H as p,
  Z as q,
  V as r,
  G as s,
  a as t,
  R as u,
  P as v,
  ot as w,
  J as x,
  _ as y,
  U as z
};
