import { defineComponent, type RenderFunction, type Slots } from "vue"
import { Autocomplete as AutocompleteBase } from "@/vue_modules/ui"
import type { IEntity, IEntityService, ISearchObject } from "../abstractions"
import { get } from "@/vue_modules/ioc"

type IAutocompleteIn<T extends IEntity> = {
    Entity: Function & { name: string; new (): T }
}
type AutocompleteProps<SO extends ISearchObject> = {
    maxResults?: number
    filterDefaults?: SO
    placeholder?: string
}

export function createAutocomplete<T extends IEntity, SO extends ISearchObject>({ Entity }: IAutocompleteIn<T>) {
    const Autocomplete = defineComponent({
        props: {
            maxResults: Number,
            filterDefaults: Object,
            placeholder: String,
        },
        setup(props: AutocompleteProps<SO>, { slots }: { slots: Slots }): RenderFunction {
            const entityService = get<IEntityService<T>>(Entity.name)!
            const search = (q: string) => entityService.list({ ...props.filterDefaults, q, pageSize: props.maxResults })
            const idSelector = (item: T | null) => item?.$id as string
            const resultItemFormatter = (item: T | null) => item?.$title as string
            const displayItemFormatter = (item: T | null) => item?.$title as string

            return () => (
                <AutocompleteBase
                    search={search}
                    max-results={props.maxResults}
                    id-selector={idSelector}
                    display-item-formatter={displayItemFormatter}
                    result-item-formatter={resultItemFormatter}
                    placeholder={props.placeholder}
                >
                    {{
                        prepend: () => slots.prepend || props.placeholder,
                        resultItem: (item: T, q: string) => slots.resultItem && slots.resultItem({ item, q }),
                        append: () => slots.append,
                    }}
                </AutocompleteBase>
            )
        },
    })

    return Autocomplete
}

export default createAutocomplete