export { default as IdentityManager } from "./identity-manager";
export { default as DummyService } from "./authentication/dummy-service";
import IdentityManager from "./identity-manager";
import DummyService from "./authentication/dummy-service";
declare const _default: {
    IdentityManager: typeof IdentityManager;
    DummyService: typeof DummyService;
};
export default _default;
