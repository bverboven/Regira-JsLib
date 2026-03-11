declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $isDebug: boolean
        $setDebug: (value?: boolean) => boolean
    }
}

export {}
