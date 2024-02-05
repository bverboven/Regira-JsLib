export interface ITab {
    key: string
    icon?: string
    title: string
    isDefault: boolean
    isDisabled: boolean
    isVisible: boolean | (() => boolean)
}

export class Tab implements ITab {
    key: string
    icon?: string
    title: string
    isDefault: boolean
    isDisabled: boolean
    isVisible: boolean | (() => boolean)
    constructor(title: string, key: string = title, isDefault: boolean = false, isDisabled: boolean = false, isVisible = true) {
        this.title = title
        this.key = key
        this.isDefault = isDefault
        this.isDisabled = isDisabled
        this.isVisible = isVisible
    }

    static create(title: string, values?: object) {
        return Object.assign(new Tab(title), values || {})
    }
}
