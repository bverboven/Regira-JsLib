import { type Ref } from "vue";
export declare enum FeedbackStatus {
    none = "",
    pending = "Pending",
    success = "Success",
    failed = "Failed"
}
export type FeedbackIn = {
    autoHideDelay?: number;
};
export type FeedbackError = string | Record<string, string>;
export interface FeedbackOut {
    status: Ref<FeedbackStatus>;
    message: Ref<string>;
    error: Ref<FeedbackError | null>;
    pending(msg: string): void;
    success(msg: string): void;
    fail(msg: string, ex?: FeedbackError): void;
    reset(): void;
}
type FeedbackStatusOrError = {
    status: FeedbackStatus;
    error?: FeedbackError | null;
};
export interface FeedbackEmits {
    (e: "close", arg: FeedbackStatusOrError): void;
}
export declare function useFeedback({ autoHideDelay }?: FeedbackIn): FeedbackOut;
export default useFeedback;
