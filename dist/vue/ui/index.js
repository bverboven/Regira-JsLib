import { ref as f, computed as h, onMounted as ce, onUnmounted as ge, watch as ne, defineComponent as y, resolveDirective as he, openBlock as r, createElementBlock as m, Fragment as R, withDirectives as G, createElementVNode as k, mergeProps as ye, withKeys as le, unref as v, withModifiers as T, isRef as _e, vModelText as be, normalizeStyle as q, normalizeClass as S, vShow as de, renderList as se, renderSlot as _, mergeDefaults as $e, toDisplayString as H, watchEffect as ke, createTextVNode as we, getCurrentInstance as Ce, resolveComponent as M, createVNode as B, createCommentVNode as z, createBlock as W, Teleport as Se, withCtx as Ie, inject as xe } from "vue";
import { useEventListener as Ve } from "../vue-helper.js";
import { debounceToPromise as ue } from "../../utilities/promise-utility.js";
import { g as Le } from "../../_chunks/html-utility-ZF83RbzI.js";
import { P as Ee, _ as Be } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-DT5LiBU_.js";
import { B as Wt, a as jt, p as Zt } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-DT5LiBU_.js";
import { isEmail as Fe, isIP as De, isPhone as Te } from "../../utilities/string-utility.js";
import { dateInputString as ze } from "../formatters/index.js";
import { isValid as re } from "date-fns";
import { c as Re } from "../../_chunks/clipboard-utility-B-2qZeP-.js";
import { _ as Ae } from "../../_chunks/DefaultModal.vue_vue_type_script_setup_true_lang-CBGcVDV7.js";
import { M as Qt } from "../../_chunks/DefaultModal.vue_vue_type_script_setup_true_lang-CBGcVDV7.js";
import { a as Xt, p as Yt } from "../../_chunks/plugin-Gvzd53hc.js";
import { p as tl } from "../../_chunks/plugin-D2fYWG2x.js";
import { F as nl, u as al } from "../../_chunks/feedback-BaiYl2jA.js";
import { _ as ol, a as il, b as ul, p as rl, l as cl } from "../../_chunks/plugin-4MCbDuj2.js";
import { debounce as Ne } from "lodash";
import { useRouter as Pe } from "vue-router";
const Me = ["update:modelValue", "update:idValue", "select", "qInput"], Vt = {
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
  const l = f(""), e = f(-1), n = f(t.data), a = f(!1), p = f(!1), o = f(!1), d = h({
    get: () => t.modelValue,
    set: (u) => {
      t.modelValue !== u && (s("update:modelValue", u), s("update:idValue", A(u)), s("select", u));
    }
  }), g = h(() => A(d.value)), i = f(), w = f({ top: 0, left: 0 }), C = f({ top: 0, left: 0 }), j = f({ top: 0, left: 0 }), Z = h(() => {
    const { width: u, height: c } = i.value?.getBoundingClientRect() || { width: 0, height: 0 };
    return {
      visibility: a.value ? "visible" : "hidden",
      top: `${c}px`,
      left: `${i.value?.offsetLeft || 0}px`,
      width: `${u}px`
    };
  }), A = t.idSelector || ((u) => u), N = t.resultItemFormatter || ((u, c) => (u || "").toString()), L = t.displayItemFormatter || N;
  async function O(u = "") {
    return t.data?.filter((c) => N(c, l.value).toLowerCase().startsWith(u.toLowerCase()));
  }
  async function P(u = l.value) {
    b(), o.value = !0, n.value = void 0;
    try {
      const c = await fe(u), E = t.maxResults || c.length;
      n.value = c.slice(0, E), e.value = n.value?.findIndex((ve) => A(ve) == A(d.value));
    } finally {
      o.value = !1;
    }
  }
  function F(u = !1) {
    if (d.value == null && n.value) {
      const c = n.value?.filter((E) => (L(E)?.toString() || "").toLowerCase() === l.value?.toLowerCase());
      c.length == 1 ? D(c[0]) : u && t.autoSelect && D(n.value[0]);
    }
  }
  function K() {
    I(), P();
  }
  function Q() {
    F();
  }
  function J(u, c) {
    x(), D(u, u ? c : -1);
  }
  function D(u, c) {
    if (u == null && c == null) {
      I(), l.value || x();
      return;
    }
    u && (c == null || c < 0) ? c = (n.value || []).indexOf(u) : !u && c >= 0 && (u = n.value[c]), u != null && (e.value = c, d.value = u, l.value = L(d.value));
  }
  function X(u) {
    const c = e.value + u, E = n.value[c];
    c >= 0 && c < n.value.length && D(E, c);
  }
  function I() {
    e.value = -1, d.value = void 0;
  }
  function $() {
    l.value = "", I(), x();
  }
  function Y(u) {
    let c = 0, E = 0;
    do
      c += u?.offsetTop || 0, E += u?.offsetLeft || 0, u = u?.offsetParent;
    while (u);
    return {
      top: c,
      left: E
    };
  }
  function b() {
    ee(), a.value = !0;
  }
  function x() {
    a.value = !1;
  }
  function ie() {
    a.value && (F(!0), d.value == null && (l.value = ""), setTimeout(x, 250));
  }
  function me(u) {
    throw u;
  }
  const pe = t.search || t.data && O || me(new Error("prop search or data is required")), fe = ue(pe, t.debounceTime), ee = () => {
    w.value = Y(i.value), j.value = i.value ? Le(i.value) : { top: 0, left: 0 };
  }, te = ue(ee, 50);
  return Ve(window, "resize", te), ce(() => {
    l.value = L(d.value), ee(), document.addEventListener("scroll", te, !0);
  }), ge(() => {
    document.removeEventListener("scroll", te, !0);
  }), ne(d, (u, c) => {
    u != c && u != d.value && D(u), u && (l.value = L(d.value));
  }), ne(l, () => s("qInput", l.value || "")), {
    q: l,
    selectedItem: d,
    selectedIndex: e,
    selectedId: g,
    items: n,
    isOpen: a,
    isFocus: p,
    isLoading: o,
    inputEl: i,
    resultOffset: C,
    resultStyle: Z,
    displayItemFormatter: L,
    resultItemFormatter: N,
    handleInput: K,
    handleChange: Q,
    handleSelect: J,
    handleSearch: P,
    openResults: b,
    closeResults: x,
    closeGently: ie,
    moveSelection: X,
    checkMatch: F,
    clearSelection: I,
    reset: $
  };
}
const qe = { class: "loading list-group-item" }, Ue = ["onClick"], He = ["innerHTML"], We = {
  inheritAttrs: !1
}, Lt = /* @__PURE__ */ y({
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
      isOpen: g,
      isFocus: i,
      inputEl: w,
      resultStyle: C,
      isLoading: j,
      resultItemFormatter: Z,
      closeGently: A,
      moveSelection: N,
      handleInput: L,
      handleChange: O,
      handleSelect: P,
      handleSearch: F,
      reset: K
    } = Ge(n, { emit: e });
    function Q() {
      i.value = !0, ((n.idSelector && n.idSelector(p.value) || "new") == "new" || p.value == null) && F();
    }
    function J() {
      i.value = !1;
    }
    function D() {
      n.enableDblClick && F("");
    }
    function X(I) {
      I.target != w.value && A();
    }
    return s({
      inputEl: w,
      q: a,
      selectedItem: p,
      search: F,
      reset: K,
      resetQ() {
        i.value || (a.value = "");
      }
    }), (I, $) => {
      const Y = he("click-outside");
      return r(), m(R, null, [
        G(k("input", ye({
          autocomplete: "__away",
          type: "text"
        }, I.$attrs, {
          "onUpdate:modelValue": $[0] || ($[0] = (b) => _e(a) ? a.value = b : null),
          onInput: $[1] || ($[1] = //@ts-ignore
          (...b) => v(L) && v(L)(...b)),
          onFocus: Q,
          onDblclick: D,
          onBlur: J,
          onChange: $[2] || ($[2] = //@ts-ignore
          (...b) => v(O) && v(O)(...b)),
          onKeydown: [
            $[3] || ($[3] = le((b) => v(N)(1), ["down"])),
            $[4] || ($[4] = le((b) => v(N)(-1), ["up"])),
            $[5] || ($[5] = le(T((b) => v(P)(v(p), v(o)), ["prevent"]), ["enter"]))
          ],
          ref_key: "inputEl",
          ref: w
        }), null, 16), [
          [be, v(a)]
        ]),
        G((r(), m("div", {
          class: S(["autocomplete-items bg-white border", t.resultClass]),
          style: q(v(C))
        }, [
          k("div", {
            class: S(["list-group", t.itemsClass])
          }, [
            G(k("div", qe, "Loading...", 512), [
              [de, v(j)]
            ]),
            (r(!0), m(R, null, se(v(d), (b, x) => (r(), m("div", {
              key: x,
              onClick: (ie) => v(P)(b, x),
              class: S(["autocomplete-item list-group-item list-group-item-action", [t.itemClass, { "bg-light": x == v(o) }]])
            }, [
              _(I.$slots, "default", {
                item: b,
                q: v(a)
              }, () => [
                k("div", {
                  innerHTML: v(Z)(b, v(a))
                }, null, 8, He)
              ])
            ], 10, Ue))), 128))
          ], 2)
        ], 6)), [
          [Y, X]
        ])
      ], 64);
    };
  }
}), je = ["href"], Et = /* @__PURE__ */ y({
  __name: "Anchor",
  props: {
    href: {}
  },
  setup(t) {
    const s = t, l = h(() => {
      let e = s.href;
      return Fe(e) ? e.startsWith("mailto:") || (e = "mailto:" + e) : De(e) ? e = "http://" + e : Te(e) ? e.startsWith("tel:") || (e = "tel:" + e) : !e.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((n) => e.startsWith(n)) && (e = "http://" + e), e;
    });
    return (e, n) => (r(), m("a", { href: l.value }, [
      _(e.$slots, "default")
    ], 8, je));
  }
}), Ze = ["value", "lang"], Bt = /* @__PURE__ */ y({
  __name: "DateInput",
  props: {
    modelValue: {},
    culture: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = h(() => re(new Date(e.modelValue || ""))), a = h(() => n.value ? ze(new Date(e.modelValue)) : e.modelValue), p = (o) => {
      const d = new Date(o.target.value);
      (!o.target.value || re(d)) && l("update:modelValue", d || o.target.value);
    };
    return (o, d) => (r(), m("input", {
      type: "date",
      value: a.value,
      onChange: p,
      lang: t.culture,
      class: S({ "is-invalid": a.value && !n.value })
    }, null, 42, Ze));
  }
}), Ft = /* @__PURE__ */ y({
  __name: "FormLabel",
  props: {
    label: {},
    autoHide: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (s, l) => (r(), m("small", {
      class: S(["form-text text-muted", t.autoHide ? "d-none d-md-inline" : "d-inline"])
    }, H(t.label), 3));
  }
}), Ke = ["checked"], Qe = {
  name: "NullableCheckBox"
}, Dt = /* @__PURE__ */ y({
  ...Qe,
  props: {
    modelValue: { type: [Boolean, String, Number] }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = f(null), p = f(((i) => {
      if (i != null)
        return typeof i == "string" ? i === "true" ? !0 : i === "false" ? !1 : void 0 : new Boolean(i).valueOf();
    })(e.modelValue)), o = h({
      get() {
        return p.value;
      },
      set(i) {
        p.value = i, l("update:modelValue", i), l("change", { target: n.value });
      }
    }), d = h(() => ({ opacity: o.value == null ? 0.5 : 1 }));
    function g() {
      o.value = o.value == null ? !0 : o.value ? !1 : void 0;
    }
    return ke(() => n.value && (n.value.indeterminate = o.value === void 0)), (i, w) => (r(), m("input", {
      type: "checkbox",
      ref_key: "input",
      ref: n,
      onClick: g,
      "true-value": !0,
      checked: o.value,
      style: q(d.value)
    }, null, 12, Ke));
  }
}), Tt = /* @__PURE__ */ y({
  __name: "NullableLabel",
  props: {
    label: {}
  },
  setup(t) {
    return (s, l) => (r(), m("span", {
      class: S({ "italic-muted": !t.label })
    }, [
      t.label ? (r(), m(R, { key: 0 }, [
        we(H(t.label), 1)
      ], 64)) : _(s.$slots, "default", { key: 1 })
    ], 2));
  }
}), Je = { class: "form-section" }, Xe = { class: "form-section-title" }, Ye = { class: "row" }, et = { class: "p-2 mb-2" }, tt = { class: "col-auto" }, zt = /* @__PURE__ */ y({
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
    const l = s, e = t, n = Ce(), a = f(e.collapsed), p = f(e.readonly || e.showSummary), o = h({
      get: () => n?.slots.summary && (e.readonly || p.value),
      set: (g) => p.value = !!g
    });
    function d() {
      a.value = !a.value, a.value ? l("collapse") : l("expand");
    }
    return ne(
      () => e.collapsed,
      () => {
        a.value = e.collapsed, a.value ? l("collapse") : l("expand");
      }
    ), (g, i) => {
      const w = M("Icon");
      return r(), m("div", Je, [
        k("div", Xe, [
          _(g.$slots, "header", {
            collapsed: a.value,
            showSummary: o.value
          }, () => [
            k("div", Ye, [
              k("div", {
                class: "col",
                onClick: i[0] || (i[0] = (C) => o.value = !o.value)
              }, [
                _(g.$slots, "title", { showSummary: o.value }, () => [
                  k("h3", et, H(t.title), 1)
                ])
              ]),
              k("div", tt, [
                !t.readonly && g.$slots.summary ? (r(), m("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: i[1] || (i[1] = T((C) => o.value = !o.value, ["stop"]))
                }, [
                  B(w, {
                    name: o.value ? "look" : "edit"
                  }, null, 8, ["name"])
                ])) : z("", !0),
                k("button", {
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: T(d, ["stop"])
                }, [
                  B(w, {
                    name: a.value ? "maximize" : "minimize"
                  }, null, 8, ["name"])
                ])
              ])
            ])
          ])
        ]),
        G(k("div", {
          class: S(["form-section-body", o.value && t.summaryClass])
        }, [
          !g.$slots.summary || !o.value ? _(g.$slots, "default", {
            key: 0,
            collapsed: a.value
          }) : z("", !0),
          g.$slots.summary && o.value ? _(g.$slots, "summary", {
            key: 1,
            collapsed: a.value
          }) : z("", !0),
          _(g.$slots, "always")
        ], 2), [
          [de, !a.value]
        ])
      ]);
    };
  }
}), Rt = /* @__PURE__ */ y({
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
      onDrop: T(a, ["prevent"]),
      onDragover: o[0] || (o[0] = T((d) => n.value = !0, ["prevent"])),
      onDragleave: o[1] || (o[1] = T((d) => n.value = !1, ["prevent"]))
    }, [
      _(p.$slots, "default", { isDropping: n.value })
    ], 32));
  }
}), At = /* @__PURE__ */ y({
  __name: "CopyToClipboardButton",
  props: {
    value: {},
    timeout: { default: 2500 }
  },
  setup(t, { expose: s }) {
    const l = t, e = f();
    function n() {
      Re(l.value ?? ""), e.value = !0, setTimeout(() => e.value = void 0, l.timeout);
    }
    return s({
      success: e
    }), (a, p) => {
      const o = M("IconButton");
      return r(), W(o, {
        icon: e.value ? "check" : "copy",
        disabled: e.value,
        onClick: n
      }, null, 8, ["icon", "disabled"]);
    };
  }
}), lt = ["src"], nt = /* @__PURE__ */ y({
  __name: "GMap",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(t) {
    const s = t, l = h(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((n) => n).join(" ")), e = h(() => `https://maps.google.com/maps?q=${encodeURIComponent(l.value)}&t=&z=${s.zoom || 10}&ie=UTF8&iwloc=&output=embed`);
    return (n, a) => (r(), m("iframe", {
      src: e.value,
      frameborder: "0",
      scrolling: "no",
      marginheight: "0",
      marginwidth: "0",
      allowfullscreen: ""
    }, null, 8, lt));
  }
}), at = ["href"], Nt = /* @__PURE__ */ y({
  __name: "GmapLink",
  props: {
    modelValue: {}
  },
  setup(t) {
    const s = t, l = h(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((e) => e).join(" "));
    return (e, n) => {
      const a = M("Icon");
      return r(), m("a", {
        href: `https://www.google.com/maps/?q=${l.value}`
      }, [
        B(a, { name: "map" }),
        _(e.$slots, "default")
      ], 8, at);
    };
  }
}), st = /* @__PURE__ */ y({
  __name: "ModalButton",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(t) {
    const s = t, l = h(() => (Array.isArray(s.modelValue) ? s.modelValue : [s.modelValue]).filter((n) => n).join(" ")), e = f(!1);
    return (n, a) => {
      const p = M("Icon");
      return r(), m("button", {
        type: "button",
        onClick: a[1] || (a[1] = (o) => e.value = !0)
      }, [
        _(n.$slots, "default", {}, () => [
          B(p, { name: "map" })
        ], !0),
        (r(), W(Se, { to: "#modals" }, [
          B(v(Ae), {
            "is-visible": e.value,
            title: l.value,
            "show-footer": !1,
            "full-width": !0,
            onClose: a[0] || (a[0] = (o) => e.value = !1)
          }, {
            default: Ie(() => [
              B(nt, {
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
}, Pt = /* @__PURE__ */ ot(st, [["__scopeId", "data-v-185b1d6b"]]), it = ["src"], oe = /* @__PURE__ */ y({
  __name: "Loading",
  setup(t, { expose: s }) {
    const l = xe("loadingImg"), e = f(null);
    return s({
      imgEl: e,
      dimensions: () => [e.value?.width, e.value?.height],
      height: () => e.value?.naturalHeight
    }), (n, a) => (r(), m("img", {
      src: v(l),
      ref_key: "imgEl",
      ref: e
    }, null, 8, it));
  }
}), ut = ["disabled"], rt = /* @__PURE__ */ y({
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
      t.isLoading ? _(s.$slots, "loading", { key: 0 }, () => [
        B(oe, { style: { width: "1rem" } })
      ]) : _(s.$slots, "default", { key: 1 })
    ], 8, ut));
  }
}), ct = /* @__PURE__ */ y({
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
      style: q({ height: t.isLoading ? `${n()}px` : void 0 }),
      ref_key: "containerEl",
      ref: l
    }, [
      _(a.$slots, "loading", {}, () => [
        t.isLoading ? (r(), W(oe, {
          key: 0,
          class: "position-absolute top-0 start-50 translate-middle-x",
          style: { width: "20rem", "max-width": "100%" },
          ref_key: "loadingEl",
          ref: e
        }, null, 512)) : z("", !0)
      ]),
      k("div", {
        style: q({ opacity: t.isLoading ? "0.4" : "" })
      }, [
        _(a.$slots, "default")
      ], 4)
    ], 4));
  }
}), Mt = {
  install(t, s) {
    t.component("Loading", oe), t.component("LoadingButton", rt), t.component("LoadingContainer", ct), t.provide("loadingImg", s.img);
  }
}, Ot = {
  install(t, { defaultPageSize: s = 10 } = {}) {
    Ee.PAGESIZE = s, t.component("Paging", Be);
  }
};
function ae() {
  return [window.innerWidth, window.innerHeight];
}
const V = {
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
        return this.size[0] >= V.xs;
      },
      get isSmall() {
        return this.size[0] >= V.sm;
      },
      get isMedium() {
        return this.size[0] >= V.md;
      },
      get isLarge() {
        return this.size[0] >= V.lg;
      },
      get isExtraLarge() {
        return this.size[0] >= V.xl;
      },
      get isExtraExtraLarge() {
        return this.size[0] >= V.xxl;
      },
      get layout() {
        return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs";
      },
      isSize(l) {
        return this.size[0] >= V[l];
      },
      updateSize: (l = ae()) => t.value = l
    }
  };
}
const Gt = {
  install: (t, { sizes: s } = {}) => {
    if (s)
      for (const n in s)
        n in V && (V[n] = s[n]);
    const { screen: l } = dt(), e = Ne(() => l.updateSize(ae()), 250);
    window.addEventListener("resize", e), window.addEventListener("orientationchange", e), t.config.globalProperties.$screen = l, t.provide("screen", l);
  }
};
class U {
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
    return Object.assign(new U(s), l || {});
  }
}
const mt = ["href", "onClick"], pt = /* @__PURE__ */ y({
  __name: "TabNavigation",
  props: {
    tabs: {},
    activeTab: {}
  },
  emits: ["select"],
  setup(t) {
    const s = h(() => (l) => typeof l.isVisible == "function" ? l.isVisible() : l.isVisible);
    return (l, e) => {
      const n = M("Icon");
      return r(), m("ul", {
        class: S(["nav", { "nav-pills": !l.$screen.isLarge, "nav-tabs": l.$screen.isLarge }])
      }, [
        (r(!0), m(R, null, se(t.tabs, (a) => (r(), m(R, {
          key: a.key
        }, [
          s.value(a) ? (r(), m("li", {
            key: 0,
            class: S(["nav-item", { disabled: a.isDisabled }])
          }, [
            k("a", {
              href: `#${a.key}`,
              class: S(["py-1 px-2", "nav-link", { active: t.activeTab == a.key, disabled: a.isDisabled }]),
              onClick: T((p) => l.$emit("select", a.key), ["prevent"])
            }, [
              a.icon ? (r(), W(n, {
                key: 0,
                name: a.icon
              }, null, 8, ["name"])) : z("", !0),
              k("span", {
                class: S({ "d-none d-lg-inline ms-1": a.icon })
              }, H(a.title), 3)
            ], 10, mt)
          ], 2)) : z("", !0)
        ], 64))), 128))
      ], 2);
    };
  }
}), ft = { class: "tab-container" }, vt = {
  key: 0,
  class: "tab-content pt-2"
}, qt = /* @__PURE__ */ y({
  __name: "TabContainer",
  props: {
    tabs: {},
    useRouteNav: { type: Boolean, default: !1 },
    active: {}
  },
  emits: ["select"],
  setup(t, { emit: s }) {
    const l = s, e = t, n = Pe(), a = h(() => e.tabs.filter((i) => i != null).map((i) => i instanceof U ? i : new U(i))), p = h(() => (a.value.find((i) => i.isDefault) || a.value[0]).key), o = f(e.active), d = h({
      get: () => (e.useRouteNav ? n.currentRoute.value.hash?.substring(1) : o.value) || p.value,
      set: (i) => {
        const w = o.value != null;
        if (o.value = i, e.useRouteNav) {
          const C = { ...n.currentRoute.value, hash: "#" + i };
          w ? n.push(C) : n.replace(C);
        }
        l("select", i);
      }
    });
    function g(i) {
      o.value !== i && (d.value = i);
    }
    return ce(() => {
      if (o.value == null && e.useRouteNav) {
        let i = (e.useRouteNav ? n.currentRoute.value.hash?.substring(1) : null) || p.value;
        g(i);
      }
    }), (i, w) => (r(), m("div", ft, [
      B(pt, {
        tabs: a.value,
        activeTab: d.value,
        onSelect: g
      }, null, 8, ["tabs", "activeTab"]),
      (r(!0), m(R, null, se(a.value, (C) => (r(), m(R, {
        key: C.key
      }, [
        d.value == C.key ? (r(), m("div", vt, [
          _(i.$slots, C.key)
        ])) : z("", !0)
      ], 64))), 128))
    ]));
  }
});
export {
  Et as Anchor,
  Lt as Autocomplete,
  ol as BsIcon,
  Wt as ButtonType,
  jt as ConfirmButton,
  At as CopyToClipboardButton,
  Bt as DateInput,
  Ae as DefaultModal,
  il as FaIcon,
  Xt as Feedback,
  nl as FeedbackStatus,
  Rt as FileDropZone,
  Ft as FormLabel,
  zt as FormSection,
  nt as GMap,
  Pt as GMapButton,
  Nt as GMapLink,
  ul as IconButton,
  oe as Loading,
  ct as LoadingContainer,
  Qt as ModalType,
  Dt as NullableCheckBox,
  Tt as NullableLabel,
  Be as Paging,
  U as Tab,
  qt as TabContainer,
  Me as autocompleteEmits,
  Vt as autocompleteProps,
  Yt as feedbackPlugin,
  rl as iconPlugin,
  cl as loadIcons,
  Mt as loadingPlugin,
  tl as modalPlugin,
  Zt as pagingDefaults,
  Ot as pagingPlugin,
  Gt as screenPlugin,
  Ge as useAutocomplete,
  al as useFeedback,
  dt as useScreen
};
