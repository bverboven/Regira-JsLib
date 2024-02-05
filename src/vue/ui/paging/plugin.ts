import Paging from "./Paging.vue";
import { PAGING_DEFAULTS } from "./defaults";
import type { App } from "vue";

export default {
  install(app: App<Element>, { defaultPageSize = 10 } = {}) {
    PAGING_DEFAULTS.PAGESIZE = defaultPageSize;

    app.component("Paging", Paging);
  },
};
