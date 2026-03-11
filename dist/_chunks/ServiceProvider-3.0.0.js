class t {
  services;
  constructor() {
    this.services = /* @__PURE__ */ new Map();
  }
  get(r) {
    const e = this.services.get(r);
    return e == null ? null : e(this);
  }
  add(r, e) {
    return this.services.set(r, e), this;
  }
}
const i = new t();
function c(s) {
  return i.get(s);
}
export {
  t as S,
  i as d,
  c as g
};
