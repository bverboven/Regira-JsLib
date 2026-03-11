import { h as c, t as o, j as h } from "../_chunks/array-utility-3.0.1.js";
class i {
  _value;
  _parentNode;
  _level;
  _tree;
  _children;
  constructor(t, r = null, e) {
    this._value = t, this._parentNode = r, this._level = r ? r.level + 1 : 0, this._tree = e, this._children = [];
  }
  get value() {
    return this._value;
  }
  get parent() {
    return this._parentNode;
  }
  get level() {
    return this._level;
  }
  get children() {
    return this._children;
  }
  add(t) {
    const r = new i(t, this, this._tree);
    return r._level = this.level + 1, this._children.push(r), this._tree.push(r), r;
  }
  remove(t) {
    this._tree.remove(t);
  }
  update(t) {
    this._value = t;
  }
  getOffspring() {
    return this._tree.getOffspring(this);
  }
  getAncestors() {
    return this._tree.getAncestors(this);
  }
  getRoot() {
    return this._tree.getRoots(this)[0];
  }
  *[Symbol.iterator]() {
    for (const t of this.children)
      yield t;
  }
}
class p extends Array {
  roots;
  constructor(t) {
    super(), this.roots = [], Array.isArray(t) && this.init(t);
  }
  // returnType becomes Array when using array-functions on this TreeList
  static get [Symbol.species]() {
    return Array;
  }
  init(t = [], r = (e, s) => []) {
    this.length = 0, this.roots = [];
    const e = (s) => {
      const n = r(s, t);
      return n.length ? (n.forEach((l) => {
        const a = this.find((u) => u.value === l) || e(l);
        this.addValue(s, a);
      }), null) : this.addValue(s);
    };
    return t.forEach(e), this;
  }
  addValue(t, r) {
    return this.addValues([t], r)[0];
  }
  addValues(t, r) {
    if (!r) {
      const e = t.map((s) => new i(s, null, this));
      return this.push(...e), this.roots.push(...e), e;
    }
    return t.map((e) => r.add(e));
  }
  remove(t) {
    if (t?.children?.length > 0 && t.children.forEach((e) => this.remove(e)), t.parent != null) {
      const e = t.parent._children.findIndex((s) => s === t);
      e !== -1 && t.parent._children.splice(e, 1);
    } else {
      const e = this.roots.findIndex((s) => s === t);
      e !== -1 && this.roots.splice(e, 1);
    }
    const r = this.findIndex((e) => e === t);
    return r !== -1 ? (this.splice(r, 1), !0) : !1;
  }
  move(t, r) {
    if (t.parent != null) {
      const e = t.parent.children.findIndex((s) => s === t);
      if (e !== -1)
        t.parent.children.splice(e, 1);
      else
        debugger;
    } else {
      const e = this.roots.findIndex((s) => s === t);
      e !== -1 && this.roots.splice(e, 1);
    }
    r != null ? r.children.includes(t) || r.children.push(t) : this.roots.includes(t) || this.roots.push(t), t._parentNode = r;
  }
  /**
   * Retrieves all TreeNodes for the given value(s)
   * @param {any} values (default undefined so we can treat null as a valid value)
   * @returns {Array<TreeNode>} collection of TreeNodes
   */
  getNodes(t) {
    if (t == null)
      return [...this];
    const r = c(t) ? t : [t], e = o(r);
    return this.filter((s) => e.includes(s.value));
  }
  /**
   * Retrieves all roots for the given TreeNode(s)
   * @param {Array<TreeNode>|TreeNode} nodes
   * @returns {Array<TreeNode>} collection of TreeNodes
   */
  getRoots(t) {
    if (t == null)
      return [...this.roots];
    t = this._ensureNodeList(t);
    const r = t.map((e) => {
      let s = e;
      for (; s.parent; )
        s = s.parent;
      return s;
    });
    return h(r);
  }
  /**
   * Retrieves all parents and their parents for the given TreeNode(s)
   * @param {Array<TreeNode>|TreeNode} nodes (or values)
   * @returns {Array<TreeNode>} collection of TreeNodes
   */
  getAncestors(t) {
    t = this._ensureNodeList(t);
    const r = (s) => s.parent ? [s.parent].concat(r(s.parent)) : [], e = t.flatMap(r);
    return h(e);
  }
  /**
   * Retrieves all children and their children for the given TreeNode(s)
   * @param {Array<TreeNode>|TreeNode} nodes
   * @returns {Array<TreeNode>} collection of TreeNodes
   */
  getOffspring(t) {
    t = this._ensureNodeList(t);
    const r = (e) => e.children.length > 0 ? [...e.children, ...e.children.flatMap(r)] : [];
    return t.flatMap(r);
  }
  /**
   * Retrieves all (distinct) values from this TreeList
   * @returns {Array<Object>} collection of values
   */
  getValues(t) {
    return t = this._ensureNodeList(t), t.map((r) => r.value);
  }
  _ensureNodeList(t) {
    return t instanceof i ? [t] : t || this;
  }
}
export {
  p as TreeList,
  i as TreeNode,
  p as default
};
