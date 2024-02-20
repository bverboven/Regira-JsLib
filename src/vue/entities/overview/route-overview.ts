//import { debounce } from "lodash"
import { watch, onMounted, type Ref, type WatchStopHandle } from "vue"
import { useRouter } from "vue-router"
import { parseQueryParams, cleanQueryParams } from "../utilities/query"
import { DEFAULT_PAGESIZE, type IPagingInfo, type ISearchObject } from "../abstractions"

export type RouteOverviewIn<SO extends ISearchObject = ISearchObject> = {
    pagingInfo: Ref<IPagingInfo>
    searchObject: Ref<SO>
    defaultPageSize?: number
    handler(): Promise<void>
}
export type RouteOverviewOut = {
    updateOverviewRoute(resetPaging?: boolean): void
    routeSearchHandler(): Promise<void>
    routeWatcher: WatchStopHandle
}

export function useRouteOverview({ pagingInfo, searchObject, defaultPageSize = DEFAULT_PAGESIZE, handler }: RouteOverviewIn): RouteOverviewOut {
    const router = useRouter()

    function updateOverviewRoute(resetPaging = false): void {
        console.debug("updateOverviewRoute", { resetPaging })
        if (resetPaging && pagingInfo != null) {
            pagingInfo.value = {
                ...pagingInfo?.value,
                page: 1,
            }
        }

        const currentRoute = router.currentRoute.value

        // remove empty parameters (null) from query
        const query = cleanQueryParams(
            {
                ...currentRoute.query, // values that should be removed should explicitly be overwritten by <<null>> in searchObject
                ...searchObject.value,
                ...(pagingInfo.value || {}),
            },
            defaultPageSize
        )

        const route = {
            ...currentRoute,
            query,
        }
        router.push(route)
    }

    async function routeSearchHandler(): Promise<void> {
        const { searchObject: so, pagingInfo: pi } = parseQueryParams(router.currentRoute.value.query)
        if (!pi.page) {
            pi.page = 1
        }
        if (!pi.pageSize && defaultPageSize > 0) {
            pi.pageSize = defaultPageSize
        }
        if (searchObject.value != null) {
            searchObject.value = so
        }
        if (pagingInfo.value != null) {
            pagingInfo.value = pi
        }
        console.debug("routeSearchHandler", { route: router.currentRoute.value, searchObject, pagingInfo })
        await handler()
    }

    const routeWatcher = watch(router.currentRoute, async (newRoute, oldRoute) => {
        // only when staying on the same page
        if (newRoute.name === oldRoute.name) {
            await routeSearchHandler()
        }
    })

    onMounted(routeSearchHandler)

    return {
        updateOverviewRoute,//: debounce(updateOverviewRoute, 50),
        routeSearchHandler,
        routeWatcher,
    }
}

export default useRouteOverview
