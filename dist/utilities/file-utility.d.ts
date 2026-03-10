export declare const browse: ({ multiple, accept }?: {}) => Promise<unknown>;
export declare const isFile: (item: any) => item is Blob;
export declare const createUrl: (blob: any) => string;
export declare const revokeUrl: (url: any) => void;
export declare const getFilename: (uri: any) => any;
export declare const getExtension: (filename: any) => string;
export declare const getFilenameWithoutExtension: (uri: any) => any;
export declare const toFormData: (files: any, data: any, { filesParameterName }?: {
    filesParameterName?: string | undefined;
}) => any;
export declare const fileToBlob: (file: any, filename: any, type: any) => Promise<unknown>;
export declare const base64ToBlob: (base64: any, filename: any, type: any) => Blob;
export declare const urlToBlob: (url: any, filename: any) => Promise<Blob>;
export declare const blobToBase64: (blob: any) => Promise<unknown>;
export declare const readAllText: (blob: any) => Promise<unknown>;
export declare const writeAllText: (content: any, filename: any, type: any) => Blob;
export declare const saveAs: (blob: Blob & {
    name?: string;
}, filename?: string) => any;
export declare const formatFileSize: (bytes: any, si?: boolean, dp?: number) => string;
export declare const dropHandler: (e: any) => any[];
declare const _default: {
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
export default _default;
