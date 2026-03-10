import { computed as r, onMounted as d, onUnmounted as f } from "vue";
function s(o, t, e = "modelValue", n) {
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
    d(() => o.addEventListener(u, e, n)), f(() => o.removeEventListener(u, e, n));
  });
}
export {
  m as createFromComputedPool,
  c as useEventListener,
  s as useVModelField
};
