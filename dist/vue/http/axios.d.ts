import { type AxiosInstance, type AxiosResponse } from "axios";
export interface AxiosWithFilesInstance extends AxiosInstance {
    getFile(url: string, method?: string, filename?: string, type?: string): Promise<Blob>;
    upload(url: string, files: Array<Blob>, options?: UploadOptions): Promise<AxiosResponse>;
}
export declare function initAxios(config: {
    api: string;
    includeCredentials?: boolean;
}): AxiosWithFilesInstance;
export declare function useAxios(): AxiosWithFilesInstance;
export declare function getFile(url: string, method?: string, filename?: string, type?: string): Promise<Blob>;
type UploadOptions = Record<string, unknown> & {
    method?: string;
    headers?: Record<string, string>;
    data?: Record<string, unknown>;
    filesParameterName?: string;
};
export declare function upload(url: string, files: Array<Blob>, options?: UploadOptions): Promise<AxiosResponse>;
export {};
