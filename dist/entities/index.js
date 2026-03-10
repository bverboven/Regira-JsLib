import { E as u } from "../_chunks/event-handler-DDyWpzD1.js";
import r from "axios";
import { b as d } from "../_chunks/string-utility-BI1ViWED.js";
import { t as o } from "../_chunks/http-utility-DhbzrxJm.js";
class h {
  constructor(t, { enableCount: s = !0, defaults: e = { searchObject: {} } } = {}) {
    this._defaults = {
      ...e
    }, this._service = t, this.state = {
      details: void 0,
      items: void 0,
      count: void 0,
      searchObject: this._defaults.searchObject
    }, this.reset(), this._enableCount = !!s;
  }
  async details(t) {
    const s = this.state.details, e = [t].concat([...arguments].slice(1)), i = await this._service.details.apply(this._service, e);
    return this.setDetails(i), await this.trigger("change-details", { original: s, item: i }), this.state.details;
  }
  // deprecated -> use search instead
  async list(t = {}) {
    const s = this.state.items;
    this.setSearchObject(t);
    const e = [this.state.searchObject].concat([...arguments].slice(1)), i = await this._service.list.apply(this._service, e);
    return this.setItems(i), await this.trigger("change-items", { original: s, items: i }), this.state.items;
  }
  // deprecated -> use search instead
  async count(t = {}) {
    const s = this.state.count;
    this.setSearchObject(t);
    const e = [this.state.searchObject].concat([...arguments].slice(1)), i = await this._service.count.apply(this._service, e);
    return this.setCount(i), await this.trigger("change-count", { original: s, count: i }), this.state.count;
  }
  async search(t = this.state.searchObject) {
    const s = {
      searchObject: this.state.searchObject,
      items: this.state.items,
      count: this.state.count
    };
    this.setSearchObject(t);
    const e = [this.state.searchObject].concat([...arguments].slice(1));
    let i;
    this._enableCount && (i = await this._service.count.apply(this._service, e), this.setCount(i));
    const a = !this._enableCount || i > 0 ? await this._service.list.apply(this._service, e) : [];
    this.setItems(a);
    const c = { searchObject: t, items: a, count: i };
    return await this.trigger("search", { original: s, state: c }), c;
  }
  async save(t = null) {
    const s = t || this.state.details, e = [s].concat([...arguments].slice(1)), i = await this._service.save.apply(this._service, e);
    if ((!t || t === this.state.details) && this.setDetails(i), this.state.items != null) {
      const a = [...this.state.items], c = a.findIndex((l) => l.id === s.id);
      c !== -1 ? a.splice(c, 1, i) : a.push(i), this.setItems(a);
    }
    return await this.trigger("save-item", { original: s, saved: i }), i;
  }
  async delete(t = null) {
    const s = t || this.state.details, e = [s].concat([...arguments].slice(1));
    if (await this._service.delete.apply(this._service, e), this.state.items != null) {
      const i = this.state.items.filter((a) => a.id !== s.id);
      this.setItems(i);
    }
    return await this.trigger("delete-item", { item: s }), s;
  }
  async newItem() {
    const t = {};
    return this.setDetails(t);
  }
  setDetails(t) {
    this.state.details = t;
  }
  setItems(t) {
    this.state.items = t;
  }
  setCount(t) {
    this.state.count = t;
  }
  setSearchObject(t = {}) {
    this.state.searchObject = t;
  }
  reset() {
    this.state.items = void 0, this.state.details = void 0, this.state.count = void 0, this.state.searchObject = {};
  }
}
u.injectInto(h.prototype);
let g = class {
  constructor(t, s, e) {
    this.api = t, this.catalogName = s, this.version = e;
  }
  async details(t) {
    const s = await this.list();
    return !Array.isArray(s) && t == null ? s : s.find((e) => e.id === t);
  }
  async list() {
    const t = this.getCatalogUrl(), s = await r.get(t);
    return this.checkResponse(s), s.data;
  }
  getCatalogUrl() {
    return `${d(this.api, "/")}/${this.catalogName}.json${this.version ? "?v=" + this.version : ""}`;
  }
  checkResponse(t) {
    if (t.status < 200 || t.status >= 400)
      throw console.error("Remote error", { response: t }), Error(`${t.statusText} (${t.status})`);
  }
};
class v {
  constructor(t) {
    this.listUrl = t.listUrl, this.detailsUrl = t.detailsUrl, this.countUrl = t.countUrl, this.saveUrl = t.saveUrl, this.deleteUrl = t.deleteUrl, this.version = t.version;
  }
  async details(t) {
    const s = this.getDetailsUrl(t), e = await r.get(s);
    return this.checkResponse(e), e.data;
  }
  async list(t) {
    const s = this.getListUrl(t), e = await r.get(s);
    return this.checkResponse(e), e.data;
  }
  async count(t) {
    const s = this.getCountUrl(t), e = await r.get(s);
    return this.checkResponse(e), e.data;
  }
  async save(t) {
    const s = this.getSaveUrl(t);
    try {
      const e = await r.post(s, t);
      if (this.checkResponse(e), e.data && e.data.saved)
        return e.data.saved;
    } catch (e) {
      this.throwRemoteError("Saving failed", e);
    }
    return t;
  }
  async delete(t) {
    const s = this.getDeleteUrl(t);
    try {
      const e = await r.delete(s);
      this.checkResponse(e);
    } catch (e) {
      this.throwRemoteError("Deleting failed", e);
    }
    return t;
  }
  getDetailsUrl(t) {
    return this.detailsUrl.replace("{id}", t);
  }
  getListUrl(t = {}) {
    let s = this.listUrl;
    return Object.keys(t).length > 0 && (s += "?" + o(t)), s;
  }
  getCountUrl(t = {}) {
    let s = this.countUrl;
    return Object.keys(t).length > 0 && (s += "?" + o(t)), s;
  }
  getSaveUrl(t) {
    return this.saveUrl.replace("{id}", t.id || "");
  }
  getDeleteUrl(t) {
    return this.deleteUrl.replace("{id}", t.id);
  }
  checkResponse(t) {
    if (t.status < 200 || t.status >= 400)
      throw console.error("Remote error", { response: t }), Error(`${t.statusText} (${t.status})`);
  }
  throwRemoteError(t, s) {
    const e = Error(t);
    throw s.response && (e.data = s.response.data, "errors" in e.data && (e.errors = s.response.data.errors), e.status = s.response.status, e.statusText = s.response.statusText), e;
  }
}
const f = {
  EntityManager: h,
  JsonService: g,
  EntityService: v
};
export {
  h as EntityManager,
  v as EntityService,
  g as JsonService,
  f as default
};
