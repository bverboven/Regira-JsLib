import { t as I, f as D, a as C, s as j, l as T } from "../_chunks/array-utility-3.0.1.js";
function M(t, n, o) {
  const e = new ArrayBuffer(t.length), i = new Uint8Array(e);
  for (let s = 0; s < t.length; s++)
    i[s] = t.charCodeAt(s);
  const a = new Blob([e], { type: o });
  return a.name = n, a;
}
function P(t, n, o = 512) {
  const e = [];
  for (let a = 0; a < t.length; a += o) {
    const s = t.slice(a, a + o), w = new Array(s.length);
    for (let u = 0; u < s.length; u++)
      w[u] = s.charCodeAt(u);
    const B = new Uint8Array(w);
    e.push(B);
  }
  return new Blob(e, { type: n });
}
const te = ({ multiple: t, accept: n } = {}) => new Promise(function(o) {
  const e = document.createElement("input");
  e.setAttribute("type", "file"), (t == null || t) && e.setAttribute("multiple", "true"), n != null && e.setAttribute("accept", Array.isArray(n) ? n.join(",") : n), e.value = "", e.setAttribute("style", "display: none;");
  function i() {
    const a = [...e.files];
    e.removeEventListener("change", i), document.body.removeChild(e), o(a);
  }
  e.addEventListener("change", i), e.addEventListener("cancel", () => o([])), document.body.appendChild(e), e.click();
}), N = (t) => t != null && t instanceof Blob, _ = (t) => URL.createObjectURL(t), W = (t) => URL.revokeObjectURL(t), O = (t) => {
  if (!t || !t.includes("/"))
    return t;
  if (t.endsWith("/"))
    throw new Error("filename cannot end with a '/'");
  return T(t.split("/").filter((n) => !!n));
}, G = (t) => {
  const n = t.split("."), o = j(n, 1), e = T(o);
  return e ? "." + e : "";
}, Y = (t) => {
  if (!t)
    return null;
  const n = O(t);
  if (!n || !n.includes("."))
    return n;
  const o = n.split(".");
  return C(o, o.length - 1 || 1).join(".");
}, H = (t, n, { filesParameterName: o = "files" } = {}) => {
  const e = I(t).reduce((a, s) => (a.append(o, s, s.name), a), new FormData()), i = D(n);
  return Object.entries(i).reduce((a, s) => (a.append(s[0], s[1]), a), e);
}, K = async (t, n, o) => new Promise((e) => {
  const i = new FileReader();
  i.onload = () => e(M(i.result, n ?? t.name, o ?? t.type)), i.readAsBinaryString(t);
}), Z = (t, n, o) => {
  const e = t.substr(0, 100).includes(","), i = e ? t.substr(t.indexOf(",") + 1) : t;
  !o && e && (o = t.substr(0, t.indexOf(",")).split(":")[1].split(";")[0]);
  const a = atob(i), s = P(a, o ?? "");
  return s.name = n, s;
}, V = async (t, n) => {
  const o = await fetch(t), e = o.headers.get("content-disposition");
  if (e && e.indexOf("attachment") !== -1) {
    const s = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(e);
    s != null && s[1] && (n = s[1].replace(/['"]/g, ""));
  }
  const i = await o.blob();
  return n && (i.name = n), i;
}, q = async (t) => new Promise(function(n) {
  const o = new FileReader();
  o.onload = (e) => n(e.target.result), o.readAsDataURL(t);
}), z = async (t) => new Promise(function(n) {
  const o = new FileReader();
  o.onload = (e) => n(e.target.result), o.readAsText(t);
}), J = (t, n, o) => {
  const e = new Blob([t], { type: o });
  return n && (e.name = n), e;
}, Q = (t, n) => {
  (function(e) {
    if (e == null || typeof navigator < "u" && /MSIE [1-9]\./.test(navigator.userAgent))
      return null;
    const i = e.document, a = () => e.URL ?? e.webkitURL ?? e, s = i.createElementNS("http://www.w3.org/1999/xhtml", "a"), w = "download" in s, B = (r) => {
      r.dispatchEvent(new MouseEvent("click"));
    }, u = /constructor/i.test(String(e.HTMLElement ?? "")) || !!e.safari, b = /CriOS\/[\d]+/.test(navigator.userAgent), R = (r) => {
      e.setImmediate ? e.setImmediate(() => {
        throw r;
      }) : e.setTimeout(() => {
        throw r;
      }, 0);
    }, L = "application/octet-stream", U = 1e3 * 40, g = (r) => {
      setTimeout(() => {
        typeof r == "string" ? a().revokeObjectURL(r) : r.remove();
      }, U);
    }, x = (r, f, p) => {
      const c = [].concat(f);
      let m = c.length;
      for (; m--; ) {
        const d = r["on" + c[m]];
        if (typeof d == "function")
          try {
            d.call(r, p ?? r);
          } catch (h) {
            R(h);
          }
      }
    }, v = (r) => /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(r.type) ? new Blob(["\uFEFF", r], { type: r.type }) : r;
    function S(r, f, p) {
      p || (r = v(r));
      const c = this, m = r.type === L;
      let d;
      const h = () => {
        x(c, "writestart progress write writeend".split(" "));
      }, F = () => {
        if ((b || m && u) && e.FileReader) {
          const y = new FileReader();
          y.onloadend = function() {
            const E = b ? y.result : y.result.replace(/^data:[^;]*;/, "data:attachment/file;");
            e.open(E, "_blank") || (e.location.href = E), c.readyState = c.DONE, h();
          }, y.readAsDataURL(r), c.readyState = c.INIT;
          return;
        }
        d || (d = a().createObjectURL(r)), m ? e.location.href = d : e.open(d, "_blank") || (e.location.href = d), c.readyState = c.DONE, h(), g(d);
      };
      if (c.readyState = c.INIT, w) {
        d = a().createObjectURL(r), setTimeout(function() {
          s.href = d, s.download = f, B(s), h(), g(d), c.readyState = c.DONE;
        });
        return;
      }
      F();
    }
    const l = S.prototype, k = function(r, f, p) {
      new S(r, f || r.name || "download", p);
    }, A = navigator;
    return typeof navigator < "u" && A.msSaveOrOpenBlob ? function(r, f) {
      f = f || r.name || "download", A.msSaveOrOpenBlob(v(r), f);
    } : (l.abort = function() {
    }, l.readyState = l.INIT = 0, l.WRITING = 1, l.DONE = 2, l.error = l.onwritestart = l.onprogress = l.onwrite = l.onabort = l.onerror = l.onwriteend = null, k);
  })(typeof self < "u" ? self : typeof window < "u" ? window : null)?.(t, n ?? t.name ?? "file");
}, X = (t, n = !0, o = 1) => {
  const e = n ? 1e3 : 1024;
  if (Math.abs(t) < e)
    return t + " B";
  const i = n ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let a = -1;
  const s = 10 ** o;
  do
    t /= e, ++a;
  while (Math.round(Math.abs(t) * s) / s >= e && a < i.length - 1);
  return t.toFixed(o) + " " + i[a];
}, ne = (t) => {
  t.preventDefault();
  const { dataTransfer: n } = t, o = [];
  if (n?.items) {
    for (let e = 0; e < n.items.length; e++)
      if (n.items[e].kind === "file") {
        const i = n.items[e].getAsFile();
        i && o.push(i);
      }
  } else n?.files && o.push(...Array.from(n.files));
  return o;
}, oe = {
  isFile: N,
  createUrl: _,
  revokeUrl: W,
  getFilename: O,
  getExtension: G,
  getFilenameWithoutExtension: Y,
  toFormData: H,
  fileToBlob: K,
  base64ToBlob: Z,
  urlToBlob: V,
  blobToBase64: q,
  readAllText: z,
  writeAllText: J,
  saveAs: Q,
  formatFileSize: X
};
export {
  Z as base64ToBlob,
  q as blobToBase64,
  te as browse,
  _ as createUrl,
  oe as default,
  ne as dropHandler,
  K as fileToBlob,
  X as formatFileSize,
  G as getExtension,
  O as getFilename,
  Y as getFilenameWithoutExtension,
  N as isFile,
  z as readAllText,
  W as revokeUrl,
  Q as saveAs,
  H as toFormData,
  V as urlToBlob,
  J as writeAllText
};
