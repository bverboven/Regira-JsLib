import { AxiosError as Q } from "axios";
import { c as k } from "../../_chunks/query-Bo7m-wc_.js";
import { q as G, p as ie, e as oe, g as b, m as W, h as ce } from "../../_chunks/array-utility-vRAWSlLj.js";
import { defineComponent as le, computed as S, ref as g, unref as D, withAsyncContext as ue, toRefs as de, withDirectives as fe, openBlock as E, createElementBlock as I, isRef as he, renderSlot as ve, createElementVNode as R, toDisplayString as _, createCommentVNode as pe, Fragment as P, renderList as j, vModelSelect as me, watch as V, onMounted as N, resolveComponent as ge, normalizeClass as ye, createVNode as H, getCurrentInstance as we, toRaw as Se } from "vue";
import { useRouter as C } from "vue-router";
import { u as q } from "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-Ci1eRLLv.js";
import { a as L } from "../../_chunks/vue-helper-BRpk5zez.js";
import { TreeList as K } from "../../treelist/index.js";
import "date-fns";
import "lodash";
import { d as Z } from "../../_chunks/promise-utility-CiVTwK8o.js";
import { g as Ee } from "../../_chunks/ServiceProvider-B2uAtIeR.js";
var Ie = /* @__PURE__ */ ((a) => (a.dashboard = "Dashboard", a.navbar = "Navbar", a))(Ie || {});
const O = 10;
class be {
  page = 1;
  pageSize = O;
  constructor(e = O, t = 1) {
    this.pageSize = e, this.page = t;
  }
}
class tt {
  sortBy;
}
function U(a, e) {
  return Object.fromEntries(
    Object.entries(a).filter(([t, n]) => n != null && // no private values (like $meta)
    t[0] != "$" && (t !== "page" || n > 1))
  );
}
function Oe(a) {
  const { page: e, pageSize: t, ...n } = a, s = {
    page: parseInt(e) || 1,
    pageSize: parseInt(t)
  };
  return { searchObject: n, pagingInfo: s };
}
class $e {
  constructor(e, t) {
    this.axios = e, this.config = t, this.defaultPageSize = t.defaultPageSize || O;
  }
  defaultPageSize = O;
  async details(e) {
    const t = await this.axios.get(`${this.config.detailsUrl}/${e}`);
    if (t?.status == 200) {
      const {
        data: { item: n }
      } = t;
      return this.processItem(n);
    }
    throw t;
  }
  async list(e) {
    const { items: t } = await this.fetchItems(this.config.listUrl, e);
    return t.map((n) => this.processItem(n));
  }
  async search(e) {
    const { items: t, count: n } = await this.fetchItems(this.config.searchUrl, e);
    return {
      items: t.map((s) => this.processItem(s)),
      count: n
    };
  }
  async searchUnion(e, t) {
    const n = {
      ...this.config.baseQueryParams || {},
      ...t || {}
    }, s = k(U(n, this.defaultPageSize)), i = `${this.config.searchUrl}?${s}`, {
      data: r
      //  status,
    } = await this.axios.post(i, e).then((o) => o);
    return r;
  }
  async save(e) {
    const t = e.$id == null || e.$id === "new", n = t ? await this.insert(e) : await this.update(e);
    return { saved: this.processItem(n), isNew: t };
  }
  async remove(e) {
    const t = this.prepareItem(e), n = `${this.config.deleteUrl}/${t.$id}`;
    await this.axios.delete(n).then((s) => s.data);
  }
  async update(e) {
    const t = `${this.config.saveUrl}/${e.$id}`, n = this.prepareItem(e);
    console.debug("update", { item: e, prepared: n });
    const s = await this.axios.put(t, n);
    if (s instanceof Q)
      throw s;
    const { item: i } = await s.data;
    return this.processItem(i);
  }
  async insert(e) {
    const t = `${this.config.saveUrl}`, n = this.prepareItem(e), s = await this.axios.post(t, n);
    if (s instanceof Q)
      throw s;
    const { item: i } = s.data;
    return "id" in i && Object.defineProperty(e, "id", { value: i.id, writable: !0, configurable: !0, enumerable: !0 }), this.processItem(i);
  }
  async fetchItems(e, t) {
    const n = {
      ...this.config.baseQueryParams || {},
      ...t || {}
    };
    !n.pageSize && n.pageSize !== 0 && (n.pageSize = this.defaultPageSize), (!("isArchived" in n) || n.isArchived == null) && (n.isArchived = !1);
    const s = k(U(n, this.defaultPageSize)), i = `${e}?${s}`, {
      data: r
      //  status,
    } = await this.axios.get(i).then((o) => o);
    return r;
  }
  // abstract to force items to be instances of T
  // https://www.typescriptlang.org/docs/handbook/2/generics.html (not working for generic generics...)
  processItem(e) {
    if (e == null)
      return null;
    const t = this.toEntity(e);
    if ("created" in e) {
      const n = t;
      n.created != null && (t.created = new Date(Date.parse(n.created)));
    }
    if ("lastModified" in e) {
      const n = t;
      n.lastModified != null && (t.lastModified = new Date(Date.parse(n.lastModified)));
    }
    return t;
  }
  prepareItem(e) {
    return Object.keys(e).forEach((t) => {
      t[0] == "_" && delete e[t];
    }), e;
  }
  createInstance(e) {
    return new e();
  }
  async newEntity(e) {
    return this.toEntity(e || {});
  }
}
const J = /* @__PURE__ */ new Map();
class nt extends $e {
  constructor(e, t, n) {
    super(e, t), this.key = n;
  }
  get cachedItems() {
    return J.get(this.key) || null;
  }
  set cachedItems(e) {
    J.set(this.key, e);
  }
  async fetchJSONItems() {
    return this.cachedItems == null && (this.cachedItems = await super.list()), this.cachedItems;
  }
  async details(e) {
    const t = (await this.list({ pageSize: 0 })).find((n) => n.$id == e) || null;
    return t != null ? this.toEntity(t) : null;
  }
  async list(e) {
    const t = this.processSearchObject(e), n = G(await this.fetchJSONItems(), t), s = typeof e?.pageSize > "u" ? this.config.defaultPageSize : e.pageSize;
    return s ? ie(n, s, Math.max(e?.page || 0, 1) - 1) : n;
  }
  async search(e) {
    const t = this.processSearchObject(e), n = G(await this.fetchJSONItems(), t).length;
    return {
      items: await this.list(e),
      count: n
    };
  }
  async save(e) {
    const t = this.processItem(e), n = t.$id == null || t.$id == "new", s = await this.fetchJSONItems();
    if (n) {
      const i = oe(s, (r) => parseInt(r.$id.toString())) + 1;
      Object.defineProperty(t, "id", { value: i, enumerable: !0, writable: !0, configurable: !0 }), this.cachedItems.push(t);
    } else {
      const i = s.findIndex((r) => r.$id == t.$id);
      s.splice(i, 1, t);
    }
    return { saved: this.toEntity(t), isNew: n };
  }
  async remove(e) {
    const t = this.cachedItems.findIndex((n) => n.$id == e.$id);
    t !== -1 && this.cachedItems.splice(t, 1);
  }
  processSearchObject(e) {
    const {
      pageSize: t = 0,
      page: n = 0,
      q: s = "",
      ...i
    } = {
      ...e || {},
      "*$title*": e?.q || null
    };
    return Object.fromEntries(Object.entries(i).filter(([, r]) => r != null));
  }
}
class M {
  //guid: string
  constructor() {
  }
}
Object.defineProperty(M.prototype, "entityType", {
  get() {
    return this.constructor.name;
  },
  configurable: !0,
  enumerable: !0
});
class Re {
  q;
  // toJSON() {
  //     // exclude $meta from json
  //     const jsonObj = Object.fromEntries(Object.entries(this).filter(([key]) => key[0] != "$"))
  //     return JSON.stringify(jsonObj)
  // }
}
class _e extends Re {
}
class at {
  Entity;
  serviceBuilder;
  config;
  Overview;
  Details;
  Form;
  Fiche;
  constructor(e, t, n, { Overview: s, Details: i, Form: r, Fiche: o }) {
    this.Entity = e, this.serviceBuilder = t, this.config = n, this.Overview = s, this.Details = i, this.Form = r, this.Fiche = o;
  }
  get key() {
    return this.Entity.name;
  }
}
const Pe = ["value"], Me = ["value"], st = /* @__PURE__ */ le({
  __name: "Selector",
  props: {
    modelValue: {},
    data: {},
    dataUrl: {},
    dataFunc: {},
    idProp: {},
    titleFunc: { type: Function, default: (a) => (typeof a == "string" ? a : a.$title) || "" },
    showEmptyOption: { type: Boolean, default: !0 },
    emptyValue: {},
    emptyText: {}
  },
  emits: ["update:modelValue"],
  async setup(a, { emit: e }) {
    let t, n;
    const s = a;
    !s.data && !s.dataFunc && !s.dataUrl && console.error("props data OR dataUrl is required");
    const i = S(() => s.data || r.value), r = g([]);
    s.data == null && (r.value = D(([t, n] = ue(() => Promise.resolve(s.dataFunc())), t = await t, n(), t)));
    const { modelValue: o } = de(s);
    return (l, c) => fe((E(), I("select", {
      "onUpdate:modelValue": c[0] || (c[0] = (v) => he(o) ? o.value = v : null)
    }, [
      a.showEmptyOption ? ve(l.$slots, "default", { key: 0 }, () => [
        R("option", { value: a.emptyValue }, _(a.emptyText), 9, Pe)
      ]) : pe("", !0),
      (E(!0), I(P, null, j(i.value, (v) => (E(), I("option", {
        value: a.idProp ? v[a.idProp] : v
      }, _(a.titleFunc(v)), 9, Me))), 256))
    ], 512)), [
      [me, D(o)]
    ]);
  }
}), A = /* @__PURE__ */ new Map(), De = /* @__PURE__ */ Symbol();
function rt(a = De) {
  const e = A.has(a) ? A.get(a) : A.set(a, /* @__PURE__ */ new Map()).get(a);
  function t(s, i, r) {
    e.set(s.key, { config: s, store: i, components: r });
  }
  function n(s) {
    return e.get(s);
  }
  return {
    describers: e,
    get types() {
      return [...e.keys()];
    },
    addType: t,
    getDesc: n
  };
}
function it(a, e = q()) {
  const t = C(), n = S(() => t.currentRoute.value.params.id), s = S(() => n.value === "new"), i = g(null), r = g(!1);
  function o() {
    function h(f) {
      if (!f)
        return !1;
      const m = f.indexOf("?");
      return m > -1 && (f = f.substring(0, m)), t.options.routes.some(($) => $.path == f && $.name?.toString().includes("Overview"));
    }
    function u() {
      const f = t.currentRoute.value;
      return t.options.routes.find((m) => m.name == f.name?.toString().replace(/Form|Fiche/, "Overview"));
    }
    const d = t.options.history.state.back?.toString();
    return h(d) ? d : u();
  }
  const l = o(), c = S(() => !!t.currentRoute.value.name?.toString().includes("Form")), v = S(() => !!t.currentRoute.value.name?.toString().includes("Fiche")), w = S(() => t.options.routes.flatMap((h) => [h, ...h.children || []]).some((h) => h.name == t.currentRoute.value.name?.toString().replace("Form", "Fiche")));
  async function y() {
    if (s.value) {
      i.value = await a.newEntity({});
      return;
    }
    r.value = !0;
    try {
      i.value = await a.details(n.value);
    } catch (h) {
      console.error(`Fetching details failed for #${n.value}`, { id: n.value, ex: h }), e.fail(`Fetching item #${n.value} failed`, h.response.status == 403 ? "Not allowed" : h.response.status == 404 ? "Not found" : h.response.data);
    } finally {
      r.value = !1;
    }
  }
  return V(t.currentRoute, async (h, u) => {
    h.name === u.name && u.params.id != "new" && h.params.id !== u.params.id && await y();
  }), N(y), {
    item: i,
    routeId: n,
    isNew: s,
    overviewUrl: l,
    isForm: c,
    isFiche: v,
    hasFiche: w,
    isLoading: r,
    feedback: e,
    load: y
  };
}
const xe = { class: "details-summary" }, Ve = {
  key: 0,
  class: "col"
}, Ne = { class: "fw-bold" }, Ae = { class: "col fw-bold" }, Fe = { class: "col-12" }, je = { class: "col fw-bold" }, Ue = { class: "col" }, ot = {
  __name: "DetailsSummary",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(a) {
    const e = a, t = S({
      get() {
        return e.modelValue;
      }
    });
    return (n, s) => {
      const i = ge("DetailsSummary", !0);
      return E(), I("div", xe, [
        (E(!0), I(P, null, j(t.value, (r, o, l) => (E(), I("div", {
          class: ye(["row", { "bg-light": l % 2 == 0 }])
        }, [
          Array.isArray(r) ? (E(), I("div", Ve, [
            R("span", Ne, _(o), 1),
            (E(!0), I(P, null, j(t.value[o], (c, v) => (E(), I(P, null, [
              R("div", null, "(" + _(v + 1) + ".)", 1),
              H(i, {
                modelValue: c,
                class: "ms-5"
              }, null, 8, ["modelValue"])
            ], 64))), 256))
          ])) : typeof r == "object" ? (E(), I(P, { key: 1 }, [
            R("div", Ae, _(o), 1),
            R("div", Fe, [
              H(i, {
                modelValue: r,
                class: "ms-5"
              }, null, 8, ["modelValue"])
            ])
          ], 64)) : (E(), I(P, { key: 2 }, [
            R("div", je, _(o), 1),
            R("div", Ue, _(r), 1)
          ], 64))
        ], 2))), 256))
      ]);
    };
  }
};
function ct({ searchObject: a, emit: e, Constructor: t }) {
  const n = () => {
    e("update:modelValue", { ...a.value });
  }, s = () => {
    e("filter", a.value);
  };
  return {
    filterIsActive: S(() => {
      const r = t ? new t() : new _e(), o = Object.keys(r), l = Object.entries(a.value || {}).filter(([, c]) => c != null).map(([c]) => c);
      return o.some((c) => l.some((v) => c == v));
    }),
    handleToggle: () => e("toggle-adv"),
    handleFilter: s,
    handleUpdate: () => {
      n(), s();
    },
    handleReset: () => {
      const r = Object.fromEntries(
        Object.entries({
          ...a.value
        }).map(([o, l]) => [o, null])
      );
      e("update:modelValue", r), s();
    }
  };
}
var Te = /* @__PURE__ */ ((a) => (a.pending = "Pending", a.saved = "Saved", a.removed = "Removed", a.error = "Error", a))(Te || {});
const lt = {
  // no defaults
  readonly: !1,
  isPopup: !1
};
function ut({ entityService: a, props: e, emit: t, feedback: n = q() }) {
  const { readonly: s, isPopup: i } = e, r = g(e.modelValue), o = g();
  function l() {
    t("cancel", { canceled: r.value, original: o.value }), r.value = o.value;
  }
  function c() {
    if (s)
      throw n.fail("Readonly"), new Error("Readonly");
  }
  const v = C();
  async function w() {
    c(), t(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      n.pending("Saving...");
      const { saved: u, isNew: d } = await a.save(r.value);
      if (t("save", { saved: u, isNew: d }), n.success("Saved"), r.value = a.toEntity(b(u)), o.value = a.toEntity(b(u)), t("update:modelValue", r.value), d && !i) {
        const p = v.currentRoute.value;
        delete p.query.src;
        const f = {
          name: p.name,
          params: {
            ...p.params,
            id: u.$id
          },
          query: {
            ...p.query
          },
          hash: p.hash
        };
        v.replace(f);
      }
    } catch (u) {
      console.error("Saving failed", { ex: u });
      const d = u, p = d.response?.status;
      throw p == 400 ? n.fail("Saving failed", d.response?.data?.errors) : p == 404 ? n.fail("Item not found", d.response?.data?.message || d.message) : n.fail("Server error", d.response?.data?.message || d.message), t(
        "changeState",
        "Error"
        /* error */
      ), u;
    } finally {
      t(
        "changeState",
        "Saved"
        /* saved */
      );
    }
  }
  async function y() {
    c(), t(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      n.pending("Deleting..."), await a.remove(r.value), n.success("Deleted"), t("remove", r.value);
    } catch (u) {
      console.error("Deleting failed", { item: r, ex: u });
      const d = u;
      throw n.fail("Deleting failed", d.response?.data?.errors), t(
        "changeState",
        "Error"
        /* error */
      ), u;
    } finally {
      t(
        "changeState",
        "Removed"
        /* removed */
      );
    }
  }
  async function h() {
    const u = a.toEntity(b(r.value));
    u.isArchived = !1, t(
      "changeState",
      "Pending"
      /* pending */
    );
    try {
      n.pending("Restoring...");
      const { saved: d, isNew: p } = await a.save(u);
      t("restore", d), t("save", { saved: d, isNew: p }), n.success("Restored"), r.value = a.toEntity(b(d)), o.value = a.toEntity(b(d)), t("update:modelValue", r.value);
    } catch (d) {
      console.error("Restoring failed", { item: r, ex: d });
      const p = d;
      throw n.fail("Restoring failed", p.response?.data?.errors), t(
        "changeState",
        "Error"
        /* error */
      ), d;
    } finally {
      t(
        "changeState",
        "Saved"
        /* saved */
      );
    }
  }
  return V(
    () => e.modelValue,
    () => {
      r.value = e.modelValue, o.value = a.toEntity(b(r.value));
    }
  ), N(() => {
    o.value = a.toEntity(b(r.value));
  }), {
    item: r,
    original: o,
    feedback: n,
    handleCancel: l,
    handleSubmit: w,
    handleRemove: y,
    handleRestore: h
  };
}
const dt = {
  closeOnSave: !1,
  closeOnDelete: !0
};
function ft({
  entityService: a,
  model: e,
  itemDefaults: t,
  closeOnSave: n,
  closeOnCancel: s,
  closeOnDelete: i,
  emit: r,
  feedback: o
}) {
  const l = g(!1), c = g(), v = we();
  function w(f) {
    c.value = f;
  }
  function y() {
    r("close", c.value), l.value = !1;
  }
  async function h() {
    let f = e.value;
    try {
      const m = typeof t != "function" ? b(D(t) || {}) : {};
      f == null && (f = await a.newEntity(m)), f?.$id || (f = a.toEntity(f || m)), a != null && f.$id !== "new" && (f = await a.details(f.$id) || f), typeof t == "function" && (f = await t(f)), c.value = f, l.value = !0, r("open", c.value, w);
    } catch (m) {
      console.error("Fetching details failed", { id: f?.$id, ex: m, app: v }), o ||= v?.appContext.config.globalProperties.$feedback, o.fail(`Fetching ${f?.$title || "item #" + f?.$id} failed`, m.response.status == 403 ? "Not allowed" : m.response?.data);
    }
  }
  function u(f) {
    s && (r("cancel", f), y());
  }
  function d({ saved: f, isNew: m }) {
    r("save", { saved: f, isNew: m }), r("update:modelValue", f), n && y();
  }
  function p() {
    r("remove", c.value), i && y();
  }
  return {
    item: c,
    isOpen: l,
    feedback: o,
    close: y,
    open: h,
    handleSave: d,
    handleRemove: p,
    handleCancel: u
  };
}
function ht({ props: a, emit: e }) {
  const t = L(a, e), n = g({ id: 0 }), s = (r) => {
    e("sort", r);
  };
  function i({ saved: r, isNew: o }) {
    if (o) {
      const l = (W(t.value, (c) => c.id) || 0) - 1;
      r.id = l, e("update:modelValue", t.value.concat([r])), n.value = { id: 0 };
    }
  }
  return {
    items: t,
    newItem: n,
    handleSort: s,
    handleSave: i
  };
}
function vt({ props: a, emit: e }) {
  const t = L(a, e);
  function n() {
    e("save", { saved: t.value, isNew: !t.value.id });
  }
  function s(i) {
    i._deleted = !i._deleted, e("remove", i);
  }
  return {
    item: t,
    handleSave: n,
    handleRemove: s
  };
}
function pt({ props: a, emit: e }) {
  const t = L(a, e), n = () => ({
    id: 0
  }), s = g();
  async function i() {
    s.value = n();
  }
  const r = (l) => {
    e("sort", l);
  };
  function o({ saved: l, isNew: c }) {
    if (c) {
      const v = Math.min(W(t.value, (y) => y.id) || 0, 0) - 1;
      l.id = v;
      const w = t.value.concat([l]);
      t.value = w, i();
    }
  }
  return V(
    () => a.modelValue,
    () => t.value = a.modelValue || []
  ), N(async () => {
    t.value = a.modelValue || [], await i();
  }), {
    items: t,
    newItem: s,
    resetNewItem: i,
    handleSort: r,
    handleSave: o
  };
}
function mt(a, { props: e, emit: t }) {
  const n = g(e.modelValue || { id: 0 }), s = g(!1);
  function i() {
    const l = e.modelValue || {}, c = b(D(e.itemDefaults || {}));
    n.value = Object.assign(new a(), {
      ...l,
      ...c
    }), s.value = !0;
  }
  function r() {
    t("cancel"), s.value = !1;
  }
  function o() {
    t("save", { saved: n.value, isNew: n.value.id == 0 }), t("update:modelValue", n.value), s.value = !1;
  }
  return {
    item: n,
    isOpen: s,
    handleOpen: i,
    handleCancel: r,
    handleSubmit: o
  };
}
class Y {
  id;
  name;
  icon;
  routeName;
  title;
  description;
  initialQuery;
  parentId;
}
class ze {
  id;
  title;
  parentId;
  icon;
}
function ee(a) {
  return Object.assign(new ze(), a);
}
function T(a, e) {
  return Object.assign(new Y(), {
    id: a.key,
    parentId: e,
    icon: a.name,
    routeName: `${a.name}Overview`,
    title: a.overviewTitle,
    description: a.description,
    initialQuery: a.initialQuery ?? {}
  });
}
function gt(a) {
  function e(s) {
    return a.configs.find((i) => i.key == s);
  }
  const t = a.entities.flatMap(
    ([s, i]) => i.map((r) => e(r)).filter((r) => a.hasAccess(r)).map((r) => T(r, s))
  );
  return a.groups.filter((s) => t.some((i) => i.parentId == s.id)).map((s) => ee(s)).concat(t);
}
function yt(a) {
  function e(n) {
    return a.configs.find((s) => s.key == n);
  }
  const t = a.groups?.map(ee);
  return a.entities.flatMap((n) => {
    if (n.length == 2 && Array.isArray(n[1])) {
      const i = t.find((o) => o.id == n[0]), r = n[1].map((o) => e(o)).filter((o) => a.hasAccess(o)).map((o) => T(o, i.id));
      return [i, ...r];
    }
    const s = e(n);
    return a.hasAccess(s) ? [T(s)] : [];
  });
}
function wt(a) {
  return new K().init(a, (e, t) => t.filter((n) => n.id == e.parentId));
}
function St(a) {
  return a instanceof Y;
}
function te({
  service: a,
  searchObject: e,
  defaultPageSize: t = O
}) {
  const n = g(e), s = g(new be(t || O)), i = g(), r = g(), o = g(!1), l = q();
  async function c(u) {
    o.value = !0;
    try {
      l.reset();
      const { saved: d, isNew: p } = await a.save(u);
      return l.success(`Saved ${u.$title}`), { saved: d, isNew: p };
    } catch (d) {
      console.error("saving failed", { ex: d, item: u });
      const p = d;
      l.fail(`Saving ${u.$title} failed`, p.response?.data?.errors);
    } finally {
      o.value = !1;
    }
    return null;
  }
  async function v(u) {
    o.value = !0;
    try {
      l.reset(), await a.remove(u);
    } catch (d) {
      console.error("removing failed", { ex: d, item: u });
      const p = d;
      l.fail(`Removing ${u.$title} failed`, p.response?.data?.errors);
    } finally {
      o.value = !1;
    }
  }
  function w({ saved: u, isNew: d }) {
    if (r.value != null)
      if (d)
        r.value.push(u);
      else {
        const p = r.value.findIndex((f) => f.$id === u.$id);
        p !== -1 && r.value.splice(p, 1, u);
      }
  }
  function y(u) {
    if (r.value == null)
      return;
    const d = r.value.findIndex((p) => p.$id === u.$id);
    d !== -1 && r.value.splice(d, 1);
  }
  function h() {
    s.value = {
      ...s?.value,
      page: 1
    };
  }
  return {
    searchObject: n,
    pagingInfo: s,
    items: r,
    itemsCount: i,
    isLoading: o,
    feedback: l,
    applySave: c,
    applyRemove: v,
    handleSave: w,
    handleRemove: y,
    resetPage: h
  };
}
const ne = 250;
function Et({
  service: a,
  searchObject: e,
  defaultPageSize: t = O,
  debounceDelay: n = ne
}) {
  const {
    searchObject: s,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: v,
    applyRemove: w,
    handleSave: y,
    handleRemove: h,
    resetPage: u
  } = te({ service: a, searchObject: e, defaultPageSize: t });
  async function d(f = !1) {
    l.value = !0;
    try {
      c.reset();
      const m = { ...s.value || {}, ...i.value || {} };
      f && (m.page = 1);
      const { items: $, count: re } = await a.search(m);
      r.value = $, o.value = re;
    } catch (m) {
      console.error("fetching failed", { ex: m });
      const $ = m;
      c.fail("fetching data failed", $.response?.data?.errors);
    } finally {
      l.value = !1;
    }
  }
  const p = Z(d, n);
  return {
    searchObject: s,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: v,
    applyRemove: w,
    handleSave: y,
    handleRemove: h,
    resetPage: u,
    searchHandler: d,
    debouncedSearchHandler: p
  };
}
function It({
  service: a,
  searchObject: e,
  defaultPageSize: t = O,
  debounceDelay: n = ne
}) {
  const {
    searchObject: s,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: v,
    applyRemove: w,
    handleSave: y,
    handleRemove: h,
    resetPage: u
  } = te({ service: a, searchObject: e, defaultPageSize: t });
  async function d() {
    l.value = !0;
    try {
      c.reset(), r.value = await a.list({ ...e.value || {}, ...i.value || {} }), o.value = r.value.length;
    } catch (f) {
      console.error("fetching failed", { ex: f });
      const m = f;
      c.fail("fetching data failed", m.response?.data?.errors);
    } finally {
      l.value = !1;
    }
  }
  const p = Z(d, n);
  return {
    searchObject: s,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: v,
    applyRemove: w,
    handleSave: y,
    handleRemove: h,
    resetPage: u,
    listHandler: d,
    debouncedListHandler: p
  };
}
function bt({ pagingInfo: a, searchObject: e, defaultPageSize: t = O, handler: n }) {
  const s = C();
  function i(l = !1) {
    l && a != null && (a.value = {
      ...a?.value,
      page: 1
    });
    const c = s.currentRoute.value, v = U(
      {
        ...c.query,
        // values that should be removed should explicitly be overwritten by <<null>> in searchObject
        ...e.value,
        ...a.value || {}
      }
    ), w = {
      ...c,
      query: v
    };
    s.push(w);
  }
  async function r() {
    const { searchObject: l, pagingInfo: c } = Oe(s.currentRoute.value.query);
    c.page || (c.page = 1), !c.pageSize && t > 0 && (c.pageSize = t), e.value != null && (e.value = l), a.value != null && (a.value = c), await n();
  }
  const o = V(s.currentRoute, async (l, c) => {
    l.name === c.name && await r();
  });
  return N(r), {
    updateOverviewRoute: i,
    //: debounce(updateOverviewRoute, 50),
    routeSearchHandler: r,
    routeWatcher: o
  };
}
class X {
  constructor(e, t, n) {
    this.service = e, this.cache = t, this.type = n;
  }
  async details(e) {
    const t = await this.service.details(e);
    return t == null ? null : (this.cache.set(this.toEntity({ ...t })), this.toEntity({ ...t }));
  }
  async list(e) {
    const t = await this.service.list(e);
    return t.forEach((n) => this.cache.set(this.toEntity({ ...n }))), t;
  }
  async search(e) {
    const { items: t, count: n } = await this.service.search(e);
    return t.forEach((s) => this.cache.set(this.toEntity({ ...s }))), { items: t, count: n };
  }
  async searchUnion(e, t) {
    const { items: n, count: s } = await this.service.searchUnion(e, t);
    return n.forEach((i) => this.cache.set(this.toEntity({ ...i }))), { items: n, count: s };
  }
  async save(e) {
    const { saved: t, isNew: n } = await this.service.save(e);
    return this.cache.set(this.toEntity({ ...t })), { saved: t, isNew: n };
  }
  async remove(e) {
    await this.service.remove(e), this.cache.remove(e);
  }
  get(e) {
    const t = this.toEntity(e);
    return this.cache.get(this.type, t.$id) || this.cache.set(t);
  }
  getMany(e) {
    return e.map((t) => this.get(t)).filter((t) => t != null);
  }
  set(e) {
    return e = this.toEntity(e), this.cache.set(e);
  }
  setMany(e) {
    return e.map((t) => this.set(t));
  }
  toEntity(e) {
    return this.service.toEntity(e);
  }
  newEntity(e) {
    return this.service.newEntity(e);
  }
}
const F = {
  INTERVAL: 60,
  EXPIRES: 600,
  MAX_ITEMS: 1e3
};
class Ce {
  _cache = /* @__PURE__ */ new Map();
  _expires;
  _maxItems;
  persistentTypes = [];
  constructor({ interval: e = F.INTERVAL, expires: t = F.EXPIRES, maxItems: n = F.MAX_ITEMS } = {}) {
    e > 0 && setInterval(() => this.cleanup(), e * 1e3), this._expires = t, this._maxItems = n;
  }
  set(e) {
    const t = this.getEntityMap(e.constructor.name);
    let n = this.get(e.constructor.name, e.$id);
    return n == null ? n = g(e) : n.value = e, n.timestamp = +/* @__PURE__ */ new Date(), t.set(e.$id, n), n;
  }
  get(e, t) {
    return this.getEntityMap(e).get(t);
  }
  remove(e) {
    return this.getEntityMap(e.constructor.name).delete(e.$id);
  }
  hasType(e) {
    return this._cache.has(e);
  }
  getAll(e) {
    return e != null ? [...this.getEntityMap(e)].map(([, n]) => n) : [...this._cache].flatMap(([, t]) => [...t].map(([, n]) => n));
  }
  findReferences(e) {
    return this.getAll().filter((s) => {
      function i(r) {
        if (Array.isArray(r))
          return r.some((o) => i(o));
        if (r instanceof M) {
          if (r?.constructor?.name === e.constructor.name)
            return r.$id === e.$id;
          const o = Object.entries(r).map(([, l]) => l).filter((l) => l instanceof M || Array.isArray(l) && l.some((c) => c instanceof M));
          return i(o);
        }
        return !1;
      }
      return i(s.value);
    });
  }
  getEntityMap(e) {
    return this._cache.has(e) || this._cache.set(e, /* @__PURE__ */ new Map()), this._cache.get(e);
  }
  cleanup() {
    if (this._expires > 0) {
      const t = +/* @__PURE__ */ new Date() - this._expires * 1e3;
      for (let [n, s] of this._cache)
        if (!this.persistentTypes.includes(n))
          for (let [i, r] of s)
            r.timestamp < t && (console.debug("removing", n, i), s.delete(i));
    }
    const e = ce(
      [...this._cache].flatMap(([, t]) => [...t].map(([, n]) => n)),
      (t) => t.timestamp
    );
    e.length > this._maxItems && e.slice(this._maxItems).forEach((n) => {
      const s = n.value.constructor.name;
      if (!this.persistentTypes.includes(s)) {
        const i = this.getEntityMap(s);
        console.debug("removing", s, n.value.$id), i.delete(n.value.$id);
      }
    });
  }
}
const qe = new Ce();
function ae(a, e, t = qe, n = !1) {
  const s = a instanceof X ? a : new X(a, t, e);
  n && !t.persistentTypes.includes(e) && t.persistentTypes.push(e);
  function i(r) {
    if (r == null)
      return r;
    if (!Array.isArray(r)) {
      const o = a.toEntity(r);
      if (["new", null, void 0, "", 0].includes(o?.$id))
        return o;
    }
    return Array.isArray(r) ? s.getMany(r || []).map((o) => o.value) : s.get(r)?.value;
  }
  return {
    service: s,
    cache: t,
    details: s.details.bind(s),
    list: s.list.bind(s),
    search: s.search.bind(s),
    searchUnion: s.searchUnion.bind(s),
    save: s.save.bind(s),
    remove: s.remove.bind(s),
    toEntity: s.toEntity.bind(s),
    newEntity: s.newEntity.bind(s),
    get: (r) => s.get(r),
    getMany: (r) => s.getMany(r),
    set: (r) => t.set(s.toEntity(r)),
    setMany: (r) => r.map((o) => t.set(s.toEntity(o))),
    fromPool: i,
    fromCache: (r) => r ? t.get(e, r) : t.getAll(e)
  };
}
function Ot(a, e) {
  return ae(a, e);
}
const z = [], x = [];
function se(a) {
  x.length = 0, z.length = 0;
  for (let e of a) {
    z.push(e.name);
    const t = Ee(e.name), { list: n } = ae(t, e.name, void 0, !0), s = n({ pageSize: 0 });
    x.push(s);
  }
  return B();
}
async function B() {
  return await new Promise((a) => {
    async function e() {
      if (z.length > x.length) {
        setTimeout(e, 50);
        return;
      }
      const t = await Promise.allSettled(x);
      a(t);
    }
    e();
  });
}
const $t = {
  install(a) {
  },
  preload: se,
  ready: B
};
function Rt() {
  return { preload: se, ready: B };
}
function Le(a, e) {
  return a.$id != null && a.$id == e.$id && a.constructor == e.constructor;
}
function _t(a) {
  const e = g(), t = g(), n = a?.equals || Le, s = S(() => e.value?.filter((c) => t.value?.some((v) => n(c.value, v))) || []), i = S(() => s.value.flatMap((c) => c.getAncestors())), r = S(() => s.value.flatMap((c) => c.getOffspring())), o = S(() => [
    ...new Set(
      s.value.flatMap((c) => c.getAncestors()).concat(s.value).concat(s.value.flatMap((c) => c.getOffspring()))
    )
  ]);
  function l(c, v, w) {
    t.value = c, e.value = new K().init(
      v.map((h) => Se(h)),
      w
    ), e.value.filter((h) => h.parent == null ? !1 : h.parent.getOffspring().some((u) => u != h && u.value == h.value)).forEach((h) => e.value.remove(h));
  }
  return {
    tree: e,
    nodes: s,
    ancestors: i,
    offspring: r,
    family: o,
    init: l
  };
}
function Pt({ emit: a }) {
  const e = g();
  function t(i) {
    i != null && (e.value = i, a("drag", i));
  }
  function n() {
    e.value = void 0, a("dragend");
  }
  function s(i) {
    i == null || e.value == null || e.value == i || e.value?.getOffspring()?.includes(i) || (a("drop", i), a("move", { child: e.value, parent: i }), e.value = void 0);
  }
  return {
    draggingNode: e,
    handleDrag: t,
    handleDragEnd: n,
    handleDrop: s
  };
}
export {
  O as DEFAULT_PAGESIZE,
  _e as DefaultSearchObject,
  ot as DetailsSummary,
  M as EntityBase,
  at as EntityDescriptor,
  $e as EntityServiceBase,
  Te as FormStates,
  nt as JSONService,
  ze as NavGroup,
  Y as NavItem,
  Ie as NavTypes,
  be as PagingInfo,
  Ce as PoolCache,
  X as PoolService,
  Re as SearchObjectBase,
  st as Selector,
  tt as SortByInfo,
  wt as buildNavigationTree,
  U as cleanQueryParams,
  ee as createNavGroup,
  T as createNavItem,
  Ot as createStore,
  qe as defaultPoolCache,
  lt as formDefaults,
  dt as formModalDefaults,
  gt as importDashboard,
  yt as importNavbar,
  St as isNavItem,
  Oe as parseQueryParams,
  $t as preloaderPlugin,
  it as useDetails,
  Pt as useDragDrop,
  rt as useEntityDescribers,
  ct as useFilter,
  ut as useForm,
  ht as useListInput,
  vt as useListItemInput,
  It as useListView,
  ft as useModal,
  te as useOverviewCore,
  pt as useOwnedCollection,
  mt as useOwnedModal,
  ae as usePooling,
  Rt as usePreloader,
  bt as useRouteOverview,
  Et as useSearchView,
  _t as useTree
};
