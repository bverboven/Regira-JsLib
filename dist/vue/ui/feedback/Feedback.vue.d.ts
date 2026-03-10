import { FeedbackStatus, type FeedbackOut } from "./feedback";
type __VLS_Props = {
    hideCloseButton?: boolean;
    feedback: FeedbackOut;
    enableErrorPopup?: boolean;
};
declare var __VLS_1: {}, __VLS_10: {}, __VLS_17: {}, __VLS_24: {};
type __VLS_Slots = {} & {
    'close-button'?: (props: typeof __VLS_1) => any;
} & {
    pending?: (props: typeof __VLS_10) => any;
} & {
    success?: (props: typeof __VLS_17) => any;
} & {
    error?: (props: typeof __VLS_24) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: (arg: {
        status: FeedbackStatus;
        error?: import("./feedback").FeedbackError | null;
    }) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: ((arg: {
        status: FeedbackStatus;
        error?: import("./feedback").FeedbackError | null;
    }) => any) | undefined;
}>, {
    hideCloseButton: boolean;
    enableErrorPopup: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
