import { type Ref } from "vue";
export type IsOnline = {
    isOnline: Ref<boolean>;
};
export declare function useOnlineChecker(): IsOnline;
export default useOnlineChecker;
