declare class AuthenticationService {
    constructor();
    login(email: any, password: any): Promise<void>;
    refresh(refreshToken: any): Promise<void>;
    resetPassword(email: any): Promise<void>;
}
export default AuthenticationService;
