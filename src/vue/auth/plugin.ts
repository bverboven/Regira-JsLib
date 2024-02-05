import { watch, type App } from "vue"
import type { AxiosInstance } from "axios"
import { addBearerHeader, autoLogoutOnFailedRequest } from "./auth-axios"
import { useAuthStore } from "./store"
import routeGuard from "./route-guard"
import type ITokenManager from "./token-manager"
import { createAuth } from "./auth"
import type { IAuthData } from "./AuthData"

type Input = {
    clientId?: string
    tokenManager: ITokenManager
    axios: AxiosInstance
    enableRouteGuard?: boolean
    enabled?: boolean
    onAuthenticationChange?(auth: IAuthData): void
}

export default {
    async install(app: App, options: Input) {
        const { clientId, tokenManager, axios, enableRouteGuard = true, enabled = true, onAuthenticationChange = () => {} } = options
        const { $router: router } = app.config.globalProperties

        const auth = createAuth({
            enabled,
            clientId,
            tokenManager,
            axios,
        })

        const store = useAuthStore()

        console.debug("authPlugin", { app, auth, router, store })

        if (enabled) {
            app.config.globalProperties.$auth = {
                ...auth,
                get authData() {
                    return store.authData
                },
                get isAuthenticated() {
                    return !!this.authData?.isAuthenticated
                },
                get isAdmin() {
                    return store.isAdmin
                },
                get isRequired() {
                    console.debug("auth.isRequired", store.authRequired)
                    return store.authRequired
                },
            }

            if (clientId) {
                store.$patch({ clientId, enabled })
            }
        } else {
            app.config.globalProperties.$auth = { enabled: false }
        }

        // app.mixin({
        //     computed: {
        //         isAuthenticated: () => auth.isAuthenticated,
        //         requiresAuthentication: () => auth.requiresAuthentication,
        //         isAuthEnabled: () => auth.isEnabled,
        //     },
        // })

        if (enabled) {
            addBearerHeader(axios, tokenManager)

            let tokenInterval: any = 0

            watch(
                () => store.isAuthenticated,
                () => {
                    if (store.isAuthenticated) {
                        // triggers login-popup when token becomes invalid
                        clearInterval(tokenInterval)
                        tokenInterval = setInterval(() => store.validateToken(), store.authData.expires * 1000)
                    }
                    onAuthenticationChange(store.authData)
                }
            )

            // check saved (cookie, localStorage) token
            await store.validateToken()
            // check route permissions
            enableRouteGuard && routeGuard({ router, store })
            // log user out when token is invalidated (so loginPopup can appear automatically)
            autoLogoutOnFailedRequest(axios, store)
        }
    },
}
