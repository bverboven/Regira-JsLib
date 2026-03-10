import { defineComponent as s, computed as c, openBlock as i, createElementBlock as a, toDisplayString as g, createCommentVNode as b, ref as l } from "vue";
const d = {
  key: 0,
  class: "debug pre text-muted"
}, m = /* @__PURE__ */ s({
  __name: "Display",
  props: {
    modelValue: {}
  },
  setup(e) {
    const o = e, u = c(() => JSON.stringify(o.modelValue || {}, null, 2));
    return (t, r) => t.$isDebug ? (i(), a("div", d, g(u.value), 1)) : b("", !0);
  }
}), f = {
  install(e, o) {
    const u = l(!!o?.isDebug), t = l(!0);
    e.component("Debug", m), Object.defineProperty(e.config.globalProperties, "$isDebug", {
      get() {
        const n = e.config.globalProperties.$router.currentRoute.value.query?.debug;
        return t.value && (typeof n < "u" ? n === "1" : u.value);
      },
      enumerable: !0,
      configurable: !0
    }), e.config.globalProperties.$setDebug = (r = !0) => t.value = r;
  }
};
export {
  m as Debug,
  f as default,
  f as plugin
};
