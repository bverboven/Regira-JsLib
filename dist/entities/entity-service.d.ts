declare class EntityService {
    constructor(settings: any);
    details(id: any): Promise<any>;
    list(so: any): Promise<any>;
    count(so: any): Promise<any>;
    save(item: any): Promise<any>;
    delete(item: any): Promise<any>;
    getDetailsUrl(id: any): any;
    getListUrl(so?: {}): any;
    getCountUrl(so?: {}): any;
    getSaveUrl(item: any): any;
    getDeleteUrl(item: any): any;
    checkResponse(response: any): void;
    throwRemoteError(msg: any, ex: any): void;
}
export default EntityService;
