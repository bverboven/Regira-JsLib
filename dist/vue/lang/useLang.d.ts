import { type ITranslationMessages, type ITranslationMessage } from "./translate";
import type { IFormatInput } from "./formatText";
export declare function useLang(): {
    langCode: import("vue").Ref<string, string>;
    fallbackLangCode: import("vue").Ref<string, string>;
    messages: import("vue").Ref<ITranslationMessages, ITranslationMessages>;
    translate: (key: string, formatArgs?: IFormatInput) => string;
    translateMessage: (message: ITranslationMessage, formatArgs?: IFormatInput) => string;
    setLangCode(newValue: string): void;
    replaceMessages: (newValue: ITranslationMessages) => ITranslationMessages;
    loadMessages: (values: ITranslationMessages) => {
        [x: string]: ITranslationMessage;
    };
};
export default useLang;
