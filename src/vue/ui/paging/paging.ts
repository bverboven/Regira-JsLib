import type { IPagingInfo } from "../../entities/abstractions/PagingInfo";
import { computed, type ComputedRef, type Ref } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { PAGING_DEFAULTS } from "./defaults";

export enum ButtonType {
  anchor = "Anchor",
  button = "Button",
}
export type PagingEmits = {
  (e: "update:modelValue", args: any): void;
  (e: "change", args: any): void;
};
export type PagingProps = {
  modelValue: IPagingInfo;
  count: number;
  maxPages?: number;
  buttonType?: ButtonType;
};
export const pagingDefaults = {
  maxPages: 9,
  buttonType: ButtonType.anchor,
};

export type PagingIn = {
  pagingInfo: Ref<IPagingInfo>;
  count: Ref<number>;
  maxPages: number;
  emit: PagingEmits;
};
export type PagingOut = {
  pagedRoute(p: number): string;
  page: ComputedRef<number>;

  totalPages: ComputedRef<number>;
  totalVisiblePages: ComputedRef<number>;
  firstPage: ComputedRef<number>;
  lastPage: ComputedRef<number>;
  pages: ComputedRef<Array<number>>;

  handleChangePage(newPage: number): void;
};

export default function usePaging({ pagingInfo, count, maxPages, emit }: PagingIn): PagingOut {
  //const { modelValue = { page: 1, pageSize: PAGING_DEFAULTS.PAGESIZE }, count, maxPages = 9 } = props;
  maxPages = window.innerWidth < 576 ? Math.ceil(maxPages / 2) : maxPages;

  const defaultPageSize = computed(() => (!isNaN(parseInt(pagingInfo.value.pageSize + "")) ? pagingInfo.value.pageSize : null) || PAGING_DEFAULTS.PAGESIZE);

  const router = useRouter();
  function pagedRoute(p: number): string {
    const { name, path, hash, query } = router.currentRoute.value;
    const currentRoute = { name, path, hash, query };
    const route: RouteLocationRaw = {
      name: currentRoute.name || undefined,
      query: {
        ...currentRoute.query,
        page: p,
      },
    };
    if (p <= 1) {
      delete route.query!.p;
    }
    return router.resolve(route).fullPath;
  }
  const page = computed(() => pagingInfo.value.page || 1);
  const totalPages = computed(() => Math.ceil(count.value / defaultPageSize.value));
  const totalVisiblePages = computed(() => Math.min(totalPages.value, maxPages));
  const firstPage = computed(() => {
    const halfPages = Math.floor(totalVisiblePages.value / 2);
    let firstPage = Math.max(page.value - halfPages, 1);
    if (firstPage + maxPages > totalPages.value) {
      firstPage -= firstPage + maxPages - totalPages.value - 1;
    }
    return Math.max(firstPage, 1);
  });
  const lastPage = computed(() => Math.min(firstPage.value + totalVisiblePages.value, totalPages.value));
  const pages = computed(() => {
    return !isNaN(totalVisiblePages.value) && totalVisiblePages.value > 0
      ? Array(totalVisiblePages.value)
          .fill(0)
          .map((_, i) => firstPage.value + i)
          .filter((x) => x <= lastPage.value)
      : [];
  });

  function handleChangePage(newPage: number): void {
    const modelValue = {
      ...pagingInfo.value,
      page: newPage,
    };

    emit("update:modelValue", modelValue);
    emit("change", modelValue);
  }

  // console.debug("usePaging", {
  //     page,
  //     count,
  //     defaultPageSize,
  //     totalPages,
  //     totalVisiblePages,
  //     firstPage,
  //     lastPage,
  //     pages,
  // })

  return {
    pagedRoute,
    page,

    totalPages,
    totalVisiblePages,
    firstPage,
    lastPage,
    pages,

    handleChangePage,
  };
}
