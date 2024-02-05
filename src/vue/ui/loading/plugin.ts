import type { App } from "vue"
import LoadingButton from "./LoadingButton.vue"
import LoadingContainer from "./LoadingContainer.vue"

export default {
    install(app: App<Element>) {
        app.component("LoadingButton", LoadingButton)
        app.component("LoadingContainer", LoadingContainer)
    },
}
