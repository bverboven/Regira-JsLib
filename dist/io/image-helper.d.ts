import FileHelper from "./file-helper";
declare class ImageHelper extends FileHelper {
    getImage(input: any): Promise<unknown>;
    getBlob(input: any, filename: any, type: any): Promise<unknown>;
    resize(input: any, max: any, options: any): Promise<unknown>;
    rotate(input: any, direction: any): Promise<unknown>;
    flipHorizontally(input: any): Promise<unknown>;
    flipVertically(input: any): Promise<unknown>;
    flipFlop(input: any, flip: any, flop: any, type: any): Promise<unknown>;
    convertType(input: any, targetType: any): Promise<unknown>;
    getLightness(input: any): Promise<number>;
    white2transparent(input: any, tolerance?: number): Promise<unknown>;
}
export default ImageHelper;
