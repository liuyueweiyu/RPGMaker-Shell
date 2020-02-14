import { ResponseData,NewSuccess } from './response';
import { MESSAGE_CODE_HAS_EXITED,MESSAGE_CODE_NOT_EXIT } from './../../../../constant/code';

import testInit from './test';

interface CBFunc {
    (data:any) : ResponseData;
}

interface Func {
    (data:ResponseData) : any
}

class APIManager {
    constructor(){
        testInit(this);
    }
    private APIMap:Map<string,CBFunc> = new Map();
    private cbMap:Map<string,Func> = new Map();

    // 前端注册回调用
    registerTriggerCallBack(name:string,func:Func){
        if(this.cbMap.has(name)) {
            const data:ResponseData = {
                code : MESSAGE_CODE_HAS_EXITED,
                msg : `callback [${name}] has exited`,
                data : null
            }
            return data
        }
        this.cbMap.set(name,func);
        return NewSuccess(null);
    }
    triggerCallBack(name:string,data:any) {
        const cb = this.cbMap.get(name);
        if(cb){
            const res = cb(data);
            console.log(`trigger callback [${name}],参数为:${JSON.stringify(data)},返回值为:${JSON.stringify(res)}`);
        }
        const res : ResponseData = {
            code : MESSAGE_CODE_NOT_EXIT,
            msg : `callback[${name}] not exit`,
            data : null
        }
    }


    // state中开放API用
    registerAPICallBack(name:string,func:Func) {
        if(this.APIMap.has(name)) {
            const data:ResponseData = {
                code : MESSAGE_CODE_HAS_EXITED,
                msg : `APIcallback [${name}] has exited`,
                data : null
            }
            return data
        }
        this.APIMap.set(name,func);
        return NewSuccess(null);
    }
    
    callAPICallBack(name:string,data:any,callback:Func) {
        const cb = this.APIMap.get(name);
        if(cb) {
            const res = cb(data);
            console.log(`callAPI[${name}],参数为:${JSON.stringify(data)},返回值为:${JSON.stringify(res)}`);
        }
        const res : ResponseData = {
            code : MESSAGE_CODE_NOT_EXIT,
            msg : `APIcallback[${name}] not exit`,
            data : null
        }
        callback(res);
    }
}


export default APIManager;