export declare function login(key: string, email: string, password: string): Promise<{
    idToken: any;
    refreshToken: any;
    expiresIn: any;
    userId: any;
}>;
export declare function refresh(key: string, refreshToken: string): Promise<{
    idToken: any;
    refreshToken: any;
    expiresIn: any;
    userId: any;
}>;
export declare function resetPassword(key: string, email: string): Promise<boolean>;
declare const _default: {
    login: typeof login;
    refresh: typeof refresh;
    resetPassword: typeof resetPassword;
};
export default _default;
