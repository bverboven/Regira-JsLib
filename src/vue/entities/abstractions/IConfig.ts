export enum NavTypes {
    dashboard = "Dashboard",
    navbar = "Navbar",
}

export interface IConfig extends Record<string, any> {
    name: string
    key: string

    routePrefix: string
    baseQueryParams?: Record<string, any>
    initialQuery?: Record<string, any>

    overviewTitle?: string
    detailsTitle?: string
    description?: string
    icon?: string

    defaultPageSize: number

    api: string
    detailsUrl?: string
    listUrl?: string
    searchUrl?: string
    saveUrl?: string
    deleteUrl?: string
}
