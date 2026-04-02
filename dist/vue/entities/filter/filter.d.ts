import { type Ref, type ComputedRef } from "vue";
import type { ISearchObject } from "../abstractions/ISearchObject";
import { DefaultSearchObject } from "../abstractions/SearchObjectBase";
export interface FilterEmits<SO extends ISearchObject = ISearchObject> {
    (e: "update:modelValue", args: SO): void;
    (e: "filter", args: SO): void;
    (e: "toggle-adv"): void;
    (e: "close"): void;
}
export interface FilterIn<SO extends ISearchObject = ISearchObject> {
    searchObject: Ref<SO>;
    emit: FilterEmits<SO>;
    Constructor?: new () => SO;
}
export interface FilterOut {
    filterIsActive: ComputedRef<boolean | undefined>;
    handleToggle(): void;
    handleFilter(): void;
    handleUpdate(): void;
    handleReset(): void;
}
export declare function useFilter<SO extends ISearchObject = DefaultSearchObject>({ searchObject, emit, Constructor }: FilterIn<SO>): FilterOut;
export default useFilter;
