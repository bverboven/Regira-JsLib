export enum NavTypes {
    dashboard = "Dashboard",
    navbar = "Navbar",
}

export interface IConfig extends Record<string, any> {
    key: string

    routePrefix: string
    baseQueryParams?: Record<string, any>
    initialQuery?: Record<string, any>

    overviewTitle?: string | Record<string, string>
    detailsTitle?: string | Record<string, string>
    description?: string | Record<string, string>
    icon?: string

    defaultPageSize: number

    api: string
    detailsUrl?: string
    listUrl?: string
    searchUrl?: string
    saveUrl?: string
    deleteUrl?: string
}
