import { computed as e, createCommentVNode as t, createElementBlock as n, defineComponent as r, getCurrentInstance as i, openBlock as a, ref as o, toDisplayString as s } from "vue";
//#region src/vue/debug/Display.vue?vue&type=script&setup=true&lang.ts
var c = {
	key: 0,
	class: "debug pre text-muted"
}, l = /* @__PURE__ */ r({
	__name: "Display",
	props: { modelValue: {} },
	setup(r) {
		let o = r, l = i(), u = e(() => !!l?.proxy?.$isDebug), d = e(() => JSON.stringify(o.modelValue || {}, null, 2));
		return (e, r) => u.value ? (a(), n("div", c, s(d.value), 1)) : t("", !0);
	}
}), u = { install(e, t) {
	let n = o(!!t?.isDebug), r = o(!0);
	e.component("Debug", l), Object.defineProperty(e.config.globalProperties, "$isDebug", {
		get() {
			let t = e.config.globalProperties.$router.currentRoute.value.query?.debug;
			return r.value && (t === void 0 ? n.value : t === "1");
		},
		enumerable: !0,
		configurable: !0
	}), e.config.globalProperties.$setDebug = (e = !0) => r.value = e;
} };
//#endregion
export { l as Debug, u as default, u as plugin };
