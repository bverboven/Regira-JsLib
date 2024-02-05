import type { App } from "vue"

export const clickOutside = {
    beforeMount: (el: any, binding: any) => {
        el.clickOutsideEvent = (event: Event): void => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.addEventListener("click", el.clickOutsideEvent)
    },
    unmounted: (el: HTMLElement & { clickOutsideEvent(): void }): void => {
        document.removeEventListener("click", el.clickOutsideEvent)
    },
}

export default {
    install(app: App<Element>) {
        app.directive("clickOutside", clickOutside)
    },
}
