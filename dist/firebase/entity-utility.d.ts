export declare function details(apiUrl: string, catalogName: string, id: string | number): Promise<any>;
export declare function list(apiUrl: string, catalogName: string): Promise<{
    id: string;
}[]>;
export declare function saveEntity(apiUrl: string, catalogName: string, item: Record<string, unknown>): Promise<any>;
export declare function deleteEntity(apiUrl: string, catalogName: string, item: Record<string, unknown>): Promise<any>;
export declare function importEntities(apiUrl: string, catalogName: string, items: Record<string, unknown>[]): Promise<Promise<any>[]>;
declare const _default: {
    details: typeof details;
    list: typeof list;
    saveEntity: typeof saveEntity;
    deleteEntity: typeof deleteEntity;
    importEntities: typeof importEntities;
};
export default _default;
