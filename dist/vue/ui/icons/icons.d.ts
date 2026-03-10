export type IconsConfig = {
    source: string;
    icons: Map<string, string>;
};
type IconSet = Record<string, string> | Array<Array<string>>;
export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconProps = {
    name: string;
    size?: IconSize;
};
export declare const iconMap: Map<string, string>;
export declare function load(icons: IconSet): void;
export declare function clear(): void;
export default iconMap;
