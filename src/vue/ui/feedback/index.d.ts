declare module "@vue/runtime-core" {
    import type { IFeedback } from "./feedback"
    interface ComponentCustomOptions {
        $feedback: IFeedback
    }
}
