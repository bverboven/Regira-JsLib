export declare function login(key: any, email: any, password: any): Promise<{
    idToken: any;
    refreshToken: any;
    expiresIn: any;
    userId: any;
}>;
export declare function refresh(key: any, refreshToken: any): Promise<{
    idToken: any;
    refreshToken: any;
    expiresIn: any;
    userId: any;
}>;
export declare function resetPassword(key: any, email: any): Promise<boolean>;
declare const _default: {
    login: typeof login;
    refresh: typeof refresh;
    resetPassword: typeof resetPassword;
};
export default _default;
