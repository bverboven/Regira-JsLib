// import type { IEntity, ISearchObject, IConfig } from "../abstractions"
// import type { IPoolHandler } from "../pooling"
// import { createAutocomplete } from "./Autocomplete"
// import { createFormModalButton } from "./formModalButtonFactory"
// import { createSelectorSearch } from "./selector/SelectorSearch"
// import { createSelectorModalButton } from "./selector/SelectorModalButton"
// import { createSelectorInput } from "./selector/SelectorInput"
// import { createOverview } from "./overviewFactory"
// import { createDetails } from "./Details"

// type IComponentsIn<T extends IEntity, SO extends ISearchObject> = {
//     config: IConfig
//     Entity: Function & { name: string; new (): T }
//     SearchObject: Function & { new (): SO }
//     useEntityStore: () => IPoolHandler<T>
//     Form?: any
//     FilterAdv?: any
//     List?: any
//     SelectorList?: any
// }
// type IComponentsOut = {
//     Autocomplete: any
//     FormModalButton: any
//     SelectorSearch: any
//     SelectorModalButton: any
//     SelectorInput: any
//     Overview: any
//     Details: any
// }

// export class GenericComponents<T extends IEntity, SO extends ISearchObject> implements IComponentsOut {
//     _Autocomplete: any
//     _FormModalButton?: any
//     _SelectorSearch: any
//     _SelectorModalButton?: any
//     _SelectorInput: any
//     _Overview?: any
//     _Details?: any

//     constructor(private input: IComponentsIn<T, SO>) {}

//     get Autocomplete() {
//         return (this._Autocomplete ||= createAutocomplete(this.input))
//     }
//     get FormModalButton() {
//         return (this._FormModalButton ||= createFormModalButton(this.input))
//     }
//     get SelectorSearch() {
//         return (this._SelectorSearch ||= createSelectorSearch({ ...this.input, FormModalButton: this.FormModalButton }))
//     }
//     get SelectorModalButton() {
//         return (this._SelectorModalButton ||= createSelectorModalButton({ ...this.input, SelectorSearch: this.SelectorSearch }))
//     }
//     get SelectorInput() {
//         return (this._SelectorInput ||= createSelectorInput({ ...this.input, Autocomplete: this.Autocomplete, FormModalButton: this.FormModalButton, SelectorModalButton: this.SelectorModalButton }))
//     }
//     get Overview() {
//         return (this._Overview ||= createOverview({ ...this.input, FormModalButton: this.FormModalButton }))
//     }
//     get Details() {
//         return (this._Details ||= createDetails(this.input))
//     }
// }

// export default GenericComponents
