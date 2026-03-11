import { defineComponent as k, ref as B, resolveComponent as V, openBlock as u, createElementBlock as b, renderSlot as d, createBlock as P, createCommentVNode as R, toDisplayString as M, Teleport as D, createVNode as q, withCtx as _, computed as v, createTextVNode as $, toRefs as z, createElementVNode as N, resolveDynamicComponent as S, unref as a, withModifiers as T, Fragment as G, renderList as I, normalizeClass as F, mergeDefaults as Z } from "vue";
import { M as x } from "./DefaultModal.vue_vue_type_script_setup_true_lang-3.0.0.js";
import { useVModelField as O } from "../vue/vue-helper.js";
import { useRouter as U } from "vue-router";
const W = ["name"], j = {
  key: 1,
  class: "ms-1"
}, ce = /* @__PURE__ */ k({
  __name: "ConfirmButton",
  props: {
    icon: { default: "warning" },
    buttonLabel: {},
    modalTitle: { default: "Sure?" },
    modalType: { default: x.warning }
  },
  emits: ["confirm", "cancel", "open", "close"],
  setup(e, { emit: m }) {
    const n = m, o = B(!1);
    function y() {
      n("confirm"), i();
    }
    function h() {
      n("open"), o.value = !0;
    }
    function p() {
      n("cancel"), i();
    }
    function i() {
      n("close"), o.value = !1;
    }
    return (r, l) => {
      const f = V("Icon"), g = V("MyModal");
      return u(), b("button", {
        type: "button",
        class: "btn",
        name: e.icon,
        onClick: h
      }, [
        d(r.$slots, "button-content", {}, () => [
          e.icon != null ? (u(), P(f, {
            key: 0,
            name: e.icon
          }, null, 8, ["name"])) : R("", !0),
          e.buttonLabel ? (u(), b("span", j, M(e.buttonLabel), 1)) : R("", !0)
        ]),
        (u(), P(D, { to: "#modals" }, [
          d(r.$slots, "modal", {}, () => [
            q(g, {
              "is-visible": o.value,
              type: e.modalType,
              title: e.modalTitle,
              onSubmit: y,
              onCancel: p,
              onClose: i
            }, {
              default: _(() => [
                d(r.$slots, "default")
              ]),
              _: 3
            }, 8, ["is-visible", "type", "title"])
          ])
        ]))
      ], 8, W);
    };
  }
}), H = {
  PAGESIZE: 10
};
var w = /* @__PURE__ */ ((e) => (e.anchor = "Anchor", e.button = "Button", e))(w || {});
const J = {
  maxPages: 9,
  buttonType: "Anchor"
  /* anchor */
};
function K({ pagingInfo: e, count: m, maxPages: n, emit: o }) {
  n = window.innerWidth < 576 ? Math.ceil(n / 2) : n;
  const y = v(() => (isNaN(parseInt(e.value.pageSize + "")) ? null : e.value.pageSize) || H.PAGESIZE), h = U();
  function p(t) {
    const { name: s, path: oe, hash: le, query: L } = h.currentRoute.value, A = { name: s, query: L }, E = {
      name: A.name || void 0,
      query: {
        ...A.query,
        page: t
      }
    };
    return t <= 1 && delete E.query.p, h.resolve(E).fullPath;
  }
  const i = v(() => e.value.page || 1), r = v(() => Math.ceil(m.value / y.value)), l = v(() => Math.min(r.value, n)), f = v(() => {
    const t = Math.floor(l.value / 2);
    let s = Math.max(i.value - t, 1);
    return s + n > r.value && (s -= s + n - r.value - 1), Math.max(s, 1);
  }), g = v(() => Math.min(f.value + l.value, r.value)), C = v(() => !isNaN(l.value) && l.value > 0 ? Array(l.value).fill(0).map((t, s) => f.value + s).filter((t) => t <= g.value) : []);
  function c(t) {
    const s = {
      ...e.value,
      page: t
    };
    o("update:modelValue", s), o("change", s);
  }
  return {
    pagedRoute: p,
    page: i,
    totalPages: r,
    totalVisiblePages: l,
    firstPage: f,
    lastPage: g,
    pages: C,
    handleChangePage: c
  };
}
const Q = /* @__PURE__ */ k({
  __name: "PagingAnchor",
  props: {
    to: {},
    page: {}
  },
  setup(e) {
    return (m, n) => {
      const o = V("RouterLink");
      return u(), P(o, {
        class: "page-link",
        to: e.to,
        title: "page " + e.page,
        activeClass: "active-page"
      }, {
        default: _(() => [
          d(m.$slots, "default", {}, () => [
            $(M(e.page), 1)
          ])
        ]),
        _: 3
      }, 8, ["to", "title"]);
    };
  }
}), X = ["title"], Y = /* @__PURE__ */ k({
  __name: "PagingButton",
  props: {
    to: {},
    page: {}
  },
  setup(e) {
    return (m, n) => (u(), b("button", {
      type: "button",
      class: "btn btn-link page-link",
      title: "page " + e.page
    }, [
      d(m.$slots, "default", {}, () => [
        $(M(e.page), 1)
      ])
    ], 8, X));
  }
}), ee = { "aria-label": "Pagination" }, te = { class: "pagination" }, ae = { class: "page-item" }, ne = { class: "page-item" }, me = /* @__PURE__ */ k({
  __name: "Paging",
  props: /* @__PURE__ */ Z({
    modelValue: {},
    count: {},
    maxPages: {},
    buttonType: {}
  }, { ...J }),
  emits: ["update:modelValue", "change"],
  setup(e, { emit: m }) {
    const n = m, o = e, y = O(o, n), { count: h } = z(o), p = o.buttonType == w.button ? Y : Q, { pagedRoute: i, page: r, totalPages: l, pages: f, handleChangePage: g } = K({
      pagingInfo: y,
      count: h,
      maxPages: o.maxPages,
      emit: n
    });
    return (C, c) => (u(), b("nav", ee, [
      N("ul", te, [
        N("li", ae, [
          d(C.$slots, "firstPage", { page: 1 }, () => [
            (u(), P(S(a(p)), {
              page: 1,
              to: a(i)(1),
              onClick: c[0] || (c[0] = T((t) => a(g)(1), ["prevent"])),
              "aria-label": "Previous"
            }, {
              default: _(() => [...c[2] || (c[2] = [
                $("«", -1)
              ])]),
              _: 1
            }, 8, ["to"]))
          ])
        ]),
        (u(!0), b(G, null, I(a(f), (t) => (u(), b("li", {
          class: F(["page-item", { active: t == a(r) }]),
          key: t
        }, [
          d(C.$slots, "default", {
            page: t,
            route: a(i)(t),
            handleChange: a(g)
          }, () => [
            (u(), P(S(a(p)), {
              page: t,
              to: a(i)(t),
              onClick: T((s) => a(g)(t), ["prevent"])
            }, {
              default: _(() => [
                $(M(t), 1)
              ]),
              _: 2
            }, 1032, ["page", "to", "onClick"]))
          ])
        ], 2))), 128)),
        N("li", ne, [
          d(C.$slots, "lastPage", { page: a(l) }, () => [
            (u(), P(S(a(p)), {
              page: a(l),
              to: a(i)(a(l)),
              onClick: c[1] || (c[1] = T((t) => a(g)(a(l)), ["prevent"])),
              "aria-label": "Next"
            }, {
              default: _(() => [...c[3] || (c[3] = [
                $(" » ", -1)
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
  w as B,
  H as P,
  me as _,
  ce as a,
  J as p
};
