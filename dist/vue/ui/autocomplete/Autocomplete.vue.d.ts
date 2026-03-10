import "./style.scss";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<{
    idValue?: number | string;
    modelValue?: object | string;
    data?: Array<any>;
    maxResults?: number;
    debounceTime?: number;
    enableDblClick?: boolean;
    autoSelect?: boolean;
    allowFreeInput?: boolean;
    resultClass?: string;
    itemsClass?: string;
    itemClass?: string;
    search?(term?: string): Promise<Array<any>>;
    idSelector?(item?: object): number | string | undefined;
    displayItemFormatter?(item?: object): string;
    resultItemFormatter?(item?: object, q?: string): string;
}, {
    inputEl: import("vue").Ref<(HTMLElement & {
        value: string;
    }) | undefined, (HTMLElement & {
        value: string;
    }) | undefined>;
    q: import("vue").Ref<string, string>;
    selectedItem: import("vue").Ref<any, any>;
    search: (term?: string) => void;
    reset: () => void;
    resetQ(): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    idValue?: number | string;
    modelValue?: object | string;
    data?: Array<any>;
    maxResults?: number;
    debounceTime?: number;
    enableDblClick?: boolean;
    autoSelect?: boolean;
    allowFreeInput?: boolean;
    resultClass?: string;
    itemsClass?: string;
    itemClass?: string;
    search?(term?: string): Promise<Array<any>>;
    idSelector?(item?: object): number | string | undefined;
    displayItemFormatter?(item?: object): string;
    resultItemFormatter?(item?: object, q?: string): string;
}> & Readonly<{}>, {
    data: Array<any>;
    maxResults: number;
    debounceTime: number;
    autoSelect: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (props: {
        item: any;
        q: string;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
