import type { IConfig, IEntity } from "../abstractions";
import type { IPoolHandler } from "../pooling";
type EntityDescriber = {
    config: IConfig;
    store: () => IPoolHandler<IEntity>;
    components: Record<string, any>;
};
export declare function useEntityDescribers(ns?: Symbol): {
    describers: Map<string, EntityDescriber>;
    readonly types: string[];
    addType: <T extends IEntity = IEntity>(config: IConfig, store: () => IPoolHandler<T>, components: Record<string, any>) => void;
    getDesc: (entityKey: string) => EntityDescriber | undefined;
};
export {};
