import type TreeList from "./TreeList";
declare class TreeNode<T = any> {
    _value: T;
    _parentNode: TreeNode<T> | null;
    _level: number;
    _tree: TreeList<T>;
    _children: Array<TreeNode<T>>;
    constructor(value: T, parentNode: (TreeNode<T> | null) | undefined, tree: TreeList<T>);
    get value(): T;
    get parent(): TreeNode<T> | null;
    get level(): number;
    get children(): TreeNode<T>[];
    add(value: T): TreeNode<T>;
    remove(node: TreeNode<T>): void;
    update(value: T): void;
    getOffspring(): TreeNode<T>[];
    getAncestors(): TreeNode<T>[];
    getRoot(): TreeNode<T>;
    [Symbol.iterator](): Generator<TreeNode<T>, void, unknown>;
}
export default TreeNode;
