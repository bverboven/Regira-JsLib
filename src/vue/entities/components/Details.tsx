import { defineComponent, type RenderFunction } from "vue"
import { RouterView, useRouter } from "vue-router"
import { LoadingContainer } from "@/vue_modules/ui"
import type { IConfig, IEntity } from "../abstractions"
import { FormStates } from "../form"
import type { IPoolHandler } from "../pooling"
import useDetails from "../details"

type IDetailsIn<T extends IEntity> = {
    config: IConfig
    Entity: Function & { name: string; new (): T }
    useEntityStore: () => IPoolHandler<T>
    Form: any
}

export function createDetails<T extends IEntity>({ config, Entity, useEntityStore, Form }: IDetailsIn<T>) {
    const Details = defineComponent({
        emits: [],
        props: {},
        setup(): RenderFunction {
            const { service } = useEntityStore()

            const { item, isLoading, overviewUrl } = useDetails(service)

            const router = useRouter()
            const handleRemove = () => {
                router.push({ name: Entity.name + "Overview" })
            }

            return () => (
                <section>
                    <h1>{config.detailsTitle}</h1>
                    <LoadingContainer isLoading={isLoading.value}>
                        {/* <RouterView v-slot={Component}> */}
                        <RouterView>
                            {item.value != null && (
                                <Form
                                    v-model={item.value}
                                    modelValue={item.value}
                                    updateRroute={config.updateRoute}
                                    onChangeState={(e: FormStates) => (isLoading.value = e == FormStates.pending)}
                                    onRemove={handleRemove}
                                />
                            )}
                        </RouterView>
                    </LoadingContainer>
                </section>
            )
        },
    })

    return Details
}

export default createDetails
