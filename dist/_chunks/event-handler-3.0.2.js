class p {
  type;
  src;
  constructor(c, e, t) {
    this.type = c, this.src = e, t != null && Object.keys(t).forEach((n) => {
      n in this || (this[n] = t[n]);
    });
  }
}
const a = (s) => {
  const c = s[0], e = s.splice(0, 1)[0], t = e.callback ?? s[s.length - 1], n = e.constraint ?? (s.length > 2 ? s.splice(0, 1).find((o) => o !== t && typeof o == "function") : void 0), l = e.scope;
  return {
    key: c ?? "",
    constraint: n,
    callback: t,
    thisScope: l
  };
};
function h(s) {
  const c = this;
  s.key.split(" ").forEach((e) => {
    e in c.listeners || (c.listeners[e] = []);
    const t = {
      constraint: s.constraint,
      callback: s.callback,
      scope: s.thisScope,
      once: s.once
    };
    c.listeners[e].push(t);
  });
}
class f {
  static injectInto(c) {
    Object.defineProperties(c, {
      listeners: {
        get() {
          return "_listeners" in this || Object.defineProperty(this, "_listeners", { value: {} }), this._listeners;
        }
      },
      on: {
        value() {
          const e = a([...arguments]);
          return h.call(this, e), this;
        },
        configurable: !0
      },
      once: {
        value() {
          const e = a([...arguments]);
          return e.once = !0, h.call(this, e), this;
        },
        configurable: !0
      },
      off: {
        value(e, t) {
          if (this.listeners[e]) {
            if (this.listeners[e].length && typeof t == "function") {
              const n = this.listeners[e].findIndex((l) => l.callback === t);
              n >= 0 && this.listeners[e].splice(n, 1);
            }
            (!this.listeners[e].length || t == null) && delete this.listeners[e];
          }
          return this;
        },
        configurable: !0
      },
      trigger: {
        async value(e, t) {
          const n = this, l = typeof e == "string" ? new p(e) : e, o = [];
          return (n.listeners[l.type] ?? []).concat(n.listeners[""] ?? []).filter((i) => i && (i.constraint == null || i.constraint.call(i.scope ?? n, e, t))).map((i) => (i.once && n.off(l.type, i.callback), () => {
            try {
              const r = i.callback.call(i.scope ?? n, l, t ?? {});
              return Promise.resolve(r);
            } catch (r) {
              return console.error("Executing listener failed", { error: r, event: l, listener: i.callback }), Promise.resolve(r);
            }
          })).reduce((i, r) => i.then(r).then((u) => (o.push(u), u)), Promise.resolve(void 0)).then(() => o);
        },
        configurable: !0
      }
    });
  }
}
f.injectInto(f.prototype);
export {
  f as E,
  p as a
};
