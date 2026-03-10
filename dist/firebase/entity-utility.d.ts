export declare function details(apiUrl: any, catalogName: any, id: any): Promise<any>;
export declare function list(apiUrl: any, catalogName: any): Promise<any[]>;
export declare function saveEntity(apiUrl: any, catalogName: any, item: any): Promise<any>;
export declare function deleteEntity(apiUrl: any, catalogName: any, item: any): Promise<any>;
export declare function importEntities(apiUrl: any, catalogName: any, items: any): Promise<Promise<any>[]>;
declare const _default: {
    details: typeof details;
    list: typeof list;
    saveEntity: typeof saveEntity;
    deleteEntity: typeof deleteEntity;
    importEntities: typeof importEntities;
};
export default _default;
