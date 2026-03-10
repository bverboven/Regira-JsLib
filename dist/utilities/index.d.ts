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
        isArray: (items: any) => items is any[];
        isIterable: (items: any) => boolean;
        toArray: (items: any) => any[];
        newArray: (length: any) => any[];
        orderBy: (items: any, selector?: (x: any) => any) => any[];
        orderByDesc: (items: any, selector?: (x: any) => any) => any[];
        naturalSort: (items: any, selector?: (x: any) => any) => any[];
        shuffle: (items: any) => any[];
        innerJoin: (items1: any, items2: any, selector1?: (x: any) => any, selector2?: (x: any) => any, resultSelector?: (x: any) => any) => any[];
        groupBy: (items: any, keySelector: any) => any[][];
        groupJoin: (parentItems: any, childItems: any, parentKeySelector?: (x: any) => any, childSelector?: (x: any) => any, resultSelector?: (parent: any, children: any) => any[]) => any[][];
        count: (items: any, predicate: any) => number;
        first: (items: any, predicate: any) => any;
        last: (items: any, predicate: any) => any;
        distinctBy: (items: any, selector: any) => any;
        distinct: (items: any) => unknown[];
        union: (arr1: any, arr2: any) => unknown[];
        take: (items: any, n: any) => any[];
        skip: (items: any, n: any) => any[];
        page: (items: any, pageSize: any, pageIndex?: number) => any[];
        countPages: (items: any, pageSize: any) => number;
        min: (items: any, selector?: (x: any) => any) => any;
        max: (items: any, selector?: (x: any) => any) => any;
        sum: (items: any, selector?: (x: any) => any) => any;
        average: (items: any, selector: any) => number;
        toMap: (items: any, keySelector: any, valueSelector?: (x: any) => any) => any;
        sameContent: (items1: any, items2: any, includeOrder?: boolean) => boolean;
        query: (items: any, filter: any) => any[];
        getEnumerator: (arr: any) => {
            selectedIndex: number;
            readonly length: any;
            readonly current: any;
            first(): void;
            previous(): boolean;
            next(): boolean;
            last(): void;
        };
        move: (arr: any, item: any, pos: any) => void;
        reFill: (arr: any, values: any) => void;
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
        isFile: (item: any) => item is Blob;
        createUrl: (blob: any) => string;
        revokeUrl: (url: any) => void;
        getFilename: (uri: any) => any;
        getExtension: (filename: any) => string;
        getFilenameWithoutExtension: (uri: any) => any;
        toFormData: (files: any, data: any, { filesParameterName }?: {
            filesParameterName?: string | undefined;
        }) => any;
        fileToBlob: (file: any, filename: any, type: any) => Promise<unknown>;
        base64ToBlob: (base64: any, filename: any, type: any) => Blob;
        urlToBlob: (url: any, filename: any) => Promise<Blob>;
        blobToBase64: (blob: any) => Promise<unknown>;
        readAllText: (blob: any) => Promise<unknown>;
        writeAllText: (content: any, filename: any, type: any) => Blob;
        saveAs: (blob: Blob & {
            name?: string;
        }, filename?: string) => any;
        formatFileSize: (bytes: any, si?: boolean, dp?: number) => string;
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
        getImageContentType: (img: any) => Promise<unknown>;
        parseContentType: (type: any) => any;
        urlToImage: (url: any) => Promise<unknown>;
        blobToImage: (blob: any) => Promise<unknown>;
        imageToBlob: (img: any, filename: any, type: any) => Promise<Blob>;
        canvasToImage: (canvas: any, type?: string, quality?: number) => Promise<unknown>;
        imageToCanvas: (img: any, width: any, height: any) => HTMLCanvasElement;
        canvasToBlob: (canvas: any, type?: string, quality?: number) => Promise<unknown>;
        base64ToImage: (data: any) => Promise<unknown>;
        imageToBase64: (img: any, type?: string, quality?: number) => string;
        resizeByScale: (img: any, scale: any, { quality, type }?: {
            quality?: number | undefined;
            type?: string | undefined;
        }) => Promise<unknown>;
        resize: (img: any, maxSize: any, { quality, type }?: {
            quality?: number | undefined;
            type?: string | undefined;
        }) => Promise<unknown>;
        rotate: (img: any, direction?: number, type?: string) => Promise<unknown>;
        flipFlop: (img: any, flip: any, flop: any, type?: string) => Promise<unknown>;
        convertType: (img: any, targetType: any) => Promise<unknown>;
        getLightness: (img: any) => number;
        white2transparent: (img: any, tolerance: any) => Promise<unknown>;
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
