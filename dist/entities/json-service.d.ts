declare class EntityService {
    constructor(rootUrl: any, catalogName: any, version: any);
    details(id: any): Promise<any>;
    list(): Promise<any>;
    getCatalogUrl(): string;
    checkResponse(response: any): void;
}
export default EntityService;
