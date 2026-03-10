export declare const isLocalHost: () => boolean;
export declare const isHttps: (url: any) => boolean;
export declare const getHttpsUrl: (url: any) => any;
export declare const forceHttps: (currentUrl: any) => void;
export declare function tryCreateValidURL(input: any): any;
export declare const toAbsoluteUrl: (relative: any, baseUrl?: null) => any;
export declare const toQueryString: (obj: any, includeNulls?: boolean) => any;
export declare const getQueryStringParams: (url?: string) => {
    [k: string]: string;
};
declare const _default: {
    isLocalHost: () => boolean;
    getHttpsUrl: (url: any) => any;
    forceHttps: (currentUrl: any) => void;
    toQueryString: (obj: any, includeNulls?: boolean) => any;
    getQueryStringParams: (url?: string) => {
        [k: string]: string;
    };
};
export default _default;
