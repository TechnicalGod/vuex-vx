
const log = console && console || null 
interface errLogType {
    [k:string]:string|number | object
}
let errData: errLogType = {
    mgData:{}
}
let errLog: Function = function () { return log && log.error(errData.mgData) }
export {
    log,
    errLog,
    errData
} 