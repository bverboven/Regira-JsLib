import type { IPagingInfo } from "../../entities/abstractions/PagingInfo";
import { ButtonType } from "./paging";
type __VLS_Props = {
    modelValue: IPagingInfo;
    count: number;
    maxPages?: number;
    buttonType?: ButtonType;
};
declare var __VLS_1: {
    page: number;
}, __VLS_11: {
    page: number;
    route: string;
    handleChange: (newPage: number) => void;
}, __VLS_21: {
    page: number;
};
type __VLS_Slots = {} & {
    firstPage?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    lastPage?: (props: typeof __VLS_21) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (args: any) => any;
    "update:modelValue": (args: any) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((args: any) => any) | undefined;
    "onUpdate:modelValue"?: ((args: any) => any) | undefined;
}>, {
    maxPages: number;
    buttonType: ButtonType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
