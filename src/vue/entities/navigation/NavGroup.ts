import type { INavCore } from "./abstractions/types"

export class NavGroup implements INavCore {
    id!: string
    title!: string
    parentId?: string
}

export default NavGroup
