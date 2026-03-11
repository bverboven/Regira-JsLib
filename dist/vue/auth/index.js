import { c as G } from "../../_chunks/query-3.0.2.js";
import { ref as g, computed as v, watch as N, defineComponent as M, openBlock as k, createElementBlock as y, withModifiers as H, unref as f, createElementVNode as c, createTextVNode as J, createCommentVNode as x, withDirectives as F, isRef as $, vModelText as T, toDisplayString as Q, resolveComponent as I, createBlock as C, withCtx as q, renderSlot as L, normalizeProps as R, guardReactiveProps as D, createVNode as W } from "vue";
import { useRouter as O } from "vue-router";
import { defineStore as X } from "pinia";
import { startsWith as Y } from "../../utilities/string-utility.js";
class U {
  _decodedToken;
  isAuthenticated;
  expires;
  userId;
  name;
  email;
  displayName;
  culture;
  role;
  constructor(t, e = { isAuthenticated: !1 }) {
    this._decodedToken = t != null ? JSON.parse(window.atob(t.split(".")[1])) : {}, this.isAuthenticated = e.isAuthenticated, this.expires = (this._decodedToken.exp ?? 0) - (this._decodedToken.nbf ?? 0), this.userId = this.get("sub"), this.name = this.get("name"), this.email = this.get("email"), this.displayName = this.get("displayName") ?? this.get("display_name"), this.culture = this.get("culture");
  }
  get(t) {
    return this._decodedToken[t];
  }
  hasClaim(t, e) {
    const s = this.get(t);
    return typeof s < "u" && (e == null || (Array.isArray(s) ? s.includes(e) : s == e));
  }
  hasPermission(t) {
    return this.hasClaim("permissions", t);
  }
}
const A = () => new U();
class Z {
  constructor(t, e, s) {
    this.axios = t, this.tokenManager = e, this.options = s || {};
  }
  options;
  authenticate({ token: t, isAuthenticated: e }) {
    return e ? (this.tokenManager.token = t, new U(t, { isAuthenticated: e })) : (this.tokenManager.token = void 0, A());
  }
  async login(t, e) {
    const s = this.options?.loginUrl || "auth", i = await this.axios.post(s, { username: t, password: e });
    return this.authenticate(i.data);
  }
  async refresh(t) {
    const s = `auth/refresh/?${G(t || {})}`, i = await this.axios.post(s);
    return this.authenticate(i.data);
  }
  async validateToken() {
    if (this.tokenManager.token != null)
      try {
        const t = await this.axios.post("auth/validate");
        if (t.status >= 200 && t.status < 300)
          return this.authenticate({ token: this.tokenManager.token, isAuthenticated: !0 });
        console.warn("validateToken: invalid statusCode", t.status, { tokenManager: this.tokenManager, token: this.tokenManager.token });
      } catch (t) {
        console.error("validating token failed", { ex: t, token: this.tokenManager.token }), t.response && t.response.status === 401 && (this.tokenManager.token = void 0);
      }
    return A();
  }
  logout() {
    this.tokenManager.token = void 0;
  }
  async changePassword(t) {
    await this.axios.post("auth/password", t);
  }
  async forgotPassword(t) {
    await this.axios.post("auth/password/recover", t);
  }
  async resetPassword(t) {
    await this.axios.post("auth/password/reset", t);
  }
}
const ee = ({ router: n, store: t }) => {
  n.beforeEach((e, s) => {
    if (e.meta && e.meta.allowAnonymous)
      return !0;
    if (t.isAuthenticated) {
      const o = e.matched.map((r) => r.meta?.policy).filter((r) => typeof r == "function");
      if (o.length && !o.every((r) => r(t)))
        return { name: "forbidden", query: { url: e.fullPath } };
      const u = e.matched.flatMap((r) => r.meta?.permissions || []);
      return u.length && !u.every((r) => t.hasPermission(r)) ? { name: "forbidden", query: { url: e.fullPath } } : !0;
    }
    return t.$patch({ authRequired: !0 }), !0;
  });
}, K = "auth:token";
class Se {
  constructor(t = "") {
    this.prefix = t;
  }
  get token() {
    return Object.fromEntries(
      (document.cookie || "").split(";").filter((e) => e.indexOf("=") > 1 && e.indexOf("=") < e.length - 1).map((e) => [e.substring(0, e.indexOf("=")).trim(), e.substring(e.indexOf("=") + 1).trim()])
    )[this.fullKey];
  }
  set token(t) {
    t != null ? document.cookie = `${this.fullKey}=${t}; path=/;` : document.cookie = `${this.fullKey}=;expires=${/* @__PURE__ */ new Date() - 1}; path=/;`;
  }
  get fullKey() {
    return this.prefix + K;
  }
}
class xe {
  constructor(t) {
    this._token = t;
  }
  get token() {
    return this._token;
  }
  set token(t) {
    this._token = t;
  }
}
class Fe {
  constructor(t = "") {
    this.prefix = t;
  }
  get token() {
    return localStorage.getItem(this.fullKey) ?? void 0;
  }
  set token(t) {
    t ? localStorage.setItem(this.fullKey, t) : localStorage.removeItem(this.fullKey);
  }
  get fullKey() {
    return this.prefix + K;
  }
}
let P;
function te(n) {
  const { enabled: t, tokenManager: e, axios: s, clientApp: i, loginUrl: o } = n;
  return P = {
    enabled: t,
    clientApp: i,
    tokenManager: e,
    service: new Z(s, e, { clientApp: i, loginUrl: o })
  }, P;
}
const b = () => P, V = "Auth";
function E() {
  const n = g(!0), t = g(), e = g(A()), s = g(!1), i = O(), o = v(() => n.value && !i.currentRoute.value?.meta?.allowAnonymous), u = v(() => !!e.value.isAuthenticated), r = v(() => e.value?.displayName), d = v(() => (l) => e.value.get(l)), h = v(() => (l, w) => e.value?.hasClaim(l, w) ?? !1), p = v(() => (l) => e.value?.hasPermission(l) ?? !1);
  function _(l) {
    t.value = l;
  }
  async function a({ username: l, password: w }) {
    const { service: z } = b();
    return e.value = await z.login(l, w, t.value), e.value.isAuthenticated;
  }
  async function m(l) {
    const { service: w } = b();
    return e.value = await w.refresh(l), e.value.isAuthenticated;
  }
  async function B() {
    const { service: l } = b();
    return e.value = await l.validateToken(), e.value.isAuthenticated;
  }
  function j() {
    e.value = A();
    const { service: l } = b();
    l.logout();
  }
  return {
    enabled: n,
    clientApp: t,
    authData: e,
    authRequired: s,
    isRequired: o,
    isAuthenticated: u,
    hasPermission: p,
    displayName: r,
    hasClaim: h,
    getClaimValue: d,
    setClientApp: _,
    login: a,
    refresh: m,
    validateToken: B,
    logout: j
  };
}
E.storeName = V;
const S = X(V, E);
function se(n, t) {
  return n.interceptors.request.use((e) => (t.token && (e.headers.Authorization = `Bearer ${t.token}`), e)), n;
}
function ne(n, t) {
  n.interceptors.response.use(
    (e) => e,
    async (e) => {
      const { config: s } = e;
      return console.error("axios error", { error: e, config: s, auth: { ...t.authData }, axios: n }), !Y(s.url, "auth/", !0) && [
        401
        /*, 403*/
      ].includes(e.response?.status) && (t.$patch({ authRequired: !0 }), t.isAuthenticated && await t.validateToken()), Promise.reject(e);
    }
  );
}
const $e = {
  async install(n, t) {
    const { clientApp: e, loginUrl: s, tokenManager: i, authStore: o, axios: u, enableRouteGuard: r = !0, enabled: d = !0, onAuthenticationChange: h = () => {
    } } = t, { $router: p } = n.config.globalProperties, _ = te({
      enabled: d,
      tokenManager: i,
      axios: u,
      clientApp: e,
      loginUrl: s
    }), a = o ?? S();
    if (d ? (n.config.globalProperties.$auth = {
      ..._,
      get authData() {
        return a.authData;
      },
      get isAuthenticated() {
        return !!a.authData?.isAuthenticated;
      },
      get isRequired() {
        return a.authRequired;
      }
    }, e && a.$patch({ clientApp: e, enabled: d })) : n.config.globalProperties.$auth = { enabled: !1 }, d) {
      se(u, i);
      let m = 0;
      N(
        () => a.isAuthenticated,
        () => {
          a.isAuthenticated && (clearInterval(m), m = setInterval(() => a.validateToken(), a.authData.expires * 1e3)), h(a.authData);
        }
      ), await a.validateToken(), r && ee({ router: p, store: a }), ne(u, a);
    } else
      h({ isAuthenticated: !1 });
  }
};
function oe(n, t) {
  const e = g(n.username || ""), s = g(""), i = g(!1), o = g(!1), u = g(!1), r = S();
  async function d() {
    o.value = !0, i.value = !1, t("signingIn", e.value);
    try {
      const p = await r.login({ username: e.value, password: s.value });
      t(p ? "success" : "fail", e.value);
    } catch (p) {
      console.error("login failed", { ex: p }), i.value = !0, u.value = p.response?.data?.isLockedOut, t("fail", e.value);
    } finally {
      o.value = !1;
    }
  }
  function h() {
    t("forgotPassword", e.value);
  }
  return {
    username: e,
    password: s,
    failed: i,
    signingIn: o,
    isLockedOut: u,
    handleSubmit: d,
    handleForgotPassword: h
  };
}
function Te(n, t, e) {
  const { service: s } = b(), i = g(!1), o = g(n.username || ""), u = v(() => o.value != ""), r = g();
  async function d() {
    r.value = void 0, i.value = !0;
    try {
      await s.forgotPassword({ username: o.value, siteUrl: e.siteUrl, siteName: e.siteName }), t("success", o.value), r.value = !0;
    } catch (h) {
      r.value = !1, console.error("Resetting password failed", { err: h }), t("fail", h);
    } finally {
      i.value = !1;
    }
  }
  return N(
    () => n.username,
    () => o.value = n.username || ""
  ), {
    username: o,
    isLoading: i,
    isFormValid: u,
    isSuccess: r,
    handleSubmit: d
  };
}
const ae = {
  key: 0,
  class: "mb-3 position-relative"
}, ie = { class: "bg-danger border rounded text-light p-2" }, re = { key: 0 }, ue = { class: "row mb-3" }, le = { class: "col-sm-9" }, ce = { class: "input-group" }, de = ["disabled"], he = { class: "row mb-3" }, me = { class: "col-sm-9" }, fe = ["disabled"], ge = { class: "row" }, pe = { class: "col-sm-3" }, ve = ["disabled"], ke = { class: "col-sm" }, ye = {
  key: 0,
  class: "text-info"
}, we = /* @__PURE__ */ M({
  __name: "LoginForm",
  props: {
    username: {},
    signingIn: { type: Boolean }
  },
  emits: ["forgotPassword", "signingIn", "success", "fail"],
  setup(n, { emit: t }) {
    const e = t, s = n, { username: i, password: o, signingIn: u, failed: r, isLockedOut: d, handleSubmit: h, handleForgotPassword: p } = oe(s, e);
    return (_, a) => (k(), y("form", {
      onSubmit: a[3] || (a[3] = H(
        //@ts-ignore
        (...m) => f(h) && f(h)(...m),
        ["prevent"]
      )),
      ref: "loginForm"
    }, [
      f(r) ? (k(), y("div", ae, [
        c("div", ie, [
          a[4] || (a[4] = J(" Unfortunately, signing in failed. ", -1)),
          f(d) ? (k(), y("span", re, "Try again in 5 min.")) : x("", !0)
        ])
      ])) : x("", !0),
      c("div", ue, [
        a[5] || (a[5] = c("label", {
          for: "username",
          class: "col-sm-3 col-form-label"
        }, "Username", -1)),
        c("div", le, [
          c("div", ce, [
            F(c("input", {
              class: "form-control",
              autocomplete: "username email",
              "onUpdate:modelValue": a[0] || (a[0] = (m) => $(i) ? i.value = m : null),
              disabled: f(u)
            }, null, 8, de), [
              [T, f(i)]
            ])
          ])
        ])
      ]),
      c("div", he, [
        a[6] || (a[6] = c("label", {
          for: "password",
          class: "col-sm-3 col-form-label"
        }, "Password", -1)),
        c("div", me, [
          F(c("input", {
            type: "password",
            class: "form-control",
            autocomplete: "password current-password",
            "onUpdate:modelValue": a[1] || (a[1] = (m) => $(o) ? o.value = m : null),
            disabled: f(u)
          }, null, 8, fe), [
            [T, f(o)]
          ])
        ])
      ]),
      c("div", ge, [
        c("div", pe, [
          c("button", {
            type: "submit",
            class: "btn btn-primary",
            disabled: f(u)
          }, "Sign in", 8, ve)
        ]),
        c("div", ke, [
          f(u) ? (k(), y("span", ye, " Signing in ... ")) : (k(), y("button", {
            key: 1,
            type: "button",
            class: "btn btn-link",
            onClick: a[2] || (a[2] = //@ts-ignore
            (...m) => f(p) && f(p)(...m))
          }, "Forgot password?"))
        ])
      ])
    ], 544));
  }
}), Ne = /* @__PURE__ */ M({
  __name: "LogoutForm",
  setup(n) {
    const t = S(), e = O(), s = () => {
      t.logout();
      const o = e.currentRoute.value.fullPath;
      e.push({ name: "login", query: { returnUrl: o } });
    }, i = v(() => t.displayName);
    return (o, u) => (k(), y("form", null, [
      c("button", {
        type: "button",
        class: "btn btn-sm btn-secondary",
        onClick: s
      }, Q(i.value) + " afmelden", 1)
    ]));
  }
}), Ie = /* @__PURE__ */ M({
  __name: "LoginModal",
  props: {
    username: {},
    title: { default: "Sign in" }
  },
  emits: ["forgotPassword", "signingIn", "success", "fail"],
  setup(n, { emit: t }) {
    return (e, s) => {
      const i = I("MyModal");
      return k(), C(i, {
        title: n.title,
        showFooter: !1
      }, {
        default: q(() => [
          L(e.$slots, "default", R(D({ username: n.username })), () => [
            W(we, {
              onSuccess: s[0] || (s[0] = (o) => e.$emit("success", o)),
              onForgotPassword: s[1] || (s[1] = (o) => e.$emit("forgotPassword", o)),
              onSigningIn: s[2] || (s[2] = (o) => e.$emit("signingIn", o)),
              onFail: s[3] || (s[3] = (o) => e.$emit("fail", o))
            })
          ])
        ]),
        _: 3
      }, 8, ["title"]);
    };
  }
}), Ce = /* @__PURE__ */ M({
  __name: "ForgotPasswordModal",
  props: {
    username: {}
  },
  setup(n) {
    return (t, e) => {
      const s = I("MyModal");
      return k(), C(s, {
        title: "Forgot password",
        showFooter: !1
      }, {
        default: q(() => [
          L(t.$slots, "default", R(D({ username: n.username })))
        ]),
        _: 3
      });
    };
  }
});
export {
  Z as AuthService,
  Se as CookieTokenManager,
  Ce as ForgotPasswordModal,
  Fe as LocalStorageTokenManager,
  we as LoginForm,
  Ie as LoginModal,
  Ne as LogoutForm,
  xe as MemoryTokenManager,
  E as createStore,
  $e as plugin,
  ee as routeGuard,
  b as useAuth,
  S as useAuthStore,
  Te as useForgotPasswordForm,
  oe as useLoginForm
};
