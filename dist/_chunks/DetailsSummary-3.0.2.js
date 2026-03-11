import { computed as u, ref as b, watch as U, onMounted as N, resolveComponent as x, openBlock as s, createElementBlock as n, Fragment as d, renderList as V, normalizeClass as k, createElementVNode as c, toDisplayString as v, createVNode as D } from "vue";
import { useRouter as E } from "vue-router";
import "./DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { u as L } from "./feedback-3.0.2.js";
function J(p, f = L()) {
  const t = E(), r = u(() => t.currentRoute.value.params.id), h = u(() => r.value === "new"), i = b(null), o = b(!1);
  function l() {
    function e(a) {
      if (!a)
        return !1;
      const _ = a.indexOf("?");
      return _ > -1 && (a = a.substring(0, _)), t.options.routes.some((O) => O.path == a && O.name?.toString().includes("Overview"));
    }
    function m() {
      const a = t.currentRoute.value;
      return t.options.routes.find((_) => _.name == a.name?.toString().replace(/Form|Fiche/, "Overview"));
    }
    const S = t.options.history.state.back?.toString();
    return e(S) ? S : m();
  }
  const w = l(), g = u(() => !!t.currentRoute.value.name?.toString().includes("Form")), y = u(() => !!t.currentRoute.value.name?.toString().includes("Fiche")), R = u(() => t.options.routes.flatMap((e) => [e, ...e.children || []]).some((e) => e.name == t.currentRoute.value.name?.toString().replace("Form", "Fiche")));
  async function F() {
    if (h.value) {
      i.value = await p.newEntity({});
      return;
    }
    o.value = !0;
    try {
      i.value = await p.details(r.value);
    } catch (e) {
      console.error(`Fetching details failed for #${r.value}`, { id: r.value, ex: e }), f.fail(`Fetching item #${r.value} failed`, e.response.status == 403 ? "Not allowed" : e.response.status == 404 ? "Not found" : e.response.data);
    } finally {
      o.value = !1;
    }
  }
  return U(t.currentRoute, async (e, m) => {
    e.name === m.name && m.params.id != "new" && e.params.id !== m.params.id && await F();
  }), N(F), {
    item: i,
    routeId: r,
    isNew: h,
    overviewUrl: w,
    isForm: g,
    isFiche: y,
    hasFiche: R,
    isLoading: o,
    feedback: f,
    load: F
  };
}
const j = { class: "details-summary" }, A = {
  key: 0,
  class: "col"
}, B = { class: "fw-bold" }, C = { class: "col fw-bold" }, I = { class: "col-12" }, M = { class: "col fw-bold" }, P = { class: "col" }, K = {
  __name: "DetailsSummary",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(p) {
    const f = p, t = u({
      get() {
        return f.modelValue;
      }
    });
    return (r, h) => {
      const i = x("DetailsSummary", !0);
      return s(), n("div", j, [
        (s(!0), n(d, null, V(t.value, (o, l, w) => (s(), n("div", {
          class: k(["row", { "bg-light": w % 2 == 0 }])
        }, [
          Array.isArray(o) ? (s(), n("div", A, [
            c("span", B, v(l), 1),
            (s(!0), n(d, null, V(t.value[l], (g, y) => (s(), n(d, null, [
              c("div", null, "(" + v(y + 1) + ".)", 1),
              D(i, {
                modelValue: g,
                class: "ms-5"
              }, null, 8, ["modelValue"])
            ], 64))), 256))
          ])) : typeof o == "object" ? (s(), n(d, { key: 1 }, [
            c("div", C, v(l), 1),
            c("div", I, [
              D(i, {
                modelValue: o,
                class: "ms-5"
              }, null, 8, ["modelValue"])
            ])
          ], 64)) : (s(), n(d, { key: 2 }, [
            c("div", M, v(l), 1),
            c("div", P, v(o), 1)
          ], 64))
        ], 2))), 256))
      ]);
    };
  }
};
export {
  K as _,
  J as u
};
