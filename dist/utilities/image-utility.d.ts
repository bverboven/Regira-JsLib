export declare const contentTypes: {
    jpg: string;
    png: string;
    gif: string;
};
export declare const getImageContentType: (img: any) => Promise<unknown>;
export declare const parseContentType: (type: any) => any;
export declare const createCanvas: (width: any, height: any, options?: {
    backgroundColor: string;
    imageSmoothingEnabled: boolean;
}) => HTMLCanvasElement;
export declare const centerImageOnCanvas: (img: any) => any;
export declare const get2dContext: (canvas: any, options: any) => any;
export declare const clearCanvas: (canvas: any) => void;
export declare const addImageToCanvas: (canvas: any, img: any, { top, left }?: {
    top?: number;
    left?: number;
}) => any;
export declare const urlToImage: (url: any) => Promise<unknown>;
export declare const blobToImage: (blob: any) => Promise<unknown>;
export declare const imageToBlob: (img: any, filename: any, type: any) => Promise<Blob>;
export declare const canvasToImage: (canvas: any, type?: string, quality?: number) => Promise<unknown>;
export declare const imageToCanvas: (img: any, width: any, height: any) => HTMLCanvasElement;
export declare const canvasToBlob: (canvas: any, type?: string, quality?: number) => Promise<unknown>;
export declare const base64ToImage: (data: any) => Promise<unknown>;
export declare const imageToBase64: (img: any, type?: string, quality?: number) => string;
export declare const resizeByScale: (img: any, scale: any, { quality, type }?: {
    quality?: number | undefined;
    type?: string | undefined;
}) => Promise<unknown>;
export declare const resize: (img: any, maxSize: any, { quality, type }?: {
    quality?: number | undefined;
    type?: string | undefined;
}) => Promise<unknown>;
export declare const rotate: (img: any, direction?: number, type?: string) => Promise<unknown>;
export declare const flip: (img: any, type?: string) => Promise<unknown>;
export declare const flop: (img: any, type?: string) => Promise<unknown>;
export declare const flipFlop: (img: any, flip: any, flop: any, type?: string) => Promise<unknown>;
export declare const convertType: (img: any, targetType: any) => Promise<unknown>;
export declare const getRgbColor: (canvas: any, pos: any) => {
    r: any;
    g: any;
    b: any;
};
export declare const getLightness: (img: any) => number;
export declare const white2transparent: (img: any, tolerance: any) => Promise<unknown>;
declare const _default: {
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
export default _default;
