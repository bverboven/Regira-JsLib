export type LoginInput = {
    username: string;
    password: string;
};
export interface IEmits {
    (e: "forgotPassword", username?: string): void;
    (e: "signingIn", username?: string): void;
    (e: "success", username?: string): void;
    (e: "fail", username?: string): void;
}
export interface IProps {
    username?: string;
}
export declare function useLoginForm(props: IProps, emit: IEmits): {
    username: import("vue").Ref<string, string>;
    password: import("vue").Ref<string, string>;
    failed: import("vue").Ref<boolean, boolean>;
    signingIn: import("vue").Ref<boolean, boolean>;
    isLockedOut: import("vue").Ref<boolean, boolean>;
    handleSubmit: () => Promise<void>;
    handleForgotPassword: () => void;
};
