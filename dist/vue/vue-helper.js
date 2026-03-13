import { computed as e, onMounted as t, onUnmounted as n } from "vue";
//#region src/vue/vue-helper.ts
function r(t, n, r = "modelValue", i) {
	return e({
		get: () => t[r] === void 0 ? i : t[r],
		set: (e) => {
			n(`update:${r}`, e);
		}
	});
}
function i(t) {
	let { fromPool: n } = t;
	return e(() => (e) => n(e));
}
function a(e, r, i, a = !1) {
	r.split(" ").forEach((r) => {
		t(() => e.addEventListener(r, i, a)), n(() => e.removeEventListener(r, i, a));
	});
}
//#endregion
export { i as createFromComputedPool, a as useEventListener, r as useVModelField };
