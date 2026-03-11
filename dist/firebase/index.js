import T from "axios";
import { trimRight as y } from "../utilities/string-utility.js";
class m extends Error {
  code;
  constructor(t, r) {
    super(`${t} (${r})`), this.code = r;
  }
}
const E = (e) => {
  const t = e.status;
  if (t < 200 || t >= 400) {
    const r = e.data && e.data.error ? e.data.error.message : e.statusText;
    throw console.error("Firebase Error", t, { message: r, response: e }), new m(r, t);
  }
}, i = async (e, t, r) => {
  const s = { url: e, method: t };
  typeof r < "u" && (s.data = r);
  const n = await T(s);
  return E(n), n.data;
}, a = {
  get: (e) => i(e, "get"),
  put: (e, t) => i(e, "put", t),
  post: (e, t) => i(e, "post", t),
  delete: (e) => i(e, "delete")
};
function l(e, t, r) {
  return `${y(e, "/")}/${t}/${r}.json`;
}
function d(e, t) {
  return `${y(e, "/")}/${t}.json`;
}
async function k(e, t, r) {
  const s = r ? l(e, t, r) : d(e, t);
  return a.get(s);
}
async function I(e, t) {
  const r = d(e, t), s = await a.get(r), n = Object.entries(s).map((o) => ({
    ...o[1],
    // value -> item
    id: o[0]
    // key -> id
  }));
  return n.sort((o, c) => o.sortOrder - c.sortOrder), n;
}
async function f(e, t, r) {
  const s = !r.id, n = s ? d(e, t) : l(e, t, r.id);
  return a[s ? "post" : "put"](n, r);
}
async function O(e, t, r) {
  const s = l(e, t, r.id);
  return a.delete(s);
}
async function _(e, t, r) {
  return [...r].map(async (s, n) => (s.sortOrder = n, await f(e, t, s)));
}
class w {
  apiUrl;
  catalogName;
  constructor({ catalogName: t, apiUrl: r }) {
    this.apiUrl = r, this.catalogName = t;
  }
  async details(t) {
    return k(this.apiUrl, this.catalogName, t);
  }
  async list() {
    return I(this.apiUrl, this.catalogName);
  }
  async save(t) {
    return f(this.apiUrl, this.catalogName, t);
  }
  async delete(t) {
    return O(this.apiUrl, this.catalogName, t);
  }
  async import(t) {
    return _(this.apiUrl, this.catalogName, t);
  }
}
const p = {
  REFRESH_TOKEN: "https://securetoken.googleapis.com/v1",
  IDENTITY_TOOLKIT: "https://identitytoolkit.googleapis.com/v1/accounts:"
};
function h(e, t, r) {
  return `${e}/${r}/?key=${t}`;
}
async function K(e, t, r) {
  const s = h(p.IDENTITY_TOOLKIT, e, "accounts:verifyPassword"), n = {
    email: t,
    password: r,
    returnSecureToken: !0
  }, {
    idToken: o,
    refreshToken: c,
    expiresIn: u,
    localId: g
  } = await a.post(s, n);
  return { idToken: o, refreshToken: c, expiresIn: u, userId: g };
}
async function N(e, t) {
  const r = h(p.REFRESH_TOKEN, e, "token"), s = {
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
async function R(e, t) {
  const r = h(p.IDENTITY_TOOLKIT, e, "accounts:sendOobCode"), s = {
    email: t,
    requestType: "PASSWORD_RESET"
  };
  return await a.post(r, s), !0;
}
class U {
  apiKey;
  constructor(t) {
    this.apiKey = typeof t == "string" ? t : t.apiKey;
  }
  async login(t, r) {
    return K(this.apiKey, t, r);
  }
  async refresh(t) {
    return N(this.apiKey, t);
  }
  async resetPassword(t) {
    return R(this.apiKey, t);
  }
}
const v = {
  EntityService: w,
  AuthenticationService: U
};
export {
  U as AuthenticationService,
  w as EntityService,
  v as default
};
