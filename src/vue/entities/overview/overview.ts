import type { IPagingInfo, IEntity, IConfig, ISearchObject, IEntityService, SaveResult } from "../abstractions"
import type { FeedbackOut, FeedbackError } from "@/vue_modules/ui/feedback"
import type { Ref } from "vue"

export const DEFAULT_DEBOUNCE = 250

export interface OverviewEmits<T extends IEntity, SO extends ISearchObject = ISearchObject> {
    (e: "update:modelValue", args: Array<T>): void
    (e: "update:searchObject", args: SO): void
    (e: "update:pagingInfo", args: IPagingInfo): void
    (e: "save", args: SaveResult<T>): void | Promise<void>
    (e: "remove", item: T): void | Promise<void>
    (e: "request-save", item: T): void | Promise<void>
    (e: "request-remove", item: T): void | Promise<void>
}
export interface OverviewProps<T extends IEntity> {
    modelValue: Array<T>
    config: IConfig
    title: string
    service: IEntityService<T>
}

export type OverviewError = { response: { data?: { errors: FeedbackError } } }

export type OverviewCoreIn<T extends IEntity, SO extends ISearchObject = ISearchObject> = {
    service: IEntityService<T>
    searchObject: SO
    defaultPageSize?: number
}
export type OverviewCoreOut<T extends IEntity, SO extends ISearchObject = ISearchObject> = {
    searchObject: Ref<SO>
    pagingInfo: Ref<IPagingInfo>
    items: Ref<Array<T>>
    itemsCount: Ref<number | undefined>

    isLoading: Ref<boolean>
    feedback: FeedbackOut

    applySave(item: T): Promise<SaveResult<T> | null>
    applyRemove(item: T): Promise<void>
    handleSave({ saved, isNew }: SaveResult<T>): void
    handleRemove(item: T): void
    resetPage(): void
}

export interface IListViewIn<T extends IEntity, SO extends ISearchObject = ISearchObject> extends OverviewCoreIn<T, SO> {
    debounceDelay?: number
}
export interface IListViewOut<T extends IEntity, SO extends ISearchObject = ISearchObject> extends OverviewCoreOut<T, SO> {
    listHandler(): Promise<void>
    debouncedListHandler(): Promise<void>
}

export interface ISearchViewOut<T extends IEntity, SO extends ISearchObject = ISearchObject> extends OverviewCoreOut<T, SO> {
    searchHandler(resetPaging?: boolean): Promise<void>
    debouncedSearchHandler(): Promise<void>
}
