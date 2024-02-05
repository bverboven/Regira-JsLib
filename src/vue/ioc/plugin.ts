import type { App } from "vue"
import defaultServiceProvider, { type IServiceProvider } from "./ServiceProvider"

export const plugin = {
    install(app: App<Element>, { configure }: { configure?(services: IServiceProvider): IServiceProvider } = {}) {
        app.config.globalProperties.$services = defaultServiceProvider
        app.provide("services", defaultServiceProvider)
        if (configure) {
            configure(defaultServiceProvider)
        }
    },
}

export default plugin
