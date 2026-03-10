export interface ITokenManager {
    get token(): string | undefined;
    set token(value: string | undefined);
}
export declare class CookieTokenManager implements ITokenManager {
    private prefix;
    constructor(prefix?: string);
    get token(): string | undefined;
    set token(value: string | undefined);
    get fullKey(): string;
}
export declare class MemoryTokenManager implements ITokenManager {
    private _token;
    constructor(_token: string | undefined);
    get token(): string | undefined;
    set token(value: string | undefined);
}
export declare class LocalStorageTokenManager implements ITokenManager {
    private prefix;
    constructor(prefix?: string);
    get token(): string | undefined;
    set token(value: string | undefined);
    get fullKey(): string;
}
