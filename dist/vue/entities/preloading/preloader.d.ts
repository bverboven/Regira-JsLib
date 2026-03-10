import type { EntityBase } from "../abstractions";
import type { App } from "vue";
declare function preload(types: Array<EntityBase & {
    name: string;
}>): Promise<unknown>;
declare function ready(): Promise<unknown>;
export declare const plugin: {
    install(_: App): void;
    preload: typeof preload;
    ready: typeof ready;
};
export declare function usePreloader(): {
    preload: typeof preload;
    ready: typeof ready;
};
export default plugin;
