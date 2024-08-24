import type { IEntity } from "./IEntity"
import type { IPagingInfo } from "./PagingInfo"
import type { ISortByInfo } from "./SortByInfo"

export type DetailsResult<T> = { item: T; duration?: number }
export type ListResult<T> = { items: Array<T>; duration?: number }
export type SearchResult<T> = { items: Array<T>; count: number; duration?: number }
export type SavedResult<T> = { item: T; isNew: boolean; duration?: number }
export type SaveResult<T> = { saved: T; isNew: boolean; affected?: number; duration?: number }
export type DeleteResult<T> = { item: T; affected?: number; duration?: number }

export interface IEntityService<T extends IEntity = IEntity> {
    details(id: number | string): Promise<T | null>
    list(so?: object): Promise<Array<T>>
    search(so?: object): Promise<SearchResult<T>>
    searchUnion(searchObjects: Array<object>, extra?: IPagingInfo | ISortByInfo): Promise<SearchResult<T>>

    save(item: T): Promise<SaveResult<T>>
    remove(item: T): Promise<void>

    toEntity(item: object): T
    newEntity(values?: Record<string, any>): Promise<T>
}
