import { t as N, f as j, b as M, s as C, l as S } from "../_chunks/array-utility-3.0.1.js";
function P(e, n, r) {
  const t = new ArrayBuffer(e.length), s = new Uint8Array(t);
  for (let a = 0; a < e.length; a++)
    s[a] = e.charCodeAt(a);
  const o = new Blob([t], { type: r });
  return o.name = n, o;
}
function W(e, n, r = 512) {
  const t = [];
  for (let o = 0; o < e.length; o += r) {
    const a = e.slice(o, o + r), m = new Array(a.length);
    for (let p = 0; p < a.length; p++)
      m[p] = a.charCodeAt(p);
    const v = new Uint8Array(m);
    t.push(v);
  }
  return new Blob(t, { type: n });
}
const nt = ({ multiple: e, accept: n } = {}) => new Promise(function(r) {
  const t = document.createElement("INPUT");
  t.setAttribute("type", "file"), (e == null || e) && t.setAttribute("multiple", "true"), n != null && t.setAttribute("accept", Array.isArray(n) ? n.join(",") : n), t.value = "", t.setAttribute("style", "display: none;");
  function s() {
    const o = [...this.files];
    t.removeEventListener("change", s), document.body.removeChild(t), r(o);
  }
  t.addEventListener("change", s), t.addEventListener("cancel", () => r([])), document.body.appendChild(t), t.click();
}), G = (e) => e != null && e instanceof Blob, H = (e) => URL.createObjectURL(e), Y = (e) => URL.revokeObjectURL(e), E = (e) => {
  if (!e || !e.includes("/"))
    return e;
  if (e.endsWith("/"))
    throw new Error("filename cannot end with a '/'");
  return S(e.split("/").filter((n) => n));
}, Z = (e) => {
  const n = e.split("."), r = C(n, 1), t = S(r);
  return t ? "." + t : "";
}, _ = (e) => {
  if (!e)
    return null;
  const n = E(e);
  if (!n.includes("."))
    return n;
  const r = n.split(".");
  return M(r, r.length - 1 || 1).join(".");
}, K = (e, n, { filesParameterName: r = "files" } = {}) => {
  const t = N(e).reduce((o, a) => (o.append(r, a, a.name), o), new FormData());
  var s = j(n);
  return Object.entries(s).reduce((o, a) => (o.append(a[0], a[1]), o), t);
}, q = async (e, n, r) => new Promise((t) => {
  const s = new FileReader();
  s.onload = () => t(P(s.result, n || e.name, r || e.type)), s.readAsBinaryString(e);
}), z = (e, n, r) => {
  const t = e.substr(0, 100).includes(","), s = t ? e.substr(e.indexOf(",") + 1) : e;
  !r && t && (r = e.substr(0, e.indexOf(",")).split(":")[1].split(";")[0]);
  const o = atob(s), a = W(o, r);
  return a.name = n, a;
}, J = async (e, n) => {
  const r = await fetch(e), t = r.headers.get("content-disposition");
  if (t && t.indexOf("attachment") !== -1) {
    var s = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/, o = s.exec(t);
    o != null && o[1] && (n = o[1].replace(/['"]/g, ""));
  }
  const a = await r.blob();
  return n && (a.name = n), a;
}, Q = async (e) => new Promise(function(n) {
  const r = new FileReader();
  r.onload = (t) => n(t.target.result), r.readAsDataURL(e);
}), V = async (e) => new Promise(function(n) {
  const r = new FileReader();
  r.onload = (t) => n(t.target.result), r.readAsText(e);
}), X = (e, n, r) => {
  const t = new Blob([e], { type: r });
  return n && (t.name = n), t;
}, $ = (e, n) => (function(t) {
  if (t == null || typeof navigator < "u" && /MSIE [1-9]\./.test(navigator.userAgent))
    return null;
  var s = t.document, o = function() {
    return t.URL || t.webkitURL || t;
  }, a = s.createElementNS("http://www.w3.org/1999/xhtml", "a"), m = "download" in a, v = function(i) {
    var l = new MouseEvent("click");
    i.dispatchEvent(l);
  }, p = /constructor/i.test(t.HTMLElement) || t.safari, y = /CriOS\/[\d]+/.test(navigator.userAgent), R = function(i) {
    (t.setImmediate || t.setTimeout)(function() {
      throw i;
    }, 0);
  }, U = "application/octet-stream", x = 1e3 * 40, B = function(i) {
    var l = function() {
      typeof i == "string" ? o().revokeObjectURL(i) : i.remove();
    };
    setTimeout(l, x);
  }, L = function(i, l, d) {
    l = [].concat(l);
    for (var c = l.length; c--; ) {
      var w = i["on" + l[c]];
      if (typeof w == "function")
        try {
          w.call(i, d || i);
        } catch (b) {
          R(b);
        }
    }
  }, A = function(i) {
    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(i.type) ? new Blob(["\uFEFF", i], { type: i.type }) : i;
  }, T = function(i, l, d) {
    d || (i = A(i));
    var c = this, w = i.type, b = w === U, f, g = function() {
      L(c, "writestart progress write writeend".split(" "));
    }, k = function() {
      if ((y || b && p) && t.FileReader) {
        var h = new FileReader();
        h.onloadend = function() {
          var O = y ? h.result : h.result.replace(/^data:[^;]*;/, "data:attachment/file;"), D = t.open(O, "_blank");
          D || (t.location.href = O), c.readyState = c.DONE, g();
        }, h.readAsDataURL(i), c.readyState = c.INIT;
        return;
      }
      if (f || (f = o().createObjectURL(i)), b)
        t.location.href = f;
      else {
        var I = t.open(f, "_blank");
        I || (t.location.href = f);
      }
      c.readyState = c.DONE, g(), B(f);
    };
    if (c.readyState = c.INIT, m) {
      f = o().createObjectURL(i), setTimeout(function() {
        a.href = f, a.download = l, v(a), g(), B(f), c.readyState = c.DONE;
      });
      return;
    }
    k();
  }, u = T.prototype, F = function(i, l, d) {
    return new T(i, l || i.name || "download", d);
  };
  return typeof navigator < "u" && navigator.msSaveOrOpenBlob ? function(i, l, d) {
    return l = l || i.name || "download", d || (i = A(i)), navigator.msSaveOrOpenBlob(i, l);
  } : (u.abort = function() {
  }, u.readyState = u.INIT = 0, u.WRITING = 1, u.DONE = 2, u.error = u.onwritestart = u.onprogress = u.onwrite = u.onabort = u.onerror = u.onwriteend = null, F);
})(typeof self < "u" && self || typeof window < "u" && window || (void 0).content)(e, n || e.name || "file"), tt = (e, n = !0, r = 1) => {
  const t = n ? 1e3 : 1024;
  if (Math.abs(e) < t)
    return e + " B";
  const s = n ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let o = -1;
  const a = 10 ** r;
  do
    e /= t, ++o;
  while (Math.round(Math.abs(e) * a) / a >= t && o < s.length - 1);
  return e.toFixed(r) + " " + s[o];
}, rt = (e) => {
  e.preventDefault();
  const {
    dataTransfer: { items: n, files: r }
  } = e, t = [];
  if (n) {
    for (let s = 0; s < n.length; s++)
      if (n[s].kind === "file") {
        const o = n[s].getAsFile();
        t.push(o);
      }
  } else
    t.push(...r);
  return t;
}, ot = {
  isFile: G,
  createUrl: H,
  revokeUrl: Y,
  getFilename: E,
  getExtension: Z,
  getFilenameWithoutExtension: _,
  toFormData: K,
  fileToBlob: q,
  base64ToBlob: z,
  urlToBlob: J,
  blobToBase64: Q,
  readAllText: V,
  writeAllText: X,
  saveAs: $,
  formatFileSize: tt
};
export {
  z as base64ToBlob,
  Q as blobToBase64,
  nt as browse,
  H as createUrl,
  ot as default,
  rt as dropHandler,
  q as fileToBlob,
  tt as formatFileSize,
  Z as getExtension,
  E as getFilename,
  _ as getFilenameWithoutExtension,
  G as isFile,
  V as readAllText,
  Y as revokeUrl,
  $ as saveAs,
  K as toFormData,
  J as urlToBlob,
  X as writeAllText
};
