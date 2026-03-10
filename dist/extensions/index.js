import { a as u } from "../_chunks/array-utility-vRAWSlLj.js";
import { s as c } from "../_chunks/datetime-utility-Ca9RTNE1.js";
import { d as y, e as f } from "../_chunks/promise-utility-CiVTwK8o.js";
const { isArray: l, isIterable: p, toArray: x, newArray: E, ...t } = u, n = {
  injectInto(e, i = !1) {
    Object.getOwnPropertyNames(t).forEach((s) => {
      s !== "constructor" && (i || !e.hasOwnProperty(s)) && Object.defineProperty(e, s, {
        value: function() {
          const a = [this, ...arguments];
          return t[s].apply(this, a);
        },
        configurable: !0
      });
    });
  },
  use(e = !1) {
    this.injectInto(Array.prototype, e);
  }
}, r = {
  use() {
    Date.prototype.toJSON = function() {
      return c(this);
    };
  }
}, o = {
  use() {
    Promise.debounce = y, Promise.enqueue = f;
  }
}, P = {
  useArrayExtensions: n.use.bind(n),
  useDateExtensions: r.use.bind(r),
  usePromiseExtensions: o.use.bind(o)
};
export {
  n as arrayExtensions,
  r as dateExtensions,
  P as default,
  o as promiseExtensions
};
