type __VLS_Props = {
    title?: string;
    readonly?: boolean;
    showSummary?: boolean;
    collapsed?: boolean;
    summaryClass?: string | Array<string> | Record<string, string>;
};
declare var __VLS_1: {
    collapsed: boolean;
    showSummary: boolean | undefined;
}, __VLS_3: {
    showSummary: boolean | undefined;
}, __VLS_15: {
    collapsed: boolean;
}, __VLS_17: {
    collapsed: boolean;
}, __VLS_19: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    title?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
} & {
    summary?: (props: typeof __VLS_17) => any;
} & {
    always?: (props: typeof __VLS_19) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    collapse: () => any;
    expand: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCollapse?: (() => any) | undefined;
    onExpand?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
