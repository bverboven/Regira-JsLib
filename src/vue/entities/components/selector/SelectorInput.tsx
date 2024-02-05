import { computed, defineComponent, type RenderFunction, type Slots } from "vue"
import type { IEntity, ISearchObject } from "../../abstractions"
import type { IPoolHandler } from "../../pooling"

type IInputSelectorIn<T extends IEntity, SO extends ISearchObject> = {
    Entity: Function & { name: string; new (): T }
    SearchObject: Function & { new (): SO }
    useEntityStore: () => IPoolHandler<T>
    SelectorModalButton: any
    Autocomplete: any
    FormModalButton: any
}

type InputSelectorEmits<T extends IEntity> = {
    (e: "update:modelValue", args?: T): void
    (e: "update:idValue", args?: number | string): void
    (e: "select", args?: T): void
}
type InputSelectorProps<T extends IEntity, SO extends ISearchObject> = {
    modelValue?: T
    idValue?: number | string
    pageSize?: number
    defaultFilter?: SO
    placeholder: string
}

export function createSelectorInput<T extends IEntity, SO extends ISearchObject>({ useEntityStore, SelectorModalButton, Autocomplete, FormModalButton }: IInputSelectorIn<T, SO>) {
    const InputSelector = defineComponent({
        emits: ["update:modelValue", "select"],
        props: {
            modelValue: Object,
            idValue: [Number, String],
            pageSize: Number,
            defaultFilter: Object,
            placeholder: String,
        },
        setup(props: InputSelectorProps<T, SO>, { emit, slots }: { emit: InputSelectorEmits<T>; slots: Slots }): RenderFunction {
            const { fromPool } = useEntityStore()
            const item = computed<T>({
                get: () => fromPool(props.modelValue) as T,
                set: (value) => {
                    emit("update:modelValue", value)
                    emit("update:idValue", value?.$id)
                },
            })

            function handleChange(selected: T | null) {
                console.debug("handleChange", { selected })
                if (selected == null) {
                    return
                }

                if (item.value?.$id != selected?.$id) {
                    emit("update:modelValue", selected)
                    emit("update:idValue", selected?.$id)
                    emit("select", selected)
                }
            }
            return () => (
                <div class="input-group text-nowrap">
                    {(slots.prepend && slots.prepend({ item: item.value })) || (
                        <FormModalButton v-model={item.value} class="btn-outline-secondary" onSave={({ saved }: { saved: T }) => handleChange(saved)} />
                    )}
                    {(slots.default && slots.default({ item: item.value, pageSize: props.pageSize })) || (
                        <Autocomplete class="form-control" v-model={item.value} maxResults={props.pageSize} onChange={handleChange} />
                    )}
                    {(slots.append && slots.append({ item: item.value })) || <SelectorModalButton v-model={item.value} onChange={handleChange} class="btn btn-outline-info" />}
                </div>
            )
        },
    })

    return InputSelector
}

export default createSelectorInput
