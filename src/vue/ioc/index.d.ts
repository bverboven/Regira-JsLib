import type { IServiceProvider } from "./ServiceProvider"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $services: IServiceProvider
    }
}

export {}
