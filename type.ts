declare interface typeS {
    [k: string]: string | number | Function | any
}
declare interface makeDecoratorType {
    type: string,
    method: Function
    cb?: Function | { namespace: string, fn?: Function } | string,
    vuexType: string
}
export {
    typeS,
    makeDecoratorType
}