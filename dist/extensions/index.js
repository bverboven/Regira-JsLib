import { b as u } from "../_chunks/array-utility-3.0.2.js";
import n from "./date-extensions.js";
import { debounceToPromise as c, enqueue as y } from "../utilities/promise-utility.js";
const { isArray: d, isIterable: p, toArray: x, newArray: E, ...m } = u, r = {
  injectInto(e, i = !1) {
    const t = m;
    Object.getOwnPropertyNames(t).forEach((s) => {
      s !== "constructor" && (i || !Object.prototype.hasOwnProperty.call(e, s)) && Object.defineProperty(e, s, {
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
}, o = {
  use() {
    Promise.debounce = c, Promise.enqueue = y;
  }
}, P = {
  useArrayExtensions: r.use.bind(r),
  useDateExtensions: n.use.bind(n),
  usePromiseExtensions: o.use.bind(o)
};
export {
  r as arrayExtensions,
  n as dateExtensions,
  P as default,
  o as promiseExtensions
};
