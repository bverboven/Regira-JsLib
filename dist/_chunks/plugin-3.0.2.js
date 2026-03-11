import { defineComponent as h, openBlock as t, createElementBlock as s, renderSlot as d, createTextVNode as P, toDisplayString as r, ref as w, resolveComponent as B, createElementVNode as u, createVNode as g, createCommentVNode as c, Fragment as f, renderList as k, createBlock as S, Teleport as E, unref as v, withCtx as I, computed as _, normalizeClass as N } from "vue";
import { M as V } from "./DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { F as C, u as T } from "./feedback-3.0.2.js";
const L = { class: "bg-light text-info" }, z = /* @__PURE__ */ h({
  __name: "Pending",
  props: {
    msg: { default: "Loading..." }
  },
  setup(e) {
    return (o, a) => (t(), s("div", L, [
      d(o.$slots, "message", {}, () => [
        P(r(e.msg), 1)
      ])
    ]));
  }
}), D = { class: "bg-success bg-opacity-75 text-light" }, U = /* @__PURE__ */ h({
  __name: "Success",
  props: {
    msg: { default: "Success!" }
  },
  setup(e) {
    return (o, a) => (t(), s("div", D, [
      d(o.$slots, "message", {}, () => [
        P(r(e.msg), 1)
      ])
    ]));
  }
}), j = { class: "bg-danger bg-opacity-75 text-light" }, q = { class: "row gy-0 gx-1" }, A = { class: "col-auto" }, G = ["diabled"], H = { class: "col-auto pt-1" }, J = {
  key: 0,
  class: "col-auto"
}, K = ["diabled"], O = {
  key: 0,
  class: "mt-2"
}, Q = {
  key: 0,
  class: "mt-2"
}, R = { key: 1 }, W = {
  key: 0,
  class: "mt-2"
}, X = {
  key: 0,
  class: "mt-2"
}, Y = { key: 1 }, Z = /* @__PURE__ */ h({
  __name: "ErrorSummary",
  props: {
    msg: { default: "Unfortunately, an error has occurred." },
    error: { default: () => ({}) },
    enablePopup: { type: Boolean }
  },
  setup(e) {
    const o = w(!1);
    return (a, l) => {
      const m = B("Icon"), p = B("MyModal");
      return t(), s("div", j, [
        d(a.$slots, "message", {}, () => [
          u("div", q, [
            u("div", A, [
              u("button", {
                type: "button",
                class: "btn btn-default p-0 m-0 text-light",
                diabled: !e.error,
                onClick: l[0] || (l[0] = (n) => o.value = !o.value)
              }, [
                g(m, { name: "warning" })
              ], 8, G)
            ]),
            u("div", H, r(e.msg), 1),
            e.enablePopup && e.error ? (t(), s("div", J, [
              u("button", {
                type: "button",
                class: "btn btn-link p-0 m-0 text-light",
                diabled: !e.error,
                onClick: l[1] || (l[1] = (n) => o.value = !o.value)
              }, [
                g(m, { name: "info" })
              ], 8, K)
            ])) : c("", !0)
          ])
        ]),
        d(a.$slots, "summary", {}, () => [
          e.error ? (t(), s(f, { key: 0 }, [
            typeof e.error == "string" ? (t(), s("div", O, r(e.error), 1)) : (t(!0), s(f, { key: 1 }, k(e.error, (n, y) => (t(), s("ul", {
              class: "list-unstyled mt-2",
              key: y
            }, [
              u("li", null, [
                u("b", null, r(y), 1),
                typeof n == "string" ? (t(), s("div", Q, r(n), 1)) : (t(), s("ul", R, [
                  (t(!0), s(f, null, k(n, (i) => (t(), s("li", { key: i }, r(i), 1))), 128))
                ]))
              ])
            ]))), 128))
          ], 64)) : c("", !0)
        ]),
        (t(), S(E, { to: "#modals" }, [
          o.value ? (t(), S(p, {
            key: 0,
            title: e.msg,
            "show-footer": !1,
            type: v(V).danger,
            onClose: l[2] || (l[2] = (n) => o.value = !1),
            onCancel: l[3] || (l[3] = (n) => o.value = !1),
            onSubmit: l[4] || (l[4] = (n) => o.value = !1)
          }, {
            default: I(() => [
              typeof e.error == "string" ? (t(), s("div", W, r(e.error), 1)) : (t(!0), s(f, { key: 1 }, k(e.error, (n, y) => (t(), s("ul", {
                class: "list-unstyled mt-2",
                key: y
              }, [
                u("li", null, [
                  u("b", null, r(y), 1),
                  typeof n == "string" ? (t(), s("div", X, r(n), 1)) : (t(), s("ul", Y, [
                    (t(!0), s(f, null, k(n, (i) => (t(), s("li", { key: i }, r(i), 1))), 128))
                  ]))
                ])
              ]))), 128))
            ]),
            _: 1
          }, 8, ["title", "type"])) : c("", !0)
        ]))
      ]);
    };
  }
}), ee = {
  key: 0,
  class: "mb-1 position-relative border h-100"
}, le = /* @__PURE__ */ h({
  __name: "Feedback",
  props: {
    hideCloseButton: { type: Boolean, default: !1 },
    feedback: {},
    enableErrorPopup: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: o }) {
    const a = o, l = e, { status: m, message: p, error: n, reset: y } = l.feedback, i = _(() => m.value === C.pending), x = _(() => m.value === C.success), $ = _(() => m.value === C.failed), F = (b) => {
      b.stopPropagation(), a("close", { status: m.value, error: n.value }), y();
    };
    return (b, te) => {
      const M = B("IconButton");
      return i.value || x.value || $.value ? (t(), s("div", ee, [
        e.hideCloseButton ? c("", !0) : d(b.$slots, "close-button", { key: 0 }, () => [
          g(M, {
            icon: "close",
            class: N(["btn btn-sm position-absolute end-0 p-1", { "text-light": $.value }]),
            onClick: F
          }, null, 8, ["class"])
        ]),
        i.value ? d(b.$slots, "pending", { key: 1 }, () => [
          g(z, {
            msg: v(p),
            class: "px-2 py-1 border h-100"
          }, null, 8, ["msg"])
        ]) : c("", !0),
        x.value ? d(b.$slots, "success", { key: 2 }, () => [
          g(U, {
            msg: v(p),
            class: "px-2 py-1 border h-100"
          }, null, 8, ["msg"])
        ]) : c("", !0),
        $.value ? d(b.$slots, "error", { key: 3 }, () => [
          g(Z, {
            msg: v(p),
            error: v(n),
            "enable-popup": e.enableErrorPopup,
            class: "px-2 border h-100"
          }, null, 8, ["msg", "error", "enable-popup"])
        ]) : c("", !0)
      ])) : c("", !0);
    };
  }
}), re = {
  install: (e, o) => {
    const a = T(o);
    e.config.globalProperties.$feedback = a, e.provide("feedback", a);
  }
};
export {
  Z as _,
  le as a,
  z as b,
  U as c,
  re as p
};
