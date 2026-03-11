import type { AxiosInstance } from "axios"
import type { ITokenManager } from "./token-manager"
import { AuthService, type IAuthService } from "./auth-service"
import type { IAuthData } from "./AuthData"

interface IAuth {
    enabled: boolean
    clientApp?: string
    tokenManager: ITokenManager
    service: IAuthService
}

export interface IGlobalAuth {
    enabled: boolean
    clientApp?: string
    tokenManager: ITokenManager
    service: IAuthService
    authData: IAuthData
    isAuthenticated: boolean
    isRequired: boolean
}
export type IAuthOptions = {
    clientApp?: string
    loginUrl?: string
}

interface Input extends IAuthOptions {
    enabled: boolean
    tokenManager: ITokenManager
    axios: AxiosInstance
}

let auth: IAuth
export function createAuth(options: Input): IAuth {
    const { enabled, tokenManager, axios, clientApp, loginUrl } = options
    auth = {
        enabled,
        clientApp,
        tokenManager,
        service: new AuthService(axios, tokenManager, { clientApp, loginUrl }),
    }

    return auth
}

export const useAuth = () => auth
