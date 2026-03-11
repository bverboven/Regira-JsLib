import arrayUtility from "./array-utility";
import colorUtility from "./color-utility";
import datetimeUtility from "./datetime-utility";
import fileUtility from "./file-utility";
import htmlUtility from "./html-utility";
import httpUtility from "./http-utility";
import imageUtility from "./image-utility";
import numberUtility from "./number-utility";
import objectUtility from "./object-utility";
import promiseUtility from "./promise-utility";
import stringUtility from "./string-utility";
import clipboardUtility from "./clipboard-utility";
export { arrayUtility, colorUtility, datetimeUtility, fileUtility, htmlUtility, httpUtility, imageUtility, numberUtility, objectUtility, promiseUtility, stringUtility, clipboardUtility, };
declare const _default: {
    arrayUtility: {
        isArray: (items: unknown) => items is unknown[];
        isIterable: (items: unknown) => boolean;
        toArray: <T>(items: T[] | Iterable<T> | Record<string, T> | null | undefined) => T[];
        newArray: (length: number) => undefined[];
        orderBy: <T>(items: Iterable<T>, selector?: (x: T) => unknown) => T[];
        orderByDesc: <T>(items: Iterable<T>, selector?: (x: T) => unknown) => T[];
        naturalSort: <T>(items: Iterable<T>, selector?: (x: T) => unknown) => T[];
        shuffle: <T>(items: Iterable<T>) => T[];
        innerJoin: <T, U = T, R = T>(items1: Iterable<T>, items2: Iterable<U>, selector1?: (x: T) => unknown, selector2?: (x: U) => unknown, resultSelector?: (x: T, y: U) => R) => R[];
        groupBy: <T, K = unknown>(items: Iterable<T>, keySelector: (x: T, i?: number, arr?: T[]) => K) => [K, T[]][];
        groupJoin: <T, U, R = [T, U[]]>(parentItems: Iterable<T>, childItems: Iterable<U>, parentKeySelector?: (x: T, i?: number, arr?: T[]) => unknown, childSelector?: (x: U, i?: number, arr?: U[]) => unknown, resultSelector?: (parent: T, children: U[]) => R) => R[];
        count: <T>(items: Iterable<T>, predicate?: (x: T) => boolean) => number;
        first: <T>(items: Iterable<T>, predicate?: (x: T) => boolean) => T | undefined;
        last: <T>(items: Iterable<T>, predicate?: (x: T) => boolean) => T | undefined;
        distinctBy: <T>(items: Iterable<T>, selector: (x: T) => unknown) => T[];
        distinct: <T>(items: Iterable<T>) => T[];
        union: <T>(arr1: Iterable<T>, arr2: Iterable<T>) => T[];
        take: <T>(items: Iterable<T>, n: number) => T[];
        skip: <T>(items: Iterable<T>, n: number) => T[];
        page: <T>(items: Iterable<T>, pageSize: number, pageIndex?: number) => T[];
        countPages: (items: Iterable<unknown>, pageSize: number) => number;
        min: <T>(items: Iterable<T>, selector?: (x: T) => unknown) => (string | number | bigint | boolean) | null | undefined;
        max: <T>(items: Iterable<T>, selector?: (x: T) => unknown) => (string | number | bigint | boolean) | null | undefined;
        sum: <T>(items: Iterable<T>, selector?: (x: T) => number) => number;
        average: <T>(items: Iterable<T>, selector?: (x: T) => number) => number;
        toMap: <T, K, V = T>(items: Iterable<T>, keySelector: (x: T) => K, valueSelector?: (item: T, i?: number, map?: Map<K, V>) => V) => Map<K, V>;
        sameContent: <T>(items1: Iterable<T> | null | undefined, items2: Iterable<T> | null | undefined, includeOrder?: boolean) => boolean;
        query: <T>(items: Iterable<T>, filter: Partial<T>) => T[];
        getEnumerator: <T>(arr: T[]) => {
            selectedIndex: number;
            readonly length: number;
            readonly current: T | null;
            first(): void;
            previous(): boolean;
            next(): boolean;
            last(): void;
        };
        move: <T>(arr: T[], item: T, pos: number) => void;
        reFill: <T>(arr: T[], values: T[]) => void;
    };
    colorUtility: {
        rgbToHex: (r: any, g: any, b: any) => string;
        hexToRgb: (hex: any, opacity: any) => {
            r: number;
            g: number;
            b: number;
            a: any;
        } | null;
        hexToRgbString: (hex: any, opacity: any) => string | null;
        hexToRgbArray: (hex: any, opacity: any) => any[];
        getRgbString: (input: any, opacity: any) => any;
        invertRgb: (r: any, g: any, b: any) => {
            ri: number;
            gi: number;
            bi: number;
        };
        invertHex: (hex: any) => string;
        grayscale: (hex: any, type?: string) => string;
    };
    datetimeUtility: {
        isValidDate: (date: any) => boolean;
        timer: {
            last: number;
            log(dateToCompare: any): number;
        };
        countDown: (startDate: any, interval?: number) => {};
        stringifyDate: (date: any) => string | null;
    };
    fileUtility: {
        isFile: (item: unknown) => item is Blob;
        createUrl: (blob: Blob) => string;
        revokeUrl: (url: string) => void;
        getFilename: (uri: string) => string | undefined;
        getExtension: (filename: string) => string;
        getFilenameWithoutExtension: (uri: string | null | undefined) => string | null | undefined;
        toFormData: (files: Blob[], data: Record<string, unknown>, { filesParameterName }?: {
            filesParameterName?: string;
        }) => FormData;
        fileToBlob: (file: File, filename?: string, type?: string) => Promise<Blob & {
            name: string;
        }>;
        base64ToBlob: (base64: string, filename: string, type?: string) => Blob & {
            name: string;
        };
        urlToBlob: (url: string, filename?: string) => Promise<Blob & {
            name: string;
        }>;
        blobToBase64: (blob: Blob) => Promise<string>;
        readAllText: (blob: Blob) => Promise<string>;
        writeAllText: (content: string, filename?: string, type?: string) => Blob & {
            name: string;
        };
        saveAs: (blob: Blob & {
            name?: string;
        }, filename?: string) => void;
        formatFileSize: (bytes: number, si?: boolean, dp?: number) => string;
    };
    htmlUtility: {
        redirect: (url: any, delayInSeconds?: number) => void;
        setMetaTag: (name: any, content: any) => void;
        setCanonicalTag: (url: any) => void;
    };
    httpUtility: {
        isLocalHost: () => boolean;
        getHttpsUrl: (url: any) => any;
        forceHttps: (currentUrl: any) => void;
        toQueryString: (obj: any, includeNulls?: boolean) => any;
        getQueryStringParams: (url?: string) => {
            [k: string]: string;
        };
    };
    imageUtility: {
        contentTypes: {
            jpg: string;
            png: string;
            gif: string;
        };
        getImageContentType: (img: HTMLImageElement) => Promise<string | undefined>;
        parseContentType: (type: string | undefined) => string;
        urlToImage: (url: string) => Promise<unknown>;
        blobToImage: (blob: Blob) => Promise<unknown>;
        imageToBlob: (img: HTMLImageElement, filename?: string, _type?: string) => Promise<Blob & {
            name: string;
        }>;
        canvasToImage: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<unknown>;
        imageToCanvas: (img: HTMLImageElement, width?: number, height?: number) => HTMLCanvasElement;
        canvasToBlob: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<unknown>;
        base64ToImage: (data: string) => Promise<unknown>;
        imageToBase64: (img: HTMLImageElement, type?: string, quality?: number) => string;
        resizeByScale: (img: HTMLImageElement, scale: number, { quality, type }?: {
            quality?: number;
            type?: string;
        }) => Promise<unknown>;
        resize: (img: HTMLImageElement, maxSize: number | [number, number], { quality, type }?: {
            quality?: number;
            type?: string;
        }) => Promise<unknown>;
        rotate: (img: HTMLImageElement, direction?: number, type?: string) => Promise<unknown>;
        flipFlop: (img: HTMLImageElement, flip: boolean, flop: boolean, type?: string) => Promise<unknown>;
        convertType: (img: HTMLImageElement, targetType: string) => Promise<unknown>;
        getLightness: (img: HTMLImageElement) => number;
        white2transparent: (img: HTMLImageElement, tolerance: number) => Promise<unknown>;
    };
    numberUtility: {
        naturalCompare: (as: any, bs: any, f: any) => number;
        getRandom: (min?: number, max?: number) => number;
    };
    objectUtility: {
        isPlainObject: (obj: any) => boolean;
        flattenObject: (obj: any) => {};
        crawlObject: (obj: any, key: any) => any;
        mixin: (target: any, ...rest: any[]) => any;
        filterObject: (obj: any, filter: any) => any;
    };
    promiseUtility: {
        debounceToPromise: (func: any, wait?: number) => () => Promise<unknown>;
        enqueue: (arr: any) => Promise<any>;
        delay: (ms?: number) => Promise<unknown>;
    };
    stringUtility: {
        equals: (s1: string, s2: string, ignoreCase?: boolean) => boolean;
        contains: (s: string, searchString: string, ignoreCase?: boolean) => boolean;
        startsWith: (s: string, searchString: string, ignoreCase?: boolean) => boolean;
        endsWith: (s: string, searchString: string, ignoreCase?: boolean) => boolean;
        trimLeft: (s: string, chars?: string) => string;
        trimRight: (s: string, chars?: string) => string;
        trim: (s: string, chars?: string) => string;
        replaceAll: (s: string, find: string, replace: string) => string;
        randomize: typeof import("./string-utility").randomize;
        newGuid: typeof import("./string-utility").newGuid;
        isEmail: typeof import("./string-utility").isEmail;
        isIP: typeof import("./string-utility").isIP;
        isUrl: typeof import("./string-utility").isUrl;
        isPhone: typeof import("./string-utility").isPhone;
        isDate: typeof import("./string-utility").isDate;
        isPhysicalFolder: typeof import("./string-utility").isPhysicalFolder;
        isPhysicalPath: typeof import("./string-utility").isPhysicalPath;
        formatBelgianPhone: typeof import("./string-utility").formatBelgianPhone;
        htmlEncode: typeof import("./string-utility").htmlEncode;
        htmlDecode: typeof import("./string-utility").htmlDecode;
        normalizeDiacritics: typeof import("./string-utility").normalizeDiacritics;
        capitalize: (s: string) => string;
        toKebabCase: (s: string) => string;
        toSnakeCase: (s: string) => string;
        toTrainCase: (s: string) => string;
        toCamelCase: (s: string) => string;
        toPascalCase: (s: string) => string;
        slugify: (s: string) => string;
    };
    clipboardUtility: typeof clipboardUtility;
};
export default _default;
