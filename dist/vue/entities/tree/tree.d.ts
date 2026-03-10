import { type Ref } from "vue";
import { TreeList, type IFindParents, TreeNode } from "../../../treelist";
type TreeIn<T extends {
    $id: number | string;
}> = {
    equals(item1: T, item2: T): boolean;
};
export declare function useTree<T extends {
    $id: number | string;
}>(options?: TreeIn<T>): {
    tree: Ref<TreeList<T> | undefined, TreeList<T> | undefined>;
    nodes: import("vue").ComputedRef<TreeNode<T>[]>;
    ancestors: import("vue").ComputedRef<TreeNode<T>[]>;
    offspring: import("vue").ComputedRef<TreeNode<T>[]>;
    family: import("vue").ComputedRef<TreeNode<T>[]>;
    init: (values: Array<T>, data: Array<T>, findParents: IFindParents<T>) => void;
};
export type DragDropEmits<T = any> = {
    (e: "move", arg: {
        child: TreeNode<T>;
        parent: TreeNode<T>;
    }): void;
    (e: "drag", arg: TreeNode<T>): void;
    (e: "dragend"): void;
    (e: "drop", arg: TreeNode<T>): void;
};
export type DragDropEngine = {
    draggingNode: Ref<TreeNode | undefined>;
    handleDrag: (node: TreeNode) => void;
    handleDragEnd: () => void;
    handleDrop: (node: TreeNode) => void;
};
export declare function useDragDrop<T = any>({ emit }: {
    emit: any;
}): DragDropEngine;
export {};
