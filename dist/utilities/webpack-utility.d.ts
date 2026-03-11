/**
 * const ctx = require.context('.', true, /\.ANY_EXTENSION$/);
 * returns an array of entries [filename, module]
 * @param {Function} ctx
 * @returns {Array} entries
 */
interface RequireContext {
    keys(): string[];
    (id: string): unknown;
}
export declare const getModuleEntries: (ctx: RequireContext) => unknown[][];
export {};
