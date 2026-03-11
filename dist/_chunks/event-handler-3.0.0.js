class p {
  constructor(t, s, e) {
    this.type = t, this.src = s, e != null && Object.keys(e).forEach((i) => {
      i in this || (this[i] = e[i]);
    });
  }
}
const a = (n) => {
  const t = n[0], s = n.splice(0, 1)[0], e = s.callback || n[n.length - 1], i = s.constraint || (n.length > 2 ? n.splice(0, 1).find(function(l) {
    return l !== e && typeof l == "function";
  }) : void 0), o = s.scope;
  return {
    key: t || "",
    constraint: i,
    callback: e,
    thisScope: o
  };
};
function h(n) {
  const t = this;
  n.key.split(" ").forEach(function(s) {
    s in t.listeners || (t.listeners[s] = []);
    const e = {
      constraint: n.constraint,
      callback: n.callback,
      scope: n.thisScope,
      once: n.once
    };
    t.listeners[s].push(e);
  });
}
class u {
}
u.injectInto = function(n) {
  Object.defineProperties(n, {
    listeners: {
      get: function() {
        return "_listeners" in this || Object.defineProperty(this, "_listeners", { value: {} }), this._listeners;
      }
    },
    on: {
      value: function() {
        const t = a([...arguments]);
        return h.call(this, t), this;
      },
      configurable: !0
    },
    once: {
      value: function() {
        const t = a([...arguments]);
        return t.once = !0, h.call(this, t), this;
      },
      configurable: !0
    },
    off: {
      value: function(t, s) {
        if (this.listeners[t]) {
          if (this.listeners[t].length && typeof s == "function") {
            const e = this.listeners[t].findIndex(function(i) {
              return i.callback === s;
            });
            e >= 0 && this.listeners[t].splice(e, 1);
          }
          (!this.listeners[t].length || s == null) && delete this.listeners[t];
        }
        return this;
      },
      configurable: !0
    },
    trigger: {
      value: async function(t, s) {
        const e = this, i = typeof t == "string" ? new p(t) : t, o = [];
        return (e.listeners[i.type] || []).concat(e.listeners[""]).filter((c) => c && (c.constraint == null || c.constraint.call(c.scope || e, t, s))).map((c) => (c.once && e.off(i.type, c.callback), () => {
          try {
            const r = c.callback.call(c.scope || e, i, s || {});
            return Promise.resolve(r);
          } catch (r) {
            return console.error("Executing listener failed", { error: r, event: i, listener: c.callback }), Promise.resolve(r);
          }
        })).reduce((c, r) => c.then(r).then((f) => (o.push(f), f)), Promise.resolve()).then(() => o);
      },
      configurable: !0
    }
  });
};
u.injectInto(u.prototype);
export {
  u as E,
  p as a
};
