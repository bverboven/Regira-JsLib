import type { IEntity } from "../../abstractions/IEntity";
type Props = {
    modelValue: number | string | [] | object;
    data: [];
    dataUrl: string;
    dataFunc(): Promise<[]>;
    idProp: string;
    titleFunc(o: IEntity | string): string;
    showEmptyOption: boolean;
    emptyValue: object;
    emptyText: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (args: any) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:modelValue"?: ((args: any) => any) | undefined;
}>, {
    titleFunc: (o: IEntity | string) => string;
    showEmptyOption: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
