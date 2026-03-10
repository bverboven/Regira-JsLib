export interface IServiceProvider {
    get<T = any>(key: any): T | null;
    add<T = any>(key: any, factory: (sp: IServiceProvider) => T): IServiceProvider;
}
export declare class ServiceProvider implements IServiceProvider {
    services: Map<any, (sp: IServiceProvider) => any>;
    constructor();
    get<T = any>(key: any): T | null;
    add<T = any>(key: any, factory: (sp: IServiceProvider) => T): IServiceProvider;
}
declare const defaultServiceProvider: IServiceProvider;
export declare function get<T>(key: any): T | null;
export default defaultServiceProvider;
