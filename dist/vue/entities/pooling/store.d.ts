import type { IEntity } from "../abstractions/IEntity";
import type { IEntityService } from "../abstractions/IEntityService";
export declare function createStore<T extends IEntity>(service: IEntityService<T>, type: string): import("./pool").IPoolHandler<T>;
export default createStore;
