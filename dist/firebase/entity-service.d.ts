declare class EntityService {
    constructor({ catalogName, apiUrl }: {
        catalogName: any;
        apiUrl: any;
    });
    details(id: any): Promise<any>;
    list(): Promise<any[]>;
    save(item: any): Promise<any>;
    delete(item: any): Promise<any>;
    import(items: any): Promise<Promise<any>[]>;
}
export default EntityService;
