import m from "axios";
import { f as s } from "../_chunks/file-utility-D-9-ErCu.js";
import { i as f } from "../_chunks/string-utility-BI1ViWED.js";
import { i as n } from "../_chunks/image-utility-DEIs_ZzD.js";
class i {
  async getBlob(e, t, r) {
    let a;
    if (e instanceof File)
      return s.fileToBlob(e, t, r);
    if (e instanceof Blob)
      return a = e, t && a.name !== t && (a.name = t), a;
    if (typeof e == "string")
      return f(e) ? s.urlToBlob(e, t, r) : s.base64ToBlob(e, t, r);
    throw Error("Cannot convert input to type Blob");
  }
  async getBase64Url(e) {
    const t = await this.getBlob(e);
    return s.getBase64Url(t);
  }
  async createUrl(e) {
    const t = await this.getBlob(e);
    return s.blobToBase64(t);
  }
  async browse(e = {}) {
    return new Promise(function(t) {
      const r = document.createElement("INPUT");
      r.setAttribute("type", "file"), (e.multiple == null || e.multiple) && r.setAttribute("multiple", "true"), e.accept && r.setAttribute("accept", Array.isArray(e.accept) ? e.accept.join(",") : e.accept), r.value = "", r.setAttribute("style", "display: none;");
      function a() {
        const o = [...this.files];
        r.removeEventListener("change", a), document.body.removeChild(r), t(o);
      }
      r.addEventListener("change", a), document.body.appendChild(r), r.click();
    });
  }
  async readJson(e) {
    const t = await s.readAllText(e);
    try {
      return JSON.parse(t);
    } catch (r) {
      throw console.error("Could not parse blob to JSON", {
        blob: e,
        content: t,
        error: r
      }), r;
    }
  }
  async writeJson(e, t) {
    const r = JSON.stringify(e, null, 2);
    return s.writeAllText(r, t, "application/json");
  }
  async send(e, t, r = {}, a = {}) {
    const o = s.toFormData(t || [], r || {}, a || {}), { method: c = "POST" } = a, g = {
      "Content-Type": "multipart/form-data",
      ...a.headers || {}
    };
    return m({
      method: c,
      url: e,
      data: o,
      headers: g
    });
  }
  async saveAs(e, t, r = null) {
    const a = await this.getBlob(e, r || e.name, t || e.type);
    return s.saveAs(a, a.name || "file");
  }
}
class y extends i {
  async getImage(e) {
    if (e instanceof Image)
      return e;
    if (typeof e == "string")
      return n.urlToImage(e);
    if (e instanceof Blob)
      return n.blobToImage(e);
    if (e instanceof HTMLCanvasElement)
      return n.canvasToImage(e);
    throw Error("Cannot convert input to type Image");
  }
  async getBlob(e, t, r) {
    return e instanceof Image ? n.imageToBlob(e, t, r) : e instanceof HTMLCanvasElement ? n.canvasToBlob(e, t, r) : super.getBlob(e, t, r);
  }
  async resize(e, t, r) {
    const a = await this.getImage(e);
    return n.resizeByScale(a, Math.min(1, t / Math.max(a.width, a.height)), r);
  }
  async rotate(e, t) {
    const r = n.parseContentType(e.type), a = await this.getImage(e);
    return n.rotate(a, t, r);
  }
  async flipHorizontally(e) {
    return this.flipFlop(e, !0);
  }
  async flipVertically(e) {
    return this.flipFlop(e, !1, !0);
  }
  async flipFlop(e, t, r, a) {
    const o = await this.getImage(e);
    return n.flipFlop(o, t, r, a);
  }
  async convertType(e, t) {
    const r = await this.getImage(e);
    return n.convertType(r, t);
  }
  async getLightness(e) {
    const t = await this.getImage(e);
    return n.getLightness(t);
  }
  async white2transparent(e, t = 0) {
    const r = await this.getImage(e);
    return n.white2transparent(r, t);
  }
}
const p = {
  FileHelper: i,
  ImageHelper: y
};
export {
  i as FileHelper,
  y as ImageHelper,
  p as default
};
