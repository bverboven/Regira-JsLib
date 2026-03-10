import { ref as n, computed as i, getCurrentInstance as a, watch as s, onMounted as l } from "vue";
import { defineStore as c } from "pinia";
var g = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Loading = "Loading", e.Mounting = "Mounting", e.Ready = "Ready", e))(g || {});
const u = c("AppStore", () => {
  const e = n(
    "Init"
    /* Init */
  ), r = n(navigator.language), t = n();
  return {
    culture: r,
    logo: t,
    status: e,
    isReady: i(
      () => e.value == "Ready"
      /* Ready */
    ),
    setCulture(o) {
      r.value = o || navigator.language;
    },
    setStatus(o) {
      e.value = o;
    },
    setLogo(o) {
      t.value = o;
    }
  };
}), b = {
  install(e, { culture: r } = {}) {
    const t = u();
    t.setCulture(r), Object.defineProperty(e.config.globalProperties, "$culture", {
      get() {
        return t.culture;
      },
      enumerable: !0,
      configurable: !0
    }), e.config.globalProperties.$setCulture = (o) => t.setCulture(o), Object.defineProperty(e.config.globalProperties, "$isReady", {
      get() {
        return t.isReady;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.config.globalProperties, "$appStatus", {
      get() {
        return t.status;
      },
      enumerable: !0,
      configurable: !0
    }), e.config.globalProperties.$setAppStatus = (o) => t.setStatus(o);
  }
};
function y() {
  return a()?.appContext.config.globalProperties.$culture;
}
function p(e) {
  const r = u(), t = a();
  r.isReady ? e() : (s(
    () => r.isReady,
    () => e(),
    { once: !0 }
  ), t && l(() => {
    r.isReady && e();
  }));
}
function R() {
  const e = u();
  return new Promise((r) => {
    let t = !1;
    return e.isReady ? r() : p(() => {
      t || (r(), t = !0);
    });
  });
}
export {
  g as AppStatus,
  p as onAppReady,
  b as plugin,
  u as useAppStore,
  y as useCulture,
  R as whenAppReady
};
