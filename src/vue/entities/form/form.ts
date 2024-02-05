import { ref, watch, onMounted, toRefs, type Ref } from "vue"
import { useRouter, type RouteLocationRaw } from "vue-router"
import useFeedback, { type FeedbackError, type FeedbackOut } from "@/vue/ui/feedback"
import { deepCopy } from "@/regira_modules/utilities/object-utility"
import type { IEntity } from "../abstractions/IEntity"
import type { IEntityService, SaveResult } from "../abstractions/IEntityService"

export enum FormStates {
    pending = "Pending",
    saved = "Saved",
    removed = "Removed",
    error = "Error",
}
export interface FormEmits<T extends IEntity> {
    (e: "update:modelValue", item?: T): void
    (e: "save", result: SaveResult<T>): void
    (e: "remove", item: T): void
    (e: "restore", item: T): void
    (e: "cancel", arg: { canceled: T; original?: T }): void
    (e: "changeState", state: FormStates): void
}
export interface FormProps<T extends IEntity> {
    modelValue: T
    readonly?: boolean
    isPopup?: boolean
}
export const formDefaults = {
    // no defaults
    readonly: false,
    isPopup: false,
}

interface FormIn<T extends IEntity> {
    entityService: IEntityService<T>
    props: {
        modelValue: T
        readonly?: boolean
        isPopup?: boolean
    }
    emit: FormEmits<T>
    feedback?: FeedbackOut
}
interface FormOut<T extends IEntity> {
    item: Ref<T>
    original?: Ref<T>
    feedback: FeedbackOut
    handleCancel(): void
    handleSubmit(): Promise<void>
    handleRemove(): Promise<void>
    handleRestore(): Promise<void>
}
type Error = { response: { data?: FeedbackError } }

// FormContainer
export function useForm<T extends IEntity>({ entityService, props, emit, feedback = useFeedback() }: FormIn<T>): FormOut<T> {
    type IArchivable = T & { isArchived: boolean }

    const { readonly, isPopup } = props
    // use ref instead of computed|useVModelField to preserve value when (re)loading from pool somewhere else
    //const item = ref(props.modelValue)
    const item = ref(props.modelValue) as Ref<T>

    console.debug("useForm", item.value?.constructor?.name, { item, isPopup })
    const original = ref<T | undefined>() as Ref<T>

    function handleCancel(): void {
        emit("cancel", { canceled: item.value, original: original.value as T })
        item.value = original.value as T
    }

    function checkReadonly(): void {
        if (readonly) {
            feedback.fail("Readonly")
            throw new Error("Readonly")
        }
    }

    const router = useRouter()
    async function handleSubmit(): Promise<void> {
        checkReadonly()

        emit("changeState", FormStates.pending)
        try {
            feedback.pending("Saving...")
            const { saved, isNew } = await entityService.save(item.value)
            console.debug("FormUI.handleSubmit", { isPopup, item, saved, isNew })
            emit("save", { saved, isNew })
            feedback.success("Saved")
            item.value = entityService.toEntity(deepCopy(saved))
            original.value = entityService.toEntity(deepCopy(saved))
            emit("update:modelValue", item.value)
            if (isNew && !isPopup) {
                const currentRoute = router.currentRoute.value
                delete currentRoute.query.src
                const newRoute: RouteLocationRaw = {
                    name: currentRoute.name!,
                    params: {
                        ...currentRoute.params,
                        id: saved.$id,
                    },
                    query: {
                        ...currentRoute.query,
                    },
                    hash: currentRoute.hash,
                }
                router.replace(newRoute)
            }
        } catch (ex) {
            console.error("Saving failed", { ex })
            const error = ex as any
            const status = error.response?.status
            if (status == 400) {
                feedback.fail("Saving failed", error.response?.data)
            } else if (status == 404) {
                feedback.fail("Item not found", error.message)
            } else {
                feedback.fail("Server error", error.response?.data || error.message)
            }
            emit("changeState", FormStates.error)
            throw ex
        } finally {
            emit("changeState", FormStates.saved)
        }
    }

    async function handleRemove(): Promise<void> {
        checkReadonly()

        emit("changeState", FormStates.pending)
        try {
            feedback.pending("Deleting...")
            console.debug("FormUI.handleRemove", { item: item.value })
            await entityService.remove(item.value as T)
            feedback.success("Deleted")
            emit("remove", item.value as T)
        } catch (ex) {
            console.error("Deleting failed", { item, ex })
            const error = ex as any
            feedback.fail("Deleting failed", error.response?.data?.errors)
            emit("changeState", FormStates.error)
            throw ex
        } finally {
            emit("changeState", FormStates.removed)
        }
    }

    async function handleRestore(): Promise<void> {
        const restoringItem = entityService.toEntity(deepCopy(item.value)) as unknown as IArchivable
        restoringItem.isArchived = false

        emit("changeState", FormStates.pending)
        try {
            feedback.pending("Restoring...")
            const { saved, isNew } = await entityService.save(restoringItem)
            console.debug("FormUI.handleRestore", { isPopup, item, saved })
            emit("restore", saved)
            emit("save", { saved, isNew })
            feedback.success("Restored")
            item.value = entityService.toEntity(deepCopy(saved))
            original.value = entityService.toEntity(deepCopy(saved))
            emit("update:modelValue", item.value)
        } catch (ex) {
            console.error("Restoring failed", { item, ex })
            const error = ex as any
            feedback.fail("Restoring failed", error.response?.data?.errors)
            emit("changeState", FormStates.error)
            throw ex
        } finally {
            emit("changeState", FormStates.saved)
        }
    }

    watch(
        () => props.modelValue,
        (newVal, oldVal) => {
            console.debug("FormUI.watchModelValue", { newVal, oldVal, original })
            item.value = props.modelValue
            original.value = entityService.toEntity(deepCopy(item.value))
        }
    )
    onMounted(() => {
        //console.debug("FormUI.mounted", { original: { ...original.value }, model: { ...item.value } })
        original.value = entityService.toEntity(deepCopy(item.value))
    })
    // watchEffect(() => {
    //     console.debug("FormUI.watchEffect", { old: original.value, item: deepCopy(item.value), original })
    //     original.value = entityService.toEntity(deepCopy(item.value))
    // })

    return {
        item,
        original,
        feedback,
        handleCancel,
        handleSubmit,
        handleRemove,
        handleRestore,
    }
}
