import { type App } from "vue";
import type { AxiosInstance } from "axios";
import { type IAuthStore } from "./store";
import type { ITokenManager } from "./token-manager";
import { type IAuthOptions } from "./auth";
import type { IAuthData } from "./AuthData";
type Input<TStore extends IAuthStore, TTokenManager extends ITokenManager> = IAuthOptions & {
    tokenManager: TTokenManager;
    authStore?: TStore;
    axios: AxiosInstance;
    enableRouteGuard?: boolean;
    enabled?: boolean;
    onAuthenticationChange?(auth: IAuthData): void;
};
declare const _default: {
    install<TStore extends IAuthStore = IAuthStore, TTokenManager extends ITokenManager = ITokenManager>(app: App, options: Input<TStore, TTokenManager>): Promise<void>;
};
export default _default;
