import type { IPagingInfo } from "../../entities/abstractions/PagingInfo";
import { type ComputedRef, type Ref } from "vue";
export declare enum ButtonType {
    anchor = "Anchor",
    button = "Button"
}
export type PagingEmits = {
    (e: "update:modelValue", args: any): void;
    (e: "change", args: any): void;
};
export type PagingProps = {
    modelValue: IPagingInfo;
    count: number;
    maxPages?: number;
    buttonType?: ButtonType;
};
export declare const pagingDefaults: {
    maxPages: number;
    buttonType: ButtonType;
};
export type PagingIn = {
    pagingInfo: Ref<IPagingInfo>;
    count: Ref<number>;
    maxPages: number;
    emit: PagingEmits;
};
export type PagingOut = {
    pagedRoute(p: number): string;
    page: ComputedRef<number>;
    totalPages: ComputedRef<number>;
    totalVisiblePages: ComputedRef<number>;
    firstPage: ComputedRef<number>;
    lastPage: ComputedRef<number>;
    pages: ComputedRef<Array<number>>;
    handleChangePage(newPage: number): void;
};
export default function usePaging({ pagingInfo, count, maxPages, emit }: PagingIn): PagingOut;
