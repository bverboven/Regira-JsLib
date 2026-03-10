import { t as N, f as j, b as M, s as C, l as S } from "./array-utility-vRAWSlLj.js";
function P(t, n, r) {
  const e = new ArrayBuffer(t.length), s = new Uint8Array(e);
  for (let a = 0; a < t.length; a++)
    s[a] = t.charCodeAt(a);
  const i = new Blob([e], { type: r });
  return i.name = n, i;
}
function W(t, n, r = 512) {
  const e = [];
  for (let i = 0; i < t.length; i += r) {
    const a = t.slice(i, i + r), p = new Array(a.length);
    for (let w = 0; w < a.length; w++)
      p[w] = a.charCodeAt(w);
    const v = new Uint8Array(p);
    e.push(v);
  }
  return new Blob(e, { type: n });
}
const G = (t) => t != null && t instanceof Blob, Y = (t) => URL.createObjectURL(t), Z = (t) => URL.revokeObjectURL(t), R = (t) => {
  if (!t || !t.includes("/"))
    return t;
  if (t.endsWith("/"))
    throw new Error("filename cannot end with a '/'");
  return S(t.split("/").filter((n) => n));
}, _ = (t) => {
  const n = t.split("."), r = C(n, 1), e = S(r);
  return e ? "." + e : "";
}, H = (t) => {
  if (!t)
    return null;
  const n = R(t);
  if (!n.includes("."))
    return n;
  const r = n.split(".");
  return M(r, r.length - 1 || 1).join(".");
}, K = (t, n, { filesParameterName: r = "files" } = {}) => {
  const e = N(t).reduce((i, a) => (i.append(r, a, a.name), i), new FormData());
  var s = j(n);
  return Object.entries(s).reduce((i, a) => (i.append(a[0], a[1]), i), e);
}, q = async (t, n, r) => new Promise((e) => {
  const s = new FileReader();
  s.onload = () => e(P(s.result, n || t.name, r || t.type)), s.readAsBinaryString(t);
}), z = (t, n, r) => {
  const e = t.substr(0, 100).includes(","), s = e ? t.substr(t.indexOf(",") + 1) : t;
  !r && e && (r = t.substr(0, t.indexOf(",")).split(":")[1].split(";")[0]);
  const i = atob(s), a = W(i, r);
  return a.name = n, a;
}, J = async (t, n) => {
  const r = await fetch(t), e = r.headers.get("content-disposition");
  if (e && e.indexOf("attachment") !== -1) {
    var s = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/, i = s.exec(e);
    i != null && i[1] && (n = i[1].replace(/['"]/g, ""));
  }
  const a = await r.blob();
  return n && (a.name = n), a;
}, Q = async (t) => new Promise(function(n) {
  const r = new FileReader();
  r.onload = (e) => n(e.target.result), r.readAsDataURL(t);
}), V = async (t) => new Promise(function(n) {
  const r = new FileReader();
  r.onload = (e) => n(e.target.result), r.readAsText(t);
}), X = (t, n, r) => {
  const e = new Blob([t], { type: r });
  return n && (e.name = n), e;
}, $ = (t, n) => (function(e) {
  if (e == null || typeof navigator < "u" && /MSIE [1-9]\./.test(navigator.userAgent))
    return null;
  var s = e.document, i = function() {
    return e.URL || e.webkitURL || e;
  }, a = s.createElementNS("http://www.w3.org/1999/xhtml", "a"), p = "download" in a, v = function(o) {
    var c = new MouseEvent("click");
    o.dispatchEvent(c);
  }, w = /constructor/i.test(e.HTMLElement) || e.safari, g = /CriOS\/[\d]+/.test(navigator.userAgent), x = function(o) {
    (e.setImmediate || e.setTimeout)(function() {
      throw o;
    }, 0);
  }, U = "application/octet-stream", E = 1e3 * 40, y = function(o) {
    var c = function() {
      typeof o == "string" ? i().revokeObjectURL(o) : o.remove();
    };
    setTimeout(c, E);
  }, F = function(o, c, d) {
    c = [].concat(c);
    for (var l = c.length; l--; ) {
      var m = o["on" + c[l]];
      if (typeof m == "function")
        try {
          m.call(o, d || o);
        } catch (b) {
          x(b);
        }
    }
  }, A = function(o) {
    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(o.type) ? new Blob(["\uFEFF", o], { type: o.type }) : o;
  }, T = function(o, c, d) {
    d || (o = A(o));
    var l = this, m = o.type, b = m === U, f, B = function() {
      F(l, "writestart progress write writeend".split(" "));
    }, I = function() {
      if ((g || b && w) && e.FileReader) {
        var h = new FileReader();
        h.onloadend = function() {
          var O = g ? h.result : h.result.replace(/^data:[^;]*;/, "data:attachment/file;"), D = e.open(O, "_blank");
          D || (e.location.href = O), l.readyState = l.DONE, B();
        }, h.readAsDataURL(o), l.readyState = l.INIT;
        return;
      }
      if (f || (f = i().createObjectURL(o)), b)
        e.location.href = f;
      else {
        var k = e.open(f, "_blank");
        k || (e.location.href = f);
      }
      l.readyState = l.DONE, B(), y(f);
    };
    if (l.readyState = l.INIT, p) {
      f = i().createObjectURL(o), setTimeout(function() {
        a.href = f, a.download = c, v(a), B(), y(f), l.readyState = l.DONE;
      });
      return;
    }
    I();
  }, u = T.prototype, L = function(o, c, d) {
    return new T(o, c || o.name || "download", d);
  };
  return typeof navigator < "u" && navigator.msSaveOrOpenBlob ? function(o, c, d) {
    return c = c || o.name || "download", d || (o = A(o)), navigator.msSaveOrOpenBlob(o, c);
  } : (u.abort = function() {
  }, u.readyState = u.INIT = 0, u.WRITING = 1, u.DONE = 2, u.error = u.onwritestart = u.onprogress = u.onwrite = u.onabort = u.onerror = u.onwriteend = null, L);
})(typeof self < "u" && self || typeof window < "u" && window || (void 0).content)(t, n || t.name || "file"), tt = (t, n = !0, r = 1) => {
  const e = n ? 1e3 : 1024;
  if (Math.abs(t) < e)
    return t + " B";
  const s = n ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let i = -1;
  const a = 10 ** r;
  do
    t /= e, ++i;
  while (Math.round(Math.abs(t) * a) / a >= e && i < s.length - 1);
  return t.toFixed(r) + " " + s[i];
}, nt = {
  isFile: G,
  createUrl: Y,
  revokeUrl: Z,
  getFilename: R,
  getExtension: _,
  getFilenameWithoutExtension: H,
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
  nt as f,
  K as t
};
