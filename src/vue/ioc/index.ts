export { default, ServiceProvider, get, type IServiceProvider } from "./ServiceProvider"
export { plugin } from "./plugin"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $services: import("./ServiceProvider").IServiceProvider
    }
}
