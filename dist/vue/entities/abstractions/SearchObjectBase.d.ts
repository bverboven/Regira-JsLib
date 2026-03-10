import type { ISearchObject } from "../../entities";
export declare abstract class SearchObjectBase implements ISearchObject {
    q?: string;
}
export declare class DefaultSearchObject extends SearchObjectBase {
}
export default SearchObjectBase;
