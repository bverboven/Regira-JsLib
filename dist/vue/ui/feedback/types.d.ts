import type { IFeedback } from "./feedback"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $feedback: IFeedback
    }
}

export {}
