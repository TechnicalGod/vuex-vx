
const log = console && console || null 
interface errLogType {
    [k:string]:string|number | object
}
let errData: errLogType = {
    mgData:{}
}
// 失败回调
let errLog: Function = function () { return log.error(errData.mgData) }
export {
    log,
    errLog,
    errData
} 