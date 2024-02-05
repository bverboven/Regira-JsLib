const TOKEN_NAME = "auth:token"

export interface ITokenManager {
    get token(): string | undefined
    set token(value: string | undefined)
}

export class CookieTokenManager implements ITokenManager {
    get token(): string | undefined {
        const tokenObj = Object.fromEntries(
            (document.cookie || "")
                .split(";")
                .filter((x) => x.indexOf("=") > 1 && x.indexOf("=") < x.length - 1)
                .map((x) => [x.substring(0, x.indexOf("=")).trim(), x.substring(x.indexOf("=") + 1).trim()])
        )
        return tokenObj[TOKEN_NAME]
    }
    set token(value: string | undefined) {
        if (value != null) {
            document.cookie = `${TOKEN_NAME}=${value}; path=/;`
        } else {
            document.cookie = `${TOKEN_NAME}=;expires=${(new Date() as any) - 1}; path=/;`
        }
    }
}

export class MemoryTokenManager implements ITokenManager {
    constructor(private _token: string | undefined) {}

    get token() {
        return this._token
    }
    set token(value) {
        this._token = value
    }
}

export default ITokenManager
