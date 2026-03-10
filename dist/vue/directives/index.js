const u = {
  beforeMount: (t, e) => {
    t.clickOutsideEvent = (n) => {
      t == n.target || t.contains(n.target) || typeof e.value == "function" && e.value(n);
    }, document.addEventListener("click", t.clickOutsideEvent);
  },
  unmounted: (t) => {
    document.removeEventListener("click", t.clickOutsideEvent);
  }
}, f = {
  install(t) {
    t.directive("clickOutside", u);
  }
}, l = {
  mounted: (t) => {
    setTimeout(() => t.focus(), 250);
  }
}, m = {
  install(t) {
    t.directive("focus", l);
  }
}, r = {
  maxGrow: 7
};
let s;
function a(t) {
  return t * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function c(t) {
  const {
    target: e,
    target: { value: n }
  } = t, i = n?.split(`
`).length || 0;
  if (i > 1 && i <= s.maxGrow) {
    const o = i * 1.75;
    a(o) > e.offsetHeight && (e.style.minHeight = o + "rem");
  } else n == "" && (e.style.minHeight = "");
}
const d = {
  beforeMount(t) {
    t.addEventListener("input", c);
  },
  unmounted: (t) => {
    t.removeEventListener("input", c);
  }
}, v = {
  install(t, e = r) {
    s = e, t.directive("grow", d);
  }
};
export {
  f as clickOutside,
  m as focus,
  v as grow
};
