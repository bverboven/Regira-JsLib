declare class EntityService {
    apiUrl: string;
    catalogName: string;
    constructor({ catalogName, apiUrl }: {
        catalogName: string;
        apiUrl: string;
    });
    details(id: string | number): Promise<any>;
    list(): Promise<{
        id: string;
    }[]>;
    save(item: Record<string, unknown>): Promise<any>;
    delete(item: Record<string, unknown>): Promise<any>;
    import(items: Record<string, unknown>[]): Promise<Promise<any>[]>;
}
export default EntityService;
