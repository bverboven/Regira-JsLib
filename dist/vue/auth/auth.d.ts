import type { AxiosInstance } from "axios";
import type { ITokenManager } from "./token-manager";
import { type IAuthService } from "./auth-service";
interface IAuth {
    enabled: boolean;
    clientApp?: string;
    tokenManager: ITokenManager;
    service: IAuthService;
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
