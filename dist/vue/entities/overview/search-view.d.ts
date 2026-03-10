import { type IEntity, type ISearchObject } from "../abstractions";
import { type IListViewIn, type ISearchViewOut } from "./overview";
export declare function useSearchView<T extends IEntity, SO extends ISearchObject = ISearchObject>({ service, searchObject, defaultPageSize, debounceDelay, }: IListViewIn<T, SO>): ISearchViewOut<T, SO>;
export default useSearchView;
