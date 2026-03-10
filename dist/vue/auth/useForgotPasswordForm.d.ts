export interface IEmits {
    (e: "success", username?: string): void;
    (e: "fail", ex?: any): void;
    (e: "login", username?: string): void;
}
export interface IProps {
    username?: string;
}
export declare function useForgotPasswordForm(props: IProps, emit: IEmits, options: {
    siteUrl: string;
    siteName?: string;
}): {
    username: import("vue").Ref<string, string>;
    isLoading: import("vue").Ref<boolean, boolean>;
    isFormValid: import("vue").ComputedRef<boolean>;
    isSuccess: import("vue").Ref<boolean | undefined, boolean | undefined>;
    handleSubmit: () => Promise<void>;
};
