import type { IConfigWithKey } from "@/vue/entities"

export type DashboardItem = {
    name: string
    title: string
    icon: string
    description?: string
    initialQuery?: Record<string, any>
}

export function toDashboardItem(config: IConfigWithKey) {
    return {
        name: `${config.id}Overview`,
        title: config.overviewTitle || `${config.key}`,
        icon: config.id,
        description: config.description,
        initialQuery: config.initialQuery,
    }
}
