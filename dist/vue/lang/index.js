import { ref as e, watchEffect as t } from "vue";
//#region src/vue/lang/formatText.ts
function n(e, t) {
	if (typeof t == "function") return t(e);
	let n = e;
	return r(e)?.forEach((e) => {
		if (e in t) {
			let r = i(t[e]), a = RegExp(`{${e}}`, "g");
			n = n.replace(a, r);
		}
	}), n;
}
function r(e) {
	let t = /\{([^{}]+)\}/g, n = [], r;
	for (; (r = t.exec(e)) !== null;) n.push(r[1]);
	return n;
}
function i(e) {
	return e?.toString() ?? "";
}
//#endregion
//#region src/vue/lang/translate.ts
function a(e, t, n, r) {
	if (t == null) return e;
	let i = t[e];
	return i == null ? (console.warn(`translate: ${e} not found`, {
		values: t,
		langCode: n
	}), e) : o(i, n, r);
}
function o(e, t, r) {
	let i = typeof e == "string" ? e : e[t] ?? e[t.substring(0, 2)];
	return r != null && (i = n(i, r)), i;
}
//#endregion
//#region src/vue/lang/useLang.ts
var s = e(""), c = e(""), l = e({});
function u() {
	return {
		langCode: s,
		fallbackLangCode: c,
		messages: l,
		translate: (e, t) => a(e, l.value, s.value, t) || a(e, l.value, c.value, t),
		translateMessage: (e, t) => o(e, s.value, t) || o(e, c.value, t),
		setLangCode(e) {
			e && (s.value = e);
		},
		replaceMessages: (e) => l.value = e,
		loadMessages: (e) => l.value = {
			...l.value,
			...e
		}
	};
}
//#endregion
//#region src/vue/lang/plugin.ts
var d = { install(n, r) {
	let i = e(!1), { fallbackLangCode: a, translate: o, translateMessage: s, setLangCode: c, replaceMessages: l } = u();
	c(r.defaultLang ?? "en"), a.value = r.defaultLang ?? "en", typeof r.messages == "function" ? t(async () => {
		l(await r.messages()), i.value = !0;
	}) : (l(r.messages), i.value = !0), n.config.globalProperties.$t = (e, t) => i.value ? o(e, t) : "", n.config.globalProperties.$tm = (e, t) => s(e, t);
} };
//#endregion
export { n as formatText, d as plugin, a as translate, o as translateMessage, u as useLang };
