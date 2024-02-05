import { onMounted, watch, getCurrentInstance } from "vue"
import useAppStore from "./store"

export function onAppReady(func: Function) {
    const appStore = useAppStore()
    watch(
        () => appStore.isReady,
        () => func()
    )
    const cmp = getCurrentInstance()
    if (cmp) {
        onMounted(() => {
            console.debug("appReady.mounted", { appStore, isReady: appStore.isReady })
            if (appStore.isReady) {
                func()
            }
        })
    }
}
export function whenAppReady(): Promise<void> {
    return new Promise<void>((resolve) => {
        let isExecuted = false
        const appStore = useAppStore()
        return appStore.isReady
            ? resolve()
            : onAppReady(() => {
                  if (!isExecuted) {
                      resolve()
                      isExecuted = true
                  }
              })
    })
}
