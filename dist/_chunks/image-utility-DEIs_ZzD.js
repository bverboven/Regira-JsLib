import { b as it, c as lt, d as ht, m as ft, e as dt, i as nt, t as ut } from "./array-utility-vRAWSlLj.js";
import { a as G, t as rt } from "./string-utility-BI1ViWED.js";
import { f as ot } from "./file-utility-D-9-ErCu.js";
const _ = (t, e, a) => "#" + [t, e, a].map((n) => n.toString(16).padStart(2, "0")).join(""), J = (t, e) => {
  t.length === 4 && (t = "#" + ut(rt(t, "#").toLowerCase()).reduce((n, r) => n + r + r, ""));
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
  const { r: a, g: n, b: r, a: o = 1 } = J(t, e);
  return [a, n, r, o];
}, Q = (t, e) => {
  if (nt(t)) {
    const [a, n, r, o = 1] = t;
    return `rgba(${a},${n},${r},${o})`;
  }
  if (typeof t == "string") {
    if (G(t, "#"))
      return st(t, e);
    if (G(t, "rgba"))
      return t;
    if (G(t, "rgb")) {
      const a = rt(t.substring(3), "()").split(",");
      return Q(a, e);
    }
  }
  return null;
}, ct = (t, e, a) => {
  const [n, r, o] = [t, e, a].map((c) => 255 - c);
  return { ri: n, gi: r, bi: o };
}, bt = (t) => {
  const e = K(t), a = ct.apply(null, e);
  return _.apply(null, a);
}, wt = (t, e = "average") => {
  const a = it(K(t), 3);
  let n;
  switch (e) {
    case "light": {
      const r = parseInt(dt(a) * 0.8, 10);
      n = [r, r, r];
      break;
    }
    case "dark": {
      const r = parseInt(ft(a), 10);
      n = [r, r, r];
      break;
    }
    case "weight": {
      const r = [0.21, 0.72, 0.07], o = ht(a, (c, h) => parseInt(c * r[h], 10));
      n = [o, o, o];
      break;
    }
    default: {
      const r = parseInt(lt(a), 10);
      n = [r, r, r];
      break;
    }
  }
  return _.apply(null, n);
}, Et = {
  rgbToHex: _,
  hexToRgb: J,
  hexToRgbString: st,
  hexToRgbArray: K,
  getRgbString: Q,
  invertRgb: ct,
  invertHex: bt,
  grayscale: wt
}, w = {
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif"
}, C = w.jpg, A = async (t) => {
  const e = await gt(t), a = new FileReader();
  return new Promise((n) => {
    a.onloadend = (r) => {
      const o = new Uint8Array(r.target.result).subarray(0, 4);
      let c = "";
      for (var h = 0; h < o.length; h++)
        c += o[h].toString(16);
      let f;
      switch (c) {
        case "89504e47":
          f = w.png;
          break;
        case "47494638":
          f = w.gif;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          f = w.jpg;
          break;
        default:
          f = void 0;
          break;
      }
      n(f);
    }, a.readAsArrayBuffer(e);
  });
}, j = (t) => (t || w.jpg).replace("/jpg", "/jpeg"), F = (t, e, a = { backgroundColor: "#ffffff", imageSmoothingEnabled: !1 }) => {
  const n = window.document.createElement("canvas");
  return n.width = t, n.height = e, a && m(n, a), n;
}, m = (t, e) => {
  const a = t.getContext("2d");
  return typeof e < "u" && Object.keys(e).forEach(function(n) {
    const r = e[n];
    if (r !== null)
      switch (n) {
        case "backgroundColor":
        case "background-color":
          a.fillStyle = Q(r), a.fillRect(0, 0, t.width, t.height);
          break;
        case "image":
          a.drawImage(r, 0, 0);
          break;
        default:
          a[n] = r;
      }
  }), a;
}, pt = (t) => {
  m(t).clearRect(0, 0, t.width, t.height);
}, X = async (t) => new Promise((e, a) => {
  const n = new Image();
  n.onload = () => e(n), n.onerror = a, n.src = t;
}), mt = async (t) => X(ot.createUrl(t)), gt = async (t, e, a) => {
  const n = j(a);
  return ot.urlToBlob(t.src, e, n);
}, D = async (t, e = C, a = 1) => X(t.toDataURL(e, a)), U = (t, e, a) => {
  const n = F(e || t.width, a || t.height);
  return m(n).drawImage(t, 0, 0, e || t.width, a || t.height), n;
}, vt = async (t, e = C, a = 1) => new Promise((n) => t.toBlob(n, e, a)), yt = async (t) => X(t), xt = (t, e = C, a = 1) => U(t).toDataURL(e, a), It = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  function r(f, l, i) {
    var d = l * l, p = f.width, k = f.height, b = Math.floor(p * l), H = Math.floor(k * l), W = 0, L = 0, T = 0, R = 0, S = 0, Z = 0, s = 0, B = 0, E = 0, v = 0, u = 0, P = 0, Y = 0, N = 0, O = 0, M = !1, $ = !1, q = m(f).getImageData(0, 0, p, k).data, g = new Float32Array(3 * b * H), y = 0, x = 0, I = 0;
    for (L = 0; L < k; L++)
      for (S = L * l, E = 0 | S, Z = 3 * E * b, $ = E !== (0 | S + l), $ && (N = E + 1 - S, O = S + l - E - 1), W = 0; W < p; W++, T += 4)
        R = W * l, B = 0 | R, s = Z + B * 3, M = B !== (0 | R + l), M && (P = B + 1 - R, Y = R + l - B - 1), y = q[T], x = q[T + 1], I = q[T + 2], !M && !$ ? (g[s] += y * d, g[s + 1] += x * d, g[s + 2] += I * d) : M && !$ ? (v = P * l, g[s] += y * v, g[s + 1] += x * v, g[s + 2] += I * v, u = Y * l, g[s + 3] += y * u, g[s + 4] += x * u, g[s + 5] += I * u) : $ && !M ? (v = N * l, g[s] += y * v, g[s + 1] += x * v, g[s + 2] += I * v, u = O * l, g[s + 3 * b] += y * u, g[s + 3 * b + 1] += x * u, g[s + 3 * b + 2] += I * u) : (v = P * N, g[s] += y * v, g[s + 1] += x * v, g[s + 2] += I * v, u = Y * N, g[s + 3] += y * u, g[s + 4] += x * u, g[s + 5] += I * u, u = P * O, g[s + 3 * b] += y * u, g[s + 3 * b + 1] += x * u, g[s + 3 * b + 2] += I * u, u = Y * O, g[s + 3 * b + 3] += y * u, g[s + 3 * b + 4] += x * u, g[s + 3 * b + 5] += I * u);
    var z = F(b, H), tt = m(z, {
      "background-color": i === w.jpg ? "#FFF" : null
    }), at = tt.getImageData(0, 0, b, H), V = at.data, et = 0;
    for (T = 0, s = 0; et < b * H; T += 3, s += 4, et++)
      V[s] = Math.ceil(g[T]), V[s + 1] = Math.ceil(g[T + 1]), V[s + 2] = Math.ceil(g[T + 2]), V[s + 3] = 255;
    return tt.putImageData(at, 0, 0), z;
  }
  function o(f, l, i) {
    const d = F(f.width, f.height);
    return m(d, {
      "background-color": i === w.png ? "transparent" : i === w.jpg ? "#FFF" : null
    }).drawImage(f, 0, 0), r(d, l, i);
  }
  const c = j(n || await A(t)), h = o(t, e, c);
  return D(h, c, a);
}, Tt = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  const { width: r, height: o } = t;
  let [c = 0, h = c] = nt(e) ? e : [e, e];
  c == 0 && (c = r * (h / o)), h == 0 && (h = o * (c / r));
  const f = F(c, h), l = m(f, {
    imageSmoothingEnabled: !1
  }), i = 0.5, d = F(r * i, o * i);
  m(d, {
    imageSmoothingEnabled: !1
  }).drawImage(d, 0, 0, r * i, o * i), l.drawImage(d, 0, 0, r * i, o * i, 0, 0, c, h);
  const k = j(n || await A(t));
  return D(f, k || w.png, a);
}, kt = async (t, e = 1, a = C) => {
  const n = e > 0 ? 90 : e < 0 ? -90 : 0, r = Math.max(t.width, t.height), o = t.naturalWidth, c = t.naturalHeight, h = n !== 0 ? c : o, f = n !== 0 ? o : c, l = j(a || await A(t)), i = F(r, r), d = m(i, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": l === w.jpg ? "#FFF" : null
  });
  d.translate(i.width / 2, i.height / 2), d.rotate(n * Math.PI / 180), d.translate(-(i.width / 2), -(i.height / 2)), d.drawImage(t, (i.width - o) / 2, (i.height - c) / 2);
  const p = d.getImageData((r - h) / 2, (r - f) / 2, h, f), k = F(h, f);
  return m(k, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": l === w.jpg ? "#FFF" : null
  }).putImageData(p, 0, 0), D(k, l, 1);
}, Ft = async (t, e, a, n = C) => {
  const r = j(n || await A(t)), o = U(t), c = m(o, {
    "background-color": r === w.jpg ? "#FFF" : null
  });
  return c.translate(e ? t.width : 0, a ? t.height : 0), c.scale(e ? -1 : 1, a ? -1 : 1), pt(o), c.drawImage(t, 0, 0), c.restore(), D(o, r, 1);
}, Ct = async (t, e) => {
  const a = F(t.width, t.height);
  return m(a, {
    "background-color": e === w.jpg ? "#FFF" : null
  }).drawImage(t, 0, 0), D(a, e, 1);
}, Dt = (t) => {
  let e = 0;
  const a = U(t), o = m(a).getImageData(0, 0, a.width, a.height).data;
  let c, h, f, l;
  for (let i = 0, d = o.length; i < d; i += 4)
    c = o[i], h = o[i + 1], f = o[i + 2], l = Math.floor((c + h + f) / 3), e += l;
  return Math.floor(e / (t.width * t.height));
}, jt = async (t, e) => {
  const a = t.width, n = t.height, r = U(t), o = m(r), c = o.getImageData(0, 0, a, n), h = c.data, f = 0, l = 1, i = 2, d = 3;
  for (let p = 0; p < h.length; p += 4)
    h[p + f] >= 255 - e && h[p + l] >= 255 - e && h[p + i] >= 255 - e && (h[p + d] = 0);
  return o.putImageData(c, 0, 0), D(r, w.png, 1);
}, Mt = {
  contentTypes: w,
  getImageContentType: A,
  parseContentType: j,
  //createCanvas,
  //get2dContext,
  //clearCanvas,
  urlToImage: X,
  blobToImage: mt,
  imageToBlob: gt,
  canvasToImage: D,
  imageToCanvas: U,
  canvasToBlob: vt,
  base64ToImage: yt,
  imageToBase64: xt,
  resizeByScale: It,
  resize: Tt,
  rotate: kt,
  flipFlop: Ft,
  convertType: Ct,
  getLightness: Dt,
  white2transparent: jt
};
export {
  Et as c,
  Mt as i
};
