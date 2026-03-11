const c = (a, t = 0) => {
  const e = document.createElement("meta");
  e.setAttribute("http-equiv", "Refresh"), e.setAttribute("content", `${t}; url=${a}`), document.head.appendChild(e);
}, r = (a) => {
  let t = 0, e = 0;
  do
    t += a.scrollTop || 0, e += a.scrollLeft || 0, a = a.parentElement;
  while (a);
  return {
    top: t,
    left: e
  };
}, d = (a, t) => {
  let e = document.getElementsByName(a)[0];
  if (e == null) {
    const n = [...document.head.childNodes.values()].filter((s) => s.tagName === "META").slice(-1)[0];
    e = document.createElement("meta"), n != null ? n.insertAdjacentElement("afterend", e) : document.head.appendChild(e);
  }
  e.setAttribute("name", a), e.setAttribute("content", t);
}, o = (a) => {
  let t = document.querySelector("[rel=canonical]");
  if (t == null) {
    const l = [...document.head.childNodes.values()].filter((n) => n.tagName === "META").slice(-1)[0];
    t = document.createElement("meta"), l != null ? l.insertAdjacentElement("afterend", t) : document.head.appendChild(t);
  }
  t.setAttribute("rel", "canonical"), t.setAttribute("href", a);
}, i = {
  redirect: c,
  setMetaTag: d,
  setCanonicalTag: o
};
export {
  r as g,
  i as h,
  c as r
};
