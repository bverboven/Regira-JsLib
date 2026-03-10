export declare const redirect: (url: any, delayInSeconds?: number) => void;
export declare const getAbsOffset: (element: any) => {
    top: number;
    left: number;
};
export declare const getAbsScrollPosition: (element: any) => {
    top: number;
    left: number;
};
export declare const setMetaTag: (name: any, content: any) => void;
export declare const setCanonicalTag: (url: any) => void;
declare const _default: {
    redirect: (url: any, delayInSeconds?: number) => void;
    setMetaTag: (name: any, content: any) => void;
    setCanonicalTag: (url: any) => void;
};
export default _default;
