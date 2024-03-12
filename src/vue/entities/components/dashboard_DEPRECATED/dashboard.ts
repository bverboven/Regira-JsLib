import type { IConfig } from "../.."

export type IDashboardItem = {
    name: string
    title: string
    icon: string
    description?: string
    initialQuery?: Record<string, any>
}

export function toDashboardItem(config: IConfig): IDashboardItem {
    return {
        name: `${config.id}Overview`,
        title: config.overviewTitle || `${config.id}`,
        icon: config.id,
        description: config.description,
        initialQuery: config.initialQuery,
    }
}
