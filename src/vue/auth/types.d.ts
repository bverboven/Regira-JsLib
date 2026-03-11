declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $auth: import("./auth").IGlobalAuth | { enabled: false }
    }
}

export {}
