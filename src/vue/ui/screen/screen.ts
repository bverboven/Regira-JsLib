import { ref, type Ref } from "vue"

export interface IScreenSize extends Array<number> { }
export interface IScreen {
    get size(): number[]
    get isExtraSmall(): boolean
    get isSmall(): boolean
    get isMedium(): boolean
    get isLarge(): boolean
    get isExtraLarge(): boolean
    get isExtraExtraLarge(): boolean
    get layout(): string
    updateSize(newSize: IScreenSize): void
    isSize(size: string): boolean
}
type ScreenOut = {
    size: Ref<number[]>
    screen: IScreen
}
export function getWindowSize(): IScreenSize {
    return [window.innerWidth, window.innerHeight]
}

export const SCREEN_SIZES = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
} as Record<string, number>

export function useScreen(): ScreenOut {
    const size: Ref<IScreenSize> = ref(getWindowSize())
    const screen: IScreen = {
        get size() {
            return size.value
        },
        get isExtraSmall() {
            return this.size[0]! >= SCREEN_SIZES.xs!
        },
        get isSmall() {
            return this.size[0]! >= SCREEN_SIZES.sm!
        },
        get isMedium() {
            return this.size[0]! >= SCREEN_SIZES.md!
        },
        get isLarge() {
            return this.size[0]! >= SCREEN_SIZES.lg!
        },
        get isExtraLarge() {
            return this.size[0]! >= SCREEN_SIZES.xl!
        },
        get isExtraExtraLarge() {
            return this.size[0]! >= SCREEN_SIZES.xxl!
        },
        get layout() {
            return this.isExtraExtraLarge ? "xxl" : this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs"
        },
        isSize(sizeToCheck: string) {
            return this.size[0]! >= SCREEN_SIZES[sizeToCheck]!
        },
        updateSize: (newSize = getWindowSize()) => (size.value = newSize),
    }

    return {
        size,
        screen,
    }
}

export default useScreen
