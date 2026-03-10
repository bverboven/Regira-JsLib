import { type Ref } from "vue";
export interface IScreenSize extends Array<number> {
}
export interface IScreen {
    get size(): number[];
    get isExtraSmall(): boolean;
    get isSmall(): boolean;
    get isMedium(): boolean;
    get isLarge(): boolean;
    get isExtraLarge(): boolean;
    get isExtraExtraLarge(): boolean;
    get layout(): string;
    updateSize(newSize: IScreenSize): void;
    isSize(size: string): boolean;
}
type ScreenOut = {
    size: Ref<number[]>;
    screen: IScreen;
};
export declare function getWindowSize(): IScreenSize;
export declare const SCREEN_SIZES: Record<string, number>;
export declare function useScreen(): ScreenOut;
export default useScreen;
