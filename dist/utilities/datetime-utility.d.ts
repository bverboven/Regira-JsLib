export declare const isValidDate: (date: any) => boolean;
export declare const daysDiff: (date1: any, date2: any) => number;
export declare const timer: {
    last: number;
    log(dateToCompare: any): number;
};
export declare const countDown: (startDate: any, interval?: number) => {};
/**
 * Stringifies the date without timezone 'correction' in JSON format
 * @param {Date|number} date
 *  the date as Date or time in milliseconds
 * @returns the serialized date
 */
export declare const stringifyDate: (date: any) => string | null;
declare const _default: {
    isValidDate: (date: any) => boolean;
    timer: {
        last: number;
        log(dateToCompare: any): number;
    };
    countDown: (startDate: any, interval?: number) => {};
    stringifyDate: (date: any) => string | null;
};
export default _default;
