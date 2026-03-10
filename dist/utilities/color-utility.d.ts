export declare const rgbToHex: (r: any, g: any, b: any) => string;
export declare const hexToRgb: (hex: any, opacity: any) => {
    r: number;
    g: number;
    b: number;
    a: any;
} | null;
export declare const hexToRgbString: (hex: any, opacity: any) => string | null;
export declare const hexToRgbArray: (hex: any, opacity: any) => any[];
export declare const getRgbString: (input: any, opacity: any) => any;
export declare const invertRgb: (r: any, g: any, b: any) => {
    ri: number;
    gi: number;
    bi: number;
};
export declare const invertHex: (hex: any) => string;
export declare const grayscale: (hex: any, type?: string) => string;
declare const _default: {
    rgbToHex: (r: any, g: any, b: any) => string;
    hexToRgb: (hex: any, opacity: any) => {
        r: number;
        g: number;
        b: number;
        a: any;
    } | null;
    hexToRgbString: (hex: any, opacity: any) => string | null;
    hexToRgbArray: (hex: any, opacity: any) => any[];
    getRgbString: (input: any, opacity: any) => any;
    invertRgb: (r: any, g: any, b: any) => {
        ri: number;
        gi: number;
        bi: number;
    };
    invertHex: (hex: any) => string;
    grayscale: (hex: any, type?: string) => string;
};
export default _default;
