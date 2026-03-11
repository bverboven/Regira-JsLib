export declare const contentTypes: {
    jpg: string;
    png: string;
    gif: string;
};
export declare const getImageContentType: (img: HTMLImageElement) => Promise<string | undefined>;
export declare const parseContentType: (type: string | undefined) => string;
export declare const createCanvas: (width: number, height: number, options?: Record<string, unknown> | null) => HTMLCanvasElement;
export declare const centerImageOnCanvas: (img: HTMLImageElement) => HTMLCanvasElement;
export declare const get2dContext: (canvas: HTMLCanvasElement, options?: Record<string, unknown> | null) => CanvasRenderingContext2D;
export declare const clearCanvas: (canvas: HTMLCanvasElement) => void;
export declare const addImageToCanvas: (canvas: HTMLCanvasElement | null | undefined, img: HTMLImageElement, { top, left }?: {
    top?: number;
    left?: number;
}) => HTMLCanvasElement;
export declare const urlToImage: (url: string) => Promise<HTMLImageElement>;
export declare const blobToImage: (blob: Blob) => Promise<HTMLImageElement>;
export declare const imageToBlob: (img: HTMLImageElement, filename?: string, _type?: string) => Promise<Blob & {
    name: string;
}>;
export declare const canvasToImage: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<HTMLImageElement>;
export declare const imageToCanvas: (img: HTMLImageElement, width?: number, height?: number) => HTMLCanvasElement;
export declare const canvasToBlob: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<unknown>;
export declare const base64ToImage: (data: string) => Promise<HTMLImageElement>;
export declare const imageToBase64: (img: HTMLImageElement, type?: string, quality?: number) => string;
export declare const resizeByScale: (img: HTMLImageElement, scale: number, { quality, type }?: {
    quality?: number;
    type?: string;
}) => Promise<HTMLImageElement>;
export declare const resize: (img: HTMLImageElement, maxSize: number | [number, number], { quality, type }?: {
    quality?: number;
    type?: string;
}) => Promise<HTMLImageElement>;
export declare const rotate: (img: HTMLImageElement, direction?: number, type?: string) => Promise<HTMLImageElement>;
export declare const flip: (img: HTMLImageElement, type?: string) => Promise<HTMLImageElement>;
export declare const flop: (img: HTMLImageElement, type?: string) => Promise<HTMLImageElement>;
export declare const flipFlop: (img: HTMLImageElement, flip: boolean, flop: boolean, type?: string) => Promise<HTMLImageElement>;
export declare const convertType: (img: HTMLImageElement, targetType: string) => Promise<HTMLImageElement>;
export declare const getRgbColor: (canvas: HTMLCanvasElement, pos: [number, number]) => {
    r: number;
    g: number;
    b: number;
};
export declare const getLightness: (img: HTMLImageElement) => number;
export declare const white2transparent: (img: HTMLImageElement, tolerance: number) => Promise<HTMLImageElement>;
declare const _default: {
    contentTypes: {
        jpg: string;
        png: string;
        gif: string;
    };
    getImageContentType: (img: HTMLImageElement) => Promise<string | undefined>;
    parseContentType: (type: string | undefined) => string;
    urlToImage: (url: string) => Promise<HTMLImageElement>;
    blobToImage: (blob: Blob) => Promise<HTMLImageElement>;
    imageToBlob: (img: HTMLImageElement, filename?: string, _type?: string) => Promise<Blob & {
        name: string;
    }>;
    canvasToImage: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<HTMLImageElement>;
    imageToCanvas: (img: HTMLImageElement, width?: number, height?: number) => HTMLCanvasElement;
    canvasToBlob: (canvas: HTMLCanvasElement, type?: string, quality?: number) => Promise<unknown>;
    base64ToImage: (data: string) => Promise<HTMLImageElement>;
    imageToBase64: (img: HTMLImageElement, type?: string, quality?: number) => string;
    resizeByScale: (img: HTMLImageElement, scale: number, { quality, type }?: {
        quality?: number;
        type?: string;
    }) => Promise<HTMLImageElement>;
    resize: (img: HTMLImageElement, maxSize: number | [number, number], { quality, type }?: {
        quality?: number;
        type?: string;
    }) => Promise<HTMLImageElement>;
    rotate: (img: HTMLImageElement, direction?: number, type?: string) => Promise<HTMLImageElement>;
    flipFlop: (img: HTMLImageElement, flip: boolean, flop: boolean, type?: string) => Promise<HTMLImageElement>;
    convertType: (img: HTMLImageElement, targetType: string) => Promise<HTMLImageElement>;
    getLightness: (img: HTMLImageElement) => number;
    white2transparent: (img: HTMLImageElement, tolerance: number) => Promise<HTMLImageElement>;
};
export default _default;
