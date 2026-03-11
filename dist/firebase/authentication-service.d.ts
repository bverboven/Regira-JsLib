declare class AuthenticationService {
    apiKey: string;
    constructor(options: string | {
        apiKey: string;
    });
    login(email: string, password: string): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
        userId: any;
    }>;
    refresh(refreshToken: string): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
        userId: any;
    }>;
    resetPassword(email: string): Promise<boolean>;
}
export default AuthenticationService;
