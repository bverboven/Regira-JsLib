export interface INavCore {
    id: string
    parentId?: string
    title: string
    shortTitle?: string
    icon: string
}
export interface IRoutingNavItem {
    routeName: string
    initialQuery?: Record<string, any>
}
export interface INavItem extends INavCore, IRoutingNavItem {}
