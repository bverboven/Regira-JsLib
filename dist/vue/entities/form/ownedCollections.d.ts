import type { IEntity, SaveResult } from "../abstractions";
type Input<T> = {
    props: {
        modelValue?: Array<T>;
    };
    emit: any;
};
export declare function useOwnedCollection<T extends IEntity & {
    id: number;
}>({ props, emit }: Input<T>): {
    items: import("vue").WritableComputedRef<T[], T[]>;
    newItem: import("vue").Ref<T | undefined, T | undefined>;
    resetNewItem: () => Promise<void>;
    handleSort: (e: any) => void;
    handleSave: ({ saved, isNew }: SaveResult<T>) => void;
};
export default useOwnedCollection;
