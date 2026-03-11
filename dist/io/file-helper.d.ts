declare class FileHelper {
    getBlob(input: any, filename: any, type: any): Promise<Blob>;
    getBase64Url(input: any): Promise<any>;
    createUrl(input: any): Promise<string>;
    browse(options?: {}): Promise<unknown>;
    readJson(blob: any): Promise<any>;
    writeJson(object: any, filename: any): Promise<Blob & {
        name: string;
    }>;
    send(url: any, files: any, data?: {}, options?: {}): Promise<import("axios").AxiosResponse<any, any, {}>>;
    saveAs(input: any, type: any, filename?: null): Promise<void>;
}
export default FileHelper;
