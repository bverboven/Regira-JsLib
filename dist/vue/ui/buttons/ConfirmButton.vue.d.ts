import { ModalType } from "../modal";
type __VLS_Props = {
    icon?: string;
    buttonLabel?: string;
    modalTitle?: string;
    modalType?: ModalType;
};
declare var __VLS_1: {}, __VLS_14: {}, __VLS_26: {};
type __VLS_Slots = {} & {
    'button-content'?: (props: typeof __VLS_1) => any;
} & {
    modal?: (props: typeof __VLS_14) => any;
} & {
    default?: (props: typeof __VLS_26) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    cancel: () => any;
    close: () => any;
    confirm: () => any;
    open: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCancel?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {
    icon: string;
    modalTitle: string;
    modalType: ModalType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
