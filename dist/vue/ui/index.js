import { ref as v, computed as y, onMounted as re, onUnmounted as he, watch as ne, defineComponent as _, resolveDirective as ye, openBlock as c, createElementBlock as p, Fragment as z, withDirectives as q, createElementVNode as k, mergeProps as _e, withKeys as le, unref as f, withModifiers as D, isRef as be, vModelText as $e, normalizeStyle as U, normalizeClass as C, vShow as ce, renderList as se, renderSlot as b, mergeDefaults as ke, toDisplayString as W, watchEffect as we, createTextVNode as Ce, getCurrentInstance as Se, resolveComponent as O, createVNode as L, createCommentVNode as T, createBlock as j, Teleport as xe, withCtx as Ie, inject as de } from "vue";
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
const Me = ["update:modelValue", "update:idValue", "select", "qInput"], It = {
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
function Ge(t, { emit: n }) {
  const l = v(""), e = v(-1), a = v(t.data), s = v(!1), r = v(!1), o = v(!1), m = y({
    get: () => t.modelValue,
    set: (u) => {
      t.modelValue !== u && (n("update:modelValue", u), n("update:idValue", E(u)), n("select", u));
    }
  }), g = y(() => E(m.value)), i = v(), S = v({ top: 0, left: 0 }), w = v({ top: 0, left: 0 }), Z = v({ top: 0, left: 0 }), K = y(() => {
    const { width: u, height: d } = i.value?.getBoundingClientRect() || { width: 0, height: 0 };
    return {
      visibility: s.value ? "visible" : "hidden",
      top: `${d}px`,
      left: `${i.value?.offsetLeft || 0}px`,
      width: `${u}px`
    };
  }), E = t.idSelector || ((u) => u), R = t.resultItemFormatter || ((u, d) => (u || "").toString()), I = t.displayItemFormatter || R;
  async function G(u = "") {
    return t.data?.filter((d) => R(d, l.value).toLowerCase().startsWith(u.toLowerCase()));
  }
  async function A(u = l.value) {
    N(), o.value = !0, a.value = void 0;
    try {
      const d = await ve(u), V = t.maxResults || d.length;
      a.value = d.slice(0, V), e.value = a.value?.findIndex((ge) => E(ge) == E(m.value));
    } finally {
      o.value = !1;
    }
  }
  function M(u = !1) {
    if (m.value == null && a.value) {
      const d = a.value?.filter((V) => (I(V)?.toString() || "").toLowerCase() === l.value?.toLowerCase());
      d.length == 1 ? B(d[0]) : u && t.autoSelect && B(a.value[0]);
    }
  }
  function Q() {
    h(), A();
  }
  function J() {
    M();
  }
  function X(u, d) {
    P(), B(u, u ? d : -1);
  }
  function B(u, d) {
    if (u == null && d == null) {
      h(), l.value || P();
      return;
    }
    u && (d == null || d < 0) ? d = (a.value || []).indexOf(u) : !u && d >= 0 && (u = a.value[d]), u != null && (e.value = d, m.value = u, l.value = I(m.value));
  }
  function F(u) {
    const d = e.value + u, V = a.value[d];
    d >= 0 && d < a.value.length && B(V, d);
  }
  function h() {
    e.value = -1, m.value = void 0;
  }
  function Y() {
    l.value = "", h(), P();
  }
  function $(u) {
    let d = 0, V = 0;
    do
      d += u?.offsetTop || 0, V += u?.offsetLeft || 0, u = u?.offsetParent;
    while (u);
    return {
      top: d,
      left: V
    };
  }
  function N() {
    ee(), s.value = !0;
  }
  function P() {
    s.value = !1;
  }
  function me() {
    s.value && (M(!0), m.value == null && (l.value = ""), setTimeout(P, 250));
  }
  function pe(u) {
    throw u;
  }
  const fe = t.search || t.data && G || pe(new Error("prop search or data is required")), ve = ie(fe, t.debounceTime), ee = () => {
    S.value = $(i.value), Z.value = i.value ? Le(i.value) : { top: 0, left: 0 };
  }, te = ie(ee, 50);
  return Ve(window, "resize", te), re(() => {
    l.value = I(m.value), ee(), document.addEventListener("scroll", te, !0);
  }), he(() => {
    document.removeEventListener("scroll", te, !0);
  }), ne(m, (u, d) => {
    u != d && u != m.value && B(u), u && (l.value = I(m.value));
  }), ne(l, () => n("qInput", l.value || "")), {
    q: l,
    selectedItem: m,
    selectedIndex: e,
    selectedId: g,
    items: a,
    isOpen: s,
    isFocus: r,
    isLoading: o,
    inputEl: i,
    resultOffset: w,
    resultStyle: K,
    displayItemFormatter: I,
    resultItemFormatter: R,
    handleInput: Q,
    handleChange: J,
    handleSelect: X,
    handleSearch: A,
    openResults: N,
    closeResults: P,
    closeGently: me,
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
  props: /* @__PURE__ */ ke({
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
  setup(t, { expose: n, emit: l }) {
    const e = l, a = t, {
      q: s,
      selectedItem: r,
      selectedIndex: o,
      items: m,
      isFocus: g,
      inputEl: i,
      resultStyle: S,
      isLoading: w,
      resultItemFormatter: Z,
      closeGently: K,
      moveSelection: E,
      handleInput: R,
      handleChange: I,
      handleSelect: G,
      handleSearch: A,
      reset: M
    } = Ge(a, { emit: e });
    function Q() {
      g.value = !0, ((a.idSelector && a.idSelector(r.value) || "new") == "new" || r.value == null) && A();
    }
    function J() {
      g.value = !1;
    }
    function X() {
      a.enableDblClick && A("");
    }
    function B(F) {
      F.target != i.value && K();
    }
    return n({
      inputEl: i,
      q: s,
      selectedItem: r,
      search: A,
      reset: M,
      resetQ() {
        g.value || (s.value = "");
      }
    }), (F, h) => {
      const Y = ye("click-outside");
      return c(), p(z, null, [
        q(k("input", _e({
          autocomplete: "__away",
          type: "text"
        }, F.$attrs, {
          "onUpdate:modelValue": h[0] || (h[0] = ($) => be(s) ? s.value = $ : null),
          onInput: h[1] || (h[1] = //@ts-ignore
          (...$) => f(R) && f(R)(...$)),
          onFocus: Q,
          onDblclick: X,
          onBlur: J,
          onChange: h[2] || (h[2] = //@ts-ignore
          (...$) => f(I) && f(I)(...$)),
          onKeydown: [
            h[3] || (h[3] = le(($) => f(E)(1), ["down"])),
            h[4] || (h[4] = le(($) => f(E)(-1), ["up"])),
            h[5] || (h[5] = le(D(($) => f(G)(f(r), f(o)), ["prevent"]), ["enter"]))
          ],
          ref_key: "inputEl",
          ref: i
        }), null, 16), [
          [$e, f(s)]
        ]),
        q((c(), p("div", {
          class: C(["autocomplete-items bg-white border", t.resultClass]),
          style: U(f(S))
        }, [
          k("div", {
            class: C(["list-group", t.itemsClass])
          }, [
            q(k("div", qe, "Loading...", 512), [
              [ce, f(w)]
            ]),
            (c(!0), p(z, null, se(f(m), ($, N) => (c(), p("div", {
              key: N,
              onClick: (P) => f(G)($, N),
              class: C(["autocomplete-item list-group-item list-group-item-action", [t.itemClass, { "bg-light": N == f(o) }]])
            }, [
              b(F.$slots, "default", {
                item: $,
                q: f(s)
              }, () => [
                k("div", {
                  innerHTML: f(Z)($, f(s))
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
    const n = t, l = y(() => {
      let e = n.href;
      return De(e) ? e.startsWith("mailto:") || (e = "mailto:" + e) : Te(e) ? e = "http://" + e : ze(e) ? e.startsWith("tel:") || (e = "tel:" + e) : !e.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((a) => e.startsWith(a)) && (e = "http://" + e), e;
    });
    return (e, a) => (c(), p("a", { href: l.value }, [
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
  setup(t, { emit: n }) {
    const l = n, e = t, a = y(() => ue(new Date(e.modelValue || ""))), s = y(() => a.value ? Re(new Date(e.modelValue)) : e.modelValue), r = (o) => {
      const m = new Date(o.target.value);
      (!o.target.value || ue(m)) && l("update:modelValue", m || o.target.value);
    };
    return (o, m) => (c(), p("input", {
      type: "date",
      value: s.value,
      onChange: r,
      lang: t.culture,
      class: C({ "is-invalid": s.value && !a.value })
    }, null, 42, Ze));
  }
}), Bt = /* @__PURE__ */ _({
  __name: "FormLabel",
  props: {
    label: {},
    autoHide: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (n, l) => (c(), p("small", {
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
  setup(t, { emit: n }) {
    const l = n, e = t, a = v(null), r = v(((i) => {
      if (i != null)
        return typeof i == "string" ? i === "true" ? !0 : i === "false" ? !1 : void 0 : new Boolean(i).valueOf();
    })(e.modelValue)), o = y({
      get() {
        return r.value;
      },
      set(i) {
        r.value = i, l("update:modelValue", i), l("change", { target: a.value });
      }
    }), m = y(() => ({ opacity: o.value == null ? 0.5 : 1 }));
    function g() {
      o.value = o.value == null ? !0 : o.value ? !1 : void 0;
    }
    return we(() => a.value && (a.value.indeterminate = o.value === void 0)), (i, S) => (c(), p("input", {
      type: "checkbox",
      ref_key: "input",
      ref: a,
      onClick: g,
      "true-value": !0,
      checked: o.value,
      style: U(m.value)
    }, null, 12, Ke));
  }
}), Dt = /* @__PURE__ */ _({
  __name: "NullableLabel",
  props: {
    label: {}
  },
  setup(t) {
    return (n, l) => (c(), p("span", {
      class: C({ "italic-muted": !t.label })
    }, [
      t.label ? (c(), p(z, { key: 0 }, [
        Ce(W(t.label), 1)
      ], 64)) : b(n.$slots, "default", { key: 1 })
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
  setup(t, { emit: n }) {
    const l = n, e = t, a = Se(), s = v(e.collapsed), r = v(e.readonly || e.showSummary), o = y({
      get: () => a?.slots.summary && (e.readonly || r.value),
      set: (g) => r.value = !!g
    });
    function m() {
      s.value = !s.value, s.value ? l("collapse") : l("expand");
    }
    return ne(
      () => e.collapsed,
      () => {
        s.value = e.collapsed, s.value ? l("collapse") : l("expand");
      }
    ), (g, i) => {
      const S = O("Icon");
      return c(), p("div", Je, [
        k("div", Xe, [
          b(g.$slots, "header", {
            collapsed: s.value,
            showSummary: o.value
          }, () => [
            k("div", Ye, [
              k("div", {
                class: "col",
                onClick: i[0] || (i[0] = (w) => o.value = !o.value)
              }, [
                b(g.$slots, "title", { showSummary: o.value }, () => [
                  k("h3", et, W(t.title), 1)
                ])
              ]),
              k("div", tt, [
                !t.readonly && g.$slots.summary ? (c(), p("button", {
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
                  onClick: D(m, ["stop"])
                }, [
                  L(S, {
                    name: s.value ? "maximize" : "minimize"
                  }, null, 8, ["name"])
                ])
              ])
            ])
          ])
        ]),
        q(k("div", {
          class: C(["form-section-body", o.value && t.summaryClass])
        }, [
          !g.$slots.summary || !o.value ? b(g.$slots, "default", {
            key: 0,
            collapsed: s.value
          }) : T("", !0),
          g.$slots.summary && o.value ? b(g.$slots, "summary", {
            key: 1,
            collapsed: s.value
          }) : T("", !0),
          b(g.$slots, "always")
        ], 2), [
          [ce, !s.value]
        ])
      ]);
    };
  }
}), zt = /* @__PURE__ */ _({
  __name: "FileDropZone",
  emits: ["drop-files"],
  setup(t, { expose: n, emit: l }) {
    const e = l, a = v();
    async function s(r) {
      e("drop-files", [...r.dataTransfer.files]);
    }
    return n({
      isDropping: a
    }), (r, o) => (c(), p("div", {
      onDrop: D(s, ["prevent"]),
      onDragover: o[0] || (o[0] = D((m) => a.value = !0, ["prevent"])),
      onDragleave: o[1] || (o[1] = D((m) => a.value = !1, ["prevent"]))
    }, [
      b(r.$slots, "default", { isDropping: a.value })
    ], 32));
  }
}), Rt = /* @__PURE__ */ _({
  __name: "CopyToClipboardButton",
  props: {
    value: {},
    timeout: { default: 2500 }
  },
  setup(t, { expose: n }) {
    const l = t, e = v();
    function a() {
      Ee(l.value ?? ""), e.value = !0, setTimeout(() => e.value = void 0, l.timeout);
    }
    return n({
      success: e
    }), (s, r) => {
      const o = O("IconButton");
      return c(), j(o, {
        icon: e.value ? "check" : "copy",
        disabled: e.value,
        onClick: a
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
    const n = t, l = y(() => (Array.isArray(n.modelValue) ? n.modelValue : [n.modelValue]).filter((a) => a).join(" ")), e = y(() => `https://maps.google.com/maps?q=${encodeURIComponent(l.value)}&t=&z=${n.zoom || 10}&ie=UTF8&iwloc=&output=embed`);
    return (a, s) => (c(), p("iframe", {
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
    const n = t, l = y(() => (Array.isArray(n.modelValue) ? n.modelValue : [n.modelValue]).filter((e) => e).join(" "));
    return (e, a) => {
      const s = O("Icon");
      return c(), p("a", {
        href: `https://www.google.com/maps/?q=${l.value}`
      }, [
        L(s, { name: "map" }),
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
    const n = t, l = y(() => (Array.isArray(n.modelValue) ? n.modelValue : [n.modelValue]).filter((a) => a).join(" ")), e = v(!1);
    return (a, s) => {
      const r = O("Icon");
      return c(), p("button", {
        type: "button",
        onClick: s[1] || (s[1] = (o) => e.value = !0)
      }, [
        b(a.$slots, "default", {}, () => [
          L(r, { name: "map" })
        ], !0),
        (c(), j(xe, { to: "#modals" }, [
          L(f(Ae), {
            "is-visible": e.value,
            title: l.value,
            "show-footer": !1,
            "full-width": !0,
            onClose: s[0] || (s[0] = (o) => e.value = !1)
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
}), ot = (t, n) => {
  const l = t.__vccOpts || t;
  for (const [e, a] of n)
    l[e] = a;
  return l;
}, Nt = /* @__PURE__ */ ot(st, [["__scopeId", "data-v-185b1d6b"]]), it = ["src"], oe = /* @__PURE__ */ _({
  __name: "Loading",
  setup(t, { expose: n }) {
    const l = de("loadingImg"), e = v(null);
    return n({
      imgEl: e,
      dimensions: () => [e.value?.width, e.value?.height],
      height: () => e.value?.naturalHeight
    }), (a, s) => (c(), p("img", {
      src: f(l),
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
    return (n, l) => (c(), p("button", {
      type: "button",
      class: "btn",
      disabled: t.disabled || t.isLoading
    }, [
      t.isLoading ? b(n.$slots, "loading", { key: 0 }, () => [
        L(oe, { style: { width: "1rem" } })
      ]) : b(n.$slots, "default", { key: 1 })
    ], 8, ut));
  }
}), ct = /* @__PURE__ */ _({
  __name: "LoadingContainer",
  props: {
    isLoading: { type: Boolean }
  },
  setup(t, { expose: n }) {
    const l = v(null), e = v(null);
    function a() {
      return e.value?.imgEl?.width;
    }
    return n({
      containerEl: l,
      loadingImgEl: e.value?.imgEl
    }), (s, r) => (c(), p("div", {
      class: "position-relative",
      style: U({ height: t.isLoading ? `${a()}px` : void 0 }),
      ref_key: "containerEl",
      ref: l
    }, [
      b(s.$slots, "loading", {}, () => [
        t.isLoading ? (c(), j(oe, {
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
        b(s.$slots, "default")
      ], 4)
    ], 4));
  }
}), Pt = {
  install(t, n) {
    t.component("Loading", oe), t.component("LoadingButton", rt), t.component("LoadingContainer", ct), t.provide("loadingImg", n.img);
  }
}, Mt = {
  install(t, { defaultPageSize: n = 10 } = {}) {
    Be.PAGESIZE = n, t.component("Paging", Fe);
  }
};
function ae() {
  return [window.innerWidth, window.innerHeight];
}
const x = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
function dt() {
  const t = v(ae());
  return {
    size: t,
    screen: {
      get size() {
        return t.value;
      },
      get isExtraSmall() {
        return this.size[0] >= x.xs;
      },
      get isSmall() {
        return this.size[0] >= x.sm;
      },
      get isMedium() {
        return this.size[0] >= x.md;
      },
      get isLarge() {
        return this.size[0] >= x.lg;
      },
      get isExtraLarge() {
        return this.size[0] >= x.xl;
      },
      get isExtraExtraLarge() {
        return this.size[0] >= x.xxl;
      },
      get layout() {
        return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs";
      },
      isSize(l) {
        return this.size[0] >= x[l];
      },
      updateSize: (l = ae()) => t.value = l
    }
  };
}
const Ot = {
  install: (t, { sizes: n } = {}) => {
    if (n)
      for (const a in n)
        a in x && (x[a] = n[a]);
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
  constructor(n, l = n, e = !1, a = !1, s = !0) {
    this.title = n, this.key = l, this.isDefault = e, this.isDisabled = a, this.isVisible = s;
  }
  static create(n, l) {
    return Object.assign(new H(n), l || {});
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
    const n = de("screen"), l = y(() => (e) => typeof e.isVisible == "function" ? e.isVisible() : e.isVisible);
    return (e, a) => {
      const s = O("Icon");
      return c(), p("ul", {
        class: C(["nav", { "nav-pills": !f(n)?.isLarge, "nav-tabs": f(n)?.isLarge }])
      }, [
        (c(!0), p(z, null, se(t.tabs, (r) => (c(), p(z, {
          key: r.key
        }, [
          l.value(r) ? (c(), p("li", {
            key: 0,
            class: C(["nav-item", { disabled: r.isDisabled }])
          }, [
            k("a", {
              href: `#${r.key}`,
              class: C(["py-1 px-2", "nav-link", { active: t.activeTab == r.key, disabled: r.isDisabled }]),
              onClick: D((o) => e.$emit("select", r.key), ["prevent"])
            }, [
              r.icon ? (c(), j(s, {
                key: 0,
                name: r.icon
              }, null, 8, ["name"])) : T("", !0),
              k("span", {
                class: C({ "d-none d-lg-inline ms-1": r.icon })
              }, W(r.title), 3)
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
  setup(t, { emit: n }) {
    const l = n, e = t, a = Pe(), s = y(() => e.tabs.filter((i) => i != null).map((i) => i instanceof H ? i : new H(i))), r = y(() => (s.value.find((i) => i.isDefault) || s.value[0]).key), o = v(e.active), m = y({
      get: () => (e.useRouteNav ? a.currentRoute.value.hash?.substring(1) : o.value) || r.value,
      set: (i) => {
        const S = o.value != null;
        if (o.value = i, e.useRouteNav) {
          const w = { ...a.currentRoute.value, hash: "#" + i };
          S ? a.push(w) : a.replace(w);
        }
        l("select", i);
      }
    });
    function g(i) {
      o.value !== i && (m.value = i);
    }
    return re(() => {
      if (o.value == null && e.useRouteNav) {
        let i = (e.useRouteNav ? a.currentRoute.value.hash?.substring(1) : null) || r.value;
        g(i);
      }
    }), (i, S) => (c(), p("div", ft, [
      L(pt, {
        tabs: s.value,
        activeTab: m.value,
        onSelect: g
      }, null, 8, ["tabs", "activeTab"]),
      (c(!0), p(z, null, se(s.value, (w) => (c(), p(z, {
        key: w.key
      }, [
        m.value == w.key ? (c(), p("div", vt, [
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
  It as autocompleteProps,
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
