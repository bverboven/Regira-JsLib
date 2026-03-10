import type { Store } from "pinia";
import type { IAuthData } from "./AuthData";
import type { AxiosInstance } from "axios";
import type { ITokenManager } from "./token-manager";
export declare function addBearerHeader(axios: AxiosInstance, tokenManager: ITokenManager): AxiosInstance;
type ILogoutStore = {
    isAuthenticated: boolean;
    authData: IAuthData;
    validateToken(): Promise<boolean>;
};
export declare function autoLogoutOnFailedRequest(axios: AxiosInstance, store: Store & ILogoutStore): void;
export {};
