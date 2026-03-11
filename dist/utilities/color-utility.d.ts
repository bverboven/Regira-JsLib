export declare const rgbToHex: (r: number, g: number, b: number) => string;
export declare const hexToRgb: (hex: string, opacity?: number) => {
    r: number;
    g: number;
    b: number;
    a: number;
} | null;
export declare const hexToRgbString: (hex: string, opacity?: number) => string | null;
export declare const hexToRgbArray: (hex: string, opacity?: number) => number[];
export declare const getRgbString: (input: number[] | string, opacity?: number) => string | null;
export declare const invertRgb: (r: number, g: number, b: number) => {
    ri: number;
    gi: number;
    bi: number;
};
export declare const invertHex: (hex: string) => string;
export declare const grayscale: (hex: string, type?: string) => string;
declare const _default: {
    rgbToHex: (r: number, g: number, b: number) => string;
    hexToRgb: (hex: string, opacity?: number) => {
        r: number;
        g: number;
        b: number;
        a: number;
    } | null;
    hexToRgbString: (hex: string, opacity?: number) => string | null;
    hexToRgbArray: (hex: string, opacity?: number) => number[];
    getRgbString: (input: number[] | string, opacity?: number) => string | null;
    invertRgb: (r: number, g: number, b: number) => {
        ri: number;
        gi: number;
        bi: number;
    };
    invertHex: (hex: string) => string;
    grayscale: (hex: string, type?: string) => string;
};
export default _default;
