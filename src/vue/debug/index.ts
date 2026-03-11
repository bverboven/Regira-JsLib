export { default as Debug } from "./Display.vue"
export { default, default as plugin } from "./plugin"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $isDebug: boolean
        $setDebug: (value?: boolean) => boolean
    }
}
