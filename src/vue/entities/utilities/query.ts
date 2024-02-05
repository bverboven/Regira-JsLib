import type { IPagingInfo } from "../abstractions/PagingInfo"

export function cleanQueryParams(queryParams: Record<string, any>, defaultPageSize: number): Record<string, any> {
    return Object.fromEntries(
        Object.entries(queryParams).filter(([key, value]) => {
            return (
                value != null &&
                // no private values (like $meta)
                key[0] != "$" &&
                (key !== "page" || value > 1)
                //&& (key !== "pageSize" || (value > 0 && value !== defaultPageSize))
            )
        })
    )
}
export function parseQueryParams(queryParams: Record<string, any>): Record<string, any> {
    const { page, pageSize, ...searchObject } = queryParams
    const pagingInfo: IPagingInfo = {
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize),
    }
    return { searchObject, pagingInfo }
}