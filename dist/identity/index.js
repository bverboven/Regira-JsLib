import { E as a } from "../_chunks/event-handler-3.0.1.js";
class s {
  constructor({ authenticationService: e, autoRefresh: t = !1 }) {
    this._service = e, this._autoRefreshTimer = null, this._autoRefresh = t, this._setState();
  }
  get autoRefresh() {
    return this._autoRefresh;
  }
  set autoRefresh(e) {
    this._autoRefresh = !!e, this._checkAutoRefresh();
  }
  async login(e, t) {
    const i = await this._service.login(e, t);
    return this._setState(i), this._checkAutoRefresh(), this.trigger("login", { ...this.state });
  }
  async refresh() {
    const e = await this._service.refresh(this.state.refreshToken);
    return this._setState(e), this._checkAutoRefresh(), this.trigger("refresh", { ...this.state });
  }
  async logoff() {
    const e = { ...this.state };
    return this._setState(), this.trigger("logoff", e);
  }
  _setState(e = null) {
    if (!e) {
      this.state = { isAuthenticated: !1 };
      return;
    }
    this.state = {
      ...e,
      expiresAt: new Date((/* @__PURE__ */ new Date()).getTime() + e.expiresIn * 1e3),
      isAuthenticated: !0
    };
  }
  _checkAutoRefresh() {
    const e = this;
    if (this._autoRefreshTimer && clearTimeout(this._autoRefreshTimer), this._autoRefresh) {
      const t = Math.abs(this.state.expiresAt - /* @__PURE__ */ new Date()) - 6e4;
      this._autoRefreshTimer = setTimeout(e.refresh, t);
    }
  }
}
a.injectInto(s.prototype);
class h {
  constructor() {
    console.warn("This is a dummy-service");
  }
  async login(e, t) {
    console.warn("Not implemented: login");
  }
  async refresh(e) {
    console.warn("Not implemented: refresh");
  }
  async resetPassword(e) {
    console.warn("Not implemented: resetPassword");
  }
}
const n = {
  IdentityManager: s,
  DummyService: h
};
export {
  h as DummyService,
  s as IdentityManager,
  n as default
};
