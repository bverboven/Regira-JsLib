import { useConfig } from "@/app-config"
import { ref, computed, type App, type WritableComputedRef } from "vue"
import Display from "./Display"

export default {
    install(app: App<Element>) {
        let enableDebug = ref(true)
        const { isDebug: appDebug } = useConfig()
        // when using computed here, use *.value in the template

        app.component("Debug", Display)
        app.config.globalProperties.$isDebug = computed<boolean>({
            get() {
                const router = app.config.globalProperties.$router
                const queryDebug = router.currentRoute.value.query?.debug
                return enableDebug.value && (typeof queryDebug !== "undefined" ? queryDebug === "1" : appDebug)
            },
            set(value) {
                enableDebug.value = !!value
            },
        }) as WritableComputedRef<boolean>
    },
}
