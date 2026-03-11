import { a as it, c as lt, m as ht, d as dt, i as nt, t as ft } from "./array-utility-3.0.2.js";
import { startsWith as q, trim as rt } from "../utilities/string-utility.js";
import ot from "../utilities/file-utility.js";
const G = (t, e, a) => "#" + [t, e, a].map((n) => n.toString(16).padStart(2, "0")).join(""), J = (t, e) => {
  t.length === 4 && (t = "#" + ft(rt(t, "#").toLowerCase()).reduce((n, r) => n + r + r, ""));
  const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
  return a ? {
    r: parseInt(a[1], 16),
    g: parseInt(a[2], 16),
    b: parseInt(a[3], 16),
    a: e ?? 1
  } : null;
}, st = (t, e) => {
  const a = J(t, e);
  return a ? `rgba(${a.r}, ${a.g}, ${a.b}, ${a.a})` : null;
}, K = (t, e) => {
  const a = J(t, e);
  if (!a) return [0, 0, 0, 1];
  const { r: n, g: r, b: o, a: s = 1 } = a;
  return [n, r, o, s];
}, Q = (t, e) => {
  if (nt(t)) {
    const [a, n, r, o = 1] = t;
    return `rgba(${a},${n},${r},${o})`;
  }
  if (typeof t == "string") {
    if (q(t, "#"))
      return st(t, e);
    if (q(t, "rgba"))
      return t;
    if (q(t, "rgb")) {
      const a = rt(t.substring(3), "()").split(",").map(Number);
      return Q(a, e);
    }
  }
  return null;
}, ct = (t, e, a) => {
  const [n, r, o] = [t, e, a].map((s) => 255 - s);
  return { ri: n, gi: r, bi: o };
}, ut = (t) => {
  const [e, a, n] = K(t), { ri: r, gi: o, bi: s } = ct(e, a, n);
  return G(r, o, s);
}, bt = (t, e = "average") => {
  const a = it(K(t), 3);
  let n;
  switch (e) {
    case "light": {
      const r = Math.round(dt(a) * 0.8);
      n = [r, r, r];
      break;
    }
    case "dark": {
      const r = ht(a);
      n = [r, r, r];
      break;
    }
    case "weight": {
      const r = [0.21, 0.72, 0.07], o = Math.round(a.reduce((s, d, l) => s + d * r[l], 0));
      n = [o, o, o];
      break;
    }
    default: {
      const r = Math.round(lt(a));
      n = [r, r, r];
      break;
    }
  }
  return G(...n);
}, Bt = {
  rgbToHex: G,
  hexToRgb: J,
  hexToRgbString: st,
  hexToRgbArray: K,
  getRgbString: Q,
  invertRgb: ct,
  invertHex: ut,
  grayscale: bt
}, w = {
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif"
}, C = w.jpg, $ = async (t) => {
  const e = await gt(t), a = new FileReader();
  return new Promise((n) => {
    a.onloadend = (r) => {
      const o = new Uint8Array(r.target.result).subarray(0, 4);
      let s = "";
      for (var d = 0; d < o.length; d++)
        s += o[d].toString(16);
      let l;
      switch (s) {
        case "89504e47":
          l = w.png;
          break;
        case "47494638":
          l = w.gif;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          l = w.jpg;
          break;
        default:
          l = void 0;
          break;
      }
      n(l);
    }, a.readAsArrayBuffer(e);
  });
}, A = (t) => (t || w.jpg).replace("/jpg", "/jpeg"), F = (t, e, a = { backgroundColor: "#ffffff", imageSmoothingEnabled: !1 }) => {
  const n = window.document.createElement("canvas");
  return n.width = t, n.height = e, a && v(n, a), n;
}, v = (t, e) => {
  const a = t.getContext("2d");
  return e != null && Object.keys(e).forEach(function(n) {
    const r = e[n];
    if (r !== null)
      switch (n) {
        case "backgroundColor":
        case "background-color":
          a.fillStyle = Q(r, void 0), a.fillRect(0, 0, t.width, t.height);
          break;
        case "image":
          a.drawImage(r, 0, 0);
          break;
        default:
          a[n] = r;
      }
  }), a;
}, wt = (t) => {
  v(t).clearRect(0, 0, t.width, t.height);
}, X = async (t) => new Promise((e, a) => {
  const n = new Image();
  n.onload = () => e(n), n.onerror = a, n.src = t;
}), mt = async (t) => X(ot.createUrl(t)), gt = async (t, e, a) => ot.urlToBlob(t.src, e), D = async (t, e = C, a = 1) => X(t.toDataURL(e, a)), U = (t, e, a) => {
  const n = F(e || t.width, a || t.height);
  return v(n).drawImage(t, 0, 0, e || t.width, a || t.height), n;
}, vt = async (t, e = C, a = 1) => new Promise((n) => t.toBlob(n, e, a)), pt = async (t) => X(t), yt = (t, e = C, a = 1) => U(t).toDataURL(e, a), xt = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  function r(l, h, i) {
    var f = h * h, m = l.width, k = l.height, b = Math.floor(m * h), H = Math.floor(k * h), W = 0, L = 0, T = 0, j = 0, S = 0, Z = 0, c = 0, R = 0, B = 0, p = 0, u = 0, P = 0, N = 0, Y = 0, O = 0, M = !1, E = !1, _ = v(l).getImageData(0, 0, m, k).data, g = new Float32Array(3 * b * H), y = 0, x = 0, I = 0;
    for (L = 0; L < k; L++)
      for (S = L * h, B = 0 | S, Z = 3 * B * b, E = B !== (0 | S + h), E && (Y = B + 1 - S, O = S + h - B - 1), W = 0; W < m; W++, T += 4)
        j = W * h, R = 0 | j, c = Z + R * 3, M = R !== (0 | j + h), M && (P = R + 1 - j, N = j + h - R - 1), y = _[T], x = _[T + 1], I = _[T + 2], !M && !E ? (g[c] += y * f, g[c + 1] += x * f, g[c + 2] += I * f) : M && !E ? (p = P * h, g[c] += y * p, g[c + 1] += x * p, g[c + 2] += I * p, u = N * h, g[c + 3] += y * u, g[c + 4] += x * u, g[c + 5] += I * u) : E && !M ? (p = Y * h, g[c] += y * p, g[c + 1] += x * p, g[c + 2] += I * p, u = O * h, g[c + 3 * b] += y * u, g[c + 3 * b + 1] += x * u, g[c + 3 * b + 2] += I * u) : (p = P * Y, g[c] += y * p, g[c + 1] += x * p, g[c + 2] += I * p, u = N * Y, g[c + 3] += y * u, g[c + 4] += x * u, g[c + 5] += I * u, u = P * O, g[c + 3 * b] += y * u, g[c + 3 * b + 1] += x * u, g[c + 3 * b + 2] += I * u, u = N * O, g[c + 3 * b + 3] += y * u, g[c + 3 * b + 4] += x * u, g[c + 3 * b + 5] += I * u);
    var z = F(b, H), tt = v(z, {
      "background-color": i === w.jpg ? "#FFF" : null
    }), at = tt.getImageData(0, 0, b, H), V = at.data, et = 0;
    for (T = 0, c = 0; et < b * H; T += 3, c += 4, et++)
      V[c] = Math.ceil(g[T]), V[c + 1] = Math.ceil(g[T + 1]), V[c + 2] = Math.ceil(g[T + 2]), V[c + 3] = 255;
    return tt.putImageData(at, 0, 0), z;
  }
  function o(l, h, i) {
    const f = F(l.width, l.height);
    return v(f, {
      "background-color": i === w.png ? "transparent" : i === w.jpg ? "#FFF" : null
    }).drawImage(l, 0, 0), r(f, h, i);
  }
  const s = A(n || await $(t)), d = o(t, e, s);
  return D(d, s, a);
}, It = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  const { width: r, height: o } = t;
  let [s = 0, d = s] = nt(e) ? e : [e, e];
  s == 0 && (s = r * (d / o)), d == 0 && (d = o * (s / r));
  const l = F(s, d), h = v(l, {
    imageSmoothingEnabled: !1
  }), i = 0.5, f = F(r * i, o * i);
  v(f, {
    imageSmoothingEnabled: !1
  }).drawImage(f, 0, 0, r * i, o * i), h.drawImage(f, 0, 0, r * i, o * i, 0, 0, s, d);
  const k = A(n || await $(t));
  return D(l, k || w.png, a);
}, Tt = async (t, e = 1, a = C) => {
  const n = e > 0 ? 90 : e < 0 ? -90 : 0, r = Math.max(t.width, t.height), o = t.naturalWidth, s = t.naturalHeight, d = n !== 0 ? s : o, l = n !== 0 ? o : s, h = A(a || await $(t)), i = F(r, r), f = v(i, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": h === w.jpg ? "#FFF" : null
  });
  f.translate(i.width / 2, i.height / 2), f.rotate(n * Math.PI / 180), f.translate(-(i.width / 2), -(i.height / 2)), f.drawImage(t, (i.width - o) / 2, (i.height - s) / 2);
  const m = f.getImageData((r - d) / 2, (r - l) / 2, d, l), k = F(d, l);
  return v(k, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": h === w.jpg ? "#FFF" : null
  }).putImageData(m, 0, 0), D(k, h, 1);
}, kt = async (t, e, a, n = C) => {
  const r = A(n || await $(t)), o = U(t), s = v(o, {
    "background-color": r === w.jpg ? "#FFF" : null
  });
  return s.translate(e ? t.width : 0, a ? t.height : 0), s.scale(e ? -1 : 1, a ? -1 : 1), wt(o), s.drawImage(t, 0, 0), s.restore(), D(o, r, 1);
}, Ft = async (t, e) => {
  const a = F(t.width, t.height);
  return v(a, {
    "background-color": e === w.jpg ? "#FFF" : null
  }).drawImage(t, 0, 0), D(a, e, 1);
}, Ct = (t) => {
  let e = 0;
  const a = U(t), o = v(a).getImageData(0, 0, a.width, a.height).data;
  let s, d, l, h;
  for (let i = 0, f = o.length; i < f; i += 4)
    s = o[i], d = o[i + 1], l = o[i + 2], h = Math.floor((s + d + l) / 3), e += h;
  return Math.floor(e / (t.width * t.height));
}, Dt = async (t, e) => {
  const a = t.width, n = t.height, r = U(t), o = v(r), s = o.getImageData(0, 0, a, n), d = s.data, l = 0, h = 1, i = 2, f = 3;
  for (let m = 0; m < d.length; m += 4)
    d[m + l] >= 255 - e && d[m + h] >= 255 - e && d[m + i] >= 255 - e && (d[m + f] = 0);
  return o.putImageData(s, 0, 0), D(r, w.png, 1);
}, Mt = {
  contentTypes: w,
  getImageContentType: $,
  parseContentType: A,
  //createCanvas,
  //get2dContext,
  //clearCanvas,
  urlToImage: X,
  blobToImage: mt,
  imageToBlob: gt,
  canvasToImage: D,
  imageToCanvas: U,
  canvasToBlob: vt,
  base64ToImage: pt,
  imageToBase64: yt,
  resizeByScale: xt,
  resize: It,
  rotate: Tt,
  flipFlop: kt,
  convertType: Ft,
  getLightness: Ct,
  white2transparent: Dt
};
export {
  Bt as c,
  Mt as i
};
