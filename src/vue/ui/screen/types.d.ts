declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $screen: import("./screen").IScreen
    }
}

export {}