import { computed, ref } from "vue"
import { TreeList } from "../../../treelist"
import type { IConfig } from "../abstractions"
import type { INavItem, INavCore } from "./abstractions/types"
import NavGroup from "./NavGroup"
import NavItem from "./NavItem"

export function createNavGroup(input: { id: string; title: string }): INavCore {
    return Object.assign(new NavGroup(), input)
}
export function createNavItem(input: IConfig, parentId?: string): INavItem {
    return Object.assign(new NavItem(), {
        id: input.key,
        parentId: parentId ?? input.group,
        icon: input.name,
        routeName: `${input.name}Overview`,
        title: input.overviewTitle,
        description: input.description,
        initialQuery: input.initialQuery ?? {},
    })
}

type IImportDashboardInput = {
    groups: Array<{ id: string; title: string }>
    entities: Array<{ group: string; items: Array<string> }>
    configs: Array<IConfig>
    hasAccess: (config: IConfig) => boolean
}
export function importDashboard(input: IImportDashboardInput): Array<INavCore> {
    function findEntityConfig(key: string): IConfig | undefined {
        return input.configs.find((x) => x.key == key)
    }

    const navGroups = input.groups!.map((x) => createNavGroup(x))
    const navEntities = input.entities!.flatMap(({ group: parentId, items }) =>
        items
            .map((x) => findEntityConfig(x)!)
            .filter((config) => input.hasAccess(config))
            .map((config) => createNavItem(config, parentId))
    )
    return navGroups.concat(navEntities)
}
type IImportNavbarInput = {
    entities: Array<string>
    configs: Array<IConfig>
    hasAccess: (config: IConfig) => boolean
}
export function importNavbar(input: IImportNavbarInput) {
    function findEntityConfig(key: string): IConfig | undefined {
        return input.configs.find((x) => x.key == key)
    }
    return input
        .entities!.map((x) => findEntityConfig(x)!)
        .filter((config) => input.hasAccess(config))
        .map((config) => createNavItem(config))
}

export function buildNavigationTree(items: Array<INavCore>): TreeList<INavCore> {
    return new TreeList<INavCore>().init(items, (value, candidates) => candidates.filter((x) => x.id == value.parentId))
}

const entities = ref<Array<INavCore>>()
export function useNavigationTree(items: Array<INavCore>) {
    entities.value = items
    const tree = computed<TreeList<INavCore>>(() => buildNavigationTree(entities.value!))
    return {
        tree,
    }
}
