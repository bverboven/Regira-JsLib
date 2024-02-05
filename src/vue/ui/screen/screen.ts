import { ref, type Ref } from "vue"

export interface IScreenSize extends Array<number> {}
export interface IScreen {
    get size(): number[]
    get isExtraSmall(): boolean
    get isSmall(): boolean
    get isMedium(): boolean
    get isLarge(): boolean
    get isExtraLarge(): boolean
    get layout(): string
    updateSize(newSize: IScreenSize): void
}
type ScreenOut = {
    size: Ref<number[]>
    screen: IScreen
}
export function getWindowSize(): IScreenSize {
    return [window.innerWidth, window.innerHeight]
}

export const SCREEN_SIZES: Record<string, number> = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
}

export function useScreen(): ScreenOut {
    const size: Ref<IScreenSize> = ref(getWindowSize())
    const screen: IScreen = {
        get size() {
            return size.value
        },
        get isExtraSmall() {
            return this.size[0] >= SCREEN_SIZES.xs
        },
        get isSmall() {
            return this.size[0] >= SCREEN_SIZES.sm
        },
        get isMedium() {
            return this.size[0] >= SCREEN_SIZES.md
        },
        get isLarge() {
            return this.size[0] >= SCREEN_SIZES.lg
        },
        get isExtraLarge() {
            return this.size[0] >= SCREEN_SIZES.xl
        },
        get layout() {
            return this.isExtraLarge ? "xl" : this.isLarge ? "lg" : this.isMedium ? "md" : this.isSmall ? "sm" : "xs"
        },
        updateSize: (newSize = getWindowSize()) => (size.value = newSize),
    }

    return {
        size,
        screen,
    }
}

export default useScreen
