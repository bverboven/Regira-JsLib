import { ref as p, watch as E, onMounted as I, getCurrentInstance as D, unref as S } from "vue";
import { useRouter as O } from "vue-router";
import { e as h, m as $ } from "./array-utility-3.0.2.js";
import "./DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { u as C } from "./feedback-3.0.2.js";
import { useVModelField as V } from "../vue/vue-helper.js";
var P = /* @__PURE__ */ ((a) => (a.pending = "Pending", a.saved = "Saved", a.removed = "Removed", a.error = "Error", a))(P || {});
const j = {
  // no defaults
  readonly: !1,
  isPopup: !1
};
function A({ entityService: a, props: s, emit: e, feedback: o = C() }) {
  const { readonly: c, isPopup: i } = s, n = p(s.modelValue), u = p();
  function f() {
    e("cancel", { canceled: n.value, original: u.value }), n.value = u.value;
  }
  function d() {
    if (c)
      throw o.fail("Readonly"), new Error("Readonly");
  }
  const w = O();
  async function y() {
    d(), e(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      o.pending("Saving...");
      const { saved: r, isNew: l } = await a.save(n.value);
      if (e("save", { saved: r, isNew: l }), o.success("Saved"), n.value = a.toEntity(h(r)), u.value = a.toEntity(h(r)), e("update:modelValue", n.value), l && !i) {
        const v = w.currentRoute.value;
        delete v.query.src;
        const t = {
          name: v.name,
          params: {
            ...v.params,
            id: r.$id
          },
          query: {
            ...v.query
          },
          hash: v.hash
        };
        w.replace(t);
      }
    } catch (r) {
      console.error("Saving failed", { ex: r });
      const l = r, v = l.response?.status;
      throw v == 400 ? o.fail("Saving failed", l.response?.data?.errors) : v == 404 ? o.fail("Item not found", l.response?.data?.message || l.message) : o.fail("Server error", l.response?.data?.message || l.message), e(
        "changeState",
        "Error"
        /* error */
      ), r;
    } finally {
      e(
        "changeState",
        "Saved"
        /* saved */
      );
    }
  }
  async function g() {
    d(), e(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      o.pending("Deleting..."), await a.remove(n.value), o.success("Deleted"), e("remove", n.value);
    } catch (r) {
      console.error("Deleting failed", { item: n, ex: r });
      const l = r;
      throw o.fail("Deleting failed", l.response?.data?.errors), e(
        "changeState",
        "Error"
        /* error */
      ), r;
    } finally {
      e(
        "changeState",
        "Removed"
        /* removed */
      );
    }
  }
  async function R() {
    const r = a.toEntity(h(n.value));
    r.isArchived = !1, e(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      o.pending("Restoring...");
      const { saved: l, isNew: v } = await a.save(r);
      e("restore", l), e("save", { saved: l, isNew: v }), o.success("Restored"), n.value = a.toEntity(h(l)), u.value = a.toEntity(h(l)), e("update:modelValue", n.value);
    } catch (l) {
      console.error("Restoring failed", { item: n, ex: l });
      const v = l;
      throw o.fail("Restoring failed", v.response?.data?.errors), e(
        "changeState",
        "Error"
        /* error */
      ), l;
    } finally {
      e(
        "changeState",
        "Saved"
        /* saved */
      );
    }
  }
  return E(
    () => s.modelValue,
    () => {
      n.value = s.modelValue, u.value = a.toEntity(h(n.value));
    }
  ), I(() => {
    u.value = a.toEntity(h(n.value));
  }), {
    item: n,
    original: u,
    feedback: o,
    handleCancel: f,
    handleSubmit: y,
    handleRemove: g,
    handleRestore: R
  };
}
const z = {
  closeOnSave: !1,
  closeOnDelete: !0
};
function B({
  entityService: a,
  model: s,
  itemDefaults: e,
  closeOnSave: o,
  closeOnCancel: c,
  closeOnDelete: i,
  emit: n,
  feedback: u
}) {
  const f = p(!1), d = p(), w = D();
  function y(t) {
    d.value = t;
  }
  function g() {
    n("close", d.value), f.value = !1;
  }
  async function R() {
    let t = s.value;
    try {
      const m = typeof e != "function" ? h(S(e) || {}) : {};
      t == null && (t = await a.newEntity(m)), t?.$id || (t = a.toEntity(t || m)), a != null && t.$id !== "new" && (t = await a.details(t.$id) || t), typeof e == "function" && (t = await e(t)), d.value = t, f.value = !0, n("open", d.value, y);
    } catch (m) {
      console.error("Fetching details failed", { id: t?.$id, ex: m, app: w }), u ||= w?.appContext.config.globalProperties.$feedback, u.fail(`Fetching ${t?.$title || "item #" + t?.$id} failed`, m.response.status == 403 ? "Not allowed" : m.response?.data);
    }
  }
  function r(t) {
    c && (n("cancel", t), g());
  }
  function l({ saved: t, isNew: m }) {
    n("save", { saved: t, isNew: m }), n("update:modelValue", t), o && g();
  }
  function v() {
    n("remove", d.value), i && g();
  }
  return {
    item: d,
    isOpen: f,
    feedback: u,
    close: g,
    open: R,
    handleSave: l,
    handleRemove: v,
    handleCancel: r
  };
}
function G({ props: a, emit: s }) {
  const e = V(a, s), o = p({ id: 0 }), c = (n) => {
    s("sort", n);
  };
  function i({ saved: n, isNew: u }) {
    if (u) {
      const f = ($(e.value, (d) => d.id) ?? 0) - 1;
      n.id = f, s("update:modelValue", e.value.concat([n])), o.value = { id: 0 };
    }
  }
  return {
    items: e,
    newItem: o,
    handleSort: c,
    handleSave: i
  };
}
function H({ props: a, emit: s }) {
  const e = V(a, s);
  function o() {
    s("save", { saved: e.value, isNew: !e.value.id });
  }
  function c(i) {
    i._deleted = !i._deleted, s("remove", i);
  }
  return {
    item: e,
    handleSave: o,
    handleRemove: c
  };
}
function J({ props: a, emit: s }) {
  const e = V(a, s), o = () => ({
    id: 0
  }), c = p();
  async function i() {
    c.value = o();
  }
  const n = (f) => {
    s("sort", f);
  };
  function u({ saved: f, isNew: d }) {
    if (d) {
      const w = Math.min($(e.value, (g) => g.id) ?? 0, 0) - 1;
      f.id = w;
      const y = e.value.concat([f]);
      e.value = y, i();
    }
  }
  return E(
    () => a.modelValue,
    () => e.value = a.modelValue || []
  ), I(async () => {
    e.value = a.modelValue || [], await i();
  }), {
    items: e,
    newItem: c,
    resetNewItem: i,
    handleSort: n,
    handleSave: u
  };
}
function K(a, { props: s, emit: e }) {
  const o = p(s.modelValue || { id: 0 }), c = p(!1);
  function i() {
    const f = s.modelValue || {}, d = h(S(s.itemDefaults || {}));
    o.value = Object.assign(new a(), {
      ...f,
      ...d
    }), c.value = !0;
  }
  function n() {
    e("cancel"), c.value = !1;
  }
  function u() {
    e("save", { saved: o.value, isNew: o.value.id == 0 }), e("update:modelValue", o.value), c.value = !1;
  }
  return {
    item: o,
    isOpen: c,
    handleOpen: i,
    handleCancel: n,
    handleSubmit: u
  };
}
export {
  P as F,
  z as a,
  G as b,
  H as c,
  B as d,
  J as e,
  j as f,
  K as g,
  A as u
};
