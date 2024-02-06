import { ref, computed, type App, type WritableComputedRef } from "vue";
import Display from "./Display.vue";

export default {
  install(app: App<Element>, options: { isDebug: boolean }) {
    let enableDebug = ref(true);
    // when using computed here, use *.value in the template

    app.component("Debug", Display);
    app.config.globalProperties.$isDebug = computed<boolean>({
      get() {
        const router = app.config.globalProperties.$router;
        const queryDebug = router.currentRoute.value.query?.debug;
        return enableDebug.value && (typeof queryDebug !== "undefined" ? queryDebug === "1" : options.isDebug);
      },
      set(value) {
        enableDebug.value = !!value;
      },
    }) as WritableComputedRef<boolean>;
  },
};
