import { createDecorator } from 'vue-class-component'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { errLog, errData } from './error'
import { typeS, makeDecoratorType, tyofType } from './type'
let tyof: tyofType = (value: string) => typeof value === 'string'
function makeDecorator(decorator: makeDecoratorType) {
    const { type, method, namespace, vuexType, fnType } = decorator
    let mapData: typeS = {}
    return createDecorator((options: any, key: string) => {
        if (!options[vuexType]) {
            options[vuexType] = {};
        }
        if (!mapData[key]) {
            mapData[key] = type
        }
        if (!options[vuexType][key]) {
            if (!type) {
                errData.mgData = { name: key, message: 'Mustfill 1:params:{ string } Optional 2:{ namespace: moduleName }', type: fnType }
                options[vuexType][key] = errLog
                return errLog
            }
            if (type && !tyof(type)) {
                errData.mgData = { value: type, message: `'string' but not ${typeof type}`, methods: key }
                options[vuexType][key] = errLog
                return errLog
            }
            if (namespace) {
                options[vuexType][key] = method(namespace, { ...mapData })[key]
            } else {
                options[vuexType][key] = method(mapData)[key]
            }
        }
    })
}
function createVuexData(type: string, method: Function, fnType: string) {
    function help(value: string, ots?: { namespace: string }) {
        return makeDecorator({
            type: value,
            method,
            fnType,
            namespace: ots && ots.namespace || undefined,
            vuexType: type
        })
    }
    return help
}
function createModule(namespace: string) {
    function createNamespaced(fn: Function) {
        function getNamespaced(value: string) {
            const options: typeS = { namespace }
            return fn(value, options)
        }
        return getNamespaced
    }
    return {
        State: createNamespaced(State),
        Getter: createNamespaced(Getter),
        Mutation: createNamespaced(Mutation),
        Action: createNamespaced(Action)
    }
}
export let State = createVuexData('computed', mapState, 'State');
export let Getter = createVuexData('computed', mapGetters, 'Getter');
export let Mutation = createVuexData('methods', mapMutations, 'Mutation');
export let Action = createVuexData('methods', mapActions, 'Action');
export let Module = createModule