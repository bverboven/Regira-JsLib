// import { defineComponent, type RenderFunction } from "vue"
// import { useVModelField } from "@/vue_modules/vue-helper"
// import type { IConfig, IEntity, ISearchObject } from "../../abstractions"
// import { SelectorSearchFactory } from "../../overview"
// import type { IPoolHandler } from "../../pooling"

// type ISelectorSearchIn<T extends IEntity, SO extends ISearchObject> = {
//     config: IConfig
//     Entity: Function & { name: string; new (): T }
//     SearchObject: Function & { new (): SO }
//     useEntityStore: () => IPoolHandler<T>
//     FilterAdv: any
//     SelectorList: any
//     FormModalButton: any
// }

// type SelectorSearchEmits<T extends IEntity> = {
//     (e: "update:modelValue", selected?: T): void
// }
// type SelectorSearchProps<T extends IEntity, SO extends ISearchObject> = {
//     modelValue?: T
//     defaultFilter?: SO
//     pageSize?: number
// }

// export function createSelectorSearch<T extends IEntity, SO extends ISearchObject>({ config, SearchObject, useEntityStore, FilterAdv, SelectorList, FormModalButton }: ISelectorSearchIn<T, SO>) {
//     const SelectorSearch = defineComponent({
//         props: {
//             modelValue: Object,
//             defaultFilter: Object,
//             pageSize: Number,
//         },
//         setup(props: SelectorSearchProps<T, SO>, { emit }: { emit: SelectorSearchEmits<T> }): RenderFunction {
//             const selected = useVModelField(props, emit)
//             const { service } = useEntityStore()

//             const SelectorSearch = SelectorSearchFactory<T, SO>({
//                 service,
//                 List: SelectorList,
//                 FilterAdv,
//                 ModalButton: FormModalButton,
//             })

//             return () => <SelectorSearch v-model={selected.value} pageSize={props.pageSize || config.defaultPageSize} defaultFilter={props.defaultFilter || new SearchObject()} />
//         },
//     })

//     return SelectorSearch
// }

// export default createSelectorSearch