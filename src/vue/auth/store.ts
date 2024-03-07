import { ref, computed, type Ref, type ComputedRef } from "vue"
import { useRouter } from "vue-router"
import { defineStore, type Store } from "pinia"
import { emptyAuthData } from "./auth-service"
import type { IAuthData } from "./AuthData"
import { useAuth } from "./auth"
import type { LoginInput } from "./useLoginForm"

export type AuthRefs = {
    enabled: Ref<boolean>
    clientApp?: Ref<string | undefined>
    authData: Ref<IAuthData>
    authRequired: Ref<boolean>
}
export type AuthComputed = {
    isAuthenticated: ComputedRef<boolean>
    isRequired: ComputedRef<boolean>
    hasPermission: ComputedRef<(permission: string) => boolean>
    displayName: ComputedRef<string | undefined>
    isAdmin: ComputedRef<boolean>
    hasClaim: ComputedRef<(type: string, value?: string) => boolean>
    getClaimValue: ComputedRef<(type: string) => string | Array<string> | undefined>
}
export type AuthActions = {
    setClientApp(clientApp?: string): void
    login({ username, password }: LoginInput): Promise<boolean>
    validateToken(): Promise<boolean>
    refresh(o: Record<string, any>): Promise<boolean>
    logout(): void
}

const storeName: string = "Auth"
export type IAuthStore = AuthRefs & AuthComputed & AuthActions

function createStore(): IAuthStore {
    const enabled = ref(true)
    const clientApp = ref<string>()
    const authData = ref(emptyAuthData())
    const authRequired = ref(false)

    const router = useRouter()

    const isRequired = computed(() => enabled.value && !router.currentRoute.value?.meta?.allowAnonymous)
    const isAuthenticated = computed(() => !!authData.value.isAuthenticated)
    const hasPermission = computed(() => (permission: string) => authData.value?.hasPermission(permission) || false)
    const displayName = computed(() => authData.value?.displayName)
    const isAdmin = computed(() => authData.value.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role") == "SuperUser")
    const hasClaim = computed(() => (type: string, value?: string) => {
        const claimValue = authData.value.get(type)
        return value == null ? type in authData.value : (Array.isArray(claimValue) && claimValue.includes(value)) || claimValue == value
    })
    const getClaimValue = computed(() => (type: string) => authData.value.get(type))

    function setClientApp(value?: string) {
        clientApp.value = value
    }
    async function login({ username, password }: LoginInput) {
        const { service } = useAuth()
        authData.value = await service.login(username, password, clientApp.value)
        return authData.value.isAuthenticated
    }
    async function refresh(o?: Record<string, any>) {
        const { service } = useAuth()
        authData.value = await service.refresh(o)
        return authData.value.isAuthenticated
    }
    async function validateToken() {
        const { service } = useAuth()
        authData.value = await service.validateToken()
        return authData.value.isAuthenticated
    }
    function logout() {
        authData.value = emptyAuthData()
        const { service } = useAuth()
        service.logout()
    }

    return {
        enabled,
        clientApp,
        authData,
        authRequired,

        isRequired,
        isAuthenticated,
        hasPermission,
        displayName,
        isAdmin,
        hasClaim,
        getClaimValue,

        setClientApp,
        login,
        refresh,
        validateToken,
        logout,
    }
}

export const useAuthStore = defineStore<string, IAuthStore>(storeName, () => createStore())

export default useAuthStore
