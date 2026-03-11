import { o as p, n as U, b as f } from "../_chunks/array-utility-3.0.1.js";
import { i as y, c as h } from "../_chunks/image-utility-3.0.1.js";
import { d as u } from "../_chunks/datetime-utility-3.0.1.js";
import b from "./file-utility.js";
import { r as d, c as g, h as j } from "../_chunks/clipboard-utility-3.0.1.js";
import w from "./promise-utility.js";
import R from "./string-utility.js";
const a = () => location.hostname === "localhost" || location.hostname === "127.0.0.1", L = (t) => (typeof t == "string" ? new URL(t) : t).protocol === "https:", l = (t) => {
  const o = new URL(t);
  return L(o) ? t : "https:" + t.substring(o.protocol.length);
}, C = (t) => {
  const o = l(t);
  o !== t && !a() && d(o);
}, H = (t, o = !1) => {
  const i = (e, n) => `${encodeURIComponent(e)}=${encodeURIComponent(n)}`, c = (e, n) => Object.entries(e).filter((r) => o || r[1] != null).flatMap(([r, s]) => (r = n ? `${n}[${r}]` : r, Array.isArray(s) ? s.map((m) => i(r, m)) : typeof v == "object" ? c(s, r) : i(r, s)));
  return c(t).join("&");
}, $ = (t = window.location.href) => {
  const o = new URL(t), i = new URLSearchParams(o.search);
  return Object.fromEntries(i.entries());
}, O = {
  isLocalHost: a,
  getHttpsUrl: l,
  forceHttps: C,
  toQueryString: H,
  getQueryStringParams: $
}, x = {
  arrayUtility: f,
  colorUtility: h,
  datetimeUtility: u,
  fileUtility: b,
  htmlUtility: j,
  httpUtility: O,
  imageUtility: y,
  numberUtility: U,
  objectUtility: p,
  promiseUtility: w,
  stringUtility: R,
  //webpackUtility,
  clipboardUtility: g
};
export {
  f as arrayUtility,
  g as clipboardUtility,
  h as colorUtility,
  u as datetimeUtility,
  x as default,
  b as fileUtility,
  j as htmlUtility,
  O as httpUtility,
  y as imageUtility,
  U as numberUtility,
  p as objectUtility,
  w as promiseUtility,
  R as stringUtility
};
