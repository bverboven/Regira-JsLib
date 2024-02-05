import { defineComponent, ref, Teleport, watchEffect, type RenderFunction } from "vue"
import { Icon, Modal } from "@/vue_modules/ui"
import type { IConfig, IEntity, ISearchObject } from "../../abstractions"

type ISelectorModalButtonIn<T extends IEntity, SO extends ISearchObject> = {
    config: IConfig
    SelectorSearch: any
}

type SelectorModalButtonEmits<T extends IEntity> = {
    (e: "update:modelValue", selected?: T): void
    (e: "change", selected?: T): void
}
type SelectorModalButtonProps<T extends IEntity> = {
    modelValue?: T
}

export function createSelectorModalButton<T extends IEntity, SO extends ISearchObject>({ config, SelectorSearch }: ISelectorModalButtonIn<T, SO>): any {
    const SelectorModalButton = defineComponent({
        setup(props: SelectorModalButtonProps<T>, { emit }: { emit: SelectorModalButtonEmits<T> }): RenderFunction {
            const selected = ref<T>()
            const isOpen = ref(false)

            function open() {
                selected.value = props.modelValue
                isOpen.value = true
            }
            function close() {
                isOpen.value = false
            }
            function handleCancel() {
                console.debug("handleCancel")
                close()
            }
            function handleSubmit() {
                console.debug("handleSubmit")
                emit("update:modelValue", selected.value)
                emit("change", selected.value)
                close()
            }

            watchEffect(() => (selected.value = props.modelValue))

            return () => (
                <button type="button" class="btn btn-default" onClick={open}>
                    <slot>
                        <Icon name="search" />
                    </slot>
                    <Teleport to="#modals">
                        {isOpen.value && (
                            <Modal title="Select category" showFooter={true} fullWidth={true} onClose={close} onCancel={handleCancel} onSubmit={handleSubmit}>
                                <SelectorSearch v-model={selected.value} pageSize={config.defaultPageSize} />
                            </Modal>
                        )}
                    </Teleport>
                </button>
            )
        },
    })

    return SelectorModalButton
}

export default createSelectorModalButton
