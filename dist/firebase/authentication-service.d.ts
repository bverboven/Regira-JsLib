declare class AuthenticationService {
    constructor(options: any);
    login(email: any, password: any): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
        userId: any;
    }>;
    refresh(refreshToken: any): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
        userId: any;
    }>;
    resetPassword(email: any): Promise<boolean>;
}
export default AuthenticationService;
