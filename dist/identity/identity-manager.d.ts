/**
 * Handles login/logoff and saves state of current identity
 * automatically refreshes token when autoRefresh is enabled
 */
declare class IdentityManager {
    constructor({ authenticationService, autoRefresh }: {
        authenticationService: any;
        autoRefresh?: boolean | undefined;
    });
    get autoRefresh(): any;
    set autoRefresh(value: any);
    login(email: any, password: any): Promise<any>;
    refresh(): Promise<any>;
    logoff(): Promise<any>;
    _setState(response?: null): void;
    _checkAutoRefresh(): void;
}
export default IdentityManager;
