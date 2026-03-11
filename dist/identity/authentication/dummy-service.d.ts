declare class AuthenticationService {
    constructor();
    login(_email: string, _password: string): Promise<void>;
    refresh(_refreshToken: string): Promise<void>;
    resetPassword(_email: string): Promise<void>;
}
export default AuthenticationService;
