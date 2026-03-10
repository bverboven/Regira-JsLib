import { ref as c, watchEffect as L } from "vue";
function m(e, t) {
  if (typeof t == "function")
    return t(e);
  let a = e;
  return x(e)?.forEach((l) => {
    if (l in t) {
      const o = M(t[l]), f = new RegExp(`{${l}}`, "g");
      a = a.replace(f, o);
    }
  }), a;
}
function x(e) {
  const t = /\{([^{}]+)\}/g, a = [];
  let n;
  for (; (n = t.exec(e)) !== null; )
    a.push(n[1]);
  return a;
}
function M(e) {
  return e?.toString() ?? "";
}
function p(e, t, a, n) {
  if (t == null)
    return e;
  const l = t[e];
  return l == null ? (console.warn(`translate: ${e} not found`, { values: t, langCode: a }), e) : v(l, a, n);
}
function v(e, t, a) {
  let n = typeof e == "string" ? e : e[t] ?? e[t.substring(0, 2)];
  return a != null && (n = m(n, a)), n;
}
const u = c(""), g = c(""), s = c({});
function P() {
  return {
    langCode: u,
    fallbackLangCode: g,
    messages: s,
    translate: (e, t) => p(e, s.value, u.value, t) || p(e, s.value, g.value, t),
    translateMessage: (e, t) => v(e, u.value, t) || v(e, g.value, t),
    setLangCode(e) {
      e && (u.value = e);
    },
    replaceMessages: (e) => s.value = e,
    loadMessages: (e) => s.value = { ...s.value, ...e }
  };
}
const h = {
  install(e, t) {
    const a = c(!1), { fallbackLangCode: n, translate: l, translateMessage: o, setLangCode: f, replaceMessages: d } = P();
    f(t.defaultLang ?? "en"), n.value = t.defaultLang ?? "en", typeof t.messages == "function" ? L(async () => {
      const r = await t.messages();
      d(r), a.value = !0;
    }) : (d(t.messages), a.value = !0), e.config.globalProperties.$t = (r, i) => a.value && l(r, i), e.config.globalProperties.$tm = (r, i) => o(r, i);
  }
};
export {
  m as formatText,
  h as plugin,
  p as translate,
  v as translateMessage,
  P as useLang
};
