import FileHelper from "./file-helper";
type ImageInput = HTMLImageElement | string | Blob | HTMLCanvasElement;
declare class ImageHelper extends FileHelper {
    getImage(input: ImageInput): Promise<HTMLImageElement>;
    getBlob(input: HTMLImageElement | HTMLCanvasElement | File | Blob | string, filename?: string, type?: string): Promise<Blob>;
    resize(input: ImageInput, max: number, options?: {
        quality?: number;
        type?: string;
    }): Promise<HTMLImageElement>;
    rotate(input: Blob, direction: number): Promise<HTMLImageElement>;
    flipHorizontally(input: ImageInput): Promise<HTMLImageElement>;
    flipVertically(input: ImageInput): Promise<HTMLImageElement>;
    flipFlop(input: ImageInput, flip?: boolean, flop?: boolean, type?: string): Promise<HTMLImageElement>;
    convertType(input: ImageInput, targetType: string): Promise<HTMLImageElement>;
    getLightness(input: ImageInput): Promise<number>;
    white2transparent(input: ImageInput, tolerance?: number): Promise<HTMLImageElement>;
}
export default ImageHelper;
