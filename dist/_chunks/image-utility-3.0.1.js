import { a as lt, c as it, d as ht, m as ft, e as dt, i as nt, t as ut } from "./array-utility-3.0.1.js";
import { startsWith as q, trim as rt } from "../utilities/string-utility.js";
import ot from "../utilities/file-utility.js";
const G = (t, e, a) => "#" + [t, e, a].map((n) => n.toString(16).padStart(2, "0")).join(""), J = (t, e) => {
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
    if (q(t, "#"))
      return st(t, e);
    if (q(t, "rgba"))
      return t;
    if (q(t, "rgb")) {
      const a = rt(t.substring(3), "()").split(",");
      return Q(a, e);
    }
  }
  return null;
}, ct = (t, e, a) => {
  const [n, r, o] = [t, e, a].map((c) => 255 - c);
  return { ri: n, gi: r, bi: o };
}, wt = (t) => {
  const e = K(t), a = ct.apply(null, e);
  return G.apply(null, a);
}, bt = (t, e = "average") => {
  const a = lt(K(t), 3);
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
      const r = parseInt(it(a), 10);
      n = [r, r, r];
      break;
    }
  }
  return G.apply(null, n);
}, Et = {
  rgbToHex: G,
  hexToRgb: J,
  hexToRgbString: st,
  hexToRgbArray: K,
  getRgbString: Q,
  invertRgb: ct,
  invertHex: wt,
  grayscale: bt
}, b = {
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif"
}, C = b.jpg, $ = async (t) => {
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
          f = b.png;
          break;
        case "47494638":
          f = b.gif;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          f = b.jpg;
          break;
        default:
          f = void 0;
          break;
      }
      n(f);
    }, a.readAsArrayBuffer(e);
  });
}, A = (t) => (t || b.jpg).replace("/jpg", "/jpeg"), F = (t, e, a = { backgroundColor: "#ffffff", imageSmoothingEnabled: !1 }) => {
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
}, pt = (t) => {
  v(t).clearRect(0, 0, t.width, t.height);
}, X = async (t) => new Promise((e, a) => {
  const n = new Image();
  n.onload = () => e(n), n.onerror = a, n.src = t;
}), vt = async (t) => X(ot.createUrl(t)), gt = async (t, e, a) => ot.urlToBlob(t.src, e), D = async (t, e = C, a = 1) => X(t.toDataURL(e, a)), U = (t, e, a) => {
  const n = F(e || t.width, a || t.height);
  return v(n).drawImage(t, 0, 0, e || t.width, a || t.height), n;
}, mt = async (t, e = C, a = 1) => new Promise((n) => t.toBlob(n, e, a)), yt = async (t) => X(t), xt = (t, e = C, a = 1) => U(t).toDataURL(e, a), It = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  function r(f, i, l) {
    var d = i * i, p = f.width, k = f.height, w = Math.floor(p * i), H = Math.floor(k * i), W = 0, L = 0, T = 0, j = 0, R = 0, Z = 0, s = 0, S = 0, B = 0, m = 0, u = 0, P = 0, Y = 0, N = 0, O = 0, E = !1, M = !1, _ = v(f).getImageData(0, 0, p, k).data, g = new Float32Array(3 * w * H), y = 0, x = 0, I = 0;
    for (L = 0; L < k; L++)
      for (R = L * i, B = 0 | R, Z = 3 * B * w, M = B !== (0 | R + i), M && (N = B + 1 - R, O = R + i - B - 1), W = 0; W < p; W++, T += 4)
        j = W * i, S = 0 | j, s = Z + S * 3, E = S !== (0 | j + i), E && (P = S + 1 - j, Y = j + i - S - 1), y = _[T], x = _[T + 1], I = _[T + 2], !E && !M ? (g[s] += y * d, g[s + 1] += x * d, g[s + 2] += I * d) : E && !M ? (m = P * i, g[s] += y * m, g[s + 1] += x * m, g[s + 2] += I * m, u = Y * i, g[s + 3] += y * u, g[s + 4] += x * u, g[s + 5] += I * u) : M && !E ? (m = N * i, g[s] += y * m, g[s + 1] += x * m, g[s + 2] += I * m, u = O * i, g[s + 3 * w] += y * u, g[s + 3 * w + 1] += x * u, g[s + 3 * w + 2] += I * u) : (m = P * N, g[s] += y * m, g[s + 1] += x * m, g[s + 2] += I * m, u = Y * N, g[s + 3] += y * u, g[s + 4] += x * u, g[s + 5] += I * u, u = P * O, g[s + 3 * w] += y * u, g[s + 3 * w + 1] += x * u, g[s + 3 * w + 2] += I * u, u = Y * O, g[s + 3 * w + 3] += y * u, g[s + 3 * w + 4] += x * u, g[s + 3 * w + 5] += I * u);
    var z = F(w, H), tt = v(z, {
      "background-color": l === b.jpg ? "#FFF" : null
    }), at = tt.getImageData(0, 0, w, H), V = at.data, et = 0;
    for (T = 0, s = 0; et < w * H; T += 3, s += 4, et++)
      V[s] = Math.ceil(g[T]), V[s + 1] = Math.ceil(g[T + 1]), V[s + 2] = Math.ceil(g[T + 2]), V[s + 3] = 255;
    return tt.putImageData(at, 0, 0), z;
  }
  function o(f, i, l) {
    const d = F(f.width, f.height);
    return v(d, {
      "background-color": l === b.png ? "transparent" : l === b.jpg ? "#FFF" : null
    }).drawImage(f, 0, 0), r(d, i, l);
  }
  const c = A(n || await $(t)), h = o(t, e, c);
  return D(h, c, a);
}, Tt = async (t, e, { quality: a = 1, type: n = C } = {}) => {
  const { width: r, height: o } = t;
  let [c = 0, h = c] = nt(e) ? e : [e, e];
  c == 0 && (c = r * (h / o)), h == 0 && (h = o * (c / r));
  const f = F(c, h), i = v(f, {
    imageSmoothingEnabled: !1
  }), l = 0.5, d = F(r * l, o * l);
  v(d, {
    imageSmoothingEnabled: !1
  }).drawImage(d, 0, 0, r * l, o * l), i.drawImage(d, 0, 0, r * l, o * l, 0, 0, c, h);
  const k = A(n || await $(t));
  return D(f, k || b.png, a);
}, kt = async (t, e = 1, a = C) => {
  const n = e > 0 ? 90 : e < 0 ? -90 : 0, r = Math.max(t.width, t.height), o = t.naturalWidth, c = t.naturalHeight, h = n !== 0 ? c : o, f = n !== 0 ? o : c, i = A(a || await $(t)), l = F(r, r), d = v(l, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": i === b.jpg ? "#FFF" : null
  });
  d.translate(l.width / 2, l.height / 2), d.rotate(n * Math.PI / 180), d.translate(-(l.width / 2), -(l.height / 2)), d.drawImage(t, (l.width - o) / 2, (l.height - c) / 2);
  const p = d.getImageData((r - h) / 2, (r - f) / 2, h, f), k = F(h, f);
  return v(k, {
    imageSmoothingEnabled: !1,
    //keep quality!
    "background-color": i === b.jpg ? "#FFF" : null
  }).putImageData(p, 0, 0), D(k, i, 1);
}, Ft = async (t, e, a, n = C) => {
  const r = A(n || await $(t)), o = U(t), c = v(o, {
    "background-color": r === b.jpg ? "#FFF" : null
  });
  return c.translate(e ? t.width : 0, a ? t.height : 0), c.scale(e ? -1 : 1, a ? -1 : 1), pt(o), c.drawImage(t, 0, 0), c.restore(), D(o, r, 1);
}, Ct = async (t, e) => {
  const a = F(t.width, t.height);
  return v(a, {
    "background-color": e === b.jpg ? "#FFF" : null
  }).drawImage(t, 0, 0), D(a, e, 1);
}, Dt = (t) => {
  let e = 0;
  const a = U(t), o = v(a).getImageData(0, 0, a.width, a.height).data;
  let c, h, f, i;
  for (let l = 0, d = o.length; l < d; l += 4)
    c = o[l], h = o[l + 1], f = o[l + 2], i = Math.floor((c + h + f) / 3), e += i;
  return Math.floor(e / (t.width * t.height));
}, jt = async (t, e) => {
  const a = t.width, n = t.height, r = U(t), o = v(r), c = o.getImageData(0, 0, a, n), h = c.data, f = 0, i = 1, l = 2, d = 3;
  for (let p = 0; p < h.length; p += 4)
    h[p + f] >= 255 - e && h[p + i] >= 255 - e && h[p + l] >= 255 - e && (h[p + d] = 0);
  return o.putImageData(c, 0, 0), D(r, b.png, 1);
}, Mt = {
  contentTypes: b,
  getImageContentType: $,
  parseContentType: A,
  //createCanvas,
  //get2dContext,
  //clearCanvas,
  urlToImage: X,
  blobToImage: vt,
  imageToBlob: gt,
  canvasToImage: D,
  imageToCanvas: U,
  canvasToBlob: mt,
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
