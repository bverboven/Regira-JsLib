import type { IIconProvider } from "./plugin"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $icons: IIconProvider
    }
}

export {}
