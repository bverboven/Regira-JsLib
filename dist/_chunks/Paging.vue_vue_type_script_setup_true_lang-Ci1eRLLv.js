import { defineComponent as N, computed as g, resolveComponent as B, openBlock as s, createBlock as C, Transition as q, withCtx as P, createElementBlock as $, withKeys as G, createElementVNode as h, normalizeClass as _, normalizeStyle as j, renderSlot as v, createCommentVNode as S, createTextVNode as k, toDisplayString as V, createVNode as A, ref as E, Teleport as K, toRefs as O, resolveDynamicComponent as R, unref as c, withModifiers as L, Fragment as Z, renderList as U, mergeDefaults as H } from "vue";
import { a as J } from "./vue-helper-BRpk5zez.js";
import { useRouter as Q } from "vue-router";
var M = /* @__PURE__ */ ((e) => (e.normal = "Normal", e.success = "Success", e.warning = "Warning", e.danger = "Danger", e))(M || {});
const X = { class: "modal-wrapper" }, Y = {
  class: "modal show d-block",
  tabindex: "-1"
}, x = { class: "d-flex justify-content-between w-100" }, ee = { class: "modal-title" }, te = { class: "d-flex justify-content-between w-100" }, be = /* @__PURE__ */ N({
  __name: "DefaultModal",
  props: {
    title: {},
    isVisible: { type: Boolean },
    showHeader: { type: Boolean, default: !0 },
    showFooter: { type: Boolean, default: !0 },
    fullWidth: { type: Boolean },
    type: { default: M.normal }
  },
  emits: ["submit", "cancel", "close"],
  setup(e, { emit: u }) {
    const t = u, a = e, b = g(() => a.type === M.normal), y = g(() => a.type === M.success), f = g(() => a.type === M.warning), l = g(() => a.type === M.danger), d = g(() => ({
      "bg-normal": b.value,
      "bg-success": y.value,
      "bg-danger": l.value,
      "text-white": l.value,
      "bg-warning": f.value
    })), r = g(() => ({
      "text-danger": l.value
    })), m = g(() => ({})), o = () => t("close"), w = () => t("cancel"), p = () => t("submit");
    return (n, i) => {
      const I = B("Icon"), T = B("IconButton");
      return s(), C(q, { name: "modal" }, {
        default: P(() => [
          e.isVisible ? (s(), $("div", {
            key: 0,
            class: "modal-mask",
            onKeydown: G(o, ["esc"])
          }, [
            h("div", X, [
              h("div", Y, [
                h("div", {
                  class: _(["modal-dialog modal-dialog-scrollable", { "full-width": e.fullWidth }])
                }, [
                  h("div", {
                    class: "modal-content",
                    style: j({ "min-height": e.fullWidth ? "60vh" : "inherit" })
                  }, [
                    e.showHeader ? (s(), $("div", {
                      key: 0,
                      class: _(["modal-header py-2", d.value])
                    }, [
                      h("div", x, [
                        v(n.$slots, "title", {}, () => [
                          h("h3", ee, [
                            l.value ? (s(), C(I, {
                              key: 0,
                              name: "alert",
                              class: "me-2"
                            })) : S("", !0),
                            f.value ? (s(), C(I, {
                              key: 1,
                              name: "warning",
                              class: "me-2"
                            })) : S("", !0),
                            k(" " + V(e.title), 1)
                          ])
                        ]),
                        v(n.$slots, "header-close-button", { handleClose: o }, () => [
                          A(T, {
                            icon: "close",
                            class: _([l.value ? "btn-danger" : "btn-outline-danger"]),
                            title: "close",
                            onClick: o,
                            "data-dismiss": "modal"
                          }, null, 8, ["class"])
                        ])
                      ])
                    ], 2)) : S("", !0),
                    h("div", {
                      class: _(["modal-body", r.value])
                    }, [
                      v(n.$slots, "default")
                    ], 2),
                    e.showFooter ? (s(), $("div", {
                      key: 1,
                      class: _(["modal-footer py-1", m.value])
                    }, [
                      v(n.$slots, "buttons", {}, () => [
                        h("div", te, [
                          v(n.$slots, "footer-close-button", { handleCancel: w }, () => [
                            h("div", null, [
                              A(T, {
                                icon: "cancel",
                                class: "btn-outline-secondary",
                                onClick: w
                              }, {
                                default: P(() => [...i[0] || (i[0] = [
                                  k("Cancel", -1)
                                ])]),
                                _: 1
                              })
                            ])
                          ]),
                          v(n.$slots, "footer-submit-button", { handleClose: p }, () => [
                            h("div", null, [
                              A(T, {
                                icon: "submit",
                                class: _(l.value ? "btn-danger" : "btn-success"),
                                onClick: p
                              }, {
                                default: P(() => [...i[1] || (i[1] = [
                                  k("Submit", -1)
                                ])]),
                                _: 1
                              }, 8, ["class"])
                            ])
                          ])
                        ])
                      ])
                    ], 2)) : S("", !0)
                  ], 4)
                ], 2)
              ])
            ])
          ], 32)) : S("", !0)
        ]),
        _: 3
      });
    };
  }
});
var ne = /* @__PURE__ */ ((e) => (e.none = "", e.pending = "Pending", e.success = "Success", e.failed = "Failed", e))(ne || {});
function ye({ autoHideDelay: e = 1500 } = {}) {
  const u = E(
    ""
    /* none */
  ), t = E(""), a = E(null);
  let b;
  function y() {
    e > 0 && (clearTimeout(b), b = setTimeout(f, e));
  }
  function f() {
    u.value = "", t.value = "", a.value = null;
  }
  function l(m) {
    u.value = "Pending", t.value = m, a.value = null;
  }
  function d(m) {
    u.value = "Success", t.value = m, a.value = null, e && y();
  }
  function r(m, o) {
    u.value = "Failed", t.value = m, typeof o == "string" ? t.value = `${t.value}: ${o.split(`
`)[0]}` : a.value = o?.message || o;
  }
  return {
    status: u,
    message: t,
    error: a,
    pending: l,
    success: d,
    fail: r,
    reset: f
  };
}
const ae = ["name"], le = {
  key: 1,
  class: "ms-1"
}, Ce = /* @__PURE__ */ N({
  __name: "ConfirmButton",
  props: {
    icon: { default: "warning" },
    buttonLabel: {},
    modalTitle: { default: "Sure?" },
    modalType: { default: M.warning }
  },
  emits: ["confirm", "cancel", "open", "close"],
  setup(e, { emit: u }) {
    const t = u, a = E(!1);
    function b() {
      t("confirm"), l();
    }
    function y() {
      t("open"), a.value = !0;
    }
    function f() {
      t("cancel"), l();
    }
    function l() {
      t("close"), a.value = !1;
    }
    return (d, r) => {
      const m = B("Icon"), o = B("MyModal");
      return s(), $("button", {
        type: "button",
        class: "btn",
        name: e.icon,
        onClick: y
      }, [
        v(d.$slots, "button-content", {}, () => [
          e.icon != null ? (s(), C(m, {
            key: 0,
            name: e.icon
          }, null, 8, ["name"])) : S("", !0),
          e.buttonLabel ? (s(), $("span", le, V(e.buttonLabel), 1)) : S("", !0)
        ]),
        (s(), C(K, { to: "#modals" }, [
          v(d.$slots, "modal", {}, () => [
            A(o, {
              "is-visible": a.value,
              type: e.modalType,
              title: e.modalTitle,
              onSubmit: b,
              onCancel: f,
              onClose: l
            }, {
              default: P(() => [
                v(d.$slots, "default")
              ]),
              _: 3
            }, 8, ["is-visible", "type", "title"])
          ])
        ]))
      ], 8, ae);
    };
  }
}), oe = {
  PAGESIZE: 10
};
var W = /* @__PURE__ */ ((e) => (e.anchor = "Anchor", e.button = "Button", e))(W || {});
const se = {
  maxPages: 9,
  buttonType: "Anchor"
  /* anchor */
};
function ue({ pagingInfo: e, count: u, maxPages: t, emit: a }) {
  t = window.innerWidth < 576 ? Math.ceil(t / 2) : t;
  const b = g(() => (isNaN(parseInt(e.value.pageSize + "")) ? null : e.value.pageSize) || oe.PAGESIZE), y = Q();
  function f(n) {
    const { name: i, path: I, hash: T, query: z } = y.currentRoute.value, D = { name: i, query: z }, F = {
      name: D.name || void 0,
      query: {
        ...D.query,
        page: n
      }
    };
    return n <= 1 && delete F.query.p, y.resolve(F).fullPath;
  }
  const l = g(() => e.value.page || 1), d = g(() => Math.ceil(u.value / b.value)), r = g(() => Math.min(d.value, t)), m = g(() => {
    const n = Math.floor(r.value / 2);
    let i = Math.max(l.value - n, 1);
    return i + t > d.value && (i -= i + t - d.value - 1), Math.max(i, 1);
  }), o = g(() => Math.min(m.value + r.value, d.value)), w = g(() => !isNaN(r.value) && r.value > 0 ? Array(r.value).fill(0).map((n, i) => m.value + i).filter((n) => n <= o.value) : []);
  function p(n) {
    const i = {
      ...e.value,
      page: n
    };
    a("update:modelValue", i), a("change", i);
  }
  return {
    pagedRoute: f,
    page: l,
    totalPages: d,
    totalVisiblePages: r,
    firstPage: m,
    lastPage: o,
    pages: w,
    handleChangePage: p
  };
}
const ie = /* @__PURE__ */ N({
  __name: "PagingAnchor",
  props: {
    to: {},
    page: {}
  },
  setup(e) {
    return (u, t) => {
      const a = B("RouterLink");
      return s(), C(a, {
        class: "page-link",
        to: e.to,
        title: "page " + e.page,
        activeClass: "active-page"
      }, {
        default: P(() => [
          v(u.$slots, "default", {}, () => [
            k(V(e.page), 1)
          ])
        ]),
        _: 3
      }, 8, ["to", "title"]);
    };
  }
}), ce = ["title"], re = /* @__PURE__ */ N({
  __name: "PagingButton",
  props: {
    to: {},
    page: {}
  },
  setup(e) {
    return (u, t) => (s(), $("button", {
      type: "button",
      class: "btn btn-link page-link",
      title: "page " + e.page
    }, [
      v(u.$slots, "default", {}, () => [
        k(V(e.page), 1)
      ])
    ], 8, ce));
  }
}), de = { "aria-label": "Pagination" }, me = { class: "pagination" }, ge = { class: "page-item" }, ve = { class: "page-item" }, $e = /* @__PURE__ */ N({
  __name: "Paging",
  props: /* @__PURE__ */ H({
    modelValue: {},
    count: {},
    maxPages: {},
    buttonType: {}
  }, { ...se }),
  emits: ["update:modelValue", "change"],
  setup(e, { emit: u }) {
    const t = u, a = e, b = J(a, t), { count: y } = O(a), f = a.buttonType == W.button ? re : ie, { pagedRoute: l, page: d, totalPages: r, pages: m, handleChangePage: o } = ue({
      pagingInfo: b,
      count: y,
      maxPages: a.maxPages,
      emit: t
    });
    return (w, p) => (s(), $("nav", de, [
      h("ul", me, [
        h("li", ge, [
          v(w.$slots, "firstPage", { page: 1 }, () => [
            (s(), C(R(c(f)), {
              page: 1,
              to: c(l)(1),
              onClick: p[0] || (p[0] = L((n) => c(o)(1), ["prevent"])),
              "aria-label": "Previous"
            }, {
              default: P(() => [...p[2] || (p[2] = [
                k("«", -1)
              ])]),
              _: 1
            }, 8, ["to"]))
          ])
        ]),
        (s(!0), $(Z, null, U(c(m), (n) => (s(), $("li", {
          class: _(["page-item", { active: n == c(d) }]),
          key: n
        }, [
          v(w.$slots, "default", {
            page: n,
            route: c(l)(n),
            handleChange: c(o)
          }, () => [
            (s(), C(R(c(f)), {
              page: n,
              to: c(l)(n),
              onClick: L((i) => c(o)(n), ["prevent"])
            }, {
              default: P(() => [
                k(V(n), 1)
              ]),
              _: 2
            }, 1032, ["page", "to", "onClick"]))
          ])
        ], 2))), 128)),
        h("li", ve, [
          v(w.$slots, "lastPage", { page: c(r) }, () => [
            (s(), C(R(c(f)), {
              page: c(r),
              to: c(l)(c(r)),
              onClick: p[1] || (p[1] = L((n) => c(o)(c(r)), ["prevent"])),
              "aria-label": "Next"
            }, {
              default: P(() => [...p[3] || (p[3] = [
                k(" » ", -1)
              ])]),
              _: 1
            }, 8, ["page", "to"]))
          ])
        ])
      ])
    ]));
  }
});
export {
  W as B,
  ne as F,
  M,
  oe as P,
  be as _,
  $e as a,
  Ce as b,
  se as p,
  ye as u
};
