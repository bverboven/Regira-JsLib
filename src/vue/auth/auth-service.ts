import type { AxiosInstance } from "axios"
import { createQueryString } from "../http/query"
import type ITokenManager from "./token-manager"
import type { IAuthData } from "./AuthData"
import type { IAuthOptions } from "./auth"

export type IAuthenticateInput = { token: string; isAuthenticated: boolean }
export type IChangePasswordInput = { newPassword: string; currentPassword: string }
export type IForgotPasswordInput = { username: string; siteUrl: string; siteName?: string }
export type IResetPasswordInput = { token: string; password: string }

export interface IAuthService {
    options: IAuthOptions
    authenticate({ token, isAuthenticated }: IAuthenticateInput): IAuthData
    login(username: string, password: string, clientApp?: string): Promise<IAuthData>
    refresh(o?: Record<string, any>): Promise<IAuthData>
    validateToken(): Promise<IAuthData>
    logout(): void
    changePassword(input: IChangePasswordInput): Promise<void>
    forgotPassword(input: IForgotPasswordInput): Promise<void>
    resetPassword(input: IResetPasswordInput): Promise<void>
}
export const emptyAuthData = (): IAuthData => ({ isAuthenticated: false, permissions: [], expires: 0, get: () => undefined })

export class AuthService implements IAuthService {
    options: IAuthOptions

    constructor(
        private axios: AxiosInstance,
        private tokenManager: ITokenManager,
        options?: IAuthOptions
    ) {
        this.options = options || {}
    }

    authenticate({ token, isAuthenticated }: IAuthenticateInput): IAuthData {
        if (isAuthenticated) {
            this.tokenManager.token = token
            const decodedToken = JSON.parse(window.atob(token.split(".")[1]))
            const expiresInSeconds = decodedToken.exp - decodedToken.nbf
            const data: IAuthData = {
                ...decodedToken,
                isAuthenticated,
                expires: expiresInSeconds,
                permissions: Object.keys(decodedToken)
                    .filter((key) => key.startsWith("Read") || key.startsWith("Edit"))
                    .filter((key) => decodedToken[key] == decodedToken.ActiveSupplierId?.toString() || decodedToken[key].includes(decodedToken.ActiveSupplierId?.toString())),
                get: (claimType) => {
                    console.debug("authData.get", { claimType, decodedToken })
                    return decodedToken[claimType]
                },
            }
            return data
        }

        // clear token
        this.tokenManager.token = undefined
        return emptyAuthData()
    }
    async login(username: string, password: string): Promise<IAuthData> {
        const url = this.options?.loginUrl || "auth"
        const response = await this.axios.post(url, { username, password })
        console.debug("login", { response })
        return this.authenticate(response.data)
    }
    async refresh(queryParams?: Record<string, any>): Promise<IAuthData> {
        const query = createQueryString(queryParams || {})
        const url = `auth/refresh/?${query}`
        const response = await this.axios.post(url)
        return this.authenticate(response.data)
    }
    async validateToken(): Promise<IAuthData> {
        if (this.tokenManager.token != null) {
            try {
                const response = await this.axios.post("auth/validate")
                if (response.status >= 200 && response.status < 300) {
                    return this.authenticate({ token: this.tokenManager.token, isAuthenticated: true })
                } else {
                    console.warn("validateToken: invalid statusCode", response.status, { tokenManager: this.tokenManager, token: this.tokenManager.token })
                }
            } catch (ex: any) {
                console.error("validating token failed", { ex, token: this.tokenManager.token })
                if (ex.response && ex.response.status === 401) {
                    this.tokenManager.token = undefined
                }
            }
        }
        return emptyAuthData()
    }
    logout(): void {
        this.tokenManager.token = undefined
    }
    async changePassword(input: IChangePasswordInput) {
        const url = `auth/password`
        const response = await this.axios.post(url, input)
        console.debug("changePwd", { response })
    }
    async forgotPassword(input: IForgotPasswordInput) {
        const url = `auth/password/recover`
        const response = await this.axios.post(url, input)
        console.debug("forgotPwd", { response })
    }
    async resetPassword(input: IResetPasswordInput) {
        const url = `auth/password/reset`
        const response = await this.axios.post(url, input)
        console.debug("resetPwd", { response })
    }
}

export default AuthService
