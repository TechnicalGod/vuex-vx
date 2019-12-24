declare interface typeS {
    [k: string]: string | number | Function | any
}
declare interface makeDecoratorType {
    type: string,
    method: Function,
    namespace?:string,
    vuexType: string,
    fnType?:string
}
declare type tyofType = (value:string) => boolean
export {
    typeS,
    makeDecoratorType,
    tyofType
}