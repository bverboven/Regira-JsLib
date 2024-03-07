import type { AxiosInstance } from "axios"
import type { ITokenManager } from "./token-manager"
import { AuthService, type IAuthService } from "./auth-service"

interface IAuth {
    enabled: boolean
    clientApp?: string
    tokenManager: ITokenManager
    service: IAuthService
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
