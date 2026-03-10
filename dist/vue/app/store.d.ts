export declare enum AppStatus {
    Init = "Init",
    Loading = "Loading",
    Mounting = "Mounting",
    Ready = "Ready"
}
export declare const useAppStore: import("pinia").StoreDefinition<"AppStore", Pick<{
    culture: import("vue").Ref<string, string>;
    logo: import("vue").Ref<string | undefined, string | undefined>;
    status: import("vue").Ref<AppStatus, AppStatus>;
    isReady: import("vue").ComputedRef<boolean>;
    setCulture(value?: string): void;
    setStatus(value: AppStatus): void;
    setLogo(value: string): void;
}, "status" | "culture" | "logo">, Pick<{
    culture: import("vue").Ref<string, string>;
    logo: import("vue").Ref<string | undefined, string | undefined>;
    status: import("vue").Ref<AppStatus, AppStatus>;
    isReady: import("vue").ComputedRef<boolean>;
    setCulture(value?: string): void;
    setStatus(value: AppStatus): void;
    setLogo(value: string): void;
}, "isReady">, Pick<{
    culture: import("vue").Ref<string, string>;
    logo: import("vue").Ref<string | undefined, string | undefined>;
    status: import("vue").Ref<AppStatus, AppStatus>;
    isReady: import("vue").ComputedRef<boolean>;
    setCulture(value?: string): void;
    setStatus(value: AppStatus): void;
    setLogo(value: string): void;
}, "setCulture" | "setStatus" | "setLogo">>;
export default useAppStore;
