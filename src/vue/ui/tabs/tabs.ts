import type { ITab } from "./Tab"

export type IProps = {
    tabs: Array<ITab>
    activeTab?: string
}
export type IEmits = {
    (e: "select", tab: string): void
}
