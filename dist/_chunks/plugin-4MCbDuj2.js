import { defineComponent as n, computed as t, openBlock as c, createElementBlock as f, normalizeStyle as p, normalizeClass as u, resolveComponent as m, createVNode as h, renderSlot as g } from "vue";
const o = /* @__PURE__ */ new Map();
function s(i) {
  (Array.isArray(i) ? i : Object.entries(i)).forEach(([r, a]) => {
    o.set(r, a);
  });
}
function k() {
  o.clear();
}
const w = /* @__PURE__ */ n({
  __name: "BsIcon",
  props: {
    name: {},
    size: { default: "md" }
  },
  setup(i) {
    const e = i;
    o.has(e.name) || console.warn(`Icon ${e.name} not found`, { icons: o.values() });
    const r = t(() => o.get(e.name)), a = { sm: 0.75, md: 1, lg: 2, xl: 3 }, l = t(() => ({ "font-size": `${a[e.size]}rem` }));
    return (b, d) => (c(), f("i", {
      class: u(r.value),
      style: p(l.value)
    }, null, 6));
  }
}), x = /* @__PURE__ */ n({
  __name: "FaIcon",
  props: {
    name: {},
    size: { default: "md" }
  },
  setup(i) {
    const e = i;
    o.has(e.name) || console.warn(`Icon ${e.name} not found`, { icons: o.values() });
    const r = { sm: "fa-sm", md: "fa-md", lg: "fa-lg", xl: "fa-3x" }, a = t(() => [o.get(e.name), r[e.size]]);
    return (l, b) => (c(), f("i", {
      class: u(a.value)
    }, null, 2));
  }
}), y = ["type"], v = /* @__PURE__ */ n({
  __name: "IconButton",
  props: {
    icon: {},
    size: {},
    type: { default: "button" }
  },
  setup(i) {
    return (e, r) => {
      const a = m("Icon");
      return c(), f("button", {
        type: i.type,
        class: "btn"
      }, [
        h(a, {
          name: i.icon,
          size: i.size
        }, null, 8, ["name", "size"]),
        g(e.$slots, "default")
      ], 8, y);
    };
  }
}), q = {
  address: "bi bi-journal-richtext",
  admin: "bi bi-person-gear",
  alert: "bi bi-exclamation-circle",
  attachment: "bi bi-paperclip",
  bank: "bi bi-piggy-bank",
  birthday: "bi bi-balloon",
  cancel: "bi bi-x-octagon",
  chat: "bi bi-chat",
  chatLeft: "bi bi-chat-left-text",
  chatRight: "bi bi-chat-right-text",
  check: "bi bi-check",
  checked: "bi bi-check2-square",
  clear: "bi bi-eraser",
  client: "bi bi-person-rolodex",
  clone: "bi bi-clipboard-plus",
  close: "bi bi-x-circle",
  closeSq: "bi bi-x-square",
  code: "bi bi-c-square",
  collapse: "bi bi-arrows-collapse",
  collection: "bi bi-collection",
  columns: "bi bi-layout-three-columns",
  connect: "bi bi-link",
  contact: "bi bi-person-lines-fill",
  copy: "bi bi-clipboard",
  country: "bi bi-globe",
  csv: "bi bi-filetype-csv",
  date: "bi bi-calendar",
  delete: "bi bi-trash",
  details: "bi bi-eye-fill",
  docTable: "bi bi-file-ruled",
  docx: "bi bi-file-earmark-word",
  down: "bi bi-caret-down-square",
  download: "bi bi-file-earmark-arrow-down",
  edit: "bi bi-pencil-fill",
  email: "bi bi-at",
  error: "bi bi-exclamation-circle",
  euro: "bi bi-currency-euro",
  exit: "bi bi-box-arrow-right",
  expand: "bi bi-arrows-expand",
  export: "bi bi-file-earmark-arrow-up",
  fiche: "bi bi-list-columns-reverse",
  file: "bi bi-file-earmark",
  filter: "bi bi-funnel",
  folder: "bi bi-folder",
  form: "bi bi-pencil-square",
  from: "bi bi-box-arrow-right",
  git: "bi bi-github",
  globe: "bi bi-globe-europe-africa",
  home: "bi bi-house-door",
  import: "bi bi-file-earmark-arrow-down",
  info: "bi bi-info-circle",
  internet: "bi bi-globe",
  invoice: "bi bi-file-earmark-ruled",
  ip: "bi bi-modem",
  key: "bi bi-key",
  language: "bi bi-translate",
  list: "bi bi-list-task",
  locked: "bi bi-lock-fill",
  look: "bi bi-eye",
  mail: "bi bi-envelope-at",
  manage: "bi bi-gear-fill",
  map: "bi bi-geo-alt",
  markdown: "bi bi-markdown",
  maximize: "bi bi-plus-square",
  message: "bi bi-chat-left-dots",
  minimize: "bi bi-dash-square",
  minus: "bi bi-dash",
  mobilePhone: "bi bi-phone",
  move: "bi bi-arrows-move",
  multiline: "bi bi-chat-square-text",
  new: "bi bi-plus",
  notes: "bi bi-journal-text",
  noUser: "bi bi-person-x",
  pay: "bi bi-cash-coin",
  pdf: "bi bi-file-earmark-pdf",
  peppol: "bi bi-send",
  people: "bi bi-people-fill",
  phone: "bi bi-telephone",
  popOut: "bi bi-box-arrow-up-right",
  question: "bi bi-question",
  receipt: "bi bi-receipt",
  restore: "bi bi-wrench-adjustable-circle",
  save: "bi bi-save-fill",
  search: "bi bi-search",
  security: "bi bi-shield-check",
  select: "bi bi-cursor",
  selected: "bi bi-cursor-fill",
  settings: "bi bi-tools",
  sidebarLeft: "bi bi-layout-sidebar",
  sidebarRight: "bi bi-layout-sidebar-reverse",
  singleline: "bi bi-chat-square-dots",
  statistics: "bi bi-graph-up",
  submit: "bi bi-check-circle",
  tag: "bi bi-tag",
  tenant: "bi bi-person-rolodex",
  times: "bi bi-x-lg",
  timespan: "bi bi-hourglass",
  title: "bi bi-fonts",
  to: "bi bi-box-arrow-in-right",
  today: "bi bi-calendar-check",
  transport: "bi bi-truck",
  tree: "bi bi-diagram-3",
  unchecked: "bi bi-square",
  unlocked: "bi bi-unlock-fill",
  up: "bi bi-caret-up-square",
  upload: "bi bi-file-earmark-arrow-up",
  user: "bi bi-person-circle",
  vCard: "bi bi-person-vcard-fill",
  warning: "bi bi-exclamation-triangle",
  website: "bi bi-browser-chrome",
  xml: "bi bi-filetype-xml",
  xlsx: "bi bi-file-earmark-excel",
  zip: "bi bi-file-earmark-zip"
}, _ = {
  address: "fa-regular fa-address-card",
  alert: "fa-solid fa-circle-exclamation",
  attachment: "XXX",
  birthday: "fa-solid fa-cake-candles",
  cancel: "fa-solid fa-ban",
  chat: "fa-regular fa-comments",
  check: "fa-regular fa-square-check",
  checked: "fa-solid fa-check",
  clear: "XXX",
  client: "fa-solid fa-shop",
  close: "fa-regular fa-circle-xmark",
  closeSq: "fa-regular fa-rectangle-xmark",
  connect: "fa-solid fa-link",
  contact: "fa-regular fa-id-badge",
  copy: "fa-solid fa-copy",
  country: "fa-solid fa-earth-americas",
  delete: "fa-solid fa-trash-can",
  details: "fa-regular fa-eye",
  docTable: "fa-solid fa-table-list",
  down: "fa-regular fa-square-caret-down",
  download: "fa-solid fa-file-arrow-down",
  edit: "fa-regular fa-pen-to-square",
  email: "fa-solid fa-at",
  file: "fa-regular fa-file",
  filter: "fa-solid fa-filter",
  globe: "fa-solid fa-earth-europe",
  home: "fa-solid fa-house",
  info: "XXX",
  internet: "fa-brands fa-internet-explorer",
  invoice: "fa-solid fa-file-invoice",
  key: "fa-solid fa-key",
  locked: "fa-solid fa-lock",
  look: "fa-regular fa-eye",
  manage: "fa-solid fa-screwdriver-wrench",
  map: "fa-solid fa-location-dot",
  markdown: "fa-brands fa-markdown",
  mobilePhone: "fa-solid fa-mobile-screen-button",
  move: "fa-solid fa-up-down-left-right",
  new: "fa-solid fa-plus",
  pay: "fa-solid fa-money-check-dollar",
  phone: "fa-solid fa-phone",
  popOut: "fa-solid fa-arrow-up-right-from-square",
  receipt: "fa-solid fa-receipt",
  save: "fa-regular fa-floppy-disk",
  search: "fa-solid fa-magnifying-glass",
  select: "fa-solid fa-arrow-pointer",
  selected: "fa-solid fa-arrow-pointer",
  submit: "fa-regular fa-circle-check",
  transport: "fa-solid fa-truck",
  tree: "fa-solid fa-sitemap",
  unchecked: "fa-regular fa-square",
  unlocked: "fa-solid fa-lock-open",
  up: "fa-regular fa-square-caret-up",
  upload: "fa-solid fa-file-arrow-up",
  user: "fa-regular fa-user",
  warning: "fa-solid fa-triangle-exclamation",
  website: "fa-brands fa-internet-explorer"
}, I = {
  install(i, { icons: e = {}, clearFirst: r = !1, source: a = "bs" } = {}) {
    s(a == "bs" ? q : _), i.provide("icons.config", { source: a, icons: o }), r && k(), e != null && s(e), i.config.globalProperties.$icons = {
      add: (b, d) => s({ [b]: d }),
      source: a,
      map: o
    };
    const l = a == "bs" ? w : x;
    i.component("Icon", l), i.component("IconButton", v);
  }
};
export {
  w as _,
  x as a,
  v as b,
  k as c,
  o as i,
  s as l,
  I as p
};
