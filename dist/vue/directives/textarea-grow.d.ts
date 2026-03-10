import type { App } from "vue";
type Options = {
    maxGrow: number;
};
export declare const grow: {
    beforeMount(el: HTMLTextAreaElement): void;
    unmounted: (el: HTMLTextAreaElement) => void;
};
declare const _default: {
    install(app: App<Element>, options?: Options): void;
};
export default _default;
