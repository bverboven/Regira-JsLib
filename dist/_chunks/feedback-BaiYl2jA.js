import { ref as t } from "vue";
var g = /* @__PURE__ */ ((e) => (e.none = "", e.pending = "Pending", e.success = "Success", e.failed = "Failed", e))(g || {});
function p({ autoHideDelay: e = 1500 } = {}) {
  const u = t(
    ""
    /* none */
  ), n = t(""), l = t(null);
  let a;
  function o() {
    e > 0 && (clearTimeout(a), a = setTimeout(c, e));
  }
  function c() {
    u.value = "", n.value = "", l.value = null;
  }
  function r(s) {
    u.value = "Pending", n.value = s, l.value = null;
  }
  function v(s) {
    u.value = "Success", n.value = s, l.value = null, e && o();
  }
  function f(s, i) {
    u.value = "Failed", n.value = s, typeof i == "string" ? n.value = `${n.value}: ${i.split(`
`)[0]}` : l.value = i?.message || i;
  }
  return {
    status: u,
    message: n,
    error: l,
    pending: r,
    success: v,
    fail: f,
    reset: c
  };
}
export {
  g as F,
  p as u
};
