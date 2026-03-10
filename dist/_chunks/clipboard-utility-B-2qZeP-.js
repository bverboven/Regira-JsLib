function c(o) {
  const e = document.createElement("textarea");
  e.value = o, e.style.top = "0", e.style.left = "0", e.style.position = "fixed", document.body.appendChild(e), e.focus(), e.select();
  const t = document.execCommand("copy");
  return document.body.removeChild(e), Promise.resolve(t);
}
function r(o) {
  return navigator.clipboard ? navigator.clipboard.writeText(o) : c(o);
}
export {
  r as c
};
