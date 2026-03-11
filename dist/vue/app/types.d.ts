import type { AppStatus } from "./store"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $culture: string
        $setCulture: (value: string) => void
        $isReady: boolean
        $appStatus: AppStatus
        $setAppStatus: (value: AppStatus) => void
    }
}

export {}
