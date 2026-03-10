export declare const DEFAULT_PAGESIZE = 10;
export interface IPagingInfo {
    pageSize?: number;
    page?: number;
}
export declare class PagingInfo implements IPagingInfo {
    page: number;
    pageSize: number;
    constructor(pageSize?: number, page?: number);
}
export default PagingInfo;
