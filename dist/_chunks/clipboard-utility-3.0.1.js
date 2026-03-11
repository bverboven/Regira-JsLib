const c = (n, e = 0) => {
  const t = document.createElement("meta");
  t.setAttribute("http-equiv", "Refresh"), t.setAttribute("content", `${e}; url=${n}`), document.head.appendChild(t);
}, i = (n) => {
  let e = 0, t = 0, a = n;
  for (; a; )
    e += a.scrollTop || 0, t += a.scrollLeft || 0, a = a.parentElement;
  return {
    top: e,
    left: t
  };
}, r = (n, e) => {
  let t = document.getElementsByName(n)[0];
  if (t == null) {
    const o = Array.from(document.head.childNodes).filter((l) => l.tagName === "META").slice(-1)[0];
    t = document.createElement("meta"), o != null ? o.insertAdjacentElement("afterend", t) : document.head.appendChild(t);
  }
  t.setAttribute("name", n), t.setAttribute("content", e);
}, d = (n) => {
  let e = document.querySelector("[rel=canonical]");
  if (e == null) {
    const a = Array.from(document.head.childNodes).filter((o) => o.tagName === "META").slice(-1)[0];
    e = document.createElement("link"), a != null ? a.insertAdjacentElement("afterend", e) : document.head.appendChild(e);
  }
  e.setAttribute("rel", "canonical"), e.setAttribute("href", n);
}, u = {
  redirect: c,
  setMetaTag: r,
  setCanonicalTag: d
};
function s(n) {
  const e = document.createElement("textarea");
  e.value = n, e.style.top = "0", e.style.left = "0", e.style.position = "fixed", document.body.appendChild(e), e.focus(), e.select();
  const t = document.execCommand("copy");
  return document.body.removeChild(e), Promise.resolve(t);
}
function m(n) {
  return navigator.clipboard ? navigator.clipboard.writeText(n) : s(n);
}
export {
  m as c,
  i as g,
  u as h,
  c as r
};
