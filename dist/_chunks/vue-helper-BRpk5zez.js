import { computed as r, onMounted as d, onUnmounted as s } from "vue";
function i(o, t, e = "modelValue", n) {
  return r({
    get: () => typeof o[e] < "u" ? o[e] : n,
    set: (u) => {
      t(`update:${e}`, u);
    }
  });
}
function m(o) {
  const { fromPool: t } = o;
  return r(() => (e) => t(e));
}
function c(o, t, e, n = !1) {
  t.split(" ").forEach((u) => {
    d(() => o.addEventListener(u, e, n)), s(() => o.removeEventListener(u, e, n));
  });
}
export {
  i as a,
  m as c,
  c as u
};
