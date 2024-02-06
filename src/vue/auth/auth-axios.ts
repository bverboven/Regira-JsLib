import { startsWith } from "../../utilities/string-utility";
import type { AxiosInstance } from "axios";
import type { ITokenManager } from "./token-manager";
import type { IAuthStore } from "./store";

export function addBearerHeader(axios: AxiosInstance, tokenManager: ITokenManager): AxiosInstance {
  axios.interceptors.request.use((config) => {
    if (tokenManager.token) {
      config.headers["Authorization"] = `Bearer ${tokenManager.token}`;
    }
    return config;
  });

  return axios;
}

export function autoLogoutOnFailedRequest(axios: AxiosInstance, store: IAuthStore) {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config } = error;
      console.error("axios error", { error, config, auth: { ...store.authData }, axios });
      if (!startsWith(config.url, "auth/", true) && [401 /*, 403*/].includes(error.response?.status)) {
        store.$patch({ authRequired: true });
        // will log user out when token expired and prompt login popup
        if (store.isAuthenticated) {
          await store.validateToken();
        }
      }
      return Promise.reject(error);
    }
  );
}
