import { watch, type App } from "vue"
import type { Store } from "pinia"
import type { AxiosInstance } from "axios"
import { addBearerHeader, autoLogoutOnFailedRequest } from "./auth-axios"
import { useAuthStore } from "./store"
import routeGuard from "./route-guard"
import type ITokenManager from "./token-manager"
import { createAuth, type IAuthOptions } from "./auth"
import type { IAuthData } from "./AuthData"

interface Input extends IAuthOptions {
    tokenManager: ITokenManager
    authStore?: Store
    axios: AxiosInstance
    enableRouteGuard?: boolean
    enabled?: boolean
    onAuthenticationChange?(auth: IAuthData): void
}

export default {
    async install(app: App, options: Input) {
        const { clientApp, loginUrl, tokenManager, authStore, axios, enableRouteGuard = true, enabled = true, onAuthenticationChange = () => {} } = options
        const { $router: router } = app.config.globalProperties

        const auth = createAuth({
            enabled,
            tokenManager,
            axios,
            clientApp,
            loginUrl,
        })

        const store = (authStore as any) ?? useAuthStore()

        if (enabled) {
            app.config.globalProperties.$auth = {
                ...auth,
                get authData() {
                    return store.authData as IAuthData
                },
                get isAuthenticated() {
                    return !!this.authData?.isAuthenticated
                },
                get isRequired() {
                    return store.authRequired
                },
            }

            if (clientApp) {
                store.$patch({ clientApp, enabled })
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
