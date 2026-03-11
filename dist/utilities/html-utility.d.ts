export declare const redirect: (url: string, delayInSeconds?: number) => void;
export interface Offset {
    top: number;
    left: number;
}
export declare const getAbsOffset: (element: HTMLElement) => Offset;
export declare const getAbsScrollPosition: (element: HTMLElement) => Offset;
export declare const setMetaTag: (name: string, content: string) => void;
export declare const setCanonicalTag: (url: string) => void;
declare const _default: {
    redirect: (url: string, delayInSeconds?: number) => void;
    setMetaTag: (name: string, content: string) => void;
    setCanonicalTag: (url: string) => void;
};
export default _default;
