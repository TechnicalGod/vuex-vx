import { createDecorator } from 'vue-class-component'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { errLog, errData } from './error'
import { typeS, makeDecoratorType } from './type'
let tyof = (value: string) => typeof value === 'string'
function makeDecorator(decorator: makeDecoratorType): any {
    const { type, method, cb, vuexType } = decorator
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
                errData.mgData = { name: key, message: 'Mustfill 1:params:{string}, Optional 2:cb:{ function }', type: vuexType }
                options[vuexType][key] = errLog
                return errLog
            }
            if (type && !tyof(type)) {
                errData.mgData = { value: type, message: `'string' but not ${typeof type}`, methods: key }
                options[vuexType][key] = errLog
                return errLog
            }
            let mt = method(mapData)[key]
            if (typeof cb === 'object') {
                let mtds = method(cb.namespace, { ...mapData })[key]
                options[vuexType][key] = mtds
                cb.fn && cb.fn(mtds)
            } else {
                options[vuexType][key] = mt
                typeof cb === 'function' && cb(mt)
            }
        }
    })
}
function createVuexData(type: string, method: Function) {
    function help(value: string, cb?: Function | { namespace: string, fn?: Function }) {
        return makeDecorator({
            type: value,
            method,
            cb,
            vuexType: type
        })
    }
    return help
}
function createModule(namespace: string) {
    function createNamespaced(fn: Function) {
        function getNamespaced(value: string, cb?: Function) {
            const options: typeS = { namespace, fn: cb }
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
export let State = createVuexData('computed', mapState);
export let Getter = createVuexData('computed', mapGetters);
export let Mutation = createVuexData('methods', mapMutations);
export let Action = createVuexData('methods', mapActions);
export let Module = createModule