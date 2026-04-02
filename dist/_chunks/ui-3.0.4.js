import { isEmail as e, isIP as t, isPhone as n } from "../utilities/string-utility.js";
import { debounceToPromise as r } from "../utilities/promise-utility.js";
import { n as i, t as a } from "./clipboard-utility-3.0.4.js";
import { useEventListener as o, useVModelField as s } from "../vue/vue-helper.js";
import "./feedback-3.0.4.js";
import { n as c, r as l } from "./modal-3.0.4.js";
import { dateInputString as u } from "../vue/formatters/index.js";
import "./icons-3.0.4.js";
import { Fragment as d, Teleport as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, getCurrentInstance as x, inject as S, isRef as C, mergeDefaults as w, mergeProps as ee, normalizeClass as T, normalizeStyle as E, onMounted as D, onUnmounted as te, openBlock as O, ref as k, renderList as A, renderSlot as j, resolveComponent as M, resolveDirective as N, resolveDynamicComponent as P, toDisplayString as F, toRefs as I, unref as L, vModelText as ne, vShow as R, watch as z, watchEffect as B, withCtx as V, withDirectives as H, withKeys as U, withModifiers as W } from "vue";
import { useRouter as re } from "vue-router";
import { isValid as ie } from "date-fns";
import { debounce as ae } from "lodash";
//#region src/vue/ui/autocomplete/autocomplete.ts
var G = [
	"update:modelValue",
	"update:idValue",
	"select",
	"qInput"
], oe = {
	idValue: [String, Number],
	modelValue: { required: !1 },
	data: {
		type: Array,
		default: () => []
	},
	search: Function,
	idSelector: Function,
	displayItemFormatter: Function,
	resultItemFormatter: Function,
	enableDblClick: {
		type: Boolean,
		default: !1
	},
	resultClass: {
		type: String,
		default: ""
	},
	itemsClass: {
		type: String,
		default: ""
	},
	itemClass: {
		type: String,
		default: ""
	},
	maxResults: {
		type: Number,
		default: 10
	},
	debounceTime: {
		type: Number,
		defaults: 250
	}
}, se = {
	data: () => [],
	maxResults: 10,
	debounceTime: 250,
	autoSelect: !1
};
function K(e, { emit: t }) {
	let n = k(""), a = k(-1), s = k(e.data), c = k(!1), l = k(!1), u = k(!1), d = p({
		get: () => e.modelValue,
		set: (n) => {
			e.modelValue !== n && (t("update:modelValue", n), t("update:idValue", y(n)), t("select", n));
		}
	}), f = p(() => y(d.value)), m = k(), h = k({
		top: 0,
		left: 0
	}), g = k({
		top: 0,
		left: 0
	}), _ = k({
		top: 0,
		left: 0
	}), v = p(() => {
		let { width: e, height: t } = m.value?.getBoundingClientRect() || {
			width: 0,
			height: 0
		};
		return {
			visibility: c.value ? "visible" : "hidden",
			top: `${t}px`,
			left: `${m.value?.offsetLeft || 0}px`,
			width: `${e}px`
		};
	}), y = e.idSelector || ((e) => e), b = e.resultItemFormatter || ((e, t) => (e || "").toString()), x = e.displayItemFormatter || b;
	async function S(t = "") {
		return e.data?.filter((e) => b(e, n.value).toLowerCase().startsWith(t.toLowerCase()));
	}
	async function C(t = n.value) {
		P(), u.value = !0, s.value = void 0;
		try {
			let n = await ne(t), r = e.maxResults || n.length;
			s.value = n.slice(0, r), a.value = s.value?.findIndex((e) => y(e) == y(d.value));
		} finally {
			u.value = !1;
		}
	}
	function w(t = !1) {
		if (d.value == null && s.value) {
			let r = s.value?.filter((e) => (x(e)?.toString() || "").toLowerCase() === n.value?.toLowerCase());
			r.length == 1 ? O(r[0]) : t && e.autoSelect && O(s.value[0]);
		}
	}
	function ee() {
		j(), C();
	}
	function T() {
		w();
	}
	function E(e, t) {
		F(), O(e, e ? t : -1);
	}
	function O(e, t) {
		if (e == null && t == null) {
			j(), n.value || F();
			return;
		}
		e && (t == null || t < 0) ? t = (s.value || []).indexOf(e) : !e && t >= 0 && (e = s.value[t]), e != null && (a.value = t, d.value = e, n.value = x(d.value));
	}
	function A(e) {
		let t = a.value + e, n = s.value[t];
		t >= 0 && t < s.value.length && O(n, t);
	}
	function j() {
		a.value = -1, d.value = void 0;
	}
	function M() {
		n.value = "", j(), F();
	}
	function N(e) {
		let t = 0, n = 0;
		do
			t += e?.offsetTop || 0, n += e?.offsetLeft || 0, e = e?.offsetParent;
		while (e);
		return {
			top: t,
			left: n
		};
	}
	function P() {
		R(), c.value = !0;
	}
	function F() {
		c.value = !1;
	}
	function I() {
		c.value && (w(!0), d.value ?? (n.value = ""), setTimeout(F, 250));
	}
	function L(e) {
		throw e;
	}
	let ne = r(e.search || e.data && S || L(/* @__PURE__ */ Error("prop search or data is required")), e.debounceTime), R = () => {
		h.value = N(m.value), _.value = m.value ? i(m.value) : {
			top: 0,
			left: 0
		};
	}, B = r(R, 50);
	return o(window, "resize", B), D(() => {
		n.value = x(d.value), R(), document.addEventListener("scroll", B, !0);
	}), te(() => {
		document.removeEventListener("scroll", B, !0);
	}), z(d, (e, t) => {
		e != t && e != d.value && O(e), e && (n.value = x(d.value));
	}), z(n, () => t("qInput", n.value || "")), {
		q: n,
		selectedItem: d,
		selectedIndex: a,
		selectedId: f,
		items: s,
		isOpen: c,
		isFocus: l,
		isLoading: u,
		inputEl: m,
		resultOffset: g,
		resultStyle: v,
		displayItemFormatter: x,
		resultItemFormatter: b,
		handleInput: ee,
		handleChange: T,
		handleSelect: E,
		handleSearch: C,
		openResults: P,
		closeResults: F,
		closeGently: I,
		moveSelection: A,
		checkMatch: w,
		clearSelection: j,
		reset: M
	};
}
//#endregion
//#region src/vue/ui/autocomplete/Autocomplete.vue?vue&type=script&setup=true&lang.ts
var ce = { class: "loading list-group-item" }, le = ["onClick"], ue = ["innerHTML"], de = /* @__PURE__ */ b({
	inheritAttrs: !1,
	inheritAttrs: !1,
	__name: "Autocomplete",
	props: /* @__PURE__ */ w({
		idValue: {},
		modelValue: {},
		data: {},
		maxResults: {},
		debounceTime: {},
		enableDblClick: { type: Boolean },
		autoSelect: { type: Boolean },
		allowFreeInput: { type: Boolean },
		resultClass: {},
		itemsClass: {},
		itemClass: {},
		search: { type: Function },
		idSelector: { type: Function },
		displayItemFormatter: { type: Function },
		resultItemFormatter: { type: Function }
	}, { ...se }),
	emits: G,
	setup(e, { expose: t, emit: n }) {
		let r = n, i = e, { q: a, selectedItem: o, selectedIndex: s, items: c, isFocus: l, inputEl: u, resultStyle: f, isLoading: p, resultItemFormatter: m, closeGently: h, moveSelection: v, handleInput: y, handleChange: b, handleSelect: x, handleSearch: S, reset: w } = K(i, { emit: r });
		function D() {
			l.value = !0, ((i.idSelector && i.idSelector(o.value) || "new") == "new" || o.value == null) && S();
		}
		function te() {
			l.value = !1;
		}
		function k() {
			i.enableDblClick && S("");
		}
		function M(e) {
			e.target != u.value && h();
		}
		return t({
			inputEl: u,
			q: a,
			selectedItem: o,
			search: S,
			reset: w,
			resetQ() {
				l.value || (a.value = "");
			}
		}), (t, n) => {
			let r = N("click-outside");
			return O(), g(d, null, [H(_("input", ee({
				autocomplete: "__away",
				type: "text"
			}, t.$attrs, {
				"onUpdate:modelValue": n[0] ||= (e) => C(a) ? a.value = e : null,
				onInput: n[1] ||= (...e) => L(y) && L(y)(...e),
				onFocus: D,
				onDblclick: k,
				onBlur: te,
				onChange: n[2] ||= (...e) => L(b) && L(b)(...e),
				onKeydown: [
					n[3] ||= U((e) => L(v)(1), ["down"]),
					n[4] ||= U((e) => L(v)(-1), ["up"]),
					n[5] ||= U(W((e) => L(x)(L(o), L(s)), ["prevent"]), ["enter"])
				],
				ref_key: "inputEl",
				ref: u
			}), null, 16), [[ne, L(a)]]), H((O(), g("div", {
				class: T(["autocomplete-items bg-white border", e.resultClass]),
				style: E(L(f))
			}, [_("div", { class: T(["list-group", e.itemsClass]) }, [H(_("div", ce, "Loading...", 512), [[R, L(p)]]), (O(!0), g(d, null, A(L(c), (n, r) => (O(), g("div", {
				key: r,
				onClick: (e) => L(x)(n, r),
				class: T(["autocomplete-item list-group-item list-group-item-action", [e.itemClass, { "bg-light": r == L(s) }]])
			}, [j(t.$slots, "default", {
				item: n,
				q: L(a)
			}, () => [_("div", { innerHTML: L(m)(n, L(a)) }, null, 8, ue)])], 10, le))), 128))], 2)], 6)), [[r, M]])], 64);
		};
	}
}), fe = ["name"], pe = {
	key: 1,
	class: "ms-1"
}, me = /* @__PURE__ */ b({
	__name: "ConfirmButton",
	props: {
		icon: { default: "warning" },
		buttonLabel: {},
		modalTitle: { default: "Sure?" },
		modalType: { default: l.warning }
	},
	emits: [
		"confirm",
		"cancel",
		"open",
		"close"
	],
	setup(e, { emit: t }) {
		let n = t, r = k(!1);
		function i() {
			n("confirm"), s();
		}
		function a() {
			n("open"), r.value = !0;
		}
		function o() {
			n("cancel"), s();
		}
		function s() {
			n("close"), r.value = !1;
		}
		return (t, n) => {
			let c = M("Icon"), l = M("MyModal");
			return O(), g("button", {
				type: "button",
				class: "btn",
				name: e.icon,
				onClick: a
			}, [j(t.$slots, "button-content", {}, () => [e.icon == null ? h("", !0) : (O(), m(c, {
				key: 0,
				name: e.icon
			}, null, 8, ["name"])), e.buttonLabel ? (O(), g("span", pe, F(e.buttonLabel), 1)) : h("", !0)]), (O(), m(f, { to: "#modals" }, [j(t.$slots, "modal", {}, () => [y(l, {
				"is-visible": r.value,
				type: e.modalType,
				title: e.modalTitle,
				onSubmit: i,
				onCancel: o,
				onClose: s
			}, {
				default: V(() => [j(t.$slots, "default")]),
				_: 3
			}, 8, [
				"is-visible",
				"type",
				"title"
			])])]))], 8, fe);
		};
	}
}), he = ["href"], ge = /* @__PURE__ */ b({
	__name: "Anchor",
	props: { href: {} },
	setup(r) {
		let i = r, a = p(() => {
			let r = i.href;
			return e(r) ? r.startsWith("mailto:") || (r = "mailto:" + r) : t(r) ? r = "http://" + r : n(r) ? r.startsWith("tel:") || (r = "tel:" + r) : !r.startsWith("http") && ![
				"mailto:",
				"tel:",
				"ftp:"
			].some((e) => r.startsWith(e)) && (r = "http://" + r), r;
		});
		return (e, t) => (O(), g("a", { href: a.value }, [j(e.$slots, "default")], 8, he));
	}
}), _e = ["value", "lang"], ve = /* @__PURE__ */ b({
	__name: "DateInput",
	props: {
		modelValue: {},
		culture: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t, r = e, i = p(() => ie(new Date(r.modelValue || ""))), a = p(() => i.value ? u(new Date(r.modelValue)) : r.modelValue), o = (e) => {
			let t = new Date(e.target.value);
			(!e.target.value || ie(t)) && n("update:modelValue", t || e.target.value);
		};
		return (t, n) => (O(), g("input", {
			type: "date",
			value: a.value,
			onChange: o,
			lang: e.culture,
			class: T({ "is-invalid": a.value && !i.value })
		}, null, 42, _e));
	}
}), ye = /* @__PURE__ */ b({
	__name: "FormLabel",
	props: {
		label: {},
		autoHide: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (O(), g("small", { class: T(["form-text text-muted", e.autoHide ? "d-none d-md-inline" : "d-inline"]) }, F(e.label), 3));
	}
}), be = ["checked"], xe = /* @__PURE__ */ b({
	name: "NullableCheckBox",
	props: { modelValue: { type: [
		Boolean,
		String,
		Number
	] } },
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = t, r = e, i = k(null), a = k(((e) => {
			if (e != null) return typeof e == "string" ? e === "true" ? !0 : e === "false" ? !1 : void 0 : new Boolean(e).valueOf();
		})(r.modelValue)), o = p({
			get() {
				return a.value;
			},
			set(e) {
				a.value = e, n("update:modelValue", e), n("change", { target: i.value });
			}
		}), s = p(() => ({ opacity: o.value == null ? .5 : 1 }));
		function c() {
			o.value = o.value == null ? !0 : o.value ? !1 : void 0;
		}
		return B(() => i.value && (i.value.indeterminate = o.value === void 0)), (e, t) => (O(), g("input", {
			type: "checkbox",
			ref_key: "input",
			ref: i,
			onClick: c,
			"true-value": !0,
			checked: o.value,
			style: E(s.value)
		}, null, 12, be));
	}
}), Se = /* @__PURE__ */ b({
	__name: "NullableLabel",
	props: { label: {} },
	setup(e) {
		return (t, n) => (O(), g("span", { class: T({ "italic-muted": !e.label }) }, [e.label ? (O(), g(d, { key: 0 }, [v(F(e.label), 1)], 64)) : j(t.$slots, "default", { key: 1 })], 2));
	}
}), Ce = { class: "form-section" }, we = { class: "form-section-title" }, Te = { class: "row" }, Ee = { class: "p-2 mb-2" }, De = { class: "col-auto" }, Oe = /* @__PURE__ */ b({
	__name: "FormSection",
	props: {
		title: {},
		readonly: { type: Boolean },
		showSummary: { type: Boolean },
		collapsed: { type: Boolean },
		summaryClass: {}
	},
	emits: ["expand", "collapse"],
	setup(e, { emit: t }) {
		let n = t, r = e, i = x(), a = k(r.collapsed), o = k(r.readonly || r.showSummary), s = p({
			get: () => i?.slots.summary && (r.readonly || o.value),
			set: (e) => o.value = !!e
		});
		function c() {
			a.value = !a.value, a.value ? n("collapse") : n("expand");
		}
		return z(() => r.collapsed, () => {
			a.value = r.collapsed, a.value ? n("collapse") : n("expand");
		}), (t, n) => {
			let r = M("Icon");
			return O(), g("div", Ce, [_("div", we, [j(t.$slots, "header", {
				collapsed: a.value,
				showSummary: s.value
			}, () => [_("div", Te, [_("div", {
				class: "col",
				onClick: n[0] ||= (e) => s.value = !s.value
			}, [j(t.$slots, "title", { showSummary: s.value }, () => [_("h3", Ee, F(e.title), 1)])]), _("div", De, [!e.readonly && t.$slots.summary ? (O(), g("button", {
				key: 0,
				type: "button",
				class: "btn btn-default my-2 px-2 py-1 opacity-50",
				onClick: n[1] ||= W((e) => s.value = !s.value, ["stop"])
			}, [y(r, { name: s.value ? "look" : "edit" }, null, 8, ["name"])])) : h("", !0), _("button", {
				type: "button",
				class: "btn btn-default my-2 px-2 py-1 opacity-50",
				onClick: W(c, ["stop"])
			}, [y(r, { name: a.value ? "maximize" : "minimize" }, null, 8, ["name"])])])])])]), H(_("div", { class: T(["form-section-body", s.value && e.summaryClass]) }, [
				!t.$slots.summary || !s.value ? j(t.$slots, "default", {
					key: 0,
					collapsed: a.value
				}) : h("", !0),
				t.$slots.summary && s.value ? j(t.$slots, "summary", {
					key: 1,
					collapsed: a.value
				}) : h("", !0),
				j(t.$slots, "always")
			], 2), [[R, !a.value]])]);
		};
	}
}), ke = /* @__PURE__ */ b({
	__name: "FileDropZone",
	emits: ["drop-files"],
	setup(e, { expose: t, emit: n }) {
		let r = n, i = k();
		async function a(e) {
			r("drop-files", [...e.dataTransfer.files]);
		}
		return t({ isDropping: i }), (e, t) => (O(), g("div", {
			onDrop: W(a, ["prevent"]),
			onDragover: t[0] ||= W((e) => i.value = !0, ["prevent"]),
			onDragleave: t[1] ||= W((e) => i.value = !1, ["prevent"])
		}, [j(e.$slots, "default", { isDropping: i.value })], 32));
	}
}), Ae = /* @__PURE__ */ b({
	__name: "CopyToClipboardButton",
	props: {
		value: {},
		timeout: { default: 2500 }
	},
	setup(e, { expose: t }) {
		let n = e, r = k();
		function i() {
			a(n.value ?? ""), r.value = !0, setTimeout(() => r.value = void 0, n.timeout);
		}
		return t({ success: r }), (e, t) => {
			let n = M("IconButton");
			return O(), m(n, {
				icon: r.value ? "check" : "copy",
				disabled: r.value,
				onClick: i
			}, null, 8, ["icon", "disabled"]);
		};
	}
}), je = ["src"], q = /* @__PURE__ */ b({
	__name: "GMap",
	props: {
		modelValue: {},
		zoom: {}
	},
	setup(e) {
		let t = e, n = p(() => (Array.isArray(t.modelValue) ? t.modelValue : [t.modelValue]).filter((e) => e).join(" ")), r = p(() => `https://maps.google.com/maps?q=${encodeURIComponent(n.value)}&t=&z=${t.zoom || 10}&ie=UTF8&iwloc=&output=embed`);
		return (e, t) => (O(), g("iframe", {
			src: r.value,
			frameborder: "0",
			scrolling: "no",
			marginheight: "0",
			marginwidth: "0",
			allowfullscreen: ""
		}, null, 8, je));
	}
}), Me = ["href"], Ne = /* @__PURE__ */ b({
	__name: "GmapLink",
	props: { modelValue: {} },
	setup(e) {
		let t = e, n = p(() => (Array.isArray(t.modelValue) ? t.modelValue : [t.modelValue]).filter((e) => e).join(" "));
		return (e, t) => {
			let r = M("Icon");
			return O(), g("a", { href: `https://www.google.com/maps/?q=${n.value}` }, [y(r, { name: "map" }), j(e.$slots, "default")], 8, Me);
		};
	}
}), Pe = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ b({
	__name: "ModalButton",
	props: {
		modelValue: {},
		zoom: {}
	},
	setup(e) {
		let t = e, n = p(() => (Array.isArray(t.modelValue) ? t.modelValue : [t.modelValue]).filter((e) => e).join(" ")), r = k(!1);
		return (t, i) => {
			let a = M("Icon");
			return O(), g("button", {
				type: "button",
				onClick: i[1] ||= (e) => r.value = !0
			}, [j(t.$slots, "default", {}, () => [y(a, { name: "map" })], !0), (O(), m(f, { to: "#modals" }, [y(L(c), {
				"is-visible": r.value,
				title: n.value,
				"show-footer": !1,
				"full-width": !0,
				onClose: i[0] ||= (e) => r.value = !1
			}, {
				default: V(() => [y(q, {
					id: "gmap_canvas",
					modelValue: e.modelValue,
					zoom: e.zoom,
					class: "w-100"
				}, null, 8, ["modelValue", "zoom"])]),
				_: 1
			}, 8, ["is-visible", "title"])]))]);
		};
	}
}), [["__scopeId", "data-v-185b1d6b"]]), Fe = ["src"], J = /* @__PURE__ */ b({
	__name: "Loading",
	setup(e, { expose: t }) {
		let n = S("loadingImg"), r = k(null);
		return t({
			imgEl: r,
			dimensions: () => [r.value?.width, r.value?.height],
			height: () => r.value?.naturalHeight
		}), (e, t) => (O(), g("img", {
			src: L(n),
			ref_key: "imgEl",
			ref: r
		}, null, 8, Fe));
	}
}), Ie = ["disabled"], Le = /* @__PURE__ */ b({
	__name: "LoadingButton",
	props: {
		isLoading: { type: Boolean },
		disabled: { type: Boolean }
	},
	setup(e) {
		return (t, n) => (O(), g("button", {
			type: "button",
			class: "btn",
			disabled: e.disabled || e.isLoading
		}, [e.isLoading ? j(t.$slots, "loading", { key: 0 }, () => [y(J, { style: { width: "1rem" } })]) : j(t.$slots, "default", { key: 1 })], 8, Ie));
	}
}), Y = /* @__PURE__ */ b({
	__name: "LoadingContainer",
	props: { isLoading: { type: Boolean } },
	setup(e, { expose: t }) {
		let n = k(null), r = k(null);
		function i() {
			return r.value?.imgEl?.width;
		}
		return t({
			containerEl: n,
			loadingImgEl: r.value?.imgEl
		}), (t, a) => (O(), g("div", {
			class: "position-relative",
			style: E({ height: e.isLoading ? `${i()}px` : void 0 }),
			ref_key: "containerEl",
			ref: n
		}, [j(t.$slots, "loading", {}, () => [e.isLoading ? (O(), m(J, {
			key: 0,
			class: "position-absolute top-0 start-50 translate-middle-x",
			style: {
				width: "20rem",
				"max-width": "100%"
			},
			ref_key: "loadingEl",
			ref: r
		}, null, 512)) : h("", !0)]), _("div", { style: E({ opacity: e.isLoading ? "0.4" : "" }) }, [j(t.$slots, "default")], 4)], 4));
	}
}), Re = { install(e, t) {
	e.component("Loading", J), e.component("LoadingButton", Le), e.component("LoadingContainer", Y), e.provide("loadingImg", t.img);
} }, ze = { PAGESIZE: 10 }, X = /* @__PURE__ */ function(e) {
	return e.anchor = "Anchor", e.button = "Button", e;
}({}), Be = {
	maxPages: 9,
	buttonType: X.anchor
};
function Ve({ pagingInfo: e, count: t, maxPages: n, emit: r }) {
	n = window.innerWidth < 576 ? Math.ceil(n / 2) : n;
	let i = p(() => (isNaN(parseInt(e.value.pageSize + "")) ? null : e.value.pageSize) || ze.PAGESIZE), a = re();
	function o(e) {
		let { name: t, path: n, hash: r, query: i } = a.currentRoute.value, o = {
			name: t,
			path: n,
			hash: r,
			query: i
		}, s = {
			name: o.name || void 0,
			query: {
				...o.query,
				page: e
			}
		};
		return e <= 1 && delete s.query.p, a.resolve(s).fullPath;
	}
	let s = p(() => e.value.page || 1), c = p(() => Math.ceil(t.value / i.value)), l = p(() => Math.min(c.value, n)), u = p(() => {
		let e = Math.floor(l.value / 2), t = Math.max(s.value - e, 1);
		return t + n > c.value && (t -= t + n - c.value - 1), Math.max(t, 1);
	}), d = p(() => Math.min(u.value + l.value, c.value)), f = p(() => !isNaN(l.value) && l.value > 0 ? Array(l.value).fill(0).map((e, t) => u.value + t).filter((e) => e <= d.value) : []);
	function m(t) {
		let n = {
			...e.value,
			page: t
		};
		r("update:modelValue", n), r("change", n);
	}
	return {
		pagedRoute: o,
		page: s,
		totalPages: c,
		totalVisiblePages: l,
		firstPage: u,
		lastPage: d,
		pages: f,
		handleChangePage: m
	};
}
//#endregion
//#region src/vue/ui/paging/PagingAnchor.vue
var He = /* @__PURE__ */ b({
	__name: "PagingAnchor",
	props: {
		to: {},
		page: {}
	},
	setup(e) {
		return (t, n) => {
			let r = M("RouterLink");
			return O(), m(r, {
				class: "page-link",
				to: e.to,
				title: "page " + e.page,
				activeClass: "active-page"
			}, {
				default: V(() => [j(t.$slots, "default", {}, () => [v(F(e.page), 1)])]),
				_: 3
			}, 8, ["to", "title"]);
		};
	}
}), Ue = ["title"], We = /* @__PURE__ */ b({
	__name: "PagingButton",
	props: {
		to: {},
		page: {}
	},
	setup(e) {
		return (t, n) => (O(), g("button", {
			type: "button",
			class: "btn btn-link page-link",
			title: "page " + e.page
		}, [j(t.$slots, "default", {}, () => [v(F(e.page), 1)])], 8, Ue));
	}
}), Ge = { "aria-label": "Pagination" }, Ke = { class: "pagination" }, qe = { class: "page-item" }, Je = { class: "page-item" }, Ye = /* @__PURE__ */ b({
	__name: "Paging",
	props: /* @__PURE__ */ w({
		modelValue: {},
		count: {},
		maxPages: {},
		buttonType: {}
	}, { ...Be }),
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = t, r = e, i = s(r, n), { count: a } = I(r), o = r.buttonType == X.button ? We : He, { pagedRoute: c, page: l, totalPages: u, pages: f, handleChangePage: p } = Ve({
			pagingInfo: i,
			count: a,
			maxPages: r.maxPages,
			emit: n
		});
		return (e, t) => (O(), g("nav", Ge, [_("ul", Ke, [
			_("li", qe, [j(e.$slots, "firstPage", { page: 1 }, () => [(O(), m(P(L(o)), {
				page: 1,
				to: L(c)(1),
				onClick: t[0] ||= W((e) => L(p)(1), ["prevent"]),
				"aria-label": "Previous"
			}, {
				default: V(() => [...t[2] ||= [v("«", -1)]]),
				_: 1
			}, 8, ["to"]))])]),
			(O(!0), g(d, null, A(L(f), (t) => (O(), g("li", {
				class: T(["page-item", { active: t == L(l) }]),
				key: t
			}, [j(e.$slots, "default", {
				page: t,
				route: L(c)(t),
				handleChange: L(p)
			}, () => [(O(), m(P(L(o)), {
				page: t,
				to: L(c)(t),
				onClick: W((e) => L(p)(t), ["prevent"])
			}, {
				default: V(() => [v(F(t), 1)]),
				_: 2
			}, 1032, [
				"page",
				"to",
				"onClick"
			]))])], 2))), 128)),
			_("li", Je, [j(e.$slots, "lastPage", { page: L(u) }, () => [(O(), m(P(L(o)), {
				page: L(u),
				to: L(c)(L(u)),
				onClick: t[1] ||= W((e) => L(p)(L(u)), ["prevent"]),
				"aria-label": "Next"
			}, {
				default: V(() => [...t[3] ||= [v(" » ", -1)]]),
				_: 1
			}, 8, ["page", "to"]))])])
		])]));
	}
}), Xe = { install(e, { defaultPageSize: t = 10 } = {}) {
	ze.PAGESIZE = t, e.component("Paging", Ye);
} };
//#endregion
//#region src/vue/ui/screen/screen.ts
function Z() {
	return [window.innerWidth, window.innerHeight];
}
var Q = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
};
function Ze() {
	let e = k(Z());
	return {
		size: e,
		screen: {
			get size() {
				return e.value;
			},
			get isExtraSmall() {
				return this.size[0] >= Q.xs;
			},
			get isSmall() {
				return this.size[0] >= Q.sm;
			},
			get isMedium() {
				return this.size[0] >= Q.md;
			},
			get isLarge() {
				return this.size[0] >= Q.lg;
			},
			get isExtraLarge() {
				return this.size[0] >= Q.xl;
			},
			get isExtraExtraLarge() {
				return this.size[0] >= Q.xxl;
			},
			get layout() {
				return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs";
			},
			isSize(e) {
				return this.size[0] >= Q[e];
			},
			updateSize: (t = Z()) => e.value = t
		}
	};
}
//#endregion
//#region src/vue/ui/screen/plugin.ts
var Qe = { install: (e, { sizes: t } = {}) => {
	if (t) for (let e in t) e in Q && (Q[e] = t[e]);
	let { screen: n } = Ze(), r = ae(() => n.updateSize(Z()), 250);
	window.addEventListener("resize", r), window.addEventListener("orientationchange", r), e.config.globalProperties.$screen = n, e.provide("screen", n);
} }, $ = class e {
	key;
	icon;
	title;
	isDefault;
	isDisabled;
	isVisible;
	constructor(e, t = e, n = !1, r = !1, i = !0) {
		this.title = e, this.key = t, this.isDefault = n, this.isDisabled = r, this.isVisible = i;
	}
	static create(t, n) {
		return Object.assign(new e(t), n || {});
	}
}, $e = ["href", "onClick"], et = /* @__PURE__ */ b({
	__name: "TabNavigation",
	props: {
		tabs: {},
		activeTab: {}
	},
	emits: ["select"],
	setup(e) {
		let t = p(() => (e) => typeof e.isVisible == "function" ? e.isVisible() : e.isVisible);
		return (n, r) => {
			let i = M("Icon");
			return O(), g("ul", { class: T(["nav", {
				"nav-pills": !n.$screen?.isLarge,
				"nav-tabs": n.$screen?.isLarge
			}]) }, [(O(!0), g(d, null, A(e.tabs, (r) => (O(), g(d, { key: r.key }, [t.value(r) ? (O(), g("li", {
				key: 0,
				class: T(["nav-item", { disabled: r.isDisabled }])
			}, [_("a", {
				href: `#${r.key}`,
				class: T([
					"py-1 px-2",
					"nav-link",
					{
						active: e.activeTab == r.key,
						disabled: r.isDisabled
					}
				]),
				onClick: W((e) => n.$emit("select", r.key), ["prevent"])
			}, [r.icon ? (O(), m(i, {
				key: 0,
				name: r.icon
			}, null, 8, ["name"])) : h("", !0), _("span", { class: T({ "d-none d-lg-inline ms-1": r.icon }) }, F(r.title), 3)], 10, $e)], 2)) : h("", !0)], 64))), 128))], 2);
		};
	}
}), tt = { class: "tab-container" }, nt = {
	key: 0,
	class: "tab-content pt-2"
}, rt = /* @__PURE__ */ b({
	__name: "TabContainer",
	props: {
		tabs: {},
		useRouteNav: {
			type: Boolean,
			default: !1
		},
		active: {}
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = t, r = e, i = re(), a = p(() => r.tabs.filter((e) => e != null).map((e) => e instanceof $ ? e : new $(e))), o = p(() => (a.value.find((e) => e.isDefault) || a.value[0]).key), s = k(r.active), c = p({
			get: () => (r.useRouteNav ? i.currentRoute.value.hash?.substring(1) : s.value) || o.value,
			set: (e) => {
				let t = s.value != null;
				if (s.value = e, r.useRouteNav) {
					let n = {
						...i.currentRoute.value,
						hash: "#" + e
					};
					t ? i.push(n) : i.replace(n);
				}
				n("select", e);
			}
		});
		function l(e) {
			s.value !== e && (c.value = e);
		}
		return D(() => {
			s.value == null && r.useRouteNav && l((r.useRouteNav ? i.currentRoute.value.hash?.substring(1) : null) || o.value);
		}), (e, t) => (O(), g("div", tt, [y(et, {
			tabs: a.value,
			activeTab: c.value,
			onSelect: l
		}, null, 8, ["tabs", "activeTab"]), (O(!0), g(d, null, A(a.value, (t) => (O(), g(d, { key: t.key }, [c.value == t.key ? (O(), g("div", nt, [j(e.$slots, t.key)])) : h("", !0)], 64))), 128))]));
	}
});
//#endregion
export { me as C, K as D, oe as E, ge as S, G as T, Oe as _, Xe as a, ye as b, Be as c, J as d, Pe as f, ke as g, Ae as h, Ze as i, Re as l, q as m, $ as n, Ye as o, Ne as p, Qe as r, X as s, rt as t, Y as u, Se as v, de as w, ve as x, xe as y };
