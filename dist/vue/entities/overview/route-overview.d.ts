import { type Ref, type WatchStopHandle } from "vue";
import { type IPagingInfo, type ISearchObject } from "../abstractions";
export type RouteOverviewIn<SO extends ISearchObject = ISearchObject> = {
    pagingInfo: Ref<IPagingInfo>;
    searchObject: Ref<SO>;
    defaultPageSize?: number;
    handler(): Promise<void>;
};
export type RouteOverviewOut = {
    updateOverviewRoute(resetPaging?: boolean): void;
    routeSearchHandler(): Promise<void>;
    routeWatcher: WatchStopHandle;
};
export declare function useRouteOverview({ pagingInfo, searchObject, defaultPageSize, handler }: RouteOverviewIn): RouteOverviewOut;
export default useRouteOverview;
