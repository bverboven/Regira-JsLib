export declare const isPlainObject: (obj: unknown) => obj is Record<string, unknown>;
export declare const flattenObject: (obj: Record<string, unknown>) => Record<string, unknown>;
export declare const crawlObject: (obj: Record<string, unknown>, key: string) => unknown;
export declare const removeEmpty: (obj: Record<string, unknown>) => Record<string, unknown>;
export declare const deepCopy: <T>(obj: T) => T;
export declare const mixin: <T extends Record<string, unknown>>(target: T, ...rest: Record<string, unknown>[]) => T;
export declare const filterObject: (obj: Record<string, unknown>, filter: Record<string, unknown>) => boolean;
declare const _default: {
    isPlainObject: (obj: unknown) => obj is Record<string, unknown>;
    flattenObject: (obj: Record<string, unknown>) => Record<string, unknown>;
    crawlObject: (obj: Record<string, unknown>, key: string) => unknown;
    mixin: <T extends Record<string, unknown>>(target: T, ...rest: Record<string, unknown>[]) => T;
    filterObject: (obj: Record<string, unknown>, filter: Record<string, unknown>) => boolean;
};
export default _default;
