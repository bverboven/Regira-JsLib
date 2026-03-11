import m from "axios";
import o from "../utilities/file-utility.js";
import { isUrl as y } from "../utilities/string-utility.js";
import { i as n } from "../_chunks/image-utility-3.0.1.js";
class i {
  async getBlob(e, t, r) {
    let a;
    if (e instanceof File)
      return o.fileToBlob(e, t, r);
    if (e instanceof Blob)
      return a = e, t && a.name !== t && (a.name = t), a;
    if (typeof e == "string")
      return y(e) ? o.urlToBlob(e, t, r) : o.base64ToBlob(e, t, r);
    throw Error("Cannot convert input to type Blob");
  }
  async getBase64Url(e) {
    const t = await this.getBlob(e);
    return o.getBase64Url(t);
  }
  async createUrl(e) {
    const t = await this.getBlob(e);
    return o.blobToBase64(t);
  }
  async browse(e = {}) {
    return new Promise(function(t) {
      const r = document.createElement("INPUT");
      r.setAttribute("type", "file"), (e.multiple == null || e.multiple) && r.setAttribute("multiple", "true"), e.accept && r.setAttribute("accept", Array.isArray(e.accept) ? e.accept.join(",") : e.accept), r.value = "", r.setAttribute("style", "display: none;");
      function a() {
        const s = [...this.files];
        r.removeEventListener("change", a), document.body.removeChild(r), t(s);
      }
      r.addEventListener("change", a), document.body.appendChild(r), r.click();
    });
  }
  async readJson(e) {
    const t = await o.readAllText(e);
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
    return o.writeAllText(r, t, "application/json");
  }
  async send(e, t, r = {}, a = {}) {
    const s = o.toFormData(t || [], r || {}, a || {}), { method: c = "POST" } = a, g = {
      "Content-Type": "multipart/form-data",
      ...a.headers || {}
    };
    return m({
      method: c,
      url: e,
      data: s,
      headers: g
    });
  }
  async saveAs(e, t, r = null) {
    const a = await this.getBlob(e, r || e.name, t || e.type);
    return o.saveAs(a, a.name || "file");
  }
}
class b extends i {
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
    const s = await this.getImage(e);
    return n.flipFlop(s, t, r, a);
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
  ImageHelper: b
};
export {
  i as FileHelper,
  b as ImageHelper,
  p as default
};
