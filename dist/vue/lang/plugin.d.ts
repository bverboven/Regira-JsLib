import { type App } from "vue";
import { type ITranslationMessages } from "./translate";
type IMessageLoader = () => Promise<ITranslationMessages>;
type IOptions = {
    defaultLang?: string;
    messages: ITranslationMessages | IMessageLoader;
};
export declare const plugin: {
    install(app: App, options: IOptions): void;
};
export {};
