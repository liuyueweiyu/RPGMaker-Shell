import { ResponseData,NewSuccess } from './response';
import { MESSAGE_CODE_HAS_EXITED,MESSAGE_CODE_NOT_EXIT } from './../../../../constant/code';
interface CBFunc {
    (data:any) : ResponseData;
}

class APIManager {
    constructor(){ }
    private static instance : APIManager;
    private static APIMap:Map<string,CBFunc>;
    private static cbMap:Map<string,CBFunc>;
    static getInstance() {
        if(!this.instance) {
        this.instance = new APIManager();
        }
        return this.instance;
    }

    // 前端注册回调用
    public static registerTriggerCallBack(name:string,func:CBFunc){
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
    public static triggerCallBack(name:string,data:any) {
        const cb = this.cbMap.get(name);
        if(cb){
            console.log(`trigger callback [${name}],参数为:${JSON.stringify(data)}`);
            cb(data);
            return NewSuccess(null);
        }
        const res : ResponseData = {
            code : MESSAGE_CODE_NOT_EXIT,
            msg : `callback[${name}] not exit`,
            data : null
        }
        return res;
    }


    // state中开放API用
    public static registerAPICallBack(name:string,func:CBFunc) {
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
    
    public static callAPICallBack(name:string,data:any) {
        const cb = this.APIMap.get(name);
        if(cb) {
            console.log(`callAPI[${name}],参数为:${JSON.stringify(data)}`);
            cb(data);
            return NewSuccess(null);
        }
        const res : ResponseData = {
            code : MESSAGE_CODE_NOT_EXIT,
            msg : `APIcallback[${name}] not exit`,
            data : null
        }
        return res;
    }
}


export default APIManager;