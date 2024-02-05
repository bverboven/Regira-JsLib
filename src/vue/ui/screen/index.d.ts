declare module "@vue/runtime-core" {
    import type { IScreen } from "./screen"
    interface ComponentCustomOptions {
        $screen: IScreen
    }
}