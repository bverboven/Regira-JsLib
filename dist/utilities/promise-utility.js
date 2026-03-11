const i = (s, t = 250) => {
  let e = null, r = [];
  return async function(...o) {
    return e !== null && clearTimeout(e), new Promise((n) => {
      r.push(n), e = setTimeout(() => {
        e = null;
        const u = s(...o);
        for (; r.length; )
          r.shift()(u);
      }, t);
    });
  };
}, c = async (s) => {
  let t = !1;
  const e = await s.reduce(async (r, o) => {
    const n = await r, u = await Promise.resolve(o()).catch((l) => (t = !0, l));
    return n.push(u), n;
  }, Promise.resolve([]));
  return t ? Promise.reject(e) : e;
}, a = (s = 1e3) => new Promise((t) => setTimeout(t, s)), m = {
  debounceToPromise: i,
  enqueue: c,
  delay: a
};
export {
  i as debounceToPromise,
  m as default,
  a as delay,
  c as enqueue
};
