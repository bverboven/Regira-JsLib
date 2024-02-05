// import { defineComponent, type RenderFunction, type Slots } from "vue"
// import { useVModelField } from "@/vue_modules/vue-helper"
// import { Icon } from "@/vue_modules/ui"
// import type { IEntity, ISearchObject, IConfig } from "../abstractions"
// import { ModalButtonFactory, type FormModalEmits } from "../form"
// import type { IPoolHandler } from "../pooling"

// type IFormModalButtonIn<T extends IEntity, SO extends ISearchObject> = {
//     config: IConfig
//     Entity: Function & { name: string; new (): T }
//     SearchObject: Function & { new (): SO }
//     useEntityStore: () => IPoolHandler<T>
//     Form: any
//     ModalButton?: any
// }

// type FormModalButtonProps<T extends IEntity> = {
//     modelValue?: T
// }

// export function createFormModalButton<T extends IEntity, SO extends ISearchObject>({ config, Entity, useEntityStore, Form, ModalButton }: IFormModalButtonIn<T, SO>) {
//     const FormModalButton = defineComponent({
//         emits: ["update:modelValue", "save", "remove", "cancel", "changeState", "open", "close"],
//         props: { modelValue: Object },
//         setup(props: FormModalButtonProps<T>, { emit, slots }: { emit: FormModalEmits<T>; slots: Slots }): RenderFunction {
//             const item = useVModelField<T>(props, emit)
//             const { service } = useEntityStore()
//             ModalButton ||= ModalButtonFactory<T>(service, emit) as any
//             return () => (
//                 <ModalButton v-model={item.value} title={config.detailsTitle} fullWidth={false} Form={Form} closeOnSave={true}>
//                     {{
//                         default: () => (slots.default && slots.default()) || <Icon name={Entity.name} />,
//                     }}
//                 </ModalButton>
//             )
//         },
//     })
//     return FormModalButton
// }

// export default createFormModalButton
