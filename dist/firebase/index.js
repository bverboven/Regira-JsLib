import g from "axios";
import { b as p } from "../_chunks/string-utility-BI1ViWED.js";
class m extends Error {
  constructor(t, r) {
    super(`${t} (${r})`), this.code = r;
  }
}
const T = (e) => {
  const t = e.status;
  if (t < 200 || t >= 400) {
    const r = e.data && e.data.error ? e.data.error.message : e.statusText;
    throw console.error("Firebase Error", t, { message: r, response: e }), new m(r, t);
  }
}, i = async (e, t, r) => {
  const s = { url: e, method: t };
  typeof r < "u" && (s.data = r);
  const n = await g(s);
  return T(n), n.data;
}, a = {
  get: (e) => i(e, "get"),
  put: (e, t) => i(e, "put", t),
  post: (e, t) => i(e, "post", t),
  delete: (e) => i(e, "delete")
};
function E(e, t, r) {
  return `${p(e, "/")}/${t}/${r}.json`;
}
function l(e, t) {
  return `${p(e, "/")}/${t}.json`;
}
async function I(e, t, r) {
  const s = r ? E(e, t, r) : l(e, t);
  return a.get(s);
}
async function k(e, t) {
  const r = l(e, t), s = await a.get(r), n = Object.entries(s).map((o) => ({
    ...o[1],
    // value -> item
    id: o[0]
    // key -> id
  }));
  return n.sort((o, c) => o.sortOrder - c.sortOrder), n;
}
async function y(e, t, r) {
  const s = !r.id, n = s ? l(e, t) : getItemUrl(e, t, r.id);
  return a[s ? "post" : "put"](n, r);
}
async function O(e, t, r) {
  const s = getItemUrl(e, t, r.id);
  return a.delete(s);
}
async function _(e, t, r) {
  return [...r].map(async (s, n) => (s.sortOrder = n, await y(e, t, s)));
}
class w {
  constructor({ catalogName: t, apiUrl: r }) {
    this.apiUrl = r || arguments[0], this.catalogName = t || arguments[1];
  }
  async details(t) {
    return I(this.apiUrl, this.catalogName, t);
  }
  async list() {
    return k(this.apiUrl, this.catalogName);
  }
  async save(t) {
    return y(this.apiUrl, this.catalogName, t);
  }
  async delete(t) {
    return O(this.apiUrl, this.catalogName, t);
  }
  async import(t) {
    return _(this.apiUrl, this.catalogName, t);
  }
}
const d = {
  REFRESH_TOKEN: "https://securetoken.googleapis.com/v1",
  IDENTITY_TOOLKIT: "https://identitytoolkit.googleapis.com/v1/accounts:"
};
function h(e, t, r) {
  return `${e}/${r}/?key=${t}`;
}
async function R(e, t, r) {
  const s = h(d.IDENTITY_TOOLKIT, e, "accounts:verifyPassword"), n = {
    email: t,
    password: r,
    returnSecureToken: !0
  }, {
    idToken: o,
    refreshToken: c,
    expiresIn: u,
    localId: f
  } = await a.post(s, n);
  return { idToken: o, refreshToken: c, expiresIn: u, userId: f };
}
async function U(e, t) {
  const r = h(d.REFRESH_TOKEN, e, "token"), s = {
    grant_type: "refresh_token",
    refresh_token: t
  }, {
    id_token: n,
    refresh_token: o,
    // use 'newRefreshToken' to prevent name collision with input refreshToken
    expires_in: c,
    user_id: u
  } = await a.post(r, s);
  return { idToken: n, refreshToken: o, expiresIn: c, userId: u };
}
async function K(e, t) {
  const r = h(d.IDENTITY_TOOLKIT, e, "accounts:sendOobCode"), s = {
    email: t,
    requestType: "PASSWORD_RESET"
  };
  return await a.post(r, s), !0;
}
class N {
  constructor(t) {
    this.apiKey = t.apiKey || t;
  }
  async login(t, r) {
    return R(this.apiKey, t, r);
  }
  async refresh(t) {
    return U(this.apiKey, t);
  }
  async resetPassword(t) {
    return K(this.apiKey, t);
  }
}
const v = {
  EntityService: w,
  AuthenticationService: N
};
export {
  N as AuthenticationService,
  w as EntityService,
  v as default
};
