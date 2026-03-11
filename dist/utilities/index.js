import { o as U, n as y, b as f } from "../_chunks/array-utility-3.0.1.js";
import { i as h, c as u } from "../_chunks/image-utility-3.0.1.js";
import { d as b } from "../_chunks/datetime-utility-3.0.1.js";
import g from "./file-utility.js";
import { r as d, c as j, h as w } from "../_chunks/clipboard-utility-3.0.1.js";
import R from "./promise-utility.js";
import L from "./string-utility.js";
const l = () => location.hostname === "localhost" || location.hostname === "127.0.0.1", C = (t) => (typeof t == "string" ? new URL(t) : t).protocol === "https:", m = (t) => {
  const o = new URL(t);
  return C(o) ? t : "https:" + t.substring(o.protocol.length);
}, H = (t) => {
  const o = m(t);
  o !== t && !l() && d(o);
}, S = (t, o = !1) => {
  const i = (s, n) => `${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`, a = (s, n) => Object.entries(s).filter((e) => o || e[1] != null).flatMap(([e, r]) => {
    const c = n ? `${n}[${e}]` : e;
    return Array.isArray(r) ? r.map((p) => i(c, p)) : typeof r == "object" && r !== null ? a(r, c) : [i(c, r)];
  });
  return a(t).join("&");
}, $ = (t = window.location.href) => {
  const o = new URL(t), i = new URLSearchParams(o.search);
  return Object.fromEntries(i.entries());
}, O = {
  isLocalHost: l,
  getHttpsUrl: m,
  forceHttps: H,
  toQueryString: S,
  getQueryStringParams: $
}, z = {
  arrayUtility: f,
  colorUtility: u,
  datetimeUtility: b,
  fileUtility: g,
  htmlUtility: w,
  httpUtility: O,
  imageUtility: h,
  numberUtility: y,
  objectUtility: U,
  promiseUtility: R,
  stringUtility: L,
  //webpackUtility,
  clipboardUtility: j
};
export {
  f as arrayUtility,
  j as clipboardUtility,
  u as colorUtility,
  b as datetimeUtility,
  z as default,
  g as fileUtility,
  w as htmlUtility,
  O as httpUtility,
  h as imageUtility,
  y as numberUtility,
  U as objectUtility,
  R as promiseUtility,
  L as stringUtility
};
