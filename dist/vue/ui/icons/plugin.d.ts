import type { App } from "vue";
type Options = {
    icons?: Record<string, string>;
    clearFirst?: boolean;
    source?: "bs" | "fa";
};
export type IIconProvider = {
    add: (key: string, icon: string) => void;
};
declare const _default: {
    install(app: App<Element>, { icons, clearFirst, source }?: Options): void;
};
export default _default;
