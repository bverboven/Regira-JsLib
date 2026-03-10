import type { IEntity } from "./IEntity";
export declare abstract class EntityBase implements IEntity {
    constructor();
    abstract get $id(): string | number;
    abstract get $title(): string | undefined;
}
export default EntityBase;
