import type { App } from "vue";
import { type IServiceProvider } from "./ServiceProvider";
export declare const plugin: {
    install(app: App<Element>, { configure }?: {
        configure?(services: IServiceProvider): IServiceProvider;
    }): void;
};
export default plugin;
