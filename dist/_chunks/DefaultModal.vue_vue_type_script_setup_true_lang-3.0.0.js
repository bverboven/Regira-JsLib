import { defineComponent as x, computed as s, resolveComponent as S, openBlock as n, createBlock as h, Transition as j, withCtx as f, createElementBlock as g, withKeys as z, createElementVNode as t, normalizeClass as a, normalizeStyle as E, renderSlot as c, createCommentVNode as d, createTextVNode as y, toDisplayString as F, createVNode as w } from "vue";
var i = /* @__PURE__ */ ((e) => (e.normal = "Normal", e.success = "Success", e.warning = "Warning", e.danger = "Danger", e))(i || {});
const H = { class: "modal-wrapper" }, K = {
  class: "modal show d-block",
  tabindex: "-1"
}, _ = { class: "d-flex justify-content-between w-100" }, q = { class: "modal-title" }, A = { class: "d-flex justify-content-between w-100" }, J = /* @__PURE__ */ x({
  __name: "DefaultModal",
  props: {
    title: {},
    isVisible: { type: Boolean },
    showHeader: { type: Boolean, default: !0 },
    showFooter: { type: Boolean, default: !0 },
    fullWidth: { type: Boolean },
    type: { default: i.normal }
  },
  emits: ["submit", "cancel", "close"],
  setup(e, { emit: N }) {
    const m = N, r = e, V = s(() => r.type === i.normal), $ = s(() => r.type === i.success), C = s(() => r.type === i.warning), l = s(() => r.type === i.danger), W = s(() => ({
      "bg-normal": V.value,
      "bg-success": $.value,
      "bg-danger": l.value,
      "text-white": l.value,
      "bg-warning": C.value
    })), D = s(() => ({
      "text-danger": l.value
    })), I = s(() => ({})), v = () => m("close"), k = () => m("cancel"), p = () => m("submit");
    return (o, u) => {
      const B = S("Icon"), b = S("IconButton");
      return n(), h(j, { name: "modal" }, {
        default: f(() => [
          e.isVisible ? (n(), g("div", {
            key: 0,
            class: "modal-mask",
            onKeydown: z(v, ["esc"])
          }, [
            t("div", H, [
              t("div", K, [
                t("div", {
                  class: a(["modal-dialog modal-dialog-scrollable", { "full-width": e.fullWidth }])
                }, [
                  t("div", {
                    class: "modal-content",
                    style: E({ "min-height": e.fullWidth ? "60vh" : "inherit" })
                  }, [
                    e.showHeader ? (n(), g("div", {
                      key: 0,
                      class: a(["modal-header py-2", W.value])
                    }, [
                      t("div", _, [
                        c(o.$slots, "title", {}, () => [
                          t("h3", q, [
                            l.value ? (n(), h(B, {
                              key: 0,
                              name: "alert",
                              class: "me-2"
                            })) : d("", !0),
                            C.value ? (n(), h(B, {
                              key: 1,
                              name: "warning",
                              class: "me-2"
                            })) : d("", !0),
                            y(" " + F(e.title), 1)
                          ])
                        ]),
                        c(o.$slots, "header-close-button", { handleClose: v }, () => [
                          w(b, {
                            icon: "close",
                            class: a([l.value ? "btn-danger" : "btn-outline-danger"]),
                            title: "close",
                            onClick: v,
                            "data-dismiss": "modal"
                          }, null, 8, ["class"])
                        ])
                      ])
                    ], 2)) : d("", !0),
                    t("div", {
                      class: a(["modal-body", D.value])
                    }, [
                      c(o.$slots, "default")
                    ], 2),
                    e.showFooter ? (n(), g("div", {
                      key: 1,
                      class: a(["modal-footer py-1", I.value])
                    }, [
                      c(o.$slots, "buttons", {}, () => [
                        t("div", A, [
                          c(o.$slots, "footer-close-button", { handleCancel: k }, () => [
                            t("div", null, [
                              w(b, {
                                icon: "cancel",
                                class: "btn-outline-secondary",
                                onClick: k
                              }, {
                                default: f(() => [...u[0] || (u[0] = [
                                  y("Cancel", -1)
                                ])]),
                                _: 1
                              })
                            ])
                          ]),
                          c(o.$slots, "footer-submit-button", { handleClose: p }, () => [
                            t("div", null, [
                              w(b, {
                                icon: "submit",
                                class: a(l.value ? "btn-danger" : "btn-success"),
                                onClick: p
                              }, {
                                default: f(() => [...u[1] || (u[1] = [
                                  y("Submit", -1)
                                ])]),
                                _: 1
                              }, 8, ["class"])
                            ])
                          ])
                        ])
                      ])
                    ], 2)) : d("", !0)
                  ], 4)
                ], 2)
              ])
            ])
          ], 32)) : d("", !0)
        ]),
        _: 3
      });
    };
  }
});
export {
  i as M,
  J as _
};
