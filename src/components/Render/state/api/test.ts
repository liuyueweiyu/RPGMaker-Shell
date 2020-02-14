import APIManager from './index';
import { ResponseData,NewSuccess } from './response';

export default function init(api:APIManager) {
    api.registerAPICallBack("test",function (data:any) {
        return NewSuccess(null)
    })
}