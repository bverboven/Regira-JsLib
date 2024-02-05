import { ref } from "vue"
import { useAuthStore } from "./store"

export type LoginInput = { username: string; password: string }

export interface IEmits {
    (e: "forgotPassword", username?: string): void
    (e: "signingIn", username?: string): void
    (e: "success", username?: string): void
    (e: "fail", username?: string): void
}
export interface IProps {
    username?: string
}

export function useLoginForm(props: IProps, emit: IEmits) {
    console.debug("useLoginForm", { props, emit })
    const username = ref(props.username)
    const password = ref("")

    const failed = ref(false)
    const signingIn = ref(false)
    const isLockedOut = ref(false)

    const store = useAuthStore()

    async function handleSubmit() {
        signingIn.value = true
        failed.value = false

        emit("signingIn", username.value)
        try {
            const success = await store.login({ username: username.value, password: password.value })
            if (success) {
                emit("success", username.value)
            } else {
                emit("fail", username.value)
            }
        } catch (ex: any) {
            console.error("login failed", { ex })
            failed.value = true
            isLockedOut.value = ex.response?.data?.isLockedOut
            emit("fail", username.value)
        } finally {
            signingIn.value = false
        }
    }
    function handleForgotPassword() {
        emit("forgotPassword", username.value)
    }

    return {
        username,
        password,

        failed,
        signingIn,
        isLockedOut,

        handleSubmit,
        handleForgotPassword,
    }
}
