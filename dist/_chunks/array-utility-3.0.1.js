import { trim as w } from "../utilities/string-utility.js";
const g = (t) => typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]", C = (t) => {
  const n = (r, s) => s === "" ? r : `${s}.${r}`, e = (r, s = "", o = {}) => {
    if (Array.isArray(r))
      for (let c = 0; c < r.length; c++)
        e(r, `${s}[${c}]`, o);
    else if (typeof r != "object")
      o[s] = r;
    else
      for (const c of Object.entries(r)) {
        const i = c[0], u = c[1];
        if (Array.isArray(u))
          for (let l in u) {
            const h = n(`${i}[${l}]`, s);
            e(u[l], h, o);
          }
        else {
          const l = n(i, s);
          typeof u == "object" && Object.keys(u).length > 0 ? e(u, l, o) : o[l] = u;
        }
      }
    return o;
  };
  return e(t);
}, W = (t, n) => n.split(".").reduce((e, r) => e == null ? null : e[r], t), nt = (t) => {
  const n = (r, s) => r.filter(s)[0], e = (r, s = []) => {
    if (r === null || typeof r != "object")
      return r;
    const o = n(s, (i) => i.original === r);
    if (o)
      return o.copy;
    if (r instanceof Date)
      return new Date(r);
    const c = Array.isArray(r) ? [] : {};
    return s.push({ original: r, copy: c }), Object.keys(r).forEach((i) => {
      c[i] = e(r[i], s);
    }), c;
  };
  return e(t);
}, x = (t, ...n) => {
  function e(s, o, c) {
    const i = s[c];
    return g(o) && g(i) ? s[c] = r(i, o) : s[c] = o, s;
  }
  function r(s, o) {
    return Object.keys(o).reduce((c, i) => e(c, o[i], i), s);
  }
  return n.reduce((s, o) => r(s, o), t);
}, D = (t) => t ? Object.keys(t).filter((n) => typeof t[n] < "u") : [], y = (t, n) => {
  const e = D(n);
  return !e.length || e.every((r) => {
    const s = n[r];
    if (typeof s == "function")
      return s.apply(t, r);
    if ((s instanceof Date || typeof s == "number") && !(r in t)) {
      const c = r[3].toLowerCase() + (r.length > 4 ? r.substring(4) : ""), i = t[c];
      if (r.startsWith("min"))
        return i >= s;
      if (r.startsWith("max"))
        return i <= s;
    }
    const o = w(r, "*");
    if (typeof s == "string" && (typeof t[o] == "string" || typeof t[o] > "u")) {
      const c = s?.toUpperCase(), i = t[o]?.toUpperCase();
      if (i == null && c != null)
        return !1;
      if (r.startsWith("*") && r.endsWith("*"))
        return i?.includes(c);
      if (r.startsWith("*"))
        return i?.endsWith(c);
      if (r.endsWith("*"))
        return i?.startsWith(c);
    }
    if (r in t) {
      const c = t[r];
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
}, p = (t, n, e) => {
  let r, s, o, c, i = 0, u = /(\d+)|(\D+)/g, l = /\d/;
  if (isFinite(e(t)) && isFinite(e(n)))
    return e(t) - e(n);
  if (r = String(e(t)).toLowerCase(), s = String(e(n)).toLowerCase(), r === s)
    return 0;
  if (!(l.test(r) && l.test(s)))
    return r > s ? 1 : -1;
  r = r.match(u), s = s.match(u);
  const h = r.length > s.length ? s.length : r.length;
  for (; i < h; )
    if (o = r[i], c = s[i++], o !== c)
      return isFinite(o) && isFinite(c) ? (o.charAt(0) === "0" && (o = "." + o), c.charAt(0) === "0" && (c = "." + c), o - c) : o > c ? 1 : -1;
  return r.length - s.length;
}, A = (t = 0, n = t) => {
  if (n === t && (t = 0), n <= t) {
    if (t === 0)
      return 0;
    const e = "Invalid input (max should be greater than min)";
    throw console.error(e, { min: t, max: n }), Error(e);
  }
  return Math.floor(Math.random() * (n - t + 1)) + t;
}, st = {
  naturalCompare: p,
  getRandom: A
}, f = (t) => t, I = (t, n, e) => {
  const r = e(t), s = e(n);
  return r < s ? -1 : r > s ? 1 : 0;
}, K = (t, n, e) => {
  const r = e(t), s = e(n);
  return r > s ? -1 : r < s ? 1 : 0;
}, b = (t) => Array.isArray(t), m = (t) => t != null && typeof t[Symbol.iterator] == "function", a = (t) => t ? b(t) ? t : m(t) ? [...t] : Object.values(t) : [], E = (t) => [...Array(t)], M = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => I(r, s, n)), e;
}, S = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => K(r, s, n)), e;
}, $ = (t, n = f) => {
  const e = [...t];
  return e.sort((r, s) => p(r, s, n)), e;
}, B = (t) => {
  const n = [...t];
  return [...Array(n.length)].map(() => {
    const e = A(n.length - 1);
    return n.splice(e, 1)[0];
  });
}, j = (t, n, e = f, r = f, s = (o) => o) => {
  const o = [], c = a(t), i = a(n);
  return c.forEach((u) => {
    i.filter((h) => e(u) === r(h)).forEach((h) => {
      o.push(s(u, h));
    });
  }), o;
}, U = (t, n) => {
  const e = a(t);
  return d(e.map(n)).map((s) => [s, e.filter((o, c, i) => s === n(o, c, i))]);
}, F = (t, n, e = f, r = f, s = (o, c) => [o, c]) => {
  const o = a(n);
  return a(t).map((c, i, u) => [c, o.filter((l, h, v) => e(c, i, u) === r(l, h, v))]).map(([c, i]) => s(c, i));
}, ot = (t, n, e = f, r = f) => {
  const s = a(n);
  return a(t).filter((o) => !s.some((c) => e(o) === r(c)));
}, V = (t, n) => {
  const e = a(t);
  return n ? e.filter(n).length : e.length;
}, J = (t, n) => {
  const e = a(t);
  return n ? e.find(n) : e[0];
}, L = (t, n) => {
  const e = a(t);
  if (!n)
    return e.length ? e[e.length - 1] : void 0;
  for (let r = e.length - 1; r >= 0; r--)
    if (n(e[r]))
      return e[r];
}, P = (t, n) => a(t).reduce((r, s) => r.some((o) => n(o) === n(s)) ? r : r.concat([s]), []), d = (t) => [...new Set(a(t))], q = (t, n) => d(a(t).concat(a(n))), z = (t, n) => a(t).slice(0, n), G = (t, n) => a(t).slice(n), H = (t, n, e = 0) => {
  const r = n * e;
  return a(t).slice(r, r + n);
}, R = (t, n) => {
  const e = a(t).length;
  return Math.ceil(e / n);
}, N = (t, n = f) => {
  const e = a(t);
  if (e.length)
    return e.reduce((r, s) => {
      const o = n(s);
      return r == null || o < r ? o : r;
    }, null);
}, Q = (t, n = f) => {
  const e = a(t);
  if (e.length)
    return e.reduce((r, s) => {
      const o = n(s);
      return r == null || o > r ? o : r;
    }, null);
}, O = (t, n) => {
  const e = n ?? f;
  return a(t).reduce((r, s) => r + e(s), 0);
}, T = (t, n) => {
  const e = a(t);
  return O(e, n) / e.length;
}, X = (t, n, e) => {
  const r = e ?? f;
  return a(t).reduce((o, c, i) => {
    const u = n(c), l = r(c, i, o);
    return o.set(u, l);
  }, /* @__PURE__ */ new Map());
}, Y = (t, n, e = !0) => {
  if (t === n)
    return !0;
  if (t == null || n == null)
    return !1;
  const r = a(t), s = a(n);
  if (r.length !== s.length)
    return !1;
  if (e) {
    for (let o = 0; o < r.length; o++)
      if (r[o] !== s[o])
        return !1;
    return !0;
  }
  return j(r, s).length === r.length;
}, Z = (t, n) => a(t).filter((r) => y(r, n)), _ = (t) => {
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
}, k = (t, n, e) => {
  const r = t.indexOf(n);
  r !== -1 && (t.splice(r, 1), t.splice(e, 0, n));
}, tt = (t, n) => {
  t.splice(0, t.length, ...n);
}, ct = {
  isArray: b,
  isIterable: m,
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
  z as a,
  ct as b,
  T as c,
  O as d,
  Q as e,
  C as f,
  nt as g,
  S as h,
  b as i,
  m as j,
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
