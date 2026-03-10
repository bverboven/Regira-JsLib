import { defineComponent as v, openBlock as n, createElementBlock as r, renderSlot as p, createTextVNode as ue, toDisplayString as w, ref as g, resolveComponent as D, createElementVNode as h, createVNode as C, createCommentVNode as x, Fragment as V, renderList as R, createBlock as j, Teleport as be, unref as b, withCtx as pe, computed as y, normalizeClass as L, onMounted as ve, onUnmounted as we, watch as ie, resolveDirective as xe, withDirectives as Z, mergeProps as Ce, withKeys as oe, withModifiers as A, isRef as Se, vModelText as Ie, normalizeStyle as X, vShow as ge, mergeDefaults as Le, watchEffect as Ve, getCurrentInstance as Be, inject as ze } from "vue";
import { u as Ee } from "../../_chunks/vue-helper-BRpk5zez.js";
import { d as fe } from "../../_chunks/promise-utility-CiVTwK8o.js";
import { g as Fe } from "../../_chunks/html-utility-ZF83RbzI.js";
import { _ as he, M as De, F as se, u as Te, P as Pe, a as qe } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-Ci1eRLLv.js";
import { B as Sa, b as Ia, p as La } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-Ci1eRLLv.js";
import { c as Me, d as Re, e as Ae } from "../../_chunks/string-utility-BI1ViWED.js";
import { dateInputString as Ne } from "../formatters/index.js";
import { isValid as me } from "date-fns";
import { c as Oe } from "../../_chunks/clipboard-utility-B-2qZeP-.js";
import { debounce as je } from "lodash";
import { useRouter as Ge } from "vue-router";
const Ue = { class: "bg-light text-info" }, Xe = /* @__PURE__ */ v({
  __name: "Pending",
  props: {
    msg: { default: "Loading..." }
  },
  setup(e) {
    return (a, l) => (n(), r("div", Ue, [
      p(a.$slots, "message", {}, () => [
        ue(w(e.msg), 1)
      ])
    ]));
  }
}), He = { class: "bg-success bg-opacity-75 text-light" }, We = /* @__PURE__ */ v({
  __name: "Success",
  props: {
    msg: { default: "Success!" }
  },
  setup(e) {
    return (a, l) => (n(), r("div", He, [
      p(a.$slots, "message", {}, () => [
        ue(w(e.msg), 1)
      ])
    ]));
  }
}), oa = {
  install(e, { DefaultModal: a } = { DefaultModal: he }) {
    e.component("MyModal", a);
  }
}, Ze = { class: "bg-danger bg-opacity-75 text-light" }, Ke = { class: "row gy-0 gx-1" }, Qe = { class: "col-auto" }, Je = ["diabled"], Ye = { class: "col-auto pt-1" }, et = {
  key: 0,
  class: "col-auto"
}, tt = ["diabled"], at = {
  key: 0,
  class: "mt-2"
}, lt = {
  key: 0,
  class: "mt-2"
}, ot = { key: 1 }, st = {
  key: 0,
  class: "mt-2"
}, nt = {
  key: 0,
  class: "mt-2"
}, it = { key: 1 }, rt = /* @__PURE__ */ v({
  __name: "ErrorSummary",
  props: {
    msg: { default: "Unfortunately, an error has occurred." },
    error: { default: () => ({}) },
    enablePopup: { type: Boolean }
  },
  setup(e) {
    const a = g(!1);
    return (l, t) => {
      const o = D("Icon"), s = D("MyModal");
      return n(), r("div", Ze, [
        p(l.$slots, "message", {}, () => [
          h("div", Ke, [
            h("div", Qe, [
              h("button", {
                type: "button",
                class: "btn btn-default p-0 m-0 text-light",
                diabled: !e.error,
                onClick: t[0] || (t[0] = (c) => a.value = !a.value)
              }, [
                C(o, { name: "warning" })
              ], 8, Je)
            ]),
            h("div", Ye, w(e.msg), 1),
            e.enablePopup && e.error ? (n(), r("div", et, [
              h("button", {
                type: "button",
                class: "btn btn-link p-0 m-0 text-light",
                diabled: !e.error,
                onClick: t[1] || (t[1] = (c) => a.value = !a.value)
              }, [
                C(o, { name: "info" })
              ], 8, tt)
            ])) : x("", !0)
          ])
        ]),
        p(l.$slots, "summary", {}, () => [
          e.error ? (n(), r(V, { key: 0 }, [
            typeof e.error == "string" ? (n(), r("div", at, w(e.error), 1)) : (n(!0), r(V, { key: 1 }, R(e.error, (c, i) => (n(), r("ul", {
              class: "list-unstyled mt-2",
              key: i
            }, [
              h("li", null, [
                h("b", null, w(i), 1),
                typeof c == "string" ? (n(), r("div", lt, w(c), 1)) : (n(), r("ul", ot, [
                  (n(!0), r(V, null, R(c, (f) => (n(), r("li", { key: f }, w(f), 1))), 128))
                ]))
              ])
            ]))), 128))
          ], 64)) : x("", !0)
        ]),
        (n(), j(be, { to: "#modals" }, [
          a.value ? (n(), j(s, {
            key: 0,
            title: e.msg,
            "show-footer": !1,
            type: b(De).danger,
            onClose: t[2] || (t[2] = (c) => a.value = !1),
            onCancel: t[3] || (t[3] = (c) => a.value = !1),
            onSubmit: t[4] || (t[4] = (c) => a.value = !1)
          }, {
            default: pe(() => [
              typeof e.error == "string" ? (n(), r("div", st, w(e.error), 1)) : (n(!0), r(V, { key: 1 }, R(e.error, (c, i) => (n(), r("ul", {
                class: "list-unstyled mt-2",
                key: i
              }, [
                h("li", null, [
                  h("b", null, w(i), 1),
                  typeof c == "string" ? (n(), r("div", nt, w(c), 1)) : (n(), r("ul", it, [
                    (n(!0), r(V, null, R(c, (f) => (n(), r("li", { key: f }, w(f), 1))), 128))
                  ]))
                ])
              ]))), 128))
            ]),
            _: 1
          }, 8, ["title", "type"])) : x("", !0)
        ]))
      ]);
    };
  }
}), ut = {
  key: 0,
  class: "mb-1 position-relative border h-100"
}, sa = /* @__PURE__ */ v({
  __name: "Feedback",
  props: {
    hideCloseButton: { type: Boolean, default: !1 },
    feedback: {},
    enableErrorPopup: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: a }) {
    const l = a, t = e, { status: o, message: s, error: c, reset: i } = t.feedback, f = y(() => o.value === se.pending), k = y(() => o.value === se.success), u = y(() => o.value === se.failed), S = (_) => {
      _.stopPropagation(), l("close", { status: o.value, error: c.value }), i();
    };
    return (_, H) => {
      const G = D("IconButton");
      return f.value || k.value || u.value ? (n(), r("div", ut, [
        e.hideCloseButton ? x("", !0) : p(_.$slots, "close-button", { key: 0 }, () => [
          C(G, {
            icon: "close",
            class: L(["btn btn-sm position-absolute end-0 p-1", { "text-light": u.value }]),
            onClick: S
          }, null, 8, ["class"])
        ]),
        f.value ? p(_.$slots, "pending", { key: 1 }, () => [
          C(Xe, {
            msg: b(s),
            class: "px-2 py-1 border h-100"
          }, null, 8, ["msg"])
        ]) : x("", !0),
        k.value ? p(_.$slots, "success", { key: 2 }, () => [
          C(We, {
            msg: b(s),
            class: "px-2 py-1 border h-100"
          }, null, 8, ["msg"])
        ]) : x("", !0),
        u.value ? p(_.$slots, "error", { key: 3 }, () => [
          C(rt, {
            msg: b(s),
            error: b(c),
            "enable-popup": e.enableErrorPopup,
            class: "px-2 border h-100"
          }, null, 8, ["msg", "error", "enable-popup"])
        ]) : x("", !0)
      ])) : x("", !0);
    };
  }
}), na = {
  install: (e, a) => {
    const l = Te(a);
    e.config.globalProperties.$feedback = l, e.provide("feedback", l);
  }
}, ct = ["update:modelValue", "update:idValue", "select", "qInput"], ia = {
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
}, dt = {
  data: () => [],
  maxResults: 10,
  debounceTime: 250,
  autoSelect: !1
};
function ft(e, { emit: a }) {
  const l = g(""), t = g(-1), o = g(e.data), s = g(!1), c = g(!1), i = g(!1), f = y({
    get: () => e.modelValue,
    set: (d) => {
      e.modelValue !== d && (a("update:modelValue", d), a("update:idValue", N(d)), a("select", d));
    }
  }), k = y(() => N(f.value)), u = g(), S = g({ top: 0, left: 0 }), _ = g({ top: 0, left: 0 }), H = g({ top: 0, left: 0 }), G = y(() => {
    const { width: d, height: m } = u.value?.getBoundingClientRect() || { width: 0, height: 0 };
    return {
      visibility: s.value ? "visible" : "hidden",
      top: `${m}px`,
      left: `${u.value?.offsetLeft || 0}px`,
      width: `${d}px`
    };
  }), N = e.idSelector || ((d) => d), O = e.resultItemFormatter || ((d, m) => (d || "").toString()), T = e.displayItemFormatter || O;
  async function W(d = "") {
    return e.data?.filter((m) => O(m, l.value).toLowerCase().startsWith(d.toLowerCase()));
  }
  async function U(d = l.value) {
    $(), i.value = !0, o.value = void 0;
    try {
      const m = await _e(d), P = e.maxResults || m.length;
      o.value = m.slice(0, P), t.value = o.value?.findIndex(($e) => N($e) == N(f.value));
    } finally {
      i.value = !1;
    }
  }
  function q(d = !1) {
    if (f.value == null && o.value) {
      const m = o.value?.filter((P) => (T(P)?.toString() || "").toLowerCase() === l.value?.toLowerCase());
      m.length == 1 ? M(m[0]) : d && e.autoSelect && M(o.value[0]);
    }
  }
  function Q() {
    B(), U();
  }
  function J() {
    q();
  }
  function Y(d, m) {
    E(), M(d, d ? m : -1);
  }
  function M(d, m) {
    if (d == null && m == null) {
      B(), l.value || E();
      return;
    }
    d && (m == null || m < 0) ? m = (o.value || []).indexOf(d) : !d && m >= 0 && (d = o.value[m]), d != null && (t.value = m, f.value = d, l.value = T(f.value));
  }
  function ee(d) {
    const m = t.value + d, P = o.value[m];
    m >= 0 && m < o.value.length && M(P, m);
  }
  function B() {
    t.value = -1, f.value = void 0;
  }
  function I() {
    l.value = "", B(), E();
  }
  function te(d) {
    let m = 0, P = 0;
    do
      m += d?.offsetTop || 0, P += d?.offsetLeft || 0, d = d?.offsetParent;
    while (d);
    return {
      top: m,
      left: P
    };
  }
  function $() {
    ae(), s.value = !0;
  }
  function E() {
    s.value = !1;
  }
  function de() {
    s.value && (q(!0), f.value == null && (l.value = ""), setTimeout(E, 250));
  }
  function ye(d) {
    throw d;
  }
  const ke = e.search || e.data && W || ye(new Error("prop search or data is required")), _e = fe(ke, e.debounceTime), ae = () => {
    S.value = te(u.value), H.value = u.value ? Fe(u.value) : { top: 0, left: 0 };
  }, le = fe(ae, 50);
  return Ee(window, "resize", le), ve(() => {
    l.value = T(f.value), ae(), document.addEventListener("scroll", le, !0);
  }), we(() => {
    document.removeEventListener("scroll", le, !0);
  }), ie(f, (d, m) => {
    d != m && d != f.value && M(d), d && (l.value = T(f.value));
  }), ie(l, () => a("qInput", l.value || "")), {
    q: l,
    selectedItem: f,
    selectedIndex: t,
    selectedId: k,
    items: o,
    isOpen: s,
    isFocus: c,
    isLoading: i,
    inputEl: u,
    resultOffset: _,
    resultStyle: G,
    displayItemFormatter: T,
    resultItemFormatter: O,
    handleInput: Q,
    handleChange: J,
    handleSelect: Y,
    handleSearch: U,
    openResults: $,
    closeResults: E,
    closeGently: de,
    moveSelection: ee,
    checkMatch: q,
    clearSelection: B,
    reset: I
  };
}
const mt = { class: "loading list-group-item" }, bt = ["onClick"], pt = ["innerHTML"], vt = {
  inheritAttrs: !1
}, ra = /* @__PURE__ */ v({
  ...vt,
  inheritAttrs: !1,
  __name: "Autocomplete",
  props: /* @__PURE__ */ Le({
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
    ...dt
  }),
  emits: ct,
  setup(e, { expose: a, emit: l }) {
    const t = l, o = e, {
      q: s,
      selectedItem: c,
      selectedIndex: i,
      items: f,
      isOpen: k,
      isFocus: u,
      inputEl: S,
      resultStyle: _,
      isLoading: H,
      resultItemFormatter: G,
      closeGently: N,
      moveSelection: O,
      handleInput: T,
      handleChange: W,
      handleSelect: U,
      handleSearch: q,
      reset: Q
    } = ft(o, { emit: t });
    function J() {
      u.value = !0, ((o.idSelector && o.idSelector(c.value) || "new") == "new" || c.value == null) && q();
    }
    function Y() {
      u.value = !1;
    }
    function M() {
      o.enableDblClick && q("");
    }
    function ee(B) {
      B.target != S.value && N();
    }
    return a({
      inputEl: S,
      q: s,
      selectedItem: c,
      search: q,
      reset: Q,
      resetQ() {
        u.value || (s.value = "");
      }
    }), (B, I) => {
      const te = xe("click-outside");
      return n(), r(V, null, [
        Z(h("input", Ce({
          autocomplete: "__away",
          type: "text"
        }, B.$attrs, {
          "onUpdate:modelValue": I[0] || (I[0] = ($) => Se(s) ? s.value = $ : null),
          onInput: I[1] || (I[1] = //@ts-ignore
          (...$) => b(T) && b(T)(...$)),
          onFocus: J,
          onDblclick: M,
          onBlur: Y,
          onChange: I[2] || (I[2] = //@ts-ignore
          (...$) => b(W) && b(W)(...$)),
          onKeydown: [
            I[3] || (I[3] = oe(($) => b(O)(1), ["down"])),
            I[4] || (I[4] = oe(($) => b(O)(-1), ["up"])),
            I[5] || (I[5] = oe(A(($) => b(U)(b(c), b(i)), ["prevent"]), ["enter"]))
          ],
          ref_key: "inputEl",
          ref: S
        }), null, 16), [
          [Ie, b(s)]
        ]),
        Z((n(), r("div", {
          class: L(["autocomplete-items bg-white border", e.resultClass]),
          style: X(b(_))
        }, [
          h("div", {
            class: L(["list-group", e.itemsClass])
          }, [
            Z(h("div", mt, "Loading...", 512), [
              [ge, b(H)]
            ]),
            (n(!0), r(V, null, R(b(f), ($, E) => (n(), r("div", {
              key: E,
              onClick: (de) => b(U)($, E),
              class: L(["autocomplete-item list-group-item list-group-item-action", [e.itemClass, { "bg-light": E == b(i) }]])
            }, [
              p(B.$slots, "default", {
                item: $,
                q: b(s)
              }, () => [
                h("div", {
                  innerHTML: b(G)($, b(s))
                }, null, 8, pt)
              ])
            ], 10, bt))), 128))
          ], 2)
        ], 6)), [
          [te, ee]
        ])
      ], 64);
    };
  }
}), gt = ["href"], ua = /* @__PURE__ */ v({
  __name: "Anchor",
  props: {
    href: {}
  },
  setup(e) {
    const a = e, l = y(() => {
      let t = a.href;
      return Me(t) ? t.startsWith("mailto:") || (t = "mailto:" + t) : Re(t) ? t = "http://" + t : Ae(t) ? t.startsWith("tel:") || (t = "tel:" + t) : !t.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((o) => t.startsWith(o)) && (t = "http://" + t), t;
    });
    return (t, o) => (n(), r("a", { href: l.value }, [
      p(t.$slots, "default")
    ], 8, gt));
  }
}), ht = ["value", "lang"], ca = /* @__PURE__ */ v({
  __name: "DateInput",
  props: {
    modelValue: {},
    culture: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: a }) {
    const l = a, t = e, o = y(() => me(new Date(t.modelValue || ""))), s = y(() => o.value ? Ne(new Date(t.modelValue)) : t.modelValue), c = (i) => {
      const f = new Date(i.target.value);
      (!i.target.value || me(f)) && l("update:modelValue", f || i.target.value);
    };
    return (i, f) => (n(), r("input", {
      type: "date",
      value: s.value,
      onChange: c,
      lang: e.culture,
      class: L({ "is-invalid": s.value && !o.value })
    }, null, 42, ht));
  }
}), da = /* @__PURE__ */ v({
  __name: "FormLabel",
  props: {
    label: {},
    autoHide: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (a, l) => (n(), r("small", {
      class: L(["form-text text-muted", e.autoHide ? "d-none d-md-inline" : "d-inline"])
    }, w(e.label), 3));
  }
}), yt = ["checked"], kt = {
  name: "NullableCheckBox"
}, fa = /* @__PURE__ */ v({
  ...kt,
  props: {
    modelValue: { type: [Boolean, String, Number] }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const l = a, t = e, o = g(null), c = g(((u) => {
      if (u != null)
        return typeof u == "string" ? u === "true" ? !0 : u === "false" ? !1 : void 0 : new Boolean(u).valueOf();
    })(t.modelValue)), i = y({
      get() {
        return c.value;
      },
      set(u) {
        c.value = u, l("update:modelValue", u), l("change", { target: o.value });
      }
    }), f = y(() => ({ opacity: i.value == null ? 0.5 : 1 }));
    function k() {
      i.value = i.value == null ? !0 : i.value ? !1 : void 0;
    }
    return Ve(() => o.value && (o.value.indeterminate = i.value === void 0)), (u, S) => (n(), r("input", {
      type: "checkbox",
      ref_key: "input",
      ref: o,
      onClick: k,
      "true-value": !0,
      checked: i.value,
      style: X(f.value)
    }, null, 12, yt));
  }
}), ma = /* @__PURE__ */ v({
  __name: "NullableLabel",
  props: {
    label: {}
  },
  setup(e) {
    return (a, l) => (n(), r("span", {
      class: L({ "italic-muted": !e.label })
    }, [
      e.label ? (n(), r(V, { key: 0 }, [
        ue(w(e.label), 1)
      ], 64)) : p(a.$slots, "default", { key: 1 })
    ], 2));
  }
}), _t = { class: "form-section" }, $t = { class: "form-section-title" }, wt = { class: "row" }, xt = { class: "p-2 mb-2" }, Ct = { class: "col-auto" }, ba = /* @__PURE__ */ v({
  __name: "FormSection",
  props: {
    title: {},
    readonly: { type: Boolean },
    showSummary: { type: Boolean },
    collapsed: { type: Boolean },
    summaryClass: {}
  },
  emits: ["expand", "collapse"],
  setup(e, { emit: a }) {
    const l = a, t = e, o = Be(), s = g(t.collapsed), c = g(t.readonly || t.showSummary), i = y({
      get: () => o?.slots.summary && (t.readonly || c.value),
      set: (k) => c.value = !!k
    });
    function f() {
      s.value = !s.value, s.value ? l("collapse") : l("expand");
    }
    return ie(
      () => t.collapsed,
      () => {
        s.value = t.collapsed, s.value ? l("collapse") : l("expand");
      }
    ), (k, u) => {
      const S = D("Icon");
      return n(), r("div", _t, [
        h("div", $t, [
          p(k.$slots, "header", {
            collapsed: s.value,
            showSummary: i.value
          }, () => [
            h("div", wt, [
              h("div", {
                class: "col",
                onClick: u[0] || (u[0] = (_) => i.value = !i.value)
              }, [
                p(k.$slots, "title", { showSummary: i.value }, () => [
                  h("h3", xt, w(e.title), 1)
                ])
              ]),
              h("div", Ct, [
                !e.readonly && k.$slots.summary ? (n(), r("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: u[1] || (u[1] = A((_) => i.value = !i.value, ["stop"]))
                }, [
                  C(S, {
                    name: i.value ? "look" : "edit"
                  }, null, 8, ["name"])
                ])) : x("", !0),
                h("button", {
                  type: "button",
                  class: "btn btn-default my-2 px-2 py-1 opacity-50",
                  onClick: A(f, ["stop"])
                }, [
                  C(S, {
                    name: s.value ? "maximize" : "minimize"
                  }, null, 8, ["name"])
                ])
              ])
            ])
          ])
        ]),
        Z(h("div", {
          class: L(["form-section-body", i.value && e.summaryClass])
        }, [
          !k.$slots.summary || !i.value ? p(k.$slots, "default", {
            key: 0,
            collapsed: s.value
          }) : x("", !0),
          k.$slots.summary && i.value ? p(k.$slots, "summary", {
            key: 1,
            collapsed: s.value
          }) : x("", !0),
          p(k.$slots, "always")
        ], 2), [
          [ge, !s.value]
        ])
      ]);
    };
  }
}), pa = /* @__PURE__ */ v({
  __name: "FileDropZone",
  emits: ["drop-files"],
  setup(e, { expose: a, emit: l }) {
    const t = l, o = g();
    async function s(c) {
      t("drop-files", [...c.dataTransfer.files]);
    }
    return a({
      isDropping: o
    }), (c, i) => (n(), r("div", {
      onDrop: A(s, ["prevent"]),
      onDragover: i[0] || (i[0] = A((f) => o.value = !0, ["prevent"])),
      onDragleave: i[1] || (i[1] = A((f) => o.value = !1, ["prevent"]))
    }, [
      p(c.$slots, "default", { isDropping: o.value })
    ], 32));
  }
}), va = /* @__PURE__ */ v({
  __name: "CopyToClipboardButton",
  props: {
    value: {},
    timeout: { default: 2500 }
  },
  setup(e, { expose: a }) {
    const l = e, t = g();
    function o() {
      Oe(l.value ?? ""), t.value = !0, setTimeout(() => t.value = void 0, l.timeout);
    }
    return a({
      success: t
    }), (s, c) => {
      const i = D("IconButton");
      return n(), j(i, {
        icon: t.value ? "check" : "copy",
        disabled: t.value,
        onClick: o
      }, null, 8, ["icon", "disabled"]);
    };
  }
}), St = ["src"], It = /* @__PURE__ */ v({
  __name: "GMap",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(e) {
    const a = e, l = y(() => (Array.isArray(a.modelValue) ? a.modelValue : [a.modelValue]).filter((o) => o).join(" ")), t = y(() => `https://maps.google.com/maps?q=${encodeURIComponent(l.value)}&t=&z=${a.zoom || 10}&ie=UTF8&iwloc=&output=embed`);
    return (o, s) => (n(), r("iframe", {
      src: t.value,
      frameborder: "0",
      scrolling: "no",
      marginheight: "0",
      marginwidth: "0",
      allowfullscreen: ""
    }, null, 8, St));
  }
}), Lt = ["href"], ga = /* @__PURE__ */ v({
  __name: "GmapLink",
  props: {
    modelValue: {}
  },
  setup(e) {
    const a = e, l = y(() => (Array.isArray(a.modelValue) ? a.modelValue : [a.modelValue]).filter((t) => t).join(" "));
    return (t, o) => {
      const s = D("Icon");
      return n(), r("a", {
        href: `https://www.google.com/maps/?q=${l.value}`
      }, [
        C(s, { name: "map" }),
        p(t.$slots, "default")
      ], 8, Lt);
    };
  }
}), Vt = /* @__PURE__ */ v({
  __name: "ModalButton",
  props: {
    modelValue: {},
    zoom: {}
  },
  setup(e) {
    const a = e, l = y(() => (Array.isArray(a.modelValue) ? a.modelValue : [a.modelValue]).filter((o) => o).join(" ")), t = g(!1);
    return (o, s) => {
      const c = D("Icon");
      return n(), r("button", {
        type: "button",
        onClick: s[1] || (s[1] = (i) => t.value = !0)
      }, [
        p(o.$slots, "default", {}, () => [
          C(c, { name: "map" })
        ], !0),
        (n(), j(be, { to: "#modals" }, [
          C(b(he), {
            "is-visible": t.value,
            title: l.value,
            "show-footer": !1,
            "full-width": !0,
            onClose: s[0] || (s[0] = (i) => t.value = !1)
          }, {
            default: pe(() => [
              C(It, {
                id: "gmap_canvas",
                modelValue: e.modelValue,
                zoom: e.zoom,
                class: "w-100"
              }, null, 8, ["modelValue", "zoom"])
            ]),
            _: 1
          }, 8, ["is-visible", "title"])
        ]))
      ]);
    };
  }
}), Bt = (e, a) => {
  const l = e.__vccOpts || e;
  for (const [t, o] of a)
    l[t] = o;
  return l;
}, ha = /* @__PURE__ */ Bt(Vt, [["__scopeId", "data-v-185b1d6b"]]), z = /* @__PURE__ */ new Map();
function ne(e) {
  (Array.isArray(e) ? e : Object.entries(e)).forEach(([l, t]) => {
    z.set(l, t);
  });
}
function zt() {
  z.clear();
}
const Et = /* @__PURE__ */ v({
  __name: "BsIcon",
  props: {
    name: {},
    size: { default: "md" }
  },
  setup(e) {
    const a = e;
    z.has(a.name) || console.warn(`Icon ${a.name} not found`, { icons: z.values() });
    const l = y(() => z.get(a.name)), t = { sm: 0.75, md: 1, lg: 2, xl: 3 }, o = y(() => ({ "font-size": `${t[a.size]}rem` }));
    return (s, c) => (n(), r("i", {
      class: L(l.value),
      style: X(o.value)
    }, null, 6));
  }
}), Ft = /* @__PURE__ */ v({
  __name: "FaIcon",
  props: {
    name: {},
    size: { default: "md" }
  },
  setup(e) {
    const a = e;
    z.has(a.name) || console.warn(`Icon ${a.name} not found`, { icons: z.values() });
    const l = { sm: "fa-sm", md: "fa-md", lg: "fa-lg", xl: "fa-3x" }, t = y(() => [z.get(a.name), l[a.size]]);
    return (o, s) => (n(), r("i", {
      class: L(t.value)
    }, null, 2));
  }
}), Dt = ["type"], Tt = /* @__PURE__ */ v({
  __name: "IconButton",
  props: {
    icon: {},
    size: {},
    type: { default: "button" }
  },
  setup(e) {
    return (a, l) => {
      const t = D("Icon");
      return n(), r("button", {
        type: e.type,
        class: "btn"
      }, [
        C(t, {
          name: e.icon,
          size: e.size
        }, null, 8, ["name", "size"]),
        p(a.$slots, "default")
      ], 8, Dt);
    };
  }
}), Pt = {
  address: "bi bi-journal-richtext",
  admin: "bi bi-person-gear",
  alert: "bi bi-exclamation-circle",
  attachment: "bi bi-paperclip",
  bank: "bi bi-piggy-bank",
  birthday: "bi bi-balloon",
  cancel: "bi bi-x-octagon",
  chat: "bi bi-chat",
  chatLeft: "bi bi-chat-left-text",
  chatRight: "bi bi-chat-right-text",
  check: "bi bi-check",
  checked: "bi bi-check2-square",
  clear: "bi bi-eraser",
  client: "bi bi-person-rolodex",
  clone: "bi bi-clipboard-plus",
  close: "bi bi-x-circle",
  closeSq: "bi bi-x-square",
  code: "bi bi-c-square",
  collapse: "bi bi-arrows-collapse",
  collection: "bi bi-collection",
  columns: "bi bi-layout-three-columns",
  connect: "bi bi-link",
  contact: "bi bi-person-lines-fill",
  copy: "bi bi-clipboard",
  country: "bi bi-globe",
  csv: "bi bi-filetype-csv",
  date: "bi bi-calendar",
  delete: "bi bi-trash",
  details: "bi bi-eye-fill",
  docTable: "bi bi-file-ruled",
  docx: "bi bi-file-earmark-word",
  down: "bi bi-caret-down-square",
  download: "bi bi-file-earmark-arrow-down",
  edit: "bi bi-pencil-fill",
  email: "bi bi-at",
  error: "bi bi-exclamation-circle",
  euro: "bi bi-currency-euro",
  exit: "bi bi-box-arrow-right",
  expand: "bi bi-arrows-expand",
  export: "bi bi-file-earmark-arrow-up",
  fiche: "bi bi-list-columns-reverse",
  file: "bi bi-file-earmark",
  filter: "bi bi-funnel",
  folder: "bi bi-folder",
  form: "bi bi-pencil-square",
  from: "bi bi-box-arrow-right",
  git: "bi bi-github",
  globe: "bi bi-globe-europe-africa",
  home: "bi bi-house-door",
  import: "bi bi-file-earmark-arrow-down",
  info: "bi bi-info-circle",
  internet: "bi bi-globe",
  invoice: "bi bi-file-earmark-ruled",
  ip: "bi bi-modem",
  key: "bi bi-key",
  language: "bi bi-translate",
  list: "bi bi-list-task",
  locked: "bi bi-lock-fill",
  look: "bi bi-eye",
  mail: "bi bi-envelope-at",
  manage: "bi bi-gear-fill",
  map: "bi bi-geo-alt",
  markdown: "bi bi-markdown",
  maximize: "bi bi-plus-square",
  message: "bi bi-chat-left-dots",
  minimize: "bi bi-dash-square",
  minus: "bi bi-dash",
  mobilePhone: "bi bi-phone",
  move: "bi bi-arrows-move",
  multiline: "bi bi-chat-square-text",
  new: "bi bi-plus",
  notes: "bi bi-journal-text",
  noUser: "bi bi-person-x",
  pay: "bi bi-cash-coin",
  pdf: "bi bi-file-earmark-pdf",
  peppol: "bi bi-send",
  people: "bi bi-people-fill",
  phone: "bi bi-telephone",
  popOut: "bi bi-box-arrow-up-right",
  question: "bi bi-question",
  receipt: "bi bi-receipt",
  restore: "bi bi-wrench-adjustable-circle",
  save: "bi bi-save-fill",
  search: "bi bi-search",
  security: "bi bi-shield-check",
  select: "bi bi-cursor",
  selected: "bi bi-cursor-fill",
  settings: "bi bi-tools",
  sidebarLeft: "bi bi-layout-sidebar",
  sidebarRight: "bi bi-layout-sidebar-reverse",
  singleline: "bi bi-chat-square-dots",
  statistics: "bi bi-graph-up",
  submit: "bi bi-check-circle",
  tag: "bi bi-tag",
  tenant: "bi bi-person-rolodex",
  times: "bi bi-x-lg",
  timespan: "bi bi-hourglass",
  title: "bi bi-fonts",
  to: "bi bi-box-arrow-in-right",
  today: "bi bi-calendar-check",
  transport: "bi bi-truck",
  tree: "bi bi-diagram-3",
  unchecked: "bi bi-square",
  unlocked: "bi bi-unlock-fill",
  up: "bi bi-caret-up-square",
  upload: "bi bi-file-earmark-arrow-up",
  user: "bi bi-person-circle",
  vCard: "bi bi-person-vcard-fill",
  warning: "bi bi-exclamation-triangle",
  website: "bi bi-browser-chrome",
  xml: "bi bi-filetype-xml",
  xlsx: "bi bi-file-earmark-excel",
  zip: "bi bi-file-earmark-zip"
}, qt = {
  address: "fa-regular fa-address-card",
  alert: "fa-solid fa-circle-exclamation",
  attachment: "XXX",
  birthday: "fa-solid fa-cake-candles",
  cancel: "fa-solid fa-ban",
  chat: "fa-regular fa-comments",
  check: "fa-regular fa-square-check",
  checked: "fa-solid fa-check",
  clear: "XXX",
  client: "fa-solid fa-shop",
  close: "fa-regular fa-circle-xmark",
  closeSq: "fa-regular fa-rectangle-xmark",
  connect: "fa-solid fa-link",
  contact: "fa-regular fa-id-badge",
  copy: "fa-solid fa-copy",
  country: "fa-solid fa-earth-americas",
  delete: "fa-solid fa-trash-can",
  details: "fa-regular fa-eye",
  docTable: "fa-solid fa-table-list",
  down: "fa-regular fa-square-caret-down",
  download: "fa-solid fa-file-arrow-down",
  edit: "fa-regular fa-pen-to-square",
  email: "fa-solid fa-at",
  file: "fa-regular fa-file",
  filter: "fa-solid fa-filter",
  globe: "fa-solid fa-earth-europe",
  home: "fa-solid fa-house",
  info: "XXX",
  internet: "fa-brands fa-internet-explorer",
  invoice: "fa-solid fa-file-invoice",
  key: "fa-solid fa-key",
  locked: "fa-solid fa-lock",
  look: "fa-regular fa-eye",
  manage: "fa-solid fa-screwdriver-wrench",
  map: "fa-solid fa-location-dot",
  markdown: "fa-brands fa-markdown",
  mobilePhone: "fa-solid fa-mobile-screen-button",
  move: "fa-solid fa-up-down-left-right",
  new: "fa-solid fa-plus",
  pay: "fa-solid fa-money-check-dollar",
  phone: "fa-solid fa-phone",
  popOut: "fa-solid fa-arrow-up-right-from-square",
  receipt: "fa-solid fa-receipt",
  save: "fa-regular fa-floppy-disk",
  search: "fa-solid fa-magnifying-glass",
  select: "fa-solid fa-arrow-pointer",
  selected: "fa-solid fa-arrow-pointer",
  submit: "fa-regular fa-circle-check",
  transport: "fa-solid fa-truck",
  tree: "fa-solid fa-sitemap",
  unchecked: "fa-regular fa-square",
  unlocked: "fa-solid fa-lock-open",
  up: "fa-regular fa-square-caret-up",
  upload: "fa-solid fa-file-arrow-up",
  user: "fa-regular fa-user",
  warning: "fa-solid fa-triangle-exclamation",
  website: "fa-brands fa-internet-explorer"
}, ya = {
  install(e, { icons: a = {}, clearFirst: l = !1, source: t = "bs" } = {}) {
    ne(t == "bs" ? Pt : qt), e.provide("icons.config", { source: t, icons: z }), l && zt(), a != null && ne(a), e.config.globalProperties.$icons = {
      add: (s, c) => ne({ [s]: c }),
      source: t,
      map: z
    };
    const o = t == "bs" ? Et : Ft;
    e.component("Icon", o), e.component("IconButton", Tt);
  }
}, Mt = ["src"], ce = /* @__PURE__ */ v({
  __name: "Loading",
  setup(e, { expose: a }) {
    const l = ze("loadingImg"), t = g(null);
    return a({
      imgEl: t,
      dimensions: () => [t.value?.width, t.value?.height],
      height: () => t.value?.naturalHeight
    }), (o, s) => (n(), r("img", {
      src: b(l),
      ref_key: "imgEl",
      ref: t
    }, null, 8, Mt));
  }
}), Rt = ["disabled"], At = /* @__PURE__ */ v({
  __name: "LoadingButton",
  props: {
    isLoading: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(e) {
    return (a, l) => (n(), r("button", {
      type: "button",
      class: "btn",
      disabled: e.disabled || e.isLoading
    }, [
      e.isLoading ? p(a.$slots, "loading", { key: 0 }, () => [
        C(ce, { style: { width: "1rem" } })
      ]) : p(a.$slots, "default", { key: 1 })
    ], 8, Rt));
  }
}), Nt = /* @__PURE__ */ v({
  __name: "LoadingContainer",
  props: {
    isLoading: { type: Boolean }
  },
  setup(e, { expose: a }) {
    const l = g(null), t = g(null);
    function o() {
      return t.value?.imgEl?.width;
    }
    return a({
      containerEl: l,
      loadingImgEl: t.value?.imgEl
    }), (s, c) => (n(), r("div", {
      class: "position-relative",
      style: X({ height: e.isLoading ? `${o()}px` : void 0 }),
      ref_key: "containerEl",
      ref: l
    }, [
      p(s.$slots, "loading", {}, () => [
        e.isLoading ? (n(), j(ce, {
          key: 0,
          class: "position-absolute top-0 start-50 translate-middle-x",
          style: { width: "20rem", "max-width": "100%" },
          ref_key: "loadingEl",
          ref: t
        }, null, 512)) : x("", !0)
      ]),
      h("div", {
        style: X({ opacity: e.isLoading ? "0.4" : "" })
      }, [
        p(s.$slots, "default")
      ], 4)
    ], 4));
  }
}), ka = {
  install(e, a) {
    e.component("Loading", ce), e.component("LoadingButton", At), e.component("LoadingContainer", Nt), e.provide("loadingImg", a.img);
  }
}, _a = {
  install(e, { defaultPageSize: a = 10 } = {}) {
    Pe.PAGESIZE = a, e.component("Paging", qe);
  }
};
function re() {
  return [window.innerWidth, window.innerHeight];
}
const F = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
function Ot() {
  const e = g(re());
  return {
    size: e,
    screen: {
      get size() {
        return e.value;
      },
      get isExtraSmall() {
        return this.size[0] >= F.xs;
      },
      get isSmall() {
        return this.size[0] >= F.sm;
      },
      get isMedium() {
        return this.size[0] >= F.md;
      },
      get isLarge() {
        return this.size[0] >= F.lg;
      },
      get isExtraLarge() {
        return this.size[0] >= F.xl;
      },
      get isExtraExtraLarge() {
        return this.size[0] >= F.xxl;
      },
      get layout() {
        return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs";
      },
      isSize(l) {
        return this.size[0] >= F[l];
      },
      updateSize: (l = re()) => e.value = l
    }
  };
}
const $a = {
  install: (e, { sizes: a } = {}) => {
    if (a)
      for (const o in a)
        o in F && (F[o] = a[o]);
    const { screen: l } = Ot(), t = je(() => l.updateSize(re()), 250);
    window.addEventListener("resize", t), window.addEventListener("orientationchange", t), e.config.globalProperties.$screen = l, e.provide("screen", l);
  }
};
class K {
  key;
  icon;
  title;
  isDefault;
  isDisabled;
  isVisible;
  constructor(a, l = a, t = !1, o = !1, s = !0) {
    this.title = a, this.key = l, this.isDefault = t, this.isDisabled = o, this.isVisible = s;
  }
  static create(a, l) {
    return Object.assign(new K(a), l || {});
  }
}
const jt = ["href", "onClick"], Gt = /* @__PURE__ */ v({
  __name: "TabNavigation",
  props: {
    tabs: {},
    activeTab: {}
  },
  emits: ["select"],
  setup(e) {
    const a = y(() => (l) => typeof l.isVisible == "function" ? l.isVisible() : l.isVisible);
    return (l, t) => {
      const o = D("Icon");
      return n(), r("ul", {
        class: L(["nav", { "nav-pills": !l.$screen.isLarge, "nav-tabs": l.$screen.isLarge }])
      }, [
        (n(!0), r(V, null, R(e.tabs, (s) => (n(), r(V, {
          key: s.key
        }, [
          a.value(s) ? (n(), r("li", {
            key: 0,
            class: L(["nav-item", { disabled: s.isDisabled }])
          }, [
            h("a", {
              href: `#${s.key}`,
              class: L(["py-1 px-2", "nav-link", { active: e.activeTab == s.key, disabled: s.isDisabled }]),
              onClick: A((c) => l.$emit("select", s.key), ["prevent"])
            }, [
              s.icon ? (n(), j(o, {
                key: 0,
                name: s.icon
              }, null, 8, ["name"])) : x("", !0),
              h("span", {
                class: L({ "d-none d-lg-inline ms-1": s.icon })
              }, w(s.title), 3)
            ], 10, jt)
          ], 2)) : x("", !0)
        ], 64))), 128))
      ], 2);
    };
  }
}), Ut = { class: "tab-container" }, Xt = {
  key: 0,
  class: "tab-content pt-2"
}, wa = /* @__PURE__ */ v({
  __name: "TabContainer",
  props: {
    tabs: {},
    useRouteNav: { type: Boolean, default: !1 },
    active: {}
  },
  emits: ["select"],
  setup(e, { emit: a }) {
    const l = a, t = e, o = Ge(), s = y(() => t.tabs.filter((u) => u != null).map((u) => u instanceof K ? u : new K(u))), c = y(() => (s.value.find((u) => u.isDefault) || s.value[0]).key), i = g(t.active), f = y({
      get: () => (t.useRouteNav ? o.currentRoute.value.hash?.substring(1) : i.value) || c.value,
      set: (u) => {
        const S = i.value != null;
        if (i.value = u, t.useRouteNav) {
          const _ = { ...o.currentRoute.value, hash: "#" + u };
          S ? o.push(_) : o.replace(_);
        }
        l("select", u);
      }
    });
    function k(u) {
      i.value !== u && (f.value = u);
    }
    return ve(() => {
      if (i.value == null && t.useRouteNav) {
        let u = (t.useRouteNav ? o.currentRoute.value.hash?.substring(1) : null) || c.value;
        k(u);
      }
    }), (u, S) => (n(), r("div", Ut, [
      C(Gt, {
        tabs: s.value,
        activeTab: f.value,
        onSelect: k
      }, null, 8, ["tabs", "activeTab"]),
      (n(!0), r(V, null, R(s.value, (_) => (n(), r(V, {
        key: _.key
      }, [
        f.value == _.key ? (n(), r("div", Xt, [
          p(u.$slots, _.key)
        ])) : x("", !0)
      ], 64))), 128))
    ]));
  }
});
export {
  ua as Anchor,
  ra as Autocomplete,
  Et as BsIcon,
  Sa as ButtonType,
  Ia as ConfirmButton,
  va as CopyToClipboardButton,
  ca as DateInput,
  he as DefaultModal,
  Ft as FaIcon,
  sa as Feedback,
  se as FeedbackStatus,
  pa as FileDropZone,
  da as FormLabel,
  ba as FormSection,
  It as GMap,
  ha as GMapButton,
  ga as GMapLink,
  Tt as IconButton,
  ce as Loading,
  Nt as LoadingContainer,
  De as ModalType,
  fa as NullableCheckBox,
  ma as NullableLabel,
  qe as Paging,
  K as Tab,
  wa as TabContainer,
  ct as autocompleteEmits,
  ia as autocompleteProps,
  na as feedbackPlugin,
  ya as iconPlugin,
  ne as loadIcons,
  ka as loadingPlugin,
  oa as modalPlugin,
  La as pagingDefaults,
  _a as pagingPlugin,
  $a as screenPlugin,
  ft as useAutocomplete,
  Te as useFeedback,
  Ot as useScreen
};
