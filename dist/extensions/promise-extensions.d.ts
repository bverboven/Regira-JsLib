import { debounceToPromise, enqueue } from "../utilities/promise-utility";
declare global {
    interface PromiseConstructor {
        debounce: typeof debounceToPromise;
        enqueue: typeof enqueue;
    }
}
declare const _default: {
    use(): void;
};
export default _default;
