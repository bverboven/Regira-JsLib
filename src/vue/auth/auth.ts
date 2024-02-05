import type { AxiosInstance } from "axios"
import type { ITokenManager } from "./token-manager"
import { AuthService, type IAuthService } from "./auth-service"

interface IAuth {
    enabled: boolean
    clientId?: string
    tokenManager: ITokenManager
    service: IAuthService
}

type Input = { enabled: boolean; clientId?: string; tokenManager: ITokenManager; axios: AxiosInstance }

let auth: IAuth
export function createAuth({ enabled, clientId, tokenManager, axios }: Input): IAuth {
    auth = {
        enabled,
        clientId,
        tokenManager,
        service: new AuthService(axios, tokenManager),
    }

    return auth
}

export const useAuth = () => auth
