import { type IEntity, type ISearchObject } from "../abstractions";
import { type IListViewIn, type IListViewOut } from "./overview";
export declare function useListView<T extends IEntity, SO extends ISearchObject = ISearchObject>({ service, searchObject, defaultPageSize, debounceDelay, }: IListViewIn<T, SO>): IListViewOut<T, SO>;
export default useListView;
