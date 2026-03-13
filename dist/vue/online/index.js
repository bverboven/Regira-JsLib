import { ref as e } from "vue";
//#region src/vue/online/online-checker.ts
function t() {
	return { isOnline: e(navigator.onLine) };
}
//#endregion
//#region src/vue/online/plugin.ts
var n = { install(e) {
	let { isOnline: n } = t(), r = () => n.value = navigator.onLine;
	window.addEventListener("offline", r), window.addEventListener("online", r), e.config.globalProperties.$isOnline = n, e.provide("isOnline", n);
} };
//#endregion
export { n as default, n as plugin, t as useOnlineChecker };
