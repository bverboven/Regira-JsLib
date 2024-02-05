type IClaimValue = string | Array<string>

export interface IAuthData {
    isAuthenticated: boolean
    expires: number
    userId?: string
    name?: string
    email?: string
    displayName?: string
    culture?: string
    permissions?: Array<string>
    role?: string

    get(claimType: string): IClaimValue | undefined
}
