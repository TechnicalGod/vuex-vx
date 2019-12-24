import { State, Module, Getter, Action, Mutation } from './vx'
import { state,  modification, unregisterModule, registerStore } from './Temporary-state/index'
const Temporary = state
const _defalut = {
    State,
    Module,
    Getter,
    Action,
    Mutation,
    Temporary,
    registerStore,
    modification,
    unregisterModule
}
export default _defalut
export {
    State,
    Module,
    Getter,
    Action,
    Mutation,
    Temporary,
    registerStore,
    modification,
    unregisterModule
} 