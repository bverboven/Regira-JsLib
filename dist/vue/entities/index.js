import { AxiosError as j } from "axios";
import { c as N } from "../../_chunks/query-3.0.2.js";
import { q as _, p as X, d as W, g as K } from "../../_chunks/array-utility-3.0.2.js";
import { defineComponent as Z, computed as S, ref as m, unref as U, withAsyncContext as Y, toRefs as ee, withDirectives as te, openBlock as $, createElementBlock as M, isRef as se, renderSlot as ne, createElementVNode as ae, toDisplayString as z, createCommentVNode as re, Fragment as ie, renderList as oe, vModelSelect as ce, watch as le, onMounted as ue, toRaw as fe } from "vue";
import { _ as ot, u as ct } from "../../_chunks/DetailsSummary-3.0.2.js";
import { F as ut, f as ft, a as dt, u as ht, b as pt, c as mt, d as vt, e as gt, g as yt } from "../../_chunks/ownedModal-3.0.2.js";
import { TreeList as q } from "../../treelist/index.js";
import "../../_chunks/Paging.vue_vue_type_script_setup_true_lang-3.0.2.js";
import "date-fns";
import "../../_chunks/DefaultModal.vue_vue_type_script_setup_true_lang-3.0.2.js";
import { u as de } from "../../_chunks/feedback-3.0.2.js";
import { useRouter as he } from "vue-router";
import "lodash";
import { debounceToPromise as L } from "../../utilities/promise-utility.js";
import { g as pe } from "../../_chunks/ServiceProvider-3.0.2.js";
var me = /* @__PURE__ */ ((a) => (a.dashboard = "Dashboard", a.navbar = "Navbar", a))(me || {});
const g = 10;
class ve {
  page = 1;
  pageSize = g;
  constructor(e = g, t = 1) {
    this.pageSize = e, this.page = t;
  }
}
class Le {
  sortBy = "";
}
function x(a, e) {
  return Object.fromEntries(
    Object.entries(a).filter(([t, s]) => s != null && // no private values (like $meta)
    t[0] != "$" && (t !== "page" || s > 1))
  );
}
function ge(a) {
  const { page: e, pageSize: t, ...s } = a, n = {
    page: parseInt(e) || 1,
    pageSize: parseInt(t)
  };
  return { searchObject: s, pagingInfo: n };
}
class ye {
  constructor(e, t) {
    this.axios = e, this.config = t, this.defaultPageSize = t.defaultPageSize || g;
  }
  defaultPageSize = g;
  async details(e) {
    const t = await this.axios.get(`${this.config.detailsUrl}/${e}`);
    if (t?.status == 200) {
      const {
        data: { item: s }
      } = t;
      return this.processItem(s);
    }
    throw t;
  }
  async list(e) {
    const { items: t } = await this.fetchItems(this.config.listUrl, e);
    return t.map((s) => this.processItem(s));
  }
  async search(e) {
    const { items: t, count: s } = await this.fetchItems(this.config.searchUrl, e);
    return {
      items: t.map((n) => this.processItem(n)),
      count: s
    };
  }
  async searchUnion(e, t) {
    const s = {
      ...this.config.baseQueryParams || {},
      ...t || {}
    }, n = N(x(s, this.defaultPageSize)), i = `${this.config.searchUrl}?${n}`, {
      data: r
      //  status,
    } = await this.axios.post(i, e).then((o) => o);
    return r;
  }
  async save(e) {
    const t = e.$id == null || e.$id === "new", s = t ? await this.insert(e) : await this.update(e);
    return { saved: this.processItem(s), isNew: t };
  }
  async remove(e) {
    const t = this.prepareItem(e), s = `${this.config.deleteUrl}/${t.$id}`;
    await this.axios.delete(s).then((n) => n.data);
  }
  async update(e) {
    const t = `${this.config.saveUrl}/${e.$id}`, s = this.prepareItem(e);
    console.debug("update", { item: e, prepared: s });
    const n = await this.axios.put(t, s);
    if (n instanceof j)
      throw n;
    const { item: i } = await n.data;
    return this.processItem(i);
  }
  async insert(e) {
    const t = `${this.config.saveUrl}`, s = this.prepareItem(e), n = await this.axios.post(t, s);
    if (n instanceof j)
      throw n;
    const { item: i } = n.data;
    return "id" in i && Object.defineProperty(e, "id", { value: i.id, writable: !0, configurable: !0, enumerable: !0 }), this.processItem(i);
  }
  async fetchItems(e, t) {
    const s = {
      ...this.config.baseQueryParams || {},
      ...t || {}
    };
    !s.pageSize && s.pageSize !== 0 && (s.pageSize = this.defaultPageSize), (!("isArchived" in s) || s.isArchived == null) && (s.isArchived = !1);
    const n = N(x(s, this.defaultPageSize)), i = `${e}?${n}`, {
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
      const s = t;
      s.created != null && (t.created = new Date(Date.parse(s.created)));
    }
    if ("lastModified" in e) {
      const s = t;
      s.lastModified != null && (t.lastModified = new Date(Date.parse(s.lastModified)));
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
const F = /* @__PURE__ */ new Map();
class Ve extends ye {
  constructor(e, t, s) {
    super(e, t), this.key = s;
  }
  get cachedItems() {
    return F.get(this.key) || null;
  }
  set cachedItems(e) {
    F.set(this.key, e);
  }
  async fetchJSONItems() {
    return this.cachedItems == null && (this.cachedItems = await super.list()), this.cachedItems;
  }
  async details(e) {
    const t = (await this.list({ pageSize: 0 })).find((s) => s.$id == e) || null;
    return t != null ? this.toEntity(t) : null;
  }
  async list(e) {
    const t = this.processSearchObject(e), s = _(await this.fetchJSONItems(), t), n = typeof e?.pageSize > "u" ? this.config.defaultPageSize : e.pageSize;
    return n ? X(s, n, Math.max(e?.page || 0, 1) - 1) : s;
  }
  async search(e) {
    const t = this.processSearchObject(e), s = _(await this.fetchJSONItems(), t).length;
    return {
      items: await this.list(e),
      count: s
    };
  }
  async save(e) {
    const t = this.processItem(e), s = t.$id == null || t.$id == "new", n = await this.fetchJSONItems();
    if (s) {
      const i = (W(n, (r) => parseInt(r.$id.toString())) ?? 0) + 1;
      Object.defineProperty(t, "id", { value: i, enumerable: !0, writable: !0, configurable: !0 }), this.cachedItems.push(t);
    } else {
      const i = n.findIndex((r) => r.$id == t.$id);
      n.splice(i, 1, t);
    }
    return { saved: this.toEntity(t), isNew: s };
  }
  async remove(e) {
    const t = this.cachedItems.findIndex((s) => s.$id == e.$id);
    t !== -1 && this.cachedItems.splice(t, 1);
  }
  processSearchObject(e) {
    const {
      pageSize: t = 0,
      page: s = 0,
      q: n = "",
      ...i
    } = {
      ...e || {},
      "*$title*": e?.q || null
    };
    return Object.fromEntries(Object.entries(i).filter(([, r]) => r != null));
  }
}
class b {
  //guid: string
  constructor() {
  }
}
Object.defineProperty(b.prototype, "entityType", {
  get() {
    return this.constructor.name;
  },
  configurable: !0,
  enumerable: !0
});
class we {
  q;
  // toJSON() {
  //     // exclude $meta from json
  //     const jsonObj = Object.fromEntries(Object.entries(this).filter(([key]) => key[0] != "$"))
  //     return JSON.stringify(jsonObj)
  // }
}
class Ee extends we {
}
class Ce {
  Entity;
  serviceBuilder;
  config;
  Overview;
  Details;
  Form;
  Fiche;
  constructor(e, t, s, { Overview: n, Details: i, Form: r, Fiche: o }) {
    this.Entity = e, this.serviceBuilder = t, this.config = s, this.Overview = n, this.Details = i, this.Form = r, this.Fiche = o;
  }
  get key() {
    return this.Entity.name;
  }
}
const Se = ["value"], be = ["value"], Be = /* @__PURE__ */ Z({
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
    let t, s;
    const n = a;
    !n.data && !n.dataFunc && !n.dataUrl && console.error("props data OR dataUrl is required");
    const i = S(() => n.data || r.value), r = m([]);
    n.data == null && (r.value = U(([t, s] = Y(() => Promise.resolve(n.dataFunc())), t = await t, s(), t)));
    const { modelValue: o } = ee(n);
    return (l, c) => te(($(), M("select", {
      "onUpdate:modelValue": c[0] || (c[0] = (f) => se(o) ? o.value = f : null)
    }, [
      a.showEmptyOption ? ne(l.$slots, "default", { key: 0 }, () => [
        ae("option", { value: a.emptyValue }, z(a.emptyText), 9, Se)
      ]) : re("", !0),
      ($(!0), M(ie, null, oe(i.value, (f) => ($(), M("option", {
        value: a.idProp ? f[a.idProp] : f
      }, z(a.titleFunc(f)), 9, be))), 256))
    ], 512)), [
      [ce, U(o)]
    ]);
  }
}), R = /* @__PURE__ */ new Map(), Ie = /* @__PURE__ */ Symbol();
function Qe(a = Ie) {
  const e = R.has(a) ? R.get(a) : R.set(a, /* @__PURE__ */ new Map()).get(a);
  function t(n, i, r) {
    e.set(n.key, { config: n, store: i, components: r });
  }
  function s(n) {
    return e.get(n);
  }
  return {
    describers: e,
    get types() {
      return [...e.keys()];
    },
    addType: t,
    getDesc: s
  };
}
function Ge({ searchObject: a, emit: e, Constructor: t }) {
  const s = () => {
    e("update:modelValue", { ...a.value });
  }, n = () => {
    e("filter", a.value);
  };
  return {
    filterIsActive: S(() => {
      const r = t ? new t() : new Ee(), o = Object.keys(r), l = Object.entries(a.value || {}).filter(([, c]) => c != null).map(([c]) => c);
      return o.some((c) => l.some((f) => c == f));
    }),
    handleToggle: () => e("toggle-adv"),
    handleFilter: n,
    handleUpdate: () => {
      s(), n();
    },
    handleReset: () => {
      const r = Object.fromEntries(
        Object.entries({
          ...a.value
        }).map(([o, l]) => [o, null])
      );
      e("update:modelValue", r), n();
    }
  };
}
class V {
  id;
  name;
  icon;
  routeName;
  title;
  description;
  initialQuery;
  parentId;
}
class Oe {
  id;
  title;
  parentId;
  icon;
}
function C(a) {
  return Object.assign(new Oe(), a);
}
function A(a, e) {
  return Object.assign(new V(), {
    id: a.key,
    parentId: e,
    icon: a.name,
    routeName: `${a.name}Overview`,
    title: a.overviewTitle,
    description: a.description,
    initialQuery: a.initialQuery ?? {}
  });
}
function He(a) {
  function e(n) {
    return a.configs.find((i) => i.key == n);
  }
  const t = a.entities.flatMap(
    ([n, i]) => i.map((r) => e(r)).filter((r) => a.hasAccess(r)).map((r) => A(r, n))
  );
  return a.groups.filter((n) => t.some((i) => i.parentId == n.id)).map((n) => C(n)).concat(t);
}
function Je(a) {
  function e(s) {
    return a.configs.find((n) => n.key == s);
  }
  const t = a.groups?.map(C);
  return a.entities.flatMap((s) => {
    if (s.length == 2 && Array.isArray(s[1])) {
      const i = t.find((o) => o.id == s[0]), r = s[1].map((o) => e(o)).filter((o) => a.hasAccess(o)).map((o) => A(o, i.id));
      return [i, ...r];
    }
    const n = e(s);
    return a.hasAccess(n) ? [A(n)] : [];
  });
}
function Xe(a) {
  return new q().init(a, (e, t) => t.filter((s) => s.id == e.parentId));
}
function We(a) {
  return a instanceof V;
}
function B({
  service: a,
  searchObject: e,
  defaultPageSize: t = g
}) {
  const s = m(e), n = m(new ve(t || g)), i = m(), r = m(), o = m(!1), l = de();
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
  async function f(u) {
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
  function v({ saved: u, isNew: d }) {
    if (r.value != null)
      if (d)
        r.value.push(u);
      else {
        const p = r.value.findIndex((E) => E.$id === u.$id);
        p !== -1 && r.value.splice(p, 1, u);
      }
  }
  function w(u) {
    if (r.value == null)
      return;
    const d = r.value.findIndex((p) => p.$id === u.$id);
    d !== -1 && r.value.splice(d, 1);
  }
  function h() {
    n.value = {
      ...n?.value,
      page: 1
    };
  }
  return {
    searchObject: s,
    pagingInfo: n,
    items: r,
    itemsCount: i,
    isLoading: o,
    feedback: l,
    applySave: c,
    applyRemove: f,
    handleSave: v,
    handleRemove: w,
    resetPage: h
  };
}
const Q = 250;
function Ke({
  service: a,
  searchObject: e,
  defaultPageSize: t = g,
  debounceDelay: s = Q
}) {
  const {
    searchObject: n,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: f,
    applyRemove: v,
    handleSave: w,
    handleRemove: h,
    resetPage: u
  } = B({ service: a, searchObject: e, defaultPageSize: t });
  async function d(E = !1) {
    l.value = !0;
    try {
      c.reset();
      const y = { ...n.value || {}, ...i.value || {} };
      E && (y.page = 1);
      const { items: O, count: J } = await a.search(y);
      r.value = O, o.value = J;
    } catch (y) {
      console.error("fetching failed", { ex: y });
      const O = y;
      c.fail("fetching data failed", O.response?.data?.errors);
    } finally {
      l.value = !1;
    }
  }
  const p = L(d, s);
  return {
    searchObject: n,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: f,
    applyRemove: v,
    handleSave: w,
    handleRemove: h,
    resetPage: u,
    searchHandler: d,
    debouncedSearchHandler: p
  };
}
function Ze({
  service: a,
  searchObject: e,
  defaultPageSize: t = g,
  debounceDelay: s = Q
}) {
  const {
    searchObject: n,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: f,
    applyRemove: v,
    handleSave: w,
    handleRemove: h,
    resetPage: u
  } = B({ service: a, searchObject: e, defaultPageSize: t });
  async function d() {
    l.value = !0;
    try {
      c.reset(), r.value = await a.list({ ...e.value || {}, ...i.value || {} }), o.value = r.value.length;
    } catch (E) {
      console.error("fetching failed", { ex: E });
      const y = E;
      c.fail("fetching data failed", y.response?.data?.errors);
    } finally {
      l.value = !1;
    }
  }
  const p = L(d, s);
  return {
    searchObject: n,
    pagingInfo: i,
    items: r,
    itemsCount: o,
    isLoading: l,
    feedback: c,
    applySave: f,
    applyRemove: v,
    handleSave: w,
    handleRemove: h,
    resetPage: u,
    listHandler: d,
    debouncedListHandler: p
  };
}
function Ye({ pagingInfo: a, searchObject: e, defaultPageSize: t = g, handler: s }) {
  const n = he();
  function i(l = !1) {
    l && a != null && (a.value = {
      ...a?.value,
      page: 1
    });
    const c = n.currentRoute.value, f = x(
      {
        ...c.query,
        // values that should be removed should explicitly be overwritten by <<null>> in searchObject
        ...e.value,
        ...a.value || {}
      }
    ), v = {
      ...c,
      query: f
    };
    n.push(v);
  }
  async function r() {
    const { searchObject: l, pagingInfo: c } = ge(n.currentRoute.value.query);
    c.page || (c.page = 1), !c.pageSize && t > 0 && (c.pageSize = t), e.value != null && (e.value = l), a.value != null && (a.value = c), await s();
  }
  const o = le(n.currentRoute, async (l, c) => {
    l.name === c.name && await r();
  });
  return ue(r), {
    updateOverviewRoute: i,
    //: debounce(updateOverviewRoute, 50),
    routeSearchHandler: r,
    routeWatcher: o
  };
}
class k {
  constructor(e, t, s) {
    this.service = e, this.cache = t, this.type = s;
  }
  async details(e) {
    const t = await this.service.details(e);
    return t == null ? null : (this.cache.set(this.toEntity({ ...t })), this.toEntity({ ...t }));
  }
  async list(e) {
    const t = await this.service.list(e);
    return t.forEach((s) => this.cache.set(this.toEntity({ ...s }))), t;
  }
  async search(e) {
    const { items: t, count: s } = await this.service.search(e);
    return t.forEach((n) => this.cache.set(this.toEntity({ ...n }))), { items: t, count: s };
  }
  async searchUnion(e, t) {
    const { items: s, count: n } = await this.service.searchUnion(e, t);
    return s.forEach((i) => this.cache.set(this.toEntity({ ...i }))), { items: s, count: n };
  }
  async save(e) {
    const { saved: t, isNew: s } = await this.service.save(e);
    return this.cache.set(this.toEntity({ ...t })), { saved: t, isNew: s };
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
const P = {
  INTERVAL: 60,
  EXPIRES: 600,
  MAX_ITEMS: 1e3
};
class $e {
  _cache = /* @__PURE__ */ new Map();
  _expires;
  _maxItems;
  persistentTypes = [];
  constructor({ interval: e = P.INTERVAL, expires: t = P.EXPIRES, maxItems: s = P.MAX_ITEMS } = {}) {
    e > 0 && setInterval(() => this.cleanup(), e * 1e3), this._expires = t, this._maxItems = s;
  }
  set(e) {
    const t = this.getEntityMap(e.constructor.name);
    let s = this.get(e.constructor.name, e.$id);
    return s == null ? s = m(e) : s.value = e, s.timestamp = +/* @__PURE__ */ new Date(), t.set(e.$id, s), s;
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
    return e != null ? [...this.getEntityMap(e)].map(([, s]) => s) : [...this._cache].flatMap(([, t]) => [...t].map(([, s]) => s));
  }
  findReferences(e) {
    return this.getAll().filter((n) => {
      function i(r) {
        if (Array.isArray(r))
          return r.some((o) => i(o));
        if (r instanceof b) {
          if (r?.constructor?.name === e.constructor.name)
            return r.$id === e.$id;
          const o = Object.entries(r).map(([, l]) => l).filter((l) => l instanceof b || Array.isArray(l) && l.some((c) => c instanceof b));
          return i(o);
        }
        return !1;
      }
      return i(n.value);
    });
  }
  getEntityMap(e) {
    return this._cache.has(e) || this._cache.set(e, /* @__PURE__ */ new Map()), this._cache.get(e);
  }
  cleanup() {
    if (this._expires > 0) {
      const t = +/* @__PURE__ */ new Date() - this._expires * 1e3;
      for (let [s, n] of this._cache)
        if (!this.persistentTypes.includes(s))
          for (let [i, r] of n)
            r.timestamp < t && (console.debug("removing", s, i), n.delete(i));
    }
    const e = K(
      [...this._cache].flatMap(([, t]) => [...t].map(([, s]) => s)),
      (t) => t.timestamp
    );
    e.length > this._maxItems && e.slice(this._maxItems).forEach((s) => {
      const n = s.value.constructor.name;
      if (!this.persistentTypes.includes(n)) {
        const i = this.getEntityMap(n);
        console.debug("removing", n, s.value.$id), i.delete(s.value.$id);
      }
    });
  }
}
const Me = new $e();
function G(a, e, t = Me, s = !1) {
  const n = a instanceof k ? a : new k(a, t, e);
  s && !t.persistentTypes.includes(e) && t.persistentTypes.push(e);
  function i(r) {
    if (r == null)
      return r;
    if (!Array.isArray(r)) {
      const o = a.toEntity(r);
      if (["new", null, void 0, "", 0].includes(o?.$id))
        return o;
    }
    return Array.isArray(r) ? n.getMany(r || []).map((o) => o.value) : n.get(r)?.value;
  }
  return {
    service: n,
    cache: t,
    details: n.details.bind(n),
    list: n.list.bind(n),
    search: n.search.bind(n),
    searchUnion: n.searchUnion.bind(n),
    save: n.save.bind(n),
    remove: n.remove.bind(n),
    toEntity: n.toEntity.bind(n),
    newEntity: n.newEntity.bind(n),
    get: (r) => n.get(r),
    getMany: (r) => n.getMany(r),
    set: (r) => t.set(n.toEntity(r)),
    setMany: (r) => r.map((o) => t.set(n.toEntity(o))),
    fromPool: i,
    fromCache: (r) => r ? t.get(e, r) : t.getAll(e)
  };
}
function et(a, e) {
  return G(a, e);
}
const D = [], I = [];
function H(a) {
  I.length = 0, D.length = 0;
  for (let e of a) {
    D.push(e.name);
    const t = pe(e.name), { list: s } = G(t, e.name, void 0, !0), n = s({ pageSize: 0 });
    I.push(n);
  }
  return T();
}
async function T() {
  return await new Promise((a) => {
    async function e() {
      if (D.length > I.length) {
        setTimeout(e, 50);
        return;
      }
      const t = await Promise.allSettled(I);
      a(t);
    }
    e();
  });
}
const tt = {
  install(a) {
  },
  preload: H,
  ready: T
};
function st() {
  return { preload: H, ready: T };
}
function Re(a, e) {
  return a.$id != null && a.$id == e.$id && a.constructor == e.constructor;
}
function nt(a) {
  const e = m(), t = m(), s = a?.equals || Re, n = S(() => e.value?.filter((c) => t.value?.some((f) => s(c.value, f))) || []), i = S(() => n.value.flatMap((c) => c.getAncestors())), r = S(() => n.value.flatMap((c) => c.getOffspring())), o = S(() => [
    ...new Set(
      n.value.flatMap((c) => c.getAncestors()).concat(n.value).concat(n.value.flatMap((c) => c.getOffspring()))
    )
  ]);
  function l(c, f, v) {
    t.value = c, e.value = new q().init(
      f.map((h) => fe(h)),
      v
    ), e.value.filter((h) => h.parent == null ? !1 : h.parent.getOffspring().some((u) => u != h && u.value == h.value)).forEach((h) => e.value.remove(h));
  }
  return {
    tree: e,
    nodes: n,
    ancestors: i,
    offspring: r,
    family: o,
    init: l
  };
}
function at({ emit: a }) {
  const e = m();
  function t(i) {
    i != null && (e.value = i, a("drag", i));
  }
  function s() {
    e.value = void 0, a("dragend");
  }
  function n(i) {
    i == null || e.value == null || e.value == i || e.value?.getOffspring()?.includes(i) || (a("drop", i), a("move", { child: e.value, parent: i }), e.value = void 0);
  }
  return {
    draggingNode: e,
    handleDrag: t,
    handleDragEnd: s,
    handleDrop: n
  };
}
export {
  g as DEFAULT_PAGESIZE,
  Ee as DefaultSearchObject,
  ot as DetailsSummary,
  b as EntityBase,
  Ce as EntityDescriptor,
  ye as EntityServiceBase,
  ut as FormStates,
  Ve as JSONService,
  Oe as NavGroup,
  V as NavItem,
  me as NavTypes,
  ve as PagingInfo,
  $e as PoolCache,
  k as PoolService,
  we as SearchObjectBase,
  Be as Selector,
  Le as SortByInfo,
  Xe as buildNavigationTree,
  x as cleanQueryParams,
  C as createNavGroup,
  A as createNavItem,
  et as createStore,
  Me as defaultPoolCache,
  ft as formDefaults,
  dt as formModalDefaults,
  He as importDashboard,
  Je as importNavbar,
  We as isNavItem,
  ge as parseQueryParams,
  tt as preloaderPlugin,
  ct as useDetails,
  at as useDragDrop,
  Qe as useEntityDescribers,
  Ge as useFilter,
  ht as useForm,
  pt as useListInput,
  mt as useListItemInput,
  Ze as useListView,
  vt as useModal,
  B as useOverviewCore,
  gt as useOwnedCollection,
  yt as useOwnedModal,
  G as usePooling,
  st as usePreloader,
  Ye as useRouteOverview,
  Ke as useSearchView,
  nt as useTree
};
