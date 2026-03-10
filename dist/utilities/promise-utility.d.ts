/**
 * Debounces a function and returns a promise when invoked, all promises resolve to the final (invoked) value
 *
 * @param {Function} func
 *  The function to debounce
 * @param {number} wait
 *  Maximum delay in Milliseconds before invoking
 *
 * @returns {Promise} Returns the result of the invoked function, wrapped in a Promise
 */
export declare const debounceToPromise: (func: any, wait?: number) => () => Promise<unknown>;
/**
 * Executes a collection of async functions in order
 * @param {Array<Function>} array of (async) functions
 */
export declare const enqueue: (arr: any) => Promise<any>;
export declare const delay: (ms?: number) => Promise<unknown>;
declare const _default: {
    debounceToPromise: (func: any, wait?: number) => () => Promise<unknown>;
    enqueue: (arr: any) => Promise<any>;
    delay: (ms?: number) => Promise<unknown>;
};
export default _default;
