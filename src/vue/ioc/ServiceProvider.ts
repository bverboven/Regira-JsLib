export interface IServiceProvider {
    get<T = any>(key: any): T | null
    add<T = any>(key: any, factory: (sp: IServiceProvider) => T): IServiceProvider
}

export class ServiceProvider implements IServiceProvider {
    services: Map<any, (sp: IServiceProvider) => any>
    constructor() {
        this.services = new Map<any, (sp: IServiceProvider) => any>()
    }

    get<T = any>(key: any): T | null {
        const factory = this.services.get(key)
        if (factory == null) {
            return null
        }
        return factory(this) as T
    }
    add<T = any>(key: any, factory: (sp: IServiceProvider) => T): IServiceProvider {
        this.services.set(key, factory)
        return this
    }
}

const defaultServiceProvider: IServiceProvider = new ServiceProvider()

export function get<T>(key: any): T | null {
    return defaultServiceProvider.get<T>(key)
}

export default defaultServiceProvider
