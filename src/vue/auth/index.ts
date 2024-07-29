export { AuthService, type IAuthenticateInput, type IChangePasswordInput, type IForgotPasswordInput, type IResetPasswordInput } from "./auth-service"
export { default as routeGuard } from "./route-guard"
export { type ITokenManager, CookieTokenManager, MemoryTokenManager, LocalStorageTokenManager } from "./token-manager"

export { useAuth } from "./auth"
export { useAuthStore, createStore, type IDefineAuthStore, type IAuthStore } from "./store"
export { default as plugin } from "./plugin"
export { useLoginForm, type IEmits as ILoginEmits, type IProps as ILoginProps, type LoginInput } from "./useLoginForm"
export { useForgotPasswordForm, type IEmits as IForgotPasswordEmits, type IProps as IForgotPasswordProps } from "./useForgotPasswordForm"

export { default as LoginForm } from "./LoginForm.vue"
export { default as LogoutForm } from "./LogoutForm.vue"
export { default as LoginModal } from "./LoginModal.vue"
export { default as ForgotPasswordModal } from "./ForgotPasswordModal.vue"
