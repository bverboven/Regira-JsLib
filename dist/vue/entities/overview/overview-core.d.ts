import { type IEntity, type ISearchObject } from "../abstractions";
import type { OverviewCoreIn, OverviewCoreOut } from "./overview";
export declare function useOverviewCore<T extends IEntity, SO extends ISearchObject = ISearchObject>({ service, searchObject, defaultPageSize, }: OverviewCoreIn<T, SO>): OverviewCoreOut<T, SO>;
export default useOverviewCore;
