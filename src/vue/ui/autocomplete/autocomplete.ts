import { ref, computed, watch, onMounted, onUnmounted, type Ref, type StyleValue } from "vue"
import { useEventListener } from "@/vue_modules/vue-helper"
import { debounceToPromise } from "@/regira_modules/utilities/promise-utility"
import { getAbsScrollPosition } from "@/regira_modules/utilities/html-utility"

import "./style.scss"

export const autocompleteEmits = ["update:modelValue", "update:idValue", "select"]
export const autocompleteProps = {
    idValue: [String, Number],
    modelValue: { required: false },
    data: { type: Array, default: () => [] },
    search: Function,
    idSelector: Function,
    displayItemFormatter: Function, // convert item to q (pure String)
    resultItemFormatter: Function, // can return HTML
    enableDblClick: { type: Boolean, default: false },
    resultClass: { type: String, default: "" },
    itemsClass: { type: String, default: "" },
    itemClass: { type: String, default: "" },
    maxResults: { type: Number, default: 10 },
    debounceTime: { type: Number, defaults: 250 },
}

type IDefaultKey = number | string
type IOffset = { top: number; left: number }
type IResultStyle = StyleValue & { visibility: string; top?: string; left?: string; transform?: string; width: string }

interface Emits<T = any, TKey = IDefaultKey | T> {
    (e: "update:modelValue", args: T | undefined): void
    (e: "update:idValue", args: TKey | undefined): void
    (e: "select", args: T | undefined): void
}
interface Props<T = any, TKey = IDefaultKey | T> {
    idValue?: TKey
    modelValue?: T
    data?: Array<T>
    maxResults?: number
    debounceTime?: number
    enableDblClick?: boolean
    autoSelect?: boolean
    allowFreeInput?: boolean

    resultClass?: string
    itemsClass?: string
    itemClass?: string

    search?(term?: string): Promise<Array<T>>
    idSelector?(item?: T): TKey | undefined
    displayItemFormatter?(item?: T): string
    resultItemFormatter?(item?: T, q?: string): string
}
export const propsDefaults = {
    data: () => [],
    maxResults: 10,
    debounceTime: 250,
    autoSelect: false,
}
type AutocompleteOut<T = any, TKey = IDefaultKey | T> = {
    q: Ref<string>
    selectedItem: Ref<T | undefined>
    selectedIndex: Ref<number>
    selectedId: Ref<TKey | undefined>
    items: Ref<Array<T> | undefined>
    isOpen: Ref<boolean>
    isFocus: Ref<boolean>
    isLoading: Ref<boolean>
    inputEl: Ref<(HTMLElement & { value: string }) | undefined>
    resultOffset: Ref<IOffset>
    resultStyle: Ref<IResultStyle>
    displayItemFormatter(item: T): string
    resultItemFormatter(item: T, q?: string): string
    handleInput(): void
    handleChange(): void
    handleSelect(item: T, index: number): void
    handleSearch(term?: string): void
    openResults(): void
    closeResults(): void
    closeGently(e?: PointerEvent): void
    moveSelection(step: number): void
    checkMatch(): void
    clearSelection(): void
    reset(): void
}

export function useAutocomplete<T = any, TKey = IDefaultKey | T>(props: Props<T, TKey>, { emit }: { emit: Emits<T, TKey> }): AutocompleteOut<T, TKey> {
    const q = ref("")
    const selectedIndex = ref(-1)
    const items = ref(props.data) as Ref<Array<T> | undefined>
    const isOpen = ref(false)
    const isFocus = ref(false)
    const isLoading = ref(false)
    const selectedItem = computed({
        get: () => props.modelValue,
        set: (value) => {
            if (props.modelValue !== value) {
                emit("update:modelValue", value)
                emit("update:idValue", idSelector(value))
                emit("select", value)
            }
        },
    })
    const selectedId = computed<TKey | undefined>(() => idSelector(selectedItem.value))
    const inputEl = ref<(HTMLElement & { value: string }) | undefined>()
    const containerOffset = ref<IOffset>({ top: 0, left: 0 })
    const resultOffset = ref<IOffset>({ top: 0, left: 0 })
    const scrollPosition = ref<IOffset>({ top: 0, left: 0 })
    const resultStyle = computed<IResultStyle>(() => {
        const { width, height } = inputEl.value?.getBoundingClientRect() || { width: 0, height: 0 }
        return {
            visibility: isOpen.value ? "visible" : "hidden",
            top: `${height}px`,
            left: `${inputEl.value?.offsetLeft || 0}px`,
            width: `${width}px`,
        }
    })

    const idSelector = props.idSelector || ((item?: T): TKey | undefined => item as TKey)
    const resultItemFormatter = props.resultItemFormatter || ((item: T, _) => (item || "").toString())
    const displayItemFormatter = props.displayItemFormatter || resultItemFormatter

    async function dataItemsSearch(term = "") {
        return props.data?.filter((x) => (resultItemFormatter(x, q.value) as string).toLowerCase().startsWith(term.toLowerCase()))
    }

    async function handleSearch(term = q.value): Promise<void> {
        openResults()
        isLoading.value = true
        items.value = undefined
        try {
            const searchResult = await debouncedSearch(term)
            //console.debug("autocomplete.search", term, { props, q: q.value })
            const pageSize = props.maxResults || searchResult.length
            items.value = searchResult.slice(0, pageSize)
            selectedIndex.value = (items.value as Array<T>)?.findIndex((x) => idSelector(x) == idSelector(selectedItem.value))
        } finally {
            isLoading.value = false
        }
    }
    function checkMatch(allowAutoSelect: boolean = false): void {
        // check (and set selection automatically) if the input value corresponds with a value in the results
        if (selectedItem.value == null && items.value) {
            const matches = (items.value as Array<T>)?.filter((item) => (displayItemFormatter(item)?.toString() || "").toLowerCase() === q.value?.toLowerCase())
            if (matches.length == 1) {
                setSelection(matches[0])
            } else if (allowAutoSelect && props.autoSelect) {
                //console.debug("autoSelect", { items: items.value, item: items.value[0], selectedItem })
                setSelection(items.value[0])
            }
        }
    }
    function handleInput(): void {
        clearSelection()
        handleSearch()
    }
    function handleChange(): void {
        //console.debug("autocomplete.handleChange", { q: q.value })
        checkMatch()
        // emit select triggered automatically in selectedItem setter
    }
    function handleSelect(item: T, index: number): void {
        closeResults()
        setSelection(item, item ? index : -1)
    }
    function setSelection(item?: T, index?: number): void {
        //console.debug("setSelection", { props, item, index, selectedItem: selectedItem.value })
        if (item == null && index == null) {
            clearSelection()
            if (!q.value) {
                closeResults()
            }
            return
        }
        if (item && (index == null || index < 0)) {
            index = ((items.value as Array<T>) || []).indexOf(item)
        } else if (!item && index! >= 0) {
            item = (items.value as Array<T>)[index!]
        }
        if (item != null) {
            // set q to the corresponding value for the resulting item
            selectedIndex.value = index!
            selectedItem.value = item // setter will emit update:modelValue
            q.value = displayItemFormatter(selectedItem.value) // use selectedItem after emit in case selection is cleared immediately in event handler
        }
    }
    function moveSelection(step: number): void {
        const newSelectedIndex = selectedIndex.value + step
        const newSelectedItem = (items.value as Array<T>)[newSelectedIndex]
        if (newSelectedIndex >= 0 && newSelectedIndex < (items.value as Array<T>).length) {
            setSelection(newSelectedItem, newSelectedIndex)
        }
    }
    function clearSelection(): void {
        selectedIndex.value = -1
        selectedItem.value = undefined
    }
    function reset(): void {
        q.value = ""
        clearSelection()
        closeResults()
    }
    function getAbsOffset(element?: HTMLElement): IOffset {
        let top = 0,
            left = 0

        do {
            top += element?.offsetTop || 0
            left += element?.offsetLeft || 0
            element = element?.offsetParent as HTMLElement
        } while (element)

        return {
            top: top,
            left: left,
        }
    }
    function openResults(): void {
        updateContainerOffset()
        isOpen.value = true
        //console.debug("openedResults")
    }
    function closeResults(): void {
        isOpen.value = false
        //console.debug("closedResults")
    }
    function closeGently(e?: PointerEvent): void {
        if (!isOpen.value) {
            return
        }

        //console.debug("closeGently", { evt: e })
        // clear visible input if no selection was made
        checkMatch(true) // check match?
        if (selectedItem.value == null) {
            //console.debug("clearQ", q.value)
            q.value = ""
        }

        setTimeout(closeResults, 250)
    }

    function throwError<TReturn>(err: Error): TReturn {
        throw err
    }

    // search
    const search = props.search || (props.data && dataItemsSearch) || throwError<() => void>(new Error("prop search or data is required"))
    const debouncedSearch = debounceToPromise(search, props.debounceTime) as unknown as (term: string) => Promise<Array<T>>

    const updateContainerOffset = () => {
        containerOffset.value = getAbsOffset(inputEl.value)
        scrollPosition.value = inputEl.value ? getAbsScrollPosition(inputEl.value) : { top: 0, left: 0 }
    }
    const debouncedUpdateContainerOffset = debounceToPromise(updateContainerOffset, 50) as unknown as () => Promise<void>

    useEventListener(window, "resize", debouncedUpdateContainerOffset)
    onMounted(() => {
        q.value = displayItemFormatter(selectedItem.value)
        updateContainerOffset()
        document.addEventListener("scroll", debouncedUpdateContainerOffset, true)
    })
    onUnmounted(() => {
        document.removeEventListener("scroll", debouncedUpdateContainerOffset, true)
    })
    watch(selectedItem, (newVal, oldVal) => {
        //console.debug("autocomplete.watch", { props, newVal, oldVal, selectedItem: selectedItem.value, q: q.value })
        if (newVal != oldVal && newVal != selectedItem.value) {
            setSelection(newVal)
        }
        if (newVal) {
            q.value = displayItemFormatter(selectedItem.value)
        }
    })

    return {
        q,
        selectedItem,
        selectedIndex,
        selectedId,
        items,
        isOpen,
        isFocus,
        isLoading,
        inputEl,
        resultOffset,
        resultStyle,
        displayItemFormatter,
        resultItemFormatter,
        handleInput,
        handleChange,
        handleSelect,
        handleSearch,
        openResults,
        closeResults,
        closeGently,
        moveSelection,
        checkMatch,
        clearSelection,
        reset,
    }
}
