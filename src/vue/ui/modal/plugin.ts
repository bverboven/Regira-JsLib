import type { App } from "vue"
import FallbackModal from "./DefaultModal.vue"

export default {
    install(app: App<Element>, { DefaultModal } = { DefaultModal: FallbackModal }) {
        app.component("MyModal", DefaultModal)
    },
}
