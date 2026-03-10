import type { INavCore } from "./abstractions/types";
export declare class NavGroup implements INavCore {
    id: string;
    title: string;
    parentId?: string;
    icon?: string;
}
export default NavGroup;
