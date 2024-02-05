/// <reference lib="es2017.object" />

export type IconsConfig = { source: string; icons: Map<string, string> }

type IconSet = Record<string, string> | Array<Array<string>>

export type IconSize = "sm" | "md" | "lg" | "xl"
export type IconProps = { name: string; size?: IconSize }

export const iconMap = new Map<string, string>()

export function load(icons: IconSet) {
    const entries = Array.isArray(icons) ? icons : Object.entries(icons)
    entries.forEach(([key, icon]) => {
        iconMap.set(key, icon)
    })
}
export function clear() {
    iconMap.clear()
}

export default iconMap
