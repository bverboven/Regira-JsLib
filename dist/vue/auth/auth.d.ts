import type { AxiosInstance } from "axios";
import type { ITokenManager } from "./token-manager";
import { type IAuthService } from "./auth-service";
import type { IAuthData } from "./AuthData";
interface IAuth {
    enabled: boolean;
    clientApp?: string;
    tokenManager: ITokenManager;
    service: IAuthService;
}
export interface IGlobalAuth {
    enabled: boolean;
    clientApp?: string;
    tokenManager: ITokenManager;
    service: IAuthService;
    authData: IAuthData;
    isAuthenticated: boolean;
    isRequired: boolean;
}
export type IAuthOptions = {
    clientApp?: string;
    loginUrl?: string;
};
interface Input extends IAuthOptions {
    enabled: boolean;
    tokenManager: ITokenManager;
    axios: AxiosInstance;
}
export declare function createAuth(options: Input): IAuth;
export declare const useAuth: () => IAuth;
export {};
