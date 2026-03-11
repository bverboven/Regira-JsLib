export { useLang } from "./useLang"
export { plugin } from "./plugin"
export { translate, translateMessage, type ITranslationMessages, type ITranslationMessage } from "./translate"
export { formatText, type IFormatInput } from "./formatText"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $t: (key: string, formatArgs?: import("./formatText").IFormatInput) => string
        $tm: (message: import("./translate").ITranslationMessage, formatArgs?: import("./formatText").IFormatInput) => string
    }
}
