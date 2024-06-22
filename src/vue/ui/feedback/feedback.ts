import { ref, type Ref } from "vue"

export enum FeedbackStatus {
    none = "",
    pending = "Pending",
    success = "Success",
    failed = "Failed",
}

export type FeedbackIn = {
    autoHideDelay?: number
}
export type FeedbackError = string | Record<string, string>
export interface FeedbackOut {
    status: Ref<FeedbackStatus>
    message: Ref<string>
    error: Ref<FeedbackError | null>

    pending(msg: string): void
    success(msg: string): void
    fail(msg: string, ex?: FeedbackError): void
    reset(): void
}
type FeedbackStatusOrError = { status: FeedbackStatus; error?: FeedbackError | null }
export interface FeedbackEmits {
    (e: "close", arg: FeedbackStatusOrError): void
}

export function useFeedback({ autoHideDelay = 1500 }: FeedbackIn = {}): FeedbackOut {
    const status = ref<FeedbackStatus>(FeedbackStatus.none)
    const message = ref<string>("")
    const error = ref<FeedbackError | null>(null)

    let timeout: any

    function fadeOut() {
        if (autoHideDelay > 0) {
            clearTimeout(timeout)
            timeout = setTimeout(reset, autoHideDelay)
        }
    }

    function reset() {
        status.value = FeedbackStatus.none
        message.value = ""
        error.value = null
    }
    function pending(msg: string) {
        status.value = FeedbackStatus.pending
        message.value = msg
        error.value = null
    }
    function success(msg: string) {
        status.value = FeedbackStatus.success
        message.value = msg
        error.value = null
        autoHideDelay && fadeOut()
    }
    function fail(msg: string, ex: FeedbackError) {
        status.value = FeedbackStatus.failed
        message.value = msg
        if (typeof ex === "string") {
            message.value = `${message.value}: ${ex.split("\n")[0]}`
        } else {
            error.value = ex?.message || ex
        }
    }

    return {
        status,
        message,
        error,

        pending,
        success,
        fail,
        reset,
    }
}

export default useFeedback
