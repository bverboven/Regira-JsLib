declare class FileHelper {
    getBlob(input: any, filename: any, type: any): Promise<unknown>;
    getBase64Url(input: any): Promise<any>;
    createUrl(input: any): Promise<unknown>;
    browse(options?: {}): Promise<unknown>;
    readJson(blob: any): Promise<any>;
    writeJson(object: any, filename: any): Promise<Blob>;
    send(url: any, files: any, data?: {}, options?: {}): Promise<import("axios").AxiosResponse<any, any, {}>>;
    saveAs(input: any, type: any, filename?: null): Promise<any>;
}
export default FileHelper;
