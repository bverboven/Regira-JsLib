// import { defineComponent, type RenderFunction } from "vue"
// import type { IConfig, IEntity, ISearchObject } from "../abstractions"
// import { OverviewFactory } from "../overview"
// import type { IPoolHandler } from "../pooling"

// type IOverviewIn<T extends IEntity, SO extends ISearchObject> = {
//     config: IConfig
//     Entity: Function & { name: string; new (): T }
//     SearchObject: Function & { new (): SO }
//     useEntityStore: () => IPoolHandler<T>
//     List: any
//     FilterAdv?: any
//     FormModalButton?: any
// }

// export function createOverview<T extends IEntity, SO extends ISearchObject>({ config, Entity, SearchObject, useEntityStore, List, FilterAdv, FormModalButton }: IOverviewIn<T, SO>) {
//     const Overview = defineComponent({
//         emits: [],
//         props: {},
//         setup(): RenderFunction {
//             const Overview = OverviewFactory<T, SO>({
//                 service: useEntityStore().service,
//                 searchObject: new SearchObject(),
//                 defaultPageSize: config.defaultPageSize,
//                 List,
//                 ModalButton: FormModalButton,
//                 FilterAdv,
//                 icon: Entity.name,
//             })

//             return () => <Overview />
//         },
//     })

//     return Overview
// }

// export default createOverview