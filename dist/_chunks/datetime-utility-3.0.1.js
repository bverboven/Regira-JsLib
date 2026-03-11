const i = (t) => {
  var n = t instanceof Date ? t : new Date(t);
  return !isNaN(+n);
}, r = {
  last: (/* @__PURE__ */ new Date()).getTime(),
  log(t) {
    const n = (/* @__PURE__ */ new Date()).getTime(), e = t ? new Date(t).getTime() : this.last;
    return this.last = n, n - e;
  }
}, c = (t, n = 1e3) => {
  const e = {}, s = () => {
    let o = Math.abs(t - /* @__PURE__ */ new Date()) / 1e3;
    e.days = Math.floor(o / 86400), o -= e.days * 86400, e.hours = Math.floor(o / 3600) % 24, o -= e.hours * 3600, e.minutes = Math.floor(o / 60) % 60, o -= e.minutes * 60, e.seconds = Math.floor(o);
  };
  return setInterval(s, n), s(), e;
}, f = function(t) {
  if (!i(t))
    return "";
  const n = -t.getTimezoneOffset(), e = n / 60, s = n % 60;
  return `${e >= 0 ? "+" : "-"}${Math.abs(e).toString().padStart(2, "0")}:${Math.abs(s).toString().padStart(2, "0")}`;
}, u = function(t) {
  if (!i(t))
    return null;
  const n = t instanceof Date ? t : new Date(t), e = new Date(t instanceof Date ? t.getTime() : t), s = f(n);
  return e.setHours(n.getHours() + parseInt(s.split(":")[0])), `${e.toISOString().replace("Z", "")}${s}`;
}, l = {
  isValidDate: i,
  timer: r,
  countDown: c,
  stringifyDate: u
};
export {
  l as d,
  u as s
};
