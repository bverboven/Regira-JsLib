import type { IAuthData } from "./AuthData"
import type { IAuthService } from "./auth-service"
import type { ITokenManager } from "./token-manager"

export interface IGlobalAuth {
    enabled: boolean
    clientApp?: string
    tokenManager: ITokenManager
    service: IAuthService
    authData: IAuthData
    isAuthenticated: boolean
    isRequired: boolean
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $auth: IGlobalAuth | { enabled: false }
    }
}

export {}
