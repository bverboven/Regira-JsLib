import { type Ref, type StyleValue } from "vue";
export declare const autocompleteEmits: string[];
export declare const autocompleteProps: {
    idValue: (StringConstructor | NumberConstructor)[];
    modelValue: {
        required: boolean;
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    search: FunctionConstructor;
    idSelector: FunctionConstructor;
    displayItemFormatter: FunctionConstructor;
    resultItemFormatter: FunctionConstructor;
    enableDblClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    resultClass: {
        type: StringConstructor;
        default: string;
    };
    itemsClass: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    maxResults: {
        type: NumberConstructor;
        default: number;
    };
    debounceTime: {
        type: NumberConstructor;
        defaults: number;
    };
};
type IDefaultKey = number | string;
type IOffset = {
    top: number;
    left: number;
};
type IResultStyle = StyleValue & {
    visibility: string;
    top?: string;
    left?: string;
    transform?: string;
    width: string;
};
interface Emits<T = any, TKey = IDefaultKey | T> {
    (e: "update:modelValue", args: T | undefined): void;
    (e: "update:idValue", args: TKey | undefined): void;
    (e: "select", args: T | undefined): void;
    (e: "qInput", args: string): void;
}
interface Props<T = any, TKey = IDefaultKey | T> {
    idValue?: TKey;
    modelValue?: T;
    data?: Array<T>;
    maxResults?: number;
    debounceTime?: number;
    enableDblClick?: boolean;
    autoSelect?: boolean;
    allowFreeInput?: boolean;
    resultClass?: string;
    itemsClass?: string;
    itemClass?: string;
    search?(term?: string): Promise<Array<T>>;
    idSelector?(item?: T): TKey | undefined;
    displayItemFormatter?(item?: T): string;
    resultItemFormatter?(item?: T, q?: string): string;
}
export declare const propsDefaults: {
    data: () => never[];
    maxResults: number;
    debounceTime: number;
    autoSelect: boolean;
};
type AutocompleteOut<T = any, TKey = IDefaultKey | T> = {
    q: Ref<string>;
    selectedItem: Ref<T | undefined>;
    selectedIndex: Ref<number>;
    selectedId: Ref<TKey | undefined>;
    items: Ref<Array<T> | undefined>;
    isOpen: Ref<boolean>;
    isFocus: Ref<boolean>;
    isLoading: Ref<boolean>;
    inputEl: Ref<(HTMLElement & {
        value: string;
    }) | undefined>;
    resultOffset: Ref<IOffset>;
    resultStyle: Ref<IResultStyle>;
    displayItemFormatter(item: T): string;
    resultItemFormatter(item: T, q?: string): string;
    handleInput(): void;
    handleChange(): void;
    handleSelect(item: T, index: number): void;
    handleSearch(term?: string): void;
    openResults(): void;
    closeResults(): void;
    closeGently(e?: PointerEvent): void;
    moveSelection(step: number): void;
    checkMatch(): void;
    clearSelection(): void;
    reset(): void;
};
export declare function useAutocomplete<T = any, TKey = IDefaultKey | T>(props: Props<T, TKey>, { emit }: {
    emit: Emits<T, TKey>;
}): AutocompleteOut<T, TKey>;
export {};
