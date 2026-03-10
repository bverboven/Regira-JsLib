import { r as h } from "./html-utility-ZF83RbzI.js";
const a = () => location.hostname === "localhost" || location.hostname === "127.0.0.1", m = (t) => (typeof t == "string" ? new URL(t) : t).protocol === "https:", p = (t) => {
  const r = new URL(t);
  return m(r) ? t : "https:" + t.substring(r.protocol.length);
}, U = (t) => {
  const r = p(t);
  r !== t && !a() && h(r);
}, f = (t, r = !1) => {
  const o = (c, e) => `${encodeURIComponent(c)}=${encodeURIComponent(e)}`, i = (c, e) => Object.entries(c).filter((n) => r || n[1] != null).flatMap(([n, s]) => (n = e ? `${e}[${n}]` : n, Array.isArray(s) ? s.map((l) => o(n, l)) : typeof v == "object" ? i(s, n) : o(n, s)));
  return i(t).join("&");
}, u = (t = window.location.href) => {
  const r = new URL(t), o = new URLSearchParams(r.search);
  return Object.fromEntries(o.entries());
}, w = {
  isLocalHost: a,
  getHttpsUrl: p,
  forceHttps: U,
  toQueryString: f,
  getQueryStringParams: u
};
export {
  w as h,
  f as t
};
