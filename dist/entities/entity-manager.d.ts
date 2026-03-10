declare class EntityManager {
    constructor(service: any, { enableCount, defaults }?: {
        enableCount?: boolean | undefined;
        defaults?: {
            searchObject: {};
        } | undefined;
    });
    details(id: any): Promise<any>;
    list(searchObject?: {}): Promise<any>;
    count(searchObject?: {}): Promise<any>;
    search(searchObject?: any): Promise<{
        searchObject: any;
        items: any;
        count: any;
    }>;
    save(item?: null): Promise<any>;
    delete(item?: null): Promise<any>;
    newItem(): Promise<void>;
    setDetails(item: any): void;
    setItems(items: any): void;
    setCount(count: any): void;
    setSearchObject(searchObject?: {}): void;
    reset(): void;
}
export default EntityManager;
