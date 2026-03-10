import { startsWith as u } from "../../utilities/string-utility.js";
import { format as i, isDate as f, isValid as s } from "date-fns";
function m(r, t) {
  if (!r || (typeof r == "string" && (r = new Date(r)), !f(r) || !s(r)))
    return "";
  if (t == null)
    return r.toLocaleDateString();
  const n = (o, l = 2) => o.toString().padStart(l, "0"), e = {
    d: r.getDate(),
    dd: n(r.getDate()),
    M: r.getMonth() + 1,
    MM: n(r.getMonth() + 1),
    yy: n(r.getFullYear()),
    yyyy: n(r.getFullYear(), 4),
    h: r.getHours(),
    hh: n(r.getHours()),
    m: r.getMinutes(),
    mm: n(r.getMinutes()),
    n: r.getMilliseconds()
  };
  return t.replace(/d{1,2}|M{1,2}|yy(?:yy)?|h{1,2}|m{1,2}|n{1,4}/g, (o) => e[o]?.toString() ?? "");
}
const c = (r, t = "dd-MM-yyyy") => r ? m(r, t) : "", y = (r) => c(r, "yyyy-MM-dd"), p = (r) => c(r, "HH:mm"), M = (r, t) => r == null ? "" : (typeof r == "string" && (r = new Date(r)), r.toLocaleDateString(t)), S = (r, t) => r == null ? "" : (typeof r == "string" && (r = new Date(r)), t?.includes("US") ? i(r, "MM/dd") : i(r, "dd/MM"));
function D(r, t, n = 2, e = n) {
  return r == null ? "" : r?.toLocaleString(t, {
    minimumFractionDigits: n,
    maximumFractionDigits: e
  });
}
function h(r, t) {
  return r == null ? "" : r.toLocaleString(t, { notation: "compact" });
}
function C(r, t, n = "EUR") {
  return r == null ? "" : r.toLocaleString(t, { style: "currency", currency: n });
}
function I(r, t, n = "EUR") {
  return r == null ? "" : r.toLocaleString(t, { style: "currency", currency: n, notation: "compact" });
}
function L(r, t) {
  return r == null ? "" : (r > 1 ? r / 100 : r).toLocaleString(t, { style: "percent" });
}
const b = (r) => r == null || !(r.length === 16 && u(r, "BE", !0)) ? "" : `${r.slice(0, 4)} ${r.slice(4, 8)} ${r.slice(8, 12)} ${r.slice(12, 16)}`, w = (r) => r.replace(/\s+/gi, " ").replace(/[^a-z 0-9]+/gi, "").trim().split(" ").map((t) => t[0]).join("").toUpperCase(), x = (r) => (r || "").replace(/\n/g, "<br/>"), E = (r) => {
  if (!r)
    return r;
  const t = r.match(/\d/g);
  return t == null ? r : [t.slice(0, 3), t.slice(3, 7), t.slice(7, 12)].filter((e) => e.length > 0).map((e) => e.join("")).join("/");
};
function F(r, t) {
  if (!r || (r?.length ?? 0) <= t)
    return r;
  const n = r.lastIndexOf(" ", t) || r.lastIndexOf(",", t) || r.lastIndexOf(".", t);
  return n > -1 && (r = r.substring(0, n)), r + "...";
}
export {
  y as dateInputString,
  b as formatBankaccount,
  C as formatCurrency,
  I as formatCurrencyCompact,
  M as formatDate,
  c as formatDateTime,
  D as formatNumber,
  h as formatNumberCompact,
  L as formatPercentage,
  S as formatShortDate,
  E as formatStructuredReference,
  x as formatTextPreserveNewLines,
  p as formatTime,
  w as getInitials,
  F as shortenString
};
