export interface ITab {
    key: string;
    icon?: string;
    title: string;
    isDefault: boolean;
    isDisabled: boolean;
    isVisible: boolean | (() => boolean);
}
export declare class Tab implements ITab {
    key: string;
    icon?: string;
    title: string;
    isDefault: boolean;
    isDisabled: boolean;
    isVisible: boolean | (() => boolean);
    constructor(title: string, key?: string, isDefault?: boolean, isDisabled?: boolean, isVisible?: boolean);
    static create(title: string, values?: object): Tab & object;
}
