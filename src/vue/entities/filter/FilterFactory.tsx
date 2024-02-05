import { ref, computed, Teleport, type RenderFunction, type Slots, getCurrentInstance } from "vue"
import type { ISearchObject } from "../abstractions/ISearchObject"
import { useFilter, type FilterProps, type FilterEmits } from "./filter"
import FilterInline from "./FilterInline.vue"
import { Modal } from "@/vue_modules/ui"

export function FilterFactory<SO extends ISearchObject>() {
    const Filter = {
        emits: ["update:modelValue", "filter", "toggle-adv", "close"],
        props: {
            modelValue: { type: Object, required: true },
            modalTitle: String,
            resultCount: Number,
        },
        setup(props: FilterProps<SO>, { slots, emit }: { slots: Slots; emit: FilterEmits }): RenderFunction {
            const searchObject = computed<SO>({
                get() {
                    return props.modelValue
                },
                set(value: SO) {
                    emit("update:modelValue", value)
                },
            })

            const showAdv = ref(false)
            console.debug("Filter", { props, searchObject })
            const { handleUpdate, handleFilter } = useFilter({ searchObject, emit })

            function handleToggle() {
                showAdv.value = !showAdv.value
            }
            function handleClose() {
                showAdv.value = false
            }
            function handleSubmit() {
                handleUpdate()
                handleClose()
            }

            return () => {
                const isDebug = getCurrentInstance()!.appContext.config.globalProperties.$isDebug
                const DefaultFilterInline = <FilterInline v-model={searchObject.value} onFilter={handleFilter} onToggleAdv={handleToggle} />

                return (
                    <div>
                        {(slots.inline && slots.inline({ handleUpdate, handleFilter, handleToggle })) || DefaultFilterInline}

                        <Teleport to="#modals">
                            {showAdv.value && (
                                <Modal title={props.modalTitle || "Advanced search"} showFooter={true} onClose={handleClose} onSubmit={handleSubmit}>
                                    {slots.title}
                                    {slots.adv!({ handleUpdate, handleSubmit, handleClose })}
                                    {isDebug.value && <div class="debug text-muted">{JSON.stringify(searchObject.value)}</div>}
                                </Modal>
                            )}
                        </Teleport>
                    </div>
                )
            }
        },
    }

    return Filter
}

export default FilterFactory
