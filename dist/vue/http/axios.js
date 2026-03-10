import p from "axios";
import { toFormData as d } from "../../utilities/file-utility.js";
let a;
function x(r) {
  const { api: l, includeCredentials: n } = r, o = p.create({
    baseURL: l,
    withCredentials: n
  });
  return Object.defineProperties(o, {
    getFile: {
      value: c,
      configurable: !0
    },
    upload: {
      value: f,
      configurable: !0
    }
  }), o.interceptors.response.use(
    (e) => e,
    (e) => e.request.responseType === "blob" && e.response.data instanceof Blob && e.response.data.type && e.response.data.type.toLowerCase().indexOf("json") != -1 ? new Promise((u, i) => {
      let t = new FileReader();
      t.onload = () => {
        e.response.data = JSON.parse(t.result), i(e);
      }, t.onerror = () => {
        i(e);
      }, t.readAsText(e.response.data);
    }) : Promise.reject(e)
  ), a = o, a;
}
function w() {
  if (a == null)
    throw Error("Api-Axios is not initialized yet. Call 'initApiAxios(config)' first.");
  return a;
}
async function c(r, l = "GET", n, o) {
  const e = await a({ url: r, method: l, responseType: "blob" });
  if (p.isAxiosError(e))
    throw e;
  o == null && (o = e.headers["content-type"]);
  const u = new Blob([e.data], { type: o });
  if (!n) {
    const s = e.headers["content-disposition"];
    if (s) {
      var i = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/, t = i.exec(s);
      t != null && t[1] && (n = t[1].replace(/['"]/g, ""));
    }
  }
  return n && Object.defineProperty(u, "name", { value: n, configurable: !0, writable: !0, enumerable: !0 }), u;
}
async function f(r, l, n) {
  const { method: o = "POST", headers: e, data: u = {}, filesParameterName: i = "file" } = n || {}, t = d(l, u, { filesParameterName: i }), s = await a({
    method: o,
    url: r,
    data: t,
    headers: {
      "Content-Type": "multipart/form-data",
      ...e || {}
    }
  });
  if (p.isAxiosError(s))
    throw s;
  return s;
}
export {
  c as getFile,
  x as initAxios,
  f as upload,
  w as useAxios
};
