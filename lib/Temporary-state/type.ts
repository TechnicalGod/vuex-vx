import vue from 'vue'
declare interface successType {
    moduleName: string,
    state: any
}
export declare interface errorType {
    message: string,
    moduleName: string
}
export declare interface TemporaryType {
    registerStore: (options: optionsType) => void,
    modification: (options: modificationType) => object
    unregisterModule:(moduleName:unregisterModuleType['moduleName'],cb?:unregisterModuleType['cb']) => void
    State?: any,
    Module?: any,
    Getter?: any,
    Action?: any,
    Mutation?: any,
}
export declare interface modificationType {
    target: object,
    newData: object
}
export declare interface unregisterModuleType {
    moduleName:string,
    cb?:(target:TemporaryType)=>void
}
export declare interface optionsType {
    vue: vue,
    moduleName?: string,
    preserve?: object,
    preserveState?: boolean,
    isTemporary:boolean,
    success?: (options: successType) => void,
    error?: (options: errorType) => void
}