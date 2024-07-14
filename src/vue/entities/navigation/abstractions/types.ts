export interface INavCore {
    id: string
    title: string
    parentId?: string
}
export interface IDescribingNavItem {
    icon: string
    description?: String
}
export interface IRoutingNavItem {
    routeName: string
    initialQuery?: Record<string, any>
}
export interface INavItem extends INavCore, IDescribingNavItem, IRoutingNavItem {
}
