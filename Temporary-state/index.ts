import { TemporaryType, optionsType, modificationType, unregisterModuleType } from './type'
let vm: optionsType['vue']
let observe = function (obj: any) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            observe(obj[key])
        }
        new Proxy(obj, {
            get(target, value, receiver) {
                return Reflect.get(target, value, receiver)
            },
            set(target, value, receiver) {
                return Reflect.set(target, value, receiver)
            }
        })
    }
}
let registerStore = function (target: optionsType) {
    vm = target.vue;
    let moduleName = target.moduleName || vm.$options.name+ 'Module' || 'module'
    if (!vm.$nextTick || !target.isTemporary) {
        return target.error && target.error({
            message: !target.isTemporary ? '当isTemporary为true才会注册' : '请正确传入this 这里的this 指向vue的当前实例',
            moduleName
        })
    }
    vm.$nextTick(() => {
        if (target.isTemporary) {
            vm.$store.registerModule(moduleName, state, { preserveState: target.preserveState || false });
            target.success && target.success({
                moduleName,
                state
            })
            observe(state)
        }
    })

}
let modification = function (options: modificationType) {
    return Object.assign(options.target, options.newData)
}
let unregisterModule = function (moduleName: unregisterModuleType['moduleName'],cb?:unregisterModuleType['cb']) {
    if(!vm.$store || !vm.$store.unregisterModule) return console.error("销毁失败, 确认 'this' 指向vue的当前实例")
    vm.$store.unregisterModule([moduleName])
    Temporary.State = {}
    Temporary.Module = {}
    Temporary.Getter = {}
    Temporary.Module = {}
    Temporary.Mutation = {}
    cb && cb(Temporary)
}
let state: any = {
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {}
}
let Temporary: TemporaryType = {
    registerStore,
    State: state.state,
    Module: state.modules,
    Getter: state.getters,
    Action: state.actions,
    Mutation: state.mutations,
    modification,
    unregisterModule
}
export default Temporary
export {
    registerStore,
    Temporary,
    modification,
    unregisterModule
}