import type { Ref } from "vue"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $isOnline: Ref<boolean>
    }
}

export {}
