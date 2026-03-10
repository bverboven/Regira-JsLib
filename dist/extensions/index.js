import { a as u } from "../_chunks/array-utility-CQ23W82j.js";
import t from "./date-extensions.js";
import { debounceToPromise as c, enqueue as y } from "../utilities/promise-utility.js";
const { isArray: d, isIterable: l, toArray: x, newArray: E, ...n } = u, r = {
  injectInto(e, i = !1) {
    Object.getOwnPropertyNames(n).forEach((s) => {
      s !== "constructor" && (i || !e.hasOwnProperty(s)) && Object.defineProperty(e, s, {
        value: function() {
          const a = [this, ...arguments];
          return n[s].apply(this, a);
        },
        configurable: !0
      });
    });
  },
  use(e = !1) {
    this.injectInto(Array.prototype, e);
  }
}, o = {
  use() {
    Promise.debounce = c, Promise.enqueue = y;
  }
}, P = {
  useArrayExtensions: r.use.bind(r),
  useDateExtensions: t.use.bind(t),
  usePromiseExtensions: o.use.bind(o)
};
export {
  r as arrayExtensions,
  t as dateExtensions,
  P as default,
  o as promiseExtensions
};
