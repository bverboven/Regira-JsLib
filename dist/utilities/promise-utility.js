const i = (s, e = 250) => {
  let t, r = [];
  return async function() {
    const o = [...arguments];
    return clearTimeout(t), new Promise((n) => {
      r.push(n), t = setTimeout(() => {
        t = null;
        const u = s(...o);
        for (; r.length; )
          r.shift()(u);
      }, e);
    });
  };
}, a = async (s) => {
  let e = !1;
  const t = await s.reduce(async (r, o) => {
    const n = await r, u = await Promise.resolve(o()).catch((c) => (e = !0, c));
    return n.push(u), n;
  }, []);
  return e ? Promise.reject(t) : t;
}, l = (s = 1e3) => new Promise((e) => setTimeout(e, s)), m = {
  debounceToPromise: i,
  enqueue: a,
  delay: l
};
export {
  i as debounceToPromise,
  m as default,
  l as delay,
  a as enqueue
};
