import type { ITranslationMessage } from "./translate"
import type { IFormatInput } from "./formatText"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $t: (key: string, formatArgs?: IFormatInput) => string | false
        $tm: (message: ITranslationMessage, formatArgs?: IFormatInput) => string
    }
}

export {}
