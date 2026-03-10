import { ref as o } from "vue";
function t() {
  return { isOnline: o(navigator.onLine) };
}
const s = {
  install(n) {
    const { isOnline: e } = t(), i = () => e.value = navigator.onLine;
    window.addEventListener("offline", i), window.addEventListener("online", i), n.config.globalProperties.$isOnline = e, n.provide("isOnline", e);
  }
};
export {
  s as default,
  s as plugin,
  t as useOnlineChecker
};
