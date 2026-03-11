import { d as e } from "../../_chunks/ServiceProvider-3.0.2.js";
import { S as l, g as v } from "../../_chunks/ServiceProvider-3.0.2.js";
const s = {
  install(r, { configure: i } = {}) {
    r.config.globalProperties.$services = e, r.provide("services", e), i && i(e);
  }
};
export {
  l as ServiceProvider,
  e as default,
  v as get,
  s as plugin
};
