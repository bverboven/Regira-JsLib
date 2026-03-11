import { ref as f, computed as y, onMounted as re, onUnmounted as ge, watch as ne, defineComponent as _, resolveDirective as he, openBlock as r, createElementBlock as m, Fragment as z, withDirectives as q, createElementVNode as k, mergeProps as ye, withKeys as le, unref as g, withModifiers as D, isRef as _e, vModelText as be, normalizeStyle as U, normalizeClass as C, vShow as ce, renderList as se, renderSlot as b, mergeDefaults as $e, toDisplayString as W, watchEffect as ke, createTextVNode as we, getCurrentInstance as Ce, resolveComponent as O, createVNode as L, createCommentVNode as T, createBlock as j, Teleport as Se, withCtx as Ie, inject as xe } from "vue";
import { useEventListener as Ve } from "../vue-helper.js";
import { debounceToPromise as ie } from "../../utilities/promise-utility.js";
import { g as Le, c as Ee } from "../../_chunks/clipboard-utility-3.0.2.js";
import { P as Be, _ as Fe } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { B as Ht, a as Wt, p as jt } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { isEmail as De, isIP as Te, isPhone as ze } from "../../utilities/string-utility.js";
import { dateInputString as Re } from "../formatters/index.js";
import { isValid as ue } from "date-fns";
import { _ as Ae } from "../../_chunks/DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { M as Kt } from "../../_chunks/DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { a as Jt, p as Xt } from "../../_chunks/plugin-3.0.2.js";
import { p as el } from "../../_chunks/plugin-3.0.23.js";
import { F as ll, u as nl } from "../../_chunks/feedback-3.0.2.js";
import { _ as sl, a as ol, b as il, p as ul, l as rl } from "../../_chunks/plugin-3.0.22.js";
import { debounce as Ne } from "lodash";
import { useRouter as Pe } from "vue-router";
const Me = ["update:modelValue", "update:idValue", "select", "qInput"], xt = {
  idValue: [String, Number],
  modelValue: { required: !1 },
  data: { type: Array, default: () => [] },
  search: Function,
  idSelector: Function,
  displayItemFormatter: Function,
  // convert item to q (pure String)
  resultItemFormatter: Function,
  // can return HTML
  enableDblClick: { type: Boolean, default: !1 },
  resultClass: { type: String, default: "" },
  itemsClass: { type: String, default: "" },
  itemClass: { type: String, default: "" },
  maxResults: { type: Number, default: 10 },
  debounceTime: { type: Number, defaults: 250 }
}, Oe = {
  data: () => [],
  maxResults: 10,
  debounceTime: 250,
  autoSelect: !1
};
function Ge(t, { emit: s }) {
  const l = f(""), e = f(-1), n = f(t.data), a = f(!1), p = f(!1), o = f(!1), d = y({
    get: () => t.modelValue,
    set: (u) => {
      t.modelValue !== u && (s("update:modelValue", u), s("update:idValue", E(u)), s("select", u));
    }
  }), v = y(() => E(d.value)), i = f(), S = f({ top: 0, left: 0 }), w = f({ top: 0, left: 0 }), Z = f({ top: 0, left: 0 }), K = y(() => {
    const { width: u, height: c } = i.value?.getBoundingClientRect() || { width: 0, height: 0 };
    return {
      visibility: a.value ? "visible" : "hidden",
      top: `${c}px`,
      left: `${i.value?.offsetLeft || 0}px`,
      width: `${u}px`
    };
  }), E = t.idSelector || ((u) => u), R = t.resultItemFormatter || ((u, c) => (u || "").toString()), x = t.displayItemFormatter || R;
  async function G(u = "") {
    return t.data?.filter((c) => R(c, l.value).toLowerCase().startsWith(u.toLowerCase()));
  }
  async function A(u = l.value) {
    N(), o.value = !0, n.value = void 0;
    try {
      const c = await fe(u), V = t.maxResults || c.length;
      n.value = c.slice(0, V), e.value = n.value?.findIndex((ve) => E(ve) == E(d.value));
    } finally {
      o.value = !1;
    }
  }
  function M(u = !1) {
    if (d.value == null && n.value) {
      const c = n.value?.filter((V) => (x(V)?.toString() || "").toLowerCase() === l.value?.toLowerCase());
      c.length == 1 ? B(c[0]) : u && t.autoSelect && B(n.value[0]);
    }
  }
  function Q() {
    h(), A();
  }
  function J() {
    M();
  }
  function X(u, c) {
    P(), B(u, u ? c : -1);
  }
  function B(u, c) {
    if (u == null && c == null) {
      h(), l.value || P();
      return;
    }
    u && (c == null || c < 0) ? c = (n.value || []).indexOf(u) : !u && c >= 0 && (u = n.value[c]), u != null && (e.value = c, d.value = u, l.value = x(d.value));
  }
  function F(u) {
    const c = e.value + u, V = n.value[c];
    c >= 0 && c < n.value.length && B(V, c);
  }
  function h() {
    e.value = -1, d.value = void 0;
  }
  function Y() {
    l.value = "", h(), P();
  }
  function $(u) {
    let c = 0, V = 0;
    do
      c += u?.offsetTop || 0, V += u?.offsetLeft || 0, u = u?.offsetParent;
    while (u);
    return {
      top: c,
      left: V
    };
  }
  function N() {
    ee(), a.value = !0;
  }
  function P() {
    a.value = !1;
  }
  function de() {
    a.value && (M(!0), d.value == null && (l.value = ""), setTimeout(P, 250));
  }
  function me(u) {
    throw u;
  }
  const pe = t.search || t.data && G || me(new Error("prop search or data is required")), fe = ie(pe, t.debounceTime), ee = () => {
    S.value = $(i.value), Z.value = i.value ? Le(i.value) : { top: 0, left: 0 };
  }, te = ie(ee, 50);
  return Ve(window, "resize", te), re(() => {
    l.value = x(d.value), ee(), document.addEventListener("scroll", te, !0);
  }), ge(() => {
    document.removeEventListener("scroll", te, !0);
  }), ne(d, (u, c) => {
    u != c && u != d.value && B(u), u && (l.value = x(d.value));
  }), ne(l, () => s("qInput", l.value || "")), {
    q: l,
    selectedItem: d,
    selectedIndex: e,
    selectedId: v,
    items: n,
    isOpen: a,
    isFocus: p,
    isLoading: o,
    inputEl: i,
    resultOffset: w,
    resultStyle: K,
    displayItemFormatter: x,
    resultItemFormatter: R,
    handleInput: Q,
    handleChange: J,
    handleSelect: X,
    handleSearch: A,
    openResults: N,
    closeResults: P,
    closeGently: de,
    moveSelection: F,
    checkMatch: M,
    clearSelection: h,
    reset: Y
  };
}
const qe = { class: "loading list-group-item" }, Ue = ["onClick"], He = ["innerHTML"], We = {
  inheritAttrs: !1
}, Vt = /* @__PURE__ */ _({
  ...We,
  inheritAttrs: !1,
  __name: "Autocomplete",
  props: /* @__PURE__ */ $e({
    idValue: {},
    modelValue: {},
    data: {},
    maxResults: {},
    debounceTime: {},
    enableDblClick: { type: Boolean },
    autoSelect: { type: Boolean },
    allowFreeInput: { type: Boolean },
    resultClass: {},
    itemsClass: {},
    itemClass: {},
    search: { type: Function },
    idSelector: { type: Function },
    displayItemFormatter: { type: Function },
    resultItemFormatter: { type: Function }
  }, {
    ...Oe
  }),
  emits: Me,
  setup(t, { expose: s, emit: l }) {
    const e = l, n = t, {
      q: a,
      selectedItem: p,
      selectedIndex: o,
      items: d,
      isFocus: v,
      inputEl: i,
      resultStyle: S,
      isLoading: w,
      resultItemFormatter: Z,
      closeGently: K,
      moveSelection: E,
      handleInput: R,
      handleChange: x,
      handleSelect: G,
      handleSearch: A,
      reset: M
    } = Ge(n, { emit: e });
    function Q() {
      v.value = !0, ((n.idSelector && n.idSelector(p.value) || "new") == "new" || p.value == null) && A();
    }
    function J() {
      v.value = !1;
    }
    function X() {
      n.enableDblClick && A("");
    }
    function B(F) {
      F.target != i.value && K();
    }
    return s({
      inputEl: i,
      q: a,
      selectedItem: p,
      search: A,
      reset: M,
      resetQ() {
        v.value || (a.value = "");
      }
    }), (F, h) => {
      const Y = he("click-outside");
      return r(), m(z, null, [
        q(k("input", ye({
          autocomplete: "__away",
          type: "text"
        }, F.$attrs, {
          "onUpdate:modelValue": h[0] || (h[0] = ($) => _e(a) ? a.value = $ : null),
          onInput: h[1] || (h[1] = //@ts-ignore
          (...$) => g(R) && g(R)(...$)),
          onFocus: Q,
          onDblclick: X,
          onBlur: J,
          onChange: h[2] || (h[2] = //@ts-ignore
          (...$) => g(x) && g(x)(...$)),
          onKeydown: [
            h[3] || (h[3] = le(($) => g(E)(1), ["down"])),
            h[4] || (h[4] = le(($) => g(E)(-1), ["up"])),
            h[5] || (h[5] = le(D(($) => g(G)(g(p), g(o)), ["prevent"]), ["enter"]))
          ],
          ref_key: "inputEl",
          ref: i
        }), null, 16), [
          [be, g(a)]
        ]),
        q((r(), m("div", {
          class: C(["autocomplete-items bg-white border", t.resultClass]),
          style: U(g(S))
        }, [
          k("div", {
            class: C(["list-group", t.itemsClass])
          }, [
            q(k("div", qe, "Loading...", 512), [
              [ce, g(w)]
            ]),
            (r(!0), m(z, null, se(g(d), ($, N) => (r(), m("div", {
              key: N,
              onClick: (P) => g(G)($, N),
              class: C(["autocomplete-item list-group-item list-group-item-action", [t.itemClass, { "bg-light": N == g(o) }]])
            }, [
              b(F.$slots, "default", {
                item: $,
                q: g(a)
              }, () => [
                k("div", {
                  innerHTML: g(Z)($, g(a))
                }, null, 8, He)
              ])
            ], 10, Ue))), 128))
          ], 2)
        ], 6)), [
          [Y, B]
        ])
      ], 64);
    };
  }
}), je = ["href"], Lt = /* @__PURE__ */ _({
  __name: "Anchor",
  props: {
    href: {}
  },
  setup(t) {
    const s = t, l = y(() => {
      let e = s.href;
      return De(e) ? e.startsWith("mailto:") || (e = "mailto:" + e) : Te(e) ? e = "http://" + e : ze(e) ? e.startsWith("tel:") || (e = "tel:" + e) : !e.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((n) => e.startsWith(n)) && (e = "http://" + e), e;
    });
    return (e, n) => (r(), m("a", { href: l.value }, [
      b(e.$slots, "default")
    ], 8, je));
  }
}), Ze = ["value", "lang"], Et = /* @__PURE__ */ _({
  __name: "DateInput",
  props: {
    modelValue: {},
    culture: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = y(() => ue(new Date(e.modelValue || ""))), a = y(() => n.value ? Re(new Date(e.modelValue)) : e.modelValue), p = (o) => {
      const d = new Date(o.target.value);
      (!o.target.value || ue(d)) && l("update:modelValue", d || o.target.value);
    };
    return (o, d) => (r(), m("input", {
      type: "date",
      value: a.value,
      onChange: p,
      lang: t.culture,
      class: C({ "is-invalid": a.value && !n.value })
    }, null, 42, Ze));
  }
}), Bt = /* @__PURE__ */ _({
  __name: "FormLabel",
  props: {
    label: {},
    autoHide: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (s, l) => (r(), m("small", {
      class: C(["form-text text-muted", t.autoHide ? "d-none d-md-inline" : "d-inline"])
    }, W(t.label), 3));
  }
}), Ke = ["checked"], Qe = {
  name: "NullableCheckBox"
}, Ft = /* @__PURE__ */ _({
  ...Qe,
  props: {
    modelValue: { type: [Boolean, String, Number] }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = f(null), p = f(((i) => {
      if (i != null)
        return typeof i == "string" ? i === "true" ? !0 : i === "false" ? !1 : void 0 : new Boolean(i).valueOf();
    })(e.modelValue)), o = y({
      get() {
        return p.value;
      },
      set(i) {
        p.value = i, l("update:modelValue", i), l("change", { target: n.value });
      }
    }), d = y(() => ({ opacity: o.value == null ? 0.5 : 1 }));
    function v() {
      o.value = o.value == null ? !0 : o.value ? !1 : void 0;
    }
    return ke(() => n.value && (n.value.indeterminate = o.value === void 0)), (i, S) => (r(), m("input", {
      type: "checkbox",
      ref_key: "input",
      ref: n,
      onClick: v,
      "true-value": !0,
      checked: o.value,
      style: U(d.value)
    }, null, 12, Ke));
  }
}), Dt = /* @__PURE__ */ _({
  __name: "NullableLabel",
  props: {
    label: {}
  },
  setup(t) {
    return (s, l) => (r(), m("span", {
      class: C({ "italic-muted": !t.label })
    }, [
      t.label ? (r(), m(z, { key: 0 }, [
        we(W(t.label), 1)
      ], 64)) : b(s.$slots, "default", { key: 1 })
    ], 2));
  }
}), Je = { class: "form-section" }, Xe = { class: "form-section-title" }, Ye = { class: "row" }, et = { class: "p-2 mb-2" }, tt = { class: "col-auto" }, Tt = /* @__PURE__ */ _({
  __name: "FormSection",
  props: {
    title: {},
    readonly: { type: Boolean },
    showSummary: { type: Boolean },
    collapsed: { type: Boolean },
    summaryClass: {}
  },
  emits: ["expand", "collapse"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = Ce(), a = f(e.collapsed), p = f(e.readonly || e.showSummary), o = y({
      get: () => n?.slots.summary && (e.readonly || p.value),
      set: (v) => p.value = !!v
    });
    function d() {
      a.value = !a.value, a.value ? l("collapse") : l("expand");
    }
    return ne(
      () => e.collapsed,
      () => {
        a.value = e.collapsed, a.value ? l("collapse") : l("expand");
      }
    ), (v, i) => {
      const S = O("Icon");
      return r(), m("div", Je, [
        k("div", Xe, [
          b(v.$slots, "header", {
            collapsed: a.value,
            showSummary: o.value
          }, () => [
            k("div", Ye, [
              k("div", {
                class: "col",
                onClick: i[0] || (i[0] = (w) => o.value = !o.value)
              }, [
                b(v.$slots, "title", { showSummary: o.value }, () => [
                  k("h3", et, W(t.title), 1)
                ])
              ]),
              k("div", tt, [
                !t.readonly && v.$slots.summary ? (r(), m("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: i[1] || (i[1] = D((w) => o.value = !o.value, ["stop"]))
                }, [
                  L(S, {
                    name: o.value ? "look" : "edit"
                  }, null, 8, ["name"])
                ])) : T("", !0),
                k("button", {
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: D(d, ["stop"])
                }, [
                  L(S, {
                    name: a.value ? "maximize" : "minimize"
                  }, null, 8, ["name"])
                ])
              ])
            ])
          ])
        ]),
        q(k("div", {
          class: C(["form-section-body", o.value && t.summaryClass])
        }, [
          !v.$slots.summary || !o.value ? b(v.$slots, "default", {
            key: 0,
            collapsed: a.value
          }) : T("", !0),
          v.$slots.summary && o.value ? b(v.$slots, "summary", {
            key: 1,
            collapsed: a.value
          }) : T("", !0),
          b(v.$slots, "always")
        ], 2), [
          [ce, !a.value]
        ])
      ]);
    };
  }
}), zt = /* @__PURE__ */ _({
  __name: "FileDropZone",
  emits: ["drop-files"],
  setup(t, { expose: s, emit: l }) {
    const e = l, n = f();
    async function a(p) {
      e("drop-files", [...p.dataTransfer.files]);
    }
    return s({
      isDropping: n
    }), (p, o) => (r(), m("div", {
      onDrop: D(a, ["prevent"]),
      onDragover: o[0] || (o[0] = D((d) => n.value = !0, ["prevent"])),
      onDragleave: o[1] || (o[1] = D((d) => n.value = !1, ["prevent"]))
    }, [
      b(p.$slots, "default", { isDropping: n.value })
    ], 32));
  }
}), Rt = /* @__PURE__ */ _({
  __name: "CopyToClipboardButton",
  props: {
    value: {},
    timeout: { default: 2500 }
  },
  setup(t, { expose: s }) {
    const l = t, e = f();
    function n() {
      Ee(l.value ?? ""), e.value = !0, setTimeout(() => e.value = void 0, l.timeout);
    }
    return s({
      success: e
    }), (a, p) => {
      const o = O("IconButton");
      return r(), j(o, {
        icon: e.value ? "check" : "copy",
        disabled: e.value,
        onClick: n
      }, null, 8, ["icon", "disabled"]);
    };
  }
}), lt = ["src"], nt = /* @__PURE__ */ _({
  __name: "GMap",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(t) {
    const s = t, l = y(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((n) => n).join(" ")), e = y(() => `https://maps.google.com/maps?q=${encodeURIComponent(l.value)}&t=&z=${s.zoom || 10}&ie=UTF8&iwloc=&output=embed`);
    return (n, a) => (r(), m("iframe", {
      src: e.value,
      frameborder: "0",
      scrolling: "no",
      marginheight: "0",
      marginwidth: "0",
      allowfullscreen: ""
    }, null, 8, lt));
  }
}), at = ["href"], At = /* @__PURE__ */ _({
  __name: "GmapLink",
  props: {
    modelValue: {}
  },
  setup(t) {
    const s = t, l = y(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((e) => e).join(" "));
    return (e, n) => {
      const a = O("Icon");
      return r(), m("a", {
        href: `https://www.google.com/maps/?q=${l.value}`
      }, [
        L(a, { name: "map" }),
        b(e.$slots, "default")
      ], 8, at);
    };
  }
}), st = /* @__PURE__ */ _({
  __name: "ModalButton",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(t) {
    const s = t, l = y(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((n) => n).join(" ")), e = f(!1);
    return (n, a) => {
      const p = O("Icon");
      return r(), m("button", {
        type: "button",
        onClick: a[1] || (a[1] = (o) => e.value = !0)
      }, [
        b(n.$slots, "default", {}, () => [
          L(p, { name: "map" })
        ], !0),
        (r(), j(Se, { to: "#modals" }, [
          L(g(Ae), {
            "is-visible": e.value,
            title: l.value,
            "show-footer": !1,
            "full-width": !0,
            onClose: a[0] || (a[0] = (o) => e.value = !1)
          }, {
            default: Ie(() => [
              L(nt, {
                id: "gmap_canvas",
                modelValue: t.modelValue,
                zoom: t.zoom,
                class: "w-100"
              }, null, 8, ["modelValue", "zoom"])
            ]),
            _: 1
          }, 8, ["is-visible", "title"])
        ]))
      ]);
    };
  }
}), ot = (t, s) => {
  const l = t.__vccOpts || t;
  for (const [e, n] of s)
    l[e] = n;
  return l;
}, Nt = /* @__PURE__ */ ot(st, [["__scopeId", "data-v-185b1d6b"]]), it = ["src"], oe = /* @__PURE__ */ _({
  __name: "Loading",
  setup(t, { expose: s }) {
    const l = xe("loadingImg"), e = f(null);
    return s({
      imgEl: e,
      dimensions: () => [e.value?.width, e.value?.height],
      height: () => e.value?.naturalHeight
    }), (n, a) => (r(), m("img", {
      src: g(l),
      ref_key: "imgEl",
      ref: e
    }, null, 8, it));
  }
}), ut = ["disabled"], rt = /* @__PURE__ */ _({
  __name: "LoadingButton",
  props: {
    isLoading: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(t) {
    return (s, l) => (r(), m("button", {
      type: "button",
      class: "btn",
      disabled: t.disabled || t.isLoading
    }, [
      t.isLoading ? b(s.$slots, "loading", { key: 0 }, () => [
        L(oe, { style: { width: "1rem" } })
      ]) : b(s.$slots, "default", { key: 1 })
    ], 8, ut));
  }
}), ct = /* @__PURE__ */ _({
  __name: "LoadingContainer",
  props: {
    isLoading: { type: Boolean }
  },
  setup(t, { expose: s }) {
    const l = f(null), e = f(null);
    function n() {
      return e.value?.imgEl?.width;
    }
    return s({
      containerEl: l,
      loadingImgEl: e.value?.imgEl
    }), (a, p) => (r(), m("div", {
      class: "position-relative",
      style: U({ height: t.isLoading ? `${n()}px` : void 0 }),
      ref_key: "containerEl",
      ref: l
    }, [
      b(a.$slots, "loading", {}, () => [
        t.isLoading ? (r(), j(oe, {
          key: 0,
          class: "position-absolute top-0 start-50 translate-middle-x",
          style: { width: "20rem", "max-width": "100%" },
          ref_key: "loadingEl",
          ref: e
        }, null, 512)) : T("", !0)
      ]),
      k("div", {
        style: U({ opacity: t.isLoading ? "0.4" : "" })
      }, [
        b(a.$slots, "default")
      ], 4)
    ], 4));
  }
}), Pt = {
  install(t, s) {
    t.component("Loading", oe), t.component("LoadingButton", rt), t.component("LoadingContainer", ct), t.provide("loadingImg", s.img);
  }
}, Mt = {
  install(t, { defaultPageSize: s = 10 } = {}) {
    Be.PAGESIZE = s, t.component("Paging", Fe);
  }
};
function ae() {
  return [window.innerWidth, window.innerHeight];
}
const I = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
function dt() {
  const t = f(ae());
  return {
    size: t,
    screen: {
      get size() {
        return t.value;
      },
      get isExtraSmall() {
        return this.size[0] >= I.xs;
      },
      get isSmall() {
        return this.size[0] >= I.sm;
      },
      get isMedium() {
        return this.size[0] >= I.md;
      },
      get isLarge() {
        return this.size[0] >= I.lg;
      },
      get isExtraLarge() {
        return this.size[0] >= I.xl;
      },
      get isExtraExtraLarge() {
        return this.size[0] >= I.xxl;
      },
      get layout() {
        return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs";
      },
      isSize(l) {
        return this.size[0] >= I[l];
      },
      updateSize: (l = ae()) => t.value = l
    }
  };
}
const Ot = {
  install: (t, { sizes: s } = {}) => {
    if (s)
      for (const n in s)
        n in I && (I[n] = s[n]);
    const { screen: l } = dt(), e = Ne(() => l.updateSize(ae()), 250);
    window.addEventListener("resize", e), window.addEventListener("orientationchange", e), t.config.globalProperties.$screen = l, t.provide("screen", l);
  }
};
class H {
  key;
  icon;
  title;
  isDefault;
  isDisabled;
  isVisible;
  constructor(s, l = s, e = !1, n = !1, a = !0) {
    this.title = s, this.key = l, this.isDefault = e, this.isDisabled = n, this.isVisible = a;
  }
  static create(s, l) {
    return Object.assign(new H(s), l || {});
  }
}
const mt = ["href", "onClick"], pt = /* @__PURE__ */ _({
  __name: "TabNavigation",
  props: {
    tabs: {},
    activeTab: {}
  },
  emits: ["select"],
  setup(t) {
    const s = y(() => (l) => typeof l.isVisible == "function" ? l.isVisible() : l.isVisible);
    return (l, e) => {
      const n = O("Icon");
      return r(), m("ul", {
        class: C(["nav", { "nav-pills": !l.$screen?.isLarge, "nav-tabs": l.$screen?.isLarge }])
      }, [
        (r(!0), m(z, null, se(t.tabs, (a) => (r(), m(z, {
          key: a.key
        }, [
          s.value(a) ? (r(), m("li", {
            key: 0,
            class: C(["nav-item", { disabled: a.isDisabled }])
          }, [
            k("a", {
              href: `#${a.key}`,
              class: C(["py-1 px-2", "nav-link", { active: t.activeTab == a.key, disabled: a.isDisabled }]),
              onClick: D((p) => l.$emit("select", a.key), ["prevent"])
            }, [
              a.icon ? (r(), j(n, {
                key: 0,
                name: a.icon
              }, null, 8, ["name"])) : T("", !0),
              k("span", {
                class: C({ "d-none d-lg-inline ms-1": a.icon })
              }, W(a.title), 3)
            ], 10, mt)
          ], 2)) : T("", !0)
        ], 64))), 128))
      ], 2);
    };
  }
}), ft = { class: "tab-container" }, vt = {
  key: 0,
  class: "tab-content pt-2"
}, Gt = /* @__PURE__ */ _({
  __name: "TabContainer",
  props: {
    tabs: {},
    useRouteNav: { type: Boolean, default: !1 },
    active: {}
  },
  emits: ["select"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = Pe(), a = y(() => e.tabs.filter((i) => i != null).map((i) => i instanceof H ? i : new H(i))), p = y(() => (a.value.find((i) => i.isDefault) || a.value[0]).key), o = f(e.active), d = y({
      get: () => (e.useRouteNav ? n.currentRoute.value.hash?.substring(1) : o.value) || p.value,
      set: (i) => {
        const S = o.value != null;
        if (o.value = i, e.useRouteNav) {
          const w = { ...n.currentRoute.value, hash: "#" + i };
          S ? n.push(w) : n.replace(w);
        }
        l("select", i);
      }
    });
    function v(i) {
      o.value !== i && (d.value = i);
    }
    return re(() => {
      if (o.value == null && e.useRouteNav) {
        let i = (e.useRouteNav ? n.currentRoute.value.hash?.substring(1) : null) || p.value;
        v(i);
      }
    }), (i, S) => (r(), m("div", ft, [
      L(pt, {
        tabs: a.value,
        activeTab: d.value,
        onSelect: v
      }, null, 8, ["tabs", "activeTab"]),
      (r(!0), m(z, null, se(a.value, (w) => (r(), m(z, {
        key: w.key
      }, [
        d.value == w.key ? (r(), m("div", vt, [
          b(i.$slots, w.key)
        ])) : T("", !0)
      ], 64))), 128))
    ]));
  }
});
export {
  Lt as Anchor,
  Vt as Autocomplete,
  sl as BsIcon,
  Ht as ButtonType,
  Wt as ConfirmButton,
  Rt as CopyToClipboardButton,
  Et as DateInput,
  Ae as DefaultModal,
  ol as FaIcon,
  Jt as Feedback,
  ll as FeedbackStatus,
  zt as FileDropZone,
  Bt as FormLabel,
  Tt as FormSection,
  nt as GMap,
  Nt as GMapButton,
  At as GMapLink,
  il as IconButton,
  oe as Loading,
  ct as LoadingContainer,
  Kt as ModalType,
  Ft as NullableCheckBox,
  Dt as NullableLabel,
  Fe as Paging,
  H as Tab,
  Gt as TabContainer,
  Me as autocompleteEmits,
  xt as autocompleteProps,
  Xt as feedbackPlugin,
  ul as iconPlugin,
  rl as loadIcons,
  Pt as loadingPlugin,
  el as modalPlugin,
  jt as pagingDefaults,
  Mt as pagingPlugin,
  Ot as screenPlugin,
  Ge as useAutocomplete,
  nl as useFeedback,
  dt as useScreen
};
