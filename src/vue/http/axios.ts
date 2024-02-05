import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import { toFormData } from "@/regira_modules/utilities/file-utility"

export interface AxiosWithFilesInstance extends AxiosInstance {
    getFile(url: string, method?: string, filename?: string, type?: string): Promise<Blob>
    upload(url: string, files: Array<Blob>, options?: UploadOptions): Promise<AxiosResponse>
}

let _myAxios: AxiosWithFilesInstance

export function initAxios(config: { api: string; includeCredentials: boolean }): AxiosWithFilesInstance {
    console.debug("initAxios", { config })
    const { api: baseURL, includeCredentials: withCredentials } = config
    const myAxios = axios.create({
        baseURL,
        withCredentials,
    })
    Object.defineProperties(myAxios, {
        getFile: {
            value: getFile,
            configurable: true,
        },
        upload: {
            value: upload,
            configurable: true,
        },
    })

    // when responseType is 'blob', transform response error to JSON (otherwise response error is also a blob...)
    // https://github.com/axios/axios/issues/815
    myAxios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.debug("axiosError", { error, response: error.response })
            if (error.request.responseType === "blob" && error.response.data instanceof Blob && error.response.data.type && error.response.data.type.toLowerCase().indexOf("json") != -1) {
                return new Promise((resolve, reject) => {
                    console.debug("blobError", { error, response: error.response })
                    let reader = new FileReader()
                    reader.onload = () => {
                        error.response.data = JSON.parse(reader.result as string)
                        //resolve(Promise.reject(error))
                        reject(error)
                    }

                    reader.onerror = () => {
                        reject(error)
                    }

                    reader.readAsText(error.response.data)
                })
            }

            return Promise.reject(error)
        }
    )

    _myAxios = myAxios as AxiosWithFilesInstance
    return _myAxios
}

export function useAxios(): AxiosWithFilesInstance {
    if (_myAxios == null) {
        throw Error("Api-Axios is not initialized yet. Call 'initApiAxios(config)' first.")
    }
    return _myAxios
}

// get blob
export async function getFile(url: string, method: string = "GET", filename?: string, type?: string): Promise<Blob> {
    const response = await _myAxios({ url, method, responseType: "blob" })

    // error?
    if (axios.isAxiosError(response)) {
        throw response
    }

    if (!filename) {
        // try to get filename from content-disposition header
        const disposition = response.headers["content-disposition"]
        if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            var matches = filenameRegex.exec(disposition)
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, "")
            }
        }
    }

    if (type == null) {
        type = response.headers["content-type"]
    }

    const blob = new Blob([response.data], { type })
    if (filename) {
        Object.defineProperty(blob, "name", { value: filename, configurable: true, writable: true, enumerable: true })
    }
    return blob
}

type UploadOptions = Record<string, any> & {
    method?: string
    headers?: Record<string, string>
    data?: object
    filesParameterName?: string
}
// upload blob
export async function upload(url: string, files: Array<Blob>, options?: UploadOptions): Promise<AxiosResponse> {
    const { method = "POST", headers, data = {}, filesParameterName = "file" } = options || {}
    const formData = toFormData(files, data, { filesParameterName })

    console.debug("upload", { url, method, formData, files, data })

    const response = await _myAxios({
        method: method,
        url,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            ...(headers || {}),
        },
    })

    // error?
    if (axios.isAxiosError(response)) {
        throw response
    }

    return response
}
