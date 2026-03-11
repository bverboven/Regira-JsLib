const c = (t, e = 0) => {
  const a = document.createElement("meta");
  a.setAttribute("http-equiv", "Refresh"), a.setAttribute("content", `${e}; url=${t}`), document.head.appendChild(a);
}, i = (t) => {
  let e = 0, a = 0;
  do
    e += t.scrollTop || 0, a += t.scrollLeft || 0, t = t.parentElement;
  while (t);
  return {
    top: e,
    left: a
  };
}, s = (t, e) => {
  let a = document.getElementsByName(t)[0];
  if (a == null) {
    const n = [...document.head.childNodes.values()].filter((l) => l.tagName === "META").slice(-1)[0];
    a = document.createElement("meta"), n != null ? n.insertAdjacentElement("afterend", a) : document.head.appendChild(a);
  }
  a.setAttribute("name", t), a.setAttribute("content", e);
}, d = (t) => {
  let e = document.querySelector("[rel=canonical]");
  if (e == null) {
    const o = [...document.head.childNodes.values()].filter((n) => n.tagName === "META").slice(-1)[0];
    e = document.createElement("meta"), o != null ? o.insertAdjacentElement("afterend", e) : document.head.appendChild(e);
  }
  e.setAttribute("rel", "canonical"), e.setAttribute("href", t);
}, u = {
  redirect: c,
  setMetaTag: s,
  setCanonicalTag: d
};
function r(t) {
  const e = document.createElement("textarea");
  e.value = t, e.style.top = "0", e.style.left = "0", e.style.position = "fixed", document.body.appendChild(e), e.focus(), e.select();
  const a = document.execCommand("copy");
  return document.body.removeChild(e), Promise.resolve(a);
}
function m(t) {
  return navigator.clipboard ? navigator.clipboard.writeText(t) : r(t);
}
export {
  m as c,
  i as g,
  u as h,
  c as r
};
