export interface IEntity {
    get $id(): number | string
    get $title(): string | undefined
}
