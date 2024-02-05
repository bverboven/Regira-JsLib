// import type { IEntity } from "../abstractions/IEntity"
// import type { IEntity } Service from "@/vue_modules/entities/abstractions/IEntityService"
// import { useModal, type FormModalEmits } from "@/vue_modules/entities/form"
// import { Teleport, type RenderFunction, type Slots, type VNode } from "vue"
// import { useVModelField } from "@/vue_modules/vue-helper"
// import { Icon } from "@/vue_modules/ui/icons"
// import { Modal } from "@/vue_modules/ui/modal"

// interface ModalButtonProps<T> {
//     modelValue: T
//     title: string
//     showFooter?: boolean
//     fullWidth?: boolean
//     closeOnSave?: boolean
//     closeOnCancel?: boolean
//     closeOnDelete?: boolean
//     Form: VNode
// }

// export function ModalButtonFactory<T extends IEntity>(entityService: IEntityService<T>, emit: FormModalEmits<T>) {
//     let clicks = 0

//     const ModalButton = {
//         //inheritAttrs: true,
//         emits: ["update:modelValue", "save", "remove", "open", "close"],
//         props: {
//             modelValue: Object,
//             title: String,
//             showFooter: Boolean,
//             fullWidth: Boolean,
//             closeOnSave: Boolean,
//             closeOnCancel: Boolean,
//             closeOnDelete: { type: Boolean, default: true },
//             Form: Object,
//         },
//         setup(props: Readonly<ModalButtonProps<T>>, { slots }: { slots: Slots }): RenderFunction {
//             const EntityForm = props.Form as any // prevent warning below (ToDo: cast to correct type)
//             const modelRef = useVModelField<T>(props, emit)

//             const {
//                 item,
//                 isOpen,

//                 close,
//                 open,

//                 handleSave,
//                 handleRemove,
//                 handleCancel,
//             } = useModal<T>({
//                 model: modelRef,
//                 entityService,
//                 closeOnSave: props.closeOnSave,
//                 closeOnCancel: props.closeOnCancel,
//                 closeOnDelete: props.closeOnDelete,
//                 emit,
//             })

//             return (): VNode => {
//                 return (
//                     <button type="button" class="btn btn-default" onClick={open} key={clicks}>
//                         {(slots.default && slots.default()) || <Icon name="edit" />}
//                         <Teleport to="#modals">
//                             {isOpen.value && (
//                                 <Modal title={`${props.title} ${item.value?.$title || ""}`} showFooter={props.showFooter} onClose={close} fullWidth={props.fullWidth}>
//                                     <EntityForm
//                                         v-model={item.value}
//                                         onUpdate:modelValue={(e: T) => emit("update:modelValue", e)}
//                                         isPopup={true}
//                                         onCancel={handleCancel}
//                                         onSave={handleSave}
//                                         remove={handleRemove}
//                                     />
//                                 </Modal>
//                             )}
//                         </Teleport>
//                     </button>
//                 )
//             }
//         },
//     }
//     return ModalButton
// }

// export default ModalButtonFactory
