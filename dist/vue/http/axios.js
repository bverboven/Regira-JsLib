import { toFormData as e } from "../../utilities/file-utility.js";
import t from "axios";
//#region src/vue/http/axios.ts
var n;
function r(e) {
	let { api: r, includeCredentials: i } = e, s = t.create({
		baseURL: r,
		withCredentials: i
	});
	return Object.defineProperties(s, {
		getFile: {
			value: a,
			configurable: !0
		},
		upload: {
			value: o,
			configurable: !0
		}
	}), s.interceptors.response.use((e) => e, (e) => e.request.responseType === "blob" && e.response.data instanceof Blob && e.response.data.type && e.response.data.type.toLowerCase().indexOf("json") != -1 ? new Promise((t, n) => {
		let r = new FileReader();
		r.onload = () => {
			e.response.data = JSON.parse(r.result), n(e);
		}, r.onerror = () => {
			n(e);
		}, r.readAsText(e.response.data);
	}) : Promise.reject(e)), n = s, n;
}
function i() {
	if (n == null) throw Error("Api-Axios is not initialized yet. Call 'initApiAxios(config)' first.");
	return n;
}
async function a(e, r = "GET", i, a) {
	let o = await n({
		url: e,
		method: r,
		responseType: "blob"
	});
	if (t.isAxiosError(o)) throw o;
	a ??= o.headers["content-type"];
	let s = new Blob([o.data], { type: a });
	if (!i) {
		let e = o.headers["content-disposition"];
		if (e) {
			var c = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(e);
			c != null && c[1] && (i = c[1].replace(/['"]/g, ""));
		}
	}
	return i && Object.defineProperty(s, "name", {
		value: i,
		configurable: !0,
		writable: !0,
		enumerable: !0
	}), s;
}
async function o(r, i, a) {
	let { method: o = "POST", headers: s, data: c = {}, filesParameterName: l = "file" } = a || {}, u = e(i, c, { filesParameterName: l }), d = await n({
		method: o,
		url: r,
		data: u,
		headers: {
			"Content-Type": "multipart/form-data",
			...s || {}
		}
	});
	if (t.isAxiosError(d)) throw d;
	return d;
}
//#endregion
export { a as getFile, r as initAxios, o as upload, i as useAxios };
