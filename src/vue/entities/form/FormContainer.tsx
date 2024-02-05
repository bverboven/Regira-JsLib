// import type { IEntity } from "../abstractions/IEntity"
// import type { IEntity } Service from "../abstractions/IEntityService"
// import { useForm, type FormEmits } from "./form"
// import { getCurrentInstance, type DefineComponent, type RenderFunction, type Slots } from "vue"
// import { useVModelField } from "@/vue_modules/vue-helper"
// import FormButtonsRow from "./FormButtonsRow.vue"
// import { Feedback, FeedbackStatus } from "@/vue_modules/ui/feedback"
// import { formatDateTime } from "@/vue_modules/formatters"
// import { Debug } from "@/vue_modules/debug"

// interface FormContainerIn<T extends IEntity> {
//     entityService: IEntityService<T>
//     emit: FormEmits<T>
//     updateRoute: boolean
//     isPopup: boolean
// }
// interface FormContainerProps<T extends IEntity> {
//     modelValue: T
// }

// export function FormContainerFactory<T extends IEntity>({ entityService, emit, updateRoute = false, isPopup = false }: FormContainerIn<T>) {
//     const FormContainer = {
//         emits: ["update:modelValue", "save", "remove", "cancel"],
//         props: {
//             modelValue: Object,
//         },
//         setup(props: FormContainerProps<T>, { slots }: { slots: Slots }): RenderFunction {
//             const item = useVModelField<T>(props, emit)
//             const { feedback, handleCancel, handleSubmit, handleRemove } = useForm<T>({
//                 entityService,
//                 item,
//                 updateRoute,
//                 isPopup,
//                 emit,
//             })

//             return () => {
//                 const isDebug = getCurrentInstance()!.appContext.config.globalProperties.$isDebug
//                 console.debug("FormContainer", { props })
//                 const lastModified = item.value?.lastModified || item.value?.created

//                 return (
//                     <form
//                         onSubmit={(e) => {
//                             e.preventDefault()
//                             handleSubmit()
//                         }}
//                     >
//                         <div class="row mb-1">
//                             <div class="col-auto mb-2">
//                                 <FormButtonsRow feedback={feedback} showDelete={item.value?.$id > 0} onCancel={handleCancel} onRemove={handleRemove} />
//                             </div>
//                             <div class="col mb-2">
//                                 {feedback.status.value == FeedbackStatus.none && (
//                                     <div
//                                         class="text-end italic-muted position-absolute end-0 me-3"
//                                         title={`Last modified on ${formatDateTime(lastModified, "dd-MM-yyyy")} at ${formatDateTime(lastModified, "HH:mm")}`}
//                                     >
//                                         {formatDateTime(lastModified, "dd/MM")}
//                                     </div>
//                                 )}
//                                 <Feedback feedback={feedback} />
//                             </div>
//                         </div>
//                         {item?.value != null && slots && slots.default!({ feedback })}

//                         {isDebug.value && <Debug modelValue={item.value} />}
//                     </form>
//                 )
//             }
//         },
//     }

//     return FormContainer
// }

// export default FormContainerFactory
