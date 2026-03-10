type IClaimValue = string | Array<string>;
export interface IAuthData {
    isAuthenticated: boolean;
    expires: number;
    userId?: string;
    name?: string;
    email?: string;
    displayName?: string;
    culture?: string;
    role?: string;
    get(claimType: string): IClaimValue | undefined;
    hasClaim(claimType: string, claimValue?: string): boolean;
    hasPermission(value: string): boolean;
}
export declare class AuthData implements IAuthData {
    private _decodedToken;
    isAuthenticated: boolean;
    expires: number;
    userId?: string;
    name?: string;
    email?: string;
    displayName?: string;
    culture?: string;
    role?: string | undefined;
    constructor(token?: string, options?: {
        isAuthenticated: boolean;
    });
    get(claimType: string): IClaimValue | undefined;
    hasClaim(type: string, value?: string): boolean;
    hasPermission(value: string): boolean;
}
export default AuthData;
