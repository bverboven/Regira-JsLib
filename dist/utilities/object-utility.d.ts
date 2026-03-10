export declare const isPlainObject: (obj: any) => boolean;
export declare const flattenObject: (obj: any) => {};
export declare const crawlObject: (obj: any, key: any) => any;
export declare const removeEmpty: (obj: any) => any;
export declare const deepCopy: (obj: any) => any;
export declare const mixin: (target: any, ...rest: any[]) => any;
export declare const filterObject: (obj: any, filter: any) => any;
declare const _default: {
    isPlainObject: (obj: any) => boolean;
    flattenObject: (obj: any) => {};
    crawlObject: (obj: any, key: any) => any;
    mixin: (target: any, ...rest: any[]) => any;
    filterObject: (obj: any, filter: any) => any;
};
export default _default;
