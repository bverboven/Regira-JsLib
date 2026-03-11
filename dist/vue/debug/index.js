import { defineComponent as c, getCurrentInstance as i, computed as s, openBlock as a, createElementBlock as g, toDisplayString as b, createCommentVNode as p, ref as l } from "vue";
const d = {
  key: 0,
  class: "debug pre text-muted"
}, m = /* @__PURE__ */ c({
  __name: "Display",
  props: {
    modelValue: {}
  },
  setup(e) {
    const u = e, r = i(), t = s(() => !!r?.proxy?.$isDebug), o = s(() => JSON.stringify(u.modelValue || {}, null, 2));
    return (n, f) => t.value ? (a(), g("div", d, b(o.value), 1)) : p("", !0);
  }
}), y = {
  install(e, u) {
    const r = l(!!u?.isDebug), t = l(!0);
    e.component("Debug", m), Object.defineProperty(e.config.globalProperties, "$isDebug", {
      get() {
        const n = e.config.globalProperties.$router.currentRoute.value.query?.debug;
        return t.value && (typeof n < "u" ? n === "1" : r.value);
      },
      enumerable: !0,
      configurable: !0
    }), e.config.globalProperties.$setDebug = (o = !0) => t.value = o;
  }
};
export {
  m as Debug,
  y as default,
  y as plugin
};
