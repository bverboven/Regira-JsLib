import type { Store } from "pinia";
import type { Router } from "vue-router";
declare const _default: ({ router, store }: {
    router: Router;
    store: Store & {
        isAuthenticated: boolean;
        hasPermission(value: string): boolean;
    };
}) => void;
export default _default;
